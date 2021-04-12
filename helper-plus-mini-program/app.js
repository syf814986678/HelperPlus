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

  request: function(obj,msg) {
    var token = wx.getStorageSync('token');
    obj.url = "https://helper.noahsark1.vip:8081" + obj.url;
    if(token){
      obj.header={
        "Authorization":"Bearer " + token,
      };
    };
    obj.method="POST";
    if(msg !== undefined){
      wx.showLoading({
        title: msg,
        mask: true,
      });
    }
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
          wx.hideLoading()
          wx.showModal({
            title: '错误',
            content: res.msg,
            showCancel: false,
            confirmText: '确认',
            confirmColor: '#3CC51F',
            success: function(res) {
              return
            }
          });
          break;
        case 202:
          wx.hideLoading()
          wx.showModal({
            title: '错误',
            content: res.msg,
            showCancel: false,
            confirmText: '确认',
            confirmColor: '#3CC51F',
            success: function(res) {
              return
            }
          });
          return res.data;
        case 301:
          wx.hideLoading()
          wx.clearStorage();
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showModal({
            title: '错误',
            content: res.msg,
            showCancel: false,
            confirmText: '确认',
            confirmColor: '#3CC51F',
            success: function(res) {
              return
            }
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
          wx.hideLoading()
          wx.clearStorage();
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showModal({
            title: '错误',
            content: res.msg,
            showCancel: false,
            confirmText: '确认',
            confirmColor: '#3CC51F',
            success: function(res) {
              return
            }
          });
          break;
        case 702:
          wx.hideLoading()
          wx.clearStorage();
          if(getCurrentPages()[0].route !== 'pages/login/login'){
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }
          wx.showModal({
            title: '错误',
            content: res.msg,
            showCancel: false,
            confirmText: '确认',
            confirmColor: '#3CC51F',
            success: function(res) {
              return
            }
          });
          break;
        case 999:
          wx.hideLoading()
          wx.showModal({
            title: '错误',
            content: res.msg,
            showCancel: false,
            confirmText: '确认',
            confirmColor: '#3CC51F',
            success: function(res) {
              return
            }
          });
          break;
        default:
            break;
    }
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

  refresh(e,that){
    if(that.data.orderList.length >= that.data.totalOrders) return
    that.setData({
      pageNow:that.data.pageNow + 1
    })
    that.getOrderList(null)
  },

  onRefresh(that) {
    if (that.data.freshing) return
    that.setData({
      freshing: true,
      pageNow:1
    })
    that.getOrderList(1234)
  },

  globalData: {
    orderNameWidth:null,
    orderTimeWidth:null,



    indexHeight:null,
    createHeight:null,
    releaseHeight:null
  }
})
