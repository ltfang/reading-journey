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
    const Profile = require("./Profile.js")

    return {
      profiles: {
        relation: Model.BelongsToOneRelation,
        modelClass: Profile,
        join: {
          from: "ticketTransactions.profileId",
          to: "profiles.id"
        }
      }
    }
  }
}

module.exports = TicketTransaction