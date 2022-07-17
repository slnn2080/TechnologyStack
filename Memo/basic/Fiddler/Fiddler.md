### Fiddler简介
- 它是测试必会的一种工具

- Fiddler是位于客户端和服务器端的 *http代理*
- 目前最常用的http抓包工具之一 功能非常强大 是web调试的利器

- 1. 监控浏览器所有的http/https流量(请求)
- 2. 查看分析请求内容细节
- 3. 伪造客户端请求和服务器响应(骗子)
- 4. 测试网站的性能
- 5. 解密https的web会话
- 6. 全局 局部断点功能
- 7. 第三方插件


> 使用场景
- 接口调试
- 接口测试
- 线上环境调试
- web性能分析
- 判断前后端bug
- 开发环境 hosts 配置
- mock
- 弱网断网测试


**注意:**
- 刚安装fiddler的时候是抓不到https包的 需要做配置

----------------

### Fiddler的原理

> B/S架构
- 编写程序部署到 web 服务器 web服务器运行在服务器上(后端开发人员会将写好的程序运行部署到服务器上) 
- 并绑定ip地址并监听某端口 接收 和 处理 http请求 客户端通过 http 协议获取服务器上的 网页 文档 接口等资源

<!-- 
                request
  web client  --http协议-- >  http server
                response
 -->

- 比如 http server 里面装的 tomcat(部署前端项目 提供服务用的容器)


- 上面是正常的用户访问服务器资源的图解 当我们使用 fiddler 的时候相当于 fiddler 在 客户端 和 服务器中间插了一脚
<!-- 
  client  < -- >  Fiddler  < -- >  server
 -->

- 不管是 客户端 到 服务器的请求 还是 服务器 发回 客户端的数据 fiddler 都能够监听到

- 那fiddler为什么能够监听到呢？比如我们使用的是谷歌浏览器 谷歌浏览器默认会去读系统代理 而fiddler一打开就会设置一个系统代理
<!-- 
  在 fiddler工具的
    - Tools
      - options
        - connections

  这里面 fiddler 监听的端口是8888
  ✅ act as system precess startup
 -->

- fiddler 一打开就会作为系统的代理 像谷歌浏览器 和 ie浏览器默认读的就是系统代理

- fiddler的端口是8888
- fiddler作为代理服务器它的地址是 本机:8888

- 谷歌浏览器的配置
  - 设置
    - 高级
      - 系统
        - 打开代理设置
          - 局域网 LAN 设置
            - 局域网设置
              - 代理服务器
              ✅ 为LAN使用代理服务器
              (上网的时候找的是一个代理服务器帮我去上网的服务器 而不是我们直接向服务器发起请求)
                - 高级
                  - 我们可以发现不管是http 还是 https 使用的代理服务器的地址都 本机:8888
                  (这是代理服务器就是fiddler)


- 就是代理上网的服务器设置成了fiddler 当我们把fiddler关掉后 我们再看下代理设置 发现

  - ❎ 为LAN使用代理服务器 前面的对号没有了

- 这就是fiddler的原理 只要我们一打开它就会去修改系统代理 浏览器一打开默认读的就是系统代理 就会将fiddler作为代理服务器 我们上网都会通过代理服务器来完成 所以它会抓取到客户端和服务器之间的通信

**firefox**
- 上面是 谷歌和ie 的情况 当浏览器是火狐的时候 我们就需要做额外的设置了 我们需要自己去设置代理


**抓不了小程序的包**
- 因为小程序会做一层封装 所以抓不了 包括app上抓包也越来越难

----------------

### HTTP相关
- 我们可以通过 fiddler 将一次请求导出到 txt 文档中

- 请求条目上右键
  - save
    - selected session
      - as text 

```js
// 请求报文
GET http://test.lemonban.com/ningmengban/app/login/login.html?date=2 HTTP/1.1
Host: test.lemonban.com
Connection: keep-alive
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9

---

// 响应报文
HTTP/1.1 200 OK
Server: nginx/1.4.2
Date: Sun, 17 Jul 2022 05:44:21 GMT
Content-Type: text/html;charset=UTF-8
Connection: keep-alive
Last-Modified: Wed, 19 Jun 2019 08:07:44 GMT
Content-Length: 5431

// ... 响应体
```

> 请求头部
- 附加的信息 告诉服务器 这次请求携带的关键信息 
- 请求头可以是任意内容 关键就看服务器想要什么内容 比如服务端可能固定前端必须要发送哪些请求头

> 常见的请求头:
> Host:
  主机ip地址 或 域名

> User-Agent:
  客户端相关信息 如操作系统 浏览器等信息

> Accept:
  指定客户端接受信息的类型 如: image/jpg

> Accept-Charset:
  客户端接受的字符集 如 gb2312

> Accept-Encoding:
  可接受的内容编码 如 gzip压缩格式 节省传输流量

> Accept-Language:
  客户端接受的语言环境 zh-cn
  但是服务器端可以返回英文之类的 这个只是用于服务端来判断 并不是必须是什么类型的语言
  也要客户端能解码就可以

> *Authorization*:
  客户端提供给服务器 进行权限认证的信息

> cookie:
  携带的cookie信息

> Referer
  当前文档的url 从哪个链接过来的
  该次请求是从哪个链接过来的 
  比如 
  post /login http/1.1
  向 /login 接口 请求
  从 referer 就能看到 这次请求来自于哪个链接

> Content-Type
  请求体内容类型 如 application/x-www-form-urlencode
  传递给服务器的内容是什么格式

> Content-Length
  数据长度 字节 byte

> Cache-Control
  缓存机制 

> Pragma
  放置页面被缓存 和 cache-control: no-cache 作用一样

---

> 响应头部
- 来自于服务器的附加信息

> 304 not modifyed
- 意味着 请求回来的东西 是没有变化的不用重新去服务器请求 文档已经缓存到本地 走本地缓存

- 这时候我们再查看 响应体 会发现什么也灭有
<!-- 
  通过请求头的信息 浏览器发现你请求的内容 和 本地的内容是一模一样的 就不需要服务器再发回来给我们了
 -->


> 常见的响应头
> Server
  HTTP服务器的软件信息

> Date
  响应报文的时间

> Expires
  指定缓存过期时间

> Set-Cookie
  设置 Çookie

> Last-Modified
  资源最后修改时间 通过这个时间会进行比对 可以判断资源有没有改变 没有改变就304

> Content-Type
  响应的类型和字符串集

> Content-length
  内容长度 响应体长度 byte

> Connection
  如 keep-alive 
  表示保持tcp连接不关闭 不会永久保持连接 服务器可设置

> Location
  指明重定向的位置 新的URL地址 如304的情况


> 响应体可以是任意格式
- 我们可以根据响应体来判断请求有没有被正常的处理

----------------

### Fiddler安装相关
- http的网站：
- test.lemonban.com/ningmengban/app/login/login.html

- fiddler的面板组成
- 左侧： 监控面板(会话列表)
- 上边： 菜单栏 和 工具条
- 右侧： 辅助标签 + 工具条
- 下边： 命令行 + 状态栏

- 1. 安装的话很简单 直接下一步就可以 安装完毕后 打开fiddler会提示英文 选择no


> 菜单栏的相关信息
> file
- Capture Traffic：
- 开启 关闭 捕获请求

- New View
- 打开新的视图界面

- Load Archive
- 加载 打开已存储的请求数据

- Recent Archives
- 最近存储的请求数据

- save
- 保存会话

- import Sesstion
- 导入会话

- export Sesstion
- 导出当前会话


> Edit
- copy
- 复制
  - session
  - 复制选中的会话

  - just url
  - 复制url

  - headers only
  - 复制头部信息

  - full summary
  - 复制整个session列表数据

  - terse summary
  - 复制session的简要说明


- remove
- 移除
  - selected sessions
  - 移除选中的session会话

  - unselected session
  - 移除未选中的会话 session

  - all session
  - 移除所有的session会话


- paste as sessions
- 将复制的session粘贴回来

- mark
- 用颜色 删除线标记会话

- unlock for editing
- 解锁session

- find sessions
- 搜索session


> Rules
- Hide Image Requests：
- 隐藏图片请求，session中不显示这类请求

- Hide CONNECTs：
- 隐藏CONNECT方法请求，session中不显示这类请求

- Automatic Breakpoints：
- 自动断点
  - Before Requests：
  - 在请求之前进行断点，多用于修改传递给服务器的请求内容

  - After Requests：
  - 在请求之后进行断点，多用来修改返回给客户端的响应内容

  - Disabled：
  - 禁用断点功能

  - Ignore Images：
  - 忽略图片请求

- customize Rules
- 自定义规则
- 打开Fiddler ScriptEditor工具，调取脚本操作，用于网络修改、抓取某些如websoket包的修改，以及其它自定义的使用

- require proxy authentication
- 要求代理认证
- 勾选该项，则所有未提交require proxy authentication的请求头的请求都会返回HTTP/407响应，要求客户端安装证书

- apply gzip encoding
- 请求gzip编码
- 请求GZIP编码，勾选该项，则只要请求头包含了gzip标志的Accept-Encoding请求头都会1对除了图片以外的请求使用GZIP HTTP进行压缩

- remove all encodings
- 删除所有编码
- 删除所有响应请求的http内容编码和传输编码

- hide 304
- 隐藏304请求
- 隐藏所有304请求，不在session中展示

- request japanses content
- 以日语发送请求
- 将所有请求头转换为ja标志，标志客户端希望以日语的形式发送

- automatically authenticate
- 自动认证
- 自动进行验证

- user-agents
- 选择用户代理
- 选择相应的用户代理模式（即你是用的浏览器信息），默认是diasbled

- performance
- 影响web性能的简单选项
  - Simulate Modem Speeds：
  - 模拟调制解调器速度，会使所有下载数据延迟150ms/kb

  - Disable Caching：
  - 删除所有 If-None-Matc h和 If-Modified-Since 请求头，并添加Pragma:no-cache请求头；还会删除Expires头，并将Cache-Control设置成no-cache。但浏览器还是可以重用之前浏览器所缓存的响应


> Tools
- options
- 抓包设置选项

- WinINET Options…：
- 打开IE浏览器的option进行设置

- Clear WinINET Cache：
- 清空IE和其它应用中使用WinINET的缓存文件

- Clear WinINET Cookies：
- 清空IE和其它应用中使用WinINET的cookies文件

- TextWizard：
- 文本向导工具，可将text文本encode和decode

- compare sessions
- 比较session

- reset script
- 重置脚本

- sandbox
- sanbox官方文档

- view ie Cache- 查看本地文件ie缓存

- win8 loopback exemptions
- 回环豁免

- new session clipboard
- 打开一个新的剪切板

- hosts
- 主机重定向工具


> Options面板详解
> 选项卡 - General
- notify me for updates on startup
- 更新时进行提醒

- offer upgrade to beta versions
- 提供升级至测试版本

- enable ipv6 
- 允许ipv6

- partcipate in the fiddler improvement program
- 参与到改善fiddler的过程中

- enable high-reolution timers
- 启用高分辨率计时器

- auto matically stream audio and video
- 音频 视频自动选择流模式

- if protocol violations are observed 
- 如果协议产生冲突 发出严重警告提示


> 选项卡 - HTTPS
- capture HTTPS CONNECTS
- 捕获https请求

- decrypt https traffic
- 通过认证等级引擎生成整数
  - form all processes
  - 捕获所有https请求

  - from browsers only
  - 仅捕获浏览器的https请求

  - from non-browses only
  - 除了浏览器的https请求不捕获 其它https请求均捕获

  - from remote dients only
  - 仅捕获远程客户端的https请求

- ignore server certificate errors
- 忽略系统证书问题

- check for certificate revocation
- 检查证书是否被撤销

- skip decryption for the following hosts
- 设置不被捕获的hosts


> 选项卡 - connections: 连接设置
- capture ftp requests
- 捕获ftp请求

- allow remote computers to connect
- 允许远程电脑连接

- reuse client connections
- 允许客户端连接

- reuse server connection
- 允许服务器连接

- act as system proxy on startup
- 启动时自动更新脚本

- monitor all connections
- 监听所有连接


> Gateway - 网关设置
- use system proxy
- 使用系统代理

- automatically detect proxy using wpad
- 使用 wpad 自动监测代理

- manual proxy configuration
- 手动配置代理

- no proxy
- 无代理


> Perfomance
- show memory panel in status bar
- 在状态栏中显示内存面板

- parse websocketMessage
- 解析websocket消息

- stream and forget bodies over 
- 设置body最大数据量

- if client aborts while streaming
- 设置客户端在数据流处理时终止方案





> 配置 fiddler 位置
- Tools
  - options


> 配置 fiddler 端口
- Tools
  - options
    - Connections 
      - port: 默认8888


> 不让fiddler做系统代理的配置
- Tools
  - options
    - Connections
    - Act as system proxy on startup

- 如果需要开起 fiddler 后让其自动作为系统代理 则前面打上 √ 反之则 不打 这种情况下需要我们自己配置




> 监控面板 - 相关说明
- host：
- Tunnel-to: 中间建立通道的请求


> 强制刷新清缓存
- F12 - 刷新按钮上右键 - 去缓存刷新


> 清除 选中的 请求项 之外 的请求项
- shift + del


> 查看 请求条目 
- 双击该条目 该请求条目分为上下两块展示区 上面是请求 下面是响应 
- 我们上下两块展示区 都选择 Row 模式展示(原始)


> 乱码
- 我们可以看下 响应回来的数据的 Content-Type: text/html; charset=GBK
- 那当我们用UTF-8来看的话就是乱码
