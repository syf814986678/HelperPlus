Component({
 
  lifetimes: {
    attached: function() {
      console.log("mine-attached")
      this.setData({
        userInfo:wx.getStorageSync('userInfo')
      })
      // wx.showLoading({
      //   title: '获取用户信息中',
      //   mask: true,
      // });
      // wx.getUserInfo({
      //   success: res => {
          // this.setData({
          //   userInfo:res.userInfo
          // })
      //     wx.hideLoading()
      //   }
      // });
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      console.log("mine-detached")
    },
  },
  data: {
    userInfo: {},
  },
  methods: {
    toCertificate(){
      wx.navigateTo({
        url: '/pages/certificate/certificate',
      })
    },
    toRelease(){
      wx.navigateTo({
        url: '/pages/myReleaseOrder/myReleaseOrder',
      })
    },
    toReceive(){
      wx.navigateTo({
        url: '/pages/myReceiveOrder/myReceiveOrder',
      })
    }
  }
})
