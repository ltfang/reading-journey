/// <reference types="cypress" />

context("api/v1/books", () => {

  describe("GET /api/v1/books", () => {
  
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

    const endpoint = "/api/v1/books"

    it("returns the correct status code", () => {
      cy.request(endpoint)
      .its("status")
      .should("be.equal", 200)
    })

    it("has the correct response type", () => {
      cy.request(endpoint)
        .its("headers")
        .its("content-type")
        .should("include", "application/json")
    })

    it("should return an array", () => {
      cy.request(endpoint)
        .its("body")
        .its("length")
        .should("be.gte", 0)
    })

    it("each element should have the listed properties", () => {
      cy.request(endpoint)
        .its("body")
        .each((element) => {
          expect(element).to.have.property("id")
          expect(element).to.have.property("googleBooksId")
          expect(element).to.have.property("author")
          expect(element).to.have.property("title")
          expect(element).to.have.property("thumbnailUrl")
          expect(element).to.have.property("lastDateRead")
        })
    })

  })
})
