import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { convertFileSrc } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [imgPath, setImagePath] = useState("");
  const [imgUrl, setImgUrl] = useState(""); // State to store converted image URL

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

  return (
    <>
      <button className="button" onClick={selectImage}>
        Select JPEG Image From Desktop
      </button>

      {imgUrl && ( // use imgUrl instead of imagePath
        <div className="selected-image-container">
          <h2>Selected Image:</h2>
          <img
            src={imgUrl}
            alt="Selected"
            // style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </>
  );
}

export default App;
