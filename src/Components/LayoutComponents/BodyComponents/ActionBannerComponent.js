import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import LayoutControlButtonsComponent from "../../CommonComponents/LayoutControlButtonsComponent";
import ImageSelectModalComponent from "../../CommonComponents/ImageSelectModalComponent";

function ActionBannerComponent({
  component,
  editSelectedComponent,
  handleUpdateComponent,
  hoveredComponentId,
  setHoveredComponentId,
  handleImageClick,
  handleImageSelect,
  imageOptions,
  showImageModal,
  layoutprops,
  showEditView,
  setShowImageModal,
  activeImageField
}) {
  const { _id, title, description, buttonText, buttonUrl, image, styling } = component;
  const {
    section,
    fetchSection,
    setEditSelectedComponent,
    setSelectedComponentId,
    selectedComponentId,
  } = layoutprops;

  const parsedStyles = JSON.parse(styling);
  const [formData, setFormData] = useState({ title, description, buttonText, buttonUrl });

  useEffect(() => {
    setFormData({ title, description, buttonText, buttonUrl });
  }, [component]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleToggleEdit = async () => {
    if (editSelectedComponent) {
      await handleUpdateComponent(_id, formData);
      fetchSection();
    }
    setEditSelectedComponent(!editSelectedComponent);
  };

  return (
    <>
      <Row className="actionBannerComponent" data-testid={component._type}>
        <Col id="actionbannerComponentCard">
          <div style={parsedStyles.container}>
            <div
              style={{
                ...parsedStyles.imageContainer,
                position: "relative",
                cursor: editSelectedComponent ? "pointer" : "default",
              }}
              onMouseEnter={() => setHoveredComponentId(_id)}
              onMouseLeave={() => setHoveredComponentId(null)}
              onClick={() => handleImageClick("image")}
            >
              <img src={image} alt="Action banner" style={parsedStyles.imageStyle} />
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

            <div style={parsedStyles.textContainer}>
              {editSelectedComponent && selectedComponentId === _id ? (
                <>
                  <Form.Control id="title" value={formData.title} onChange={handleInputChange} />
                  <Form.Control
                    className="mt-3 mb-3"
                    style={{ resize: "none" }}
                    as="textarea"
                    rows={4}
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  <Row>
                    <Col>
                      <Form.Control id="buttonText" value={formData.buttonText} onChange={handleInputChange} />
                    </Col>
                    <Col>
                      <Form.Select id="buttonUrl" value={formData.buttonUrl} onChange={handleInputChange}>
                        <option value="">Select destination</option>
                        <option value="home">Home</option>
                        <option value="search">Search</option>
                        <option value="agenda">Agenda</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <h2 style={parsedStyles.titleContainer}>{title}</h2>
                  <p style={parsedStyles.textStyle}>{description}</p>
                  <Button style={parsedStyles.buttonStyle}>{buttonText}</Button>
                </>
              )}
            </div>
          </div>
        </Col>

        {showEditView && (
          <LayoutControlButtonsComponent
            section={section}
            component={component}
            editSelectedComponent={editSelectedComponent}
            setEditSelectedComponent={handleToggleEdit}
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            fetchSection={fetchSection}
            componentType={"body"}
          />
        )}
      </Row>

      <ImageSelectModalComponent
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        imageOptions={imageOptions}
        handleImageSelect={handleImageSelect}
        _id={_id}
        formData={formData}
        component={component}
        activeImageField={activeImageField}
      />
    </>
  );
}

export default ActionBannerComponent;
