<template>
  <div class="money-container">
    <div class="my-money">我的环保金 <span style="color:#C18F0B;font-weight:bold">0</span></div>
    <div class="money-list-wrap">
      <span>环保金列表明细</span>
      <div class="money-list">
        <div class="money-item" v-for="i in 19">
          <div class="item-content">
            <span>日期</span>
            <span>交易记录</span>
            <span>环保金收入</span>
          </div>
          <div class="item-content">
            <span>2019-05-24</span>
            <span>自行投放</span>
            <span style="color:#C18F0B">50</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

} 
</script>
<style lang="less" scoped>
.money-container {
  display: flex;
  background-color: #F2F2F2;
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  padding-top: 30rpx;
  .my-money {
    background-color: #339999;
    width: 90%;
    text-align: center;
    font-size: 30rpx;
    color: #fff;
    padding: 20rpx 0;
    margin-bottom: 30rpx;
  }
  .money-list-wrap {
    flex: 1;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .money-list {
      margin-top: 20rpx;
      width: 100%;
      overflow: scroll;
      height: 90%;
      .money-item {
        margin-bottom: 20rpx;
        width: 100%;
        background-color: #fff;
        .item-content {
          height: 50rpx;
          display: flex;
          align-items: center;
          justify-content: space-around;
          span {
            width: 30%;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>

