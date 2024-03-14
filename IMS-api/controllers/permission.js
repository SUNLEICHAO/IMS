const permissionModelClass = require("../models/permissionModel");
const permissionModel = new permissionModelClass();

const permission = {
  permissions: async function (req, res, next) {
    let user_permissions = req.user.user_permissions
    if(!user_permissions){
      res.json({data:'失败~ 您未登录'});
    }
    try {
      res.json(user_permissions);
    } catch (e) {
      console.log(e);
    }
  },
  getAll: async function (req, res, next) {
    try {
      const permissions = await permissionModel.all();
      res.json(permissions);
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = permission;
