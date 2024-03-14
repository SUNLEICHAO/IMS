const articleModelClass = require("../models/articleModel");
const articleModel = new articleModelClass();

const classificationModelClass = require("../models/classificationModel");
const classificationModel = new classificationModelClass();

const articleClassificationModelClass = require("../models/articleClassificationModel");
const articleClassificationModel = new articleClassificationModelClass();

const classification = {
  getAll: async function (req, res, next) {
    try {
      const result = await classificationModel.all();
      res.json(result);
    } catch (e) {
      console.log(e);
    }
  },

  insert: async function (req, res, next) {
    let name = req.body.name;
    try {
      const classifications = await classificationModel.insert({ name });
      if (classifications.length) {
        res.json({ code: 200, data: classifications });
      } else {
        res.json({ code: 0, data: classifications });
      }
    } catch (e) {
      console.log(e);
    }
  },

  delete: async function (req, res, next) {
    const classification_id = req.params.id;
    try {
      // 删除文章-分类表中所有数据
      let userRole = await articleClassificationModel
        .all()
        .where("classification_id", classification_id)
        .delete();
      // 删除表中所有该分类
      let classification = await classificationModel
        .all()
        .where("id", classification_id)
        .delete();
      res.json({ code: 200 });
    } catch (e) {
      console.log(e);
    }
  },

  update: async function (req, res, next) {
    // 改分类的名字
    const classification_id = req.params.id;
    const classification_name = req.body.name;
    try {
      const classification = await classificationModel.update(
        classification_id,
        {
          name: classification_name,
        }
      );
      res.json({ code: 200, data: classification });
    } catch (e) {
      res.json({ code: 100, data: e });
    }
  },
};
module.exports = classification;
