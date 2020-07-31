
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ],
    //被选中的图片路径数组
    chooseImgs: [],
    //文本域的内容
    textVal: ''
  },
  //外网的图片路径数组
  UpLoadImgs: [],
  handleTabsItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((d, i) => i === index ? d.isActive = true : d.isActive = false);
    this.setData({ tabs })
  },
  //点击加号选择图片事件
  handleChooseImg() {
    // 调用小程序内部选择图片的api
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        //图片数组进行拼接
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths]
        })
      }
    })
  },
  //点击自定义图片组件
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset;
    let { chooseImgs } = this.data;
    chooseImgs.splice(index, 1);
    this.setData({ chooseImgs })
  },
  //文本域的输入事件
  handleTextInput(e) {
    console.log(e)
    this.setData({ textVal: e.detail.value })
  },
  //点击提交
  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return
    }

    wx.showLoading({
      title: "正在上传中",
      mask: true
    });

    //判断有没有需要上传的图片数组
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          filePath: v,
          name: "file",
          formData: {},
          success: (res) => {
            let url = JSON.parse(res.data).url;
            this.UpLoadImgs.push(url);

            //所有图片都上传完毕才触发
            if (i === chooseImgs.length - 1) {
              wx.hideLoading();

              console.log("把文本内容和外网的图片数组 提交到后台");
              this.setData({
                textVal: "",
                chooseImgs: []
              });
              wx.navigateBack({
                delta: 1
              });
            }
          }
        })
      })
    } else {
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
      console.log("只是提交了文本");
    }
  }
})