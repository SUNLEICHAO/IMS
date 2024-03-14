import './assets/css/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';
import 'virtual:svg-icons-register';

import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css'



import SvgIcon from '@/components/Common/SvgIcon.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  local: zhCn
});
app.component('SvgIcon', SvgIcon);

app.component('QuillEditor', QuillEditor);

app.mount('#app');
