<template>
  <div style="padding: 50px">
    <UploadWxcel
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
  </div>
</template>

<script>
import UploadWxcel from '@/components/UploadExcel'
export default {
  name: 'Import',
  components: { UploadWxcel },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      console.log(results)
      const res = this.transExcel(results)
      console.log(res)

      this.tableData = results
      this.tableHeader = header
    },
    transExcel(results) {
      const mapInfo = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }
      const res = results.map(item => {
        const obj = {}
        const zhKeys = Object.keys(item)
        zhKeys.forEach(zhKey => {
          const enKey = mapInfo[zhKey]
          obj[enKey] = item[zhKey]
        })
        return obj
      })
      return res
    }
  }
}
</script>

<style scoped>

</style>
