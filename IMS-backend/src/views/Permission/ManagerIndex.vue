<script setup>
import { onMounted, reactive } from 'vue'
import userService from '@/services/user.js';
import { useRouter } from "vue-router"

const router = useRouter()

let users = reactive([]);

onMounted(() => {
  userService.getAllUsers().then(res => {
    users.push(...res.data)
  })
})

let handleAdd = function () {
  router.push({
    path: `/permission/manager/create`,
  })
}

</script>
<template>
  <div class="manager-index main-topic">ManagerIndex</div>
  <div class="table">
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="user_id" label="用户ID" width="180" />
      <el-table-column prop="user_name" label="用户名称" width="180" />
      <el-table-column prop="phone" label="电话" width="180" />
      <el-table-column prop="role_name" label="角色" width="180" />
      <!-- <el-table-column label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
        <el-button link type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column> -->
    </el-table>
    <el-button class="mt-4 role-add" @click="handleAdd">添加用户</el-button>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.table {
  width: 750px;

  .el-table {
    font-size: 18px;
  }

  .role-add {
    width: 150px;
    margin: 0 auto;
    display: block;
    margin-top: 20px;
  }
}
</style>