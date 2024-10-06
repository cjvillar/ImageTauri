// import React, { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
// import { convertFileSrc } from "@tauri-apps/api/core";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import "../App.css";

// function SideBar({ imgPath, imgUrl, setImagePath, setImgUrl }) {
//   const [selectedValue, setSelectedValue] = useState("");

//   const options = [
//     { value: "JPEG", label: "SAVE AS JPEG" },
//     { value: "PNG", label: "SAVE AS PNG" },
//     { value: "BMP", label: "SAVE AS BMP" },
//   ];

//   async function selectImage() {
//     const result = await invoke("pick_file");
//     if (typeof result === "string") {
//       setImagePath(result); // set image path in App
//       const url = convertFileSrc(result); // convert image path to URL
//       setImgUrl(url); // set image URL in App
//     } else {
//       console.error(result); // handle error if needed
//     }
//   }

//   async function processImage() {
//     try {
//       console.log("Image path to process:", imgPath);
//       console.log("Selected format:", selectedValue);
//       if (imgPath) {
//         const result = await invoke("manipulate_image", {
//           filePath: imgPath,
//           save: true,
//           imgFormat: selectedValue,
//         });
//         console.log("Image processed:", result);
//       } else {
//         console.error("No image path available to process.");
//       }
//     } catch (error) {
//       console.error("Error processing image:", error);
//     }
//   }

//   return (
//     <div className="side-bar">
//       <div className="d-grid gap-2 button-container" >
//         <Button variant="secondary" size="sm" onClick={selectImage}>
//           Select JPEG Image From Desktop
//         </Button>
//         <Form.Select size="sm"
//           value={selectedValue}
//           onChange={(e) => setSelectedValue(e.target.value)}
//         >
//           {options.map((option) => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </Form.Select>
//         <Button variant="secondary" size="sm" onClick={processImage}>
//           Save Copy As {selectedValue}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default SideBar;

import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { convertFileSrc } from "@tauri-apps/api/core";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";

function SideBar({ imgPath, imgUrl, setImagePath, setImgUrl }) {
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    { value: "JPEG", label: "Format: JPEG" },
    { value: "PNG", label: "Format: PNG" },
    { value: "BMP", label: "Format: BMP" },
  ];

  async function selectImage() {
    const result = await invoke("pick_file");
    if (typeof result === "string") {
      setImagePath(result); // set image path in App
      const url = convertFileSrc(result); // convert image path to URL
      setImgUrl(url); // set image URL in App
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
          imgFormat: selectedValue,
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
    <Container className="side-bar" style={{ width: "25%", height: "100vh" }}>
      <Row className="h-100">
        <Col className="d-flex flex-column justify-content-between">
          <div className="flex-grow-1"></div>
          <div className="d-grid gap-2 ">
            <Button
              variant="secondary"
              size="sm"
              style={{
                whiteSpace: "nowrap",
                padding: "4px 8px",
                textAlign: "center",
                width: "100%",
              }}
              onClick={selectImage}
            >
              Select Image
            </Button>
            <Form.Select
              size="sm"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
            <Button
              variant="secondary"
              size="sm"
              style={{
                whiteSpace: "nowrap",
                padding: "4px 8px",
                textAlign: "center",
                width: "100%",
              }}
              onClick={processImage}
            >
              Save {selectedValue}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SideBar;
