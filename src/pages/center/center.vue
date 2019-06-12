<template>
  <div class="center-container">
    <div class="center-info">

    </div>
    <div v-if="role==='user'">
      个人中心嘎嘎嘎嘎嘎12
    </div>
    <div v-else>

    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"

export default {
  data() {
    return {

    }
  },
  computed: mapState([
    'role'
  ]),
}
</script>
<style lang="less">
.center-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .center-info {
    width: 100%;
    height: 200rpx;
    background-color: #339999;
  }
}
</style>


