<template>
  <el-container>
    <div >
      <div class="container-main">
        <div class="contain-w">用户列表</div>
        <div class="contain-b">
          <el-button type="primary" @click="dialogVisible = true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          <!--上传文件-->
          <el-dialog title="上传文件" :visible.sync="dialogVisible"  width="30%" :before-close="handleClose">
              <el-upload class="upload-demo"
                         ref="upload"
                         :auto-upload="false"
                         drag
                         accept=".xls,.xlsx"
                         :limit="1"
                         :action="uploadURL"
                         style="margin-left: 80px;"
                         >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过5M</div>
              </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary"  @click="submitUpload('form')">导 入</el-button>
            </span>
          </el-dialog>
          <el-button type="primary" icon="el-icon-delete" @click="deletecheck" :disabled="multipleSelection.length==0"></el-button>

          这里是一堆按钮
        </div>
        <div class="contain-m">
          <!--表格-->
          <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            :data="tableData"
            v-loading="loading"
            @selection-change="handleSelectionChange"
            :row-key="getRowKeys"
            border
            style="width: 100%">
            <!--复选框-->
            <el-table-column type="selection"  width="45"></el-table-column>
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
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--分页-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNum">
          </el-pagination>
        </div>

      </div>
    </div>

  </el-container>
</template>

<script>
export default {
  name: 'PageOne',
  inject: ['reload'],
  data () {
    return {
      dialogVisible: false,
      uploadURL: this.apiUrl + 'excel/import',
      // 分页
      //  总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 25, 50, 100],
      // 默认每页显示的条数（可修改）
      pageSize: 10,
      totalNum: 0,
      // 复选框选中的数据
      multipleSelection: [],
      lists: [],
      loading: true
    }
  },
  created () {
    this.getUsers()
    this.showTable(this.currentPage, this.pageSize)
  },
  methods: {
    getRowKeys (row) {
      return row.SourceCode
    },
    handleClick (row) {
      console.log(row)
    },
    // 关闭弹窗
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 导入数据库
    submitUpload () {
      this.$refs.upload.submit()
      this.dialogVisible = false
      this.reload()
      this.$message({
        message: '导入成功',
        type: 'success'
      })
    },
    // 获取数据量
    getUsers () {
      var that = this
      this.$ajax({
        method: 'post',
        url: this.apiUrl + 'userInfo/userCount'
      }).then(function (response) {
        that.totalNum = response.data
        console.log(response.data)
      })
        .catch(function (error) {
          console.log(error)
          console.log('失败')
        })
    },
    showTable (currentPage, pageSize) {
      this.loading = true
      let data = {
        currentPage: currentPage,
        pageSize: pageSize
      }
      this.$ajax({
        method: 'POST',
        url: this.apiUrl + 'userInfo/getByPage',
        data: this.$qs.stringify(data)
      }).then(result => {
        this.loading = false
        this.tableData = result.data
      }).catch(function (error) {
        console.log(error)
        console.log('失败')
      })
    },
    // 分页
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pageSize = size
      console.log(this.pageSize) // 每页下拉显示数据
      this.showTable(this.currentPage, this.pageSize)
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
      this.showTable(this.currentPage, this.pageSize)
    },
    // 复选框
    handleSelectionChange (val) {
      // 所有选中列的信息集合
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 删除
    deletecheck () {
      this.$confirm('删除后无法找回信息，确认删除？', '确认删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() => {
          // 选择所有选中列的id的集合
          var ids = this.multipleSelection.map(item => item.id).join()// 获取所有选中行的id组成的字符串，以逗号分隔
          var lists = this.lists = ids.split(',')
          console.log(this.lists)
          this.$ajax.post(this.apiUrl + 'userInfo/delete', lists)
            .then(res => {
              console.log(res)
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.reload()
            })
            .catch(function (err) {
              console.log(err)
            })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '取消删除'
              : '停留在当前页面'
          })
        })
    }
  }

}
</script>

<style scoped>
  /*.container-main{*/
    /*position: relative;*/
    /*top: 2px;*/
    /*left: 2px;*/
    /*right: 2px;*/
  /*}*/

  /*.contain-w{*/
    /*background-color: darkgray;*/
    /*height: 50px;*/
    /*line-height: 50px;*/
  /*}*/
  /*.contain-b{*/
    /*!*height:70px ;*!*/
    /*line-height: 70px;*/
  /*}*/

</style>
