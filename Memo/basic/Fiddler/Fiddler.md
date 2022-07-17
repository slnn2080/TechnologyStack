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

### 技巧:
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


> fiddler中去掉缓存
- Rules选项卡
  - 

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