import React from "react";
import { Button, Col } from "react-bootstrap";
import { BsImageFill } from "react-icons/bs";
import { FaBookOpen, FaImage } from "react-icons/fa";
import { PiSelectionBackgroundFill } from "react-icons/pi";
import { AddBodyComponent } from "../../SanitySetup/sanityQueries";
import { v4 as uuidv4 } from "uuid";

function AddComponentOptionButtons({
  section,
  fetchSection,
  showOptionsButtons,
}) {
  const AddComponentToSanity = async (componentType) => {
    try {
      const componentId = uuidv4();
      const name = `${section._id}-${componentId}`;

      await AddBodyComponent(section._id, name, componentId, componentType);

      fetchSection();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showOptionsButtons ? (
        <>
          <Col lg={{ span: 2, offset: 1 }} className="mx-2">
            <Button
              id="AddCardComponentButton"
              variant="light"
              className="w-100 h-100 p-3 rounded border border-dark shadow-sm d-flex flex-column align-items-center justify-content-center"
              onClick={() => AddComponentToSanity("cardImagesComponent")}
            >
              <p className="fw-bold mb-2">Add Card Component</p>
              <FaImage size={80} color="orange" />
            </Button>
          </Col>

          <Col lg={2} className="mx-2">
            <Button
              id="AddActionBannerComponentButton"
              variant="light"
              className="w-100 h-100 p-3 rounded border border-dark shadow-sm d-flex flex-column align-items-center justify-content-center"
              onClick={() => AddComponentToSanity("actionBannerComponent")}
            >
              <p className="fw-bold mb-2">Add Action Banner</p>
              <PiSelectionBackgroundFill size={100} color="orange" />
            </Button>
          </Col>

          <Col lg={2} className="mx-2">
            <Button
              variant="light"
              className="w-100 h-100 p-3 rounded border border-dark shadow-sm d-flex flex-column align-items-center justify-content-center"
              onClick={() => AddComponentToSanity("bookPreviewComponent")}
            >
              <p className="fw-bold mb-2">Add Book Preview</p>
              <FaBookOpen size={100} color="orange" />
            </Button>
          </Col>

          <Col lg={{ span: 2, offset: -1 }} className="mx-2">
            <Button
              onClick={() => AddComponentToSanity("bannerComponent")}
              variant="light"
              className="w-100 h-100 p-3 rounded border border-dark shadow-sm d-flex flex-column align-items-center justify-content-center"
            >
              <p className="fw-bold mb-2">Add Banner</p>
              <BsImageFill size={100} color="orange" />
            </Button>
          </Col>
        </>
      ) : null}
    </>
  );
}

export default AddComponentOptionButtons;
