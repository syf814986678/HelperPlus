const app = getApp()

Component({ 

  lifetimes: {
    attached: function() {
      console.log("index-attached")
      this.setData({
        indexHeight: app.globalData.indexHeight,
        orderNameWidth: app.globalData.orderNameWidth,
        orderTimeWidth: app.globalData.orderTimeWidth
      });
      wx.showLoading({
        title: '获取用户信息中',
        mask: true,
      });
      wx.getUserInfo({
        success: res => {
          this.setData({
            userInfo:res.userInfo
          })
          wx.hideLoading()
        }
      });
      if(this.data.who === ''){
        this.setData({
          who:'attached'
        })
        wx.showLoading({
          title: '获取可用任务中',
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
                this.getOrderList(null);
              },
              fail: res=> {
                wx.showLoading({
                  title: '错误1',
                  mask: true,
                })
              },
              complete: res3=> {
              }
            })      
          },
          fail:res=>{
            wx.showLoading({
              title: '错误3',
              mask: true,
            })
          },
          complete: res=> {
                
          }
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
        this.setData({
          who:'attached'
        })
        wx.showLoading({
          title: '获取可用任务中',
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
                this.getOrderList(null);
              },
              fail: res=> {
                wx.showLoading({
                  title: '错误1',
                  mask: true,
                })
              },
              complete: res3=> {
              }
            })      
          },
          fail:res=>{
            wx.showLoading({
              title: '错误3',
              mask: true,
            })
          },
          complete: res=> {
                
          }
         });         
      }
    },
    hide: function () { 
      console.log("index-hide")
      this.setData({
        who:''
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
    }
    
  },

  methods: {
    toOrderInfo(e){
      wx.navigateTo({
        url: '/pages/orderInfo/orderInfo?orderId='+e.currentTarget.dataset.orderid + '&mode=beforeReceive',
      })
    },

    getOrderList(mode){
      wx.showLoading({
        title: '获取可用任务中',
        mask: true,
      });
      app.request({
        // includeInitiator: 1
        url:'/admin/selectOrders',
        data:{
          includeInitiator: 0,
          includeOrderStatus: 0,
          orderStatus:'1',
          orderInitiatorCity:this.data.city
        },
        success: res =>{
          const data = app.checkCodeStatus(res.data)
            if(data !== undefined){
              this.setData({
                orderList:data
              });
              wx.hideLoading()
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
      this.setData({
        freshing: true
      })
      this.getOrderList(1234)

    },

  },

})
