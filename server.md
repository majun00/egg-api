# 在服务端部署 vue&node 项目(包括阿里云服务器的购买以及 nginx 的配置)

> 正式开始前，建议不熟悉 linux 命令的小伙伴同时打开我的另一篇博客[linux 常用操作](https://www.jianshu.com/p/0c6242c61c16)

## 服务器购买&配置

1. 打开阿里云，选择购买云服务器 ECS，这里可以选择[一键购买](https://ecs-buy.aliyun.com/simple/#/simple)进行快速配置,操作系统选择 CentOS 7.2 64 位，其他默认或根据实际需求来，若选择自定义购买请自行搜索;
2. 购买成功设置账号密码后，就可以通过 ftp 工具(我用的是 FileZilla)或者 git 连接我们的服务器了，这个时候我们也可以打开阿里云的控制台/云服务器 ECS 查看购买的服务器;
3. 打开阿里云的控制台/云服务器 ECS/网络和安全/安全组，在安全组列表点击配置规则，点击快速创建规则，就可以暴露端口了。比如暴露 80 端口，选择 HTTP(80)，授权对象填`0.0.0.0/0`，其他默认就可以了。暴露其他端口你就在自定义端口选择，比如暴露 7001 端口，你就在自定义端口选择 TCP，输入`7001/7001`即可。
4. 开启[node 性能平台](https://node.console.aliyun.com/#!/owned)，点击创建新应用按照操作提示来就行，成功开启后在项目配置(具体配置看下文))就可以监控数据了。

## 连接服务器

1. git 连接

   ```
   # ssh remote_username@remote_ip 然后输入密码即可

   如果ssh不存在，执行以下命令即可
   # yum install openssh-client 下载客户端ssh
   ```

2. ftp 工具连接(这里以 FileZilla 为例)，下载 filezilla 后，点击新建站点，输入主机 ip，选择 sftp 协议，选择登录类型为正常，输入账号密码即可

## 部署 node 环境

1. 部署 node 环境

   ```
   # ssh remote_username@remote_ip 连接服务器
   # wget https://nodejs.org/dist/v6.9.5/node-v6.9.5-linux-x64.tar.xz 下载node压缩文件
   # tar xvf node-v6.9.5-linux-x64.tar.xz 解压
   # ln -s /root/node-v6.9.5-linux-x64/bin/node /usr/local/bin/node 创建软连接
   # ln -s /root/node-v6.9.5-linux-x64/bin/npm /usr/local/bin/npm 创建软连接
   # node -v 查看node版本
   # npm -v 查看npm版本
   ```

2. 其他

   ```
   # yum install vim 下载vim
   ```

## nginx 安装&配置

1. nginx 安装

   ```
   # yum install epel-release 下载epel-release
   # yun install nginx 下载nginx
   # cd /etc/nginx
   # vim nginx.conf 用vim打开nginx.conf
   ```

2. 修改 nginx.conf

   - 修改 user 为 root
   - 修改 server 如下，这里 admin 是指向管理后台项目，app 是指向移动端项目，wx 是指向代理另一个 node 微信公众号项目(运行在 7002 端口，但微信公众号配置 http 只允许 80 端口,所以设置代理，我们的 elm 接口运行在 7001 不用代理)

   ```
   server {
       listen       80 default_server;
       listen       [::]:80 default_server;
       server_name  _;
       root         /root/www/;

       # Load configuration files for the default server block.
       include /etc/nginx/default.d/*.conf;

       location /admin/ {
       # 为空即可，前端打包文件放在/root/www/admin里面就可访问到，注意默认是index.html
       }

       location /app/ {

       }

       location /wx/ {
           proxy_pass   http://127.0.0.1:7002/;
       }

       error_page 404 /404.html;
           location = /40x.html {
       }

       error_page 500 502 503 504 /50x.html;
           location = /50x.html {
       }
   }
   ```

3. 启动 nginx

   ```
   nginx -t 测试nginx语法是否有误
   nginx 启动nginx
   nginx -s reload 重启nginx，修改nginx.conf后记得重启
   ```

4. 其他命令

   ```
   ps -ef | grep nginx 显示nginx进程
   nginx -s stop 停止nginx
   nginx -v 查看nginx版本
   ```

## 部署 mongodb

1. 安装 mongodb

   ```
   # ssh remote_username@remote_ip 连接服务器
   # curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz 下载
   # tar -zxvf mongodb-linux-x86_64-3.0.6.tgz 解压
   # mkdir data 创建数据库文件夹
   # touch mongodb.log 创建日志文件
   # cd /usr/local/mongodb/bin
   # ./mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/mongodb.log -logappend -port=27017 -fork 注意fork是后台启动，避免又要再开窗口重新连接服务器再能进行其他操作
   # ./mongo 连接mongodb
   ```

2. 配置随 linux 启动
   在/etc/rc.local 添加如下即可：

   ```
   # rm /usr/local/mongodb/data/mongod.lock 停止可能在运行的mongo
   # /.../bin/mongod -dbpath /usr/local/mongodb/data -logpath /usr/local/mongodb/mongodb.log -logappend -fork -port 27017
   ```

3. 设置权限

   ```
   # cd /usr/local/mongodb/bin
   # ./mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/mongodb.log -logappend -port=27017 -fork
   # ./mongo
   > use admin
   > db.createUser(
   >  {
   >    user: "root",
   >    pwd: "123456",
   >    roles: [ { role: "root", db: "admin" } ]
   > }
   > )
   > db.shutdownServer();
   # ./mongod -dbpath=/usr/local/mongodb/data -logpath=/usr/local/mongodb/mongodb.log -logappend -port=27017 -fork --auth
   # db.auth("root","123456")
   ```

4. 项目中连接 mongodb(这里以 koa 框架 egg 项目为例，其他 node 请自行查找)

   ```
   # cnpm i egg-mongoose -S

   // config/plugin.js
   exports.mongoose = {
     enable: true,
     package: 'egg-mongoose',
   }

   // config/config.default.js
   config.mongoose = {
       url: 'mongodb://127.0.0.1/eggadmin',
       options: {
           // 如果设置了密码
           // auth: { "authSource": "admin" },
           // user: "root",
           // pass: "123456",
       }
   }
   ```

## 部署 node 项目

> 部署环境 阿里云 CentOS 7.2 64 位

1. 本地项目根目录(删除 node_modules,建议依赖在服务器下载)

   ```
   # tar -zcvf ../file_name.tgz . 打包
   # scp ../file_name.tgz remote_username@remote_ip:/root/www/server 上传到服务器
   ```

2. 服务器

   ```
   # ssh remote_username@remote_ip 连接服务器
   # cd /root/www
   # mkdir server 这里创建server文件夹放node项目代码
   # cd server
   # tar -zxvf file_name.tgz . 解压
   # cnpm install --production 安装生产环境依赖
   # npm start 运行(这里egg框架提供了egg-scripts启动进程，其他node项目请自行查找使用pm2启动)
   ```

3. 阿里 node 性能平台监控

   ```
   # cnpm i nodeinstall -g
   # nodeinstall --install-alinode ^3
   # cnpm i egg-alinode --save
   ```

   修改代码(这里是 egg 项目才有，其他 node 项目参考[阿里云官方文档](https://help.aliyun.com/document_detail/60338.html?spm=a2c4g.11174283.3.1.53f630b1oDUWak))

   ```
   // config/plugin.js
   exports.alinode = {
     enable: true,
     package: 'egg-alinode',
   };

   // config/config.default.js
   config.alinode = {
     // 从 `Node.js 性能平台` 获取对应的接入参数
     appid: '<YOUR_APPID>',
     secret: '<YOUR_SECRET>',
   };
   ```

## 部署前端项目(这里以 vue 为例)

在项目根目录`npm run build`，然后把 dist 文件夹里的内容传到服务器，这里我们把两个项目分部传到/root/www/app 和/root/www/admin，记得提前创建 app 和 admin 文件夹

## 项目实战

[全栈项目-基于 koa 框架 egg 的服务端接口](https://github.com/majun00/egg-api) 求一个 star~

> 本人水平有限，欢迎大家交流指正。本文为作者原创，转载请注明出处。如果有帮到您，愿意的话，可以请我喝杯冰阔落吗(๑´ㅂ`๑)

<img src="http://47.110.44.176/static/pay.jpg" width="30%"/>