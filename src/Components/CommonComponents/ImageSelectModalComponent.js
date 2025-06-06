import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ImageSelectModalComponent({
  showImageModal,
  setShowImageModal,
  imageOptions,
  handleImageSelect,
  _id,
  formData,
  component,
  activeImageField
}) {
  const navigate = useNavigate();

  return (
    <Modal
      show={showImageModal}
      onHide={() => setShowImageModal(false)}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Select an Image</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Vertically scrollable, no horizontal scroll */}
        <div style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }}>
          <Row>
            {imageOptions?.length > 0 ? (
              imageOptions.map((img, idx) => (
                <Col xs={4} md={3} className="mb-3" key={idx}>
                  <Image
                    src={img}
                    thumbnail
                    onClick={() =>
                      handleImageSelect(img, _id, formData, component, activeImageField)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              ))
            ) : (
              <p>No images found.</p>
            )}
          </Row>
        </div>

        <div className="mt-3 text-center">
          <Button onClick={() => navigate('/upload')}>Add More Images</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ImageSelectModalComponent;
