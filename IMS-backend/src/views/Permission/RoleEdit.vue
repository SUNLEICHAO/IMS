<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import roleService from '@/services/role.js';
import permissionService from '@/services/permission.js';

const { params } = useRoute();
const router = useRouter()

let permissions = reactive([])
onMounted(() => {
  roleService.getOneRole(params.id).then(e => {
    console.log(e);
    let role = e.data.role;
    form.name = role.name;
    form.desc = role.desc;
    // 问题，这里为何还需要转一下(数据类型的问题)
    form.permissionsList.push(...e.data.permissionsTransform.map(e => +e))
  })
  permissionService.getPermissions().then(res => {
    permissions.push(...res.data)
  })
})

let form = reactive({
  name: null,
  desc: null,
  permissionsList: [],
})
let onSubmit = function () {
  roleService.updateRole({
    role_id: params.id,
    roleName: form.name,
    roleDesc: form.desc,
    permissionsList: form.permissionsList
  }).then(() => {
    alert('成功了')
    router.push({
      path: `/permission/role`,
    })
  }).catch(err => {
    console.log(err)
  })
}
let onCancel = function () {
  console.log(form.permissionsList)
  router.push({
    path: `/permission/role`,
  })
}
</script>

<template>
  <div class="role-edit main-topic">RoleEdit</div>
  <el-form :model="form" label-width="120px" style="width: 500px">
    <el-form-item label="角色名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.desc" />
    </el-form-item>
    <el-form-item label="权限">
      <el-checkbox-group v-model="form.permissionsList">
        <el-checkbox v-for="permission in permissions" :label="permission.id" name="type" :key="permission.id">{{
          permission.permission }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交修改</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
