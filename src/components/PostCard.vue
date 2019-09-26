<template>

  <div class="card">
      <!-- 左侧文字 -->
      <div class="card-left">
          <div class="post-title">
            火星时报火星时报火星时报火星时报火星时报火星时报火星时报火星时报
            火星时报火星时报火星时报火星时报火星时报火星时报火星时报火星时报
          </div>
          <p class="post-info">
              <span>火星时报</span>
              <span>100跟帖</span>
          </p>
      </div>
      <!-- 右侧图片 -->
      <div class="card-img">
        <img src="http://img3.imgtn.bdimg.com/it/u=3414414030,1436910499&fm=11&gp=0.jpg" alt="">
      </div>
  </div>

</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .card{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 10px;
        border-bottom: 1px solid #ccc;
    }
    .card-left{
        flex: 1;
        .post-title{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 15px;
            line-height: 1.5;
            margin-bottom: 5px;
        }
        .post-info{
            font-size: 12px;
            color: #999;
        }
    }
    .card-img{
        img{
            display: block;
            width: 120 / 360 * 100vw;
            height: 80 / 360 * 100vw;
            object-fit: cover;
        }
    }
</style>