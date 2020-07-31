
Page({
  data: {
    userInfo: {}
  },
  onShow: function () {
    const userInfo = wx.getStorageSync('userinfo');
    this.setData({ userInfo })
  },
})