/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("musics").del();
  await knex("moods").del();
  await knex("musics").insert([
    {
      id: 1,
      title: "최승현 - 포크댄스",
      author: "",
      lyric: "",
      user_id: "1",
      mood_id: "1",
      url: "https://seaio-bucket.oss-cn-guangzhou.aliyuncs.com/music/2bde31a3-17e8-47d0-baf7-bd9227bfc35b.mp3",
    },
    {
      id: 2,
      title: "sunai1",
      author: "我",
      lyric: "",
      user_id: "1",
      mood_id: "2",
      url: "https://seaio-bucket.oss-cn-guangzhou.aliyuncs.com/music/8d54adbf-2d42-4d5a-ab72-7c815450893b.mp3",
    },
    {
      id: 3,
      title: "我记得",
      author: "赵雷",
      lyric: "",
      user_id: "1",
      mood_id: "3",
      url: "https://seaio-bucket.oss-cn-guangzhou.aliyuncs.com/music/obj_wo3DlMOGwrbDjj7DisKw_17718433824_acca_41eb_8112_efa4dce840121844afcb957bcb2d4fd1.mp3",
    },
    {
      id: 4,
      title: "灵气",
      author: "",
      lyric: "",
      user_id: "1",
      mood_id: "4",
      url: "https://m704.music.126.net/20240416115445/5cb1ef4403a7e44bde6c0ed3f6f698c1/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/34567249528/6c8a/c56e/2da4/bef63c6822209fda67661c6c60c629a9.m4a?authSecret=0000018ee4f415f219a70aaba08407f4",
    },
  ]);
  await knex("moods").insert([
    { id: 1, name: "漂流筏" },
    { id: 2, name: "单人岛" },
    { id: 3, name: "围猎场" },
    { id: 4, name: "自留地" },
  ]);
};
