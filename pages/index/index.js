// pages/index/index.js
import {request,cookieRequest} from "../../utils/request"
import {tranNumber} from "../../utils/util"
let playCount = [],
recommendsList = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannersList:[],  //轮播图数据
    recommendsList:[], //推荐歌单数据
    playCount:[],    //推荐歌单的播放量
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

    //获取推荐歌单数据
    this.getRecommendList()
    // request("/personalized",{limit:30}).then((value)=>{
    //   // console.log(value);
    //   this.setData({
    //     recommendsList : value.data.result
    //   })
    // }).catch((err)=>{
    //   console.log(err);
    // })

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
  //获取推荐歌单数据
  async getRecommendList(){
    let res = await cookieRequest("/recommend/resource")
    console.log(res);
    recommendsList = res.data.recommend
    for(let i of recommendsList){
       let n = tranNumber(i.playcount,0)
        playCount.push(n)
    }


    this.setData({
      recommendsList,
      playCount
    })
  },



  //跳转到推荐歌曲页面
  torecommendsong(){
    wx.navigateTo({
      url: '/pages/recommendsong/recommendsong',
    })

  },

  //跳转到排行榜页面
  torankingList(){
    wx.navigateTo({
      url: '/pages/rankingList/rangingList',
    })

  },

  //跳转到搜索页面
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
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