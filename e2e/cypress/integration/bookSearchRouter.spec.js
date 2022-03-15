/// <reference types="cypress" />

context("api/v1/bookSearchRouter", () => {

  describe("GET /api/v1/book-search?searchTerms=${searchTerms}", () => {
  
    const signIn = () => {
      cy.visit("/user-sessions/new")
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type("user@example.com");
        cy.findByLabelText("Password").type("password");
        cy.root().submit();
      })
    }

    beforeEach(() => {
      signIn();
      cy.wait(500)
    });

    it("requesting current user returns the correct status code", () => {
      cy.request("/api/v1/user-sessions/current")
      .its("status")
      .should("be.equal", 200)
    })

    const searchTerms = "green eggs"
    const url = `/api/v1/book-search?searchTerms=${searchTerms}`
    it("has the correct response type", () => {
      cy.request(url)
        .its("headers")
        .its("content-type")
        .should("include", "application/json")
    })

    it("returns the correct status code", () => {
      cy.request(url)
        .its("status")
        .should("be.equal", 200)
    })

    it("loads ten books", () => {
      cy.request(url)
        .its("body")
        .should("have.length", 10)
    })

  })
})
