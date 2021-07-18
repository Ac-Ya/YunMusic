// pages/songDetail/songDetail.js
import {request} from "../../utils/request"
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isplay:true,   //用于控制磁盘和指针动画显示
    songDetailData:null,  //歌曲详情
    musicUrl:'',//用于保存音频链接
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    //获取路由传过来的id
    let musicId = options.musicId
    appInstance.globlalData.musicId = musicId
    this.getSongDetailData(musicId)
    this.getMusicUrl(musicId)
    


  },

  //获取歌曲详情数据
  async getSongDetailData(id){
    let res = await request("/song/detail",{ids:id})
    // console.log(res);
    this.setData({
      songDetailData:res.data.songs[0]
    })
  },
  //获取音频链接
  async getMusicUrl(id){
    let res = await request("/song/url",{id})
    // console.log(res);
    let musicUrl = res.data.data[0].url
    this.setData({
      musicUrl
    })
    this.musicPlay()
  },

  //绑定在播放/暂停按钮   播放/暂停动画 歌曲 的回调函数
  handleMusicPlay(){
    let isplay = !this.data.isplay
    this.setData({
      isplay
    })
    this.musicPlayControl(isplay)
  },



  //背景音频 BackgroundAudioManager 实例，可通过 wx.getBackgroundAudioManager 获取
  //控制音乐播放/暂停的功能函数
  musicPlayControl(isplay){
    if(isplay){
      appInstance.globlalData.backgroundAudioManager.play()
      appInstance.globlalData.backgroundAudioManager.onPlay(() =>{
        this.setData({isplay:true})
      })
    }else{
      appInstance.globlalData.backgroundAudioManager.pause()
      appInstance.globlalData.backgroundAudioManager.onPause(()=>{
        this.setData({
          isplay:false
        })
      })
    }
  },
  musicPlay(){
      let backgroundAudioManager = wx.getBackgroundAudioManager()
      backgroundAudioManager.title = this.data.songDetailData.name
      backgroundAudioManager.src = this.data.musicUrl
      appInstance.globlalData.backgroundAudioManager = backgroundAudioManager
      // console.log(appInstance);
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