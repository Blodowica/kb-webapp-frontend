import React from "react";
import { v4 as uuidv4 } from "uuid";


function BannerDefaultTemplateComponent(defaultComponent, componentId, componentType, componentName) {
  defaultComponent = {
    _id: componentId || uuidv4(),
    _type: componentType,
    name: componentName,
    bannerTitle: "Enter title here",
    bannerText: "Enter description here",
    bannerText: "Enter banner text here",
    bannerTitle: "Enter banner title here",
    bannerButtonText: "Enter button text →",
    buttonText: "Enter button text →",
    bannerImage:
      "https://www.bibliotheekhelmondpeel.nl/dam/agenda/jeugdactiviteiten/2025/voorlezen---banner.jpg.rendition.792.1267.jpeg",
    styling: JSON.stringify({
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      bannerStyle: {
        display: "flex",
        width: "80%",
        backgroundPosition: "center",
        borderRadius: "30px",
        position: "relative",
      },
      imageStyle: {
        borderRadius: "30px",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        minWidth: "400px",
        minHeight: "400px",
        maxHeight: "450px",
      },
      cardStyle: {
        position: "absolute",
        top: "20px",
        left: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        minWidth: "550px",
        minHeight: "300px",
        maxWidth: "600px",
        maxHeight: "400px",
      },
      titleStyle: {
        fontSize: "30px",
        color: "#333",
        marginBottom: "15px",
        textAlign: "start",
      },
      descriptionStyle: {
        fontSize: "20px",
        color: "#555",
        textAlign: "start",
        paddingTop: "30px",
      },
      cardButtonStyle: {
        bottom: "50px",
        alignSelf: "end",
        display: "flex",
        position: "absolute",
      },
    }),
  };

  return defaultComponent;
}

export default BannerDefaultTemplateComponent;
