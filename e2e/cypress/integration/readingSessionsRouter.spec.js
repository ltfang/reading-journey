/// <reference types="cypress" />

context("api/v1/log", () => {

  describe("POST /api/v1/log", () => {
  
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

    const endpoint = "/api/v1/log/20220315"
    const book = {
      id: 100,
      googleBooksId: "ia7xAwAAQBAJ",
      author: "Theodor Suess Geisel",
      title: "The Cat in the Hat",
      thumbnailUrl: "testurl"
    }

    it("returns the correct status code when posting successfully", () => {
      cy.request({
        method: "POST",
        url: endpoint,
        body: {
          date: new Date('March 15, 2022'),
          minutesRead: 5,
          book: book
         }
      })
      .its("status")
      .should("be.equal", 201)
    })

  })
})
