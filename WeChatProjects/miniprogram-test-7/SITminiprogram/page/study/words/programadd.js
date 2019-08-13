// miniprogram/pages/study/words/programadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:"",
  },
  getData: function (e) {
    console.log(e)
    this.data.search = e.detail.value;
    console.log(this.data.search)
  },
  searchTap: function (e) {
    var i = this.data.search
    const db = wx.cloud.database();
    db.collection('SITdatabase').where({
      English: i
    }).get({
      success: res => {
        this.setData({
          dataE: res.data,
        })
        console.log(res)
      }
    })

  },
  getExamWords: function () {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('SITdatabase').where({
      _openid: this.data.openid,
    }).get({
      success: res => {
        this.setData({
          data: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.getExamWords()
    this.searchTap()
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