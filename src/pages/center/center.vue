<template>
  <div class="center-container">
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
</style>


