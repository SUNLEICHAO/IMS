<script setup>
import { ref, defineComponent } from 'vue'
import userService from '@/services/user.js';
// import '@vueup/vue-quill/dist/vue-quill.snow.css'

let t = ref('')
let arr = '床前明月光'.split('')
let handleSubmit = function () {
  console.log(arr);
  t.value = arr[Math.random() * arr.length | 0]
  userService.getUserInfo().then(res => {
    console.log(res);
  })
}

const content1 = ref(null)
function onEditorChange(editor) {
  console.log('editor change!', editor.value)
  // this.content = html
}
</script>



<template>
  <div>
    <div class="home-page">Home<svg-icon name="icon-setting" width="64px" height="64px"></svg-icon></div>
    <span>{{ t }}</span>
    <el-button style="width:80px" type="primary" @click="handleSubmit">点击(test)</el-button>

    <!-- {{ content1 }} -->
    <div v-html="content1"></div>
    <!-- <QuillEditor theme="snow" /> -->

  </div>
</template>
