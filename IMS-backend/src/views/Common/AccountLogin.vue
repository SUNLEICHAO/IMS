<script setup>
import { ref } from 'vue'
import userService from '@/services/user.js';
import Cookies from 'js-cookie';
import { useRouter } from "vue-router"

const router = useRouter()
const smsRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '目前只支持大陆的手机号码',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
const formData = ref({
  phone: '',
  password: '',
  code: null,
  checked: false
})
const smsText = ref('发送验证码')
const smsDisabled = ref(false)
const loginType = ref('first')

function handleSmsCode(e) {
  console.log(e);
}
function handleSubmit() {
  if (loginType.value === 'second') {
    alert('暂不支持该登陆方式')
  }
  let phone = formData.value.phone;
  let password = formData.value.password;

  let token = ''
  var inFifteenMinutes = new Date(new Date().getTime() + 4 * 60 * 60 * 1000); //设置过期时间
  userService.login({
    tel: phone,
    password,
  }).then(function (response) {
    console.log(response);
    if (response.data.code !== 200) return
    token = response.data.token;

    Cookies.set('web_token', token, { expires: inFifteenMinutes })
    // 问题：是否所有的逻辑，都要放在这里？
    router.push({
      path: '/',
    })
  }).catch(function (error) {
    console.log(error);
  })
}
</script>

<template>
  <div class="the-page login-page">
    <div class="page-body">
      <div class="form-section">
        <div class="form-title">极客信息发布管理</div>
        <el-tabs v-model="loginType" class="demo-tabs">
          <el-tab-pane label="账号密码登录" name="first">
            <el-form :model="formData" :rules="smsRules">
              <el-form-item prop="phone">
                <el-input placeholder="请输入手机号" v-model="formData.phone" autocomplete="off"
                  @keyup.enter="handleSubmit"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="formData.password" autocomplete="off"
                  @keyup.enter="handleSubmit"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%" type="primary" @keydown.enter="handleSubmit"
                  @click="handleSubmit">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="验证码登录" name="second" disabled>
            <el-form :model="formData" :rules="smsRules">
              <el-form-item prop="phone">
                <el-input type="number" placeholder="请输入手机号" v-model="formData.phone" autocomplete="off"
                  @keyup.enter="handleSubmit"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-col :span="14">
                  <el-input type="text" placeholder="请输入验证码" v-model="formData.code" autocomplete="off"></el-input>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="5">
                  <el-button :smsDisable="smsDisabled" @click="handleSmsCode">{{ smsText
                    }}</el-button>
                </el-col>
              </el-form-item>
              <el-form-item prop="checked">
                <el-checkbox v-model="formData.checked">自动登录</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button style="width:100%" type="primary" @keydown.enter="handleSubmit"
                  @click="handleSubmit">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>


      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.login-page {
  display: flex;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #000;
  background: url(@/assets/images/bg-aurora.jpg) no-repeat top/cover;

  .form-section {
    text-align: center;
    background: #f0f2f5ef;
    text-align: center;
    // max-width: 388px;
    width: 400px;
    border-radius: 20px;
    // margin: 40px auto;
    padding: 20px 26px;

    .form-title {
      margin-bottom: 18px;
      font-size: 14px;
      opacity: 0.5;
      text-align: center;
      font-size: 20px;
      color: #000;
      font-weight: 600;
    }
  }
}
</style>