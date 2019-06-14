<template>
  <div class="self-container">
    <div class="self-item">
      <span>右安门街道服务站</span>
      <span style="font-size:25rpx" @click="chooseOther">选择其他垃圾投放点 ></span>
    </div>
    <div class="self-item">
      <span>选择居民信息</span>
      <span> ></span>
    </div>
    <div class="recycle-info">
      <div class="recycle-title"
           v-if="recycleList.length === 0">
        回收清单
      </div>
      <div class="recycle-title"
           v-else>
        <span style="width:40%">回收清单</span>
        <span style="flex:1">预估奖励</span>
        <div class="continue-add">
          <span>继续添加</span>
          <span class="add"
                @click="showMask=true"></span>
        </div>
      </div>
      <div class="add-wrap"
           v-if="recycleList.length === 0">
        <button @click="showMask=true">立即添加</button>
      </div>
      <div v-else
           class="recycle-lists">
        <div v-for="(item,i) in recycleList"
             :key="i"
             class="recycle-item">
          <span style="width:40%">
            {{item.good || (item.type==='kitchen'?'厨余':'其他')}}
            ({{item.type === 'small'?item.weight+'KG':(item.type === 'big'?item.num+'个':(item.type === 'kitchen'?item.kitchenWeight+'KG':item.otherWeight+'KG'))}})
          </span>
          <span style="flex:1">7积分</span>
          <span class="minus"
                @click="deleteRecycle(i)"></span>
        </div>
      </div>
    </div>
    <button class="confirm" :class="{'confirmReady':recycleList.length > 0}">确认投放</button>
    <DrawerScreenSelf :showMask='showMask'
                      @putRecycle='putRecycle'
                      @close='showMask=false'></DrawerScreenSelf>
  </div>

</template>
<script>
import DrawerScreenSelf from './drawerScreenSelf'

export default {
  components: {
    DrawerScreenSelf
  },
  data() {
    return {
      showMask: false,
      recycleList: []
    }
  },
  methods: {
    putRecycle(item) {
      this.showMask = false
      this.recycleList.push(item)
    },
    deleteRecycle(i) {
      this.recycleList.splice(i, 1)
    },
    chooseOther() {
      wx.navigateTo({
        url: '/pages/home/self/otherLoc/main',
      })
    }
  },

}
</script>
<style lang="less" scoped>
.self-container {
  padding-top: 50rpx;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  .self-item {
    margin-bottom: 30rpx;
    width: 80%;
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
  }
  .recycle-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 20rpx;
    width: 90%;
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
      height: 300rpx;
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
            left: 15rpx;
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
      width: 60%;
      button {
        border-radius: 50rpx;
        width: 80%;
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
  .confirm {
    margin-top: 30rpx;
    width: 90%;
    color: #fff;
    background-color: #d7d7d7;
  }
  .confirmReady {
    background-color: #339999;
  }
}
</style>

