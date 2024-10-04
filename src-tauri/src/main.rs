#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
//imports
use commands::file_picker::pick_file; 

#[tauri::command]
fn my_custom_command(invoke_message: String) -> String {
    format!(
        "I was invoked from JS, with this message: {}",
        invoke_message
    )
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![my_custom_command, pick_file])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
