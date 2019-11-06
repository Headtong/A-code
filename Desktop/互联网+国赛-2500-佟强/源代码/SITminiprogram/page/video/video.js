// miniprogram/pages/video/video.js
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
     inputValue :'',
  },
  video: function(e){
    const db = wx.cloud.database();
    db.collection('SITdatabase2').where({
      _openid : this.data.openid,
    }).get({
      success: res =>{
        this.setData({
          data:res.data
        })
        console.log(res)
      }
    })
  },
  onLoad: function (options) {
     this.videoContext = wx.createVideoContext('myVideo')
     this.video()
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value

  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor(),
      //wx.setStorageSync('text')
    })
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //wx.showNavigationBarLoading()//在标题栏中显示加载
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    //模拟加载
    setTimeout(function () {
      wx.hideNavigationBarLoading()//完成停止加载
      wx.stopPullDownRefresh()//停止下拉刷新
    }, 500);
    success : res =>{
      wx.showToast({
        title: '加载完成',
        icon:'success',
        duration: 500
      })
    }
    fail : err =>{
      wx.showToast({
      title:'加载失败',
      icon : 'none'
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})