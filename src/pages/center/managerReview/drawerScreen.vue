<template>
  <div class="drawer-screen"
       @click="closeScreen"
       v-if="showMask">
    <div class="drawer-box"
         @click.stop>
      <div class="drawer-title">
        <span>添加废品</span>
        <span class="close"
              @click="closeScreen"></span>
      </div>
      <div class="drawer-content">
        <div class="drawer-nav">
          <div :class="{'selected':tab === 1}"
               class="nav"
               @click="tab=1">可回收小件</div>
          <div :class="{'selected':tab === 2}"
               class="nav"
               @click="tab=2">可回收大件</div>
        </div>
        <div class="drawer-wrap">
          <div v-if="tab===1"
               class="drawer-inner">
            <span style="color:#999;font-size:25rpx;margin-bottom:20rpx">5公斤以上纸类、纺织物、金属、塑料等废品</span>
            <span>物品</span>
            <div class="goods-wrap">
              <div v-for="(item,i) in smallGoods"
                   class="good-item"
                   :key="i">
                <span class="goods"
                      :class="{'small-selected':smallGoodId === i}">{{item}}</span>
                <div class="item-details"
                     @click="clickItem(item,i)">{{smallGoodId === i?smallItem:''}}</div>
                <div class="item-list"
                     v-if="showItem && smallGoodId === i">
                  <div v-for="item in itemList"
                       class="val-item"
                       @click="confirmVal(item)"
                       :key='item'>{{item}}</div>
                </div>
              </div>
            </div>
            <span>重量</span>
            <div class="goods-wrap">
              <div class="good-item">
                <div class="item-details"
                     @click="showWeight = !showWeight">{{smallWeight}}</div>
                <div class="item-list"
                     v-if="showWeight">
                  <div v-for="item in smallWeights"
                       class="val-item"
                       @click="smallWeight = item;showWeight=false"
                       :key='item'>{{item}}</div>
                </div>
              </div>
              <span>KG</span>
            </div>

          </div>
          <div v-else-if="tab===2"
               class="drawer-inner">
            <span>物品</span>
            <div class="goods-wrap">
              <div v-for="(item,i) in bigGoods"
                   class="good-item"
                   :key="i">
                <span class="goods"
                      :class="{'small-selected':bigGoodId === i}">{{item}}</span>
                <div class="item-details"
                     @click="clickBigItem(item,i)">{{bigGoodId === i?bigItem:''}}</div>
                <div class="item-list"
                     v-if="showBigItem && bigGoodId === i">
                  <div v-for="item in itemList"
                       class="val-item"
                       @click="confirmBigVal(item)"
                       :key='item'>{{item}}</div>
                </div>
              </div>
            </div>
            <span>数量</span>
            <div class="count">
              <span class="minus"
                    @click="bigGoodNum === 1?'1':bigGoodNum--"></span>
              <input type="number"
                     v-model="bigGoodNum">
              <span class="add"
                    @click="bigGoodNum++"></span>
              <span style="padding-left:20rpx;">个</span>
            </div>
          </div>
        </div>
      </div>
      <div class="drawer-confirm">
        <div class="left">
          <div>
            <span>预估环保金</span>
            <span style="color:#FF915A;margin-left:20rpx">0</span>
          </div>
        </div>
        <div class="right"
             @click="putRecycle">加入回收清单</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showMask'],
  data() {
    return {
      showItem: false,
      showWeight: false,
      showBigItem: false,
      tab: 1,
      smallGoods: ['玻璃', '废纸', '金属'],
      smallWeights: [1, 2, 3, 4, 5, 6],
      smallGoodId: 0,
      smallWeight: 1,
      bigGoods: ['废旧大家电', '洗衣机', '旧冰箱', '旧彩电'],
      bigGoodId: 0,
      bigGoodNum: 1,
      itemList: ['金', '银', '铜'],
      smallItem: '',
      bigItem: ''
    }
  },
  onUnload() {
    // todo 离开后清空
    this.tab = 1
  },
  methods: {
    confirmBigVal(item) {
      this.showBigItem = !this.showBigItem
      this.bigItem = item
    },
    confirmVal(item) {
      this.showItem = !this.showItem
      this.smallItem = item
    },
    clickBigItem(item, i) {
      this.showBigItem = !this.showBigItem
      this.bigGoodId = i
      this.bigItem = ''
    },
    clickItem(item, i) {
      this.showItem = !this.showItem
      this.smallGoodId = i
      this.smallItem = ''
    },
    closeScreen() {
      this.$emit('close')
    },
    putRecycle() {
      let item = Object.create(null)
      if (this.tab === 1) {
        // 代表是小件
        item.type = 'small'
        item.good = this.smallGoods[this.smallGoodId]
        item.weight = this.smallWeight
      } else {
        // 大件
        item.type = 'big'
        item.good = this.bigGoods[this.bigGoodId]
        item.num = this.bigGoodNum
      }
      this.$emit('putRecycle', item)
    }
  },
}
</script>
<style lang="less">
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
        &:before,
        &:after {
          position: absolute;
          left: 15rpx;
          content: " ";
          height: 30rpx;
          width: 5rpx;
          background-color: #333;
        }
        &:before {
          transform: rotate(45deg);
        }
        &:after {
          transform: rotate(-45deg);
        }
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
          // width: 100rpx;
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
            flex-wrap: wrap;
            .good-item {
              display: flex;
              align-items: center;
              margin-right: 30rpx;
              margin-bottom: 20rpx;
              position: relative;
              .item-list {
                width: 100rpx;
                max-height: 200rpx;
                border: 2rpx solid blue;
                background-color: #fff;
                position: absolute;
                right: 0;
                top: 50rpx;
                overflow: scroll;
                z-index: 99;
                .val-item {
                  font-size: 25rpx;
                  width: 100%;
                  height: 50rpx;
                  padding: 10rpx 0;
                  text-align: center;
                }
              }
              .item-details {
                width: 100rpx;
                height: 40rpx;
                background-color: #fff;
                border: 2rpx solid #eee;
                position: relative;
                text-indent: 20rpx;
                font-size: 20rpx;
                line-height: 40rpx;
                &::after {
                  content: "";
                  position: absolute;
                  right: 10rpx;
                  top: 15rpx;
                  font-size: 0;
                  line-height: 0;
                  border-width: 5px;
                  border-color: #000;
                  border-bottom-width: 0;
                  border-style: dashed;
                  border-top-style: solid;
                  border-left-color: transparent;
                  border-right-color: transparent;
                }
              }
              .goods {
                font-size: 22rpx;
                margin-right: 5rpx;
              }
              .small-selected {
                color: red;
              }
            }
          }
          .count {
            display: flex;
            align-items: center;
            .minus,
            .add {
              display: block;
              width: 30rpx;
              height: 30rpx;
              border: 2rpx solid #000;
              border-radius: 50%;
              position: relative;
              &:before,
              &:after {
                position: absolute;
                left: 15rpx;
                content: " ";
                height: 30rpx;
                width: 5rpx;
                background-color: #333;
              }
              &:before {
                transform: rotate(90deg);
              }
            }
            .minus {
              &:before,
              &:after {
                transform: rotate(-90deg);
              }
            }
            input {
              margin: 20rpx;
              width: 100rpx;
              font-size: 30rpx;
              border: 2rpx solid #eee;
              text-align: center;
            }
          }
        }
      }
    }
    .drawer-confirm {
      height: 100rpx;
      margin-top: 50rpx;
      align-self: flex-end;
      width: 100%;
      height: 100rpx;
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
        line-height: 100rpx;
        color: #fff;
        font-size: 30rpx;
        background-color: #339999;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
</style>
