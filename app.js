//app.js
const LS = require('./utils/localStorage.js')
App({
  onLaunch: function () {
    //获取设备信息
    this.getSystemInfo();
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    let _this_ = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        _this_.globalData.location = {
          latitude:latitude,
          longitude:longitude
        };
      }
    })

  },

  /*
  *验证登录
  */
  verifyLogin: function (callBack) {
    if (!this.globalData.openid) {
      let _this_ = this;
      wx.login({
        success: res => {
          let appid = 'wxe31cf3e060bdfd66'; //填写微信小程序appid 
          let secret = 'da74a3ac23c4c746d8f13eb5dcef131c'; //填写微信小程序secret 
          //调用request请求api转换登录凭证 
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&grant_type=authorization_code&js_code=' + res.code,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              _this_.globalData.openid=res.data.openid
              LS.setLocalStore("openid",_this_.globalData.openid);
              callBack && callBack();
            }
          }) 
        },
        fail: function () {
          wx.showToast({
            title: '网络出现异常请稍后重试',
            duration: 2000,
            icon: 'none'
          })
          wx.navigateTo({
            url: '../login/login'
          })
        }
      })
    } else {
      callBack && callBack()
    }
  },
  /*
  *发起微信付款
  */
  WXPAY:function(pay_code,order_id,callback){
    wx.requestPayment({
      timeStamp: pay_code.timeStamp,
      nonceStr: pay_code.nonceStr,
      package: pay_code.package,
      signType: 'MD5',
      paySign: pay_code.paySign,
      success(res) {
        // 提示支付成功
        wx.showToast({ title: '支付成功',icon:'success',duration:1000})
        setTimeout(function(){
          wx.setStorage({
            key: 'is_showPayment',
            data: false
          })
          wx.redirectTo({
            url:'/pages/order/orderComplete/orderComplete?order_id='+order_id
          });
        })
      },
      fail(res) {
        wx.showToast({ title:'支付失败', duration:1000 })
        setTimeout(function(){
          callback && callback();
        },1000)
      }
    })
  },
  //获取设备信息
  getSystemInfo: function () {
    let _this_ = this;
    wx.getSystemInfo({
      success: function (res) {
        _this_.globalData.systemInfo = res;
      }
    });
  },

  globalData: {
    userInfo: null,
    s_code:null
  }
})