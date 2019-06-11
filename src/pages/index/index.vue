<template>
  <div class="index-container">
    <div class="index-placehold">
      <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/before-entry.jpg">
      <span>小程序需要获取您的用户名和昵称哦</span>
    </div>
    <button class="begin"
            open-type="getUserInfo"
            @getuserinfo="handleUserInfo">信息授权</button>
  </div>
</template>
<script>
import wxUtils from '../../utils/wxUtils.js'
let api = require('../../../config/api.js')
export default {
  data() {
    return {
      code: '',
      userInfo: {},
      userId: ''
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
    //检查登录状态
    checkLogin: async function (e) {
      let time = new Date()
      let createTime = wx.getStorageSync('createTime')
      let token = wx.getStorageSync('token')
      if (!token || (time.getTime() - createTime > 10 * 3600 * 1000)) {
        //不存在token,或者时间大于10分钟，调用登录
        wx.login({
          success: (res) => {
            if (res.code) {
              this.code = res.code
            }
          }
        });
      } else {
        //token有效
        wx.switchTab({
          url: "/pages/home/main",
        })
      }
    },
    handleUserInfo: async function (e) {
      this.userInfo = e.mp.detail.userInfo;
      if (this.userInfo) {
        let { data, res } = await wxUtils.request(api.AuthLoginByWeixin, this, {
          userInfo: e.mp.detail,
          code: this.code,
        })
        //存储用户信息
        wx.setStorageSync('userInfo', data.userInfo)
        wx.setStorageSync('token', data.token)
        wx.setStorageSync('userId', data.userId)
        //将当前时间存到本地存储
        let createTime = new Date();
        wx.setStorageSync('createTime', createTime.getTime())
        this.userId = data.userId
        wx.switchTab({
          url: "/pages/home/main",
        });
      } else {
        wxUtils.showModal('登录失败', '请授权', { showCancel: false })
      }
    },
  }
};
</script>
<style lang="less" scope>
.index-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 300rpx;
  box-sizing: border-box;
  .begin {
    width: 90%;
    padding: 5rpx 0;
    background-color: #1AAC19;
    color: #fff;
    margin-top: 30rpx;
  }
  .index-placehold {
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      width: 300rpx;
      height: 250rpx;
      margin-bottom: 30rpx;
    }
    span {
      font-size: 30rpx;
    }
  }
}
</style>