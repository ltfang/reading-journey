/// <reference types="cypress" />

context("api/v1/minutesRouter", () => {

  describe("GET /api/v1/minutes?start=${startDay}&end=${endDay}", () => {
  
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

    const endpoint = "/api/v1/minutes?start=20220227&end=20220403"

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

    it("should return an array of length 35", () => {
      cy.request(endpoint)
        .its("body")
        .should("have.length", 35)
    })

    it("each element of the array should have a date property and a totalMinutes property", () => {
      cy.request(endpoint)
        .its("body")
        .should((body) => {
          expect(body[0]).to.have.property("date", "20220227")
          expect(body[0]).to.have.property("totalMinutes")
        })
    })

  })
})
