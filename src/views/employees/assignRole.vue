<template>
  <!-- // 分配角色 -->
  <div>
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="hSubmit">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getRoles } from '@/api/roles'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  created() {
    this.loadRoles()
    this.loadRolesById()
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    loadRoles() {
      getRoles().then(res => {
        // console.log(res)
        this.list = res.data.data.rows
      })
    },
    loadRolesById() {
      // console.log(this.userId)
      getUserDetailById(this.userId).then(res => {
        // console.log(res)
        this.roleIds = res.data.data.roleIds
      })
    },
    hSubmit() {
      // console.log(111)
      assignRoles({ id: this.userId, roleIds: this.roleIds }).then(res => {
        // console.log(res)
        this.$message.success(res.data.message)
      })
      this.$emit('close')
    }
  }
}
</script>

