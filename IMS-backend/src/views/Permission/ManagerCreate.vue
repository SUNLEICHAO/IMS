<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from "vue-router"
import roleService from '@/services/role.js';
import userService from '@/services/user.js';

const router = useRouter()

let roles = reactive([])

// 初始化的时候，就获取了所有的权限数据
onMounted(() => {
  // console.log(`the component is now mounted.`)
  roleService.getAllRoles().then(res => {
    roles.push(...res.data)
    console.log(roles)
  })
})

let form = reactive({
  // name: null,
  // desc: null,
  name: '张三',
  phone: '132000000',
  password: '1234',
  role_id: null,
})
let onSubmit = function () {
  userService.insertUser({
    name: form.name,
    phone: form.phone,
    password: form.password,
    role_id: form.role_id
  }).then(res => {
    console.log(res)
    alert('添加成功！')
    router.push({
      path: `/permission/manager`,
    })
  }).catch
}
let onCancel = function () {
  router.push({
    path: `/permission/manager`,
  })
}

</script>

<template>
  <div class="manager-create main-topic">新建用户</div>
  <el-form :model="form" label-width="120px" style="width: 500px">
    <el-form-item label="用户名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.phone" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item label="角色选择">
      <el-select v-model="form.role_id" class="m-2" placeholder="待选择" size="small" style="width: 240px">
        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定创建</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
