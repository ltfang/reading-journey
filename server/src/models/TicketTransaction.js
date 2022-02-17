const Model = require("./Model.js")

class TicketTransaction extends Model {
  static get tableName() {
    return "ticketTransactions"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["date", "number"],
      properties: {
        number: {type: ["integer", "string"]},
        date: {type: ["date", "string"]},
        description: {type: "string"}
      }
    }
  }

  static get relationMappings() {
    const User = require("./User.js")

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "ticketTransactions.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = TicketTransaction