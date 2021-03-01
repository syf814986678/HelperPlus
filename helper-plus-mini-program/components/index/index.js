// components/index/index.js
const app = getApp()
Component({
  lifetimes: {
    attached: function() {
      wx.showLoading({
        title: '获取信息中'
      });
      this.setData({
        height: app.globalData.height,
        userInfo: app.globalData.userInfo,
        orderNameWidth: app.globalData.orderNameWidth,
        orderTimeWidth: app.globalData.orderTimeWidth,
        location:app.globalData.location
      });
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        isHighAccuracy:true,
        success: res => {
          this.setData({
            'location.latitude':res.latitude,
            'location.longitude':res.longitude,
          });
          this.openMap()
        },
        fail:res=>{
          wx.showLoading({
            title: '错误3',
          })
        }
       });
      wx.hideLoading()
      // this.getOrderList();
      
    }
      
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {},
    canIUse: true,
    height: null,
    orderList: [],
    location: {
      fullAddress: "",
      latitude:null,
      longitude:null,
      address:null,
      city:null
    },
    orderNameWidth: null,
    orderTimeWidth: null, 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    test(){
      wx.showToast({
        title: '触发成功', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    },
    openMap(){
      wx.chooseLocation({
        latitude: this.data.location.latitude,
        longitude: this.data.location.longitude,
        success: res => {
          this.setData({
            'location.fullAddress': res.name + "(" + res.address + ")",
            'location.latitude':res.latitude,
            'location.longitude':res.longitude,
            'location.address':res.address,
          })
          wx.hideLoading()
          app.getQqMapSdk().reverseGeocoder({
            location: {
              latitude: this.data.location.latitude,
              longitude: this.data.location.longitude,
            },
            success: res=> {//成功后的回调
              this.setData({
                'location.city':res.result.address_component.city
              })
            },
            fail: res=> {
              wx.showLoading({
                title: '错误1',
              })
            },
            complete: res=> {
              
            }
          })
          this.getOrderList();
        },
        fail: res =>  {
          wx.showLoading({
            title: '错误2',
          })
        },
        complete: res =>{
          if(this.data.location.address === null || this.data.location.address === '' || this.data.location.address === '()'){
            wx.showLoading({
              title: '请选择地址',
              duration:500
            })
            this.openMap()
          }
          else{
            app.globalData.location = this.data.location
            console.log(app.globalData.location)
          }
        }
      })
      
    },
    getOrderList(){
      wx.showLoading({
        title: '获取数据中'
      });
      const fakeOrderList = [
        {
          createGmt: "2021-01-29 10:43:42",
          isDeleted: 0,
          locationId: "fbd759f98d5b4f078165695ecf7e8c63",
          orderContent: "测试order123890807你打啥丢u奥丢阿松",
          orderId: "936fcc9077a74d6382963e07a0a086d1",
          orderInitiatorAddress: "上海市奉贤区海思路100号",
          orderInitiatorCity: "上海",
          orderInitiatorId: "91fc11cdc9904b82a54cf13f0f9a817b",
          orderInitiatorLocation: "120°33′33″",
          orderInitiatorName: "admin",
          orderInitiatorPhone: "13816768365",
          orderLimitLocation: "120°33′33″",
          orderName: "测试order12345646798798797979879",
          orderPay: 5,
          orderPickupAddress: "上海市奉贤区海思路100号",
          orderPickupCode: "12345",
          orderReceiverId: "ae9b853d8e914bbeb2955c23b6b0f5cd",
          orderReceiverName: "施一帆",
          orderReceiverPhone: "13818397399",
          orderStatus: 1,
          orderUntilFinishTime: "2021-01-21 18:00:00",
          orderUntilPickTime: "2021-01-21 17:00:00",
          orderValue: 1000,
          updateGmt: "2021-01-29 11:16:30",
        },
        {
          createGmt: "2021-01-29 10:43:42",
          isDeleted: 0,
          locationId: "fbd759f98d5b4f078165695ecf7e8c63",
          orderContent: "测试order123",
          orderId: "936fcc9077a74d6382963e07a0a086d2",
          orderInitiatorAddress: "上海市奉贤区海思路100号",
          orderInitiatorCity: "上海",
          orderInitiatorId: "91fc11cdc9904b82a54cf13f0f9a817b",
          orderInitiatorLocation: "120°33′33″",
          orderInitiatorName: "admin",
          orderInitiatorPhone: "13816768365",
          orderLimitLocation: "120°33′33″",
          orderName: "测试order123890807你打啥丢u奥丢阿松",
          orderPay: 5,
          orderPickupAddress: "上海市奉贤区海思路100号",
          orderPickupCode: "12345",
          orderReceiverId: "ae9b853d8e914bbeb2955c23b6b0f5cd",
          orderReceiverName: "施一帆",
          orderReceiverPhone: "13818397399",
          orderStatus: 1,
          orderUntilFinishTime: "2021-01-21 18:00:00",
          orderUntilPickTime: "2021-01-21 17:00:00",
          orderValue: 1000,
          updateGmt: "2021-01-29 11:16:30",
        },
        {
          createGmt: "2021-01-29 10:43:42",
          isDeleted: 0,
          locationId: "fbd759f98d5b4f078165695ecf7e8c63",
          orderContent: "测试order123",
          orderId: "936fcc9077a74d6382963e07a0a086d3",
          orderInitiatorAddress: "上海市奉贤区海思路100号",
          orderInitiatorCity: "上海",
          orderInitiatorId: "91fc11cdc9904b82a54cf13f0f9a817b",
          orderInitiatorLocation: "120°33′33″",
          orderInitiatorName: "admin",
          orderInitiatorPhone: "13816768365",
          orderLimitLocation: "120°33′33″",
          orderName: "测试order123",
          orderPay: 5,
          orderPickupAddress: "上海市奉贤区海思路100号",
          orderPickupCode: "12345",
          orderReceiverId: "ae9b853d8e914bbeb2955c23b6b0f5cd",
          orderReceiverName: "施一帆",
          orderReceiverPhone: "13818397399",
          orderStatus: 1,
          orderUntilFinishTime: "2021-01-21 18:00:00",
          orderUntilPickTime: "2021-01-21 17:00:00",
          orderValue: 1000,
          updateGmt: "2021-01-29 11:16:30",
        },
        {
          createGmt: "2021-01-29 10:43:42",
          isDeleted: 0,
          locationId: "fbd759f98d5b4f078165695ecf7e8c63",
          orderContent: "测试order123",
          orderId: "936fcc9077a74d6382963e07a0a086d4",
          orderInitiatorAddress: "上海市奉贤区海思路100号",
          orderInitiatorCity: "上海",
          orderInitiatorId: "91fc11cdc9904b82a54cf13f0f9a817b",
          orderInitiatorLocation: "120°33′33″",
          orderInitiatorName: "admin",
          orderInitiatorPhone: "13816768365",
          orderLimitLocation: "120°33′33″",
          orderName: "测试order123",
          orderPay: 5,
          orderPickupAddress: "上海市奉贤区海思路100号",
          orderPickupCode: "12345",
          orderReceiverId: "ae9b853d8e914bbeb2955c23b6b0f5cd",
          orderReceiverName: "施一帆",
          orderReceiverPhone: "13818397399",
          orderStatus: 1,
          orderUntilFinishTime: "2021-01-21 18:00:00",
          orderUntilPickTime: "2021-01-21 17:00:00",
          orderValue: 1000,
          updateGmt: "2021-01-29 11:16:30",
        },
        {
          createGmt: "2021-01-29 10:43:42",
          isDeleted: 0,
          locationId: "fbd759f98d5b4f078165695ecf7e8c63",
          orderContent: "测试order123",
          orderId: "936fcc9077a74d6382963e07a0a086d5",
          orderInitiatorAddress: "上海市奉贤区海思路100号",
          orderInitiatorCity: "上海",
          orderInitiatorId: "91fc11cdc9904b82a54cf13f0f9a817b",
          orderInitiatorLocation: "120°33′33″",
          orderInitiatorName: "admin",
          orderInitiatorPhone: "13816768365",
          orderLimitLocation: "120°33′33″",
          orderName: "测试order123",
          orderPay: 5,
          orderPickupAddress: "上海市奉贤区海思路100号",
          orderPickupCode: "12345",
          orderReceiverId: "ae9b853d8e914bbeb2955c23b6b0f5cd",
          orderReceiverName: "施一帆",
          orderReceiverPhone: "13818397399",
          orderStatus: 1,
          orderUntilFinishTime: "2021-01-21 18:00:00",
          orderUntilPickTime: "2021-01-21 17:00:00",
          orderValue: 1000,
          updateGmt: "2021-01-29 11:16:30",
        }
      ];
      this.setData({
        orderList:fakeOrderList
      });
      wx.hideLoading()
      // app.request({
      //   url:'/admin/selectOrders',
      //   data:"{}",
      //   success: res =>{
      //     console.log(res)
      //   },
      //   complete:()=>{     
      //     console.log("结束")
      //     wx.hideLoading()
      //   }
      // })
    },
    refresh(e){
      console.log(e)
    }
  },
})
