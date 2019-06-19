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
               @click="switchTab(1)">可回收小件</div>
          <div :class="{'selected':tab === 2}"
               class="nav"
               @click="switchTab(2)">可回收大件</div>
        </div>
        <div class="drawer-wrap">
          <div v-if="tab===1"
               class="drawer-inner">
            <span style="color:#999;font-size:25rpx;margin-bottom:20rpx">5公斤以上纸类、纺织物、金属、塑料等废品</span>
            <span>物品</span>
            <div class="goods-wrap">
              <div v-for="(smallGood,i) in smallGoods"
                   class="good-item"
                   :key="i">
                <span class="goods"
                      :class="{'small-selected':smallGoodId === smallGood.itemId}">{{smallGood.itemType}}</span>
                <div class="item-details"
                     @click="clickSmallGood(smallGood)">{{smallGoodId === smallGood.itemId?smallDetail:''}}</div>
                <div class="item-list"
                     v-if="showSmallGood && smallGoodId === smallGood.itemId">
                  <div v-for="detail in smallGood.data"
                       class="val-item"
                       @click="confirmSmallDetailId(detail)"
                       :key='detail'>{{detail.detailType}}</div>
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
                       @click="countWeight(item)"
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
              <div v-for="(bigGood,i) in bigGoods"
                   class="good-item"
                   :key="i">
                <span class="goods"
                      :class="{'small-selected':bigGoodId === bigGood.itemId}">{{bigGood.itemType}}</span>
                <div class="item-details"
                     @click="clickBigGood(bigGood)">{{bigGoodId === bigGood.itemId?bigDetail:''}}</div>
                <div class="item-list"
                     v-if="showBigGood && bigGoodId === bigGood.itemId">
                  <div v-for="detail in bigGood.data"
                       class="val-item"
                       @click="confirmBigDetailId(detail)"
                       :key='detail'>{{detail.detailType}}</div>
                </div>
              </div>
            </div>
            <span>数量</span>
            <div class="count">
              <span class="minus"
                    @click="countNum('minus')"></span>
              <input type="number"
                     @input="inputNum"
                     v-model="bigGoodNum">
              <span class="add"
                    @click="countNum('add')"></span>
              <span style="padding-left:20rpx;">个</span>
            </div>
          </div>
        </div>
      </div>
      <div class="drawer-confirm">
        <div class="left">
          <div>
            <span>预估环保金</span>
            <span style="color:#FF915A;margin-left:20rpx">{{greenMoney}}</span>
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
      showSmallGood: false,
      showWeight: false,
      showBigGood: false,
      tab: 1,
      // 预计环保金
      greenMoney: 0,
      perMoney: 0,
      // 可回收小件
      smallGoods: [],
      smallGoodId: -1,
      smallDetail: '',
      smallDetailId: -1,
      smallWeights: [1, 2, 3, 4, 5, 6],
      smallWeight: 1,
      // 可回收大件
      bigGoods: [],
      bigGoodId: -1,
      bigDetailId: -1,
      bigGoodNum: 1,
      bigDetail: '',
    }
  },
  onUnload() {
    // todo 离开后清空
    this.tab = 1
  },
  async onLoad() {
    // TODO 获取可回收垃圾类型
    let { data } = await this.$wxUtils.request(this.$api.GetRecyclables, this)
    data.filter(e=>{
      if(e.standardType === '可回收小件') {
        this.smallGoods = e.data
      } else if(e.standardType === '可回收大件') {
        this.bigGoods = e.data
      }
    })
  },
  methods: {
    switchTab(tab) {
      // 切换的时候清空
      this.tab = tab
      this.smallGoodId = -1
      this.smallDetail = ''
      this.smallDetailId = -1
      this.smallWeight = 1
      this.bigGoodId = -1
      this.bigDetail = ''
      this.bigDetailId = -1
      this.bigGoodNum = 1
      this.greenMoney = 0
      this.perMoney = 0
    },
    countWeight(item) {
      this.showWeight = false
      this.showSmallGood = false
      this.smallWeight = item
      this.greenMoney = (this.perMoney * this.smallWeight).toFixed(1)
    },
    countNum(type) {
      if (this.bigDetailId === -1) {
        this.$wxUtils.showModal({ content: '请先选择一个类目', showCancel: false })
        return
      }
      if (type === 'add') {
        this.bigGoodNum++
      } else {
        this.bigGoodNum = this.bigGoodNum === 1 ? 1 : this.bigGoodNum - 1
      }
      this.greenMoney = (this.perMoney * this.bigGoodNum).toFixed(1)
    },
    inputNum(e) {
      this.bigGoodNum = e.mp.detail.value
      this.greenMoney = (this.perMoney * this.bigGoodNum).toFixed(1)
    },
    confirmSmallDetailId(detail) {
      this.showSmallGood = false
      this.smallDetail = detail.detailType
      this.smallDetailId = detail.detailId
      this.perMoney = detail.greenBonuses
      this.greenMoney = (this.perMoney * this.smallWeight).toFixed(1)
    },
    confirmBigVal(item) {
      this.showBigGood = !this.showBigGood
      this.bigDetail = item
    },
    confirmBigDetailId(detail) {
      this.showBigGood = false
      this.bigDetail = detail.detailType
      this.bigDetailId = detail.detailId
      this.perMoney = detail.greenBonuses
      this.greenMoney = this.perMoney * this.bigGoodNum
    },
    clickBigGood(bigGood) {
      if (bigGood.itemId === this.bigGoodId) {
        this.showBigGood = !this.showBigGood
      } else {
        this.showBigGood = true
      }
      this.bigGoodId = bigGood.itemId
      this.bigDetail = ''
      this.greenMoney = 0
      this.bigDetailId = -1
    },
    clickSmallGood(smallGood) {
      if (smallGood.itemId === this.smallGoodId) {
        this.showSmallGood = !this.showSmallGood
      } else {
        this.showSmallGood = true
      }
      this.smallGoodId = smallGood.itemId
      this.smallDetail = ''
      this.perMoney = 0
      this.greenMoney = 0
      this.smallDetailId = -1
    },
    closeScreen() {
      this.switchTab(1)
      this.$emit('close')
    },
    putRecycle() {
      let item = Object.create(null)
      if (this.tab === 1) {
        // 代表是小件
        item.type = 'small'
        item.detail = this.smallDetail
        item.typeId = this.smallDetailId
        item.quantity = this.smallWeight
      } else {
        // 大件
        item.type = 'big'
        item.detail = this.bigDetail
        item.typeId = this.bigDetailId
        item.quantity = this.bigGoodNum
      }
      item.bonus = this.greenMoney
      if (item.typeId === -1) {
        this.$wxUtils.showModal({ content: '请选择要回收的物品', showCancel: false })
        return
      }
      this.switchTab(1)
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
        padding: 50rpx;
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
                width: 150rpx;
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
                  padding: 10rpx 0;
                  line-height: 50rpx;
                  text-align: center;
                }
              }
              .item-details {
                width: 150rpx;
                overflow: hidden;
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
