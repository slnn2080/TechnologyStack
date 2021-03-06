### 什么是BOM:
- 浏览器对象模型, 它提供了独立于内容而与浏览器窗口进行交互的对象, 其核心对象是window
<!-- 
    BOM缺乏标准, JS语法的标准化组织是ES, DOM的标准化组织是W3C, BOM最初是Netscape浏览器的标准的一部分

    兼容性比较差
 -->

----------------

### DOM & BOM

- 文档对象模型                 - 浏览器对象模型

- DOM就是把 文档 当做一个 对象  - 把[浏览器]当做一个[对象]

- DOM的顶级对象是document      - BOM的顶级对象是window

- DOM主要学习的是操作页面元素   - BOM学习的是浏览器窗口交互的一些对象

- DOM是W3C标准                - BOM是浏览器厂商在各自浏览器上定义的, 兼容性差

----------------

### 结构树
- BOM比DOM更大, 它包含了DOM

                        window

document   location   navigation   screen   history

- 我们平时写的document.queryselector 其实应该是window.document.queryselector

----------------

### BOM的构成
- 它是js访问浏览器窗口的一个接口
- 它是一个全局对象, 定义在全局作用域中的变量, 函数都会变成window对象的属性和方法
<!-- 
    在调用的时候可以省略window, 前面学习的对话框都属于window对象方法, 入alert(), prompt()等
 -->
> window下的一个特殊属性 window.name 所以name变量不要用

----------------

### BOM事件
window.onload = function(){ }

window.addEventListener('load', function(){ });
<!-- 
    window.onload是窗口(页面)加载事件, 当文档内容完全加载完成会触发该事件(包括图像, 脚本文件, css文件等), 就调用的处理函数. 

    window.onload传统注册事件方式只能写一次, 如果有多个, 会以最后一个window.onload为准
-->

> 绑定多个onload事件可以使用addEventListener 则没有限制

> 窗口加载事件 DOMContentLoaded
- document.addEventListener('DOMContentLoaded', function(){});
- DOMContentLoaded 事件触发时, 仅当DOM加载完成, 不包括样式表, 图片, flash等
<!-- 
    如果页面的图片很多的话, 从用户访问到onload触发可能需要较长的时间,
    交互效果就不能实现, 必然影响用户的体验, 此时用DOMContentLoaded事件比较合适

    它的加载速度会比较快
 -->


> 调整窗口大小事件
- window.onresize = function(){}
- window.addEventListener('resize' function(){});
- 只要浏览器窗口大小发生变化时 就会触发此事件
<!-- 
    window.onresize 是调整窗口大小加载事件, 当触发时就调用的处理函数
 -->

> window.innerWidth innerHeight当前屏幕的宽度 高度 (没有单位)
<!-- 
    // 当窗口小于800时 隐藏div
    if(window.innerWidth <= 800){
        div.style.display = 'none';
    }
 -->

----------------

### BOM
- 浏览器对象模型
- DOM是通过JS操作网页的，BOM可以通过JS来操作浏览器的

- 在BOM中为我们提供了一组对象，用来完成对浏览器的操作

----------------

### URL
- URL全称: Uniform Resource Location 译为: 统一资源定位符;
- 是互联网上标准资源的地址, 互联网上每个文件都有一个唯一的url, 它包含的信息指出文件的位置以及浏览器应该怎么处理它

如: 
    “http://www.baidu.com/index.html?name=mo&age=25#dowell”

- 这算是一个比较完整的URL了 我就拿这个为例作为讲解;
- 包括: 协议部分、域名、端口、路径(虚拟路径)、携带的参数、哈希值;

> url一般的语法格式
- protocol://host[:port]/path/[?query]#fragment
- http://www.itcast.cn/index.html?name=andy&age=18#link

> protocol  
    通信协议 常用的http ftp matito等

> host      
    主机(域名) www.itheima.com

> port      
    端口号 可选 省略时使用方案的默认端口 如http默认端口80

> path      
    路径由零或多个/符号隔开的字符串, 一般用来表示主机上的一个目录或文字地址

> query     
    参数, 以键值对的形式 通过&符号分隔开来

> fragment  
    片段 #后面内容 常见于链接 锚点


> 协议部分: http https;
- 传输协议是用来完成客户端和服务器端之间数据传输的;这个使用的是http协议在internet中可以使用多种协议
- 如: http  ftp等本例中使用的是http协议http后面. 为“//”为分隔符;


> http协议: 
- 客户端和服务器端传输的内容除了文本以外 还可以传输图片、音频和视频等文件流(二进制编码 | base64码)以及XML格式的数据等是目前应用最广泛的.


> https协议: 
- https它比http更加安全 因为*数据内容的传输通道是经过SSL加密的*(需要在服务器端进行特殊的处理)涉及金融类的网站一般都是使用https;


> ftp资源文件传输协议: 
- 用于客户端把资源文件(不是代码)上传到服务器端 或者从服务器端下载一些资源文件(一般传输的内容会比http这类协议传输的内容多)


> 域名: www.baidu.com
- 网站的域名baidu.com为一级域名www为服务器;

1. 用于解析对应的IP地址便于记忆( 一个URL中也可以使用IP地址作为域名使用);
2. 顶级域名(一级域名): baidu.com;
3. 二级域名: www.baidu.com    sports.baidu.com    ai.baidu.com;
4. 三级域名: my.sports.baidu.com;


> 端口: 在没有填写的情况下默认端口就是80;
- 在服务器发布项目的时候我们可以通过端口号区分当前服务器上不同的项目.
- 如: www.baidu.com:8080一台服务器的端口号取值范围在 0 ~ 65535 之间
如果电脑上安装了很多程序有一些端口号是被占用的;

- 端口不是一个URL必须的部分 如果省略端口部分将采用默认端口
- 如果有的话就是跟在域名后面的就是端口(www.baidu.com:80)域名和端口之间使用“ : ”作为分隔符;
<!-- 
    http: 默认端口号80 ;    https: 默认端口号443  ;  ftp: 默认端口号21 
-->

- 对于以上三个端口号其实很重要如果被其他程序占用则我们就不能使用了所以服务器上一般是禁止安装其他程序的.


> 路径(虚拟路径): index.html虚拟目录;
( http://www.baidu.com/路径1/路径2 ;    “ / ”表示根目录)

- 在服务器中发布项目的时候我们一般都会配置一些默认文档 即使用户不输入文件的名称服务器也会默认找到配置好的文档(一般默认文档都是index.**);

- 为了做SEO优化会把一些动态页面的地址(xxx.php、xxx.aspx、xxx.asp、 xxx.jsp)进行URL重写(需要服务器处理).


> 携带的参数: ?name=mo     多个参数用&连接;
> 问号传参(可有可无)
- 把一些值通过 “key=value” 的方式放在一个URL的末尾通过?传递;
- 作用: 
- 在ajax请求中我们可以通过问号传递参数的方式在客户端把一些信息传递给服务器服务器根据传递信息的不一样返回不同的数据;

- 清除ajax get方法的缓存?math_random=0.123456;
- 通过URL传递参数的方式实现页面之间的通信;


> 哈希值: #dowell;HASH值(可有可无)
- 作用: 
1. 可做页面中的锚点定位
2. 在单页应用开发中作为前端路由使用(Vue Router、React Router);

----------------

### BOM对象：
> window
- window代表的是 整个浏览器的窗口，同时window也是网页中的全局对象

> navigator
- 代表当前浏览器的信息，通过该对象可以来识别不同的浏览器

> location
- 代表当前浏览器的地址栏信息，通过地址栏可以跳转页面，封装的地址栏信息
- location.href = 'www.baidu.com'

> history
- 代表浏览器的历史记录，可以通过该对象来操作浏览器的历史记录
- 由于隐私的原因，该对象不能获取到具体的历史记录 只能操作浏览器向前或向后 翻页, 而且该操作只在当次访问时有效，打开网页 关闭网页叫一次

> screen
- 代表用户屏幕的信息，通过该对象可以获取到用户的显示器的相关的信息

<!-- 这些BOM对象 在浏览器中都是作为window对象的属性保存的我们可以通过window对象来使用，也可以直接使用 -->

----------------

### navigator
- 代表的当前浏览器的信息，通过该对象可以来识别不同的浏览器
- 应用: 比如我用pc端打开的就是pc向的页面, 我有移动端打开的就是移动端向页面就是用了这个功能

- 它有很多的属性, 我们最常用的就是uesrAgent 该属性可以返回由客户机发送服务器的user-agent头部的值
<!-- userAgent用户代理 等价于 浏览器 -->

> navigator.appName
- 返回浏览器的名称
    console.log(navigator.appName);     //Netscape

> navigator.userAgent
- 是一个字符串，这个字符串中包含有用来描述浏览器信息的内容，不同的浏览器会有不同的userAgent
    console.log(navigator.userAgent);

>火狐：
- Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0

> chrome：
- Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36

> IE8：
- Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; WOW64; Trident/4.0; SLCC1)

> IE9：
- Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)
<!-- IE11 中已经将微软和IE相关的标识都已经去除了，所以我们基本已经不能通过UserAgent来识别一个浏览器是否是ie11了 -->

----------------

### 案例 怎么判断用户在哪个终端打开的页面 实现跳转
<!-- 
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPad|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|WOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        window.location.href = '';      //手机
    } else {
        window.location.href = '';      //电脑
    }
 -->

----------------

### 案例 怎么判断是火狐浏览器
    var ua = navigator.userAgent;
<!-- 检查ua里有没有Firefox -->
    if(/Firefox/i.test(ua)){
        alert("你是火狐");
    }else if(/Chrome/i.test(ua)){
        alert("你是chrome");
    };

- 如果通过userAgent不能判断，还可以通过一些浏览器中特有的对象，来判断浏览器的信息
比如：
    ActiveXObject 这是ie里独有的，ie中window的属性

    if(window.ActiveXObject){
<!-- 通过独有的对象来判断是不是ie         -->
        alert("你是ie")
    }
    
<!-- 但是对ie11不行，但是没有进判断 因为ie11中 !!window.ActiveXObject 是 false 让人找不到ie, 道高一尺魔高一丈
换个思路 alert("ActiveXObject" in window );  检查这个对象里 是否有这个属性 -->

    if("ActiveXObject" in window){           
        alert("你是ie")
    }

----------------

### history
- 对象可以用来操作浏览器向前或向后翻页

> history.length
- 可以获取到当次访问的链接数量，也就是你看了几个页面，关闭网页后记录就没有了
    history.length;
    alert(history.length);

> history.back()
- 后退功能
- 可以回退到上一个页面，作用和浏览器回退按钮一样
    history.back();
    
> history.forward()
- 前进功能
- 可以跳转到下一个页面，作用和浏览器前进按钮一样
    history.forward();

> history.go()
- 前进后退功能 参数是1 前进一个页面 如果是-1 后退一个页面
- 可以跳转到指定页面, 它需要一个整数作为参数
1：     向前跳转一个页面；
2：     向前跳转两个页面
-1：    向后跳转一个页面

    history.go:(1);


> history.pushState()
- HTML5为history对象添加了两个新方法，history.pushState()和history.replaceState()，用来在浏览历史中添加和修改记录。

- state: 一个与指定网址相关的状态对象，popState事件触发时，该对象会传入回调函数。如果不需要这个对象，可填null
- title: 新页面的标题，但是所有浏览器都忽略这个值，可填null
- url: 新的网址,必须与当前页面处在同一个域
<!-- 
    假定当前网址 example.com/1.html 我们使用pushState方法在浏览器记录中添加一个新纪录。

    var stateObj = { foo: 'bar' };
    history.pushState(stateObj, 'page 2', '2.html');

    添加上面这个新记录后，浏览器的地址栏立刻显示example.com/2.html。它只是成为浏览器历史中的最新记录。嘉定这是你访问了google.com，然后点击了倒退按钮，页面的url将显示2.html 但是内容仍是原来的1.html。再点击一次到倒退，url将显示1.html.内容不变
 -->

- pushState方法不会触发页面刷新，只是导致hisotry对象发生变化，地址栏会有反应*

> history.replaceState()
history.replaceState方法的参数同上，区别说它修改浏览器历史中当前历史记录。

----------------

### location
- window对象给我们提供了一个location属性用于获取或设置窗体的URL, 并且可以用于解析url, 因为这个属性返回的是一个对象, 所以我们将这个属性也成为location对象
> location的主要作用就是获得和设置url

> 常见的属性
- location.href         获取或者设置 整个url
- location = "https://www.baidu.com";   直接使用location一样
    >>> 可以获取url 和 跳转到哪个url
<!-- 
    btn.addEventListener('click', function(){
        console.log(location.href)
    })

    页面跳转:
    btn.addEventListener('click', function(){
        location.href = 'www.baidu.com'
    })
 -->

> location.search       返回参数

- location.host         返回主机 域名
- location.port         返回端口号 如果未写返回空字符串
- location.pathname     返回路径

- location.hash         返回片段 #后面内容 常见于锚点 链接
    >>> 返回值  '#link'
<!-- 
    <div class="demo" id="demo">这个DIV，id是demo</div>
    
    function onTopClick() {
        window.location.hash = "#domo";
    }
 -->

- 该对象中封装了浏览器地址栏的信息
- 如果直接打印location，则可以获取到地址栏的信息（当前页面的完整路径）
    alert(location);    //获取到地址栏的信息

- 如果直接将location属性修改为一个完整的路径，或相对路径 则我们页面会自动跳转到该路径,并且会生成相应的历史记录
>location = "https://www.baidu.com";


> 常见的方法
> location.assign()
- 用来跳转到其他的页面，作用和直接修改location一样
- 它会记录浏览历史 所有带后腿功能
        
    location = "https://www.baidu.com";
    可以用该方法改成
    location.assign("https://www.baidu.com");

> location.replace()
- 用新的文档替换当前文档 可以使用新的页面替换当前页面，调用完毕也会跳转页面
- 不会生成历史记录，不能回退
    
    location.replace("https://www.baidu.com");

> location.reload()
- 重新加载当前文档 作用和 刷新 按钮一样
- 如果在方法中 传递一个true，作为参数 则会强制清空缓存刷新页面

    location.reload();      //刷新
    location.reload(true);  //强制清空缓存刷新页面

----------------

### 案例 5秒钟自动跳转主页
- 利用定时器
- 页面显示还剩多少秒
<!-- 
    let num = 5;
    let timer = setInterval(function() {
        if(num == 5) {
            clearsetInterval(timer);
            location.href = 'www.baidu.com';
        } else {
            div.innerHTML = '您将在5秒后跳转到主页';
            num--;
        }
        
    }, 1000)
 -->

----------------

### 案例 获取url参数数据
- 主要联系数据在不同页面中传递
- 核心思路:
- 第一个登陆页面里面有提交表单, action提交到 index.html页面  
- 第二个页面, 可以使用第一个页面的参数, 这样实现了一个数据不同之间的传递效果
<!-- 
    之所以可以就是第二个页面之间可以使用第一个页面的数据, 是李立勇了url里面的location.search参数
 -->
- 在第二个页面里还要对使用location.search获得的参数进行提取
- 第一步去掉? 利用substr
- 第二步 利用 = 号分割键和值 split()
<!-- 
    注意 表单里 有name才能提交
 -->

```html
// 当前页面为login.html
<form action='index.html'>
    <!-- 表单有name属性才能提交 -->
    用户名:<input type='text' name='uname'> <input type='submit' value='登录'>
</form>
```
```js
// 这是在index.html里面的操作 来获取index.html传递过来的参数
console.log(location.search);   // ?uname=ANDY

// 只写一个参数代表 从1开始截取到最后
let str = location.search.substr(1); // uname=ANDY

// str.split() 会把一个字符串分割为数组
let arr = str.split('=');           // ['uname', 'ANDY'];

let div = document.querySelector('div');
div.innerHTML = arr[1];
```


> 将location.search转换为对象
- 自己定义的方法:
```js
let query = "?uname=ANDY&age=18"

function getQuery(query) {
  let res = query.substr(1).split("&").map(item => {
    return item.split("=")
  })
  
  // 将二维数组转换为对象
  return Object.fromEntries(res)
}

let res = getQuery(query)
console.log(res);
```


> 将一维数组转换为二维数组 然后将二维数组转换为对象
- 一维数组 -> 二维数组
<!-- 
    res为一维数组 利用map将其转换为2维
    let map = new Map([res])

    // 将二维数组转换为对象
    return Object.fromEntries(map)
 -->

----------------

