import request from '@/utils/request.js';
import API from '@/consts/api.js';

const musicService = {
  getAllMusics() {
    return request.get(API.music);
  }
};

export default musicService;
