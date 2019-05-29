-7Fresh-
项目大体按照7Fresh小程序风格,只做核心部分功能

- 采用mock做数据模拟
    - 克隆项目到本地
    ````
    git clone https://github.com/creamlidan/7Fresh-wechat.git
    ````
    - 进入根目录,拉取依赖包
    ````
    npm i
    ````
    - 进入server数据模拟文件夹
    ````
    cd server
    npm i
    node index.js//就可以在小程序里面导入查看拉
    ````
> 注意：mock数据为本地模拟暂时不能再手机上预览,调试请在开发者工具
> reachStroe中我直接使用了假的json数据 为了方便在手机上调试地图定位,真实环境中去掉即可
> 项目会持续更新。
