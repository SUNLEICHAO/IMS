import { createRouter, createWebHistory } from 'vue-router';
import cookies from 'js-cookie';
import routes from './routes';
import NProgress from 'nprogress';
import userService from '@/services/user';
import permissionService from '@/services/permission';

import { useStore } from '@/store/index.js';
// import LocalCache from '@/utils/cache';

const TOKEN_KEY = 'web_token';
const appRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    }
    return { x: 0, y: 0 };
  }
});

appRouter.firstInit = false; // 只触发一次的锁
appRouter.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (to.meta.title) document.title = to.meta.title;
  console.log(to.meta.title);

  const store = useStore();
  const token = cookies.get(TOKEN_KEY);

  // 没有token的情况下的处理，要么跳走，要么去登陆页面
  // 判断：是否存在一个名为"token"的变量，并且当前页面的名称不是"AccountLogin"
  if (!token && !['AccountLogin'].includes(to.name)) {
    next({ name: 'AccountLogin' });
    return;
  }
  // 有 TOKEN 的情况下只请求一次用户信息
  // let userInfo = LocalCache.getCache('userInfo');
  // console.log(userInfo);
  if (token && !appRouter.firstInit) {
    try {
      const permissions = await permissionService.permissions();
      const userInfos = await userService.getUserInfo();

      // console.log(userInfos, '------信息');
      // console.log(permissions, '------信息');
      // 问题，（是否应该）不用网络请求的数据，用第一次登录时随token返回的数据
      store.setPermissions(permissions.data);
      store.setUserInfo(userInfos.data);

      // store.setPermissions(userInfo.permissions);
      // store.setUserInfo(userInfo);

      // 没有任何权限要么跳走，要么去提示页面
      if (!permissions?.data.length) {
        next({ name: 'Forbidden' });
        return;
      }

      appRouter.firstInfo = true;
    } catch (e) {
      next();
      return;
    }
  }

  // if (!store.userInfo?.id && to.meta.auth) {
  //   next({ name: 'Home' });
  //   return;
  // }

  next();
});

// eslint-disable-next-line
appRouter.afterEach((to, from) => {
  NProgress.done();
});

export default appRouter;
