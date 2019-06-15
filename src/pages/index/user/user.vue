<template>
  <div class="user-container">
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
    </div>
    <div class="location-info">
      <div class="location-item">
        <span>所在市</span>
        <picker @change="pickChange($event,'city')"
                :range='city'>
          <div class="picker">
            {{user.city || '--请选择--'}}
          </div>
        </picker>
      </div>
      <!-- todo 选择市之后发请求 获得区 再继续选择 -->
      <!-- <div class="location-item">
        <span>所在行政区</span>
        <picker @change="pickChange($event,'city')"
                :range='city'>
          <div class="picker">
            {{user.city}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>所在街道</span>
        <picker @change="pickChange($event,'city')"
                :range='city'>
          <div class="picker">
            {{user.city}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>所在小区</span>
        <picker @change="pickChange($event,'city')"
                :range='city'>
          <div class="picker">
            {{user.city}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>所在楼</span>
        <picker @change="pickChange($event,'city')"
                :range='city'>
          <div class="picker">
            {{user.city}}
          </div>
        </picker>
      </div> -->
      <div class="location-item">
        <span>详细地址</span>
        <input type="text"
               placeholder-style='font-size:20rpx;text-align:center'
               placeholder="必须详细到门牌号">
      </div>
    </div>
    <div class="phone-info">
      <div class="phone-item">
        <span>绑定手机号</span>
        <input type="number"
               v-model="user.phone"
               maxlength="11"
               placeholder="请输入手机号"
               placeholder-style='font-size:20rpx;'>
      </div>
      <div class="phone-item">
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
            @click="finishRegister">完成注册</button>
    <div class="warm-heart">
      <div>温馨提示：</div>
      <span>请务必填写真实信息，环保金提现要求必须实名制</span>
    </div>
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
        city: '',
        phone: ''
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
    pickChange: function (e, type) {
      if (type === 'city') {
        this.user.city = this.city[e.mp.detail.value]
      }
    },
    finishRegister() {
      if (this.user.phone.length < 11) {
        wxUtils.showModal({ content: '您输入的手机号码有误，请重新输入，须为11位数字', showCancel: false })
      }
    }
  },
}
</script>
<style lang="less">
.user-container {
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    background-color: #fff;
    border: 2rpx solid #797979;
    width: 50%;
    margin-left: 30rpx;
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
      margin-left: 100rpx;
      .radio {
        margin-right: 30rpx;
      }
    }
    .user-item {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20rpx 0;
      border-bottom: 2rpx solid #797979;
    }
  }
  .location-info {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 2rpx solid #797979;
    .location-item {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 0;
      input {
        flex: 1;
        margin-left: 60rpx;
      }
      .picker {
        width: 300rpx;
        height: 40rpx;
        background-color: #fff;
        border: 2rpx solid #797979;
        position: relative;
        font-size: 30rpx;
        line-height: 40rpx;
        text-indent: 20rpx;
        &::after {
          content: "";
          position: absolute;
          right: 10rpx;
          top: 10rpx;
          font-size: 0;
          line-height: 0;
          border-width: 8px;
          border-color: #000;
          border-bottom-width: 0;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
    }
  }
  .phone-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .phone-item {
      width: 90%;
      display: flex;
      align-items: center;
      padding: 20rpx 0;
      padding-left: 200rpx;
      button {
        margin: 0;
        margin-left: 30rpx;
        width: 150rpx;
        font-size: 30rpx;
        line-height: 50rpx;
        padding: 10rpx;
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

