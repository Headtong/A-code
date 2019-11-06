// SITminiprogram/page/study/remember/remRes.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    word: '',
    color:'',
    counter : 0
  },
  inputWordRandom: function (e) {
    var word = this.data.word
    if (e.detail.value == app.globalData.words) {
      wx.showToast({
        title: '回答对了呢!',
        icon: 'success'
      })
      this.setData({
        color: 'rgb(40, 247, 33)'
      })
    }
    if (e.detail.value.length == app.globalData.words.length) {
      if (e.detail.value != app.globalData.words) {
        wx.showToast({
          title: '不对呀，看看正确答案～',
          icon: 'none'
        })
        this.setData({
          word: app.globalData.words,
          color: 'rgb(247, 33, 33)'
        })
      }
    }
    console.log(e)
  },
  getRandWord: function (e) {
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
        console.log(res)
        let words = res.list[0].English
        //console.log(words)
        app.globalData.words = words
      }
      )
    var that = this
    this.setData({
      counter : that.data.counter + 1,
      name: '',
      word: '',
      color: ''
    })
    if(this.data.counter >= 150){
      wx.showToast({
        title: '词量已达上限～',
      })
    }
  },
  getWord: function(e){
    if(app.globalData.words ===undefined){
      app.globalData.words = '点击查看以查看单词拼写'
    }
    wx.showToast({
      title: app.globalData.words,
      icon: 'none'
    })
  },
  onLoad: function () {
    var that = this
    this.getWord()
    this.getRandWord()
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