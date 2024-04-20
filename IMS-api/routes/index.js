var express = require("express");
var router = express.Router();
const { STS } = require("ali-oss");
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/file/alioss-token", function (req, res, next) {
  let space = req.body.space;
  let folder = req.body.folder;
  let file_name = req.body.file_name;
  // 暂定
  let path = space ? `${space}/${folder}/${file_name}` : `${file_name}`;

  let sts = new STS({
    accessKeyId: process.env.ALIYUN_OSS_ACCESSKEY_ID,
    accessKeySecret: process.env.ALIYUN_OSS_ACCESSKEY_SECRET,
  });

  // roleArn填写角色ARN。
  // policy填写自定义权限策略。
  // expiration用于设置临时访问凭证有效时间单位为秒，最小值为900，最大值以当前角色设定的最大会话时间为准。
  // sessionName用于自定义角色会话名称，用来区分不同的令牌，例如填写为SessionTest。
  sts
    .assumeRole(process.env.ALIYUN_OSS_ROLE_ARN, ``, "3600", "SessionTest")
    .then((result) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-METHOD", "GET");
      res.json({
        accessKeyId: result.credentials.AccessKeyId,
        accessKeySecret: result.credentials.AccessKeySecret,
        stsToken: result.credentials.SecurityToken, //SecurityToken
        Expiration: result.credentials.Expiration,
        region: process.env.ALIYUN_OSS_REGION_ID,
        bucket: req.body.bucket || process.env.ALIYUN_OSS_BUCKET_PUBLIC,
        // 要存储的文件地址+名字
        key: path,
      });
      console.log("sss3");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

router.post("/api/file/alioss-store", function (req, res, next) {
  // 需要将这些信息存起来
  let file_name = req.body.file_name;
  let path = req.body.path;
  let bucket = req.body.bucket;
  let title = req.body.title;
  // let url = process.env.ALIYUN_OSS_BUCKET_PUBLIC_DOMAIN + path
  let url = process.env.ALIYUN_OSS_CUSTOM_DOMAIN + path
  // console.log("步骤s1");
  // const client = new OSS({
  //   // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  //   region: process.env.ALIYUN_OSS_REGION_ID,
  //   // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
  //   accessKeyId: process.env.ALIYUN_OSS_ACCESSKEY_ID,
  //   accessKeySecret: process.env.ALIYUN_OSS_ACCESSKEY_SECRET,
  //   // 从STS服务获取的安全令牌（SecurityToken）。
  //   // stsToken: "yoursecurityToken",
  //   // 填写Bucket名称。
  //   bucket: process.env.ALIYUN_OSS_BUCKET_PUBLIC,
  // });
  // console.log("步骤s2");
  // let url = client.signatureUrl(path);
  res.send({
    file_name,
    path,
    bucket,
    title,
    url,
  });
});

module.exports = router;
