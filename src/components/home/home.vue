<template>
  <div class="div">
    <el-container class="test">
      <el-header class="el-header">
        <ul>
          <li>
            欢迎用户：{{username}}
          </li>
          <li>
            <span>2019-12-14 星期六</span>
            <span>注销</span>
          </li>
        </ul>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  mounted() {
    this.me()
  },
  methods: {
    logout() {
      localStorage.removeItem('Authorization')
      this.$router.push({
        path: '/login'
      })
    },
    me() {
      this.$http.me()
        .then(user => {
          this.username = user.data.data.name
        })
    }
  }
}
</script>

<style>
  .el-header {
    background: #1cbc9c;
  }
  .div {
    width: 100%;
  }
  .test {
    border: 1px solid red;
  }
</style>
