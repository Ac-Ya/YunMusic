// pages/video/video.js
import {request,cookieRequest} from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],  //视频导航栏标签
    navId:"",     //当前导航位置的id
    videoList:[],// 视频列表
    displayVideo:"",//用于显示视频或者是图片
    isAuto:false,  //是否自动播放
    isRefresher:true,//下拉刷新是否被触发
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送请求获取 视频导航栏标签
    this.getVideoGroupList()
  },

  //自定义函数用于获取视频导航栏标签
  getVideoGroupList(){
    request("/video/group/list").then(value=>{
        // console.log(value);
        this.setData({
          videoGroupList:value.data.data.splice(0,13),
        })
     //获取导航栏Id
     this.getNavId()
      //通过Id获取视频列表
      this.getVideoListData(this.data.navId)
    })
  },
  //用于获取导航栏的id
  getNavId(){
    this.setData({
      navId:this.data.videoGroupList[0].id
    })
  },
  //点击导航栏切换
  changNav(event){
    // console.log(event);
    // 【注】event.currentTarget.id 是string类型
   
    this.setData({
      navId:+event.currentTarget.id,
      videoList:[]
    })

    wx.showLoading({
      title: '正在加载',
    })

    //通过Id获取视频列表
    this.getVideoListData(this.data.navId)
    
  
  },

  //用于获取视频列表
  getVideoListData(navId){
    let index = 0
    cookieRequest("/video/group",{id:this.data.navId}).then((value)=>{
      // console.log(value);
      //关闭正在加载提示框
      wx.hideLoading()

      //给videoList添加唯一的id
      let videoList = value.data.datas.map(item=>{
        item.id = index++
        return item
      })
      this.setData({
        videoList,
        isRefresher:false // 关闭下拉刷新
      })
    })
    

  },

  //处理播放事件  通过videoContext  来处理每个视频的播放
  handlePlay(event){
    // console.log(this);
    //主要思路 给当前组件绑定一个属性videoContext 和 preVideo
    this.videoContext  = wx.createVideoContext(event.currentTarget.id)
    //判断是否为空 然后判断前一个视频 和当前视频是否一样,然后暂停前一个视频的播放
    this.preVideo && this.preVideo !== this.videoContext &&  this.preVideo.stop() 
    //将当前视频 赋值给前一个视频
    this.preVideo = this.videoContext

    this.setData({
      displayVideo:event.currentTarget.id, //设置点击图片时切换为video
      isAuto:true//设置自动播放
    })

  },

  //处理自定义下拉刷新事件
  handleRefresher(){
    // console.log("xiala");
    //重新发送请求
    this.getVideoListData(this.data.navId)

  },

  //处理上拉加载更多的监听
  handleToLower(){
    console.log("上拉加载");
    // console.log(this);
    this.index ? this.index : (this.index = 8)  //绑定唯一id 
    cookieRequest("/video/group",{id:this.data.navId}).then((value)=>{
      // console.log(value);
      //给videoList添加唯一的id
      let newVideoList = value.data.datas.map(item=>{
        item.id = this.index++
        return item
      })
      this.data.videoList.push(...newVideoList)
      // console.log(this.data.videoList);
      this.setData({
        videoList:this.data.videoList
      })
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