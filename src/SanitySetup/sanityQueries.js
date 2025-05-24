import ActionBannerDefaultTemplateComponent from "../Components/DefaultComoponentTemplates/ActionBannerDefaultTemplateComponent";
import BannerDefaultTemplateComponent from "../Components/DefaultComoponentTemplates/BannerDefaultTemplateComponent";
import BookPreviewDefaultTemplateComponent from "../Components/DefaultComoponentTemplates/BookPreviewDefaultTemplateComponent";
import CardImageDefaultTemplateComponent from "../Components/DefaultComoponentTemplates/CardImageDefaultTemplateComponent";
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
    throw error;
  }
}

async function moveUpBodyComponent(
  selectedsectionId,
  componentId,
  arrayFieldName = `bodyComponents`
) {
  try {
    if (selectedsectionId === null || componentId === null) {
      throw new Error("Section or Component id not provided");
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
      throw new Error("Already at the top or not found");
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
  } catch (error) {
    throw error;
  }
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
    throw new Error("Missing required values — cannot add component.");
  }

  let defaultComponent = null;

  if (componentType == "bannerComponent") {
    defaultComponent = BannerDefaultTemplateComponent(
      defaultComponent,
      componentId,
      componentType,
      componentName
    );
  } else if (componentType == "actionBannerComponent") {
    defaultComponent = ActionBannerDefaultTemplateComponent(
      defaultComponent,
      componentId,
      componentType,
      componentName
    );
  } else if (componentType == "cardImagesComponent") {
    defaultComponent = CardImageDefaultTemplateComponent(
      defaultComponent,
      componentId,
      componentType,
      componentName
    );
  } else if (componentType == "bookPreviewComponent") {
    defaultComponent = BookPreviewDefaultTemplateComponent(
      defaultComponent,
      componentId,
      componentType,
      componentName
    );
  } else if (defaultComponent != null) {
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
  throw new Error("Something went wrong adding the component!");
}

// Export individual query functions
export {
  moveUpBodyComponent,
  moveDownBodyComponent,
  GetAllPageComponents,
  UpdateComponentQuery,
};

export default GetSanityQuery;
