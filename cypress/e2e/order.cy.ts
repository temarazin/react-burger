describe("Order works", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')

    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
    cy.visit("http://localhost:3000");
  });

  it("Order showed", () => {
    cy.get('[data-test-id="ingredient-link"]').as("ingredient");
    cy.get("@ingredient").eq(0).trigger("dragstart");
    cy.get('[data-test-id="constructor-container"]').as("container");
    cy.get("@container").trigger('drop');
    cy.get("@ingredient").eq(1).trigger("dragstart");
    cy.get("@container").trigger('drop');
    cy.get("[data-test-id='total-price']").should('have.text', '2600 ');
    cy.get("[data-test-id='order-btn']").click();

    cy.get('[data-test-id="modal"]').as("modal");
    cy.get('@modal').should('be.visible');
    cy.get('[data-test-id="order-number"]').should('have.text', '38696');
    cy.get('[data-test-id="modal-close-btn"]').click();
    cy.get("@modal").should("not.exist");
  });
});
