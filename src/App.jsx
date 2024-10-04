import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { convertFileSrc } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [imgPath, setImagePath] = useState("");
  const [imgUrl, setImgUrl] = useState(""); 

  async function selectImage() {
    const result = await invoke("pick_file");
    if (typeof result === "string") {
      setImagePath(result); // set image path
      const url = convertFileSrc(result); // convert image path to URL
      setImgUrl(url); // store the image URL
    } else {
      console.error(result); // handle error if needed
    }
  }

  async function processImage() {
    try {
      console.log("Image path to process:", imgPath);
      if (imgPath) {
        const result = await invoke("manipulate_image", {
          filePath: imgPath,
          save: true,
        });
        console.log("Image processed:", result);
      } else {
        console.error("No image path available to process.");
      }
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }

  return (
    <>
      <div className="button-container">
        <button className="button" onClick={selectImage}>
          Select JPEG Image From Desktop
        </button>
        <button className="button" onClick={processImage}>
          Process Image
        </button>
      </div>

      {imgUrl && ( // use imgUrl instead of imagePath
        <div className="selected-image-container">
          <h2>Selected Image:</h2>
          <img src={imgUrl} alt="Selected" />
        </div>
      )}
    </>
  );
}

export default App;
