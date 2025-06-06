

function CardImageDefaultTemplateComponent(defaultComponent, componentId, componentType, componentName) {


     defaultComponent = {
      _type: componentType,
      name: "Enter name here",
      title1: "Enter title text",
      title2: "Enter title text",
      title3: "Enter title text",
      description1: "Enter description text",
      description2: "Enter description text",
      description3: "Enter description text here",
      buttonText1: "Enter Button text",
      buttonText2: "Enter Button text",
      buttonText3: "Enter Button text",
      image1:
        "https://www.bibliotheekhelmondpeel.nl/dam/nieuws/2025/website-postzegel-3-klantonderzoek-2025.png.rendition.384.614.png",
      image2:
        "https://www.bibliotheekhelmondpeel.nl/dam/jeugd/Blikkie/citroen-jumper.jpg.rendition.384.614.jpeg",
      image3:
        "https://www.bibliotheekhelmondpeel.nl/dam/campagnes/gezondfinancieelleven/high-angle-financial-elements-arrangement.jpg.rendition.384.614.jpeg",
      styling: JSON.stringify({
        container: {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "40px 140px",
          boxSizing: "border-box",
        },
        cardWrapper: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          maxWidth: "100%",
        },
        card: {
          flex: "1 1 300px",
          maxWidth: "450px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          textAlign: "center",
          padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
        cardImage: {
          borderRadius: "8px",
          height: "200px",
          width: "100%",
          objectFit: "cover",
          marginBottom: "15px",
        },
        cardText: {
          fontSize: "16px",
          color: "#333",
          marginBottom: "auto",
        },
      }),
    };
    return defaultComponent;
}

export default CardImageDefaultTemplateComponent;