import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { convertFileSrc } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [message, setName] = useState("");
  const [setImagePath] = useState("");
  const [imgUrl, setImgUrl] = useState(""); // State to store converted image URL

  async function greet() {
    setGreetMsg(await invoke("my_custom_command", { invokeMessage: message }));
  }

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
      <div className="container">
        <h1>ImageTauri</h1>
        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>

        <button className="button" onClick={selectImage}>
          Select JPEG Image
        </button>

        {imgUrl && ( // use imgUrl instead of imagePath
          <div className="selected-image-container">
            <h2>Selected Image:</h2>
            <img
              src={imgUrl} // corrected string interpolation
              alt="Selected"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}

        <p>{greetMsg}</p>
      </div>
    </>
  );
}

export default App;
