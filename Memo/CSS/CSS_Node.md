### CSS全称：Cascading Style Sheets



### 移动端开发必须写的东西 
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">


### CSS像素 和 物理像素
> 像素
屏幕是由一个个发光的小点构成的 一个点就是我们的像素, 分辨率 就是屏幕中小点的数量

在前端开发中 像素要分两种情况谈论，CSS像素 和 物理像素:
- 物理像素： 上述的分辨率就是物理
- CSS像素：  编写网页时，我们所用的像素都是CSS像素

浏览器在显示网页时，需要将CSS像素转换为物理像素然后再呈现, 一个CSS像素 最终 有几个物理像素显示 有浏览器决定

> 视口(viewport)
视口就是屏幕中用来显示网页的区域, 我们可以通过查看视口的大小，来观察CSS像素 和 物理像素的比值 一般看视口的时候 我们只看 宽度 不看 高度

网页中一个块元素的宽度 是 父元素的100% 所以只需要找到视口的子元素就可以了
先把浏览器的缩放功能重置到100% 直接点html标签 看右侧的盒模型
- 默认情况下 视口宽度 1920px 像素 这时候 视口宽度 和 物理像素 是一样的
- 此时 CSS像素 和 物理像素 是1:1

- 我们的浏览器 按钮ctrl + 滚轮 可以缩放大小 放大网页 视口的可视区域就变小了, 放大两倍的情况下
- 视口宽度是 960px （CSS像素）
- 物理像素是1920px 物理像素是不会变的
- 此时CSS像素 和 物理像素 是1:2

width:100px;
height:100px;
background-color:#bfa;
- 此时CSS像素是100px 物理像素是200px 怎么确认 用截图工具去量 截图工具量到的都是物理像素



### 移动端
https://material.io/resources/devices/
上述网站可以查询一部分手机的分辨率





### html规则
- li里不能嵌套li
- ul里不能放其它的元素 必须是li



### 兼容前缀
-webkit- 兼容谷歌
-moz- 兼容火狐
-o- 兼容欧朋
-ms- 兼容IE



### html相关知识点
> <label> 标签
它是为 表单标签 服务的 分为两种用法：

- 隐式关联：
<label>
    <input type='text'>
    <span></span>
</label>
- 放在<label>里面的文本会和表单关联在一起，点击文本就会触发对应表单的功能

显示关联：
<label for='idname'></label>

<input type="text" name="SocSecNum" id="SSN" />
<label for="SSN">Social Security Number:</label>
- 通过id属性值 把文本和表单关联在一起，点击文本就会触发对应表单的功能


> 网页的头部：
<header></header>
一个网页中可以有很多头部 定义文档或节的页眉

> 网页的主体：
<main></main>
一个页面中只有一个

> 网页的底部：
<footer></footer>

> 网页的导航
<nav></nav>

> 网页中独立的区块
<section></section>
就是div

> 网页中的独立的文章
<article></article>
- 用于定义一个独立的内容区块，比如一篇文章，一篇博客，一个帖子，论坛的一段用户评论，一篇新闻消息等.

- article元素内可以嵌套其他元素，它可以有自己的头、尾、主体等内容。
- 使用时要特别注意内容的独立性，一般对于独立完整的内容才使用article元素，如果只是一段内容的话应该使用section元素。


> 网页的边栏：
<aside></aside>
- 跟主体相关又不属于主体的内容 侧边栏
- 用作文章的侧栏
- aside 的内容应该与 article 的内容相关。通常用来表现侧边栏或者标注框。以是与当前文章有关的相关资料、名次解释，等等


> 点击查看详情
<details>
<summary>details 元素的标题</summary>
</details>
- 用来对显示在页面的内容做进一步骤解释
- 首先是<details>标签，里面接着是标题<summary>，这里面的内容一般简短，具有总结性，会展示在页面。
接着可以跟任意类型的HTML元素作为详情内容，这些内容需要在点击<summary>才会呈现。
- open 属性   
当然，你也可以通过给<details>标签设置open属性让它默认为展开状态。


> 开发完的网页 要做压力测试的
- 访问量测试:
如果是前端写的 一人一台 访问量的测试做的不多
- 压力测试:
后台做的 要做压力测试 几百个人一起访问是什么样的 如果页面不是放在后台服务器
而是放在浏览器端 测试 慢的时候是什么样的


> 笔记本的编码 默认 gb2312



### CSS学习的关注点
每学习css属性的时候 都要关注
默认值：
继承性：
    可继承：color   width
    否继承：border  
<!-- 我们在测试的时候要拿非继承的属性来测试 -->



### 压缩代码
VSCode里的插件：JS & CSS Minifier (Minify)
用法：
F1 --- minify:document



### 建立项目的步骤
index.html  作为首页
index.css   开发时，样式写在外部样式表中链接进来，名字和html文件起成一样的
base.css    文件用来放一些公共样式 内部比如整个网站要用的字体是什么 clearfix等等引入图标字体库



### 浏览器的宽度 和 分辨率 不一致
电脑屏幕分辨率是1920*1080的，我开发了一个网页，宽度是100%，可获取到的
最大宽度、高度都不足1920*1080呢？
说明该浏览器的物理尺寸被缩放了,显示设置 里面有一个 更改文本、应用和其他项目的大小：125%（推荐），更改为100%后效果就有了



### 标签栏图标



### CSS相关技巧

> LOGO属于网页中最重要的部分 所以 logo 应该放在h1标签中  

> logo h1等 上面要加上title

> text-indent:-9999px;  在h1中 最好写上文字 方便搜索引擎能爬到

> body的真实大小 要通过border来查看 直接给body设置背景颜色 其实是给html设置的

> 定位元素，调整浏览器窗口 水平位置也不会变的技巧
div {
    position:fixed;
    right:50%;
    margin-right: - 父容器的一半 + div的宽度
}

> 利用height 显示 与 隐藏
通常我们都是通过display来把元素进行 显示 和 隐藏的设置
{
    display:none;
}
这样再加动画效果的时候 并不好处理, 我们可以通过设置height来隐藏元素
{
    <!-- 高度没有了 文本会移除 隐藏移除部分 -->
    height:0;
    overflow:hidden;
}

> 三角形的做法
要点:
0, 没有宽度 高度 三角形的大小是border决定的
1, 尖朝哪个方向 哪个方向的属性就设置为none
- border-top:none; 
2, 剩下的三边的颜色 换成透明色 尖朝上 颜色就设定在下

box {
    width:0px;
    height:0px;
    border:10px red solid;

    border-color:transparent transparent white transparent
    border-top:none; 
}

.app::after {
content:'';
<!-- 变成块元素 才能设置 width 和 height -->
display:block;      

width:0;
height:0;

<!-- 写在下面的样式 都是相当于围绕content里面的内容添加样式 -->
border:10px solid transparent
border-bottom-color:white;

<!-- 这个放到最后吧 -->
border-top:none;

<!-- 调整位置 -->
position:absolute;
left:0;
right:0;
margin-left:auto;
margin-right:auto;
margin-top:-10px;

}

> 单行文本 垂直水平居中
.wrap {
    line-height:;
    text-align:center;
}


> 多行文字垂直居中对齐
fatherElement {
    display:table-cell;
    vertical-align:middle;
}


> 点击a标签不跳转
<a href="javascript:;"></a>
相当于在URL地址栏里执行了一个表达式 就是一个；什么也不干
<a href="#"></a>
这样也可以


> 隐藏一个元素
开启绝对定位 使用偏移量 使其移出父元素，父元素overflow:hidden 移出可视区域


> 禁止屏幕滚动条
html, body{
    height:100%; 
    overflow:hidden
}

> body也是个容器 需要被内容撑开
当这么写时,是先将body的高度设定为100% 然后靠body撑开html元素一层一层向上撑开
html, body {
    height:100%; 
}


> 图片垂直水平居中
水平方向:
eg:
.test {
    text-align:center;
}
img {
    display:inline-block;
}

>>>>>

垂直水平方向:

eg(或者position 0000 margin auto):
.test {
    text-align:center;
    height:100%;
}
.test:after {
    content:'';
    display:inline-block;
    height:100%;
    vertical-align: middle;

    /* background-color:pink; */
}
img {
    vertical-align: middle;
}
> 原理:
我们在div里添加了一个添加了一个伪元素 其实这个伪元素没有宽度
高度是100%的 这个伪元素相当于是img的兄弟元素 然后把它们两个的verticalalign全都设置为middle
伪元素为inline-black img也是个替换元素相当于inline-black 相当于两个文字;额
img就会垂直居中

---------

### IE6下 fixed失效 绝对定位模拟固定定位
### 初始包含块
### 绝对定位为什么会跟着滚动条跑

> fixed在移动端的问题很大 因为移动端的浏览器都比较老 所以经常会用到 使用绝对定位来模拟固定定位

html身上永远不会出现滚动条,如果html body当中只有一个元素身上有overflow属性 滚动条出现在html的上一层 可以理解为document
html 和 body 身上同时有overflow auto属性滚动条才会在body身上

那我们延伸下 怎么禁掉html上一层的滚动条, 很简单 html 和 body两个元素的身上 任意一个元素身上有overflow:hidden就可以

html, body {
    height:100%;        先让html的高度为100% body继承html的高度
    overflow:hidden
}

既然现在document(html上一层,也可以理解为视口), html, body身上都没有滚动条了 我们拿div进行下模拟

<div class='wrap'>      //全局包裹器
//当子元素高出父元素的高度 父元素身上就会有滚动条
    <div class="test" style='height:3000'></div
    
</div>


> 初始包含块: 是一个视窗大小的矩形
box {
    开启绝对定位
}

<body style='height:3000'>
    <div class='box'></div>
</body>

思考一下 为什么绝对定位的元素 在拖动滚动条的时候 它的位置会跑
绝对定位的元素需要找包含块 需要找离它最近开启定位的祖先元素,没有的话找到初始包含块,初始包含块是一个视窗大小的矩形 位置和视窗位置一样

那为什么现在拖动滚动条的时候 box会跟着一起走?说明初始包含块的位置变了
因为初始包含块跑了 它才跟着跑 初始包含块已经跑到上面去了

所以初始包含块 和 视口 不是同一个东西 只是开始默认情况下 它们的大小位置相同
一旦滑动系统滚动条 动的是初始包含块,视口始终在一个位置 所有的元素都要跟着初始包含块一块跑

返回来说说这个

html, body {
    height:100%;        
    overflow:hidden
}
.wrap {
    height:100%;
    /* 让滚动条出现在wrap身上 */
    overflow:auto;
}
<body>
    <div class='box'></div>
</body>

禁用了系统的滚动条, 滚动条出现在wrap身上, 现在我拖动滚动条的时候, 初始包含块动不动? 不动因为现在视口和初始包含块在一起啊 影响不到初始包含块

.test {
    开始绝对定位
}
<body style='height:3000'>
    // 我添加一个元素
    <div class='test'></div>
    <div class='box'></div>
</body>

这时候test div就是一个模拟的固定定位, 因为这时候它参考的是初始包含块 而我们让初始包含块不再移动了

总结:
html, body {                1, 禁用系统滚动条
    height:100%;
    overflow:hidden;
}

.wrap {
    overflow: auto;         2, 让滚动条出现在全局包裹器上
    border:1px solid;
    height:100%;            3, 给全局包裹器一个高度
}

.test1 {                    4, 给要固定元素的身上 开启 绝对定位
    position: absolute;
    left:100px;
    top:100px;
    width:200px;
    height:200px;
    background-color:cadetblue;
}

<div class='wrap'>
    <div class="test1"></div>
    <div class="test" style='height:3000px'></div>  5, 子元素撑开wrap高度(溢出才有滚动条不是)
</div>

---------

> 控制隐藏 和 显示
visibility:visible / hidden;
display:none; (占位置,下面的元素会上来 注意  重绘重排)
opacity:1 / 0; (性能更好, 但是还是有些问题)


> 文本等行内元素要设置居中的话 在他们的父元素上设置关于居中的属性 而不是这个行内元素本身


> h1标签
- 在网页中的重要性 仅次于title 一般情况下一个页面只有一个h1 跟seo有关系
- 一般情况下 标题标签只会使用h1 - h3, h4-6搜索引擎不太会关注它

- 把一些重要的东西放在 h1 标签中是一个很好的选择


> 多重边框 → 单线边框
给table加的属性：border-spacing:;
- 指定边框之间的距离

border-collapse: ;
- 设置边框的合并


> 解决高度塌陷 和 外边距重叠
.clearfix::before,
.clearfix::after {
    content:'';
    display:table;      
    clear:both;
}
- inline-block 也可以, 但是inline-block即使是空串 也会占一行 把inline-block当做一个字就好了 所以最好的办法是table 没有内容也能分开


> 元素垂直水平方向居中
- 利用定位元素后 布局等式的原理
{
    position:absulute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
}




### CSS的相关知识点
@
浏览器在渲染html元素的时候 会把html节点自上而下解析成一个DOM树 而伪类 伪元素不存在于DOM树里面 DOM树里是一个个的节点 而伪类是一种状态
CSS设计伪类和伪元素 就是为了让CSS能够选择上DOM树以外的元素

@
:visited 是访问过的链接，它判断链接是否访问过很简单，就是看 href='地址' 和 浏览器地址栏上的地址一样不一样，一样就代码访问过

\\注意：
<a href="javascript:;"></a> 和 :visited 会有冲突

@
\\显式关联
<label for=""></label>
放入label标签中的 会被关联到一起  label标签本身是一个行内元素

\\隐式关联
<label>
    <input type="radio" name='sex'>
    测试文字
</label>

> ↑ 解析：这是个单选表单正常效果只能点击按钮时才会被选中，现在文本和表单被放入到label标签中 点击文本按钮也会被选中


### 关于float脱离文档流 提升层级的问题
> 浮动float分为背景与内容, 属于“半层”飘出。
给一个元素浮动就相当于将它的背景浮动起来了
我们想象一下 左边是蛋糕坯  右边是有厚厚奶油的蛋糕坯 浮动就是指左边的蛋糕坯浮动到了奶油层的位置 它跟奶油是一层 也就是说的半层飘出

float       提升半层,一半在文档流中 一半提升
relative    提一层, 只不过在文档流中有一模一样的副本在文档流中占据位置 这个位置我要占住
其它元素不能把我挤掉,但是我不在文档流中渲染 我在上一层中渲染
z-index     为1的时候比上面的层级都多



### 浏览器 读取 选择器的顺序：从右往左
如果从左往右 浏览器不能只匹配一次就把元素成功匹配到
如果从右往左 就可能一次成功匹配到元素
eg：
div ul li .test {}
如果从左往右    就要把页面中的li全部拿到
如果从右往左    只要找.test上层的li



### 声明的优先级
优先级不是选择器的，css里的优先级都是声明的优先级，只不过选择器会对声明的优先级产生影响
选择器的特殊性最终都会授予给其对应的声明，如果多个规则与同一个元素匹配，而且有些声明互相冲突时，特殊性越大的越占优势

@ 选择器的特殊性：
选择器的特殊性由选择器本身的组件确定，特殊性值表述为4个部分，如    0,0,0,0

一个选择器的具体特殊性如下特性：
    1.对于选择器中给定的ID属性值，加 0,1,0,0
    2.对于选择器中给定的各个类属性，属性选择，或伪类，加 0,0,1,0
    3.对于选择器中的给定的各个元素和伪元素，加0,0,0,1
    4.通配符选择器的特殊性为0,0,0,0
    5.结合符对选择器特殊性没有一点贡献
    6.内联声明的特殊性都是1,0,0,0
    7.继承没有特殊性
<!-- 特殊性 1,0,0,0 大于所有以0开头的特殊性(不进位) -->
    
<!-- 注意：id选择器和属性选择器
div[id="test"]（0,0,1,1） 和 #test（0,1,0,0） -->

<!-- 可以在某个样式后添加 !important 则该样式将获得最高的优先级 设置超过内联样式，最高优先级，但在开发中一定要慎用，尽量不用 -->


@ 继承
继承没有特殊性，甚至连0特殊性都没有, 0特殊性要比无特殊性来的强

@ 来源
css样式的来源大致有三种
    创作人员
    读者
    用户代理   
    
@ 权重：
    读者的重要声明
    创作人员的重要声明
    创作人员的正常声明
    读者的正常声明
    用户代理的声明

@ 层叠
1.找出所有相关的规则，这些规则都包含一个选择器
2.计算声明的优先级
    先按来源排序
    在按选择器的特殊性排序
    最终按顺序



### 选择器相关 及其 扩展
通配选择器：    *
id选择器：      #
类选择器：      .
元素选择器:     element
后代选择器：    空格
分组选择器:     ,(结合符)
交集选择器：    elementelement

子元素选择器：      >   只找儿子 又叫做 直接后代选择器
兄弟元素选择器：    +   选择 紧跟的 下一个   兄弟
                   ~   选择 紧跟的 下边所有 兄弟

>> ### 属性选择器
- 根据标签内部的属性来筛选内容
- 属性值加与不加''都可以

[属性名]{ }
选择标签内部含有    指定属性名    的所有元素
eg:
    单独使用可以 一般情况下还可以复合使用
    p[title] {}

[属性名=属性值]{ }
选择标签内部含有    指定属性名 和 指定属性值    的所有元素

[属性名~=属性值]{ } 
选择标签内部含有    指定属性名 = '[指定]属性值 空格 [指定]属性值'
要点：
属性值内必须有空格
属性值内只要包含指定属性值即可
<div name='test1 test2'></div>    --->    OK

[属性名|=属性值]{ } 
选择标签内部含有    指定属性名  指定属性值开头 |  指定属性值-开头
eg：
    <div name='test'></div>       --->    OK
    <div name='test-a'></div>     --->    OK
    <!-- 只能匹配这两种情况 -->

[属性名^=属性值]{ }
^是对属性值位置的筛选 前面的意思
选择标签内部含有    指定属性名 + 指定属性值开头是abc 的所有元素

[属性名$=属性值]{ } 
$是对属性值位置的筛选 后面的意思
选择标签内部含有    指定属性名 + 指定属性值结尾abc 的所有元素

[属性名*=属性值]{ }
*是对属性值位置的筛选 任意的意思
选择标签内部含有    指定属性名 + 指定属性值任意位置 的所有元素

>> ### 伪类和伪元素选择器

> 链接伪类：
:link       没有访问过的链接
:visited	访问过的链接
    > 因为隐私原因 只有下列属性能被应用到visited身上
    color
    background-color
    border-color

:target 	代表一个元素，是一个变量，代表元素的id必须是URL地址最后的URI的元素 
eg:
http://127.0.0.1:5500/CSS/CSS/CSS_Exer.html#div3  ---  html#div3 html后面的部分就是URI 也就是说 id的值 必须和URI是同一个
<!-- 链接伪类只能放在 <a> 上应用 -->

> 动态伪类
:hover		鼠标移入特效 
:active		鼠标点击的状态（点击按住时）
<!-- hover，:active基本可以作用于所有的元素！ -->

<!-- 由于a标签的:link和:visited可以覆盖了所有a标签的状态，所以当:link，:visited，:hover，:active同时出现在a标签身上时 :link和:visited不能放在最后！！！ -->

> 表单伪类
:enabled	匹配可编辑的表单
eg:
没被禁用的表单 背景色 为粉色
    input:enabled {
        background-color: deeppink;
    }
        
:disable	匹配被禁用的表单
eg:
被禁用的表单 背景色 为粉色
    input:disabled {
        background-color: deeppink;
    }

:checked	匹配被选中的表单
eg:
被选中的话 变大一些
    input:checked {
        width:200px;
        height:200px;
    }

:focus		匹配获焦的表单

> 结构型伪类：

:nth-child(index)
    > ul li:nth-child(index)
    // 匹配ul下的所有子元素 --- 找到第index个 且 名字必须是li 不是不匹配

:nth-last-child(index)
    > 匹配ul下的所有子元素 --- 找到第index个 且 名字必须是li 从下往上找

    :first-child
    > 匹配第一个子元素

    :last-child
    > 匹配最后子元素

    :only-child
    > 只有一个指定子元素
    // (相对于:first-child:last-child 或者 :nth-child(1):nth-last-child(1))


在同类型标签中查找:
:nth-of-type(index)     跟上面的区别就是 child --> of type
    > 匹配ul下的所有子元素 --- 找到第index个 且 名字必须是li  不是不匹配

    :first-of-type
    :last-of-type
    :only-of-type	(相对于:first-of-type:last-of-type 或者 :nth-of-type(1):nth-last-of-type(1))


:not()
将符合条件的元素从所有元素中去除后  将剩下的元素  设置为一种样式
eg:
ul>li:not(:nth-child(3))
ul>li:not(:last-child)


:empty()
匹配没有内容的元素，内容必须是空的，有空格都不行，有attr没关系

<!-- index可以为变量n(只能是n) even odd -->
<!-- index的值从1开始计数！！！！ -->

> 伪元素选择器：
::after
::before
    > 搭配 content = '' 使用   display
    > 一个元素只有一个before 和一个after

::first-letter
::first-line
::selection



# 单位
> 像素：
- 像素其实就是屏幕上的一个个小点, 不同屏幕的像素大小是不同的，像素越小的屏幕 显示效果越清晰, 所有同样的200px在不同的设备下显示的效果是不一样的

> 百分比：
- 也可以将属性值设置为相对于其父元素属性的百分比, 设置百分比可以使子元素跟谁父元素的改变而改变

> em
- 是相对于元素的字体大小来计算的
1em = 一个fontsize 一般默认是16px
那10em就是160像素, em会根据字体大小的改变而改变

> rem
rem是相对于根元素的字体大小计算的，em是相对于自身的字体大小，rem是相对于html的字体大小计算的
html {
    font-size:16px;
}



### 自定义字体

@font-face {
    font-family:'fontName';
    src:url(字体存放路径);
}

#test {
    font:15px 'fontName';
}
> 优点 和 缺点:
使用自定义字体 需要去服务器去拿,100%还原ui设计,但是增加网页负担
需求比性能重要,第一考虑点是需求, 在实现业务的基础上再去考虑性能



### 图标字体

用Ai去做矢量图 --- fontLab(用来做字体的工具) --- 矢量图 和 字母Q绑定到一起了(输入q的话就是ai图片) --- 生成字体
制作完字体后(https://www.fontsquirrel.com/tools/webfont-generator) --- 上传字体 --- 生成好的font包贴到项目里
里面有style.css文件

> SVG
SVG是一种图像文件格式，它的英文全称为Scalable Vector Graphics，意思为可缩放的矢量图形。它是基于XML（Extensible Markup Language），由World Wide Web Consortium（W3C）联盟进行开发的。严格来说应该是一种开放标准的矢量图形语言，可让你设计激动人心的、高分辨率的Web图形页面。用户可以直接用代码来描绘图像，可以用任何文字处理工具打开SVG图像，通过改变部分代码来使图像具有交互功能，并可以随时插入到HTML中通过浏览器来观看。

@
UI给我们了SVG后 我们把这些SVG导入icomoon.io 在网站上点导入 --- 选中后 点生成字体
帮每一张矢量图跟一个字母进行的绑定,跟哪个字母现在不知道 把下载的文件包添加到项目中
打开demo.html查看F12



### CSS3属性相关:
> overflow:
visible：   默认值，子元素会从父元素中溢出，在父元素外部显示
hidden:     溢出的部分，将会被裁剪
scroll:     生成两个滚动条，通过滚动条来查看完成的内容
auto：      让父元素生成滚动条
overflow-x;
overflow-y;     这可以试验一下


> display
inline:将元素设置为行内元素
block：将元素设置为块元素
inline-block：将元素设置为行内块元素，宽高生效还没有独占一行
table：将元素设置为一个表格

none：元素不在页面中显示 用来隐藏一个东西


> visibility
visible：元素在页面中正常显示
hidden：元素在页面中隐藏，位置保留



### 文本新增样式
> opacity         非继承属性 - 改变透明度
> rgba

> text-shadow     非继承属性 - 文字阴影   - 默认值:none
可以添加多层阴影 一层阴影 和 一层阴影之间用逗号隔开, 第一层阴影在最上面
    text-shadow:color x y blur, color x y blur(另一层阴影)

> -webkit-text-stroke     文本描边
使用的时候要加前缀, 这只是webkit内核里才有的东西
    -webkit-text-stroke:4px pink;

> direction       文本方向    默认值 ltr (需要配合unicode-bidi:bidi-override使用)
direction:rtl;
unicode-bidi:bidi-overrdie;

> text-overflow:ellipsis;     文本溢出怎么处理属性



### filter 过滤器  整个元素模糊>
#wrap{
    filter:blur(10px);      模糊函数
}



### 文本溢出 显示省略号
文本的容器 必须是块级元素
.box2 {
    width:200px;

    // 必要的3个条件
> white-space:nowrap;
> overflow:hidden;
> text-overflow:ellipsis;

    // 设置网页如果处理空白
    white-space:nowrap;     //normal  nowrap 不换行  pre 保留
}



### 盒模型新增属性
> box-shadow:x y b(模糊程度) f(阴影面积) c inset outset
阴影也也可以有多个


> -webkit-box-reflect: (倒影的方向)(倒影和图片之间的距离)(渐变)
倒影的方向: above below left right
倒影的距离:长度单位
渐变:第三个值
只能在谷歌里面用...


> resize:   配合overflow:auto配合使用;
both:       允许用户在水平和垂直方向上调整元素的大小
vertical:   允许用户在垂直方向上调整元素的大小
horizontal: 允许用户在水平方向上调整元素的大小


> box-sizing:border-box
- 用来设置盒子尺寸的计算方式（width 和 height的作用）
跟ui的设计稿有关 一样的话就改成box-sizing:border-box;



### 新增的UI样式
> border-radius     圆角 不可继承
一个椭圆要定义两个半径,长半轴 短半轴
椭圆:
border-radius:40px/60px     椭圆的x 和 y的值 定义了一个椭圆
> 移动端的开发圆角用px, 百分比的话 旧版本可能不支持(ios5 webkit532)



### 边框图片
配合 border:10px solid 要先指定线粗 和 样式
> border-image-source:url()
- 定义使用一张图片来代替边框样式,如果为none 仍然使用border-style
- 默认图片在四个角

> border-image-slice
- 将 border-image-source链接的图片明确的分割为9个区域
- 4个角, 4边, 中心区域并可指定偏移量 值的百分比参照于图片本身 默认值为100%
- 使用fill关键词时将会被作为background-image
- eg:
<!-- 统一一个数值 -->
border-image-slice:33.33%
<!-- 使用四个数值, 按照上右下左的顺序 分别切图片的4个边的指定百分比 -->
border-image-slice:10% 20% 30% 40%;

> border-image-repeat
- 可选值:
repeat 平铺
round  完整平铺

> border-image-width
边框整体的大小是border-width来决定, border-image-width是控制图片边框的大小

> border-image-outset
边框在原位置, 可以通过这个属性来往外扩展边框的位置



### 背景
> background


> background-color: ;
- 背景颜色


> background-image: url('links/1.jpg');
- 用来给图片设置一个背景 或 多个背景(css3支持), 图片在背景色上面渲染 覆盖颜色, 多背景时 前面的图片 会在 后面的图片上面绘制
- 溢出位置自动截掉
-eg:
background-image: url('links/1.jpg'), url('links/1.jpg')


> background-repeat: ;
背景图片重复方式：
- 可选值：
repeat      默认值
repeat-x    沿着x轴重复
repeat-y    沿着y轴重复
no-repeat   不重复


> background-position: ;
- 相当于拉着图片在框里跑
- 当使用百分比单位时, 参照于 背景图片定位区域的大小 - 背景图片的大小
- eg:
图片大小 220 x 288
框体大小 100 x 100      当使用百分比时  100-220 = -120   -120的10%为 -12px 所以会往左

- eg：
top left      top center      top right
left center   center center   right center
bottom left   bottom center   bottom right
- 使用方位名词的时候 至少需要两个词 如果只写一个词的话 第二个值默认就是center

- 还可以通过偏移量设置 图片 的位置 至少需要两个值
eg:
background-position:50% 50%;


> background-attachment: ;
当出现滚动条时,内部的背景图片在滚动条滚动时 移动不移动
- 可选值：
scroll      默认值  当拖动滚动条时, 背景图片不会跟随一起移动
fixed       背景图片 在视口定位, 跟承载它的框体无关了


background-color:;
background-image: url('links/1.jpg');
background-repeat: repeat;
background-position: ;
background-size: ;
background-origin: ;        它在前
background-clip:;           它在后
background-attachment: ;

简写属性：
- 可以把背景相关的属性都用background来书写，而且没有顺序要求
background:red url('') center center ....
注意：
- 如果有background-size属性的话, 要写在position的后面 用 / 隔开
- eg：
background:red url('') center center/cover ....

- 如果有background-origin: ; 和 background-clip:; 的话, background-origin必须在前面
- eg：
background:red url('') center center/cover border-box content-box


> background-origin: ;
设置背景图片的原点
- 设置背景图图片偏移量计算的圆点
- 可选值：
padding-box     默认值：background-position从内边距处开始计算，就是说图片的原点在内边距的左上角
centent-box     背景图片的偏移量从内容区处开始计算，也就是图片的原点在内容区的左上角
border-box      背景图片的偏移量从边框处开始计算，也就是图片的原点在边框处的左上角


> background-clip:;
> -webkit-background-clip:text;     图片在文字内部  按文字剪切背景
设置背景图片的范围      ie8不支持
- 边框的下面有背景的 当我们想设置背景图片的范围时可用这个属性
- 可选值：
border-box      默认值  背景会出现在边框的下面
padding-box     背景只会延伸到内边距，不会再出现在border的下方 默认
content-box     背景只会延伸到内容区

- no-reapt的默认情况下
从padding-box开始绘制, 超出border-box开始剪裁


> background-size: ;
- 特性: 高 宽自适应
- 设置背景图片的尺寸
- eg:
background-size: 100px 100px;   
\\ 第一个值是宽度 第二个值是高度 如果只写一个 第二个值为auto
- 可选值：
- cover:      图片比例不变 将元素铺满 以框体为主
- contain：   图片比例不变 将图片在元素中完整显示 以图片为主

- 单位:
百分比是参照背景区域 (background-origin)



### 线性渐变
渐变是background-image下的函数
> background-image: linear-gradient();
线性渐变, 默认值是从上到下的渐变
- 参数: 
<!-- 红到绿的渐变 和 绿到粉的渐变 -->
linear-gradient(color1, color2, color3);   

> 第一个参数为 控制方向
- 2: linear-gradient(to left(r b t), color1, color2, color3);
- 2: linear-gradient(45deg, color1, color2, color3);
- 方向的取值:
角度: 90deg
方向: to left right top bottom
圈数: turn .5turn .25turn
 
> 发生渐变的位置 color 10px/10%
渐变条上的锚点
linear-gradient(90deg, color1 10%, color2 30%, color3 50%);
<!-- 相当于渐变条上 有3个点 点上的颜色是color1 两头是纯色 -->

> 透明度也有渐变哦
linear-gradient(90deg, rgba(222,111,2,0) 10%, rgba(12,55,17,1) 80%);


> background-image: repeating-linear-gradient();
重复线性渐变
把x - y的渐变 重复型平铺
<!-- 最好起始的锚点不要指定 -->
- eg:
background-image: repeating-linear-gradient(red, yellow);
> 发廊灯
background-image:repeating-linear-gradient(45deg, black 0px, black 20px, white 20px, white 40px);


### 径向渐变
> background-image:radial-gradient()
径向渐变：
> 半径 是它的渐变方向, 锚点都是在半径上
- 第一个值在最中心，第二个值在外围
- 默认情况下，径向渐变的形状根据元素的形状计算的

- 指定径向渐变的范围 在第一个参数的位置
- 可以指定数值，还有预定义的语句：
    circle  正圆 
    ellipse 椭圆
- eg:
background-image:radial-gradient(100px 100px, red, yellow)
<!-- 径向渐变的范围是100px x 100px -->

- 指定渐变范围延伸到哪里
closest-side        延伸到离圆心最近的两条边
farthest-side       延伸到离圆心最远的两条边

closest-corner      延伸到离圆心最近的角
farthest-corner     延伸到离圆心最远的角
- eg:
background-image:radial-gradient(closest-side at 100px 100px, red, yellow)
// 渐变延伸到离圆心最近的两条边

- 可以指定渐变圆心的位置
在第一个参数的位置里传递 at 0 0
- eg:
background-image:radial-gradient(100px 100px at 0 0, red, yellow)

> background-image: repeating-radial-gradient(red, yellow);
重复径向渐变：











### 面试题

> 简单的选项卡
思路：
利用:target功能 设置div的id值 和 a中href的值一样 显示对应标签后 可以更改样式

> 自定义按钮
思路：
利用<label>隐式关联的功能，把表单功能的按钮移出父元素框隐藏起来，让span宽高和父元素一样
利用:checked选择器 选择已点击按钮的下一个span 改变样式
结构：
<label>
    <input type="radio" name='sex'>
    <span></span>
</label>