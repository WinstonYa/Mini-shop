import { request } from "../../request/index"
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  //接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalPages: 1,
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  //获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: '/goods/search', data: this.QueryParams });
    const total = res.data.message.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      //拼接的数组
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    })

    //关闭下拉刷新窗口,如果没有调用下拉刷新的窗口，直接关闭不会报错
    wx.stopPullDownRefresh();
  },
  //标题点击事件，从子组件传递过来
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((d, i) => i === index ? d.isActive = true : d.isActive = false);
    this.setData({ tabs })
  },
  //页面上滑，滚动条触底事件
  onReachBottom() {
    //判断还有没有下一页
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据'
      })
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh() {
    //重置数组
    this.setData({ goodsList: [] })
    //重置页码
    this.QueryParams.pagenum = 1;
    //发请求
    this.getGoodsList();
  }
})