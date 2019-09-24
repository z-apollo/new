<template>
  <!-- @input是输入框每次输入时候都会触发 -->
  <!-- :class值如果是对象的话，key是class的名称，如果这个key的值是true的时候就加上该class -->
  <input
    class="input"
    :placeholder="placeholder"
    :value="value"
    @input="handleInput"
    :class="{
      success: status === 'success',
      error: status === 'error'
    }"
    @change="handleChange"
  />
</template>

<script>
export default {
  data() {
    return {
      //状态
      status: ""
    };
  },
  //rule传递过来的是正则表达式
  props: ["placeholder", "value", "name", "rule", "err_message"],
  mounted() {
    // console.log(this.rule);
  },
  methods: {
    //每次输入框输入值的时候都会触发handleInput(){}
    handleInput(event) {
      // console.log(event.target.value);
      this.$emit("input", event.target.value);
      if (this.rule) {
        //如果符合正则，状态就是success，反之就是error
        if (this.rule.test(event.target.value)) {
          this.status = "success";
        } else {
          this.status = "error";
        }
      }
    },

    //输入框失去焦点时候触发
    handleChange() {
      if (this.err_message && this.status === "error") {
        // alert(this.err_message);
        this.$toast.fail(this.err_message);

      }
    }
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
  height: 38 / 360 * 100vw;
  padding: 10px 0;
  box-sizing: border-box;
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #666;
  outline: none;
}
.success {
  border-bottom-color: rgb(141, 209, 39);
}
.error {
  border-bottom-color: #d81e06;
}
</style>