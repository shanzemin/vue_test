<template>
  <div>
    <div>
      <el-button type="primary" icon="el-icon-arrow-left" @click="back()" class="back">返回</el-button>
      <h1 class="title">注册界面</h1>
    </div>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="form"
    >
      <el-form-item label="用户名" prop="name" class="test">
        <el-input v-model="ruleForm2.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" class="test">
        <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" class="test">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age" class="test">
        <el-input v-model.number="ruleForm2.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var name = (rule, value, callback) => {
      value = value.trim();
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        this.$http.checkName(value)
          .then(ret => {
            if (ret.data.data) {
              callback(new Error("用户名已存在"));
            } else {
              callback();
            }
          })
          .catch(err => {
            this.$message('验证有误')
          })
      }
    };

    var checkAge = (rule, value, callback) => {
      value = value.trim();
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value < 18 || value > 100) {
          callback(new Error("必须年满18岁且小于100岁"));
        } else {
          callback();
        }
      }
    };

    var validatePass = (rule, value, callback) => {
      value = value.trim();
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        if (!this.ruleForm2.checkPass) {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      value = value.trim();
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm2: {
        name: "",
        password: "",
        age: "",
        checkPass: ""
      },
      rules2: {
        name: [{ validator: name, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let json = {
            name: this.ruleForm2.name,
            password: this.ruleForm2.password,
            age: this.ruleForm2.age
          }
          this.$http.register(json)
            .then(ret => {
              this.$router.push({
                path: `/login`
              })
            })
            .catch(err => {
              this.$message('注册失败')
            })
        } else {
          this.$message('请补充信息')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$router.back()
    }
  }
};
</script>

<style>
  .form {
    /* border:1px solid red; */
    margin-top: 80px;
  }
  .test {
    width: 30%;
    margin: 30px auto;
  }
  .back {
    float: left;
    margin-left: 2%;
  }
</style>
