<template>
  <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <h4>{{title}}</h4>
      <span class="iconfont iconjiantou2"></span>
  </div>
</template>

<script>
export default {
    props:['title']
}
</script>

<style scoped lang="less">
.header{
    display: flex;
    height: 60 / 360 * 100vw;
    justify-content: space-between;
    align-items: center;

    span{
        display: block;
        padding: 0 10px;
    }

    span:last-child{
        opacity: 0;
    }
}

</style>