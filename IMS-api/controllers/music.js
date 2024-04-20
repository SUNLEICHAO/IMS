const musicModelClass = require("../models/musicModel");
const musicModel = new musicModelClass();

const music = {
  getAll: async function (req, res, next) {
    try {
      let musics = null;
      const mood_id = req.query?.mood_id;
      if (mood_id) {
        musics = await musicModel.select({ mood_id }).first();
      } else {
        musics = await musicModel.all();
      }
      res.json(musics);
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = music;
