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

  
  },
  globalData:{
    userinfo:""
  },
  onLaunch: function(){
    console.log('初始化完成')
  },
  onShow: function(){
    console.log('数据加载完成！')
  },
  onHide: function(){
    console.log('已退出。')
  }
})
