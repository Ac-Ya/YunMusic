// pages/login/login.js
import {loginRequest} from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',    //用户手机号
    password:''  //用户密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //输入框监听input事件
  phoneChange(e){
    // console.log(e.detail.value);
    this.setData({
      phone:e.detail.value
    })
  },
  passwordChange(e){
    // console.log(e);
    this.setData({
      password:e.detail.value
    })
    
  },
  //登录按钮监听事件
  loginClick(){
    /*前端验证
    （1）验证用户信息是否合法
    （2）验证不通过就提示用户，信息不合法，不需要发送请求给后端
    （3）验证信息通过，发请求（携带账号，密码）给服务器 */
    if(!this.data.phone || !this.data.password){
      wx.showToast({
        title: '输入框不能为空',
        icon:"none"
      })
    }

    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!phoneReg.test(this.data.phone)){
      wx.showToast({
        title:"手机号格式错误",
        icon:"none"
      })
    }


    //后端验证 发送请求携带phone和password
    loginRequest("/login/cellphone",{phone:this.data.phone,password:this.data.password}).then(value=>{
      // console.log(value);
      if(value.data.code !== 200){
        wx.showToast({
          title: value.data.msg,
          icon:"none"
        })
      }else if(value.data.code === 200){
        //将用户信息保存在本地
        wx.setStorageSync('userInfo', JSON.stringify(value.data.profile))


        wx.showToast({
          title: '登录成功',
          icon:"none"
        })
        //登录成功后跳转到个人中心页面
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
      



      
    }).catch(err=>{
      console.log(err);
    })

  },




  //游客试用路由跳转 
  tclick(){
    wx.reLaunch({
      url:  "/pages/index/index",
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})