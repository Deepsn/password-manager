use crate::types::{Vault, VaultState};
use crate::vault_commands::{add_entry, list_entries, lock_vault, unlock_vault};
use std::sync::Mutex;
use tauri::{generate_handler, Manager};

mod storage;
mod types;
mod vault;
mod vault_commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(generate_handler![
            unlock_vault,
            lock_vault,
            list_entries,
            add_entry
        ])
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }

            let data_buf = app
                .path()
                .app_data_dir()
                .map_err(|_| "failed to get app data dir")?;

            app.manage(VaultState {
                vault: Mutex::from(Vault::new(data_buf)),
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
