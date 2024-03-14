const userModelClass = require("../models/userModel");
const userModel = new userModelClass();

const roleModelClass = require("../models/roleModel");
const roleModel = new roleModelClass();

const permissionModelClass = require("../models/permissionModel");
const permissionModel = new permissionModelClass();

const userRoleModelClass = require("../models/userRoleModel");
const userRoleModel = new userRoleModelClass();

const rolePermissionModelClass = require("../models/rolePermissionModel");
const rolePermissionModel = new rolePermissionModelClass();

const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const user = {
  login: async function (req, res, next) {
    let phone = req.body.tel;
    let password = req.body.password;

    try {
      const users = await userModel.select({ phone, password });
      if (!users.length) {
        res.json({ code: 0, data: { msg: "登录失败，没有此用户！" } });
        return;
      }
      let user = users[0];
      let userRoles = await userRoleModel.select({ user_id: user.id });
      let role_id, roleName;

      let permissions = [];
      if (userRoles.length == 0) {
        role_id = "";
        roleName = "无此角色";
      } else {
        role_id = userRoles[0].role_id;
        let roles = await roleModel.select({ id: role_id });
        roleName = roles[0].name;
        let rolePermissions = await rolePermissionModel.select({
          role_id: role_id,
        });
        for (let rolePermission of rolePermissions) {
          let permission = await permissionModel
            .select({ id: rolePermission.permission_id })
            .first();
          permissions.push(permission.permission);
        }
      }

      if (!permissions.length) {
        res.json({ code: 403 });
        return;
      }

      let token = JWT.sign(
        {
          user_id: user.id,
          user_name: user.name,
          user_role_id: role_id,
          user_roleName: roleName,
          user_permissions: permissions,
        },
        JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
      // 将其设置在cookie中
      // 问题！这里是将cookie设置在哪里？？谁调用设置给谁？还是
      // res.cookie("web_token", token, { maxAge: 30 * 24 * 60 * 60 });

      res.json({
        code: 200,
        message: "登录成功！",
        token,
      });
    } catch (e) {
      res.locals.error = e;
      res.render("error", res.locals);
    }
  },
  getAll: async function (req, res, next) {
    try {
      const result = await userModel
        .all()
        .join("user_roles", "users.id", "=", "user_roles.user_id")
        .join("roles", "user_roles.role_id", "=", "roles.id")
        .select(
          "users.id as user_id",
          "users.name as user_name",
          "users.phone as phone",
          "roles.id as role_id",
          "roles.name as role_name"
        );
      res.json(result);
    } catch (e) {
      console.log(e);
    }
  },

  insert: async function (req, res, next) {
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let role_id = req.body.role_id;
    try {
      const user = await userModel.insert({ name, phone, password });
      const userRole = await userRoleModel.insert({
        user_id: user[0],
        role_id,
      });
      res.json({ code: 200, data: user });
    } catch (e) {
      res.json({ code: 100, data: e });
    }
  },

  // 未调试
  delete: async function (req, res, next) {
    const role_id = req.query.id;
    try {
      // 删除用户-角色表中所有该角色
      let userRole = await userRoleModel
        .all()
        .where("role_id", role_id)
        .delete();
      // 删除角色表中所有该角色
      let role = await roleModel.all().where("id", role_id).delete();
      // 删除角色-权限表中所有该角色
      let rolePermissio = await rolePermissionModel
        .all()
        .where("role_id", role_id)
        .delete();
      res.json({ code: 200, data: [] });
    } catch (e) {
      console.log(e);
    }
  },

  update: async function (req, res, next) {
    let user_id = req.body.user_id;
    let name = req.body.name;
    let tel = req.body.tel;
    let password = req.body.password;
    let role_id = req.body.role_id;
    try {
      const user = await userModel.update(user_id, {
        name,
        phone: tel,
        password,
      });
      // 查找数据库，没有的话就添加，有的话
      const userRoleExit = await userRoleModel.select({ user_id });
      if (!userRoleExit.length) {
        // 原来没有，就添加
        const userRole = await userRoleModel.insert({ user_id, role_id });
      } else {
        // 原来有，则修改
        const userRole = await userRoleModel.update(userRoleExit[0].id, {
          user_id,
          role_id,
        });
      }
      res.json({ code: 200, data: user });
    } catch (e) {
      res.json({ code: 100, data: e });
    }
  },
  select1: async function (req, res, next) {
    let id = req.body.id;
    try {
      const user = await userModel.select({ id });
      res.json({ code: 200, data: user });
    } catch (e) {
      res.json({ code: 100, data: e });
    }
  },
};

module.exports = user;
