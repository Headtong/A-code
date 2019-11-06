// SITminiprogram/page/study/remember/remTest.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    counter : 0,//正确数量
    // day: 0,
    num : 0,
    name:''
  },
  wordTestInput: function(e){
    var that = this
    var word = this.data.word
    if (e.detail.value == app.globalData.words) {
      this.setData({
        counter: that.data.counter + 1
      })
    }
    console.log(e)
  },
  nextTestButton: function(e){
     const db = wx.cloud.database()
     db.collection('sitdatabase')
       .aggregate()
       .sample({
         size: 1,
       })
       .end()
       .then(res => {
         this.setData({
           list: res.list
         })
         console.log(res.list[0].English)
         let words = res.list[0].English
         app.globalData.words = words
      })
    var that = this
    this.setData({
      num : that.data.num + 1,
      name:''
    })
  },
  confirmButton: function(e){
    const test = Math.trunc((this.data.counter/this.data.num)*6500)
    // const day = [0.8*test^0.06]
     wx.showToast({
       title:'词汇量:'+ test,
       icon:'none'
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.nextTestButton()
    this.confirmButton()
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