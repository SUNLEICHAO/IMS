<script setup>
// 需要的数据：form，表格的宽度，按钮名称
defineProps({
  form: {},
  formWidth: ''
})
</script>

<template>
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
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>