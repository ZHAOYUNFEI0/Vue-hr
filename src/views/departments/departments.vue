<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <svg-icon icon-class="home" /><span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <!-- 下拉菜单 element -->
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <!-- 树形结构 -->
        <el-tree :data="list" default-expand-all>
          <template v-slot="scope">
            <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width: 100%;">
              <el-col :span="20">
                <svg-icon icon-class="home" /><span>{{ scope.data.name }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ scope.data.manager }}</el-col>
                  <!-- 下拉菜单 element -->
                  <el-col>
                    <el-dropdown>
                      <span>
                        操作<i class="el-icon-arrow-down" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="add(scope.data.id)">添加子部门</el-dropdown-item>
                        <el-dropdown-item @click.native="edit(scope.data.id)">编辑部门</el-dropdown-item>
                        <el-dropdown-item @click.native="del(scope.data.id)">删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

          </template>
        </el-tree>
      </el-card>

    </div>

    <!-- 弹出框 -->
    <el-dialog
      v-if="showDialog"
      :title=" isEdit ? '编辑' : '添加'"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <deptDialog :id="curId" :is-edit="isEdit" @cel="cel" @success="btn" />
    </el-dialog>
  </div>

</template>

<script>
import { getDepartments, del } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import deptDialog from './deptDialog.vue'
export default {
  name: 'VuecliDemoApp',
  components: {
    deptDialog
  },
  data() {
    return {
      list: [],
      showDialog: false,
      curId: '',
      isEdit: false
    }
  },

  created() {
    this.getDepartments()
  },

  methods: {
    getDepartments() {
      getDepartments().then(res => {
        this.list = tranListToTreeData(res.data.data.depts, '')
      // console.log(res.data.data.depts)
      // console.log(this.list)
      })
    },
    // 删除
    del(id) {
      this.$confirm('确定永久删除部门吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(id)
        this.$message({ type: 'success', message: '删除成功' })
        this.getDepartments()
      })
    },
    // 添加
    add(id) {
      this.showDialog = true
      this.curId = id
      this.isEdit = false
    },
    // 编辑
    edit(id) {
      this.showDialog = true
      this.curId = id
      this.isEdit = true
    },
    // 关闭弹窗
    btn() {
      this.showDialog = false
      this.getDepartments()
    },
    // 点击取消关闭弹框
    cel() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped>

</style>
