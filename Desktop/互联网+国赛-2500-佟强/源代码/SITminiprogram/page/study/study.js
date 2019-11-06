// SITminiprogram/pages/study/study.js
var app =getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function(){
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
      icon: 'loading',
      duration: 500
    })
    console.log('加载中...')
    //模拟加载
    setTimeout(function () {
      wx.hideNavigationBarLoading()//完成停止加载
      wx.stopPullDownRefresh()//停止下拉刷新
    }, 500);
    success: res => {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 500
      })
      console.log('[刷新成功]')
    }
    fail: err => {
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
      console.log(err)
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