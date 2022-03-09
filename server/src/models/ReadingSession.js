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
    const Profile = require("./Profile.js")

    return {
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: "readingSessions.bookId",
          to: "books.id"
        }
      },

      profile: {
        relation: Model.BelongsToOneRelation,
        modelClass: Profile,
        join: {
          from: "readingSessions.profileId",
          to: "profiles.id"
        }
      }
    }
  }
}

module.exports = ReadingSession