// miniprogram/pages/study/exam/polict.js
var ans = Array(20);
Page({
  /**
   * 页面的初始数据
   */
  //答案数组初始化，会在onload函数中赋初值""
  data: {
    id: 0,
    answer: ans
  },
  getQuestion: function (e) {
    const db = wx.cloud.database();
    //var that = this
    db.collection('PostgraguationP').where({
      _openid: this.data.openid
    }).get({
        success: res => {
          this.setData({
            ques: res.data
          })
          console.log('查询成功', res)
        }
      })
  },

  radioChange: function (e) {
    console.log(e.detail.value)
  },
  nextq: function () {
    if (this.data.id < 19) {
      this.setData({
        id: this.data.id + 1,
      })
    }
  },

  lastq: function (e) {
    if (this.data.id != 0) {
      this.setData({
        id: this.data.id - 1,
      })
    }
  },

  submit: function (e) {
    console.log(e.detail.value);
    var a = e.detail.value.answer;
    var id = this.data.id;
    ans[id] = a;
    this.setData({
      answer: ans,
    })
    console.log(this.data.answer);
  },

  //判断答题完成情况
  formSubmit: function () {
    var finish;
    var i = 0;
    var _this = this;
    while (i < 20) {
      if (ans[i] == "") {
        finish = 'false';
        break;
      } else {
        finish = 'true';
      }
      i++;
    }
    if (finish == 'false') {
      wx.showModal({
        title: '无法提交',
        content: '您还有部分题目未完成，请检查后重新提交',
        showCancel: false,
        confirmColor: '#fcbe39',
        confirmText: "好的",
        success(res) {
          _this.setData({
            id: i,
          })
        }
      })
    } else {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading({
          success(res) {
            _this.answer2db();
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }, 2000)
    }
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getQuestion()
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