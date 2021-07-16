// pages/profile/profile.js
import {request} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},     //登录的用户信息
    recentList:[],   //用户的最近播放列表
    myMusicList:[],  //我的音乐列表
    myCollection:[], //我的收藏列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //拿出本地存储的数据
    let userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo)
      }) 

    //获取用户的播放列表
    //发送请求
      request("/user/record",{uid:this.data.userInfo.userId,type:0})
      .then(value=>{
        // console.log(value);
        this.setData({
          recentList:value.data.allData.splice(0,10),
          myMusicList:value.data.allData.splice(10,8),
          myCollection:value.data.allData.splice(18,5)
        })
      }).catch(err=>{
        throw err
      })
    }
    
  },
  // 跳转至登陆页面
  toLogin(){
    wx.reLaunch({
      url: '/pages/login/login',
    })
    //清除Storage
    wx.clearStorageSync("userInfo")
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