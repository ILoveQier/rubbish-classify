<template>
  <div class="manager-book-container">
    <div class="manager-book-content">
      <div class="manager-book-nav">
        <div :class="{'selected':tab === 1}"
             class="nav"
             @click="getBookStatus(1)">全部</div>
        <div :class="{'selected':tab === 2}"
             class="nav"
             @click="getBookStatus(2)">未确认订单</div>
        <div :class="{'selected':tab === 3}"
             class="nav"
             @click="getBookStatus(3)">已确认订单</div>
        <div :class="{'selected':tab === 4}"
             class="nav"
             @click="getBookStatus(4)">已取消</div>
        <div :class="{'selected':tab === 5}"
             class="nav"
             @click="getBookStatus(5)">已完成</div>
      </div>
      <div class="manager-book-wrap">
        <div class=" manager-book-inner"
             v-for="(item,i) in infos"
             :key="i">
          <div class="book-info"
               v-if="tab===2"
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
          <div class="book-info"
               @click="goDetail('managerReview')">
            <div>
              <span style="margin-right:30rpx">预约单号:</span>
              <span>254855454</span>
            </div>
            <div>
              <span style="margin-right:30rpx">预约时间:</span>
              <span>2019/05/30 07：00 - 11：00</span>
            </div>
            <div>
              <span style="margin-right:30rpx">玻璃</span>
              <span style="margin-right:30rpx">6KG</span>
              <span style="margin-right:10rpx">预估环保金</span>
              <span style="color:#FF915A;">7</span>
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
          <div class="book-confirm"
               v-if="content === '2'||content === '3'">
            <button @click="confirmBook"
                    v-if="content === '2'">确认接单</button>
            <button style="color:#999;border-color:#999"
                    v-else>已确认接单</button>
          </div>
          <div class="book-finish"
               v-if="content === '5'">
            <div>
              <span style="margin-right:30rpx">上门回收时间:</span>
              <span>2019/05/30 07：00 - 11：00</span>
            </div>
            <div v-for="(item,index) in 3"
                 :key="index">
              <span style="margin-right:30rpx">玻璃</span>
              <span style="margin-right:30rpx">6KG</span>
              <span style="margin-right:10rpx">预估环保金</span>
              <span style="color:#FF915A;">7</span>
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
      content: '',
      infos: [1, 2, 3, 5, 2, 5, 2, 2, 22, 2]
    }
  },
  onReachBottom() {
    this.infos.push(1)
  },
  methods: {
    getBookStatus(type) {
      this.tab = type
      if (type === 1) {
        this.content = '1'
      } else if (type === 2) {
        this.content = '2'
      } else if (type === 3) {
        this.content = '3'
      } else if (type === 4) {
        this.content = '4'
      } else if (type === 5) {
        this.content = '5'
      }
    },
    goDetail(type) {
      if (this.content === '3') {
        wx.navigateTo({
          // TODO 传id
          url: '/pages/center/' + type + '/main?id=1',
        })
      }
    },
    confirmBook() {
      this.$wxUtils.showModal({ content: '是否确认接单' }).then(res => {

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
      position: fixed;
      display: flex;
      align-items: center;
      overflow: hidden;
      background: #fff;
      z-index: 99;
      top: 0;
      height: 100rpx;
      justify-content: space-around;

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
      margin-top: 100rpx;
      display: flex;
      flex-direction: column;
      width: 95%;
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

