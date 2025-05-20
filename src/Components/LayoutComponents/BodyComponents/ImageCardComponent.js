import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import LayoutControlButtonsComponent from "../../CommonComponents/LayoutControlButtonsComponent";

function ImageCardComponent({
  component,
  editSelectedComponent,

  handleUpdateComponent,
  layoutprops,
  showEditView,
}) {
 
  const {
    _id,
    styling,
    buttonText1,
    buttonText2,
    buttonText3,
    buttonUrl1,
    buttonUrl2,
    buttonUrl3,
    description1,
    description2,
    description3,
    image1,
    image2,
    image3,
    title1,
    title2,
    title3,
  } = component;
  const {
    setEditSelectedComponent,
    fetchSection,
    section,
    selectedComponentId,

    setSelectedComponentId,
  } = layoutprops;
  const cardstyles = JSON.parse(styling);

  const [formData, setFormData] = useState({
    buttonText1,
    buttonText2,
    buttonText3,
    buttonUrl1,
    buttonUrl2,
    buttonUrl3,
    description1,
    description2,
    description3,
    image1,
    image2,
    image3,
    title1,
    title2,
    title3,
  });

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (editSelectedComponent && !initialLoad) {
      setFormData({
        buttonText1,
        buttonText2,
        buttonText3,
        buttonUrl1,
        buttonUrl2,
        buttonUrl3,
        description1,
        description2,
        description3,
        image1,
        image2,
        image3,
        title1,
        title2,
        title3,
      });
    }
    setInitialLoad(false);
  }, [editSelectedComponent]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleToggleEdit = async () => {
    if (editSelectedComponent) {
      // User clicked to *leave* edit mode --> SAVE
      await handleUpdateComponent(_id, formData);
    }
    setEditSelectedComponent(!editSelectedComponent);
  };

  return (
    <Row>
      <Col>
        {/* Image cards 3 with text here  */}
        <div style={cardstyles.container}>
          <div style={cardstyles.cardWrapper}>
            {/* Card 1 */}
            <div style={cardstyles.card}>
              <img src={image1} alt="Card 1" style={cardstyles.cardImage} />

              {editSelectedComponent &&
              selectedComponentId === component._id ? (
                <Form.Control
                  type="text"
                  id="title1"
                  value={formData.title1}
                  onChange={handleInputChange}
                />
              ) : (
                <h3>{title1}</h3>
              )}

              {editSelectedComponent &&
              selectedComponentId === component._id ? (
                <Form.Control
                  className="mt-3 mb-3"
                  style={{ resize: "none" }}
                  as="textarea"
                  rows={4}
                  id="description1"
                  value={formData.description1}
                  onChange={handleInputChange}
                />
              ) : (
                <p style={cardstyles.cardText}>{description1}</p>
              )}

              {editSelectedComponent &&
              selectedComponentId === component._id ? (
                <Form.Control
                  type="text"
                  id="buttonText1"
                  value={formData.buttonText1}
                  onChange={handleInputChange}
                />
              ) : (
                <Button
                  className="mt-2"
                  size="lg"
                  style={{
                    outline: "solid",
                    outlineColor: "black",
                    outlineWidth: "4px",
                  }}
                  variant="light"
                >
                  {buttonText1}
                </Button>
              )}
            </div>

            {/* Card 2 */}
            <div style={cardstyles.card}>
              <img src={image2} alt="Card 2" style={cardstyles.cardImage} />

              {editSelectedComponent &&
              selectedComponentId === component._id ? (
                <Form.Control
                  type="text"
                  id="title2"
                  value={formData.title2}
                  onChange={handleInputChange}
                />
              ) : (
                <h3> {title2}</h3>
              )}

              {editSelectedComponent &&
              selectedComponentId === component._id ? (
                <Form.Control
                  className="mt-3 mb-3"
                  style={{ resize: "none" }}
                  as="textarea"
                  rows={4}
                  id="description2"
                  value={formData.description2}
                  onChange={handleInputChange}
                />
              ) : (
                <p style={cardstyles.cardText}>{description2}</p>
              )}

              {editSelectedComponent &&
              selectedComponentId === component._id ? (
                <Form.Control
                  type="text"
                  id="buttonText2"
                  value={formData.buttonText2}
                  onChange={handleInputChange}
                />
              ) : (
                <Button
                  className="mt-2"
                  size="lg"
                  style={{
                    outline: "solid",
                    outlineColor: "black",
                    outlineWidth: "4px",
                  }}
                  variant="light"
                >
                  {buttonText2}
                </Button>
              )}
            </div>

            {/* Card 3 */}
            <div style={cardstyles.card}>
              <img src={image3} alt="Card 3" style={cardstyles.cardImage} />

              {editSelectedComponent &&
              selectedComponentId === component._id ? (
                <Form.Control
                  type="text"
                  id="title3"
                  value={formData.title3}
                  onChange={handleInputChange}
                />
              ) : (
                <h3> {title3}</h3>
              )}
              {editSelectedComponent &&
              selectedComponentId === component._id ? (
                <Form.Control
                  className="mt-3 mb-3"
                  style={{ resize: "none" }}
                  as="textarea"
                  rows={4}
                  id="description3"
                  value={formData.description3}
                  onChange={handleInputChange}
                />
              ) : (
                <p style={cardstyles.cardText}>{description3}</p>
              )}

              {editSelectedComponent &&
              selectedComponentId === component._id ? (
                <Form.Control
                  type="text"
                  id="buttonText3"
                  value={formData.buttonText3}
                  onChange={handleInputChange}
                />
              ) : (
                <Button
                  className="mt-2"
                  size="lg"
                  style={{
                    outline: "solid",
                    outlineColor: "black",
                    outlineWidth: "4px",
                  }}
                  variant="light"
                >
                  {buttonText3}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Col>
      {showEditView ? (
        <LayoutControlButtonsComponent
          section={section}
          component={component}
          editSelectedComponent={editSelectedComponent}
          setEditSelectedComponent={handleToggleEdit}
          setSelectedComponentId={setSelectedComponentId}
          fetchSection={fetchSection}
          componentType={"body"}
        />
      ) : null}
    </Row>
  );
}

export default ImageCardComponent;
