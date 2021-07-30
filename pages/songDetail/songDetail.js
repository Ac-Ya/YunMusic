// pages/songDetail/songDetail.js
import {request} from "../../utils/request"
import {formatMusicTime} from "../../utils/util"
var appInstance = getApp()
var globlalData = appInstance.globlalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isplay:true,          //用于控制磁盘和指针动画显示
    songDetailData:null,  //歌曲详情
    musicUrl:'',          //用于保存音频链接
    currentTime:"00:00",  //用于保存歌曲实时播放的时间
    totalTime:"00:00",    //用于保存歌曲的总时长
    currentWidth:0,       //用于保存实时进度条的长度
    index:0,              //当前音乐在列表中的位置
    switchMode:["icon-suijibofang","icon-danquxunhuan","icon-liebiaoxunhuan"],//用于保存音频的切换模式
    switchIndex:0         //切换模式的索引
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {musicId,index} = JSON.parse(options.musicInfo)
    this.setData({
      index
    })
    wx.setStorageSync('songIndex', index)
    //获取路由传过来的id
    // appInstance.globlalData.musicId = musicId
    //获取音频信息
    this.getMusicInfo(musicId)

    //设置后台播放和暂停的事件
    globlalData.backgroundAudioManager.onPlay(()=>{
      this.changeState(true)
    })
    globlalData.backgroundAudioManager.onPause(()=>{
      this.changeState(false)
    })

    //实时监听歌曲播放进度
    globlalData.backgroundAudioManager.onTimeUpdate(()=>{
      //实时获取歌曲播放的时间
      let currentTime = globlalData.backgroundAudioManager.currentTime
      // console.log(currentTime);
      //更新当前时间
      
      //更新实时进度条的长度  当前宽度 = （当前时间/总时间）* 总宽度
      let currentWidth = (globlalData.backgroundAudioManager.currentTime / globlalData.backgroundAudioManager.duration) * 490
      this.setData({
        currentTime:formatMusicTime(currentTime * 1000),
        currentWidth
      })

    })

    //监听音频自然播放结束
    globlalData.backgroundAudioManager.onEnded(()=>{
      //播放下一首歌
      this.switchSong(null,'next')
    })
   



  },

  //获取歌曲详情数据，获取音频链接
  async getMusicInfo(id){
    //歌曲详情数据
    let res1 = await request("/song/detail",{ids:id})
    let songDetailData = res1.data.songs[0]
    let totalTime = formatMusicTime(songDetailData.dt)
    //歌曲音频链接
    let res2 = await request("/song/url",{id})
    let musicUrl = res2.data.data[0].url
    console.log(res1);
    this.setData({
      songDetailData,
      musicUrl,
      totalTime
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
    //处理如果获取不到url时在往下移一次
    try {
      globlalData.backgroundAudioManager.src = musicUrl
      globlalData.backgroundAudioManager.title = musicName
    } catch (error) {
      this.switchSong(null,'next')
    }
   
  },
  //回退页面
  back(){
    wx.navigateBack({
      delta:1
    })
  },

  //切换歌曲
  switchSong(event,type){
    //获取点击的类型时"pre" / "next"
    if(event){
      type = event.currentTarget.dataset.id
    }
    let index = this.data.index   //获取当前id           
    if(type === 'pre'){
      index -= 1 
      index < 0 ? (index = globlalData.recommendMusicIdList.length-1) : index
      this.getMusicInfo(globlalData.recommendMusicIdList[index].id)
    }else{
      index += 1
      index >= globlalData.recommendMusicIdList.length ? (index = 0) :index
      this.getMusicInfo(globlalData.recommendMusicIdList[index].id)
   
    }
       //修改完index后记得更新index
       this.setData({
        index,
        isplay:false
      })
      wx.setStorageSync('songIndex', index)

  },

  //音频切换模式的点击
  switchMode(){
    // console.log(this.data.switchIndex);
    let switchIndex = this.data.switchIndex
    switchIndex ++
    switchIndex === 3 ? switchIndex = 0 : switchIndex
    this.setData({
      switchIndex
    })
    
  },

  //自然播放结束后根据播放模式切换歌曲
  switchMusicToMode(){

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