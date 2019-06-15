<template>
  <div class="personal-book-container">
    <div class="personal-book-content">
      <div class="personal-book-nav">
        <div :class="{'selected':tab === 1}"
             class="nav"
             @click="getBookStatus(1)">全部</div>
        <div :class="{'selected':tab === 2}"
             class="nav"
             @click="getBookStatus(2)">待接单</div>
        <div :class="{'selected':tab === 3}"
             class="nav"
             @click="getBookStatus(3)">已接单</div>
        <div :class="{'selected':tab === 4}"
             class="nav"
             @click="getBookStatus(4)">已取消</div>
        <div :class="{'selected':tab === 5}"
             class="nav"
             @click="getBookStatus(5)">已完成</div>
      </div>
      <div class="personal-book-wrap">
        <div class=" personal-book-inner"
             v-for="i in 25">
          <div class="book-info">
            <div>
              <span style="margin-right:30rpx">预约单号</span>
              <span>2767346328</span>
            </div>
            <div>
              <span style="margin-right:30rpx">预约时间</span>
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
          <div class="book-cancel"
               v-if="1===0"></div>
          <div class="book-finish"
               v-if="1===0"></div>
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
      content: ''
    }
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
      display: flex;
      align-items: center;
      .nav {
        border-bottom: 10rpx solid #fff;
        width: 100rpx;
        text-align: center;
        margin-left: 50rpx;
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
        .book-info {
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
      }
    }
  }
}
</style>

