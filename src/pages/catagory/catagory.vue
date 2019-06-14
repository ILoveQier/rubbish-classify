<template>
  <div class="catagory-container">
    <div class="left">
      <div class="left-wrap">
        <span v-for="(item,i) in items"
              :key="i"
              @click="clickItem(item,i)"
              :style="{'backgroundColor':index===i?'#fff':'#e5e5e5'}">{{item.type}}</span>
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
      items: [],
      itemsDetails: []
      // items: ['家电', '纸张', '塑料', '金属', '衣服', '玻璃', '厨余', '其他', '有毒有害'],
      // itemsDetails: ['废旧吹风机', '废旧电冰箱', '废旧电风扇', '废旧吹风机', '废旧彩电', '废旧电风扇', '废旧吹风机', '废旧电冰箱', '废旧电风扇', '废旧冰箱', '废旧空调']
    }
  },
  methods: {
    clickItem(item, i) {
      this.index = i
      this.itemsDetails = item.content
    }
  },
  onLoad() {
    this.items = [
      { type: '废玻璃类', content: ['玻璃调料瓶', '玻璃饮料瓶'] },
      { type: '废金属类', content: ['铁', '铜'] },
      { type: '废布料', content: ['棉被', '纺织衣服', '毛巾', '书包', '布鞋'] },
      { type: '废旧纸类', content: ['报纸', '图书', '杂志', '打印纸', '卡片', '挂历', '纸箱', '名片', '礼盒', '生活用品包装盒', '快递包装盒'] },
      { type: '废塑料类', content: ['塑料瓶', '杯子', '牙刷', '塑料拖鞋', '塑料凳', '脸盆', '塑料玩具', '塑料整理箱', '塑料收纳箱'] },
      { type: '废旧小家电', content: ['电风扇', '手机', '插线板', '电磁炉', '收音机', '微波炉'] },
      { type: '废旧大家电', content: ['普通电视', '液晶电视', '空调窗式', '空调壁挂式', '空调柜机', '空调吸顶式', '冰箱', '冰柜', '电脑主机', '电脑显示器', '全自动洗衣机', '一体机'] },
      { type: '厨余垃圾', content: ['罐头食品', '水产', '零食', '调料', '肉蛋', '干货', '蔬果', '食物残渣', '粮食', '冲泡饮品', '盆栽植物', '过期食品'] },
      { type: '其他', content: ['餐巾纸', '尿不湿', '污染的纸张', '卫生间用纸', '污染衣物', '陶瓷碎片', '烟头', '大骨', '灰土', '污染塑料', '薄膜塑料袋', '贝壳'] },
      { type: '有毒有害', content: ['充电式电池', '蓄电池', '光胶片', '荧光灯灯管', '过期杀虫剂', '电蚊香片', '过期颜料', '水银体温计', '节能灯', '过期针剂', '过期化妆品', '油漆罐', '过期药品', '纽扣电池'] },
    ]
    this.itemsDetails = this.items[0].content
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


