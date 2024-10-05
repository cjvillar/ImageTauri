import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { convertFileSrc } from "@tauri-apps/api/core";
import Button from 'react-bootstrap/Button';
import "./App.css";

function App() {
  const [imgPath, setImagePath] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const options = [
    { value: "JPEG", label: "SAVE AS JPEG" },
    { value: "PNG", label: "SAVE AS PNG" },
    { value: "BMP", label: "SAVE AS BMP" },
  ];

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
      console.log("Selected format:", selectedValue);
      if (imgPath) {
        const result = await invoke("manipulate_image", {
          filePath: imgPath,
          save: true,
          imgFormat: selectedValue
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
    <div data-tauri-drag-region>
      <div className="button-container">
        <Button variant="outline-dark" size="sm" onClick={selectImage}>
          Select JPEG Image From Desktop
        </Button>
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Button variant="outline-dark" size="sm" onClick={processImage}>
          Save Copy As {selectedValue}
        </Button>
      </div>

      {imgUrl && ( 
        <div className="selected-image-container">
          <img src={imgUrl} alt="Selected" />
          <p style={{ fontsize: '5px', color: "grey" }}>{imgPath}</p>
        </div>
      )}
    </div>
  );
}

export default App;
