import request from '@/utils/request.js';
import API from '@/consts/api.js';

const roleService = {
  getAllRoles() {
    return request.get(API.role);
  },
  getOneRole(id) {
    return request.get(API.role+'/'+id);
  },
  insertRole(data) {
    return request.post(API.role, data);
  },
  updateRole(data) {
    return request.put(API.role, data);
  },
  deleteRole(params) {
    return request.delete(API.role, params);
  },
};

export default roleService;
