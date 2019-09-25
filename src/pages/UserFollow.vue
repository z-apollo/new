<template>
  <div>
      <HeaderNormal title="我的关注"/>

      <!-- 关注用户的列表 -->
      <div class="follow-item">
          <img src="../../static/man.png" alt="">

          <div class="item-center">
              <p>火星新闻</p>
              <span>2019-10-1</span>
          </div>

          <span class="cancel">取消关注</span>
      </div>
  </div>
</template>

<script>
//导入头部
import HeaderNormal from "@/components/HeaderNormal";
export default {
    components:{
        HeaderNormal
    }
}
</script>

<style scoped lang="less">
.follow-item{
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
    border-bottom: 1px solid #ccc;
    img{
        display: block;
        width: 60 / 360 * 100vw;
        height: 60 / 360 * 100vw;
        border-radius: 50%;
    }
    .item-center{
        flex:1;
        padding: 0 10px;
        span{
            font-size:12px;
            color: #999;
        }
    }
    .cancel{
        display: block;
        height: 30px;
        line-height: 30px;
        background-color: #ccc;
        border-radius: 50px;
        text-align: center;
        padding: 0 10px;
    }
}

</style>