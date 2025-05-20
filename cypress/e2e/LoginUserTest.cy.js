describe("Sanity-Driven Home Page", () => {
  it("loads successfully and logs in", () => {
    cy.intercept("GET", "/**").as("getPageData"); // Intercept the request (adjust the URL pattern if needed)

    cy.visit("/");

    // Wait for the request to complete
    cy.wait("@getPageData", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);

    // Ensure the body element exists
    cy.get("body").should("exist");

    // Ensure no errors are present (e.g., 404 or 500)
    cy.contains(/error|not found|exception|crash/i).should("not.exist");

    // Check that at least one component or element is rendered on the page
    cy.get("body").children().should("have.length.greaterThan", 0);

    // Click on the login link or div to trigger the login form
    cy.get('[data-cy="login-link"]').click(); // Replace with the correct selector if needed

    // Use cy.origin to interact with Auth0 login page
    cy.origin("https://dev-4l217ux7zxbhmow1.eu.auth0.com", () => {
      // Wait for the email input to be visible
      cy.get("#username").should("be.visible");

      // Type the email into the username input field
      const email = Cypress.env("username"); // Assuming the email is stored in Cypress environment variable
      cy.get("#username").type(email);

      // Type the password into the password input field (if there is one)
      const password = Cypress.env("password"); // Assuming the password is stored in Cypress environment variable
      cy.get("#password").type(password);

      // Submit the form or click the login button
      cy.get("[type='submit']").click(); // Replace with the correct selector if needed
    });

    // Optionally, you can assert that the user is logged in after submitting
    cy.get("#profileImage").should("be.visible");
    cy.get("#userNickname").should("be.visible");
    cy.get("#logoutUserButton").should("be.visible");

    //logout user

    cy.get("#logoutUserButton").click();
  });
});
