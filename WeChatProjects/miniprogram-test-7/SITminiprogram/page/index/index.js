//index.js
const app = getApp()

Page({
  data: {
    thumb: '',
    nickname: '',
  },
  onGetUserInfo: function (e) {
    if (!e.detail.userInfo) {
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  initUserInfo: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 在没有 open-type=getUserInfo 版本的兼容处理
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo,
      this.setData({
        openid: res.result.openid,
        nickName: res.result.nickName
      })
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
       // console.log('[云函数] [login] user userInfo: ', res.result.userInfo);

        app.globalData.openid = res.result.openid;
        wx.setStorageSync('openid', res.result.openid);
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  onLoad() {
    var self = this;
    // 获取用户信息
    this.initUserInfo();
    this.onGetOpenid();
    if (!this.data.openid) {
      self.setData({
        //canIUse: wx.canIUse()
        canIUse: true
      })
    }
  }
})