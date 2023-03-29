<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <img v-if="img" :src="img" class="avatar">
      <i v-show="!showProgress" v-else class="el-icon-plus avatar-uploader-icon" />
      <el-progress v-if="showProgress" type="circle" :percentage="progress" />
    </el-upload>
  </div>
</template>

<script>

// 下面的代码是固定写法
const COS = require('cos-js-sdk-v5')
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: 'AKID5lEg7BUekpvzufEalmeO1Uloru4AJKBu', // 身份识别ID
  SecretKey: 'd3HH3b9VcV8bt2zNdhWLvIRWTBmMmzym' // 身份秘钥
})

export default {

  props: ['img'],
  data() {
    return {
      // imageUrl: this.img,
      progress: '',
      showProgress: false
    }
  },
  methods: {
    upload(res) {
      if (res.file) {
        // 执行上传操作
        this.imageUrl = ''
        this.showProgress = true
        cos.putObject({
          Bucket: 'hr-1317489876', /* 存储桶 */
          Region: 'ap-beijing', /* 存储桶所在地域，必须字段 */
          Key: res.file.name, /* 文件名 */
          StorageClass: 'STANDARD', // 上传模式, 标准模式
          Body: res.file, // 上传文件对象
          //   加载动画
          onProgress: (progressData) => {
            console.log(JSON.stringify(progressData))
            this.progress = progressData.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          // 上传成功之后
          if (data.statusCode === 200) {
            this.$emit('input', `https:${data.Location}`)
            this.imageUrl = `https:${data.Location}`
            this.showProgress = false
          }
        })
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
    //   const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      //   if (!isPNG) {
      //     this.$message.error('上传头像图片只能是 PNG 格式!')
      //   }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

  <style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>

