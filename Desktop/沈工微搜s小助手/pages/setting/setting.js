// SITminiprogram/pages/setting/setting.js
const app = getApp()

Page({
  data: {
    thumb: '',
    nickname: '',
    orders: [],
    intoCount: 0,
    isCounting: false,
  },
  intoAdmin: function (e) {
    var _this = this;
    if (!this.data.isCounting) {
      setInterval(function () {
        _this.setData({
          intoCount: 0,
        })
      }, 3000);
      this.data.isCounting = true;
    }
    this.data.intoCount++;
    if (this.data.intoCount >= 7) {
      wx.navigateTo({
        url: '/page/admin/admin'
      })
    }
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
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
        console.log('[云函数] [login] user userInfo: ', res.result.userInfo);

        app.globalData.openid = res.result.openid;
        wx.setStorageSync('openid', res.result.openid);
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
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
  },




  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
})
