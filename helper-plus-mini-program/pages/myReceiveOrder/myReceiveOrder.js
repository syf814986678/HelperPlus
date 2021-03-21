const app = getApp()
Page({
 
  data: {
    releaseHeight: null,
    orderNameWidth: null,
    orderTimeWidth: null, 
    triggered: false,
    freshing: false,
    orderList:[]
  },


  onLoad: function (options) {
    this.setData({
      releaseHeight: app.globalData.releaseHeight - 40,
      orderNameWidth: app.globalData.orderNameWidth,
      orderTimeWidth: app.globalData.orderTimeWidth
    });
    this.getOrderList(null);
  },

  getOrderList(mode){
    wx.showLoading({
      title: '获取可用任务中',
      mask: true,
    });
    app.request({
      url:'/admin/selectOrders',
      data:{
        includeReceiver: 0, 
        includeOrderStatus: 0,
        orderStatus:'2,3,7'
      },
      success: res =>{
        const data = app.checkCodeStatus(res.data)
          if(data !== undefined){
            wx.hideLoading()
            this.setData({
              orderList:data
            });
          }
      },
      fail: res =>{
        wx.hideLoading()
        wx.showToast({
          title: '失败',
          duration:2000
        })
      },
      complete:()=>{     
        if(mode !== null){
          this.setData({
            triggered: false,
            freshing: false
          })
        }
      }
    })
  },
  
  toOrderInfo(e){
    wx.navigateTo({
      url: '/pages/orderInfo/orderInfo?orderId='+e.currentTarget.dataset.orderid + '&mode=release',
    })
  },

  onRefresh() {
    if (this.data.freshing) return
    console.log("刷新")
    this.setData({
      freshing: true
    })
    this.getOrderList(1234)
  },

  finishOrder(e){
    wx.showLoading({
      title: '完成任务中',
      mask:'true'
    })
    app.request({
      url:"/admin/finishOrder/" + e.currentTarget.dataset.orderid,
      success: res => {
        const data = app.checkCodeStatus(res.data)
        if(data !== undefined){
          wx.hideLoading()
          let overTime = null;
          if(data !== "overTime"){
            overTime = 3;
            wx.showToast({
              title: '任务已完成',
            })
          }else{
            overTime = 7;
          }
          this.setData({
            orderList:app.changeShuZu(e.currentTarget.dataset.orderid,this.data.orderList,overTime)
          })
        }
      },
      fail: res =>{
        wx.hideLoading()
        wx.showToast({
          title: '错误',
          duration:1500
        })
      }
    })
  },
  
})