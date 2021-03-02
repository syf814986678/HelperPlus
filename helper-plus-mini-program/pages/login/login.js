// pages/login/login.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: options => {
    
  },

  bindGetUserInfo: function(res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      app.globalData.userInfo = res.detail.userInfo
      wx.authorize({
        scope: 'scope.userLocation',
        success: res=> {
          this.login();
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  checkLogin(){
    console.info('check login...');
    const token = wx.getStorageSync('token');
    console.info(token);
    if (token) {
      console.info('已登录...');
      wx.getSetting({
        success: res =>  {
          if (res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation']) {
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo;
                wx.redirectTo({
                  url: '/pages/tab/tab'
                })
              }
            });
          } 
          else {
            //用户没有授权
            console.log("用户没有授权");
          }
        }
      });
    }
    else {
      console.info('未登录...');
    }
  },

  login(){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        app.request({
          url:"/login",
          header:{
            'content-type':"application/x-www-form-urlencoded",
          },
          data: {
            wxCode: res.code,
          },
          success: res => {
            const data = app.checkCodeStatus(res.data)
            console.log(data)
            if(data !== undefined){
              wx.setStorageSync('token', data.token)
              wx.redirectTo({
                url: '/pages/tab/tab'
              })
            }
          }
        })
      }
    })
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
    this.checkLogin();
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