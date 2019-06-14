<template>
  <div class="home-container">
    <div v-if="role==='user'"
         class="home-item">
      <span>可回收垃圾0.8元/公斤兑换环保金
        厨余垃圾1/10公斤兑换环保金
        废旧大家电以实际上门看实物为准</span>
      <div @click="goBook">预约上门</div>
      <div>环保金提现</div>
    </div>
    <div v-else
         class="home-item">
      <span></span>
      <div @click="goSelf">自助投放</div>
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
  methods: {
    goBook() {
      wx.navigateTo({
        url: '/pages/home/book/main',
      })
    },
    goSelf() {
      wx.navigateTo({
        url: '/pages/home/self/main',
      })
    }
  },
}
</script>

<style lang="less">
.home-container {
  width: 100vw;
  height: 100vh;
  .home-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100rpx;
    span {
      width: 80%;
      margin-bottom: 200rpx;
    }
    div {
      font-size: 40rpx;
      font-weight: bold;
      color: #797979;
      padding: 30rpx 50rpx;
      background-color: #eee;
      margin-bottom: 30rpx;
      border-radius: 50rpx;
      text-align: center;
      width: 50%;
    }
  }
}
</style>
