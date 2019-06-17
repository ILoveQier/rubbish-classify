<template>
  <div class="manager-review-container">
    <div class="review-title">预约订单</div>
    <div class="review-info"
         @click="goDetail('managerReview')"
         style="border-bottom:2rpx solid #fff;">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="margin-right:30rpx">姓名</span>
        <div>
          <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/phone.png"
               style="width:50rpx;height:50rpx;vertical-align:middle">
          <span>18301469837</span>
        </div>
      </div>
      <div>
        <span>辽宁省东港市孤山镇</span>
        <span>XXXXXXXXXXXXXXXXXXXXXXXX</span>
      </div>

    </div>
    <div class="review-info">
      <div>
        <span style="margin-right:30rpx">玻璃</span>
        <span style="margin-right:30rpx">6KG</span>
        <span style="margin-right:10rpx">预估环保金</span>
        <span style="color:#FF915A;">7</span>
      </div>
      <div>
        <span style="margin-right:30rpx">预约时间:</span>
        <span>2019/05/30 07：00 - 11：00</span>
      </div>
      <div class="status">
        <span v-if="content === '2'"
              style="color:#FF995E">待接单</span>
        <span v-if="content === '3'"
              style="color:#FF995E">已接单</span>
        <span v-if="content === '4'"
              style="color:#999">已取消</span>
        <span v-if="content === '5'"
              style="color:#0A9E96">已完成</span>
      </div>
    </div>
    <div class="time-info">
      <span>确认上门时间 ></span>
      <picker mode="date"
              :start="diagDate"
              end="2099-01-01"
              style="width:30%;margin-left:50rpx"
              @change="confirmChange($event,'date')">
        <span v-if="!confirmDate">请选择月份 ↓ </span>
        <span v-else>{{confirmDate}} </span>
      </picker>

      <picker mode="time"
              start="07:00"
              end="21:59"
              style="width:30%"
              @change="confirmChange($event,'time')">
        <span v-if="!confirmTime">请选择时间 ↓ </span>
        <span v-else>{{confirmTime}} </span>
      </picker>
    </div>
    <div class="review-title"
         style="margin-top:50rpx">确认回收清单</div>
    <div class="recycle-info">
      <div class="recycle-title"
           v-if="recycleList.length === 0">
        回收清单
      </div>
      <div class="recycle-title"
           v-else>
        <span style="width:40%">回收清单</span>
        <span style="flex:1">奖励</span>
        <div class="continue-add">
          <span>继续添加</span>
          <span class="add"
                @click="showMask=true"></span>
        </div>
      </div>
      <div class="add-wrap"
           v-if="recycleList.length === 0">
        <button @click="showMask=true">立即添加</button>
        <span style="font-size:25rpx">请添加您需要上门回收的物品</span>
      </div>
      <div v-else
           class="recycle-lists">
        <div v-for="(item,i) in recycleList"
             :key="i"
             class="recycle-item">
          <span style="width:40%">{{item.good}}({{item.type === 'small'?item.weight:item.num+'个'}})</span>
          <span style="flex:1">7积分</span>
          <span class="minus"
                @click="deleteRecycle(i)"></span>
        </div>
      </div>
    </div>
    <div class="review-title">确认回收</div>
    <DrawerScreen :showMask='showMask'
                  @putRecycle='putRecycle'
                  @close='showMask=false'></DrawerScreen>
  </div>
</template>
<script>
import DrawerScreen from './drawerScreen'
export default {
  data() {
    return {
      showMask: false,
      recycleList: [],
      confirmDate: '',
      confirmTime: ''
    }
  },
  components: {
    DrawerScreen
  },
  methods: {
    confirmChange(e, type) {
      if (type === 'date') {
        this.confirmDate = e.mp.detail.value
      } else {
        this.confirmTime = e.mp.detail.value
      }
    },
    putRecycle(item) {
      this.showMask = false
      this.recycleList.push(item)
    },
    deleteRecycle(i) {
      this.recycleList.splice(i, 1)
    },
  },
}
</script>

<style lang="less" scoped>
.manager-review-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f2f2f2;
  .review-title {
    margin-top: 30rpx;
    width: 90%;
    height: 80rpx;
    font-size: 30rpx;
    line-height: 80rpx;
    text-align: center;
    background-color: #fff;
  }
  .time-info {
    display: flex;
    align-items: center;
    background-color: #fff;
    margin: 30rpx 0;
    height: 100rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
    width: 90%;
  }
  .review-info {
    margin-top: 10rpx;
    width: 90%;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    position: relative;
    background-color: #fff;
    span {
      font-size: 25rpx;
    }
    .status {
      position: absolute;
      right: 20rpx;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .recycle-info {
    margin-top: 20rpx;
    width: 90%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 20rpx 50rpx;
    .recycle-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 0;
      .continue-add {
        display: flex;
        align-items: center;
        .add {
          margin-left: 20rpx;
          display: block;
          width: 30rpx;
          height: 30rpx;
          border: 2rpx solid #000;
          background-color: #000;
          border-radius: 50%;
          position: relative;
          &:before,
          &:after {
            position: absolute;
            left: 14rpx;
            top: 5rpx;
            content: " ";
            height: 25rpx;
            width: 5rpx;
            background-color: #fff;
          }
          &:before {
            transform: rotate(90deg);
          }
        }
      }
    }
    .recycle-lists {
      overflow: scroll;
      width: 100%;
      height: 200rpx;
      margin-top: 30rpx;
      margin-bottom: 50rpx;
      .recycle-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50rpx;

        .minus {
          display: block;
          width: 30rpx;
          height: 30rpx;
          border: 2rpx solid #000;
          border-radius: 50%;
          position: relative;
          &:before {
            position: absolute;
            left: 14rpx;
            top: 5rpx;
            content: " ";
            height: 25rpx;
            width: 5rpx;
            background-color: #333;
            transform: rotate(90deg);
          }
        }
      }
    }
    .add-wrap {
      margin: 50rpx 0;
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        border-radius: 50rpx;
        width: 70%;
        margin-bottom: 30rpx;
        border: 2rpx solid #eee;
      }
    }
    .leave-message {
      border-top: 2rpx solid #eee;
      padding-top: 20rpx;
      width: 100%;
      textarea {
        width: 100%;
        height: 100rpx;
        border: 2rpx solid #eee;
      }
    }
  }
}
</style>

