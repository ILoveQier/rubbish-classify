<template>
  <div class="userInfo-container">
    <div class="search">
      <img src="cloud://rubbish-fq7sa.7275-rubbish-fq7sa/images/search.png">
      <div class="input-wrap">
        <input type="text"
               v-model="userName"
               @input='inputVal'
               maxlength="10"
               placeholder-style='font-size:30rpx;color:#9C9C9D'
               placeholder="输入服务点">
        <div class="val-list"
             v-if="userName">
          <div v-for="item in valList"
               class="val-item"
               @click="getUser(item)"
               :key='item'>{{item.realName}}</div>
        </div>
      </div>
    </div>
    <div class="user-wrap">
      <div class="user-item"
           v-for="user in users"
           @click="getUser(user)"
           :key="user">
        <div style="margin-bottom:20rpx">
          <span>{{user.realName}}</span>
          <span style="float:right">{{user.phone}}</span>
        </div>
        <div>{{user.addrVillage}}</div>
        <div>{{user.address}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      userName: '',
      valList: []
    }
  },
  async onLoad() {
    let { data } = await this.$wxUtils.request(this.$api.GetAllUserBaseInfo, this)
    this.users = data.userInfo
  },
  methods: {
    getUser(user) {
      this.$store.state.self.user = user
      // todo 选择了地址
     wx.navigateBack({
       delta: 1
     })
    },
    inputVal(e) {
      let val = e.mp.detail.value
      this.valList = []
      this.users.forEach(item => {
        if (item.realName.indexOf(val) !== -1) {
          this.valList.push(item)
        }
      })
    },
  },
}
</script>
<style lang="less">
.userInfo-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  .search {
    margin-top: 30rpx;
    width: 90%;
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .val-list {
      height: 1000rpx;
      top: 92rpx;
      left: 0;
      position: absolute;
      width: 100%;
      z-index: 99;
      background: #fff;
      overflow: scroll;
      .val-item {
        color: #333333;
        font-size: 34rpx;
        padding: 30rpx;
        border-bottom: 2rpx solid #eee;
        padding-left: 30rpx;
      }
    }
    img {
      margin-left: -35%;
      position: absolute;
      width: 50rpx;
      height: 50rpx;
    }
    .input-wrap {
      width: 90%;
      height: 80%;
      background-color: #eee;
      border-radius: 50rpx;
      display: flex;
      align-items: center;
      input {
        width: 70%;
        margin-left: 100rpx;
      }
    }
  }
  .user-wrap {
    margin-top: 30rpx;
    width: 90%;
    height: 80%;
    .user-item {
      width: 100%;
      background-color: #fff;
      padding: 20rpx 50rpx;
      box-sizing: border-box;
      font-size: 30rpx;
      margin-bottom: 20rpx;
    }
  }
}
</style>

