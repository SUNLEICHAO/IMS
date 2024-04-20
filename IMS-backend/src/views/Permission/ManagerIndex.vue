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
  <div class="manager-page">
    <div class="page-header">
      <el-button class="mt-4 role-add" @click="handleAdd">添加用户</el-button>
    </div>
    <el-table :data="users" style="width:100%">
      <el-table-column prop="user_id" label="#" width="180" />
      <el-table-column prop="user_name" label="用户名称" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="role_name" label="角色" width="180" />
    </el-table>

  </div>

</template>

<style type="text/css" lang="less" scoped>
.manager-page {
  text-align: right;

  .role-add {
    margin-bottom: 20px;
  }
}
</style>