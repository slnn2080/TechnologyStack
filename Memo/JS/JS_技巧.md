### Js技巧
### 递归函数的定义
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

### 异步延迟函数
- 要点
- 就是在 async 函数里面做
- 我们定义的延迟函数前加上 await】

- 应用场景
- 老师这里用的是异步延迟 在a b之间使用这个方法做这个事 只有到达时间我们才返回一个成功的状态
<!--
    function delay(interval = 0) {
        return new Promise(resolve => {

            let timer = setTimeout(_ => {
                clearTimeout(timer);
                resolve()
            }, interval)
        })
    }
-->
<!--
     async handleChange(e) {
      let file = e.raw;
      if (!file) return;

      this.show = false
      let loadingIntance = Loading.service({
          text: "小主请您稍等片刻 奴家正在玩命处理当中",
          background: "rgba(0,0,0,.5)"
      })
      
      因为await本身也是异步的 如果他不返回成功状态下面的走不了 所以这里多等待了100ms 也就是说我们先让loading出来 100ms后解析数据 然后将数据展示在页面当中 然后关闭loading
      await delay(100)
     
      let data = await readFile(file)

      .......


      为了防止页面解析太快 我们再等待100ms
      await delay(100)
      this.show = true
      this.tableData = arr
      loadingIntance.close()
-->


### 检查重复字符串
<!-- 
    let str = "ca"

    function checkStr(str) {
      let res = new Set(str)
      if(str.length === res.size) {
        return false
      } else {
        return true
      }
    }

    console.log(checkStr(str))
 -->

<!-- 
    let str = "abbbc"
    let o = {}
    for(let i=0; i<str.length; i++) {
      if(str[i] in o) {
        o[str[i]] += 1
      } else {
        o[str[i]] = 0
      }
    }
    console.log(o)
    let res = Object.values(o)
    console.log(res);
 -->

<!-- 
    let str = "abcc"

    function checkStr(str) {
      let flag = false
      for(var i=0; i<str.length; i++) {
        for(var j=i+1; j<str.length; j++) {
          if(str[i] === str[j]) {
            flag = true
          } else {
            flag = false
          }
        }
      }

      return flag
    }
    
    let res = checkStr(str)
    console.log(res);
 -->


### 三元表达式的连续写法
<!-- 
    isFirst ? <h3>欢迎使用, 输入关键字, 随后点击搜索</h3> :
    isLoading ? <h3>Loading...</h3> :
    err ? <h3>{err}</h3> : 
    users.map...
 -->


### 解析url中的查询字符串
<!-- 
    // 解析url中的查询字符串
    function decodeQuery(){
        var search = decodeURI(document.location.search);
        return search.replace(/(^\?)/, '').split('&').reduce(function(result, item){
            values = item.split('=');
            result[values[0]] = values[1];
            return result;
        }, {});
    }
 -->




### iframe 相关
> 获取父网页中的iframe
<!-- 
    myFrame = window.frames[ifname的name名或者id之类的吧].document
 -->

> iframe也有onload事件
<!-- 
    let main_frame = $('.main_frame')
    main_frame.on('load', function() {
        let doc = window.frames['main_frame'].document
        main_frame.css('height', `${doc.documentElement.scrollHeight}px`)
    })
 -->


### postMessage 两个页面之间的通信
- 我在做项目中的场景是
- 父页面有一个iframe标签 在处理iframe标签的时候 我遇到的几个问题

> 问题1: 
- 出现了双重垂直滚动条, iframe和页面都出现了滚动条
- 当我禁用了滚动条后 发现iframe区域不能按照里面的子网页的高度更新高度
-
- 解决办法:
- 使用了 iframe.onload事件 当iframe加载完毕之后, 读取iframe内部网页的高度然后把值设置给iframe框架
<!-- 
    let main_frame = $('.main_frame')
    main_frame.on('load', function() {
        let doc = window.frames['main_frame'].document
        main_frame.css('height', `${doc.documentElement.scrollHeight}px`)
    })
 -->


> 问题2:
- iframe中的子网页中 点击按钮添加行, 导致iframe的高度发生变化, 但是没办法实时的反应给父网页
- 解决办法:

> 给谁发信息就写谁.postMessage(数据, * | URL | / | 协议-端口/, [transfer])
- 它可以实现两个页面之间相互传递数据

- 它可以是父网页向iframe发送数据
- 也可以是子网页向父网页发送数据

> 接收方
<!-- 
    window.addEventListener('message', function(e) {
        if(e.orgin !== '目标网址') {
            return
        }
        event.data就是数据
    })
 -->

> 发送方
- 这个是子网页(iframe里的)向父网页中发射数据, window.parent
<!-- 
    window.parent.postMessage(data, 'https://127-:5000')
 -->








### 再设置随机数范围的时候 random()*255 255就是范围


### 数组好字符串之间的灵活运用
<!-- 
    let arr = [
      {id:1, name:'sam', age:9}
    ]

    for(let item of arr) {
      let data = Object.keys(item)
      data.some(value=> {
        String(item[value]).toLocaleUpperCase().indexOf 
      })
    }

    const search = this.search;
    if(search) {
      return this.information.filter(data => {
        return Object.keys(data).some(key => {
          return String(data[key]).toLocaleLowerCase().indexOf(search) > -1
        })
      })
    }
 -->


### 关于模块之间的数据传递
- 我们有的时候需要将一个模块中的数据传递到另一个模块 可以通过回调函数的方式
<!-- 
    A模块 在函数中创建两个函数形参 通过函数形参的方式将结果回调出去
    function request(config, success, failure) {
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

    B模块接收的时候, 传入函数 形参就是A模块传递的实参
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


### 有这个类的判断方式
-if(sHandler.indexOf('comment_up')>=0)


### 移动端click延时的解决方案
- 移动端 click 事件会有300ms的延时, 原因是移动端屏幕双击会缩放(double tap to zoom) 页面
- 它会看再300ms之内有没有点击两下, 如果没有就当做点击事件来处理
<!-- 
    因为屏幕可以放大 双指拉动, 缩小的时候双击屏幕
 -->
- 那我就想点击一下马上执行 不要等300ms应该怎么办?

> 解决方式
- 1. 禁用缩放, 浏览器禁用默认的双击缩放行为 并且去掉300ms的点击延迟
<!-- 
    <meta name='viewport' content='user-scalable=no'>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
 -->

- 2. 如果有的页面要求有缩放的功能, 我们就不能添加刚才的内容, 我们利用touch事件自己封装这个事件解决300ms延迟的问题
    - 原理:
    - 当我们手指触摸屏幕, 就记录当前触摸的时间
    - 当我们手指离开屏幕, 又会产生一个时间, 用离开的时间减去触摸的时间
    - 如果时间小于150ms 并且没有滑动过屏幕 那么我们就定义为点击

<!-- 
    // 封装tap 解决click 300ms 延迟
    function tap(obj, callback) {

        // 不移动我们的手指永远是false
        let isMove = false;

        let startTime = 0;  //记录触摸时候的时间变量
        obj.addEventListener('touchstart', function(e) {

            // 记录触摸时间, 只要触摸元素就把这个时间记入下来
            startTime = Date.now();     
        })
        obj.addEventListener('touchmove', function(e) {
            isMove = true;     // 看看是否有滑动 有滑动算拖拽 不算点击
        })
        obj.addEventListener('touchend', function(e) {

            // 手指离开的时候也有一个时间Date.now()
            if(!isMove && (Date.now()-startTime) < 150) {
                // 如果手指触摸和离开时间小于150ms算点击
                callback && callback();   // 执行回调函数
            }
            isMove = false;
            startTime = 0;
        })
    }

    // 调用
    tap(div, function() {  执行代码 ... })
 -->

> 方法2 一次只能给一个元素解决这个问题 如果页面有100个元素 就得调用100次
> 方法3
- 为了解决方案2的弊端 我们可以使用插件 fastclick插件解决300ms延迟



### 双击禁止选中文字
> window.getSelection ?window.getSelection().removeAllRanges() :document.selection.empty();

- 常规项目，我们只需要给标签加一个onselectstart事件，return false就可以
<div onselectstart="return false;" ></div>

- react中
- 用css解决
    user-select:none


### 将文本框的文字处于选中状态
> input.select();


### 自动调用事件    没有on 事件名后加();
> this.blur();
> this.click()


### 删除指定元素
> 元素对象.remove()
- 可以直接删除指定的元素



### 防抖函数
- 为了防止用户误操作, 或者多次提交表单, 多次付款操作, 我们要设置防抖

- 核心思路:
- 如果在规定时间内又有点击事件, 那么就重新返回到清除延时的操作
- 然后再次设置延时调用
- 如果在规定时间内没有点击, 那么就可以执行表单的提交了
<!-- 
    5秒内不管多少次操作只会成为一次, 因为5秒内只要有事件的触发 就会重新计时, 5秒后才会提交
 -->
> 第一步 设置两个函数 1.点击事件后的处理函数  2.防抖函数(定义形参, 实参接收事件处理函数) 并且把事件的处理函数放到防抖函数内部
<!-- 
    function payMoney() {
        console.log('我买完了');
    }

    function debounce(fn) {
        fn();
    }

    btn.addEventListener('click', debounce(payMonry));
 -->

> 第二步 在防抖函数里添加setTimeout1
- 要点1: timer要定义在返回函数外面
- 要点2: 为了不让点击自动调用函数, 要在函数内部返回函数的方式
- 要点3: 在返回函数内部 保存this
- 要点4: 在返回函数内部 创建参数变量 值为arguments
- 要点5: 调用事件的处理函数时 使用apply()方法

<!-- 
    function debounce(fn, delay) {
        let timer;                  // 2

        return function() {         // 1
            let that = this;        // 3
            let args = arguments;   // 4
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(that, args);   // 5
            }, delay)
        }
    }
 -->


### 节流函数
<!-- 
    function coloring() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function throttle(func, delay) {
    let pre = 0;
    return function() {
        let now = new Date();
        let that = this;
        let args = arguments;
        if(now - pre > delay) {
            func.apply(that, args);
            pre = now;
        }
    }
}
 -->



### 正则
// 对目标文本后面的情况作为条件
// 查找abc 条件是abc的后面是d
> let reg1 = /abc(?=d)/g

// 查找abc 条件是abc的后面不是d
> let reg2 = /abc(?!d)/g

// 对目标文本前面的情况作为条件
// 查找d 条件是d的前面是abc
> let reg3 = /(?<=abc)d/g

// 查找d 条件是d的前面不是abc
> let reg4 = /(?<!abc)d/g




### exec 和 match 的区别
<!-- 
    // 调用方法不一样 
    match是字符串的方法, 调用的方式是str.match()

    exec是正则的方法, 调用的方式是reg.exec()

    - 相同点:
    match和exec在匹配成功时返回的都是数组, 在没有匹配上时返回的都是null

    - 当不使用g的时候, 返回结果都是第一次查询到的结果
    - 当使用g的时候, match会返回所有匹配的内容, 而exec仅匹配第一次匹配的内容

    - 当进行多次匹配时, exec会从匹配结束的下一位开始匹配，返回本次匹配上的内容，直至无可以匹配的内容，返回null
    - 变量名1 = reg.exec(str)
    - 变量名2 = reg.exec(str)
    - 这就是多次

    let str = 'aaa bbb ccc';
    let reg = /[a-z]{3}/g;

    let result = reg.exec(str);
    let result2 = reg.exec(str);
    let result3 = reg.exec(str);
    console.log(result);    // ['aaa']
    console.log(result2);   // ['bbb']
    console.log(result3);   // ['ccc']

    // let str = 'ha ha ahaa';
    // let reg = /(ha)/g;
    // let result = str.match(reg);
    // console.log(result)
 -->

### 假如我们在回调函数中 onclick = debounce() 这种格式会自动调用
- 解决办法如下
- function debounce(func) {
    return function() {
        func();
    }
}



### 判断一个对象是否有该属性 对象['属性名']



### 在全局定义 定时器的变量名时 最好 let timer = null;
- 如果是let timer 的话 值为undefined 可能会引起别的问题



### 让页面滚动到指定位置
> window.scroll(x, y);
- 可以让窗口的滚动到指定位置
- 不用加单位 直接写数字即可
    window.scroll(0, 100)



### 节流阀
> 当一个动画结束后再执行下一个
> 需要flag变量 和 回调函数搭配使用
> if(flag){flag = false} --- 回调函数里( flag = true)
- 防止轮播图按钮连续点击造成播放过快
- 节流阀目的: 当上一个函数动画内容执行完毕, 再去执行下一个函数动画, 让事件无法连续触发

- 核心思路: 利用回调函数, 添加一个变量来控制, 锁住函数 和 解锁函数
- 在某些条件下 关上水龙头 在某些条件下打开水龙头

<!-- 
    // 开始

    let flag = true;
    if(flag) {
        flag = false;

        do somethind;   
    }

    // 如果flag为true 进来我就给你变成false 锁住函数 然后可以做一些事情 现在就相当于水龙头已经关闭了 当再次点击的时候 你就没办法再放水了 因为是false了,if(flag) 为false了 就没办法执行里面的代码了 就没办法播放图片了

    // 但不能一直不播放啊 什么情况下可以播放呢?
    利用回调函数 动画执行完毕, flag = true > 打开水龙头

    这时候我们又进入的新的开始
 -->

<!-- 
    以右侧按钮为例


    let flag = true;

    arrowR.addEventListener('click', function () {
        if(flag) {

            // 先给它关了 进来后先给你取反 然后执行下面的代码 
            flag = false;

            if(num >= ul.children.length-1){
                ul.style.left = 0;
                num = 0;
            }
            num++;

            // 当动画执行完毕后 我们打开节流阀
            animate(ul, -num*focusWidth, function(){
                flag = true;
            });

            circle++;
            circle %= ol.children.length;
            circleChange();
        }
    });
 -->



### 克隆节点的优势
- 动态生成节点, 目前用法: 克隆 轮播图的第一张图片的节点 让它实现无缝轮播

<!-- 定义一个变量 -->
let num = 0;

<!-- 克隆第一张图片放到ul的最后面 -->
let first = ul.children[0].cloneNode(true);
ul.appendChild(first);

<!-- 完成点击按钮滚动图片的功能 -->
arrowR.addEventListener('click', function () {
    if(num >= ul.children.length-1){
        ul.style.left = 0;
        num = 0;
    }
    num++;
    animate(ul, -num*focusWidth);
});
<!-- 
    点击到下一张肯定需要一个变量和图片的宽度(移动距离)联系起来, 下一张就是一个变量自增1 
-->

<!-- 无缝滚动 点击最后一张会回到第一张 -->
<!-- 
    实现方式: 
    1 2 3 1
    在3的后面再放一张跟1一样的图片 当到最后一张1的时候 让ul的left直接为0
-->

<!-- 
    对上面初步完善的功能进行改善
    1. 我们是在html结构里克隆的li, 这样导致了导航点多了一个
    2. 能不能让js克隆一份放在最后面呢?

    克隆第一张图片:
    1. 克隆ul第一个li cloneNode(true) true复制里面的子节点
    2. 添加到ul最后面 appendChild

    为什么使用克隆的功能小圆点并没有增加?
    因为我们克隆的方法 写在了 动态生成导航点的下面

    这种方法实现了两个功能一个是导航点不会多, 又是动态生成
-->



### 手动调用事件 元素对象.click()
> 场景:
- pink轮播 自动播放的部分 实现的逻辑就是点击右侧按钮的逻辑 所以使用了元素对象.click() 这样可能就会调用这个元素对象身上的事件

- 比如 想让定时器自动调用一个事件
let timer = setInterval(function(){
    // 手动调用点击事件
    arrowR.click();
}, 2000)



### 缓动动画
- 核心算法: 
    (目标值 - 现在的位置) / 10
<!-- 作为每次移动的距离 (我们称之为步长) -->
> 匀速动画 就是 盒子当前的位置 + 固定的值
> 缓动动画 就是 盒子当前的位置 + 变化的值(目标位置 - 现在位置) / 10
<!-- 变化在值 在定时器里面写 -->

<!-- 
    之所以是匀速运动就是因为
    obj.style.left = obj.offsetLeft + 1 + 'px';

    1的值是固定的, 我们把这个步长值改为一个慢慢变小的值
    obj.style.left = obj.offsetLeft + step + 'px';
 -->


### window.pageYOffset 页面被卷进去的距离

> window.pageYOffset / pageYOffset
> window.pageXOffset / pageXOffset
- 这两个属性 可以获取 页面被卷去了多少
- 设置或返回当前页面相对于窗口显示区左上角的 X 位置。
- 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。

- 页面被卷去的头部(scrollTop) 可以通过window.pageYOffset获得, 如果是被卷去的左侧 window.pageXOffset 

> 注意: 
- 元素的内容被卷进去多少是 ele.scrollTop获取的, 比如是某个盒子被卷进去多少
- 如果是页面被卷进去多少则是window.pageYOffset

> 兼容性注意:
- 页面被卷去的头部, 有兼容性问题, 因此被卷去的头部通常有如下的几种写法

> 声明了DTD 使用document.documentElement.scrollTop;

> 未声明DTD 使用document.body.scrollTop;

> 新方法    window.pageYOffset / pageYOffset  ie9以上支持

> 自定义函数写法(pink)
<!-- 
    function getScroll() {
        return {
            left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,

            top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        }
    }

    // 使用的时候
    getScroll().left / top
 -->

> DTD
- <!DOCTYPE html> 这个就是DTD 加上这个就可以使用 document.documentElement.scrollTop;


> 最高兼容性写法(网上)
<!-- 

    \\判断是否支持 PageOffset (给 supportPageOffset赋值 true 或 false)
    var supportPageOffset = window.pageXOffset !== undefined;
 
    \\检测浏览器渲染属性是否标准模式 (isCSS1Compat赋值 true 或 false)
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    
    \\如果不支持PageOffset，则要使用 scrollLeft; 
    \\scrollLeft 根据浏览器模式（标准模式、怪异模式），使用不同语法
            \\标准模式： document.documentElement 语法
            \\怪异模式： document.body 语法
    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

    ----

    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
-->


### 滚动条是谁的 body 还是 html
> chrome 认为滚动条是body的
<!-- body滚动条的距离 -->
var st = document.body.scrollTop;   //chrome能获取到坐标

> 火狐等认为滚动条是html的
<!-- html根标签滚动条的距离 -->
var st = document.documentElement.scrollTop;   //火狐等浏览器能获取到

var st = document.body.scrollTop || document.documentElement.scrollTop;


### 获取当前屏幕的宽度
> window.innerWidth innerHeight当前屏幕的宽度 高度 (没有单位)



### 在DOM中使用方法获取元素节点时 可能会获取到换行和空格
> 元素对象.childNodes (标准, 一般不使用)
> 元素对象.firstChild
> 元素对象.lastChild
> 具体的节点.previousSibling（也可能获取到空白文本）
> 具体的节点.nextSibling（也可能获取到空白文本）

- 上述的方法都是能获取到空白文本的 所以我们可以使用nodeType来只获取元素节点
<!-- 
    for(let i=0; i<ul.childNodes.length; i++) {
        if(ul.childNodes[i].nodeType == 1) {
            console.log(ul.childNodes[i]);
        }
    }
 -->

### 跳转另一个页面
- location = "https://www.baidu.com";
- window.location.href="你所要跳转的页面";
- window.open('你所要跳转的页面');

### 禁用屏幕滚动条
document.body.parentNode.style.overflowY = "hidden";


### 时间毫秒数转换
毫秒数 / 1000 转换为秒数后计算更精确些

d = parseInt(总毫秒数 / 60 / 60 / 24);
h = parseInt(总毫秒数 / 60 / 60 % 24);
m = parseInt(总毫秒数 / 60 % 60);
s = parseInt(总毫秒数 % 60);


### 全选选不选的两个思路
> 方法一: 先定义一个变量 让全选的状态根据这个变量的状态来
<!-- 
    for(let i = 0; i<tbs.length; i++){
        tbs[i].onclick = function(){

            // flag 控制全部按钮是否选中, 让全选按钮的状态根据flag来
            let flag = true;
            // 检查四个按钮的选中状态
            for(let i=0; i<tbs.length; i++){
                if(!tbs[i].checked){
                    flag = false; 
                }
            }
            cbAll.checked = flag;   
        }
    }
 -->

> 方法二:
- 一上来就默认全选为选中状态, 然后根据判断里面的结果 更新全选按钮的状态
<!-- 
    for(var i=0 ; i<items.length ; i++){
        items[i].onclick = function(){
            
            checkedAllBox.checked = true;
            for(var j=0 ; j<items.length ; j++){
                if(!items[j].checked){
                    checkedAllBox.checked = false;
                    break;
                }
            }
        };
    }
 -->


### 只要有布尔值的地方
> 三步表达式:
element.className = element.className === 'demo' ? 'demo w200': 'demo';

> typeof n === '类型'
经常使用这种形式, 用来得到一个布尔值

> "属性名" in 对象
检查obj中是否含有test2这个属性
<!-- console.log('test' in obj) -->


### 一个函数 两种情况都可以用的情况下 我们可以将 boolean值传递进去
- 当 true 是一种效果
- 当 false 是一种效果
<!-- 
    nextPage(false);
    
    function nextPage(next){
        let offset = next? -PAGE_WIDTH:PAGE_WIDTH;
    } 
-->



### if判断
- 背景: 
<!-- 
    <div id='x' class="box1"></div>
    <div class="box1" title='haha'></div>
    <div class="box1"></div>
    <div class="box1"></div>
    <div class="box1"></div>
 -->
- 我只想改变原本有title属性值为haha的元素
<!-- 
    let divs = document.getElementsByTagName('div');
    for(let i = 0; i<divs.length; i++){
        let titleText = divs[i].getAttribute('title');
        
        //上面得到了所有的div的title属性值, 有haha 有null, 进入下面的判断过滤了null的, 进入判断的是有title haha的值
        if(titleText){
            divs[i].setAttribute('title', 'heihei');

            //这个divs[i], 竟然不是所有的 而只是title heihei
            console.log(divs[i])
        }

        if(titleText){
            divs[i].setAttribute('title', 'heihei');
            console.log(divs[i].getAttribute('title'));
        };
}
 -->
> 只改变符合 className 为 img-wrapper 的元素
<!-- 
    if(divs[i].className === 'img-wrapper')

    if(divs[i].getAttribute('class') === 'img-wrapper')
 -->


### 检查元素是否存在
> 使用 nodeName 来检查一个元素是否存在, nodeName的值总是返回大写字母
<!--
    if(eleObject.nodeName != 'IMG') { return false}
-->
> 使用nodeType 来检查一个元素是否存在 元素1 属性2 文本3
<!-- 
    if(eleObject.nodeType == 3) { ... }
 -->



### getAttribute, setAttribute 的应用
- 获取 图片的 href 地址, 然后通过setAttribute 设置给图片
<!-- 
    let source = this.getAttribute('href');
    let showSite = document.getElementById('x');
    showSite.setAttribute('src', source);
 -->


### this当做参数来传递
- 需求: 当我点击 超链接 时, 对应图片显示在 当前页面的指定位置上
- 思路:
- 1, 先通过getAttribute获取到<a>身上的 href 属性值(也就是地址)
- 2, 把得到的地址 保存在变量中 source
- 3, 再通过setAttribute设置<img>身上的 src 属性值
<!-- 
    页面结构:
    <ul>
        <li><a href="./links/1.jpg">第一张</a></li>
        <li><a href="./links/2.jpg">第二张</a></li>
        <li><a href="./links/3.jpg">第三张</a></li>
        <li><a href="./links/4.jpg">第四张</a></li>
        <li><a href="./links/5.jpg">第五张</a></li>
    </ul>
    
    <img src="./links/77.png" id='x' alt="">
 -->

- 我做了一个函数, 想用在 <a> 的事件回调中
<!-- 
    function showPic(obj){
        let source = obj.getAttribute('href');
        let showSite = document.getElementById('x');
        showSite.setAttribute('src', source); 
    };

    参数obj: 是<a>对象, 我要获取的是它身上的href
 -->

- 我想把这个函数 放入到 <a> 的事件回调中, 但是不知道传递什么实参进去
<!-- 
    for(let i=0; i<allA.length; i++){
    allA[i].onclick = function(){

        // showPic(obj);

        showPic(this);

        return false;
    };
}
 -->
> ↑ 总结: 事件回调函数中的this 就是每一个 <a> 标签对象, 可以把this当做实参传递进去



### 巧用 apply()
- 我们可以利用apply 借助于数学内置对象求最大值
<!-- 
    let arr = [1, 66, 3, 99, 4];
    // 以前的话我们需要遍历数组

    Math.max.apply()

    Math.max是求数字中的最大值, 但是它求的是数字的 不是数组的 
    Math.max()
    Math.max.apply(null, arr)  我们可以写个空不需要改变this指向 
    写null也不太好, 就好让它指向函数的调用者, Math调用的吧 
    Math.max.apply(Math, arr)
    让它重新指回Math
 -->



### 获取对象身上所有的属性名
> Object.keys() 
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



### for...in 遍历对象中的属性 
- 它适合变量对象, 遍历的是键名 通过对象[键名]的方式获取属性值

- for(var 变量 in 对象){  }
- 变量: 属性名 / 索引值
- 对象[变量]: 属性值
<!-- 
    let arr = ['name', 18, 'gender']
    let newArr = [];
    for(let item in arr){
        newArr.push(arr[item]);
    }
 -->

### for...of --- 遍历属性值
- 它适合遍历数组 es6的新语法, 遍历的直接是属性值
<!-- 
    const xiyou = ['唐僧', '孙悟空', '猪八戒'];

    // 使用for...of 遍历这个数组
    for(let value of xiyou){
        console.log(value);     
    }
 -->

> 自定义遍历目标
- 1 现在对象内部定义接口, [Symbol.iterator](){}
- 2 在[Symbol.iterator](){}函数内部, 先return一个对象
<!-- 
    [Symbol.iterator](){
        return {}
    }
 -->
- 3 在return {}中, 创建next:function(){}
<!-- 
    [Symbol.iterator](){
        return {
            next:function(){};
        }
    }
 -->
- 在next:function(){}中判断遍历是否完成, 如果index<要遍历的对象 那么done应该为false, else遍历完成, done应该为true, if else 中都要返回一个对象
- 创建变量 index = 0; _this = this 让index++ 人为控制遍历下一个元素
<!-- 
[Symbol.iterator](){
    let index = 0;
    let _this = this;
        return {
            next:function(){
                if(index < _this.stus.length){
                    const result = {value:_this.stus[index], done:false}
                    index++;
                    return result;
                }else{
                    return {value:undefined, done:true}
                }
            };
        }
    }
 -->
- 完整版如下:
<!-- 
const banji = {
    name:'终极一班',
    stus:[
        'xiaoming',
        'xiaoning',
        'xiaotian',
        'xiaohong'
    ],

    [Symbol.iterator](){
        let index = 0;
        let _this= this;

        return {
            next:function(){
                if(index < banji.stus.length){
                    const result = {
                        value:_this.stus[index],
                        done:false
                    }
                    index++;
                    return result;
                }else{
                    return {value:undefined, done:true}
                }
            }
        }
    }
}

for(let n of banji){
    console.log(n);
}

 -->


 ### for in 和 for of 的区别
<!-- 
    for in循环 for(let n in obj)
        当中的 n 
        数组    索引
        对象    属性名

    for of循环 for(let n of obj)
        当中的 n 是属性名
 -->


### 数组.forEach() ---- 遍历数组
- arr.forEach(function(value, index, arr){});



### 让系数在一个范围内 自增 自减
效果: 当系数为0时, 自增到100, 当到100时开始自减
结果: 我们把结果除以一定的比例, 得到想到的范围, 比如 0-100 ---> 0-2
> 1 2 3 4 5 4 3 2 1
<!-- 
let num = 0;
let ratio = 0;

setInterval(function(){
    if(num == 0){
        ratio = 1
    }else if(num == 10){
        ratio = -1
    }

    num += ratio;
    console.log(num);
}, 500);
 -->

> num % 5   0 1 2 3 4 0 1 2 3 4
<!-- 
    num++;
    num = num % 10;
    console.log(num);
 -->



### 数组的用法
> 把颜色保存在数组中, 利用下标赋值给对应的所有元素
<!-- 
    let color = ['red', 'yellow', 'blue', 'pink']
    span[i].style.color = color[i];
 -->

> 创建一个空数组, 一边往里注入信息, 一边循环往外取信息
<!-- 
    let arr = [];

    // 往数组中注入信息
    setInterval(function(){
        // 先创建需要的信息
        //圆的半径
        let r = Math.random()*6+3;

        // 圆心的位置, 不能超出整个画布
        let x = Math.random()*canvas.width;
        // let y = canvas.height;  这样只能看到圆的一半
        let y = canvas.height - r;

        // 圆的颜色
        let red = Math.round(Math.random()*255)
        let green = Math.round(Math.random()*255)
        let blue = Math.round(Math.random()*255)
        // 透明度
        let alp = 1;

        // 角度 波动系数
        let deg = 0;
        // 波动系数也要随机不能为0 默认给10
        let step = Math.random()*6+10;

        // 起始位置
        let startX = x;
        let startY = y;

        // 最终
        arr.push({
            x:x,
            y:y,
            r:r,
            red:red,
            green:green,
            blue:blue,
            alp:alp,
            deg:deg,
            startX:startX,
            startY:startY,
            step:step
        });

    }, 1000);
 -->

> 循环读取信息
<!-- 
    setInterval(function(){
        // 每次上来都先清掉
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // 动画
        for(let i = 0; i<arr.length; i++){
            // 如果慢的话 是度数太小了
            arr[i].deg += 2;
            
            // 修改圆心
            // 下面这样是横向的
            // arr[i].x = arr[i].startX + (arr[i].deg*Math.PI/180)*arr[i].step/2;
            // arr[i].y = arr[i].startY + Math.sin(arr[i].deg*Math.PI/180 )*arr[i].step;

            // 让它纵向 让x的值等于y 让y的值等于x
            arr[i].x = arr[i].startX + Math.sin(arr[i].deg*Math.PI/180 )*arr[i].step;
            arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step;

            // 到y 50的时候 消失
            if(arr[i].y <= 50){
                arr.splice(i,1);
            }
            
        }

        // 绘制
        for(let i = 0; i<arr.length; i++){
        ctx.save();

        // 随机颜色
        ctx.fillStyle = 'rgba('+arr[i].red+','+arr[i].green+','+arr[i].blue+','+arr[i].alp+')';
        ctx.beginPath();
        ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
        ctx.fill();
        ctx.restore();
        }
        // 1.上面现在这样 不是动画 只是将数组里面的信息绘制了一次 而且很有可能 定时器还没想数组里添加信息 绘制不出来
        // 绘制一次也不够啊，其实每次都是把画布清掉重新绘制 画布清掉重新绘制，所以在画的时候要开定时器

        // 随机生成圆 下面的值都应该是随机的 那怎么办？
        // ctx.arc(100,100,100,0,360*Math.PI/180)
        // ctx.fill();

        // 思考：
        // 颜色随机，位置随机

    },10);
 -->



### 获取下标的四种方式
\\ aBtn[i].index=i;

\\ let

\\ 闭包
<!-- 
for(var i = 0;i<btns.length;i++){
    (function(){
        btn[i].click = function(){
            console.log(i)
        }
    })();
}
 -->



### ||   &&  两种书写格式代表的含义
> event = event || window.event
- 找false, 如果有 就用第一个, 如果没有 就用第二个

> event && event()
- 找true, 如果有event 你就调用event()



### 怎么看图片加载完成
### 图片加载情况 和 开机动画关联
<!-- 
let flag = 0;

for(let i=0; i<arr.length; i++){
    // 这也是创建图片的一种方法
    let img = new Image();

    // 当我的src指向一个地址时 我会发送请求去拿它, 这是浏览器自己会做的
    img.src = arr[i];

    // 既然现在是发请求拿数据, 那现在的 进度 怎么拿到
    // 只要请求成功 就会触发下面的事情 图片加载成功
    img.onload = function(){
        flag++;
        // 这段文字中的百分比是跟请求次数有关系的
        p.innerHTML = '已加载'+(Math.round(flag/arr.length)*100)+'%'
    };
    img.onerror = function(){
        console.log('地址有问题')
    };
}
 -->



### 在外部创建一个变量, 用来接收内部产生的结果
### 在外部创建一个变量, 用来默认一个结果, 在内部得到的结果来更新外部的变量
> 应用场景1
<!-- 
    var flag = true;
    for(var i = 2; i<num; i++){
        if(num % i == 0){
            flag = false;
        }
    }
    if(flag){
        ...
    }else{
        ...
    }
 -->

> 应用场景2
- 要点 我先默认它为选中状态, 然后对它进行判断, 更改它的状态
<!--
for(i=0; i<items.length; i++){
    items[i].onclick = function(){
        checkedAllBox.checked = true;
        for(j=0; j<items.length; j++){
            if(!items[j].checked){
                checkedAllBox.checked = false; 
                break;
        }
}
-->



### 测试性能
console.time("") 和 console.timeEnd("")



### 判断滚动条是否到底
> 当满足scrollHeight - scrollTop == clientHeight
说明垂直滚动条 滚动到底了
> 当满足scrollWidth - scrollLeft == clientWidth
说明水平滚动条 滚动到底了



### 本身取反的用法
<!-- 
    if(items[i].checked){
        items[i].checked =false；
    }else{
        items[i].checked =true；
    }
    items[i].checked = !items[i].checked; 
-->



### flag 和 switch配合使用
> 场景1
<!-- 
    let flag = '';
    if(event.wheelDelta){
        flag = event.wheelDelta>0?'up':'down';
    }
    if(event.detail){
        flag = event.detail<0?'up':'down';
    }

    switch(flag){
        case 'up':
        ....
        break;
        case 'down':
        break;
    } 
-->
> 场景2

<!-- 
    dir = event.keyCode; 
    switch(dir){ }
-->



### data- 的用法
> 在html标签结构中 设定标识, 配合Js应用
- 解析：
- 在html标签结构中添加了data-属性,用来动态的获取到属性值, 和网址关联在一起
> 效果: 点哪个, 就播放对应的
<!-- 
<li data-flag='g'>
    <a href="javascript">精彩回顾</a>
    <div class="nav-items-bg"></div>
</li>
for(let i=0; i<lis.length; i++){
    lis[i].addEventListener('mouseenter',function(){
    let flag = this.getAttribute('data-flag');
        if(flag){
            audio.src = 'http://s8.qhimg.com/share/audio/piano1/'+flag+'4.mp3';
            audio.play();
        }
    });
}
 -->



### 调整元素的高宽和视口一样
<!-- 
    video.width = document.documentElement.clientWidth;
    // 调整视频的高度 = 视口的高度 - 控件区域的高度
    video.height = document.documentElement.clientHeight - controls.offsetHeight;

 -->



### 改变浏览器时, 重新获取元素的高宽
> window.onresize = function(){};
<!-- 
    window.onresize = function(){
        video.width = document.documentElement.clientWidth;
        video.height = document.documentElement.clientHeight - controls.offsetHeight;
    };
 -->



### 时间的获取
<!-- 
    let date = new Date();
    // 获取 秒
    let s = date.getSeconds();

    // 获取 分
    let m = date.getMinutes()+s/60;

    // 获取 时
    let h = parseInt(date.getHours()+m/60);

    //现在的h是24小时制
    h = h>12?h-12:h;
 -->



### 获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。 
> getBoundingClientRect()
- getBoundingClientRect()是DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）。 

> 获取的属性: top  lef  right  bottom  width  height； 
- 该函数返回一个Object对象，该对象有6个属性：
<!-- 
    top：       元素上边到视窗上边的距离;
	right：     元素右边到视窗左边的距离;
	bottom：    元素下边到视窗上边的距离;
	left：      元素左边到视窗左边的距离;
	width：     元素自身的宽
	height:     元素自身的高
 -->




### 数学公式

> 勾股定理
在任何一个平面直角三角形中的两直角边的平方之和一定等于斜边的平方。
在△ABC中，∠C=90°，则a²+b²=c²。

> 三角函数
正弦 : sin      ∠A的对边比斜边
余弦 : cos      ∠A的临边比斜边

> 弧度值 = 角度值*PI/180

> 角度值 = 弧度值*180/PI



### 保存this的场景 应用
回调函数中的回调函数, 两个回调函数中的this不一致
<!-- 
function fn1(){

    // 把外层函数作用域下的this保存
    let _this = this;

    function fn2(){
    // 当内部函数调用_this时, 在当前作用域下找不到 就会往上找, 就找到了this
        _this.style.background = 'pink'
    }
} -->



### 利用indexOf() 进行的去重
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

> 数组去重的几种方式

- 旧数组: arr = ['c', 'a', 'z', 'a', 'x', 'a', 'x', 'c', 'b', ]

> 方式一:
- 思路: 我们遍历数组, 把前一个元素取出来和后一个元素比较相等 相等的话删掉后一个
<!-- 
    for(let i=0; i<arr.length; i++){
        for(let j=i+1; j<arr.length; j++){
            if(arr[i] === arr[j]){
                arr.splice(j, 1);
                j--;
            }
        }
    }
    arr.sort()
    console.log(arr);
 -->

> 方式二:
- 思路: 使用arr.filter, 传入的函数会一次应用到每一个元素上,根据true和false来判断去留 我们用indexOf方法检查元素的第一次下标位置和下标相等不
<!-- 
    let newArr = arr.filter(function(value, index){

        if(arr.indexOf(value) === index){
            return true;
        }else{
            return false;
        }
    });
    console.log(newArr);
 -->

> 方式三: 
- 思路: 遍历旧数组 然后拿着旧数组元素去查询新数组, 如果该元素在新数组里面没有出现过 我们就添加, 否则不添加
- 使用indexOf 来判断该元素在新数组中存在与否, 如果结果为-1 说明新数组里面没有该元素
<!-- 
function unique(arr){
    let newArr = [];
    // 遍历旧数组
    for(let i=0; i<arr.length; i++){

        // 检查新数组内有没有旧元素的元素
        if(newArr.indexOf(arr[i])===-1){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
 -->



### 利用match() 检查目标内是否有相关文本, 如果有的话进行什么样的操作
<!-- 
    function changeImage(obj){
        if(obj.src.match('1.jpg')){
            obj.src = '../JS/JS_Study/links/2.jpg';
        }else{
            obj.src = '../JS/JS_Study/links/1.jpg';
        }
        
    };

    btn.onclick = function(){
        changeImage(image);   
    };
 -->



### 读取 和 更改文本
> 元素节点.innerHTML
> 元素节点.firstChild.nodeValue



### 滚轮事件在多次触发时 影响用户体验
- 利用延迟定时器, 200ms后触发一个滚轮事件, 每次触发前清除上一次的定时器
<!-- 
    if(content.addEventListener){
        content.addEventListener('DOMMouseScroll',function(event){

        // 处理个问题，当鼠标滚轮滚动时，多次滚动只滚动一次, 触发事件时不是立即响应 而是等200ms才响应
        // 只要触发事件在200ms之内 第二次触发的事件就会把第一次的清掉
        event = event || window.event;
        
        clearInterval(timer);
        timer = setTimeout(function(){
            fn(event);
        },200);

    });
} 
 -->



### 通过js创建标签
> 利用for循环 创建标签
<!-- 
    for(let i=0; i<4; i++){
        let liNode = document.createElement('li');
        let imgNode = document.createElement('img');
        
        ul.appendChild(liNode);
        liNode.appendChild(imgNode);

        liNode.style.width = w+'px';
        liNode.style.height = h+'px';

        imgNode.src = src;
    }
 -->

> 同时修改4张图片的位置
<!-- 
    for(let i=0; i<4; i++){
        1, left:0   top:0           0       0
        2, left:-w  top:0          -1       0
        3, left:0   top:-h          0      -1
        4  left:-w  top:-h         -1      -1

        imgNode.style.left =-(i%2)*w +'px'
        imgNode.style.top = Math.floor(i/2)*h +'px'

### i%2 对下标 0 1 2 3 来说 -- i%2 的结果就是 0 1   0 1
### i/2 对下标 0 1 2 3 来说 -- i/2 的结果就是 0 0.5 1 1.5 向下取整 0 1 0 1
    }
 -->




### 数组的基础

### 筛选数组
<!-- 
    let arr = [2,0,6,1,77,0,52,0,25,7];
    let newArr = [];
    let j = 0;

    for(let i=0; i<arr.length; i++){
      if(arr[i] > 10){
        // newArr[i] = arr[i];
        /* 
          结果:
          (9) [empty × 4, 77, empty, 52, empty, 25] 
          当i为4时, arr[4]的值为77 > 10, 会把它存到newArr[4]里 所以从第5为开始存进去的
        */

        // 也就是说新数组应该从0开始存 定义变量j = 0, 然后没存一次让j++一次
        newArr[j] = arr[i];
        j++;
      }
    }
    console.log(newArr);
 -->

> length自动检测元素的变化
<!-- 
    for(let i=0; i<arr.length; i++){
      if(arr[i] > 10){

        newArr[newArr.length] = arr[i];
      }
    }
 -->

### 反转数组
<!-- 
    let arr = ['pink', 'red', 'green', 'blue', 'purple'];
    let newArr = [];

    /* 
      i=arr.length-1
      目的遍历arr, 下标从最后一个开始
      i>=0
      为了遍历出所有的元素, 得到0 一共5个元素 下标4 下标0为最后一个
      i--
    */
    for(let i=arr.length-1; i>=0; i--){
      // 首先把第4个取过来, 第4个就是arr[i]
      // 把第4个元素取过来后给新数组的第1个, 也就是newArr.length 新数组为空 length就是从0开始
      newArr[newArr.length] = arr[i]

    }
    
    /* 
      思路:
      把index为 4 的数组     给新数组   index为 0 的位置
      把index为 3 的数组     给新数组   index为 1 的位置
      把index为 2 的数组     给新数组   index为 2 的位置
      把index为 1 的数组     给新数组   index为 3 的位置
      把index为 0 的数组     给新数组   index为 4 的位置

      旧数组是递减的过程                新数组是递增的过程
      一共是5个元素 最大是4 长度-1      newArr的length, 因为新数组是从无到有, 递增的过程
      我们把i设置为i = 5-1
      然后再i--
      arr.length-1
    */
 -->


### 交换两个变量值
- 思路:
apple1      apple2      temp
青苹果      红苹果      临时变量

我们把apple1的值 给 临时变量, 然后我们把apple2的值给apple1, 最后我们再把临时变量的值给apple2

<!-- 
    let num1 = 10;
    let num2 = 20;
    let temp;
    console.log(num1, num2, temp);  // 10 20 undefind

    temp = num1;
    num1 = num2;
    num2 = temp;
    console.log(num1, num2, temp);  // 20 10 10

    // 这样不仅仅能交换数字 还能交换其他类型的值
 -->


### 遍历字符串

- 案例:
判断一个字符串'abcoefoxyozzopp'中出现次数最多的字符, 并统计其次数

- 思路:
1, 利用charAt() 遍历整个字符串
2, 把每个字符存储给对象, 如果对象没有该属性 就为1 有就让这个值+1 有几次加几次1
3, 遍历对象, 得到最大值和该字符
(遍历字符串, 然后把每一个元素放到对象里 用属性值标记出现的次数)
<!-- 
    let str = 'abcoefoxyozzopp';
    let o = {};
    for(let i=0; i<str.length; i++){
        // chars 是字符串的每一个字符
        let chars = str.charAt(i)
        if(o[chars]){   //o[chars] 得到的是属性值
            o[chars]++;
        }else{
            o[chars] = 1;
        }
    }
    console.log(o);

    let max = 0;
    let ch = '';
    for(let n in o){
        if(o[n] > max){
            max = o[n];
            ch = n
        }
    }
    console.log(ch, max);
 -->


### 求最大值
<!-- 
    let max = 0;
    if(o[n] > max){
        max = o[n];     这样里面存的永远是最大的那个数
    }
 -->


### for循环 相关
- 所有跟for循环相关的变量 只能在for循环内部起作用 我们想在外部使用它时
- 可以在外部创建一个变量 用来接受for循环内部的结果
<!-- 
    let max = 0;
    let ch = '';
    for(let n in o){
        if(o[n] > max){
            max = o[n];
            ch = n
        }
    }
    console.log(ch, max);
 -->

### ev = ev || event 
找false的 如果第一个值是false 则会看第二个值
如果ev存在 后面的就不执行
如果ev不存在 就用后面的

### ev && ev()
找true的 如果第一个值是true 则会看第二个值
如果有你就用后面的 没有就拉倒


### 深浅拷贝的方法
> 浅拷贝 方式一
<!-- 
    let obj = {
        id:1,
        name:'andy'
    };

    let obj2 = {};
        
    // 我们可以使用for...in 遍历obj
    for(key in obj) {
        console.log(key);       //属性名
        console.log(obj[key]);  // 属性值

        // 给一个对象添加属性的时候 obj.name = value, 给obj2添加属性
        obj2[key] = obj[key];
    }
    console.log(obj2);
 -->

> 浅拷贝 方式二
> Object.assign(拷贝给谁, 拷贝哪个对象);
- ES6中的浅拷贝的新方法
<!-- 
    Object.assign(o, obj);
    console.log(o);
 -->

> 深拷贝
<!-- 
    let obj = {
        id: 1,
        name: 'andy',

        msg: {
            age:1
        },
        color: ['pink', 'red', 'blue']
    };

    let o = {}

    function deepCopy(newobj, oldobj) {
        for(let k in oldobj) {
            let item = oldobj[k];
            if(item instanceof Array) {
                newobj[k] = [];
                deepCopy(newobj[k], item);

            } else if (item instanceof Object) {  
                newobj[k] = {};
                deepCopy(newobj[k], item);
            } else {
                newobj[k] = item;
            }
        }
    }
    deepCopy(o, obj)
    console.log(o);
 -->
