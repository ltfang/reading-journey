const Model = require("./Model.js")

class TicketTransaction extends Model {
  static get tableName() {
    return "ticketTransactions"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["value"],
      properties: {
        value: {type: ["integer", "string"]},
        date: {type: ["date", "string"]},
        description: {type: "string"}
      }
    }
  }

  static get relationMappings() {
    const User = require("./User.js")
    const ReadingSession = require("./ReadingSession.js")

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "ticketTransactions.userId",
          to: "users.id"
        }
      }, 
      readingSession: {
        relation: Model.BelongsToOneRelation,
        modelClass: ReadingSession,
        join: {
          from: "ticketTransactions.readingSessionId",
          to: "readingSessions.id"
        }
      }
    }
  }
}

module.exports = TicketTransaction