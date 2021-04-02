const app = getApp()
Page({

  data: {
    orderList:[],
    releaseHeight: null,
    orderNameWidth: null,
    orderTimeWidth: null, 
    triggered: false,
    freshing: false,
    pageNow:1,
    pageSize:4,
    totalOrders:0,
  },

  onLoad: function (options) {
    this.setData({
      releaseHeight: app.globalData.releaseHeight - 40,
      orderNameWidth: app.globalData.orderNameWidth,
      orderTimeWidth: app.globalData.orderTimeWidth
    });
    this.getOrderList(1234);
  },

  toOrderInfo(e){
    wx.navigateTo({
      url: '/pages/orderInfo/orderInfo?orderId='+e.currentTarget.dataset.orderid + '&mode=release',
    })
  },

  getOrderList(mode){
    app.request({
      url:'/admin/selectOrders',
      data:{
        includeInitiator: 0,
        pageNow:this.data.pageNow,
        pageSize:this.data.pageSize
      },
      success: res =>{
        const data = app.checkCodeStatus(res.data)
          if(data !== undefined){
            if(mode !== null){
              this.setData({
                orderList:data[1],
                totalOrders:data[0]
              }) 
            }
            else{
              this.setData({
                orderList:this.data.orderList.concat(data[1]),
                totalOrders:data[0]
              })
            }
            wx.hideLoading()
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
      complete:()=>{     
        if(mode !== null){
          this.setData({
            triggered: false,
            freshing: false
          })
        }
      }
    },"获取任务中")
  },

  refresh(e){
    return app.refresh(e,this)
  },

  onRefresh() {
    return app.onRefresh(this)
  },
  

  // refresh(e){
  //   if(this.data.orderList.length >= this.data.totalOrders) return
  //   this.setData({
  //     pageNow:this.data.pageNow + 1
  //   })
  //   this.getOrderList(null)
  // },

  // onRefresh() {
  //   if (this.data.freshing) return
  //   this.setData({
  //     freshing: true,
  //     pageNow:1
  //   })
  //   this.getOrderList(1234)
  // },

  cancelOrder(e){
    app.request({
      url:"/admin/cancelOrder/" + e.currentTarget.dataset.orderid,
      success: res => {
        const data = app.checkCodeStatus(res.data)
        if(data !== undefined){
          this.setData({
            orderList:app.changeShuZu(e.currentTarget.dataset.orderid,this.data.orderList,5)
          })
          wx.hideLoading()
          wx.showModal({
            title: '成功',
            content: '该任务已取消',
            showCancel: false,
            confirmText: '确认',
            confirmColor: '#3CC51F',
            success: function(res) {
              return
            }
          });
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
      }
    },"取消任务中")
  },
  
})