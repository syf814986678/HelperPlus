const app = getApp()
Page({

  data: {
    orderList:[],
    releaseHeight: null,
    orderNameWidth: null,
    orderTimeWidth: null, 
    triggered: false,
    freshing: false,
  },

  onLoad: function (options) {
    this.setData({
      releaseHeight: app.globalData.releaseHeight - 40,
      orderNameWidth: app.globalData.orderNameWidth,
      orderTimeWidth: app.globalData.orderTimeWidth
    });
    this.getOrderList(null);
  },

  toOrderInfo(e){
    wx.navigateTo({
      url: '/pages/orderInfo/orderInfo?orderId='+e.currentTarget.dataset.orderid + '&mode=release',
    })
  },

  getOrderList(mode){
    wx.showLoading({
      title: '获取可用任务中',
      mask: true,
    });
    app.request({
      url:'/admin/selectOrders',
      data:{
        includeInitiator: 0,
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

  refresh(e){
    console.log(e)
  },

  onRefresh() {
    if (this.data.freshing) return
    console.log("刷新")
    this.setData({
      freshing: true
    })
    this.getOrderList(1234)

  },

  cancelOrder(e){
    wx.showLoading({
      title: '取消任务中',
      mask:'true'
    })
    app.request({
      url:"/admin/cancelOrder/" + e.currentTarget.dataset.orderid,
      success: res => {
        const data = app.checkCodeStatus(res.data)
        if(data !== undefined){
          wx.hideLoading()
          wx.showToast({
            title: '取消成功',
            duration:1500
          })
          this.setData({
            orderList:app.changeShuZu(e.currentTarget.dataset.orderid,this.data.orderList,5)
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