const roleModelClass = require("../models/roleModel");
const roleModel = new roleModelClass();

const userRoleModelClass = require("../models/userRoleModel");
const userRoleModel = new userRoleModelClass();

const rolePermissionModelClass = require("../models/rolePermissionModel");
const rolePermissionModel = new rolePermissionModelClass();

const role = {
  getAll: async function (req, res, next) {
    try {
      const roles = await roleModel.all();
      // const permissions = await permissionModel.all();
      // res.render('admin/role', {
      //   roles,
      //   page: 'role',
      //   // 所有的权限信息
      //   permissions
      // })
      res.json(roles);
    } catch (e) {
      console.log(e);
    }
  },

  getOne: async function (req, res, next) {
    const id = req.params.id;
    try {
      const role = await roleModel.select({ id }).first();
      if (!role) {
        res.json({ error_code: 1, message: "不存在" });
        return;
      }

      const permissions = await rolePermissionModel
        .all()
        .where({ role_id: id });
      let permissionsTransform = permissions.map((data) => data.permission_id);

      res.json({
        role,
        permissionsTransform
      });
    } catch (e) {
      console.log(e);
    }
  },

  insert: async function (req, res, next) {
    let name = req.body.roleName;
    let desc = req.body.roleDesc;
    // let permissionsList = JSON.parse(req.body.permissionsList);
    let permissionsList = req.body.permissionsList;
    try {
      const roles = await roleModel.insert({ name, desc });
      let role_id = roles[0];
      let rolePermissionToInsert = permissionsList.map((e) => ({
        role_id,
        permission_id: e,
      }));
      await rolePermissionModel.insert(rolePermissionToInsert);
      if (roles.length) {
        res.json({ code: 200, data: roles });
      } else {
        res.json({ code: 0, data: roles });
      }
    } catch (e) {
      console.log(e);
    }
  },

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
    let id = req.body.role_id;
    let name = req.body.roleName;
    let desc = req.body.roleDesc;
    let permissionsList = req.body.permissionsList;
    // console.log(name,desc,permissionsList);
    // next()
    // return 
    try {
      // 更改该角色信息
      await roleModel.update(id, { name, desc });

      // 删除原有的所有权限，添加新的权限
      await rolePermissionModel.all().where("role_id", id).delete();

      let rolePermissionToInsert = permissionsList.map((e) => ({
        role_id: id,
        permission_id: e,
      }));
      // console.log(rolePermissionToInsert);
      // 空值会报错，添加判断不为空的逻辑
      rolePermissionToInsert.length && await rolePermissionModel.insert(rolePermissionToInsert);

      res.json({ code: 200, data: [] });
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = role;
