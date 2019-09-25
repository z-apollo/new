<template>
  <div>
      <HeaderNormal title="我的关注"/>

      <!-- 关注用户的列表 -->
      <!-- :key="index"为给for每一个循环的元素打上一个标识，方便页面的数据刷新 -->
      <div 
      class="follow-item"
      v-for="(item, index) in list"
      :key="index"
      >
          <img :src=" $axios.defaults.baseURL + item.head_img " alt="">

          <div class="item-center">
              <p>{{item.nickname}}</p>
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
    data(){
        return {
            //关注列表
            list:[]
        }
    },
    components:{
        HeaderNormal
    },

    mounted(){
        //请求用户关注的列表
        this.$axios({
            url:"/user_follows",
            //添加头信息
            headers:{
                Authorization: localStorage.getItem("token")
            },
        }).then(res =>{
            const { data } = res.data;
            //赋值给关注的列表
            this.list = data;
        })
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