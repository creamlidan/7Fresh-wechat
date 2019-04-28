var express = require('express'),
	Mock = require('mockjs'),
	bodyParser = require("body-parser"),
	app = express();
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.json())

/*********************请求接口************************/
//到店
app.get("/api/reachStore",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'store':[{
                'store_thumb':'http://i2.bvimg.com/684726/5c3820f6b5ad8ad0.jpg',
                'store_name':'北京大族广场店',
                'store_businessHours':Mock.mock('@date("HH:mm")')+' - '+ Mock.mock('@date("HH:mm")'),
                'store_address':'北京市大兴区荣京东街地铁A1出口',
                'store_distance':1,
                'store_id':1
            },
            {
                'store_thumb':'http://i2.bvimg.com/684726/057bdfe1ea9efd3f.jpg',
                'store_name':'北京ONE店',
                'store_businessHours':Mock.mock('@date("HH:mm")')+' - '+ Mock.mock('@date("HH:mm")'),
                'store_address':'北京市海淀区彩和坊路海淀西大街74号',
                'store_distance':1,
                'store_id':2
            }],
            title:''
        },
        code:200
    })
     res.end(JSON.stringify(data));
})

app.listen(8088,function(){
    console.log('启动服务了')
})