<template>
  <div class="button" @click="handleClick">{{text}}</div>
</template>

<script>
export default {
    props:["text"],
    methods:{
        handleClick(event){
            this.$emit("click", event)
        }
    }
}
</script>

<style scoped lang="less">
    .button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 48 / 360 * 100vw;
        background-color: #d81e06;
        color: #fff;
        border-radius: 50px;
        font-size: 20px;
    }
</style>