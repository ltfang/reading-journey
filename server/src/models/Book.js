const Model = require("./Model.js")

class Book extends Model {
  static get tableName() {
    return "books"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["author", "title"],
      properties: {
        author: {type: "string"},
        title: {type: "string"},
        thumbnailUrl: {type: "string"}
      }
    }
  }
}

module.exports = Book