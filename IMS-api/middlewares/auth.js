const rolePermissionModelClass = require("../models/rolePermissionModel");
const rolePermissionModel = new rolePermissionModelClass();

const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = {
  authToken: function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      next()
      return
      // return res.sendStatus(401); // 如果token为空，返回未授权
    }

    // 还可以进一步添加，容错错误的token
    JWT.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // 如果验证失败，返回禁止访问
      // console.log(user);
      // 将用户信息添加到请求对象中
      req.user = user;
    });
    next();
  },
};

module.exports = auth;
