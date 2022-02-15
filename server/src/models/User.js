/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email"],

      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Book = require("./Book.js")
    const ReadingSession = require("./ReadingSession.js")

    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: "users.id",
          through: {
            from: "readingSessions.userId",
            to: "readingSessions.bookId"
          },
          to: "books.id"
        }
      },

      readingSessions: {
        relation: Model.HasManyRelation,
        modelClass: ReadingSession,
        join: {
          from: "user.id",
          to: "readingSessions.userId"
        }
      }
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
