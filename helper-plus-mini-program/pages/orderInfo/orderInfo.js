let app = getApp()
//引入计算多边形工具
import {
  isPointInPolygon
} from '../../utils/isPointInPolygon.js';
Page({

  data: {
    order:{},
    mapLatitude:null,
    mapLongitude:null,
    markers: [],
    polygons: [],
    location:{
      lat:null,
      lng:null
    },
    //release beforeReceive received
    mode:'beforeReceive',
    createHeight:null,
    showButton:'hide'

  },

  onLoad: function (options) {
    this.setData({
      mode:options.mode,
      createHeight:app.globalData.createHeight,
    })
    wx.showLoading({
      title: '获取用户位置中',
      mask: true,
    });
    wx.getLocation({
      type: 'gcj02', 
      isHighAccuracy:true,
      success: res => {
        this.setData({
          'location.lat' : res.latitude,
          'location.lng' : res.longitude
        })
        wx.hideLoading()
        this.getOrder(options.orderId)    
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          title: '错误',
          content: '获取用户位置错误',
          showCancel: false,
          confirmText: '确认',
          confirmColor: '#3CC51F',
          success: function(res) {
            return
          }
        });
      }
    });
  },

  openMap(){
    wx.showLoading({
      title: '打开地图中',
      mask: true,
    });
    app.getQqMapSdk().geocoder({
      address: this.data.order.orderPickupAddress,
      success: res => {//成功后的回调
        this.setData({
          mapLatitude:res.result.location.lat,
          mapLongitude:res.result.location.lng,
          showButton: 'show',
        });
        wx.hideLoading();
      },
      fail: res=> {
        wx.hideLoading();
        wx.showModal({
          title: '错误',
          content: '用户地址解析错误',
          showCancel: false,
          confirmText: '确认',
          confirmColor: '#3CC51F',
          success: function(res) {
            return
          }
        });
      },
    })
    
  },

  creatPolygons() {
    let polygons = this.data.polygons;
    let markers = this.data.markers;
    let newArray = [];
    let params = {
      fillColor: "#1791fc66",
      strokeColor: "#FFF",
      strokeWidth: 2,
      zIndex: 3
    }
    for (let j = 0; j < markers.length; j++) {
      let obj = {
        latitude: markers[j].latitude,
        longitude: markers[j].longitude
      };
      newArray.push(obj);
    }
    polygons[0] = {};
    polygons[0].points = newArray;
    newArray = Object.assign(polygons[0], params);
    this.setData({
      "polygons[0]": newArray,
    })
  },

  getOrder(orderId){
    app.request({
      url:'/admin/selectOrders',
      data:{
        orderId: orderId,
      },
      success: res =>{
        const data = app.checkCodeStatus(res.data)
          if(data !== undefined){
            this.setData({
              order:data[0]
            })
            if(this.data.order !== undefined && this.data.order.orderLimitLocationString !== ""){
              var mapMarks = JSON.parse(this.data.order.orderLimitLocationString)
              var mapMark2 = []
              for(var i = 0; i < mapMarks.length; i++){
                var j = i;
                let markerItem = {
                  callout: {
                    content: ++j,
                    padding: 5,
                    borderRadius: 2,
                    bgColor: '#ffffff',
                    display: 'ALWAYS',
                    zIndex: 2
                  },
                  id: j,
                  latitude: mapMarks[i].lat,
                  longitude: mapMarks[i].lng,
                  iconPath: '../../style/point.png',
                  width: '34px',
                  height: '34px',
                  rotate: 0,
                  alpha: 1,
                  zIndex: 3
                }
                mapMark2.push(markerItem);
              }
              this.setData({
                markers:mapMark2
              })
              wx.hideLoading()
              this.creatPolygons()
              this.openMap()
            }
            else{
              wx.hideLoading()
              this.setData({
                showButton: 'show',
              });
            }
          }
      },
      fail: res =>{
        wx.hideLoading()
        wx.showModal({
          title: '错误',
          content: '请求发出错误',
          showCancel: false,
          confirmText: '确认',
          confirmColor: '#3CC51F',
          success: function(res) {
            return
          }
        });
      },
      
    },"获取任务信息中")
  },

  takeOrder(e){
    if(e.currentTarget.dataset.orderlimitlocationstring !== ""){
      if(!isPointInPolygon(this.data.location,JSON.parse(e.currentTarget.dataset.orderlimitlocationstring))){
        wx.showModal({
          title: '提示',
          content: '您不处于接取任务范围，请试试其他任务！',
          showCancel: false,
          confirmText: '返回',
          confirmColor: '#F08080',
          success: function(res) {
            return;
          }
        });
      }
      else{
        this.takeOrderReuqest(e.currentTarget.dataset.orderid)
      }
    }
    else{
      this.takeOrderReuqest(e.currentTarget.dataset.orderid)
    }
  },

  takeOrderReuqest(orderId){
    app.request({
      url:"/admin/receiveOrder/" + orderId,
      success: res => {
        const data = app.checkCodeStatus(res.data)
        if(data !== undefined){
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '接取任务成功！',
            showCancel: false,
            confirmText: '返回首页',
            confirmColor: '#3CC51F',
            success: function(res) {
              wx.navigateBack()
            }
          });
        }
      },
      fail: res =>{
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon:'error',
          mask: true,
          duration: 2000
        })
      },
      
    },"接取任务中")
  },

})