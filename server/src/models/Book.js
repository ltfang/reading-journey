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

  static get relationMappings() {
    const User = require("./User.js")
    const ReadingSession = require("./ReadingSession.js")

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "books.id",
          through: {
            from: "readingSessions.bookId",
            to: "readingSessions.userId"
          },
          to: "users.id"
        }
      },

      readingSessions: {
        relation: Model.HasManyRelation,
        modelClass: ReadingSession,
        join: {
          from: "books.id",
          to: "readingSessions.bookId"
        }
      }
    }
  }
}

module.exports = Book