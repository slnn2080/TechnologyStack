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
- 方式1: 选择这两个jar包 右键 add as library

- 方式2:
- 1. ctrl + ；
- 2. Libraries -- 点击加号 -- 选择 JAVA (添加到类库的作用) -- 找到要添加的jar包 然后给该jar lib 起个name 比如 book_lib
- 3. Modules -- 找到要操作的module -- 右侧点击 Dependencies 点击 + -- Library -- 选择步骤2中创建的 book_lib

- 步骤4可以这样: 将jar包添加到类库后 将jar指定给哪个module使用 选择我们指定的web工程

- 步骤4也可以这样: artifacts -- 选择我们的 book_project: war ... -- fix -- add "book_lib" to the artifact 将这个lib添加到 部署的里面来

- 步骤4选择一个就可以


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


> 扩展:
- 在继承 HttpServlet 类后 我们也可以在它的子类中重写
- init()
- service()

**注意:**
- 当我们在HttpServlet的子类中 重写了 init() 方法后
- 一定要在该方法内 调用 super.init(config) 这句一定不能少

```java
// 通过继承HttpServlet的方法 创建 servlet实例
public class HelloServlet2 extends HttpServlet {
  
// 重写了 init 方法
@Override
public void init(ServletConfig config) throws ServletException {
  super.init(config);   // 这句一定不能省
}


@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
  System.out.println("HelloServlet2 doGet()");


  // 如果 super.init(config); 这句省掉的话 下面的 servletConfig 就会是null 进而我们再调getServletName 就会报空指针异常的错误
  ServletConfig servletConfig = getServletConfig();
  System.out.println(servletConfig.getServletName());
  System.out.println(servletConfig.getInitParameter("url"));
}
```

> 为什么一定要在init()写super.init(config)?
- class GenericServlet
    ↑
- class HttpServlet

- 上面我们在 doGet() 方法中调用了 getServletConfig() 
- 而getServletConfig() 是GenericServlet中的方法

- GenericServlet类中也有init方法
```java
public void init(ServletConfig config) throws ServletException {

  // 它在里面将config保存起来了
  this.config = config;
  this.init();
}
```

- GenericServlet类中的init()中 将config保存起来了 一旦我们重写后init()方法后 因为子类也有init()  父类也有init() 调用init()会调用子类的init()

- 所以 GenericServlet类 中 this.config = config 的操作就会丢失

- 所以我们在子类中的init()方法中 又调用了 super.init(config) 相当于又调用了父类中的init()

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


> ServletContext相关
-  一个 Web工程 只有一个 ServletContext 对象实例
- ServletContext对象是在 web工程部署启动的时候创建 在web工程停止的时候销毁


> servletConfig.getServletContext()
- 通过servletConfig调用方法 获取 servletContext 对象

> getServletContext()
- 调用该方法直接获取 servletContext 对象

```java
public class ContextServlet1 extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    // 获取 ServletConfig 对象
    ServletConfig servletConfig = getServletConfig();

    // 获取 ServletContext 对象 的方式1:
    ServletContext servletContext = servletConfig.getServletContext();

    // 获取 ServletContext 对象 的方式2:
    ServletContext servletContext2 = getServletContext();
  }
}
```

> 说明:
- servletContext是一个接口 它表示 servlet上下文对象
- 一个web工程*只有一个 servletContext 对象实例*
- servletContext是一个域对象

- 什么是域对象?
- 域对象 是可以像Map一样存储数据的对象 这里的域指的是存取数据的操作范围 

- 这个范围是: 整个的web工程

> Map 和 域对象 的对比
- 存数据:
- Map:  put()
- 域对象: setAttribute()


- 取数据:
- Map: get()
- 域对象: getAttribute()


- 删数据:
- remove()
- removeAttribute()


> 作用:
> 1. 获取 web.xml 中配置的上下文参数 context-param
> 2. 获取当前的工程路径, 格式: /工程路径

> 3. 获取工程部署后在服务器硬盘上的绝对路径
> context.getRealPath("/")
- 返回的是*项目在服务器的绝对路径*
```java
  ServletContext context = getServletContext();

  String realPath = context.getRealPath("/");

  System.out.println("realPath: " + realPath);
  // /Users/LIUCHUNSHAN/Desktop/Sam/JavaWeb/java_web_local/out/artifacts/tomcat_test2_war_exploded/
```

> 4. 像 map 一样存取数据
> context.setAttribute("key1", "value1");
> context.getAttribute("key1")
```java
// 4. 像 map 一样存数据
public class ContextServlet1 extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    ServletContext context = getServletContext();

    // 在存放数据之前 获取 key1 对应的数据
    System.out.println("设置之前: Contxt中 key1 的值为: " + context.getAttribute("key1"));  // null

    // 存数据
    context.setAttribute("key1", "value1");

    // 取数据
    System.out.println("Context中获取 key1 的值为: " + context.getAttribute("key1")); 
    // Context中获取 key1 的值为: value1
  }
}
```

- 当我们重新部署 Tomcat 服务器的时候 也就是 redeploy 被点击的时候 它会把原来的工程停了 然后把新的工程(修改后的工程)放进去再启动 服务器虽然没有重启但是web工程被重新的部署了(因为web工程被重新的部署了相当于是一个 销毁创建的过程)

- 只要是web工程被重启 ServletContext 对象就会被销毁
- 只要是工程一直都在的情况下 我们往context对象中保存的数据 我们随时都能取出来

- 总结:
- 就是web工程只要没有被销毁 存在context中的数据想怎么用就怎么用 但一旦被销毁 需要等待让里面赋值 没赋值之前都是null


> context.getResourceAsStream("文件路径")
- 读取资源 通过流返回
- 比如我们下载逻辑 要读取文件内容到内存层面 然后在返回给客户端 这里我们就可以通过这个指定文件所在的路径 将文件读到输入流中

- 返回值:
- InputStream 节点流

```java
ServletContext servletContext = getServletContext();

// 参数: 文件所在的路径 在服务器端 / 代表web目录
InputStream resourceAsStream = servletContext.getResourceAsStream("/file/" + downloadFileName);
```


> context.getMimeType("文件路径")
- 读取文件的数据类型
- 用于告知客户端文件的数据类型是什么
```java
String downloadFileName = "pic.jpg";
ServletContext servletContext = getServletContext();

String mimeType = servletContext.getMimeType("/file/" + downloadFileName);

res.setContentType(mimeType);
```



> 扩展:
> 1. servlet程序和servletConfig对象都是由Tomcat负责创建 我们负责使用

- servlet程序默认是第一次访问的时候创建
- servletConfig是每个servlet程序创建时 就创建一个对应的servletConfig对象
<!-- 
  servletConfig 会被传递到 init() 方法中 供我们使用
  它里面就封装了初始化配置的信息
 -->

> 2.  ServletConfig还可以在其他地方使用 比如在 HttpServlet类中
- ServletConfig 除了在 init() 方法中使用之外还可以在其他的地方使用

> ServletConfig servletConfig = getServletConfig();
- 通过 getServletConfig() 方法 返回的也是 servletConfig 对象

**注意:**
- 每一个servletConfig对应的是自己的servlet程序 有自己的初始化参数等

- 也就是说 
- servlet程序1 有一套自己的 servlet 参数
- servlet程序2 有一套自己的 servlet 参数

----------------

### HttpServletRequest类  req
- 该类在 doGet() 和 toPost() 方法中都有 
```java
protected void doGet(
  HttpServletRequest req, 
  HttpServletResponse resp
)
```


> 作用:
- 每次只要有*请求*进入 Tomcat 服务器 Tomcat服务器就会把请求过来的HTTP协议信息解析好封装到 Request对象 中

- 然后传递到 service() (doGet doPost)中给我们使用
- 我们可以通过 HttpServletRequest对象 获取到所有请求的信息

- 它是Tomcat服务器创建的 每次请求创建一个 请求完成就将其销毁

> HttpServletRequest类的常用方法
- (HttpServletRequest req)
- req身上的方法太多了 不断的总结吧

> req.getRequestURI();
- 获取请求的资源路径

> req.getRequestURL();
- 获取请求的统一资源定位符(绝对路径)

> req.getRemoteHost();
- 获取客户端的ip地址
- 如果url上输入 localhost 访问 得到的是 0:0:0:0:0:0:0:1

- 如果url上输入 127.0.0.1 访问 得到的是 127.0.0.1
- 如果url上输入的是真实的ip 得到的是 真实的ip

```java
public class RequestAPIServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    String reqURI = req.getRequestURI();
    System.out.println("URI: " + reqURI);
    // URI: /test

    StringBuffer reqURL = req.getRequestURL();
    System.out.println("URL: " + reqURL);
    // URL: http://localhost:8080/test

    String remoteHost = req.getRemoteHost();
    System.out.println("Host: " + remoteHost);
    // Host: 0:0:0:0:0:0:0:1
    // 0:0:0:0:0:0:0:1  - ipv6 
    // 127.0.0.1  - ipv4
  }
}
```

> req.getHeader("String 请求头name");
- 获取指定的请求头
```java
String header = req.getHeader("User-Agent");
System.out.println("请求头: " + header);
// 请求头: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) 
```


> req.getMethod();
- 获取请求的方式


> req.getParameter("String key");
- 获取请求的参数

- 参数:
- key值(标签中的name属性对应的值)

- 返回值类型
- String

```java
String username = req.getParameter("username");
System.out.println("用户名: " + username);
```

> req.getParameterValues("String key");
- 获取请求的参数(多个值的时候使用)
- 比如:
- checkbox多选框 name="hobby" 我们选择了多个值的时候
- hobby=c++&hobby=java
- 要用该API
```java
String[] hobbies = req.getParameterValues("hobby"); 

System.out.println("爱好: " + Arrays.toString(hobbies));
// 爱好: [c++, java, javascript]
```


> req.getParameterMap()
- 获取请求的参数 的 键值对形式 name=value

- 返回值：
- map类型
- Map<String, String[]>

- 使用场景:
- BeanUtils.populate(对象, map类型)
- 后面我们会使用这个方法 将请求的数据直接注入到user对象里面 它的第二个参数需要一个map类型的数据


> req.getParameterNames()
- 获取请求参数的 key

- 返回值应该是一个String[]数组


```html
<!-- 前端表单: -->
<h3>RequestAPI测试</h3>
<form action="http://localhost:8080/test" method="get">
  username: <input type="text" name="username" id="uname" value="sam"> <br><br>
  password: <input type="text" name="password" id="pwd" value="111111"> <br><br>
  hobby:
    <input type="checkbox" name="hobby" value="c++"> C++
    <input type="checkbox" name="hobby" value="java"> Java
    <input type="checkbox" name="hobby" value="javascript"> Javascript <br><br>
    <input type="submit" value="提交">
</form>
```

```java
// 后台接口
public class RequestAPIServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    String username = req.getParameter("username");
    String password = req.getParameter("password");
    String[] hobbies = req.getParameterValues("hobby");

    System.out.println("用户名: " + username);
    System.out.println("密码: " + password);
    System.out.println("爱好: " + Arrays.toString(hobbies));

  }
}
```

**post请求需要注意一下**
**该API必须在获取请求参数代码前调用**
> req.setCharacterEncoding("UTF-8");
- 设置请求体的字符集为 UTF-8(从而解决post请求的中文乱码问题)

- 场景:
- 当前端表单使用 post 提交数据的时候 如果数据中含有中文(用户名) 我们java使用getParamter()后台接收到的值 会是乱码

- 解决方式:
- 在doPost()方法的首行位置 调用该方法
```java
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
  // 首行的位置调用
  req.setCharacterEncoding("UTF-8");
}
```

> req.setAttribute("key", "value");
- 设置域数据

> req.getAttribute("key");
- 获取域数据

- 上面在域里面设置的数据 服务器端的所有实例都能获取的到相当于 vuex


> req.getScheme()
- 可以获取请求的协议

> req.getInputStream()
- 获取字节输入流对象 可以将流形式的文字读到内存中
```java
ServletInputStream inputStream = req.getInputStream();
// 创建buf缓冲区
byte[] buf = new byte[1024];
int len;

// 下面就是以循环的方式来进行读入操作
```

------

> 请求的转发
- 概念:
- 服务器收到请求后 从 一个资源 跳转到 另一个资源 的操作叫请求转发

- 场景:
- 服务器中的资源共同完成一个功能的时候
- 下面的服务器有两个servlet程序共同完成一个完整的业务
- 业务的执行是有顺序的, 我们要先执行servlet1 再执行servlet2
<!-- 
    客户端    ->    服务器(Tomcat)

                  servlet1 程序:

                  servlet2 程序: 
-->


- 业务逻辑: 
<!--
  客户端 先请求servlet1
  http://ip:port/工程名/servlet1

      ↘

        servlet1(柜台1):
        1. 检查是否有请求参数 (相当于办事的材料)
        2. 处理完业务后 加载一个章 到下一个柜台
        3. 问路 servlet2怎么走
        4. 知道路后 走到servlet2(柜台)

        ↘ 这步就是: 请求转发(自动流转到servlet2)

          servlet2(柜台2):
          1. 获取请求参数(检查材料)
          2. 检查有没有servlet1(柜台1)的章 有章代表前面的环节都没有问题
          3. 处理自己的业务(这里整个业务逻辑就完成了)


- servlet2处理完成之后会将结果(数据)带回浏览器端(会再次经过servlet1 但是一般servlet1不会再进行什么操作)

    客户端  ←  servlet1  ←  servlet2
 -->


   
> req.getRequestDispatcher(String path 另一个接口的地址);
- 获取请求转发对象(获取请求调度)
- path: /接口地址
<!-- 
  必须以 / 打头
  /: 代表 http://ip:port/工程名/ 映射到idea的web目录 
 -->

- 返回值:
- RequestDispatcher requestDispatcher对象

- 扩展:
- 参数不光光可以写 服务器中的资源路径(接口地址)
- 还可以利用请求转发跳转到web工程下的其他页面
```java
// / 是web工程根路径下
req.getRequestDispatcher("/a/b/c.html").forward(req, resp);
```

- 注意:
- 请求转发只能在本web工程下使用 比如不能访问百度

```java
RequestDispatcher requestDispatcher = req.getRequestDispatcher("/servlet2");
```

> requestDispatcher.forward(req, res)
- 通过调用 requestDispatcher对象的 forward() 方法 去往指定的接口url
- 参数:
- 将servlet1的req res对象传入 一边servlet2中可以从req res对象中拿到客户端传递过来的数据
```java
requestDispatcher.forward(req, res);
```


> 梳理逻辑:
- 1. 客户端向servlet1接口发起请求
- 2. servlet1: 中先获取客户端传递过来的数据 并做检查等逻辑操作
- 3. servlet1: 中该章 通过设置域数据(如果能在servlet2中取出该数据说明盖过章)
- 4. servlet1: 中问路 调用getRequestDispatcher() 得到请求调度
- 5. servlet1: 中走向servlet2 调用请求调度对象的 forward() 方法

- 6. servlet2: 中先获取客户端传递过来的数据 这里可能进行一些验证之类的操作
- 7. servlet2: 中检查是否servlet1中盖过章 从域里面尝试取servlet1存的数据
- 8. servlet2: 中继续进行自己的业务逻辑

- 完成

- 代码部分:
```java
// servlet1
package com.sam.servlet_test2;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Servlet1 extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. servlet1中先获取客户端的请求参数(办事的材料) 并做检查
    String username = req.getParameter("username");
    System.out.println("Servlet1(柜台)中检查参数(材料)" + username);

    // 2. servlet1在检查完参数(材料)后要加盖一个章 并传递到servlet2（柜台2）去 这里我们利用 域数据 来盖章
    req.setAttribute("key", "柜台1的章");

    // 3. 问路: servlet2(柜台2)怎么走
    RequestDispatcher requestDispatcher = req.getRequestDispatcher("/servlet2");

    // 4. 走向servlet2
    requestDispatcher.forward(req, res);
  }
}



// servlet2
package com.sam.servlet_test2;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Servlet2 extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 1. servlet2(柜台2)同样也要看请求参数(版式材料)
    String username = req.getParameter("username");
    System.out.println("Servlet2(柜台)中检查参数(材料)" + username);

    // 2. 查看柜台1是否有盖章
    Object key = req.getAttribute("key");
    System.out.println("柜台1是否有章: " + key);

    // 3. 处理自己的业务
    System.out.println("servlet2处理自己的业务");
  }
}

```

> 请求转发的特点:
- 1. 浏览器地址栏没有变化
- 2. 请求转发是一次请求
<!-- 
  虽然我们经历了服务器端的两个资源(走了两个接口)
  但是对于客户端而言就是一进一出 所以就是一次请求

           →
  客户端        服务器
           ←
 -->

- 3. servlet1 servlet2共享request域中的数据
<!-- 
  我们在servlet1中 将数据保存在 请求对象req中
    req.setAttribute()

  然后下面我们又将这个req对象 传递到servlet2中使用了
    requestDispatcher.forward(req, res)

  所以保存在req中的域数据也传递过去了
 -->

 - 4. 请求可以转发到WEB-INF目录下(也就是利用请求转发 访问到WEB-INF目录下的文件)
 <!-- 
  WEB-INF下假如我们放一个index.html文件
  然后 url 上输入 localhost:8080/WEB-INF/index.html
  这样是访问不到的 也就是说 浏览器做不到访问WEB-INF目录下的文件


  但是 请求转发可以 我们可以在 servlet1接口中 将请求转发到/WEB-INF/index.html下
  RequestDispatcher requestDispatcher = req.getRequestDisPatcher("/WEB-INF/index.html")

  requestDispatcher.forward(req, res)

  这样我们通过 /servlet1 接口访问的时候 就能看到WEB-INF/index.html文件了
  -->

- 5. 那可以利用请求转发 跳转到www.baidu.com么？ 
- 不行

----------------

### base标签
- 作用:
- 它可以设置一个当前页面中所有相对路径工作时 参照哪个路径来进行跳转
- 当设置了base后我们在跳转的时候 会先看有没有base值 如果有的话则忽略相对路径跳转参考浏览器地址栏中的url规则 也base指定的值为基准

- 位置:
```html
<head>
  <title>
  <base href="http://localhost:8080/a/b/" target="">
</head>
```

- 要点:
- base标签里面资源名是可以省略的 以目录为准 / 不能省略(因为没有/代表是一个资源的路径)

> 相对路径:
- 所有相对路径在工作的时候都会参照当前浏览器地址栏中的地址来进行跳转
<!-- 
  - 比如: 
  - 我们 跳转到 c.html 页 这时url为
  - http://localhost:8080/a/b/c.html

  - 当我们想从 c.html 页 跳回 index 页
  - c.html页中的标签路径为 ../../index.html

  - http://localhost:8080/a/b/c.html
    +
  - ../../index.html

  - ..是返回上一层目录 返回两次
  - 一次: c.html在b目录下 返回上一层就是a
  - http://localhost:8080/a + ../index.html

  - 一次: 再返回上一层 再去掉a 就变成了下面的路径结构
  - http://localhost:8080/index.html

  - 这时候就得到了正确的路径
 -->


> 场景:
- 根目录/index.html页面 跳转到 根目录/a/b/c.html
```html
<!-- 根目录/index.html页面 -->
<a href="./a/b/c.html">

<!-- 根目录/a/b/c.html -->
<a href="../../index.html"> 
```

- 上述跳来跳去是没有问题的

- 但是如果我们跳转到 ./a/b/c.html 页面的行为是 通过接口中的逻辑 请求转发过去的
```java
public class forwardC extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("经过了ForwardC程序");
    // /是web工程根路径下 请求转发到的 c.html
    req.getRequestDispatcher("/a/b/c.html").forward(req, resp);
  }
}
```

- 这时候我们再通过 <a href="../../index.html"> 想回到index.html是没有办法的 404
- 因为:
- 当我们使用请求转发来跳转的时候 浏览器地址栏中的地址是
- http://localhost:8080/forwardc

- 跳转回去的路径是 ../../index.html

- http://localhost:8080/forwardc
  +
- ../../index.html

- 以这个路径返回两层 得到的是一个错误的路径 这就是跳转不回去的原因
- 原因:
- 相对路径在工作的时候 参数的地址发生了变化 跳不回去了


> 解决方式
- 之所以请求转发的方式 通过 相对路径 跳不回去 是因为地址栏发生了变化
- 如果我们有办法让它参照的地址永远不变 那就可以跳回去

- 上面的情况 我是不是就可以 将 http://localhost:8080/a/b/c.html 设置为base

- base标签写在title标签的下面 head标签的里面
- <base href="http://localhost:8080/a/b/">

- 设置完成后 下面我们再使用 相对路径来进行跳转 都是可以的

**注意:<base>只对当前页面是有效的**


> 相对路径 和 绝对路径
- 相对路径:
- ./    表示  当前目录
- ../   表示  上一级目录
- 资源名 表示  当前目录/资源名

- 绝对路径:
- http://ip:port/工程路径/资源路径


> JavaWeb中 / 斜杠的不同意义
- 在 web 中 / 斜杠 是一种绝对路径

> / 斜杠 
- 如果被 浏览器解析 得到的地址是
- http://ip:port

- 如果被 服务器解析 得到的地址是
- http://ip:port/工程路径
<!-- 
  使用场景
  1. <url-pattern>/servlet1</url-pattern>
    / 会被解析为 http://ip:port/工程路径/servlet1

  2. servletContext.getRealPath("/")
    我们传入的 / 也表示到工程路径 映射到idea中 就是web

  3. request.getRequestDispatcher("/")
 -->


> 特殊情况:
> res.sendRedirect("/")
- 这里的 / 是将 /斜杠 发送给浏览器解析 得到的是 http://ip:port
<!-- 
  如果是写在服务器上面但是是发送到前端解析
  /
  前端 和 后台 解析的结果不同
 --> 


**注意:**
- 如果我们页面中加上了 <base> 标签后
- 其它的link script的引用的文件的方式也要进行修改(原来是相对路径是基于文件的 现在改成base后路径就发生了变化 再进行相对操作就会找不到)

```html
<!-- 原来 -->
<link 
  type="text/css" 
  rel="stylesheet" 
  href="../../static/css/style.css" >

<script 
  src="../../static/js/jquery-1.7.2.js"></script>


<!-- 现在 -->
<!-- 一般在项目里面 base的href 只写到工程的路径 -->
<base href="http://localhost:8080/project/" />
<link 
  type="text/css" 
  rel="stylesheet" 
  href="static/css/style.css" >

<script 
  src="static/js/jquery-1.7.2.js"></script>

<!-- 
  注意:
    href="static/css/style.css"

  - static的前面不能有 /
  - 有 / 代表从 http://localhost:8080/ 找static
  - 没有 / 代表从 http://localhost:8080/project 找static

  - 根路径发生了变化
  - 有 / 前端从 ip:port
  - 没有 / 从 ip:port/工程名

 -->
```



**在实际的项目中我们只使用绝对路径或者 base标签的形式**
- 比如:
- action="接口地址"

- 这个接口地址 就要选择使用 base + 相对路径 或者 绝对路径的形式

- 我们javaweb的课程中
- web阶段: base + 相对
- 框架阶段: 绝对路径


> 例：
```html
<!-- 一般在项目里面 base的href 只写到工程的路径 -->
<base href="http://localhost:8080/" />
```

----------------

### HttpServletResponse类 res 响应对象
- HttpServletResponse类 和 HttpServletRequest类 一样。
- 每次请求进来 Tomcat服务器都会创建一个 response对象 传递给servlet程序去使用

- HttpServletResponse类: 表示请求回来的信息
- HttpServletRequest类:  表示所有响应的信息

- 如果我们需要设置 返回给客户端的信息 都可以通过 HttpServletResponse对象来进行设置

- *HttpServletResponse类是用来设置响应的*

- res既然是用来设置响应的 那怎么传递给客户端呢？
- 通过 流


> 响应有两个流:
- 1. 字节流: 
  常用语下载(传递二进制数据)
  res.getOutputStream()

- 2. 字符流: 
  常用语回传字符串(常用)
  res.getWriter()

**注意:**
- 上述的两种流 *只能只用一个* 使用了字节流就不能再使用字符流 反之亦然

> res.getWriter()
- 获取字符流

- 返回值
- PrintWriter

```java
PrintWriter writer = res.getWriter();
```


> writer.write()
- 向客户端写入字符串
- 参数类型:
- string char[] 好像都会转成字符串输出过去


> writer.print()
- 可以将各种类型的数据转换成字符串的形式输出
- 参数类型比write()要全


> 使用 res对象 往客户端回传数据
- 需求1:
- 往客户端回传 字符串 数据

- 思路:
- 先选择一种流: 字符流

- 步骤:
- 1. 先得到字符流
- 2. 调用字符流对象的方法 向客户端页面写入数据

```java
public class ResponseIO extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    PrintWriter writer = res.getWriter();

    writer.write("test content");
  }
}
```

> res.getCharacterEncoding()
- 该方法用于获得此时响应对象所采用的字符编码类型。
- 默认的情况下 服务端的响应对象采用的是 ISO-8859-1
- 该字符集不支持中文


> res.setCharacterEncoding("字符集")
- 设置服务器的字符集为UTF-8(服务器这边支持的字符集)


> res.setHeader("key", "value")
- 设置响应头

- 例如我们可以设置 Content-Type 属性
- 告诉浏览器我们的响应数据 的 数据类型 和 数据使用的字符集是什么 便于浏览器使用对应的字符集解析我们的响应数据


> 中文乱码问题
- 当我们向客户端 响应中文的时候 浏览器显示 ???
- 这代表我们在服务端没有设置响应对象的字符集

- 当浏览器显示 不正确的文字信息的时候
- 这代表我们没有告诉浏览器 服务端响应的信息的编码格式是什么

> 方案1:
- 1. res.setCharacterEncoding("UTF-8");
- 2. res.setHeader("Content-Type", "text/html; charset=UTF-8")

```java
public class ResponseIO extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

    // 该方法用于获得此时响应对象所采用的字符编码类型。
    String encoding = res.getCharacterEncoding();

    System.out.println(encoding);
    // 默认ISO-8859-1 - 该字符集不支持中文

    // 设置服务器的字符集为UTF-8(服务器这边支持的字符集)
   res.setCharacterEncoding("UTF-8");

   // 通过响应头设置浏览器也使用utf-8 text/html表示我返回的数据是什么 并且告诉该数据的字符集是什么 有了这个以后浏览器就按照这个显示就没问题了
   res.setHeader("Content-Type", "text/html; charset=UTF-8");

    PrintWriter writer = res.getWriter();
    writer.write("测试文本");
  }
}
```


> res.setContentType("text/html; charset=UTF-8");
- 同时设置服务器和客户端都使用 UTF-8 字符集 还设置了响应头

- 作用:
- 作用是使客户端浏览器，区分不同种类的数据，并根据不同的MIME调用浏览器内不同的程序嵌入模块来处理相应的数据。
<!-- 
  是用来告诉客户端 我的响应数据时什么样的类型吧
 -->

**注意:**
- 此方法一定要在*获取流对象之前*调用 才有效


> 方案2:
- 只写这一行的代码
- res.setContentType("text/html; charset=UTF-8");
```java
public class ResponseIO extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 方案2:
    // 这一行代码 同时设置服务器和客户端都使用 UTF-8 字符集 还设置了响应头
    res.setContentType("text/html; charset=UTF-8");
    PrintWriter writer = res.getWriter();
    writer.write("测试文本");
  }
}
```

----------------

### 请求重定向
- 请求重定向是指客户端给服务器发请求 然后服务器告诉客户端说 我给你一个新的地址 你去新的地址访问 这就是请求重定向(因为之前的地址可能已经被废弃)

<!-- 
    客户端(浏览器)        服务器(Tomcat)

                    ---- response1 程序 ----

                    随着时间的推移和项目的不断更新
                    升级 response1这个接口慢慢的
                    被废弃了由新的接口 response2
                    取代



                    ---- response2 程序 ----

                    response2程序取代了response1
                    功能更完善 安全性更高
 -->

- 上面我们 Tomcat 服务器上有两个接口 其中
  response1 -- 旧
  response2 -- 新

- 慢慢的response2取代了response1
- 服务端做了更新 但是客户端不知道 也就是说 客户端的用户还会拿着 http://ip:port/工程名/response1 去请求资源

- 但是response1已经被废弃 它有义务告诉客户端两个事情
- 1. 我已搬迁
- 2. 告知客户端新的地址

- 步骤1:
- 设置 响应码: 302

- 步骤2:
- 设置 响应头key:Location value:新地址

- 客户端解析 response1的结果 知道已经搬迁 再次发起新地址的请求

- 浏览器会再次请求 /response2 接口(也就是新地址) 然后通过新接口返回的响应 收到最终的结果 解析后展示到页面上

> 总结下:
- 请求转发: 是 /接口1 给 /接口2
- 重定向: 客户端先找/接口1，然后解析接口1的响应 去找/接口2 最终从/接口2身上拿到最终结果


> 代码的体现:
> res.setStatus(响应状态码);
- 设置响应的状态码
- 比如:
- 设置302 告知浏览器 该接口地址已搬家


> res.setHeader("Location", "http://~新地址")
- 设置响应头 Location 为重定向到哪里


> res.sendRedirect("新地址")
- 302是规定的 该方法默认的会设置 响应状态码为302 并重定向到指定的资源或地址


> 方案1:
- 1. res.setStatus(302);
- 2. res.setHeader("Location", "新地址");
```java
public class Response1 extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

    System.out.println("曾到此一游: Response1");

    // 设置响应状态码 302 表示重定向(表示已搬迁)
    res.setStatus(302);

    // 设置响应头 说明新的地址在哪里
    res.setHeader("Location", "http://localhost:8080/response2");
    res.setHeader("Location", "/response2");
  }
}
```


> 方案2: 推荐
- res.sendRedirect("http://localhost:8080/response2")
```java
public class Response1 extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

    res.sendRedirect("/response2");

  }
}
```


> 请求重定向的特点:
- 1. 浏览器的地址栏发生了变化
- 2. 请求重定向是两次请求(一去一回就是一次请求)
- 3. 不共享requset域中的数据
<!-- 
  也就是说 我在 /接口1 中 设置域数据
  req.setAttribute("key", "value")


  我在 /接口2 中 读取域数据 是获取不到的
  req.getAttribute("key")   // null

  因为:
  Tomcat每次收到请求就会把请求过来的数据解析好 封装成一个request对象 每次请求都会封装成一个

  第二次请求又是一个新的request对象
 -->

- 4. 不能访问WEB-INF下的资源
- 5. 可以访问当前工程以外的资源 比如 百度

----------------

### JavaEE项目的三层架构
- 服务端的代码是分为3层架构的
- 1. 
- 2. 
- 3. 

<!-- 
- 所有的代码请求是从 客户端 发起的
- http://ip:port/工程路径/资源路径

      ↘ 当客户端发起请求的时候 下面3层每层都做了什么


              JavaEE 三层架构


  Web层/视图展现层    Service业务层   DAO持久层
  1. 获取请求参数     1. 处理业务逻辑  只负责跟数据库
  封装成为Bean对象    2. 调用持久层保  交互进行crud操作
                    存到数据库
  2. 调用service
  层处理业务

  3. 当处理好后响应
  数据给客户端
  比如:
  请求转发
  重定向

  展现不同页面


- 然后从数据库开始 将结果一层层的返回 交给客户端
- 客户端拿到结果解析并展示在页面上
 -->


> Web层：
- 主要用来接收请求并响应数据, 主要的技术有:
- servlet程序
- springMVC
- webwork
- strtus1


> Service
- 主要的技术有:
- spring框架


> DAO持久层
- 主要的技术有
- Jdbc
- DbUtils
- JdbcTemplate
- Mybatis
- Hiberante
- JPA

- 分层的目的是为了解耦
- 解耦就是为了降低代码的耦合度 方便项目后期的维护和升级


**注意: JavaEE 三层架构**
- 在三层架构中 临层之间可以调用 但是不要跨层调用
- web -> service -> dao

- 比如: 不要在 web层 调用 dao层的逻辑
- 但是: 可以通过 service层 来操作 dao层

----------------

### 实现用户的注册和登录
- 尚硅谷书城的 登录界面 和 表单的验证部分 我们做完了
- 但是还没有实现 服务器相关的功能

> 注册
- 现在我们要完成 填写完注册信息后 客户端校验通过后 我们要把数据发给服务器 然后服务器接收到数据后 把数据保存到数据库

> 登录
- 我们输入用户名和密码之后 符合验证的规则之后 我们把数据发送给服务器 服务器获取用户名和密码 到数据库去检查 如果发现用户名正确 就会跳转到登录成功页面(login_success.html) 登录失败还是登录页面 继续输入


> 项目结构
- 我们分层后对于尚硅谷项目来说结构目录有哪些变化 会多了一些包(package)

- web层:
  - 这里面放 servlet 程序 用来负责客户端发送过来的请求和响应
  - com.atguigu.web/servlet/controller

- service层
  - 业务层:
  - 前端页面中 每一个功能就算是一个业务 一个业务对应着一个方法
  - 比如:
  - 前端的注册页面的注册功能就是一个业务

  - com.atguigu.service  -- service接口包
  - com.atguigu.service.impl  -- service接口实现类


- dao持久层
  - 这里主要是完成和数据库的交互工作
  - com.atguigu.dao
  - com.atguigu.dao.impl  -- dao接口实现类


- 实体bean对象
  - 比如数据库中的一张表 就会对应一个java类 一个完整的java类就是一个javabean

  - com.atguigu.[pojo/entity/domain/bean] javabean
  

- 测试包
  - com.atguigu.[test/junit]
  - 所有对项目中的逻辑 测试的代表都写在这个包下


- 工具类
  - com.atguigu.utils
  - 比如通过jdbc连接数据库连接池 关闭连接池 都在这个包下


- 我们先在idea中创建一个动态的web工程 先组织包结构

  | - book_project
    | - src
      | - com.sam.dao
        | - com.sam.dao.impl

      | - com.sam.service
        | - com.sam.service.impl

      | - com.sam.pojo
      | - com.sam.test
      | - com.sam.utils
      | - com.sam.web


    | - web
      | - pages
      | - static
      | - WEB-INF
        - web.xml
      - index.html

- 后面我们整个项目就在这里面完成

> 代码环节的流程
> 1. 县创建书城需要的 数据库 和 表
<!-- 
  注册页面:
    需要保存的数据
    id 用户名 密码 邮箱
 -->

```sql
create database if not exists book character set 'utf8';

use book;

create table t_user(
	`id` int primary key auto_increment,
	-- 个别用户名跟邮箱账号一样比较长 有设置为100的
	`username` varchar(25) not null unique,
	-- 一般都是32位 varchar类型
	`password` varchar(32) not null,
	`email` varchar(200)
);


-- 插入测试数据
insert into t_user(`username`, `password`, `email`)
values('admin', 'admin', 'admin@gmail.com');

select * from t_user;
```


> 2. 编写数据库表对应的 JavaBean 对象
- 我们数据库中有一个 t_user 表 那么就应该在java层面有一个 类跟它对应

- 我们在 com.sam.pojo 包里面 新建一个 User 类

- 也就是说 一个表对应着一个java类

```java
package com.sam.pojo;

public class User {
  private Integer id;
  private String username;
  private String password;
  private String email;

  
  public User() {
  }

  public User(Integer id, String username, String password, String email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  // get set toString 构造器 ...
}

```

- 在编写DAO持久层之前 项目经理会搭建好一些常用的工具类 这里工具类的搭建 我们也自己来


> 编写工具类 JbdcUtils
- 该工具类只要是用来 管理数据库连接池 在里面获取连接 关闭连接的

- 这个部分要用到数据库连接池 所以要将数据库连接池用到的一些jar放到项目 WEB-INF/lib 里
<!-- 
  mysql-connector-java-5.1.7-bin.jar -- 数据库驱动
  - 说明:
  - 这个数据库的驱动必须和 mysql 的版本一致
  - https://dev.mysql.com/downloads/file/?id=509728

  druid-1.1.9.jar -- 德鲁伊 数据库连接池
 -->

- 让项目里面添加 jar包 的流程
- 1. ctrl + ；
- 2. Libraries -- 点击加号 -- 找到要添加的jar包 然后给该jar lib 起个name 比如 book_lib
- 3. Modules -- 找到要操作的module -- 右侧点击 Dependencies 点击 + -- Library -- 选择步骤2中创建的 book_lib
- 4. artifacts -- 选择我们的 book_project: war ... -- fix -- add "book_lib" to the artifact 将这个lib添加到 部署的里面来


- 德鲁伊的配置文件: jdbc_properties
- 我们要使用 德鲁伊 (数据库连接池的jar包) 就要有配置文件
- 该文件放入 src 下

```js
// 修改成自己的数据库用户名和密码和数据库服务器中的数据库
username=root
password=qwer6666
// 这里添加的 ?use... 是为了解决时区的问题
url=jdbc:mysql://localhost:3306/book?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC


driverClassName=com.mysql.cj.jdbc.Driver
initialSize=5
maxActive=10
```


> Jdbc工具类
- 注意点:
- 1. 导入的包

```java
package com.sam.utils;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;


public class JdbcUtils {

  private static DruidDataSource dataSource;
  // 使用静态代码块 给 dataSource 属性做初始化
  static {
    try {
      Properties properties = new Properties();

      // 以反射的方式读取 jdbc.properties 配置文件
      InputStream inputStream = JdbcUtils.class.getClassLoader().getResourceAsStream("jdbc.properties");

      // 从流中加载数据
      properties.load(inputStream);

      // 创建了数据库连接池
      dataSource = (DruidDataSource) DruidDataSourceFactory.createDataSource(properties);

      // 判断数据库连接池是否创建成功 如果能得到连接就创建成功了
      // System.out.println(dataSource.getConnection());

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  // 为了测试连接池创建是否成功 我们创建一个main方法 main方法一加载当前类就会加载 类加载就会实行static代码块
  // public static void main(String[] args) { }

  // 获取数据库连接池中的连接的方法
  public static Connection getConnection() {
    Connection conn = null;

    try {
      conn = dataSource.getConnection();
    } catch (SQLException e) {
      e.printStackTrace();
    }

    // 如果返回的是null 说明获取连接失败 有值就是成功
    return conn;
  }

  // 关闭连接 放回数据库连接池
  public static void close(Connection conn) {
    if(conn != null) {
      try {
        conn.close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
  }
}

```


> 测试jdbc的工具类是否没问题
- 我们在 com.sam.test 包下 创建一个专门针对 jdbc工具类的测试类
```java
package com.sam.test;

// 注意导包 导的是我们自己创建的包 有些时候 第三方jar包可能和我们重名
import com.sam.utils.JdbcUtils;

import org.junit.Test;

import java.sql.Connection;

public class JdbcUtilsTest {
  @Test
  public void testJdbcUtils() {
    // 获取连接池里面的连接
    Connection connection = JdbcUtils.getConnection();

    // 测试看看有没有值 不是null就是连接成功
    System.out.println(connection);

    // 一定要关闭连接
    JdbcUtils.close(connection);
  }
}

```


> 4. 编写　BaseDao
- 我们在com.sam.dao.impl 下创建 BaseDao 类

- BaseDao类的作用:
- 给别人复用代码的 它不需要对象实例(让子类继承用的 不需要创建BaseDao的实例对象) 所以可以修饰为 abstract 类

- 只要是继承BaseDao类的子类 都会有它定义的方法
- 同时我们传入sql语句 传入要查询的对象类型 就能得到该类型的结果

- 它就相当于一个模板


- jar包:
- BaseDao类 要需要 DbUtils jar 我们也要导入到library中 该jar包用来操作数据库

```java
package com.sam.dao.impl;

import com.sam.utils.JdbcUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public abstract class BaseDao {
  // 使用 DbUtils 操作数据库
  private QueryRunner queryRunner = new QueryRunner();

  // update()方法用来执行: insert update delete 语句
  public int update(String sql, Object ... args) {

    // 使用 queryRunner对象的 update(参数1, 参数2, 参数3)
    // 参数1: 数据库的链接
    // 参数2: sql语句
    // 参数3: Object ... args (args是我们传入的查询条件 比如根据id username查询等 该args会跟 ? 占位符的位置一一匹配)
    Connection connection = JdbcUtils.getConnection();
    try {
      return queryRunner.update(connection, sql, args);
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      JdbcUtils.close(connection);
    }

    // 返回-1表示执行失败 返回其它表示影响的行数
    return -1;
  }

  /**
   * @desc 查询方法 返回一个对象 这是一个泛型方法
   * @param type 查询结果的对象的类型
   * @param sql 查询语句
   * @param args 我们传入的查询条件 比如根据id username查询等 该args会跟 ? 占位符的位置一一匹配
   */
  public <T> T queryForOne(Class<T> type, String sql, Object ... args) {
    Connection connection = JdbcUtils.getConnection();
    try {
      // 参数3: new BeanHandler<>(type) type是执行完前面的查询后 返回的对象的类型 我们把这个部分定义成形参
      return queryRunner.query(connection, sql, new BeanHandler<T>(type), args);
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      JdbcUtils.close(connection);
    }
    return null;
  }

  /**
   * @desc 查询返回多个对象的查询方法
   */
  public <T> List<T> queryForList(Class<T> type, String sql, Object ... args) {
    Connection connection = JdbcUtils.getConnection();
    try {
      return queryRunner.query(connection, sql, new BeanListHandler<T>(type), args);
    } catch (SQLException e) {
      e.printStackTrace();
    } finally {
      JdbcUtils.close(connection);
    }
    return null;
  }

  /**
   * @desc 查询返回一行中某一列的sql语句
   */
  public Object queryForSingleValue(String sql, Object ... args) {
    Connection connection = JdbcUtils.getConnection();
    try {
      return queryRunner.query(connection, sql, new ScalarHandler(), args);
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      JdbcUtils.close(connection);
    }

    return null;
  }
}

```


> 5. 编写 UserDao 和 测试
- BaseDao是为了给UserDao继承用抽取出来的

- UserDao是一个接口
- 我们在 com.sam.dao 下创建
- 1. 先创建一个 UserDao interface
- 2. package com.sam.dao.impl 删掉 impl 然后会飘红 停留1秒钟 点击 move - move to com.sam.dao 下

\\ interface UserDao 中应该有哪些方法？
- 是由我们的业务逻辑决定的 比如我们要完成的是 注册尚硅谷会员的界面 这个页面中有哪些需要操作数据的地方决定的

- 注册需要哪些数据库的操作?
- 1. 验证用户名是否有效 我们要去数据库查一下
- 2. 我们要将用户填入的信息保存到数据库
- 3. 登录操作 我们要根据用户名 和 密码去查询数据库 只要查不到 就说明 要不就是用户名有问题 要么就是密码有问题

- UserDao接口:
```java
package com.sam.dao;

import com.sam.pojo.User;

public interface UserDao {
  // 根据用户名 查询用户信息 如果返回null说明没有这个用户
  public User queryUserByUsername(String username);

  // 保存用户信息
  public int saveUser(User user);

  // 根据用户名 和 密码 查询用户信息 如果返回null 说明用户名或密码错误
  public User queryUserByUsernameAndPassword(String username, String password);
}

```

- UserDao接口的实现类 UserDaoImpl类
- 我们在 com.sam.dao.impl下创建
- 该类要继承BaseDao抽象类和实现UserDao接口

> 要点 sql 语句中 ? 占位符的使用
```java
package com.sam.dao.impl;

import com.sam.dao.UserDao;
import com.sam.pojo.User;

public class UserDaoImpl extends BaseDao implements UserDao {
  // 实例了 UserDao接口 中的方法
  @Override
  public User queryUserByUsername(String username) {
    // ? 是占位符 我们通过 ... args 传入的参数就是 ? 所以要对应问号的顺序
    String sql = "select id, username, password, email from t_user where username = ?";

    // 要查找的数据类型是 User.class
    return queryForOne(User.class, sql, username);
  }

  @Override
  public int saveUser(User user) {
    String sql = "insert into t_user(username, password, email) values(?, ?, ?)";

    //
    return update(sql, user.getUsername(), user.getPassword(), user.getEmail());
  }

  @Override
  public User queryUserByUsernameAndPassword(String username, String password) {
    String sql = "select id, username, password, email from t_user where username = ? and password = ?";
    return queryForOne(User.class, sql, username, password);
  }
}

```

- 写好 DAO 后我们还要测试一下
- 之前我们在 com.sam.test 包下 创建一个测试类 然后在测试类中 一个方法一个方法的测
- 我们还可以换一个方法 将要测试的方法一次性的 写在test包下

- 我们要测的是 UserDao接口中的 三个方法
- 我们在 UserDao接口中 ctrl + shift + t
- 选择 create new Test 在弹出的面板中
- 1. 选择 测试框架 junit4
- 2. classname 默认
- 3. 选中要测试的方法
- 4. destination package选择 test包

- 然后我们会发现 我们选中的方法 自动会到 test包下 并创建了一个测试类

```java
package com.sam.test;

import com.sam.dao.impl.UserDaoImpl;
import com.sam.pojo.User;
import org.junit.Test;

import static org.junit.Assert.*;

public class UserDaoTest {

  UserDaoImpl userDao = new UserDaoImpl();

  @Test
  public void queryUserByUsername() {
    if(userDao.queryUserByUsername("admin") == null) {
      System.out.println("用户名可用");
    } else {
      System.out.println("用户名已存在");
    }
  }

  @Test
  public void saveUser() {
    if(userDao.queryUserByUsernameAndPassword("admin", "admin") == null) {
      System.out.println("用户名或密码错误，登录失败");
    } else {
      System.out.println("登录成功");
    }
  }

  @Test
  public void queryUserByUsernameAndPassword() {
    // id是自增的 所以是 null
    // 输出下 只要结果不是 -1 就意味着添加成功
    System.out.println(userDao.saveUser(new User(null, "sam", "111111", "sam@gmail.com")));
  }
}
```


> 6. 编写 UserService 和 测试
- 往回写:
- 客户端 <- Web层 <- Service业务层 <- Dao持久层
- 上面我们写完了 Dao层 现在我们开始写 Service业务层

- service层表示业务:
- 我们观察下 前端的页面 都有哪些业务？
- 一个业务一个方法

- 登录界面的: 
  - 登录功能是一个业务

- 注册界面的: 
  - 注册功能是一个业务
  - 检查用户名是否存在也是一个业务


- 我们先在 com.sam.service 下创建一个 UserService接口
```java
package com.sam.service;
import com.sam.pojo.User;

public interface UserService {
  /**
   * 注册用户 也就是注册功能的业务
   * @param user
   */
  public void registUser(User user);

  /**
   * 登录 也就是登录功能的业务
   * @param user
   */
  public User login(User user);

  /**
   * 检查用户名是否可用
   * @param username
   * @return 返回true表示用户名已存在 返回false表示用户名可用
   */
  public boolean existsUsername(String username);
}

```


- UserService接口的实现类
- 我们在 com.sam.service.impl 下面创建 UserService接口的实现类UserServiceImpl类

- 我们的UserServiceImpl类是需要操作数据库的 因为里面有登录 注册等方法

- 而数据库是DAO来操作的 所以我们要在 UserServiceImpl类 中定义一个 属性 属性为 UserDao接口的实现类对象
```java
package com.sam.service.impl;

import com.sam.dao.UserDao;
import com.sam.dao.impl.UserDaoImpl;
import com.sam.pojo.User;
import com.sam.service.UserService;

public class UserServiceImpl implements UserService {

  // 因为我们要操作数据库 操作数据库就要用到 DAO层的对象 我们这里就用到 userDao
  private UserDao userDao = new UserDaoImpl();


  // 注册用户
  @Override
  public void registUser(User user) {
    // 注册用户 调用 Dao层的逻辑 来完成 就是将user保存到数据库中
    userDao.saveUser(user);
  }

  // 登录  如果返回null则登录失败 返回有值 则登录成功
  @Override
  public User login(User user) {
    // 根据用户名和密码来查询数据库 如果不为null证明能查询到 就可以登录
    return userDao.queryUserByUsernameAndPassword(user.getUsername(), user.getPassword());
  }

  @Override
  public boolean existsUsername(String username) {
    if(userDao.queryUserByUsername(username) == null) {
      // 等于null说明没有查到 没查到表示 可用
      return false;
    }
    return true;
  }
}

```


- UserServiceTest测试类
```java
package com.sam.test;

import com.sam.pojo.User;
import com.sam.service.UserService;
import com.sam.service.impl.UserServiceImpl;
import org.junit.Test;

import static org.junit.Assert.*;

public class UserServiceTest {

  // 先创建一个 UserService 的实现类对象
  UserService userService = new UserServiceImpl();

  @Test
  public void registUser() {
    // id是自增的 所以是null
    userService.registUser(new User(null, "erin", "111111", "erin@gmail.com"));
  }

  @Test
  public void login() {
    // 根据用户名和密码来进行登录
    if(userService.login(new User(null, "sam", "111111", null)) == null) {
      System.out.println("登录失败");
    } else {
      System.out.println("登录成功");
    }
  }

  @Test
  public void existsUsername() {
    if(userService.existsUsername("nn")) {
      System.out.println("用户名已存在");
    } else {
      System.out.println("用户名可用");
    }
  }
}
```


> 实现用户注册功能
- 逻辑整理:
- 当我们访问到 用户注册页面 的时候 我们会开始输入信息

    用户名: 
    密码:
    确认密码:
    邮件:
    验证码:

- 当用户输入完成 就会点击 注册 开始提交 这时候会将参数发送给服务器 去注册保存

- 服务器会有一个servlet程序来接收发送过来的数据
- 我们创建一个 RegistServlet 程序 它用来接收请求

- RegistServlet程序内需要处理的逻辑:
- 1. 获取请求参数
- 2. 检查验证码是否正确
    正确: 
      - 3. 检查用户名是否可用
        可用: 
          调用Service保存到数据库 然后跳转到 注册成功页面
          (regist_success)

        不可用: 跳回注册页面

    不正确: 跳回注册页面


- 同时 因为我们创建了 servlet程序 还要在 web.xml 中进行配置
- 配置 servlet程序的接口路径
```xml
<servlet>
    <servlet-name>RegistServlet</servlet-name>
    <servlet-class>com.sam.web.RegistServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>RegistServlet</servlet-name>
    <url-pattern>/regist</url-pattern>
</servlet-mapping>
```

- 前端页面 关于action="接口地址"和 页面中相对路径的使用
- 这里我们都使用 <base href> + 相对路径的方式

- 我们 tomcat 服务器中 工程名是 /project
- 所以 这里我们设置base路径到工程名 
```html
<base href="http://localhost:8080/project/">
```

- 注意:
- 当前页面下的 css img js 等资源资源的相对路径也要进行修改
- 不要以 / 开头
```html
	<link type="text/css" rel="stylesheet" href="static/css/style.css" >
```

- 同时 form表单的接口地址也要修改
- 因为base配置到 /project/ 而我们的servlet接口就是从 工程名后面开始的 所以直接写 regist 就可以了
```html
<form action="regist" method="post">
```

- 接下来我们开始写在服务器 servlet程序的代码

```java
package com.sam.web;

import com.sam.pojo.User;
import com.sam.service.UserService;
import com.sam.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RegistServlet extends HttpServlet {

  // 通过service层的对象 来操作数据库 web层本身不要写操作数据库的逻辑
  private UserService userService = new UserServiceImpl();


  // 处理post请求
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

    // 1. 获取请求的参数
    String username = req.getParameter("username");
    String password = req.getParameter("password");
    String email = req.getParameter("email");
    String code = req.getParameter("code");

    // 2. 检查验证码是否正确(验证码由服务器生成 先写死) 要求验证码为: abcd
    if("abcd".equalsIgnoreCase(code)) {
      // 如果验证码正确 那么就检查用户名是否可用
      // javaEE 三层模型 web -> service -> dao 必须是临层调用 不能隔层调用
      
      // 也就是说 web层是不能调用dao层的 所以这里我们需要service层的UserServiceImpl类
      if(userService.existsUsername(username)) {
        // 进入这里代表 用户名不可用 因为数据库里面已经有了
        System.out.println("用户名 [" + username + "] 已存在");
        req.getRequestDispatcher("/pages/user/regist.html").forward(req, res);

      } else {
        // 进入这里代表 用户名可用 可用的情况下我们就将其保存到数据库
        userService.registUser(new User(null, username, password, email));
        req.getRequestDispatcher("/pages/user/regist_success.html").forward(req, res);
      }

    } else {
      System.out.println("验证码 [" + code + "] 错误");
      // 当验证码不正确的时候 让其跳转到注册页面
      // getRequestDispatcher的地址必须以/打头 代表在web
      req.getRequestDispatcher("/pages/user/regist.html").forward(req, res);
    }
  }
}

```

----------------

### IDEA中 Debug 调试的使用
- Debug调试代码, 首先需要两个元素
- 1. 断点
- 2. Debug启动Tomcat运行代码(我们点那个小臭虫启动)

- 小臭虫启动后 我们一般点一个类中的第一行代码 或者点在出错的前一行

- 比如： 我们测试下面的类 那我们就在这里打断点
```java
public class RegistServlet extends HttpServlet {


  private UserService userService = new UserServiceImpl();
  // 处理post请求
  @Override

  这里打断点!!!!
  ↓
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 获取请求的参数
    String username = req.getParameter("username");
    String password = req.getParameter("password");
    String email = req.getParameter("email");
    String code = req.getParameter("code");

    if("abcd".equalsIgnoreCase(code)) {

      if(userService.existsUsername(username)) {
        System.out.println("用户名 [" + username + "] 已存在");
        req.getRequestDispatcher("/pages/user/regist.html").forward(req, res);

      } else {
        userService.registUser(new User(null, username, password, email));
        req.getRequestDispatcher("/pages/user/regist_success.html").forward(req, res);
      }

    } else {
      System.out.println("验证码 [" + code + "] 错误");
      req.getRequestDispatcher("/pages/user/regist.html").forward(req, res);
    }
  }
}

```

- 当我们故意输入不正确的 验证码 debug 窗口就会被激活

> debug调试都需要注意哪些点
> 1. 调试的按钮区域
  - step over: 让代码让下走一行

  - step into: 可以进入当前的方法内(自己写的代码 非框架源码)
  - step out:  跳出当前方法体外(跳出去)

  - force step into: 
    强制进入当前方法体内(是不是自己写的代码 都可以进去 包括框架的代码)

  - run to cursor:
    跳到当前的光标处(可以跳转鼠标光标的位置)


> 2. variables面板
- 它可以查看*当前方法范围内*所有有效的变量 显示的变量是随着当前方法的改变而发生变化

> 3. frames方法调用栈窗口
- 1. 可以查看当前线程有哪些方法调用信息
- 2. 列表中的方法是 下面的方法调用上一行的方法
<!-- 栈结构 先调用的方法在栈底 -->


> 左侧侧边栏的按钮区
- stop: 
  停止调试(都停了)

- resume program:
  程序一直跑 知道下一个断点停下来 如果没有断点就一直往下跑

- mute:
  临时禁用所有的断点

----------------

### 用户登录功能实现
- 登录页面也是一样 用户一行来需要输入内容
 - 用户名:
 - 密码: 
 - 登录

- 用户输入完成后 会将数据发送给服务器端
- 服务器端需要有程序有来接收数据 LoginServlet程序

- LoginServlet程序中:
- 1. 获取请求的参数
- 2. 调用XxxService.xxx()方法处理业务
<!-- userService.login()登录 -->

- 3. 根据上述方法的返回值 确定登录成功还是失败
    成功:
      跳转到成功页面

    失败:
      跳转回登录页面


- 接下来我们在 com.sam.web 里面写 LoginServlet 类
```java
package com.sam.web;

import com.sam.pojo.User;
import com.sam.service.UserService;
import com.sam.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginServlet extends HttpServlet {

  private UserService userService = new UserServiceImpl();

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    String username = req.getParameter("username");

    String password = req.getParameter("password");

    if(userService.login(new User(null, username, password, null)) == null) {
      // 登录失败
      System.out.println("用户名或密码输入不正确");
      req.getRequestDispatcher("/pages/user/login.html").forward(req, res);
    } else {
      // 登录成功
      req.getRequestDispatcher("/pages/user/login_success.html").forward(req, res);
    }
  }
}

```

- 也要注意
- 1. html页面 base标签的配置
- 2. css js等src的设置
- 3. action的设置
- 4. web.xml的设置

----------------

### JSP
- jsp的全称是 java server pages
- java的服务器页面

- jsp的主要作用是代替servlet程序回传html页面的数据
- 因为servlet程序回传html页面数据时一件非常繁琐的事情 开发成本和维护成本都极高

- 下面我们看下 servlet程序 怎么回传页面的
```java
package com.sam.jsp;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class PrintHtml extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    // 设置响应对象的编码格式
    resp.setContentType("text/html; charset=UTF-8");

    // 得到响应流
    PrintWriter writer = resp.getWriter();
    writer.write("<!DOCTYPE html>\r\n");
    writer.write("<html lang=\"en\">\n");
    writer.write("<head>\n");
    writer.write("<meta charset=\"UTF-8\">\n");
    writer.write("<title>Title</title>\n");
    writer.write("</head>\n");
    writer.write("<body>\n");
    writer.write("<h3>这是servlet回传的页面数据</h3>\n");
    writer.write("</body>\n");
    writer.write("</html>\n");
  }
}

```

- 几乎是用 write() 方法一行行的拼接出来的 这样写出的代码得多麻烦 写的时候还没有任何的提示工具

- 那jsp又是怎么做到的？

> 创建 jsp 文件
- 我们在 web 文件目录下面 new -- jsp 文件

- jsp文件的模板: 

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h3>这是一个 jsp 页面</h3>
</body>
</html>
```


> jsp如何访问？
- jsp页面和html页面一样 都是存放在web目录下 访问也跟访问html一样

- http://ip:port/工程名/a.jsp


> jsp页面的本质
- 我们看看为什么jsp能够很好的替代 servlet程序回传的页面
- jsp页面*本质上是一个servlet程序*
<!-- 
  为什么这么说呢？
  因为当我们第一次访问 jsp页面的时候

  某个文件夹中 org/apache/jsp/ 目录下 会多出
  a__jsp.class
  a__jsp.java
 -->

- 也就是说当我们第一次访问jsp页面的时候 Tomcat服务器会帮我们把jsp页面翻译成一个java源文件 并且对它进行编译成为.class字节码程序(我们打开这个java源文件 其内部的内容是)
```java
public final class a__jsp extends org.apache.jasper.runtime.HttpJspBase implements org.apache.jasper.runtime.JspSourceDependent, ... {

}
```

- 我们跟踪源代码发现 HttpJspBase类 直接的继承了 HttpServlet类 也就是说 jsp翻译出来的java的类 它间接的继承了HttpServlet类 也就是 翻译出来的是一个servlet程序


> 总结:
- 通过翻译的java源代码我们就可以得到结果:
- jsp就是servlet程序
```java
/*
  this is the super class of all jsp-generated servlets
*/
public abstract class HttpJspBase extends HttpServlet implements HttpJspPage { ... }
```

- 底层实现也是通过输出流 writer.write() 回传到客户端的

----------------

### jsp头部的 page指令
```xml
<%@ page 
  contentType="text/html;charset=UTF-8"
  language="java" 
%>
```

> page指令
- 可以修改jsp页面中的一些重要的属性或者行为

> 常用的page属性
> language
- 表示jsp翻译后是什么语言文件 暂时只支持 java

> contentType
- 表示jsp返回的数据类型是什么 也是源码中:
- res.setContentType()

> pageEncoding
- 表示当前jsp页面本身的字符集

> import
- 跟java源代码中的使用方式一样 用于导包导类
```java
<%@ page import="java.util.Map" %>
```

---

> autoflush
- 设置当out输出流缓冲区满了之后 是否自动刷新缓冲区 
- 默认值是true

> buffer
- 设置out缓冲区的大小 
- 默认是8kb

- 上述两个属性是给 out 输出流使用的

<!-- 
  比如:
   jsp页面上有特别多的内容 但是我设置的是
   <%@ page 
    autoflush = false
    buffer: "1kb"
  %>

  页面就会报 JSP Buffer overflow 缓冲满了之后不能自动刷新报的错误

  记住 JSP页面也是java程序
 -->

---

> errorPage
- 设置当jsp页面 *运行时出错* 自动跳转去的错误页面

- errorPage="/路径"
- 这个路径一般都是以 斜杠开头 表示请求地址为 
- http://ip:port/工程名/  
- 映射到代码的web目录

```java 
// 当我们下方的jsp页面中的代码出现错误的时候 自动跳转到 指定的错误提示页面上
<% page errorPage = "/error500.jsp" %>

<body>
  jsp页面

  <!-- 下方的代码会报错 -->
  <%
    int i = 12 / 0;
  %>
</body>
```

> isErrorPage
- 设置当前jsp页面是否是错误信息页面 默认是false
- 如果是true 可以获取异常信息

> session
- 设置访问当前jsp页面 是否会创建 HttpSession对象
- 默认是true

> extends
- 设置jsp翻译出来的ajva类默认继承谁
- 就跟 java类中类的继承是一样的 相当于修改了 java类继承的位置

```java
<%@ page extends="java.servlet.HttpServlet "%>
```


- 修改上面的属性 相当于修改 java类中的属性

----------------

### jsp 常用的脚本
- jsp页面对应的java类在
- /Library/Tomcat8/work/Catalina/localhost/ROOT/org/apache/jsp

> 声明脚本 (不太使用)
- 我们可以在jsp页面中 写出下面的结构 在结构中使用Java代码
- 我们声明的所有java结构 都会体现在 该页面对应的java类中 相当于我们在页面上的java操作 会被翻译到页面的java类中

> 声明脚本的格式: <%! ... %>
- 作用:
- 可以给jsp翻译出来的java类定义属性和方法
- 甚至是静态代码块 内部类等

```html
<body>
  <%! 声明java代码 %>
</body>
```

> 练习:
- 在jsp页面中 声明:
  类属性
  静态代码快
  类方法
  内部类
```java
// 页面中用到什么结构 会自动使用该方法进行导包
<%@ page import="java.util.Map" %>
<%@ page import="java.util.HashMap" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
// 声明类属性
<%!
    private Integer id;
    private String name;
    private static Map<String, Object> map;
%>

// 声明静态代码块 可以给上面的map进行赋值
<%!
    static {
        map = new HashMap<String, Object>();
        map.put("key1", "value1");
    }
%>

// 声明类的方法
<%!
    public int getNum() {
      return 12;
    }
%>

// 声明内部类
<%!
    public static class A {
      private Integer id;
    }
%>
</body>
</html>
```

------

> 表达式脚本 (常用)
- 表达式脚本的作用是: *在jsp页面上输出数据*
- 也就是直接往页面上输出信息 *在底层上*表达式都会通过 print() 方法输出在页面上

- out.print( 表达式 )


> 表达式脚本的格式是: <%= ... %>
```html
<body>
  <%= 表达式脚本 %>
</body>
```

> 为什么可以利用 表达式脚本 向页面输出内容
- 我们观察源码(jsp页面会被翻译成一个java类 我们看的这个)发现 类中有一个方法

- _jspService() 该方法中还是利用了 输出流在java类中拼接页面的形式 拼接出来的
```java
out.print(12)
out.write("<br>\r\n")
out.print(12.12)
out.write("<br>\r\n")
out.print("我是字符串")
out.write("<br>\r\n")
out.print(map)
out.write("<br>\r\n")
```


> 特点:
- 1. 所有的表达式脚本都会被翻译到 _jspService() 方法中

- 2. 表达式脚本都会被翻译成 out.print(内容) 输出到页面上

- 3. 由于表达式脚本翻译的内容都在 _jspService() 方法里所以_jspService()方法中的对象 都可以直接使用
- 比如: *req, res 我们也能在 表达式脚本中使用*

- 4. *表达式脚本的表达式不能以 ; 结尾*
<!-- 
  如果下面这样就会报错
  <%=
    request.getParameter("username");
  %>

  jsp被翻译过来后
  out.print(request.getParameter("username"););

  所以表达式不能加 ; 
 -->

```java
// 比如 service() 方法中有如下对象: 
public void _jspService(
  final javax.servlet.http.HttpServletRequest request, 
  
  final javax.servlet.http.HttpServletResponse response
)
       
  final javax.servlet.jsp.PageContext pageContext;
  final javax.servlet.ServletContext application;
  final javax.servlet.ServletConfig config;
  javax.servlet.jsp.JspWriter out = null;
  final java.lang.Object page = this;
  javax.servlet.jsp.JspWriter _jspx_out = null;
  javax.servlet.jsp.PageContext _jspx_page_context = null;
```


> 练习:
- 在jsp页面上 利用表达式 脚本输出
  整型
  浮点型
  字符串
  对象

```html
<body>
<%!
    private static Map<String, Object> map;
%>

<%!
    static {
        map = new HashMap<String, Object>();
        map.put("key1", "value1");
    }
%>

<%!
    public static class A {
      private Integer id;
    }
%>


<%= 12 %> <br>
<%= 12.12 %> <br>
<%= "我是字符串" %> <br>

<!-- 因为上面我们已经通过静态代码块 给map赋值了 所以页面上会正常显示 map对象 -->
<%= map %> <br>

<!-- 
  因为 service() 方法有中req对象 所以我们也可以利用req身上的方法 将url上的参数显示到页面上

  比如 我们地址栏输入
  http://ip:port/?usernmae=sam
 -->
<%=
  request.getParameter("username")
%>

</body>
```

------

> 代码脚本
- 代码脚本的作用:
- 可以在jsp页面中 编写我们自己需要的功能(写的是java语句)

**注意:**
- <% java语句 %>  都*会被翻译到 _jspService() 方法中*

- 也就是说我们在 _jspService() 方法中 可以写的东西 在代码脚本中都可以写

- 所以我们要是声明方法的话 就不行了 因为方法内部不能定义方法 所以要是声明方法的话 还是需要使用声明脚本


> 代码脚本的格式 <% ... %>
```html
<body>
  <% java语句 %>
</body>
```


> 特点:
> 1. 代码脚本翻译之后都在 _jspService() 方法中

> 2. 代码脚本由于翻译到 _jspService() 方法中 所以在_jspService() 方法中的现有对象 都可以直接使用

> 3. 还可以由多个代码脚本块组合完成一个完整的java语句
```java
// 类似这样也可以 但这又啥用
<%
  for(int j=0; j<10; j++) {
%>

<%
    System.out.println(j);
  }
%>
```

> 4. 代码脚本还可以和表达式脚本一起组合使用(引引加加) 在jsp页面上显示数据
- 比如 我想让 for循环中的i 在jsp页面上输出 
```java
// 正常的for循环
<%
  for(int i=0; i<10; i++) {
    System.out.println(i);
  }
%>

// 现在我想让 i 在页面上显示 这就要使用到 脚本标记的嵌套 好像引引加加啊
<%
  for(int i=0; i<10; i++) {
%>
    // 插入 表达式脚本
    <%= i %> <br>
<%
  }
%>
```

- 利用这点我们可以在页面上输出任何的东西 本质相当于
- "今天天气真不错 很" + 变量 + "啊！"

- 比如我们还可以完成类似 v-for 的逻辑
```html
<table>
  <tr>
    <%
      for(int i=0; i<10; i++) {
    %>
      <td> 第 <%= i + 1 %> 行 </td>
    <%
      }
    %>
  </tr>
</table>
```

- 比如 if语句也一样 我们让结果输出到页面 也是利用 引引加加 甚至也可以用它来完成 v-if 的逻辑
```html
<%
  int i = 12;
  if(i == 12) {
%>
  <h1><%= "i为12" %></h1> <br>
<%
  }
%>
```

> 练习:
- 我们利用 代码脚本 写
- if语句
- for循环语句
- 翻译后java文件中 _jspService方法内的代码都可以写

```html
<body>
  <%=
    request.getParameter("username")
  %>

  <%
    int i = 12;
    if(i == 12) {
      System.out.println("i为12");
    } else {
      System.out.println("i不为12");
    }
  %>

  <%
    for(int j=0; j<10; j++) {
      System.out.println(j);
    }
  %>

<!-- 
  因为我们写的代码脚本相当于写在 jspService() 方法中 那就是说 该方法内容的对象我们可以直接使用 比如 req
 -->
  <%
    String username = request.getParameter("username");
    System.out.println(username);
  %>
</body>
```

----------------

### jsp中 三种注释
- jsp中可以写3种注释

> html注释
- html注释会被翻译到java源代码中 在jspService方法里以 out.write() 输出到客户端
<!-- html注释 -->

> java注释
- java注释会被翻译到java源代码中
- 一般java注释是声明在 代码脚本 声明脚本中使用

> jsp注释
- jsp注释可以注释掉 jsp页面中的所有代码 
- 我们要是想注释掉代码级的东西 就使用这种注释

----------------

### jsp中 九大内置对象
- jsp中的内置对象 是指Tomcat在翻译jsp页面成为servlet源代码后 内部提供的九大对象 叫内置对象

```java
public void _jspService(
  final javax.servlet.http.HttpServletRequest request, 
  final javax.servlet.http.HttpServletResponse response
)
      
  final javax.servlet.jsp.PageContext pageContext;

  final javax.servlet.ServletContext application;

  final javax.servlet.ServletConfig config;

  javax.servlet.jsp.JspWriter out = null;

  final java.lang.Object page = this;

  javax.servlet.jsp.JspWriter _jspx_out = null;

  javax.servlet.jsp.PageContext _jspx_page_context = null;

```

**注意:下面的对象的名字是底层源码的名字不是我们自己起的 必须这么用 比如: 不能将request写成req**

- request: 
  请求对象

- response: 
  响应对象

- pageContext: 
  jsp的上下文对象

- sesstion:
  会话对象

- application:
  servletContext对象(servlet里面的上下文对象)

- config:
  servletConfig对象

- out:
  jsp输出流对象

- page
  指向当前jsp的对象

- exception:
  异常对象
<!-- 
  异常对象 必须设置为 true 的时候 才能开启
  <%@ page isErrorPage="true" %>
 -->

----------------

### jsp中 四大域对象 
- 在上述的9个内置对象中有4个是域对象
- 四个域对象分别是:

- 1. pageContext  (PageContextImpl类):
    
- 2. request      (HttpServletRequest类):

- 3. session      (HttpSession类):

- 4. application  (ServletContext类):

- 域对象是可以像 Map 一样存取数据的对象
- 4个月对象的功能一样 不同的是它们对数据的存取范围

> 域对象数据的存取范围
- 1. pageContext:
  - 当前jsp页面范围内有效

- 2. request:
  - 一次请求内有效

- 3. session:
  - 一个会话范围内有效(打开浏览器访问服务器 直到关闭浏览器, 浏览器不管会话一直都在)

- 4. application:
- 整个web工程范围内都有效(只要web工程不停止 数据都在 该对象在web工程启动的时候创建 停止的时候销毁)

---

> 实验1:
- 我们在 scoped1.jsp 中 往4个域对象中存数据
- 然后再在 scoped1.jsp 中 读出来 发现没有问题 正常读取
- 因为都在这4个域对象的存储范围

```java
<body>
    <h1>scoped jsp页面</h1>
<%
    pageContext.setAttribute("key", "pageContext");
    request.setAttribute("key", "request");
    session.setAttribute("key", "session");
    application.setAttribute("key", "application");
%>


<h5>
pageContext域是否有值: 
<%= pageContext.getAttribute("key") %> <br>

request域是否有值: 
<%= request.getAttribute("key") %> <br>

session域是否有值: 
<%= session.getAttribute("key") %> <br>

application域是否有值: 
<%= application.getAttribute("key") %> <br>
</h5>

// pageContext是当前页面内有效: 我们现在就是 scoped1.jsp

// request是一次请求有效
// sesstion是浏览器没有关闭就有效
// application是web工程不关闭就有效
</body>
```


> 实验2:
- 接下来我们让域的范围不断的变大 我们观察下 哪些域的数据就无效了

- 我们让 scoped1.jsp 通过请求转发 跳转到 scoped2.jsp
- 我们在scoped2.jsp中直接读数据 看看数据的情况

```java
<h5>
pageContext域是否有值: 
<%= pageContext.getAttribute("key") %> <br>
  // null


request域是否有值: 
<%= request.getAttribute("key") %> <br>
  // request


session域是否有值: 
<%= session.getAttribute("key") %> <br>
  // session

application域是否有值: 
<%= application.getAttribute("key") %> <br>
  // application
</h5>
```

- 我们发现 pageContext 域对象中的数据为null了
- 因为 pageContext 已经离开了当前的 scoped1.jsp 所以在 scoped2.jsp 页面中取不出来 

- request有值是因为请求转发算一次请求
- session有是因为浏览器没有关
- application有是因为服务器没有停


> 实验3:
- 上面我们是访问 scoped1.jsp 转发到 scoped2.jsp 这是一次请求

- 但是我们直接输入 localhost:8080/scoped2.jsp 这是单独的请求了scoped2.jsp 这是两次请求所以 

```java
<%= request.getAttribute("key") %> <br>
  // null
```

> 实验4:
- 关闭浏览器后 sesstion域对象中的数据也没有了

> 实验5:
- 关闭或重新部署服务器 application域对象中的数据也没有了 

> 问题:
- 4个域对象都可以存取数据 那我们使用哪个？

- 虽然4个域对象都可以存储数据 在使用上他们是有优先顺序的
- *四个域在使用的时候 优先顺序是:*

  pageContext - request - session - application

- 我们存的数据还是占用内存的 如果我们选择最小的有效范围 那么就会在最短在数据不需要用的情况下 就能最快的释放内存 减轻服务器的压力

----------------

### jsp中 out输出 和 response.getWriter输出的区别
- response表示响应:
- 我们经常用于设置返回给客户端的内容(输出)

- out:
- 也是给用户做输出使用的

- 那它们有什么样的区别呢？
- out输出流 和 getWrite输出流都有各自的缓冲区
- 两个流在输出的时候都是输出到自己的缓冲区里面的 比如我们jsp页面上打印
```java
<%
  out.write("out输出1 <br>");
  out.write("out输出2 <br>");

  response.getWriter().write("response输出1 <br>");
  response.getWriter().write("response输出2 <br>");
%>
```
<!-- 
  out缓冲区       response缓冲区
  --------       -------------

  out输出1        response输出1 
  out输出2        response输出2

 -->

> 当jsp页面中所有代码执行完成后 会做以下的两个操作
- 1. 执行 out.flush() 操作, 会把out缓冲区中的数据 *追加写入到*response缓冲区的*末尾*

- 2. 会执行response的刷新操作 把response缓冲区中的数据写给客户端

- 所有上面的jsp页面上的结果会是:
- response输出1
- response输出2
- out输出1
- out输出2

- 即使 out语句 在 response语句的上面

- 那我们使用哪种输出流呢？
- 我们发现源代码的底层中都使用的是 out.print() 

**注意:**
- 由于jsp翻译之后 底层源代码都是用out来进行输出 所以一般情况下 我们*在jsp页面中统一使用out来进行输出* 避免输出数据的顺序混乱


> out.write()
- 该方法只适合输出字符串
<!-- 
  底层是将传入的数据 强转为char 字符串没有问题 但是其它的类型转为char就会转为对应的asc2码 会出现问题
 -->

> out.print()
- 输出任意数据都没有问题(都转换成为字符串后调用的write输出)

- 深入源码，浅出结论:
- 在jsp页面中 可以统一使用 out.print() 来进行输出

----------------

### jsp中 常用标签
- 什么时候才需要用 下面的3组标签呢？
- 一般网页都分为3个部分

  头部: 导航 菜单 轮播等

  主体: 页面的主体内容

  脚部: 联系我们

- 一般大型的网站会有3级页面 4级页面 这样的页面可能有上万个 那就是说我们要在上万个网站中维护相同的内容

- 比如我们要改一处修改需要去上万个页面上改相同的地方 这维护起来就很难了
- 要是我们修改一处就完全都改过来了 不就好了 这里就需要下面的包含的功能
<!-- 
  就相当于 我们给 脚部 单独设置一个组件 其它页面中都引入这个组件

  这个动作在jsp里面叫做包含
 -->

> 静态包含 <%@ include file="/路径" %>
- file属性指定要引入的jsp页面的路径
- 地址中第一个斜杠表示为 http://ip:port/工程名
(映射到代码的web目录)

- main.jsp
```html
<body>

    头部内容 <br>

    主体内容 <br>

    <%@ include file="/include/footer.jsp"%>
</body>

<!-- 
  | - web
    | - include
      - footer.jsp
    
    - main.jsp
 -->
```

> 静态包含的特点:
- 被包含的jsp页面 就是指引入的组件

- 1. 静态包含不会翻译被包含的jsp页面
- 2. 静态包含其实是把被包含的jsp页面的代码拷贝到包含的位置执行输出

------

> 动态包含 <jsp:include page="/路径"></jsp:include>
- 使用的是 <jsp:include></jsp:include>标签 内部指定page属性

- page属性:
- 要引入的文件的路径

- 动态包含也可以实现静态包含的效果 只是底层的原理不太一样 它也是可以像静态包含一样 把被包含的内容执行输出到包含位置


> 动态包含的特点 (包括页面传值)
- 1. 动态包含会把包含的jsp页面也翻译成java代码
- 2. 动态包含不在是在被引入页面的内容 使用out.print()一行行的输出在页面上 

- 而是 一条java语句
- JspRuntimeLibrary.include(request, response, "/include/footer.jsp", out, false)

- 通过上面的代码去调用被包含的jsp页面执行输出

- 3. 动态包含还可以传递参数 到引入的页面里(传值到另一个页面)
```html
<jsp:include page="/include/footer.jsp">
  <jsp:param name="key1" vlaue="value1">
  <jsp:param name="key2" vlaue="value2">
</jsp:include>
```

- B页面通过如下方式获取A页面传递过来的参数
```html
<h1>
  A页面传递过来的内容是: 
  <%= request.getParameter("key1")%>
</h1>
```

- 开发中绝大多数都是使用静态包含 

> jsp标签 - 请求转发 
> <jsp:forward page=""></jsp:forward>
- 以前我们是通过 代码脚本 中写 java代码来完成请求转发的功能 比如:
```java
<body>
  <%
    request.getRequestDispatcher("/scoped2.jsp").forward(req, res);
  %>
</body>
```

- 现在 在jsp页面中 请求转发我们可以利用一个标签来实现
- <jsp:forward page=""></jsp:forward>
- 它的功能跟上面的java代码一样就是请求转发的标签形式的语法糖

- page请求设置路径

----------------

### jsp练习:
- 练习 jsp与servlet程序配合使用的场景
- servlet将获取的结果数据 交给 jsp页面做呈现


- 1. jsp输出一个表格 里面有10个学生的信息

```html
<body>
   <%
        List<Student> list = new ArrayList<>();
        for(int i=0; i<10; i++) {
          list.add(new Student(i+1, "学生姓名" + i + 1, i + 1, "phone: " + i));
        }
   %>

    <table>
    <%
        for (Student student: list) {
    %>
        <tr>
            <td><%= student.getId() %></td>
            <td><%= student.getName() %></td>
            <td><%= student.getAge() %></td>
            <td><%= student.getPhone() %></td>
        </tr>
    <%
        }
    %>
    </table>
</body>
```

- 2. 前端有 根据用户输入的关键字 来展现相关信息的功能
- 比如 我们输入 张 就把所有张姓的学生信息 输出到页面上

- 前后端的逻辑
<!-- 
  客户端:
    输入 关键字 搜索 学生信息

  点击 搜索 后会将请求发送给服务端的 servlet程序(SearchStudentServlet)

  服务端:
    1. 获取请求的参数: 关键字
    2. 发送sql语句到数据库去查询学生信息
    3. 遍历查询到的结果输出给客户端显示

  但是我们讲jsp的时候也说了 servlet程序不适合直接把数据回传到客户端 也就是说 3 在servlet里面实现是非常麻烦的

  jsp页面就特别适合做这样的事情
 -->

- jsp页面配合servlet程序 将结果数据展示在页面上的逻辑
<!-- 
  我们创建一个 showStudent.jsp 页面 用来展示学生的数据

  也就是说上面的 步骤3 我们希望给jsp页面来做
  也就是说 我们需要 jsp 和 servlet 共同完成一个功能

  那我们思考下:
  怎么从servlet程序 到 jsp页面呢 ？ 并同时把结果数据带到jsp页面中

  SeachStudentServlet -> showStudent.jsp
 -->

- 我们在 servlet程序里面 可以通过 请求转发 到jsp页面
- 数据可以通过 request域对象 传递
- 也就是说将查询到的学生信息保存到 request域 中
- 然后jsp读取域对象中的数据 展示在域对象中


- SearchStudentServlet类
```java
package com.sam.jsp;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class SearchStudentServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 1. 获取请求的参数

    // 2. 发sql语句查询学生的信息

    // 3. 保存查询到的结果 到 request域中 这里我们使用for循环模拟查询到的数据
    List<Student> list = new ArrayList<>();
    for(int i=0; i<10; i++) {
      list.add(new Student(i+1, "学生姓名" + i + 1, i + 1, "phone: " + i));
    }

    // 将查询结果保存到 域对象中
    req.setAttribute("studs", list);

    // 4. 请求转发到 showStudent.jsp
    req.getRequestDispatcher("/scoped.jsp").forward(req,resp);
  }
}

```


- jsp页面 获取数据的方式 通过 request.getAttribute() 方法
```html
<body>
    <h1>我也展示页面: </h1>
   <%
        <!-- 这里为什么要类型转换呢？ 因为获取到的结果是一个Object -->
        List<Student> students = (List<Student>) request.getAttribute("studs");
   %>

    <table>
    <%
        for (Student student: students) {
    %>
        <tr>
            <td><%= student.getId() %></td>
            <td><%= student.getName() %></td>
            <td><%= student.getAge() %></td>
            <td><%= student.getPhone() %></td>
        </tr>
    <%
        }
    %>
    </table>
</body>
```


**注意:**
- 我们上面的代码写完了 但要注意的是 访问流程
- 我们一定要先通过 /search 接口访问 SearchStudentServlet程序 然后通过它转发到 jsp页面才可以 如果我们直接访问 jsp页面就会报空指针异常的错误

- 因为没有经过servlet程序 request域中是没有数据的

----------------

### Listener监听器
- Listener监听器是javaweb的三大组件之一, javaweb的三大组件分别是:
- 1. servlet程序
- 2. filter过滤器
- 3. listener监听器

- Listener是JavaEE的规范 它是一个接口
```java
public interface ServletContextListener extends EventListener {

  void contextInitialized(ServletContextEvent var1);

  void contextDestroyed(ServletContextEvent var1);
}
```

- 作用:
- 监听某种事物的变化 通过回调函数 反馈给客户(程序)去做一些相应的处理

- 监听器一共有8个 随着技术的发展绝大多数的监听器已经使用不上了 只有ServletContextListener监听器还有用


> ServletContextListener监听器
- 该监听器可以监听 ServletContext 对象的创建和销毁
- ServletContext对象在web工程启动的时候创建 在web工程停止的时候销毁

- 监听到创建和销毁之后都会分别调用ServletContextListener监听器的方法反馈

- 两个方法分别是:
> void contextInitialized(ServletContextEvent var1)
- 该方法在ServletContext对象创建之后马上调用 做初始化

> void contextDestroyed(ServletContextEvent var1)
- 该方法在ServletContext对象销毁之后调用


- 如何使用ServletContextListener监听器监听ServletContext对象？


> 使用步骤:
> 1. 编写一个类去实现 ServletContextListener 接口
> 2. 实现其两个回调方法
```java
package com.sam.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class MyServletContextListener implements ServletContextListener {

  @Override
  public void contextInitialized(ServletContextEvent servletContextEvent) {
    System.out.println("servlet-context对象被创建了");
  }

  @Override
  public void contextDestroyed(ServletContextEvent servletContextEvent) {
    System.out.println("servlet-context对象被销毁了");
  }
}

```

> 3. 到web.xml中去配置监听器
- 就需要下面这一个标签
```xml
<listener>
  <listener-class>com.sam.listener.MyServletContextListener</listener-class>
</listener>
```

- 然后我们重新部署服务器就会生效
- 这样我们就可以利用这两个方法记入一些信息 或者 实现一些功能

----------------

### EL表达式
- EL表达式的全程是 expression language 即表达式语言

- EL表达式的作用:
- 代替jsp页面中的表达式脚本在jsp页面中进行数据的输出

- 因为EL表达式在输出数据的时候 要比jsp表达式脚本简洁很多
- 比如
```html
<body>
  <!-- 先存在数据 -->
  <%
    request.setAttribute("key", "value");
  %>

  <h5>
    表达式脚本输出key的值: 
    <%= request.getAttribute("key") %>
  </h5>

  <h5>
    EL表达式输出key的值: 
    ${key}
  </h5>
</body>
```

> EL表达式的格式: ${表达式}
- el表达式主要是在jsp页面中输出数据
- 主要是输出域对象中的数据

- 比如在读取域中的数据的时候 我们传入的 直接是域中的key 不用加引号


> EL表达式的特点
- 我们发现 EL表达式 仅需要使用 *${}* 就可以 简洁了很多
- 而且 当我们输出的数据不存在的时候
- jsp表达式脚本: 会显示 null
- el表达式: 会显示 空


> EL表达式搜索4个域的顺序
```html
<body>
  <%
    <!-- 往4个域中保存了相同key的数据 -->
    pageContext.setAttribute("key", "pageContext");
    request.setAttribute("key", "request");
    session.setAttribute("key", "session");
    application.setAttribute("key", "application");
  %>
  
  <!-- 这里我们会输出哪个值 -->
  ${key}
</body>
```

- 当4个域中都有相同的key的数据的时候 EL表达式会按照4个域的从小到大的顺序去进行搜索 找到就输出

- pageContext - request - session - application
- 如果pageContext里面没有会去request中找 依次类推


> EL表达式 读取各种数据类型的方式
- 上面我们都是在 域对象中 保存的是简单类型的数据 比如一个字符串之类的

- 如果我们在 域对象中保存的时候 javabean 而且还有各种属性 数组 list集合 map集合等 这时候是怎么输出的呢？

- 先创建一个Person类
- 注意: 这里我们写了各个属性对应的get()
```java
package com.sam.pojo;

import java.util.List;
import java.util.Map;

public class Person {
  private int name;
  private String[] phones;
  private List<String> cities;
  private Map<String, Object> map;

  public Person() {
  }

  public Person(int name, String[] phones, List<String> cities, Map<String, Object> map) {
    this.name = name;
    this.phones = phones;
    this.cities = cities;
    this.map = map;
  }

  public int getName() {
    return name;
  }

  public void setName(int name) {
    this.name = name;
  }

  public String[] getPhones() {
    return phones;
  }

  public void setPhones(String[] phones) {
    this.phones = phones;
  }

  public List<String> getCities() {
    return cities;
  }

  public void setCities(List<String> cities) {
    this.cities = cities;
  }

  public Map<String, Object> getMap() {
    return map;
  }

  public void setMap(Map<String, Object> map) {
    this.map = map;
  }
}

```

- 我们在jsp页面中 设置person的值
```java
<%
  Person person = new Person();

  person.setName("sam");

  person.setPhones(new String[]{"电话1", "电话2", "电话3"});

  List<String> list = new ArrayList<>();
  list.add("北京");
  list.add("上海");
  list.add("大连");
  person.setCities(list);

  Map<String, Object> map = new HashMap<>();
  map.put("key1", "value1");
  map.put("key2", "value2");
  map.put("key3", "value3");
  person.setMap(map);

  // 我们把person放入到4个域中
  pageContext.setAttribute("person", person);
%>
```

> 读取对象中的属性
> ${对象.属性名}
- 对象后面直接跟着 对象中的属性 该属性是不是private没有关系
- 因为在读取属性的时候 el表达式看的是属性对应的get()方法

**注意:**
- 如果属性没有对应的get()方法就会报错

```java
${person.name}
```

> 读取数组
- 通过下标获取数组中的指定元素
```java
${person.phones[0]}
```

> 读取list
- 通过下表读取list中指定的元素
```java
${person.cities[0]}
```

> 读取map
- map属性.map中的key
```java
${person.map.key1}
```

----------------

### EL表达式 -- 运算
- el表达式不仅仅可以输出数据 还可以进行运算 将*运算后的结果进行输出*

> 关系运算
- ${5==5} 页面输出的结果是 true

  == 或 eq    ${5==5 或 5 eq 5}   true
  != 或 ne
  < 或 lt
  > 或 gt
  <= 或 le
  >= 或 ge


> 逻辑运算
  && 或 and   ${12 == 12 && 12 < 11}  false
  || 或 or
  ! 或 not


> 算数运算
  +
  -
  *
  / 或 div
  % 或 mod


> empty运算 ${empty 要检查的对象}
- empty运算可以判断一个数据是否为空 
  如果为空返回true 
  不为空输出false

- 为空的情况
- 值为null值 为空
- 值为空串的时候 为空
- 值是object类型数组 长度为0的时候 为空
- list集合 元素个数为0 为空
- map集合 元素个数为0 为空

```html
<%
  request.setAttribute("emptyNull", null);
%>

${empty emptyNull}
```


> 三元运算 表达式 ? 值1 : 值2
- 跟我们熟悉的用法是一样的
```java
${ 12 == 12 ? "帅" : "不帅" }
```


> . 点运算 和 [] 中括号运算
- . 运算: 可以输出 Bean 对象中某个属性的值
- []运算: 可以输出有序集合中某个元素的值 还可以输出map集合中key里含有特殊字符的key的值

**注意:**
- 当map中没有对应的key值的时候 结果会是0 也不是null

```java
<%
  Map<String, Object> map = new HashMap<>()
  map.put("a.a.a", "aaaValue")
  map.put("b+b+b", "bbbValue")

  request.setAttribute("map", map)
%>

// 当key中有特殊字符的时候 使用[] key用引号引起来
${map["a.a.a"]}
```

----------------

### EL表达式 11个隐含对象
- el表达式中11个隐含对象 是el表达式中自己定义的 可以直接使用

- 也就是在 ${ 这里直接用 }

> pageScope(Map<String, Object>):
- 可以获取 pageContext 域中的数据
<!-- 
  域中的数据是以键值对的形式存在的 所以把数据放在的map中 我们通过 pageScope 获取
 -->

```java
<%
  pageContext.setAttribute("key", "pageContext");
  request.setAttribute("key", "request");
  session.setAttribute("key", "session");
  application.setAttribute("key", "application");
%>

${pageScope.key}
```

- pageScope 就对应着 pageContext域 我们可以通过pageScope拿到pageContext域的数据

- 下面的三个也一样


> requestScope(Map<String, Object>):
- 可以获取 request 域中的数据
<!-- 
  key是String
  value是Object类型的数组
 -->


> sessionScope(Map<String, Object>):
- 可以获取 session 域中的数据
<!-- 
  key是String
  value是Object类型的对象
 -->


> applicationScope(Map<String, Object>):
- 可以获取 servletContext 域中的数据
<!-- 
  key是String
  value是Object类型的对象
 -->

**上面的 4个 是跟域数据有关的**



> pageContext(PageContextImpl): 
- 可以获取jsp中的九大内置对象
- 
```java
${pageContext.九大内置对象}
```
- 然后通过九大内置对象再读取其身上的各种属性和方法
- el表达式 比较简洁 当对应的属性有get方法的时候 可以直接.属性名(内部会对应找该属性的get方法)

\\ 它的常用场景
- 下面的信息 大部分都是在 request对象中
> 1. 协议:
```java
  <%=request.getScheme()%>  // http
  ${pageContext.request.scheme} // http
```

> 2. 服务器ip:
```java
  <%=request.getServerName()%>  // localhost
  ${pageContext.request.serverName} // localhost
```

> 3. 服务器端口:
```java
  <%=request.getServerPort()%>  // 8080
  ${pageContext.request.serverPort} // 8080
```

> 4. 获取工程路径:
```java
  <%=request.getContextPath()%>  // 
  ${pageContext.request.contextPath} // 
```

> 5. 获取请求方法:
```java
  <%=request.getMethod()%>  // GET
  ${pageContext.request.method} // GET
```

> 6. 获取客户端ip地址
```java
  <%=request.getRemoteHost()%>  // 
  ${pageContext.request.remoteHost} // 
```

> 7. 获取会话的id编号
- 获取会话的唯一标识

```java
  <%=session.getId()%>  // 
  ${pageContext.session.id} // 
```

**上面的 1个 是用来获取9大内置对象的**



> param(Map<String, String>):
- 可以获取请求参数的值
```java
// http:localhost:8080/?username=sam6age=18

${param}    // {username=sam, age=18}
${param.username}  // sam
${param.age}       // 18
```

> paramValues(Map<String, String[]>):
- 可以获取请求参数的值 获取多个值的时候使用

- value对应的是String[]

```java
// http:localhost:8080/?username=sam6age=18

${paramValues}     
  // {username=String[], age=String[]}

${paramValues.username[0]}  // sam
${paramValues.age[0]}       // 18 


// 当一个key有多个value的之后我们使用它比较好
// hobby=java&hobby=C++
${paramValues.hobby} // 它是一个数组
```

**上面的 2个 是用来获取请求参数的**



> header(Map<String, String>):
- 可以获取请求头的信息
- 能获取到整个请求头 也就是多个键值对

> headerValues(Map<String, String[]>):
- 可以获取请求头的信息 获取多个值的时候使用

```java
${header["User-Agent"]}
```

**上面的 2个 是用来获取请求头信息的**



> cookie(Map<String, Cookie>):
- 可以获取当前请求的cookie信息
<!-- 
  key是String
  value是Cookie对象
 -->

```java
${cookie}  // 会输出cookie对象中对应的值
// JSESSIONID=javax.servlet.http.Cookie@8fd4c3b

${cookie.JSESSIONID.name}   // JSESSIONID
// 输出指定key


${cookie.JSESSIONID.value}  // javax.servlet.http.Cookie@8fd4c3b
// 输出指定key对应的value
```

-

> initParam(Map<String, String>):
- 可以获取在 web.xml 中配置的 <context-param> 上下文参数
```java
// 先要配置<context-param> 一定要重新部署
<context-param>
  <param-name>url</param-name>
  //  /// 相当于省略了 localhost:3306
  <param-value>jdbc:mysql:///test</param-value>
</context-param>


{$initParam.url}  // 
```

----------------

### JSTL标签库
- jsp标准的标签库 是一个不断完善的开放源代码的jsp标签库
- *el表达式*主要是为了*替换*jsp中的*表达式脚本*

- *jstl*主要是为了*替换* *代码脚本*

- jstl由5组不同功能的标签库组成
- 1. 核心标签库(重点)
  uri: http://java.sun.com/jstl/core
  前缀: c

- 2. 格式化
  uri: http://java.sun.com/jstl/fmt
  前缀: fmt

- 3. 函数
  uri: http://java.sun.com/jstl/functions
  前缀: fn

- 4. 数据库(不使用)
  uri: http://java.sun.com/jstl/sql
  前缀: sql

- 5. XML(不使用)
  uri: http://java.sun.com/jstl/xml
  前缀: x


> 标签库的使用方式
- 相当于通过 uri 来引入 对应的标签库
- 1. 先导入 jstl 标签库的jar包
- 老师提供的文件夹里面有 我放到sam里面了

- 2. 使用 taglib 指令引入标签库
<%@ taglib prefix="前缀" uri="对应的uri" %>
<!-- 
  这步对应的 jstl会自动导入
  比如我们输入 就会自动的导入
  <c:forEach> 
 -->

```html
<!-- 这里哦 -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="java.util.ArrayList" %>
<%@ page import="com.sam.jsp.Student" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h1>Scoped页面</h1>

    <!-- 还有这里 输入完这个命令上面自动导入的 -->
    <c:set />

</body>
</html>

```


> core核心库的使用
> <c:set />
- set标签可以往域中保存数据

- 思考:
- 往域对象中保存数据的方法之前介绍过是
- 域对象.setAttribute(key, value)
- 我们要使用set标签的时候 要考虑 
  - 往哪个域对象中保存
  - 保存的key
  - 保存的value

> <c:set /> 的标签属性
> <c:set scope="session | request | page | application"/>
- 设置保存到哪个域 默认值是page(不指定该属性就是page)

> <c:set var="" />
- 用来设置保存在域对象中的数据的 key

> <c:set value="" />
- 用来设置保存在域对象中的数据的 value

```html
<c:set scope="request" var="username" value="sam">

<!-- 使用通过set标签 保存在pageContext域中的数据 -->
${requestScope.username}   // sam
```


> <c:if test=""/>
- if标签用来做if判断

- test属性:
- 值为判断条件(使用el表达式)

- 该标签没有 if else else if 的写法 但是我们可以使用多个if标签来表示if else

```html
<c:if test="${12 == 12}">
  <h1>表达式为真的时候才能看到我</h1>
</c:if>
```


> <c:choose> <c:when test="${}"> <c:otherwise>
- 多路判断 跟 switch case default 非常接近
- 也相当于 if else if else

- choose标签 在外围标签
- when标签 表示每一种判断情况
- otherwise标签 表示剩下的情况

- 代码从上往下走 如果成立就输出第一个 不成立继续往下走 一旦有一个成立了 其它的就不管了

```html
<c:choose>
  <c:when test="${条件1}">
    内容
  </c:when>
  <c:when test="${条件2}">
    内容
  </c:when>
  <c:otherwise>
    内容
  </c:otherwise>
</c:choose>
```

```html
<%
  <!-- 我们先往requset域中保存在数据 -->
  request.setAttribute("height", 178);
%>

<!-- 
  我们根据域中的数据 进行判断 根据判断结果 做不同输出 
-->
<c:choose>
  <c:when test="${requestScope.height > 180}">
    <h3>很高</h3>
  </c:when>
  <c:when test="${requestScope.height > 170}">
    <h3>还可以</h3>
  </c:when>
  <c:otherwise>
    <h3>剩下的</h3>
  </c:otherwise>
</c:choose>
```

**注意:**
- 1. <c:choose>标签里面不能使用html注释 我们要使用jsp注释
- 2. <c:when>标签的父标签必须是<c:choose>标签
- 也就是说我们要在<c:when>或者<c:otherwise>中再使用 多路判断 外层必须是<c:choose>


> <c:forEach />
- 遍历输出使用 遍历数据的
- 常见的遍历情况

> 标签属性
- begin: 设置遍历开始的索引 从begin开始
- end: 设置结束的索 到end结束
- var: 循环中的变量 也是当前正在遍历的数据

- 输出内容要用 el 表达式

> 1. 遍历1到10 输出
```html
<c:forEach begin="1" end="10" var="i">
  ${i}
</c:forEach>

<!-- 1 2 3 4 5 6 7 8 9 10 -->
```


> 标签属性
- items: 表示遍历的数据源 相当于 v-for="(item) of arr"
- var: 表示当前遍历的数据 相当于 v-for="(item)"

> 2. 遍历object数组
```html
<%
    request.setAttribute("arr", new String[]{"111", "222", "333"});
%>

<c:forEach items="${requestScope.arr}" var="item">
  ${item}
</c:forEach>
```


> 3. 遍历list集合 list中存放Person类 有属性: 编号 用户名 密码 年龄 电话信息
```html
<%
  List<Student> students = new ArrayList<>();
  for(int i=1; i<=10; i++) {
    students.add(new Student(i, "user" + i, "pwd" + i, 18+i, "phone" + i));
  }

  request.setAttribute("studs", students);
%>
<c:forEach items="${requestScope.studs}" var="stud">
  <div>编号: ${stud.id}</div>
  <div>用户名: ${stud.username}</div>
  <div>密码: ${stud.password}</div>
  <div>年龄: ${stud.age}</div>
  <div>电话: ${stud.phone}</div>
  <div>操作: 添加 or 删除</div>
</c:forEach>
```


> 4. 遍历map集合
```html
<%
  HashMap<String, Object> map = new HashMap<>();
  map.put("key1", "value1");
  map.put("key2", "value2");
  map.put("key3", "value3");

  <!-- 
    注意 el表达式只能操作域中的数据 所以要将map保存到域中
   -->
  request.setAttribute("map", map);

  <!-- 
    回忆下map原生怎么遍历
    for(Map.Entry<String, Object> entry: map.entrySet()) {

    }
   -->
%>
<c:forEach items="${requestScope.map}" var="entry">
  <!-- 这里是键值对 key1=value1 -->
  ${entry} <br>

  <!-- 相当于调用 entry.getKey() -->
  ${entry.key} <br>

  <!-- 相当于调用 entry.getValue() -->
  ${entry.value} <br>
</c:forEach>
```


> 只遍历数据源中的一部分
- 比如我有一个数据源 我只想遍历其中的指定的数据 怎么做?

- 标签属性
- items: 表示遍历的集合
- var: 表示遍历的数据
- begin: 表示遍历的开始索引值
- end: 表示结束的索引值

```html
<c:forEach begin="2" end="7" items="${requestScope.studs}" var="stud">
    <div>编号: ${stud.id}</div>
    <div>用户名: ${stud.username}</div>
    <div>密码: ${stud.password}</div>
    <div>年龄: ${stud.age}</div>
    <div>电话: ${stud.phone}</div>
    <div>操作: 添加 or 删除</div>
</c:forEach>
```

> 标签属性
- step: 表示遍历的步长值 默认是1
- 1: 相当于 i++
- 2: 相当于 i+=2

- varStatus: 表示当前遍历到的数据的状态
- 它定义的值 是一个对象 varStatus="status"
- status实现了 LoopTagStatus 接口 该接口中定义如下的方法:
**注意:当我们在el表达式中使用的时候 直接写 status.current 就可以**
```java 
  // 也就是说 status 可以调用如下的方法
  public Obejct getCurrent()
    // 获取当前遍历到的数据

  public int getIndex()
    // 获取当前遍历的索引

  public int getCount()
    // 遍历的个数 就是遍历了几个

  public boolean isFirst()
  public boolean isLast()
    // 表示遍历的数据是否是第一条或最后一条

  public Integer getBegin() 
  public Integer getEnd() 
  public Integer getStep()
    // 获取 begin end step 的属性值
```

- 比如 我们有一个10条数据的集合 如果 step="2" 那么会跳过一条数据输出

```html
<c:forEach step="2" varStatus="status" items="${requestScope.studs}" var="stud">
    <div>编号: ${stud.id}</div>
    <div>用户名: ${stud.username}</div>
    <div>密码: ${stud.password}</div>
    <div>年龄: ${stud.age}</div>
    <div>电话: ${stud.phone}</div>
    <div>操作: 添加 or 删除</div>

    <div>
      ${status.current}   相当于 item
      ${status.index}     相当于 index
      ${status.count}     相当于 遍历了几条数据
      ${status.first}
      ${status.last}
      ${status.begin}
      ${status.end}
      ${status.step}
    </div>
</c:forEach>
```

----------------

### 文件的上传

> 文件的上传的操作步骤
> 1. <form method="post" enctype="multipart/form-data">
\\要点:
- 1. get请求是有长度限制的
<!-- 
  IE浏览器（Microsoft Internet Explorer） 对url长度限制是2083（2K+53），超过这个限制，则自动截断（若是form提交则提交按钮不起作用）。

  firefox（火狐浏览器）的url长度限制为 65 536字符，但实际上有效的URL最大长度不少于100,000个字符。

  chrome（谷歌）的url长度限制超过8182个字符返回本文开头时列出的错误。

  Safari的url长度限制至少为 80 000 字符。

  Opera 浏览器的url长度限制为190 000 字符。Opera 9 地址栏中输入190 000字符时依然能正常编辑。
 -->

- 2. enctype="multipart/form-data"
- 表示提交的数据以多段(每一个表单项一个数据段)的形式进行拼接 然后以二进制流的形式发送给服务器

- 当我们选择enctype="multipart/form-data" 在http协议的 content-type字段中
```js
// Content-Type: 提交的数据类型
// boundary: 表示每段数据的分隔符 后面的值是浏览器随机生成的 每次提交都会随机生成的值
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary2RleoyPO8D7gEGZ1


// 请求体: 每个form表单项会被分成一段 比如我们的页面中有 username 和 file 两项 所以被分成了两端
------WebKitFormBoundary2RleoyPO8D7gEGZ1
// Content-Disposition 描述
Content-Disposition: form-data; name="username"
// 空行

// 当前表单项的值
sam

// 另一段数据的开始
------WebKitFormBoundary2RleoyPO8D7gEGZ1
Content-Disposition: form-data; name="photo"; filename=""
Content-Type: application/octet-stream
// 空行

// 上传的文件的数据 这里没有体现的原因是 谷歌觉得数据很多如果直接显示在这里会显得很乱 所以没有显示
------WebKitFormBoundary2RleoyPO8D7gEGZ1--
// 最后的分隔符多了两个-- 表示数据的结束标记
```

> 2. <input type="file">

> 3. 编写服务器代码接收 处理上传的数据
- multipart/form-data是以流的形式将数据发送给的服务器 所以服务端代码只能够以流的形式接收 
<!-- 
  比如我们在服务端 直接这么接收 就获取不到的
  sout(req.getParameter("username"))  // null
  sout(req.getParameter("photo"))  // null

  因为客户端是以流的形式发送的
  对应服务端只能以流的形式来接收
 -->

> 现实开发中
- 但是现实的开发中 我们不太会自己写完整的逻辑 都是用第三方提供的jar包
- 类似文件上传的功能很多第三方对这样的功能做了模块的封装我们只需要使用别人封装好的jar包就可以对 上传的文件数据进行解析

- 比如关于文件上传处理数据等 就可以使用 apache提供的 jar包
- commons-fileupload.jar
- commons-io.jar
<!-- 
  commons-fileupload.jar需要依赖 commons-io.jar 所以这两个包我们都要引入 
-->

> commons-fileupload.jar的使用方式
- 1. 导包（2个）
- 2. 我们解析上传的文件的数据 需要用到的类和方法如下


> ServletFileUpload类:
- 用于解析上传的数据

- 注意:
- 我们使用ServletFileUpload类的时候 需要导包 注意我们要导入的包是commons的(tomcat也有 但是不要导这个)

> ServletFileUpload类的实例化
- 实例化之后才能调用下面的各种方法

> new ServletFileUpload(参数)
- 参数:
- FileItemFactory实现类
<!-- 
  FileItemFactory是一个接口 我们要传入就是这个接口的实现类对象

  FileItemFactory实现类: DiskFileItemFactory
  
 -->

```java
// 先创建 FileItemFactory接口的实现类对象 作为参数传入到 ServletFileUpload构造器里面
DiskFileItemFactory fileItemFactory = new DiskFileItemFactory();

// 创建用于解析上传数据的工具类
ServletFileUpload servletFileUpload = new ServletFileUpload(fileItemFactory);
```



> 该类提供的方法:
> boolean ServletFileUpload.isMultipartContent(HttpServletRequest req)
- 作用:
- 判断当前上传的数据格式是否是多段的格式(如果不是多段的格式是解析不了的)

- 如果返回 true: 就是多段的数据
- 如果返回 false: 就不是多段数据(该类就处理不了)


> public List<FileItem> parseRequest(HttpServletRequest req)
- 作用:
- 解析上传的数据(解析的是文件的二进制数据)
- 解析好后得到的是多个 FileItem

- FileItem类:
- 表示每一个表单项

- 返回值:
- List集合 里面放的多个 FileItem
<!-- 
  因为是form里面所有的 表单项 那必然包括普通的表单项和文件的表单项

  我们对于普通的表单项 和 文件的表单项的处理是不同的 关心的点也不同
 -->

> 以下都是 FileItem 类型里面的具体对象来调用方法
- 比如
- for(FileItem item: list) { }
- 我们拿的是 item 去调用下面的方法

> boolean FileItem.isFormField()
- 作用:
- 判断当前这个表单项是否是普通的表单项 还是上传的文件类型

- true: 表示普通类型的表单项
- false: 表示上传的文件类型

> String FileItem.getFieldName()
- 获取表单项的name属性值

> String FileItem.getString("UTF-8")
- 获取当前表单项的值
- 需要指定字符集

> String FileItem.getName()
- 获取上传的文件名

> void FileItem.write(file)
- 将上传的文件写到 参数file 所指向的磁盘(硬盘)位置 就可以保存到磁盘上了


> 上传文件的流程代码演示
- 客户端:
```html
<form action="http://localhost:8080/load" method="post" enctype="multipart/form-data">
  用户名: <input type="text" name="username" id="username"> <br>
  头&emsp;像: <input type="file" name="photo" id="photo"> <br>
  <input type="submit" value="提交">
</form>
```

- 服务端:
```java
package com.sam.servlet;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.List;

public class UploadServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 先判断上传的数据是否为多段数据(只有是多段的数据 才是文件上传的 才能够解析)
    if(ServletFileUpload.isMultipartContent(req)) {

      // 2. 创建 ServletFileUpload 的对象
      // 2.1 先创建 FileItemFactory接口的实现类对象 作为参数传入到 ServletFileUpload构造器里面
      DiskFileItemFactory fileItemFactory = new DiskFileItemFactory();
      // 创建用于解析上传数据的工具类ServletFileUpload
      ServletFileUpload servletFileUpload = new ServletFileUpload(fileItemFactory);

      // 调用工具类的方法 解析上传的数据 得到每一个表单项FileItem
      try {
        List<FileItem> list = servletFileUpload.parseRequest(req);

        // 3. 循环判断 每一个表单项是普通类型 还是上传的文件
        for(FileItem item: list) {
          if(item.isFormField()) {
            // true: 意味着普通表单项
            System.out.println("表单项的name属性名:" + item.getFieldName());
            // UTF-8 解决乱码问题
            System.out.println("表单项的name属性值:" + item.getString("UTF-8"));
          } else {
            // 上传的文件
            System.out.println("表单项的name属性名:" + item.getFieldName());
            System.out.println("上传的文件名:" + item.getName());

            // 将上传的文件写到 桌面 test 文件夹里面
            item.write(new File("/Users/LIUCHUNSHAN/Desktop/file_test/" + item.getName()));
          }
        }

      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }
}

```

----------------

### 文件的下载

- 流程
- 客户端 -> 服务器(Tomcat)
- 客户端发起GET请求 告诉服务器 我要下载什么文件

- 服务器的逻辑:
- 在 doGet() 方法下 进行如下的逻辑
- 1. 获取要下载的文件名
- 2. 读取要下载的文件内容
- 3. 把下载的文件内容回传给客户端
- 4. 在回传前 通过响应头告诉客户端返回的数据类型(因为不同的类型客户端的处理方式是不同的)
- 5. 告诉客户端收到的数据是用于下载使用(还是使用响应头)

- 我们在module下准备一些要下载的文件

  | - web
    | - file
      - pic.jpg


> 要点1:
> commons-io.jar 包下 有IOUtils类
- 该类专门用于 io 操作

> IOUtils.copy(输入流, 输出流)
- 将读到输入流的数据 复制给输出流


> 要点2:
> 我们可以通过 ServletContext对象 读到指定文件的数据类型
> servletContext.getMimeType("文件路径")
- 返回值:
- String  image/jpeg


> 要点3:
> 我们通过设置响应头 
- Content-Disposition: "attachment;filename=文件名"
- 来告知浏览器怎么处理我们我们发送到客户端的数据 这种方式为下载
```java
res.setHeader("Content-Disposition", "attachment;filename=" + downloadFileName);
```

> 下载的代码逻辑
```java
package com.sam.servlet;

// 注意我们导的包
import org.apache.commons.io.IOUtils;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

public class DownloadServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {


    // 1. 获取要下载的文件名 这里我们写死
    String downloadFileName = "pic.jpg";

    
    // 
    ServletContext servletContext = getServletContext();


    /*
      4. 在回传前 通过响应头告诉客户端返回的数据类型
      - 该步骤要在前面来完成 我们要通过 servletContext 对象读取文件的数据类型
    */
    // 获取要下载文件的类型
    String mimeType = servletContext.getMimeType("/file/" + downloadFileName);
    System.out.println("下载的文件类型" + mimeType); // image/jpeg

    // 设置响应头 告诉客户端数据类型
    res.setContentType(mimeType);


    /*
      5. 还要告诉客户端收到的数据是用于下载使用(还是通过响应头)
      - 如果没有写步骤5 客户端就会将图片直接显示浏览器上
      Content-Disposition: 表示收到的数据怎么处理
      attachment: 表示附件 表示下载使用
      filename="文件名" 指定下载的文件名 下载的文件叫什么名字
    */
    res.setHeader("Content-Disposition", "attachment;filename=" + downloadFileName);


    /*
      2. 读取要下载的文件内容(通过 ServletContext对象可以读取文件内容)
      ServletContext对象 可以通过获取到getResourceAsStream() 输入流
      可以指定文件路径 将文件数据读到内存中
    */

    // 参数: 文件所在的路径 在服务器端 / 代表web目录
    InputStream resourceAsStream = servletContext.getResourceAsStream("/file/" + downloadFileName);

    
    /*
      以往我们获取节点流后 通过调用节点流的方法 while循环读数据
      但是 commons-io.jar 包中 就有操作io的工具类IOUtils 它可以直接做流的操作

      3. 把下载的文件内容回传给客户端
      参数 输入流 和 输出流
      创建输出流 获取响应的输出流
    */

    ServletOutputStream outputStream = res.getOutputStream();


    // 调用IOUtils工具类的copy方法, 将读取到的内容 写给 outputStream 读取输入流中的全部数据 复制给输出流 输出给客户端
    IOUtils.copy(resourceAsStream, outputStream);
  }
}
```


> 使用 URLEncoder解决谷歌ie浏览器中文下载名乱码的问题
- 如果我们指定下载的文件名 是中文的时候
- res.setHeader("Content-Disposition", "attachment;filename=小狗");

- 会出现文件名是乱码
- 因为http协议是美国人设计的 http协议里面默认是不支持中文传输的

- 我们需要对 中文进行编码 才能通过网络来进行传输

- 浏览器为: 谷歌 或者 ie
- 谷歌 和 ie 用的是url编码
- 所以我们需要对文件名 进行 URL编码

> URLEncoder.encode("小狗.jpg", "UTF-8")
- 是将汉字转化为 %xx%xx的格式 
```java
res.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode("小狗.jpg", "UTF-8"));
```


- 浏览器为: 火狐
- 火狐用的是 base64编码 所以火狐对url编码处理不了

> base64编码
- 1. 实例化BASE64Encoder类的对象
- 2. 通过对象调用encode()方法

> BASE64Encoder base64Encoder = new BASE64Encoder()
- 创建base64编码器

> BASE64Decoder base64Decoder = new BASE64Decoder();
- 创建base64解码器


> base64Encoder.encode(参数)
- 通过encode()执行base64编码操作

- 参数:
- bytes[]

- 所以我们要将内容转为 字节数组
- 字符串.getBytes("UTF-8")

- 返回值
- String 编码后的内容


> base64Decoder.decodeBuffer(参数);
- 通过decodeBuffer()执行base64解码操作

- 参数:
- 编码后的字符串

- 返回值:
- byte[]
- 编码的时候就是对字节数组操作的 所以解码的之后返回的也是字节数组



- base64编码演示:
```java
public static void main(String[] args) throws IOException {
  String content = "这是需要Base64编码的内容";


  // 编码操作
  // 创建编码器
  BASE64Encoder base64Encoder = new BASE64Encoder();

  // 执行编码
  String encodeStr = base64Encoder.encode(content.getBytes("UTF-8"));

  System.out.println(encodeStr);
  // 6L+Z5piv6ZyA6KaBQmFzZTY057yW56CB55qE5YaF5a65


  // 创建base64解码器
  BASE64Decoder base64Decoder = new BASE64Decoder();

  // 解码操作
  byte[] bytes = base64Decoder.decodeBuffer(encodeStr);

  // 将字节数组还原为字符串
  String str = new String(bytes, "UTF-8");
  System.out.println(str);
}
```  


- 上面我们知道 火狐浏览器中 怎么解决 文件名中文乱码的情况 那我们怎么在项目中使用呢？


- 如果客户端浏览器是火狐浏览器 那么我们需要对中文名进行 base64 的编码操作

- 这时候需要把请求头
- Content-Disposition: attachment; filename=中文名

- 修改为如下的格式
- Content-Disposition: attachment; filename==?charset?B?xxxxx?=

- =?charset?B?xxxxx?=
- 我们对这个部分解析一下
- =?
  表示编码内容的开始

- charset
  表示字符集

- B
  表示base64编码

- xxx
  表示文件名base64编码后的内容

- ?=
  表示编码内容的结束

```java
res.setHeader("Content-Disposition", "attachment;filename==?charset?B?xxx?=");

// 上面要在各个部分填充上正确的数据

res.setHeader(
  "Content-Disposition", 
  "attachment;filename==?UTF-8?B?"+ new BASE64Encoder().encode("小狗.jpg".getBytes("UTF-8")) + "?=");
```


- 上面的方式是火狐的解决方式 但是我们回到ie上发现 ie不支持上面的方式
<!-- 
  要么搞定ie 就搞定不了火狐 搞定了狐火 ie就出现问题

  谷歌没有问题
 --> 

- 解决方案
- 判断: 如果是火狐浏览器就使用base64格式的编码 如果是ie浏览器就使用url编码 这样就支持全部浏览器了

> 要点:
> req.getHeader("User-Agent")
- 获取客户端信息

```java
if(req.getHeader("User-Agent").contains("Firefox")) {
  // 使用base64编码
} else {
  // 使用url编码
}
```

----------------

### js java中变量互相访问
> js变量获取jsp页面中的java代码的变量值
- 方法:
- let 变量名 = <%= java变量 %>

> java代表获取js变量的值
- 说明:
- 在jsp中 java部分是在服务器端执行的
- js部分是在客户端的浏览器执行的

- 二者完全不相干 因此直接在jsp页面上是无法在js java html变量之间进行调用的

- 解决方法:
- 将js变量放到form中的一个变量里面 在后台从form中提交到后台 比如 我们可以利用 input type="hidden" 就是传值用

----------------

### 书城项目第三阶段
- 我们还是回到书城的项目

> 1. html页面转成jsp页面
- 1. html页面*顶行*添加page指令
```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
```

- 2. 修改文件后缀名为 .jsp
- 修改完文件的后缀名后 还要看看页面中的src等地址
- 我们可以 ctrl+shift+r 查找指定格式的文件 和 目录 查找 .html -> .jsp


> 2. 抽取页面中相同的内容
> 登录成功的nav部分
- 比如登录之后的 nav 部分 每个页面中其实都有一样的部分
<!-- 
  欢迎韩总 <a>订单</a><a>注销</a><a>返回</a>
 -->

- 例如这些公共的操作我们就可以抽取成一个jsp页面 然后去引用就可以了 这样我们只需要维护一份

- 比如我们可以在
  | - web
    | - common
      - login_success_menu.jsp

- 创建 公共组件
- 这里注意 我们只有一个div 也就是页面中的一个部分
```html
<!-- login_success_menu.jsp文件  -->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div>
  <span>欢迎<span class="um_span">韩总</span>光临尚硅谷书城</span>
  <a href="../order/order.jsp">我的订单</a>
  <a href="../../index.jsp">注销</a>&nbsp;&nbsp;
  <a href="../../index.jsp">返回</a>
</div>
```

- 在原有的页面中 删除这个部分 引入组件
```html
<div id="header">
  <img class="logo_img" alt="" src="static/img/logo.gif" >

  <!-- 引入组件 -->
  <%@ include file="/common/login_success_menu.jsp"%>
</div>
```

> base标签 (动态base)
- 整个项目采用的是 base + 相对 的方案
- 所以每一个页面上 都有base标签 我们把这个部分也抽取出来

- 同样每个页面都引入了css样式 和 jq
```html
<!-- head.jsp -->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<base href="http://localhost:8080/project/" />
<link type="text/css" rel="stylesheet" href="static/css/style.css" >
<script src="static/js/jquery-1.7.2.js"></script>
```

- 同样 在所有的文件上 <%@inclued file%> 引入组件


**注意:**
- 我们上面的base设置的值是
- http://localhost:8080/project/

- 但是当我只用 192.168.3.3 来访问的时候
- 这个页面中的 css js 等资源文件 还是向
- localhost(本机) 去请求

- 如果是我自己访问是没有问题的
- 但是如果是别人访问的时候 因为 资源文件 都是 localhost(本机) 所以这些资源文件都会向 访问这个人的电脑去请求

- 当资源文件向访问者的电脑请求资源的时候 页面的样式就会出现问题 因为访问者的电脑没有资源文件

> 解决方法
- 上面发生问题的原因我们知道了
- 所以
- base标签里面的ip port 工程路径 我们都有必要 动态获取

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
  <!-- 利用各个方法获取 url 部分 进行拼接 -->
  String scheme = request.getScheme();
  String ip = request.getServerName();
  int port = request.getServerPort();
  String proPtah = request.getContextPath();

  <!-- 最后的一个 / 不能省 -->
  String path = scheme + "://" + ip + ":" + port + proPtah + "/";
%>

<base href="<%= path %>" />
<link type="text/css" rel="stylesheet" href="static/css/style.css" >
<script src="static/js/jquery-1.7.2.js"></script>
```

----------------

### 优化: 表单提交失败时候的错误提示
- 我们先回忆下 表单提交的逻辑
- 客户端:
    点击按钮 发起请求 提交数据 登录会注册

- 服务器:
    只要失败就会跳回原来的页面
    原来的页面需要哪些信息?
    - 1. 需要告诉我 为什么跳回来的? 用户名密码错误? 还是验证码错误？ 还是用户名已存在？

    - 2. 已填写的信息还要继续的保留在输入框内(这叫做回显)

    上述的 1 2 都是需要给客户端的

> 要点:
- 要回显的信息(回传的数据)都要 通过req 保存到 request域 中
- 我们在 登录接口 LoginServlet 类中处理逻辑
<!-- 
  我们用node写后台的时候 都是将这些数据 保存到一个对象中 然后把这个对象 响应回前端
  let data = { ... }

  但是java中 可以通过req对象 将数据保存造request域中 这样jsp页面可以直接使用
 -->

> 登录页面
- LoginServlet接口逻辑
```java
protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
  // 获取 用户名
  String username = req.getParameter("username");
  // 获取密码
  String password = req.getParameter("password");

  if(userService.login(new User(null, username, password, null)) == null) {
    // 登录失败
    // 将错误信息 和 回显的表单项信息 保存到Request域中
    req.setAttribute("msg", "用户名和密码错误");
    req.setAttribute("username", username);

    // 请求转发(跳转到哪个页面)
    req.getRequestDispatcher("/pages/user/login.jsp").forward(req, res);

  } else {
    // 登录成功
    req.getRequestDispatcher("/pages/user/login_success.jsp").forward(req, res);
  }
}
```

- login.jsp
- 提示信息的默认值:
- 因为页面刚刷出来的时候 还没有走接口里面的逻辑
- 所以request域中的数据就是null 所以当第一次页面加载的时候 应该有默认的显示信息 

- 这个默认的显示信息 我们就通过 三元来设置


- 表单项里面的填写的数据:
- 因为form表单默认的动作就是刷新页面 如果页面一刷新 表单项里面的数据就会被清空 用户体验不好

- 我们这里也是将用户填写的信息 再次的送回客户端 显示在页面中

```html
<!-- 错误提示区域 -->
<span class="errorMsg">
  <%= 
    request.getAttribute("msg") == null
      ? "请输入用户名和密码" 
      : request.getAttribute("msg") 
  %>
</span>


<!-- 回显表单项中的数据 -->
<label>用户名称：</label>
<input 
  class="itxt" 
  type="text" 
  placeholder="请输入用户名" autocomplete="off" 
  tabindex="1" 
  name="username"
  value="
  <%=
    request.getAttribute("username") == null 
      ? "" 
      : request.getAttribute("username")
  %>"
/>
```

> 注册页面
- 和登录页面的逻辑是一样的
```java
protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
  // 1. 获取请求的参数
  String username = req.getParameter("username");
  String password = req.getParameter("password");
  String email = req.getParameter("email");
  String code = req.getParameter("code");

  if("abcd".equalsIgnoreCase(code)) {

    if(userService.existsUsername(username)) {
      // 进入这里代表 用户名不可用 因为数据库里面已经有了
      req.setAttribute("msg", "用户名已存在");
      req.setAttribute("username", username);
      req.setAttribute("email", email);

      req.getRequestDispatcher("/pages/user/regist.jsp").forward(req, res);

    } else {
      // 进入这里代表 用户名可用 可用的情况下我们就将其保存到数据库
      userService.registUser(new User(null, username, password, email));
      req.getRequestDispatcher("/pages/user/regist_success.jsp").forward(req, res);
    }

  } else {
    // 当验证码不正确的时候 让其跳转到注册页面 并在跳转前将客户端需要回显的数据保存在request域中
    req.setAttribute("msg", "验证码错误");
    req.setAttribute("username", username);
    req.setAttribute("email", email);

    // getRequestDispatcher的地址必须以/打头 代表在web
    req.getRequestDispatcher("/pages/user/regist.jsp").forward(req, res);
  }
}
```

- regist.jsp
```html
<input 
  class="itxt" 
  type="text" 
  placeholder="请输入邮箱地址"
  autocomplete="off" 
  tabindex="1"
  name="email" id="email"
  value="<%=request.getAttribute("email") == null ? "" : request.getAttribute("email")%>"
/>
```

----------------

### 优化: 合并LoginServlet和RegistServlet
- 在实际的项目开发中 一个模块 一般只使用一个Servlet程序
- 而现在我们的 登录 和 注册 各有一个servlet 而登录和注册都属于用户模块的功能
- 这里我们想将 LoginServlet 和 RegistServlet 合并到一起成为一个UserServlet(它既实现了登录的功能 又实现了注册的功能)

- 可以又有一个问题:
- 登录功能使用的是post请求
- 注册功能使用的是post请求

- 也就是说我们要在 UserServlet程序的 doPost() 方法中 区分两个功能(登录注册) 那怎么办？

> 解决方式:
- 我们可以在 登录的jsp页面 和 注册的jsp页面 中添加了一个 隐藏域

**技巧:**
- 利用隐藏域向后台传送数据

- 该隐藏域表示登录的功能
  <input type="hidden" name="action" value="login">

- 该隐藏域表示注册的功能
  <input type="hidden" name="action" value="regist">

- 然后我们在 UserServlet程序 一上来取出 隐藏域中的 action对应的值
```java
String action = req.getAttribute("action")

if("login".equals(action)) {
  // 登录逻辑
} else if("regist".equals(action)) {
  // 注册逻辑
}
```

- 这就跟我想的 定义一个变量 通过变量来标识是什么请求是一样的 只不过这里使用了html结构中的隐藏域


> 代码逻辑部分
```java
package com.sam.web;

import com.sam.pojo.User;
import com.sam.service.UserService;
import com.sam.service.impl.UserServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserServlet extends HttpServlet {
  private UserService userService = new UserServiceImpl();

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    String action = req.getParameter("action");

    if("login".equals(action)) {
      login(req, res);
    } else if("regist".equals(action)) {
      regist(req, res);
    }
  }

  protected void login(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    String username = req.getParameter("username");
    String password = req.getParameter("password");

    if(userService.login(new User(null, username, password, null)) == null) {
      // 登录失败
      // 将错误信息 和 回显的表单项信息 保存到Request域中
      req.setAttribute("msg", "用户名和密码错误");
      req.setAttribute("username", username);
      req.getRequestDispatcher("/pages/user/login.jsp").forward(req, res);
    } else {
      // 登录成功
      req.getRequestDispatcher("/pages/user/login_success.jsp").forward(req, res);
    }
  }
  protected void regist(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 获取请求的参数
    String username = req.getParameter("username");
    String password = req.getParameter("password");
    String email = req.getParameter("email");
    String code = req.getParameter("code");

    // 2. 检查验证码是否正确(验证码由服务器生成 先写死) 要求验证码为: abcd
    if("abcd".equalsIgnoreCase(code)) {

      if(userService.existsUsername(username)) {
        // 进入这里代表 用户名不可用 因为数据库里面已经有了
        req.setAttribute("msg", "用户名已存在");
        req.setAttribute("username", username);
        req.setAttribute("email", email);

        req.getRequestDispatcher("/pages/user/regist.jsp").forward(req, res);

      } else {
        // 进入这里代表 用户名可用 可用的情况下我们就将其保存到数据库
        userService.registUser(new User(null, username, password, email));
        req.getRequestDispatcher("/pages/user/regist_success.jsp").forward(req, res);
      }

    } else {
      // 当验证码不正确的时候 让其跳转到注册页面 并在跳转前将客户端需要回显的数据保存在request域中
      req.setAttribute("msg", "验证码错误");
      req.setAttribute("username", username);
      req.setAttribute("email", email);

      // getRequestDispatcher的地址必须以/打头 代表在web
      req.getRequestDispatcher("/pages/user/regist.jsp").forward(req, res);
    }
  }
}

```

----------------

### 优化: 使用反射优化大量的if else
- 用户模块的功能 除了登录和注册 还有其它的功能
- 比如:
  - 添加用户
  - 修改用户信息
  - 修改密码
  - 绑定手机号
  - 绑定邮箱
  - 注销用户 ... 

- 这样的话 每一个功能都会有一个隐藏域来对应这个功能
- 然后在UserServlet程序里面 通过else if进行判断 然后做不同的处理

- 要是有一种方法 一次性的写好 不管是什么样的功能 都可以走同样的逻辑

- 我们先找找规律

  <input type="hidden" name="action" value="login">

- 如果 action的值是login 那么我们调用的方法也是login
- 如果 action的值是regist 那么我们调用的方法也是regist

- 如果是其它也一样 也就是说 action的值就是方法名 那是不是说我们*可以通过反射通过action的值 找到对应的方法来执行就可以了*

- 反射前:
- 我们要if else判断 是不是 xxx动作 如果是做什么样的逻辑

- 反射后:
- 一套代码 相当于一个通用的模板
- {"方法名1": 方法1, 方法名2: 方法2}
- 然后我们拿着 方法名去对象里面进行匹配 action
- 相当于 obj[action]() 的使用方式吧

> 代码部分
- 下面这样就可以省略了 大量的if else逻辑
```java
protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
  // 获取页面中的隐藏域的action值 根据该值 利用反射调用对应的方法
  String action = req.getParameter("action");
  try {
    // this是当前的对象实例 getClass() 就是获取父类(造this的类) 
    Method method = this.getClass().getDeclaredMethod(action, HttpServletRequest.class, HttpServletResponse.class);
    // this是当前的对象实例
    method.invoke(this, req, res);
  } catch (Exception e) {
    e.printStackTrace();
  }
}
```

----------------

### 优化: 抽取BaseServlet程序
- 我们上面只接触了 用户模块
- 用户模块(UserServlet程序)
<!-- 
  用户模块逻辑:
  1. 获取action参数值
  2. 通过反射获取action对应的业务方法
  3. 通过反射调用业务方法
 -->


- 那我们还有其他的模块 比如
- 图书模块(BookServlet程序)
<!-- 
  图书模块逻辑:
  1. 获取action参数值
  2. 通过反射获取action对应的业务方法
  3. 通过反射调用业务方法
 -->
 
- 我们发现图书模块也是这样 既然他们做的事情都一样 可以将这部分逻辑抽出来 抽取到一个父类里面 我们管这个叫做 BaseServlet
- 我们将上面的逻辑抽到BaseServlet程序里面
<!-- 
  1. 获取action参数值
  2. 通过反射获取action对应的业务方法
  3. 通过反射调用业务方法
 -->

- 然后UserServlet 和 BookServlet只需要继承BaseServlet就可以了 这样以后所有的模块都不再需要写这部分的逻辑了

- BaseServlet
- 我们让BaseServlet继承HttpServlet
- 然后其它的类就不同继承HttpServlet 而是继承BaseServlet
```java
public abstract class BaseServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 获取页面中的隐藏域的action值 根据该值 利用反射调用对应的方法
    String action = req.getParameter("action");
    try {
      // this是当前的对象实例 getClass() 就是获取父类(造this的类)
      Method method = this.getClass().getDeclaredMethod(action, HttpServletRequest.class, HttpServletResponse.class);
      // this是当前的对象实例
      method.invoke(this, req, res);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}


// 其它类
public class UserServlet extends BaseServlet {
  // 其它类中的 doPost 方法就可以不用写了 因为都在BaseServlet程序里面

  // 这样其它类中 只需要定义每个功能需要处理的逻辑就可以了 比如:
  protected void login(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {}

  protected void regist(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {}


  // 这样有关通过反射调用方法的逻辑都在BaseServlet里面
}
```

----------------

### BeanUtils工具类的使用
- BeanUtils工具类 它可以一次性的把所有请求的参数注入到JavaBean中

- 比如：
- 我们在 UserServlet程序 中的login()方法内
- 需要获取表单中的username password参数 将这些参数封装成一个User对象
```java
protected void login() {

  String username = req.getParameter("username");
  String password = req.getParameter("password");
  
  // 这里 将参数 放到了User对象里面
  if(userService.login(new User(null, username, password, null)) == null) { }
    
}
```

- regist() 方法内 也一样 获取参数 封装成一个User对象
```java
protected void regist() {
  // 1. 获取请求的参数
  String username = req.getParameter("username");
  String password = req.getParameter("password");
  String email = req.getParameter("email");
  String code = req.getParameter("code");

  // 这里 将参数 放到了User对象里面
  userService.registUser(new User(null, username, password, email));
```

- 现在这个项目中 参数是少 也就写个4-5行 到了有的项目中 我们要获取的表单项的参数 可能20-30个都有 我们要使用 
- req.getParameter() x 20次
- user.setXxx() x 20次

- 要是有一个方法 能剩下上面的逻辑 就会变的很简洁了
- BeanUtils提供了这样的功能 

- BeanUtils不是jdk的类 而是第三方的工具类 所以需要导包
- commons-beanutils-1.8.0.jar
- commons-logging-1.1.1.jar

- 然后导入module里面 然后使用BeanUtils类方法实现注入


> BeanUtils.populate(实例对象,req.getParameterMap())
- 作用:
- 将请求参数 一次性的注入到 指定的对象中
- 或者说: 将一个 map的值 注入到JavaBean中

- 参数1:
- 要注入哪个对象

- 参数2:
- map类型
- 可以通过 req.getParameterMap() 方法获取
- 因为请求参数 就是 name=value 的形式

- 该方法有异常 需要使用 try catch 来进行处理


> 使用方式
```java
protected void regist(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {

  // 之前获取请求参数 封装为 User对象的方式
  String username = req.getParameter("username");
  String password = req.getParameter("password");
  String email = req.getParameter("email");
  String code = req.getParameter("code");

  // 将参数放入到 User 的构造器中
  new User(null, username, password, email)

------

  // 使用 BeanUtils 的方式
  try {
    User user = new User();

    // 就这下面这一行代码就可以完成表单项的参数 注入工作
    BeanUtils.populate(user, req.getParameterMap());

  } catch (Exception e) {
    e.printStackTrace();
  }
```

- 每个服务器的业务 基本上都会将请求参数 封装成 JavaBean(user对象) 的 那我们没必要每个程序都写这么一段

- 我们可以把 下面的内容 写成一个工具类然后去使用就可以了

```java
try {
  User user = new User();
  BeanUtils.populate(user, req.getParameterMap());

} catch (Exception e) {
  e.printStackTrace();
}
```


> 利用BeanUtils工具类 将请求参数封装成JavaBean的逻辑整理成一个 工具类

  | - com.sam.utils
    - WebUtils java类

- 我们在调用 WebUtils 的静态copyParamToBean()方法的时候 需要传递的参数有
- 1. req
- 2. JavaBean对象

```java
package com.sam.utils;

import org.apache.commons.beanutils.BeanUtils;
import javax.servlet.http.HttpServletRequest;

public class WebUtils {
  public static void copyParamToBean(HttpServletRequest req, Object bean) {
    try {
      BeanUtils.populate(bean, req.getParameterMap());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

> 原理:
- 为什么 BeanUtils 类可以完成 请求参数一次性的注入到 JavaBean中呢？

- 1. 我们先看看 req.getParameterMap() 方法的返回值 并输出下 看看样式

> req.getParameterMap()
- 返回 请求参数的 map类型 name=value

```java
Map<String, String[]> parameterMap = req.getParameterMap();

for(Map.Entry<String, String[]> entry: parameterMap.entrySet()) {
  sout(entry.getKey() + " = " + Arrays.asList(entry.getValue()));
}

/*
  action = [regist]
  username = [admin]
  password = [111111]
  repwd = [111111]
  email = [admin@gmail.com]
  code = [abcd]
*/
```

- 要点1：
- 我们发现上面的参数 跟 User对象中的属性名 刚好对上了
- 也就是请求参数名 和 user对象中的属性 一一对应的

- 要点2:
- 当user类中没有 setXxx()的写方法 我们发现该属性就注入不了

- 注入的本质：
- 它会找JavaBean中的写方法 然后将数据传进去 如果该类中没有写方法 那么就跳过(也就是注入不了)

- el表达式里面取值 走的是get(is)读方法
- BeanUtils的注入 走的是set写方法


**问题:**
- 我们将下面方法的第一个参数

  HttpServletRequest req

      ->

        Map value

- 改成了Map value 我们发现也能注入成功 那
- HttpServletRequest req
- Map value
- 有什么区别么？

- BeanUtils.populate()方法的本质就将一个map类型的值注入到JavaBean中

- 而我们注意一下，我们的请求参数的形式本身也是键值对的形式

```java
public class WebUtils {
  public static void copyParamToBean(HttpServletRequest req, Object bean) {
    try {
      // 这里是使用 req的方法获取请求参数值
      BeanUtils.populate(bean, req.getParameterMap());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}

------

// 这里我们将 req 改成了 value 注入功能还是可以用的
public class WebUtils {
  public static void copyParamToBean(Map value, Object bean) {
    try {
      // 这里直接传递Map类型的value
      BeanUtils.populate(bean, value);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

- 区别:
- 日常开发中 将 Map类型的值 注入到JavaBean的场景是很常见的 我们的java代码是分成3层的

 - dao层
 - service层
 - web层

- 如果我们写成HttpServletRequest
- Dao层 和 Service层 没有这个API 也用不了

- 但是我写成Map的情况下 Map在3层中都可以使用 这样耦合度就会低
- 写成 HttpServletRequest 只有 web层可以用 那么WebUtils工具类只能用在web层 耦合度太高了

- 所以我们定义 WebUtils类的时候 我们要将第一个参数 写成 Map类型的 方便于解耦 也便于将 Map类型的值 注入到JavaBean的这个常见的场景 可以使用在别的层上



> WebUtils工具类的最终版
- 这样写代码的适用范围更好 耦合度更低 扩展性更强 适用更加的灵活

```java
package com.sam.utils;

import org.apache.commons.beanutils.BeanUtils;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public class WebUtils {
  public static void copyParamToBean(Object bean, Map map) {
    try {
      BeanUtils.populate(bean, map);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

- 调用方法的时候
```java
User user = new User()
WebUtils.copyParamToBean(user, req.getParameterMap());
```

- 我们还可以在写法上进行些优化:
```java
public class WebUtils {
  public static Object copyParamToBean(Object bean, Map map) {
    try {
      BeanUtils.populate(bean, map);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  return bean
}
```

- 调用的时候
- 调整代码后 下面的代码一行就可以搞定
```java
User user = (User) WebUtils.copyParamToBean(new User(), req.getParameterMap());
```


- 上面的代码还需要进行类型的转换 我们发现我们传入实参的时候 传入的是User 类型就是User 传什么类型就是什么 所以我们可以使用 泛型方法

```java
public class WebUtils {
  public static <T> T copyParamToBean(T bean, Map map) {
    try {
      BeanUtils.populate(bean, map);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  return bean
}
```

- 调用的时候 我们发现不用类型转换了
```java
User user = WebUtils.copyParamToBean(new User(), req.getParameterMap());
```

----------------

### 修改: 使用el表达式 修改表单的回显
- 上面的逻辑中 关于表单信息的回显 我们使用的是 <%=%>表达式脚本
- 现在我们要把它修改为 el表达式

```html
<span class="errorMsg">
  <%= request.getAttribute("msg") == null ? "请输入用户名和密码" : request.getAttribute("msg") %>
</span>

<!-- 修改后 -->
<span class="errorMsg">
  ${ empty requestScope.msg ? "请输入用户名和密码" : requestScope.msg }
</span>
```


- 这里看下 表达式脚本需要判断username是否为null 如果为null 我们要手动设置为""(要不然会显示null)

- 但是el表达式比较简单 如果为空 默认就什么也不显示
```html
<input
  value="<%=request.getAttribute("username") == null ? "" : request.getAttribute("username")%>"
/>
```

```html
<input
  value="${requestScope.username}"
/>
```

----------------

### MVC概念
- MVC全称:

> Model 模型
    将与业务逻辑相关的数据封装为具体的JavaBean类 其中不掺杂任何与数据处理相关的代码(JavaBean/Domain/entity/pojo)


> View  视图:
    只负责数据和界面的显示 不接受与显示数据无关的代码 便于程序员和美工的分工合作(jsp/html)


> Controller  控制器:
    只负责接收请求 调用业务层的代码处理请求 然后派发页面 是一个调度者的角色(servlet)


- MVC最早出现在 JavaEE三层中的Web层 它可以有效的指导Web层的代码如何有效的分离 单独工作

- MVC是一种思想
- MVC的理念是将软件 代码 拆分成为组件 单独开发 组合使用(*目的为了降低耦合度*)

<!-- 
          MVC概念

    MVC分层概念 目的就是为了降低耦合度 让各层的代码尽可能的独立工作 而不产生依赖 方便后期的升级和维护

          页面 View 组件
        -----------------
        用户名: 
        密码:
        -----------------


填充页面↗↙抽取模型                    跳转↖↘请求

                  业务数据模型
Model模型(JavaBean)   →               Controller控制器(接收 跳转)
                     ←
                  参数封装成Bean对象
------------------                    ------------------
private int xxx                       接收页面请求
private String xxx                    封装参数成为javaBean对象

get/set方法等                          转发 重定向让页面跳转

 -->


----------------

### 书城项目： 图书模块 
- 图书模块的功能包括
- 1. 首页 
- 图书的展示 和 下方的分页 上方有 图书价格的搜索(搜索?~?元之间的)

- 2. 后台管理模块
- 有一个图书列表的展示 是一个表格 展示图书的信息 有修改和删除等操作 还有添加图书


> 开发流程
- 1. 编写图书模块的数据库表
- 2. 编写图书模块的JavaBean
- 3. 编写图书模块的Dao和测试Dao
- 4. 编写图书模块的Service和测试Service
- 5. 编写图书模块的Web层和页面联调测试


> 1. 编写图书模块的数据库表
- 图书模块需要存储哪些数据呢？
- 名称 价格 作者 销量 库存 图片路径
- 每本书在首页会进行显示 这时候展示图片是需要一个路径的

> 数据库代码
```sql
create table t_book(
	`id` int primary key auto_increment,
	`name` varchar(100),
	`price` decimal(11,2),
	`author` varchar(100),
	`sales` int,
	`stock` int,
	`img_path` varchar(200)
);

-- 测试数据
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , 'java从入门到放弃' , '国哥' , 80 , 9999 , 9 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '数据结构与算法' , '严敏君' , 78.5 , 6 , 13 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '怎样拐跑别人的媳妇' , '龙伍' , 68, 99999 , 52 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '木虚肉盖饭' , '小胖' , 16, 1000 , 50 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , 'C++编程思想' , '刚哥' , 45.5 , 14 , 95 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '蛋炒饭' , '周星星' , 9.9, 12 , 53 , 'static/img/default.jpg');
 
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '赌神' , '龙伍' , 66.5, 125 , 535 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , 'Java编程思想' , '阳哥' , 99.5 , 47 , 36 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , 'JavaScript从入门到精通' , '婷姐' , 9.9 , 85 , 95 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , 'cocos2d-x游戏编程入门' , '国哥' , 49, 52 , 62 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , 'C语言程序设计' , '谭浩强' , 28 , 52 , 74 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , 'Lua语言程序设计' , '雷丰阳' , 51.5 , 48 , 82 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '西游记' , '罗贯中' , 12, 19 , 9999 , 'static/img/default.jpg');

insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '水浒传' , '华仔' , 33.05 , 22 , 88 , 'static/img/default.jpg');
 
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '操作系统原理' , '刘优' , 133.05 , 122 , 188 , 'static/img/default.jpg');
 
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '数据结构 java版' , '封大神' , 173.15 , 21 , 81 , 'static/img/default.jpg');
 
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , 'UNIX高级环境编程' , '乐天' , 99.15 , 210 , 810 , 'static/img/default.jpg');
 
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , 'javaScript高级编程' , '国哥' , 69.15 , 210 , 810 , 'static/img/default.jpg');
 
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '大话设计模式' , '国哥' , 89.15 , 20 , 10 , 'static/img/default.jpg');
 
insert into t_book(`id` , `name` , `author` , `price` , `sales` , `stock` , `img_path`) 
values(null , '人月神话' , '刚哥' , 88.15 , 20 , 80 , 'static/img/default.jpg');
 
select * from t_book;
```


> 2. 编写图书模块的JavaBean
- JavaBean和表是相对应的 我们有一个什么表 就会有一个什么JavaBean

- JavaBean中的属性 和 表中的字段是一一对应的

  | - com.sam.pojo
    - User
    - Book

```java
package com.sam.pojo;

import java.math.BigDecimal;

public class Book {
  private Integer id;
  private String name;
  private String author;
  private BigDecimal price;
  private Integer sales;
  private Integer stock;

  // 图书的默认地址
  private String imgPath = "static/img/default.jpg";

  
  public Book(Integer id, String name, String author, BigDecimal price, Integer sales, Integer stock, String imgPath) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.price = price;
    this.sales = sales;
    this.stock = stock;

    // 如果没有imgPath或者赋值的是空串 才能够赋值 不然就使用默认值 保证首页图书是有封面的
    if(imgPath != null && "".equals(imgPath)) {
      this.imgPath = imgPath;
    }
  }


  // setImgPath()方法也有必要这么设置下
  public void setImgPath(String imgPath) {
    if(imgPath != null && "".equals(imgPath)) {
      this.imgPath = imgPath;
    }
  }

  // 还有get set方法 空参构造器 toString等
}
 
```


> 3. 编写图书模块的Dao和测试Dao
- 实现图书模块Dao的步骤
- 1. 创建图书模块Dao的接口

  | - com.sam.dao
    - BookDao(interface)
    - 该接口中根据业务功能定义方法 比如有添加图书功能就在接口中定义添加方法
    - 一共有增删改查的方法

```java
package com.sam.dao;
import com.sam.pojo.Book;
import java.util.List;

public interface BookDao {
  // 添加图书
  public int addBook(Book book);

  // 根据id删除图书
  public int deleteBookById(Integer id);

  // 修改图书
  public int updateBook(Book book);

  // 根据id查询指定图书
  public Book queryBookById(Integer id);

  // 查询所有图书
  public List<Book> queryBooks();
}

```

- 2. 创建 BookDao 的实现类

  | - com.sam.dao.impl
    - BookDaoImpl
    - 它需要继承BaseDao并且实现BookDao接口

<!-- 
  回顾:
  - BaseDao里面定义了
  - 使用DbUtils操作数据 等方法

  - update() 通过sql语句 对数据库进行 insert update delete等操作
  - queryForOne() 通过sql语句返回一个对象
  - queryForList() 通过sql语句返回多个对象 List
  - queryForSingleValue() 通过sql语句返回一行中某一列的值
 -->

- BookDaoImpl类继承了BaseDao就意味着它可以通过父类中的方法操作数据库
- BookDaoImpl类实现了BookDao接口就意味着 实现了接口中定义的方法 在实现方法中调用BaseDao里面的方法 操作数据库

<!-- 
  BaseDao里面的方法是直接操作数据库的

  接口的实现方法() {
    BaseDao继承方法()
  }
 -->

- BookDaoImpl类的代码部分
```java
package com.sam.dao.impl;

import com.sam.dao.BookDao;
import com.sam.pojo.Book;

import java.util.List;

public class BookDaoImpl extends BaseDao implements BookDao {
  @Override
  public int addBook(Book book) {
    String sql = "insert into t_book(`name`,`author`,`price`,`sales`,`stock`,`img_path`) values(?,?,?,?,?,?)";

    return update(sql, book.getName(), book.getAuthor(), book.getPrice(), book.getSales(), book.getStock(), book.getImgPath());
  }

  @Override
  public int deleteBookById(Integer id) {
    String sql = "delete from t_book where id = ?";
    return update(sql, id);
  }

  @Override
  public int updateBook(Book book) {
    String sql = "update t_book set `name` = ?,`author` = ?,`price` = ?,`sales` = ?,`stock` = ?,`img_path` = ? where id = ?";

    //　我们传入的参数 和 sql语句中的 ? 一一匹配 比如最后一个id不要忘记传
    return update(sql, book.getName(), book.getAuthor(), book.getPrice(), book.getSales(), book.getStock(), book.getImgPath(), book.getId());
  }

  @Override
  public Book queryBookById(Integer id) {
    // imgPath要加一个别名
    String sql = "select `id` , `name` , `author` , `price` , `sales` , `stock` , `img_path` imgPath from t_book where id = ?";

    return queryForOne(Book.class, sql, id);

  }

  @Override
  public List<Book> queryBooks() {
    String sql = "select `id` , `name` , `author` , `price` , `sales` , `stock` , `img_path` imgPath from t_book";

    return queryForList(Book.class, sql);
  }
}

```

- 上面的类写完了 然后我们要进行测试
- 以往我们都在 test 包下 写上 BookDaoTest 类 一个个方法去写的 我们也可以直接生成测试

- 1. 选择 BookDao 接口
- 2. 在接口中 按 ctrl + shift + t 创建测试
- 3. 选择测试所在的包 destination package
- 4. 选择测试的库 Junit 4
- 5. 选择要测试的方法

- 代码部分:
```java
package com.sam.test;

import com.sam.dao.BookDao;
import com.sam.dao.impl.BookDaoImpl;
import com.sam.pojo.Book;
import org.junit.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.Assert.*;

public class BookDaoTest {

  // 测试的时候 需要一个 BookDao 因为我们要测的旧是它实现类的方法
   private BookDao bookDao = new BookDaoImpl();

  @Test
  public void addBook() {
    // id自增长为空 new BigDecimal因为类中定义的就是这个类型 imgPath为空因为使用默认值就可以
    bookDao.addBook(new Book(null, "bookname1", "sam", new BigDecimal(99), 1000, 50, null));
  }

  @Test
  public void deleteBookById() {
  }

  @Test
  public void updateBook() {

    bookDao.updateBook(new Book(21, "book_name1", "sam", new BigDecimal(99), 1000, 50, null));
  }

  @Test
  public void queryBookById() {
    System.out.println(bookDao.queryBookById(21));
  }

  @Test
  public void queryBooks() {
    List<Book> list = bookDao.queryBooks();
    for(Book book: list) {
      System.out.println(book);
    }
  }
}
```


> 4. 编写图书模块的Service和测试Service
- service层也是差不多 点定义一个 BookService接口

  | - com.sam.service
    - BookService(interface)

- 定义 BookService接口
```java
package com.sam.service;

import com.sam.pojo.Book;

import java.util.List;

public interface BookService {
  // 添加图书
  public void addBook(Book book);

  // 删除图书
  public void deleteBookById(Integer id);

  // 修改图书
  public int updateBook(Book book);

  // 根据id查询指定图书
  public Book queryBookById(Integer id);

  // 查询所有图书
  public List<Book> queryBooks();
}

```


- 定义 BookService接口 的实现类
```java
package com.sam.service.impl;

import com.sam.dao.BookDao;
import com.sam.dao.impl.BookDaoImpl;
import com.sam.pojo.Book;
import com.sam.service.BookService;

import java.util.List;

public class BookServiceImpl implements BookService {

  // service层会依赖于Dao层 通过bookDao去操作访问数据库
  private BookDao bookDao = new BookDaoImpl();

  @Override
  public void addBook(Book book) {
    bookDao.addBook(book);
  }

  @Override
  public void deleteBookById(Integer id) {
    bookDao.deleteBookById(id);
  }

  @Override
  public void updateBook(Book book) {
    bookDao.updateBook(book);
  }

  @Override
  public Book queryBookById(Integer id) {
    return bookDao.queryBookById(id);
  }

  @Override
  public List<Book> queryBooks() {
    return bookDao.queryBooks();
  }
}
```


- 测试 service接口
```java
package com.sam.test;

import com.sam.pojo.Book;
import com.sam.service.BookService;
import com.sam.service.impl.BookServiceImpl;
import org.junit.Test;

import java.math.BigDecimal;

import static org.junit.Assert.*;

public class BookServiceTest {
  private BookService bookService = new BookServiceImpl();

  @Test
  public void addBook() {
    bookService.addBook(new Book(null, "book_name2", "erin", new BigDecimal(199), 20, 0, null));
  }

  @Test
  public void deleteBookById() {
    bookService.deleteBookById(22);
  }

  @Test
  public void updateBook() {
    bookService.updateBook(new Book(22, "book_name2", "erin", new BigDecimal(199), 200, 0, null));
  }

  @Test
  public void queryBookById() {
    System.out.println(bookService.queryBookById(22));
  }

  @Test
  public void queryBooks() {
    for (Book queryBook : bookService.queryBooks()) {
      System.out.println(queryBook);
    }
  }
}
```


> 5. 编写图书模块的Web层和页面联调测试
- 接下来我们写web层 web层的话是负责处理请求和响应 也就是servlet

  | - com.sam.web
    - BookServlet extends BaseServlet

<!-- 
  BaseServlet的逻辑是:
  在post请求中
  根据jsp页面中隐藏域的值 判断这次请求的动作 利用反射 调用对应的方法

  String action = req.getParameter("action");
  try {

    // this是当前的对象实例 getClass() 就是获取父类(造this的类)
    
    Method method = this.getClass().getDeclaredMethod(action, HttpServletRequest.class, HttpServletResponse.class);s
    // this是当前的对象实例
    method.invoke(this, req, res);

  } catch (Exception e) {
    e.printStackTrace();
  }
 -->


- BookServlet程序中 每一个方法都会表示一个功能
- 图书模块主要有:
- 1. 添加图书
- 2. 修改
- 3. 删除
- 4. 列表的展示


> 列表的展示功能
- 我们先完成列表的展示 列表需要数据 所以我们先完成查询图书的功能

- 业务流程:

- 首页开始 
  -> 点击 后台管理 按钮后跳转 ↓
  -> 点击 图书管理(manager.jsp) 按钮后跳转 ↓
  -> (图书列表的页面)book_manager.jsp 
  <!-- 
    /pages/manager/book_manager.jsp页面 
    该页面展示所有图书信息

    这个jsp页面里面需要全部的图书信息 但是图书信息在数据库中 jsp页面是不能够查询数据库的
    
    但是 Dao可以 service层可以访问dao web层可以访问service
  -->

- 不应该让 点击 图书管理(manager.jsp)按钮后 直接跳到 (图书列表的页面)book_manager.jsp页面 *因为直接过去没有数据*

- 整个流程就应该是这样:
- BookServlet程序
  - 该程序中需要提供 public void list() 该方法中应该完成如下的逻辑
  - 1. 查询全部图书
  - 2. 保存到request域中
  - 3. 请求转发到 pages/manager/book_manager.jsp 页面 

- 这样流程就可以了 当我们点击 图书管理 按钮后 到 BookServlet程序里面 然后servlet程序中查询了数据 保存了数据 转发页面到目标页

- 这样由于请求转发是一次请求 它们共享request域中的数据 这样就有数据了

- 然后 book_manager.jsp 页面 两个步骤
- 1. 从request域中获取全部图书信息
- 2. 使用jstl标签库遍历输出

**总结**
- 如果访问jsp无法直接得到数据 那么可以让程序先访问servlet程序 再转发


> 1. 给 BookServlet程序 添加访问地址
- 相当于配置路由

```xml
<servlet-mapping>
  <servlet-name>BookServlet</servlet-name>
  <url-pattern>/manager/book_list</url-pattern>
</servlet-mapping>
```

**注意:**
- 接口地址的位置 我们以前都是直接写的 /接口名
- 现在为什么要在前面加了一层路径名?
- 接口地址前面还加上了 /manager 这是为了后面的权限管理 用的

- 一个项目是分 前台 和 后台的

- 前台页面:
- 前台是给普通用户使用 一般不需要权限检查就可以访问的资源/功能 都属于前台页面
<!-- 
  比如:
  - 淘宝不登录就可以访问的首页(包含 商品的浏览)
 -->

- 后台页面:
- 后台是给管理员使用的 一般都需要权限检查 才可以访问到的资源/页面/功能 这属于后台页面
<!-- 
  比如:
  - 管理员要添加一个商品 修改价格 这必须是有权限的管理员才可以
 -->

- 后台页面一般都需要权限检查
- 我们会通过url地址做权限检查

- 前端地址 比如: /client/book_list
- 后台地址 比如: /manager/book_list

- 这样我们只要看到manager就是后台的 这时候我们就需要对它进行权限管理



> 2. 修改 <a>图书管理</a> 的href地址
- 接口地址 /manager/book_list 默认是接在工程名的后面 
- <a href="manager/book_list?action=list">图书管理</a>
<!-- 
  a标签点击是get请求
  但是我们BaseServlet里面没有doGet方法 我们可以在BaseServlet里面重写doGet()方法 在里面调用 doPost()

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    doPost(req, res);
  }

  不然的话会有405错误 这样get方法和post方法做的事情都是一样的
 -->

- 要点:
- 1. manager/book_list 是前面没有 /
- 2. 后面加上了action参数 值为 servlet程序中定义的方法名 因为我们程序中的逻辑是根据action的值 通过反射调用action的值的同名方法


> 3. BookServlet程序中 list() 方法中的逻辑
```java
// 方法的外层需要这个对象
private BookService bookService = new BookServiceImpl();

protected void list(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
  // 1. 创建 bookService 对象(service层) 查询全部图书
  List<Book> books = bookService.queryBooks();

  // 2. 把全部图书保存到request域中
  req.setAttribute("books", books);

  // 3. 请求转发到 /pages/manager/book_manager.jsp页面
  // /表示到工程名也就是web目录
  req.getRequestDispatcher("/pages/manager/book_manager.jsp").forward(req, res);
}
```


> 4. 写book_manager.jsp页面的逻辑
- 页面中需要使用jstl标签库 所以要导入jstl jar包

```html
<c:forEach items="${requestScope.books}" var="book">
<tr>
  <td>${book.name}</td>
  <td>${book.price}</td>
  <td>${book.author}</td>
  <td>${book.sales}</td>
  <td>${book.stock}</td>
  <td><a href="book_edit.jsp">修改</a></td>
  <td><a href="#">删除</a></td>
</tr>
</c:forEach>
```

------

> 添加图书功能
- jsp页面中 添加图书 的按钮 也是一个 <a>标签
- <td><a href="pages/manager/book_edit.jsp">添加图书</a></td>

- 点击 添加图书 后会跳转到另一个页面 编辑图书页面
- 我们在编辑图书页面 添加图书信息 然后可以点击提交

> 整体页面流程分析:
- 在图书列表页面 点击 *添加图书* 按钮 会跳转到 编辑图书的页面

- 编辑图书的页面就是一个表单 里面需要输入图书的信息 然后有*提交按钮*

- 我们在表单中输入内容后 我们会点击提交 会提交到服务器(BookServlet程序)
<!-- 
  这里的表单还需要一个 隐藏域用于 程序中利用反射 调取隐藏域中的value的值的同名方法
 -->
```html
<form action="manager/book_list" method="get">
  <input type="hidden" name="action" value="add"> <br>
```

- BookServlet程序中 每个功能都会有一个对应的方法
- public void add() -- 负责添加图书

- add()方法中需要处理以下的逻辑
- 1. 获取请求的参数 封装成为Book对象
- 2. 调用bookService.addBook()方法添加 保存图书到数据库
- 3. 上面的逻辑已经完成 但是我们点击提交后 应该跳回 图书列表页面 页面上需要展示新的图书
- 所以3里面还要跳到图书列表页面 跳的时候的地址是
- /manager/book_list?action=list

- 这样跳过去会再走一遍list()请求数据的逻辑


> 代码部分
- 图书编辑jsp页面的调整
```html
  <div id="main">
  <form action="manager/book_list" method="get">
    <!-- 
      form表单里面要用隐藏域告诉服务器调用哪个方法
    -->
    <input type="hidden" name="action" value="add"> <br>

<!-- 表单项的name属性值 要和javaBean中的属性一致 -->
<td><input name="name" type="text" value="时间简史"/></td>
<td><input name="price" type="text" value="30.00"/></td>
<td><input name="author" type="text" value="霍金"/></td>
<td><input name="sales" type="text" value="200"/></td>
<td><input name="stock" type="text" value="300"/></td>
<td><input type="submit" value="提交"/></td>
```

- BookServlet程序逻辑
```java
protected void add(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 获取请求参数 封装成book对象
    Book book = WebUtils.copyParamToBean(new Book(), req.getParameterMap());

    // 2. 调用 BookService.addBook() 保存图书
    bookService.addBook(book);

    // 3. 跳转到图书列表页面 /manager/bookServlet?action=list
    req.getRequestDispatcher("/manager/bookServlet?action=list").forward(req, res);
  }
```

- 当用户点击提交就会到 add() 方法内 执行里面的逻辑
- 1 2 3 
- 然后跳转到 图书列表 页面 这时候的页面地址如下
- localhost:8080/book/manager/book_list?action=add&name=时间简史&price=30&author=霍金&sales=200

- 但是这里有个*bug* 当用户在图书列表页面(上面的url) 刷新页面的时候 又会走 add() 方法里面的逻辑了 造成了图书再一次的被添加 再刷新又添加


> 这就是表单重复提交
- 当用户提交完请求 浏览器会记录下最后一次请求的全部信息 
- 当用户按下F5刷新页面 就会发起浏览器记录的最后一次请求
- 而我们的最后一次请求就是添加图书的操作

- 所以我们add()方法的最后不应该用请求转发 因为请求转发是一次请求 我们要使用*重定向*
<!-- 
  // 不应该用这个
  req.getRequestDispatcher("/manager/bookServlet?action=list").forward(req, res);
 -->

> 修改后
```java
protected void add(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    // 1. 获取请求参数 封装成book对象
    Book book = WebUtils.copyParamToBean(new Book(), req.getParameterMap());

    // 2. 调用 BookService.addBook() 保存图书
    bookService.addBook(book);

    // 3. 跳转到图书列表页面 /manager/bookServlet?action=list
    // 请求转发会造成 表单的重复提交 这里我们使用 重定向
    // req.getRequestDispatcher("/manager/book_list?action=list").forward(req, res);

    // 请求转发的/是到web 重定向的/表示到端口号 所以我们要把工程名加上
    res.sendRedirect(req.getContextPath() + "/manager/book_list?action=list");
  }
```