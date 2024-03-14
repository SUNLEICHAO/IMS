var express = require("express");
var router = express.Router();

const userController = require("../controllers/user");
const roleController = require("../controllers/role");
const permissionController = require("../controllers/permission");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource admin");
});

router.get("/api/permission/permissions", permissionController.getAll);
router.post("/api/permission/permissions", permissionController.permissions);

router.post("/api/login", userController.login);

router.get("/api/permission/role", roleController.getAll);
router.get("/api/permission/role/:id", roleController.getOne);
router.post("/api/permission/role", roleController.insert);
router.delete("/api/permission/role", roleController.delete); // 删除
router.put("/api/permission/role", roleController.update); // 更改

router.get("/api/permission/user", userController.getAll);
router.post("/api/permission/user", userController.insert);
router.delete("/api/permission/user", userController.delete);
router.put("/api/permission/user", userController.update); // 更改

// 信息管理系统
const classificationController = require("../controllers/classification");
const articleController = require("../controllers/article");

// 分类管理
router.get("/api/classification", classificationController.getAll);
router.post("/api/classification", classificationController.insert);
router.delete("/api/classification/:id", classificationController.delete);
router.put("/api/classification/:id", classificationController.update);

router.get("/api/article", articleController.getAll);
router.get("/api/article/:id", articleController.getOne);
router.post("/api/article", articleController.insert);
router.delete("/api/article/:id", articleController.delete);
router.put("/api/article", articleController.update);

module.exports = router;
