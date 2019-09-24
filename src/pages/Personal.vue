<template>
  <div>
    <div class="profile">
      <img src="http://pic2.zhimg.com/50/v2-f34145b01ab1d5bb463cac35ddc9777d_hd.jpg" alt />

      <div class="profile-center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          火星网友
        </div>
        <div class="time">2019.10.1</div>
      </div>

      <span class="iconfont iconjiantou1"></span>
    </div>

    <!-- 调用条形组件 -->
        <CellBar label="我的关注" text="关注的用户"/>

        <CellBar label="我的跟帖" text="跟帖/回复"/>

        <CellBar label="我的收藏" text="文章/视频"/>

        <CellBar label="设置"/>
  </div>
</template>

<script>
// 导入条形组件
import CellBar from "@/components/CellBar"

export default {
    components: {
        CellBar
    }
}
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