
function ActionBannerDefaultTemplateComponent(defaultComponent, componentId, componentType, componentName) {


      defaultComponent = {
      _type: componentType,
      name: componentName,
      title: "Enter title here",
      description: "Enter description here",
      buttonText: "Enter button text",
      buttonUrl: "/enter-url",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
      styling: JSON.stringify({
        container: {
          backgroundColor: "#fde5d0",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "40px 20px",
          justifyContent: "center",
          alignItems: "center",
        },
        imageContainer: {
          flex: "1 1 400px",
          display: "flex",
          justifyContent: "center",
        },
        textContainer: {
          flex: "1 1 400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 20px",
        },
        imageStyle: {
          borderRadius: "10px",
          width: "100%",
          maxWidth: "500px",
          height: "auto",
          objectFit: "cover",
        },
        titleContainer: {
          fontSize: "2.5rem",
          color: "#39373a",
          lineHeight: "3rem",
          marginBottom: "20px",
        },
        textStyle: {
          fontSize: "1.2rem",
          lineHeight: "1.8rem",
          color: "#333",
          marginBottom: "20px",
          textAlign: "left",
        },
        buttonStyle: {
          maxWidth: "250px",
          alignSelf: "start",
        },
      }),
    };

    return defaultComponent;
}

export default ActionBannerDefaultTemplateComponent;