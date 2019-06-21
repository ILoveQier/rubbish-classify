<template>
  <div class="book-container">
    <div class="book-info-wrap">
      <div class="user-info">
        <div class="info-detail">
          <div class="info-nick">
            <span>{{roleObj.nickName}}</span>
            <span>{{roleObj.phone}}</span>
          </div>
          <div class="info-loc">
            <span style="width:500rpx">{{roleObj.addrVillage}}{{roleObj.addrBuilding}}{{roleObj.addrDetail}}</span>
            <span style="color:blue"
                  @click="modifyLoc">修改地址</span>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="time-info">
        <span style="margin-right:50rpx">预约时间</span>
        <picker mode="date"
                :start="diagDate"
                end="2099-01-01"
                @change="bookChange($event,'date')">
          <span v-if="!bookDate">请选择月份 ↓ </span>
          <span v-else>{{bookDate}} </span>
        </picker>
        <picker mode="time"
                start="07:00"
                end="21:59"
                style="width:30%"
                @change="bookChange($event,'time')">
          <span v-if="!bookTime">请选择时间 ↓ </span>
          <span v-else>{{bookTime}} </span>
        </picker>
        <!-- <picker :range="timeRange"
                @change="bookChange($event,'time')">
          <span v-if="!bookTime">请选择时间 ↓ </span>
          <span v-else>{{bookTime}} </span>
        </picker> -->
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
        <div class="leave-message">
          <input placeholder="留言备注：可描述物品状态、特殊要求等"
                 type="text"
                 placeholder-style='font-size:30rpx'></input>
        </div>
      </div>
    </div>
    <div class="book-confirm-wrap">
      <div class="left">
        <div>
          <span>预估环保金</span>
          <span style="color:#FF915A;margin-left:20rpx;">{{preGreenMoney}}</span>
        </div>
        <span>（实际环保金以上门评估为准）</span>
      </div>
      <div class="right"
           @click="confirmBook">确认预约</div>
    </div>
    <DrawerScreen :showMask='showMask'
                  @putRecycle='putRecycle'
                  @close='showMask=false'></DrawerScreen>

  </div>
</template>
<script>
import DrawerScreen from '../../components/drawerScreen'
import { mapState } from "vuex"

export default {
  components: {
    DrawerScreen
  },
  computed: {
    ...mapState(["role"]),
    diagDate: () => {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let day = new Date().getDate()
      let res = year + '-' + (month < 10 ? '0' : '') + month + '-' + day
      return res
    },
  },
  data() {
    return {
      showMask: false,
      recycleList: [],
      bookDate: '',
      bookTime: '',
      timeRange: [],
      roleObj: {},
      preGreenMoney: 0
    }
  },
  async onShow() {
    // TODO 用户信息
    let { data } = await this.$wxUtils.request(this.$api.GetCurrentUserInfo, this, { roleType: this.role })
    this.roleObj = data.userInfo
    // 初始化时间段范围
    // for (let index = 1; index < 24; index++) {
    //   let hour1 = ''
    //   let hour2 = ''
    //   hour1 = index < 10 ? '0' + index : index
    //   hour2 = index < 9 ? '0' + (index + 1) : (index + 1)
    //   let res = hour1 + ':00-' + hour2 + ':00'
    //   this.timeRange.push(res)
    // }
  },
  methods: {
    bookChange(e, type) {
      if (type === 'date') {
        this.bookDate = e.mp.detail.value
      } else {
        // this.bookTime = this.timeRange[e.mp.detail.value]
        this.bookTime = e.mp.detail.value
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
    modifyLoc() {
      wx.navigateTo({
        url: '/pages/home/book/modifyLoc/main?roleObj=' + JSON.stringify(this.roleObj),
      })
    },
    async confirmBook() {
      if (!this.bookDate || !this.bookTime) {
        this.$wxUtils.showModal({ content: '请选择预约日期', showCancel: false })
        return
      }
      let appointmentTime = this.bookDate + ' ' + this.bookTime + ':00'
      if (!this.preGreenMoney) {
        this.$wxUtils.showModal({ content: '请选择要回收的物品', showCancel: false })
        return
      }
      this.$wxUtils.showModal({ title: '温馨提示', content: '厨余垃圾不予上门回收服务可回收垃圾满5kg才可预约上门回收（除废旧大家电）回收物体不明确时请参考分类', confirmText: '立即预约' })
        .then(async res => {
          if (res === 'confirm') {
            // TODO 创建预约单
            let reservationList = []
            for (let index = 0; index < this.recycleList.length; index++) {
              let obj = {}
              obj.typeId = this.recycleList[index].typeId
              obj.quantity = this.recycleList[index].quantity
              reservationList.push(obj)
            }
            let { data } = await this.$wxUtils.request(this.$api.CreateReservationList, this, { reservationList, appointmentTime })
            this.$wxUtils.showModal({ title: '预约成功', content: '管理员会尽快上门回收！', confirmText: '查看预约' })
              .then(res => {
                if (res === 'confirm') {
                  wx.navigateTo({
                    url: '/pages/center/personalBook/main?type=look',
                  })
                } else {
                  wx.switchTab({
                    url: '/pages/home/main',
                  })
                }
              })
          }
        })
    }
  },

}
</script>
<style lang="less" scoped>
.book-container {
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .book-info-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    .user-info {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      .line {
        width: 100%;
        height: 5rpx;
        background: linear-gradient(to right, red, blue);
      }
      .info-detail {
        padding: 30rpx 50rpx;
        font-size: 30rpx;
        .info-nick,
        .info-loc {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .info-nick {
          margin-bottom: 20rpx;
        }
      }
      .info-flows {
        display: flex;
        align-items: center;
        padding: 30rpx 50rpx;
        .right-flow {
          transform: translateY(-20rpx);
          width: 50rpx;
          height: 30rpx;
        }
        .flow-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 10rpx;
          position: relative;

          img {
            width: 60rpx;
            height: 60rpx;
          }
          span {
            margin-top: 10rpx;
            color: #bcbcbc;
            font-size: 23rpx;
          }
        }
      }
    }
    .time-info {
      display: flex;
      align-items: center;
      padding: 30rpx 50rpx;
      background-color: #fff;
      margin: 30rpx 0;
      picker {
        margin-left: 50rpx;
      }
    }
    .recycle-info {
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
        height: 300rpx;
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
  }
  .book-confirm-wrap {
    width: 100%;
    height: 150rpx;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #4f5d73;
    }
    .right {
      width: 40%;
      height: 100%;
      line-height: 150rpx;
      color: #fff;
      font-size: 50rpx;
      background-color: #339999;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>


