let app = getApp()

Page({
  data: {
    selected: 0,
    color: "#000",
    selectedColor: "#0040ff",
    list: [
      {
        "pagePath": "components/index/index",
        "icon":"iconfont icon-shouye",
        "selectedIcon":"iconfont icon-shouye1",
        "text": "首页"
      }, 
      {
        "pagePath": "components/createOrder/createOrder",
        "icon":"iconfont icon-jia",
        "selectedIcon":"iconfont icon-icon_huabanfuben",
        "text": "发布订单"
      },
      {
        "pagePath": "components/test/test",
        "icon":"iconfont icon-geren",
        "selectedIcon":"iconfont icon-geren2",
        "text": "我的"
      }
    ]
  },
  changeTab: function (e) {
    console.log(e)
    let that = this;
    if (this.data.selected === e.currentTarget.dataset.index) {
      return false;
    } else {
      // console.log(e.currentTarget.dataset.index)
      that.setData({
        selected: e.currentTarget.dataset.index
      })
    }
  },
  onLoad: function () { 
    wx.hideHomeButton()
  },
  onShow:function(){
    wx.hideHomeButton()
  }
})