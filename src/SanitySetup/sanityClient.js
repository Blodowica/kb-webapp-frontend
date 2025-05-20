import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'wu9fq19n', // Replace with your project ID
  dataset: 'production', // Replace with your dataset name
  apiVersion: 'v2025-04-01', // Use the same API version as your query
  useCdn: false, // `true` if you want fast, cache-enabled queries (not suitable for draft content)
  
  //change this in future it is not safe token is store in bvrowser, move this to the Gateway and add after checking auth0
  token: process.env.REACT_APP_SANITY_TOKEN
});

export default client;
