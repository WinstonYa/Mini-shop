import { request } from "../../request/index";
import { login } from "../../utils/asyncWx";
Page({
  async handleGetUserInfo(e) {
    //获取用户信息
    const { encryptedData, rawData, iv, signatur } = e.detail;
    //获取小程序登录成功后的code
    const { code } = await login();
    const loginParams = { encryptedData, rawData, iv, signatur };
    //发送请求 获取用户的token值
    const res = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
    console.log(res)
  }
})