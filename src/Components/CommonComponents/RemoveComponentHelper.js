import client from "../../SanitySetup/sanityClient";

async function RemoveComponentHelper(
  sectionId,
  componentId,
  componentType
) {

  if (!sectionId || !componentId || !componentType) {
    alert("Missing required arguments");
  }

  try {
    const componentField = `${componentType}Components`;

    const section = await client.getDocument(sectionId);
    if (!section || !section[componentField]) {
        alert(`Component array '${componentField}' not found in section`);
    }

    const filteredRefs = section[componentField].filter(
      (ref) => ref._ref !== componentId
    );

    // PATCH the correct field
    await client
      .patch(sectionId)
      .set({ [componentField]: filteredRefs })
      .commit();

    // Delete the component after ref is removed
    const response = await client.delete(componentId);
   } catch (error) {
     alert("Error deleting component:", error);
  }
}

export default RemoveComponentHelper;
