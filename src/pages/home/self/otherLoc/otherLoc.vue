<template>
  <div class="otherloc-container">
    <div class="search">
      <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/search.png">
      <div class="input-wrap">
        <input type="text">
      </div>
    </div>
    <div class="loc-wrap">
      <div class="loc-item"
           v-for="item in 5"
           :key="item">
        <div>右安门街道服务点</div>
        <div>位置：丰台区右安门街道XXXXX</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
.otherloc-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  .search {
    margin-top: 30rpx;
    width: 90%;
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-left: -35%;
      position: absolute;
      width: 50rpx;
      height: 50rpx;
    }
    .input-wrap {
      width: 90%;
      height: 80%;
      background-color: #eee;
      border-radius: 50rpx;
      display: flex;
      align-items: center;
      input {
        width: 70%;
        margin-left: 70rpx;
      }
    }
  }
  .loc-wrap {
    margin-top: 30rpx;
    width: 90%;
    height: 80%;
    .loc-item {
      width: 100%;
      background-color: #fff;
      padding: 20rpx 50rpx;
      box-sizing: border-box;
      font-size: 30rpx;
      margin-bottom: 20rpx;
    }
  }
}
</style>

