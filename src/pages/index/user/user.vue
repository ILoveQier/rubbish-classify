<template>
  <div class="user-container">
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
            <radio value="0"
                   :checked='user.gender==0' />男
          </label>
          <label class="radio">
            <radio value="1"
                   :checked='user.gender==1' />女
          </label>
        </radio-group>
      </div>
    </div>
    <div class="location-info">
      <div class="location-item">
        <span>所在市</span>
        <picker @change="pickChange($event,'city')"
                :range='addrObj.cityList'>
          <div class="picker">
            {{addrObj.cityName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item"
           v-if="addrObj.cityName">
        <span>所在行政区</span>
        <picker @change="pickChange($event,'area')"
                :disabled='addrObj.areaList.length == 0'
                :range='addrObj.areaList'>
          <div class="picker">
            {{addrObj.areaName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <!-- todo 选择市之后发请求 获得区 再继续选择 -->
      <div class="location-item"
           v-if="addrObj.areaName">
        <span>所在街道</span>
        <picker @change="pickChange($event,'street')"
                :range='addrObj.streetList'>
          <div class="picker">
            {{addrObj.streetName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item"
           v-if="addrObj.streetName">
        <span>所在社区</span>
        <picker @change="pickChange($event,'community')"
                :range='addrObj.communityList'>
          <div class="picker">
            {{addrObj.communityName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item"
           v-if="addrObj.communityName">
        <span>所在小区</span>
        <picker @change="pickChange($event,'small')"
                :range='addrObj.smallList'>
          <div class="picker">
            {{addrObj.smallName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>所在号楼</span>
        <picker @change="pickChange($event,'building')"
                :range='addrObj.buildingList'>
          <div class="picker">
            {{addrObj.buildingName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>详细地址</span>
        <textarea type="text"
                  v-model="user.address"
                  placeholder-style='font-size:20rpx;text-align:center'
                  placeholder="必须详细到门牌号"></textarea>
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
               v-model="user.phoneCode"
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
export default {
  data() {
    return {
      nameList: ['cityName', 'areaName', 'streetName', 'communityName', 'smallName'],
      smalllist: [],
      isGetQR: false,
      timer: 30,
      timeOpt: null,
      addrObj: {
        // 请求列表
        cityList: ['北京市'],
        areaList: [],
        streetList: [],
        communityList: [],
        smallList: [],
        buildingList: [],
        // 选择的值
        cityName: '',
        areaName: '',
        streetName: '',
        communityName: '',
        smallName: '',
        buildingName: ''
      },
      user: {
        realName: '',
        idNum: '',
        gender: 0,
        addrId: -1,
        address: '',
        phone: '',
        phoneCode: '',
      }
    }
  },
  async onLoad() {
    //TODO 初始化地址cityList 和 buildingList
    for (let index = 1; index < 31; index++) {
      this.addrObj.buildingList.push(index + '号楼')
    }
  },
  methods: {
    async pickClick(type) {
      let name = type + 'Name'
      let index = this.nameList.indexOf(name) + 1
      let list = this.nameList[index].replace('Name', 'List')
      // 把之前值保留
      let obj = { cityName: '北京市' }
      for (let i2 = 0; i2 < index; i2++) {
        obj[this.nameList[i2]] = this.addrObj[this.nameList[i2]]
      }
      // todo 根据之前值 查询当前的list数据
      let { data } = await this.$wxUtils.request(this.$api.GetChildrenArea, this, obj)
      let res = data['areas']
      this.addrObj[list] = []
      for (let i = 0; i < res.length; i++) {
        if (type === 'community') {
          this.smalllist.push(res[i])
        }
        this.addrObj[list].push(res[i].name)
      }
    },
    async getQR() {
      if (!this.user.phone || this.user.phone.length < 11) {
        let { data } = await this.$wxUtils.request(this.$api.GetCheckCodeByPhone, this, { phone: this.user.phone })
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
    },
    radioChange: function (e) {
      this.user.gender = e.mp.detail.value
    },
    async pickChange(e, type) {
      let val = e.mp.detail.value
      if (type === 'building') {
        // todo building 是干嘛的 字段在哪里
        this.addrObj.buildingName = this.addrObj.buildingList[val]
        return
      }
      let name = type + 'Name'
      let list = type + 'List'
      this.addrObj[name] = this.addrObj[list][val]
      if (type === 'small') {
        this.smalllist.filter(e => {
          if (e.name === this.addrObj.smallName) {
            this.user.addrId = e.id
            return
          }
        })
        return
      }
      let index = this.nameList.indexOf(name) + 1
      // 把变动的之后值清空
      for (let i = index; i < this.nameList.length; i++) {
        this.addrObj[this.nameList[i]] = ''
      }

      this.pickClick(type)

      // let list = this.nameList[index].replace('Name', 'List')
      // 如果变动了其中之一
      // if (this.addrObj[name] !== this.addrObj[list][val] && name !== 'smallName') {
      //   let index = this.nameList.indexOf(name) + 1
      //   // 把变动的之后值清空
      //   for (let i = index; i < this.nameList.length; i++) {
      //     this.addrObj[this.nameList[i]] = ''
      //   }
      //   this.addrObj[name] = this.addrObj[list][val]
      //   // 把变动的之前包括自己值保留
      //   let obj = { cityName: '北京市' }
      //   for (let i2 = 0; i2 < index; i2++) {
      //     obj[this.nameList[i2]] = this.addrObj[this.nameList[i2]]
      //   }
      //   // todo 发送查询地址 请求下一个list的数据
      //   let { data } = await this.$wxUtils.request(this.$api.GetChildrenArea, this, obj)
      //   let res = data['areas']
      //   this.addrObj[list] = []
      //   for (let i = 0; i < res.length; i++) {
      //     this.addrObj[list].push(res[i].name)
      //   }
      // }
      // if (this.addrObj[name] !== this.addrObj[list][val] && name === 'smallName') {
      //   this.addrObj[name] = this.addrObj[list][val]
      //   let obj = {}
      //   for (let i2 = 0; i2 < this.nameList.length; i2++) {
      //     obj[this.nameList[i2]] = this.addrObj[this.nameList[i2]]
      //   }
      //   // todo 如果只改动了最后的小区 那么就发请求获得addrId
      //   let { data } = await this.$wxUtils.request(this.$api.GetChildrenArea, this, obj)
      // }
    },
    async finishRegister() {
      if (this.user.idNum.length < 18) {
        this.$wxUtils.showModal({ content: '您输入的身份证号码有误，须为18位数字', showCancel: false })
        return
      }
      if (this.user.phone.length < 11) {
        this.$wxUtils.showModal({ content: '您输入的手机号码有误，请重新输入，须为11位数字', showCancel: false })
        return
      }
      for (const key in this.user) {
        if (!this.user[key] && this.user[key] !== 0) {
          this.$wxUtils.showModal({ content: '请您补全信息', showCancel: false })
          return
        }
      }
      // TODO 用户注册
      // let { data } = await this.$wxUtils.request(this.$api.UserRegister, this,{...this.user})
      // this.$store.state.role = data.roleType

      wx.switchTab({
        url: "/pages/home/main",
      })
    }
  },
}
</script>
<style lang="less" scoped>
.user-container {
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
      padding: 10rpx 0;
      input {
        flex: 1;
        margin-left: 60rpx;
      }
      textarea {
        flex: 1;
        margin-left: 50rpx;
        height: 100rpx;
        border: 2rpx solid #999;
        background-color: #fff;
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

