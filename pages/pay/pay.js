
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    //获取缓存中的收获地址
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    //过滤后的购物车数组
    cart = cart.filter(v => v.checked);
    this.setData({ address });

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item => {
      totalPrice += item.num * item.goods_price;
      totalNum += item.num;
    });

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  handleOrderPay() {
    //判断缓存中有没有token
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
      return
    }
    console.log("已经存在token")
  }
})