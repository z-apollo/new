<template>
  <div class="footer-wrap">
    <!-- 未获得焦点时的页脚 -->
    <!-- 这里显示隐藏必须要用v-show，原因是为了获得textare的dom元素 -->
    <div class="footer" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handleFocus" />

      <span class="comment">
        <em>999+</em>
        <i class="iconfont iconpinglun-"></i>
      </span>

      <i class="iconfont iconshoucang"></i>

      <i class="iconfont iconfenxiang"></i>
    </div>

    <!-- 获得焦点、要评论时的页脚， -->
    <!-- 这里显示隐藏必须要用v-show，原因是为了获得textare的dom元素 -->
    <div class="footer-comment" v-show="isFocus">
      <textarea rows="3" ref="textarea" @blur="isFocus = false" :autofocus="isFocus"></textarea>
      <span>发送</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 输入框是否获得焦点
      isFocus: false
    };
  },

  methods: {
    // 获得焦点时候触发
    handleFocus() {
      // console.log("123");
      this.isFocus = true;
    }
  }
};
</script>

<style scoped lang="less">
    .footer-wrap{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
    }
    .footer{
        display: flex;
        justify-content: space-between;
        height: 60 / 360 * 100vw;
        align-items: center;
        input{
            border: none;
            width: 40%;
            padding: 5px 16px;
            background-color: #d7d7d7;
            border-radius: 50px;
            font-size: 16px;
        }
        .comment{
            display: block;
            position: relative;
            em{
                position: absolute;
                display: block;
                background-color: #ff0000;
                color: #fff;
                font-size: 10px;
                padding: 2px 5px;
                border-radius: 50px;
                top: -8px;
                left: 6px;
            }
        }
        .iconfont{
            font-size: 20px;
        }
    }
    .footer-comment{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 10px 0;
        textarea{
            width: 260 / 360 * 100vw;
            background-color: #d7d7d7;
            box-sizing: border-box;
            padding: 10px;
            border: none;
            border-radius: 8px;
            resize: none; 
        }
        span{
            display: block;
            width: 68 / 360 * 100vw;
            height: 30 / 360 * 100vw;
            line-height: 30 / 360 * 100vw;
            background-color: #ff0000;
            color: #fff;
            text-align: center;
            border-radius: 50px;
            
        }
    }
</style>