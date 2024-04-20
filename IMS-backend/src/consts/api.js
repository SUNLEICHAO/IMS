const PREFIX = `${import.meta.env.VITE_APP_HOST}`;
const WEB_PREFIX = `${PREFIX}/api/web`;
const ADMIN_PREFIX = `${PREFIX}/api/admin`;

export default {
  userInfo: `${WEB_PREFIX}/users/user-info`,
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  permissions: `${ADMIN_PREFIX}/api/permission/permissions`,
  login: `${ADMIN_PREFIX}/api/login`,
  role: `${ADMIN_PREFIX}/api/permission/role`,
  user: `${ADMIN_PREFIX}/api/permission/user`,
  article: `${ADMIN_PREFIX}/api/article`,
  classification: `${ADMIN_PREFIX}/api/classification`,

  music: `${ADMIN_PREFIX}/api/music`
};
