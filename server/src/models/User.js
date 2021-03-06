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
      required: ["email", "username"],
      properties: {
        email: { type: "string", format: "email" },
        username: { type: "string" },
        currentProfileId: {type: ["integer", "string"] },
        cryptedPassword: { type: "string" }
      },
    };
  }

  static get relationMappings() {
    const Profile = require("./Profile.js")

    return {
      profiles: {
        relation: Model.HasManyRelation,
        modelClass: Profile,
        join: {
          from: "users.id",
          to: "profiles.userId"
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
