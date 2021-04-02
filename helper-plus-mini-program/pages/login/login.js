// pages/login/login.js
let app = getApp()
Page({

  data: {
    canIUse:wx.getUserProfile ? true : false,
  },

  getUserProfile (e) {
    wx.getUserProfile({
      desc: '获取用户头像和昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        wx.setStorageSync('userInfo', res.userInfo)
        wx.authorize({
          scope: 'scope.userLocation',
          success: res=> {
            this.login();
          },
          fail: res => {
            wx.showModal({
              title: '提示', //提示的标题,
              content: '请在右上角设置中打开位置信息权限', //提示的内容,
              showCancel: true, //是否显示取消按钮,
              cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
              cancelColor: '#000000', //取消按钮的文字颜色,
              confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
              confirmColor: '#3CC51F', //确定按钮的文字颜色,
              success: res1 => {
                if (res1.confirm) {
                  wx.openSetting()
                }
                else if(res1.cancel){
                  wx.showToast({
                    title: '需要位置信息权限',
                    mask:'true',
                    icon: 'error',
                    duration: 1500,
                  })
                }              
              },
            });
          },
        })
      },
      fail: res => {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          confirmColor: '#3CC51F',
          success: function(res) {
            return
          }
        });
      }
    })
//     if (res.detail.userInfo !== undefined) {
//       //用户按了允许授权按钮
//       app.globalData.userInfo = res.detail.userInfo
      // wx.authorize({
      //   scope: 'scope.userLocation',
      //   success: res=> {
      //     this.login();
      //   },
      //   fail: res => {
      //     wx.showModal({
      //       title: '提示', //提示的标题,
      //       content: '请在右上角设置中打开位置信息权限', //提示的内容,
      //       showCancel: true, //是否显示取消按钮,
      //       cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
      //       cancelColor: '#000000', //取消按钮的文字颜色,
      //       confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
      //       confirmColor: '#3CC51F', //确定按钮的文字颜色,
      //       success: res1 => {
      //         if (res1.confirm) {
      //           wx.openSetting()
      //         }
      //         else if(res1.cancel){
      //           wx.showToast({
      //             title: '需要位置信息权限',
      //             mask:'true',
      //             icon: 'error',
      //             duration: 1500,
      //           })
      //         }              
      //       },
      //     });
      //   },
      // })
//     } 
//     else {
//       //用户按了拒绝按钮
//       wx.showModal({
//         title: '警告',
//         content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
//         showCancel: false,
//         confirmText: '返回授权',
//         success: function(res) {
//           // 用户没有授权成功，不需要改变 isHide 的值
//           if (res.confirm) {
//             console.log('用户点击了“返回授权”');
//           }
//         }
//       });
//     }
  },

  checkLogin(){
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');
    if (token) {
      wx.getSetting({
        success: res =>  {
          if (userInfo && res.authSetting['scope.userLocation']) {
            wx.redirectTo({
              url: '/pages/tab/tab'
            })
          } 
          else {
            //用户没有授权
            console.log("用户没有授权");
          }
        }
      });
    }
  },

  login(){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.request({
          url:"/login",
          data: {
            wxCode: res.code,
          },
          success: res => {
            const data = app.checkCodeStatus(res.data)
            if(data !== undefined){
              wx.setStorageSync('token', data.token)
              wx.hideLoading()
              wx.redirectTo({
                url: '/pages/tab/tab'
              })
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
          }
        },"登陆中,请稍等")
      }
    })
  },

  onShow: function () {
    this.checkLogin();
  },

})