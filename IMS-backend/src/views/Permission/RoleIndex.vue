<script setup>
import { onMounted, inject, reactive, ref } from 'vue';
import roleService from '@/services/role.js';
import { useRouter } from 'vue-router';

const router = useRouter();

let roles = ref([]);
onMounted(() => {
  getData()
});

function getData() {
  roleService.getAllRoles().then((res) => {
    roles.value = res.data;
  });
}

let handleEdit = function (ele) {
  router.push({
    path: `role/${ele.id}/edit`
  });
};

// 问题，局部刷新该怎么做
// const reload = inject("reload");
// reload()

let handleDelete = function (ele) {
  let role_id = ele.id;

  if ([1, 2].includes(role_id)) {
    alert('无权删除该角色！')
    return
  }
  console.log(roles);
  roleService.deleteRole({ id: role_id }).then((res) => {
    console.log(res.data);
    alert('删除成功');
    getData()
  });
};

let handleAdd = function () {
  router.push({
    path: `/permission/role/create`
  });
};
</script>

<template>
  <div class="role-index main-topic">RoleIndex</div>
  <div class="table">
    <el-table :data="roles" stripe style="width: 100%">
      <el-table-column prop="id" label="角色ID" width="100" />
      <el-table-column prop="name" label="角色名称" width="180" />
      <el-table-column prop="desc" label="描述" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" @click="handleEdit(scope.row)">修改</el-button>
          <el-button link type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="mt-4 role-add" @click="handleAdd">添加角色</el-button>
  </div>
</template>
<style type="text/css" lang="less" scoped>
.table {
  width: 700px;

  .el-table {
    font-size: 18px;

    .el-table-column {
      text-align: center;
      font-size: 30px;
    }
  }


  .role-add {
    width: 150px;
    margin: 0 auto;
    display: block;
    margin-top: 20px;
  }
}
</style>
