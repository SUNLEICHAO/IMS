import request from '@/utils/request.js';
import API from '@/consts/api.js';

const userService = {
  getUserInfo() {
    return request.get(API.userInfo);
  },
  login(data, config) {
    return request.post(API.login, data, config);
  },
  test() {
    return request.get(API.userInfo);
  },
  getAllUsers() {
    return request.get(API.user);
  },
  insertUser(data) {
    return request.post(API.user, data);
  }
};

export default userService;
