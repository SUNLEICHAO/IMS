const RoleIndex = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleIndex.vue');
const RoleEdit = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleEdit.vue');
const RoleShow = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleShow.vue');
const ManagerIndex = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/ManagerIndex.vue');
const RoleCreate = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/RoleCreate.vue');
const ManagerCreate = () =>
  import(/* webpackChunkName: "permission" */ '@/views/Permission/ManagerCreate.vue');

export default [
  {
    path: '/permission',
    name: 'Permission',
    redirect: { name: 'RoleIndex' },
    meta: {
      permission: 'role-index,manager-index',
      title: '权限设置',
      nav: {
        // icon: 'el-icon-goods',
        icon: 'icon-setting',
        title: '权限设置'
      },
      breadcrumb: {
        name: '权限'
      }
    },
    children: [
      {
        path: 'role',
        name: 'RoleIndex',
        component: RoleIndex,
        meta: {
          permission: 'role-index',
          nav: {
            title: '角色管理'
          },
          breadcrumb: {
            name: '角色管理'
          }
        }
      },
      {
        path: 'role/:id',
        name: 'RoleShow',
        component: RoleShow
      },
      {
        path: 'role/:id/edit',
        name: 'RoleEdit',
        component: RoleEdit
      },
      {
        path: 'role/create',
        name: 'RoleCreate',
        component: RoleCreate
      },
      {
        path: 'manager',
        name: 'ManagerIndex',
        component: ManagerIndex,
        meta: {
          permission: 'manager-index',
          nav: {
            title: '用户管理'
          },
          breadcrumb: {
            name: '用户管理'
          }
        }
      },
      {
        path: 'manager/create',
        name: 'ManagerCreate',
        component: ManagerCreate
      }
    ]
  }
];
