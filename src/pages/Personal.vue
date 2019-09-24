<template>
  <div>
    <div class="profile">
      <!-- <img src="http://pic2.zhimg.com/50/v2-f34145b01ab1d5bb463cac35ddc9777d_hd.jpg" alt /> -->
      <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
      <!-- <img :src="$axios.defaults.baseURL + profile.head_img" alt=""> -->
      <img :src="profile.head_img" alt="">

      <div class="profile-center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          <!-- 火星网友 -->
          {{profile.nickname}}
        </div>
        <div class="time">2019.10.1</div>
      </div>

      <span class="iconfont iconjiantou1"></span>
    </div>

    <!-- 调用条形组件 -->
    <CellBar label="我的关注" text="关注的用户" />

    <CellBar label="我的跟帖" text="跟帖/回复" />

    <CellBar label="我的收藏" text="文章/视频" />

    <CellBar label="退出" @click="handleLogout"/>
  </div>
</template>

<script>
// 导入条形组件
import CellBar from "@/components/CellBar";

export default {
    data(){
        return{
            //个人信息
            profile:{}
        }
    },

  components: {
    CellBar
  },
  
  methods: {
      //退出登录
      handleLogout(){
        //清除本地的token和id
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        //replace替换上一个页面
        this.$router.replace("/login");
      }
  },

  mounted() {
    //请求个人资料接口
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      //添加头信息
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
        console.log(res);
        const{data} = res.data;
        //保存到data
        this.profile = data;

        //如果用户有头像
        // if(data.head_img){
        //     this.profile.head_img = this.$axios.defaults.baseURL + this.profile.head_img;
        // }else{
        //     this.profile.head_img = "./static/man.png";
        // }
        if(data){
            //保存到data
            this.profile = data;
            //如果用户有头像
            if(data.head_img){
                this.profile.head_img = this.$axios.defaults.baseURL + data.head_img;
            }else{
                this.profile.head_img = "./static/man.png";
            }
        }

    });
  }
};
</script>

<style scoped lang="less">
.profile {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 5px #eee solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }
}
</style>