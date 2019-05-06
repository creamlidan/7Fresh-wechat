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
            'freshChain':[{
                'img_src':'https://graph.baidu.com/resource/101ac35498ad83cad736901557121344.jpg',
                'img_url':'/pages/classify/classify'
            },{
                'img_src':'https://graph.baidu.com/resource/101f59a908e79847748db01557121408.jpg',
                'img_url':'/pages/classify/classify'
            },{
                'img_src':'https://graph.baidu.com/resource/101fab182681575cdd91001557121433.jpg',
                'img_url':'/pages/classify/classify'
            }],
            'handpick|4':[{
                'title_img|1':[
                    'https://graph.baidu.com/resource/101f7d5fb8657475f972601557125015.jpg',
                    'https://graph.baidu.com/resource/1016c885ab29b406c42d901557125030.jpg',
                    'https://graph.baidu.com/resource/1010f3f441f5d3b6d5b6501557125046.jpg'
                ],
                title_url:'/pages/classify/classify',
                'goods|20':[{
                    'good_thumb|1':[
                        'https://graph.baidu.com/resource/1024248d5d2ac483768d901556607990.jpg',
                        'https://graph.baidu.com/resource/101518296153e547495ca01557130274.jpg',
                        'https://graph.baidu.com/resource/101013c74f4e63e41176d01557130309.jpg',
                        'https://graph.baidu.com/resource/101d04aa69b24fe936aa201557130323.jpg'],
                    'good_name|1-300':Mock.mock('@cword("水果蔬菜肉蛋奶禽榴莲特别好吃", 10)'),
                    'good_price|1-300':1,
                    'good_unit|1':['盒','瓶','份'],
                    'good_id|+1':1,
                    'promotion_label|1':[['满减',,'直降'],['满减','限时'],['限时'],[],[]]
                }]
            }],
            'recommend|10':[{
                'good_thumb|1':[
                    'https://graph.baidu.com/resource/1024248d5d2ac483768d901556607990.jpg',
                    'https://graph.baidu.com/resource/101518296153e547495ca01557130274.jpg',
                    'https://graph.baidu.com/resource/101013c74f4e63e41176d01557130309.jpg',
                    'https://graph.baidu.com/resource/101d04aa69b24fe936aa201557130323.jpg'],
                'good_name|1-300':Mock.mock('@cword("水果蔬菜肉蛋奶禽榴莲特别好吃", 10)'),
                'good_price|1-300':1,
                'good_unit|1':['盒','瓶','份'],
                'good_id|+1':1,
                'promotion_label|1':[['满减',,'直降'],['满减','限时'],['限时'],[],[]]
            }],
            title:'送到家'
        },
        code:200
    })
    writeFile('reachHome',data);
    res.end(JSON.stringify(data));
})

//送到家-加载更多商品
app.get("/api/recommendMore",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'recommend|10':[{
                'good_thumb|1':[
                    'https://graph.baidu.com/resource/1024248d5d2ac483768d901556607990.jpg',
                    'https://graph.baidu.com/resource/101518296153e547495ca01557130274.jpg',
                    'https://graph.baidu.com/resource/101013c74f4e63e41176d01557130309.jpg',
                    'https://graph.baidu.com/resource/101d04aa69b24fe936aa201557130323.jpg'],
                'good_name|1-300':Mock.mock('@cword("水果蔬菜肉蛋奶禽榴莲特别好吃", 10)'),
                'good_price|1-300':1,
                'good_unit|1':['盒','瓶','份'],
                'good_id|+1':1,
                'promotion_label|1':[['满减',,'直降'],['满减','限时'],['限时'],[],[]]
            }],
        },
        code:200
    })
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