// pages/classify/twoStair/twoStair.js
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
      _this_.getInit(options.id);
    })
  },

  /*
  * 初始化数据分类导航
  */
  getInit:function(id){
    let _this_ = this;
    WXAPI.getclassify_twoStair(id).then(res=>{
      if(res.code == 200){
        _this_.setData({
          twoStairClassify:res.data.classify,
          currentId:res.data.startShow
        })
        wx.setNavigationBarTitle({
          title: res.data.title?res.data.title:'产品分类'
        })
        this.getClassifyGoods_Init(res.data.classify.startShow)
      }
    })
  },

  /*
  * 初始化获取本地存储数据
  */
  getClassifyGoods_Init:function(id){
    let $currentClassify = wx.getStorageSync(`C${this.data.currentId}`)
    if($currentClassify){
       this.setData({
        classifyGoods: JSON.parse(unescape($currentClassify)).classify_goods,
        cat:JSON.parse(unescape($currentClassify)).cat
      })
      if(new Date().getTime() - JSON.parse(unescape($currentClassify)).timestamp > 1000 * 60 * 30){
        this.getClassifyGoods(id)
      }
    }else{
      this.getClassifyGoods(id)
    }
  },

  /*
  * 后台拉取新的数据
  */
  getClassifyGoods:function(id){
    let _this_ = this;
    WXAPI.getclassify_twoStair_goods(id).then(res=>{
      if(res.code == 200){
        _this_.setData({
          classifyGoods:res.data.classify_goods,
          cat:res.data.cat
        })
        res.data.timestamp = new Date().getTime();
        wx.setStorageSync(`C${this.data.currentId}`,escape(JSON.stringify(res.data)))
      }
    })
  },

  /*
  *点击更改分类
  */
  changePage:function($event){
    let $id = $event.currentTarget.dataset.id;
    this.setData({
      currentId:$id,
      classifyGoods:[],
      cat:'',
      toView:'category'
    })
    this.getClassifyGoods_Init($id);
  },

  /*
  * 点击进入商品详情
  */
  tapGoods:function($event){
    console.log
    wx.navigateTo({
      url:'/pages/goodsInfo/goodsInfo?id='+$event.currentTarget.dataset.i
    })
  },

  /*
  * 加入购物车
  */
  addShopcar:function(){
    let $id = $event.currentTarget.dataset.id
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})