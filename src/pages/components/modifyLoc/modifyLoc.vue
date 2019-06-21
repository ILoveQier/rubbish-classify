<template>
  <div class="personal-loc-container">
    <div class="location-info">
      <div class="location-item">
        <span>所在市</span>
        <picker @change="pickChange($event,'city')"
                :range='addrObj.citys'>
          <div class="picker">
            {{addrObj.cityName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item"
           v-if="addrObj.cityName">
        <span>所在行政区</span>
        <picker @change="pickChange($event,'area')"
                :range='addrObj.areas'>
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
                :range='addrObj.streets'>
          <div class="picker">
            {{addrObj.streetName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item"
           v-if="addrObj.streetName">
        <span>所在社区</span>
        <picker @change="pickChange($event,'community')"
                :range='addrObj.communitys'>
          <div class="picker">
            {{addrObj.communityName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item"
           v-if="addrObj.communityName">
        <span>所在小区</span>
        <picker @change="pickChange($event,'village')"
                :range='addrObj.villages'>
          <div class="picker">
            {{addrObj.villageName || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>所在号楼</span>
        <picker @change="pickChange($event,'building')"
                :range='addrObj.buildings'>
          <div class="picker">
            {{loc.buildingNum || '--请选择--'}}
          </div>
        </picker>
      </div>
      <div class="location-item">
        <span>详细地址</span>
        <textarea type="text"
                  v-model="loc.address"
                  placeholder-style='font-size:20rpx;text-align:center'
                  placeholder="必须详细到门牌号"></textarea>
      </div>
    </div>
    <button @click="saveLoc">保存</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameList: ['cityName', 'areaName', 'streetName', 'communityName', 'villageName'],
      addrObj: {},
      loc: {
        addrId: '',
        address: '',
        buildingNum: '',
      }
    }
  },
  async onLoad() {
    let roleObj = JSON.parse(this.$getRoute().roleObj)
    let id = roleObj.generalAddrId
    this.loc.address = roleObj.addrDetail
    this.loc.buildingNum = roleObj.addrBuilding
    this.loc.addrId = id
    this.addrObj = {
      // 请求列表
      citys: ['北京市'],
      areas: [],
      streets: [],
      communitys: [],
      villages: [],
      buildings: [],
      cityName: roleObj.addrCity,
      areaName: roleObj.addrArea,
      streetName: roleObj.addrStreet,
      communityName: roleObj.addrCommunity,
      villageName: roleObj.addrVillage,
      buildingNum: roleObj.addrBuilding
    }
    // 根据id查询所有列表赋值
    let { data } = await this.$wxUtils.request(this.$api.GetAreasById, this, { id })
    for (const key in data) {
      this.addrObj[key] = data[key]
    }
    for (let index = 1; index < 31; index++) {
      this.addrObj.buildings.push(index + '号楼')
    }
  },
  methods: {
    async pickClick(type) {
      let name = type + 'Name'
      let index = this.nameList.indexOf(name) + 1
      let list = this.nameList[index].replace('Name', 's')
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
        this.addrObj[list].push(res[i].name)
      }
    },
    async pickChange(e, type) {
      let val = e.mp.detail.value
      if (type === 'building') {
        this.loc.buildingNum = this.addrObj.buildings[val]
        return
      }
      let name = type + 'Name'
      this.addrObj[name] = this.addrObj[type + 's'][val]
      if (type === 'village') {
        let obj = { cityName: '北京市' }
        // 获取所有值
        for (let i2 = 0; i2 < this.nameList.length; i2++) {
          obj[this.nameList[i2]] = this.addrObj[this.nameList[i2]]
        }
        // todo 查询最终小区
        let { data } = await this.$wxUtils.request(this.$api.GetIdByDetailArea, this, obj)
        this.loc.addrId = data.id
        return
      }
      this.loc.addrId = ''
      let index = this.nameList.indexOf(name) + 1
      // 把变动的之后值清空
      for (let i = index; i < this.nameList.length; i++) {
        this.addrObj[this.nameList[i]] = ''
      }
      this.pickClick(type)
    },
    async saveLoc() {
      if (!this.loc.addrId) {
        this.$wxUtils.showModal({ content: '请将地址填写完整', showCancel: false })
        return
      }
      if (!this.loc.address) {
        this.$wxUtils.showModal({ content: '请填写详细地址', showCancel: false })
        return
      }
      // TODO 更新地址信息
      let { res } = await this.$wxUtils.request(this.$api.UpdateNormal, this, this.loc)
      if (res.errno === 0) {
        wx.showToast({
          title: '更新成功',
          duration: 1000,
          mask: true
        })
        await this.$wxUtils.sleep(1000)
        wx.navigateBack({
          delta: 1
        })
      }
    }
  },
} 
</script>
<style lang="less" scoped>
.personal-loc-container {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .location-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .location-item {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 0;
      span {
        width: 30%;
        text-align: center;
      }
      textarea {
        border: 2rpx solid #eee;
        height: 150rpx;
        width: 400rpx;
        background-color: #fff;
      }
      .picker {
        width: 400rpx;
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
  button {
    margin-top: 50rpx;
    padding: 0 50rpx;
    background-color: #0d9999;
    border-radius: 60rpx;
    color: #fff;
  }
}
</style>

