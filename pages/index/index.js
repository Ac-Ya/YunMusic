// pages/index/index.js
import {request} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannersList:[],  //轮播图数据
    recommondsList:[], //推荐数据
    ranksList:[],   //排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图数据
    request("/banner",{type:2}).then((value)=>{
      // console.log(value);
      this.setData({
        bannersList : value.data.banners
      })
    }).catch((err)=>{
      console.log(err);
    })

    //获取推荐数据
    request("/personalized",{limit:30}).then((value)=>{
      // console.log(value);
      this.setData({
        recommondsList : value.data.result
      })
    }).catch((err)=>{
      console.log(err);
    })

    //获取排行榜数据
    let index = 0
    let arr = []
    while(index < 5){
      request("/top/list",{idx:index++}).then((value)=>{
        // console.log(value);
        //使用对象封装数据
        let obj = {name:value.data.playlist.name,tracks:value.data.playlist.tracks.slice(0,3)}
        arr.push(obj)
        // console.log(arr);
        this.setData({
          ranksList:arr
        })
    }).catch((err)=>{
      console.log(err);
    })
    }
    
  },

  torecommendsong(){
    wx.navigateTo({
      url: '/pages/recommendsong/recommendsong',
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