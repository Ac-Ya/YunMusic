// pages/songDetail/songDetail.js
import {request} from "../../utils/request"
var appInstance = getApp()
var globlalData = appInstance.globlalData
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
    //获取音频信息
    this.getMusicInfo(musicId)
    // console.log(globlalData.backgroundAudioManager);

    //设置后台播放和暂停的事件
    globlalData.backgroundAudioManager.onPlay(()=>{
      // console.log("全局播放");
      this.changeState(true)
    })
    globlalData.backgroundAudioManager.onPause(()=>{
      // console.log("全局暂停");
      this.changeState(false)
    })

  },

  //获取歌曲详情数据，获取音频链接
  async getMusicInfo(id){
    let res1 = await request("/song/detail",{ids:id})
    let songDetailData = res1.data.songs[0]

    let res2 = await request("/song/url",{id})
    let musicUrl = res2.data.data[0].url
    this.setData({
      songDetailData,
      musicUrl
    })
    this.musicPlay(musicUrl,songDetailData.name)
  },

  //绑定在播放/暂停按钮   播放/暂停动画 歌曲 的回调函数
  handleMusicPlay(){
    let isplay = !this.data.isplay;
    this.setData({
      isplay
    })
    this.musicPlayControl(isplay)
    
  },
  //改变播放状态
  changeState(isplay){
    this.setData({
      isplay
    })
  },

  //背景音频 BackgroundAudioManager 实例，可通过 wx.getBackgroundAudioManager 获取
  //控制音乐播放/暂停的功能函数
  musicPlayControl(isplay){
    if(isplay){
      globlalData.backgroundAudioManager.play()
      globlalData.backgroundAudioManager.onPlay(()=>{
        this.changeState(isplay)
      })
    }else{
      globlalData.backgroundAudioManager.pause()
      globlalData.backgroundAudioManager.pause(()=>{
        this.changeState(isplay)
      })
    }     
  },
  //设置音频链接
  musicPlay(musicUrl,musicName){   
    globlalData.backgroundAudioManager.src = musicUrl
    globlalData.backgroundAudioManager.title = musicName
  },
  //回退页面
  back(){
    wx.navigateBack({
      delta:1
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