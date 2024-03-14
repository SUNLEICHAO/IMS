var express = require("express");
var router = express.Router();



/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/file/alioss-token", function (req, res, next) {
  res.send("alioss info");
});

router.get("/api/file/alioss-store", function (req, res, next) {
  res.send("alioss store");
});


module.exports = router;
