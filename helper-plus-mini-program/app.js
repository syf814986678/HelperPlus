// app.js
// 引入SDK核心类
var QQMapWX = require('./utils/qqmap-wx-jssdk')
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'IXWBZ-JCTK2-P5SU7-CBL3S-WJY2K-MHB62' // 必填
})
App({
  onLaunch() {

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

    // wx.setStorageSync('token', "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJhZTliODUzZDhlOTE0YmJlYjI5NTVjMjNiNmIwZjVjZCIsInVzZXJOYW1lIjoicmVjZWl2ZXIiLCJpYXQiOjE2MTQwNjg2ODEsImV4cCI6MTYxNDA3NTg4MX0.XItfG036m8Un02uvU1TWF4XtCYpzeiBXKOI57xRY-Z0")
      
    //查看是否授权
    
  },
  

  request: function(obj) {
    var token = wx.getStorageSync('token');
    obj.url = "http://localhost:8989" + obj.url;
    if(token){
      obj.header={
        "Authorization":"Bearer " + token,
      };
    };
    obj.method="POST";
    return wx.request(obj);
  },

  getQqMapSdk(){
    return qqmapsdk;
  },

  checkCodeStatus(res){
    switch(res.codeState)
    {
        case 200:
          return res.data;
        case 201:
          wx.showToast({
            title: '操作失败',
            icon: 'error',
            duration: 2000
          });
          break;
        case 202:
          wx.showToast({
            title: '警告',
            icon: 'error',
            duration: 2000
          });
          break;
        case 301:
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showToast({
            title: '登陆失败',
            icon: 'error',
            duration: 2000
          });
          break;
        case 302:
          // if(getCurrentPages()[0].route !== 'pages/login/login'){
          //   console.log("进入")
          //   wx.redirectTo({
          //     url: '/pages/login/login'
          //   });
          // }
          // wx.showToast({
          //   title: '首次进入，请授权登录',
          //   icon: 'error',
          //   duration: 2000
          // });
          return 302;
        case 701:
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showToast({
            title: 'token错误',
            icon: 'error',
            duration: 2000
          });
          break;
        case 702:
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showToast({
            title: 'token过期',
            icon: 'error',
            duration: 2000
          });
          break;
        case 999:
          wx.showToast({
            title: '出现异常',
            icon: 'error',
            duration: 2000
          });
          break;
        default:
            break;
    }
  },
  globalData: {
    userInfo: null,
    height: null,
    orderNameWidth:null,
    orderTimeWidth:null,
    location:{}
  }
})
