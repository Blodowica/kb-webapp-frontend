import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import LayoutControlButtonsComponent from "../../CommonComponents/LayoutControlButtonsComponent";
import ImageSelectModalComponent from "../../CommonComponents/ImageSelectModalComponent";

function ImageCardComponent({
  component,
  editSelectedComponent,
  hoveredComponentId,
  setHoveredComponentId,
  handleImageClick,
  handleImageSelect,
  imageOptions,
  showImageModal,
  setShowImageModal,
  handleUpdateComponent,
  layoutprops,
  showEditView,
  activeImageField,
}) {
  const { _id, styling, ...rest } = component;
  const { setEditSelectedComponent, fetchSection, section, selectedComponentId, setSelectedComponentId } = layoutprops;


  const parsedStyles = JSON.parse(styling);
  const [formData, setFormData] = useState({ ...rest });

  useEffect(() => {
    setFormData({ ...rest });
  }, [component]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };


  const handleToggleEdit = async () => {
    if (editSelectedComponent) {
      await handleUpdateComponent(_id, formData);
    }
    setEditSelectedComponent(!editSelectedComponent);
  };

  const cardIndices = [1, 2, 3];

  return (
    <Row>
      <Col>
        <div style={parsedStyles.container}>
          <div style={parsedStyles.cardWrapper}>
            {cardIndices.map((i = 1) => (
              <div key={i} style={parsedStyles.card}>
                <div
                  style={{
                    ...parsedStyles.imageContainer,
                    position: "relative",
                    cursor: editSelectedComponent ? "pointer" : "default",
                  }}
                  onMouseEnter={() => setHoveredComponentId(_id)}
                  onMouseLeave={() => setHoveredComponentId(null)}
                  onClick={() => handleImageClick(`image${i}`)}
                >
                  <img src={formData[`image${i}`]} alt={`Card ${i}`} style={parsedStyles.cardImage} />
                  {hoveredComponentId === _id && editSelectedComponent && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      Click to change image
                    </div>
                  )}
                </div>

                {editSelectedComponent && selectedComponentId === _id ? (
                  <>
                    <Form.Control
                      type="text"
                      id={`title${i}`}
                      value={formData[`title${i}`]}
                      onChange={handleInputChange}
                    />
                    <Form.Control
                      className="mt-3 mb-3"
                      style={{ resize: "none" }}
                      as="textarea"
                      rows={4}
                      id={`description${i}`}
                      value={formData[`description${i}`]}
                      onChange={handleInputChange}
                    />
                    <Form.Control
                      type="text"
                      id={`buttonText${i}`}
                      value={formData[`buttonText${i}`]}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  <>
                    <h3>{formData[`title${i}`]}</h3>
                    <p style={parsedStyles.cardText}>{formData[`description${i}`]}</p>
                    <Button
                      className="mt-2"
                      size="lg"
                      style={{ outline: "solid", outlineColor: "black", outlineWidth: "4px" }}
                      variant="light"
                    >
                      {formData[`buttonText${i}`]}
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </Col>

      {showEditView && (
        <LayoutControlButtonsComponent
          section={section}
          component={component}
          editSelectedComponent={editSelectedComponent}
          setEditSelectedComponent={handleToggleEdit}
          setSelectedComponentId={setSelectedComponentId}
          fetchSection={fetchSection}
          componentType={"body"}
        />
      )}


    </Row>
  );
}

export default ImageCardComponent;
