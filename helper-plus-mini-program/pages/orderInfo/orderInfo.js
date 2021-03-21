let app = getApp()
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
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      isHighAccuracy:true,
      success: res => {
        this.setData({
          'location.lat' : res.latitude,
          'location.lng' : res.longitude
        })
      }
    });
    this.getOrder(options.orderId)    
  },

  openMap(){
    wx.showLoading({
      title: '获取位置中',
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
        wx.showLoading({
          title: '错误1',
          mask: true,
        })
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
    wx.showLoading({
      title: '获取任务信息中',
      mask: true,
    });
    app.request({
      url:'/admin/selectOrders',
      data:{
        orderId: orderId,
      },
      success: res =>{
        const data = app.checkCodeStatus(res.data)
          if(data !== undefined){
            wx.hideLoading()
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
              this.creatPolygons()
              this.openMap()
            }
          }
      },
      fail: res =>{
        wx.hideLoading()
        wx.showToast({
          title: '失败',
          duration:2000
        })
      },
      
    })
  },

  takeOrder(e){
    if(e.currentTarget.dataset.orderlimitlocationstring !== ""){
      if(!app.tapHandle(this.data.location,JSON.parse(e.currentTarget.dataset.orderlimitlocationstring))){
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
    wx.showLoading({
      title: '接取任务中...',
      mask:'trus'
    });
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
      
    })
  },


})