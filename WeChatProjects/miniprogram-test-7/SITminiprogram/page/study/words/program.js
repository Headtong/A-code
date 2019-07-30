// miniprogram/pages/study/words/program.js

// const db = wx.cloud.database();
// const activityInfo = db.collection('sitdatabase');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   search:"",
   word:""
  },
  getData:function(e)
  {
   console.log(e)
   this.data.search=e.detail.value;
   console.log(this.data.search)
  },
  searchTap: function(e){
    const db = wx.cloud.database();
   // var that = this;
   // console.log(data)
    var datas=this.data.search
    db.collection('sitdatabase').field({English : true,Chinese : true})
    .get({
      success: res =>{
       this.setData({
         data:res.data,
         word:res.data[e].English
       })
        console.log('[数据库] [查询记录] 成功: ',res)
      }
    })
  },
  
  getWordsItem: function (e) {
    const db = wx.cloud.database();
    // 查询当前用户所有的 counters
    db.collection('sitdatabase').where({
      _openid: this.data.openid,
      
    }).get({
      success: res => {
        this.setData({
          data : res.data,    
        })
        console.log('[数据库] [查询记录] 成功: ',res)
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
  onLoad: function () {
    var that = this
    this.getWordsItem();
    this.searchTap();
    // activityInfo.get().then((res) => {
    //   console.log(res)
    // })
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