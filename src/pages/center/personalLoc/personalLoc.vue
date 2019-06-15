<template>
  <div class="personal-loc-container">
    <div class="location-info">
      <div class="location-item">
        <span>市</span>
        <picker @change="pickChange($event,'city')"
                :range='city'>
          <div class="picker">
            {{user.city}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>区</span>
        <picker @change="pickChange($event,'city')"
                :range='city'>
          <div class="picker">
            {{user.city}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>街道</span>
        <picker @change="pickChange($event,'city')"
                :range='city'>
          <div class="picker">
            {{user.city}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>详细地址</span>
        <textarea type="text"
                  placeholder-style='font-size:20rpx;text-align:center'
                  placeholder="必须详细到门牌号"></textarea>
      </div>
    </div>
    <button>保存</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    pickChange: function (e, type) {
      if (type === 'city') {
        this.user.city = this.city[e.mp.detail.value]
      }
    },
  },
} 
</script>
<style lang="less" scoped>
.personal-loc-container {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
  .location-info {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .location-item {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 0;
      span {
        flex: 1;
        text-align: center;
      }
      textarea {
        border: 2rpx solid #eee;
        height: 150rpx;
        width: 400rpx;
        background-color: #fff;
      }
      .picker {
        width: 400rpx;
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
  button {
    margin-top: 50rpx;
    padding: 0 50rpx;
    background-color: #0d9999;
    border-radius: 60rpx;
    color: #fff;
  }
}
</style>

