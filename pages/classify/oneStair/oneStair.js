// pages/classify/classify.js
const WXAPI = require('../../../wxapi/main')
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
  },

  /*
  * 初始化数据
  */
  getInit:function(){
    WXAPI.getclassify_oneStair().then(res=>{
      if(res.code == 200){
        this.setData({
          classify:res.data.classify
        })
        wx.setNavigationBarTitle({
          title: res.data.title?res.data.title:'送到家'
        })
      }
    })
  }

})