// components/songControl/songControl.js
import {
  request
} from "../../utils/request"
var appInstance = getApp()
var globlalData = appInstance.globlalData
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
    isPlay: false,
    songIndex: 0,
    songList: [],
    musicUrl: '',
    isShow:false 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //处理点击暂停或播放按钮
    changePlay() {
      // 判断globlalData.backgroundAudioManager.src有没有值
      if (!globlalData.backgroundAudioManager.src) {
        index = wx.getStorageSync('songIndex')
        list = this.data.songList
        // 获取音频url
        this.getMusicUrl(index)
        
      }



      if (this.data.isPlay) {
        globlalData.backgroundAudioManager.pause()
        // this.setData({
        //   isPlay:false
        // })
        this.changePlayState(false)
      } else {
        globlalData.backgroundAudioManager.play()
        // this.setData({
        //   isPlay:true
        // })
        this.changePlayState(true)
      }


    },

    //切换下一首
    nextSong() {
      //获取当前音乐在列表中的索引
      index = wx.getStorageSync('songIndex')
      list = this.data.songList
      //判断索引值是否在list范围内
      index > list.length ? (index = 0) : (index = index)

      this.getMusicUrl(index+1)

      
    },

    //获取音乐音频
    async getMusicUrl(index) {
      // 获取音频url
      let res = await request("/song/url", {
        id: list[index].id
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
        globlalData.backgroundAudioManager.src = musicUrl
        globlalData.backgroundAudioManager.title = musicName
      } catch (error) {
        this.getMusicUrl(index+1)
      }
    },

    //改变播放状态
    changePlayState(isPlay){
      this.setData({
        isPlay
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
  pageLifetimes: {
    show() {
      //判断判断globlalData.backgroundAudioManager.src有没有值
      if(globlalData.backgroundAudioManager.src){
        this.changePlayState(true)
      }

      //获取数据列表和当前播放歌曲在列表中的索引
      let songList = wx.getStorageSync('songList'),
          songIndex = wx.getStorageSync('songIndex')
      if(songList && songIndex >= 0){
        this.setData({
          isShow:true
        })
      }
      this.setData({
        songList,
        songIndex
      })


      //设置后台播放和暂停的事件
      globlalData.backgroundAudioManager.onPlay(() => {
        this.changePlayState(true)
      })
      globlalData.backgroundAudioManager.onPause(() => {
        this.changePlayState(false)
      })


      //歌曲自然播放结束
      globlalData.backgroundAudioManager.onEnded(() => {
        this.nextSong()
      })

    }
  },
  options: {
    addGlobalClass: true
  }
})