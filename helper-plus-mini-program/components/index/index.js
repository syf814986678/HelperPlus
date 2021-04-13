const app = getApp()

Component({ 

  lifetimes: {
    attached: function() {
      console.log("index-attached")
      this.setData({
        indexHeight: app.globalData.indexHeight,
        orderNameWidth: app.globalData.orderNameWidth,
        orderTimeWidth: app.globalData.orderTimeWidth,
        userInfo: wx.getStorageSync('userInfo')
      });
      if(this.data.who === ''){
        console.log("index-attached-执行")
        this.setData({
          who:'attached'
        })
        wx.showLoading({
          title: '获取用户位置中',
          mask: true,
        });
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          isHighAccuracy:true,
          success: res => {
            this.setData({
              'location.lat': res.latitude,
              'location.lng': res.longitude,
            })
            app.getQqMapSdk().reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude,
              },
              success: res2 => {//成功后的回调
                this.setData({
                  city:res2.result.address_component.city
                })
                wx.hideLoading()
                this.getOrderList(1234);
              },
              fail: res2=> {
                wx.hideLoading()
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
          fail:res=>{
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
          },
         });         
      }
    },

    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      console.log("index-detached")
    },
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      console.log("index-show")
      if(this.data.who !== 'attached'){
        console.log("index-show-执行")
        this.setData({
          who:'attached',
          toView:'o' + wx.getStorageSync('orderRow')
        })
        if(wx.getStorageSync('takeOrderId') !== ""){
          // this.setData({
          //   orderList:app.deleteShuZu(wx.getStorageSync('takeOrderId'),this.data.orderList),
          //   totalOrders:this.data.totalOrders-1
          // })
          wx.showLoading({
            title: '获取用户位置中',
            mask: true,
          });
          wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            isHighAccuracy:true,
            success: res => {
              this.setData({
                'location.lat': res.latitude,
                'location.lng': res.longitude,
              })
              app.getQqMapSdk().reverseGeocoder({
                location: {
                  latitude: res.latitude,
                  longitude: res.longitude,
                },
                success: res2 => {//成功后的回调
                  this.setData({
                    pageNow:1,
                    city:res2.result.address_component.city
                  })
                  wx.hideLoading()
                  this.getOrderList(1234);
                },
                fail: res2=> {
                  wx.hideLoading()
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
            fail:res=>{
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
            },
           });  
          wx.setStorageSync('takeOrderId',"")
        }
        
       
      }
    },
    hide: function () { 
      console.log("index-hide")
      this.setData({
        who:'',
      })
    },
  },

  data: {
    who:'',
    userInfo: {},
    canIUse: true,
    indexHeight: null,
    orderList: [],
    city:"",
    orderNameWidth: null,
    orderTimeWidth: null, 
    triggered: false,
    freshing: false,
    location:{
      lat: null,
      lng: null,
    },
    pageNow:1,
    pageSize:5,
    totalOrders:0,
    toView:'',
  },

  methods: {
    toOrderInfo(e){
      wx.setStorageSync('orderRow', e.currentTarget.dataset.orderid)
      wx.navigateTo({
        url: '/pages/orderInfo/orderInfo?orderId=' + e.currentTarget.dataset.orderid + '&mode=beforeReceive',
      })
    },

    getOrderList(mode){
      app.request({
        // includeInitiator: 1
        url:'/admin/selectOrders',
        data:{
          // includeInitiator: 0,
          includeOrderStatus: 0,
          orderStatus:'1',
          orderInitiatorCity:this.data.city,
          pageNow:this.data.pageNow,
          pageSize:this.data.pageSize,
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
            content: '网络错误',
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

  },

})
