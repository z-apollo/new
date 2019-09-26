<template>
  <div>
    <!-- 红色头部 -->
    <div class="header">
      <span class="iconfont iconnew logo"></span>

      <div class="header-search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </div>

      <router-link to="personal">
        <span class="iconfont iconwode personal"></span>
      </router-link>
    </div>

    <!-- 栏目列表 -->
    <!-- v-model：默认选中的标签栏 -->
    <!-- sticky：配置粘性布局 -->
    <!-- swipeable：滑动切换 -->
    <!-- title：要显示的内容 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab 
      v-for="(item, index) in categories" 
      :key="index"
      :title="item.name"
      >

        <p v-for="index in 10">
            <!-- 调用文章列表模块组件 -->
            <PostCard/>
        </p>
      </van-tab> 
    </van-tabs>
  </div>

</template>

<script>
//引入文章列表模块
import PostCard from "@/components/PostCard"

export default {
    data(){
        return{
            //当前默认的栏目，没有登录应该等于0，有登录等于1，最终的效果为了默认显示头条
            active: localStorage.getItem("token")? 1 : 0,
            //栏目列表
            categories: []
        }
    },
    //注册组件
    components:{
        PostCard
    },

    mounted(){
        const config ={
            url:"/category",
        }
        //是否存在token，如果有就给头部加上token验证
        if(localStorage.getItem("token")){
            config.headers = {
                 Authorization: localStorage.getItem("token")
            }
        }
        //请求栏目的数据
        this.$axios(config)
        .then(res=>{
            const {data} = res.data;
            //保存栏目列表
            this.categories = data;
        })
    }
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ff0000;
  height: 56 / 360 * 100vw;
  padding: 0 16px;
  .logo {
    font-size: 60 / 360 * 100vw;
    color: #fff;
  }
  .header-search {
    display: flex;
    align-items: center;
    padding: 0 66px;
    height: 33 / 360 * 100vw;
    background-color: #f97979;
    border-radius: 50px;
    span {
      color: #fff;
      font-size: 15 / 360 * 100vw;
    }
    i {
      color: #fff;
      font-size: 15 / 360 * 100vw;
    }
  }
  .personal {
    color: #fff;
    font-size: 20 / 360 * 100vw;
  }
}

/deep/.van-tabs__nav{
    background:#f6f6f6;
}
/deep/.van-tabs__line{
    height: 1px;
}
</style>