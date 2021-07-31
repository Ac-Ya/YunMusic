// components/musicListCard/musicListCard.js
let songList = [],
  songIndex = 0;
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
    songList:[],//用于获取音乐列表
    songIndex:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSongList(){
      songList = wx.getStorageSync('songList')
      songIndex = wx.getStorageSync('songIndex')
      this.setData({
        songIndex,
        songList
      })
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.getSongList()
     },
    moved: function () { },
    detached: function () { },
  },
  pageLifetimes:{
    show(){
      
    }
  },
})
