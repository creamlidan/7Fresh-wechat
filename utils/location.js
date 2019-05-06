var QQMapWX = require('../static/map/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
    key: '72TBZ-5SEWV-Y2GPL-UHRGU-XUZQH-SWFX3' // 必填
});
/*
* 地址解析
* value：传入具体详细地址
* callback:为获取到具体坐标后的回调函数
*/

const analysisAddress = function(value,callback){
  let _this = this;
  qqmapsdk.geocoder({
    address: value, 
    success: function(res) {
    	var locationStr = String(res.result.location.lat) +','+String(res.result.location.lng),
    		locationObj = res.result.location;
    	calculateDistance(locationStr,function($d){
    		var d = parseFloat($d/1000).toFixed(1)+'Km';
    		locationObj.distance = d;
    		callback && callback(res.result.location)
    	});
    },
    fail: function(error) {
      console.error(error);
    }
  })
}

/*
* 计算距离
*/
const calculateDistance = function($to,callback){
	qqmapsdk.calculateDistance({
        from:'', //若起点有数据则采用起点坐标，若为空默认当前地址
        to: $to, //终点坐标
        success: function(res) {
        	callback && callback(res.result.elements[0].distance)
        },
        fail: function(error) {
          console.error(error);
        }
    });
} 

export {analysisAddress}