use image::{DynamicImage, ImageReader};
use std::io::Cursor;
use std::path::Path;

fn image_change_format(
    file_path: &str,
    save: bool,
    img_format: &str,
) -> Result<DynamicImage, String> {
    // check file exists
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
        //  new file path with the correct extension
        let extension = match img_format {
            "PNG" => "PNG",
            "JPEG" => "JPEG",
            "BMP" => "BMP",
            _ => return Err(format!("Unsupported image format: {}", img_format)),
        };

        let new_file_path = path.with_file_name(format!(
            "{}_copy.{}",
            path.file_stem()
                .and_then(|s| s.to_str())
                .ok_or_else(|| "Failed to get file stem".to_string())?,
            extension
        ));

        println!("Saving to: {}", new_file_path.display());

        // save image in the specified format
        let save_result = match img_format {
            "PNG" => img
                .save(&new_file_path)
                .map_err(|e| format!("Failed to save image as PNG: {}", e)),
            "JPEG" => img
                .save(&new_file_path)
                .map_err(|e| format!("Failed to save image as JPEG: {}", e)),
            "BMP" => img
                .save(&new_file_path)
                .map_err(|e| format!("Failed to save image as BMP: {}", e)),
            _ => return Err(format!("Unsupported image format: {}", img_format)),
        };

        save_result?; // check errors during saving

        // convert image to bytes (if needed for more processing)
        let mut bytes: Vec<u8> = Vec::new();
        img.write_to(
            &mut Cursor::new(&mut bytes),
            match img_format {
                "PNG" => image::ImageFormat::Png,
                "JPEG" => image::ImageFormat::Jpeg,
                "BMP" => image::ImageFormat::Bmp,
                _ => return Err(format!("Unsupported image format: {}", img_format)),
            },
        )
        .map_err(|e| format!("Failed to write image to bytes: {}", e))?;
    }

    // return image
    Ok(img)
}

#[tauri::command]
pub fn manipulate_image(file_path: &str, save: bool, img_format: &str) -> Result<String, String> {
    match image_change_format(file_path, save, img_format) {
        Ok(_) => {
            let path = Path::new(file_path);
            // error handling file stem convert to string
            let file_stem = path
                .file_stem()
                .and_then(|s| s.to_str())
                .ok_or("Failed to get file stem")?;

            let new_file_path =
                path.with_file_name(format!("{}_copy.{}", file_stem, img_format.to_lowercase()));

            Ok(new_file_path.to_str().unwrap().to_string())
        }
        //return error
        Err(e) => Err(e.to_string()),
    }
}
