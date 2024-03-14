<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import ArticleHeader from "@/components/Common/ArticleHeader.vue"
import articleService from '@/services/article';

const router = useRouter()
onMounted(() => {
  getData()
})
const articleData = ref([])

const currentPage = ref(1)
const articlesTotal = computed(() => articleData.value.length)

function getData() {
  articleService.getAllArticles().then(res => {
    articleData.value = res.data.result
  })
}
function handleDeleteArticle(scope) {
  ElMessageBox.confirm(
    '该操作将删除该文章，确认？',
    'Warning',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      articleService.deleteArticle(scope.row.id).then(res => {
        ElMessage({
          type: 'success',
          message: '已删除！',
        })
        getData()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}
function handleGoEdit(scope) {
  router.push({
    path: `article/${scope.row.id}/edit`
  })
}

</script>

<template>
  <div class="the-page article-index">
    <ArticleHeader title="文章列表">
      <template v-slot:right>
        <span class="header-action" @click="router.push('/article/create')">新建文章</span>
      </template>
    </ArticleHeader>
    <div class="page-body">
      <div class="table-section">
        <el-table :data="articleData" style="width: 1000px;">
          <el-table-column prop="id" label="编号" width="120" />
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="classification_name" label="分类" width="160" />
          <el-table-column prop="action" label="操作">
            <template #default="scope">
              <el-button type="primary" text @click="handleGoEdit(scope)">
                <EditOutlined />
                <span class='item-action'>编辑</span>
              </el-button>
              <el-button type="primary" text @click="handleDeleteArticle(scope)">
                <DeleteOutlined />
                <span class='item-action'>删除</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-pagination">
          <el-pagination layout="prev, pager, next" v-model:current-page="currentPage" :total="articlesTotal" />
        </div>
      </div>

    </div>

  </div>
</template>

<style type="text/css" lang="less" scoped>
.the-page {
  .item-action {
    margin-left: 10px;
  }

  .header-action {
    color: #639137;
    transition: all 1s;
    font-size: 20px;
    text-decoration: none;
    font-weight: 400;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .page-body {
    .table-section {
      .table-pagination {
        // background-color: pink;
        text-align: right;
        padding-left: 390px;
        margin-top: 30px;
        // :deep(.el-pagination) {
        //   display: inline-flex;
        // }
      }
    }
  }
}
</style>
