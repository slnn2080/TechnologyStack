### 使用Ajax要先使用express框架 创建服务器 然后使用node来运行这个.js文件


### AJAX就是异步的JS 和 XML
- 通过AJAX可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据, 它不是一门新的语言 而是将一种现有的标准组合在一起使用的新方式


### XML：
- 超文本标记语言，可扩展标记语言 被设计用来传输和存储数据
- 用来保存一些数据的，比如保存商品数据，订单数据，电影，音乐，可以用来传输数据，比如这么数据前端需要 我可以通过网络以XML的形式 把结果返给客户端 客户端就可以使用了

- HTML 是用来在网页中呈现数据的

- XML和HTML类似，不同的是HTML都是预定义标签，而XML中没有预定义标签，全都是自定义标签，用来表示一些数据
标签都是自己定义的 <student><name><age>

- AJAX在进行数据交换的时候所使用的数据格式就是XML 服务器端给客户浏览器返回结果时 返回的就是XML格式的字符串 前端JS在接到这个XML字符串后，对它做一个解析 把数据提取出来做一个处理

- 但是现在在用AJAX的应用时 就不用XML了 而是换了另外一种格式就是JSON

- JOSN相对于XML来讲更加的简洁 在数据转换这块也更加的容易 它可以直接借助JOSN的API方法快速将字符串转换JS对象 灵活度 远胜于XML 以后的项目中的使用都是使用JOSN


### AJAX的特点
- 1. 可以无需刷新页面与服务器进行通信
- 2. 允许你根据用户事件来更新部分页面内容
<!-- 
    比如鼠标事件，键盘事件，表单事件 文档事件我们可以在事件处理程序过程当中向服务端发送请求获取结果
    有了这样一个特性，我们可以在用户的特定行为下 来向服务端发送请求，比如用户把鼠标放到了元素的上面 从这个元素上面离开 点击哪个元素 都可以向服务端发送请求并获取结果
 -->


### AJAX的缺点
- 1. 没有浏览历史，不能回退
- 2. 存在跨域问题（同源）
<!-- 
    我在A服务 向 B服务发送请求 AJAX默认是不允许的 比如a.com的网页 向 b.com 发送AJAX的请求 默认是不可以的 
-->
- 3. seo 不友好
<!-- 
    seo是搜索引擎优化 因为网页中的内容 爬虫是爬不到的 比如 京东商品上的名字，在代码中是找不到的，因为都是通过AJAX异步请求得到的结果 

    源代码在第一次请求京东的时候 源代码结果里是没有商品信息的  源代码就是响应体 响应体就是HTTP响应的一部分 没有商品信息的话 那这些内容是怎么样让我们看到的呢？

    通过AJAX向服务端发送请求 服务端返结果 通过JS动态的创建到页面当中去的 既然是动态创建的 爬虫爬不到商品的数据
-->


### HTTP协议
- 超文本传输协议，协议详细规定了浏览器和万维网之间互相通信的规则
<!-- 
    我们平时浏览的网页绝大多数 应用的都是HTTP协议 协议就是一种约定和规则 按照规则发请求，按照规则返回结果 约定了两部分内容 
-->

> 请求(请求报文)： 
- 浏览器给服务器发送的内容 我们叫做请求, 发送的内容 还有一个专业名词叫做请求报文
> 响应(响应报文)： 
- 服务器给浏览器返回的结果 称之为响应, 返回的结果 叫做 响应报文



### 请求报文 格式与参数
- 它分4个部分(敲个回车 发送请求 这个请求分为4个部分)

> 行    POST /s?ie=utf-8 HTTP/1.1
<!-- 又分3段内容 -->
    - GET/POST（请求类型）
    - url路径（或者是对应的查询字符串） 参数是放在url这个部分的
    - HTTP/1.1（HTTP协议的一个版本）
<!-- 
    https://www.baidu.com/s?wd=%E8%B0%B7%E7%B2%92%E5%AD%A6%E9%99%A2&rsv_spt=1&rsv_iqid=0x82cc252400038ae6&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_dl=ib&rsv_sug3=12&rsv_enter=1&rsv_sug1=7&rsv_sug7=100

    随便打开一个页面，可以发现 /后面有很多的参数 这些参数 是放在 url的部分的
    换句话说 我们再搜索框里敲击回车，发请求 浏览器帮我们把报文拼接好 com/ 放在/后url的部分 作为一个传递
 -->


> 头
    - Host: atguigu.com
    - Cookie: name=guigu
    - content-type: application/x-www-form-urlencoded
<!-- 告诉服务器我的请求是个什么类型 -->

    - User-Agent: chrome 83
<!-- 
    不需要把每一个都记住 请求头部分的格式必须要掌握住 这个部分很有规律都是  
    名字: +空格+值
    告知服务器 我的请求体是一个什么类型的
-->

> 空行

> 体
- 可以有内容 可以没有内容
- 如果是get请求 请求体是空的，
- 如果是POST请求的话，请求体可以不为空
<!--   
     username=admin&password=admin
-->
> 上面是完整的HTTP请求报文 


### 响应报文
> 行    HTTP/1.1 200 ok
<!-- 包括3段 -->
    - HTTP/1.1（HTTP协议版本）
    - 200（响应状态码）
    - OK（响应字符串，是和状态码对应的 不需要我们单独去设置）
<!-- 
    以前我们听过，响应状态码 比如
    404 找不到
    403 被禁止
    401 未授权
    500 未知错误
    200 ok 
-->

> 头
    - content-type: text/html;charset=utf-8
    - content-legnth: 2048
    - content-encoding: gzip      压缩方式
<!-- 上面是对响应体内容做一个描述 -->

> 空行    
> 体
- 这个部分是返回的主要结果

    <html>
        <head>
        </head>

        <body>
            <h1>尚硅谷</h1>
        </body>
    </html>
<!-- 
    html语法的内容 被放在了响应体这个位置，其实我们平时在向服务端发送请求的时候 服务端给我们浏览器返回的结果 包含了这4个部分

    我们HTML部分在响应体这里 浏览器在接到结果的时候 会把html部分提取出来 对内容做一个解析 在页面中做一个渲染 呈现 
-->


### 在谷歌浏览器中怎么查看请求报文与响应报文
> Get 步骤
- 在谷歌浏览器中 百度 谷粒学院 
    ---- 然后打开控制台 
        ---- network 
            ---- 刷新下页面
<!-- 
    Network会出现很多的请求 在加载过程当中 所有发送的请求都会出现在这个位置
    我们点第一个 ---- 右侧会出现另一个标签页
 -->

https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E8%B0%B7%E7%B2%92%E5%AD%A6%E9%99%A2&fenlei=256&rsv_pq=819308be0001e886&rsv_t=86d7GY%2FVJ2HYLqH7dht9ONOjDmzW6SCwOZ4QqOArqfFjtVNTksUR8TRlAf4&rqlang=cn&rsv_enter=1&rsv_dl=ib&rsv_sug3=13&rsv_sug1=3&rsv_sug7=100


> 在右侧的标签中, 我们主要先看3个标签页
- Headers
    - General
    - Response Header
<!-- 
    响应头 
    响应体在 Response 标签里
-->

    - Request Headers
<!-- 请求头 刷新页面后看看浏览器向服务器发送的是什么内容 -->

    - Query String Parameters
<!-- 
    查询字符串参数
    对URL当中的参数做一个解析 对地址栏中的参数进行了一下格式化
    
    这里对于我们以后调试参数很方便 能很准确的看到参数有没有发送出去
 -->

- Preview
- 对响应体解析之后的查看界面

- Response
- 响应体


> POST
- 找一个有登录界面的网站，输入密码用户名后 
        ---- 点F12 
            ---- 然后在点击登录时 查看 network 看第一个 login
<!-- 也有3个标签页 -->
- Headers
    - General
        - Response Headers  响应头
        - Request Headers   请求头
        - Form Data         请求体
<!--    
    请求体 点击 view
    这里面有原始的请求体的内容 我们的表单（a链接）在点击提交按钮之后 浏览器会把HTTP的报文封装好
    然后发送到目标服务器的指定端口
 -->

- Preview
- Response
<!-- 请求看下面的内容，响应看上面和Response标签页 -->


### Ajax的运行环境
- Ajax技术需要运行在网站环境中才能生效, 当前课程会使用Node创建的服务器作为网站的服务器

- 也就是说 Ajax的代码要放在网站服务器下运行, 要以localhost域名的方式打开页面
<!-- 不能双击html文件来运行它 代码不会生效 -->

- 所以在使用ajax的时候要用node开启一个网站服务器, 并且使用静态资源访问服务器 我们将代码写在html文件中 然后将html文件放在静态资源文件夹中 这样我们就可以使用域名的方式访问html页面了


### Ajax的运行原理
- 页面不刷新的情况下 请求数据

- 在传统的网站上 都是浏览器端本身向服务器端发送请求, 由浏览器端本身接收服务器端返回的数据, 由于浏览器在发送请求和接收响应期间 不能再继续响应用户的其它操作(比如继续浏览拉动当前请求)
<!-- 
    浏览器端    --- 请求 --- >  服务器端
               < --- 响应 ---   

 -->
<!-- 
    传统页面的请求的发送 和 响应的接收 开发人员是不可控的
 -->
    

- 但是可以找一个代理人帮助浏览器做这件事情, 浏览器就能空闲下来响应用户的操作了 ajax就是浏览器的代理人
<!-- 
    浏览器端    -- 创建 -- >    ajax    -- 请求 -- >    服务器端
               < -- 响应 --            < -- 响应 -- 
 -->

- 这样就可以由ajax帮浏览器发送请求 ajax帮助浏览器接收服务器端的响应
- 当我们接收到服务端发送的数据后 使用dom方法添加到页面中 这样就可以让客户边浏览网站边向服务端请求数据了, 页面无刷新更新数据
<!-- 
    请求的发送 和 响应的接收 开发人员是可控的
 -->

--------------------------------- 


### Express服务端框架
- ajax给服务端发请求 这里需要服务端


### AJAX的基本操作
> 安装包
- 在最外层的位置启动终端
- npm init --yes
- npm是nodejs下的包管理工具

> 安装express框架
- npm i express

-----------------------------------------------

### 使用Ajax要分为两个部分
- 1. 我要们先搭建服务器
- 2. 浏览器端如果发送 Ajax请求


### 使用express框架 搭建服务器
- 我们先简单的看下代码 然后根据代码我们一一做解析, 后续在补充
- 1. 引入 express 框架
<!-- 
    const express = require('express');
 -->
- 2. 创建web服务器
<!-- 
    const app = express();
 -->

- 3. 创建路由规则
<!-- 
    app.get('/', (requset, response) => { ... })
 -->

- 4. 启动服务器, 监听对应的端口
<!-- 
    app.listen(端口, () => {
        console.log('端口监听中')
    })
 -->


### web服务器对象的方法
- const app = express();
- app是就web服务器的对象, 它有很多的方法

> 路由规则
- get的请求要创建get的路由规则
- post的请求要创建post的路由规则
- 路由规则可以写多条

> app.get('路径', callback)
- 创建 get请求对应的路由规则
- callback参数 request response

- request       是对请求报文的封装
- responese     是对响应报文的一个封装

- 参数1:
- 路径 ('/server')
<!-- 
    向服务器发送请求时, 如果url的路径(请求行的第二段内容)是/server的话, 这个时候就会执行 callback里面的代码, 并且由response做出相应 
    http://127.0.0.1:8000/server
-->

- 回调中的参数1 request
> requset.query()


- 回调中的参数2 responese
- 跟响应相关的方法, 是服务器端返回浏览器端的结果
> response.send()
- 回调中的参数 response.send() 方法可以发送响应
- send()方法中只能传递json 和 buffer
<!-- 
    response.send(`<h2>我是服务器返回的响应</h2>`)
 -->


> response.end()
- 跟send一样也是发送响应的方法, 但是它不会加特殊的响应头


> response.sendFile()
- 响应一个文件, 要写绝对路径
<!-- 
    响应一个页面 这个页面要写一个绝对路径
    response.sendFile(__dirname + '/index.html')
 -->


> response.setHeader()
- 设置响应头, 设置允许跨域
<!-- 
    response.setHeader('Access-Control-Allow-Origin', '*');
 -->

- 当浏览器端设置自定义响应头的时候 再添加下面的规则, 意思是所有类型的头信息都可以接收
- 当我们进行下面的设定后, 还不够 我们还要把 app.post('/server', (requset, response) => { ... });
- 中的post改成all
- 因为浏览器为了验证头信息可用不可用还会发一个 options 请求, 所以要改成all
<!-- 
    response.setHeader('Access-Control-Allow-Headers', '*');
 -->


> app.listen(端口号, callback)
- 启动服务器, 监听对应的端口
<!-- 
    app.listen(端口, () => {
        console.log('端口监听中')
    })
 -->



### 浏览器端发送Ajax请求的使用方法
> 1. 创建ajax对象
- xhr是在网络控制台的ALL标签旁边有个XHR 是对AJAX请求的一个筛选 所以使用这个变量名
<!-- 
    const xhr = new XMLHttpRequest();
 -->

> 2. 初始化 设置请求方法 和 URL
- 参数1:
- 请求的类型(GET / POST)

- 参数2:
- 请求地址(服务器端对应的路由请求地址)
<!-- 
    xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
 -->

> 3. 发送
- xhr.send()
- send()方法中只能放字符串或buffer

> 4. 处理服务器端返回的结果
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 300) {
                box.innerHTML = xhr.response;

                console.log(xhr.status); 
                console.log(xhr.statusText);
                console.log(xhr.getAllResponseHeaders());
                console.log(xhr.response);
            }
        } else {

        }
    }


### 浏览器端, Ajax对象的属性和方法
- const xhr = new XMLHttpRequest();
- xhr就是ajax对象

> xhr.open('GET', '路径');
- 设置请求方式和从哪请求数据的服务器地址
<!-- 
    xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
 -->

> xhr.setRequestHeader('请求头的名字', '请求头的值')
<!-- 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
-->
- Content-Type: 设置请求体内容的类型
- application/x-www-form-urlencoded: 设置的是 post参数查询字符串的类型
<!-- 
    xhr.send('a=100&b=200&c=300'); 它的类型
 -->

- 自定义头信息
- xhr.setRequestHeader('name', 'sam')
- 填写自定义请求头信息的时候会报错
<!-- 
    因为我们添加了 自己自定义的请求头 不是预定义 自定义的话 浏览器有安全机制 浏览器会告诉你 不能发console那里也有报错
 -->
- 解决办法:
- 在服务器端设置响应头信息
- response.setHeader('Access-Control-Allow-Headers', '*');
<!-- 
    *表示 所有类型的头信息我都可以接收
    
    上面做的还不够 我们还要把app.post('/server', .... 的post改成all 表示可以接收任意类型的请求
 -->

> xhr.responseType = 'json';
- 可以将服务器端返回的结果自动转换为普通对象
<!-- 
    const xhr = new XMLHttpRequest();

    设置响应体的数据类型 自动将json转换为对象
    xhr.responseType = 'json';
 -->

> xhr.timeout = 2000;
- 超时设置 2s之内还没有结果 请求就会被取消
<!-- 
    在network 的 status中 显示	(canceled) 并且变成红色
 -->

> xhr.ontimeout = function(){ ... };
- 超时回调
<!-- 
    xhr.ontimeout = function(){
        alert('网络异常，请稍后重试');
        //这是alert 有点不友好 真正的开发中我们可以用div 或者 遮罩层来显示
    };
 -->

> xhr.onerror = function() { ... }
- 网络异常回调
<!-- 
    xhr.onerror = function(){
        alert('您的网络视乎出现了一些问题');
    };
 -->       


> xhr.abort();
- 取消Ajax请求


> xhr.send()
- 使用这个方法发送请求

> xhr.onreadystatechange = function() {} 当ajax对象状态发生改变的时候

> xhr.readystate
- 是xhr对象中的属性 表示状态 它有5个值
<!-- 
    xhr.readystate === 0
    未初始化 最开始readystate属性的值就是 0

    xhr.readystate === 1
    open方法已经调用完毕

    xhr.readystate === 2
    send方法已经调用完毕

    xhr.readystate === 3
    服务端返回了部分的结果

    xhr.readystate === 4    只有在4的时候 处理服务器返回的结果 因为全部返回
    服务端返回了全部的结果
 -->

> xhr.status
- 响应状态码

> xhr.statusText
- 响应的状态字符串 OK

> xhr.response
- 响应体

> xhr.getAllResponseHeaders()
- 可以打印所有响应头

<!-- 
    处理服务端返回的结果 结果包含4部分 行 头 空行 体 也就是上面的4个
 -->


### 案例: 点击按钮 发送请求
- 把服务端返回的结果在div中做一个呈现

> ajax的两部分准备, 服务器端 和 浏览器端
> 服务器端:
- 使用express搭建服务器, 并配置路由规则

<!-- 
    服务器端:
    const express = require('express');
    const app = express();

    app.get('/server', (requset, response) => {
        const data = [
            {name:'sam', age:18},
            {name:'erin', age:17}
        ];
        let str = JSON.stringify(data);
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send(str);
    });

    app.listen(8000, () => {
        console.log('8000端口已开启');
    })


    浏览器端:
    btn.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://127.0.0.1:8000/server');
        xhr.send();
        xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {

            if(xhr.status >=200 && xhr.status < 300) {

            let data = JSON.parse(xhr.response);

            for(let item of data) {
                div.innerHTML += item.name + item.age;
            }

            console.log(xhr.status);
            console.log(xhr.statusText);
            console.log(xhr.getAllResponseHeaders());
            }
        }
        }
    });
 -->

------------------------------------

### 服务器端响应的数据格式
- 上面服务器端只是向客户端响应了一段文字, 在真是的项目中, 服务器端大多数情况下会以json对象作为响应数据的格式
- 当客户端拿到响应数据时, 要将json数据和html字符串进阶拼接, 然后将拼接的结果使用dom的方式响应在页面中

- 服务器端 给 浏览器端返回的数据类型 是 字符串型
- 在http请求与响应的过程中, 无论是请求参数还是响应内容, 如果是对象类型, 最终都会被转换为对象字符串进行传输

- 所以在客户端我们还需要将json字符串转换为json对象类型

> JSON.parse()
- 将客户端返回的json字符串 转换为 json对象

> 接下来我们看看服务器端 给 客户端返回数据如果处理
<!-- 
    服务器端
    const express = require('express');
    const path = require('path');
    const app = express();

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/responseData', (req, res) => {
        // 这里是服务器端, 准备给客户端发送一个json格式的数据
        res.send({"name":"张三"});
    })

    app.listen(3000);

    console.log('服务器启动成功');


    客户端
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:3000/responseData');
    xhr.send();
    xhr.onload = function() {
        // console.log(xhr.responseText, typeof xhr.responseText);
        // 服务器端返回的数据是字符串类型

        // 要使用JSON.parse()方法将json字符串转换为json对象
        let responseText = JSON.parse(xhr.responseText);
        console.log(responseText);

        // 在真实的项目中我们需要将得到的json数据 和 html 字符串拼接展现在html文件里
        let str = `<h2>${responseText.name}</h2>`;
        document.body.innerHTML = str;
    }
 -->

------------------------------------

### 使用Ajax发送请求如果传递参数
- 在传统的网站当中 请求的参数都是通过表单的形式传递的

- 根据请求方式的不同, 表单内容会变成请求参数自动被拼接到对应的位置中
    get参数     会被拼接到请求地址的后面
    post参数    会被放到请求体当中
    
- 无论是哪种格式都是请求名字=请求值的形式 多个参数之间用&进行分割
<!-- 
    http://www.example.com?username=zhangsan&password=123345
    根据请求方式的不同, 表单内容会变成请求参数自动被拼接到对应的位置中
-->

- 在ajax中我们需要自己拼接请求参数, 根据请求方式的不同将请求参数放到对应的位置中

> GET请求方式
- 对于get请求, 参数是放在请求地址后面的用 ? 进行分割
    xhr.open('get', 'http://www.example.com?name=zhangsan&age=20');

- 使用ajax发送请求 我们需要自己拼接请求参数
<!-- 
    我们获取到用户输入的数据后 要传递给服务器端, 所以要拼接成请求参数的格式
    username=123&age=456

    let params = `username=${nameValue}&age=${ageValue}`;
    xhr.open('get', 'http://localhost:3000/get?'+ params);
 -->

> 需求
- 在这个页面中我们准备两个文本输入框 分别输入姓名和年龄 点击按钮后发送ajax请求并且将用户输入的姓名和年龄发送到服务器端

- 服务器端:
    - 得到请求参数:     req.query
    - 发送响应到客户端  res.send
<!-- 
    客户端
    html部分:
    <input type="text" id='username'>
    <input type="text" id='age'>

    // 不是传统的form表单 所以不用使用submit
    <input type="button" value='Send' id='btn'>


    JS部分:
    let btn = document.querySelector('#btn');
    let username = document.querySelector('#username');
    let age = document.querySelector('#age');

    btn.addEventListener('click', function(){
        // 获取用户在文本框中输入的值
        let nameValue = username.value;
        let ageValue = age.value;

        // 我们获取到用户输入的数据后 要传递给服务器端, 所以要拼接成请求参数的格式
        // username=123&age=456

        let params = `username=${nameValue}&age=${ageValue}`;
        // console.log(params);

        // 当用户点击btn的时候 我们创建ajax对象发送请求
        // 创建ajax对象
        let xhr = new XMLHttpRequest();

        // 我们将拼接好的参数放在请求地址的后面
        xhr.open('get', 'http://localhost:3000/get?'+ params);

        xhr.send();
        xhr.onload = function() {
            console.log(xhr.responseText);
        }
    })


    服务器端
    const express = require('express');
    const path = require('path');
    const app = express();

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/get', (req, res) => {
        // 我们使用req对象来获取客户端发送过来的请求参数, req返回的是对象类型的值
        // req.query 可以得到请求的参数

        // 我们再把拿到的请求参数 响应给客户端
        res.send(req.query);
    })
    app.listen(3000);
    console.log('服务器启动成功');
 -->


> POST请求方式
- post的请求参数不是放在地址栏后面的, 而是要放在请求体中, 
- 很简单我们只需要将请求参数放到 xhr.send('请求参数')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send('name=zhangsan&age=20')

> get请求 和 post请求在传递参数的时候有个重要的区别

- post请求必须在请求报文中明确设置 请求参数内容的类型
    - (Content-Type)
- 对于参数名称 = 参数值 多个参数之间用 & 隔开
    - (application/x-www-form-urlencoded)   固定写法

> xhr.setRequestHeader()
- 设置请求报文的头部信息
    - 参数
    - 报文名称
    - 报文对应的值

<!-- 
    请求报文
    在http请求和响应的过程中传递的数据块就叫做报文, 包括要传送的数据和一些附加信息, 这些数据要遵守规定好的格式

    报文主要分为两个部分, 报文头 和 报文体
    报文头中存储的是键值对的信息 可以理解为客服端 向 服务器端说的一些话

    报文体主要存储一些内容 post的请求参数就是存储在报文体中的
 -->

------------------------------------

### Ajax请求中如果设置url的参数
- 在平时我们使用的时候都是在地址栏中去传参的 操作方式一样 也是在url的后面去缀参数
<!-- 
    xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
 -->

> get请求向服务器传递参数:
- 用 ？分割 + 参数名字 与 值
- a是参数的名字 100是值 如果有多个参数用 & 分割
- http://127.0.0.1:8000/server?a=100&b=200&c=300
<!-- 
    这时候重新刷新页面 在network中 名字不是server了 而是 server?a=100&b=200&c=300

    我们还可以点开 在Headers里 查看 Query String Parameter 里查看 里面如果是有 证明我们的内容已经发送成功
 -->

> post请求向服务器传递参数
- 参数要写在请求体中, 请求体要写在send()方法中
- xhr.send('a=100&b=200&c=300');
<!-- 我们以url参数形式为例 这样就能把数据传递给服务器了 -->

- post请求在传递参数的时候必须要设置请求头信息, 对请求参数的类型做解释
<!-- 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 -->

------------------------------------

### 浏览器端 请求头的设置
- 一般会把身份校验的信息放在头信息里面, 把它传递给服务器, 由服务器对参数做提取对用户的身份做校验

> xhr.setRequestHeader('请求头的名字', '请求头的值')
<!-- 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
-->
- Content-Type: 设置请求体内容的类型
- application/x-www-form-urlencoded: 设置的是 post参数查询字符串的类型
<!-- 
    xhr.send('a=100&b=200&c=300'); 它的类型
 -->

- 自定义请求头信息
- xhr.setRequestHeader('name', 'sam')
- 填写自定义请求头信息的时候会报错
<!-- 
    因为我们添加了 自己自定义的请求头 不是预定义 自定义的话 浏览器有安全机制 浏览器会告诉你 不能发console那里也有报错
 -->
- 解决办法:
- 在服务器端设置响应头信息
- response.setHeader('Access-Control-Allow-Headers', '*');
<!-- 
    *表示 所有类型的头信息我都可以接收
    
    上面做的还不够 我们还要把app.post('/server', .... 的post改成all 表示可以接收任意类型的请求
 -->


------------------------------------

### AJAX发送POST请求
<!-- 
    客户端:
    div.addEventListener('mouseenter', () => {
      const xhr = new XMLHttpRequest();
      xhr.open('post', 'http://127.0.0.1:8000/server');
      xhr.send();
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if(xhr.status >= 200 && xhr.status < 300) {
            div.innerHTML = xhr.response;
          }
        }
      }
    })


    服务器端:
    app.post('/server', (requset, response) => {
        const data = {"name":"sam"}
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send(data);
    });
 -->

------------------------------------

### AJAX中 服务器 响应JSON数据
- 在实际工作中 我们向服务端发送请求，服务端返回结果 实际上大部分都是JSON格式的数据 所以我们要知道结果怎么处理

- 如果转换服务器端返回的json
- 方式1:
- 通过 JSON.parse()
<!-- 
    let data = JSON.parse(xhr.response);
 -->

- 方式2:
- 调用xhr对象的responseType属性
- xhr.responseType = 'json';
<!-- 
    服务器端: 设置返回一个json对象
    app.get('/server', (requset, response) => {

        const data = {name:"sam"}
        
        response.setHeader('Access-Control-Allow-Origin', '*');

        // 因为send()方法中只能放字符串和buffer 所以要将对象转换为字符串
        let str = JSON.stringify(data)
        response.send(str);
    });


    浏览器端
    window.addEventListener('keydown', function() {
      const xhr = new XMLHttpRequest();

      // 方式2: 设置响应体的数据类型 自动将json转换为对象
      xhr.responseType = 'json';

      xhr.open('get', 'http://127.0.0.1:8000/server');
      xhr.send();
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if(xhr.status >= 200 & xhr.status < 300) {

            div.innerHTML = data.name;
          }
        }
      }
    })

 -->

------------------------------------

### nodemon 自动重启工具安装
- 当文件内容修改的时候，它能够帮我们去自动重启nodejs服务
- 先要确保没有node 在运行
- npm install -g nodemon

> 安装完毕后 再启动服务 要用 nodemon server.js
<!-- 
    无法加载文件
    1. 管理员身份打开powerShell
    2. 输入set-ExecutionPolicy RemoteSigned
 -->

------------------------------------

### AJAX IE浏览器的缓存问题
- ie浏览器会对AJAX的请求结果做一个缓存，把结果缓存起来，这样就会导致一个问题 下一次再去发送请求时，走的是本地缓存, 而并不是服务器返回的最新数据

- 这样对时效性比较长的场景 AJAX缓存会影响结果 不能正常去显示
- 数据一缓存就会导致正确的结果没办法呈现

- 解决方法:
> 在open()的url的最后添加 ?t='+Date.now() 

<!--   
    xhr.open('GET', 'http://127.0.0.1:8000/ie?t='+Date.now());

    Date.now() 是获取当前的时间戳
    这次点和下次点的时间戳肯定不一样 不一样的话浏览器就会认为是两次不同的请求 这时候它就会重新发一个新的请求而不是本地的缓存
 -->

------------------------------------

### AJAX请求超时 与 网络异常处理
- 我们的项目在上限后一定会出现网络异常的情况, 我们不能保证服务端永远及时快速的响应 所以肯定会遇到 请求超时 和 网络异常的情况

- 这时候 我们可以通过 对 AJAX 做一个超时的设置 给用户来一个提醒 并且在网络异常的时候也给客户来一个友好的提醒 产品体验会更好一些

- 需求:
- 这次我们做一个超时的设置, 超时设置为2秒, 如果两秒还是没有返回结果 我们就给用户做一个提醒
<!-- 
    btn.addEventListener('click', function(){
        const xhr = new XMLHttpRequest();

        // 超时设置  2s之内还没有结果 我们的请求就取消
        xhr.timeout = 2000;

        // 超时回调
        xhr.ontimeout = function(){
            alert('网络异常，请稍后重试');
            //这是alert 有点不友好 真正的开发中我们可以用div 或者 遮罩层来显示
        };

        // 网络异常回调
        xhr.onerror = function(){
            alert('您的网络视乎出现了一些问题');
        };

        xhr.open('GET', 'http://127.0.0.1:8000/delay');
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    result.innerHTML = xhr.response;
                }
            }
        };
    },false);
 -->

------------------------------------

### 取消请求
- 在请求的过程当中，在结果还没有回来之前，我们可以通过代码来吧请求取消掉
<!-- 上一节延时的超时 是时间到了后 自动把请求取消了  这次是手动取消 -->

> xhr.abort();
- 取消Ajax请求

<!-- 
    <button>点击发送</button>
    <button>点击取消</button>

    // 为了使xhr 这个变量在两个按钮中都能用到 我们提取出来
    let xhr = null;

     btns[0].onclick = function(){
        xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://127.0.0.1:8000/delay');
        xhr.send();
    };
    
    btns[1].onclick = function(){
        // 使用这个访求取消请求的发送
        xhr.abort();
    };
 -->

------------------------------------

### 请求重复发送的问题
- 比如上面的案例 我创建了按钮用来发送请求 每点击一次就会创建一个请求
- 有的时候服务响应的比较慢 用户疯狂的去点击  这时候服务器的压力就会有些大，接收到非常多的请求
- 而且是相同请求，用户频繁发请求 服务器频发去处理
<!-- 
    我们可以这么做，点击按钮后 看看之前有没有相同的请求 如果有 就把之前的请求取消掉 我们再发送一个新的请求, 这样我们发送的请求只会有一个
 -->

- 思路:
- 我们在外部定义一个变量, let isSending = false; 代表当前ajax没有发送请求
- 然后 我们考虑下 什么时候这个变量会为true, 当我们创建完ajax对象后就可以标识为true
<!-- 
    btn.addEventListener('click', function() {
        const xhr = new XMLHttpRequest();
        isSending = true;
    })
 -->

- 然后 什么时候这个变量会为false? 请求发送完成吧, 也就是在 xhr.readyState === 4 的时候 代码请求发送完成
<!-- 
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          
          // 这里将标识变量改为false
          isSending = false;

          if(xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.response);
          }
        }
      }
 -->

- 注意:
- 不在状态码里修改这个变量, 因为状态码内的判断是永远成功的 那就意味着我们没办法把这个变量修改为false 因为请求很可能是个失败的请求

- 目前我们的isSending已经可以成功标出是不是再发送AJAX请求, 既然我们已经用isSending标识出ajax的请求过程了, 那么就可以在按下按钮后进行判断 ajax是否正在发送 如果正在发送 则取消该请求创建一个新的请求
<!-- 
    let isSending = false;

    btn.addEventListener('click', function() {

      if (isSending) { xhr.abort(); }    

      const xhr = new XMLHttpRequest();

      isSending = true;

      xhr.open('get', 'http://127.0.0.1:8000/server');
      xhr.send();
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {

          isSending = false;

          if(xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.response);
          }
        }
      }
    })
 -->

------------------------------------

###  JQ发送AJAX请求
> $.get('服务器地址', {参数}, function(data) { ... }, 'json')
> $.post('服务器地址', {参数}, function(data) { ... }, 'json')
- 参数:
- 1. 给谁发
- 2. 发送什么参数 参数类型是一个对象
- 3. callback 回调中的参数data是响应体, 我们可以在这里会拿到的数据做操作
- 4. 响应体的类型 表示响应体是json格式的数据 这样服务端返回的json数据会自动转成普通对象的格式, 但是会报错为啥

> 注意:
- $.get()方法传递的参数在url上查看
- $.post()方法传递的参数在参数需要在 headers --- form data中查看

> 完整代码
<!-- 
    $('button').eq(0).click(function() {
      $.get('http://127.0.0.1:8000/jq-server', {a:100, b:100, c:200}, function(data) {
        console.log(data);
      })
    })

    $('button').eq(1).click(function() {
      $.post('http://127.0.0.1:8000/jq-server', {a:100, b:100, c:200}, function(data) {
        console.log(data);
      })
    })
 -->

> $.ajax({ ... })
- 参数是一个对象 通过属性来设置内部的参数
- url:      给谁发
- data:     发送参数
- type:     请求类型
- dataType: 响应体结果的设置
- success:  成功的回调 这里对响应体的结果做一个处理
- timeout:  超时时间
- error:    失败的回调
- headers:  设置自定义头信息
<!-- 
    $.ajax({
        url: 'http://127.0.0.1:8000/jq-server',
        data: { a: 100, b: 100, c: 200 },
        type: 'get',
        dataType: 'json',
        success: function(data) {
            console.log(data)
        },
        timeout:2000,
        error: function() {
            console.log('出错啦');
        },
        headers: {
            c:300,
            d:400
        }
    })
 -->

> 当报cookie的错误时
- crossorigin="anonymous"
<!-- 
    crossorigin="anonymous" 跨源的请求的属性设置 意思是 向后面的资源发送请求时 不会携带当前域名(cdn.bootcdn.net)下的cookie

    <script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
-->    




完结撒花！视频挺好的，我在23/24集遇到了问题。axios.get和axios.post设置了请求头，也在js文件中设置了响应头但是还是没有实现跨域请求，说一下解决方法：下载个插件，cnpm install cors --save,在js文件中，const cors=require(cors);app.use(cors()); 这样后不用设置响应头也能解决所有问题实现跨域。

------------------------------------

### Axios
- Axios是目前前端最热门的工具库, 它是AJAX的工具库，使用的频率特别的高 也是Vue和react推荐的 AJAX请求的工具包

> Axios的安装
- npm install axios

> CDN
<!-- 
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
 -->

> axios.get('服务器地址', {配置参数})
- 配置参数
- 1. params:    url参数, 格式是一个对象
- 2. headers:   自定义头信息

- 配置baseURL
- axios.defaults.baseRUL = 'http://127.0.0.1:8000'

- 对响应体的处理在then()方法中
<!-- 
    axios.get('/axios-server', {

        // url参数
        params: {
            id:100,
            vip:7
        },

        // 在这里对响应体进行处理
        }).then(value => {
            console.log(value)
        })
    })
 -->

> axios.post('服务器地址', {请求体参数}, {配置参数})
- post方法url参数 和 请求体可以同时设置
- 参数1: 服务器地址
- 参数2: 请求体
- 参数3: 其它配置

<!-- 
    axios.post('/axios-server', {
        // 请求体
        username: 'admin',
        password: 'admin'
      }, {
        // url参数
        params: {
          id:200,
          vip:9
        }
      }).then(value => {
        console.log(value);
      })
 -->

> axios({ ... })
<!-- 
    axios({
        // 请求方法
        method: 'post',

        // url
        url:'http://127.0.0.1:8000/axios-server',
        params: {
            vip:10
        },

        // 自定义头信息
        headers: {
            name: 'sam'
        },

        // 请求体参数
        data: {
            username: 'admin'
        }
    }).then(response => {
        console.log(response);
        console.log(response.status);
    })
 -->

------------------------------------

### axios
- 程序开发中离不开请求, 即使我们选择了第三方框架 我们也对这个第三方框架进行封装, 然后使用我们自己封装好的模块进行网络请求
<!-- 
  我们不会直接使用第三方框架, 因为有一天它可能不维护了 或者 出现了严重的bug
 -->

> 选择什么网络模块
- 1. 传统的ajax是基于XMLHttpRequest
<!-- 
  为什么不用它?
  - 配置和调用方式非常混乱
  - 编码起来看起来非常的蛋疼
  - 真是开发中是使用jQ-ajax
 -->

- 2. jQ-ajax
<!-- 
  为什么不用它
  - 相对于传统的ajax非常好用
  - 但是在Vue的整个开发中都是不需要使用jQ了
  - jQ是一个重量级的框架, 没必要为了使用jQ的ajax就引用一个如此大的框架
 -->

- 3. vue 1.x版本的时候 官方退出了vue-resource
<!-- 
  为什么不选择它
  在vue2.0推出后, vue作者就在github的issues中说了去掉vue-resource并且以后不会更新
 -->

- 总结
- 之后我们会对axios来进行封装并做深入的了解

> jsonp 的封装
- 在前端开发中 我们一种常见的网络请求方式就是jsonp, 使用jsonp最主要的原因万网是为了解决跨域访问的问题

- jsonp的原理
- jsonp的核心在于通过<script>标签的src来帮助我们请求数据
- 原因是我们的项目部署在domain1.com服务器上时, 是不能直接访问domain2.com服务器上的资料的
- 这个时候我们利用<script>标签的src帮助我们去服务器请求到数据, 将数据当做一个js的函数来执行, 并且执行的过程中传入我们需要的json

- 所以 封装jsonp的核心就在于我们监听window上的jsonp进行回调时的名称
<!-- 
  封装 jsonp
  let count = 1;
  export default function originPJSONP(option) {
    // 1 从传入的option中提取url
    const url = option.url;

    // 2 在body中添加script标签
    const body = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');

    // 3 内部生产一个不重复的callback
    const callback = 'jsonp' + count++

    // 4 监听window上的jsonp的调用
    return new Promise((resolve, reject) => {
      try {
        window[callback] = function(result) {
          body.removeChild(script)
          resolve(result)
        }
        const params = handleParam(option.data);
        script.src = url + '?callback=' + callback + params;
        body.appendChild(script)
      } catch (err) {
        body.removeChild(script)
        reject(err)
      }
    })
  }

  function handleParam(data) {
    let url = ''
    for(let key in data) {
      let value = data[key] !== undefined ? data[key] :''
      url += `&${key}=${encodeURIComponent(value)}`
    }
    return url
  }
 -->


> axios (ajax i/o system ? )
- 功能特点
- 在浏览器中发送 XMLHttpRequests 请求
- 在node.js中发送http请求
<!-- 
  node是一个环境 比如jQ就不能在node中使用 但是axios就可以
 -->
- 支持 promise api
- 拦截请求和响应
- 转换请求和响应数据
- 等等

--------------------------

### axios 框架的基本使用
- 这个框架支持多种请求方式
- axios(config)             通用
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])


> axios的使用
- httpbin.org
- 用于模拟网络请求的网站
<!-- 
  老师搭建的服务器
  http://123.207.32.32:8000/home/multidata
  http://123.207.32.32:8000/home/data?type=sell@page=1
  http://123.207.32.32:8000/home/data
 -->
- 如果不指定请求方式, 默认的情况下就是 GET 请求

- 1. 安装 axios 框架
- npm i axios --save
<!-- 
  视频里是0.18.0
 -->

- 2. 在哪个文件里发送axios请求都可以 视频里是在main.js文件中
  - 2.1 在文件中引入
  - import axios from 'axios';

  - 2.2 在文件中使用
  - axios({ ... })
<!-- 
  // axios 最简单的使用过程

  axios({
    url:'http://123.207.32.32:8000/home/multidata',
    // 请求方式
    method: '',

    // 参数
    // 或者在url属性的后面拼接 http://123.207.32.32:8000/home/data?type=sell@page=1 参数
    params: {
      type: 'pop',
      page: 1
    },


  // 成功的结果通过 then 方法取得
  }).then(res => {
    console.log(res);
  })

  axios支持promise 所以不用像jQ那样 在{config}中写 success: function 
  而是直接axios().then() 
  
  axios会返回一个promise 内部会执行resolve 所以我们可以使用then
-->

> 发送get请求的演示
- 下面的代码抄写的屏幕
<!-- 
  // 引入 axios
  import axios from 'axios';

  export default {
    name: 'app',

    // 为什么这里没有跨域的问题?
    // 1. 没有请求参数
    axios.get('http://123.207.32.32:8000/category')
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

    // 2. 有请求参数
    axios.get('http://123.207.32.32:8000/home/data', {params:{type:'sell', page: 1}})
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }
 -->

--------------------------

### axios 发送并发请求
- axios提供如果想发送多个并发请求, 想让这两个请求都成功之后再做响应处理的话, axios提供了api

> axios.all()
- 参数
- 传递一个数组 axios.all([请求1, 请求2]).then(成功的结果)
<!-- 
  then() 中会拿到多个请求的结果 当多个请求都成功的时候会到then()方法里面 results(请求成功返回的数据) 是一个数组[{}, {}]
 -->

<!-- 
  axios.all([
    // 请求1
    axios({
      url:'http://123.207.32.32:8000/home/multidata'
    }),

    // 请求2
    axios({
      url:'http://123.207.32.32:8000/home/data',
      params: {
        type: 'sell',
        page: 5
      }
    })

  // 成功的部分
  ]).then(results => {

    // 这里会拿到多个请求的结果 当多个请求都成功的时候会到then()方法里面 results 是一个数组[{}, {}]
    console.log(results)
    console.log(results[0])
    console.log(results[1])
  })

 -->


> then(axios.spread((请求结果1, 请求结果2, ...) => { ... }))
- 上面我们是通过result[0] 通过下标的方式去读请求回来的数据的结果
- axios直接给我们提供了直接获取请求结果的api
<!-- 
  axios.all([
    axios({
      url:'http://123.207.32.32:8000/home/multidata'
    }),
    axios({
      url:'http://123.207.32.32:8000/home/data',
      params: {
        type: 'sell',
        page: 5
      }
    })
  ]).then(axios.spread((res1, res2) => {

    // 直接获取的数据 不用通过下标的方式
    console.log(res1);
    console.log(res2);
  }))
 -->

--------------------------

### axios 的配置信息相关
- 在上面的示例中, 我们的baseURL都是固定的, 事实上, 在开发中可能很多参数都是固定的, 这个时候我们可以进行一些抽取 也可以利用axios的全局配置
<!-- 
  baseURL: 123.207.32.32:8000

  比如固定的请求头的信息
  Content-Type : application/x-www-form-urlencoded

  比如超时时间, 5秒没有响应就超时了 等等

  这样如果有请多的请求, 那么每个请求中都有 baseURL timeout header 等代码就重复了 这时我们就可以进行全局配置
 -->

> axios.defaults 配置axios的全局属性
- 我们可以将所有请求的公共部分, 放在 axios.default 中, 给它添加属性就是配置全局属性
- 写在哪都可以
<!-- 
  axios.defaults.baseURL = '123.207.32.32:8000'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  axios.defaults.timeout = 5;   // 单位是毫秒 5000是 5秒
 -->

<!-- 
  axios.defaults.baseURL = 'http://123.207.32.32:8000';
  axios.defaults.timeout = 5;

  axios.all([
    axios({
      // 因为我们配置了 baseURL 所以这里我们直接写接口
      url:'/home/multidata'
    }),
    axios({
      url:'/home/data',
      params: {
        type: 'sell',
        page: 5
      }
    })
  ]).then(axios.spread((res1, res2) => {
    console.log(res1);
    console.log(res2);
  }))
 -->


> 常见的配置选项
- 请求地址
  - url: '/user'

- 请求类型
  - method: 'GET'

- 请根路径
  - baseURL: 'http://www.mt.com'

- 请求前的数据处理
  - transformRequest:[function(data){}]

- 请求后的数据处理
  - transformResponse:[function(data){}]

- 自定义请求头
  - headers: {'x-Requested-With' : 'XMLHttpRequest'}

- URL查询对象
  - params: {id:12}

---

- 查询对象序列化函数
  - paramsSerializer: function(params) {}

- 请求体 request body
  - data: {key:'aa'}    

- 超时设置s
  - timeout: 1000

- 跨域是否带Token
  - withCredentials: false

- 自定义请求处理
  - adapter: function(resolve, reject, config) { }

- 身份验证信息
  - auth: {uname: '', pwd: '12'}

- 响应的数据格式 json / blob / document / arraybuffer / text / stream
  - responseType: 'json'

<!-- 
  要点:
  method: "GET"
  params: { id: 1 }

  method: "POST"
  data: { key: ''}

  当提交请求的方式是get的时候  提交参数要用params
  当提交请求的方式是post的时候 提交参数要用data
 -->

--------------------------

### axios 的实例
- 上面我们了解了 axios.defaults 的方式给axios发送请求的时候配置全局的公共部分

- 为什么要创建axios的实例呢?
- 当我们从axios模块中导入对象时, 使用的实例是默认的实例
- 当给该实例设置一些默认配置时, 这些配置就被固定下来了
- 但是后续开发中, 某些配置可能会不太一样
- 比如某些请求需要使用特定的baseURL或者timeout或者content-type等
<!-- 但是有些情况会有 baseURL 不一样, timeout 也不一样的情况 -->

- 这个时候, 我们就可以创建新的实例, 并且传入属于该实例的配置信息


> 插个服务器的概念:
- 服务器有一个概念叫做分步式, 服务器在部署的时候, 当它的并发量(同时请求的数量)特别的高的情况下, 服务器可能就不能满足整个的业务需求, 同时有很多用户向服务器发送请求的时候, 服务器可能会处理不过来

- 当业务量特别的大的时候, 我们会搞很多个服务器, 那么这三个服务器的ip地址就会不一样
<!-- 
  服务器A   首页请求的服务器
  服务器B   类型请求的服务器
  服务器C   其它的东西的服务器
 -->

<!-- 
  客户端A                       服务器A

  客户端B     反向代理服务器     服务器B
              nginx部署
  客户端C                       服务器C

  客户端不管有多少客户面对的都是一个反向代理服务器
  nginx会根据哪一个服务器目前请求量不是很多, 来判断去哪一个服务器请求数据
 -->


- 假设 我们首页数据 我们要向 服务器A请求, 分类要向服务器B请求... 那么客户端就会有不同的ip地址
<!-- 
  事实上不多, 事实上是上面我们了解的反向代理服务器的概念
 -->

- 这个时候我们使用 axios.defaults 设置全局的baseURL就不合适了 
- 所以一般我们使用axios发送请求的时候 不会直接使用全局配置来进行网络请求, 而是先创建axios的实例


> axios的真正的使用方式
- 前置步骤
- 下载 和 引入

- 1. 创建 axios 实例  通过 axios.create() 创建
<!-- 
  const instance1 = axios.create({ 
    
    实例中配置 公共的配置
    比如
    baseURL
    timeout
    请求头信息等

  });
 -->

- 2. 通过 intance1({ ... }) 代替 axios({ ... }) 创建 请求
<!-- 
  之前我们发送请求都是
  axios({})

  现在我们是通过创建的实例发送
  instance1({})
 -->

<!-- 
  // 创建 axios 实例 并在实例中配置公共配置
  const instance1 = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });

  // 使用实例对象 发送请求
  instance1({
    url:'/home/multidata'
  }).then(res => {
    console.log(res);
  })


  // 使用同一个实例对象 发送请求
  instance1({
    url: '/home/data',
    params: {
      type: 'pop',
      page: 1
    }
  }).then(res => {
    console.log(res);
  })


  // 创建新的实例, 在实例中填写新的 公共配置
  const instance2 = axios.create({
    baseURL: 'http://222.111.32.32:5000',
    timeout: 10000,
    headers: ...
  });

  ... 

  这样的话 每一个实例都会有自己独立的配置
 -->

- 以后在开发的过程中不要如下操作
- 我们在组件中引入了axios模块, 然后分别在script中发送了请求, 并展示在页面上
- 当有多个组件并且都使用下面的方式发送请求的时候, 这样多个组件对第三方模块的依赖性太强了

- 问题是如果有一天axios这个框架不再维护了 那就懵逼了, 所以只有我们在进行开发的时候如有我们依赖了第三方的东西, 千万不要在每一个组件里面都对这个第三方的东西进行依赖
<!-- 
  比如 我们在 app.vue 文件中要发送网络请求, 很多同学就会这样
  import axios from 'axios'

  <template>
    <div id='app'>

      // 将保存早data中的数据在页面中进行展示
      <div> {{result}} </div>

    </div>
  </template>

  export default {
    name:'App',
    data() {
      return {
        result: ''
      }
    }
    // 在组件被创建的时候发送网络请求
    created() {
      axios({
        url: 'http://123.207.32.32:8000/home/multidata'
      }).then(res=> {
        
        // 将我们取到的结果 保存在data中
        this.result = res
      })
    }
  }
 -->

- 我们应该这样
<!--    
                        axios     →       新的框架

                  对axios进行自己的封装

            ↙     ↙       ↓     ↘      ↘

      组件1     组件2     组件3     组件4     组件5


  假如我们很多组件都需要依赖于axios进行依赖发送请求, 我们应该单独的创建一个文件之后所有的组件在做网络请求的时候都是面向 我们自己封装的文件

  而之后我们单独创建的文件在根据axios进行一个封装 如果有一天axios不维护了那么我只需要改 我们封装的文件就可以了

  以后再遇到第三方框架的时候都要用这种逻辑来使用
 -->


> 对 axios 进行封装
- 1. 在src中创建 network 文件夹 创建 request.js 文件
<!-- 
  也就是说其他组件在发送网络请求的时候 面向 request.js 文件就可以了
  导出这个文件的时候 使用

  export function request() { ... }

  这样以后再有别的实例 还可以继续导出

  export function request1() { ... }
  export function request2() { ... }
 -->

- 2. 方式1
- request.js中 通过回调的方式 将请求的结果 和 错误对象 回调回去
<!-- 
  export function request(config, success, failure) {

    // 创建 axios 实例 实例中写上公共配置
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    // 别人传递进来的config要传到实例里面才能进行网络请求 所以
    instance(config)
      .then(res => {

        // 通过success函数 将成功的结果回调出去
        success(res);
      })
      .catch(err => {

        // 通过failure函数 将失败的结果回调出去
        failure(err);
      })
  }


  // 组件中在使用的时候
  request({
    url: 'home/multidata'

    // success回调函数
  }, res => {
    // 这里可以打印 或者将结果保存在组件的data中
    console.log(res);

    // failure回调函数
  }, err => {

    // 这里就是请求失败的错误对象err是axios回调出来的
    console.log(err)
  })
 -->

- 2. 方式2
- 调用者在传递参数的时候, 参数内部必须有 baseConfig, success, failure
- 相当于 组件在使用的时候 request({}) 中的{}就是config
<!-- 
  config对象里面有
  {
    baseConfig: {
      配置
    },
    success: function() { ... }
    failure: function() { ... }
  }
 -->

<!-- 
  export function request(config) {

    // 创建实例
    const instance = axios.create({
      url: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    instance(config.baseConfig)
      .then(res => {
        config.success(res);
      })
      .catch(err => {
        config.failure(err);
      })
  }


  // 组件中在使用的时候
  request({
    baseConfig: {
      url:'/home/data'
    },
    success: function(res) {
      console.log(res)
    },
    failure: function(err) {
      console.log(err)
    }
  })
 -->


> 最终方案过渡 promise
- 使用promise
<!-- 
  // request.js

  export function request(config) {
    return new Promise((resolve, reject) => {
      // 网络请求都是异步操作 我们把它放到这里
        const instance = axios.create({
          baseURL: 'http://123.207.32.32:8000',
          timeout: 5000
        })

        instance(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }


  // 组件中调用
  request({
    url: '/home/data'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
 -->

> 最终方案
- axios 通过 axios.create() 创建的对象本身就是promise对象 所以没有return new Promise
<!-- 
  export function request(config) {
    // 网络请求都是异步操作 我们把它放到这里
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    // 这个实例本身返回的就是promise 所以组件中可以通过then catch拿到结果
    return instance(config)
  }


  // 组件中调用
  request({
    url: '/home/data'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
 -->

--------------------------

### axios 拦截器的使用
- 在发送网络请求之前希望对某些请求做一些拦截, 比如拼接上一些东西或者查看是否携带了一些东西 在发送网络请求之前增加动画啦

- axios提交了拦截器, 用于我们在发送每次请求或者得到响应后, 进行对应的处理
<!-- 
  请求成功 和 请求失败 的拦截
  instance.interceptors.request.use(config => {
    console.log('来到了request拦截success中')
    return config
  }, err => {
    console.log('来到了request拦截failure中')
    return err
  })


  响应成功 和 响应失败 的拦截
  instance.interceptors.response.use(response => {
     console.log('来熬了response拦截success中')
     return response.data
   }. err => {
     console.log('来到了response拦截failure中')
     return err
   })
 -->

> axios.interceptors.request  -- 拦截全局axios的请求(成功和失败)
> axios.interceptors.response -- 拦截全局axios的响应(成功和失败)
- 上面都是拦截的全局axios 还可以拦截axios创建的实例
<!-- 
  const instance = axios.create({

    // 还可以拦截实例
    instance.interceptors.request
    instance.interceptors.response
  })
 -->

> 实例 / 全局.interceptors.request.use() 
> 实例 / 全局.interceptors.response.use() 
- 参数
- 是两个函数, 一个请求 / 响应 成功的函数 一个请求 / 响应 失败的函数
- 请求拦截中的参数是 config 拦截的是请求体(配置信息 比如 url method等)
- 响应拦截中的参数是 res 拦截的是响应体(status data headers request等)
<!-- 
  export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 使用拦截器拦截实例, 请求拦截
  instance.interceptors.request.use(config => {

    // 拦截的是axios发送请求的配置
    console.log(config)
    // 拦截到的config的return出去 要不内部的config外部拿不到

    // 一般请求拦截会在这里处理什么逻辑
    1. 比如config中的信息不符合服务器的要求 比如会config中的东西进行某种变化后再返回回去

    2. 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标(请求时的加载动画), 每次在发送请求的时候将动画show出来, 然后响应数据的时候 再去响应拦截里面隐藏起来

    3. 某些网络请求(比如登录 token), 必须携带一些特殊的信息 

    return config

  }, err => {

    // 发送都没发送出去, 比如网络断掉了
    console.log(err)
  })


  // 使用拦截器进行响应的拦截
  instance.interceptors.response.use(res => {
    console.log(res)
    // res中里面有data, 我们真正有用的就是data 我们会从res中取出data
    
    // 在这里一样 我们做完处理完拦截响应的逻辑后 要将res.data返回出去 要不组件中得不到结果 返回data就可以
    return res.data

  }, err => {
    console.log(err)
  })

  // 发送真正的网络请求
  return instance(config)
}
 -->

> 请求拦截的作用
- 一般请求拦截中会处理什么逻辑
- 1. 比如config中的信息不符合服务器的要求 比如会config中的东西进行某种变化后再返回回去

- 2. 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标(请求时的加载动画), 每次在发送请求的时候将动画show出来, 然后响应数据的时候 再去响应拦截里面隐藏起来

- 3. 某些网络请求(比如登录 token), 必须携带一些特殊的信息 

------------------------------------

### Axios入门和安装
- axios.js是一个基于promise的HTTP库, 支持浏览器和node环境, 说明白点, 就是使用这个库来执行ajax请求, 获取json数据, 我们可以利用axios可以发送get post等一系列请求, 然后得到数据

> 安装
- npm i axios

- 如果要在浏览器使用, 我们可以直接使用cdn地址加载即可
<!-- 
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 -->

> 基本使用方式
- 浏览器执行远程Ajax请求会有跨域的问题, 我们可以保存到本地执行即可
- 老师提供了两个可以接收请求的url 
- https://cdn.liyanhui.com/data.json  (可跨域, 设置过)
- https://cdn.ycku.com/data.json      (不可跨域, 默认)

> axios基于promise所以在then中取得结果
<!-- 
  axios.get('https://cdn.liyanhui.com/data.json').then(res => {
    // console.log(res)

    // data属性中才是数据
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })


  // 浏览器端可以这样
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    // 可以获取到数据 https://cdn.liyanhui.com/data.json 已设置过跨域
    axios.get('https://cdn.liyanhui.com/data.json').then(res => {
      // data属性中才是数据
      console.log(res.data)
    })
  </script>
 -->



### axios配置和并发
- 上面我们通过axios进行异步通信, 使用了服务器端设置解决跨域
- 有时, 我们需要在url地址配置参数进行数据筛选(这里单纯json)

- 官方网址
- http://www.axios-js.com/zh-cn/docs/#axios-config

> 配置 options
- 在axios.get(url, {options}) 第二个参数里面配置信息

- 1. 配置参数
<!--  
  axios.get('https://cdn.liyanhui.com/data.json', {
      params: {
        id:1,
        status: 5
      }
    })
      .then(res => {
        // data属性中才是数据
        console.log(res.data)
      })
 -->

- 2. 都以配置信息来操作
<!-- 
  axios({
    method: 'get',
    url: 'https://cdn.liyanhui.com/data.json',
    params: {
      id:1,
      status: 5
    }
  })
  .then(res => {
    console.log(res.data)
  })
 -->


> 并发操作 axios.all([请求1, 请求2]).then()
- 如果项目中可能会产生多个异步请求, 正常它们会根据耗时长短来执行
- 谁先执行完毕(哪个返回数据快) 谁先打印

- 我们如果想让所有的异步请求后, 按照指定的顺序进行执行, 使用all方法
- 并在最后.then中取值就是所有结果按顺序的打印
<!-- 
  axios.all([
    axios({
      url: 'https://cdn.liyanhui.com/data.json?id=1',
    }),

    axios({
      url: 'https://cdn.liyanhui.com/data.json?id=2',
    }),

    axios({
      url: 'https://cdn.liyanhui.com/data.json?id=3',
    })
  ]).then(res => {
    console.log(res);
  })
 -->

- 上述我们在then一共获取到了3个结果, 我们要是想要输出3个结果可以选择遍历
<!-- 
  .then(value => {
    for(let i=0; i<value.length; i++) {
      console.log(vaue[i].config.data)
    }
  })
 -->

> axios.spread()
- 我们在then中获取所有的返回结果的时候 遍历的方式有点复杂 我们还可以通过axios.spread(回调)
<!-- 
  .then(axios.spread(res1, res2, res3) => {
    console.log(res1.config.data)
    console.log(res2.config.data)
    console.log(res3.config.data)
  })
 -->


### axios实例化 和 拦截
- 我们可以把公共的url抽取出来

> axios.defaults.baseURL = 'url'
- 我们可以把重复的网址抽取出来 后面还可以利用url拼接不同的网址
- 也就是说 baseURL + url 是最终的整体
<!-- 
  axios.defaults.baseURL = 'https://cdn.liyanhui.com'

  axios.all([
    axios({
      url:'/data.json',
      data: '1.异步'
    }),
  ])

  最终是 'https://cdn.liyanhui.com/data.json'
 -->


> 实例化
> let name = axios.create() 创建一个实例
- 顾名思义就是new出来一个对象, 这样这个对象具有独立性不被干扰
- axios里面封装了实例化的方法, 并不需要我们自己去new
<!-- 
  // 实例化 myAxios对象
  const myAxios = axios.create()
  myAxios.defaults.baseURL = 'https://cdn.liyanhui.com'

  myAxios({
    method: 'get',
    url:'/data.json',
  }).then(res => {
    console.log(res.data)
  })

 -->



### 拦截操作
- 所谓的拦截操作, 就是在ajax获取数据之前 先拦截处理一些事物的操作
- 这些操作包括, 修改axios配置信息, loading 判断验证跳转等等
- 拦截处理完毕之后, 再通过return返回基础处理即可
<!-- 
  // 添加请求拦截
  myAxios.interceptors.request.use(config => {
    console.log('loading')
    return config
  })
 -->

> 全部代码
<!-- 
  // 实例化 myAxios对象
  const myAxios = axios.create()
  myAxios.defaults.baseURL = 'https://cdn.liyanhui.com'

  // 请求拦截
  myAxios.interceptors.request.use(config => {
    // loading加载动画
    console.log('loading...')

    // 还可以修改配置
    config.url = 'data2.json',
    // 还可以修改超时时间
    config.timeout = 500

    // axios会返回promise对象 后面会继续用 我们把它返回出去
    return config
  })


  // 响应拦截
  myAxios.interceptors.response.use(response => {

    // 我们再这里可以对响应结果 进行修改 处理 过滤 然后再返回给下面继续操作
    
    // 也是要将响应结果返回出去
    return response
  })

  myAxios({
    method: 'get',
    url:'/data.json',
  }).then(res => {
    console.log(res.data)
  })
 -->



### Mock 拦截 axios 请求
- 这个也是最终的需求功能, 我们假设axios异步请求的数据尚未上线或者不全
<!-- 
  我们请求的路径可能会报错 或者没有数据等 这种时候我们可以使用mock将请求拦截掉
 -->
- 然后再通过mock请求拦截, 随机生成填充的数据进行前端设计

> Mock.mock('拦截的url', {mock的配置参数})


> 使用方式
<!-- 
   // 使用ajax获取数据
    axios({
      method: 'get',
      url: 'https://cdn.liyanhui.com/data.json',
    }).then(res => {
      console.log(res)
      // console.log(res.data.list[0].id)
    })

    // mock拦截
    // Mock.mock('拦截的请求地址', {配置对象})
    Mock.mock('https://cdn.liyanhui.com/data.json', {
      'list|5-10': [
        {
          'id|+1': 1,
          'username': '@cname',
          'email': '@email',
          'price': '@integer',
          'gender': '@boolean'
        }
      ]
    })
 -->


> 总结
- axios返回的res有data, status, statusText, headers, config等属性名, data是数据
- 所以一般我们要获取响应结果的数据的时候一般都是res.data

- 我们使用mock创建的数据 list是一个数组, 数组中有一个个的对象
<!-- 
  console.log(res.data.list[0].id)
 -->

------------------------------------

### 使用fetch()函数来发送AJAX请求
- fetch()是属于全局对象的 可以直接去调用返回的结果是一个promise对象
- 响应的结果在then()方法中获取

> fetch(参数1, 参数2)
- 参数
- 1. 是一个请求资源的服务器地址 或者 是一个request对象
<!-- request处于实验阶段我们传递url就可以 -->

- 2. 一个配置对象, 包括所有对请求的设置
- method:   请求方法
- headers:  自定义请求头
- body:     请求体
<!-- 
    键值类型可以写 查询字符串, 表单, buffer等等很灵活 
 -->
<!-- 
    fetch('http://127.0.0.1:8000/fetch-server', {
        // 请求方法
        method: 'post',

        // 自定义请求头
        headers: {
          name: 'sam'
        },

        // 请求体, 键值类型可以写 查询字符串, 表单, buffer, 
        body: 'username=admin&password=admin'

    }).then(response => {
        return response.text();

        // 如果服务器返回的结果是json 就调用json的方法, 把服务器端返回的对象转成普通对象
        return response.json();

    }).then(response => {
        console.log(response)
    })
 -->

------------------------------------

### 跨域
- 同源策略 是浏览器的一种安全策略
- 同源： 协议，域名 端口号 必须完全相同
<!-- 
    当前网页的url 和 AJAX请求的目标资源的url 两者之间 协议，域名 端口号 必须完全相同

    上面才是满足同源策略的 AJAX是默认遵循同源策略的 不满足同源策略是没办法发送AJAX请求的

    比如我当前网页的url是        我服务器的url也必须是
    http://a.com:8000           http://a.com:8000

    同源指的是同一个来源，网页资源也是从某一个服务来的 比如百度京东 它们也是来自于某个服务器的
 -->

- 跨域： 违背同源策略就是跨域
<!-- 
    比如 a.com 向 b.com 发请求，8000端口 向 3000端口 去发请求 也是跨域
    在项目中经常出现，因为单台服务器它的服务是有上限的 它性能是有瓶颈的 这时候要加入更多的计算机 加更多的服务器

    那服务器以增加 我们这块 就会形成跨域  我们加了新的服务器后 可以对这些服务做一个划分, 使整个项目更流畅
 -->

- 但是AJAX在发送请求时 默认是要遵循同源策略的, 也就是说 不是同源没办发AJAX请求

> 同源策略的演示
- 我们看个小案例 首先我们从服务器端响应一个页面 点击页面中的按钮, 我们向127.0.0.1/9000 端口发送请求, 同时这个页面也是从 127.0.0.1/9000 端口, 响应回来的, 这就是同源

- 当处于同源的时候我们可以直接发送ajax请求, 说白了就是来自于同一个服务

<!-- 
    服务器端:
    const express = require('express');
    const app = express();

    app.get('/home', (request, response) => {
        // 响应一个页面 这个页面要写一个绝对路径
        response.sendFile(__dirname + '/index.html')
    })

    app.get('/data', (request, response) => {
        response.send('用户数据')
    })

    app.listen(9000, () => {
        console.log('9000端口已打开')
    })


    HTML页面:
    btn.addEventListener('click', function() {
      const xhr = new XMLHttpRequest();

      // 当满足同源策略的情况下url可以简写
      xhr.open('get', '/data');

      xhr.send();

      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if(xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.response);
          }
        }
      }
    })
 -->


### 跨越的第一个解决方案
> JSONP  --> get
- 是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来的，只支持get请求

- JSON怎么工作的？
- 它是借助于页面的<script>跨域的
<!-- 
    在网页有一些标签 天生具有跨域的能力，比如 img link iframe script
    JSONP就是利用script标签的跨域能力发送请求的
 -->

- 简单的解释下跨域
- 比如 A网页的 网址是 file:///D:/Memo/Sam/5_Learning_Content/AJAX/index.html
- 能看出 file 协议
- 我们向127.0.0.1:9000端口发请求就是一个跨域请求, 因为协议 域名 端口都不一样


> JSONP的使用
- 既然 <script> 本身就带有跨域的特性, 那么我们就可以利用 <script src='服务器地址'> 去发送请求, 但是<script>要求的结果必须是函数调用的内容(一段js代码)
- 这样我前端浏览器才能解析执行里面的内容

- 原理 返回函数调用, 发想返回的数据作为实参放在函数调用里面 让前端的函数去做一个处理

<!-- 
    HTML页面:
    <body>

    // src中传入 服务器地址
    <script src='http://127.0.0.1:9000/jsonp-server'></script>
    </body>

    服务器端:
    const express = require('express');
    const app = express();

    app.all('/jsonp-server', (request, response) => {

        // 返回的响应是一段函数
        response.send('console.log("jsonp")')
    })

    app.listen(9000, () => {
        console.log('9000端口已打开')
    })

    // 结果是可以拿到响应的
 -->

> 我们接下来把上面的例子 返回个json
- 返回的响应体结果是一个 fn({"name":"sam"})
- 而函数的实参就是想给客户端的结果数据
- 但是在div上呈现的是 sam
<!-- 
    HTML页面:
    <div class="box"></div> 
    <script>

        // 处理数据 提前声明 不然会报错
        function fn(data) {
            const div = document.querySelector('.box');
            div.innerHTML = data.name
        }
    </script>
    <script src='http://127.0.0.1:9000/jsonp-server'></script>


    服务器端:
    app.all('/jsonp-server', (request, response) => {
        const data = {
            name: 'sam'
        };

        let str = JSON.stringify(data);
        // 这里不能直接返回数据, 因为直接返回数据没办法进行处理
        response.end(`fn(${str})`)
    })
 -->

> 解释说明的具体步骤
- 1. 创建<script>, 在里面定义好函数, 用来处理对服务端的发送的函数调用
- 2. 创建另一个<script src='请求数据的服务器地址'>, 注意要放在上面<scripte>的下面
<!-- 这个标签可以动态创建 -->
<!--
    <script>
        // 处理数据的函数 需要在上面提前声明 不然会报错
        function fn(data) {
            const div = document.querySelector('.box');
            div.innerHTML = data.name
        }
    </script>
    <script src='http://127.0.0.1:9000/jsonp-server'></script>
-->

- 3. 在服务器端response.end()中调用函数, 并将数据放作为实参传进去
<!-- 
    app.all('/jsonp-server', (request, response) => {
        const data = {
            name: 'sam'
        };
        let str = JSON.stringify(data);

        // 这里不能直接返回数据, 因为直接返回数据没办法进行处理, 所以要写一个函数调用
        response.end(`fn(${str})`)
    })
 -->

------------------------------------

### 案例: 原生jsonp的实现
- 在表单中输入文字, 当失去焦点的时候向服务端发送请求, 对用户名做一个是否存在的检测(我们服务端直接返回一个已存在 不进行比对), 然后把input框的颜色变成红色

> 实现jsonp的具体步骤
- 1. 在全局中定义处理服务器端返回的数据的函数
<!--    
    // 在全局中声明 处理服务端返回的结果的函数
    function fn(data) {
      inp.style.background = 'pink';
      span.innerHTML = data.msg;
    }
 -->

- 2. 我们拿失去焦点触发事件为例, 在事件回调 记入重点
    - 2.1 动态创建script标签
    - 2.2 script.src = '服务器请求地址'
    - 2.3 将script标签插入body的最后 appendChild()

- 3. 服务器端, 将响应的数据通过 response.end()方法 发送回来 内容是1中的函数调用, 把返回数据放在实参里面
<!-- 
    服务器端:
    app.all('/server', (request, response) => {
        const data = {
            exist: 1,
            msg: '用户名已经存在'
        }
        let str = JSON.stringify(data)
        response.end(`fn(${str})`)
    })


    浏览器端:
    let span = document.querySelector('span');
    let inp = document.querySelector('input');

    // 在全局中声明 处理服务端返回的结果的函数
    function fn(data) {
      inp.style.background = 'pink';
      span.innerHTML = data.msg;
    }

    inp.addEventListener('blur', function() {
      // 获取用户的输入值
      const uname = this.value;

      // 向服务端发送请求检测用户名是否存在
      // file:///D:/Memo/Sam/5_Learning_Content/AJAX/index.html 这是当前文件的网址, file协议

      // 我们要向 http://127.0.0.1:9000/server 发请求 跨域吧

      // 动态创建script标签
      const script = document.createElement('script');

      // 设置标签的src属性
      script.src = 'http://127.0.0.1:9000/server';

      // 将script插入到文档中 插入到最后
      document.body.appendChild(script);
    })
 -->

------------------------------------

### JQ使用jsonp发送请求
> $.getJSON()
- 参数
- 1. 服务器请求地址?callback=?
<!-- 
    地址最后一定要加?callback=?
    我们这些写是有值的 值为一串数字标识符 这串标识符就是函数名(jQuery360020395885147502035_1621611428790)

    这个函数会和参数2中的回调函数映射起来
    用来做服务器端的函数名 用来调用
 -->

- 2. 处理响应结果的回调函数

> 服务器端
> request.query.callback
- 使用 let cd = request.query.callback; 获取浏览器端注册的函数标识符
- 使用 函数标识符(返回的响应数据)

<!-- 
    浏览器端:
    $('button').click(function() {
      $.getJSON('http://127.0.0.1:9000/server?callback=?', function(data) {
        $('.box').html(`
          名称: ${data.name},
          校区: ${data.city[0]}
        `)
      })
    })


    服务器端:
    app.all('/server', (request, response) => {
        const data = {
        name:'sam',
        city: ['bj', 'sh']
        }
        let str = JSON.stringify(data)

        let cd = request.query.callback;

        // 这里面用cd和返回数据做拼接
        response.end(`${cd}(${str})`)
    })
 -->

------------------------------------

### 跨域请求的第二份方案

### CORS
- cors跨域资源共享 cors是官方的跨域解决方法, 它的特点是不需要在客户端做任何的特殊操作, 完全在服务器中进行处理, 支持get 和 post请求, 跨域资源共享标准新增了一组 HTTP 首部字段, 允许服务器声明哪些源站通过浏览器有权限访问哪些资源

- cors怎么工作的?
- cors是通过设置一个响应头来告诉浏览器, 该请求允许跨域, 浏览器收到响应以后就会对响应放行

- 也就是说
- 客户端怎么发请求, 我们就照着ajax的步骤去做就好了, 跨域的问题只要让服务端设置响应头就可以了

> cors的使用
- 主要是服务器端的设置
- 在服务端加上响应头的设置
response.setHeader('Access-Control-Allow-Origin', '*')
response.setHeader('Access-Control-Allow-Headers', '*')
response.setHeader('Access-Control-Allow-Method', '*')


<!-- 
    file:///D:/Memo/Sam/5_Learning_Content/AJAX/index.html

    往

    http://127.0.0.1:9000/server

    肯定跨域

    报错信息:

    index.html:1 Access to XMLHttpRequest at 'http://127.0.0.1:9000/server' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    index.html:47 GET http://127.0.0.1:9000/server net::ERR_FAILED
 -->

<!-- 
    CORS 头
    Access-Control-Allow-Origin
    指示请求的资源能共享给哪些域。

    Access-Control-Allow-Credentials
    指示当请求的凭证标记为 true 时，是否响应该请求。

    Access-Control-Allow-Headers
    用在对预请求的响应中，指示实际的请求中可以使用哪些 HTTP 头。

    Access-Control-Allow-Methods
    指定对预请求的响应中，哪些 HTTP 方法允许访问请求的资源。

    Access-Control-Expose-Headers
    指示哪些 HTTP 头的名称能在响应中列出。

    Access-Control-Max-Age
    指示预请求的结果能被缓存多久。

    Access-Control-Request-Headers
    用于发起一个预请求，告知服务器正式请求会使用那些 HTTP 头。

    Access-Control-Request-Method
    用于发起一个预请求，告知服务器正式请求会使用哪一种 HTTP 请求方法。
    
    Origin
    指示获取资源的请求是从什么域发起的。
 -->