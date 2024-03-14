const articleModelClass = require("../models/articleModel");
const articleModel = new articleModelClass();

const classificationModelClass = require("../models/classificationModel");
const classificationModel = new classificationModelClass();

const articleClassificationModelClass = require("../models/articleClassificationModel");
const articleClassificationModel = new articleClassificationModelClass();

const article = {
  getAll: async function (req, res, next) {
    // 两个逻辑：返回全部、返回某分类
    // 判断带不带参数（确定类别），如果不带参数，返回所有
    // 问题，为什么是params，却要写query???
    let classification_id = req.query.classification_id;
    console.log(classification_id);
    try {
      let articlesWithClassications = await articleModel
        .all()
        .join(
          "article_classifications",
          "articles.id",
          "=",
          "article_classifications.article_id"
        )
        .join(
          "classifications",
          "article_classifications.classification_id",
          "=",
          "classifications.id"
        )
        .select(
          "articles.id as id",
          "articles.title as title",
          "articles.content as content",
          "articles.created_at as created_at",
          "classifications.id as classification_id",
          "classifications.name as classification_name"
        );

      if (classification_id === undefined) {
        res.json({
          result: articlesWithClassications,
        });
      } else {
        res.json({
          result: articlesWithClassications.filter(
            (e) => e["classification_id"] == classification_id
          ),
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  getOne: async function (req, res, next) {
    const id = req.params.id;
    try {
      const article = await articleModel.select({ id }).first();
      if (!article) {
        article.json({ error_code: 1, message: "不存在" });
        return;
      }

      let articleClassification = await articleClassificationModel
        .select({ article_id: id })
        .join(
          "classifications",
          "article_classifications.classification_id",
          "=",
          "classifications.id"
        )
        .select(
          "classifications.name as classification_name",
          "classifications.id as classification_id"
        )
        .first();

      res.json({
        article: { ...article, ...articleClassification },
      });
    } catch (e) {
      console.log(e);
    }
  },

  insert: async function (req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    let classification_id = req.body.classification_id;
    try {
      const article_id = await articleModel.insert({ title, content });
      const articleClassification_id = await articleClassificationModel.insert({
        article_id,
        classification_id,
      });

      if (article_id && articleClassification_id) {
        res.json({
          code: 200,
          data: {
            article_id,
            articleClassification_id,
          },
        });
      } else {
        res.json({ code: 0 });
      }
    } catch (e) {
      console.log(e);
    }
  },

  delete: async function (req, res, next) {
    const article_id = req.params.id;
    // console.log(article_id);
    try {
      // 删除文章表中所有该文章
      let article = await articleModel.all().where("id", article_id).delete();
      // 删除文章-分类表中所有数据
      let userRole = await articleClassificationModel
        .all()
        .where("article_id", article_id)
        .delete();
      res.json({ code: 200 });
    } catch (e) {
      console.log(e);
    }
  },

  update: async function (req, res, next) {
    const article_id = req.body.id;
    const title = req.body.title;
    const classification_id = req.body.classification_id;
    const content = req.body.content;
    console.log('###',content);
    try {
      console.log('存进去1');
      const article = await articleModel.update(article_id, {
        title,
        content,
      });
      
      console.log('存进去2');
      let userRole = await articleClassificationModel
      .all()
      .where("article_id", article_id)
      .update({ classification_id });
      
      console.log('存进去3');
      res.json({ code: 200 });
    } catch (e) {
      res.json({ code: 100, data: e });
    }
  },
};
module.exports = article;
