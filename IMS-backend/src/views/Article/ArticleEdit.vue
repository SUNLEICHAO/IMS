<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter, RouterView } from 'vue-router';
import articleService from '@/services/article';
import { ElMessage } from 'element-plus'
import classificationService from '@/services/classification';
import ArticleHeader from "@/components/Common/ArticleHeader.vue"

const route = useRoute();

onMounted(() => {
  articleService.getOneArticle(route.params.id).then(res => {
    articleForm.value = res.data.article;
  })

  classificationService.getAllClassifications().then(res => {
    classifications.value.push(...res.data)
  })
})

const router = useRouter()
const articleForm = ref({
  id: '',
  // 待展示的三种属性
  title: '',
  classification_id: '',
  content: ''
})
const classifications = ref([])
function onSubmit() {
  // console.log('提交:', articleForm.value);
  articleService.updateArticle({
    id: articleForm.value.id,
    title: articleForm.value.title,
    classification_id: articleForm.value.classification_id,
    content: articleForm.value.content,
  }).then(res => {
    ElMessage.success('修改成功~')
    router.go(-1)
  })
}

</script>

<template>
  <div class="article-edit">
    <div class="page-header">
      <ArticleHeader title="文章编辑">
        <template v-slot:right>
          <span class="header-action" @click="router.push('/article')">&#8617; 返回文章列表</span>
        </template>
      </ArticleHeader>
    </div>
    <div class="page-body">
      <div class="input-section">
        <el-form :model="articleForm" label-width="auto" style="max-width: 800px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title" />
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="articleForm.classification_id" placeholder="please select your zone">
              <el-option v-for="item in classifications" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="内容" style="height: 400px;">
            <QuillEditor style="width: 800px; height: 300px;" v-model:content="articleForm.content" theme="snow"
              placeholder="请在此输入内容" contentType="html" toolbar="full" />
          </el-form-item>
          <el-form-item style="margin-top: 30px;">
            <el-button type="primary" style="margin: 0 auto; padding: 0 60px;" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.header-action {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.input-section {
  margin-top: 20px;
  padding-left: 24px;
}
</style>
