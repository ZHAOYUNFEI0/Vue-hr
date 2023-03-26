<template>
  <el-form
    ref="userForm"
    :model="userInfo"
    label-width="120px"
    :rules="rules"
    style="margin-left: 120px; margin-top: 30px"
  >
    <el-form-item label="姓名:" prop="username">
      <el-input v-model="userInfo.username" style="width:300px" />
    </el-form-item>
    <el-form-item label="密码:" prop="password">
      <el-input v-model="userInfo.password" type="password" style="width:300px" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="hSubmit">更新</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', triggler: 'blur' }],
        password: [{ required: true, message: '密码不能为空', triggler: 'blur' }]
      }
    }
  },
  created() {
    this.loadUserDetailById()
  },
  methods: {
    // 获取用户基本信息
    loadUserDetailById() {
      getUserDetailById(this.$route.query.id).then(res => {
        // console.log(res)
        // 数据回填
        this.userInfo = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    doEdit() {
      saveUserDetailById(this.userInfo).then(res => {
        // console.log(res)
        this.$message.success('更新成功')
      }).catch(err => {
        console.log(err)
        this.$message.error('修改失败')
      })
    },
    hSubmit() {
      this.$refs.userForm.validate(valid => {
        if (!valid) return
        this.doEdit()
      })
    }

  }
}
</script>

