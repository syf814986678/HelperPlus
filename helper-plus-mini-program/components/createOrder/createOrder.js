// components/createOrder/createOrder.js
const app = getApp()
Component({
  lifetimes: {
    attached: function() {
      const date = new Date();
      var month = (date.getMonth()+1)+"";
      let day = date.getDate()+"";
      let hour = date.getHours()+"";
      let minute = date.getMinutes()+"";
      month = month.length == 1 ? ('0' + month) : month;
      day = day.length == 1 ? ('0' + day) : day;
      hour = hour.length == 1 ? ('0' + hour) : hour;
      minute = minute.length == 1 ? ('0' + minute) : minute;
      this.setData({
        contentHeight:app.globalData.contentHeight,
        startTime:date.getFullYear()+"" + '-' + month + '-' + day + ' ' + hour + ':' + minute,
        endTime:(date.getFullYear()+100)+"" + '-' + month + '-' + day + ' ' + hour + ':' + minute,
        'order.order_until_pick_time': date.getFullYear()+"" + '-' + month + '-' + day + ' ' + hour + ':' + minute,
        'order.order_until_finish_time': date.getFullYear()+"" + '-' + month + '-' + day + ' ' + hour + ':' + minute,
      })
         
    }
      
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    max: 100, //最多字数 (根据自己需求改变) 
    max2:20,
    contentHeight:null,
    order: {
      order_initiator_latitude:null,
      order_initiator_longitude:null,
      order_initiator_address: "",
      order_initiator_city: "",
      order_initiator_userName:"",
      order_initiator_telNumber: null,
      order_until_pick_time:"",
      order_until_finish_time:"",
      order_content:"",
      order_limit_location:"",
      order_pickup_address:"",
      order_pickup_code:"",
      order_value:"",
      order_pay:""
    },
    currentWordNumber:0,
    startTime:'1900-00-00 00:00',
    endTime:'2500-12-30 23:59',

  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseAddress(){
      wx.showLoading({
        title: '获取信息中',
        mask: true,
      });
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        isHighAccuracy:true,
        success: res => {
          this.setData({
            'order.order_initiator_latitude':res.latitude,
            'order.order_initiator_longitude':res.longitude
          });
          
          // app.globalData.location.latitude = this.data.location.latitude
          // app.globalData.location.longitude = this.data.location.longitude  
        },
       });         
      wx.chooseAddress({
        success:res => {
          this.setData({
            'order.order_initiator_address': res.provinceName + res.cityName + res.countyName + res.detailInfo, 
            'order.order_initiator_userName': res.userName, 
            'order.order_initiator_telNumber': res.telNumber, 
            'order.order_initiator_city': res.cityName, 
          });
        },
      });
      wx.hideLoading()
    },

    openMap(){
      wx.showLoading({
        title: '获取信息中',
        mask: true,
      });
      wx.chooseLocation({
        latitude: this.data.order.order_initiator_latitude,
        longitude: this.data.order.order_initiator_longitude,
        success: res => {
          this.setData({
            'order.order_pickup_address': res.name + "(" + res.address + ")",
          })
        },
      })
      wx.hideLoading();
    },

    getPhoneNumber (e) {
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      this.setData({
        'order.order_initiator_telNumber':13818397399
      })
      console.log(e.detail.encryptedData)
    },

    bindTimeChange(e){
      console.log(e)
    },

    codeInputs: function (e) {
      this.setData({
        'order.order_pickup_code': e.detail.value
      }) 
    },

    valueInputs: function (e) {
      this.setData({
        'order.order_value': e.detail.value
      }) 
    },

    payInputs: function (e) {
      this.setData({
        'order.order_pay': e.detail.value
      }) 
    },

    contentInputs: function (e) {
      // 获取输入框的内容
      var value = e.detail.value;
      // 获取输入框内容的长度
      var len = parseInt(value.length);
      this.setData({
        'order.order_content': e.detail.value,
        currentWordNumber: len //当前字数  
      }) 
    },

    createOrder(){
      var that = this
      console.log(this.data.order);
      setTimeout(function (){
        that.clear()
      },1000);
      setTimeout(function (){
        console.log(that.data.order);
      },2000);
    },

    clear(){
      this.setData({
        'order.order_initiator_latitude':null,
        'order.order_initiator_longitude':null,
        'order.order_initiator_address': "",
        'order.order_initiator_city': "",
        'order.order_initiator_userName':"",
        'order.order_initiator_telNumber': null,
        'order.order_until_pick_time':"",
        'order.order_until_finish_time':"",
        'order.order_content':"",
        'order.order_limit_location':"",
        'order.order_pickup_address':"",
        'order.order_pickup_code':"",
        'order.order_value':"",
        'order.order_pay':""
      }) 
    },

    changeDate1(e){
      this.setData({
        'order.order_until_pick_time': e.detail.value
      })
    },

    cancelDate1(e){
      console.log(e)
    },

    changeDate2(e){
      this.setData({
        'order.order_until_finish_time': e.detail.value
      })
    },
    
    cancelDate2(e){
      console.log(e)
    }


  }
    
})
