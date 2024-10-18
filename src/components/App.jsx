import React, { useState } from "react";
import SideBar from "./SideBar";
import "../App.css";

function App() {
  const [imgPath, setImagePath] = useState(""); // state to store image path
  const [imgUrl, setImgUrl] = useState(""); // state to store image URL

  return (
    <div className="app-container">
      {/* Sidebar */}
      <SideBar
        imgPath={imgPath}
        imgUrl={imgUrl}
        setImagePath={setImagePath}
        setImgUrl={setImgUrl} // this will be called to update the displayed image
      />

      {/* Image display */}
      <div className="main-content">
        {imgUrl ? (
          <div className="selected-image-container">
            <img src={imgUrl} alt="Selected" />
            <p style={{ fontSize: "12px", color: "grey" }}>{imgPath}</p>
          </div>
        ) : (
          <p>Select an image from the sidebar to display it here.</p>
        )}
      </div>
    </div>
  );
}

export default App;
