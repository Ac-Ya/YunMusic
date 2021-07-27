// pages/search/search.js
import {request} from "../../utils/request"
let historyRecord = null;
let content = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearch:[],  //用于保存热搜榜数据
    defaultKeyWord:[],//用于保存默认关键字
    searchContent:'',//用于保存搜索的内容
    searchList:[], //用于保存搜索到的列表
    timer:null,//用于保存定时器
    historyRecord:[]//用于保存搜索的历史记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从storage中获取历史记录
    historyRecord = wx.getStorageSync('historyRecord')
    this.setData({
      historyRecord:historyRecord ? historyRecord :[]
    })
    //调用获取热搜榜数据函数
    this.getHotSearchData()

    //调用获取默认关键字函数
    this.getKeyWord()
  },

  // 获取热搜榜数据
  async getHotSearchData(){
    let res = await request("/search/hot/detail")

    this.setData({
      hotSearch:res.data.data
    })
  },

  //获取默认关键字
  async getKeyWord(){
    let res = await request("/search/default")
    this.setData({
      defaultKeyWord:res.data.data.realkeyword
    })
  },

  //用于处理输入框值的变化
  handleInput(event){
    let searchContent = event.detail.value
    this.setData({
      searchContent
    })
    //获取关键字模糊匹配数据  防抖
    this.getFuzzyMatching(this.data.searchContent)

  },
  //获取模糊匹配数据
  getFuzzyMatching(keywords){
    if(this.data.timer){
      clearInterval(this.data.timer)
      this.data.timer = null
    }
    this.data.timer = setTimeout(async ()=>{
      //如果为空什么也不做
      if(!keywords) return ;
      //根据关键字获取数据
      let res = await request("/search",{keywords,limit:10})
      this.setData({
        searchList:res.data.result.songs,
      })
    },300)
  },

  //用于删除输入框中的内容
  deleteValue(){
    this.setData({
      searchContent:''
    })
  },

  //用于处理搜索列表的点击事件
  handleSearchList(event){
    // console.log(event);
    //获取显示在搜索列表的内容
    content = event.currentTarget.dataset.content.name
    //添加历史记录
    this.getHistoryRecord(content)
    
    //点击跳转 （未做）
  },

  //用于处理热搜榜的点击事件
  handleHotSearch(e){
    //获取显示在热搜榜上的内容
    content = e.currentTarget.dataset.content.searchWord
    //添加历史记录
    this.getHistoryRecord(content)

    //根据content关键字来获取搜索列表 （未做） 
    
  },


  //获取历史记录
  getHistoryRecord(content){
    //获取历史记录   该历史记录是先从Storage里面获取的
    historyRecord = this.data.historyRecord
    //给数组开头添加元素
    historyRecord.unshift(content)
    //数组去重
    historyRecord = [... new Set(historyRecord)]
    //更新历史记录
    this.setData({
      historyRecord
    })
    //保存历史记录
    wx.setStorageSync("historyRecord",historyRecord)
  },

  //处理删除历史记录
  deleteHistory(){
    //删除data里面保存的数据
    this.setData({
      historyRecord:[]
    })
    //删除Storage里面保存的数据
    wx.removeStorageSync('historyRecord')
  },
  //处理取消按钮
  handleCancel(){
    //退回
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