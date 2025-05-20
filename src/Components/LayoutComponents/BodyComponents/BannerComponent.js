import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import LayoutControlButtonsComponent from "../../CommonComponents/LayoutControlButtonsComponent";

function BannerComponent({
  component,
  editSelectedComponent,
  handleUpdateComponent,
  layoutprops,
  showEditView,
}) {
  const {
    _id,
    key,
    bannerButtonText,
    bannerImage,
    bannerText,
    bannerTitle,
    styling,
  } = component;

  
  
  const {
    setEditSelectedComponent,
    fetchSection,
    section,
    selectedComponentId,
    setSelectedComponentId,
    
  } = layoutprops;

   
   const parsedStyle = JSON.parse(styling);

  const [formData, setFormData] = useState({
    bannerTitle,
    bannerText,
    bannerButtonText,
  });

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (editSelectedComponent && !initialLoad) {
      setFormData({
        bannerTitle,
        bannerText,
        bannerButtonText,
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
    <Row key={_id} id="bannerComponentContainer">
      <Col key={key}>
        <div
          style={{
            display: parsedStyle.display || "flex",
            justifyContent: parsedStyle.justifyContent || "center",
            alignItems: parsedStyle.alignItems || "center",
            marginBottom: "2rem",
          }}
        >
          <Col className="justify-content-center d-flex">
            <div style={{ ...parsedStyle.bannerStyle }}>
              <img
                src={bannerImage}
                alt={bannerTitle || "Banner"}
                style={{ ...parsedStyle.imageStyle }}
              />
              <div style={{ ...parsedStyle.cardStyle }}>
                {editSelectedComponent && selectedComponentId === component._id ? (
                  <Form.Control
                    type="text"
                    id="bannerTitle"
                    value={formData.bannerTitle}
                    onChange={handleInputChange}
                  />
                ) : (
                  <h1 style={{ ...parsedStyle.titleStyle }}>{bannerTitle}</h1>
                )}
                {editSelectedComponent && selectedComponentId === component._id ? (
                  <Form.Control
                    className="mt-3"
                    style={{ resize: "none" }}
                    as="textarea"
                    rows={4}
                    id="bannerText"
                    value={formData.bannerText}
                    onChange={handleInputChange}
                  />
                ) : (
                  <h2 style={{ ...parsedStyle.descriptionStyle }}>
                    {bannerText}
                  </h2>
                )}
                {editSelectedComponent && selectedComponentId === component._id  ? (
                  <Form.Control
                    className="mt-4"
                    type="text"
                    id="bannerButtonText"
                    value={formData.bannerButtonText}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div style={{ ...parsedStyle.cardButtonStyle }}>
                    <Button size="lg" variant="light">
                      {bannerButtonText || "Lees meer →"}
                    </Button>
                  </div>
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
              setSelectedComponentId={setSelectedComponentId}
              fetchSection={fetchSection}
              componentType={"body"}

            />
          ) : null}
        </div>
      </Col>
    </Row>
  );
}

export default BannerComponent;
