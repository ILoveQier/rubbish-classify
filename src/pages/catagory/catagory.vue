<template>
  <div class="catagory-container">
    <div class="left">
      <div class="left-wrap">
        <span v-for="(item,i) in items"
              :key="i"
              @click="index=i"
              :style="{'backgroundColor':index===i?'#fff':'#e5e5e5'}">{{item}}</span>
      </div>
    </div>
    <div class="right">
      <div class="right-wrap">
        <span v-for="item in itemsDetails"
              :key="item">{{item}}</span>
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      items: ['家电', '纸张', '塑料', '金属', '衣服', '玻璃', '厨余', '其他', '有毒有害'],
      itemsDetails: ['废旧吹风机', '废旧电冰箱', '废旧电风扇', '废旧吹风机', '废旧彩电', '废旧电风扇', '废旧吹风机', '废旧电冰箱', '废旧电风扇', '废旧冰箱', '废旧空调']
    }
  },
  onLoad() {
    let item = [
      { type: '废旧纸类', content: ['报纸', '图书'] },
      { type: '废金属类', content: ['铁', '铜', '塑料线'] }
    ]
  }
}
</script>
<style lang="less">
.catagory-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  .left {
    height: 100%;
    width: 30%;
    background-color: #e5e5e5;
    .left-wrap {
      display: flex;
      flex-direction: column;
      span {
        padding: 30rpx;
        text-align: center;
        color: #9c9c9c;
      }
    }
  }
  .right {
    flex: 1;
    .right-wrap {
      padding-top: 50rpx;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      span {
        padding: 0 10rpx;
        box-sizing: border-box;
        width: 150rpx;
        text-align: center;
        font-size: 25rpx;
        margin-bottom: 50rpx;
      }
    }
  }
}
</style>


