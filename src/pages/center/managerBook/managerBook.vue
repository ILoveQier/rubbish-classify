<template>
  <div class="manager-book-container">
    <div class="manager-book-content">
      <div class="manager-book-nav">
        <div :class="{'selected':status === ''}"
             class="nav"
             @click="getBookStatus('')">全部</div>
        <div :class="{'selected':status === '待接单'}"
             class="nav"
             @click="getBookStatus('待接单')">未确认订单</div>
        <div :class="{'selected':status === '已接单'}"
             class="nav"
             @click="getBookStatus('已接单')">已确认订单</div>
        <div :class="{'selected':status === '已取消'}"
             class="nav"
             @click="getBookStatus('已取消')">已取消</div>
        <div :class="{'selected':status === '已完成'}"
             class="nav"
             @click="getBookStatus('已完成')">已完成</div>
      </div>
      <div class="manager-book-wrap">
        <div class=" manager-book-inner"
             @click="goDetail(book)"
             v-for="(book,i) in books"
             :key="i">
          <div class="book-info"
               style="border-bottom:2rpx solid #fff;">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="margin-right:30rpx">{{book.realName}}</span>
              <div>
                <img src="cloud://rubbish-fq7sa.7275-rubbish-fq7sa/images/phone.png"
                     style="width:50rpx;height:50rpx;vertical-align:middle">
                <span>{{book.phone}}</span>
              </div>
            </div>
            <div style="margin:10rpx 0">
              <span>{{book.address}}</span>
            </div>
          </div>
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
                 v-if="appointItem.mark == 0"
                 :key="appointItem">
              <span style="margin-right:30rpx">{{appointItem.typeName}}</span>
              <span style="margin-right:30rpx">{{appointItem.quantity}}KG</span>
              <span style="margin-right:10rpx">预估环保金</span>
              <span style="color:#FF915A;">{{appointItem.estimatePrices}}</span>
            </div>
            <div class="status">
              <span v-if="book.status === '待接单'"
                    style="color:#FF995E">待接单</span>
              <span v-if="book.status === '已接单'"
                    style="color:#FF995E">已接单</span>
              <span v-if="book.status === '已取消'"
                    style="color:#999">已取消</span>
              <span v-if="book.status === '已完成'"
                    style="color:#0A9E96">已完成</span>
            </div>
          </div>
          <div class="book-confirm"
               v-if="book.status === '待接单'||book.status === '已接单'">
            <button @click.stop="confirmBook(book)"
                    v-if="book.status === '待接单'">确认接单</button>
            <button style="color:#999;border-color:#999"
                    v-else>已接单</button>
          </div>
          <div class="book-finish"
               v-if="status === '已完成'">
            <div>
              <span style="margin-right:30rpx">上门回收时间:</span>
              <span>{{book.actualTime}}</span>
            </div>
            <div v-for="finishItem in book.appointmentList"
                 style="margin:10rpx 0"
                 v-if="finishItem.mark == 1"
                 :key="finishItem">
              <span style="margin-right:30rpx">{{finishItem.typeName}}</span>
              <span style="margin-right:30rpx">{{finishItem.quantity}}KG</span>
              <span style="margin-right:10rpx">预估环保金</span>
              <span style="color:#FF915A;">{{finishItem.estimatePrices}}</span>
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
      tab: 1,
      status: '',
      books: []
    }
  },
  onReachBottom() {
  },
  async onShow() {
    this.status = ''
    // TODO 获取用户订单
    let { data } = await this.$wxUtils.request(this.$api.GetCurrentUserOrders, this, { pageNum: 1, pageSize: 10, status: this.status, userType: 1 })
    this.books = data.data
  },
  methods: {
    async getBookStatus(type) {
      this.status = type
      // TODO 根据不同状态 获取用户订单
      let { data } = await this.$wxUtils.request(this.$api.GetCurrentUserOrders, this, { pageNum: 1, pageSize: 10, status: this.status, userType: 1 })
      this.books = data.data
    },
    goDetail(book) {
      if (book.status === '已接单') {
        wx.navigateTo({
          // TODO 传id
          url: '/pages/center/managerReview/main?id=' + book.id,
        })
      }
    },
    async confirmBook(book) {
      this.$wxUtils.showModal({ content: '是否确认接单' })
        .then(async res => {
          if (res === 'confirm') {
            let { res } = await this.$wxUtils.request(this.$api.SorterConfirm, this, { id: book.id })
            if (res.errno === 0) {
              wx.showToast({
                title: '已确认接单',
                duration: 1000,
                mask: true,
              });
              await this.$wxUtils.sleep(1000)
              this.getBookStatus(this.status)
            }
          }
        })
    }
  },
}
</script>

<style lang="less" scoped>
.manager-book-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  .manager-book-content {
    width: 100%;
    margin-top: 30rpx;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    .manager-book-nav {
      width: 100%;
      padding: 0 30rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .nav {
        border-bottom: 10rpx solid #fff;
        width: 120rpx;
        text-align: center;
        font-size: 25rpx;
      }
      .selected {
        border-bottom: 10rpx solid #339999;
      }
    }
    .manager-book-wrap {
      margin-top: 30rpx;
      display: flex;
      flex-direction: column;
      width: 95%;
      height: 90%;
      overflow: scroll;
      .manager-book-inner {
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
        .book-confirm {
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

