<template>
  <div class="personal-info-container">
    <div class="user-info">
      <div class="user-item">
        <span>真实姓名</span>
        <input type="text"
               v-model="user.name">
      </div>
      <div class="user-item">
        <span>身份证号</span>
        <input type="idcard"
               v-model="user.idcard">
      </div>
      <div class="user-item">
        <span>性别</span>
        <radio-group class="radio-group"
                     @change="radioChange">
          <label class="radio">
            <radio value="1"
                   :checked='user.gender==1' />男
          </label>
          <label class="radio">
            <radio value="0"
                   :checked='user.gender==0' />女
          </label>
        </radio-group>
      </div>
      <div class="user-item">
        <span>生日</span>
        <picker mode="date"
                style="width:60%"
                start="1910-01-01"
                end="2019-09-01"
                @change="bindDateChange">
          <input type="text"
                 style="width:100%"
                 :value="user.birthday">
        </picker>
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
import wxUtils from '../../../utils/wxUtils';
export default {
  data() {
    return {
      isGetQR: false,
      timer: 30,
      timeOpt: null,
      city: ['北京', '上海'],
      user: {
        name: '',
        idcard: '',
        gender: 1,
        phone: '',
        birthday: ''
      }
    }
  },
  methods: {
    getQR() {
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
    },
    radioChange: function (e) {
      this.user.gender = e.mp.detail.value
    },
    bindDateChange: function (e) {
      this.user.birthday = e.mp.detail.value

    },
    save() {
      if (this.user.phone.length < 11) {
        wxUtils.showModal({ content: '您输入的手机号码有误，请重新输入，须为11位数字', showCancel: false })
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

