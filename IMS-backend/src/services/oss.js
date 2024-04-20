import request from '@/utils/request';
import API from '@/consts/api.js';
import OSS from 'ali-oss';

const ossService = {
  /* 
    上传单个文件
  */
  upload: async (
    { file, title = null, bucket = null, space = null, folder = null },
    // 上传成功后的回调
    callback,
    // 失败
    error,
    // 结束时
    end,
    storeCallback
  ) => {
    const prefix = String(new Date().getTime()).split('').reverse().join('');
    let file_name = title ? title : +prefix + file.name;
    // 先获取所需要的oss参数（通过传入文件信息，参数等信息）
    const ossParams = await ossService
      .token({
        file_name,
        bucket, // 可空，不传值就是用的服务器的
        space, // 同上
        folder // 同上
      })
      .catch((err) => {
        console.log(err);
        end && end();
      });
    // 拿到oss信息后,上传文件
    const uploadRes = await ossService
      .put(file, ossParams.data)
      .catch((err) => error && error(err));
    callback(uploadRes);
    end && end();

    const storeRes = await ossService
      .storeCallback({
        file_name: space,
        path: ossParams.data.key,
        bucket: ossParams.data.bucket,
        title
      })
      .catch((err) => error && error(err));
    storeCallback && storeCallback(storeRes);
  },
  /* 
    获取token授权
    'file_name' => 'required|string', // 文件名
    'bucket'=>'string', // bucket名
    'space'=>'string', // 空间名，例如avatar
    'folder'=>'string', // 文件夹名
  */

  // 上传前的准备工作:先拿到sts-token(账号一段时间的权限)
  token: (params = {}) => {
    // console.log(API.ossToken);
    // console.log(params);
    return request.post(API.ossToken, params);
  },

  // 上传资源
  put: (file, params) => {
    const { region, accessKeyId, accessKeySecret, stsToken, bucket, key } = params;
    const client = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      stsToken,
      bucket,
      // 1800s = 30min = 0.5h
      timeout: 1800000
    });
    return client.put(key, file);
  },

  /* 
  上传成功后回调
    'file_name' => 'required|string', // 文件类型，例如avatar
    'path' => 'required|string', // token返回的bucket存储位置
    'bucket' => 'required|string', // bucket名
    'title' => 'string', // 文件展示名称
 */
  // 上传成功后
  storeCallback: (params) => {
    return request.post(API.ossStore, params);
  }
};

export default ossService;
