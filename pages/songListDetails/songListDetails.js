// pages/songListDetails/songListDetails.js
import {request} from "../../utils/request"
import {timestampFormat,tranNumber} from "../../utils/util"
let id = 0,
rankingListType = '',//榜单类型
updateTime = '',//榜单最近更新时间
updateTimestamp = 0,//时间戳
collectNum = "",//榜单收藏数量
rankingSongList = [],//榜单歌曲列表
description = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distance:0,//页面滚动的距离
    rankingListType:'',//榜单类型
    updateTime:'',//榜单最近更新时间
    collectNum:"",//榜单收藏数量
    rankingSongList:[],//榜单歌曲列表
    description:'',//榜单描述


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = JSON.parse(options.id)
    this.getRankingListData(id)
  },

  //通过id获取榜单信息
  async getRankingListData(id){
    let res = await request("/playlist/detail",{id})
    console.log(res);
    rankingListType = res.data.playlist.name
    updateTimestamp = res.data.playlist.updateTime
    collectNum = res.data.playlist.subscribedCount
    rankingSongList = res.data.playlist.tracks
    description = res.data.playlist.description
    this.setData({
      rankingListType,
      updateTime:timestampFormat(updateTimestamp),
      collectNum:tranNumber(collectNum,1),
      rankingSongList,
      description
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /*
    页面滚动监听
  */
  onPageScroll(e){
    // console.log(e);
    this.setData({
      distance:e.scrollTop
    })
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