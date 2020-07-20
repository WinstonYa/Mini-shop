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
    ]
  },
  //接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
  },
  //获取商品列表数据
  getGoodsList(){

  },
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((d, i) => i === index ? d.isActive = true : d.isActive = false);
    this.setData({ tabs })
  }
})