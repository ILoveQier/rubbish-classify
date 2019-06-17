<template>
  <div class="center-container">
    <div class="center-info">
      <img :src="roleObj.avatarUrl">
      <div class="info-detail">
        <span>{{roleObj.userName}}</span>
        <div v-if="role==='普通用户'">
          <span>当前可提现环保金：{{roleObj.envirTotal}}</span>
          <div>
            <span>文明积分：{{roleObj.civiTotal}}</span>
            <span style="margin-left:20rpx">奖励积分：{{roleObj.rewardTotal}}</span>
          </div>
        </div>
        <div v-else>
          <span>您好！右安门街道{{roleObj.userName}}管理员</span>
        </div>
      </div>
    </div>
    <div v-if="role==='普通用户'"
         class="center-record">
      <div class="record-item">
        <div class="record-title">
          <span>我的预约</span>
          <span @click="goDetail('personalBook')">查看全部预约记录 ></span>
        </div>
        <div class="record-flows">
          <div class="flow-item"
               @click="goDetail('personalBook')">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/appointment.png">
            <span>我的预约</span>
          </div>
        </div>
      </div>
      <div class="record-item">
        <div class="record-title">
          <span>我的环保金</span>
        </div>
        <div class="record-flows">
          <div class="flow-item">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/money-withdraw.png">
            <span>环保金提现</span>
          </div>
          <div class="flow-item"
               @click="goDetail('personalMoney')">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/money-detail.png">
            <span>环保金明细</span>
          </div>
        </div>
      </div>
      <div class="record-item">
        <div class="record-title">
          <span>我的资料</span>
        </div>
        <div class="record-flows">
          <div class="flow-item"
               @click="goDetail('personalInfo')">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/personal-info.png">
            <span>个人信息</span>
          </div>
          <div class="flow-item"
               @click="goDetail('personalLoc')">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/loc-manage.png">
            <span>地址管理</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else
         class="center-record">
      <div class="record-item">
        <div class="record-title">
          <span>我的订单</span>
          <span @click="goDetail('managerBook')">查看历史订单 ></span>
        </div>
        <div class="record-flows">
          <div class="flow-item"
               @click="goDetail('managerBook')">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/order.png">
            <span>我的订单</span>
            <i>1</i>
          </div>
        </div>
      </div>
      <div class="record-item">
        <div class="record-title">
          <span>我的资料</span>
        </div>
        <div class="record-flows">
          <div class="flow-item">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/loc-manage.png">
            <span>居民地址</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      roleObj: {}
    }
  },
  computed: mapState([
    'role'
  ]),
  async onLoad() {
    // TODO 用户信息
    // let { data } = await this.$wxUtils.request(this.$api.GetCurrentUserInfo, this)
    this.roleObj = {
      "nickName": "sky",
      "userName": "sky",
      "realName": "小凡",
      "gender": "0",
      "phone": "13622103217",
      "idNum": "110226199402123487",
      "addrCity": "北京市",
      "addrArea": "丰台区",
      "addrStreet": "右安门街道",
      "addrCommunity": "开阳里第一社区",
      "addrVillage": "开阳里一区",
      "addrBuilding": "1号楼",
      "addressDetail": "2单元1203室",
      "envirTotal": "200",
      "rewardTotal": "100",
      "civiTotal": "100",
      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIwicXLGFk5PDpRNuDbpomhBibGeMzxHicGCeJC7zibLWiaLHwTmpM3QsKBQZp2DxMSnDiaAfuFNhgich30w/132"
    }
  },
  methods: {
    goDetail(type) {
      wx.navigateTo({
        url: '/pages/center/' + type + '/main?roleObj='+JSON.stringify(this.roleObj),
      })
    }
  },
}
</script>
<style lang="less">
.center-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  .center-info {
    width: 100%;
    height: 200rpx;
    background-color: #339999;
    display: flex;
    align-items: center;
    img {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-left: 50rpx;
    }
    .info-detail {
      margin-left: 50rpx;
      display: flex;
      flex-direction: column;
      font-size: 30rpx;
      color: #afb599;
      & > div {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .center-record {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20rpx 30rpx;
    .record-item {
      width: 100%;
      background-color: #fff;
      height: 200rpx;
      display: flex;
      flex-direction: column;
      margin-bottom: 30rpx;
      .record-title {
        font-size: 25rpx;
        border-bottom: 2rpx solid #eee;
        display: flex;
        padding: 0 30rpx;
        justify-content: space-between;
        span {
          padding: 10rpx;
        }
      }
    }
    .record-flows {
      display: flex;
      align-items: center;
      flex: 1;
      .right-flow {
        transform: translateY(-20rpx);
        width: 50rpx;
        height: 30rpx;
      }
      .flow-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 150rpx;
        position: relative;

        img {
          width: 60rpx;
          height: 60rpx;
        }
        span {
          margin-top: 10rpx;
          color: #bcbcbc;
          font-size: 23rpx;
        }
        i {
          position: absolute;
          width: 30rpx;
          height: 30rpx;
          color: red;
          border-radius: 50%;
          border: 2rpx solid red;
          text-align: center;
          line-height: 30rpx;
          font-size: 20rpx;
          right: 5rpx;
          top: -10rpx;
        }
      }
    }
  }
  .is-active {
    color: #339999 !important;
  }
}
</style>


