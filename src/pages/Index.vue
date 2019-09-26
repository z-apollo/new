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
      v-for="index in 8" 
      :key="index"
      :title="'标签 ' + index"
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
            active: 1
        }
    },
    //注册组件
    components:{
        PostCard
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