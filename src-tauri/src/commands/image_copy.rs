// src/commands/img_copy.rs
use image::DynamicImage;
use image::ImageReader;
use std::io::Cursor;
use std::path::Path;

fn image_change_format(file_path: &str, save: bool) -> Result<DynamicImage, String> {
    // check file
    let path = Path::new(file_path);
    if !path.exists() {
        return Err(format!("File does not exist: {}", file_path));
    }

    // read image file
    let img = ImageReader::open(file_path)
        .map_err(|e| format!("Failed to open file: {}", e))?
        .decode()
        .map_err(|e| format!("Failed to decode image: {}", e))?;

    if save {
        let new_file_path = path.with_file_name(format!(
            "{}_copy.png",
            path.file_stem()
                .and_then(|s| s.to_str())
                .ok_or_else(|| "Failed to get file stem".to_string())?
        ));

        println!("Saving to: {}", new_file_path.display());

        // save original image as PNG
        img.save(&new_file_path)
            .map_err(|e| format!("Failed to save image: {}", e))?;

        // convert image to bytes (in-memory)
        let mut bytes: Vec<u8> = Vec::new();
        img.write_to(&mut Cursor::new(&mut bytes), image::ImageFormat::Png)
            .map_err(|e| format!("Failed to write image to bytes: {}", e))?;
    }
    // return the decoded image
    Ok(img)
}

#[tauri::command]
pub fn manipulate_image(file_path: &str, save: bool) -> Result<String, String> {
    match image_change_format(file_path, save) {
        Ok(result_image) => {
            let path = Path::new(file_path);
            let new_file_path = path.with_file_name(format!(
                "{}_copy",
                path.file_stem().unwrap().to_str().unwrap()
            ));
            Ok(new_file_path.to_str().unwrap().to_string())
        }
        Err(e) => Err(e.to_string()),
    }
}
