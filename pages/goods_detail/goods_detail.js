import { request } from "../../request/index";
Page({
  data: {
    goodsObj: {}
  },
  //商品对象
  GoodsInfo: {},
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id) {
    const res = await request({ url: '/goods/detail', data: { goods_id } });
    const goodsObj = res.data.message;
    this.GoodsInfo = goodsObj;
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        //iphone部分手机不识别webp图片格式
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      }
    })
  },
  //点击轮播图，放大预览
  handlePrevewImage(e) {
    console.log(this.GoodsInfo)
    const urls = this.GoodsInfo.pics.map(item => item.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({ current, urls })
  },
  //点击加入购物车
  handleAddCart() {
    // 获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    // 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(item => item.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      // 不存在数据，第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 1500,
      mask: true
    })
  }
})