### Nginx是一个服务器


### Nginx环境安装
- nginx秘钥
- https://www.xitongcheng.com/jiaocheng/dnrj_article_72794.html

- vmware下载地址
- https://www.vmware.com/cn/products/workstation-pro/workstation-pro-evaluation.html

- finalshell
- http://www.hostbuf.com/t/988.html


### Centos7
- root
- 111111

> 第一安装虚拟os要配置网卡
- 1. vi /etc/sysconfig/network-scripts/ifcfg-ens33

- 2. 修改 ONBOOT=yes
<!-- 
  // 参考
  TYPE=Ethernet   # 网卡类型：为以太网
  PROXY_METHOD=none  # 代理方式：关闭状态
  BROWSER_ONLY=no  # 只是浏览器：否
  BOOTPROTO=static  # 网卡协议 static 静态主机配置协议
  DEFROUTE=yes  # 默认路由：是
  IPV4_FAILURE_FATAL=no   # 是否开启IPV4致命错误检测：否
  NAME=ens33  # 网卡名字（与DEVICE一致）
  UUID=61bd3c1f-e4ca-40ef-bc6a-f3266763fe8d  #唯一标识码
  DEVICE=ens33  #网卡设备
  ONBOOT=yes  # 是否激活网卡


  IPADDR=192.168.159.10  #ip地址（static设置）
  NETMASK=255.255.255.0  #子网掩码
  GATEWAY=192.168.159.2  #网关
  DNS1=114.114.114.114   #dns1 地址解析
  DNS2=8.8.8.8  #dns2 地址解析
 -->

- 3. 重启网络服务
- systemctl restart network

- 4. 测试 ping qq.com


> 查看虚拟机 ip 地址
- ip addr
- 192.168.25.128


> 关掉虚拟机
- init 0


> 配置静态ip
- 之前的网络配置使用dhcp方式分配ip地址 这种方式会在系统每次联网的时候分配一个ip给我们用 也就是说有可能系统下次启动的时候ip会变 这样非常不方便我们管理

- 1. 配置静态ip首先打开网卡配置文件
- vi /etc/sysconfig/network-scripts/ifcfg-ens33

- 2. 在打开的文件的最后添加
```
# 先把上面的修改为 static
BOOTPROTO=static

IPADDR=192.168.25.101  #ip地址（static设置）
NETMASK=255.255.255.0  #子网掩码
GATEWAY=192.168.25.2  #网关
DNS1=114.114.114.114   #dns1 地址解析
DNS2=8.8.8.8  #dns2 地址解析
```

- 3. 重启网络服务
- systemctl restart network


**注意:**
- 我们配置的网关必须跟 vmware 的网关一致
- 查看 vmware 网关的方式
- 1. 点击编辑 - 虚拟网络编辑器 nat设置 查看网关 
<!-- 
  https://www.bilibili.com/video/BV1yS4y1N76R?p=5&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b
 -->


- 2. 真正的环境中 不要随意修改地址 会照成别人上不了网

----------------

### Nginx 4个发行版本
- 1. Nginx开源版
- http://nginx.org
<!-- 
  该班干净纯粹 额外的其它功能都没有 主要就是完成了网站服务器 代理服务器 负债均衡器

  不是特别的丰满
 -->

- 2. Nginx商业版
- https://www.nginx.com


- 3. Openresty
- http://openresty.org


- 4. Tengine
- http://tengine.taobao.org

----------------

### Nginx在Centos 7中编译安装成系统服务
- 要安装Nginx的话 先要搭载运行环境 下面我们通过虚拟机来进行安装

> Nginx开源版安装
- 弹幕说 下面的安装步骤都不用 直接
- yum install nginx


- 安装的部分 参考pdf 上面记载的很全
- https://www.bilibili.com/video/BV1yS4y1N76R?p=7&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b

- 安装完所有的东西后 要依次执行
- ./configure --prefix=/usr/local/nginx
- make  (编译)
- make install  (安装)


> 启动 nginx
- 1. 进入 nginx 所在的目录 /usr/local/nginx 下的 sbin 目录
- 2. ./nginx 启动 nginx
<!-- 
  该命令是后台启动了nginx
 -->

> 快递停止 nginx
- ./nginx -s stop


> 优雅关闭 在退出前完成已经接受的链接请求
- ./nginx -s quit


> 重新加载配置
- ./nginx -s reload
<!-- 
  更改完配置文件后立即生效 而不重启nginx整个服务器
 -->

------

> 检查看看是否启动了 nginx 
- ip addr 查看ip
- 浏览器上输入ip验证

- 如果访问不到的话 可以关闭防火墙


> 关闭内网的防火墙
- 我们的nginx是安装下centos7下的linux系统中 而系统又在虚拟机中 属于一个内网


> 关闭防火墙
- systemctl disable firewalld.service

> 放行防火墙
- 如果这台虚拟机要对外网进行开放的话 可以开放下端口
- firewall-cmd --zone=public --add-port=80/tcp --permanent

> 重启防火墙
- firewall-cmd --reload

----------------

> 将 nginx 启动配置成系统服务
- 上面我们在启动 nginx 的时候 是去 sbin/ 目录下 执行 ./nginx 命令 启动nginx 我们还可以创建一个脚本文件

- 创建服务脚本
- 