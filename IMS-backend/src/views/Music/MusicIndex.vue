<script setup>
import { ref, onMounted, computed } from 'vue';

import musicService from '@/services/music';

let musicData = ref([])

onMounted(() => {
  getData()
})

function getData() {
  musicService.getAllMusics().then(res => {
    musicData.value = res.data
    // console.log(musicData.value);
  })
}

function padZero(input) {
  var str = String(input);

  if (str.length === 1) {
    return '0' + str;
  } else {
    return str;
  }
}
</script>

<template>
  <el-table :data="musicData" style="width: 100%" empty-text="暂无">
    <el-table-column label="#" width="60">
      <template #default="scope">
        {{ padZero(scope.row.id) }}
      </template>
    </el-table-column>
    <el-table-column prop="title" label="名称" width="180" />
    <el-table-column prop="author" label="作者" width="180" />
    <el-table-column prop="user_id" label="用户" width="180" />
    <el-table-column prop="mood_id" label="风格" width="180" />
    <el-table-column prop="url" label="链接" />
  </el-table>
</template>

<style type="text/css" lang="less" scoped></style>
