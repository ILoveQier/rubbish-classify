<template>
  <div class="manager-container">
    <div class="item">
      <span style="margin-right:60rpx">手机号</span>
      <input type="number"
             maxlength="11"
             placeholder="请输入手机号"
             placeholder-style='font-size:20rpx;'>
    </div>
    <div class="item">
      <span>登录密码</span>
      <input type="number"
             maxlength="10"
             placeholder="请输入"
             placeholder-style='font-size:20rpx;'>
    </div>
    <button class="login">登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      manager: {
        phone: '',
        passward: ''
      }
    }
  },
}
</script>

<style lang="less">
.manager-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50rpx;
  .item {
    width: 80%;
    padding: 20rpx 30rpx;
    background-color: #c9c9c9;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    span {
      margin-right: 30rpx;
      font-size: 30rpx;
    }
    input {
      border: 2rpx solid #eee;
      background-color: #fff;
    }
  }
  .login {
     width: 90%;
     background-color: #0A9E96;
  }
}
</style>

