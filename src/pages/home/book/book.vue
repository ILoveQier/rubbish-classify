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
            <span>修改地址</span>
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
        <span style="width:100%">回收清单</span>
        <div class="add-wrap">
          <button @click="showMask=true">立即添加</button>
          <span>请添加您需要上门回收的物品</span>
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
      <div class="right">确认预约</div>
    </div>

    <div class="drawer-screen"
         @click="showMask=false"
         v-if="showMask"
         data-statu="close">
      <div class="drawer-box"
           @click.stop>
        <div class="drawer-title">
          <span>添加废品</span>
          <span class="close"
                @click="showMask=false"></span>
        </div>
        <div class="drawer-content">
          <div class="drawer-nav">
            <div :class="{'selected':tab === 1}"
                 class="nav"
                 @click="tab=1">小件</div>
            <div :class="{'selected':tab === 2}"
                 class="nav"
                 @click="tab=2">大件</div>
          </div>
          <div class="drawer-wrap">
            <div v-if="tab===1"
                 class="drawer-inner">
              <span style="color:#999;font-size:25rpx;margin-bottom:20rpx">5公斤以上纸类、纺织物、金属、塑料等废品</span>
              <span>物品</span>
              <div class="goods-wrap">
                <span v-for="(item,i) in smallGoods"
                      class="small-good"
                      @click="smallGoodId=i"
                      :class="{'small-selected':smallGoodId === i}">{{item}}</span>
              </div>
              <span>重量</span>
              <div class="goods-wrap">
                <span v-for="(item,i) in smallWeights"
                      class="small-good"
                      @click="smallWeightId=i"
                      :class="{'small-selected':smallWeightId === i}">{{item}}</span>
              </div>

            </div>
            <div v-else-if="tab===2"
                 class="drawer-inner">2</div>
          </div>
        </div>
        <div class="drawer-confirm">
          <div class="left">
            <div>
              <span>预估环保金</span>
              <span style="color:#FF915A;margin-left:20rpx">0</span>
            </div>
          </div>
          <div class="right">加入回收清单</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showMask: false,
      tab: 1,
      smallGoods: ['玻璃', '废纸', '金属'],
      smallWeights: ['0-10kg', '10-15kg', '15-20kg'],
      smallGoodId: 0,
      smallWeightId: 0
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
  .book-confirm-wrap,
  .drawer-confirm {
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
  .drawer-screen {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    .drawer-box {
      width: 90%;
      height: 60%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .drawer-title {
        width: 100%;
        padding: 20rpx 0;
        text-align: center;
        position: relative;
        .close {
          position: absolute;
          right: 30rpx;
          top: 30rpx;
          width: 30rpx;
          height: 30rpx;
        }
        .close:before,
        .close:after {
          position: absolute;
          left: 15rpx;
          content: " ";
          height: 30rpx;
          width: 5rpx;
          background-color: #333;
        }
        .close:before {
          transform: rotate(45deg);
        }
        .close:after {
          transform: rotate(-45deg);
        }
      }
      .drawer-content {
        margin-top: 30rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        .drawer-nav {
          display: flex;
          align-items: center;
          .nav {
            border-bottom: 10rpx solid #fff;
            width: 100rpx;
            text-align: center;
            margin-left: 50rpx;
            font-size: 35rpx;
          }
          .selected {
            border-bottom: 10rpx solid #339999;
          }
        }
        .drawer-wrap {
          padding: 20rpx 50rpx;
          .drawer-inner {
            display: flex;
            flex-direction: column;
            .goods-wrap {
              margin: 20rpx 0;
              display: flex;
              align-items: center;
              .small-good {
                font-size: 22rpx;
                padding: 10rpx 40rpx;
                border-radius: 40rpx;
                border: 2rpx solid #eee;
                margin-right: 20rpx;
              }
              .small-selected {
                background-color: #339999;
                color: #fff;
              }
            }
          }
        }
      }
      .drawer-confirm {
        height: 100rpx;
        margin-top: 50rpx;
        align-self: flex-end;
        .right {
          line-height: 100rpx;
          font-size: 30rpx !important;
        }
      }
    }
  }
}
</style>


