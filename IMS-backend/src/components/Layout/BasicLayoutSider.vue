<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store/index';
import { RotateLeftOutlined } from '@ant-design/icons-vue';
import routesAll from '@/router/routes';
import { formatRoutes } from '@/utils/permission';
const route = useRoute();
const { permissions } = useStore();

const navRoutes = ref(formatRoutes(routesAll, permissions));
// 更改为计算属性后，页面内通过router跳转时可以更新，ref时不可以。
// const activeIndex = ref(route.name);
const activeIndex = computed(() => route.name);

const router = useRouter()
function handleGoHome() {
  router.push('/')
}

</script>

<template>
  <div class="sider-section" :style="[{ width: '243px' }]">
    <div class="logo-section">
      <div class="header-logo-container" @click="handleGoHome">
        <!-- <img v-show="!isCollapse" class="header-logo-element" alt="斗西家计划" src="@/assets/logo.svg" /> -->
        <img src="@/assets/images/logo-seaio.png" alt="" class="header-logo-element">
        <span style="font-weight: 600;">信息管理系统</span>
      </div>
    </div>
    <div class="menu-section">
      <el-scrollbar>
        <el-menu :router="true" :default-active="activeIndex">
          <template v-for="route in navRoutes">
            <el-sub-menu v-if="route.children.length" :index="route.name" :key="route.path">
              <template #title>
                <!-- <el-icon>
                  <RotateLeftOutlined />
                </el-icon> -->
                <!-- 借鉴icon的资料 -->
                <svg-icon v-if="route.meta.nav?.icon" :name="route.meta.nav.icon" width="24px" height="18px"
                  style="margin-right: 5px"></svg-icon>
                <span>{{ route.meta.nav.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="data in route.children" :key="data.name" :index="data.name"
                  :route="{ name: data.name }">
                  <span>{{ data.meta.nav.title }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item v-else :key="route.name" :index="route.name" :route="{ name: route.name }">
              <span>{{ route.meta.nav.title }}1</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<style type="text/css" lang="less" scoped>
.sider-section {
  position: relative;
  width: 243px;
  background-color: #fff;
  border-right: 2px #eee solid;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;

  .menu-section {
    max-height: calc(100vh - 56px);
  }

  :deep(.el-menu) {
    border-right: none;
  }
}

.header-logo-container {
  display: flex;
  height: 54px;

  // background-color: pink;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .header-logo-element {
    height: 30px;
    margin-right: 8px;
  }

}
</style>
