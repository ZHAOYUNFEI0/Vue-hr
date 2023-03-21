<template>
  <div>
    <el-form ref="deptForm" rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in employees" :key="item.id" value="1" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="hSubmit">确定</el-button>
        <el-button size="small" @click="hCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getEmployessSimple } from '@/api/employees'
import { addDepartments, getDepartDetatail, updateDepartments } from '@/api/departments'

export default {
  name: 'VuecliDemoApp',
  props: {
    id: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      employees: [],
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.loadEmployess()
    this.loadDetail()
  },

  methods: {
    // 获取员工列表，管理员名单列表
    loadEmployess() {
      getEmployessSimple().then(res => {
        // console.log(res.data.data)
        this.employees = res.data.data
      })
    },
    hSubmit() {
      // this.$refs.form.validate(valid => {
      //   if (valid) {

      //   }
      // })
      this.isEdit ? this.doEdit() : this.doAdd()
    },
    hCancel() {
      this.$emit('cel')
    },

    doAdd() {
      const arr = { ...this.form, pid: this.id }
      // console.log(this.id)
      addDepartments(arr).then(res => {
        // console.log(res)
        this.$emit('success')
      })
    },
    loadDetail() {
      // console.log(this.id)
      if (this.isEdit) {
        getDepartDetatail(this.id).then(res => {
          // console.log(res)
          this.form = res.data.data
        })
      }
    },
    doEdit() {
      const arr = { ...this.form, id: this.id }
      updateDepartments(arr).then(res => {
        console.log(res)
        this.$message({ type: 'success', message: '修改成功' })
        this.$emit('success')
      }).catch(err => {
        this.$message({ type: 'error', message: err })
      })
    }

  }
}
</script>

<style scoped>

</style>
