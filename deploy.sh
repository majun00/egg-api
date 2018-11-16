#!/bin/bash
set -ev

# 登陆远程主机
sshpass -e ssh -o stricthostkeychecking=no root@47.91.253.116

# 拉取最新代码
cd /var/api/bxg-api
git pull

# 停止服务器
npm stop

# 重新启动服务器
npm start
