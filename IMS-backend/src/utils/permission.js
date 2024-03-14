export function formatRoutes(routes, permissions) {
  return filterNavRoutes(filterPermissionRoutes(routes, permissions));
}

// permissions: ['role-index', 'manager-index', 'article-index', 'article-category']
// 权限管理
export function filterPermissionRoutes(routes, permissions) {
  // console.log('perm',permissions);

  const filterRoutes = [];
  routes.forEach((data) => {
    const route = { ...data };
    // 是否：没有、有任何权限限制（该路由有无权限信息）
    const notPermission = !route.meta || !route.meta.permission;
    // 所拥有的权限
    const hasPermission =
      // 问题根源：判断是否有权限的逻辑(注意permission/s)
      // !notPermission && route.meta.permissions.split(',').some((item) => permissions.includes(item));
      !notPermission && route.meta.permission.split(',').some((item) => permissions.includes(item));
    // 是否：有具体的权限
    const passPermission = notPermission || hasPermission;
    let hasPath = true;
    if (route.children) {
      route.children = filterPermissionRoutes(data.children, permissions);
      if (route.children.length === 0) {
        hasPath = false;
      }
    }
    if (passPermission && hasPath) {
      filterRoutes.push(route);
    }
  });
  // console.log('rou',filterRoutes);
  return filterRoutes;
}

export function filterNavRoutes(routes) {
  let result = [];
  routes.forEach((data) => {
    if (data.meta && data.meta.nav) {
      let item = {
        name: data.name,
        meta: data.meta
      };
      if (data.children) {
        item.children = filterNavRoutes(data.children);
      }
      result.push(item);
    } else if (data.children) {
      filterNavRoutes(data.children).forEach((item) => {
        result.push(item);
      });
    }
  });
  return result;
}
