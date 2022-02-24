const Model = require("./Model.js")

class Profile extends Model {
  static get tableName() {
    return "profiles"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: {type: "string"},
      }
    }
  }

  static get relationMappings() {
    const Book = require("./Book.js")
    const ReadingSession = require("./ReadingSession.js")
    const TicketTransaction = require("./TicketTransaction.js")

    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: "profiles.id",
          through: {
            from: "readingSessions.profileId",
            to: "readingSessions.bookId"
          },
          to: "books.id"
        }
      },

      readingSessions: {
        relation: Model.HasManyRelation,
        modelClass: ReadingSession,
        join: {
          from: "profiles.id",
          to: "readingSessions.profileId"
        }
      },

      ticketTransactions: {
        relation: Model.HasManyRelation,
        modelClass: TicketTransaction,
        join: {
          from: "profiles.id",
          to: "ticketTransactions.profileId"
        }
      }
    }
  }
}

module.exports = Profile