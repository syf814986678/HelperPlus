let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameIsNull:false,
    idIsNull:false,
    marginIsNull:false,
    idNull:"",

    userMargin:"",
    userRealName:"",
    userIdentification:"",
    userTelPhone:"",
    authenticationStatus:null,

  },

  id:function(e){
    var code = e.detail.value
    //身份证号合法性验证 
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
      var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
      var tip = "";
      var pass = true;
      var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
      if (!code || !code.match(reg)) {
          tip = "身份证号格式错误";
          pass = false;
        }else if (!city[code.substr(0, 2)]) {
          tip = "地址编码错误";
          pass = false;
        }else {
          //18位身份证需要验证最后一位校验位
          if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
              ai = code[i];
              wi = factor[i];
              sum += ai * wi;
            }
            if (parity[sum % 11] != code[17]) {
              tip = "校验位错误";
              pass = false;
            }
          }
        }
      if (pass) { 
        this.setData({
          idIsNull:false,
          userIdentification:e.detail.value
        })
      } 
      if (!pass) {
        this.setData({
          idIsNull:true,
          idNull:tip
        })
      }
  },

  name:function(e){
    var name = e.detail.value
    var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,6}$/;
    
    if(name.match(reg)){
      this.setData({
        nameIsNull:false,
        userRealName:e.detail.value
      })
    }
    else{
      this.setData({
        nameIsNull:true
      })
      
    }
  },

  margin:function(e){
    var margin = e.detail.value
  
    if(margin === "" || margin === 0){
      this.setData({
        marginIsNull:true
      })
    }
    else{
      this.setData({
        marginIsNull:false,
        userMargin:margin
      })
    }
  },

  bindGetUserPhone(e) {
      if(e.detail.errMsg === "getPhoneNumber:fail user deny"){
        return;
      }
      if(this.data.userRealName === ""){
        this.setData({
          nameIsNull:true
        })
        return
      };
      if(this.data.userIdentification === ""){
        this.setData({
          idIsNull:true,
          idNull:"身份证号码为空"
        })
        return
      };
      if(this.data.userMargin === ""){
        this.setData({
          marginIsNull:true
        })
        return
      };
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
              userTelPhone:data
            })
            wx.hideLoading()
            this.certificate()
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
      },"获取用户电话号码中")
  },

  certificate(){
    app.request({
      url:"/admin/certificate",
      data: { 
        userMargin: this.data.userMargin,
        userRealName: this.data.userRealName,
        userIdentification: this.data.userIdentification,
        userTelPhone: this.data.userTelPhone,
      },
      success: res => {
        const data = app.checkCodeStatus(res.data)
        if(data !== undefined){
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '实名认证认证成功',
            showCancel: false,
            confirmText: '返回',
            confirmColor: '#3CC51F',
            success: function(res) {
              wx.navigateBack()
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
    },"提交实名认证中")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAuthentication()
  },

  getAuthentication(){
    app.request({
      url:'/admin/getAuthentication',
      data:{},
      success: res =>{
        const data = app.checkCodeStatus(res.data)
          if(data !== undefined){
            if(data.userAuthenticationStatus === true){
              this.setData({
                userMargin:data.userMargin,
                userRealName:data.userRealName,
                userIdentification:data.userIdentification,
                userTelPhone:data.userPhone,
                authenticationStatus:data.userAuthenticationStatus
              });
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
    },"获取用户信息中")
  },

})