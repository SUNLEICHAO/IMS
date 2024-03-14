const BaseModel = require("./base");

class ArticleModel extends BaseModel {
  constructor(props = "articles") {
    super(props);
  }
}

module.exports = ArticleModel;
