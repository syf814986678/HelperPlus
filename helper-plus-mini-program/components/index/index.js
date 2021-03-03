// components/index/index.js
const app = getApp()
Component({
  lifetimes: {
    attached: function() {
      this.setData({
        height: app.globalData.height,
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
      wx.showLoading({
        title: '获取可用订单中',
        mask: true,
      });
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        isHighAccuracy:true,
        success: res => {
          // this.setData({
          //   'location.latitude':res.latitude,
          //   'location.longitude':res.longitude
          // });
          // app.globalData.location.latitude = this.data.location.latitude
          // app.globalData.location.longitude = this.data.location.longitude
          app.getQqMapSdk().reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
            },
            success: res2 => {//成功后的回调
              this.setData({
                city:res2.result.address_component.city
              })
              this.getOrderList();
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
    city:"",
    orderNameWidth: null,
    orderTimeWidth: null, 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    takeOrder(e){
      console.log(e.currentTarget.dataset.orderid)
    },
    getOrderList(){
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
