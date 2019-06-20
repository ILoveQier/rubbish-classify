<template>
  <div class="otherloc-container">
    <div class="search">
      <img src="cloud://rubbish-fq7sa.7275-rubbish-fq7sa/images/search.png">
      <div class="input-wrap">
        <input type="text"
               v-model="locName"
               @input='inputVal'
               maxlength="10"
               placeholder-style='font-size:30rpx;color:#9C9C9D'
               placeholder="输入服务点">
        <div class="val-list"
             v-if="locName">
          <div v-for="item in valList"
               class="val-item"
               @click="getLoc(item)"
               :key='item'>{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="loc-wrap">
      <div class="loc-item"
           @click="getLoc(loc)"
           v-for="(loc,i) in locs"
           :key="i">
        <div>{{loc.name}}</div>
        <div>{{loc.location}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      locs: [],
      locName: '',
      valList: []
    }
  },
  async onLoad() {
    let { data } = await this.$wxUtils.request(this.$api.GetAllRubbishPoint, this)
    // todo 测试数据
    this.locs = data.rubishPoint
  },
  methods: {
    getLoc(loc) {
      this.$store.state.self.loc = loc
      // todo 选择了地址
      wx.navigateBack({
        delta: 1
      })
    },
    inputVal(e) {
      let val = e.mp.detail.value
      this.valList = []
      this.locs.forEach(item => {
        if (item.name.indexOf(val) !== -1) {
          this.valList.push(item)
        }
      })
    },
  },
}
</script>
<style lang="less">
.otherloc-container {
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

  .loc-wrap {
    margin-top: 30rpx;
    width: 90%;
    height: 80%;
    .loc-item {
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

