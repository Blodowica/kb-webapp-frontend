import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import client from "../../../SanitySetup/sanityClient";


function AddHeaderBannerComponent() {

      const [bannerTitle, setBannerTitle] = useState("");
      const [bannerText, setBannerText] = useState("");
      const [bannerButtonText, setbannerButtonText] = useState("");
      const [bannerImage, setBannerImage] = useState("https://www.bibliotheek.nl/dam/Homepage/hero_banner_1216x473online-handiger.jpg.rendition.1280.2048.jpeg");


    const handleAddHeaderComponent = async (type) => {
        // 1. Fetch the section by type
        const SectionIdByTypeQuery = `*[_type == "section" && type == "${type}"]{..., headerComponents[]->, footerComponents[]->, headerBannerComponents[]->}`;    
        const currentSections = await client.fetch(SectionIdByTypeQuery);  
        const sectionId = currentSections && currentSections.length > 0 ? currentSections[0]._id : null;
        
            if(bannerTitle.trim() === "" || bannerText.trim() === ""  || bannerButtonText.trim() === "" || bannerImage.trim() === "" )
            {
              
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
                _type: "headerBannerComponent",
                name: `headerBannerComponent-${bannerTitle.trim()}${componentUid}`,
                bannerTitle: bannerTitle,
                bannerText: bannerText,
                bannerButtonText: bannerButtonText,
                bannerImage: bannerImage,

                styling: `{"justifyContent":"center","alignItems":"center","display":"flex",
                "bannerStyle":{"display":"flex","width":"80%","backgroundPosition":"center","borderRadius":"30px",
                "position":"relative"},"imageStyle":{"borderRadius":"30px","width":"100%","height":"100%",
                "objectFit":"cover","minWidth":"400px","minHeight":"400px","maxHeight":"450px"},
                "cardStyle":{"position":"absolute","top":"20px","left":"20px","backgroundColor":"rgba(255, 255, 255, 0.7)",
                "padding":"20px","borderRadius":"8px","boxShadow":"0px 4px 6px rgba(0, 0, 0, 0.1)",
                "minWidth":"550px","minHeight":"300px","maxWidth":"600px","maxHeight":"400px"},
                "titleStyle":{"fontSize":"30px","color":"#333","marginBottom":"15px",
                "textAlign":"start"},"descriptionStyle":{"fontSize":"20px","color":"#555","textAlign":"start","paddingTop":"30px"},
                "cardButtonStyle":{"bottom":"50px","alignSelf":"end","display":"flex","position":"absolute"}}`,
              }
            },
            {
              patch: {
                id: sectionId,
                insert: {
                  after: "headerBannerComponents[-1]",
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
          //window.location.reload();
        } catch (error) {
          console.error("Transaction error:", error);
        }
      };


    return ( <>
    <form>
          <label htmlFor="bannerTitle">Banner Title</label>
          <input
            type="text"
            id="nameText"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
               <label htmlFor="bannerText">Banner Text</label>
          <textarea
            type="text"
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />

          <label htmlFor="bannerImage">Banner Image:</label>
          <input
            type="text"
            value={bannerImage}
            onChange={(e) => setBannerImage(e.target.value)}

            required
            style={{ width: "100%", padding: "8px", margin: "5px 0", display: 'hidden' }}
          />

          <label htmlFor="bannerButtonText">Banner Button text</label>
          <div style={{ width: "100%" }}>
            <input
              type="text"
              value={bannerButtonText}
              onChange={(e) => setbannerButtonText(e.target.value)}
              required
              style={{ width: "25%", padding: "8px", margin: "10px" }}
            />
          </div>

          <button
          
          onClick={(e) => { e.preventDefault(); handleAddHeaderComponent("header")}}
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

export default AddHeaderBannerComponent;