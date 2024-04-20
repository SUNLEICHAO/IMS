/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return (
    knex.schema
      // 音乐表
      .createTable("musics", function (table) {
        table.increments("id");
        table.string("title", 255);
        table.text("author");
        table.text("lyric");
        table.string("user_id", 255);
        table.string("mood_id", 255);
        table.string("url", 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      // 音乐风格表
      .createTable("moods", function (table) {
        table.increments("id");
        table.string("name", 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("musics")
    .dropTable("moods")
};
