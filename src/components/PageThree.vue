<template>
  <div>
    <el-button type="primary" :disabled="multipleSelection.length==0">主要按钮</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="ordernum" label="订单编码" width="150">
      </el-table-column>
      <el-table-column prop="vipname" label="会员名" width="150">
      </el-table-column>
      <el-table-column prop="paymoney" label="支付金额" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
        <template slot-scope="scope">
          <router-link v-bind:to="{path: 'UserInfo',query:{ query: scope.row}}">{{scope.row.name}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市"
        width="120">
      </el-table-column>
      <el-table-column
        prop="area"
        label="区"
        width="300">
      </el-table-column>
      <el-table-column
        prop="address"
        label="详细地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话"
        width="120">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="品类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        width="120">
      </el-table-column>
      <el-table-column
        prop="type"
        label="套路"
        width="120">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'PageThree',
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      // 默认显示第几页
      currentPage: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 25, 50, 100],
      // 默认每页显示的条数（可修改）
      pageSize: 10
    }
  },

  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  mounted () {
    const that = this
    this.$ajax.post(this.apiUrl + 'userInfo/getAll')
      .then(function (response) {
        that.tableData = response.data
        console.log(response.data)
        that.loading = false
      })
      .catch(function (error) {
        console.log(error)
        console.log('失败')
      })
  }
}
</script>

<style scoped>

</style>
