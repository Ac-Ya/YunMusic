// pages/search/search.js
import {request} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearch:[],  //用于保存热搜榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //调用获取热搜榜数据函数
    this.getHotSearchData()
  },

  // 获取热搜榜数据
  async getHotSearchData(){
    let res = await request("/search/hot/detail")
    let hotSearch = res.data.data
    console.log(hotSearch);
    this.setData({
      hotSearch
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