<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="hAdd(1,0)">添加权限</el-button>
        </div>
        <el-table row-key="id" border :data="list">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="scop">
              <el-button v-if="scop.row.type === 1" type="text" @click="hAdd(2,scop.row.id)">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 弹窗 -->
    <el-dialog :visible.sync="showDialog" title="弹层标题">
      <!-- 表单内容 -->
      <el-form label-width="100px">
        <el-form-item label="权限名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input v-model="formData.code" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" />
        </el-form-item>
        <el-form-item label="权限启用">
          <el-switch
            v-model="formData.enVisible"
            active-text="启用"
            active-value="1"
            inactive-text="不启用"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="hSubmit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permissions'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      showDialog: false, // 是否显示弹层
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }
    }
  },
  created() {
    this.loadPermisstions()
  },
  methods: {
    loadPermisstions() {
      getPermissionList().then(res => {
        // console.log(res)
        this.list = tranListToTreeData(res.data.data, '0')
        // console.log(tranListToTreeData(res.data.data, '0'))
      })
    },
    // 页面级权限控制
    hAdd(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    // 确定按钮 发送请求
    hSubmit() {
      this.dSubmit()
    },
    dSubmit() {
      addPermission(this.formData).then(res => {
        console.log(res)
        this.$message.success(res.data.message)
      }).catch(err => {
        this.$message.error(err.message)
      })
      // 关闭弹窗
      this.showDialog = false
      // 从新渲染数据
      this.loadPermisstions()
    }
  }
}
</script>

<style scoped>

</style>
