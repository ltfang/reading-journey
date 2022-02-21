const Model = require("./Model.js")

class Badge extends Model {
  static get tableName() {
    return "badges"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["rank", "minutesMin", "minutesMax"],
      properties: {
        rank: {type: "string"},
        minutesMin: {type: ["string","integer"]},
        minutesMax: {type: ["string","integer"]}
      }
    }
  }
  
}

module.exports = Badge