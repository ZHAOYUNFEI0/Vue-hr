<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form label-width="220px">
      <!--手机 -->

      <el-form-item label="手机">
        <el-input v-model="userInfo.mobile" disabled style="width:220px" />
      </el-form-item>

      <!-- 工号 入职时间 -->

      <el-form-item label="入职时间">
        <el-date-picker
          v-model="userInfo.timeOfEntry"
          type="date"
          class="inputW"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <!-- 员工照片 -->

      <el-form-item label="员工头像">
        <!-- 放置上传图片 -->
        <uploadImg :img="userInfo.staffPhoto" @input="url => userInfo.staffPhoto=url" />
        <!-- <img :src="userInfo.staffPhoto"> -->
      </el-form-item>

      <!-- 保存个人信息 -->
      <el-form-item>
        <el-button type="primary" @click="hSave">保存更新</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uploadImg from '@/components/UploadImg'
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees.js'
export default {
  components: { uploadImg },
  data() {
    return {
      userId: this.$route.query.id,
      userInfo: {
        mobile: '',
        timeOfEntry: '',
        staffPhoto: ''
      }
    }
  },
  created() {
    this.loadUserDetailById()
  },
  methods: {
    loadUserDetailById() {
      getUserDetailById(this.userId).then(res => {
        // console.log(res)
        this.userInfo = res.data.data
        // console.log(this.userInfo)
      }).catch(err => {
        console.log(err)
      })
    },
    doSave() {
      saveUserDetailById(this.userInfo).then(res => {
        this.$message.success('保存成功')
        // console.log(res)
      }).catch(err => {
        // console.log(err)
        this.$message.error(err.message)
      })
    },
    hSave() {
      this.doSave()
    }
  }
}
</script>

  <style scoped lang="scss">
    .user-info{
      padding-top:20px;
    }
  </style>

