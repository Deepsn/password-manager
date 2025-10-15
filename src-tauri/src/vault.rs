use crate::storage::FileStorage;
use crate::types::{Entry, Vault};
use anyhow::{anyhow, bail, Result};
use argon2::password_hash::rand_core::{OsRng, RngCore};
use argon2::Argon2;
use chacha20poly1305::aead::Aead;
use chacha20poly1305::{Key, KeyInit, XChaCha20Poly1305, XNonce};
use std::path::PathBuf;
use zeroize::Zeroize;

impl Vault {
    pub fn new(path: PathBuf) -> Self {
        Vault {
            storage: Box::new(FileStorage {
                path,
                map: Default::default(),
            }),
        }
    }

    pub fn initialize(&mut self, password: &str) -> Result<bool> {
        let empty_storage = vec![];
        self.storage.set_content(empty_storage);
        self.lock(password)?;
        Ok(true)
    }

    pub fn unlock(&mut self, password: &str) -> Result<bool> {
        let content = self.storage.get_content()?;

        if content.len() < 56 {
            bail!("Vault is not initialized");
        }

        let (salt, rest) = content.split_at(32);
        let (nonce_bytes, encrypted) = rest.split_at(24);

        let mut key_bytes = [0u8; 32];
        let argon2 = Argon2::default();
        argon2
            .hash_password_into(password.as_bytes(), salt, &mut key_bytes)
            .map_err(|err| anyhow!(err))?;

        let key = Key::from_slice(&key_bytes);
        let cipher = XChaCha20Poly1305::new(key);
        let nonce = XNonce::from_slice(nonce_bytes);

        let decrypted = cipher
            .decrypt(nonce, encrypted)
            .map_err(|err| anyhow!(err))?;

        let vault_content: Vec<Entry> = rmp_serde::from_slice(&decrypted)?;
        self.storage.set_content(vault_content);

        key_bytes.zeroize();

        Ok(true)
    }

    pub fn lock(&mut self, password: &str) -> Result<()> {
        let content = self.storage.list()?;
        let content_bytes = rmp_serde::to_vec(&content)?;

        let mut salt = [0u8; 32];
        let mut nonce_bytes = [0u8; 24];
        OsRng.fill_bytes(&mut salt);
        OsRng.fill_bytes(&mut nonce_bytes);

        let nonce = XNonce::from_slice(&nonce_bytes);

        let argon2 = Argon2::default();

        let mut key_bytes = [0u8; 32];
        argon2
            .hash_password_into(password.as_bytes(), &salt, &mut key_bytes)
            .map_err(|err| anyhow!(err))?;

        let key = Key::from_slice(&key_bytes);
        let cipher = XChaCha20Poly1305::new(key);

        let encrypted = cipher
            .encrypt(nonce, content_bytes.as_ref())
            .map_err(|err| anyhow!(err))?;

        self.storage.save_content(&encrypted, &salt, &nonce_bytes)?;

        key_bytes.zeroize();
        salt.zeroize();
        nonce_bytes.zeroize();

        Ok(())
    }
}
