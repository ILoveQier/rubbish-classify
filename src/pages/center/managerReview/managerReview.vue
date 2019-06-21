<template>
  <div class="manager-review-container">
    <div class="review-title">预约订单</div>
    <div class="review-info"
         @click="goDetail('managerReview')"
         style="border-bottom:2rpx solid #fff;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin:10rpx;">
        <span style="margin-right:30rpx">{{order.realName}}</span>
        <div>
          <img src="cloud://rubbish-fq7sa.7275-rubbish-fq7sa/images/phone.png"
               style="width:50rpx;height:50rpx;vertical-align:middle">
          <span>{{order.phone}}</span>
        </div>
      </div>
      <div style="margin:10rpx">
        <span>{{order.address}}</span>
      </div>

    </div>
    <div class="review-info">
      <div style="margin:10rpx 0;"
           v-for="(item,i) in order.appointmentList"
           :key="i">
        <span style="margin-right:30rpx">{{item.typeName}}</span>
        <span style="margin-right:30rpx">{{item.quantity}}KG</span>
        <span style="margin-right:10rpx">预估环保金</span>
        <span style="color:#FF915A;">{{item.bonus}}</span>
      </div>
      <div style="margin:10rpx 0;">
        <span style="margin-right:30rpx">预约时间:</span>
        <span>{{order.appointmentTime}}</span>
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
    <div class="recycle-info">
      <div class="recycle-title"
           v-if="recycleList.length === 0">
        回收清单
      </div>
      <div class="recycle-title"
           v-else>
        <span style="width:40%">回收清单</span>
        <span style="flex:1">预估奖励</span>
        <div class="continue-add"
             @click="showMask=true">
          <span>继续添加</span>
          <span class="add"></span>
        </div>
      </div>
      <div class="add-wrap"
           v-if="recycleList.length === 0">
        <button @click="showMask=true">立即添加</button>
        <span>请添加您需要上门回收的物品</span>
      </div>
      <div v-else
           class="recycle-lists">
        <div v-for="(item,i) in recycleList"
             :key="i"
             class="recycle-item">
          <span style="width:35%">{{item.detail}}({{item.quantity}}{{item.unit}})</span>
          <span style="width:20%;margin-right:220rpx">{{item.bonus}}积分</span>
          <span class="minus"
                @click="deleteRecycle(item,i)"></span>
        </div>
      </div>
    </div>
    <div class="review-title"
         @click="confirmRecycle">确认回收</div>
    <DrawerScreen :showMask='showMask'
                  @putRecycle='putRecycle'
                  @close='showMask=false'></DrawerScreen>
  </div>
</template>
<script>
import DrawerScreen from '../../components/drawerScreen'
export default {
  data() {
    return {
      showMask: false,
      recycleList: [],
      confirmDate: '',
      confirmTime: '',
      preGreenMoney: 0,
      order: {}
    }
  },
  components: {
    DrawerScreen
  },
  async onShow() {
    let id = this.$getRoute().id
    // TODO 根据id查询订单详情
    let { data } = await this.$wxUtils.request(this.$api.GetOrderDetail, this, { id })
    this.order = data
  },
  methods: {
    async confirmRecycle() {
      if (!this.confirmDate || !this.confirmTime) {
        this.$wxUtils.showModal({ content: '请选择上门时间', showCancel: false })
        return
      }
      if (this.recycleList.length === 0) {
        this.$wxUtils.showModal({ content: '请选择回收物品', showCancel: false })
        return
      }
      this.$wxUtils.showModal({ content: '确认回收吗？' })
        .then(async res => {
          if (res === 'confirm') {
            let id = this.order.id
            let confirmTime = this.confirmDate + ' ' + this.confirmTime + ':00'
            // TODO 确认上门时间
            let { res: res1 } = await this.$wxUtils.request(this.$api.UpdateSorterConfirmTime, this, { id, confirmTime })
            // TODO 创建预约单
            let reservationList = []
            for (let index = 0; index < this.recycleList.length; index++) {
              let obj = {}
              obj.typeId = this.recycleList[index].typeId
              obj.quantity = this.recycleList[index].quantity
              reservationList.push(obj)
            }
            let { res: res2 } = await this.$wxUtils.request(this.$api.AuditChecklist, this, { id, reservationList })
            wx.navigateBack({
              delta: 1
            });
          }
        })
    },
    confirmChange(e, type) {
      if (type === 'date') {
        this.confirmDate = e.mp.detail.value
      } else {
        this.confirmTime = e.mp.detail.value
      }
    },
    putRecycle(item) {
      this.showMask = false
      this.preGreenMoney = (parseFloat(this.preGreenMoney) + parseFloat(item.bonus)).toFixed(1)
      let obj = {
        "unit": item.unit,
        "detail": item.detail,
        "typeId": item.typeId,
        "quantity": item.quantity,
        "bonus": item.bonus
      }
      this.recycleList.push(obj)
    },
    deleteRecycle(item, i) {
      this.preGreenMoney -= item.bonus
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
        margin: 20rpx 0;

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

