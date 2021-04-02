const app = getApp()
Component({
  lifetimes: {
    attached: function() {
      console.log("createOrder-attached")
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
        createHeight:app.globalData.createHeight,
        startTime:date.getFullYear()+"" + '-' + month + '-' + day + ' ' + hour + ':' + minute,
        now:date.getFullYear()+"" + '-' + month + '-' + day + ' ' + hour + ':' + minute,
        endTime:(date.getFullYear()+100)+"" + '-' + month + '-' + day + ' ' + hour + ':' + minute,
        orderUntilFinishTime: date.getFullYear()+"" + '-' + month + '-' + day + ' ' + hour + ':' + minute,
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      console.log("createOrder-detached")
    },
      
  },
  data: {
    max: 100, //最多字数 (根据自己需求改变) 
    max2:20,
    createHeight:null,
    orderName:'',
    orderInitiatorLatitude:null,
    orderInitiatorLongitude:null,
    orderInitiatorAddress: "",
    orderInitiatorCity: "",
    orderInitiatorName:"",
    orderInitiatorPhone: null,
    orderUntilFinishTime:"",
    orderContent:"",
    orderLimitLocation:[],
    orderPickupAddress:"",
    orderPickupCode:"",
    orderValue:"",
    orderPay:"",
    currentWordNumber:0,
    startTime:'1900-00-00 00:00',
    endTime:'2500-12-30 23:59',
    now:'',
    valueLength:'50',
    payLength:'50',
    mapLatitude:null,
    mapLongitude:null,
    markers: [],
    polygons: [],
  },
  methods: {
    chooseAddress(){
      wx.showLoading({
        title: '获取用户位置中',
        mask: true,
      });         
      wx.chooseAddress({
        success:res => {
          this.setData({
            orderInitiatorAddress: res.provinceName + res.cityName + res.countyName + res.detailInfo, 
            orderInitiatorName: res.userName, 
            orderInitiatorPhone: res.telNumber, 
            orderInitiatorCity: res.cityName, 
          });
          app.getQqMapSdk().geocoder({
            address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
            success: res2 => {//成功后的回调
              this.setData({
                orderInitiatorLatitude:res2.result.location.lat,
                orderInitiatorLongitude:res2.result.location.lng,
              });
              wx.hideLoading()
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
        fail:res =>{
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
      
    },

    openMap(){
      wx.showLoading({
        title: '打开地图中',
        mask: true,
      });
      wx.chooseLocation({
        success: res => {
          if(res.name !== "" && res.address !== ""){
            this.setData({
              orderPickupAddress: res.name + "(" + res.address + ")",
              mapLatitude:res.latitude,
              mapLongitude:res.longitude,
            })
            app.getQqMapSdk().reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: res2 => {
                this.setData({
                  orderName:res2.result.address_component.district + "-" + res2.result.address_component.street + "(" + res2.result.address_reference.street._dir_desc + ")" + "-" + res2.result.address_component.street_number + "-" + res2.result.address_reference.landmark_l2.title + "-取货任务"
                });
                wx.hideLoading();
              },
              fail: res2 => {
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
          }
        },
        fail: res => {
          wx.hideLoading();
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
        complete: res =>{
          if(res.name === ""){
            wx.hideLoading()
          }
        }
      })
     
    },

    getPhoneNumber (e) {
      if(e.detail.errMsg === "getPhoneNumber:fail user deny"){
        return;
      }
      app.request({
        url:"/admin/getPhone",
        data: { 
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        },
        success: res => {
          const data = app.checkCodeStatus(res.data)
          if(data !== undefined){
            this.setData({
              orderInitiatorPhone:data
            })
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
      },"获取本机电话中")
    },

    codeInputs: function (e) {
      this.setData({
        orderPickupCode: e.detail.value
      }) 
    },

    valueInputs: function (e) {
      var length;
      switch(e.detail.value.length){
        case 0:length = 50;break;
        case 1:length = 4;break;
        case 2:length = 8;break;
        case 3:length = 11;break;
        case 4:length = 14;break;
        case 5:length = 17;break;
        case 6:length = 21;break;
      }
      this.setData({
        orderValue: e.detail.value,
        valueLength:length
      }) 
    },

    payInputs: function (e) {
      var length;
      switch(e.detail.value.length){
        case 0:length = 50;break;
        case 1:length = 4;break;
        case 2:length = 8;break;
        case 3:length = 11;break;
        case 4:length = 14;break;
      }
      this.setData({
        orderPay: e.detail.value,
        payLength:length
      }) 
    },

    contentInputs: function (e) {
      // 获取输入框的内容
      var value = e.detail.value;
      // 获取输入框内容的长度
      var len = parseInt(value.length);
      this.setData({
        orderContent: e.detail.value,
        currentWordNumber: len //当前字数  
      }) 
    },

    create(){
      var order = this.data;
      var limitString = "";
      if(order.orderLimitLocation.length > 0){
        limitString = JSON.stringify(order.orderLimitLocation)
      }
      app.request({
        url:"/admin/createOrder",
        data: { 
          orderName:order.orderName,
          orderInitiatorLatitude:order.orderInitiatorLatitude,
          orderInitiatorLongitude:order.orderInitiatorLongitude,
          orderInitiatorAddress: order.orderInitiatorAddress,
          orderInitiatorCity: order.orderInitiatorCity,
          orderInitiatorName:order.orderInitiatorName,
          orderInitiatorPhone: order.orderInitiatorPhone,
          orderUntilFinishTime:order.orderUntilFinishTime,
          orderContent:order.orderContent,
          orderLimitLocationString:limitString,
          orderPickupAddress:order.orderPickupAddress,
          orderPickupCode:order.orderPickupCode,
          orderValue:order.orderValue,
          orderPay:order.orderPay,
        },
        success: res => {
          const data = app.checkCodeStatus(res.data)
          if(data !== undefined){
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '任务创建成功',
              showCancel: false,
              confirmText: '查看任务',
              confirmColor: '#3CC51F',
              success: res => {
                this.clear()
                wx.navigateTo({
                  url: '/pages/myReleaseOrder/myReleaseOrder',
                })
              }
            });
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
      },"创建任务中")
    },

    createOrder(){
      var order = this.data;
      var date = new Date(Date.parse(order.orderUntilFinishTime.replace(/-/g,"/")));
      var curDate = new Date();
      var afterCurDate = new Date((curDate.getTime() + 60*60*1000))

      if(order.orderInitiatorAddress === ""){
        wx.showToast({
          title: '收货地址为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderPickupAddress === ""){
        wx.showToast({
          title: '取件地址为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderPickupCode === ""){
        wx.showToast({
          title: '取件码为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderInitiatorPhone === null){
        wx.showToast({
          title: '电话为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderValue === ""){
        wx.showToast({
          title: '预估价格为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderUntilFinishTime === ""){
        wx.showToast({
          title: '送达时间为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderPay === ""){
        wx.showToast({
          title: '酬金为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderInitiatorLatitude === null){
        wx.showToast({
          title: '位置坐标为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderInitiatorLongitude === null){
        wx.showToast({
          title: '位置坐标为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderInitiatorCity === ""){
        wx.showToast({
          title: '城市为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(order.orderInitiatorName === ""){
        wx.showToast({
          title: '收货人为空',
          icon: 'error',
          duration: 1500
        })
        return
      };
      if(date < curDate){
        wx.showModal({
          title: '提示',
          content: '预估送达时间小于当前时间',
          showCancel: false,
          confirmText: '返回设置',
          confirmColor: '#F08080',
          success: function(res) {
            return;
          }
        });
      }
      else if(date > curDate && date < afterCurDate){
        wx.showModal({
          title: '提示',
          content: '送达时间与当前时间间隔小于1小时,可能无人接取任务!',
          confirmText: '仍然发布',
          confirmColor: '#00FA9A',
          cancelText: '返回设置',
          cancelColor: '#F08080',
          success: res => {
            if (res.confirm) {
                if(order.orderLimitLocation.length === 0){
                  wx.showModal({
                    title: '提示',
                    content: '您没有设置接单范围，本市所有人都可接取您的任务!',
                    confirmText: '仍然发布',
                    confirmColor: '#00FA9A',
                    cancelText: '返回设置',
                    cancelColor: '#F08080',
                    success: res => {
                      if (res.confirm) {
                        this.create()
                      }
                      else if (res.cancel) {
                        return;
                      }
                    }
                  });
                }
                else{
                  this.create()
                }
            }
            else if (res.cancel) {
              return;
            }
          }
        });
      }
      else{
        if(order.orderLimitLocation.length === 0){
          wx.showModal({
            title: '提示',
            content: '您没有设置限制接取范围，本市所有人都可接取您的任务!',
            confirmText: '仍然发布',
            confirmColor: '#00FA9A',
            cancelText: '返回设置',
            cancelColor: '#F08080',
            success: res =>  {
              if (res.confirm) {
                this.create()
              }
              else if (res.cancel) {
                return;
              }
            }
          });
        }
        else{
          this.create()
        }
      }
    },

    clear(){
      this.setData({
        orderInitiatorLatitude:null,
        orderInitiatorLongitude:null,
        orderInitiatorAddress: "",
        orderInitiatorCity: "",
        orderInitiatorName:"",
        orderInitiatorPhone: null,
        orderUntilFinishTime:"",
        orderContent:"",
        orderLimitLocation:"",
        orderPickupAddress:"",
        orderPickupCode:"",
        orderValue:"",
        orderPay:"",
        mapLatitude:null,
        mapLongitude:null,
        markers: [],
        polygons: [],
        valueLength:'50',
        payLength:'50',
      }) 
    },

    changeDate2(e){
      this.setData({
        orderUntilFinishTime: e.detail.value + ":00" 
      })
    },
    
    cancelDate2(e){
      console.log(e)
    },

    creatPolygons() {
      //创建多边形围栏/服务范围
      if (this.data.markers.length < 3){
        return wx.showToast({
          title: '请先在地图上标记点,且不少于三个点',
          icon:'none'
        })
      }
      let polygons = this.data.polygons;
      let markers = this.data.markers;
      let newArray = [];
      let limitLocation =[];
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
        let obj2 = {
          lat: markers[j].latitude,
          lng: markers[j].longitude
        };
        newArray.push(obj);
        limitLocation.push(obj2);
      }
      polygons[0] = {};
      polygons[0].points = newArray;
      newArray = Object.assign(polygons[0], params);
      this.setData({
        "polygons[0]": newArray,
        orderLimitLocation:limitLocation
      })
    },

    bindtapMap(e) {
      //创建标记点
      let tapPoint = e.detail;
      let markers = this.data.markers
      let newContent = markers.length
      let markerItem = {
        callout: {
          content: ++newContent,
          padding: 5,
          borderRadius: 2,
          bgColor: '#ffffff',
          display: 'ALWAYS',
          zIndex: 2
        },
        id: newContent,
        latitude: tapPoint.latitude,
        longitude: tapPoint.longitude,
        iconPath: '../../style/point.png',
        width: '34px',
        height: '34px',
        rotate: 0,
        alpha: 1,
        zIndex: 3
      }
      markers.push(markerItem)
      this.setData({
        markers
      })
      if(markers.length > 2){
        this.creatPolygons()
      }
    },

    removeMarker(e) {
      //删除重复点击的标记点
      let markers = this.data.markers;
      markers.splice(e.markerId - 1, 1)
      //重置marker数组的id和content
      for (let j = 0; j < markers.length; j++) {
        markers[j].id = j + 1;
        markers[j].callout.content = j + 1;
      }
      if(markers.length < 3){
        this.setData({
          markers: markers,
          polygons: [],
          orderLimitLocation:[]
        })
      }
      else{
        this.setData({
          markers
        })
        this.creatPolygons()
      }
      
    },

  }
    
})
