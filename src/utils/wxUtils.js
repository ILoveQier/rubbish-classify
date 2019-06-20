import Vue from 'vue'

export default {
  showModal: function (
    { title = '提示',
      content = '',
      cancelText = '取消',
      confirmText = '确定',
      cancelColor = '#333',
      confirmColor = '#000',
      showCancel = true }) {
    return new Promise(resolve => {
      wx.showModal({
        title,
        content,
        confirmText,
        cancelColor,
        confirmColor,
        showCancel,
        cancelText,
        success: res => {
          if (res.confirm) {
            resolve('confirm')
          } else if (res.cancel) {
            resolve('cancel')
          }
        }
      })
    })
  },
  sleep: async (duration) => {
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    })
  },
  openConfirm: function (callback) {
    // 再次授权
    wx.showModal({
      content: '检测到您没打开定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: res => {
        //点击“确认”时打开设置页面
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              callback()
            }
          })
        }
      }
    })
  },
  request: function (url, vue, params) {
    wx.showLoading({
      title: '加载中...',
    });
    return new Promise(resolve => {
      vue.$fly.post(url, params).then(res => {
        wx.hideLoading();
        resolve({ data: res.data.data, res: res.data })
      }).catch(err => {
        wx.hideLoading();
        this.showModal('请求失败', 'err', {})
      })
    })
  },
}