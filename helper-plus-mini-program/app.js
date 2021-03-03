// app.js
// 引入SDK核心类
var QQMapWX = require('./utils/qqmap-wx-jssdk')
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'IXWBZ-JCTK2-P5SU7-CBL3S-WJY2K-MHB62' // 必填
})
App({
  onLaunch() {

    // wx.clearStorage({
    //   success: (res) => {},
    // })

    wx.getSystemInfo({
      success: res => {
          const clientHeight = res.windowHeight;
          const clientWidth = res.windowWidth;
          const rpxR = 750 / clientWidth;
          let rate,rate2;
          this.globalData.clientHeight = clientHeight;
          if(clientHeight >= 936){
            rate = 0.7;
            rate2 = 0.8;
          }
          else if(clientHeight >= 724 && clientHeight < 936){
            rate = 0.78;
            rate2 = 0.88;
          }
          else{
            rate = 0.75;
            rate2 = 0.85;
          }
          this.globalData.height = clientHeight * rate * rpxR
          this.globalData.contentHeight = clientHeight * rate2 * rpxR
          if(clientWidth < 375){
            this.globalData.orderNameWidth = 60
            this.globalData.orderTimeWidth = 50
          }
          else{
            this.globalData.orderNameWidth = 65
            this.globalData.orderTimeWidth = 55
          }
      }
    });
   
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
    console.log(res)
    switch(res.codeState)
    {
        case 200:
          return res.data;
        case 201:
          wx.showToast({
            title: res.msg,
            icon: 'error',
            mask: true,
            duration: 2000
          });
          break;
        case 202:
          wx.showToast({
            title: res.msg,
            icon: 'error',
            mask: true,
            duration: 2000
          });
          break;
        case 301:
          wx.clearStorage();
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: true,
            duration: 2000
          });
          break;
        case 302:
          wx.clearStorage();
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showToast({
            title: '首次进入，请授权登录',
            icon: 'error',
            mask: true,
            duration: 2000
          });
        case 701:
          wx.clearStorage();
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showToast({
            title: res.msg,
            icon: 'error',
            duration: 2000
          });
          break;
        case 702:
          wx.clearStorage();
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showToast({
            title: res.msg,
            icon: 'error',
            mask: true,
            duration: 2000
          });
          break;
        case 999:
          wx.showToast({
            title: res.msg,
            icon: 'error',
            mask: true,
            duration: 2000
          });
          break;
        default:
            break;
    }
  },

  globalData: {
    height: null,
    orderNameWidth:null,
    orderTimeWidth:null,
    contentHeight:null,
  }
})
