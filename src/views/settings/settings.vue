<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="roles">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :current-page="q.page"
                :page-sizes="[2,3, 4, 5]"
                :page-size="q.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <!-- 新增弹框 -->
    <el-dialog
      :title="isEdit ? '编辑弹层':'新增弹层'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
      @closed="$refs.roleForm.resetFields()"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="showDialog=false">取消</el-button>
          <el-button size="small" type="primary" @click="hSubmit">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getRoles, delRoles, addRoles, updateRole } from '@/api/roles'
export default {
  name: 'VuecliDemoApp',
  data() {
    return {
      q: {
        page: 1,
        pagesize: 2
      },
      roles: [],
      total: 0,
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      isEdit: false
    }
  },
  created() {
    // 更新数据
    this.loadRoles()
  },

  methods: {
    loadRoles() {
      getRoles(this.q).then(res => {
        // console.log(res)
        this.roles = res.data.data.rows
        this.total = res.data.data.total
      }).catch(err => {
        console.log('获取角色列表失败' + err)
      })
    },
    handleSizeChange(val) {
      // console.log(val)
      this.q.pagesize = val
      this.loadRoles()
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.q.page = val
      this.loadRoles()
    },
    del(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoles(id).then(res => {
        // console.log(res)
          this.$message.success(res.data.message)
          if (this.roles.length === 1 && this.q.page > 1) {
            this.q.page--
          }
          this.loadRoles()
        }).catch(err => {
          console.log(err)
          this.$message.error(err.data.message)
        })
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    hSubmit() {
      this.$refs.roleForm.validate(valid => {
        if (!valid) return
        this.isEdit ? this.doEdit() : this.doAdd()
      })
    },
    doAdd() {
      this.isEdit = false
      addRoles(this.roleForm).then(res => {
        // console.log(res)
        // 关闭弹窗
        this.showDialog = false
        const ye = Math.ceil(this.total / this.q.pagesize)

        if (this.total % this.q.pagesize) {
          this.q.page = ye
        } else {
          this.total++
          this.q.page = ye + 1
        }

        // 更新数据
        this.loadRoles()

        this.$message.success('添加成功')
      }).catch(err => {
        // console.log(err)
        this.$message.error(err.data)
      })
    },
    // 编辑
    edit(res) {
      // console.log(res)
      this.showDialog = true
      this.roleForm = res
      this.isEdit = true
    },
    // 更新
    doEdit() {
      updateRole(this.roleForm).then(res => {
        this.showDialog = false
        this.loadRoles()
        console.log(res)
        this.$message.success('更新成功')
      }).catch(err => {
        // console.log(err)
        console.log(this.roleForm)
        this.showDialog = false
        this.$message.error(err.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
