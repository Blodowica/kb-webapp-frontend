import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import client from "../../../SanitySetup/sanityClient";

function AddFooterComponent(props) {

    const sections = props.sections;

      const [nameText, setNameText] = useState("");
      const [footerText, setFooterText] = useState("");
      const [footerLink1, setFooterLink1] = useState("");
      const [footerLink2, setFooterLink2] = useState("");
      const [footerLink3, setFooterLink3] = useState("");
      const [bannerLink, setBannerLink] = useState("");


      const handleAddFooterComponent = async (type) => {
        // 1. Fetch the section by type
        const SectionIdByTypeQuery = `*[_type == "section" && type == "${type}"]{..., headerComponents[]->, footerComponents[]->}`;    
        const currentSections = await client.fetch(SectionIdByTypeQuery);  
        const sectionId = currentSections && currentSections.length > 0 ? currentSections[0]._id : null;
        console.log(currentSections);
        
            if(nameText.trim() === "" || bannerLink.trim() === ""  || footerLink1.trim() === "" || footerLink2.trim() === "" || footerLink3.trim() === "")
            {
              console.log("test");
              
              return window.alert('Make sure all the values are filled');
            }
        
        if (!sectionId) {
          console.error("No header section found.");
          return;
        }
      
        // 2. Build the new header component mutation object
    
        //generate random number ID
        const componentUid = uuidv4();    
        
        const transactionPayload = [
          {
              create: {
                _id: componentUid,
                _type: "footerComponent",
                name: nameText,
                bannerImage: bannerLink,
                styling: JSON.stringify({
                  backgroundColor: "#FFD68A",
                  textColor: "#FFFFFF",
                  fontSize: "16px",
                  hoverColor: "#FF9900",
                  padding: "10px 20px"
                }),
                footerLinks: `[{ "label": "${footerLink1}", "url": "/${footerLink1}" },
                  { "label": "${footerLink2}", "url": "/${footerLink2}" },
                  { "label": "${footerLink3}", "url": "/${footerLink3}" }
                ]`
              }
            },
            {
              patch: {
                id: sectionId,
                insert: {
                  after: "footerComponents[-1]",
                  items: [{ _key: componentUid, _type: "reference", _ref: componentUid }]
                }
              }
            }
          ]
        ;
      
    ;
      
        // 5. Send the transaction via client.mutate()
        try {
          const result = await client.mutate(transactionPayload);
          console.log("Transaction successful:", result);
        } catch (error) {
          console.error("Transaction error:", error);
        }
      };


    
    return ( 
    
    <> <h2>Add Footer</h2>
        <form>
          <label htmlFor="nameText">Footer Name</label>
          <input
            type="text"
            id="nameText"
            value={nameText}
            onChange={(e) => setNameText(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
               <label htmlFor="logoText">Footer Text:</label>
          <input
            type="text"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />

          <label htmlFor="logoText">Banner Image:</label>
          <input
            type="text"
            value={bannerLink}
            onChange={(e) => setBannerLink(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />

          <label htmlFor="navLinks">Footer links</label>
          <div style={{ width: "100%" }}>
            <input
              type="text"
              value={footerLink1}
              onChange={(e) => setFooterLink1(e.target.value)}
              required
              style={{ width: "25%", padding: "8px", margin: "10px" }}
            />
            <input
              type="text"
              value={footerLink2}
              onChange={(e) => setFooterLink2(e.target.value)}
              required
              style={{ width: "25%", padding: "8px", margin: "10px" }}
            />
            <input
              type="text"
              value={footerLink3}
              onChange={(e) => setFooterLink3(e.target.value)}
              required
              style={{ width: "23%", padding: "8px", margin: "10px" }}
            />
          </div>

     

          <button
          
          onClick={(e) => { e.preventDefault(); handleAddFooterComponent("footer")}}
            style={{
              background: "#007BFF",
              color: "white",
              padding: "10px 15px",
              border: "none",
              cursor: "pointer",
              
            }}

          >
            Add section
          </button>
        </form>
    
    </> );
}

export default AddFooterComponent;






