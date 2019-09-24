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
      <AuthInput 
      placeholder="手机号码"
      :value="form.username"
      @input="handleUsername"
      :rule="/^1[0-9]{4,10}$/"
      err_message="手机号码格式不正确"
      ></AuthInput>

      <AuthInput 
      placeholder="密码"
      type="password"
      v-model="form.password"
      :rule="/^[0-9a-zA-Z]{3,12}$/"
      err_message="密码格式不正确"
      ></AuthInput>
    </div>

    <p class="tips">
        没有账号？
        <router-link to="/register">去注册</router-link>
    </p>

    <!-- 登录按钮 -->
    <AuthButton text="登录" @click="handleSubmit"/>

  </div>
</template>

<script>

// 导入axios请求库
// import axios from "axios";

//1.导入组件
import AuthInput from "@/components/AuthInput";//输入框组件
import AuthButton from "@/components/AuthButton";//登录组件

export default {
    data(){
        return{
            //发送给后台的数据
            form: {
                username:"",
                password:""
            }
        }
    },
    //2.注册组件（局部创建的组件，需要在实例中注册）
    components: {
        AuthInput,
        AuthButton
    },

    methods: {
        //传递给输入框组件，用于获取用户名
        handleUsername(value){
            this.form.username = value;
        },
        //表单提交
        handleSubmit(){
            // console.log(this.form)
            this.$axios({
                url: "http://localhost:3000/login",
                method: "post",//method相当于type
                data: this.form,
                //.then的回调函数就相当于success
            }).then( res=>{
                //登录成功，则跳转页面
                // console.log(res.data)
                const{message, data} = res.data;

                if(message === "登录成功"){
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user.id);
                    //跳转到个人中心
                    this.$router.push("/personal")
                }
            } )
        },

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
    span{
        font-size: 27 / 360 * 100vw;
    }
}
.logo {
    display: flex;
    justify-content: center;
    span {
        font-size: 126 / 360 *100vw;
        color: #d81e06;
    }
}
.inputs{
    input{
        margin-bottom: 20px;
    }
}
.tips{
    text-align: right;
    margin-bottom: 20px;
    a{
        color: #d81e06;
    }
}
</style>
