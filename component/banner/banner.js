const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageArr: Array,
    bannerH:Number,
    autoplay:String,
    circular:String,
    nextMargin:String
  },
  externalClasses: ['my-class'],
  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots:true,
    interval:3000,
    duration:500,
    indicatorDots_activeColor:"#FFFFFF",
    indicator_color:"rgba(255,255,255,.3)"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})