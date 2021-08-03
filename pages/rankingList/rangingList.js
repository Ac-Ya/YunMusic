// pages/rankingList/rangingList.js
import {request} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    officialListData:[],//官方榜数据
    artistListData:[],//歌手榜数据
    globalListData:[],//全球榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getrankingListData()
  },

  //获取排行榜数据
  async getrankingListData(){
    let res = await request("/toplist/detail")
    let {artistToplist,list} = res.data
    this.setData({
      officialListData:list.slice(0,4),
      artistListData:artistToplist,
      globalListData:list.slice(4)
    })
  },
  // 跳转到榜单详情页
  toSongListDetails(event){
    // console.log(event);
    let id = event.currentTarget.dataset.id
    //路由跳转传参
    wx.navigateTo({
      url: '/pages/songListDetails/songListDetails?id='+JSON.stringify(id),
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