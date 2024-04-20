<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ossService from '@/services/oss.js';
import OSS from "ali-oss"
import request from '@/utils/request';
import { useStore } from '@/store/index.js'

const store = useStore()

// const fileList = ref([
//   {
//     name: 'element-plus-logo.svg',
//     url: 'https://element-plus.org/images/element-plus-logo.svg',
//   },
//   {
//     name: 'element-plus-logo2.svg',
//     url: 'C:/Users/10669/Downloads/object-t1est.png',
//   },
// ])

// function handleRemove(file, uploadFiles) {
//   console.log(file, uploadFiles)
// }

// const handlePreview = (uploadFile) => {
//   console.log(uploadFile)
// }

// const handleExceed = (files, uploadFiles) => {
//   ElMessage.warning(
//     `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
//     } totally`
//   )
// }

// const beforeRemove = (uploadFile, uploadFiles) => {
//   return ElMessageBox.confirm(
//     `Cancel the transfer of ${uploadFile.name} ?`
//   ).then(
//     () => true,
//     () => false
//   )
// }
const input = ref(null)

const stsObj = ref({});
function handleUp() {
  // 要返回存储的地址
  const file = input.value.files[0];

  // let url = "http://127.0.0.1:3001/api/file/alioss-token";
  // let toen = request.post(url, {
  //   file_name: "icon-ims-removebg-preview (4).png"
  // }).then(res=>{
  //   console.log(res);
  // }).catch(e => {
  //   console.log(e);
  // });

  ossService.upload(
    { file, title: '', space: 'ava', folder: 'demo' },
    function callback(res) {
      console.log('chenggognele ~', res);
    },
    function error() {
      console.log('失败了');
    },
    function end() {
      console.log('结束了');
    },
    function storeCallback(res) {
      console.log('存储一下~');
      console.log('存储地址:', res);
    },
  )
};
function handleView() {
  const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: "oss-cn-guangzhou",
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: "STS.NT7FXDQzvx88DjfsSxgSsafo6",
    accessKeySecret: "5yfHYTXxUcRwusDETYSqzAbpenk3Tkz6cCBcir8bXLNA",
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: "CAIS9AF1q6Ft5B2yfSjIr5eCDeLwvKVXz/rTRkzXl1Mta9xfjqPE1Dz2IHhMdHVsAe4ctP43nG5R7v8alqJIRoReREvCUcZr8syRWeR779OT1fau5Jko1beHewHKeTOZsebWZ+LmNqC/Ht6md1HDkAJq3LL+bk/Mdle5MJqP+/UFB5ZtKWveVzddA8pMLQZPsdITMWCrVcygKRn3mGHdfiEK00he8Tolsf3vkpbMu0eB1gCnl7Avyt6vcsT+Xa5FJ4xiVtq55utye5fa3TRYgxowr/8u3PAYoWmd5IvFWwcIu0zeKYjO+9hoNxRla7MmCzPXbSUiXgQSGoABPU+TRJhz3jVmT/+HuKKynqy8DB8gPCMKUN9j18/OVGMu3OxQFRECzxmEAxVnGgBn/qcExUN1WU/06wPjzxwnyhjgnqW/qCjWIYI1TzqV88YcV5oLPloe2DLiYeXSSLdySxjwSQKsW0+a3sRqRYKFEKFrYgWCUtq7PCR04Yu9zqsgAA==",
    // 填写Bucket名称。
    bucket: "seaio-bucket",
  });

  let url2 = "2023-03-14_170825.jpg";
  let url = client.signatureUrl(url2);
  console.log(url);
}

</script>

<template>
  <div>
    你好啊{{ store.userInfo.name }}
    <!-- <el-upload v-model:file-list="fileList" class="upload-demo"
      action="" multiple :on-preview="handlePreview"
      :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed">
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
</el-upload> -->

    选择文件(可多选):
    <input ref="input" type="file" id="f1" /><br />
    <button type="button" id="btn-submit" @click="handleUp">上 传</button>
    <button type="button" id="btn-submit1" @click="handleView">查 看</button>
  </div>
  <img src="http://seaio-bucket.oss-cn-guangzhou.aliyuncs.com/2023-03-14_170825.jpg?OSSAccessKeyId=STS.NT7FXDQzvx88DjfsSxgSsafo6&Expires=1710574303&Signature=6feZvXmHWB9dZsepv%2FrDeq34y0k%3D&security-token=CAIS9AF1q6Ft5B2yfSjIr5eCDeLwvKVXz%2FrTRkzXl1Mta9xfjqPE1Dz2IHhMdHVsAe4ctP43nG5R7v8alqJIRoReREvCUcZr8syRWeR779OT1fau5Jko1beHewHKeTOZsebWZ%2BLmNqC%2FHt6md1HDkAJq3LL%2Bbk%2FMdle5MJqP%2B%2FUFB5ZtKWveVzddA8pMLQZPsdITMWCrVcygKRn3mGHdfiEK00he8Tolsf3vkpbMu0eB1gCnl7Avyt6vcsT%2BXa5FJ4xiVtq55utye5fa3TRYgxowr%2F8u3PAYoWmd5IvFWwcIu0zeKYjO%2B9hoNxRla7MmCzPXbSUiXgQSGoABPU%2BTRJhz3jVmT%2F%2BHuKKynqy8DB8gPCMKUN9j18%2FOVGMu3OxQFRECzxmEAxVnGgBn%2FqcExUN1WU%2F06wPjzxwnyhjgnqW%2FqCjWIYI1TzqV88YcV5oLPloe2DLiYeXSSLdySxjwSQKsW0%2Ba3sRqRYKFEKFrYgWCUtq7PCR04Yu9zqsgAA%3D%3D" alt="">

  
</template>

<style type="text/css" lang="less" scoped></style>
