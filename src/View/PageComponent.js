import React, { useState, useEffect, useCallback } from "react";
import client from "../SanitySetup/sanityClient";
import HeaderComponent from "../Components/LayoutComponents/HeaderComponents/HeaderComponent";
import FooterComponent from "../Components/LayoutComponents/FooterComponents/FooterComponent";
import HeaderBannerComponent from "../Components/LayoutComponents/HeaderComponents/HeaderBannerComponent";
import ImageCardComponent from "../Components/LayoutComponents/BodyComponents/ImageCardComponent";
import BookPreviewListComponent from "../Components/LayoutComponents/BodyComponents/BookPreviewListComponent";
import ActionBannerComponent from "../Components/LayoutComponents/BodyComponents/ActionBannerComponent";
import BannerComponent from "../Components/LayoutComponents/BodyComponents/BannerComponent";
import { Container, Row } from "react-bootstrap";
import AddComponentButton from "../Components/CommonComponents/AddComponentButton";
import {
  GetAllPageComponents,
  UpdateComponentQuery,
} from "../SanitySetup/sanityQueries";

import AddComponentOptionButtons from "../Components/CommonComponents/AddComponentOptionButtons";

function PageComponent() {
  const [sections, setSections] = useState([]);
  const [showEditView, setShowEditView] = useState(false);
  const [editSelectedComponent, setEditSelectedComponent] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [showOptionsButtons, setShowOptionsButtons] = useState(false);
  //get all section data query!
  const query = GetAllPageComponents();

  async function fetchSection() {
    const data = await client.fetch(query);
    setSections(data);
  }
  useEffect(() => {
    fetchSection();
  }, []);

  const handleUpdateComponent = async (componentId, formData) => {
    try {
      var response = await UpdateComponentQuery(componentId, formData);
      console.log(response);
      fetchSection();
    } catch (error) {
      console.warn(error);
    }
  };
  console.log(sections);

  return (
    <div
      id="pageContainer"
      style={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}
    >
      <div id="headerContainer" style={{ paddingBottom: "30px" }}>
        <HeaderComponent
          sections={sections}
          showEditView={showEditView}
          setShowEditView={setShowEditView}
        />
      </div>

      <HeaderBannerComponent
        sections={sections}
        editSelectedComponent={editSelectedComponent}
      />

      {sections
        .filter((section) => section.type === "body")
        .map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            id="sectionComponentsContainer"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {section.bodyComponents?.map((component, componentIndex) => {
              switch (component._type) {
                case "cardImagesComponent":
                  return (
                    <Container key={`imageCard-${componentIndex}`}>
                      <ImageCardComponent
                        key={componentIndex}
                        component={component}
                        editSelectedComponent={editSelectedComponent}
                        handleUpdateComponent={handleUpdateComponent}
                        section={section}
                        setEditSelectedComponent={setEditSelectedComponent}
                        showEditView={showEditView}
                        fetchSection={() => fetchSection()}
                        layoutprops={{
                          section: section,
                          editSelectedComponent: editSelectedComponent,
                          setEditSelectedComponent: setEditSelectedComponent,
                          fetchSection: fetchSection,
                          selectedComponentId: selectedComponentId,
                          setSelectedComponentId: setSelectedComponentId,
                        }}
                      />
                    </Container>
                  );
                case "actionBannerComponent":
                  return (
                    <div
                      id="actionBannerComponentContainer"
                      key={`action-banner-${componentIndex}`}
                      style={{ paddingBottom: "30px" }}
                    >
                      <ActionBannerComponent
                        key={componentIndex}
                        component={component}
                        editSelectedComponent={editSelectedComponent}
                        handleUpdateComponent={handleUpdateComponent}
                        section={section}
                        setEditSelectedComponent={setEditSelectedComponent}
                        showEditView={showEditView}
                        fetchSection={() => fetchSection()}
                        layoutprops={{
                          section: section,
                          editSelectedComponent: editSelectedComponent,
                          setEditSelectedComponent: setEditSelectedComponent,
                          fetchSection: fetchSection,
                          selectedComponentId: selectedComponentId,
                          setSelectedComponentId: setSelectedComponentId,
                        }}
                      />
                    </div>
                  );
                case "bannerComponent":
                  return (
                    <BannerComponent
                      key={componentIndex}
                      component={component}
                      editSelectedComponent={editSelectedComponent}
                      handleUpdateComponent={handleUpdateComponent}
                      section={section}
                      setEditSelectedComponent={setEditSelectedComponent}
                      showEditView={showEditView}
                      fetchSection={() => fetchSection()}
                      layoutprops={{
                        section: section,
                        editSelectedComponent: editSelectedComponent,
                        setEditSelectedComponent: setEditSelectedComponent,
                        fetchSection: fetchSection,
                        selectedComponentId: selectedComponentId,
                        setSelectedComponentId: setSelectedComponentId,
                      }}
                    />
                  );

                case "bookPreviewComponent":
                  return (
                    <div id="bookPreviewComponentContainer" key={componentIndex}>
                      <BookPreviewListComponent
                        sections={sections}
                        key={componentIndex}
                        component={component}
                        editSelectedComponent={editSelectedComponent}
                        handleUpdateComponent={handleUpdateComponent}
                        section={section}
                        setEditSelectedComponent={setEditSelectedComponent}
                        showEditView={showEditView}
                        fetchSection={() => fetchSection()}
                        layoutprops={{
                          section: section,
                          editSelectedComponent: editSelectedComponent,
                          setEditSelectedComponent: setEditSelectedComponent,
                          fetchSection: fetchSection,
                          selectedComponentId: selectedComponentId,
                          setSelectedComponentId: setSelectedComponentId,
                        }}
                      />
                    </div>
                  );
                // Add more cases here for other component types in the future
                default:
                  return null;
              }
            })}
            <div>
              <AddComponentButton
                setShowOptionsButtons={setShowOptionsButtons}
                showOptionsButtons={showOptionsButtons}
              />
            </div>
            <div>
              <Row className="mt-4 mb-4 justify-content-center">
                <AddComponentOptionButtons
                  section={section}
                  fetchSection={fetchSection}
                  showOptionsButtons={showOptionsButtons}
                />
              </Row>
            </div>
          </div>
        ))}

      <FooterComponent sections={sections} />
    </div>
  );
}

export default PageComponent;
