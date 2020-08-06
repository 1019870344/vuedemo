<template>

    <el-container style="height: 100% ">
      <!--左侧侧边栏-->
      <el-aside  style=" width: auto">
              <div class="widgets-content">
                  <el-menu :default-openeds="['1','3']"
                           default-active="2"
                           class="el-menu-vertical-demo"
                           @open="handleOpen"
                           @close="handleClose"
                           :collapse="isCollapse">
                    <el-submenu index="1">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                      </template>
                      <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <router-link to="/PageOne"><el-menu-item index="1-1">选项一</el-menu-item></router-link>
                        <router-link to="/PageTwo"><el-menu-item index="1-2">选项二</el-menu-item></router-link>
                      </el-menu-item-group>
                      <el-menu-item-group title="分组2">
                        <router-link to="/PageThree"><el-menu-item index="1-3">选项三</el-menu-item></router-link>
                      </el-menu-item-group>
                      <el-submenu index="1-4">
                        <template slot="title">选项四</template>
                        <router-link to="/PageFour"><el-menu-item index="1-4-1">选项1</el-menu-item></router-link>
                      </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                      <i class="el-icon-menu"></i>
                      <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-submenu index="3">
                      <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                      </template>
                      <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                      </el-menu-item-group>
                      <el-submenu index="3-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                      </el-submenu>
                    </el-submenu>
                    <el-menu-item index="4">
                      <i class="el-icon-setting"></i>
                      <span slot="title">导航四</span>
                    </el-menu-item>
                    <el-submenu index="5">
                      <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                      </template>
                      <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                      </el-menu-item-group>
                      <el-submenu index="3-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                      </el-submenu>
                    </el-submenu>
                  </el-menu>
              </div>
      </el-aside>
      <!--右侧中心部分-->
      <el-container class="contain" direction=" horizontal" style="float: left">
        <!--头部-->
        <el-header style="text-align: right; font-size: 12px">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-dropdown>
            <i class="el-icon-setting"
               style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <!--显示部分-->
        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  /*右侧中心部分*/
.contain{
  height: 100%;
  border: 1px solid rgb(238, 238, 238);
}
.el-main{
  overflow: scroll;
}
/* 定义滚动条样式 */
.el-aside::-webkit-scrollbar {
  width: 1px;
  height: 6px;
  background-color: rgba(240, 240, 240, 1);
}

/*定义滚动条轨道 内阴影+圆角*/
  .el-aside::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 10px;
  background-color: rgba(240, 240, 240, .5);
}

/*定义滑块 内阴影+圆角*/
  .el-aside::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  background-color: rgba(240, 240, 240, .5);
}
</style>
