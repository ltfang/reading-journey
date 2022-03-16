/// <reference types="Cypress" />

describe("As a user logging a book", () => {
  const signIn = () => {
    cy.visit("/user-sessions/new")
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("user@example.com");
      cy.findByLabelText("Password").type("password");
      cy.root().submit();
    })
  }

  beforeEach(() => {
    cy.task("db:truncate", "ReadingSession");
    signIn();
    cy.wait(500);
    cy.visit("/log");
  });

  it("will show me the calendar page", () => {
    cy.get(".page-header")
    .should("have.text", "User's Reading Log")
  });

  it("will take me to a reading session page if I click the first day on the calendar", () => {
    cy.get(".calendarDay").first().click()
    cy.get(".add-read-header")
    .should("have.text", "Add a New Read")
  })

  it("will allow me to search a book and add a record for reading that book for a number of minutes", () => {
    cy.get(".calendarDay").first().click()    
    cy.get(".add-book-form").within(() => {
      cy.findByLabelText("Add book").type("green eggs");
      cy.get("button").click();
    });
    cy.get(".form-container")
      .find(".css-6j8wv5-Input")
      .click()
      .type("d{enter}")
    cy.get(".minutesRead").type(5)
    cy.get(".app-btn").click()
    cy.get(".tile-right")
      .find(".title")
      .should("have.text", "Green Eggs and Ham")
  })

});

