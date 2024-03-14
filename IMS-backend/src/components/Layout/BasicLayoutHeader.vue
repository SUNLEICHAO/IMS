<script setup>
import { onMounted, ref } from 'vue'
import { HeartOutlined, PoweroffOutlined, DownOutlined } from '@ant-design/icons-vue'
import Cookies from 'js-cookie';
import userService from '@/services/user.js';
import { pinyin } from 'pinyin-pro';

const userInfo = ref({
  id: null,
  name: null,
  role_name: null,
})
const avatar = ref();

onMounted(() => {
  userService.getUserInfo().then(res => {
    userInfo.value.id = res.data.id;
    userInfo.value.name = res.data.name;
    userInfo.value.role_name = res.data.role_name;
    avatar.value = pinyin(userInfo.value.name, { toneType: 'none' })[0].toUpperCase()
  })
})

function handleQuit() {
  Cookies.remove('web_token')
  location.reload()
}


</script>

<template>
  <div class="header-section">
    <div class="header-hd"></div>
    <div class="header-bd"></div>
    <div class="header-ft">
      <el-dropdown style="height:100%">
        <div class="bar-info-container">
          <i class="userInfo-avatar">{{ avatar }}</i>
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
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 50%;
    margin: 0 10px;
    background-size: 100%;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    color: #fafafa;
    background-color: #0384d4;
  }
}
</style>
