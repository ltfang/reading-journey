/// <reference types="cypress" />

context("api/v1/achievements", () => {

  const signIn = () => {
    cy.visit("/user-sessions/new")
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("user@example.com");
      cy.findByLabelText("Password").type("password");
      cy.root().submit();
    })
  }

  describe("GET /api/v1/achievements/streaks", () => {
  
    beforeEach(() => {
      signIn();
      cy.wait(500)
    });

    const endpoint = "/api/v1/achievements/streaks"

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

    it("should return an object with the listed properties", () => {
      cy.request(endpoint)
        .its("body")
        .should((body) => {
          expect(body).to.have.property("longestStreak")
          expect(body).to.have.property("currentStreak")
          expect(body).to.have.property("percentIn30")
          expect(body).to.have.property("percentIn7")
        })
      cy.request(endpoint)
        .its("body")
        .its("longestStreak")
        .should(object => {
          expect(object).to.have.property("firstDate")
          expect(object).to.have.property("lastDate")
          expect(object).to.have.property("streakLength")
        })
      cy.request(endpoint)
        .its("body")
        .its("currentStreak")
        .should(object => {
          expect(object).to.have.property("firstDate")
          expect(object).to.have.property("lastDate")
          expect(object).to.have.property("streakLength")
        })
    })

  })

  describe("GET /api/v1/achievements/rank", () => {
  
    before(() => {  
      cy.task("db:truncate", "Badge")
      cy.task("db:insert", {
        modelName: "Badge",
        json: { 
          id: 1,
          rank: "Wanderer",
          minutesMin: 0,
          minutesMax: 14
        }
      })
      cy.task("db:insert", {
        modelName: "Badge",
        json: { 
          id: 2,
          rank: "Excursionist",
          minutesMin: 15,
          minutesMax: 29
        }
      })
    })

    beforeEach(() => {
      signIn();
      cy.wait(500)
    });

    const endpoint = "/api/v1/achievements/rank"

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

    it("should return an object with the listed properties", () => {
      cy.request(endpoint)
        .its("body")
        .should((body) => {
          expect(body).to.have.property("rankData")
          expect(body).to.have.property("badges")
        })
      cy.request(endpoint)
        .its("body")
        .its("rankData")
        .should(object => {
          expect(object).to.have.property("currentRank")
          expect(object).to.have.property("nextRank")
          expect(object).to.have.property("currentMinutes")
          expect(object).to.have.property("maxMinutes")
          expect(object).to.have.property("minMinutes")
        })
      cy.request(endpoint)
        .its("body")
        .its("badges")
        .should("have.length", 2)
    })

  })

  describe("GET /api/v1/achievements/medals", () => {

    beforeEach(() => {
      signIn();
      cy.wait(500)
    });

    const endpoint = "/api/v1/achievements/medals"

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

    it("should return an object with the listed properties", () => {
      cy.request(endpoint)
        .its("body")
        .should(object => {
          expect(object).to.have.property("three")
          expect(object).to.have.property("five")
          expect(object).to.have.property("seven")
        })
    })

  })

})
