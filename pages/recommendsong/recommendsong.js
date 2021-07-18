// pages/recommondsong/recommondsong.js
//用于格式化事件的函数
import {formatNumber} from "../../utils/util"
import {cookieRequest} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:0,
    month:0,
    recomendsongList:[],//推荐歌曲列表
    // buttonClicked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先判断用户是否登录
    let userLogin = wx.getStorageSync('userInfo')
    if(!userLogin){
      wx.showToast({
        title: '请先登录！',
        icon:"none",
        success(){
          //跳转到登陆界面
          wx.reLaunch({
            url: '/pages/login/login',
          })
        },
      })
    }
    //获取时间
    this.setData({
      day:formatNumber(new Date().getDate()),
      month:formatNumber(new Date().getMonth()+1)
    })
    //获取推荐歌曲列表数据
    this.getRecommendSongList()
  },
  //获取推荐列表
  async getRecommendSongList(){
    const res = await cookieRequest("/recommend/songs")
    console.log(res);
    this.setData({
      recomendsongList:res.data.recommend
    })
  },

  //跳转到歌曲详情
  toSongDetail(event){
    
    let song = event.currentTarget.dataset.song
    console.log(event);

    //路由跳转传参 通过query
    //【注】原生小程序中路由传参有长度限制，如果参数过长会自动接去掉
    //因为在songDetail页是通过id来获取数据的所以可以直接传入id
    wx.navigateTo({
      url: "/pages/songDetail/songDetail?musicId="+song.id
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