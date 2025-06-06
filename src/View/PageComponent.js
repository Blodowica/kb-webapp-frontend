import React, { useState, useEffect } from "react";
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
import { GetAllPageComponents, UpdateComponentQuery } from "../SanitySetup/sanityQueries";
import AddComponentOptionButtons from "../Components/CommonComponents/AddComponentOptionButtons";
import ErrorMessage from "../Components/CommonComponents/ErrorMessageComponent";
import { GetAllImages } from "../API/MediaServiceAPI/MediaServiceAPI";
import ImageSelectModalComponent from "../Components/CommonComponents/ImageSelectModalComponent";

function PageComponent() {
  const [sections, setSections] = useState([]);
  const [showEditView, setShowEditView] = useState(false);
  const [editSelectedComponent, setEditSelectedComponent] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [showOptionsButtons, setShowOptionsButtons] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const [imageOptions, setImageOptions] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [hoveredComponentId, setHoveredComponentId] = useState(null);
  const [activeImageField, setActiveImageField] = useState(null);

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
      const response = await UpdateComponentQuery(componentId, formData);
      console.log(response);
      setErrorMessage(null);
      setSuccessMessage("Component updated successfully!");
      setShowSuccess(true);
      fetchSection();
    } catch (error) {
      console.warn(error);
      setErrorMessage(`Failed to update component: \n ${error.message}`);
      setShowError(true);
    }
  };

  const handleImageClick = (fieldName, componentId) => {
    if(editSelectedComponent)
    {

      setActiveImageField(fieldName);
      setSelectedComponentId(componentId);
      fetchImages();
      setShowImageModal(true);
    }
  };

  const handleImageSelect = (selectedImageUrl) => {
    if (!selectedComponentId || !activeImageField) {
      setShowImageModal(false);
      return;
    }

    let targetComponent = null;
    for (const section of sections) {
      const found = (section.bodyComponents || []).find(
        (c) => c._id === selectedComponentId
      );
      if (found) {
        targetComponent = found;
        break;
      }
    }

    if (!targetComponent) {
      console.warn("No component found for ID:", selectedComponentId);
      setShowImageModal(false);
      return;
    }

    const { _id, styling, _type, ...rest } = targetComponent;
    const newFormData = {
      ...rest,
      [activeImageField]: selectedImageUrl,
    };

    handleUpdateComponent(selectedComponentId, newFormData);
    setShowImageModal(false);
  };

 const getCookie = (name) => {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

 const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const fetchImages = async () => {
  const imagesCookie = getCookie('images');
  let parsedImages = imagesCookie ? JSON.parse(imagesCookie) : null;

  if (parsedImages && parsedImages.length > 0) {
    console.log("Loaded images from cookie:", parsedImages);
    setImageOptions(parsedImages);
    return;
  }

  try {
    const response = await GetAllImages();
    const images = response?.data || [];

    setImageOptions(images);
    setCookie('images', JSON.stringify(images), 7); // Set for 1 week
    console.log("Fetched and cached images:", images);
  } catch (error) {
    console.error("Error fetching images:", error);
    setImageOptions([]);
  }
};


  return (
    <div
      id="pageContainer"
      style={{ display: "flex", flexDirection: "column", overflowX: "hidden" }}
    >
      {showError && errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setShowError(false)}
        />
      )}

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
                        component={component}
                        editSelectedComponent={editSelectedComponent}
                        handleUpdateComponent={handleUpdateComponent}
                        section={section}
                        setEditSelectedComponent={setEditSelectedComponent}
                        showEditView={showEditView}
                        fetchSection={fetchSection}
                        hoveredComponentId={hoveredComponentId}
                        setHoveredComponentId={setHoveredComponentId}
                        handleImageClick={(field) =>
                          handleImageClick(field, component._id)
                        }
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
                        component={component}
                        editSelectedComponent={editSelectedComponent}
                        handleUpdateComponent={handleUpdateComponent}
                        section={section}
                        setEditSelectedComponent={setEditSelectedComponent}
                        showEditView={showEditView}
                        fetchSection={fetchSection}
                        hoveredComponentId={hoveredComponentId}
                        setHoveredComponentId={setHoveredComponentId}
                        handleImageClick={(field) =>
                          handleImageClick(field, component._id)
                        }
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
                      fetchSection={fetchSection}
                      hoveredComponentId={hoveredComponentId}
                      setHoveredComponentId={setHoveredComponentId}
                      handleImageClick={(field) =>
                        handleImageClick(field, component._id)
                      }
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
                    <div
                      id="bookPreviewComponentContainer"
                      key={componentIndex}
                    >
                      <BookPreviewListComponent
                        sections={sections}
                        component={component}
                        editSelectedComponent={editSelectedComponent}
                        handleUpdateComponent={handleUpdateComponent}
                        section={section}
                        setEditSelectedComponent={setEditSelectedComponent}
                        showEditView={showEditView}
                        handleImageClick={(field) =>
                          handleImageClick(field, component._id)
                        }
                        fetchSection={fetchSection}
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

      <ImageSelectModalComponent
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        imageOptions={imageOptions}
        handleImageSelect={(imgUrl) => handleImageSelect(imgUrl)}
        _id={selectedComponentId}
        formData={null}
        component={null}
        activeImageField={activeImageField}
      />
    </div>
  );
}

export default PageComponent;
