<template>
  <div class="center-container">
    <div class="center-info">
      <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/order.png">
      <div class="info-detail">
        <span>名字</span>
        <div v-if="role==='user'">
          <span>当前可提现环保金：216</span>
          <div>
            <span>文明积分：50</span>
            <span style="margin-left:20rpx">奖励积分：150</span>
          </div>
        </div>
        <div v-else>
          <span>您好！右安门街道XX管理员</span>
        </div>
      </div>
    </div>
    <div v-if="role==='user'"
         class="center-record">
      <div class="record-item">
        <div class="record-title">
          <span>我的预约</span>
          <span>查看全部预约记录 ></span>
        </div>
        <div class="record-flows">
          <div class="flow-item">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/finish-book.png">
            <span>预约完成</span>
          </div>
          <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/right-flow.png"
               class="right-flow">
          <div class="flow-item">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/go-door-active.png">
            <span>管理员上门</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else
         class="center-record">
      <div class="record-item">
        <div class="record-title">
          <span>我的订单</span>
          <span>查看历史订单 ></span>
        </div>
        <div class="record-flows">
          <div class="flow-item">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/order.png">
            <span>我的订单</span>
            <i>1</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
    }
  },
  computed: mapState([
    'role'
  ]),
}
</script>
<style lang="less">
.center-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  .center-info {
    width: 100%;
    height: 200rpx;
    background-color: #339999;
    display: flex;
    align-items: center;
    img {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-left: 50rpx;
    }
    .info-detail {
      margin-left: 50rpx;
      display: flex;
      flex-direction: column;
      font-size: 30rpx;
      color: #afb599;
      & > div {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .center-record {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20rpx 30rpx;
    .record-item {
      width: 100%;
      background-color: #fff;
      height: 200rpx;
      display: flex;
      flex-direction: column;
      .record-title {
        font-size: 30rpx;
        border-bottom: 2rpx solid #eee;
        display: flex;
        padding: 0 30rpx;
        justify-content: space-between;
        span {
          padding: 10rpx;
        }
      }
    }
    .record-flows {
      display: flex;
      align-items: center;
      flex: 1;
      .right-flow {
        transform: translateY(-20rpx);
        width: 50rpx;
        height: 30rpx;
      }
      .flow-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20rpx;
        position: relative;

        img {
          width: 60rpx;
          height: 60rpx;
        }
        span {
          margin-top: 10rpx;
          color: #bcbcbc;
          font-size: 25rpx;
        }
        i {
          position: absolute;
          width: 30rpx;
          height: 30rpx;
          color: red;
          border-radius: 50%;
          border: 2rpx solid red;
          text-align: center;
          line-height: 30rpx;
          font-size: 20rpx;
          right: 5rpx;
          top: -10rpx;
        }
      }
    }
  }
}
</style>


