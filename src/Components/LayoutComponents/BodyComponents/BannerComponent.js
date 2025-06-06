import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import LayoutControlButtonsComponent from "../../CommonComponents/LayoutControlButtonsComponent";

function BannerComponent({
  component,
  editSelectedComponent,
  handleUpdateComponent,
  layoutprops,
  showEditView,
  handleImageClick,
  hoveredComponentId,
  setHoveredComponentId,
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
      await handleUpdateComponent(_id, formData);
    }
    setEditSelectedComponent(!editSelectedComponent);
  };

  const openImageModal = () => {
    if (editSelectedComponent && selectedComponentId === component._id) {
      handleImageClick("bannerImage", _id);
    }
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
            <div
              style={{
                width: "100%",
                maxWidth: "1200px",
                padding: "0 2rem",
                ...parsedStyle.bannerStyle,
              }}
            >
              <div
                onMouseEnter={() => setHoveredComponentId(_id)}
                onMouseLeave={() => setHoveredComponentId(null)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  height: "500px",
                }}
              >
                <img
                  src={bannerImage}
                  alt={bannerTitle || "Banner"}
                  onClick={openImageModal}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    backgroundRepeat: "no-repeat",
                    cursor:
                      editSelectedComponent &&
                      selectedComponentId === component._id
                        ? "pointer"
                        : "default",
                    ...parsedStyle.imageStyle,
                  }}
                />
                {hoveredComponentId === _id && editSelectedComponent && (
                  <div
                    onClick={openImageModal}
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
                      cursor: "pointer",
                    }}
                  >
                    Click to change image
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "10px",
                    right: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px",
                    width: "calc(100% - 20px)",
                    maxWidth: "600px",
                    maxHeight: "400px",
                    boxSizing: "border-box",
                    overflowY: "auto",
                  }}
                >
                  {editSelectedComponent &&
                  selectedComponentId === component._id ? (
                    <>
                      <Form.Control
                        type="text"
                        id="bannerTitle"
                        value={formData.bannerTitle}
                        onChange={handleInputChange}
                        style={{ fontSize: "30px", marginBottom: "15px" }}
                      />
                      <Form.Control
                        className="mt-2"
                        as="textarea"
                        rows={4}
                        id="bannerText"
                        value={formData.bannerText}
                        onChange={handleInputChange}
                        style={{
                          fontSize: "20px",
                          paddingTop: "30px",
                          resize: "none",
                          marginBottom: "15px",
                        }}
                      />
                      <Form.Control
                        type="text"
                        id="bannerButtonText"
                        value={formData.bannerButtonText}
                        onChange={handleInputChange}
                        style={{ marginTop: "15px" }}
                      />
                    </>
                  ) : (
                    <>
                      <h1
                        style={{
                          fontSize: "30px",
                          color: "rgb(51, 51, 51)",
                          marginBottom: "15px",
                          textAlign: "start",
                        }}
                      >
                        {bannerTitle}
                      </h1>
                      <h2
                        style={{
                          fontSize: "20px",
                          color: "rgb(85, 85, 85)",
                          textAlign: "start",
                          paddingTop: "30px",
                          marginBottom: "20px",
                        }}
                      >
                        {bannerText}
                      </h2>
                      <div style={{ textAlign: "start", paddingBottom: "10px" }}>
                        <button
                          type="button"
                          className="btn btn-light btn-lg"
                        >
                          {bannerButtonText || "Bekijk data here"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
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
        </div>
      </Col>
    </Row>
  );
}

export default BannerComponent;
