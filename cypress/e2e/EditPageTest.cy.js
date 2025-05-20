describe('Page edit layout functionality', () => {
    
    
    it('loads successfully and renders components from Sanity', () => {
        cy.intercept('GET', '/**').as('getPageData'); // Intercept the request (adjust the URL pattern if needed)
    
        cy.visit('/');
    
        // Wait for the request to complete
        cy.wait('@getPageData', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
    
        // Ensure the body element exists
        cy.get('body').should('exist');
    
        // Ensure no errors are present (e.g., 404 or 500)
        cy.contains(/error|not found|exception|crash/i).should('not.exist');
    
        // Check that at least one component or element is rendered on the page
        cy.get('body').children().should('have.length.greaterThan', 0);

        //click editor button

        cy.get('#EditorViewBtn').click()
        cy.get('#EditorViewBtn').contains("Stop Edit Layout")
        
    
        
      });

  })