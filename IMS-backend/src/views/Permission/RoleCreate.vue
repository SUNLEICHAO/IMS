<script setup>
import { onMounted,reactive } from 'vue'
import { useRouter } from "vue-router"
import roleService from '@/services/role.js';
import permissionService from '@/services/permission.js';

const router = useRouter()

let permissions = reactive([])

// 初始化的时候，就获取了所有的权限数据
onMounted(() => {
  console.log(`the component is now mounted.`)
  permissionService.getPermissions().then(res => {
    // console.log(res.data)
    permissions.push(...res.data)
  })
})

let form = reactive({
  // name: null,
  // desc: null,
  name: '游客',
  desc: '无权限',
  permissionsList: [],
})

let onSubmit = function () {
  let data = {
    roleName: form.name,
    roleDesc: form.desc,
    // permissionsList: JSON.stringify(form.permissionsList),
    permissionsList: form.permissionsList,
  };
  console.log(data, '---');

  roleService.insertRole(data).then(res => {
    alert('创建成功~')
    router.push({
      path: `/permission/role`,
    })
  }).catch(e => {
    console.log(e);
  })

}
let onCancel = function () {
  // 要清空数据
  router.push({
    path: `/permission/role`,
  })
}
</script>
<template>
  <div class="role-create main-topic">RoleCreate</div>
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
      <el-button type="primary" @click="onSubmit">确定创建</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
