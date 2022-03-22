### idea 创建 web工程
- New Project - web

### web工程下 创建html
- 项目根目录下 右键 创建 html文件

### 什么是javaweb
- JavaWeb 是指，所有通过 Java 语言编写可以通过浏览器访问的程序的总称，叫 JavaWeb。JavaWeb 是基于请求和响应来开发的。

> 请求:
- 客户端给服务器发送数据 叫请求 request

> 响应:
- 服务器给客户端回传数据 叫响应 response

> 请求和响应的关系
- 请求和响应是成对出现的 有请求就有响应

> web资源的分类
- 所有浏览器可以访问的资源
- web资源按实现的技术和呈现的效果的不同 又分为静态资源和动态资源

- 静态资源:
  html css js txt mp4 jpg 
  固定永远不变的东西

- 动态资源:
  jsp页面 servlet程序 asp php...

----------------

### Tomcat
- 它是服务器容器
- 我们可以在这个容器中安装一个个web项目

- 我们把web项目丢到容器里面的过程称之为 部署 deploy


> 常用的服务器
- Tomcat:
- 由 Apache 组织提供的一种 Web 服务器，提供对 jsp 和 Servlet 的支持。

- 它是一种轻量级的 *javaWeb容器*(服务器)，也是当前应用最广的 JavaWeb 服务器(免费)。
<!-- 
  以后遇见jsp容器等 指的就是web服务器
 -->


- Jboss:
- 是一个遵从 JavaEE 规范的、开放源代码的、纯 Java 的 EJB 服务器，它支持所有的 JavaEE 规范(免费)。


- GlassFish: 
- 由 Oracle 公司开发的一款 JavaWeb 服务器，是一款强健的商业服务器，达到产品级质量(应用很少)。


- Resin:
  - 是 CAUCHO 公司的产品，是一个非常流行的服务器，对 servlet 和 JSP 提供了良好的支持， 性能也比较优良，resin 自身采用 JAVA 语言开发(收费，应用比较多)。


- WebLogic:
- 是 Oracle 公司的产品，是目前应用最广泛的 Web 服务器，支持 JavaEE 规范， 而且不断的完善以适应新的开发要求，适合大型项目(收费，用的不多，适合大公司)。


> Tomcat服务器
- Tomcat服务器不同的版本实现了不同的java ee 也跟servlet有不同版本的对应关系

- 当前企业常用的jdk版本 7.x / 8.x
<!-- 
  Tomcat    servlet/jsp   java ee   jdk
  4.1       2.3/1.2       1.3       jdk1.3
  5.0       2.4/2.0       1.4       jdk1.3

  5.5
  6.0       2.5/2.1       5.0       jdk5.0

  --- 

  7.0       3.0/2.2       6.0       jdk6.0 
  8.0       3.1/2.3       7.0       jdk7.0 
 -->

- 2.5版本的Servlet -- xml配置 (使用最多的版本)
- 3.0版本的Servlet -- 注解

- 以 2.5 版本为主线讲解 Servlet 程序。


> Tomcat的使用
- https://tomcat.apache.org/download-80.cgi

- 安装步骤:
- https://www.jianshu.com/p/69496fb3495e


> Tomcat的目录解析:
- bin:
  专门用来存放 tomcat 可执行程序

- conf:
  专门用来存放 tomcat 服务器的配置文件

- lib:
  专门用来存放 tomcat 服务器的jar包

- logs:
  专门用来存放 tomcat 服务器运行时输出的日记信息

- temp:
  专门用来存放 tomcat 服务器运行时临时的数据

- webapps:
   部署空间 我们部署项目就可以部署到这里
  专门用来存放部署的web工程(用来放我们的工程的)
  这里面一个目录就是一个工程

- work:
  是 Tomcat 工作时的目录 用来存放 Tomcat 运行时jsp翻译为 servlet的源码 和 session钝化的目录(钝化就是序列化 把一个对象写入磁盘上)


> 如何启动 Tomcat 服务器
- 进入到 Tomcat/bin 路径下:
- cd /Library/Tomcat/bin

> 访问方式:
- 1. localhost:8080
- 2. 127.0.0.1:8080
- 3. 192.168.3.3:8080
<!-- 
  本地地址的方式 可以让局域网内的人看到效果
 -->


> 开启 Tomcat:
- sudo sh ./startup.sh
<!-- 
  到 bin 目录下 找到 startup.bat 双击 windows 
 -->

> 关闭 Tomcat: 
- sh ./shutdown.sh
<!-- 
  到 bin 目录下 找到 shutdown.bat 双击 windows
 -->


> 修改Tomcat的端口号
- Tomcat默认的端口号: 8080

- 1. 找到 Tomcat目录下的 conf 目录
- 2. 找到 server.xml 配置文件
- 3. 找到 <Connector port="8080"> 修改port属性

- 修改完端口号后一定要*重启Tomcat服务器*
<!-- 
  http协议默认的端口号是80
  www.baidu.com:80
 -->


> 如何将 Web工程部署到 Tomcat 服务器上
- Tomcat是服务器 服务器上可以放一个工程 供很多人去访问

- 我们在访问 localhost:8080 的时候 访问到的其实就是 webapps目录

- 如果我们要访问指定的工程 那么直接在后面加上工程名即可
- localhost:8080/books/index.html


> 方式1:
- 在 Tomcat8/webapps/ 下手动创建目录
  - Tomcat8/webapps/
    - 工程名(baidu)
      - WEB-INF(必须叫这个名字)
      - 同级目录下放置 web工程里面的资源(html等)


> 方式2:
- 将 web工程目录拷贝到 Tomcat/webapps 目录下即可
<!-- 
  | - books
    - index.html

  把 books文件夹 丢到 webapps 目录下就可以
 -->


> 方式3:
- 修改配置文件
- 1. conf
    - catalina
      - localhost
        - 建立 工程名.xml 文件

- 一个xml文件代表一个工程

- 模板(复制粘贴调整用):
```xml
<Context path="/web03" docBase="E:\IdeaProjects\JavaWeb\out\artifacts\web03_war_exploded" />
```

- Context:
  表示工程上下文

- path: 
  表示工程的访问路径
<!-- 
  比如我们在 
    conf/catalina/localhost/test.xml
  
  建立了 test.xml 文件
  那么 path="/test"
 -->

- docBase:
  指定我们工程的路径
<!-- 
  比如我们的工程在桌面上 那么该路径就指定桌面上的路径
 -->

- 首先 我们在 /localhost/ 创建一个 pro.xml 文件 该文件的名字就是工程名

- 然后 path属性的值 设置为 "/pro"
- 最后 docBase属性的值 指向我们文件(项目文件夹)的存放地址

- 要重启 Tomcat服务器 后才会生效


> 使用方式3的访问路径
- ip:8080/xml文件名/index.html
- 我们上面 path = "/pro" 这个pro相当于映射到了我们项目文件夹上 所以我们要通过 /pro/指定要访问的目录

**注意:**
- xml文件的编码格式必须是 utf8


> 用鼠标拖拽html页面到浏览器访问 和 通过网址输入访问的区别
- 鼠标拖拽访问:
  这个时候浏览器的地址如下:
  file:///E:/books/index.html

  - 上面使用的协议时 file协议

- file协议:
- 表示告诉浏览器直接读取file:后面的路径 解析展示在浏览器上即可 *它是不走网络的*


- 键入网址访问:
- http://ip:port/工程名/资源名

  - 上面使用的协议时 http协议

- http协议:
  http: 是协议
  localhost: 是ip地址
  8080: 端口号
  /books: 是工程名
  /index.html: 是文件

- 浏览器发送请求向服务器发送请求
- 服务器收到请求之后 读取你要访问的资源文件 然后回传给客户端要的页面内容

- 客户端收到服务端返回的index.html内容 解析展示在浏览器上


> 小结
- 通过 http://ip:port 找到tomcat服务器
- 通过 /工程名 找到对应的web工程
- 通过 /资源名 找到对应的资源


> Root的工程的访问
> 默认index.html页面的访问
- 在 webapps 目录下 有一个Root工程

- 当我们在浏览器地址栏输入访问地址:
- http://ip:port/

- 我们没有在端口号的后面加上工程名的时候 默认访问的是Root工程
<!-- 
  ROOT/index.jsp -- 就是tom猫的那个网页

  jsp页面是动态页面 必须依托于服务器 不想html页面可以直接拖到浏览器里打开
 -->

- 当我们在浏览器地址栏输入访问地址:
- http://ip:port/工程名/

- 我们*没有在工程名后的后面加上资源名的时候 默认访问的是 index.html* 


> 整合 idea 和 Tomcat 服务器
- 1. ctrl + , 
      - build, execution deployment
        - application servers

- 2. 
- 点击 + 添加 Tomcat server
- tomcat home 指定 Tomcat目录的位置 
- /Library/Tomcat



- 3. 我们在idea里面 创建module
- 4. 在弹出的对话框中选择 动态工程 
  - java enterprise
  - application server: 选择 Tomcat
  - project template: web application
  - jdk: 这里选的1.8

<!-- 
  我的做法是: ！！！
  - 正常创建一个module 选择的java
  - 然后在module上右键 add framework
  - 然后选择 web application
 -->

> 动态web工程目录结构是:
  | -  module名: TomcatTest

<!-- 存放自己编写的java源代码 -->
    | - src
    

<!-- 存放web工程的资源文件 比如html css js -->
    | - web

<!-- 
  它是一个受服务器保护的目录 浏览器无法直接访问到此目录的内容 
-->
      | - WEB-INF

<!-- 
  是整个动态web工程的配置部署描述文件 配置文件 
  可以在这里配置很多web工程的组件 比如 
    servlet程序
    filter过滤器
    listemer监听器
    session超时
-->
        - web.xml
      - index.jsp

    - TomcatTest.iml


- 我们习惯的做法是 在 | - WEB-INF 下面 创建 lib文件夹 用来存放jar包
- 整理:

  | -  module名: TomcatTest

    | - src

    | - web
      | - WEB-INF

<!-- 
  用来存放第三方的jar包 idea还需要自己配置导包 
-->
        | - lib
        - web.xml
      - index.jsp

    - TomcatTest.iml


> html等资源文件要和 web 目录同级

  | - src
  | - web
    | - WEB-INF
      - web.xml
  
  - .html等

> 那如何将 web项目部署到 tomcat呢？
- 点击 edit configurations
- 添加 local 的tomcat 实例
- 点击 deployment 将web项目部署到idea上
- application context 就是服务器上的web工程名 也是我们指定web工程的入口

- 一般情况下 我们会将 application context 修改为 /

- 我们这里先改成了 /project

- 然后初始面板的url为
- http://localhost:8080/project/hello01.html
- 这样打开浏览器后 默认就是打开这个网址

- on update action: redeploy 热部署
- on frame deactivation: update classes and resources


> 另一种方式将module指定为web工程
- 选中module
- ctrl + ;
- facets
- 点击 + 选择 web 选择给哪个module添加 web模块

- 注意:
- deployment descriptors 选择到 web.xml
- web resouce directories 选择到 web文件夹

   
> 如何给 web动态工程添加 第三方的jar包
- 上面我们在工程里面创建了一个module 然后将它转换成了web动态工程 TomcatTest
- 现在我们看看怎么给它添加 第三方的jar包

- 1. 首先将jar包放入到 WEB-INF 下面的 lib文件夹内
- 2. 
  - 方式1. 选择这两个jar包 右键 add as library
  - 方式2. 
    - ctrl + ;
    - libraries
    - 点击 + 
    - 选择 JAVA (添加到类库的作用)
    - 找到我们jar的位置 选上所有的jar包
    - 将jar包添加到类库后 将jar指定给哪个module使用 选择我们指定的web工程

- 3. 选择 artifacts 点击 fix


> 如何在idea上部署工程到Tomcat上运行 
- 也就是我们上面创建的 TomcatTest 怎么在 tomcat服务器上跑起来

- 当我们每创建一个web工程的时候 会伴随着创建一个tomcat实例 在工具栏的位置上 小绿色锤子的旁边

- 这个选项里面有一个 edit configurations 用来配置
- 1. tomcat实例的名称:
  - 建议同工程名一致

- 2. 修改 删除 tomcat实例管理的web工程
- 3. 设置启动tomcat实例后 默认打开的网址

<!-- 
  但是我们的web工程越多 实例就越多 我们建议给实例改下名字

  1. 修改 Tomcat 运行实例名称:
  - 点击 edit configurations 修改为和我们工程名一致

  Tomcat 8.5.77 -> TomcatTest


  2. 在同面板 点击 deployment选项卡
  - 这个选项卡 可以指定 这个tomcat实例同时运行几个web工程
  - 将我们需要部署的web工程 使用 + 添加到这个tomcat实例中(默认就是当前的web工程 还可以删除不需要的web模块)

  - 在下面有一个 application context 这个部分指定的是工程路径

  - 默认的是这样的 /Tomcat_war_exploded


  3. 在同面板 里有一个 url 选项 
  - 作用:
  - 启动tomcat运行实例时 默认打开访问的地址
  - http://localhost:8080/
 -->


> 在idea中如何运行 和 停止 tomcat实例
- 如何启动 上面的 绿色小锤子的右侧 有 播放箭头
- 播放键:
  - 正常启动 tomcat 实例

- 小臭虫:
  - debug启动 tomcat 实例

- 红色方框
  - 停止 tomcat 实例

- 重启播放:
  - update resources
    - 重新更新web工程中的资源到tomcat运行实例中

  - update classes and resources
    - 更新web工程中的class字节码和资源文件到tomcat运行实例中

  - redeploy
    - 重新部署web模块 但是不重启tomcat服务器

  - restart server
    - 重启tomcat服务器



> 修改热部署
- 上面我们的逻辑都是 当页面有内容上的修改的时候 我们会重新的 restart server

- 如果我们想修改完内容后 服务器的页面上就有反馈
- 我们在 edit configurations 中

- on frame deactivation: Do nothing
- 修改为
- update resources


> 总结下：
- 1. 创建普通的module
- 2. 右键module - application
- 3. ctrl + ;
 - 看看 facets 和 artifacts 
- 4. 点击绿色小锤子 旁边的 tomcat实例设置
  - 如果没有 tomcat server 点击 + 号添加
  - 指定url 这里好像要指定到 web 文件夹 要不然会404

  - deployment选项卡是工程名

- url: http://localhost:8080/tomcat_test/web
- deployment: /tomcat_test

----------------

### Servlet
- 它是java ee中特别重要的一个技术点
- 举例:
- 我们客户端通过 http:ip:port/工程名/资源名 去向服务器请求资源

- 服务端接收到请求 分析请求什么 将文件响应回客户端
- 当客户端填写完 form 表单发送post请求到 action="add" 的时候

- add就是服务端的一个组件 这个组件内容逻辑就是jdbc调用数据库 将post携带过来的数据写入数据库

- add就是servlet服务端小型程序


> 什么是servlet？
- 1. 它是javaEE规范之一, 规范就是接口
```java
interface Servlet
```

- 2. Servlet是java web三大组件之一:
- Servlet程序
- Filter过滤器
- Listener监听器

- 3. servlet是运行在服务器上的一个java小型程序 它可以*接收客户端发送过来的请求 并相应数据给客户端*


> servlet程序的作用
- 1. 获取用户(客户端)发给我的数据
- 2. 调用DAO中的方法完成添加功能


> 创建 servlet 程序
- servlet程序需要依赖 servlet.jar 包 我们要将这些必须的jar包导进我们的web工程里面

- ctrl + ;
- 找我我们的web工程
- 选择 dependencies 
- 选择 + 再添加一个依赖 -- library -- application server libraries -- tomcat8 
- ok即可

- 这样我们这个工程下面就有一个是 jdk1.8 一个是 tomcat了 这样tomcat里面的jar包 我们都能看到了

----------------

### 通过实现 Servlet接口的方式 实现servlet程序
> 1. 编写一个类去实现 servlet 接口
<!-- 
  如果提示 无法加载 servlet jar包
  我们需要 ctrl + ;
  在 libraries 选项卡中 点击 + 找到 Tomcat目录下的lib下的servlet 然后添加到我们的module中就可以了

  或者 将 servlet包导入到 WEB-INF 下的lib目录下
 -->

```java
package com.sam.servlet_test;
import javax.servlet.Servlet;

public class HelloServlet implements Servlet {

}
```


> 2. *实现接口中的service方法* 处理请求 相应数据
```java
// 主要需要实现它
service(ServletRequest req, ServletResponse res)

// 一共5个需要实现的方法
- service() 专门用来处理请求和响应的 只要访问我们的 HelloServlet程序 它就会执行这个方法

public void service(ServletRequest servletRequest, ServletResponse servletResponse)
```

> 3. 到 web.xml 中去配置servlet程序的访问地址 (请求的接口 映射这 servlet程序)
- 要不找不到我们的 HelloServlet 程序

- 这步可以理解为路由
- 我们有一个 java类是servlet小程序
- 前端 action="add" 是往服务端的add组件发送请求
- 那么 add就是一个servlet组件
- 那么 怎么才能让它 和 我们的java类 对应上呢？
- 我们就要在 .xml 文件里面进行配置
<!-- 
  这个程序是跑在服务器上的 所有服务器上的东西都是需要一个访问地址与之对应 因为我们要访问

  - WEB-INF
    - web.xml 中配置
 -->


- 在 <web-app> 里面添加 <servlet> 配置标签标签

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
version="4.0">
  <servlet>
    <servlet-name>HelloServlet</servlet-name>
    <servlet-class>com.sam.servlet_test.HelloServlet</servlet-class>
  </servlet>

  <servlet-mapping>
    <servlet-name>HelloServlet</servlet-name>
    <url-pattern>/add</url-pattern>
  </servlet-mapping>
</web-app>
```

- <servlet>
- 给Tomcat配置servlet程序


- <servlet-name>
    实现Servlet接口的类名
  </servlet-name>
- 给servlet程序起一个别名(一般是java程序的类名)


- <servlet-class>
    com.sam.servlet.HelloServlet
  </servlet-class>
- 这个标签中要写全类名


- <servlet-mapping>
    <servlet-name>
      实现Servlet接口的类名
    </servlet-name>
    <url-pattern>/自定义的访问路径</url-pattern>
  </servlet-mapping>
- mapping标签: 
  给servlet程序配置访问地址

- name标签: 
  告诉服务器 当前配置的地址给哪个servlet程序使用
  一般这个name 和 上面的name 是一致的

- url-pattern:
  配置访问地址
  相当于 action="hello" 也就是客户端的请求会到这个接口 这个接口映射了 HelloServlet 类
<!-- 
  <url-pattern>/hello</url-pattern>
  /: 在服务器解析的时候 
  表示地址为 http://ip:port/工程路径

  hello: 
  表示地址为 http://ip:port/工程路径/hello

- 这个就是servlet程序的访问地址 hello 就是 servlet程序
 -->

- 扩展:
- <url-pattern>/路径
- 这个路径会优先检查 也就是说 前端通过网址
- http://ip:port/工程路径/hello 
- 看到资源名 hello的时候 会在web.xml文件里面 优先的进行匹配 找到hello对应一个java类 然后会执行这个java类中的 service() 方法


> servlet程序的常见错误
- 1. <url-pattern>
- 写的不是 /url 而是 url 的时候 就会报错
- invalid <url-pattern> hello in servlet mapping

- 2. servlet-mapping 中的 name 必须指向 servlet-name 表达url给哪个 java类使用

----------------

### servlet的生命周期
- 在我们实现 servlet接口之后 需要重写里面的方法
- 这些重写的方法 就有一部分是servlet的生命周期
```java
@Override
  public void init(ServletConfig servletConfig) throws ServletException {

  }


  @Override
  public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
    System.out.println("hello servlet 被访问了");
  }

  
  @Override
  public void destroy() {

  }


  @Override
  public ServletConfig getServletConfig() {
    return null;
  }

  @Override
  public String getServletInfo() {
    return null;
  }
```
> 1. 执行 servlet构造器方法
- 构造器方法只会执行一次 意味着我们的HelloServlet程序是单例的

> 2. 执行 init初始化方法
- 初始化方法 也执行一次 

---
- 第1 2步是在第一次访问的时候 创建servlet程序的时候会被调用
---

> 3. 执行 service方法
- 每次访问 /hello 路径的时候都会调用

> 4. 执行 destroy方法
- 停止tomcat服务器的时候才会执行这个方法


```java
package com.sam.servlet_test;
import javax.servlet.*;
import java.io.IOException;

public class HelloServlet implements Servlet {

  public HelloServlet() {
    System.out.println("1 构造器方法");
  }

  @Override
  public void init(ServletConfig servletConfig) throws ServletException {
    System.out.println("2 init初始化方法");
  }

  @Override
  public ServletConfig getServletConfig() {
    return null;
  }

  @Override
  public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
    System.out.println("3 service方法");
  }

  @Override
  public String getServletInfo() {
    return null;
  }

  @Override
  public void destroy() {
    System.out.println("4 destroy方法");
  }
}

```


> servlet的请求分发处理
> service(ServletRequest req, ServletResponse res)
- 我们的 HelloServlet类 实现了 Servlet接口 重写了接口中的 service() 方法

- 这个方法只有一个 但是我们的请求方式却有很多种 所以就要在service()方法里面进行判断 因为每种请求的方式对应的逻辑都是不一样的

- 如果判断是何种请求方式呢？

> HttpServletRequest httpReq
- 它是 ServletRequest 的子接口 子接口的对象身上有

> httpReq.getMethod();
- 获取请求的方式

- 返回值:
- String
- 返回值为大写字符串 GET

```java
public void service(ServletRequest servletReq, ServletResponse servletRes) {

  // 向下转型
  HttpServletRequest httpReq = (HttpServletRequest) servletReq;


  // 调用方法
  String method = httpReq.getMethod();

  // 请求分发
  if("GET".equals(method)) {
    System.out.println("get请求");
  } else if("POST".equals(method)) {
    System.out.println("post请求");
  }
}
```


- 我们将处理get请求的逻辑 封装成一个方法 同理 将处理post请求的逻辑 也封装成一个方法
- 调整如下:
```java
// 向下转型
HttpServletRequest httpReq = (HttpServletRequest) servletReq;

// 调用方法
String method = httpReq.getMethod();

if("GET".equals(method)) {
    doGet();
  } else if("POST".equals(method)) {
    doPost();
  }
}

public void doGet() {
  System.out.println("get请求");
}

public void doPost() {
  System.out.println("post请求");
}
```

----------------

### 继承 HttpServlet类 实现servlet程序
- 在实际的开发中 我们不会使用 实现Servlet接口的方式 实现servlet程序

- 开发的时候我们都是继承 HttpServlet类 的方式去实现servlet程序


> 实现步骤
> 1. 编写一个类去继承 HttpServlet 类
```java
package com.sam.servlet_test;
import javax.servlet.http.HttpServlet;

public class HelloServlet2 extends HttpServlet {
}
```

> 2. 根据业务需要重写 doGet 或 doPost 方法
> doGet()
- 在get请求的时候会被调用

> doPost()
- 在post请求的时候会被调用

```java
public class HelloServlet2 extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    
  }
}
```

> 3. 到 web.xml 中配置servlet程序的访问地址
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
version="4.0">
  <servlet>
    <servlet-name>HelloServlet</servlet-name>
    <servlet-class>com.sam.servlet_test.HelloServlet</servlet-class>
  </servlet>

  <servlet-mapping>
    <servlet-name>HelloServlet</servlet-name>
    <url-pattern>/hello</url-pattern>
  </servlet-mapping>

<!-- 配置HelloServlet2 -->
  <servlet>
    <servlet-name>HelloServlet2</servlet-name>
    <servlet-class>com.sam.servlet_test.HelloServlet2</servlet-class>
  </servlet>

  <servlet-mapping>
    <servlet-name>HelloServlet2</servlet-name>
    <url-pattern>/hello2</url-pattern>
  </servlet-mapping>
</web-app>
```

----------------

### 使用 idea的工具 自动创建 servlet程序
- 平时的时候我们是通过 继承 HttpServlet 类来实现servlet的程序 但还有一种更加快捷的方式

> 方法:
- 1. ctrl + ;
- 2. 找到facets选项卡 勾选 source roots 下面的对号(默认是没有勾选的)
- 3. 
- src
 - package 右键 servlet文件

- name: 对应着 web.xml 里面的 servlet-name
- class: 对应着 全类名

*注意: create java ee 6+ annotated class* 全面的对号取消掉
- 它会使用 3.0 以上的注解功能(看来2.5是xml文件配置)

- 当我们点击创建的时候 java和xml配置文件里面的内容都会同时创建和更新
<!-- 
  但是需要配置 servlet-mapping
 -->

----------------

### servlet类的继承体系

- 顶级接口: interface Servlet

  ↑

- 实现上面接口: class GenericServlet

  ↑

- 继承上面的类: class HttpServlet

  ↑

-  继承上面的类: 自定义的Servlet的程序


> interface Servlet接口
- 只是负责定义 Servlet程序的访问规范

> class GenericServlet类
- 它实现了Servlet接口 做了很多的空实现
- 并持有一个ServletConfig类的引用 并对ServletConfig的使用做一些方法

> class HttpServlet
- HttpServlet抽象类实现了service()方法
- 并实现了请求的分发处理
- doGet()
- doPost()
- 这两个方法中负责跑异常 说不支持get/post请求

> 自定义的Servlet类
- 根据业务需要 重写 doGet() 或者 doPost()

----------------

### ServletConfig 类
- ServletConfig是servlet程序的配置信息类

> 作用:
- 1. 可以获取 servlet 程序的别名: <servlet-name> 的值

- 2. 获取初始化参数 init-param
- 3. 获取 servletContext 对象

- ServletConfig在 实现 Servlet接口的 实现类中的 init生命周期中出现

```java

public class HelloServlet implements Servlet {

  @Override
  public void init(ServletConfig servletConfig) throws ServletException {

    ... 通过servletConfig对象可以实现上述 1 2 3
    
  }

}
```


> servletConfig.getServletName()
- 可以获取 servlet 程序的别名
- <servlet-name> 的值

- 返回值:
- String



> 获取初始化参数 init-param
- 需要在 web.xml 文件中进行配置 我们可以配置多组键值对

```xml
<servlet>
  <servlet-name>HelloServlet</servlet-name>
  <servlet-class>com.sam.servlet_test.HelloServlet</servlet-class>
  
  <!-- init param是初始化参数 -->
  <init-param>
    <!-- 参数名 -->
    <param-name>username</param-name>
    <!-- 参数值 -->
    <param-value>root</param-value>
  </init-param>
</servlet>
```

- 在web.xml中配置后我们就可以获取它们

> servletConfig.getInitParameter("参数名")
- 获取在 web.xml 中配置的初始化参数名


> servletConfig.getServletContext()
- 获取 servletContext 对象
- 不知道啥作用

