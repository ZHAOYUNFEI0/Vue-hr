<template>
  <div>
    <el-tree
      ref="refTree"
      check-strictly
      show-checkbox
      default-expand-all
      :data="list"
      :props="defaultProps"
      node-key="id"
    />
    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="hSubmit">确定</el-button>
      <el-button @click="$emit('close')">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getPermissionList } from '@/api/permissions'
import { tranListToTreeData } from '@/utils'
import { getRolesDetailById, assignPerm } from '@/api/roles'
export default {
  props: {
    rolesId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    // 获取所有权限点
    this.loadPermissions()
    // 获取当前角色的权限点
    this.loadRoleDetail()
  },
  methods: {
    loadPermissions() {
      getPermissionList().then(res => {
        // console.log(res.data.data)
        // console.log(tranListToTreeData(res.data.data, '0'))
        this.list = tranListToTreeData(res.data.data, '0')
      })
    },
    hSubmit() {
      const permIds = this.$refs.refTree.getCheckedKeys()
      //   console.log(permIds)
      assignPerm({ id: this.rolesId, permIds: permIds }).then(res => {
        // console.log(res)
        this.$message.success(res.data.message)
        this.$emit('close')
      })
    },
    loadRoleDetail() {
      getRolesDetailById(this.rolesId).then(res => {
        // console.log(res)
        this.$refs.refTree.setCheckedKeys(res.data.data.permIds)
      })
    }
  }
}
</script>

<style scoped>

</style>
