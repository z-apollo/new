<template>
  <div>
    <!-- 红色头部 -->
    <div class="header">
      <span class="iconfont iconnew logo"></span>

      <router-link to="/search" class="link-search">
        <div class="header-search">
          <span class="iconfont iconsearch"></span>
          <i>搜索新闻</i>
        </div>
      </router-link>

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
      <van-tab v-for="(item, index) in categories" :key="index" :title="item.name">
        <!-- v-model: 列表是否在加载 -->
        <!-- finished: 是否加载完毕 -->
        <!-- load: 到底部触发的事件 -->
        <!-- immediate-check 禁止list立即出发onload -->
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <!-- 文章模块组件，post是单篇文章详情 -->
          <PostCard v-for="(item, index) in item.posts" :key="index" :post="item" />
        </van-list>

        <!-- 加载中的图标 -->
        <van-loading
          v-if="item.posts.length === 0 && !item.finished"
          size="24px"
          style="margin-top:20px;"
          vertical
          type="spinner"
          color="#1989fa"
        >加载中...</van-loading>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//引入文章列表模块
import PostCard from "@/components/PostCard";

export default {
  name: "index", //可以任命为任意字符串
  data() {
    return {
      //当前默认的栏目，没有登录应该等于0，有登录等于1，最终的效果为了默认显示头条
      //随着栏目的切换会变化
      active: localStorage.getItem("token") ? 1 : 0,
      //栏目列表
      categories: [],
      //栏目id
      cid: 999,
      //默认的头条文章列表
      // posts:[],
      // // 是否在加载,加载完毕后需要手动变为false
      // loading: false,
      // // 是否有更多数据，如果加载完所有的数据，改为true
      // finished: false,
      //分页的变量，只用第一次加载
      pageIndex: 1,
      // 每页加载条数这个值不用去修改
      pageSize: 5
    };
  },
  watch: {
    active() {
      this.cid = this.categories[this.active].id;
      // console.log(this.active) 0 1 2 3 ...
      console.log("cid=" + this.cid);

      //切换栏目时候加载当前栏目的数据
      this.onLoad();
    }
  },
  //注册组件
  components: {
    PostCard
  },

  methods: {
    // 加载下一页的数据
    onLoad() {
      // setTimeout(() => {
      //   console.log("已经滚动到底部");
      setTimeout(() => {
        console.log("已经滚动到底部");
        //     // 请求文章列表
        //     this.$axios({
        //       url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        //     }).then(res => {
        //       const {data} = res.data;
        //       // 没有更多的数据了
        //       if(data.length < this.pageSize){
        //         this.finished = true;
        //       }
        //       // 默认赋值给头条的列表
        //       this.posts = [...this.posts, ...data];
        //       // 页数加一
        //       this.pageIndex++;
        //       // 告诉onload事件这次的数据加载已经完毕，下次可以继续的出发onload
        //       this.loading = false;
        //    })
        // }, 3000)
        const category = this.categories[this.active];
        console.log(category);
        console.log("active:" + this.active);
        // 请求文章列表
        this.$axios({
          url: `/post?category=${this.cid}
                &pageIndex=${category.pageIndex}
                &pageSize=${this.pageSize}`
        }).then(res => {
          const { data } = res.data;
          // 没有更多的数据了
          if (data.length < this.pageSize) {
            category.finished = true;
          }
          // 默认赋值给头条的列表
          category.posts = [...category.posts, ...data];
          // 页数加一
          category.pageIndex++;
          // 告诉onload事件这次的数据加载已经完毕，下次可以继续的出发onload
          category.loading = false;
        });
      }, 2000);
    }
  },

  mounted() {
    const config = {
      url: "/category"
    };

    //是否存在token，如果有就给头部加上token验证
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }

    //请求栏目的数据
    this.$axios(config).then(res => {
      // console.log(res)
      const { data } = res.data;
      const newData = [];
      // 循环给栏目中每一项都添加四个独立的属性
      data.forEach(v => {
        v.posts = [];
        v.loading = false;
        v.finished = false;
        v.pageIndex = 1;
        newData.push(v);
      });

      //保存栏目列表
      this.categories = newData;
      // console.log(this.categories)
      // })

      // //请求文章列表
      // this.$axios({
      //     url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      // }).then(res=>{
      //     const{data} = res.data;
      //必须要先等待栏目请求完毕，再请求文章列表
      this.$axios({
        url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      }).then(res => {
        const { data } = res.data;

        //默认赋值给头条的列表
        this.categories[this.active].posts = data;

        //页数加一
        this.categories[this.active].pageIndex++;
      });
    });
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

/deep/.van-tabs__nav {
  background: #f6f6f6;
}
/deep/.van-tabs__line {
  height: 1px;
}
</style>