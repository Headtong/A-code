// miniprogram/pages/study/exam/math.js
var ans = Array(10);
Page({
  /**
   * 页面的初始数据
   */
  //答案数组初始化，会在onload函数中赋初值""
  data: {
    id: 0,
    answer: ans
  },
  catchTouchMove: function (res) {
    return false
  },
  getQuestion: function (e) {
    const db = wx.cloud.database();
    //var that = this
    db.collection('PostgraguationM').where({
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
    if (this.data.id < 9) {
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
  nextSubmit: function () {
    var that = this
    that.setData({
      id: this.data.id
    })
  },
  //判断答题完成情况
  formSubmit: function () {
    var finish;
    var i = 0;
    var _this = this;
    while (i < 10) {
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
    }
    fail: err => {
      wx.showToast({
        title: '加载失败',
        icon: 'none'
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