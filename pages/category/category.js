import { request } from "../../request/index"

Page({
  data: {
    //左侧的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightContent: [],
    //点击左侧菜单
    currentIndex: 0,
    //滚动条距离顶部的距离
    scrollTop: 0
  },
  //接口返回的数据
  Cates: [],
  onLoad: function (options) {
    // 判断本地存储中有没有旧的数据，没有就发送新请求
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getCates();
    } else {
      //有旧数据 定义过期时间 
      if (Date.now() - Cates.time > 1000 * 10) {
        //重新发送
        this.getCates();
      } else {
        //使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(item => item.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({ leftMenuList, rightContent });
      }
    }
  },
  async getCates() {
    const res = await request({ url: "/categories" });
    this.Cates = res.data.message;
    //把接口的数据存入到本地储存中
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates });
    //构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(item => item.cat_name)
    //构造右侧的商品数据
    let rightContent = this.Cates[0].children
    this.setData({ leftMenuList, rightContent })
  },
  //左侧菜单的点击事件
  handleItemTap(e) {
    console.log(e)
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      //重新设置右侧内容scrool-view距离顶部的距离
      scrollTop: 0
    });
  }
})