<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small" @click="$router.push('/employees/import')">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="showDialog=true">新增员工</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table :data="employees" border>
          <el-table-column label="序号" type="index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column sortable label="工号" prop="workNumber" />
          <el-table-column label="聘用形式">
            <template v-slot="scop">
              {{ meiju(scop.row.formOfEmployment) }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column sortable label="入职时间" prop="timeOfEntry" />
          <el-table-column label="操作" width="280">
            <template v-slot="scop">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small" @click="hDel(scop.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            :current-page="q.page"
            :page-sizes="[2,3, 4, 5]"
            :page-size="q.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
    <el-dialog
      v-if="showDialog"
      title="添加或编辑"
      :visible.sync="showDialog"
    >
      <AddOrEdit @clear="hClear" />
    </el-dialog>
  </div>
</template>
<script>
import { getEmployess, delEmployess } from '@/api/employees'
import employees from '@/constant/employees'
import AddOrEdit from '@/views/employees/empDialog.vue'
export default {
  name: 'VuecliDemoApp',
  components: {
    AddOrEdit
  },
  data() {
    return {
      q: {
        page: 1,
        size: 2
      },
      total: 0,
      employees: [],
      showDialog: false
    }
  },
  created() {
    this.loadEmployees()
  },
  methods: {
    // 渲染页面数据
    loadEmployees() {
      getEmployess(this.q).then(res => {
        // console.log(res)
        this.employees = res.data.data.rows
        // console.log(res)
        this.total = res.data.data.total
      }).catch(err => {
        console.log(err)
      })
    },
    // 转换 聘用形式
    meiju(val) {
      const v = val * 1
      const i = employees.hireType.find(item => item.id === v)
      // console.log(v)
      return i.value
    },
    handleSizeChange(val) {
      // console.log(val)
      this.q.size = val
      this.loadEmployees()
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.q.page = val
      this.loadEmployees()
    },
    hDel(id) {
      this.$confirm('真的要删除吗？', '提示', { type: 'warning' }).then(() => {
        delEmployess(id).then(res => {
          // console.log(res)
          this.$message.success(res.data.message)
          if (this.employees.length === 1 && this.q.page > 1) {
            this.q.page--
          }
          this.loadEmployees()
        }).catch(err => {
          console.log(err)
          this.$message.error('删除失败')
        })
      })
    },
    hClear() {
      // 关闭dialog
      this.showDialog = false
      this.loadEmployees()
    }
  }
}
</script>

<style scoped>

</style>
