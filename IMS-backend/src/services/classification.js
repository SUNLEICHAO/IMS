import request from '@/utils/request.js';
import API from '@/consts/api.js';

const classificationService = {
  getAllClassifications: () => {
    return request.get(API.classification);
  },
  insertClassification: (data) => {
    return request.post(API.classification, data);
  },
  deleteClassification: (id) => {
    return request.delete(API.classification+ '/' + id);
  },
  updateClassification: (id, data) => {
    return request.put(API.classification + '/' + id, data);
  }
};

export default classificationService;
