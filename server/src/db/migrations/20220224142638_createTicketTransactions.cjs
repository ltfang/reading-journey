/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
 exports.up = async (knex) => {
  return knex.schema.createTable("ticketTransactions", table => {
    table.bigIncrements("id")
    table.integer("number").notNullable()
    table.date("date").notNullable()
    table.string("description")
    table.bigInteger("profileId")
      .notNullable()
      .unsigned()
      .index()
      .references("profiles.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("ticketTransactions")
}
