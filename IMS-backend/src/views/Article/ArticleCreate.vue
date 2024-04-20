<script setup>
import { ref, onMounted, computed } from 'vue';
import ArticleHeader from "@/components/Common/ArticleHeader.vue"
import { useRoute, useRouter, RouterView } from 'vue-router';
import { ElMessage } from 'element-plus'
import ImageUploader from 'quill-image-uploader';

import articleService from '@/services/article';
import ossService from '@/services/oss';
import classificationService from '@/services/classification';

onMounted(() => {

  classificationService.getAllClassifications().then(res => {
    classifications.value.push(...res.data)
  })

})
const router = useRouter()
const articleForm = ref({
  title: null,
  classification_id: null,
  content: null
})
const classifications = ref([])
const quillEditor = ref(null);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],
  ['link', 'image', 'video'],
];

const options = {
  theme: 'snow',
  placeholder: '请在此输入内容',
  modules: {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
      upload: file => {
        return new Promise((resolve, reject) => {
          // const formData = new FormData();
          // formData.append("image", file);
          console.log('要上传~');
          ossService.upload({ file, space: 'ims', folder: 'article' },
            (res => { 
              console.log(res);
              resolve(res.url);
             }),
            (error => { console.log(error); }),
            (end => { console.log(end); }),
            (res => { console.log(res); }),
          )
            .then(res => {
              console.log(res)
              // resolve(res.data.url);
              resolve(res);
              // resolve('sss');
            })
            .catch(err => {
              reject("Upload failed");
              console.error("Error:", err)
            })
          // console.log('ssss图片');
          // setTimeout(() => {
          //   resolve(
          //     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
          //   );
          // }, 3500);
        })
      }
    }
  },
}



function onSubmit() {
  if (Object.values(articleForm.value).some(e => e === null)) {
    ElMessage.error('信息补充完整后才可以创建~')
    return
  }
  articleService.insertArticle({
    title: articleForm.value.title,
    classification_id: articleForm.value.classification_id,
    content: articleForm.value.content,
  }).then(res => {
    ElMessage.success('创建成功~')
    router.push('/article')
  })
}
function handleReset() {
  Object.keys(articleForm.value).forEach(e => articleForm.value[e] = null)
  // 富文本编辑器的内容清空
  quillEditor.value.setText('')
}
</script>

<template>
  <div class="the-page article-create">
    <div class="page-header">
      <ArticleHeader title="文章创建">
        <template v-slot:right>
          <span class="header-action" @click="router.push('/article')">&#8617; 返回文章列表</span>
        </template>
      </ArticleHeader>
    </div>
    <div class="page-body">
      {{ articleForm.content }}
      <div class="input-section">
        <el-form :model="articleForm" label-width="auto" style="max-width: 600px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title" />
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="articleForm.classification_id" placeholder="选择文章分类">
              <el-option v-for="item in classifications" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <QuillEditor ref="quillEditor" style="width: 800px; height: 300px;" v-model:content="articleForm.content"
              contentType="html" :options="options" :modules="options.modules" :toolbar="toolbarOptions" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
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

  :deep(.el-form-item:last-child) {
    .el-form-item__content {
      justify-content: center;
    }
  }
}
</style>
