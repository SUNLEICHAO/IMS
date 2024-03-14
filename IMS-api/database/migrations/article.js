/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return (
    knex.schema
      // 文章表
      .createTable("articles", function (table) {
        table.increments("id");
        table.string("title", 255);
        table.text("content");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      // 分类表
      .createTable("classifications", function (table) {
        table.increments("id");
        table.string("name", 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // 文章-分类表
      .createTable("article_classifications", function (table) {
        table.increments("id");
        table.string("article_id", 255);
        table.string("classification_id", 255);
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
    .dropTable("articles")
    .dropTable("classifications")
    .dropTable("article_classifications");
};
