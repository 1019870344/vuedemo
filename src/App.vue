<!--suppress ALL -->
<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
  <!--显示当前地址对应的内容-->
</template>

<script>
export default {
  name: 'App',
  components: {},
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  #app {
    /*字体样式*/
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }

  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .hide {
    display: none;
  }

</style>
