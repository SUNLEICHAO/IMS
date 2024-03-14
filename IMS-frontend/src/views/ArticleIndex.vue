<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import articleService from '@/services/article';

const route = useRoute();
const article = ref()

onMounted(() => {
  console.log(route.query.id);
  articleService.getOneArticle(route.params.id).then(res => {
    // 将后端返回的时间字符串转为时间对象
    let timeObj = new Date(res.data.article.created_at);
    // 调用该对象的toLocaleString方法，得到本地时间，同时赋值给res对象
    res.data.article.created_time = timeObj.toLocaleString();
    article.value = res.data.article;
  })
})

</script>

<template>
  <div class="the-papaer article-page">
    <div class="article-section" v-if="article">
      <div class="article-title"> {{ article.title }} </div>
      <div class="article-time"> {{ article.created_time }} </div>
      <div class="article-content">
        <div class="ql-snow ql-editor" v-if="article.content">
          <div v-html="article.content"></div>
        </div>
        <div v-else style="text-align: center;">
          抱歉，该文章暂无内容，请移步至其他文章~
        </div>
      </div>
    </div>
  </div>

</template>

<style type="text/css" lang="less" scoped>
.article-page {
  margin: 0px auto 10px;
  border-radius: 0 0 0 10px;

  .article-section {
    width: 1200px;
    padding-top: 10px;
    margin-top: 10px;
    background-color: #fff7;

    .article-title {
      font-size: 30px;
      text-align: center;
    }

    .article-time {
      text-align: center;
    }

    .article-content {
      padding: 20px 0 40px;
    }
  }
}
</style>
