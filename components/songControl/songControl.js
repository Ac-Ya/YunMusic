// components/songControl/songControl.js
import {
  request
} from "../../utils/request";
import PubSub from "pubsub-js"
var appInstance = getApp()
var globalData = appInstance.globalData
let index = 0;
let list = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay: false,   //是否播放
    songIndex: 0,
    songList: [],
    musicUrl: '',    //用于保存当前音乐的url
    isShow:false,    //是否显示该组件
    isShowMusicCard:false,//是否显示音乐卡片组件
    // musicId:0,     //用于保存当前音乐的id
    // currentMusicInfo:null, //当前索引的音乐信息 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //处理点击暂停或播放按钮
    changePlay() {

      // 判断globalData.backgroundAudioManager.src有没有值 
      if (!globalData.backgroundAudioManager.src) {
        index = wx.getStorageSync('songIndex')
        list = this.data.songList
        /*
          判断songList是否有更新
          如果有更新那么当前歌曲的索引可能在新songList不存在
            1.判断当前歌曲的索引是否存在平且当前歌曲的id是否于list里面索引的list相等
        */
        // 获取音频url
        this.getMusicUrl(index)
      }

      if (this.data.isPlay) {
        globalData.backgroundAudioManager.pause()
        this.changePlayState(false)
      } else {
        globalData.backgroundAudioManager.play()
        this.changePlayState(true)
      }


    },
    //切换下一首
    nextSong() {
      //获取当前音乐在列表中的索引
      index = wx.getStorageSync('songIndex')
      list = this.data.songList
      //判断索引值是否在list范围内
      // console.log(index,list.length);
      index+1 >= list.length ? (index = 0) : (index = index + 1)
      // index >= list.length-1 ? (index = -1) : (index = index)
      this.getMusicUrl(index)

      
    },
    //获取音乐音频
    async getMusicUrl(index) {
      list = this.data.songList
      // 获取音频url
      let res = await request("/song/url", {
        id:list[index].id
      })
      let name = list[index].name
      this.setMusicPlay(res.data.data[0].url, name)

      //更新index
      this.setData({
        songIndex: index
      })
      //重新设置index
      wx.setStorageSync('songIndex', index)
    },

    //设置音乐音频
    setMusicPlay(musicUrl, musicName) {
      try {
        globalData.backgroundAudioManager.src = musicUrl
        globalData.backgroundAudioManager.title = musicName
      } catch (error) {
        this.getMusicUrl(index+1)
      }
    },

    //改变播放状态
    changePlayState(isPlay){
      this.setData({
        isPlay
      })
    },


    //处理音乐列表的点击事件
    hangdleShowMusicCard(){
      let isShowMusicCard = !this.data.isShowMusicCard
      this.setData({
        isShowMusicCard
      })

    },
    //处理跳转到歌曲详情页
    toSongDetail(){
      let index = this.data.songIndex
      let musicId = this.data.songList[index].id
      let musicInfo = {
        index,musicId
      }
      wx.navigateTo({
        url: '/pages/songDetail/songDetail?musicInfo='+JSON.stringify(musicInfo),
      })
    }
  },

  pageLifetimes: {
    show() {
      //判断判断globalData.backgroundAudioManager.src有没有值
      if(globalData.backgroundAudioManager.src){
        this.changePlayState(true)
      }

      //获取数据列表和当前播放歌曲在列表中的索引
      let songList = wx.getStorageSync('songList'),
          songIndex = wx.getStorageSync('songIndex')
          //跳转到songDetail时会造成globlalData.recommendsongList数据丢失
          globalData.recommendsongList = songList
      if(songList && songIndex >= 0){
        this.setData({
          isShow:true,
          songList,
          songIndex
        })
      }
     

      //设置后台播放和暂停的事件
      globalData.backgroundAudioManager.onPlay(() => {
        this.changePlayState(true)
      })
      globalData.backgroundAudioManager.onPause(() => {
        this.changePlayState(false)
      })


      //歌曲自然播放结束
      globalData.backgroundAudioManager.onEnded(() => {
        this.nextSong()
      })
      

      //订阅musicListCard发布的消息
      PubSub.subscribe("switchSong2",async (msg,songIndex)=>{
        this.getMusicUrl(songIndex)
      })
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {

    },
    moved: function () {},
    detached: function () {},
    ready() {

    }
  },
  options: {
    addGlobalClass: true
  }
})