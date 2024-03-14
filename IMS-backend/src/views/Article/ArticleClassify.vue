<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import ArticleHeader from "@/components/Common/ArticleHeader.vue"
import classificationService from '@/services/classification';
// import { useRouter } from 'vue-router';
// import articleService from '@/services/article';
// const router = useRouter()

const classificationData = ref([])

onMounted(() => {
  getData()
})

function getData() {
  classificationService.getAllClassifications().then(res => {
    classificationData.value = []
    classificationData.value.push(...res.data)
  })
}

function handleGoEdit(classification) {
  ElMessageBox.prompt('请在下面完成类名的修改', '类名修改', {
    confirmButtonText: '完成',
    cancelButtonText: '取消',
    inputValue: classification.name,
    inputValidator: (s) => { return s.trim() !== '' },
    inputErrorMessage: '无效',
  })
    .then(({ value }) => {
      classificationService.updateClassification(classification.id, {
        name: value
      })
      classificationData.value.forEach(e => {
        if (e.id == classification.id) {
          e.name = value
        }
      })
      ElMessage({
        type: 'success',
        message: `类名已更改为 “${value}” ~ `,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改',
      })
    })
}

function handleDeleteClassification(id) {
  ElMessageBox.confirm(
    '该操作将删除该分类，确认？',
    'Warning',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      classificationService.deleteClassification(id).then(res => {
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
        message: '删除取消',
      })
    })

}

function handleInsertClassification() {
  ElMessageBox.prompt('请输入要添加的类名', '添加分类', {
    confirmButtonText: '完成',
    cancelButtonText: '取消',
    inputValue: '',
    inputValidator: (s) => { return s.trim() !== '' },
    inputErrorMessage: '无效',
  })
    .then(({ value }) => {
      classificationService.insertClassification({ name: value })
      getData()
      ElMessage({
        type: 'success',
        message: `已添加类名 “${value}”  `,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消添加',
      })
    })

}
</script>

<template>
  <h1></h1>
  <div class="the-page article-classification">
    <div class="page-header">
      <ArticleHeader title="分类管理">
        <template v-slot:right>
          <el-button type="primary" round @click="handleInsertClassification">添加分类</el-button>
        </template>
      </ArticleHeader>
    </div>
    <div class="page-body">
      <div class="table-section">
        <el-table :data="classificationData" style='width: 600px;'>
          <el-table-column prop="id" label="编号/id" width="120" />
          <el-table-column prop="name" label="分类名称" />
          <el-table-column prop="action" label="操作" v-slot="scope">
            <el-button type="primary" text @click="handleGoEdit(scope.row)">
              <EditOutlined />
              <span class='item-action'>编辑</span>
            </el-button>
            <el-button type="primary" text @click="handleDeleteClassification(scope.row.id)">
              <DeleteOutlined />
              <span class='item-action'>删除</span>
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.page-body {
  .table-section {
    .el-table {
      padding-bottom: 40px;
    }
  }
}
</style>
