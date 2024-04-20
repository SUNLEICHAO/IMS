const BaseModel = require("./base");

class MusicModel extends BaseModel {
  constructor(props = "musics") {
    super(props);
  }
}

module.exports = MusicModel;
