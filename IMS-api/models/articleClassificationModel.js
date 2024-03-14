const BaseModel = require("./base");

class ArticleClassificationModel extends BaseModel {
  constructor(props = "article_classifications") {
    super(props);
  }
}

module.exports = ArticleClassificationModel;
