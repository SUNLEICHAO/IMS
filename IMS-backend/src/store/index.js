import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      userInfo: null,
      // permissions: ['role-index', 'manager-index', 'article-index', 'article-classify', 'role-edit'],
      permissions: [],
    };
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    }
  }
});

export default useStore;
