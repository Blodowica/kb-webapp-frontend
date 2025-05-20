import React from "react";
import { Button, Col } from "react-bootstrap";
 
function HeaderBannerComponent({ sections, editSelectedComponent }) {
     
  return (
    <>
      {sections
        .filter((section) => section.type === "header")
        .flatMap((section, sectionIndex) =>
          section.headerBannerComponents?.map((component, compIndex) => {
            const styles = component.styling
              ? JSON.parse(component.styling)
              : {};
 

            return (
              <div
              id="headerBannerContainer"
                key={`${sectionIndex}-${compIndex}`}
                style={{
                  display: styles.display || "flex",
                  justifyContent: styles.justifyContent || "center",
                  alignItems: styles.alignItems || "center",
                  marginBottom: "2rem",
                }}
              >
                <Col className="justify-content-center d-flex">
                  <div style={{ ...styles.bannerStyle }}>
                    <img
                      src={component.bannerImage}
                      alt={component.bannerTitle || "Banner"}
                      style={{ ...styles.imageStyle }}
                    />
                    <div style={{ ...styles.cardStyle }}>
                      <h1 style={{ ...styles.titleStyle }}>
                        {component.bannerTitle}
                      </h1>
                      <h2 style={{ ...styles.descriptionStyle }}>
                        {component.bannerText}
                      </h2>
                      <div style={{ ...styles.cardButtonStyle }}>
                        <Button size="lg" variant="light">
                          {component.bannerButtonText || "Lees meer →"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* <Col lg={1}>
                  <Button className="m-3" variant="success">
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      RemoveComponentHelper({
                        sectionId: section._id,
                        componentId: component._id,
                        componentReference: componentReference,
                      })
                    }
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Col> */}
              </div>
            );
          })
        )}
    </>
  );
}

export default HeaderBannerComponent;
