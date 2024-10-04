// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_dialog::DialogExt;

#[tauri::command]
fn my_custom_command(invoke_message: String) -> String {
    format!(
        "I was invoked from JS, with this message: {}",
        invoke_message
    )
}

#[tauri::command]
async fn pick_file(app_handle: tauri::AppHandle) -> Result<String, String> {
    // Use the dialog plugin to pick a file with a filter for JPEG files
    let file_path: Option<tauri_plugin_dialog::FilePath> = app_handle
        .dialog()
        .file()
        .set_title("Select a JPEG file")
        .add_filter("JPEG Files", &["jpeg", "jpg", "JPEG", "JPG"]) // Filter for JPEG files
        .blocking_pick_file();

    if let Some(path) = file_path {
        Ok(path.to_string()) // Convert FilePath to String and return
    } else {
        Err("No file selected.".to_string()) // Return an error if no file was selected
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![my_custom_command, pick_file])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
