use crate::types::{Entry, VaultStorage};
use anyhow::Result;
use std::collections::HashMap;
use std::fs::File;
use std::io::{Read, Write};
use std::path::PathBuf;

pub struct FileStorage {
    pub map: HashMap<String, Entry>,
    pub path: PathBuf,
}

impl VaultStorage for FileStorage {
    fn does_vault_exist(&self) -> bool {
        let vault_file = self.path.join("storage.txt");
        vault_file.exists()
    }

    fn get_content(&self) -> Result<Vec<u8>> {
        let vault_file = self.path.join("storage.txt");
        let mut file = File::options().read(true).open(&vault_file)?;

        let mut buf = vec![];
        file.read_to_end(&mut buf)?;
        Ok(buf)
    }

    fn set_content(&mut self, content: Vec<Entry>) {
        self.map = content
            .into_iter()
            .map(|entry| (entry.id.to_string(), entry))
            .collect();
    }

    fn save_content(&self, content: &[u8], salt: &[u8; 32], nonce: &[u8; 24]) -> Result<()> {
        let vault_file = self.path.join("storage.txt");
        let mut file = File::options()
            .write(true)
            .truncate(true)
            .create(true)
            .open(&vault_file)?;

        file.write_all(salt)?;
        file.write_all(nonce)?;
        file.write_all(content)?;

        Ok(())
    }

    fn insert(&mut self, entry: &Entry) -> Result<()> {
        self.map.insert(entry.id.to_string(), entry.clone());

        Ok(())
    }

    fn list(&self) -> Result<Vec<Entry>> {
        Ok(self.map.values().cloned().collect())
    }
}
