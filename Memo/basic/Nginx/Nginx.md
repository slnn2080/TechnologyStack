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

> 创建服务脚本
- vi /usr/lib/systemd/system/nginx.service

> 添加文件内容
- 如果我们的nginx 不在/usr/local 下我们要修改下面代码里面的路径
```
[Unit]
Description=nginx -  web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```

> 重新加载系统服务
- systemctl daemon-reload


> 启动服务 (配置完服务脚本后 启动nginx的命令为)
- systemctl start nginx
- 没有配置 关闭nginx的服务命令 所以我们想要关闭的时候 还是要进入 sbin 目录下 执行下面的命令
- ./nginx -s stop


> 检查是否启动成功
- systemctl status nginx


> 重新加载配置文件 (不用重启)
- systemctl reload nginx


> 配置开机启动
- systemctl enable nginx.service

----------------

### Nginx所在的位置
- /usr/local/nginx

----------------

### Nginx目录结构

- 刚开始安装好的目录为
```js
    | - conf
      // nginx主配置文件

      - nginx.conf
        // 这里会引用其他的配置文件

    | - html
      // 默认的页面

    | - logs
      - access.log  
      // 访问日志 用户的访问时间 请求地址文件 附加参数

      - error.log
      // 系统出现错误的 会记录这里

      - nginx.pid
      // nginx 的 id

    | - sbin
      // nginx的执行程序
```

- 其中运行后会产生几个 _temp 结尾的目录
```js
    | - conf
    | - html
    | - logs
    | - sbin

    | - client_body_temp
    | - fastcgi_temp
    | - proxy_temp
    | - scgi_temp
    | - uwsgi_temp
```

----------------

### Nginx多进程模型 和 基本请求流程
- 1. 用户会通过网络访问 nginx 
- 2. nginx 在响应请求的时候 过程是
  - ./nginx 开启nginx会它会开启 master 主进程
  - master会读取配置文件 并 检验(conf/nginx.conf)
  - 如果配置文件没有错误会开启子进程 worker

  - master 主进程 并不处理业务 它会协调子进程
  - worker 子进程

  - 当主进程 和 子进程 都启动之后 就会等待用户请求
  - 用户请求进到nginx中的时候是由 worker 线程 来响应并解析的

- 3. 用户请求过来后 worker会解析请求 看看用户请求的资源 worker会读取 conf/nginx.conf 配置文件里面写了站点的主目录 然后根据配置文件里的指定的内容 去对应的目录找资源


> 总结:
- nginx在启动后 是多进程同时运行的模式 多进程同时完成用户的请求

----------------

### Nginx基础配置
- nginx 的配置文件在 /usr/local/nginx/conf/nginx.conf

- 这个就是nginx的默认的配置文件 我们可以用记事本打开 里面的代码带井号为注释

- 我们把nginx原本配置文件中的注释删掉 看看还剩什么部分 这些也是保证nginx能够运行的最小的配置文件的版本

```sql
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

> 检查配置文件是否ok
- 我们在修改完 nginx 配置文件后 在重新启动 或者 reload nginx 的之前 要检查下配置文件是否ok

- nginx -t

- nginx -tc /etc/nginx/nginx.conf
- 加上 c 参数可以指定路径

- 这里有些问题 看看后面能不能补上 说找不到nginx命令

---

> 最小配置
**worker_processes**
- 默认为1，表示开启一个业务进程 工作的进程个数
- 这个部分设置多少 基本上会对应电脑cpu的物理内核数 比如我们这台虚拟机我们分配了一个内核 那就设置为1 如果设置为10 并没有太多的意义 如果把一个cpu绑定到多个进程上执行任务 它会分开时间段同时去执行好多任务 这样的话效率反而会变低 
<!-- 
  上面我们说到了 nginx 的运行模型 它是由一个主进程 和 多个子进程 同时运行的
  主进程叫做 master
  子进程叫做 worker

  这个配置项代表在启动nginx的时候 需要启动多少个 worker
 -->


**events**
- 事件驱动模块 

  - 配置项：
    - worker_connections
      - 单个业务进程可接受连接数 每一个worker可以创建多少连接 默认就是1024


**http**
- http模块

  - 配置项:
    \\ include
      - 可以将另一个配置文件 引入当前的配置文件中
      - 如：
      - include mime.types; 
      - 引入http mime类型 响应头里面会标明当前返回的文件是什么类型的 比如我们传送一张图片 我们给它的mime type加到头信息里面 那么浏览器就会按照服务器端返回的数据类型（图片的类型）来展示这个文件 
      - 比如我们上网我们输入网址打开一张图片的时候 浏览器会默认将图在页面上展示出来 而不是下载
      - 如果我们上面图片的类型换成exe会怎么样 浏览器会根据mimetype 弹出一个下载框供我们下载 **所以文件是展示还是下载并不是由后缀名来决定的 是由我们返回的mime types来决定的**

      - mime.types 文件里面 是根据文件的后缀 和 mimetype 进行一一对应 比如我们得文件后缀是html 那么html对应这 text/html 这样就会在返回的响应头里面加上 text/html 
      - 这样浏览器就会根据 响应头里面的 mime types 来解析我们响应回的文件

      - 这个 mime types 是告诉浏览器 让浏览器进行解析的
      - 同样 比如.css文件 那就会在响应头里面添加 text/css 这样浏览器才会根据 css的规则去读这个文件
      <!-- 一般来说 都是通过 content-type 来添加该mime类型的吧 -->

      - 当我们有特殊的文件后缀比如 .mp5 但是它没有对应的 mime 类型 这时假如我们想告诉浏览器 使用 mp4 的方式让浏览器打开 就可以在这个 mime types 配置文件里面 这么些
      - video/mp4   mp5

    \\ default_type
      - 因为 mime types 里面不可能添加所有后缀对应的mime类型
      - 这时候我们就可以使用这个配置项 默认值为 application/octet-stream
      - 以octet格式的流的方式传送给客户端（如果mime类型没匹配上，默认使用二进制流的方式传输。）
      
    \\ sendfile
      - 请求发送给服务器 服务器中有请求所需要的资源 
      - 比如 ooxx.mp4 nginx它是一个软件 软件是运行在操作系统之上的 我们现在使用的是 linux操作系统 
      - 请求发送过来后 nginx 怎么接收的呢？
      - 是由操作系统的网络接口转发给 nginx 然后它才能读到用户的请求 
      - 怎么转发的呢？ 绑定注册 java也是启动一个程序的时候 会向操作系统注册某个端口 注册也就是告诉它 以后通过xx端口发送过来的请求转发给nginx
      - 然后nginx接收到请求了 它需要去磁盘中找文件 它会根据配置目录然后去指定的文件夹下面找文件 然后将找到的文件发送给客户端 这个过程开启了 我们是否使用 sendfile 

      - 如果：
        - sendfile off
        - 当我们关闭的话 就会有 read write 两个过程 read就是nginx去read这个文件 将这个文件的内容加载到应用程序的内存里面 然后再发送给计算机的网络接口
        - 这个过程需要层层的复制
        - nginx读文件是一层复制 它复制完成后将数据复制到自己的内存里 然后还要将数据复制给网络接口 再由网络接口将数据推送给用户

        - sendfile on
        - 当客户端向nignx请求资源 当我们开启on之后 nginx不会去找资源 读资源 而是会向网络接口发送一个信号 网络接口读取文件 然后直接发送给客户端 **这里面减少了一次数据拷贝的过程** 

    \\ keepalive_timeout
      - 保持连接的超时时间
      - 如果想要保持长链接的话 一般从两个方向聊 一是客户端 二是代理端


**server**
- server模块
- server模块用来配置主机 一个主机和多个主机都可以配置在一个 nginx.conf 配置文件里面
- 一个 nginx 可以同时运行多个主机 一个server就代表一个主机 
- 一个主机就代表了它有一个独立的站点 有独立的根目录 互相不干扰 我们可以通过端口号的方式区别不同的主机

- 开启多个主机的方式叫做虚拟主机（别名：vhost）

**注意：**
- 上面说的server模块是配置主机 这里其实就是配置 站点 
- 一个server配置项就代表了一个站点的配置


  - 配置项:
    \\ listen
      - 服务器监听的端口号 是当前一个主机所监听的端口号

    \\ server_name
      - 当前这台主机的名字
      - 这里可以配置域名或者是主机名 
      - 配置主机名的时候 也必须是解析的了的主机名（当我们写域名的时候 会将域名解析为ip地址）比如 localhost 就能解析 因为系统文件中写着 localhost对应着 127.0.0.1

    \\ location
      - 这个是重点内容 会放在后面的章节里面再讲
      - 格式：

        location / {
          root html;
          index index.html index.htm;
        }

      - / 
        - 代表资源路径 当匹配上这个资源路径的时候（完整或者模糊匹配） 就会进入到 { } 的逻辑中

      - root
       - 当匹配上资源路径后 去root标记的目录中找对应的资源

      - root html 
        - html 这是一个相对路径 相对于当前 nginx.conf 配置文件
          | - use
            | - local
              | - nginx
                | - html
        ML目录 我们也可以将html目录改为其他的目录

      - index index.html index.htm;
        - 进入到 html 目录后 如果有这几个后缀的文件就进行展示

    \\ error_page
      - 比如值为 500 502 503 504 /50x.html
      - 发生服务端错误的时候 当发生 500 - 504 的错误码的时候 会定向到 /50x.html 这个地址展示里面的内容

      location = /50.html {
        root html
      }

      - 一旦用户访问 /50.html 的时候 会指向html目录 让它在这个目录下找 50x.html 文件

----------------

### 浏览器 nginx 与 Http协议
- 当我们拿到ip地址后 浏览器怎么向nginx发送请求呢
- 当电脑从dns服务器拿到ip地址 会发起tcp/ip请求 http协议在tcp/ip协议之上 
  http协议叫做高级的网络协议 
  tcp/ip叫做基础的网络协议

- tcp/ip协议能够包容一切上层的协议 
- nginx实现了http协议 浏览器也实现了http协议 协议就是双方商量好的一件事情 因为tcp/ip协议只能传递一些2进制的数据 这些数据以数据流的形式发送给目标服务器

----------------

### 虚拟主机的原理
- 当我们访问这台主机的时候 通过ip地址访问到 nginx 服务器上 http协议就将数据报文返回了 不管是以网页的形式还是以视频图片的形式  

- 当我们开启一个站点 其实并没有那么高的访问量 那这台主机的资源不就浪费了么 所以在早期的时候 我们将一台主机虚拟出来更多的主机

- 本来我们是需要通过域名来访问这台主机的 一个域名对应一个ip地址 那可以不可以将多个域名对应到一个ip地址上

- 然后由nginx服务端来判断你究竟想访问哪个域名 然后由nginx把你指向不同站点的目录

- 本质上你是想访问一些资源 我把资源归好类给你放到不同的目录下
- 比如
- 用户在访问atguigu的时候 http请求发送到nginx了 访问的域名是atguigu 然后将域名解析成了ip地址 通过ip发送数据报文到nginx nginx读到了请求之后去目录下找响应的资源(atguigu) 找到之后返回回去

- 上面的案例是很正常的一台主机的逻辑 如果是两个域名同时解析到了一个ip地址

- 这时候就要在http协议层上增加一些内容了 也就是要在请求的报文上(请求头)加上请求的域名是什么 因为请求目标的ip地址都是一样的(nginx服务器的ip)

- 但是我们在一台ip(nginx服务器)上绑定了两个域名 我们想区分这两个域名 把资源划分到不同的目录下 那就要在请求的时候除了ip地址还要在请求头中将实际的目标域名携带上

- 这时候nginx就能知道这个用户请求的是 某一个域名 这样nginx就可以去对应的目录找资源就可以了

- 这就是域名解析 和 虚拟主机相关的逻辑 具体的配置 下面再说

----------------

### 使用 host 文件解析域名
- 这个部分我们说下 域名解析
- 我们先配置本机的域名解析(这相当自己在自己的机器里面玩 外网访问不到的)

- 我们需要在 host 文件里面进行配置
<!-- 
  可以下载一个 everything 找文件很方便
 -->

- 老师是使用 windows 来示例的 hosts文件在下面的目录里面

  | - windows
    | - System32
      | - drivers
        | - etc
          - hosts


- mac系统的hosts文件在

  | - /
    | - etc
      - hosts

- 长下面这个样子
<!-- 
  ##
  # Host Database
  #
  # localhost is used to configure the loopback interface
  # when the system is booting.  Do not change this entry.
  ##


  127.0.0.1	localhost
  255.255.255.255	broadcasthost
  ::1             localhost

 -->

 - 比如 我们配置一下 虚拟机的域名
 - 我们虚拟机的ip地址为 192.168.25.101
 - 我们就可以在 hosts 文件里面这么配置
 <!-- 
  192.168.25.101 www.sam.com
  -->

- 在我们保存的时候 可能会弹出拒绝访问 这就是系统的问题 因为我们在系统的文件目录下 这里需要root的权限或者管理员的权限

- windows系统下
 - 1. 我们可以修改文件的权限
 - 2. 我们将hosts文件复制到桌面上 修改完了 再粘贴回去

- mac系统下
  - 我没尝试过

- 当我们配置完 hosts 后我们可以查看下我们配置的域名是否生效
- 终端: ping www.sam.com
- 这是在本机虚拟的情况下 解析ip地址
- 同理我们也可以通过这个域名访问到 nginx 站点

----------------

### 公共域名配置 和 泛域名解析
- 公共的域名可以在很多网站进行购买 比如阿里云
- 比如 我们现在在阿里云上购买了一个公共的域名 mmban.com
- 现在我们要将这个域名解析到虚拟机的ip地址上(往内网的ip解析也是可以的)

- 就是将 mmban.com 指向 192.168.25.101 这台主机上

- 这个部分 可以看下
- https://www.bilibili.com/video/BV1yS4y1N76R?p=15&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b

- 当我们利用公共的域名 解析到 虚拟主机(nginx服务器)上后 我们就可以通过公网访问nginx服务器了


> 泛域名解析
- 在阿里云的配置选项里面 写上这样的格式
- * .mmban.com
- 所有的二级域名都会解析到 192.168.25.101 这个ip地址上 这就是泛解析

- 这样不管二级域名是什么 都会指向同一个ip地址

----------------

### Nginx虚拟主机域名配置
- 这个部分我们在虚拟机中配置多个站点
- 我们虚拟机会有一个ip 虚拟机就相当于一台电脑 nginx 只是电脑中的一个软件
- 上面我们是通过虚拟机的ip 加上 nginx 监听的80端口 实现了输入ip地址 访问到了 nginx 服务器 呈现了 nginx 服务器的页面

- 下面我们就来配置多个站点

- 1. 进入到 根目录
- cd /

- 2. 在根目录下创建 www 目录 并进入 在这里创建几个站点
- mkdir site_one site_two
| - /
  | - www
    | - site_one
      - index.html
    | - site_two
      - index.html

- 3. 修改 nginx.conf 配置文件
- /usr/local/nginx/conf/nginx.conf

<!-- 
  不用担心我们把配置文件修改坏了 因为还有一个 nginx.conf.default 文件
  如果真的修改错了 我们还可以从这个默认的配置文件中 拷贝正确的东西
 -->

> 配置多个虚拟主机(相当于配置多个server配置项)
- 虚拟主机的配置是在 http 模块下的 server 配置项里面
- 其中 一个 server 配置项就代表着一个主机

- 方式1. 使用 不同端口号 标记不同的站点
- 这种方式不需要区分域名只需要配置不同的端口号而已
```js
// 主机1
server {
    listen       80;
    server_name  localhost;

    location / {
        root   html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}

// 主机2
server {
    listen       81;
    server_name  localhost;

    location / {
        root   /www/site_one;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}

// 主机3
server {
    listen       82;
    server_name  localhost;

    location / {
        root   /www/site_two;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

- 方式2. 我们还可以通过 server_name 来指定不同的域名(花钱了的那种域名)

----------------

### http模块下 server配置项下 server_name 选项 的匹配规则

> server_name 的匹配规则
- nginx会查看 server_name 的值 来进行匹配
- 如果有多个server配置项的话 会从上往下依次对server配置项进行匹配 如果匹配成功 则不会继续向下匹配
- 如果没有匹配上 会展示第一个server配置项里面的逻辑


> 要点
- 1. server_name的值 可以是多个
- 配置两个域名指向同一个主机(站点)
```js
http {
  server {
    server_name vod.mmban.com vod1.mmban.com;
  }
}
```

- 2. server_name的值 可以包含通配符
- 只要是2级域名都会指向同一个主机
```js
http {
  server {
    server_name *.mmban.com;
  }
}
```

- 3. server_name的值 可以包含正则 使用 ~ 开始
```js
http {
  server {
    server_name ~^[0-9]+\.mmban.com$;
  }
}
```

----------------

### 基于域名的几种互联网企业需求解析

> 多域名系统
- 实际场景中肯定会有很多不同的二级域名来访问我们的nginx服务器
- 比如
  - 微博的主域名: weibo.com
  - 我申请了微博的域名: sam.weibo.com

- 当客户端拿着 sam.weibo.com 去访问服务器的时候
- 1. 首先请求会到 nginx 服务器 
- 2. nginx服务器会通过反向代理 将这次请求交给 tomcat服务器
- 3. tomcat服务器会将 sam.weibo.com 域名字符串分解 提取出sam 去查询数据库
- 4. 取出sam的相关信息 tomcat将数据传送给 nginx
- 5. nginx向客户端返回响应


> 短网址
- 短网址: dwz.cn/asdfasdfhuhasdf

- 当我们输入短网址的时候 会跳转到真实的网址 这是怎么实现的？
- 其实 我们的短网址 是在一个运维的数据库里面 uuid就是短网址作为key value就是真实的域名
```js
DB
  短网址
    ↓
   UUID: 真实网址
```

- 当用户访问我们的nginx后 nginx会将这次请求打到后端的服务器上 它会拿着uuid的部分去数据库中进行匹配 拿到匹配的真实的网址后 进行redirect


> httpdns
- 之前我们说过 dns 服务器走的是 udp 协议
- httpdns 走的是 http 协议

- 用户在请求我们的服务器之前 会将域名解析出来 dns服务器走udp协议 它会去全网进行广播

- httpdns走的是http协议 既然是走http协议那么就要保证几点
- 1. 必须要有 ip地址
- https://www.bilibili.com/video/BV1yS4y1N76R?p=18&spm_id_from=pageDriver&vd_source=66d9d28ceb1490c7b37726323336322b

----------------

### 反向代理 > Nginx隧道式模型 网关 代理 反向代理

> 反向代理

  用户 -> 互联网 -> 网关路由 -> Nginx <-> 应用服务器

- 用户通过互联网打到机房的网关路由上 它会把请求具体的转发到一台服务器(nginx)上
- 如果这台 nginx 作为反向代理服务器的话 它会把用户的所有请求相关信息转发到后台的应用服务器(tomcat)
- tomcat是不会被用户直接访问到的

- 上面的图是 nginx和tomcat 形成了一块内网 而tomcat服务器无法接入外网 也就是说 用户想要直接访问tomcat服务器是不行的 它要通过nginx将请求转发给tomcat

- 然后tomcat再将相应的结果返回给 nginx 由nginx将响应 响应会前端


> 要点:
- 正向代理 和 反向代理 就是站在的角度不同


- 正向代理 靠近客户端(帮客户端做事)
- 反向代理 靠近服务端(帮服务端做事)


> 正向代理
- 用户无法直接访问某台web服务器 但代理服务器可以访问
- 代理服务器帮助用户请求页面 并将页面返回给用户

**注意:**
- 用户只需要浏览器设置代理服务器ip和端口即可 用户知道代理服务器和web服务器的存在

- 场景:
- 比如我们国内要访问谷歌 会借助工具

- 场景2:
- 和租房子很像。
- 租房子的时候，一般情况下，我们很难联系到房东，因为有些房东为了图方便，只把自己的房屋信息和钥匙交给中介了。而房客想要租房子，只能通过中介才能联系到房东。*而对于房东来说，他可能根本不知道真正要租他的房子的人是谁，他只知道是中介在联系他。*

- 这里面一共有三个角色，
  租客（用户）
  中介（代理服务器）
  房东（国外网站，目标服务器）。
  
- 引入中介（代理服务器）的原因是用户无法联系上房东（用户无法访问国外网站）。

> 总结:
- 正向代理是代理客户端去和目标服务器进行交互

> 正向代理的用途
- 1. 突破访问限制 
- 通过代理服务器，可以突破自身IP访问限制，访问国外网站，教育网等

- 2. 提高访问速度
- 通常代理服务器都设置一个较大的硬盘缓冲区，会将部分请求的响应保存到缓冲区中，当其他用户再访问相同的信息时， 则直接由缓冲区中取出信息，传给用户，以提高访问速度

- 3. 隐藏客户端真实IP
- 上网者也可以通过这种方法隐藏自己的IP，免受攻击。


> 反向代理
- 是指以代理服务器来接受Internet上的连接请求
- 然后将请求转发给*内部网络上的服务器* 并将从服务器上得到的结果返回给Internet上请求连接的客户端

- 此时代理服务器对外就表现为一个反向代理服务器。

- 场景:
- 租房
- 用户直接找到房东租房的这种情况就是我们不使用代理直接访问国内的网站的情况。

- 还有一种情况，就是我们以为我们接触的是房东，其实有时候也有可能并非房主本人，有可能是他的亲戚、朋友，甚至是二房东。但是*我们并不知道和我们沟通的并不是真正的房东*。*这种帮助真正的房主租房的二房东其实就是反向代理服务器*。这个过程就是反向代理。


- 用户访问web服务 并不知道访问的是代理服务器 用户以为代理服务器就是web服务器
- 代理服务器将web服务 返回给用户

**注意:**
- 用户浏览器不需要做任何设置 用户访问代理服务器就等于访问web 用户并不知道真实的web服务的村那你在

> 总结:
- 反向代理 就是代理服务器代理了目标服务器 去和客户端进行交互

- 对于常用的场景，就是我们在Web开发中用到的负载均衡服务器
  客户端（租客）
  负载均衡服务器（二房东）
  真正的服务器（房东）

- 客户端（租客）发送请求到负载均衡服务器（二房东）上，负载均衡服务器（二房东）再把请求转发给一台真正的服务器（房东）来执行，再把执行结果返回给客户端（租客）。


> 反向代理的用途
- 1. 隐藏服务器真实IP
- 使用反向代理，可以对客户端隐藏服务器的IP地址。
- 即，租客并不房东知道的真实身份。

- 2. 负载均衡
- 反向代理服务器可以做负载均衡，根据所有真实服务器的负载情况，将客户端请求分发到不同的真实服务器上。
- 即，二房东发现房主本人很忙，于是找到房主的妻子帮忙处理租房事宜。

- 3. 提高访问速度
- 反向代理服务器可以对于静态内容及短时间内有大量访问请求的动态内容提供缓存服务，提高访问速度。
- 即，二房东同样有房屋信息和钥匙。

- 4. 提供安全保障
- 反向代理服务器可以作为应用层防火墙，为网站提供对基于Web的攻击行为（例如DoS/DDoS）的防护，更容易排查恶意软件等。还可以为后端服务器统一提供加密和SSL加速（如SSL终端代理），提供HTTP访问认证等。
- 即，二房东可以有效的保护房东的安全。


> 正向代理和反向代理的区别
- 虽然正向代理服务器和反向代理服务器所处的位置都是客户端和真实服务器之间，所做的事情也都是把客户端的请求转发给服务器，再把服务器的响应转发给客户端，但是二者之间还是有一定的差异的。

- 1. *正向代理其实是客户端的代理*，帮助客户端访问其无法访问的服务器资源。*反向代理则是服务器的代理*，帮助服务器做负载均衡，安全防护等。

- 2. *正向代理一般是客户端架设的*，比如在自己的机器上安装一个代理软件。*而反向代理一般是服务器架设的*，比如在自己的机器集群中部署一个反向代理服务器。

- 3. *正向代理中，服务器不知道真正的客户端到底是谁*，以为访问自己的就是真实的客户端。*而在反向代理中，客户端不知道真正的服务器是谁*，以为自己访问的就是真实的服务器。

- 4. 正向代理和反向代理的作用和目的不同。*正向代理主要是用来解决访问限制问题(为客户端解决问题)*。*而反向代理则是提供负载均衡、安全防护等作用(为服务端解决问题)*。二者均能提高访问速度。

------

> 网关:
- 比如我们访问互联网的时候 比如我们用手机访问互联网 那么数据包都会全部的发送给路由器

- 然后由路由器转发请求给下一个网络的路由或者中继或者是网关服务 这样一跳接一跳的 跳到目标服务器的位置 目标服务器再收到请求后再一跳一跳的返回来

- 我们接触的最开始的网关就是家里面的路由器


> 网关和代理服务器的区别
- 其实代理服务器就是网关 访问网络的入口就是网关 我们绕不过去 比如学校的大门

> 网关的特点
- 所有的请求都会经过网关 
- 比如用户访问资源 是请求先到路由器 由路由器转发到 服务器
- 服务器响应的结果 也是先到路由器 由路由器转发到 客户端


> 问题:
- 这样就会造成一个问题 当流量比较大的时候 如果网关服务它的上限带宽不够大的话 不够足的话 就有可能在 网关这就被阻塞住了

- 比如我们的路由器有10m 带宽有100m 但是没有办法 因为路由器只有10m 我们的下载速度也会卡在这 请求越多就会越卡

- nginx也一样 nginx的带宽就是后面服务器集群的带宽 即使集群有1000m但是也得看nginx的带宽

- 所以在比较高的io操作(io请求)下 nginx做反向代理 就不是那么合适了
- nginx的瓶颈特别的明显就是数据传输的模型 这种数据传输的模式称之为 隧道式

    用户  <-->  代理服务器(网关)  <-->  服务器

- 这种隧道式代理就是一进一出必须走这么一个口

> 怎么避免上述的问题？
- 用户请求打到代理服务器上 代理服务器把请求转发给后端服务器
- 而后台服务器直接把数据给用户 
- 进去的时候 请求要过下代理服务器 但是响应的时候就不再走代理服务器

- 这个功能是 lvs 提供的功能 它的性能比 nginx 还要高 但是 lvs的功能要比nginx简单的多

- lvs是专业的负载均衡器 在反向代理的时候既可以做隧道式的方向代理 还可以用 DM模型(请求经过代理服务器 响应不经过代理服务器 直接给用户)
- 这时候应用服务器就不是在内网环境中了
- lvs嵌套在nginx内核里面了 不需要额外装软件就可以用lvs

----------------

### QPS
- 老师做的项目中使用了 nginx 做了反向代理 成果就是后面3台tomcat服务器 能抗住 300的并发量(QPS)

- QPS关于并发量网上的文章动不动就上万上亿 正常的企业项目 并发量有300 已经很不错了

- 并发量: 每秒有300个人同时去点击

> 隧道式架构适合小型项目 传统的互联网项目

----------------

### 负载均衡
- 如果有一个女朋友 一周使用是没有问题的 但是一个月的话可定有几天不能用的情况

- 这时候我们可以找一群女朋友备份 当一个女朋友没有办法完成请求的时候 可以去找另一个女朋友

<!-- 
  □: 服务器

              □ A
    nginx     □ B
              □ C
 -->

- 当nginx做转发的时候 如果A服务器不可用了 那就可以让A服务器下线 将请求转发到另一台服务器上

- ABC三台服务器上的内容应该是一模一样的 像这样需要被负载均衡的服务器 我们称之为服务器的集群


> 集群:
- 全都是一模一样的服务器 因为是复制出来的 称之为集群 我们在访问的时候访问任意一台 它能够提供的服务器都是一样的


> 负载均衡的特点:
- 1. 故障转移 一旦一台服务器不可用的时候 可以将请求转到另一台服务器
- 2. 可以将 ABC 同时对外提供服务 不至于把一个给累死

----------------

### 配置反向代理服务器
- 前置工作:
- 我们的虚拟机里面就一个系统现在 这一个系统对应