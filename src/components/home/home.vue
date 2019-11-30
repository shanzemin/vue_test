<template>
  <div>
    欢迎用户访问
  <el-row>
    <el-button type="warning" @click="logout()" plain>注销</el-button>
  </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('Authorization')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
