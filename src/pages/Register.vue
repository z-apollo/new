<template>
  <div class="container">
    <!-- 关闭按钮 这里用到字体图标-->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>

    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 用户名、密码输入框 -->
    <div class="inputs">
      <!-- 3.调用 -->
      <!-- 手机 -->
      <AuthInput
        placeholder="手机号码"
        :value="form.username"
        @input="handleUsername"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号码格式不正确"
      ></AuthInput>
      <!-- 昵称 -->
      <AuthInput
        placeholder="昵称"
        v-model="form.nickname"

        :rule="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,6}$/"
        err_message="昵称格式不正确"
      ></AuthInput>
      <!-- 密码 -->
      <AuthInput
        placeholder="密码"
        type="password"
        v-model="form.password"

        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="密码格式不正确"
      ></AuthInput>
    </div>

    <p class="tips">
      有账号
      <router-link to="/login">去登录</router-link>
    </p>

    <!-- 登录按钮 -->
    <AuthButton text="注册" @click="handleSubmit"/>
  </div>
</template>

<script>
// 导入axios请求库
// import axios from "axios";

//1.导入组件
import AuthInput from "@/components/AuthInput"; //输入框组件
import AuthButton from "@/components/AuthButton"; //登录组件

export default {
  data() {
    return {
      //发送给后台的数据
      form: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  //2.注册组件（局部创建的组件，需要在实例中注册）
  components: {
    AuthInput,
    AuthButton
  },

  methods: {
    //传递给输入框组件，用于获取用户名
    handleUsername(value) {
      this.form.username = value;
    },
    //表单提交
    handleSubmit() {
      // console.log(this.form)
      this.$axios({
        url: "http://localhost:3000/register",
        method: "post", //method相当于type
        data: this.form
        //.then的回调函数就相当于success
      }).then(res => {
        //登录成功，则跳转页面
        // console.log(res.data)
        const { message } = res.data;
        if (message === "注册成功") {
          //跳转到登录页
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
// scoped 作用域样式
// lang声明样式的类型
.container {
  padding: 20px;
}
.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;
  span {
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.tips {
  text-align: right;
  margin-bottom: 20px;
  a {
    color: #d81e06;
  }
}
</style>
