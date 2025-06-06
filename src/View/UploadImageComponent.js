import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { GetAllPageComponents } from "../SanitySetup/sanityQueries";
import client from "../SanitySetup/sanityClient";
import HeaderComponent from "../Components/LayoutComponents/HeaderComponents/HeaderComponent";
import { UploadImage } from "../API/MediaServiceAPI/MediaServiceAPI";

function UploadImageComponent() {
  const [sections, setSections] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });

  const fileInputRef = useRef(null);
  const hideEditButton = true;

  const query = GetAllPageComponents();

  useEffect(() => {
    fetchSection();
  }, []);

  async function fetchSection() {
    const data = await client.fetch(query);
    setSections(data);
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNextClick = async (e) => {
    e.stopPropagation();

    if (!selectedFile || selectedFile.size < 0) {
      setToast({
        show: true,
        message: "You must select a proper image to upload!",
        variant: "danger",
      });
      return;
    }

    const albumName = "utrecht-album";

    try {
      const { status, data } = await UploadImage(selectedFile, albumName);

      if (status === 200) {
        setToast({
          show: true,
          message: "Image uploaded successfully!",
          variant: "success",
        });
        setSelectedFile(null);
      } else {
        setToast({
          show: true,
          message: data?.message || "Upload failed. Please try again.",
          variant: "danger",
        });
      }
    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message: "An error occurred during upload.",
        variant: "danger",
      });
    }

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleClearImageRef = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <div>
        <HeaderComponent sections={sections} hideEditButton={hideEditButton} />
      </div>

      <Row className="flex-grow-1 justify-content-center align-items-center text-center">
        <Col xl={6} lg={8} md={10}>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleUploadClick}
            style={{
              border: "2px dashed #999",
              borderRadius: "12px",
              minHeight: "400px",
              width: "100%",
              padding: "60px 40px",
              textAlign: "center",
              backgroundColor: isDragOver ? "#f9f9f9" : "#fff",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "1rem" }}>
              Drag & drop an image here, or click to select one
            </p>

            <Form.Control
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {selectedFile && (
              <p className="mt-3 text-success">
                Selected file: {selectedFile.name}{" "}
                <span onClick={handleClearImageRef} style={{ color: "red", cursor: "pointer" }}>
                  ×
                </span>
              </p>
            )}

            <div
              className="d-flex justify-content-center mt-4 gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="secondary" size="lg" onClick={handleUploadClick}>
                Choose File
              </Button>
              {selectedFile && (
                <Button variant="primary" size="lg" onClick={handleNextClick}>
                  Upload
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <ToastContainer position="top-center" className="p-3">
        <Toast bg={toast.variant} show={toast.show} onClose={() => setToast({ ...toast, show: false })} delay={3000} autohide>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default UploadImageComponent;
