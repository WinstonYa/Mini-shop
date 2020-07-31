import { request } from "../../request/index";
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
  },
  onShow: function (options) {
    //获取当前小程序的页面栈 长度最大10页
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    const { type } = currentPage.options;
    this.changeTitleByIndex(type - 1);
    this.getOrders(type);
  },
  //获取订单列表的方法
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } });
    console.log(res)
  },
  //根据标题索引来激活选中标题数组
  changeTitleByIndex(index) {
    let { tabs } = this.data;
    tabs.forEach((d, i) => i === index ? d.isActive = true : d.isActive = false);
    this.setData({ tabs })
  },
  handleTabsItemChange(e) {
    const { index } = e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index + 1);
  }
})