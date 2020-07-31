import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx";
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    //获取缓存中的收获地址
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setData({ address });
    this.setCart(cart);
  },
  //点击获取收货地址
  async handleChooseAddress(e) {
    try {
      //获取权限状态
      const res = await getSetting();
      const scopeAddress = res.authSetting['scope.address'];
      //判断权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //存入到缓存中
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },
  //商品的选中
  handleItemChange(e) {
    //获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let { cart } = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex(item => item.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  //设置购物车状态 重新计算 底部工具栏的数据
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item => {
      if (item.checked) {
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
      } else {
        allChecked = false
      }
    });
    //判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : '';
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync("cart", cart);
  },
  //商品全选功能
  handleItemAllCheck() {
    //获取data中的数据
    let { cart, allChecked } = this.data;
    //修改值
    allChecked = !allChecked;
    //循环修改cart数组中的商品选中状态
    cart.forEach(item => item.checked = allChecked);
    //把修改后的值，填充回data或者缓存中
    this.setCart(cart);
  },
  //商品数量编辑的功能
  async handleItemNumEdit(e) {
    //获取传过来的参数
    const { operation, id } = e.currentTarget.dataset;
    //获取购物车数组
    let { cart } = this.data;
    //找到需要修改的商品索引
    const index = cart.findIndex(v => v.goods_id === id);
    //判断是否执行删除
    if (cart[index].num === 1 && operation === -1) {
      //弹窗提示
      const res = await showModal({ content: '是否删除该商品？' });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      //进行修改
      cart[index].num += operation;
      //设置回缓存和data中
      this.setCart(cart);
    }
  },
  //点击结算的功能
  async handlePay() {
    //判断收获地址
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast({ title: "您还没有选择收货地址！" });
      return;
    }
    //判断用户有没有选购商品
    if (totalNum === 0) {
      await showToast({ title: "您还没有选购商品！" });
      return;
    }
    //跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }
})