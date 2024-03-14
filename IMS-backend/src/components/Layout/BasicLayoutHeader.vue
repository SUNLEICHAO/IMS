<script setup>
import { onMounted, reactive } from 'vue'
import { HeartOutlined, PoweroffOutlined, DownOutlined } from '@ant-design/icons-vue'
import Cookies from 'js-cookie';
// import LocalCache from '@/utils/cache';
import userService from '@/services/user.js';

// import { computed } from 'vue';
// import { useStore } from '@/stores/index.js';
// const store = useStore();
// const userInfo = computed(() => store.userInfo);

// function handleNavToLogin() {
//   console.log('handleNavToLoagin');
// }

// function handleCommand(command) {
//   console.log(command);
// }

// let userInfo = LocalCache.getCache('userInfo')
const userInfo = reactive({
  id: null,
  name: null,
  role_name: null,
})
onMounted(() => {
  userService.getUserInfo().then(res => {
    userInfo.id = res.data.id;
    userInfo.name = res.data.name;
    userInfo.role_name = res.data.role_name;
  })
})
let handleQuit = function () {
  Cookies.remove('web_token')
  location.reload()
}


</script>

<template>
  <div class="header-section">
    <div class="header-hd"></div>
    <div class="header-bd"></div>
    <div class="header-ft">
      <div class="bar-info-container">
        <HeartOutlined />
      </div>
      <el-dropdown style="height:100%">
        <div class="bar-info-container">
          <i class="userInfo-avatar"></i>
          <span class="userInfo-name">{{ userInfo.name }} （{{ userInfo.role_name }}）</span>
          <DownOutlined :style="{ fontsize: '10px', marginLeft: '4px' }" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleQuit">
              <PoweroffOutlined :style="{ marginRight: '4px' }" />退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.header-section {
  position: relative;
  padding: 0 16px;
  height: 54px;
  display: flex;
  z-index: 10;
  background-color: #fff;

  .header-bd {
    flex: 1;
  }
}

.header-hd,
.header-bd,
.header-ft {
  display: flex;
  align-items: center;
}

.bar-info-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #ecf5ff;
  }

  .userInfo-name {
    font-size: 16px;
    vertical-align: middle;
    font-weight: 600;
  }

  .userInfo-avatar {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 10px;
    background-image: url('@/assets/images/avatar.webp');
    background-size: 100%;
  }
}
</style>
