// pages/reachStore/reachStore.js
const WXAPI = require('../../wxapi/main')
import {analysisAddress} from "../../utils/location.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this_ = this;
    app.verifyLogin(function(){
      _this_.getInit();
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#53658D',
      animation: {
        duration: 200,
        timingFunc: 'easeIn'
      }
    })
  },

  //初始化数据
  getInit:function(){
    let _this_ = this;
    WXAPI.getStore().then(function(res) {
      if (res.code == 200) {
        _this_.setData({
          storeList: res.data.store,
        });
        if(res.data.title){
          wx.setNavigationBarTitle({
            title: res.data.title
          })
        }
        //循环获取地理位置坐标
        _this_.data.storeList.forEach(function(v,i){
          let newStoreList = "storeList[" + i + "].location";
          analysisAddress(v.store_address,function($data){
            _this_.setData({
              [newStoreList]:$data
            })
          })
        })
      } else {
        wx.showToast({
          title: "网络出现异常,加载失败",
          icon: 'none'
        })
      }
    })
  },

  goLocation:function(e){
    const latitude = Number(this.data.storeList[e.currentTarget.dataset.i].location.lat),
          longitude = Number(this.data.storeList[e.currentTarget.dataset.i].location.lng),
          address = this.data.storeList[e.currentTarget.dataset.i].store_address
    if(typeof latitude== 'number' && typeof longitude == 'number' ){
      wx.openLocation({
        latitude,
        longitude,
        address:address,
        scale: 18
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})