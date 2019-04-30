var express = require('express'),
    Mock = require('mockjs'),
    bodyParser = require("body-parser"),
    app = express(),
    fs = require("fs");
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.json())

var $time = new Date().getTime()/1000 + 6900;


/*********************请求接口************************/
//到店
app.get("/api/reachStore",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'store':[{
                'store_thumb':'https://graph.baidu.com/resource/1023c9299c72da5a7872d01556608016.jpg',
                'store_name':'北京大族广场店',
                'store_businessHours':Mock.mock('@date("HH:mm")')+' - '+ Mock.mock('@date("HH:mm")'),
                'store_address':'北京市大兴区兴盛街与荣华南路东北角',
                'store_distance':1,
                'store_id':1
            },
            {
                'store_thumb':'https://graph.baidu.com/resource/1027396f294c60ad7aef701556608030.jpg',
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
    writeFile('reachStore',data);
    res.end(JSON.stringify(data));
})
//送到家
app.get("/api/reachHome",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'banner':[{
                'img_src':'https://graph.baidu.com/resource/1025149a9e6c264b35c3701556607360.jpg',
                'img_url':'/pages/classify/classify'
            },{
                'img_src':'https://graph.baidu.com/resource/102d0e5e45a1f4c6e02c201556607521.jpg',
                'img_url':'/pages/classify/classify'
            }],
            "classify|10":[{
               'img_src|1':[
                    'https://graph.baidu.com/resource/101b6cc0db8aeb7ef0e9901556608439.jpg',
                    'https://graph.baidu.com/resource/10177ccc9698878e2db4f01556608227.jpg',
                    'https://graph.baidu.com/resource/10120d5bc41f3b25000f901556608312.jpg'],
                'classify_name':Mock.mock('@cword(4)'),
                'classify_id|+1':1
            }],
            'seckill':{
                desc:"限时抢购秒不停",
                end_time:$time,
                'goods|2':[{
                    'goods_thumb':'https://graph.baidu.com/resource/1029d54816d3d10bf54ee01556607974.jpg',
                    'goods_price|1-500':1,
                    'goods_unit|1':['盒','瓶','份'],
                    'goods_id|+1':1,
                    'discount|1':[5.5,6.5,7.2],
                    'progress|1':[30,50,60],
                }]
            },
            'groupBuy':{
                desc:"好生活 拼出来",
                'goods|2':[{
                    'goods_thumb':'https://graph.baidu.com/resource/1024248d5d2ac483768d901556607990.jpg',
                    'goods_price|1-300':1,
                    'goods_unit|1':['盒','瓶','份'],
                    'goods_id|+1':1,
                }]
            },
            title:'送到家'
        },
        code:200
    })
    writeFile('reachHome',data);
    res.end(JSON.stringify(data));
})

function writeFile($name,data){
    fs.readFile(`./data/${$name}.js`,'utf8',function(err,$data){
        if(!$data){
            var str = `var json = ${JSON.stringify(data)};module.exports = {dataList: json}`
            fs.writeFile(`./data/${$name}.js`,str,function(err){
                if(err){
                    throw err;
                    return;
                }
                console.log("写入成功了");
            })
        }
    })
}


app.listen(8088,function(){
    console.log('启动服务了')
})