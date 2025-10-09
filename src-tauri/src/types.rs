use anyhow::Result;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use uuid::Uuid;

#[derive(Clone, Serialize, Deserialize)]
pub struct Entry {
    pub id: Uuid,
    pub name: String,
    pub content: String,

    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Serialize, Deserialize)]
pub struct VaultContent {
    pub(crate) entries: Vec<Entry>,
}

pub struct Vault {
    pub storage: Box<dyn VaultStorage>,
}

pub struct VaultState {
    pub vault: Mutex<Vault>,
}

pub trait VaultStorage: Send + Sync + 'static {
    fn does_vault_exist(&self) -> bool;
    fn get_content(&self) -> Result<Vec<u8>>;
    fn set_content(&mut self, content: Vec<Entry>);
    fn save_content(&self, content: &[u8], salt: &[u8; 32], nonce: &[u8; 24]) -> Result<()>;
    fn insert(&mut self, entry: &Entry) -> Result<()>;
    fn list(&self) -> Result<Vec<Entry>>;
}
