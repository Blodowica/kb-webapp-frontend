describe("Add a new action banner", () => {
  it("should add a new action banner ar the end of the page and reflect changes", () => {
    // Visit the page
    cy.visit("/");
    cy.get("#EditorViewBtn").click();

    cy.get("#sectionComponentsContainer").should("exist");

    cy.get("#AddComponentBtn").click();

    cy.get("#AddActionBannerComponentButton").click();

    cy.wait(2000);

    //last should be the action banner

    //check api request to ensure it successfull
  });
});

describe("Edit last action banner", () => {
  it("should edit the last action banner and reflect changes", () => {
    // Visit the page
    cy.visit("/");

    cy.get("#EditorViewBtn").click();

    cy.get("#sectionComponentsContainer").should("exist");

    // Find the last Action Banner and scope all edits inside it
    cy.get(".actionBannerComponent")
      .last()
      .within(() => {
        // Click the Edit button
        cy.get(" #actionBannerEditLayoutContainer ")
          .should("exist")
          .within(() => {
            cy.get("#actionbannerEditbuttonEdit").click();
          });

        // Fill in new values
        cy.get("#title").clear().type("Updated Title");
        cy.get("#description").clear().type("This is a new description");
        cy.get("#buttonText").clear().type("Click Me");
        cy.get("#buttonUrl").select("Home");

        // Click Save (same button toggles edit/save)
        cy.get("#actionbannerEditbuttonEdit").click();

        // Assert the updated values are reflected
        cy.get("#actionBannerTitleText").should("have.text", "Updated Title");
        cy.get("#actionBannerDescriptionText").should(
          "have.text",
          "This is a new description"
        );
        cy.get("#actionBannerButtonText").should("have.text", "Click Me");
      });
  });
});

describe("Move up the last action banner", () => {
  it("should move the last action banner up and reflect changes", () => {
    // Visit the page
    cy.visit("/");

    cy.get("#EditorViewBtn").click();

    cy.window().then((win) => {
      cy.spy(win.console, "log").as("consoleLog");
    });

    cy.get("#sectionComponentsContainer").should("exist");

    // Find the last Action Banner and scope all edits inside it
    cy.get(".actionBannerComponent")
      .last()
      .within(() => {
        // Click the Edit button
        cy.get(" #actionBannerEditLayoutContainer ")
          .should("exist")
          .within(() => {
            cy.get("#actionbannerEditbuttonUp").click();
          });
      });

    cy.get("@consoleLog").should(
      "be.calledWithMatch",
      /Moved component .* up in bodyComponents/
    );
  });
});

describe("Move down last action banner", () => {
  it("should move the last action banner down and reflect changes", () => {
    // Visit the page
    cy.visit("/");

    cy.get("#EditorViewBtn").click();

    cy.window().then((win) => {
      cy.spy(win.console, "log").as("consoleLogdown");
    });

    cy.get("#sectionComponentsContainer").should("exist");

    // Find the last Action Banner and scope all edits inside it
    cy.get(".actionBannerComponent")
      .last()
      .within(() => {
        // Click the Edit button
        cy.get(" #actionBannerEditLayoutContainer ")
          .should("exist")
          .within(() => {
            cy.get("#actionbannerEditbuttonDown").click();
          });
      });
  });
});

describe("Delete last action banner", () => {
  it("should move the last action banner up and reflect changes", () => {
    // Visit the page
    cy.visit("/"); // 🔁 replace with your actual route

    cy.get("#EditorViewBtn").click();

    cy.window().then((win) => {
      cy.spy(win.console, "log").as("consoleLog");
    });

    cy.get("#sectionComponentsContainer").should("exist");

    // Find the last Action Banner and scope all edits inside it
    cy.get(".actionBannerComponent")
      .last()
      .within(() => {
        // Click the Edit button
        cy.get(" #actionBannerEditLayoutContainer ")
          .should("exist")
          .within(() => {
            cy.get("#actionbannerEditbuttonDelete").click();
          });
      });
    cy.get(".btn-danger").click();
    cy.get("@consoleLog").should(
      "be.calledWithMatch",
      /Component .* deleted successfully.*/
    );

    //check if thhe coponent is actually roved
  });
});
