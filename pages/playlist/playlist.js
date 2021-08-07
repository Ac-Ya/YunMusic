// pages/playlist/playlist.js
import {request} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlistName:[],//热门歌单的标签名
    navId:'',//导航栏id
    list:[],//歌单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    //调用获取标签名函数
    this.getPlayListName()
  },

  //获取热门歌单的标签名
  async getPlayListName(){
    let res = await request("/playlist/hot")
    console.log(res);
    this.setData({
      playlistName:res.data.tags,
      navId:res.data.tags[0].id
    })
  },
  //点击切换导航栏
  changeNav(e){
    // console.log(e);
    this.setData({
      navId:+e.currentTarget.dataset.id,
      list:[]
    })

    wx.showLoading({
      title: '正在加载',
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