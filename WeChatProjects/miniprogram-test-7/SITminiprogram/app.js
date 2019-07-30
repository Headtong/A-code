//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  onPullDownRefresh:function() {
    wx.showNavigationBarLoading()//在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      wx.hideNavigationBarLoading()//完成停止加载
      wx.stopPullDownRefresh()//停止下拉刷新
    },1500);
  }
})
