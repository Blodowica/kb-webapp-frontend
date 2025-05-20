import React, { useState } from 'react';



function UpdateFooterFormComponent(props) {

    const client = props.client;

      const [footerText, setFooterText] = useState("");
      const [footerUrl, setFooterUrl] = useState("");

    const  handleSubmit = async (e) =>{
        e.preventDefault(); // Prevent default form submission behavior
    
        console.log("test");
        
        // update CMS footer text and banner query
        const mutationPayload = {
        
              patch: {
                id: "8c977afc-7953-47bd-b614-a179ffaea311",
                set: {
                  footerText: footerText,
                  bannerImage: footerUrl
                }
              }
            
          
        };
          const updateData = await client.mutate(mutationPayload)
          console.log(updateData);
          window.location.reload();
         
      }


    
    return ( <>
    <section
        style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", justifyContent: "center"}}
      >
        <h2>Update Footer</h2>
        <form id="form" onSubmit={handleSubmit}>
          <label htmlFor="footerText">Footer Text:</label>
          <input
            type="text"
            id="footerText"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />

          <label htmlFor="footerUrl">Footer URL:</label>
          <input
            type="text"
            id="footerUrl"
            value={footerUrl}
            onChange={(e) => setFooterUrl(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />

          <button
            type="submit"
            style={{
              background: "#007BFF",
              color: "white",
              padding: "10px 15px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Update Footer
          </button>
        </form>
      </section>
    
    </> );
}

export default UpdateFooterFormComponent;