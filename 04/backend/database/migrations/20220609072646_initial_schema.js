/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('bookmarks', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.string('description');
    table.string('url');
    table.string('image');
    table.boolean('liked').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
