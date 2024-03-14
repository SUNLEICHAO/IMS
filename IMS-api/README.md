# vue3 后台的 api

## api

```javascript
const PREFIX = `${import.meta.env.VITE_APP_HOST}`;
const WEB_PREFIX = `${PREFIX}/api/web`;
const ADMIN_PREFIX = `${PREFIX}/api/admin`;

export default {
  userInfo: `${WEB_PREFIX}/users/user-info`,
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  permissions: `${ADMIN_PREFIX}/api/permission/permissions`,
};
```

前台前缀`/api/web`,后台前缀`/api/admin`，具体：

api 接口

- /api/file/alioss-token
- /api/file/alioss-store

  前台

- /api/web/users/user-info

  后台

- /api/admin/api/permission/permissions (get)
- /api/admin/api/login (post)
- /api/admin/api/permission/role (get/post/`delete`)
- /api/admin/api/permission/role/:id (get)
- /api/admin/api/permission/ (get)
- /api/admin/

**新增：**

- 用户页面没有删除接口

登录页 API

1. （完成）POST /api/login 登录返回 token

用户管理 API

1. （完成）GET /api/user 获取所有用户
2. （完成）POST /api/user 新建用户
3. （完成）PUT /api/user/:id 修改用户
4. （完成）DELETE /api/user/:id 删除用户

分类管理 API

1. GET /api/classify 获取所有分类
2. POST /api/classify 新建分类
3. PUT /api/classify/:id 修改分类
4. DELETE /api/classify/:id 删除分类

文章管理 API

1. GET /api/article 获取所有文章
2. GET /api/article?classify_id=1 获取 ID 为 1 的分类下的文章
3. GET /api/article/:id 获取该 ID 的文章
4. POST /api/aritcle 添加文章
5. PUT /api/aritcle/:id 修改文章
6. DELETE /api/aritcle/:id 删除文章

使用 POSTMAN 测试以上接口，确保可用
