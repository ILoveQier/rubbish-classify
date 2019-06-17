import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import Fly from 'flyio/dist/npm/wx'
import wxUtils from './utils/wxUtils'
import api from '../config/api'

const fly = new Fly

Vue.config.productionTip = false

App.mpType = 'app' // 当前组件类型为应用
Vue.prototype.$store = store
Vue.prototype.$fly = fly
Vue.prototype.$wxUtils = wxUtils
Vue.prototype.$api = api

//添加请求拦截器
fly.interceptors.request.use((request) => {
  //给所有请求添加自定义header
  request.headers["X-Jewelry-Token"] = wx.getStorageSync('token');
  return request;
})
Vue.prototype.$getRoute = function () {
  return this.$mp.query
}
const app = new Vue(App)
app.$mount()