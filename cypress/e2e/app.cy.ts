describe("Main page works", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.visit("http://localhost:3000");
  });

  it("should open ingredient in modal and close it", () => {
    cy.get('[data-test-id="ingredient-link"]:first').click();
    cy.get('[data-test-id="modal"]').as("modal");
    cy.get("@modal").should("be.visible");
    cy.get("@modal").find('h4').should('have.text', 'Краторная булка N-200i');
    cy.url().should("include", "/ingredients/");
    cy.get('[data-test-id="modal-close-btn"]').click();
    cy.get("@modal").should("not.exist");
  });

  it("drag-n-drop should work", () => {
    cy.get('[data-test-id="ingredient-link"]:first').as("ingredient");
    cy.get("@ingredient").trigger("dragstart");
    cy.get('[data-test-id="constructor-container"]').as("container");
    cy.get("@container").trigger('drop');
    cy.get("@container").find('li').should('have.length', 2);
    cy.get("@ingredient").find('.counter').should('have.text', '2');
  });
});
