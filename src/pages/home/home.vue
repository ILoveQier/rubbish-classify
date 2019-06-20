<template>
  <div class="home-container">
    <!-- <web-view :src='moneyUrl'
              v-if="moneyUrl"></web-view> -->
    <div v-if="role==0"
         class="home-item">
      <span>可回收垃圾0.8元/公斤兑换环保金
        厨余垃圾1/10公斤兑换环保金
        废旧大家电以实际上门看实物为准</span>
      <div @click="goBook">预约上门</div>
      <div @click="withDraw">环保金提现</div>
    </div>
    <div v-else
         class="home-item">
      <span></span>
      <div @click="goSelf">自主投放</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      moneyUrl: ''
    }
  },
  computed: mapState([
    'role'
  ]),
  methods: {
    async withDraw() {
      let { data } = await this.$wxUtils.request(this.$api.GetGreenMoneyHistory, this, { pageNum: 1, pageSize: 10 })
      let amount = 2
      let { res } = await this.$wxUtils.request(this.$api.GetPlatFormLoginUrl, this, { amount })
      if (res.errno === 0) {
        this.$wxUtils.showModal({
          title: '温馨提示',
          content: '单次提现金额至少1元并不超过200元  1<提现金额≤200',
          confirmText: '立即提现'
        }).then(async res1 => {
          if (res1 === 'confirm') {
            // todo 真实提现
            this.moneyUrl = res.data
            var reqTask = wx.request({
              url: this.moneyUrl,
              data: {},
              header: {'content-type':'application/json'},
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: (result)=>{
                
              },
              fail: ()=>{},
              complete: ()=>{}
            });



          }
        })
        // wx.showToast({
        //   title: '提现成功',
        //   duration: 1500,
        //   mask: true,
        // });
      } else {
        this.$wxUtils.showModal({ content: res.errmsg, showCancel: false })
      }

    },
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

<style lang="less" scoped>
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
