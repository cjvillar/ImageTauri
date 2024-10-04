// src/commands/img_copy.rs
use image::{DynamicImage, ImageBuffer, Rgba};

use std::path::Path;

// manipulation function broken currenly creates empty .jpg file 
fn perform_image_manipulation(file_path: &str, save: bool) -> Result<DynamicImage, String> {
    // check if the file exists 
    let path = Path::new(file_path);
    if !path.exists() {
        return Err(format!("File does not exist: {}", file_path));
    }

    // reads jpeg image into file
    let img = image::open(file_path).map_err(|e| e.to_string())?;

    // example manipulation: Convert to grayscale 
    let gray_img = img.into_luma8();

    // test (fails) create a new image buffer for the manipulated image
    let manipulated_img = ImageBuffer::from_fn(gray_img.width(), gray_img.height(), |x, y| {
        if (x > 50 && x < 150) && (y > 50 && y < 150) {
            Rgba([255, 0, 0, 255]) // red rectangle
        } else {
            let gray_pixel = gray_img.get_pixel(x, y);
            Rgba([gray_pixel[0], gray_pixel[0], gray_pixel[0], 255]) // Use the same value for R, G, B channels
        }
    });

    let result_image = DynamicImage::ImageRgba8(manipulated_img);

    // log the dimensions of the manipulated image debugging 
    println!(
        "Manipulated image size: {}x{}",
        result_image.width(),
        result_image.height()
    );

    // save if true passed
    if save {
        let new_file_path = path
            .with_file_name(format!("{}_copy.jpg", path.file_stem()
                .and_then(|s| s.to_str())
                .ok_or_else(|| "Failed to get file stem".to_string())?));

        println!("Saving to: {}", new_file_path.display());

        let save_result = result_image.save(&new_file_path);
        if let Err(e) = save_result {
            return Err(format!("Failed to save image: {}", e));
        }
    }

    Ok(result_image)
}

#[tauri::command]
pub fn manipulate_image(file_path: &str, save: bool) -> Result<String, String> {
    match perform_image_manipulation(file_path, save) {
        Ok(result_image) => {
            let path = Path::new(file_path);
            let new_file_path = path
                .with_file_name(format!("{}_copy.jpg", path.file_stem().unwrap().to_str().unwrap()));
            Ok(new_file_path.to_str().unwrap().to_string())
        }
        Err(e) => Err(e.to_string()),
    }

}

