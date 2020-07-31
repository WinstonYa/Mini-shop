import { request } from "../../request/index";
Page({
  data: {
    goods: [],
    //取消按钮是否显示
    isFocus: false,
    //输入框的值
    inputValue: ''
  },
  TimeId: -1,
  onLoad: function (options) {

  },
  handleInput(e) {
    //获取输入框的值
    const { value } = e.detail;
    //输入框防抖
    clearTimeout(this.TimeId);
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return;
    }
    this.setData({ isFocus: true });
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000)
  },
  //发送请求获取数据
  async qsearch(query) {
    const res = await request({ url: "/goods/qsearch", data: { query } })
    console.log(res)
    this.setData({ goods: res.data.message })
  },
  //点击按钮清楚
  handleCancel() {
    this.setData({ inputValue: '', isFocus: false, goods: [] })
  }
})