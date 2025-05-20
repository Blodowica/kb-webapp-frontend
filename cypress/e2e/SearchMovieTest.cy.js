describe('Page edit layout functionality with search', () => {
    it('searches for a movie and confirms results are returned', () => {
      cy.intercept('GET', '/**').as('getPageData'); // Catch initial data load
      cy.intercept('GET', '/api/Movies/MovieBySearch?query=*').as('movieSearch');

      cy.visit('/');
  
      // Wait for the page to finish loading
      cy.wait('@getPageData', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  
      // Make sure no major errors show up
      cy.contains(/error|not found|exception|crash/i).should('not.exist');
  
      // Ensure body renders some content
      cy.get('body').children().should('have.length.greaterThan', 0);
  
      // Intercept search API call
      cy.intercept('GET', '**/Search?query=*').as('searchRequest');
  
      // Search for a movie
      cy.get('#SearchBar')
        .should('be.visible')
        .click()
        .type('Harry Potter{enter}'); // Type and press Enter
  
            // Wait for the API response
    cy.wait('@movieSearch').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.be.an('array');
        expect(interception.response.body.length).to.be.greaterThan(0);
      });
  
    
  
      // Optional: Confirm URL includes the query
      cy.url().should('include', '/Search?query=Harry%20Potter');
    });
  });
  