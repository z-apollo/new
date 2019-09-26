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
  </div>

</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ff0000;
        height: 56 / 360 * 100vw;
        padding: 0 16px;
        .logo{
            font-size: 60 / 360 * 100vw;
            color: #fff;
        }
        .header-search{
            display: flex;
            align-items: center;
            padding: 0 66px;
            height: 33 / 360 * 100vw;
            background-color: #f97979;
            border-radius: 50px;
            span{
                color: #fff;
                font-size: 15 / 360 * 100vw;
            }
            i{
                color: #fff;
                font-size: 15 / 360 * 100vw;
            }
        }
        .personal{
            color: #fff;
            font-size: 20 / 360 * 100vw
        }

    }

</style>