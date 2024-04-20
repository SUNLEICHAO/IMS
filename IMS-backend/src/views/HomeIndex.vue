<script setup>
import { ref, onMounted } from 'vue'
import userService from '@/services/user.js';
// import '@vueup/vue-quill/dist/vue-quill.snow.css'
const userName = ref(null)
const greeting = ref(null)

onMounted(() => {
  userService.getUserInfo().then(res => {
    userName.value = res.data.name;
  })

  getGreeting()
})

function getGreeting() {
  let periods = {
    '早上': [5, 10],
    '中午': [10, 14],
    '下午': [14, 18],
    '晚上': [18, 23]
  };
  let hour = new Date().getHours();
  // let hour = 17

  for (let period of Object.keys(periods)) {
    let span = periods[period]
    if (hour > span[0] && hour <= span[1]) {
      greeting.value = `，${period}好`
      return
    }
  }

}

</script>

<template>
  <div class="home-page">
    <div class="welcome-container">
      <div class="welcome-title">SEAIO信息管理系统</div>
      <div class="welcome-msg">
        <div class="welcome-text">欢迎{{ userName }}{{ greeting }}~</div>
        <p>本系统包含文章管理系统和音乐播放系统</p>
      </div>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.welcome-container {
  .welcome-title {
    font-size: 32px;
  }

  .welcome-msg {
    padding: 16px 24px;
    margin-top: 24px;
    border-left: 6px solid #6ab6f3;
    border-radius: 4px;
    font-size: 16px;
    background-color: #dcdcdc;

    .welcome-text {
      font-size: 24px;
      line-height: 48px;
      color: #666;
    }
  }
}
</style>
