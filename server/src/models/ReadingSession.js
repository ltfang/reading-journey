const Model = require("./Model.js")

class ReadingSession extends Model {
  static get tableName() {
    return "readingSessions"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["date", "minutesRead"],
      properties: {
        date: { type: ["string", "date"] },
        minutesRead: { type: ["string", "integer"]}
      }
    }
  }

  static get relationMappings() {
    const Book = require("./Book.js")
    const User = require("./User.js")
    const TicketTransaction = require("./TicketTransaction.js")

    return {
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: "readingSessions.bookId",
          to: "books.id"
        }
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "readingSessions.userId",
          to: "users.id"
        }
      },

      ticketTransaction: {
        relation: Model.BelongsToOneRelation,
        modelClass: TicketTransaction,
        join: {
          from: "readingSessions.id",
          to: "ticketTransactions.readingSessionId"
        }
      }
    }
  }
}

module.exports = ReadingSession