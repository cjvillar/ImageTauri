#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
//imports
use commands::file_picker::pick_file;
use commands::image_color::image_color_command_temp;
use commands::image_copy::manipulate_image;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            pick_file,
            manipulate_image,
            image_color_command_temp
        ])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
