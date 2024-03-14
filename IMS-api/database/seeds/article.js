/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("articles").del();
  await knex("classifications").del();
  await knex("article_classifications").del();
  await knex("articles").insert([
    { id: 1, title: "百亿补贴为什么用 H5？H5 未来会如何发展？", content: "" },
    { id: 2, title: "不要再写满屏import导入啦！", content: "" },
    { id: 3, title: "真实前端面试题（蚂蚁外包）", content: "" },
    { id: 4, title: "vue原理分析", content: "" },
  ]);
  await knex("classifications").insert([
    { id: 1, name: "技术动态" },
    { id: 2, name: "极客新闻" },
    { id: 3, name: "通知公告" },
    { id: 4, name: "技术热点" },
    { id: 5, name: "新课列表" },
    { id: 6, name: "其他" },
  ]);
  await knex("article_classifications").insert([
    { id: 1, article_id: "1", classification_id: "1" },
    { id: 2, article_id: "2", classification_id: "2" },
    { id: 3, article_id: "3", classification_id: "2" },
    { id: 4, article_id: "4", classification_id: "4" },
  ]);
};
