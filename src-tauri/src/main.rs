#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
//imports
use commands::file_picker::pick_file; 

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![pick_file])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
