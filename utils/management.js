
//处理倒计时(将时间撮转化为想要的格式)
let handlingTime = time => {
	let obj = {
		dd:"",
		hh:"",
		mm:"",
		ss:""
	}
	if (time > 0) {
		obj.dd = Math.floor(time / 60 / 60 / 24)>=10?Math.floor(time / 60 / 60 / 24):'0'+Math.floor(time / 60 / 60 / 24);;
		obj.hh = Math.floor((time / 60 / 60) % 24)>=10?Math.floor((time / 60 / 60) % 24):'0'+Math.floor((time / 60 / 60) % 24);
		obj.mm = Math.floor((time / 60) % 60)>=10?Math.floor((time / 60) % 60):'0'+ Math.floor((time / 60) % 60);
		obj.ss = Math.floor(time  % 60)>=10?Math.floor(time  % 60):'0'+ Math.floor(time  % 60);
	}else{
		obj = "结束"
	}
    return obj;
}
/*
* 初始化时间数组(用于众筹,拼团,砍价列表分别倒计时处理)
* endtime:结束的时间
*/
const setInitTime = function(endtime,timeType){
	let dd,hh,mm,ss = null;
	let time = parseInt(endtime) - new Date().getTime()/1000;
	let obj = handlingTime(time);
	let str = "";
	if(obj == "结束"){
	    str="结束"
	}else{
		if(timeType == "number"){
			if(obj.dd == 0){
	        	str = [obj.hh,':',obj.mm,':',obj.ss];
	        }else{
				str = [obj.dd,':',obj.hh,':',obj.mm,':',obj.ss];
	        }
		}else{
			if(obj.dd == 0){
		      str = obj.hh+":"+obj.mm+":"+obj.ss;
			}else{
			    str = obj.dd+":"+obj.hh+":"+obj.mm+":"+obj.ss;
			}
		}
	}
	return str;
}


/*
* 初始化时间(用于拼团,砍价详情倒计时处理)
* $event:初始化数据
* $data:被改变的数据
*/

const setIntervalTimer_info = function($event,$data,callback){
    var aaa = parseInt($event);
    var bbb = new Date().getTime()/1000;
    var rightTime = aaa - bbb;
    let obj = handlingTime(rightTime);
    if(obj == "结束"){
		$data = "结束"
		callback && callback()
	}else{
	    if(obj.dd == 0){
	    	$data = [obj.hh,':',obj.mm,':',obj.ss];
	    }else{
	    	$data = [obj.dd,':',obj.hh,':',obj.mm,':',obj.ss];
	    }
	}
	return $data
}

export {setInitTime,setIntervalTimer_info}