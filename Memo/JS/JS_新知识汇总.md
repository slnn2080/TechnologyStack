### console.dir()可以显示一个对象所有的属性和方法。


### window.localtion.reload()
- 刷新的是当前窗口, 比如有子页面的时候 我们使用window.localtion.reload()刷新的就是子页面 而不是整体的页面


### Object.values()
- 可以遍历出对象中的所有属性值
<!-- 
    let obj = {
        name:'sam',
        age:19
    }

    let res = Object.values(obj)
    console.log(res)        //  ["sam", 19]
 -->




### 重新加载页面触发的事件
> pageshow事件

> pageshow onload事件的区别
- 下面三种情况都会刷新页面, 都会触发load事件
- a标签的超链接, 点完后会跳转页面
- f5刷新
- 前进后退按钮

- 但是火狐中, 有个特点 有个"往返缓存", 这个缓存中不仅保存着页面数据, 还保存了dom和js的状态, 实际上是将整个页面都保存在内存里, 所以此时后退按钮不能刷新页面

- 此时可以使用pageshow事件来触发, 这个事件再页面显示时触发, 无论页面是否来自缓存, 在重新加载页面中, pageshow会在load事件触发后触发, 根据事件对象中的persisted来判断是否是缓存中的页面触发的pageshow事件
<!-- 这个事件给window添加 -->

- e.persisted
- 这个页面是否来自于缓存, 如果是true 不是false

> 总结:
- 我们绑定load事件是为了进行页面加载后的相关处理函数, 但是在火狐中 它会把页面缓存到内存中, 这时候我们后退页面并不会刷新内部的数据, 换句话说 假如我们重新计算刷新后的页面数据, 火狐里就不好用了





### document.writeln()
- 使用这个方法写完的东西自动换行

### 数字对象.toFixed(2);
- 四舍五入保留两位小数, 好像各个浏览器显示的有问题, 用的时候看看网址

### cssText
- cssText代表样式字符串, 跟ele.style.name = value功能一样, 都是用来设置元素样式.

> 区别
- 功能是一样的, 只不过ele.style.cssText可以同时设置多个样式属性
- 而ele.style.name=value只能同时设置一个样式属性

<!-- 
    ele.style.width = '10px'
    ele.style.height = '10px'
    
    ele.style.cssText = 'width:10px; height:10px'
 -->
- 一种是多行单一设置，一种是单行多种设置。如果需要设置的样式属性有很多，那么代码自然就会很多，而且用js来覆写对象的样式是比较典型的一种销毁原样式并重建的过程，这种销毁和重建，都会增加浏览器的开销，在一定程度上回消耗浏览器性能。


> 性能有优势
- 但是在具体到业务上来说，同效果配合，不断变换样式属性达到效果目的，这时候，就会体现出来cssText的优势了。亲测在高端手机上没有多大差别，在稍微低端点的手机上，ele.style.cssText=value流畅度优于ele.style.name=value。

> style.cssText比style.name的权重高
不过，在设置cssText值的时候，会有一个问题，每次设置的cssText的值，都会把原来的cssText的值销毁重新赋值，也就是把原来的清除掉。所以可以用累加的形式，

ele.style.cssText+=';width:300px;height:200px;border:1px solid red;'





### 窗口加载事件
> 窗口加载事件 DOMContentLoaded
- document.addEventListener('DOMContentLoaded', function(){});
- DOMContentLoaded 事件触发时, 仅当DOM加载完成, 不包括样式表, 图片, flash等
<!-- 
    如果页面的图片很多的话, 从用户访问到onload触发可能需要较长的时间,
    交互效果就不能实现, 必然影响用户的体验, 此时用DOMContentLoaded事件比较合适
 -->


### 获取一个元素对象的绝对位置
> 元素对象.getBoundingClientRect()

会返回一个对象，width height 

getBoundingClientRect：一个元素四个角！的相对位置
getBoundingClientRect + 滚动条滚动时元素滚动的距离---> 绝对位置
		
代表元素border-box的尺寸
height
width

元素左上角的相对位置
left
top

元素右下角的相对位置
right
bottom



### 获取视口的尺寸

不是根标签的可视区域 就是视口的大小 可以说是分辨率
正常我们的可视区域是到padding 但是它就是视口大小 不受marginpadding的影响
let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight; 

这个规则跟普通的clientWidth一样，到padding 比如分辨率是1366 我加了margin50，下面拿到的就是1266 上面拿到的就是1366
let w = document.documentElement.offsetWidth

绝对位置：到body距离（html和body之间的margin要清除）
    原生实现：while循环不断的去累加
    body的offsetParent -- > null
    body的offsetLeft -- > 0
    body的offsetHeight -- > 0

    缺点：
    没有办法兼容border和margin
    
相对位置：到视口的距离
    原生实现：绝对位置的实现上 减去 滚动条滚动的距离（滚动条滚动时元素滚动的距离）




### DOM事件流
- 事件流描述的是从页面中接收事件的顺序
- 事件发生时会在元素节点之间按照特定的顺序传播, 这个传播过程就是DOM事件流

- 例子: 我给div绑定了一个事件, 它的结构是这样

    Document
       ↓
      html
       ↓
      body
       ↓
      div

- 当我们发生click事件时
- 它的顺序是
- Document先接收到了点击的事件 它不会进行任何操作, 往下传播
        ↓
- Html接收到了点击事件, 一样不进行任何操作, 往下传播
        ↓
- Body接收到了点击事件, 一样不进行任何操作, 往下传播
        ↓
- Div, 这个阶段叫做 目标阶段  上述的阶段叫做捕获阶段

- 然后还会从 目标阶段 从底层往顶层传播 叫做冒泡阶段


> JS代码中只能执行捕获 或 冒泡其中的一个阶段

> on...的事件 和 attachEvent 只能得到冒泡事件

> 没有冒泡的事件, onblur onfocus onmouseenter onmouseleave

### addEventListener(eventName, fn, boolean)
- 如果第三个参数为 true  那么 在事件捕获阶段调用事件处理程序
- 如果第三个参数为 false 那么 在事件冒泡阶段调用事件处理程序








### 动态创建元素的三种方式
> document.write()
- 这种方法是直接将内容写入页面的内容流, 但是文档流执行完毕 则它会导致页面的全部重绘
- 文本流执行完毕 就是代码从上到下走了一遍, 重绘相当于创建了一个新页面 新页面里只有div
<!-- 
    document.write('<div>123</div>')
 -->

> element.innerHTML
- 这种方式是将内容写入某个dom节点 不会导致全部重绘
- 单个标签的话 innerHTML和createElement 性能没有太大的区别 当特别多的时候 这种方式很慢, 但结合数组的形式会快很多
<!-- 
    元素对象.innerHTML = `<a>百度</a>`
 -->

<!-- 
    结合数组的方式, 性能会更好
    let arr = [];
    for(let i=0; i<100; i++){
        arr.push('<a>百度</a>');
    }
    元素对象.innerHTML = arr.join('');
 -->

> document.createElement()
- 创建多个元素的效率稍微低一点点, 没有innerHTML数组性能好 但是结构更清晰
<!-- 
    let a = document.createElement('a');
    元素对象.appendClild(a);
 -->

### try和catch的用法
> 执行规则：
- 首先执行try中的代码 如果抛出异常会由catch去捕获并执行
- 如果没有发生异常 catch去捕获会被忽略掉 但是不管有没有异常最后都会执行。

- try       语句使你能够测试代码块中的错误。
- catch     语句允许你处理错误。
- throw     语句允许你创建自定义错误。（抛出错误）
- finally   使你能够执行代码，在 try 和 catch 之后，无论结果如何。

<!-- 
    try{
        代码块；
        代码  throw "字符"   //抛出错误
    }catch(参数){             //抓住throw抛出的错误
            //处理错误并执行
    }finally{
            //无论try catch结果如何还是继续执行
    }
 -->

> 实例:
<!-- 
    <p>请输出一个 5 到 10 之间的数字:</p>
    <input id="demo" type="text">
    <button type="button" onclick="myFunction()">测试输入</button>
    <p id="mess"></p>
    
    function myFunction(){
        try{ 
            var x=document.getElementById("demo").value;  // 取元素的值
            
            if(x=="")    throw "值为空";       //根据获取的值，抛出错误
            if(isNaN(x)) throw "不是数字";
            if(x>10)     throw "太大";
            if(x<5)      throw "太小";
        }
        catch(err){
            var y=document.getElementById("mess");     //抓住上面throw抛出的错误，给p标签显示
            y.innerHTML="错误：" + err + "。";
        } finally {
            document.getElementById("demo").value = "";
        }
}
 -->



### 伪协议 与 真协议
- 真协议 用来再因特网上的计算机之间传输数据包, 如HTTP协议, FTP协议等
- 为协议 是一种非标准化的协议, Javascript: 
<!-- 
    // 通过一个链接来调用Javascript函数 
    <a href='javascript:popUp('http://www.example.com')'>Example</a>
-->
<!-- 在HTML文档里通过javascript: 调用js代码的做法非常不好 -->



### 对象检测
- 网站的访问者可能未启用js, 或者老旧浏览器不支持DOM的方法和属性, 所以要检测浏览器对js的支持程度

- 把某个方法打包在一个if语句里, 就可以根据这条语句的条件表达式的求值结果是true 还是false来决定应该采取怎样的行动

> 思路1: 如果支持某个方法
- 测试条件 '如果你理解这个方法 ... '
- 比如检测是否有getElementById()方法
<!-- 
    if(document.getElementById){
        using getElementById()
    }

    检测用户所使用的浏览器是否支持这个方法, 使用对象检测时, 一定要删掉方法名后面的圆括号, 如果不删掉, 测试的将是方法的结果
 -->

> 思路2: 如果不支持某个方法
- 把测试条件改为 '如果你不理解这个方法, 请离开'
<!-- 
    if(!method){
        return false;
    }

    使用 return 语句来实现, 相当于中途退出函数, 所以让它的返回值为false比较贴切
 -->


### 性能考虑
> 尽量少访问DOM 和 尽量减少标记(减少在HTML文档中写没有用的结构)
- 只要是查询DOM中的某些元素, 浏览器都会搜索整个DOM树, 从中查找可能匹配的元素, 我们可以尽量应用变量, 把第一次搜索到的结果保存到变量里 重复使用
<!-- 
    if(document.getELementsByTagName('a').length > 0){
        let links = document.getElementsByTagName('a');
        for(let i = 0; i<links.length; i++){  }
    }

    这里使用了两次document.getElementsByTagName('a'), 浏览器就搜索了两次DOM树

    ↓

    let links = document.getELementsByTagName('a');
    if(links.length>0){

    }

 -->



### window.open(url, name, features)方法
- 使用open()方法来创建新的浏览器窗口
- 参数:
- url:      新窗口的地址(如果省略将会是一个空白的页面)
- name:     新窗口的名字, 通过这个name可以在代码里与新窗口进行通信
- features: 新窗口的各种属性(新窗口的尺寸, 新窗口被弃用或禁用的各种浏览器功能(工具条, 菜单条, 初始显示位置等))
<!-- 
    function popUp(winURL){
        window.open(winURL, 'popUp', 'width=320, height=480');
    }
    这个函数将打一个320 * 480的新窗口 名字为popUp
 -->



### 网页加载完毕 触发的事件 onload 
- window.onload = function(){fn1...fn2};
- 上述的方式可以有效 可以让多个函数在网页加载完毕后立即执行

> addLoadEvent() 函数方法
- 把所有的 window.onload 事件处理函数的值 存入变量 oldonload
- 如果在这个处理函数上还没有绑定任何函数, 就想平时那样把新函数添加给它
- 如果在这个处理函数上已经绑定了一些函数, 就把新函数追加到现有指令的末尾
<!-- 
    function addLoadEvent(fn){
        let oldonload = window.onload;
        if(typeof window.onload != 'function'){
            window.onload = fn;
        }else{
            window.onload = function(){
                oldonload();
                fn();
            }
        }
    }

    addLoadEvent(fn1)
    addLoadEvent(fn2)
 -->




### JS自定义属性 data-
- 往HTML标签上添加自定义属性来存储和操作数据
- 自定义属性 是为了保存并使用数据, 有些数据可以保存到页面中而不用保存到数据库中
<!-- 
    应用场景: 
        比如京东左侧的导航栏 一组一组的有手机 有家用电器 有家具等等
        这时我们再有东西需要放在一组一组的归类中, 那么怎么区分应该放到哪组里(是家具还是手机还是家用电器的)
        这是时候我们就习惯用自定义属性来进行区分, 比如data-index='1' -->

> 在标签内部加上自定义 data-属性名 = '属性值'
<div id="test" data-src='links/1.jpg'></div>

> 读取属性值:
getAttribute('data-src');
<!-- 
    let box = document.querySelector('#test');
    let result = box.getAttribute('data-src');
    console.log(result);
 -->
 > 设置:
setAttribute('data-src', 'value')
<!-- 
    let box = document.querySelector('#test');
    box.setAttribute('data-src', 'haha');
    console.log(box);
-->

> dataset属性存取data-*自定义属性的值
- data-前缀属性 可以在js中通过dataset取值，更加方便
> 读取:
dom对象.dataset.属性名

> 赋值:
dom对象.dataset.属性名 = '属性值'
\\ 驼峰式属性名 会被转换为 xxx-xxx的形式
<!-- 
    box.dataset.otherName = 'otherValue'
    console.log(box);   data-other-name="otherValue"
 -->

> 删除: 设置成null 或者delete
dom对象.dataset.属性名 = null;
delete dom对象.dataset.属性名;

> jQ方法
let obj = $('obj');
console.log(obj.data('属性名'));



### 删除 元素本体
<div id="div-01">Here is div-01</div>
<div id="div-02">Here is div-02</div>
<div id="div-03">Here is div-03</div>

var el = document.getElementById('div-02');
el.remove();


### 跟图片相关的

### new Image()宿主对象
> 生成图片的3中方式:
<!-- 
//HTML 方式一
    function a() {
        document.getElementById("d1").innerHTML = "<img src='http://baike.baidu.com/cms/rc/240x112dierzhou.jpg'>";
    }
    a();

    //方法 方式二
    function b() {
        var d1 = document.getElementById("d1");
        var img = document.createElement("img");
        img.src = "http://baike.baidu.com/cms/rc/240x112dierzhou.jpg";
        d1.appendChild(img);
    }
    b();

    //对象  方式三
    function c() {
        var cc = new Image();
        cc.src = "http://baike.baidu.com/cms/rc/240x112dierzhou.jpg";
        document.getElementById("d1").appendChild(cc);
    }
    c();

 -->

> Image()对象
- Image 对象是 JS 中的宿主(或内置)对象，它代表嵌入的图像。当我们创建一个 Image 对象时，就相当于给浏览器缓存了一张图片
- Image 对象也常用来做预加载图片（也就是将图片预先加载到浏览器中，当浏览图片的时候就能享受到极快的加载速度）。
- 在HTML页面中，<img> 标签每出现一次，也就创建了一个 Image 对象。

- HTML代码的加载 和 图片的加载是同时的，虽然 图片已经进行过预加载，但是尽管这样 加载的速度 相比较 HTML 代码的加载速度 还是要慢一些的。
- 就需要用 Image对象中的 onload事件来解决这个问题了。。

> Image对象应用
- 创建一个Image对象：
<!-- var img =new Image();    -->

- 定义Image对象的src: a.src=”xxx.gif”; 这样做就相当于给浏览器缓存了一张图片。

> 图像对象：
- 建立图像对象：图像对象名称=new Image([宽度],[高度])

> 图像对象的属性： 
- border  complete  height  hspace  lowsrc  name  src  vspace  width

> 图像对象的事件：
- onabort onerror onkeydown onkeypress onkeyup onload
<!-- src 属性一定要写到 onload 的后面，否则程序在 IE 中会出错 -->

> Image对象的complete 属性
- 来检测图像是否加载完成
<!-- 
    每个Image对象都有一个complete属性，当图像处于装载过程中时，该属性值false

    当发生了onload、onerror、onabort中任何一个事件后，则表示图像装载过程结束（不管成没成功），此时complete属性为true
 -->

<!-- 
    img.complete ? oDiv.style.display = "none" : (oImg[0].onload = function() {oDiv.style.display = "none"})
-->

> image对象的src
- 当我的src指向一个地址时 我会发送请求去拿它, 这是浏览器自己会做的
- img.src = arr[i];



### 数组相关

### arr.filter() 
- 方法创建一个新的数组，filter把传入的函数依次作用于每个元素，然后根据返回值是 true 还是false决定保留还是丢弃该元素。

- filter() 不会对空数组进行检测。

- filter() 不会改变原始数组。   需要一个变量接收结果

> 语法: arr.filter(function(value,index,arr), thisValue)
- value         每一个元素
- index         每一个元素的索引

- thisValue     对象作为该执行回调时使用，传递给函数，用作 "this" 的值。
<!-- 如果省略了 thisValue ，"this" 的值为 "undefined" -->

> 根据true false来保留数据
<!-- 
    const arr = [1, 6, 9, 10, 22];
    const result = arr.filter(function(item){
        if(item % 2 === 0){
            return true;
        }else{
            return false
        }
    });
    console.log(result);
 -->
> 利用filter() 去重
<!-- 
    var r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];

    r = arr.filter(function (value, index, arr) {

        // 检查arr数组中的元素的位置 和 index的位置一致不一致
        return arr.indexOf(value) === index;

    });
-->

<!-- 
    indexOf()检查数组中某个指定的元素的位置
 -->


### DOM相关

### nodeType
> 元素节点 nodeType 1
> 属性节点 nodeType 2
> 文本节点 nodeType 3

### nodeName
- 元素节点的nodeName 为 字符串类型 大写
<!-- 
    console.log(div.nodeName, typeof div.nodeName);
    console.log(div.nodeName === 'DIV');
 -->

### DOM classList属性:
- 该属性用于在元素中添加，移除及切换 CSS 类。
- ie10以上才支持 使用于移动端
> 只读：
元素对象.classList
- 返回的是列表 伪数组的形式 可以通过索引号来获取

> 添加：
元素对象.classList.add('类名')
- 在元素中添加一个或多个类名。如果指定的类名已存在，则不会添加

> 删除：
元素对象.classList.remove('类名')
- 移除元素中一个或多个类名。注意： 移除不存在的类名，不会报错。
- 可以删除指定类名

> 切换：
元素对象.classList.toggle(class, true|false)
- 在元素中切换类名。
- 第一个参数为要在元素中移除的类名，并返回 false。如果该类名不存在则会在元素中添加类名，并返回 true。

> 判断：
元素对象.classList.contains()
判断是否有这个类



### 事件的解绑

btn.onlclick = function(){
    alert(1);
    btn.onclick = null;
}

btn.addEventListener('click', fn);
function fn(){
    alert(1);
    btn.removeEventListener('click', fn);
}

### addEventListener 解绑方式
> addEventListener('eventName', function(){},false)     用它绑定的事件 解绑时
addEventListener()      绑定事件
removeEventListener()   解绑事件

> 把 回调函数 提取出来
<!-- 
document.body.addEventListener('mousemove', default, false);
document.body.removeEventListener('mousemove', default, false);
function default(){  };
 -->

<!-- 

 -->

### addEventListener 取消默认行为
使用addEventListener()绑定的事件 取消默认行为时不能用return false，而是使用event.preventDefault()
<!-- 
document.body.addEventListener('mousemove', function (event) {
    event.preventDefault();
},false)；
 -->



### 跟事件相关的

### 过渡效果 / 动画效果 监听事件:
> transitionend    /    animationend
> 绑定方式:
obj.addEventListener('transitionend', fn, false);
function fn(){};

> 注意事项:
> 事件多次触发问题:
- 当存在多个属性过渡变化时，结束时会多次触发transitionend事件。
- 在transiton动画完成前设置display:none，事件不会触发。
- 当transition完成前移除transition一些属性时，事件也不会触发
- 元素从display:none到block，不会有过渡，导致无法触发transitionend事件
<!-- 
    .demo{
        width:100px;
        height: 100px;
        background-color: #ddc;
        transition: all 0.5s ease-out;
    }
    .w200{
        width: 200px;
        background-color: #fef;
    }

    var element = document.getElementById('demo')
    element.addEventListener('transitionend', handle, false)
    function handle(){
        alert('transitionend事件触发')
    }
    function change() {
        element.className = element.className === 'demo' ? 'demo w200': 'demo'
    }
 -->

> 解决方式:
- 元素从none到block，刚生成未能即时渲染，导致过渡失效。
- 所以需要主动触发页面重绘，刷新DOM。
- 页面重绘可以通过改变一些CSS属性来触发，例如：offsetTop、offsetLeft、offsetWidth、scrollTop等。

- 1、通过定时器延迟渲染
<!-- 
    function change() {
        element.className = element.className === 'demo' ? 'demo opt': 'demo'
        if(element.className === 'demo'){
                    element.style.opacity = null
                button.innerHTML = '点击'
        }else{
            setTimeout(function(){
                element.style.opacity = '1'
                button.innerHTML = '重置'
            },10)
        }
    }
 -->
- 2、强制获取当前内联样式
<!-- 
function change() {
    element.className = element.className === 'demo' ? 'demo opt': 'demo'
    if(element.className === 'demo'){
                element.style.opacity = null
            button.innerHTML = '点击'
    }else{
        // setTimeout(function(){
        //     element.style.opacity = '1'
        //     button.innerHTML = '重置'
        // },10)
        window.getComputedStyle(element, null).opacity
        element.style.opacity = '1'
        button.innerHTML = '重置'
    }
}
 -->
- 3、触发重绘刷新DOM
<!-- 
function change() {
    element.className = element.className === 'demo' ? 'demo opt': 'demo'
    if(element.className === 'demo'){
                element.style.opacity = null
            button.innerHTML = '点击'
    }else{
        // setTimeout(function(){
        //     element.style.opacity = '1'
        //     button.innerHTML = '重置'
        // },10)
        // window.getComputedStyle(element, null).opacity

        // 这个很简单啊
        element.clientWidth;
        element.style.opacity = '1'
        button.innerHTML = '重置'
    }
}
 -->



### onkeydown onkeyup onkeypress
> onkeypress
- 这个事件在用户按下并放开任何字母数字键时发生。系统按钮（例如，箭头键和功能键）无法得到识别

> onkeydown
- 这个事件在用户按下任何键盘键（包括系统按钮，如箭头键和功能键）时发生

> onkeyup
- 这个事件在用户放开任何先前按下的键盘键时发生。




----- 下面是对已讲过的知识的补充 -----



### for循环

> for循环的意义
- for循环 重复执行某些代码, 通常跟计数有关系

> for循环的语法结构
for(1初始化变量; 2条件表达式; 4操作表达式){
    // 3循环体...
}
- 初始化变量:
    就是var 声明的一个普通的前两, 通常用于作为计数器使用
- 条件表达式:
    就是用来决定每一次循环是否继续执行, 就是终止的条件
- 操作表达式:
    是每次循环最后执行的代码 经常用于我们计数器变量进行更新(递增 或 递减);

> for循环的执行过程
- 1 > 2(判断是否满足条件) > 3(执行循环体) > 4 > 2 > 3 > 4

### 双重for循环
> 语法结构:

for(let i=0; i<5; i++){
      for(let j=0; j<5; j++){
      }
    }
<!-- 
    for(let i=1; i<=3; i++){

      console.log(`@这是外层循环第${i}次`);

      for(let j=1; j<=3; j++){

        console.log(`-----这是里层循环第${j}次`);
      }
    }

    外层循环1次, 内层循环3次, 然后开始下一轮 外层循环再1次, 内层循环再3次
    @这是外层循环第1次
        -----这是里层循环第1次
        -----这是里层循环第2次
        -----这是里层循环第3次
    @这是外层循环第2次
        -----这是里层循环第1次
        -----这是里层循环第2次
        -----这是里层循环第3次
 -->

> 特点:
- 1, 我们可以把里面的循环看做是外成循环的语句
- 2, 外层循环执行一次, 里面的循环执行全部

### for循环的实例
> 控制执行相同的代码
let num = prompt('请输入个数字');
for(let i=0; i<num; i++){
    console.log('我想找个好工作月薪50万的');
}

> 控制执行不同的代码
- 因为我们有计数器 i 的存在, i每次都在变化
- 需求: 一个人今年1岁了, ...100岁
for(let i=0; i<100; i++){
    console.log(`我今年${i}岁了`);
}

### for循环打印星星

> 追加字符串的方式
let str = '';
for(var i=1; i<=5; i++){
    str = str + '☆'
    // console.log(str);
}
// console.log(str);
<!-- 
// 放到里面打印的结果
☆
☆☆
☆☆☆
☆☆☆☆
☆☆☆☆☆

// 放在外面打印的结果
☆☆☆☆☆
 -->

> 5行5列的星星
- 利用双重for循环
- 思路: 里层循环负责一行打印5个星星, 外层循环负责打印 5 行
<!-- 
    let str = '';
    for(let i=1; i<=5; i++){    // 外层循环负责打印5行
      for(let j=1; j<=5; j++){  // 内层循环负责一行打印5个星星
        str = str + '☆'
      }
      // 如果一行打印完毕5个星星 就要另起一行
      str = str + '\n';
    }
    console.log(str);
 -->

> 打印倒三角形
- 思路:
1, 一共有10行, 但是每行的星星个数不一样, 因此需要用到双重for循环
2, 外成的for循环 控制行数, 循环10次可以打印10行
3, 内层的for循环 控制每行的星星的个数 但是每行的星星的个数是不一样的

- 算法:
> 让里层循环的j 等于 行号   j=i
- 里面循环:  j=i; j<=10; j++;
- 内层循环是从i开始的(j=i)
- 1行: 首先外层循环的i等于1, 然后里层循环就要走全部的, 这是 j=i 也就是 j=1, j<=10那就是说能打印10个星星, 里层的10个星星打印结束后 开是走第二轮 i++
- 2行: 外层的i等于2, 然后里层的走全部, j=2, j<=10, 也就是能打印9个星星
- 3行: 外层的i等于3, 然后里层的走全部, j=3, j<=10, 也就是能打印8个星星
<!-- 
    let str = '';
    for(let i=1; i<=10; i++){    // 外层循环负责行数
      for(let j=i; j<=10; j++){  // 里层循环打印的个数不一样, j=i
        str = str + '☆'
      }
      str = str + '\n';
    }
    console.log(str);
 -->

> 打印9 9乘法表
- 思路:
1, 外层的for 控制行数 打印9行
2, 内层的for 控制每行的公式

- 算法
> 每一行的公式的个数 正好和行数一致, j<=i
- 1行 1个, 2行 2个, 3行 3个 ...
<!-- 
    let str = '';
    for(let i=1; i<=9; i++){    // 外层循环负责行数
      for(let j=1; j<=i; j++){  // 里层循环打印的个数 j<=i
        str = str + `${j} x ${i} = ${j*i}\t`
      }
      str = str + '\n';
    }
    console.log(str);

 -->


### 变量的声明
> 集体变量声明

var a=b=c=9;  

相当于 

var a = 9;
b = 9;
c = 9;

b 和 c 没有声明;

> 集体声明必须用 , 隔开
var a=9, b=9, c=9
这样a b c前面都有var


### for...in 循环是对数组 和 对象遍历的, 主要对对象进行遍历

### arguments的使用
- 当我们不确定有多少个参数传递的时候, 可以用arguments来获取
- 在js中, arguments实际上它是当前函数的一个内置对象, 所有函数都内置了一个arguments对象, arguments对象中存储了传递的所有实参



### Date对象

- Date() 日期对象, 是一个构造函数, 必须使用new 来调用常见我们的日期对象

  let date = new Date();
  console.log(date);

- 参数:
1, Date() 中如果没有参数, 返回的是当前系统的时间
2, Date() 中如果有参数, 创建时间
    数字型: 2019, 10, 01        月份的位置有问题
    字符型: '2019-10-1 8:8:8'   时分秒的顺序

### 日期的格式化
- 我们想要2019-8-8 8:8:8 格式日期, 要怎么办呢?
- 需要获取日期指定的部分, 我们要手动的得到这种格式

> date对象的方法, 获取 日(1-31), 周(0-6), 月(0-11), 年, 时间戳

> .getFullYear()    获取当年
- 不需要参数
- 如果new Date()中 设置了具体时间, 那么使用这个方法得到的就是具体时间里的年份

> .getMonth()       获取当月(0-11)  date.getMonth() + 1
- 得到的月份比实际月份减1月, 因为是0-11, 0为1月
- 所以 记得 \\  date.getMonth() + 1
<!-- 
  let date = new Date('2019-10-1 10:30:50');
  console.log(date.getMonth());   // 9
 -->

> .getDate()        获取当天日期

> .getDay()         获取星期几(0-6)
- 周日为0, 周1为1, 周六为6

> .getHours()       获取当前小时

> .getMinutes()     获取当前分钟

> .getSeconds()     获取当前秒钟
<!-- 
    let date = new Date();
    // 获取 秒
    let s = date.getSeconds();
    // 获取 分
    let m = date.getMinutes();
    // 获取 时
    let h = date.getHours();
 -->

### 日期格式化 例子:
- 2019年 5月 1日 星期三
> 方法一: 使用swithc case语句 判断传入的数字 改为汉字
<!-- 
  let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let week = date.getDay();

        switch(week){
            case 0:
                week = '日';
                break;
            case 1:
                week = '一';
                break;
            case 2:
                week = '二';
                break;
            case 3:
                week = '三';
                break;
            case 4:
                week = '四';
                break;
            case 5:
                week = '五';
                break;
            case 6:
                week = '六';
                break;
        }

        let time = `${year}年${month}月${day}日 星期${week}`;
        console.log(time);
 -->

> 方法二: 利用了数组, 注意周日一定要放在前面 它的数字为0, 把得到的week当做index
<!-- 
  let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let time = `${year}年${month}月${day}日 ${arr[week]}`;
  console.log(time);
 -->


### 时分秒的格式化
<!-- 
  function getTime(){
    let time = new Date();
    let h = time.getHours();
    h = h<10 ?'0'+h :h;
    let m = time.getMinutes();
    m = m<10 ?'0'+m :m;
    let s = time.getSeconds();
    s = s<10 ?'0'+s :s;

    return `${h}:${m}:${s}`;
  };

  let timer = getTime();
  console.log(timer);
 -->


### 获取距离1970-1-1起 至今的毫秒数 --- 时间戳
- 毫秒数永远不会重复的

> getTime()         
> valueOf()
<!-- 
  let date = new Date();
      
  console.log(date.getTime());
  console.log(date.valueOf());
 -->

> +new Date()   也可以获得总的毫秒数  最常用的写法
<!-- 
  let date = +new Date();
  console.log(date);
 -->

> Date.now()    也可以获得总的毫秒数 不考虑兼容性的话可以这么写
<!-- 
  console.log(Date.now())
 -->


### 倒计时案例
- 思路:
    输入的时间 - 现在的时间 = 剩余的时间, 即倒计时
    但是不能拿着时分秒相减, 会是负数 我们可以拿时间戳来计算

    用户输入的总毫秒数 - 现在时间的总毫秒数 = 剩余时间的总毫秒数
    然后把剩余的毫秒数转为天时分秒

    输入时间: 因为活动从什么时间开始是用户决定的 活动开始的时间

<!-- 
    // 形参time 是用户输入的时间, 也是预计活动开始的时间
        function countTime(time){

        // 返回的是当前时间总的毫秒数
        let nowTime = +new Date();

        // 用户输入时间总的毫秒数
        let inputTime = +new Date(time);

        // 剩余时间总得毫秒数
        // let times = inputTime - nowTime;
        // 剩余时间总得毫秒数 转为 秒数 拿着秒数计算更精确些
        let times = (inputTime - nowTime) / 1000;

        /* 
            d = parseInt(总毫秒数 / 60 / 60 / 24);
            h = parseInt(总毫秒数 / 60 / 60 % 24);
            m = parseInt(总毫秒数 / 60 % 60);
            s = parseInt(总毫秒数 % 60);
        */

        let d = parseInt(times / 60 / 60 / 24);
        d = d<10 ?'0'+d :d;
        let h = parseInt(times / 60 / 60 % 24);
        h = h<10 ?'0'+h :h;
        let m = parseInt(times / 60 % 60);
        m = m<10 ?'0'+m :m;
        let s = parseInt(times % 60);
        s = s<10 ?'0'+s :s;

        return `${d}天${h}时${m}分${s}秒`;
    }
    let result = countTime('2021-4-22 12:00:00');
    console.log(result);
 -->


### 引用类型的变量 传递给 实参
> 简单数据类型是值传递

> 复杂数据类型是地址传递
- 函数的形参也可以看做是一个变量, 当我们把引用类型变量传递给形参时, 其实是把变量在栈空间里保存的地址值复制给了形参,
- 形参和实参保存的是同一个地址值, 所以操作的是同一个对象



### 自动"观察"元素是否进入视口  IntersectionObserver API
> IntersectionObserver(callback, [option])
- 根据元素的可见性的变化, 就会调用观察器的回调函数, 回调函数会触发两次, 一次是目标刚刚进入视口, 另一次是完全离开视口

> callback中的参数
- entries:  是一个数组, 里面的元素为被观察的对象
- callback回调中 还有一个 entry对象, 在回调中使用可以得到被观察元素的信息
<!-- 
    entry.isIntersecting:
        如果是true，则表示元素从视区外进入视区内。

    entry.target:   被观察的目标元素，是一个 DOM 节点对象

    entry.rootBounds:
        根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，
        如果没有根元素（即直接相对于视口滚动），则返回null

    entry.boundingClientRect:
        目标元素的矩形区域的信息

    entry.intersectionRect:
        目标元素与视口（或根元素）的交叉区域的信息

    entry.intersectionRatio: 0 到 1 的数值
        相交区域占目标元素区域的百分比
        也就是 intersectionRect 的面积除以 boundingClientRect 的面积得到的值。

    entry.time:     可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
 -->

> option参数 intersection(function(){}, {option})
- threshold: 属性决定了什么时候触发回调函数, 它是一个数组, 默认值为0
目标元素与视口交叉面积大于多少时, 触发回调
<!-- 
    {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    }

    默认值为0, 当为1时, 元素完全显示后触发回调函数
 -->
- root: 一个可以滚动的元素，我们叫它根元素，
<!-- 
    它有很多后代元素，想要做的就是判断它的某个后代元素是否滚动进了自己的可视区域范围。这个 root 参数就是用来指定根元素的，默认值是 null。

    如果它的值是 null，根元素就不是个真正意义上的元素了，而是这个浏览器窗口了，可以理解成 window，但 window 也不是元素（甚至不是节点）。这时当前窗口里的所有元素，都可以理解成是 null 根元素的后代元素，都是可以被观察的。
 -->
- rootMagin: root如果代表视口那么进去视口则进入的观察范围, rootMagin用来扩展, 或缩小观察范围, 正值为扩大, 负值为缩小

- 减小根元素下方的观察范围, rootMagin:'0 0 -10% 0' 能变相的提高显示基线
<!-- 
    这个 API 的主要用途之一就是用来实现延迟加载，那么真正的延迟加载会等 img 标签或者其它类型的目标区块进入视口才执行加载动作吗？显然，那就太迟了。我们通常都会提前几百像素预先加载，rootMargin 就是用来干这个的。
 -->



> observer 实例的方法:
- let observer = new IntersectionObserver();
- observer这个实例对象的方法
> observer.observe()
- 观察某个目标元素，一个观察者实例可以观察任意多个目标元素。

> observer.unobserve()
- 取消对某个目标元素的观察，延迟加载通常都是一次性的，observe 的回调里应该直接调用 unobserve() 那个元素
<!-- 
    let observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                 entry.target.classList.add('active');

                 // 延迟加载通常都是一次性的
                 observer.unobserve(entry.target);
            }
        })
    })
 -->
> observer.disconnect()
- 取消观察所有已观察的目标元素

> observer.takeRecords()


<!-- 
    // 基本用法解析:
    let observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){
            if(entry.isIntersecting){
                entry.target.classList.add('active');
            }
        })
    }, {
        threshold:[1]
    });


    document.querySelectorAll('.box').forEach(function(value){
        observer.observe(value);
    })

    1, 首先创建实例对象, observer
    2, 在回调函数中传递目标元素数组形参 entries
    3, 在回调内部 遍历数组 并传入 entry形参
    4, 判断 目标元素是否进入可视区域 如果进入 则添加什么效果
    5, option传入对象 threshold 1
 -->

---------------------------------

### ES5中新增的方法

### ES5中新增的数组方法
- 下面的方法都是根据true和false来继续判断的 都是在内部添加return true


> arr.forEach(function(value, index, arr) { ... })
- 遍历数组
- 参数:
    - value:    数组当前的值
    - index:    数组当前的索引
    - arr:      数组对象本身
<!-- 
    let arr = [1, 2, 3];
    let sum = 0;
    arr.forEach(function(value, index, arr) {
        sum += value;
    })
 -->

<!-- 
    它内部的小标控制不了

    举个例子来说
    要是用for循环删除一个数组中的元素
    我可以这样
    let arr = [1, 2, 3];
    for(let i=0; i<arr.length; i++) {
        arr.splice(i, 1);
        i--;
    }
    console.log(arr);
    我可以循环走完一轮 i--下 能控制下标

    但是forEach不行
    let arr = [1, 2, 3];
    arr.forEach(function(value,index){
        arr.splice(index, 1);
        index--;
    })
    console.log(arr);
    forEach内部会让index++ 我控制不了

    https://www.cnblogs.com/echolun/p/11544045.html
 -->

> arr.filter(function(value, index, arr) { ... })
- filter的回调函数的要求: 必须返回一个布尔值
    如果为true 函数内部会自动将这次回调的value 加入到新的数组中
    如果为false 函数内部会过滤掉这次的value

- 每遍历一次元素就会执行一次这个回调函数

\\\\ → 主要是用于筛选数组的
- 注意它直接返回一个新的数组

- 参数
    - value:    数组当前的值
    - index:    数组当前的索引
    - arr:      数组对象本身
<!-- 
    筛选大于20的元素

    let arr = [12, 66, 4, 88];
    
    返回的是一个数组 创建一个变量用来接收
    let result = arr.filter(function(value, index, arr) {
        return value >= 20;
        return value % 2 == 0;
    })
    console.log(result);
 -->

> arr.some(function(value, index, arr) {})
- 这个方法用于检测数组中的元素是否满足指定条件, 通俗点查找数组中是否有满足条件的元素
<!-- 有没有大于20的元素, 有没有pink的元素 -->

- 注意它返回值是布尔值 如果查找到这个元素, 返回true, 如果查不到就返回false

\\\\ → 如果找到第一个满足条件的元素, 则终止循环, 不再继续
\\\\ → 如果查询数组中唯一的元素, 用some()方法更合适

- 参数
    - value:    数组当前的值
    - index:    数组当前的索引
    - arr:      数组对象本身
<!-- 
    筛选大于20的元素
    let arr = [12, 66, 4, 88];
    
    查找数组中大于20的元素
    arr.some(function(value, index, arr) {
        return value >= 20;
    })

    console.log(result);        //true

    查找元素
    let arr = ['red', 'blue', 'pink']
    let result = arr.some(function(value) {
        return value === 'pink'
    })

    console.log(result);        //true
 -->

> some()的高级用法
<!-- 
    let arr = [];
    data.some(function(value) {
        // some方法返回的是布尔值 所以在内部可以这么写
        // 如果用户输入的商品 和 当前产品的名称一样
        if(value.pname === product.value) {

            console.log(value);     // 找到的数据

            // 但是返回的是一个对象, 我们上面定义的函数必须传递进去一个数组
            arr.push(value);

            // 如果找到就会返回true 必须这么写 现在就属于拿到这个数据了
            return true;
        } 
    });

    // 把拿到的数据渲染到页面中
    setData(arr);
 -->

> 总结:
- filter: 也是查找满足条件的元素, 返回的是一个数组, 而且是把所有满足条件的元素都返回回来

- some: 也是查找满足条件的元素是否存在, 返回的是一个布尔值 true false,
<!-- 如果查找到第一个满足条件的元素就会终止循环 -->

> every()   用法和some()相似
> map()     用法和forEach()相似


> map();
- 一个对一个, 我给你10个 返回来还是10个
- 对数组里每一个元素进行变化的时候就可以使用map函数
- 映射

- map函数 会取出数组中的每一个元素 来进行回调 将return的结果给一个新数组, 所以要创建一个新数组用来接收

> 小例子:
- 需求: 让上面的数组里面元素 变成2倍
    let arr = [12,5,8];
<!-- 
    上面每一个数组里面的东西都会在function里面走一遭 
-->
    let result = arr.map(function(value, index){
        return value * 2
    })
    console.log(result)

> 小例子2:

    let arr = [12,90,8];

    let result = arr.map(value=>value>60 ?'及格':'不及格')
    console.log(result)

    结果:
    result = ["不及格", "及格", "不及格"]


> reduce()
- 汇总
- 一堆出来一个, 算个总数 比如两张银行卡 一张10 一张20 一共多少
- 对数组中所有的内容进行汇总的 要么全部相乘 要么全部相加

> 对于数组里面是对象的结构来说, 它遍历出来就是对象, reduce遍历的跟for of一样都是属性值

- 语法:

    arr.reduce(function(){}, initiaValue)
        
- 参数:
- callback
    - accumulator 累加器累加回调函数的返回值
        - 如果指定了初始值，则将累加器设置为 initialValue 作为初始元素
        - 否则，将累加器设置为数组的第一个元素作为初始元素。

        - 累加器的值 是上一次回调函数return的结果
        
    - currentValue (处理数组的当前元素。)
    - currentIndex
    - array
        
- initiaValue(初始值)   一般为0

<!-- 

    let arr = [10,20,30];

    // 算个总数
    let result = arr.reduce(function(preValue, value, index){
        return preValue + value;
    })
    console.log(result);

    回调函数会作用在每一个元素身上, 一共会调用3次回调函数
    如果设置了初始值, 初始累加器里面是0
    preValue = 0

    第一次
    preValue    0
    value       10

    第二次
    preValue    10 (return preValue + value 0 + 10)
    value       20

    第三次
    preValue    30
    value       30

    结果就是60

    
    // 算个平均数 求和除个数 先求和 到最后一
    let a = arr.reduce(function(tmp, item, index){

        // index == arr.length-1          // 说明是最后一次
        if(index != arr.length-1) {       // 不是最后一次
            return tmp+item;
        } else {
            // 到了最后一次不光要求和还要除以个数
            return (tmp+item) / arr.length;
        }
    })
    console.log(a);


    // 数组中是对象的情况
    let books = [
        { id: 1, name: 'unix编程艺术', price: 119 },
        { id: 2, name: '代码大全', price: 105 },
        { id: 3, name: '深入理解计算机原理', price: 98 },
        { id: 4, name: '现代操作系统', price: 87 }
    ]

    let result = books.reduce(function(tmp, item, index){
        return tmp + item.price * item.count;
    }, 0)

    console.log(result);
 -->

---------------------------------

### forEach() 和 some()的区别
> 在forEach中return不会终止迭代
> 在some中return会终止迭代

> some()一定要写return true 意思是找到元素就不要继续遍历了, 如果写false说明没有找到这个元素 会一直往下去找

    let arr = ['red', 'green', 'blue', 'pink'];
    arr.forEach(function(value) {
        if(value == 'green') {
            console.log('找到了该元素');

            // 想到找元素后就退出
            return true;        // 在forEach中return不会终止迭代
        }

        console.log(11);        // 依然输出了3次
    })


    arr.some(function(value) {
        if(value == 'green') {
            console.log('找到了该元素');

            // 想到找元素后就退出
            // 在some里面遇到return true就会终止遍历 迭代效率更高
            return true;        
        }

        console.log(11);        // 没有输出
    })


> filter是满足条件的所有元素放入到一个新数组里面
- 那filter能不能 return true来终止循环呢?
- filter和forEach一样的 遇到return true不会终止循环

---------------------------------

### ES5中新添加的字符串的方法
> str.trim()    去除两端空格
- 去除字符串两端的空白字符, 并不会去除单词中间的问题
- 这个方法并不影响字符串本身, 它返回的是一个新的字符串

    let str = '   andy   ';
    let str1 = str.trim();
    console.log(str1);

> 以前案例中我们会判断文本框内的值是否为空 input.value.trim()
- 这里面会有一些小的bug, 比如拿到的值的里面可能会有空格
- 比如 我们判断的时候可能会不严谨
<!-- 
    if(input.value === '') {
        alert('请输入内容');
    } else {
        div.innerHTML = input.value;
    }

    if(input.value.trim() === '')
 -->

---------------------------------

### ES5中新增的对象方法
> Object.keys() 获取对象身上所有的属性名
- 用于获取对象自身所有的属性名

    Object.keys(obj)

- 效果类似for...in
- 返回一个由属性名组成的数组

<!-- 
    let obj = {
        id:1,
        pname:'小米',
        price:1999,
        num:2000
    }
    let arr = Object.keys(obj);   // [id, pname, price, num]
 -->


> Object.defineProperty(obj, prop, descriptor)
- 定义对象中新属性或者修改原有属性
- 使用这个方法添加的属性名是不允许枚举的, 因为enumerable的默认值就是false
- 使用这个方法添加的属性不允许被删除

- 参数:
    - obj:          必须    目标对象
    - prop:         必须    需要定义或修改的属性的名字(原先没有的会添加)
    - descriptor    必须    目标属性所拥有的特性
        - descriptor以对象形式 { } 书写
        - value:        设置属性的值, 默认为undefined

        - writable:     值是否可以重写, true | false, 默认为false
<!-- 
    我们的对象中有很多属性是很重要的, 不可以修改的, 这时候可以通过这个属性限定不允许被修改
-->

        - enumerable:   目标属性是否可以被枚举, true | false, 默认为false
<!-- 
    比如买了个东西 我往对象里添加了用户的地址, 这个地址比较隐私, 不想让被枚举出来, 这时候就可以用这个属性
 -->
        - configurable: 目标属性是否可以被删除或是否可以再次修改特性, 默认为false
<!-- 
    添加的属性不允许被删除, 并且不能给这个属性的第三个参数再次修改特性
 -->


    let obj = {
        id:1,
        pname:'小米',
        price:1999,
        num:2000
    }

    \\ 添加
    Object.defineProperty(obj, 'sex', {
        value:1000,
        writable:
    })

    \\ 不容许修改
    Object.defineProperty(obj, 'id', {
<!-- 没有写value就是默认的 -->
        writable: false
    })

<!-- 
    let obj = {
        id:1,
        pname:'小米',
        price:1999,
        num:2000
    }

    // 以前给对象添加属性的时候
    obj.name = 100;

    // 以前修改对象中的属性
    obj.id = 2;
 -->

---------------------------------



