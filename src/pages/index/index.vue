<template>
  <div class="index-container">
    <div class="index-placehold"
         v-if="temp">
      <img src="cloud://rubbish-fq7sa.7275-rubbish-fq7sa/images/before-entry.jpg">
      <span>小程序需要获取您的用户名和昵称哦</span>
      <button class="begin"
              open-type="getUserInfo"
              @getuserinfo="handleUserInfo">信息授权</button>
    </div>
    <div class="index-phone-wrap"
         v-else>
      <div class="index-words">
        首次使用垃圾分类小程序需要完善您的个人资料，方便您使用垃圾预约上门回收以及环保金提现服务
      </div>
      <div class="index-buttons">
        <button @click="goPage('user')">居民绑定手机号</button>
        <button @click="goPage('manager')">管理员登陆</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: '',
      userInfo: {},
      temp: true
    }
  },
  onLoad() {
    let user = wx.getStorageSync('userInfo');
    wx.getSystemInfo({
      success: function (res) {
        wx.setStorageSync('screenWidth', res.screenWidth)
      },
    })
    this.checkLogin()
  },
  methods: {
    goPage(person) {
      wx.navigateTo({
        url: '/pages/index/' + person + '/main',
      });
    },
    //检查登录状态
    checkLogin: async function (e) {
      let time = new Date()
      let createTime = wx.getStorageSync('createTime')
      let role = wx.getStorageSync('role')
      let token = wx.getStorageSync('token')
      if (!token || (time.getTime() - createTime > 10 * 3600 * 1000)) {
        //不存在token,或者时间大于10分钟，调用登录
        wx.login({
          success: (res) => {
            if (res.code) {
              this.code = res.code
            }
          }
        })
      } else {
        this.$store.state.role = role
        //token有效
        wx.switchTab({
          url: "/pages/home/main",
        })
      }
    },
    handleUserInfo: async function (e) {
      this.userInfo = e.mp.detail.userInfo;
      if (this.userInfo) {
        // TODO 微信登陆
        let { data } = await this.$wxUtils.request(this.$api.AuthLoginByWeixin, this, {
          userInfo: e.mp.detail,
          code: this.code,
        })
        //存储用户信息
        //分配角色
        this.$store.state.role = data.roleType
        wx.setStorageSync('userInfo', data.userInfo)
        wx.setStorageSync('token', data.token)
        wx.setStorageSync('role', data.roleType)
        //将当前时间存到本地存储
        let createTime = new Date()
        wx.setStorageSync('createTime', createTime.getTime())
        // 如果没有角色信息 就让他注册或者登陆
        if (data.roleType === -1) {
          this.temp = false
        } else {
          wx.switchTab({
            url: "/pages/home/main",
          })
        }
      } else {
        this.$wxUtils.showModal({ title: '登录失败', content: '请授权', showCancel: false })
      }
    },
  }
};
</script>
<style lang="less" scoped>
.index-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 300rpx;
  box-sizing: border-box;
  .index-placehold {
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .begin {
      width: 90%;
      padding: 5rpx 0;
      background-color: #1aac19;
      color: #fff;
      margin-top: 30rpx;
    }
    img {
      width: 300rpx;
      height: 250rpx;
      margin-bottom: 30rpx;
    }
    span {
      font-size: 30rpx;
    }
  }
  .index-phone-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .index-words {
      width: 80%;
    }
    .index-buttons {
      height: 30%;
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      button {
        text-align: center;
        width: 80%;
        border-radius: 42rpx;
        border: 2rpx solid #000;
      }
    }
  }
}
</style>