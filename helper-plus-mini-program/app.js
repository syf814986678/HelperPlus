// app.js
// 引入SDK核心类
var QQMapWX = require('./utils/qqmap-wx-jssdk')
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'IXWBZ-JCTK2-P5SU7-CBL3S-WJY2K-MHB62' // 必填
})
//引入计算多边形工具
import {
  isPointInPolygon
} from './utils/isPointInPolygon.js';

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
          
          if(clientHeight >= 960){
            rate = 0.7;
            rate2 = 0.8;
          }
          else if(clientHeight >= 603 && clientHeight < 960){
            rate = 0.82;
            rate2 = 0.88;
          }
          else{
            rate = 0.75;
            rate2 = 0.85;
          }
          this.globalData.indexHeight = clientHeight * rate * rpxR       
          this.globalData.createHeight = clientHeight * rate2 * rpxR
          this.globalData.releaseHeight = clientHeight;
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
    obj.url = "http://192.168.50.3:8989" + obj.url;
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
            icon: 'none',
            mask: true,
            duration: 2000
          });
          break;
        case 202:
          wx.showToast({
            title: res.msg,
            icon: 'success',
            mask: true,
            duration: 2000
          });
          return res.data;
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
            icon: 'none',
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
            icon: 'none',
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
            icon: 'none',
            mask: true,
            duration: 2000
          });
          break;
        case 999:
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: true,
            duration: 2000
          });
          break;
        default:
            break;
    }
  },

  tapHandle(location,points) {
    //模拟定位点是否在围栏内
    if (!points.length) {
      return wx.showToast({
        title: '当前没有设置围栏',
        icon: 'none',
        mask: true
      })
    }
    //true表示在围栏内反之围栏外
    return isPointInPolygon(location, points);
  },

  changeShuZu(orderId,orderList,orderStatus){
    var localOrderList = orderList
    for(var i = 0; i < localOrderList.length; i++){
      if(localOrderList[i].orderId === orderId){
        localOrderList[i].orderStatus = orderStatus
        return localOrderList;
      }
    }
  },

  globalData: {
    orderNameWidth:null,
    orderTimeWidth:null,



    indexHeight:null,
    createHeight:null,
    releaseHeight:null
  }
})
