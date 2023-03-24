<template>
  <!-- 表单 -->
  <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker v-model="formData.timeOfEntry" value-format="yyyy-MM-dd" style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
        <el-option v-for="item in hireType" :key="item.id" :value="item.id" :label="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
      <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="showTree = true" />
      <el-tree v-if="showTree" :data="departments" :props="{label:'name'}" @node-click="handelNodeClick" />
    </el-form-item>
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker v-model="formData.correctionTime" value-format="yyyy-MM-dd" style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('clear')">取消</el-button>
      <el-button type="primary" @click="hSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { addEmployee } from '@/api/employees'
import d from '@/constant/employees'
import { tranListToTreeData } from '@/utils'
const hireType = d.hireType
export default {
  name: 'VuecliDemoApp',
  data() {
    return {
      hireType: hireType,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      },
      departments: [],
      showTree: false
    }
  },
  created() {
    this.loadDepartments()
  },
  methods: {
    hSubmit() {
      this.$refs.addForm.validate(valid => {
        if (!valid) return
        // 发送请求
        this.submit()
        //   关闭dailog
        this.$emit('clear')
      })
    },
    submit() {
      addEmployee(this.formData).then(res => {
        // console.log(res)
        console.log(this.formData)
        this.$message.success(res.data.message)
      }).catch(err => {
        // console.log(err)
        this.$message.success(err.data.message)
      })
    },
    loadDepartments() {
      getDepartments().then(res => {
        // console.log(res.data.data.depts)
        // res.data.data.depts.shift()
        this.departments = tranListToTreeData(res.data.data.depts, '')
        // console.log(res.data.data.depts)
        // console.log('处理：' + this.departments)
      })
    },
    handelNodeClick(data) {
    //   console.log(data)
      if (data.children) return
      this.formData.departmentName = data.name
      this.showTree = false
    }
  }
}
</script>

<style scoped>

</style>
