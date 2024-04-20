<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import articleService from '@/services/article';

const router = useRouter();
const route = useRoute();
// 请求该类别下的所有文章
const articleData = ref([])

onMounted(() => {
  classification_id.value = route.params.id
  getData()
})

function getData() {
  articleService.getAllArticles({ classification_id: route.params.id }).then(res => {
    articleData.value = res.data.result.map((e, index) => {
      e['serial'] = index + 1
      e['created_time'] = new Date(e.created_at).toLocaleString()
      return e
    });
  })
}

let classification_id = ref(null)
watch(() => route.path, (newPath, oldPath) => {
  getData()
  classification_id.value = route.params;
}
);

function handleGoArticle(e) {
  console.log(e.id);
  router.push(`/article/${e.id}`)
}

</script>

<template>
  <div class="the-page">
    <div class="article-list">
      <template v-if="articleData.length > 0">
        <div class="article-item" v-for="article in articleData" :key="article.id">
          <div class="article-item__left">
            <div class="article-item__id"> {{ article.serial }} </div>
          </div>
          <div class="article-item__right">
            <div class="article-item__title" @click="handleGoArticle(article)">
              {{ article.title }}
            </div>
            <div class="article-item__creatTime"> {{ article.created_time }} </div>
          </div>
        </div>
      </template>
      <div v-else>
        <div style="text-align: center;font-size: 26px;padding: 20px;">抱歉~ 该分类下暂无文章</div>
      </div>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.article-list {
  flex-direction: column;
  display: flex;
  padding-top: 10px;
  margin: 0px auto;
  width: 1200px;
  background-color: rgba(255, 255, 255, 0.711);
  border-radius: 0 0 0 10px;
  overflow: hidden;

  .article-item {
    display: flex;
    border-bottom: 1px solid #8882;
    padding: 4px 0 2px;
    background-color: transparent;
    transition: .5s all;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #ddd;
    }

    .article-item__left {
      width: 40px;
      text-align: left;

      .article-item__id {
        color: #888;
        font-size: 20px;
        margin-left: 14px;
        margin-top: -2px;
        font-weight: 600;
      }
    }

    .article-item__right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 12px;
      color: #888;

      .article-item__title {
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        color: #000;
      }
    }
  }
}
</style>
