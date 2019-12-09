<template>
  <div>
    <span>
      欢迎用户{{username}}访问
    </span>
  <el-row>
    <el-button type="warning" @click="logout()" plain>注销</el-button>
  </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  mounted(){
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
