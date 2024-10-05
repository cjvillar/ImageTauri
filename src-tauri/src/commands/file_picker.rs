// src/commands/file_picker.rs

use tauri_plugin_dialog::DialogExt;

#[tauri::command]
pub async fn pick_file(app_handle: tauri::AppHandle) -> Result<String, String> {
    let file_path: Option<tauri_plugin_dialog::FilePath> = app_handle
        .dialog()
        .file()
        .set_title("Select a JPEG file")
        .add_filter("JPEG Files", &["jpeg", "jpg", "JPEG", "JPG"])
        .blocking_pick_file();

    if let Some(path) = file_path {
        Ok(path.to_string()) // convert FilePath to String and return
    } else {
        Err("No file selected.".to_string())
    }
}
