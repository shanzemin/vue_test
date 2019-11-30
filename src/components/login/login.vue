<template>
  <div>
    <div class="test">
      <p>
        欢迎登录
      </p>
      <el-form :model="params" :rules="rules" ref="loginFrom" label-position="'right'" label-width="80px">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="params.user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="params.pass" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="login('loginFrom')">登录</el-button>
          <el-button type="success" @click="register('aaa')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      params: {
        user: '',
        pass: ''
      },
      rules: {
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.login(this.params)
            .then(ret => {
              localStorage.Authorization = ret.data.data.token
              this.$router.push({
                path: `/`,
                params: {
                  name: this.params.name
                }
              })
            })
            .catch(err => {
              this.$message('用户名或密码错误')
            })
        } else {
          this.$message('请填写用户名或密码')
          return false;
        }
      })
    },
    register (id) {
      this.$router.push({
        path: `/register`
      })
    }
  }
}
</script>
<style scoped>
  .test{
    width: 400px;
    height: 500px;
    /* background-color: blue; */
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
</style>
