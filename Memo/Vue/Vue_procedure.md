### https://www.cnblogs.com/haiyan123/p/9765447.html
- 1. 关闭数据库
- 2. sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables
- 3. chinaliulin
- 4. 新打开一个终端
- 5. mysql -u root
- 6. use mysql
- 7. UPDATE mysql.user SET authentication_string=PASSWORD('你的密码') WHERE User='root';


### 项目概述
> 1. 电商后台管理系统的功能
- 用户登录

- 退出登录

- 用户管理

- 权限管理
  - 角色列表
  - 权限列表

- 商品管理
  - 商品列表
  - 分类管理
  - 参数管理

- 订单管理

- 数据统计


> 2. 电商后台管理系统的开发模式
- 电商后台管理系统整体采用前后端分离的开发模式，其中前端项目是基于vue技术栈的spa项目
<!-- 
  后端主要操作数据库 并向前端暴露一些api接口
  前端负责页面 然后利用ajax调用接口

  后端负责写接口 前端负责调接口的模式 就是前后端分离的模式
 -->


> 3. 前端项目的技术栈
- vue
- vue-router
- element-ui
- axios
- echarts


> 4. 后端技术栈
- nodejs
- express
- jwt         状态保持的工具 有了它可以模拟session登录记录功能
- mysql
- sequelize   这个是操作数据库的框架

-----------------

### 测试接口
- 我们可以根据接口文档查看该接口需要什么样的参数 和 地址是多少 在postman中进行测试
- 注意点：
- 1. 什么方式的请求
- 2. 请求参数是什么
<!-- 
  参数可能就几个 但是返回的数据确实一堆
  比如：
  login接口：
  需要参数：1. username   2. password   admin 123456
  {
    "data": {
      "id": 500,
      "rid": 0,
      "username": "admin",
      "mobile": "12345678",
      "email": "adsfad@qq.com",
      "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MzI2NDI3MDgsImV4cCI6MTYzMjcyOTEwOH0.nUh3oWuBgISWO1h2paCpOduUpEI7bkrVfniRlrypWBU"
    },
    "meta": {
      "msg": "登录成功",
      "status": 200
    }
  }
 -->

-----------------

### 登录概述
> 1. 登录业务流程
  - 1. 在登录页面输入用户名 和 密码
  - 2. 调用后台接口进行验证 发送登录请求
  - 3. 后台根据提交过去的用户名和密码 进行验证 验证的结果是失败 或者 成功
  <!-- 
    如果登录失败 需要在前端提示用户登录失败
    如果登录成功 需要根据响应的状态跳转到项目的主页
   -->


> 2. 登录业务的相关技术点
- 1. http是无状态的
  所以登录成功后需要记住用户的登录状态
  1. 通过 cookie 在客户端记录状态
  2. 通过 session 在服务器端记录状态
  3. 通过 token 方式维持状态
  <!-- 
    什么时候用 cookie 和 session 和 token
    我们现在vue项目运行在一个端口号 而我们的服务器在另一个端口号 它们之间就会存在一个跨域的问题

    如果前端和后台之间不存在跨域的问题 推荐使用cookie 和 session
    如果前端和后台之间存在跨域问题 推荐使用token的方式

    为什么？
    cookie session 
   -->


> 3. 登录 - token 原理分析
- 场景：
- 客户端和服务器之间存在着跨域的情况，客户端要发送ajax请求到服务器 请求数据

- 流程：
- 1. 客户端用户登录 输入用户名和密码 发送登录请求
- 2. 服务器接收到客户端的参数开始验证登录 如果成功 服务器会生成当前用户所对应的 token 并且服务器会将token通过网络请求返回给客户端
  - token 是由服务器生成的 每个用户对应的token都是不一样的

- 3. 客户端拿到token之后需要存储token值 因为这个token 相当于记录了客户端登录的状态
- 4. 客户端后续的所有请求都需要携带该token 发送请求
<!-- 
  客户端在发送下一次请求的时候 携带了这个token 服务器就会根据提交过来的token 去验证你是哪个用户 从而根据你的操作返回不同的结果

  token就是客户端与服务器之间的用户的身份验证校验的
 -->

- 5. 服务器验证token是否通过 如果存在代表你已经登录 然后给你返回不同的数据


> 扩展知识点：
- 关于身份验证流程
> 1. session 认证流程：
<!-- 
  - 1. 用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的 Session

  - 2. 请求返回时将此 Session 的唯一标识 SessionID 返回给浏览器

  - 3. 浏览器接收到服务器返回的 SessionID 后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名

  - 4. 当用户第二次访问服务器的时候，请求会自动把此域名下的 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。
 -->


> 2. Acesss Token
- 简单 token 的组成：
  - uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）

- 服务器对 Token 的存储方式：
- 1. 存到数据库中，每次客户端请求的时候取出来验证（服务端有状态）
- 2. 存到 redis 中，设置过期时间，每次客户端请求的时候取出来验证（服务端有状态）
- 3. 不存，每次客户端请求的时候根据之前的生成方法再生成一次来验证（JWT，服务端无状态）


- 特点：
- 服务端无状态化、可扩展性好
- 支持移动端设备
- 安全
- 支持跨程序调用


- token 的身份验证流程：
<!-- 
  - 1. 客户端使用用户名跟密码请求登录
  - 2. 服务端收到请求，去验证用户名与密码
  - 3. 验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端
  - 4. 客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 localStorage 里

  - 5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 token
  - 6. 服务端收到请求，然后去验证客户端请求里面带着的 token ，如果验证成功，就向客户端返回请求的数据
 -->


**注意：**
- 每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里
- token 完全由应用管理，所以它可以避开同源策略

- 登录时 token 不宜保存在 localStorage，被 XSS 攻击时容易泄露。
- 所以比较好的方式是把 token 写在 cookie 里。
- 为了保证 xss 攻击时 cookie 不被获取，还要设置 cookie 的 http-only。
- 这样，我们就能确保 js 读取不到 cookie 的信息了。再加上 https，能让我们的请求更安全一些。


> 3. Token 和 Session 的区别
- Session 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。

- 而 Token 是令牌，访问资源接口（API）时所需要的资源凭证。Token 使服务端无状态化，不会存储会话信息。

- Session 和 Token 并不矛盾，作为身份认证 Token 安全性比 Session 好，因为每一个请求都有签名还能防止监听以及重复攻击，而 Session 就必须依赖链路层来保障通讯安全了。如果你需要实现有状态的会话，仍然可以增加 Session 来在服务器端保存一些状态。


> 什么是 JWT
- JSON Web Token（简称 JWT）是目前最流行的跨域认证解决方案。是一种认证授权机制。
- JWT 是为了在网络应用环境间传递声明而执行的一种基于 JSON 的开放标准。JWT 的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上。可以使用 HMAC 算法或者是 RSA 的公/私秘钥对 JWT 进行签名。因为数字签名的存在，这些传递的信息是可信的。

- 这个部分看看这个网站吧 写的很好
https://www.cnblogs.com/gaodi2345/p/13864532.html


-----------------

### 登录功能实现
- 通过 element ui 组件来实现布局
- 要使用的组件：
<!-- 
  el-form
  el-form-item
  el-input
  el-button
  图标字体
 -->

- 记录：
- 登录的布局中 含有登录的表单 有用户名 和 密码 和 按钮区域
- 用户名 是一个 form-item 项
- 密码 是一个 form-item 项
- 登录按钮 和 重置按钮 也是一个 form-item 项


> element-ui的使用方式
- <el-from label-width="80px">
- label-width 是给input框左侧文字区域的宽度
- 当不想要左侧区域的时候 删掉它是没有用的 必须设置为0
<!-- 
  <el-from label-width="0">

  注意 假如只有一项不想要左侧label的占位距离 可以单独设置
  <el-form-item label-width="0">
 -->

- 当发现 form 框没有占满整个宽度的时候 我们要给它一个width: 100%的设置
- 占满后想让 form 框和左右之间有空隙 那就使用 padding 
- 发现 form 超过父元素区域的时候 我们就使用 box-sizing 试试
<!-- 
  .login-form {
    position:absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .btn-wrap {
      background-color: red;
      text-align: center;
    }
  }
 -->


- <el-form-item label="文本框前面的文字">
- input框左侧文字的内容


- <el-from class="test">
- <el-form-item class="test">
- form 和 formItem是可以添加类名的


- <input prefix-icon="el-icon-search"> 给input框内 添加图标的方式有两种
- 1. 属性的方式添加 图标字体
- 2. slot的方式添加 图标字体
<!-- 
  可以通过 prefix-icon 和 suffix-icon 属性在 input 组件首部和尾部增加显示图标
  也可以通过 slot 来放置图标。
 -->


- <input type="password">
- 可以为input框指定类型


> form组件的数据收集
- 在 form 组件上 有一个 :model 我们在这个表单中填写的所有数据 都会自动同步到 绑定的对象身上
- 1. <form :model="form">
- 将form组件中的所有提交数据都绑定在form对象上，form在data中定义

- 2. <el-input v-model="form.username">
- 在每一个 输入框或者下拉框上使用 v-model 绑定到 form 对象上的属性上
<!-- 
  表单中的所有数据都会在这个form对象上
  <el-form :model="form">
  <el-input v-model="form.username">

  form对象是在data配置项中定义的
  data() {
    return {
      username: ''
      password: ''
    }
  }
 -->


> form组件的数据验证
- 当我们输入完信息之后 会对文本框中的内容进行数据的验证
- 1. 在 <form :rules="rules">
- 给 form 绑定一个 验证规则对象 rules 也在data数据中定义 它当中是一组组的kv 
- k：form数据对象中的一个值 比如 username
- v：类型是一个数组 数组中是一个个对象 每一个对象就是一条验证规则
      v 中可以定义的规则有 required message trigger min max type
<!-- 
  rules: {
    username: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    date1: [
      { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  }
 -->

- 2. <el-form-item prop="name">
- 使用prop属性 指定 哪条验证规则对它生效
<!-- 
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min:4, max:10, message: "长度在 4 到 10 个字符", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min:4, max:10, message: "长度在 4 到 10 个字符", trigger: "blur"}
        ]
      }
    }
  }

  <el-form 
    class="login-form" 
    size="small"
    :model="loginForm"
    :rules="loginRules"
  >
    <el-form-item prop="username">
      <el-input 
        prefix-icon="el-icon-user-solid"
        v-model="loginForm.username"
      >
      </el-input>
    </el-form-item>
 -->


> form组件的 重置按钮
> resetFields
- 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
- 只要我们获取了表单的实例对象 通过实例对象调用resetFields函数就可以了
- 我们可以给 form 组件 使用ref属性 来获取这个组件的实例对象

- 要点：
- 我们通过 ref 给组件绑定的的时候 获取的是组件实例对象

<!-- 
  <el-form 
    ref="loginFormRef"
  >

  methods: {
    resetLogin() {
      this.$refs.loginFormRef.resetFields()
    }
  }
 -->


> form组件的 登录的预校验
- 我们点击登录按钮之后不应该直接发起网络请求 应该在发起请求之前先对表单数据进行校验 当验证通过之后才能发起网络请求

- 思路：
- 点击登录之后 调用表单的某个函数 进行预验证


> validate
- 通过表单的实例对象 调用该方法 参数是一个回调函数

- 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
<!-- 
  this.$refs.loginFormRef.resetFields((valid, object) => {
    boolean 为 true 校验通过 为false 校验不通过
    if(!valid) return

  })
 -->


> form组件的 点击登录 发起请求
- 1. 配置 axios 在入口文件中 像下面这样操作 每一个组件都可以通过this访问到$axios 从而发起ajax请求
<!-- 
  import axios from "axios"

  // 配置请求根路径
  axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
  Vue.prototype.$axios = axios

  我没用这种方式 使用的是 王红元的网络封装axios
 -->

- 要点：
- let {data: res} = await request()
- 可以解构赋值 + 重命名

<!-- 
  loginSubmit() {
    this.$refs.loginFormRef.validate(async (valid) => {
      if(!valid) return
      try {
        let {data: res} = await request({
          url: "/login",
          method: "post",
          data: this.loginForm
        })
        if(res.meta.status !== 200) return console.log(res.meta.msg)
        console.log("登录成功", res)

      } catch(err) {
        console.log(err)
      }
    })
  }
 -->

- 2. 发起登录请求后 我们可以判断返回的数据中的状态码 如果不是200 那么就说明登录失败
<!-- 
  {
    data: null
    meta: {msg: '用户名不存在', status: 400}
  }
 -->

- 总结思路：
- 在点击登录的时候先进行了预校验 如果为true 我们开始发送 ajax请求
- 我们对拿到的后台结果 进行判断 也就是说 一般后台返回的结果 都会有 status 之类的东西楼？


> Message消息提示
- 它的使用方式比较特殊 不是注册插件 而是全局挂载
- 相当于将弹窗组件挂载到了Vue的原型上 这样每一个组件都可以通过this来访问到$message
<!-- 
  import {
    Message
  } from 'element-ui'

  Vue.use(Input)
  Vue.prototype.$message = Message


  // 两种使用方式
  this.$message({
    message: res.meta.msg,
    type: "error",
    duration: "1000"
  })

  this.$message.success("登录成功")
  console.log(res)

  // res的结果

  // data
  email: "adsfad@qq.com"
  id: 500
  mobile: "12345678"
  rid: 0
  token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MzI3NDg3NjcsImV4cCI6MTYzMjgzNTE2N30.EfPp-yowYV3UBuH_74veodpdWvUL3S9pJKT8XHBBEP4"
  username: "admin"


  // meta
  {msg: '登录成功', status: 200}

  res.data是数据
  res.meta是登录是否成功的信息

  res.data.token 就是颁发的令牌
 -->


> form组件的 点击登录 token的逻辑
- 1. 将登录成功之后的token 保存到客户端的 sessionStorage中
  - 1.1 项目中出了登录之外的其它api接口 必须在登录之后才能访问
  <!-- 
    我们在访问其它接口的时候 携带token token是用户登录成功后 服务器颁发的 所以当访问其它接口的时候 携带token 证明成功登录的 
   -->

  - 1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage中

> 要点：window.sessionStorage.setItem("token", res.data.token)
  <!-- 
    为什么是session不是local 因为session是关闭页面后就失效了 所以保存在session比较合适一些
   -->

- 2. 通过编程式导航跳转到后台主页 路由地址是 /home

<!-- 
  loginSubmit() {
    
    ...

        this.$message.success("登录成功")
        console.log(res)

        // 我们将从服务器获取的token保存在 sessionStorage 中
        window.sessionStorage.setItem("token", res.data.token)

        // 既然成功登录 就让它跳转到首页
        this.$router.push("/home")

      } catch(err) {
        console.log(err)
      }
    })
  }
 -->


> 通过路由导航守卫控制访问权限
- 我们的需求除了login页面 其它的页面都是登录成功后才能访问
- 也就是没有登录的状态 是不允许看到其它的页面的 也就是当没有token的时候 我们要自动定向到 /login

- 思路：
- 如果用户没有登录 但是直接通过url访问特定页面 需要重新导航到登录页面
- 我们需要用到路由导航守卫

> 要点：
> router.beforeEach((to, from, next) => { ... })

- 如果用户访问的登录页 直接放行 
- to代表目标页面 如果我们要去的页面 是 login 那么就直接放行

- 如果访问的不是登录页 那我们就要判断 session 中是否存了一个token 我们把token取出来 判断是有token 如果没有 就让它重定向到 login 页面


> 要点：
> next("/login")
- 它有两种放行的写法
- 1. next()
- 2. next(路径)


- 我们需要在路由的配置文件里面写逻辑 在export default router 之间设置全局路由守卫
- /router/index.js
<!-- 
  router.beforeEach((to, from, next) => {

    // 解析：
    to将要访问的路径
    from代表从哪个路径跳转而来
    next是一个函数表示放行
    要return么？要return 这样放行后 后面的逻辑就不执行了
    if(to.path === "/login") return next()

    // 如果没有return出去 那么就说明要访问的是有权限的页面就需要进行判断
    const tokenStr = window.sessionStorage.getItem("token")
    if(!tokenStr) return next("/login")

    // 如果没有return出去就是没有return到login 就说明token是存在的 直接放行
    next()

  })
 -->


> 退出逻辑
- 基于token的方式实现退出比较简单 只需要销毁本地的token即可，这样，后续的请求就不会携带token，必须重新登录生成一个新的token之后才可以访问页面

- 核心代码
- 1. 清空 token
- window.sessionStorage.clear()

- 2. 跳转到登录页
- this.$router.push("/login")
<!-- 
  loginOut() {
    window.sessionStorage.clear()
    this.$router.push("/login")
  }
 -->


> 在访问需要授权的api时 必须要携带 token
- 也就是必须在请求头中使用 authorization 字段提供 token 令牌
- 也就是除了登录接口之外 其它所有接口必须要授权才能调用

- 要点：
- 通过 axios 请求拦截添加 token 保证拥有获取数据的权限
<!-- 
  interceptors.request
  就是一个请求拦截器 我们通过use函数 为请求拦截器挂载一个回调函数
  只要我们通过axios发送请求 在发送请求前优先调用use函数

  export function request(config) {
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8888/api/private/v1"
    })

    instance.interceptors.request.use(config => {
      // 为请求头对象 添加 token 验证的 authorization 字段
      config.headers.Authorization = window.sessionStorage.getItem("token")
      return config
    }, err => {
      console.log(err)
    })

    return instance(config)
  }
 -->


- 方式二
- 全局配置：
<!-- 
  axios.defaults.baseURL = "http"
  axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
  })
  Vue.prototype.$http = axios
 -->



> 问题集：
- 1. html body app高度不撑开的问题
<!-- 
  先在下面的文件夹里面创建 css 文件 
  | - src
    | - assets
      | - css
        - common.css

  html, body, .app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  然后在main.js中引入
  import "./assets/css/common.less"
 -->

- 2. 设置按需引入element-ui后的使用方式
- 在main.js中文中 按照下面的方式使用 写的是 Form 大写的部分
<!-- 
  import Vue from 'vue'
  import {Form, FormItem, Button, Input} from 'element-ui'

  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Button)
  Vue.use(Input)
 -->


> Git相关要点：
- 当我们每次开发一个新功能的时候 都要建立一个新分支 当功能开发完毕后 我们再把分支合并到main主分支上

- 我们在开发登录功能的时候 可以创建一个login分支
<!-- 
  git checkout -b login
  我们创建了一个子分支 并且切换到了 这个 login 分支上

  git branch
  查看当前所有的分支
 -->

- 我们开发完了登录功能后 需要提交 因为我们是在login分支上做的 所以本地提交的时候也是在login分支上

- 接下来我们把login分支上的代码合并到master上
- 1. 切换到 master
<!-- 
  git checkout main
  git branch
  git merge login
 -->

- 2. 将本地的main分支推送到远程仓库
<!-- 
  git push origin main
  git push 就可以哦 哈哈
 -->

- 我们注意一下 本地有两个分支 login 和 main 而远程仓库只有一个分支 main
- 那怎么把本地的login也推送到远程仓库里面呢？
- 1. 切换到login分支
- 2. 这是我们第一次将 login 推送到云端 所以我们要-u
<!-- 
  git push -u origin login
 -->


> 语法处理 处理项目中eslint语法报错的问题
- 我们根目录下创建 .prettierrc 文件
- 1. 格式化的时候 不加分号 双引号格式化的时候为单引号
<!-- 
  {
    "semi": false           // 格式化代码的时候就不会加分号了
    "singleQuote": true     // 设置成单引号
  }
 -->

- 2. 如果函数小括号前没有空格会报错的话 我们配置一下 eslint 文件
- .eslintrc.js
- 我们找到 rules配置项 它就是语法规则
<!-- 
  在下面添加：
  "space-before-function-paren": 0
 -->


-----------------

### 主页部分

> 1. 整体布局
- 先上下划分，再左右划分 这里我们需要用 elment组件
- 1. el-container
- 2. el-header      头部
- 3. el-aside       侧边栏
- 4. el-main        右侧主体

- 要点：
- elementui的组件名称就是它的类名
- el-container 没有全屏 设置它的样式 height 100%
<!-- 
  <template>
    <el-container class="home-container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </template>

  .home-container {
    height: 100%;
  }
 -->


> 2. 菜单部分的样式
- 这里我们使用了 el-menu 和 el-submenu el-submenu-item 组件
<!-- 
  el-menu     包裹器
  el-submenu  1级菜单
  el-submenu-item   2级菜单
 -->

- 菜单项中的图标和文本要自己配置
<!-- 
  <template slot="title">
    <i class="el-icon-location"></i>
    <span>导航一</span>
  </template>
-->


<!-- 
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"      菜单栏的背景色
    text-color="#fff"               菜单栏文字区域的颜色
    active-text-color="#ffd04b">    激活的文本颜色
 -->


> 获取菜单栏数据
- 请求路径： menus
- 请求方法： get
- 响应数据： 
<!-- 
  {
    "data":
      {
        "id": 101,
        "authName": "商品管理",
        "path": null,
        "children": [
          {
            "id": 104,
            "authName": "商品列表",
            "path": null,
            "children": []
          }
        ]
      }
    "meta": {
      "msg": "获取菜单列表成功",
      "status": 200
    }
  }
 -->

- 整个页面在一加载的时候应该立即获取左侧菜单
<!-- 
  data() {
    return {
      menuList: []
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push("/login")
    },

    // 获取所有菜单
    async getMenuList() {
      let {data: res} = await request({
        url: "/menus",
        method: "get"
      })
      if(res.meta.status !== 200) return this.$message.error(res.meta.$message)
      this.menuList = res.data
      console.log(res.data)
    }
  },

  created() {
    this.getMenuList()
  }
 -->


> 使用请求回来的菜单数据 动态渲染菜单
- 1级菜单的渲染
<!-- 
  <el-submenu :index="item.id + ''" v-for="item of menuList" :key="item.id">

  index：
  主要它只接收字符串 所以我们要强制的类型转换

  每一个菜单都要有自己的index 如果index一样点击它的时候会一起打开
 -->

- 2级菜单的渲染
<!-- 
  <el-menu-item :index="i.id + ''" v-for="i of item.children" :key="i.id">
 -->


> 菜单栏的手风琴效果
- 也就是只允许展开一个菜单 展开一个的同时其它的菜单关闭
- el-menu 属性 - unique-opened - boolean


> 菜单栏的展开和合并
- 左向右展开的效果
- el-menu 身上有一个属性 collapse 我们可以通过控制这个值达到控制展开关闭的效果
<!-- 
  <el-menu
    background-color="#00BCD4"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    :collapse="isCollapse"          控制这个值
    :collapse-transition="false"    展开合并动画关闭
  >

  data() {
    return {
      isCollapse: false,
    }
  }

  toggleMenu()  {
    this.isCollapse = !this.isCollapse
  },

  侧边栏也要跟着收缩
  <el-aside :width="isCollapse ? '64px' : '200px' ">
 -->


> 问题1：我们的菜单都是通过v-for循环统一设置的 那怎么在v-for中给菜单添加不一样的图标呢？
- 定义和id一样的key 然后定义图标数组 通过key去找对应的图标
<!-- 
  <i :class="icons[item.id]" class="menu-icon-color"></i>

  icons: {
    // 因为每一个1级菜单都有自己的key 这个key是通过id来定义的 所以我们以id的值作为key 值为字体图标
    "125": "el-icon-user-solid",
    "103": "el-icon-star-on",
    "101": "el-icon-goods",
    "102": "el-icon-s-help",
    "145": "el-icon-s-platform"
  }
 -->


> 问题2：导航栏右侧有一条线多余
- .el-menu {border-right: none}


> 首页路由的重定向
- 现在的效果是 当我们登陆成功后 会跳转到 /home 的页面
- 现在我们要在 home组件里面 放入一个 欢迎组件 当登陆成功后就会自动到home下的 欢迎组件 也就是说 要把 欢迎组件 当做是 home组件的子路由 

- 关于路由的配置信息 那么就要放在 router 的配置文件里面
<!-- 
  {
    path: "/home",
    component: Home,

    //重定向的时候写 /uri 二级路由要带上完整的路径
    redirect: "/home/welcome",
    children: [
      {
        // 二级路由的前面不要加斜线
        path:"welcome",
        component: Welcome
      }
    ]
  }
 -->

 - 不要忘记放置 <router-view>


> <menu :router="true">
 > 导航菜单的每一项改成 router-link的形式
 - 我们左侧的每一个菜单项都是通过 el-menu-item来实现的 如下：
 <!-- 
  <el-menu-item :index="i.id + ''" v-for="i of item.children" :key="i.id">
    <template slot="title">
      <i class="el-icon-menu menu-icon-color"></i>
      <span>{{i.authName}}</span>
    </template>
  </el-menu-item>
  -->

- 我们要将每一个二级菜单改成路由连接 利用 <menu router> 属性
- 是否使用 vue-router 的模式，启用该模式会在激活导航时
- 以 <el-menu-item index> 的index属性作为 path 进行路由跳转
<!-- 
  // 当我们给 el-menu 绑定 router 的时候 此菜单栏就会以
  <el-menu :router="true">

  // 就会以 index 的值为 跳转路径 
  <el-menu-item :index="`/${i.path}`" >

  下面是以id为跳转的路径 我们应该以 path 做为 index 属性的值
  但是 服务器返回的结果是

  menuList是一个数组对象 其中的path属性
  path:"users"

  要知道我们的路由地址都是以 / 开头 所以我们要 这样修改下
  <el-menu-item :index="`/${i.path}`" >
 -->

 -----------------

### 用户列表

> 点击 导航按钮 跳转到对应组件
- 创建用户列表连接对应的组件页面
- 我们登录后直接渲染的是home组件 而我们在home组件里布局的 所以包括导航栏和对应的展示区
- 所以所有的路由组件都可以看做是home.vue的子组件
- 那么就意味着它的子组件都要定义在router配置文件中的 children 属性里面


> 这里有需要注意的地方
- 1. 如果 我希望 我的路径是 /home/user 那么配置的时候要这样
- 二级嵌套路由的前面不要加上 / vue会自动帮我们组成这样的形式
<!-- 
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "user",
        component: User
      }
    ]
  }
 -->

- 2. 如果 我希望虽然我是在home组件下 但希望我的路径是 /user 那么我们就要这样
- path的部分要加上/ 就更新开了一个号似的
<!-- 
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "/user",
        component: User
      }
    ]
  }
 -->

-----------------

> 保存 菜单栏的激活状态
- 现在我们点击完导航区的按钮后 也展示了对应的组件 但是 按钮并没有高亮
- 我们刷新页面后 虽然用户列表的组件展示了 但是导航区都处于合并状态 没有对应的展开

> <el-menu default-active>
- 当前激活菜单的 index  接收的值是一个str
- 也是 NavMenu 组件的属性 我们需要将当前菜单项 <el-menu-item index> 的index赋值给 这个属性

- 而我们现在<el-menu-item index>是 path /users
<!-- 
  // 这里我们写死了 所以展开和刷新后，高亮的都是 el-menu-item 里的index 值
  <el-menu
    :router="true"
    default-active="/users"
  >
 -->

- 那怎么样才能动态的调整呢 而不是写死呢？
> 老师的思路：
- 我们可以把 <el-menu-item index> index对应的值 也就是 path 地址 保存在 sessionStorage中
- 当我们刷新页面的时候可以把这个值从sessionStorage中取出来 动态的赋值给 <el-menu default-active>
<!-- 
  我的思路：
  按钮区都在 home 组件中，我们可以在展示users的时候 通过$route将路径存起来 然后利用子传父 传回home组件


  弹幕的思路：
  既然 index 里面存的是路径 那么 :default-active="$route.path"
  这种方式也可以把
 -->

- 1. 点击链接的时候 将对应的地址保存在 sessionStorage 中
<!-- 
  那就要给所有的菜单绑定单击事件 在单击事件中 存储path值
  这样都能在一个组件中完成哦 那我们的做法好费劲哦
 -->

- 2. 当再次刷新页面的时候 也就是home组件刚被创建的时候 就立即再将值取出来 赋值给左侧的菜单就可以了

<!-- 
  <el-menu
    :router="true"
    :default-active="activePath"
  >

  data() {
    return {
      activePath: "",


  methods: {
    saveNavState(value) {
      window.sessionStorage.set("activePath", value)

      // 当点击链接的时候 不光要将 值存到 session中 还要将赋值给 menu
      this.activePath = value
    },

  
  created() {
    this.getMenuList(),
    this.activePath = window.sessionStorage.getItem("activePath")
  }
 -->

-----------------

 > 绘制 用户列表 的结构
 > 头部： 面包屑 导航 区域
 - 我们使用 element 提供的 Breadcrumb 组件 
 <!-- 
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  -->

-----------------

> 用户列表区：Card 组件
- 这里再提一下 我们可以直接将组件名作为类名 进行样式的覆盖 如果没有效果可以考虑
- >>> 样式穿透 或者是 /deep/ 用来修改组件样式的时候

-----------------

> 带搜索的输入框 
<!-- 
  <el-card class="usersList">
    <el-row :gutter="24">

      <el-col :span="8">
        <div>
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>

      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>

    </el-row>
  </el-card>
 -->

- 问题1：
- 这个 input 框占满了整体屏幕 为了解决宽度的问题 我们可以使用 栅格系统来解决

-----------------

> 获取用户列表数据
- 我们在created里面发起请求首屏的 获取数据 用户展示列表

> API：
- 请求路径：users
- 请求方法：get
- 请求参数：
  - query     查询参数      可以为空
  - pagenum   当前页码      不能为空
  - pagesize  每页显示条数   不能为空
<!-- 
  - 响应参数

    totalpage   总记录数
    pagenum     当前页码
    users       用户数据集合

  
  - 数据格式
  {
    "data": {
      "totalpage": 5,
      "pagenum": 4,
      "users": [
        {
          "id": 25,
          "username": "tige117",
          "mobile": "18616358651",
          "type": 1,
          "email": "tige112@163.com",
          "create_time": "2017-11-09T20:36:26.000Z",
          "mg_state": true, // 当前用户的状态
          "role_name": "炒鸡管理员"
        }
      ]
    },
    "meta": {
      "msg": "获取成功",
      "status": 200
    }
  }
 -->

-----------------

> 分页请求的逻辑
- 思路：
- 我们在一刷新页面的时候就要请求数据 发起axios请求 请求数据用于展示

> 1. 发起get请求的时候要注意请求参数 在vue中一般请参数在data配置项中定义
- 同时 get 参数 在 params 中定义

  - get请求需要传递的参数一般会有：
    - 查询条件
    - 当前页码
    - 一页显示多少数据


**注意：**
- 我们返回的数据 user数据列表和 total 和 pagenum 是同级的说明一样重要


- 其中服务器返回的数据里面的参数有：
  - total： 所有的用户记录数量 可以通过它来实现数据的分页
  - users： 是一个数组 包含第一页中的两条记录
<!-- 
  total: 0,
  queryInfo: {
    query: "",

    // 当前页码 表格中一页显示的数据 当前是第几页 
    pagenum: 1,

    // 一页显示多少条数据
    pagesize: 2
  }

  async getUsersList() {
    let {data :res} = await request({
      url: "/users",
      method: "get",
      params: this.queryInfo
    })
    console.log(res)
  }


  // 返回数据的格式：
  pagenum: 1
  total: 4
  users: (2) [{…}, {…}]
      create_time: 1486720211
      email: "adsfad@qq.com"
      id: 500
      mg_state: true
      mobile: "12345678"
      role_name: "超级管理员"
      username: "admin"

  meta: {msg: '获取管理员列表成功', status: 200}
 -->


> 2. 当获取数据成功的时候 我们将数据保存在 data 配置项里面
- 我们在data配置项中 初始化了两个数据
<!-- 
  data() {
    return {
      userList: [],
      total: "",      这里我们最好是 total: 0 要不element会报错
    }
  }
 -->


> 3. pagination组件 的使用方式
- 为了实现分页效果 我们要使用 element ui 中的 Pagination 组件

- 属性：
  - size-change： 
  - 切换每页显示多少条的下拉菜单 只要切换就触发回调 在回调中可以拿到最新的pagesize
  - 例：拿到的是 5 10 15
  - 一般我们在这个回调中会处理 将用户选择的值 赋值给我们保存在data配置项中的 pagesize


  - current-change:
  - 页码值发现了切换就会触发这个回调 在回调中可以拿到最新的页码值
  - 一般我们在这个回调中会处理 将用户选择的值 赋值给我们保存在data配置项中的 pagenum


  - current-page：
  - 当前显示的第几页的数据（我们可以通过服务器返回的数据中会有当前显示第几页的数据 queryInfo.pagenum ）


  - page-sizes:
  - 它的类型是一个字符串数组 会有下拉框展示我们数组中的值 供我们选择 100条/页


  - page-size：
  - 当前每页显示多少条数据


  - layout：
  - 它的类型是一个字符串 用于展示页面上有哪些功能组件
  - total：例： 共 400 条
  - sizes：例： 5条/页  10条/页  30条/页  50条/页


  - total：
  - 一共有多少条数据 这个是服务器返回给我们的结果
  - element 这里要求 total 要是一个 number 类型的数据

<!-- 
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[5, 10, 30, 50]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
 -->

> 完整代码
<!-- 
  // 监听 pagesize 改变的事件
  handleSizeChange(newSize) {
    console.log("newSize", newSize)

    // 我们将用户选择的newSize 赋值给 data配置项中的  queryInfo.pagesize
    this.queryInfo.pagesize = newSize

    // 既然我们用户选择了最新的 pagesize 那么我们就需要拿着这个最新的pagesize 去请求数据
    this.getUsersList()
  },

  // 监听 页码值 改变的事件
  handleCurrentChange(newPage) {
    console.log("newPage", newPage)
    this.queryInfo.pagenum = newPage
    this.getUsersList()
  },

  async getUsersList() {
    let {data :res} = await request({
      url: "/users",
      method: "get",
      params: this.queryInfo
    })
      
    // 根据服务器返回的状态码判断
    if(res.meta.status !== 200) return this.$message({
      message: "获取用户数据失败",
      type: "error",
      duration: 1000
    })

    // 如果没有return出去那么代表用户获取成功
    this.userList = res.data.users
    this.total = res.data.total
    }
  },
  created() {
    this.getUsersList()
  },
 -->


> 逻辑梳理
- 1. 我们 首先 要参考 get请求 需要的参数 发送请求 这里要注意我们需要什么必传参数
<!-- 
   - get请求需要传递的参数一般会有：
    - 查询条件
    - 当前页码
    - 一页显示多少数据
 -->

- 2. 我们从服务器请求回来的数据里面 会有关于分页的信息
- 比如用户数据 总记录数 
- 我们将获取的数据 报错到data配置项里面 方便其他的地方使用

- 3. 导入 分页组件 需要使用以下的属性和方法
<!-- 
  // 当用户选择每页显示多少条记录的时候触发
  @size-change="handleSizeChange"
      内部逻辑： 将用户选择的结果 保存在 data配置项中 重新发起请求


  // 当用户选择点击了第几页的时候触发
  @current-change="handleCurrentChange"
      内部逻辑： 将用户选择的结果 保存在 data配置项中 重新发起请求

  // 现在是第几页
  :current-page="queryInfo.pagenum"


  :page-sizes="[5, 10, 30, 50]"
  :page-size="queryInfo.pagesize"
  layout="total, sizes, prev, pager, next, jumper"

  // 服务器返回的总记录数 应该是一个数字
  :total="total"
 -->

-----------------

> 根据数据渲染列表
- 我们使用 table 组件

- 配置索引列：
- 我们格外添加一个列 注意设置 type="index" 属性
<!-- 
  <el-table-column type="index" label="序号" align="center"></el-table-column>
 -->


 - 动态生成 column 的时候 一定要注意的是 v-bind="item"

 - 修改表格的字号 我们自己设置的class没有作用的时候
 - 1. 重置 组件名类名
 - 2. 使用 deep


 > 表格中的作用域插槽
 - 当该列指定作用域插槽后 该列的prop就不再生效了
 - 我们返回的数据里面 有一个 用户状态的字段 mg_state 它是一个布尔值
 - table没办法把布尔值渲染成 内容 而且我们要将这个 mg_state 设置成 单选框 的样式
 - 所以这里我们就要使用作用域插槽
 - 只要我们拿到这一行的数据 就能.mg_state 具体的值 然后我们就可以根据值 渲染对应的单选框

 - 我们要想在表格中使用 作用域插槽 就要在 table-column 组件里面写上 template 并且指定上 slot-scope="scope" 其中 scope.row 就是这一行的数据
 <!-- 
  <el-table-column>
    <template slot-scope="scope">

    <template>
  </el-table-column>
  -->

- 那我们拿到数据了 怎么才能渲染成开关呢？
- 这里我们使用 element ui 提供的 Switch 开关
<!-- 
  <el-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949">
  </el-switch>

  绑定v-model到一个Boolean类型的变量。可以使用active-color属性与inactive-color属性来设置开关的背景色。
 -->

- 一个表格中 不同单元格 渲染不同类型的数据
<!-- 
  <el-table-column 
    v-for="item of this.columnData" 
    :key="item.id" 
    v-bind="item"
  >

    <template scope="scope" v-if="item.type == 'switch'">
      <el-switch
        v-model="scope.row.mg_state"
      >
      </el-switch>
    </template>

    <template scope="scope" v-else>
      {{showData(scope.row, item.prop)}}
    </template>
  </el-table-column>


  computed: {
    showData() {
      return (row, prop) => {
        return row[prop]
      }
    }
  }
 -->

-----------------

 > 表格中 操作本行数据的按钮
- 因为不管编辑还是删除我们都需要本行的id 也就是本行的数据 所以 我们还是要通过 表格中的作用域插槽来做
- 比如我们可以访问 姓名 id 等等
- 我们要在这里面放置，修改 删除 分配角色按钮

- 这里我们使用 elementui的 图标按钮
<!-- 
  <el-table-column label="操作" width="200">
    <template scope="scope">
      <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      <el-button type="warning" icon="el-icon-share" size="mini"></el-button>
    </template>
  </el-table-column>
 -->

-----------------

> 按钮的提示组件
- Tooltip 组件
- 我们使用这个组件 将我们的按钮包裹起来就可以了
  - content： 提示文字
  - effect： 风格
  - placement： 出现的位置
  - enterable: 将它设置为false 要不然会挡住其它的内容
<!-- 
  <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
    <el-button type="warning" icon="el-icon-share" size="mini"></el-button>
  </el-tooltip>
 -->

-----------------

> 用户状态的修改
- 我们的表格中有用户的状态 它是一个开关，现在的问题是 当我们改变这个状态的时候 刷新页面 用户的状态又回到未修改之前了

- 没有保存下来的原因 只是因为我们在前台把用户的状态进行了修改 但是并没有同步到后台的数据库里面 所以在刷新页面的时候 会变回去了

- 解决问题的方式很简单 只需要将这次的修改 保存到数据库中

- 思路：
- 1. 我们需要监听到 Switch开头的改变 从而拿到最新的状态
- 2. 调用对应的api接口 把这次的修改 同步到数据库中

- 1. 完成1的话 我们要使用 <el-switch> 的 change 事件
- 该事件会在 switch 状态发生变化时的回调函数 调用 我们在回调中可以拿到最新的状态值
<!-- 
  <el-switch
    v-model="scope.row.mg_state"
    @change="userStateChange(scope.row)"
  >

  用户选择的最新的状态值，双向绑定到了 scope.row.mg_state 这个属性中
  所以我们将 scope.row 这行的数据 也就是最新的数据 传到事件回调里面

  userStateChange(userInfo) {

    // 这里我们就能获取到 修改后的 这个用户的最新数据
    console.log(userInfo)
  },
 -->

- 2. 接下来我们就要在这个事件回调中 使用对应的api接口 发送请求
- 这里我们使用这个接口

- API：
- 该接口用于 修改用户状态

- 1. put请求
<!-- 
  post和put的区别：

  post 用于 新建一条记录
  put  用于 更新一条记录 
    理论上要求前端传递一个完整的userInfo对象
    如果你用了put，但却没有提供完整的UserInfo，那么缺了的那些字段应该被清空

  patch 用于 局部更新一条记录 
    表示该请求是一个局部更新，后端仅更新接收到的字段。
 -->

  - 请求路径：users/:uId/state/:type
  - 请求参数
    - uId   用户ID      不能为空`携带在url中`
    - type  用户状态     不能为空`携带在url中`，值为 true 或者 false

<!-- 
  // 响应数据

  {
    "data": {
      "id": 566,
      "rid": 30,
      "username": "admin",
      "mobile": "123456",
      "email": "bb@itcast.com",
      "mg_state": 0
    },
    "meta": {
      "msg": "设置状态成功",
      "status": 200
    }
  }
 -->


- 前面我们的mg_state数据应该是true和false 这里的请求结果是 1 0 ？ 这样会不会影响显示效果呢？
<!-- 
  data:
    email: "asdf@qq.com"
    id: 502
    mg_state: 1
    mobile: "1213213123"
    rid: 34
    username: "linken"

  meta: {msg: '设置状态成功', status: 200}
 -->

- 完整代码部分：
<!-- 
  // 监听 switch 开关状态的改变
    async userStateChange(userInfo) {
    console.log(userInfo)

    // 获取到最新的用户状态之后 发起请求 修改数据库
    let {data: res} = await request({
      url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
      method: "put"
    })

    console.log(res)
    if(res.meta.status !== 200) {
      // 这里要注意 因为没有成功修改数据库 但是前端页面的显示效果发生了变化 变成了true 所以我们要将true修改回去false
      userInfo.mg_state = !userInfo.mg_state

      return
      this.$message({
        type: "error",
        message: "更新用户数据出错",
        duration: 1000
      })
    }

    // 更新状态成功
    this.$message({
      type: "success",
      message: "更新状态成功",
      duration: 1000
    })

  },
 -->

**注意：请求部分的注意事项**
- 我们发送请求的时候一定要看接口文档 因为每一种接口传递参数和携带参数的位置都不一样
- 比如这次的put 请求 使用的就是 pathInfo 格式 在url上拼接的方式
- 我觉得这是因为后台在设计接口的方面 采取的就是这种模式 所以需要让前端按照这种模式来传递数据

-----------------

> 使用 搜索框 搜索用户
- 在用户输入了用户名称的时候 根据输入结果展示对应的用户
- 这部分的逻辑放在了后台 根据前端发请求时传递的查询条件 进行了模糊匹配 然后返回数据


- 思路：
- 我们要将 input 文本框 和 data 中的数据做双向绑定
- 然后点击按钮的时候调用获取用户列表的函数 进行数据的查询就可以了


- 1. 设计 input 的 v-model 绑定给谁
- 我们在页面一渲染的时候 会发起 用户列表的请求 这个时候 服务器会返回给我们下面的数据格式 而其中query就是用于查询的字段 我们就把input绑定到这个属性上
<!-- 
  query: "",
  pagenum
  pagesize
 -->

- 2. 我们给 搜索按钮 绑定一个单击事件 只要点击了它就会根据 input 的关键字进行搜索 只要点击了按钮就要发起查询用户的请求
<!-- 
  // 这里将用户输入的结果 绑定在了 queryInfo 里面的 query 中 这个queryInfo就是查询用户列表数据的时候 作为查询参数的 params的参数对象
  <el-input placeholder="请输入内容" size="small" v-model="queryInfo.query">

    <el-button
      size="small"
      slot="append"
      icon="el-icon-search"

      // 这里直接调用的是 请求用户列表的函数
      @click="getUsersList"
    ></el-button>

  </el-input>
 -->


- 3. 优化：
- 当我们再想看全部内容的时候，我们在input框里面提供一个清空按钮 当用户点击清空文本框的按钮之后 展现全部的数据

- <el-input clearable v-model="queryInfo.query">
- 给input添加可清空功能 添加 clearable 属性
            
- 当点击清空按钮时触发的回调 
- clear 事件

- 当我们点击 清空按钮就会触发 clear事件 我们在clear事件中重新发起请求就可以获取全部用户数据了
<!-- 
  <el-input 
    clearable placeholder="请输入内容" 
    size="small" 
    v-model="queryInfo.query"

    // 当点击清空按钮的时候 发起获取用户数据的请求
    @clear="getUsersList"
  >
 -->


**注意： 数据查询**
- 这里的数据查询是 利用发送请求的方式 也就是说 后端做了数据查询的处理 比如模糊查询

- 而我在工作中用的方式是 前端处理方式，筛选数据 做显示而已 数据还是后端的那些数据

-----------------

> 添加用户
- 我们点击添加按钮 会弹出 dialog 对话框
- 这里我们就使用了 element ui 的 Dialog 组件
- 放的位置随意

> Dialog 组件
- 属性：
  - title：
  - 对话框的标题

  - visible.sync
  - 用户控制对话框的显示和隐藏

  - width
  - 用于控制对话框的宽度

  - before-close
  - 在对话框关闭之前的事件

<!-- 
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">

    // 这就是内容主体区
    <span>这是一段信息</span>

    // 对话框底部的按钮区
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
 -->


> 在 添加用户的对话框中 渲染一个 添加用户的表单
- 我们要在对话框中 添加一个 表单
<!-- 
  其中有 用户名 密码 邮箱 手机 同时这4项都要有表单验证的效果
 -->

- html代码部分
<!-- 
  <el-form 
    :model="addForm" 
    :rules="addFormRules" 
    ref="addFormRef" 
    label-width="70px" 
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="addForm.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="addForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="addForm.mobile"></el-input>
    </el-form-item>
  </el-form>

  // 添加用户的表单数据
  addForm:{
    username: "",
    password: "",
    email: "",
    mobile: ""
  },

  // 添加用户表单的验证规则
  addFormRules:{
    username: [
      {required: true, message: "请输入用户名", trigger: "blur"},
      {min:4, max: 10, message: "用户名的长度要在3 ~ 10个字符之间", trigger: "blur"}
    ],
    password: [
      {required: true, message: "请输入密码", trigger: "blur"},
      {min:6, max: 15, message: "密码的长度要在6 ~ 15个字符之间", trigger: "blur"}
    ],
    email: [
      {required: true, message: "请输入邮箱", trigger: "blur"},
    ],
    mobile: [
      {required: true, message: "请输入邮箱", trigger: "blur"},
    ]
  },
 -->

- 我们将form中的数据 同步到了 data配置项中的addForm里 而我们的每一个子项都在addForm中的每一个属性身上，这样我们收集的数据都会在这个addForm里面


- 但是 上面针对 邮箱和手机号的验证规则 肯定是不对的 那如何自定义校验规则呢？


> form表单的自定义校验规则
- element在data配置项里面定义了一个 箭头函数 这个函数就是自定义校验规则
- 在箭头函数中包含了 3个 参数
- rule: 
    验证规则

- value：
    需要验证的那个值

- callback：
    如果雁阵通过了 我们就可以直接调用callback 代表验证通过 这个效果可能是element配置好的
      if(value) {return callback()}

    如果验证失败了 我们就需要在callback中传递一个 错误对象
      if(!value) {return  callback(new Error("年龄不能为空"))}

<!-- 
  data() {
    
    form表单的自定义校验规则 在这个部分配置 使用箭头函数的形式
    var checkAge = (rule, value, callback) => { ... }

    return {
      平时的时候 我们都是在这里配置数据
    }
  }
 -->

- 如何使用呢？
- 我们定义好自定义规则函数后 在 data配置项的校验规则对象中 使用
- validator:
    该关键字 可以指向 自定义校验函数
<!-- 
  rules: {
    age: [
      { validator: checkAge, trigger: 'blur' }
    ]
  }
 -->


> 代码部分
<!-- 
  data() {

    // 定义 添加用户 时的校验规则
    let checkMail = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if(reg.test(value)) {

        // 合法的邮箱
        return callback()
      } else {
        return callback(new Error("您输入的邮箱不合法"))
      }
    }

    let checkMobile = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if(reg.test(value)) {

        // 合法电话
        return callback()
      } else {
        return callback(new Error("您输入的电话不合法"))
      }
    }

    return {
      // 添加用户的表单数据
      addForm:{
        username: "",
        password: "",
        email: "",
        mobile: ""
      },

      // 添加用户表单的验证规则
      addFormRules:{
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min:4, max: 10, message: "用户名的长度要在3 ~ 10个字符之间", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min:6, max: 15, message: "密码的长度要在6 ~ 15个字符之间", trigger: "blur"}
        ],
        email: [
          // 校验是否输入了邮箱
          {required: true, message: "请输入邮箱", trigger: "blur"},
          // 校验输入的是否合法
          {validator: checkMail, trigger: "blur"}
        ],
        mobile: [
          {required: true, message: "请输入邮箱", trigger: "blur"},
          {validator: checkMobile, trigger: "blur"}
        ]
      },
    }
  },
 -->


> 添加用户的重置操作
- 当我们先点击 取消 再次点击打开对话框的时候 上次输入的结果并没有消失 我们希望是一个重置的状态 

- 思路：
- 我们在关闭对话框的时候 重置整个表单就可以了
- 我们监听对话框关闭的事件 在事件中做重置表单的操作

> Dialog close事件
- 该事件在对话框关闭的时候会触发
<!-- 
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="50%"
    @close="dialogClose"
  >

  dialogClose() {
    this.$refs.addFormRef.resetFields()
  },
 -->


> 添加表单前的预校验操作
- 当我们在 添加用户 的表单对话框中 点击 确定按钮的时候
- 应该进行下表单预验证

- 这里我们要使用 表单组件身上的 validate() 方法

> formref对象.validate((valid) => { ... })
- 对整个表单进行校验的方法，参数为一个回调函数。
- 该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise

<!-- 
  // 当我们点击 确定后 先进行 表单的预验证 也就是取得 各个表单的验证 结果

  valid：
    当验证全部通过 它是 true
    当验证失败     它是 false

  参数2： 是验证失败的字段


  addUser() {
    // 在这里 我们首先要对整个表单进行预校验
    this.$refs.addFormRef.validate((valid,a) => {
      console.log(valid,a)
    })
  },
 -->


> 发起 添加用户的请求
- 上面的逻辑已经都完成了 也就是说我们可以在点击确定的时候 添加用户信息

- 我们还是要先看api文档 看看我们要发送什么样的请求 和 所需的参数是什么？
- 请求路径：users
- 请求方法：post
- 请求参数：
    username
    password
    email
    mobile

<!-- 
  // 响应数据格式：

  "data": {
    "id": 28,
    "username": "tige1200",
    "mobile": "test",
    "type": 1,
    "openid": "",
    "email": "test@test.com",
    "create_time": "2017-11-10T03:47:13.533Z",
    "modify_time": null,
    "is_delete": false,
    "is_active": false
  },
  "meta": {
    "msg": "用户创建成功",
    "status": 201
  }
 -->

- 完整代码：
<!-- 
  // 在添加用户的对话框中 点击确定 添加用户
  addUser() {
    // 在这里 我们首先要对整个表单进行预校验
    this.$refs.addFormRef.validate(async (valid) => {

      // 如果验证没有通过 我们就不走 添加的逻辑了
      if(!valid) return

      // 如果验证没有通过 那么我们就可以开始 走添加的逻辑了 发起添加用户的请求
      let {data: res} = await request({
        url: "/users",
        method: "post",
        data: this.addForm
      })

      console.log(res)
      if(res.meta.status !== 201) {
        this.$message({
          type: "error",
          message: "添加用户失败",
          duration: 1000
        })
      }

      this.$message({
        type: "success",
        message: "添加用户成功",
        duration: 1000
      })

      this.dialogVisible = false

      // 我们添加了一个新用户后 别忘记还需要刷新用户列表
      this.getUsersList()
    })
  },
 -->

- 要点：
- 因为我们添加了一条数据 那么就要获取用户列表数据 用于显示最新数据

-----------------

> 编辑用户信息
- 当我们点击 编辑按钮 的时候 会弹出 修改用户信息的对话框
- 用户名是只读的 用户可以修改 邮箱和手机 点击确定 发起修改请求

- 思路：
- 1. 我们点击 编辑按钮 后 展示 修改用户信息的对话框
- 2. 点击 编辑按钮 后 我们还要将用户信息 添加到 input 里面
<!-- 
  用户名： linken
  邮箱： xxxx@mail.com
  收集： 12123123
 -->

- 也就是说在点击 编辑按钮 的时候 我们要根据用户的id 查询到用户所对应的旧数据 并且给它保存起来 用我们在表单中进行填充

- 那我们怎么能拿到id呢？ html模板中 可以通过 scope.row 拿到改行的所有数据 我们可以把当前用户的id传递过来
<!-- 
  // 点击 编辑按钮 会弹出 对话框
  <el-button 
    @click="openUpdateUser(scope.row.id)" 
    type="primary" 
    icon="el-icon-edit" 
    size="mini"
  >
  </el-button>


  // 编辑按钮的回调
  // 打开编辑用户信息的回调
  openUpdateUser(id) {

    // 点击 编辑按钮 后的第一件事 打开编辑用户信息的表单对话框
    this.updateDialogVisible = true
    console.log(id)
  },
 -->


- id拿到了 紧接着就是调用对应的接口 获取用户的信息
- 请求路径：users/:id     不能为空`携带在url中`
- 请求方法：get
- 请求参数
<!-- 
  // 响应对象
  {
    "data": {
        "id": 503,                用户id
        "username": "admin3",
        "role_id": 0,             角色id
        "mobile": "00000",
        "email": "new@new.com"
    },
    "meta": {
        "msg": "查询成功",
        "status": 200
    }
  }
 -->

> 完整代码
<!-- 
  // 打开编辑用户信息的回调
  async openUpdateUser(id) {
    let {data: res} = await request({
      url: `users/${id}`,
      method: "get"
    })

    if(res.meta.status !== 200) {
      return this.$message({
        type: "error",
        message: "查询用户信息出错",
        duration: 1000
      })
    }

    // 如果没有return出去说明查询用户信息成功 那我们就把查询到的结果 保存起供页面来使用
    this.updateForm = res.data

    this.updateDialogVisible = true
  },
 -->

- 逻辑梳理：
- 为了在我们点击编辑按钮之后 在随之打开的对话框中 填入 这个用户的信息
- 我们要在点击编辑按钮的回调里面 根据这个用户的id请求数据， 将请求回来的数据保存到data配置项中 然后做展示


> 编辑按钮 -- 对话框中的表单
- 要点：
- 1. 所有的功能表单 我们都要 创建一个form数据对象 让input里面的v-model都绑定到这个form数据对象中的一个属性中

- 2. 这个数据对象中的属性名都是后台接口要求的字段

- 3. 如果其中的一个input不想被编辑 那么就给它设置为 disabled

- 4. 需要验证规则的input项 就使用prop 如果不需要的话 就不用写
<!-- 
  <el-form 
    :model="updateForm" 
    :rules="updateFormRules" 
    ref="updateFormRef" 
    label-width="70px"
  >
    <el-form-item label="用户名">
      <el-input disabled v-model="updateForm.username"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="updateForm.email"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="updateForm.mobile"></el-input>
    </el-form-item>
  </el-form>


  因为 上面所有的input的值都是v-model绑定了 updateForm 
  而 updateForm 的数据都是 打开对话框时发起了请求 将请求结果放到了 updateForm中

  所以我们打开后input里面就有默认值了
 -->

> 技巧：
- 让input框有默认值，不一定要将请求回来的数据 使用js等方法渲染到input中
- 而是可以利用一个data配置项中的对象 我们把请求数据的结果保存到这个对象中 然后利用v-model 让input和这个数据对象进行绑定 进行关联


> 编辑按钮 -- 对话框中的表单 -- 点击确定时候的预验证
- 当我们点击确定按钮的时候 我们应该先对用户的输入进行预验证
- 只有预验证通过了之后才应该发起网络请求 进行真正的修改

- 表单的预校验
- 我们要先拿到 目标表单的ref对象，通过这个对象调用它的方法
- this.$refs.updateFormRef.validate((valid) => { ... })


> 发起 修改 请求
- 请求路径：users/:id
- 请求方法：put
- 请求参数
  id      不能为空 `参数是url参数:id`
  email   可以为空
  mobile  可以为空
<!-- 
  // 响应数据
  "data": {
    "id": 503,
    "username": "admin3",
    "role_id": 0,
    "mobile": "111",
    "email": "123@123.com"
  },
  "meta": {
    "msg": "更新成功",
    "status": 200
  }
-->


> 思路：
- 1. 我们填写完表单后在发送请求前 要先对表单进行预校验 获取到目标form的ref调用对应的方法

- 2. 发起请求 这里我们发起的是 put请求 参数放在了data中 也就是请求体中

- 3. 发送请求后 要根据返回的状态码做判断

- 4. 修改数据后 要先关闭对话框 然后调用用户数据的请求函数 然后提示修改成功

> 完整代码
<!-- 
  // 编辑按钮 中的对话框的确定按钮事件 
  editUserInfo() {
    // 我们在这里进行修改用户信息 填写的数据的预校验 与 提交
    this.$refs.updateFormRef.validate( async (valid) => {
      if(!valid) {
        this.$message({
          type: "error",
          message: "输入数据格式不正确",
          duration: 1000
        })
        return
      }

      // 发起修改请求
      // updateForm 这个对象是我们打开编辑用户信息的按钮是 请求回来的该行这个人的数据 里面有id
      let {data: res} = await request({
        url: `users/${this.updateForm.id}`,
        method: "put",
        data: {
          email: this.updateForm.email,
          mobile: this.updateForm.mobile
        } 
      })
      if(res.meta.status !== 200) {
        this.$message({
            type: "error",
          message: "用户更新失败",
          duration: 1000
        })
        return
      }

       // 先关闭对话框
      this.updateDialogVisible = false;

      // 刷新数据列表
      this.getUsersList()

      // 提示修改成功
      this.$message({
        type: "success",
        message: "用户数据更新成功",
        duration: 1000
      })
    })
  },
 -->


> 删除用户的逻辑
- 我们点击删除按钮后不能马上的将用户删除 因为他可能是不小心点到了这个按钮 

- 我们应该在用户点击删除按钮后提示用户是否真的进行删除
- 当用户取消删除的时候 我们提示 已取消删除
- 当用户点击确认删除的时候 才会真正的删除数据

- 提示框：
- 我们使用 element ui 中的 Message Box 组件

- 使用方式：
- import {MessageBox} from "element-ui"
- Vue.prototype.$confirm = MessageBox.confirm

<!-- 
  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
  }
-->

> this.$confirm("参数1", "参数2", "参数3")
- 参数1： 提示消息
- 参数2： 标题
- 参数3： 配置对象
  确定按钮的文本
  取消按钮的问题
  前面的小图标

- 它的返回值是一个promise对象
- 当点击确定的时候 返回值为 confirm
- 当点击取消的时候 返回值为 cancel

- 1. 我们给 删除按钮 绑定删除用户事件 然后把用户的id传递过去 通过 scope.row.id
<!-- 
  // 根据id删除对应的用户信息
  async removeUserById(row) {
    // 先弹框进行提示
    let res = await this.$confirm(`此操作将永久删除 ${row.username}, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).catch(err => err)

    if(res !== "confirm") {
      return  this.$message.info("已经取消删除")
    } 
  },
 -->


> 删除 用户 请求
- 请求路径：users/:id
- 请求方法：delete
- 请求参数
    id    不能为空`参数是url参数:id`

<!-- 
  // 响应数据的格式：
  {
    "data": null,
    "meta": {
      "msg": "删除成功",
      "status": 200
    }
  }
 -->


> Git 相关
- 老师已经把一个功能大概的完成了 现在要开始提交仓库进行保存
<!-- 
  // git branch

  我们的项目总共有两个分支
  main
  login
  
  我们把所有的代码都放在main分支上是不合适的 我们要将 main 上完成的逻辑迁移到 新的分支上


  // git checkout -b user
  先创建一个子分支 user 然后使用 checkout 命令切换到这个分支上
  这样所有在main分支上的修改 都被迁移到了 user分支上


  // git push -u origin user
  将本地的分支推送到云端的user分支上 因为是第一次 所以有-u

  如果云端有了的分支 比如 本地是user 云端也有user 因为第一次已经用了 -u了
  所以 我们再接下来使用 命令推送的时候 直接使用 

  git push就可以了
 -->

- 分配权限的功能还没有做

-----------------

### 权限管理
- 每一个新的模块都要创建一个新的分支，现在我们要完成权限管理的模块 所以先创建一个分支 最后再合并到主干
<!-- 
  创建一个新分支
  git checkout -b role  

  将新分支进行推送到云端
  git push -u origin role
 -->


> 权限列表组件
- 大概的结构是
    - 面包屑导航
    - 卡片视图
      - 数据表格


> 请求权限列表数据 在table中做展示
- 请求路径：rights/:type
- 请求方法：get
- 请求参数
    type： `参数是url 参数:type`
    值 list 或 tree , list 列表显示权限, tree 树状显示权限,

- 请求参数的类型可以传递 tree 和 list
- 如果我们传递的是list 那我们获取的数据结构是 列表的结构 每一项之间都是彼此独立的
<!-- 
  [
    {}
    {}
  ]
 -->

- 如果我们传递的是tree 那我们获取的数据结构是 树状的结构 每一级的结构之间是通过 children属性来链接的
<!-- 
  [
    {
      {

      }
    }
  ]
 -->

- 这里我们只需要是用表格展示 所以我们的type用 list 来展示
<!-- 
  响应数据的说明：
    id           权限 ID 
    authName     权限说明
    level        权限层级
    pid          权限父 I
    path         对应访问路径
 -->

- 下面是一个页面 请求数据 的代码部分
<!-- 
  import {request} from "../../network/request"
  export default {
    name: "Rights",

    data() {
      return {
        // 权限列表
        rightsList: []
      }
    },
    created() {
      this.getRightsList()
    },

    methods: {
      async getRightsList() {
      let {data: res} = await request({
        url: "rights/list",
        method: "get"
      })

      if(res.meta.status !== 200) {
        this.$message({
          type: "error",
          message: "查询权限列表失败",
          duration: 1000
        })
        return
      }

      // 将获取的数据放到 data配置项的 rightsList 里面供模板进行使用
      this.rightsList = res.data
    }
  }
 -->


> 将获取到的 权限列表的数据渲染成表格
- 要点：
- 1. 我们使用 el-tag 标签 来修饰 权限等级
- 以前我在项目里都是通过prop来传递tag的颜色 然后根据请求回来的数据使用计算属性 决定显示什么样的数据

- 这里使用了这种方式
- 我们定义了三种显示方式 内容写死 然后根据 请求回来的数据做判断 展示对应的项
<!-- 
  <el-table-column 
    v-for="(item, index) of columnData" 
    :key="item.id" 
    v-bind="item"
  >
    <template v-if="item.type == 'tag'" scope="scope">
      <el-tag v-if="scope.row.level == '0'">一级</el-tag>
      <el-tag v-else-if="scope.row.level == '1'" type="success">二级</el-tag>
      <el-tag v-else="scope.row.level == '2'" type="warning">三级</el-tag>
    </template>
  </el-table-column>
 -->


> 权限管理业务分析
- 通过权限管理模块控制不同的用户可以进行哪些操作
- 具体可以通过角色的方式进行控制 即每个用户分配一个特定的角色 角色包括不同的功能权限

- 用户： 代表这个系统中的每一个账号
- 权限： 代表用户所拥有的能力
<!-- 
  比如对一个列表有增删改查等操作 有的用户只有添加的权限 有的用户只有查询和增加 没有删除的权限 

  我们的这个按钮中 并没有将权限直接绑定到用户身上 和是在 用户 和 权限之间设置了不同的角色

  我们把权限分配给不同的角色 再把角色分配给不同的用户 这样只要用户拥有了角色 这个用户肯定拥有对应的权限
-->


-----------------

### 角色管理
- 获取角色列表的相关数据
- 请求路径：roles
- 请求方法：get

- 响应数据说明
  - 第一层为角色信息
  - 第二层开始为权限说明，权限一共有 3 层权限
  - 最后一层权限，不包含 `children` 属性

- 整个 data 是一个数组 数组里每一个对象都是一个角色
- roleName  角色的名称
- id        角色的id
- children  这里面是当前角色所拥有的所有权限

- 权限分为3级权限 每一级权限都是通过children来进行嵌套的
- 比如 商品管理是 主管 的一级权限  商品列表就是二级权限 添加商品就是三级权限都是用过children来进行嵌套的
<!-- 
  这里就可以通过 它有没有children属性可以判断出它是否是3级权限
 -->

<!-- 
  "data": [
    {
      "id": 30,
      "roleName": "主管",
      "roleDesc": "技术负责人",

      "children": [
        {
          "id": 101,
          "authName": "商品管理",
          "path": null,
          "children": [
            {
              "id": 104,
              "authName": "商品列表",
              "path": null,
              "children": [
                {
                  "id": 105,
                  "authName": "添加商品",
                  "path": null
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "meta": {
      "msg": "获取成功",
      "status": 200
  }
 -->

- 我们拿到的数据层次嵌套的很深啊 怎么用呢？
- 目前为止我们是根据数据 渲染了第一层结构
<!-- 
  {
    id: 30, 
    roleName: '主管', 
    roleDesc: '技术负责人',

    children:  {
      id: 101, 
      authName: '商品管理', 
      path: 'goods', 

      children: 
        authName: "商品列表"
        id: 104
        path: "goods"

          children：
            authName: "商品修改"
            id: 116
            path: "goods"
 -->

- 之前我们在表格中添加索引列使用的是：
<!-- 
  <el-table-column 
    type="index" 
    label="#" 
    align="center"
  >
  </el-table-column>
 -->

- 现在我们要做一个展开列
<!-- 
  <el-table-column 
    type="expand" 
  >
  </el-table-column>
 -->


- 角色列表所具有的功能：
- 1. 点击分配权限按钮 可以弹出一个 树形结构 的复选框 可以修改角色的权限
- 2. 点击展开列可以打开该角色所对应的权限

-----------------

> 角色列表 点击展开列 显示权限数据
- 要点：
- 1. 我们要在展开行中拿到角色对应的所有权限
<!-- 
  我们在请求 角色列表 的时候 在请求回来的数据中已经包含了 权限的数据

  {
    id: 30, 
    roleName: '主管', 
    roleDesc: '技术负责人',

    children:  {
      id: 101, 
      authName: '商品管理', 
      path: 'goods', 

      children: 
        authName: "商品列表"
        id: 104
        path: "goods"

          children：
            authName: "商品修改"
            id: 116
            path: "goods"

  在data中每一个对象都是一个角色 在对象中有一个children属性 这个children就是当前角色拥有的所有权限

  我们只需要拿到表格中一行的角色信息 在拿到它的children属性就可以了

  怎么拿到这行的数据？ 我们通过作用域插槽就非常的方便
 -->

- 2. 通过三层for循环渲染三层权限
- 我们通过作用域插槽拿到 表格中该行的所有数据 其中 children 是一个数组 我们可以遍历进行渲染
- scope.row.children 我们通过遍历可以得到一级权限
- 每一个children中还有children来嵌套了二级权限 里面还有三级权限
- 假如我们想完成这样的一个扩展列表的话 我们需要使用三层for循环来解决
- 最外层的for循环用来渲染一级权限 第二个for循环用来渲染二级权限 第三个for循环用来渲染三级权限
<!-- 
  <el-table-column type="expand">
    <template scope="scope">
      {[scope.row}}     children > children > children
    </template>
  </el-table-column>
 -->


> 渲染一级权限
- 我们在上面的这个作用域插槽中做下 栅格布局
<!-- 
  <el-table-column type="expand">
    <template scope="scope">
      <el-row>

        // 一级权限区域
        <el-col :span="5">
          渲染这里
        </el-col>

        // 二级权限区域
        <el-col :span="19">

        </el-col>
      </el-row>
    </template>
  </el-table-column>
 -->

- 
- 然后我们需要遍历数据渲染每一行的1级权限
- 思考：
- 我们将 展开行 里面做了布局 现在每一行对应一个角色 我们要渲染该角色下的一级权限 v-for 加在哪里？

- 每一行每个角色每个权限类别都会有一个 el-row 是吧 那是不是说我们应该加在v-for el-row里面 这样 我们每循环一次都会往第一列里面放一个el-tag标签


> 技巧
- 背景：
- 我需要给每一个 el-tag 上下添加一条线
- 1. 给 el-row 添加 class 这样添加的线会是一整行
- 2. 我们定义两个类 我们先给所有el-row添加上 下边框 然后给第一个el-row添加上上边框就行了
<!-- 
  .bdtop {
    border-top: 1px solid #eee
  }

  .bdbottom {
    boder-bottom: 1px solid #eee
  }

  <el-row 
    v-for="(item, index1) of scope.row.children" 
    :key="item.id"
    class="tag-wrap"
    :class="['tag-row-bottom', index1 === 0 ? 'tag-row-top' : '']"
  >

  要点：
  动态绑定class 数组的方式 不用在data配置项中定义 直接使用的是style中的类名 同时只有当行为0的时候才添加这个类
 -->


> 渲染二级权限
<!--
  <el-table-column type="expand">
    <template scope="scope">
      <el-row>

        // 一级权限区域
        <el-col :span="5">
          
        </el-col>

        // 二级权限区域
        <el-col :span="19">
          渲染这里
        </el-col>
      </el-row>
    </template>
  </el-table-column>
 -->

- 二级权限的渲染 要点在于 我们在 二级权限的区域 再次使用 row col 进行了布局 并且再次使用了 v-for 注意这里 二级权限v-for也是加在 el-row上的 但是三级直接加在了 el-tag 上
<!-- 
  渲染二 三级权限>
  <el-col :span="19">
    <div>
      通过for循环嵌套渲染二级权限
      <el-row 
        v-for="(i, index2) of item.children" 
        :key="i.id"
        :class="[index2 == 0 ? '' : 'tag-row-top']"
      >

        二级权
        <el-col :span="6">
          <div>
            <el-tag type="success">{{i.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>
          </div>
        </el-col>

        三级权限
        <el-col :span="6">
          <div>
            <el-tag type="warning" v-for="(ii, index3) of i.children" :key="ii.id">{{ii.authName}}</el-tag>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-col>
 -->

> 点击 el-tag 上的删除按钮 删除权限
- 可删除的 tag 标签

> <el-tag closable>
- close事件	关闭 Tag 时触发的事件
- 我们在用户点击 删除 的时候 先提示 然后 发起对应的 删除请求

- 请求路径：roles/:roleId/rights/:rightId
- 请求方法：delete
- 请求参数
  | :roleId  | 角色 ID  | 不能为空`携带在url中` |
  | :rightId | 权限 ID  | 不能为空`携带在url中` |

- 删除哪个角色下的哪个id
- delete请求是一个 url 拼接的格式呢

<!-- 
  返回的data是最新的权限信息
  {
    "data": [
      {
        "id": 101,
        "authName": "商品管理",
        "path": null,
        "children": [
          {
            "id": 104,
            "authName": "商品列表",
            "path": null,
            "children": [
              {
                "id": 105,
                "authName": "添加商品",
                "path": null
              },
              {
                  "id": 116,
                  "authName": "修改",
                  "path": null
              }
            ]
          }
        ]
      }
    ],
  "meta": {
    "msg": "取消权限成功",
    "status": 200
    }
  }
 -->

> 删除权限逻辑的完整代码
- 要点：
- 1. this.$confirm() 方法返回的是一个promise对象 但是它不是axios会返回res.data 我们直接用一个变量接收结果 cancel or confirm

- 2. 当到删除的逻辑的时候我们要发起的是删除请求 delete 请求好像使用了 resful 风格的接口 

- 3. 角色id 和 权限id 是通过 scope.row 和 item.id 的传参方式获取的
- 4. 也是最值得吸收的一点

- 1 this.getRolesList()
- 2 role.children = res.data

- 正常我们删除之后会重新获取用户数据当在删除的逻辑中 并不适合获取整个页面的数据 因为这样会导致这个页面完全的被刷新 这样我们本来展开的行会关闭 体验不好 

- 我们想直接看到被删除的效果 那么 我们可以用上面的2的方式
- 因为删除的响应数据是一个删除操作后该行该角色的完整的最新的权限数据 所以我们直接给 scope.row.children 就可以了 可以做到局部的刷新数据

<!-- 
   async removeItemById(role, rightId) {
    // 弹窗提示用户是否删除
    let deleteInfo = await this.$confirm("此操作将永久删除权限信息", "删除提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).catch(err => err)

    if(deleteInfo !== "confirm") {
      this.$message({
        type: "info",
        message: "取消了删除",
        duration: 1000
      })
      return
    }

    // 发起删除对应权限的请求
    let {data: res} = await request({
      url:`roles/${role.id}/rights/${rightId}`,
      method: "delete"
    })

    if(res.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "删除权限失败",
        duration: 1000
      })
      return
    }

    this.$message({
      type: "success",
      message: "删除数据成功",
      duration: 1000
    })

    // this.getRolesList()
    role.children = res.data
  },
 -->


> 分配权限的功能
- 当我们点击按钮的时候 会弹出 分配权限的对话框 在弹出对话框的同时 我们将该角色对应的权限数据获取回来

- 在弹出对话框的 同时 我们将该角色的权限数据 以树形结构 给它获取回来 保存到data中 供页面进行使用
<!-- 
  // 展示分配权限的对话框
  showSetRightDialog() {

    // 在打开点击 分配权限 按钮的对话框之前 获取 数据
    this.setRightDialogVisible = true
  },
 -->

- 请求路径：rights/:type
- 请求方法：get
- 请求参数
    type： `参数是url 参数:type`
    值 list 或 tree , list 列表显示权限, tree 树状显示权限,

<!-- 
  // 展示分配权限的对话框
  async showSetRightDialog() {
    // 获取所有权限的数据
    let {data: res} = await request({
      url: `rights/tree`,
      method: "get"
    })
    if(res.meta.status !== 200) {
      this.$message({
        type: "info",
        message: "获取权限列表失败",
        duration: 1000
      })
      return
    }

    // 将请求回来的数据保存到data中
    this.rightsList = res.data
    this.setRightDialogVisible = true
  },
 -->


> Tree 组件
- 为了将请求回来的数据加载到 对话框 中 我们选择了 tree 组件
- <el-tree :data="rightsList" :props="defaultProps" show-checkbox></el-tree>
- :data:　数据源
- :prop:　数据绑定的字段
- show-checkbox: 展示复选框
<!-- 
  prop的值是一个对象 
  defaultProps: {
    children: "children"      实现嵌套关系的属性是哪个
    label:"label"             展示的文本信息又是哪个属性
  }
 -->


- 我们可以 tree 组件使用了 show-checkbox 属性 这样所有的文本前就会多了一个复选框
- 但是当我们点击复选框的时候 我们要拿到一个值 总不能拿到的是 文本信息吧 我们应该拿到的是 对应的 id值
- 那怎么指定当我们选择了项的时候 取到的是id值呢？

> <el-tree node-key="id">
- 我们通过这个 node-key 绑定一个 value值
- 也就是当我们点击该项的时候 它会获取到 数据中的哪个字段的值


> <el-tree default-expand-all>
- boolean
- 是否上来默认展开所有的内容


> <el-tree default-checked-keys>
- array
- 默认勾选的节点的 key 的数组
- 现在我们只是将所有权限列表请求回来并做了展示，但是角色身上对应的权限并没有在这个tree中体现出来
- 我们想要的效果是 a角色现在身上现有的权限 在tree中做出体现 已有的权限是被选中的状态

<!-- 
  1. data配置项中定义 一个数组
  // tree组件 用户权限对应体现 默认选中的节点id值数组 因为id绑定了取值
  这个id值跟node-key="id"是有关系的

  defKeys: [],


  2. 把角色已有的权限 加载到tree组件上 点击 分配角色的按钮的同时 立即把当前角色的已有的三级权限id 我们只获取三级权限id 把所有的id都添加到 defKeys 数组中就可以
 -->

> 使用递归函数获取三级权限id
- 使用递归的思路
- 1. 我们要先考虑最终结果，本例中我们要找三级节点 它的条件就是 !node.child 节点中没有该属性了 

- 2. else 里继续调用自己

- 3. 这里面的node我们传递的是一个对象
<!-- 
  // 通过递归的形式 获取角色下所有三级权限的id 并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
    // node用来判断是否是3级权限节点 是否为3级节点我们可以判断它是否包含children属性

    // 如果该节点包含了children属性 证明它不是三级节点 如果没有children属性则证明它是三级节点
    if(!node.children) {
      return arr.push(node.id)
    } else {
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    }
  }
 -->

- 整体逻辑进行梳理
- 1. 我们要过滤 点击按钮这行 的 这个角色的数据 将这个角色的三级权限项 所对应的id找出来 push 到一个新的数组中 用于 tree组件的 default-checked-keys 属性来使用 用户默认展示该角色所对应的权限勾选情况

- 2. 我们先定义了一个 defKeys 数组 用户接收 三级权限的id
- 3. 在我们点击 分配权限按钮的时候 我们要将该行该角色的数据传递过去 scope.row 是一个对象，用于筛选
<!-- 
  // tree组件 用户权限对应体现 默认选中的节点id值数组
  defKeys: [],


  // 通过递归的形式 获取角色下所有三级权限的id 并保存到 defKeys 数组中
  getLeafKeys(node, arr) {
    if(!node.children) {
      return arr.push(node.id)
    } else {
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    }
  }


  <el-button 
    @click="showSetRightDialog(scope.row)"
  >
    分配权限
  </el-button>

  <el-tree 
    :data="rightsList" 
    :props="treeProps" 
    show-checkbox
    node-key="id"
    default-expand-all


    :default-checked-keys="defKeys"


  ></el-tree>
 -->


> 每次关闭对话框的时候要清空 defKeys 的
- 也可以在弹窗前处理这个逻辑
<!-- 
  <el-dialog
    title="分配权限"
    :visible.sync="setRightDialogVisible"
    width="50%"
    @close="setRightDialogClosed"
  >

  setRightDialogClosed() {
    this.defKeys = []
  },
 -->


> 分配权限
- 比如我们现在已经在tree组件中为角色勾选了几个状态， 当我点击确定的时候 应该向服务器发起请求 把勾选的状态都保存到服务器中 进行数据的持久化

- 请求路径：roles/:roleId/rights
- 请求方法：post
- 请求参数：通过 `请求体` 发送给后端
    :roleId   |  角色 ID  | 不能为空`携带在url中
    rids      | 权限 ID 列表（字符串） |
    
    以 `,` 分割的权限 ID 列表（获取所有被选中、叶子节点的key和半选中节点的key, 包括 1，2，3级节点） |

- roleId：
- 为哪个角色分配权限 就需要把哪个id传递到url地址中

- 同时我们还要在请求体中发送一个 rids 的字符串 这个字符串是以英文, 分割的权限id列表 我们要把已选中节点的id 和 半选中节点的id 整理成1,2,3 

<!-- 
  {
    "data": null,
    "meta": {
        "msg": "更新成功",
        "status": 200
    }
  }
 -->

- 怎么得到全选中和半选中的id呢？tree组件中给我们提供了两个方法

- 我们需要给组件绑定ref 拿到该组件对象 然后调用组件对象的方法

> getCheckedKeys
- 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组 也就是node-key的值

> getHalfCheckedKeys
- 若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点所组成的数组 也就是node-key的值

<!-- 
  // 点击确认按钮 为角色分配权限
  async allotRights() {
    const keys = [
      ...this.$refs.treeRef.getCheckedKeys(),
      ...this.$refs.treeRef.getHalfCheckedKeys()
    ]

    // 将获取到的数组拼接成一个以逗号分隔的字符串
    let idStr = keys.join(",")
    
    let {data: res} = await request({
      url: `roles/${this.roleId}/rights`,
      method: "post",
      data: {
        rids: idStr
      }
    })

    if(res.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "用户更新权限失败",
        duration: 1000
      })
      return
    }
    
    this.getRolesList()
    this.$message({
      type: "success",
      message: "用户更新权限成功",
      duration: 1000
    })
    this.setRightDialogVisible = false
  },
 -->

- 思路整理
- 当点击分配权限的按钮的时候 我们将该角色的id保存到了data中
- 在点击确定按钮的时候我们获取了 tree 组件中半选和全选的id值 然后把他们合并成了一个完整的数组 我们将这个数组整理成后台接口所需要的格式


> 用户管理 -- 用户列表 -- 分配角色功能
- 我们要完成的效果是 点击表格中的一行中的 分配按钮后 
- 在弹出的对话框中显示该条用户的基本信息，和提供一个下拉菜单 供选择待分配角色
<!-- 
  当前的用户：
  当前的角色：
  分配新角色：  下拉框
 -->

- 思路：
- 1. 我们做的第一步就是点击分配按钮后 弹出一个对话框，同时在点击分配按钮后 将该行用户的数据 保存到data配置项中 用html模板使用

- 2. 点击这个 分配角色 的按钮的同时 直接获取所有角色的数据列表 并保存在data配置项中
<!-- 
  // 展示分配角色的对话框
  async setRole(userInfo) {
    this.userInfo = userInfo
    // 在展示对话框前，获取所有角色的列表
    let {data: res} = await request({
      url: "roles",
      method: "get"
    })

    if(res.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "权限列表刷新失败",
        duration: 1000
      })
    }

    this.rolesList = res.data
    this.setRoleDialogVisible = true
  },
 -->

- 3. 根据我们请求回来的角色数据列表 在html模板中进行渲染数据
<!-- 
  <el-select v-model="selectedRoleId" placeholder="请选择">
    <el-option
      v-for="item in rolesList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
 -->

- 4. 剩下的就是 点击 确定按钮 将选中的角色 保存到用户的信息中
<!--  
  // 监听分配角色对话框 关闭事件 不然再次点开对话框后会有信息的残留
  setRoleDialogClosed() {
    this.selectedRoleId = ""
    this.userInfo = {}
  },

  // 点击 分配角色 按钮里面的 确定按钮 分配角色
  async saveRoleInfo() {
    // 证明用户没有选择新的角色
    if(!this.selectedRoleId) {
      this.$message({
        type: "error",
        message: "请选择要分配的角色",
        duration: 1000
      })
    }


    // 如果没有return出去代表用户选择了一个角色 那我们就要发起请求
    let {data: res} = await request({
      url: `users/${this.userInfo.id}/role`,
      method: "put",
      data: {rid: this.selectedRoleId}
    })
    
    if(res.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "更新用户角色失败",
        duration: 1000
      })
    }

    this.$message({
      type: "success",
      message: "更新用户角色成功",
      duration: 1000
    })

    this.getUsersList()
    this.setRoleDialogVisible = false
  },


  // 展示分配角色的对话框
  async setRole(userInfo) {
    this.userInfo = userInfo
    // 在展示对话框前，获取所有角色的列表
    let {data: res} = await request({
      url: "roles",
      method: "get"
    })

    if(res.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "权限列表刷新失败",
        duration: 1000
      })
    }

    this.rolesList = res.data
    this.setRoleDialogVisible = true
  },
 -->


> Git相关
- 我们已经把权限相关的功能开发完了 接下来我们要将代码保存到git上
- git branch
<!-- 
  我们所处在 role 分支上 我们先将本地的修改 提交到 云端的role分支上
 -->

- 我们需要将role分支的代码合并到主分支
<!-- 
  git checkout main
  git merge role
 -->

-----------------

### 分类管理
- 商品分类主要在购物的时候 快速的找到要购买的商品 可以通过电商平台主页直观的看到
- 当开发一个新功能的时候 我们需要创建一个新的分支
- git checkout -b category
- git push -u origin category

- 获取商品分类数据列表 渲染出表格

- 请求路径：categories
- 请求方法：get
- 请求参数
    type: 1, 2, 3  分别表示显示一层二层三层分类列表
  【可选参数】如果不传递，则默认获取所有级别的分类

    pagenum:  当前页码值 【可选参数】如果不传递，则默认获取所有分类数据
    pagesize: 每页显示多少条数据


- 我们的页面里面是需要获取所有的分类 所以我们的type值可以指定3 或者 不传递
- 我们的表格具有分页的效果 所以一定要指定 pagenum 和 pagesize
- 我们每页只有5条数据 所以 pagesize 是 5
- 默认应该选择第一页 所以 pagenum 是 1

<!-- 
  响应数据
  "data": [
    {
      "cat_id": 1,
      "cat_name": "大家电",
      "cat_pid": 0,
      "cat_level": 0,
      "cat_deleted": false,
      "children": [
        {
          "cat_id": 3,
          "cat_name": "电视",
          "cat_pid": 1,
          "cat_level": 1,
          "cat_deleted": false,
          "children": [
            {
              "cat_id": 6,
              "cat_name": "曲面电视",
              "cat_pid": 3,
              "cat_level": 2,
              "cat_deleted": false
            },
            {
              "cat_id": 7,
              "cat_name": "海信",
              "cat_pid": 3,
              "cat_level": 2,
              "cat_deleted": false
            }
          ]
        }
      ] 
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
 -->  


> 设置 分页 的逻辑
- 1. 将发请求时传递的参数都设置成对象 保存在data配置项里
- 2. 同时也将服务器返回的结果中的total也保存在data配置项中 total的默认值为0
<!-- 
  queryInfo: {
    type: 3,
    pagenum: 1,     默认为第一页
    pagesize: 5     我们每页显示5条记录
  },
  total: 0

   发送请求返回的响应结果：
   {total: 30, pagenum: 0, pagesize: 5, result: Array(5)}
   {msg: '获取成功', status: 200}

   返回的数据有 
    total 一共多少条记录
    pagenum： 0
    pagesize: 5
    result: 数据
 -->

<!-- 
  async getCategoryList() {
    let {data: res} = await request({
      url: "/categories",
      method: "get",
      params: this.queryInfo
    })

    if(res.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "获取商品分类失败",
        duration: 1000
      })
    }
    this.total = res.data.total
    this.catagoryList = res.data.result
    }
  },
  created() {
    this.getCategoryList()
  }
 -->


> 将请求回来的数据 渲染成 树形表格
- element中并没有树形结构的表格 这里我们用插件来完成效果
- npm i vue-table-with-tree-grid --save
- https://github.com/MisterTaki/vue-table-with-tree-grid
<!-- 
  import Vue from 'vue'
  import ZkTable from 'vue-table-with-tree-grid'

  Vue.use(ZkTable)


  // 手动注册
  import Vue from 'vue'
  import ZkTable from 'vue-table-with-tree-grid'

  Vue.component(ZkTable.name, ZkTable)


  我们选择的方式是：
  在main.js文件中：

  import TreeTable from "vue-table-with-tree-grid"
  Vue.component("tree-table", TreeTable)
 -->


> 插件的使用：
- data: 用于匹配数据源
- columns: 用于匹配列的配置项
- selection-type: 
      用于设置表格每行是否有多选框

- expand-type：
      用于设置每行是否可以被展开

- show-index
      是否显示索引行

- index-text
      索引行的表头

- show-row-hover
      移入是否高亮
<!-- 
  <tree-table
    :data="catagoryList"
    :columns="columnData"
    :selection-type="false"
    :expand-type="false"
    :show-index="true"
    index-text="#"
    border
    :show-row-hover="false"
  >
    <template slot="isOk" scope="scope">
      <i v-if="!scope.row.cat_delated" class="el-icon-success" style="color: lightgreen"></i>
      <i v-else class="el-icon-error" style="color:red"></i>
    </template>
  </tree-table>

  columnData:[
    {
      prop: "cat_name",
      label: "分类名称",
      minWidth: 100,
    },
    {
      prop: "cat_delated",      它是一个boolean值 false 是对号
      label: "是否有效",
      minWidth: 100,

      // 如果它的值为type 代表我想将这列渲染成自定义的模板列
      type:"template",
      // 自定义模板列需要使用哪个作用域插槽呢？ 也就是插槽的名字
      template: "isOk"
    },
    {
      prop: "roleDesc",
      label: "排序",
      minWidth: 100,
    }
  ],
 -->


> 商品分类数据的分页功能
- 首先我们要引入分页器 我们找到完整功能的代码部分
<!-- 
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="queryInfo.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>


  @size-change 用户选择一页显示多少条数据的回调 先给它绑定事件处理函数
    我们能在这个事件处理函数身上拿到最新的 pagesize 我们需要将这个值交给data中的分页信息对象

  @current-change 用户选择第几页的回调
    我们能在这个事件处理函数身上拿到最新的 pagenum 我们要将这个值教给data中的分页信息对象

  queryInfo: {
    type: 3,
    pagenum: 1,
    pagesize: 5
  },
  total: 0,


  // 监听pagesize改变的事件
  handleSizeChange(newSize) {
    this.queryInfo.pagesize = newSize
    // pagesize改变了就要重新请求数据
    this.getCategoryList()
  },

  // 监听pagenum改变的事件
  handleCurrentChange(newPage) {
    this.queryInfo.pagenum = newPage
    this.getCategoryList()
  },
 -->


> 添加分类的操作
- 点击 添加分类 按钮 会弹出 对话框 分类名称 和 父级分类
- 我们需要在 这个对话框中 使用表单
<!-- 
  分类名称： 
  父级分类：    这个可以不填 不填的话 默认将输入的分类名称添加为1级分类

  比如我们输入了 aaa 又在下面选中了大家电 说明我们想将aaa添加到大家电的子分类
 -->

- 请求路径：categories
- 请求方法：post
- 请求参数
    cat_pid   分类父 ID   
        不能为空，如果要添加1级分类，则父分类Id应该设置为  `0`
        如果是父级那id就是0
        如果不是那就是选中谁 就以选中的id当做父级id

    cat_name   分类名称
        不能为空

    cat_level   分类层级
        不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类

<!-- 
  {
    "data": {
      "cat_id": 62,
      "cat_name": "相框",
      "cat_pid": "1",
      "cat_level": "1"
    },
    "meta": {
      "msg": "创建成功",
      "status": 201
    }
  }
 -->

- 关于用户输入的信息 我们还是选择使用form表单组件
- 组件我们将form绑定data配置项中的一个收集对象，将里面每一个form-item对应的input等表单项 绑定到收集对象中的一个属性身上
- 注意 这里的属性名最好设置为请求参数需要的字段名
<!-- 
  // data配置项
  // 添加分类表单的数据对象

  这里因为我们一会发起请求的时候 里面需要3个参数，注意参数的类型 都是number
  addCateForm: {
    cat_name: "",
    // 父级分类的id
    cat_pid: 0,

    // 分类的等级 默认要添加的是1级分类
    cat_level: 0
  },

  // 添加分类表单的验证规则对象
  addCateFormRules: {
    cat_name: [
      {required: true, message: "请输入分类名", trigger: "blur"},
    ]
  },



  <el-form 
    :model="addCateForm"          绑定一个收集对象
    :rules="addCateFormRules"     验证规则对象
    ref="addCateFormRef"          一会要通过它验证我们的输入结果
    class="demo-ruleForm"
    label-width="100px"
  >
    // prop 是指向的验证规则对象中的哪个
    <el-form-item label="分类名称: " prop="cat_name">

      // v-model 绑定我们收集对象中的一个属性 该属性最好是请求参数字段名
      <el-input v-model="addCateForm.cat_name"></el-input>
    </el-form-item>

    <el-form-item label="父级分类: ">
      
    </el-form-item>
  </el-form>
 -->


> 加载父级分类
- 当我们点击 添加分类 按钮之后 在弹出的对话框中 我们要请求数据 渲染父级分类 用于展示
- 我们的项目中只有3级，所以只显示前2级就可以 

- 请求路径：categories
- 请求方法：get
- 请求参数
    type: 我们指定为2
    值：1，2，3 分别表示显示一层二层三层分类列表

    pagenum   我们可以不传递 我们要获取所有的分类数据
    pagesize  我们可以不传递 我们要获取所有的分类数据

<!-- 
  // 点击 添加分类按钮后 请求数据 展示所有父级分类
  async getParentCateList() {
    let {data: res} = await request({
      url: "/categories",
      params: {type: 2}
    })

    if(res.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "获取父级分类数据失败",
        duration: 1000
      })
    }

    // 我们将获取的数据保存在data身上
    this.parentCateList = res.data
  },
 -->


> 将请求回来的数据 渲染成 级联选择器
- 这里我们会使用 element 中的 Cascader 组件
- 当一个数据集合有清晰的层级结构时，可以通过级联选择器逐级查看并选择
- 它提供了两种方式 触发菜单 一种是click 一种是hover
<!-- 
  <el-cascader
    必须绑定一个数组 一个id值的数组
    v-model="value" 

    用来指定级联选择器的数据源
    :options="parentCateList"    

    级联选择器的配置选项
    它可以配置展示不同的item项 当我们选中一个的时候会有选中的值 选中的是谁 展示的是谁 通过哪个属性展示父子之间的嵌套 都要通过props 预先进行配置
    :props="{ expandTrigger: 'hover' }"   
    @change="handleChange"

    clearable             清空选项
    change-on-select      选择父分类
  >
  </el-cascader>


  :props="{
    vaule:  指定 我们选择的项 指定 哪个属性值
    label:  指定 我们看的是哪个属性值
    children  指定 父子之间通过哪个属性来嵌套父子关系
  }"



  // 选中的父级分类的数组
      selectedKeys: [],

  // 指定级联选择器的配置对象
  cascaderProps: {
    expandTrigger: 'hover',
    value: "cat_id",
    label: "cat_name",
    children: "children"
  },

  // 添加分类按钮后 为了展示下拉菜单里面是所有的父级分类情况 {   }
  parentCateList: [],


  <el-cascader
    v-model="selectedKeys"
    :options="parentCateList"
    :props="cascaderProps"        配置项
    @change="parentCateChanged"
  >
  </el-cascader>
 -->

- 级联选择器太高了 有些文本选不中
<!-- 
  去掉scoped
  .el-cascader-menu {
    height: 300px;
  }

  .el-cascader__dropdown {
    top: 200px;
  }
 -->

- 级联选择器中默认只允许选择最后的分类前面的是选不中的 那怎么才能选择父级分类呢？
<!-- 
  clearable
  change-on-select
 -->


- 我们上面完成了级联选择器的功能部分 当我们添加完 分类名称后 如果不选择 父级分类
- 那么我们添加的数据就是一级分类 数据类型应该是这样
<!-- 
  addCateForm: {
      cat_name: "",
      cat_pid: 0,   // 父级分类的id
      cat_level: 0  // 分类的等级 默认要添加的是1级分类
    },

  比如我们分类名称输入的是 aaa
  cat_name:   就是aaa
  cat_pid:    因为我们没有选择父级分类它的对应id应该是0
  cat_level:  它的默认值也是0


  如果我们给aaa指定了父级分类【大家电】 那么aaa的pid就应该是【大家电】的id
  而我们的aaa也应该是2级分类归属于大家电
 -->

- 也就是说只要级联选择器发生了变化 我们就应该监听它的变化 只要它发生变化 那么我们马上就将 下面的表单对象的值做更新
<!-- 
  addCateForm: {
    cat_name: "",
    cat_pid: 0,
    cat_level: 0
  },

  <el-cascader
    v-model="selectedKeys"
    :options="parentCateList"
    :props="cascaderProps"
    @change="parentCateChanged"     我们要在这个处理函数中写逻辑
    clearable
    change-on-select
  >
 -->

- 我change事件对应的处理函数中 我们要做如下的判断
- selectedKeys 是一个数组 用来保存 我们选择父级分类的id
- 只要级联选择器发生了变化 那么 selectedKeys 数组也必然会发生变化
<!-- 
  // 级联选择器 选项发生变化触发这个函数
    parentCateChanged() {

    // 如果 selectedKeys.length > 0 证明选中了父级分类 反之 则代表它是1级分类 那我们添加的这个分类的父分类的id就应该是最后一项吧
    if(this.selectedKeys.length > 0)

    比如
    一级分类 --- 大家电 --- id --- 1
                      --- 冰箱 --- id --- 3
    
        假如我们选择了父级分类 大家电 [1] 那么aaa的父级分类就是数组的最后一项 1

        假如我们选择了父级分类 冰箱 [1, 3] 那么aaa的父级分类就是数组的最后一项 3 而1是冰箱的父级分类id
  },
 -->

- 根据级联选择器的选择内容 更新对应的表单数据
<!-- 
  // 级联选择器 选项发生变化触发这个函数
    parentCateChanged() {

      // selectedKeys是父级分类id的数据 也就是说当我们选择了父级分类 这个数组里面就会有id数据
      
      如果 selectedKeys.length > 0 证明选中了父级分类 反之 则代表它是1级分类
      // 那我们添加的这个分类的父分类的id就应该是最后一项吧

      if(this.selectedKeys.length > 0) {

        // 最会这个数组的最后一项怎么选中呢？ 父级分类的id
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]

        // 如果1级分类level就是0 如果是二级分类level就是1 如果是三级分类level就是2 level的值就是length
        this.addCateForm.cat_level = this.selectedKeys.length

        这里的return有什么作用么
        return

      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
 -->


> 关闭对话框后清空数据
- 我们要监听对话框的close事件
<!-- 
  // 监听对话框的关闭事件 重置表单数据
  addCateDialogClosed() {
    // 清空表单中的数据
    this.$refs.addCateFormRef.resetFields()
    // 清空级联选择器 绑定的数组重置为空数组
    this.selectedKeys = []

    // 把它俩也重置为0
    this.addCateForm.cat_pid = 0
    this.addCateForm.cat_level = 0
  },
 -->


> 完成具体的添加分类的操作
- 1. 在点击 确定安妮 的时候 我们要对表单进行预验证
- 2. 当预验证通过之后 我们就要调用接口发起请求 从而添加新的分类

- 请求路径：categories
- 请求方法：post
- 请求参数

    cat_pid： 分类父 ID
        不能为空，如果要添加1级分类，则父分类Id应该设置为  `0`

    cat_name： 分类名称
        不能为空

    cat_level： 分类层级
        不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类

<!-- 
  "data": {
    "cat_id": 62,
    "cat_name": "相框",
    "cat_pid": "1",
    "cat_level": "1"
  },
    "meta": {
    "msg": "创建成功",
    "status": 201
  }
 -->

<!-- 
  addCate() {
    this.$refs.addCateFormRef.validate( async valid => {
      if(!valid) return
      let {data: res} = await request({
        url: "/categories",
        method: "post",
        data: this.addCateForm
      })
    })

    if(res.meta.status !== 201) {
      this.$message({
        type: "error",
        message: "添加分类失败",
        duration: 1000
      })
      return
    }

    this.$message({
      type: "success",
      message: "添加分类成功",
      duration: 1000
    })
    this.getParentCateList()
    this.addCateDialogVisible = false
  },
 -->

-----------------

### 参数管理
- 参数管理概述：
- 商品参数用于显示商品的固定的特征信息 可以通过电商平台商品详情页直观的看到
- 我们的项目中分为 动态参数 和 静态属性 
- 动态参数：
- 用户在浏览商品的时候 可以给商品添加不同的属性 比如商品的颜色 商品的版本 这些可以供用户动态来选择的参数 叫做动态参数
- 就是我们在淘宝买东西 选规格的功能 

- 静态属性：
- 商品固定的参数 比如 商品信息 机身宽度等等

- 也就是说 我们在参数管理中应该维护动态的参数 和 静态的属性

- 在我们的系统中 
<!-- 
  选择商品分类 -- 下拉框 --     只允许给3级分类添加动态参数 和 静态属性

  动态参数tab     静态属性tab

  ---- 表格 ------

  呈现上面选择的内容  同时我们可以在后台修改 删除 动态参数 和 静态属性  
 -->

- 级联选择器的知识点更新
- 1. 如果选择任意项
- 2. 怎么让它选中3级分类
<!-- 
  <el-cascader
    size="small"
    v-model="selectedKeys"      这里是问题2的关键点
    :options="cateList"
    :props="cateProps"          这里解决1的问题
    @change="handleChange"      这里解决2的问题
    clearable
  >
  </el-cascader>

  cateProps: {
    expandTrigger: 'hover',
    checkStrictly: false,       这个属性能解决1的问题
    value: "cat_id",
    label: "cat_name",
    children: "children"
  }


  handleChange() {
    级联选择框的值双向绑定了 selectedKeys 这个数组
    也就是说 我们内部可以做判断 如果用户选择了3级分类 数组的长度应该等于3
    如果不等于3就清空数组就可以了 因为是双向绑定的
  }
 -->

> 请求数据 展示 选择商品分类 列表
- 首先 分了展示 选择商品分类 的下拉列表 我们要将所有分类的情况全部的获取回来 用做展示

- 请求路径：categories
- 请求方法：get
- 请求参数
    type: 我们指定为2
    值：1，2，3 分别表示显示一层二层三层分类列表

    pagenum   我们可以不传递 我们要获取所有的分类数据
    pagesize  我们可以不传递 我们要获取所有的分类数据
<!-- 
  async getCateList() {
    let {data: res} = await request({
      url: "/categories",
      method: "get"
    })

    if(res.meta.status !== 200) {
        this.$message({
        type: "error",
        message: "添加分类失败",
        duration: 1000
      })
      return
    }

    this.cateList = res.data
  }
 -->


> 渲染 动态参数 和 静态属性 的tab页签
- 类似 tab选项卡 的效果 我们会使用到 Tabs 标签页组件
- 用来实现不同页签之间的切换
<!-- 
  基本结构：

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      用户管理
    </el-tab-pane>
  </el-tabs>

  el-tabs 身上的 v-model 会将 el-tab-pane 的 name 属性的值 绑定到 activeName身上

  @tab-click 无论我们点击了哪个 tab 都会触发这个函数
 -->


- 然后我们在动态参数 和 静态属性的内容区里 添加 添加参数 和 添加属性的按钮
- 并控制它们的禁用
- 当我们没有选择商品分类的时候 这两个按钮都会处于禁用的状态
- 当我们选择了商品分类的时候 这两个按钮就会处于启用的状态

- 其实我们可以通过级联选择器 绑定的id数组 做关联 如果这个数组的length等于3 证明我们选中了三级分类 应该将这两个按钮分别的启用 否则就禁用

- 我们可以定义一个计算属性 根据数组的长度返回一个布尔值 控制禁用和启用

<!-- 
  <el-tabs class="tab-area" v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="动态参数" name="one">
      <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
    </el-tab-pane>

    <el-tab-pane label="静态属性" name="two">
      <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
    </el-tab-pane> 
  </el-tabs>

  computed: {
    // 如果按钮需要被禁用就返回true
    isBtnDisabled() {
      return this.selectedKeys.length !== 3 ? true : false
    }
  },
 -->


> 渲染 tab内容区的数据
- 我们要根据 商品分类 在 tabs 的内容区 渲染 动态参数 或者 静态属性的数据 

- 请求路径：categories/:id/attributes
- 请求方法：get
- 请求参数
    :id  不能为空`携带在url中
    sel  [only,many] 字符串类型
         不能为空,通过 only 或 many 来获取分类静态参数还是动态参数
         如果我们要获取 动态参数 的数据 就要将 sel 指定为 many

<!-- 
  响应数据：

  "data": [
    {
      "attr_id": 1,             分类参数 ID
      "attr_name": "cpu",       分类参数名称
      "cat_id": 22,             分类参数所属分类
      "attr_sel": "only",       only:输入框(唯一) 
                                many:后台下拉列表/前台单选框 

      "attr_write": "manual",   manual:手工录入 list:从列表选择
      "attr_vals": "ffff"
                                如果 attr_write:list,那么有值，该值以逗号分隔
    }
  ],
  "meta": {
    "msg": "获取成功",
    "status": 200
  }
 -->

- 由于我们需要在url中拼接 三级分类的id 老师这里使用了计算属性 它的值需要从数组中取最后一项
<!-- 
  cateId() {
    if(this.selectedKeys.length == 3) {
      return this.selectedKeys[2]
    }
    return null
  },
 -->

- 由于我们还需要指定sel参数 它的值为字符串类型 [only,many] 
- 如果我们要获取 动态参数 的数据 就要将 sel 指定为 many
- 如果我们要获取 静态属性 的数据 就要将 sel 指定为 only

- 当我们点击 动态参数按钮的时候 它的值是one 我们可以把 one 改成 many
- 当我们点击 静态属性按钮的时候 它的值是two 我们可以把 two 改成 only
- 如果我们激活的是 动态参数 面板 那么我们直接可以从 el-tabs v-model 的activeName 身上取出对应的值
<!-- 
  <el-tab-pane label="动态参数" name="many">
  <el-tab-pane label="静态属性" name="only">
 -->


- 那我们在哪发起请求呢？
- 1. 我们要在级联选择器 发生变化的时候 请求回来数据
  - 根据我们选择的分类id 和 所处的面板 请求对应的数据
- 因为我们已经将所处的面板信息双向绑定在 activeName 身上了

- 2. 我们还要在 tab 来回切换的时候 请求对应的数据
- 所以我们要将请求数据的逻辑封装成一个函数 方便我们在多种情况下调用
<!-- 
  // 级联选择框 选中后的处理函数
    async handleChange() {

    // 证明选择的不是3级分类 我们要return出去 和 清空数组 效果就是点击了也没反应
    if(this.selectedKeys.length !== 3) {
      this.selectedKeys = []
      return
    }

    // 如果没有return出去 那么代表我们选择了三级分类 那么我们就应该将它下面所有的参数项获取下来
    let {data: res} = await request({
      url: `categories/${this.cateId}/attributes`,
      method: "get",
      params: {sel: this.activeName}
    })

    if(res.meta.status !== 200) {
        this.$message({
        type: "error",
        message: "获取分类信息失败",
        duration: 1000
      })
      return
    }

    console.log(res)

    // 我们获取到的数据都是这个res.data 但是我们 动态参数要渲染一个表，静态属性也要渲染一个表 我们请求回来的数据应该保存到哪里呢？ 所以我们要进行判断
    
    if(this.activeName === "many") {
      this.manyTableData = res.data
    } else {
      this.onlyTableData = res.data
    }





    请求数据的格式：
    attr_id: 3077
    attr_name: "版式"
    attr_sel: "many"
    attr_vals: "49吋4K超薄曲面 人工智能,55吋4K观影曲面 30核HDR,55吋4K超薄曲面 人工智能,65吋4K超薄曲面 人工智能"
    attr_write: "list"
    cat_id: 6
    delete_time: null
  },
 -->


> 添加动态参数 和 静态属性的对话框
- 因为 点击 添加动态参数 弹出的对话框 和 添加静态属性的对话框 是一个样 且都在一个页面中 我们尽可能的不要用两个对话框组件做

- 所以 我们这里共用一个 对话框
<!-- 
  <el-dialog
      :title="titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDiglogClosed"
    >

      <el-form 
        :model="addForm" 
        :rules="addFormRules" 
        ref="addFormRef" 
        label-width="100px" 
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>


  要点：
  - 1. 标题部分使用了 计算属性 根据当前页tab-content的处于哪项 我们的标题就是哪项

  titleText() {
    return this.activeName == "many" ? "动态参数" : "静态属性"
  },


  - 2. 当关闭对话框 重置表单里面的信息 包括验证信息效果
  监听对话框的关闭事件，然后在回调中 通过表单的ref调用方法

  addDiglogClosed() {
    // 当关闭对话框后应该清除 验证的效果 
    this.$refs.addFormRef.resetFields()
  }, 


  - 3. 输入框前面的文本也可以动态绑定 且 prop和input的v-model都要绑定发请求的api文档中的字段
 -->


> 点击确认按钮 发起添加动态参数 或 静态属性的请求
- 请求路径：categories/:id/attributes
- 请求方法：post
- 请求参数

  - :id：
  - 不能为空`携带在url中`   当前我们选择的是哪个3级的分类

  - attr_name：
  - 不能为空

  - attr_sel：[only,many]
  - 不能为空

  - attr_vals： 可选参数
  - 如果是 many 就需要填写值的选项，以逗号分隔

<!-- 
  "data": {
    "attr_id": 44,
    "attr_name": "测试参数",
    "cat_id": "1",
    "attr_sel": "many",
    "attr_write": "list",
    "attr_vals": "a,b,c"
  },
  "meta": {
    "msg": "创建成功",
    "status": 201
  }
 -->

- 这里我才发现个问题 添加动态参数 和 静态属性 我们使用了同一个对话框来处理逻辑
- 那就有一个问题，我们添加的数据 都保存在了form表单中的一个属性里(attr_name) 那我们在发起请求的时候到底是添加属性的逻辑 还是 添加参数的逻辑呢？
<!-- 
  开始的时候我会想 要不要 再进行判断 如果是xxx将数据存在a里 如果是yyy就将数据存在b里 那可以我们还需要一个type的自定义属性之类的
 -->

- 但是这节中就给了我很好的回答：
- 1. 添加动态参数 和 静态属性 都使用了 attr_name 这个字段 不同的是 当发起请求时，多了一个提交参数 用于后台辨识 我们发起的是什么请求

- 2. 而我们表单所需要的参数 attr_sel 就是标识我们在添加什么 这个值绑定的是当前页面所展开的tab项
<!-- 
  addParams() {
    this.$refs.addFormRef.validate(async valid => {

      // !valid 是验证失败
      if(!valid) return

      let {data: res} = await request({
        url: `categories/${this.cateId}/attributes`,
        method: "post",
        data: {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        }
      })

      if(res.meta.status !== 201) {
        this.$message({
          type: "error",
          message: "获取参数失败",
          duration: 1000
        })
        return
      }

      this.$message({
        type: "success",
        message: "获取参数成功",
        duration: 1000
      })
      this.addDialogVisible = false
      this.getTabData()
    })
  },
 -->


> 点击 表格中的 修改按钮
- 供用户修改当前行的参数 或者 属性
- 当我们点击修改按钮后 应该传入该行的id 根据id展示数据的原有信息 绑定到对话框的表单中

- 请求路径：categories/:id/attributes/:attrId
- 请求方法：get
- 请求参数

  - :id
  - 不能为空`携带在url中`  分类的id

  - :attrId
  - 不能为空`携带在url中`  参数的id

  - attr_sel:
  - [only,many] 

  - attr_vals
  - 如果是 many 就需要填写值的选项，以逗号分隔 

<!-- 
  "data": {
      "attr_id": 1,
      "attr_name": "cpu",
      "cat_id": 22,
      "attr_sel": "only",
      "attr_write": "manual",
      "attr_vals": "ffff"
  },
  "meta": {
      "msg": "获取成功",
      "status": 200
  }
 -->

- :attrId 可以通过 下面的方式传递过来
- scope.row.attr_id

- :id 我们是根据计算属性 计算我们点击级联选择器后 分组数组的最后一项的值

- 下面当我们点击编辑按钮后的回调 在展示对话框的时候我们做了根据id发起get请求 将请求回来的数据 添加到表单中的逻辑
<!-- 
  async showEidtDialog(attrId) {  
    let {data: res} = await request({
      url: `categories/${this.cateId}/attributes/${attrId}`,
      method: "get",
      params: {
        attr_sel: this.activeName
      }
    })
    if(res.meta.status !== 200) {
      this.$message({
        type: "error",
        message: " 查询参数失败",
        duration: 1000
      })
      return
    }

    
    this.editForm = res.data
    console.log(this.editForm)
    this.editDialogVisible = true
  },


  要点：
  虽然我们展示的对话框中 只有一个 input 用于展示名字
  但是我们请求回来的数据 是一个大数据 input 只用上了 数据中的一条 

  但是我们还是将请求回来的数据 保存在了 editForm 这个对象中

  数据：
  attr_id: (...)
  attr_name: (...)
  attr_sel: (...)
  attr_vals: (...)
  attr_write: (...)
  cat_id: (...)
 -->


- 接下来点击 确定 的时候 完成修改的操作
- 点击确定先是预校验 通过后发起请求

- 请求路径：categories/:id/attributes/:attrId
- 请求方法：put
- 请求参数
  - :id： 分类 ID
  - 不能为空`携带在url中`
  
  - :attrId： 属性 ID
  - 不能为空`携带在url中`
  
  - attr_name
  - 新属性的名字 不能为空，携带在`请求体`中
  
  - attr_sel
  - 属性的类型[many或only] 不能为空，携带在`请求体`中

  - attr_vals
  - 参数的属性值 可选参数，携带在`请求体`中
<!-- 
  "data": {
      "attr_id": 9,
      "attr_name": "测试更新",
      "cat_id": "43",
      "attr_sel": "only",
      "attr_write": "manual",
      "attr_vals": "abc"
  },
  "meta": {
      "msg": "更新成功",
      "status": 200
  }
 -->

<!-- 
  // 点击添加参数的对话框的确定按钮 添加参数
  addParams() {
    this.$refs.addFormRef.validate(async valid => {

      // !valid 是验证失败
      if(!valid) return

      let {data: res} = await request({
        url: `categories/${this.cateId}/attributes`,
        method: "post",
        data: {
          attr_name: this.addForm.attr_name,
          attr_sel: this.activeName
        }
      })

      if(res.meta.status !== 201) {
        this.$message({
          type: "error",
          message: "获取参数失败",
          duration: 1000
        })
        return
      }

      this.$message({
        type: "success",
        message: "获取参数成功",
        duration: 1000
      })
      this.addDialogVisible = false
      this.getTabData()
    })
  },
 -->


- 点击 删除 按钮 删除该行的数据

- 请求路径： categories/:id/attributes/:attrid
- 请求方法：delete
- 请求参数

  - :id
  - 分类 ID 不能为空`携带在url中`

  - :attrid
  - 参数 ID 不能为空`携带在url中`

<!-- 
  "data": null,
  "meta": {
      "msg": "删除成功",
      "status": 200
  }
  -->

<!-- 
  // 点击删除按钮 根据id 删除数据
    async removeParams(attrId) {
    let res = await this.$confirm("此操作将永久删除该参数, 是否继续？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).catch(err => err)

    // 证明用户取消了操作
    if(res !== "confirm") {
      this.$message.info("已取消删除")
      return
    }

    let {data: ret} = await request({
      url: `categories/${this.cateId}/attributes/${attrId}`,
      method: "delete"
    })
    console.log(ret)

    if(ret.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "删除失败",
        duration: 1000
      })
      return
    }

    this.$message.success("删除用户成功")
    this.getTabData()
  },
 -->


- 上面我们已经完成了 两个tab切换区域 点击对应的tab按钮 会在table中展示对应的数据，下面我们要完成 点击表格中的每一行 可以展开该行，并在展开行中将该行的所有可选项 

- 同时可以点击后面的添加按钮 新增对应的可以项的功能
- 我们先看看每行的可选项 对应着数据中的什么字段
<!-- 
  上面我们在级联选择器中 选中了3级分类后 会展示该分类的数据
  我们在选中3级分类的时候 请求了数据 并数据保存在了？？？

  attr_id: (...)
  attr_name: (...)
  attr_sel: (...)
  attr_vals: (...)    该行下的所有可选项都在这个属性中保存
  attr_write: (...)
  cat_id: (...)

  attr_vals: 
  "49吋4K超薄曲面 人工智能,55吋4K观影曲面 30核HDR,55吋4K超薄曲面 人工智能,65吋4K超薄曲面 人工智能"


  它们以空格来分割
  我们将这些字符串渲染成一个个的tag标签 分割的结果会是一个数组 最终我们将数组for循环然后渲染出一个个的tag标签了
 -->

- 思路：
- 我们将服务器返回的结果 的每一项进行for循环 每循环一次都会拿到一个参数项
- 我们将参数项身上的 attr_vals 的值由字符串分割成一个数组 重新给 attr_vals赋值

<!-- 
  在点击 级联选择器后 选中3级分类的时候 会发起数据请求 我们在这个函数中做下面的操作

  
  // 再将数据交给 tab区对应的表格数据变量之前 我们加工下数据 将 attr_vals 的值 由字符串加工成一个数组
  res.data.forEach(item => {
    if(item.attr_vals) {
      item.attr_vals = item.attr_vals.split(",")
    }
  })

  console.log(res.data)

  if(this.activeName === "many") {
    this.manyTableData = res.data
    
  } else {
    this.onlyTableData = res.data
  }
 -->


- 然后我们在表格的展开行中 for 循环这个数组
<!-- 
  <el-table-column type="expand">


    在这里使用作用域插槽的形式接收下这行的数据
    <template scope="scope">
      <el-tag 
        v-for="(item, index) of scope.row.attr_vals" 
        :key="index"
        class="tag-content"
        closable
      >
        {{item}}
      </el-tag>
    </template>
  </el-table-column>
 -->


> bug
- 当我们添加一个动态参数的时候 里面肯定是空的 但是展开这个 参数 会发现里面有一个空白的 tag 为啥？
<!-- 
  默认情况下 请求回来的数据 里面是有可选项的 它可以渲染出很多的tag标签

  但是 颜色 是我们新添加的 它的 attr_vals 是一个空的字符串
  如果是空字符串 用split进行分割 结果是[""] 也就是数组中有一项 所以就渲染出一个空白的el-tag标签

  我们在上面加工请求回来的数据的时候 要进行判断


  res.data.forEach(item => {
    item.attr_vals = item.attr_vals
      ? item.attr_vals.split("")
      : []
  })
 -->


> 添加按钮 和 输入文本框之间的切换显示
- 我们还要在展开行里做 添加 tag 和 删除 tag 的功能
- 点击 new Tag 标签后 变成了 文本框 当文本框失去焦点的时候 文本框就会被隐藏取而代之的就是变成了 Tag 标签

- 这里的逻辑是通过 v-if 和 v-else 实现的 
- 这里我们使用 Tag组件中的 动态编辑标签 效果
<!-- 
  // 输入框
  <el-input
    class="input-new-tag"
    v-if="inputVisible"       控制显示：这里有v-if指令
    v-model="inputValue"      input的值双向绑定到了 这个属性的身上
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>

  // 添加 按钮
  <el-button 
    v-else                  控制显示：这里是v-else
    class="button-new-tag" 
    size="small" 
    @click="showInput"
  >
    + New Tag
  </el-button>
 -->


- 要点1：
- 我们在 el-table-column 里面 使用了 作用域插槽 这样就能得到 tableData 方便我们使用v-for遍历生成结构

- 要点2：
- 在使用element ui组件添加样式的时候
- 1. 我们先看看直接添加样式可以不可以
- 2. /deep/ 包裹容器样式 目标组件上的样式
<!-- 
  /deep/ .input-new-tag .el-input__inner {
    width: 120px;
    margin-left: 10px;
    vertical-align: bottom;
  }
 -->


<!-- 
  <el-table-column type="expand">
    <template scope="scope">
      
      循环渲染tag标签
      <el-tag 
        v-for="(item, index) of scope.row.attr_vals" 
        :key="index"
        class="tag-content"
        closable
      >
        {{item}}
      </el-tag>

      输入文本框
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>

      添加新tag按钮
      <el-button 
        v-else
        class="button-new-tag" 
        size="small" 
        @click="showInput"
      >
          + New Tag
        </el-button>
    </template>
  </el-table-column>
 -->

- 解决两个问题：
- 1. 我们在一行里面 点击 new tag 标签 每一行的tag都会变成input
- 2. input 自己占了一行 同时我们在一个输入框中输入数据 每行的文本框中还有联动的效果
<!-- 
  因为 我们所有的 input 都绑定的同一个 属性
  v-if="inputVisible"
  v-model="inputValue"

  所有的input 绑定的 inputVisible
  所有的v-model 绑定的 inputVale
 -->

- 所有的input都绑定了同一个属性，那么我们可以给每一行数据单数的添加一个属性是一个布尔值 控制它们显示和隐藏 自己的行通过布尔值控制自己的显示和隐藏

- 同时我们输入的value值只保存在自己行内的数据里面 和其它的数据不冲突
- 也就是说 我们要为每一行数据都提供一个 inputVisible 和 inputVale

- 思路：
- 我们在点击级联选择器 获取表格数据的回调中 处理下请求回来的数据 在当中添加我们需要的属性

<!-- 
  res.data.forEach(item => {
    if(item.attr_vals) {
      item.attr_vals = item.attr_vals.split(",")
    }
    
    // 用上面的 没有考虑当新增的时候 attr_vals 将是空
    item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : []

    // 为每一条记录添加一个布尔值 控制展开行的input的显示和隐藏
    item.inputVisible = false
    // 每一条记录 展开行中input的自己的v-model
    item.inputValue = ""
  })


  <el-input
    class="input-new-tag"

    v-if="scope.row.inputVisible" 
    v-model="scope.row.inputValue"

    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>

    <el-button 
    v-else
    class="button-new-tag" 
    size="small" 
    @click="showInput(scope.row)"     这里把该行的数据传递过去
  >
      + New Tag
  </el-button>


  // 展开行内 当点击 添加tag 按钮会的回调
  showInput(row) {
    // 当点击 添加tag 按钮后展示 input 框
    row.inputVisible = true
  },


  有一个问题：
  我们将v-model 双向绑定到 scope.row 中之后 怎么获取呢？
  用的时候 再将 scope.row 传递到需要用它的地方么
 -->


> 让input自动获取焦点：
- this.$nextTick(() => {})
- 当页面上元素被重新渲染之后才会执行回调中的代码
- 比如我们想让文本框获取焦点必须在文本框被重新渲染之后才能执行获取焦点的逻辑

- 如果不放在nextTick中 当我们点击 new tag 按钮后虽然我们把变量置为true了 但是页面上那个元素还没有被渲染出来 这时候如果我们直接通过$refs获取元素是没有的 再focus 肯定会报错 那我们就等待一个时机 当页面元素重新被渲染之后 肯定会执行nextTick
<!-- 
  showInput() {
    this.inputVisible = true;
    this.$nextTick(_ => {
      this.$refs.saveTagInput.$refs.input.focus();
    });
  },
 -->


> 实现按钮与文本框的切换显示
- 当我们点击按钮的时候会展示文本框 当文本框失去焦点的时候展示按钮
- 当文本框失去焦点 或者 按下回车的时候 都会触发一个 handleInputConfirm 回调
- 我们把该行的数据传递过去 在回调中 取得该行数据中用于控制文本框显示和隐藏的布尔值就可以了

- 优化：
- 当我们在文本框中输入的内容不合法 应该将内容清空
- 也就是说在隐藏前还要进行判断

<!-- 
  handleInputConfirm(row) {

    // 当文本框输入不合法的时候 我们将文本框的内容重置为0 去除空格后看看length
    if(row.inputValue.trim().length === 0) {
      row.inputValue = ""
      // 同时隐藏文本框 最后return出去 因为length为0 那不需要做后续的处理了
      row.inputVisible = false
      return
    }

    // 如果没有return 则说明输入了内容 可以接下来做后续的处理
    
  },
 -->


> 参数项的添加操作
- 我们要在每行的展开行里面添加固定的可选值 也就是添加参数
- 比如我们在颜色下面添加具体的参数 白色
- 当键入回车 或者 文本框失去焦点的时候就会触发 handleInputConfirm 回调

- 如果在回调中没有return出去说明我们输入了合法的值 我们就可以拿到这个值
- 我们拿到的这个值就是 scope.row.inputValue
<!-- 
  为了将文本框都绑定该行数据中的一个变量(如果绑定同一个变量 那么input就会产生联动效果)

  如果我们加工了下请求回来的数据，然后在每一条数据中添加了 inputValue 这个变量用户保存自己的input的 v-model

  那么我们想要拿到用户输入的值 就是通过scope.row拿到了这个 inputValue
 -->

- 因为展开行的标签都是通过 attr_vals 这个数组遍历生成的 tag 标签
- 所以我们拿到用户输入的值 直接push到 attr_vals 这个数组中就可以了

- 但是以上只是在前端页面中将用户输入的值 保存到了 attr_vals 数组中 创建了 新的tag标签 但是并没有把对应的数据上传到服务器 刷新页面的就没有了 因为没有对刚才的操作存储到数据库中

- 所以在push完毕后 我们还要发起网络请求 将这次操作保存在服务器中

- 请求路径：categories/:id/attributes/:attrId
- 请求方法：put
- 请求参数

    - :id
    - 分类 ID  不能为空`携带在url中`

    - :attrId
    - 属性 ID  不能为空`携带在url中`

    - attr_name
    - 新属性的名字  不能为空，携带在`请求体`中

    - attr_sel
    - 属性的类型[many或only]  不能为空，携带在`请求体`中

    - attr_vals
    - 参数的属性值  可选参数，携带在`请求体`中

- id我们可以从计算属性中获取
- attrid我们可以通过row.id拿到

<!-- 
  "data": {
    "attr_id": 9,
    "attr_name": "测试更新",
    "cat_id": "43",
    "attr_sel": "only",
    "attr_write": "manual",
    "attr_vals": "abc"
  },
  "meta": {
      "msg": "更新成功",
      "status": 200
  }
 -->

**注意：**
- attr_vals 服务器里面存储的是字符串 但我们客户端将这个值修改成了数组 所以我们在处理这个数组的时候 我们要使用, 拼接成一个字符串

- 也就是说 服务器那边保存的是什么类型 我们传递过去就要使用什么类型

<!-- 
  async handleInputConfirm(row) {
    // 当文本框输入不合法的时候 我们将文本框的内容重置为0 去除空格后看看length
    if(row.inputValue.trim().length === 0) {
      row.inputValue = ""
      // 同时隐藏文本框 最后return出去 因为length为0 那不需要做后续的处理了
      row.inputVisible = false
      return
    }

    // 如果没有return 则说明输入了内容 接下来我们就可以拿到用户输入的值 然后然后push到 attr_vals 这个数组中 因为tag标签就是通过这个数组创建出来的
    row.attr_vals.push(row.inputValue.trim())

    // push完后将 row.inputValue 重置为空
    // row.inputValue = ""

    // 隐藏这个文本输入框
    row.inputVisible = false

    // 上面我们只是完成了页面效果 接下来我们还要将这个操作保存到数据库中
    let {data: res} = await request({
      url: `categories/${this.cateId}/attributes/${row.attr_id}`,
      method: "put",
      data: {

        因为是给一个项下面添加具体的参数 attr_name 是给哪项 attr_sel 是给静态还是动态添加 attr_vals 才是具体的值
        attr_name: row.attr_name,   
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(",")
      }
    })
    
    if(res.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "添加参数失败",
        duration: 1000
      })
      return
    }

    this.$message({
      type: "success",
      message: "添加参数成功",
      duration: 1000
    })
  },
 -->


> 删除展开行中的参数项的操作
- 当我们点击 tag 标签上的 x 号的时候 肯定会触发 tag 标签的 close 事件
- 我们可以给 tag 标签绑定 close 事件 我们要删除哪个呢？ 所以再把对应的索引传递过去

- 同时我们还需要这行的数据，因为我们要从这行数据中的attr_vals里面去删
<!-- 
  <el-tag 
    v-for="(item, index) of scope.row.attr_vals" 
    :key="index"
    class="tag-content"
    closable
    @close="handClosed(scope.row, index)"    这里
  >

  handClosed(row, index) {
    row.attr_vals.splice(index, 1)
    
    // 上面只是完成了前端页面上的删除效果 我们还要同步到后台程序
    this.saveAttrVals(row)
  },

  

// 将对 attr_vals 的操作 保存到服务器 封装的一个函数
async saveAttrVals(row) {
  // 上面我们只是完成了页面效果 接下来我们还要将这个操作保存到数据库中
  let {data: res} = await request({
    url: `categories/${this.cateId}/attributes/${row.attr_id}`,
    method: "put",
    data: {
      attr_name: row.attr_name,
      attr_sel: row.attr_sel,
      attr_vals: row.attr_vals.join(",")
    }
  })

  if(res.meta.status !== 200) {
    this.$message({
      type: "error",
      message: "修改参数失败",
      duration: 1000
    })
    return
  }

  this.$message({
    type: "success",
    message: "修改参数成功",
    duration: 1000
  })
},
-->


> bug： 级联选择器只能选中3级分类 当我们选中的是二级的时候
- 级联选择器是清空的状态
- 添加参数的按钮也是禁用的状态 但是 下方的数据表格却没有被清空 如果这时候我们操作表格 因为表格中的操作都需要3级分类 我们都已经将级联选择器清空了 所以这时候操作就会出现种种问题

- 所以当我们清空级联选择器的时候 我们也要将下方的表格清空
- 思路：
- 当我们的级联选择器发生变化 就会触发它的change事件 我们找到它的change事件
<!-- 
  <el-cascader
    size="small"
    v-model="selectedKeys"
    :options="cateList"
    :props="cateProps"
    @change="handleChange"    只要它发生变化就会进入回调
    clearable
  >
  </el-cascader>


  handleChange() {
    // 回调中我们请求数据 我们需要在getTabData函数中做处理
    this.getTabData()   
  },


  async getTabData() {
    // 证明选择的不是3级分类 我们要return出去 和 清空数组 效果就是点击了也没反应
    if(this.selectedKeys.length !== 3) {

      // 这里我们将 选择的id数组 做了清空
      this.selectedKeys = []

      // 我们还要将 动态参数 和 静态属性的数据 也清空 
      this.manyTableData = []
      this.onlyTableData = []
      return
    }

  逻辑就是 我们选择 三级分类的时候 才将请求数据放入渲染列表的tableData中 不然就应该是空
 -->


> input 回车事件 和 blur事件 会同时触发
- 这几个环节中 我们做了 点击tag按钮 会变成 input的逻辑
- 当input失去焦点 和 按下回车的时候 都会触发对应的函数
- 但是当我们按下回车的时候 函数会被触发两次 因为按下回车的同时文本框也失去了焦点
- 解决方式：
- 1. @keyup.enter.native="$event.target.blur"
- 将回车事件指向当前元素失去焦点事件
<!-- 
  @keyup.enter.native="handleInputConfirm(scope.row)"
  @blur="handleInputConfirm(scope.row)"   报错

  @keyup.enter="(event)=>event.target.blur()"
 -->

- 2. 我们在kepup的逻辑中解绑失去焦点事件 在focus事件中绑定失去焦点事件
- https://blog.csdn.net/qq_40179700/article/details/119576459?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.no_search_link

<!-- 
  <el-input
		v-model="inputVal"
		placeholder="请输入内容"
		@focus="focusFun"
		@blur="triggerBlur&&blurFun()"        
		@keyup.native.enter="keyupFun"
	/>

  data() {
    return {
      inputVal: '',
      oldInputValue: '',
      triggerBlur: false
    };
  },

  methods: {
		focusFun(){
			console.log('聚焦')
			this.triggerBlur = true
		},
      
		blurFun(){
			console.log('失焦')
			this.inputVal = this.oldInputVal
		},
      
		keyupFun() {
			console.log('回车');
			this.oldInputVal = this.inputVal
		}
	},
 -->

-----------------

### 商品列表
- 前面做了一些准备工作 接下来我们从请求商品列表数据 渲染列表 开始
- 这里商品列表有分页的功能

- 请求路径：goods
- 请求方法：get
- 请求参数
    - query  查询参数  可以为空
        查询关键字 它需要和页面上的文本输入框做绑定

    - pagenum  当前页码  不能为空
        请求第几页的数据

    - pagesize  每页显示条数  不能为空
        每页显示的条数


- 响应数据 解析：
- total  
    总共商品条数

- pagenum
    当前商品页数 

- goods_id
    商品 ID

- goods_name
    商品名称

- goods_price
    价格

- goods_number
    数量

- goods_weight
    重量  不能为空

- goods_state
    商品状态   商品状态 0: 未通过 1: 审核中 2: 已审核

- add_tim
    添加时间

- upd_time
    更新时间

- hot_mumber
    热销品数量

- is_promote
    是否是热销品 

<!-- 
  "data": {
    "total": 50,
    "pagenum": "1",
    "goods": [
      {
        "goods_id": 144,
        "goods_name": "asfdsd",
        "goods_price": 1,
        "goods_number": 1,
        "goods_weight": 1,
        "goods_state": null,
        "add_time": 1512954923,
        "upd_time": 1512954923,
        "hot_mumber": 0,
        "is_promote": false
      }
  ]
},
"meta": {
  "msg": "获取成功",
  "status": 200
}
 -->


> 分页步骤
- 1. 在data配置项中定义 发起请求时需要的参数 要关注api文档我们需要提交什么参数
<!-- 
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,     默认获取第一页的数据
        pagesize: 5
      },
      goodsList: [],    获取回来的数据放这里
      total: 0,         保存服务器返回的总记录数
    }
  },
 -->

- 2. 在created函数中发起获取数据的请求 并将结果保存到data配置项中
- 保存的数据有 数据 和 总记录数
<!-- 
  // 根据分页获取对应的商品的列表
    async getGoodsList() {
      let {data: res} = await request({
        url: "/goods",
        method: "get",
        params: this.queryInfo,
      })

      if(res.meta.status !== 200) {
        this.$message({
          type: "error",
          message: "获取商品列表失败",
          duration: 1000
        })
        return
      }

      this.$message({
        type: "success",
        message: "获取商品列表成功",
        duration: 1000
      })

      console.log(res.data);
      {total: 926, pagenum: '1', goods: Array(5)}

      this.goodsList = res.data.goods
      this.total = res.data.total
    }
  }
 -->

- 下面我们要将获取到数据渲染到页面上 这部分和前面没有什么不一样的地方


> 自定义格式化时间全局过滤器
- 我们后台返回的时间是毫秒数 1514345477 我们要将它格式化下
- 我们可以在 main.js 文件中注册一个全局过滤器

- 要点：
- 这里面我们使用了字符串的方法 .padStart 指定了只对不足两位的情况下 使用什么来补位

- 因为是字符串的方法所以用了 + '' 进行了强制类型的转换
<!-- 
  // main.js中

  Vue.filter("dataFormat", function(originValue) {
    const date = new Date(originValue)
    let y = date.getFullYear()
    let m = (date.getMonth() + 1 + "").padStart(2, '0')
    let d = (date.getDate() + "").padStart(2, '0')

    let hh = (date.getHours() + "").padStart(2, '0')
    let mm = (date.getMinutes() + "").padStart(2, '0')
    let ss = (date.getSeconds() + "").padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  })
 -->


> 表格的结构问题
- 要点：
- 自定义列的问题
<!-- 
  <el-table
    :data="goodsList"
    border
    stripe
  >

    // 索引列
    <el-table-column type="index" label="#" align="center"></el-table-column>

    // 当我们数据内容区 有自定义的列的时候 可以采取这样的方式
    <el-table-column
      v-for="item of goodsTableColumn"
      :key="item.goods_id"
      v-bind="item"
    >

      // 在数据渲染区里面使用 n个类型的作用域插槽
      <template scope="scope" v-if="item.type == 'date'">
        {{scope.row.add_time | dataFormat}}
      </template>


      // 内容可以使用这种模式填充 {{scope.row[item.prop]}}
      <template scope="scope" v-else>
        {{scope.row[item.prop]}}
      </template>
    </el-table-column>


    <el-table-column label="操作" width="100px">
      <template scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" circle></el-button>
      </template>
    </el-table-column>

  </el-table>
 -->


> 分页功能
- 我们要使用 Pagination 组件
<!-- 
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"

    // 修改成 data 中的对应的数据 当前页
    :current-page="queryInfo.pagenum"

    // 可以选择每页显示多少条数据
    :page-sizes="[5, 15, 30, 50]"

    // 绑定哪个值
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>


  handleSizeChange(newSize) {
    this.queryInfo.pagesize = newSize
    this.getGoodsList()
  },

  handleCurrentChange(newPage) {
    this.queryInfo.pagenum = newPage
    this.getGoodsList()
  },
 -->

- 还可以给分页器添加背景色 在组件中使用 background 属性


> 搜索与清空的功能
- 我们输入关键字就可以将符合关键字的数据找到
- 当我们清空文本框的时候就会回到数据最全的样子

- 这里是通过后台来处理逻辑 并不是之前我们前端过滤数据的方式来处理逻辑 我们根据query属性的值 后台做了模糊查询的处理 返回对应的数据 我们只管显示就行
- 这里就利用了 query 属性 我们要将文本框的值和query进行绑定
<!-- 
  queryInfo: {
    query: "",
    pagenum: 1,
    pagesize: 5
  },

  <el-input 
    placeholder="请输入内容" 
    v-model="queryInfo.query"
  >
  <el-button slot="append" icon="el-icon-search"></el-button>
 -->

- 接下来我们点击搜索按钮就应该调用获取数据列表的函数
<!-- 
  <el-input 
    placeholder="请输入内容" 
    v-model="queryInfo.query"     1 这里绑定了 请求参数中的 query字段

    clearable                  3 清空文本框的按钮
    @clear="getGoodsList"      4 清空文本框后的回调 重新获取数据
  >

  <el-button 
    slot="append" 
    icon="el-icon-search"
    @click="getGoodsList"         2 这里调用获取数据的函数
  ></el-button>
 -->


> 根据id删除商品数据
- 点击删除按钮之后 会有一个 confirm 提示框 会有是否删除的提示

- 请求路径：goods/:id
- 请求方法：delete
- 请求参数
  | id     | 商品 ID  | 不能为空`携带在url中` |

<!-- 
   "data": null,
    "meta": {
      "msg": "删除成功",
      "status": 200
    }
 -->

<!-- 
  async removeById(id) {
    let res = await this.$confirm("此操作将永久删除该参数, 是否继续？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"

      // 捕获用户的取消行为 将它return出去
    }).catch(err => err)

    // 证明用户取消了操作
    if(res !== "confirm") {
      this.$message.info("已取消删除")
      return
    }

    let {data: ret} = await request({
      url: `goods/${id}`,
      method: "delete"
    })

    if(ret.meta.status !== 200) {
      this.$message({
        type: "error",
        message: "删除失败",
        duration: 1000
      })
      return
    }

    this.$message.success("删除商品成功")
    this.getGoodsList()
  },
 -->


> 通过编程式导航 跳转到 商品添加页面
- 点击添加商品的按钮 跳转到 添加商品的页面
- 配置路由
<!-- 
  开始的时候还在想要不要用children属性 突然又想起 使用children属性 goods里面应该要有router-view 所以还是应该同级 新开号
  {
    path:"/goods",
    component: List,
  },
  {
    path:"/goods/add",
    component: AddGoodPage
  }
 -->

- 当点击按钮的时候 跳转页面
<!-- 
  <el-button type="primary" @click="goAddPage">添加商品</el-button>

  goAddPage() {
    this.$router.push("/goods/add")
  },
 -->

- 绘制添加页面的基本结构
- 这里我们使用了 新的组件 步骤条 
<!-- 
  <el-steps 
    :space="200" 
    :active="activeIndex"      控制激活项的索引 第一项索引为0
    finish-status="success"
    align-center    居中对齐
  >
    <el-step title="基本信息"></el-step>
    <el-step title="商品参数"></el-step>
    <el-step title="商品属性"></el-step>
    <el-step title="商品图片"></el-step>
    <el-step title="商品内容"></el-step>
    <el-step title="完成"></el-step>
  </el-steps>

  其中的 el-step 就是每一步
 -->


> 商品添加渲染 tab栏区域
- 有点像 菜单栏 还有点像选项卡 但是是竖着排列的
<!-- 
  <el-tabs :tab-position="'left'" style="height: 200px;">
    <el-tab-pane label="基本信息">基本信息</el-tab-pane>
    <el-tab-pane label="商品参数">商品参数</el-tab-pane>
    <el-tab-pane label="商品属性">商品属性</el-tab-pane>
    <el-tab-pane label="商品图片">商品图片</el-tab-pane>
    <el-tab-pane label="商品内容">商品内容</el-tab-pane>
  </el-tabs>

  而 <el-tab-pane> 之间就可以放别的结构 </el-tab-pane>
 -->


> 步骤条和tab栏的联动效果
- 如果我们点击了 tab栏中的基本信息 那么步骤条的基本信息项就会被激活
- tabs 身上会有 v-model 会绑定一个 变量
- 每次我们点击选项卡的时候 都会将 el-tab-pane 身上的name属性 绑定到变量身上

<!-- 
  <el-tabs 
    :tab-position="'left'" 
    style="height: 200px;"
    v-model="activeIndex"
  >
    <el-tab-pane label="基本信息" name="0">基本信息</el-tab-pane>
    <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
    <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
    <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
    <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
  </el-tabs>
 -->

- 而我们的步骤条的激活 是绑定的 <el-steps :active="activeIndex" >
- 它绑定的是每一个 <el-step> 的索引值 默认第一个el-step的索引是0

- 那我们将 tabs选项卡 和 steps 绑定一个变量是不是就实现了联动的效果
- 但是 el-steps 要求绑定的是一个数字 而 el-tab-pane 的name是字符串
- 所以我们还要进行 类型的转换
<!-- 
  <el-steps 
    :space="200" 

    :active="activeIndex / 1" 

    finish-status="success"
    align-center
  >
 -->


> 基本信息 区域
- 我们做了一个侧边栏的tab栏 其中的每一项维护着这个商品的部分数据 只有把这5项合起来才是一个商品的完整的信息数据

- 所以我们应该在这5个面板的外侧使用form表单包裹里面

- 注意：
- el-tab-pane 只能作为 el-tabs 的子节点 假如我们将 el-form 直接包裹el-tab-pane会有问题
<!-- 
  <el-form>
    <el-tabs>
      <el-tab-pane label="基本信息" name="0">
      
        这里放每一个表单项
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="addForm.goods_name"></el-input>
        </el-form-item>
      
      </el-tab-pane>
    </el-tabs>
  <el-form>
 -->

> <el-form label-position="top">
- 这个属性控制 label 在input的左侧还是上方

> el-input type="number"></el-input>
- 因为商品的价格是数字，所以我们可以规定输入框的类型


> 获取数据的时机
- 1. created
- 2. 某个事件的回调中

- 基本信息区域里面最后一项是级联选择器 我们将请求回来的数据 渲染出级联选择器
- 同时也是一样只允许选中3级分类 1 2分类是不能选择的
<!-- 
  <el-cascader
    size="small"
    v-model="addForm.goods_cat"
    :options="cateList"
    :props="cateProps"
    @change="handleChange"
    clearable
  >
  </el-cascader>

  cateProps: {
    expandTrigger: 'hover',
    // 看到的是哪个属性
    label: "cat_name",
    // 选中的是哪个属性
    value: "cat_id",
    children: "children",
    checkStrictly: false,
  },


  addForm: {
    goods_name:"",
    goods_price:0,
    goods_weight:0,
    goods_number: 0,

    // 商品所属的分类数组，但是提交的时候要转成逗号分隔的字符串 级联选择器的id值会保存在这里
    goods_cat: []
  },
 -->

- 要点：
- 1. 级联选择器 绑定的值 是我们要发起请求时的一个字段 我们绑定的是 addForm.goods_cat 其中goods_cat就是一个必选项
<!-- 
  goods_cat 
    我们保存的是 级联选择器 选择3级分类id的数组 但是发起请求时 后台要求这项应该是一个以逗号分隔的字符串 所以在发起请求前我们还需要进一步的处理
 -->

- 2. 级联选择器 要使用 :options="cateList" 绑定数据源
- 3. 级联选择器 要使用 :props="cateProps" 指定配置对象
- 4. 配置对象
<!-- 
  cateProps: {
    expandTrigger: 'hover',
    // 看到的是哪个属性
    label: "cat_name",
    // 选中的是哪个属性
    value: "cat_id",
    children: "children",
    checkStrictly: false,
  },
 -->


- 接下来我们控制一下级联选择器的范围 也就是说只能选择3级分类
- 我们级联选择器的选中项会直接双向绑定到addForm.goods_cat身上 我们可以对这个数据做下判断 看看这个数组的length 是不是等于3

- 如果等于3就允许它选中 如果不等于3就清空这个数组就可以了
<!-- 
  handleChange() {
    if(this.addForm.goods_cat.length != 3) {
      // 进入到这里代理你没有选中3级分类 我们直接清空该数组
      this.addForm.goods_cat = []
    } 
  },
 -->


> 阻止左侧tabs标签页的切换
- 一共有5个tabs选项卡 只有完成某个条件才可以点击别的 tabs选项卡 我们这里是 在基本信息 这个tabs标签中 如果不选择 商品分类 是不允许 点击其它的tabs选项卡的

- 思路：
- 我们监听 tabs 选项卡的切换事件 在事件回调中 判断当前是否处于 基本信息的页签 同时 判断选中的商品分类是否为3级商品分类(判断id数组的length是否为3) 如果length不为3 我们阻止它发生切换

- 如果监听 tabs标签页的行为？
- el-tags 身上的属性 before-leave	
- 切换标签之前的钩子，若return回 false (或者返回 Promise 且被 reject)，则阻止切换
<!-- 
  Function(activeName, oldActiveName)

  activeName: 即将进入的标签页的名称
  oldActiveName: 即将离开的标签页的名称

  即将进入的标签页的名称 1
  即将离开的标签页的名称 0

  是下面的name属性
  <el-tab-pane label="基本信息" name="0">

  在函数中 return false 则阻止切换
 -->

- 我们不是永远的阻止而是根据条件来阻止标签页的切换
- 如果当前我们处于第一个面板 且 级联选择器的id数组长度不为3的时候 我们要组件切换

<!-- 
  <el-tabs 
    :tab-position="'left'" 
    v-model="activeIndex"
    :before-leave="beforeTabLeave"    -- 这里
  >


  beforeTabLeave(to, from) {
    // console.log("即将进入的标签页的名称", to)
    // console.log("即将离开的标签页的名称", from)

    if(from == "0" && this.addForm.goods_cat.length != 3) {
      this.$message.error("请先选择商品分类")
      return false 
    }
  },
 -->


> 在 tabs - 商品参数(也就是动态参数) 面板中 获取参数
- 我们在这个面板中 请求动态参数数据 渲染数据 因为我们打开的就是商品参数面板 所以 对应的就是 动态参数

- 请求路径：categories/:id/attributes
- 请求方法：get
- 请求参数

  :id  不能为空`携带在url中
  sel  [only,many] 字符串类型
      不能为空,通过 only 或 many 来获取分类静态参数还是动态参数
      如果我们要获取 动态参数 的数据 就要将 sel 指定为 many

- 那我们在什么时候发起请求呢？
- 当我们点击 商品参数tabs按钮的时候发起请求

- 那tabs标签页的点击事件怎么绑定呢？
- tab-click
- 该属性对应的回调会在tab被选中的时候会被触发

<!-- 
  <el-tabs 
    :tab-position="'left'" 
    v-model="activeIndex"
    :before-leave="beforeTabLeave"
    @tab-click="tabClick"   -- 这里
  >

  tabClick() {
    // 由于我们v-model绑定的是 activeIndex 所以通过它我们能知道点击的是谁
    console.log(this.activeIndex)  0 1 2 3 4
  },
 -->

- 这样我们就能在点击tab页签的时候打印出对应的tab页面的name属性 如果我们
activeIndex是1的话 证明我们进入了 商品参数 面板

- 进入该面板后我们就应该发起数据请求
<!-- 
  // tabs各标签页按钮被点击的时候会触发
  async tabClick() {
    // console.log(this.activeIndex)
    // 证明我们访问的商品参数的面板
    if(this.activeIndex == "1") {
      let {data: res} = await request({
        url: `categories/${this.catId}/attributes`,
        method: "get",
        params: {sel: "many"}
      })

      if(res.meta.stauts !== 200) {
        this.$message.error("请求商品参数失败")
        return
      }

      this.manyTableData = res.data
    }
  },
 -->


- 这节里面我们将上面获取到的数据渲染成复选框组 就是可以打对号的checkbox
- 这里我们用到了 checkbox组件中的 复选框组
- 适用于多个勾选框绑定到同一个数组的情景

- 这里我们要根据请求回来的数据中的 attr.vals 来渲染数据
- 但是我们的 attr.vals 是一个字符串 
- 我们在获取到数据的时候 将attr.vals加工成数组
<!-- 
  res.data.forEach(item => {
    // 我们要做判断 如果是空字符串那么我们就返回空数组
    item.attr_vals = item.attr_vals.length == 0 ? [] : item.attr_vals.split(",")
  })
  this.manyTableData = res.data
 -->


- 我们请求回来的数组对象 有几个对象我们就渲染几个 form-item 
- 同时 form-item label值为请求数据中的attr_name字段

- el-checkbox-group 的 v-model 绑定 attr_vals 字段
- 该字段中有什么 对应的checkbox 就会被打上勾
- 其中label用于展示给我们看的文字

<!-- 
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox>
  </el-checkbox-group>

  label属性： 请求数据中的 attr_name
  el-checkbox-group中的v-model 要绑定一个数组 我们绑定到 attr_vals身上
  数组里面有的 就会被选中
 -->

<!-- 
  <el-form-item 
    v-for="item of manyTableData" 
    :label="item.attr_name" 
    :key="item.attr_id"
  >

    <el-checkbox-group v-model="item.attr_vals">
      <el-checkbox 
        v-for="(i, k) of item.attr_vals" 
        :keys="k" 
        :label="i"
        border
      >
      </el-checkbox>
    </el-checkbox-group>

  </el-form-item>
 -->

- 只要我们在checkbox中 去掉勾一项 那么我们对应的 attr_vals 中也会少一项


> 在 tabs - 商品属性(也就是静态属性) 面板中 获取参数
- 我们在这个部分 请求数据 并渲染对应的结构

- 请求路径：categories/:id/attributes
- 请求方法：get
- 请求参数
    :id  不能为空`携带在url中
    sel  [only,many] 字符串类型
         不能为空,通过 only 或 many 来获取分类静态参数还是动态参数
         如果我们要获取 动态参数 的数据 就要将 sel 指定为 many

- 我们也是在 tab-click 的回调中处理逻辑
- 要点 通过 v-for 循环 生成一个个的form-item
<!-- 
  if(this.activeIndex == "2") {
    let {data: res} = await request({
      url: `categories/${this.catId}/attributes`,
      method: "get",
      params: {sel: "only"}
    })

    if(res.meta.status !== 200) {
      this.$message.error("请求商品参数失败")
      return
    }
    
    this.onlyTableData = res.data
    console.log(this.onlyTableData)
  }


  <el-tab-pane label="商品属性" name="2">
    <el-form-item 
      v-for="item of this.onlyTableData" 
      :key="item.attr_id" 
      :label="item.attr_name"
    >
      <el-input v-model="item.attr_vals"></el-input>
    </el-form-item>
  </el-tab-pane>
 -->