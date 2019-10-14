<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="昵称"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="validPassword">
      <el-input v-model="form.validPassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", //手机号码
        nickname: "",
        captcha: "", //验证码
        password: "",
        validPassword: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        validPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    async handleSendCaptcha() {
      if (this.form.username.trim() == "") {
        this.$message.error("请先输入手机号码");
        return;
      }
      let res = await this.$store.dispatch("user/captcha", this.form.username);

      if (res.status == 200) {
        this.$message.success("您的闲云旅游验证码为: " + res.data.code);
      }
    },

    // 注册
    handleRegSubmit() {
      let { validPassword, ...props } = this.form;
      this.$refs["form"].validate(async valid => {
        if (valid) {
          let res = await this.$store.dispatch("user/register", props);

          if (res.status === 200) {
            this.$message.success("注册成功");
            this.$router.push("/");
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>