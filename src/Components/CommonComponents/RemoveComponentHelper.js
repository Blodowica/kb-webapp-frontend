import client from "../../SanitySetup/sanityClient";

async function RemoveComponentHelper(
  sectionId,
  componentId,
  componentReference, // <- You can remove this param if not used
  componentType
) {

  console.log(sectionId);
  console.log(componentId);
  console.log(componentType);
  


  
  if (!sectionId || !componentId || !componentType) {
    console.error("Missing required arguments");
    return;
  }

  try {
    const componentField = `${componentType}Components`;

    const section = await client.getDocument(sectionId);
    if (!section || !section[componentField]) {
      console.warn(`Component array '${componentField}' not found in section`);
      return;
    }

    const filteredRefs = section[componentField].filter(
      (ref) => ref._ref !== componentId
    );

    // PATCH the correct field
    await client
      .patch(sectionId)
      .set({ [componentField]: filteredRefs })
      .commit();

    console.log(`Removed reference to component ${componentId} from ${componentField}`);

    // Delete the component after ref is removed
    const response = await client.delete(componentId);
    console.log(`Component ${componentId} deleted successfully`, response);
  } catch (error) {
    console.error("Error deleting component:", error);
    return error;
  }
}

export default RemoveComponentHelper;
