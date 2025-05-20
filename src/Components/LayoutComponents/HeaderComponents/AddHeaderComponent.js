import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import client from "../../../SanitySetup/sanityClient";


function AddHeaderComponent(props) {


      const [nameText, setNameText] = useState("");
      const [logoText, setLogoText] = useState("");
      const [navLink1, setNavlink1] = useState("");
      const [navLink2, setNavlink2] = useState("");
      const [navLink3, setNavlink3] = useState("");


    const handleAddHeaderSection = async (type) => {
        // 1. Fetch the section by type
        const SectionIdByTypeQuery = `*[_type == "section" && type == "${type}"]{..., headerComponents[]->, footerComponents[]->}`;    
        const currentSections = await client.fetch(SectionIdByTypeQuery);  
        const sectionId = currentSections && currentSections.length > 0 ? currentSections[0]._id : null;
        console.log(currentSections);
        
            if(nameText.trim() === "" || logoText.trim() === ""  || navLink1.trim() === "" || navLink2.trim() === "" || navLink3.trim() === "")
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
                _type: "headerComponent",
                name: nameText,
                logotext: logoText,
                styling: JSON.stringify({
                  backgroundColor: "#333333",
                  textColor: "#FFFFFF",
                  fontSize: "16px",
                  hoverColor: "#FF9900",
                  padding: "10px 20px"
                }),
                navlinks: `[
                  { "label": "${navLink1}", "url": "/${navLink1}" },
                  { "label": "${navLink2}", "url": "/${navLink2}" },
                  { "label": "${navLink3}", "url": "/${navLink3}" }
                ]`
              }
            },
            {
              patch: {
                id: sectionId,
                insert: {
                  after: "headerComponents[-1]",
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

    return ( <>
    <h2>Add Navbar</h2>
          <form>
            <label htmlFor="nameText">Section Name</label>
            <input
              type="text"
              id="nameText"
              value={nameText}
              onChange={(e) => setNameText(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            />

            <label htmlFor="logoText">Logo text:</label>
            <input
              type="text"
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", margin: "5px 0" }}
            />

            <label htmlFor="navLinks">Header links</label>
            <div style={{ width: "100%" }}>
              <input
                type="text"
                value={navLink1}
                onChange={(e) => setNavlink1(e.target.value)}
                required
                style={{ width: "25%", padding: "8px", margin: "10px" }}
              />
              <input
                type="text"
                value={navLink2}
                onChange={(e) => setNavlink2(e.target.value)}
                required
                style={{ width: "25%", padding: "8px", margin: "10px" }}
              />
              <input
                type="text"
                value={navLink3}
                onChange={(e) => setNavlink3(e.target.value)}
                required
                style={{ width: "23%", padding: "8px", margin: "10px" }}
              />
            </div>

            <button
            
            onClick={(e) => { e.preventDefault(); handleAddHeaderSection("header")}}
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

export default AddHeaderComponent;