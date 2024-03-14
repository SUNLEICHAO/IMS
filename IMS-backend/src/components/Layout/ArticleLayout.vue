<script setup>
import { RouterView } from 'vue-router';

</script>

<template>
  <div class="article-layout">
    <router-view></router-view>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.article-layout {
  margin-top: 20px;
  background-color: #fff;
  padding: 10px;
}
</style>
