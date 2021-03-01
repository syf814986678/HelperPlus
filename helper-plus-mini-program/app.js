// app.js
// 引入SDK核心类
var QQMapWX = require('./utils/qqmap-wx-jssdk')
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'IXWBZ-JCTK2-P5SU7-CBL3S-WJY2K-MHB62' // 必填
})
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    
    wx.getSystemInfo({
      success: res => {
          const clientHeight = res.windowHeight;
          const clientWidth = res.windowWidth;
          const rpxR = 750 / clientWidth;
          let rate;
          if(clientHeight >= 936){
            rate = 0.7;
          }
          else if(clientHeight >= 724 && clientHeight < 936){
            rate = 0.8;
          }
          else{
            rate = 0.75;
          }
          this.globalData.height = clientHeight * rate * rpxR
          if(clientWidth < 375){
            this.globalData.orderNameWidth = 72
            this.globalData.orderTimeWidth = 60
          }
          else{
            this.globalData.orderNameWidth = 70
            this.globalData.orderTimeWidth = 60
          }
      }
  });

    wx.setStorageSync('token', "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZTliODUzZDhlOTE0YmJlYjI5NTVjMjNiNmIwZjVjZCIsInVzZXJOYW1lIjoicmVjZWl2ZXIiLCJpYXQiOjE2MTQwNjg2ODEsImV4cCI6MTYxNDA3NTg4MX0.XItfG036m8Un02uvU1TWF4XtCYpzeiBXKOI57xRY-Z0")
      
    //查看是否授权
    wx.getSetting({
      success: res =>  {
        if (res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
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
  },

  request: function(obj) {
    var token = wx.getStorageSync('token');
    obj.url = "http://localhost:8989" + obj.url;
    obj.method="POST"
    obj.header={
      "Authorization":"Bearer " + token
    };
    return wx.request(obj);
  },

  getQqMapSdk(){
    return qqmapsdk;
  },

  getUserInfo(){
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo
      }
    });
  },

  globalData: {
    userInfo: null,
    height: null,
    orderNameWidth:null,
    orderTimeWidth:null,
    location:{}
  }
})
