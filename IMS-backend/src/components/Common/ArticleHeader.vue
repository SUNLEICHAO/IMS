<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
})
</script>

<template>
  <div class="page-header">
    <div class="header-left">
      <slot name="left">
        <span class="header-title">{{ props.title }}</span>
      </slot>
    </div>
    <div class="header-right">
      <slot name="right">
      </slot>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.page-header {
  // text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: #fff;

  .header-title {
    font-size: 26px;
  }

  
}
</style>
