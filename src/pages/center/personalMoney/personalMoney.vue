<template>
  <div class="personal-money-container">
    <div class="my-money">我的环保金 <span style="color:#C18F0B;font-weight:bold">{{total}}</span></div>
    <span>环保金列表明细</span>
    <scroll-view scroll-y
                 @scrolltolower="scrolltolower"
                 style="height: 80%;margin-top:30rpx">
      <div class="money-list-wrap">
        <div class="money-list">
          <div class="money-item"
               v-for="(item,i) in moneyList"
               :key="i">
            <div class="item-content">
              <span>日期</span>
              <span>交易记录</span>
              <span>环保金收入</span>
            </div>
            <div class="item-content">
              <span>{{item.dealTime}}</span>
              <span>{{item.incomeSource}}</span>
              <span style="color:#C18F0B">{{item.incomeNum}}</span>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>

  </div>
</template>
<script>
export default {
  data() {
    return {
      moneyList: [],
      total: 2003,
    }
  },
  onLoad() {
    // TODO 获取用户的环保金明细
    // let { data } = await this.$wxUtils.request(this.$api.GetGreenMoneyHistory, this)

    this.moneyList = [{
      "dealTime": "2019-05-24 00:00:00",
      "incomeSource": "预约上门",
      "incomeNum": 12.52,
      "id": 123456321
    }, {
      "dealTime": "2019-05-24 00:00:00",
      "incomeSource": "自主投放",
      "incomeNum": 13.52,
      "id": 123444321
    }]
  },
  methods: {
    // todo 滚动到底部请求数据
    scrolltolower(e) {
      console.log(e);
    }
  },
} 
</script>
<style lang="less" scoped>
.personal-money-container {
  display: flex;
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex-direction: column;

  .my-money {
    margin-top: 30rpx;
    background-color: #339999;
    width: 90%;
    text-align: center;
    font-size: 30rpx;
    color: #fff;
    padding: 20rpx 0;
    margin-bottom: 30rpx;
  }
  .money-list-wrap {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
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
          // height: 50rpx;
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

