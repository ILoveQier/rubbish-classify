<template>
  <div class="personal-info-container">
    <div class="user-info">
      <div class="user-item">
        <span>真实姓名</span>
        <input type="text"
               v-model="user.realName">
      </div>
      <div class="user-item">
        <span>身份证号</span>
        <input type="idcard"
               maxlength="18"
               v-model="user.idNum">
      </div>
      <div class="user-item">
        <span>性别</span>
        <radio-group class="radio-group"
                     @change="radioChange">
          <label class="radio">
            <radio value='0'
                   :checked='user.gender==0' />男
          </label>
          <label class="radio">
            <radio value='1'
                   :checked='user.gender==1' />女
          </label>
        </radio-group>
      </div>
      <div class="user-item">
        <span>绑定手机号</span>
        <input type="number"
               v-model="user.phone"
               maxlength="11"
               placeholder="请输入手机号"
               placeholder-style='font-size:20rpx;'>
      </div>
      <div class="user-item">
        <span>短信验证码</span>
        <input type="number"
               v-model="user.phoneCode"
               maxlength="10"
               style="width:200rpx;"
               placeholder="请输入"
               placeholder-style='font-size:20rpx;'>
        <div v-if="isGetQR"
             style="font-size:30rpx;margin-left:30rpx;color:#999">
          倒计时：{{timer}}s
        </div>
        <button @click="getQR"
                v-else>获取</button>
      </div>
    </div>
    <button class="finish"
            @click="save">保存</button>

  </div>
</template>
<script>
export default {
  data() {
    return {
      isGetQR: false,
      timer: 30,
      timeOpt: null,
      roleObj: {},
      user: {
        realName: '',
        idNum: '',
        gender: '0',
        phone: '',
        phoneCode: '',
      }
    }
  },
  onLoad() {
    let roleObj = JSON.parse(this.$getRoute().roleObj)
    this.roleObj = roleObj
    this.user = {
      realName: roleObj.realName,
      idNum: roleObj.idNum,
      gender: roleObj.gender,
      phone: roleObj.phone,
    }
  },
  methods: {
    async getQR() {
      if (!this.user.phone || this.user.phone.length < 11) {
        this.$wxUtils.showModal({ content: '请填写正确手机号', showCancel: false })
        return
      }
      this.isGetQR = true
      this.timeOpt = setInterval(() => {
        this.timer--
        if (this.timer === 0) {
          this.isGetQR = false
          this.timer = 30
          clearInterval(this.timeOpt)
          return
        }
      }, 1000);
      let { data } = await this.$wxUtils.request(this.$api.GetCheckCodeByPhone, this, { phone: this.user.phone })
      wx.showToast({
        title: '短信验证码已发送',
        duration: 1500,
      });
    },
    radioChange: function (e) {
      this.user.gender = e.mp.detail.value
    },
    async save() {
      if (this.user.idNum.length < 18) {
        this.$wxUtils.showModal({ content: '您输入的身份证号码有误，须为18位数字', showCancel: false })
        return
      }
      if (this.user.phone.length < 11) {
        this.$wxUtils.showModal({ content: '您输入的手机号码有误，须为11位数字', showCancel: false })
        return
      }
      if (this.roleObj.phone !== this.user.phone && !this.user.phoneCode) {
        this.$wxUtils.showModal({ content: '更新手机号需要验证码', showCancel: false })
        return
      }
      for (const key in this.user) {
        if (!this.user[key] && key !== 'phoneCode') {
          this.$wxUtils.showModal({ content: '请您补全信息', showCancel: false })
          return
        }
      }
      let final = JSON.parse(JSON.stringify(this.user))
      if (this.roleObj.phone === this.user.phone) {
        final.phone = ''
      }

      // TODO 更新用户信息
      let { res } = await this.$wxUtils.request(this.$api.UpdateNormal, this, final)
      if (res.errno === 0) {
        wx.showToast({
          title: '更新成功',
          duration: 1000,
          mask: true
        })
        await this.$wxUtils.sleep(1000)
        wx.navigateBack({
          delta: 1
        })
      }
    }
  },
}
</script>
<style lang="less">
.personal-info-container {
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 25rpx;
  input {
    background-color: #fff;
    border: 2rpx solid #797979;
    width: 60%;
    height: 50rpx;
  }
  span {
    color: #797979;
    font-size: 30rpx;
  }
  .user-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .radio-group {
      width: 60%;
      .radio {
        margin-right: 30rpx;
      }
    }
    .user-item {
      width: 90%;
      display: flex;
      align-items: center;
      padding: 20rpx 50rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid #797979;
      span {
        width: 30%;
        text-align: center;
      }
    }
  }
  .finish {
    margin-top: 30rpx;
    margin-bottom: 20rpx;
    width: 90%;
    background-color: #5e6a55;
    color: #fff;
  }
  .warm-heart {
    font-size: 30rpx;
  }
}
</style>

