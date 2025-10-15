use crate::types::{Entry, VaultState};
use anyhow::anyhow;
use tauri::State;

#[tauri::command]
pub fn unlock_vault(state: State<VaultState>, password: String) -> anyhow_tauri::TAResult<bool> {
    let mut vault = state.vault.lock().unwrap();

    if vault.storage.does_vault_exist() {
        return Ok(vault.unlock(&password).is_ok());
    }

    let result = vault.initialize(&password);
    let is_initialized = result.is_ok();

    if !is_initialized {
        println!("Failed to initialize vault: {:?}", &result.err());
    }

    Ok(is_initialized)
}

#[tauri::command]
pub fn lock_vault(state: State<VaultState>, password: String) -> anyhow_tauri::TAResult<bool> {
    let mut vault = state.vault.lock().unwrap();

    Ok(vault.lock(&password).is_ok())
}

#[tauri::command]
pub fn list_entries(state: State<VaultState>) -> anyhow_tauri::TAResult<Vec<Entry>> {
    let vault = state
        .vault
        .lock()
        .map_err(|_| anyhow!("Failed to lock vault mutex"))?;
    let content = vault.storage.list()?;

    Ok(content)
}

#[tauri::command]
pub fn add_entry(state: State<VaultState>, entry: Entry) {
    let mut vault = state.vault.lock().unwrap();

    match vault.storage.insert(&entry) {
        Ok(..) => {}
        Err(err) => {
            println!("Failed to save entry {:?}", err);
        }
    }
}
