/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
 exports.up = async (knex) => {
  return knex.schema.createTable("readingSessions", table => {
    table.bigIncrements("id")
    table.date("date").notNullable()
    table.integer("minutesRead").notNullable()
    table.bigInteger("profileId")
      .notNullable()
      .unsigned()
      .index()
      .references("profiles.id")
    table.bigInteger("bookId")
      .notNullable()
      .unsigned()
      .index()
      .references("books.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("readingSessions")
}
