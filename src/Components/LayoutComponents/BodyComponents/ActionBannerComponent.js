import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import LayoutControlButtonsComponent from "../../CommonComponents/LayoutControlButtonsComponent";

function ActionBannerComponent({
  component,
  editSelectedComponent,
  handleUpdateComponent,
  layoutprops,
  showEditView,
}) {
  const { _id, title, description, buttonText, buttonUrl } = component;
  const {
    section,
    fetchSection,
    setEditSelectedComponent,
    setSelectedComponentId,
    selectedComponentId,
  } = layoutprops;

  const styling = JSON.parse(component.styling);

  const [formData, setFormData] = useState({
    title,
    description,
    buttonText,
    buttonUrl,
  });

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (editSelectedComponent && !initialLoad) {
      setFormData({
        title,
        description,
        buttonText,
        buttonUrl,
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

      var result = await handleUpdateComponent(_id, formData);
      console.log(result);

      fetchSection();
    }
    setEditSelectedComponent(!editSelectedComponent);
  };
 
  return (
    <Row className="actionBannerComponent" data-testid={component._type}>
      <Col id="actionbannerComponentCard">
        <div style={styling.container}>
          <div style={styling.imageContainer}>
            <img
              src={component.image}
              alt="Action banner image"
              style={styling.imageStyle}
            />
          </div>
          <div style={styling.textContainer}>
            {editSelectedComponent && selectedComponentId === component._id ? (
              <Form.Control
                type="text"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            ) : (
              <h2 id="actionBannerTitleText" style={styling.titleContainer}>{component.title}</h2>
            )}

            {editSelectedComponent && selectedComponentId === component._id ? (
              <Form.Control
                className="mt-3 mb-3"
                style={{ resize: "none" }}
                as="textarea"
                rows={4}
                id="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            ) : (
              <>
                <p id="actionBannerDescriptionText" style={styling.textStyle}>{component.description}</p>
              </>
            )}
            {editSelectedComponent && selectedComponentId === component._id ? (
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    id="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    value={formData.buttonUrl}
                    onChange={handleInputChange}
                    id="buttonUrl"
                   >
                    <option>Open this select menu</option>
                    <option value="home">Home</option>
                    <option value="search">Search</option>
                    <option value="agenda">Agenda</option>
                  </Form.Select>
                </Col>
              </Row>
            ) : (
              <Button style={styling.buttonStyle} id="actionBannerButtonText">
                {component.buttonText}
              </Button>
            )}
          </div>
        </div>
      </Col>
      {showEditView ? (
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
      ) : null}
    </Row>
  );
}

export default ActionBannerComponent;
