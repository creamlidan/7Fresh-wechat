// pages/reachStore/reachStore.js
const WXAPI = require('../../wxapi/main')
import {setInitTime,setIntervalTimer_info} from "../../utils/management.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    init:'',
    timer:null,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let _this_ = this;
    app.verifyLogin(function(){
      _this_.getInit();
    })
  },

  //初始化数据
  getInit:function(){
    let _this_ = this; 
    WXAPI.getHome().then(function(res) {
      if (res.code == 200) {
        let $data  = res.data
        _this_.setData({
          imageArr: $data.banner,
          freshChain:$data.freshChain,
          init: res.data,
          recommend:$data.recommend
        });
        wx.setNavigationBarTitle({
          title: res.data.title?res.data.title:'送到家'
        })
        //如果此商品正在促销需要计算倒计时
        if(res.data.seckill.end_time){
          let currentTime = new Date().getTime()/1000;
          let $seckill = 'init.seckill.djs'
          if(currentTime < res.data.seckill.end_time){
            _this_.setData({
              timer:setInterval( ()=> {
                if(currentTime > res.data.seckill.end_time){
                  clearInterval(_this_.data.timer)
                  _this_.setData({
                    timer:null
                  })
                }else{
                  _this_.setData({
                    [$seckill]:setInitTime(res.data.seckill.end_time,"number")
                  })
                }
              },1000)
            })
          }else{
            _this_.setData({
              [$seckill]:'结束'
            })
          }
        }
      } else {
        wx.showToast({
          title: "网络出现异常,加载失败",
          icon: 'none'
        })
      }
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this_ = this;
    WXAPI.getHome_recommendMore(this.data.page).then(function(res) {
      if (res.code == 200) {
        let $recommend = _this_.data.recommend.concat(res.data.recommend)
        let $page = _this_.data.page + 1;
        _this_.setData({
          recommend:$recommend,
          page:$page
        });
      } else {
        wx.showToast({
          title: "网络出现异常,加载失败",
          icon: 'none'
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})