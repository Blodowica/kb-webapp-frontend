import React from 'react';
function FooterComponent(props) {
    

    const sections = props.sections;

    
    return ( <>
    {sections.filter(section => section.type === "footer").flatMap((section, index) => (
          section.footerComponents && section.footerComponents.map((footerComponents, id) => {
              
              let parsedFooterLinks =  JSON.parse(footerComponents?.footerLinks);
              
              return(
                  
                  <div key={`${index}-${id}`} style={ {textAlign: "center" , ...JSON.parse(footerComponents.styling)}}>
                            <p>{footerComponents.footerText}</p>
                                <img src={footerComponents.bannerImage} />
                                <p>{parsedFooterLinks && parsedFooterLinks.map((link, linkId) =>(
                                    <a key={linkId} href={link.url}>{link.label}  </a>
                                ))}</p>
                               
                              </div>

                    )}
                        
                ))
            )}
    </> );
}

export default FooterComponent;