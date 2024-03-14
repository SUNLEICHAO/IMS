var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource，this is web的api");
});

router.get("/users/user-info", function (req, res, next) {
  if (!req.user) {
    res.json({ data: "当前无任何用户登录~" });
    return
  }
  let id = req.user.user_id;
  let name = req.user.user_name;
  let roleName = req.user.user_roleName;
  res.json({
    id,
    name,
    role_name: roleName,
  });
});


// 信息管理系统
const classificationController = require("../controllers/classification");
const articleController = require("../controllers/article");

// 分类管理
router.get("/api/classification", classificationController.getAll);
// router.post("/api/classification", classificationController.insert);
// router.delete("/api/classification/:id", classificationController.delete);
// router.put("/api/classification/:id", classificationController.update);

router.get("/api/article", articleController.getAll);
router.get("/api/article/:id", articleController.getOne);
// router.post("/api/article", articleController.insert);
// router.delete("/api/article/:id", articleController.delete);
// router.put("/api/article", articleController.update);


module.exports = router;
