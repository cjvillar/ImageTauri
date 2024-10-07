use image::{DynamicImage, GenericImageView, ImageFormat, ImageReader, Luma};
use std::env::temp_dir;
use std::fs::{self, File};
use std::path::{Path, PathBuf};

use uuid::Uuid;

// Get persistent directory for saving temp images
fn get_persistent_dir() -> Result<PathBuf, String> {
    let dir = temp_dir().join("app_temp_images");

    // create the directory if it doesn't exist
    if !dir.exists() {
        fs::create_dir_all(&dir).map_err(|e| format!("Failed to create directory: {}", e))?;
    }
    Ok(dir)
}

// convert image to grayscale and save it in a persistent folder
fn save_grayscale_image_to_persistent(file_path: &str) -> Result<String, String> {
    // Check file existence
    let path = Path::new(file_path);
    if !path.exists() {
        return Err(format!("File does not exist: {}", file_path));
    }

    // read the image file
    let img = ImageReader::open(file_path)
        .map_err(|e| format!("Failed to open file: {}", e))?
        .decode()
        .map_err(|e| format!("Failed to decode image: {}", e))?;

    // convert the image to grayscale
    let gray_img = img.to_luma8();

    //  persistent directory
    let dir = get_persistent_dir()?;

    // unique file name for the grayscale image
    let file_name = format!("grayscale_{}.jpg", Uuid::new_v4());
    let persistent_file_path = dir.join(file_name);

    // save the grayscale image to the persistent directory
    gray_img
        .save_with_format(&persistent_file_path, ImageFormat::Jpeg)
        .map_err(|e| format!("Failed to save grayscale image: {}", e))?;

    // return file path of the saved image
    Ok(persistent_file_path.to_str().unwrap().to_string())
}

#[tauri::command]
//generate a grayscale image and return its file path
pub fn image_color_command_temp(file_path: String) -> Result<String, String> {
    match save_grayscale_image_to_persistent(&file_path) {
        Ok(persistent_file_path) => Ok(persistent_file_path),
        Err(e) => Err(e),
    }
}

#[tauri::command]
// delete a temporary image file if the user discards it
pub fn delete_temp_image(file_path: String) -> Result<(), String> {
    if Path::new(&file_path).exists() {
        std::fs::remove_file(&file_path).map_err(|e| format!("Failed to delete file: {}", e))?;
        Ok(())
    } else {
        Err(format!("File not found: {}", file_path))
    }
}
