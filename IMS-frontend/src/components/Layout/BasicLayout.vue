<script setup>
import { RouterView } from 'vue-router';
import BasicLayoutHeader from './BasicLayoutHeader.vue';
import BasicLayoutFooter from './BasicLayoutFooter.vue';
</script>

<template>
  <div class="page-basic-layout">
    <BasicLayoutHeader class="page-basic-header" />
    <RouterView class="page-basic-body" />
    <BasicLayoutFooter class="page-basic-footer" />
  </div>
</template>

<style lang="less" scoped>
.page-basic-layout {
  min-height: 100vh;
  min-width: 1080px;
  display: flex;
  flex-direction: column;
  // background-color: pink;
  background-color: #F0EDEE;
}

.page-basic-body {
  flex: 1;
}
</style>
