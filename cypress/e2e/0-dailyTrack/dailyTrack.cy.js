/*global cy */
/// <reference types="cypress" />


describe("visit dailyTrack app", () => {
  beforeEach(() => {
    // cy.visit("https://dailytrack-functional.web.app")
    cy.visit("http://localhost:5173/");
  });

  // Test modify item function
  it("Modify the quantity of the first item", () => {
    cy.get("button[name=modify-modal-btn]").first().click();
    // cy.get("body > div.fade.modal.show").should("be.visible");
    cy.get("form input[name=quantity]").eq(1).clear({ force: true }).type("11", { force: true});
    cy.get("#modify-modal-comfirm").should("exist").click();
  });

  // Test delete item function
  it("Delete item", () => {
    cy.get("button[name='item-delete']").first().click();
  });

  //Test new item function and add a tag
  it("Add a new item", () => {
    cy.get(".nav-item").first().click();
    const item = {
      name: "Fish Oil",
      quantity: 1,
      period: "Year",
      tags: ["Medicine"],
    };
    cy.get("#item-name").type(item.name);
    cy.get("#item-qty").type(item.quantity);
    cy.get(`#${item.period}`).check({ force: true });
    // add tag
    // cy.get("#addTag-modal-btn").click();
    // cy.get("#tagName").type(item.tags[1]);
    // cy.get("#addTag-comfirm").click();
    // item.tags.map((tag) => cy.get(`#${tag}`).check());
    cy.get(`#${item.tags[0]}`).check();
    cy.get("#newItem-confirm").should("exist").click();
    cy.get(".nav-item").eq(1).click();
  });

  // search items by name and tag
  it("Search items by name", () => {
    cy.get(".nav-item").eq(3).click();
    cy.get("#searchName").type("i");
    cy.get("select").select("Medicine");
    cy.get("#search-btn").click();
  });

  // search items by expiration
  it("Search items by expiration", () => {
    cy.get(".nav-item").eq(3).click();
    cy.get("#searchName").clear({force: true});
    cy.get("select").select(0);
    cy.get("#searchExp").type("2024-03-29");
    cy.get("#search-btn").click();
  });

  // test analytics function
  it("Show analytics function", () => {
    cy.get(".nav-item").eq(4).click();
  });
  
});