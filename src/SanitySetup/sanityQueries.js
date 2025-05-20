import client from "./sanityClient";
import { v4 as uuidv4 } from "uuid";

function GetSanityQuery() {
  function GetSpecificComponent(componentType) {
    return `*[_type == "${componentType}"]{
      ...
    }`;
  }

  function GetWebsiteWithPages() {
    return `*[_type == "website"]{
      title,
      webpages[]{
        title,
        slug,
        sections[]{
          type,
          components[]{
            ...
          }
        }
      }
    }`;
  }

  return null;
}
function GetAllPageComponents() {
  return `*[_type == "section"]{
    ...,
    headerComponents[]->,
    bodyComponents[]->,
    footerComponents[]->,
    headerBannerComponents[]->
  }`;
}

async function UpdateComponentQuery(id, updatedFields) {
  try {
    const result = await client
      .patch(id) // The _id of the document you want to update
      .set(updatedFields) // Fields you want to update {"title": "title text here", "bannerText": "banner text value here"}
      .commit(); // Commit the changes
    console.log("Update successful:", result);
    return result;
  } catch (error) {
    console.error("Update failed:", error);
  }
}

async function moveUpBodyComponent(
  selectedsectionId,
  componentId,
  arrayFieldName = `bodyComponents`
) {
  if (selectedsectionId === null || componentId === null) {
    console.log("empty values");
    return;
  }
  //Fetch current array
  const section = await client.fetch(
    `*[_type == "section" && _id == $id][0]{_id, ${arrayFieldName}}`,
    { id: selectedsectionId }
  );

  if (!section) {
    throw new Error("Section not found");
  }

  const arr = section[arrayFieldName];
  const index = arr.findIndex((item) => item._ref === componentId);

  if (index <= 0) {
    console.warn("Already at the top or not found");
    return;
  }

  // Swap with the previous item
  const newArr = [...arr];
  [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];

  //Patch the updated array back to Sanity
  await client
    .patch(selectedsectionId)
    .set({ [arrayFieldName]: newArr })
    .commit();

  console.log(`Moved component ${componentId} up in ${arrayFieldName}`);
}

async function moveDownBodyComponent(
  selectedsectionId,
  componentId,
  arrayFieldName = `bodyComponents`
) {
  if (!selectedsectionId || !componentId) {
    console.log("empty values");
    return;
  }

  // Fetch current array
  const section = await client.fetch(
    `*[_type == "section" && _id == $id][0]{_id, ${arrayFieldName}}`,
    { id: selectedsectionId }
  );
  console.log(section);

  if (!section) {
    throw new Error("Section not found");
  }

  const arr = section[arrayFieldName];

  const index = arr.findIndex((item) => item._ref === componentId);
  console.log(index);

  if (index === -1 || index >= arr.length - 1) {
    console.warn("Already at the bottom or not found");
    return;
  }

  // Swap with the next item
  const newArr = [...arr];
  [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];

  // Patch the updated array back to Sanity
  await client
    .patch(selectedsectionId)
    .set({ [arrayFieldName]: newArr })
    .commit();

  console.log(`Moved component ${componentId} down in ${arrayFieldName}`);
}

export async function AddBodyComponent(
  sectionId,
  componentName,
  componentId,
  componentType
) {
  if (!sectionId || !componentName || !componentType || !componentId) {
    console.warn("Missing required values — cannot add component.");
    return;
  }

  console.log(sectionId, componentName, componentType);

  let defaultComponent = null;

  if (componentType == "bannerComponent") {
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
  }

  if (componentType == "actionBannerComponent") {
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
  }

  if (componentType == "cardImagesComponent") {
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
      image1: "https://www.bibliotheekhelmondpeel.nl/dam/nieuws/2025/website-postzegel-3-klantonderzoek-2025.png.rendition.384.614.png",
      image2: "https://www.bibliotheekhelmondpeel.nl/dam/jeugd/Blikkie/citroen-jumper.jpg.rendition.384.614.jpeg",
      image3: "https://www.bibliotheekhelmondpeel.nl/dam/campagnes/gezondfinancieelleven/high-angle-financial-elements-arrangement.jpg.rendition.384.614.jpeg",
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
  }

  if(componentType == "bookPreviewComponent")
  {
      defaultComponent = {
      _type: 'bookPreviewComponent',
      title: 'Enter title here',
      books: [
        {
          _key: 'book1',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          imageUrl: 'https://rijnbrink.hostedwise.nl/cgi-bin/momredir.pl?size=245&lid=2021102123;ppn=432487301;isbn=9789076174181;key=1014645;'
        },
        {
          _key: 'book2',
          title: '1984',
          author: 'George Orwell',
          imageUrl: 'https://leibniz.zbkb.nl/assets/id/PPN%3A443094276?aid=ob-overijssel-lokaal-waas&sid=15&dts=1744161529349&sig=0063574ada1944a80ab3ecf23c7b89cccb05385805adb174935fbe8ee7018ac9&width=165'
        },
        {
          _key: 'book3',
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          imageUrl: 'https://webcat.hostedwise.nl/cgi-bin/momredir.pl?s…239;ppn=443893454;isbn=9789402716740;key=1759452;'
        },
        {
          _key: 'book4',
          title: 'Moby Dick',
          author: 'Herman Melville',
          imageUrl: 'https://leibniz.zbkb.nl/assets/id/PPN%3A443012806?aid=ob-veenendaal-lokaal-waas&sid=15&dts=1744181465721&sig=94d8c10101d381ff5565bcd3c9d2e2012a77dc933796b3d1fb0dc215c4199bb1&width=100'
        },
        {
          _key: 'book5',
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          imageUrl: 'https://leibniz.zbkb.nl/assets/id/PPN%3A443106363?aid=ob-overijssel-lokaal-waas&sid=15&dts=1744161529349&sig=985401a1ada03c70337ad21a31eef6940eeedcfce6984be86575a03c593ac8a2&width=165'
        },
        {
          _key: 'book6',
          title: 'The Catcher in the Rye',
          author: 'J.D. Salinger',
          imageUrl: 'https://leibniz.zbkb.nl/assets/id/PPN%3A443764743?aid=ob-veenendaal-lokaal-waas&sid=15&dts=1744181465721&sig=b30e0ba35772fa8fa9e1db97df69ecbdc19072f2d2f4d252991086019b25de12&width=100'
        },
        {
          _key: 'book7',
          title: 'Jane Eyre',
          author: 'Charlotte Brontë',
          imageUrl: 'https://rijnbrink.hostedwise.nl/cgi-bin/momredir.pl?size=245&lid=2011271324;ppn=330312944;isbn=9789061699811;key=372195;'
        },
        {
          _key: 'book8',
          title: 'Frankenstein',
          author: 'Mary Shelley',
          imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg'
        },
        {
          _key: 'book9',
          title: 'Wuthering Heights',
          author: 'Emily Brontë',
          imageUrl: 'https://rijnbrink.hostedwise.nl/cgi-bin/momredir.pl?size=245&lid=2011271321;ppn=33031291X;isbn=9789061699781;key=372191;'
        },
        {
          _key: 'book10',
          title: 'Brave New World',
          author: 'Aldous Huxley',
          imageUrl: 'https://rijnbrink.hostedwise.nl/cgi-bin/momredir.pl?size=245&lid=1998440171;ppn=440183839;isbn=9789463361729;key=2238716;'
        },
        {
          _key: 'book11',
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg'
        },
        {
          _key: 'book12',
          title: 'Animal Farm',
          author: 'George Orwell',
          imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg'
        }
      ],
      styling: JSON.stringify({
        container: {
          gap: '20px',
          padding: '0 2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          boxSizing: 'border-box'
        },
        bookCard: {
          flex: '1 1 150px',
          maxWidth: '150px',
          margin: '1rem 0',
          textAlign: 'center'
        },
        image: {
          width: '50px',
          height: '150px',
          minWidth: '100px',
          borderRadius: '8px'
        },
        title: {
          marginTop: '0.5rem',
          fontWeight: '600',
          fontSize: '1rem',
          textDecoration: 'none',
          color: '#1a1a1a',
          display: 'block'
        },
        author: {
          fontSize: '0.9rem',
          color: '#666'
        }
      })
    };
  }
  if (defaultComponent != null) {
    const component = await client.create(defaultComponent);

    const patched = await client
      .patch(sectionId)
      .append("bodyComponents", [
        { _key: uuidv4(), _type: "reference", _ref: component._id },
      ])
      .commit();

    return { component, patched };
  }

  console.warn(
    `Something went wrong getting the defualt values of: ${componentName} `
  );
}

// Export individual query functions
export {
  moveUpBodyComponent,
  moveDownBodyComponent,
  GetAllPageComponents,
  UpdateComponentQuery,
};

export default GetSanityQuery;
