<template>
  <div class="personal-book-container">
    <div class="personal-book-content">
      <div class="personal-book-nav">
        <div :class="{'selected':status === ''}"
             class="nav"
             @click="getBookStatus('')">全部</div>
        <div :class="{'selected':status === '待接单'}"
             class="nav"
             @click="getBookStatus('待接单')">待接单</div>
        <div :class="{'selected':status === '已确认'}"
             class="nav"
             @click="getBookStatus('已确认')">已确认</div>
        <div :class="{'selected':status === '已取消'}"
             class="nav"
             @click="getBookStatus('已取消')">已取消</div>
        <div :class="{'selected':status === '已完成'}"
             class="nav"
             @click="getBookStatus('已完成')">已完成</div>
      </div>
      <div class="personal-book-wrap">
        <div class=" personal-book-inner"
             v-for="(book,i) in books"
             :key="i">
          <div class="book-info">
            <div>
              <span style="margin-right:30rpx">预约单号:</span>
              <span>{{book.id}}</span>
            </div>
            <div style="margin:20rpx 0;">
              <span style="margin-right:30rpx">预约时间:</span>
              <span>{{book.appointmentTime}}</span>
            </div>
            <div v-for="appointItem in book.appointmentList"
                 style="margin:10rpx 0"
                 :key="appointItem">
              <span style="margin-right:30rpx">{{appointItem.typeName}}</span>
              <span style="margin-right:30rpx">{{appointItem.quantity}}KG</span>
              <span style="margin-right:10rpx">预估环保金</span>
              <span style="color:#FF915A;">{{appointItem.bonus}}</span>
            </div>
            <div class="status">
              <span v-if="book.status === '待接单'"
                    style="color:#FF995E">待接单</span>
              <span v-if="book.status === '已确认'"
                    style="color:#FF995E">已确认</span>
              <span v-if="book.status === '已取消'"
                    style="color:#999">已取消</span>
              <span v-if="book.status === '已完成'"
                    style="color:#0A9E96">已完成</span>
            </div>
          </div>
          <div class="book-cancel"
               v-if="book.status === '待接单' || book.status === '已确认'">
            <button @click="cancelBook(book.id,book.status)">取消预约</button>
          </div>
          <div class="book-finish"
               v-if="book.status === '已完成'">
            <div>
              <span style="margin-right:30rpx">上门回收时间:</span>
              <span>{{book.actualTime}}</span>
            </div>
            <div v-for="(actualItem,index) in book.actualReservationList"
                 style="margin:10rpx 0;"
                 :key="index">
              <span style="margin-right:30rpx">{{actualItem.typeName}}</span>
              <span style="margin-right:30rpx">{{actualItem.quantity}}KG</span>
              <span style="margin-right:10rpx">预估环保金</span>
              <span style="color:#FF915A;">{{actualItem.bonus}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: '',
      books: []
    }
  },
  async onShow() {
    this.status = ''
    // TODO 获取用户订单
    let { data } = await this.$wxUtils.request(this.$api.GetCurrentUserOrders, this, { pageNum: 1, pageSize: 10, status: this.status, userType: 0 })
    this.books = data.data
  },
  onUnload() {
    // 如果是创建预约后查看预约
    if (this.$getRoute().type === 'look') {
      wx.switchTab({
        url: '/pages/home/main',
      })
    }
  },
  methods: {
    async getBookStatus(type) {
      this.status = type
      // TODO 根据不同状态 获取用户订单
      let { data } = await this.$wxUtils.request(this.$api.GetCurrentUserOrders, this, { pageNum: 1, pageSize: 10, status: this.status, userType: 0 })
      this.books = data.data
    },
    async cancelBook(id, status) {
      this.$wxUtils.showModal({ content: '是否确认取消该预约？' })
        .then(async res => {
          if (res === 'confirm') {
            // TODO 用户取消订单
            let { res } = await this.$wxUtils.request(this.$api.CancelAppointment, this, { id })
            if (res.errno === 0) {
              wx.showToast({
                title: '取消成功',
                duration: 1500,
                mask: true,
              });
            }
            this.getBookStatus('')
          }
        })
    }
  },
}
</script>

<style lang="less" scoped>
.personal-book-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  .personal-book-content {
    width: 100%;
    margin-top: 30rpx;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    .personal-book-nav {
      width: 100%;
      padding: 0 30rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .nav {
        border-bottom: 10rpx solid #fff;
        width: 100rpx;
        text-align: center;
        font-size: 30rpx;
      }
      .selected {
        border-bottom: 10rpx solid #339999;
      }
    }
    .personal-book-wrap {
      margin-top: 30rpx;
      display: flex;
      flex-direction: column;
      width: 95%;
      height: 90%;
      overflow: scroll;
      .personal-book-inner {
        margin-bottom: 20rpx;
        background-color: #d7d7d7;
        .book-info,
        .book-finish {
          width: 100%;
          padding: 10rpx 20rpx;
          box-sizing: border-box;
          position: relative;
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
        .book-cancel {
          height: 2rpx;
          background-color: #fff;
          button {
            float: right;
            line-height: 40rpx;
            border-radius: 50rpx;
            border: 2rpx solid red;
            color: red;
            font-size: 20rpx;
            margin: 20rpx;
          }
        }
        .book-finish {
          border-top: 2rpx solid #fff;
        }
      }
    }
  }
}
</style>

