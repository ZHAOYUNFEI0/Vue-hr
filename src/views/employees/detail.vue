<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <loginSetting />
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <userInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <jobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import loginSetting from './components/loginSetting.vue'
import userInfo from './components/userInfo.vue'
import jobInfo from './components/jobInfo.vue'

export default {
  name: 'EmployeesDetail',
  components: {
    loginSetting,
    userInfo,
    jobInfo
  },
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style scoped>

</style>
