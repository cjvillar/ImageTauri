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

  async function convertImageToGrayscale() {
    try {
      if (imgPath) {
        const tempFilePath = await invoke("image_color_command_temp", {
          filePath: imgPath,
        });
        console.log("Temporary Grayscale Image Path:", tempFilePath);

        // Convert the temp file path to a URL and send it back to App
        const grayscaleUrl = convertFileSrc(tempFilePath);
        setImgUrl(grayscaleUrl); // Set grayscale image URL in App
      } else {
        console.error("No image path available for grayscale conversion.");
      }
    } catch (error) {
      console.error("Error converting image to grayscale:", error);
    }
  }

  return (
    <Container className="side-bar" style={{ width: "25%", height: "100vh" }}>
      <Row className="h-100">
        <Col className="d-flex flex-column justify-content-between">
          <div className="flex-grow-1">
            {imgUrl && (
              <div style={{ marginBottom: "10px" }}>
                <img
                  src={imgUrl}
                  alt="Original"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
                <p>Original/Grayscale Image</p>
              </div>
            )}
          </div>
          <div className="d-grid gap-2">
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
            <Button
              variant="secondary"
              size="sm"
              style={{
                whiteSpace: "nowrap",
                padding: "4px 8px",
                textAlign: "center",
                width: "100%",
              }}
              onClick={convertImageToGrayscale}
            >
              Convert to Grayscale
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SideBar;
