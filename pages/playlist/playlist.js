// pages/playlist/playlist.js
import {request} from "../../utils/request"
import {tranNumber} from "../../utils/util"
let  playCount = [],   //播放量
list = []//歌单列表
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlistName:[],//热门歌单的标签名
    navId:'',//导航栏id
    tag:'',//导航栏标签名
    order:"hot",//是否热门
    playlist:[],//歌单列表
    paging:10,//歌曲分页
    playCount:[],//播放量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    //调用获取标签名函数
    this.getPlayListName()
    
    //获取导航栏标签的歌单数据
    this.getPlayList("华语",20,1,"hot")
  },

  //获取热门歌单的标签名
  async getPlayListName(){
    let res = await request("/playlist/hot")
    console.log(res);
    this.setData({
      playlistName:res.data.tags,
      navId:res.data.tags[0].id,
      tag:res.data.tags[0].name
    })
  },
  //点击切换导航栏
  changeNav(e){
    let playInfo = JSON.parse(e.currentTarget.dataset.playinfo)
    this.setData({
      navId:+playInfo.id,
      tag:playInfo.tag,
      playlist:[]
    })

    wx.showLoading({
      title: '正在加载',
    })

    this.getPlayList(playInfo.tag,20,1,'hot')
  },
  //获取导航栏对应标签的歌单
  /*
    tag:标签名
    limit:每一页多少数据
    offset:页数
    order:是否为热门
  */
  async getPlayList(tag,limit = 20,paging,order = "hot"){

    let res = await request("/top/playlist",{cat:tag,limit,offset:(paging-1)*limit,order})
    list = res.data.playlists
    // console.log(res);
    //用于格式化播放量
    for(let i = 0;i < list.length;i++){
      playCount = tranNumber(list[i].playCount,1)
      list[i].playCount = playCount
    }
    
    wx.hideLoading()

    this.setData({
      playlist:this.data.playlist.concat(list),
      paging:paging + 1,
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
    console.log("下拉加载");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '正在加载中',
    })

    // console.log("下拉加载更多");
    this.getPlayList(this.data.tag,20,this.data.paging,"hot")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
})