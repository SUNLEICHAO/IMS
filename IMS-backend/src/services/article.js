import request from '@/utils/request.js';
import API from '@/consts/api.js';

const articleService = {
  getAllArticles: () => {
    return request.get(API.article);
  },
  getOneArticle: (id) => {
    return request.get(API.article + '/' + id);
  },
  insertArticle: (data) => {
    return request.post(API.article, data);
  },
  deleteArticle: (id) => {
    return request.delete(API.article + '/' + id);
  },
  updateArticle: (params) => {
    return request.put(API.article, params);
  }
};

export default articleService;
