/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("roles").del();
  await knex("permissions").del();
  await knex("user_roles").del();
  await knex("role_permissions").del();
  await knex("users").insert([
    { id: 1, name: "小A", phone: "13200000001", password: "1234" },
  ]);
  await knex("roles").insert([
    { id: 1, name: "管理员", desc: "拥有全部权限" },
    { id: 2, name: "员工", desc: "员工权限" },
  ]);
  await knex("permissions").insert([
    { id: 1, permission: "role-index" },
    { id: 2, permission: "manager-index" },
    { id: 3, permission: "article-index" },
    { id: 4, permission: "article-classify" },
    { id: 5, permission: "article-create" },
  ]);
  await knex("user_roles").insert([{ id: 1, user_id: "1", role_id: "1" }]);
  await knex("role_permissions").insert([
    { id: 1, role_id: "1", permission_id: "1" },
    { id: 2, role_id: "1", permission_id: "2" },
    { id: 3, role_id: "1", permission_id: "3" },
    { id: 4, role_id: "1", permission_id: "4" },
    { id: 5, role_id: "1", permission_id: "5" },
    { id: 6, role_id: "2", permission_id: "2" },
    { id: 7, role_id: "2", permission_id: "3" },
    { id: 8, role_id: "2", permission_id: "4" },
    { id: 9, role_id: "2", permission_id: "5" },
  ]);
};
