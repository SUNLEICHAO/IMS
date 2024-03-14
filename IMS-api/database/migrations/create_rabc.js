/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return (
    knex.schema
      // 用户表
      .createTable("users", function (table) {
        table.increments("id");
        table.string("name", 255);
        table.string("phone", 255);
        table.string("password", 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      // 角色表
      .createTable("roles", function (table) {
        table.increments("id");
        table.string("name", 255);
        table.string("desc", 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      // 权限表
      .createTable("permissions", function (table) {
        table.increments("id");
        table.string("permission", 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      // 用户-角色表
      .createTable("user_roles", function (table) {
        table.increments("id");
        table.string("user_id", 255);
        table.string("role_id", 255);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      // 角色-权限表
      .createTable("role_permissions", function (table) {
        table.increments("id");
        table.string("role_id", 255);
        table.string("permission_id", 255);
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
    .dropTable("users")
    .dropTable("roles")
    .dropTable("permissions")
    .dropTable("user_roles")
    .dropTable("role_permissions");
};
