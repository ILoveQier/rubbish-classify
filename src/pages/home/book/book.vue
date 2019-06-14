<template>
  <div class="book-container">
    <div class="book-info-wrap">
      <div class="user-info">
        <div class="info-detail">
          <div class="info-nick">
            <span>昵称</span>
            <span>13552265254</span>
          </div>
          <div class="info-loc">
            <span style="width:300rpx">北京市西城区裕中西里xxxxxx</span>
            <span style="color:blue"
                  @click="modifyLoc">修改地址</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="info-flows">
          <div class="flow-item">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/finish-book.png">
            <span>填写预约</span>
          </div>
          <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/right-flow.png"
               class="right-flow">
          <div class="flow-item">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/go-door.png">
            <span>管理员上门</span>
          </div>
          <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/right-flow.png"
               class="right-flow">
          <div class="flow-item">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/estimate.png">
            <span>马上评估</span>
          </div>
          <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/right-flow.png"
               class="right-flow">
          <div class="flow-item">
            <img src="cloud://rubbish-0kup1.7275-rubbish-0kup1/images/score.png">
            <span>积分到账</span>
          </div>
        </div>
      </div>
      <div class="time-info">
        <span>预约时间</span>
        <span>请选择 > </span>
      </div>
      <div class="recycle-info">
        <div class="recycle-title"
             v-if="recycleList.length === 0">
          回收清单
        </div>
        <div class="recycle-title"
             v-else>
          <span style="width:40%">回收清单</span>
          <span style="flex:1">预估奖励</span>
          <div class="continue-add">
            <span>继续添加</span>
            <span class="add"
                  @click="showMask=true"></span>
          </div>
        </div>
        <div class="add-wrap"
             v-if="recycleList.length === 0">
          <button @click="showMask=true">立即添加</button>
          <span>请添加您需要上门回收的物品</span>
        </div>
        <div v-else
             class="recycle-lists">
          <div v-for="(item,i) in recycleList"
               :key="i"
               class="recycle-item">
            <span style="width:40%">{{item.good}}({{item.type === 'small'?item.weight:item.num+'个'}})</span>
            <span style="flex:1">7积分</span>
            <span class="minus"
                  @click="deleteRecycle(i)"></span>
          </div>
        </div>
        <div class="leave-message">
          <textarea placeholder="留言备注：可描述物品状态、特殊要求等"
                    placeholder-style='font-size:30rpx'></textarea>
        </div>
      </div>
    </div>
    <div class="book-confirm-wrap">
      <div class="left">
        <div>
          <span>预估环保金</span>
          <span style="color:#FF915A;margin-left:20rpx">0</span>
        </div>
        <span>（实际环保金以上门评估为准）</span>
      </div>
      <div class="right"
           @click="confirm">确认预约</div>
    </div>
    <DrawerScreen :showMask='showMask'
                  @putRecycle='putRecycle'
                  @close='showMask=false'></DrawerScreen>

  </div>
</template>
<script>
import DrawerScreen from './drawerScreen'
import wxUtils from '../../../utils/wxUtils';
export default {
  components: {
    DrawerScreen
  },
  data() {
    return {
      showMask: false,
      recycleList: []
    }
  },
  methods: {
    putRecycle(item) {
      this.showMask = false
      this.recycleList.push(item)
    },
    deleteRecycle(i) {
      this.recycleList.splice(i, 1)
    },
    modifyLoc() {
      wx.navigateTo({
        url: '/pages/home/book/modifyLoc/main',
      })
    },
    confirm() {
      wxUtils.showModal({ title: '温馨提示', content: '厨余垃圾不予上门回收服务可回收垃圾满5kg才可预约上门回收（除废旧大家电）回收物体不明确时请参考分类', confirmText: '立即预约' })
        .then(res => {
          if (res === 'confirm') {
            wxUtils.showModal({ title: '预约成功', content: '管理员会尽快上门回收！', confirmText: '查看预约' })
          }
        })
    }
  },

}
</script>
<style lang="less" scoped>
.book-container {
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .book-info-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    .user-info {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      .line {
        width: 100%;
        height: 5rpx;
        background: linear-gradient(to right, red, blue);
      }
      .info-detail {
        padding: 10rpx 50rpx;
        font-size: 30rpx;
        .info-nick,
        .info-loc {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .info-nick {
          margin-bottom: 20rpx;
        }
      }
      .info-flows {
        display: flex;
        align-items: center;
        padding: 30rpx 50rpx;
        .right-flow {
          transform: translateY(-20rpx);
          width: 50rpx;
          height: 30rpx;
        }
        .flow-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 10rpx;
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
        }
      }
    }
    .time-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx 50rpx;
      background-color: #fff;
      margin: 30rpx 0;
    }
    .recycle-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      padding: 20rpx 50rpx;
      .recycle-title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 0;
        .continue-add {
          display: flex;
          align-items: center;
          .add {
            margin-left: 20rpx;
            display: block;
            width: 30rpx;
            height: 30rpx;
            border: 2rpx solid #000;
            background-color: #000;
            border-radius: 50%;
            position: relative;
            &:before,
            &:after {
              position: absolute;
              left: 14rpx;
              top: 5rpx;
              content: " ";
              height: 25rpx;
              width: 5rpx;
              background-color: #fff;
            }
            &:before {
              transform: rotate(90deg);
            }
          }
        }
      }
      .recycle-lists {
        overflow: scroll;
        width: 100%;
        height: 300rpx;
        margin-top: 30rpx;
        margin-bottom: 50rpx;
        .recycle-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 50rpx;

          .minus {
            display: block;
            width: 30rpx;
            height: 30rpx;
            border: 2rpx solid #000;
            border-radius: 50%;
            position: relative;
            &:before {
              position: absolute;
              left: 14rpx;
              top: 5rpx;
              content: " ";
              height: 25rpx;
              width: 5rpx;
              background-color: #333;
              transform: rotate(90deg);
            }
          }
        }
      }
      .add-wrap {
        margin: 50rpx 0;
        width: 60%;
        button {
          border-radius: 50rpx;
          width: 80%;
          margin-bottom: 30rpx;
          border: 2rpx solid #eee;
        }
      }
      .leave-message {
        border-top: 2rpx solid #eee;
        padding-top: 20rpx;
        width: 100%;
        textarea {
          width: 100%;
          height: 100rpx;
          border: 2rpx solid #eee;
        }
      }
    }
  }
  .book-confirm-wrap {
    width: 100%;
    height: 150rpx;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #4f5d73;
    }
    .right {
      width: 40%;
      height: 100%;
      line-height: 150rpx;
      color: #fff;
      font-size: 50rpx;
      background-color: #339999;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>


