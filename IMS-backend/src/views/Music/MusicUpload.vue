<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ossService from '@/services/oss';
import useClipboard from "vue-clipboard3";

const tarUrl = ref();
const uploadLoading = ref(false);
const progressPercent = ref(0);

const { toClipboard } = useClipboard();

const handleRemove = (file, uploadFiles) => {
  // console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const handleBeforeUpload = (file) => {
  uploadLoading.value = true;
  new Promise((resolve, reject) => {
    ossService.upload({ file, space: 'ims', folder: 'music' },
      (res => {
        resolve(res.url);
      }),
      (error => { console.log(error); }),
      (end => {
        // console.log(end);
      }),
      (res => {
        // console.log(res);
        tarUrl.value = res.data.url;
        // console.log(end.data.url);
      }),
    )
      .then(res => {
        resolve(res);
        ElMessage({
          message: '上传成功',
          type: 'success',
        })
      })
      .catch(err => {
        reject("Upload failed");
      })
      .finally(() => {
        uploadLoading.value = false;

      })
  })
  return false
}

const handleUpload = (options) => {
  console.log("上传一下~", options);
}

const beforeRemove = (uploadFile, uploadFiles) => {
  return;
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const handleOnProgress = (file, fileList) => {
 
}

const handleCopy = async () => {
  await toClipboard(tarUrl.value);  //实现复制
  ElMessage({
    message: '复制成功~',
    type: 'success',
  })
}
</script>

<template>
  <div class="music-upload">
    <div class="upload-body">
      <div class="option-section">
        <el-upload class="upload-demo" action="" :http-request="handleUpload" multiple :on-preview="handlePreview"
          :before-upload="handleBeforeUpload" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="2"
          :on-change="handleOnProgress" :on-exceed="handleExceed">
          <el-button type="primary" :loading="uploadLoading">选择文件</el-button>
        </el-upload>
        <el-progress :stroke-width="16" :percentage="progressPercent"></el-progress>
        <div class="upload-text">
          <span v-if="tarUrl" @click="handleCopy">
            请保存上传的文件地址： {{ tarUrl }}
          </span>
          <span v-else>请上传~</span>
        </div>
      </div>
    </div>
  </div>


</template>

<style type="text/css" lang="less" scoped>
.music-upload {
  .upload-body {
    .option-section {
      display: flex;
      align-items: center;
      column-gap: 32px;

      .upload-text {
        cursor: pointer;
      }
    }
  }
}
</style>
