// pages/goodsInfo/goodsInfo.js
const WXAPI = require('../../wxapi/main')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getInit(options.id);
  },

  /*
  *初始化数据
  */
  getInit:function($id){
    WXAPI.getGoodsInfo($id).then((res)=>{
      let $data  = res.data
      this.setData({
        imageArr: $data.goods_bannerImage,
        base_info:$data.base_info,
        default_address:$data.default_address,
        init:$data,
        evaluate:$data.evaluate
      })
    })
  },

  getCIndex:function(e){
    this.setData({
      currentIndex:e.detail.currentIndex
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})