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