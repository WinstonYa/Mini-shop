//Promise形式setting
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => { }
    });

  })
}

//Promise形式chooseAddress
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => { }
    });

  })
}
//Promise形式 openSetting
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => { }
    });

  })
}
//Promise形式 showModal
export const showModal = ({ content }) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

//Promise形式 showToast
export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

//Promise形式 login
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}