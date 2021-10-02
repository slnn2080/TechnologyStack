## 语义化标签：
<br>

在网页中HTML用来负责网页的结构，所以在使用html标签时，应该关注的是标签的语义而不是它的样式

    <hgroup>
        标题组，可以将一组 相关 的标题同时放入hgroup标签中
    </hgroup>

    <em>            语音语调加重
    <strong>        表示强调，内容重要！

    <blockquote>    块元素      长引用 引用的内容比较多的时候
    <q>             行内元素    短引用
<br>
<br>

## 布局标签
<br>

### 网页的头部：
    一个网页中可以有很多头部 定义文档或节的页眉
    <header></header>
<br>

### 网页的主体：
    一个页面中只有一个
    <main></main>
<br>

### 网页的底部：
    <footer></footer>
<br>

### 网页的导航
    <nav></nav>
<br>

### 网页中独立的区块
    <section></section>
<br>

### 网页中的独立的文章
    <article></article>

    用于定义一个独立的内容区块，比如一篇文章，一篇博客，一个帖子，论坛的一段用户评论，一篇新闻消息等

    article元素内可以嵌套其他元素，它可以有自己的头、尾、主体等内容。
    使用时要特别注意内容的独立性，一般对于独立完整的内容才使用article元素，如果只是一段内容的话应该使用section元素。
<br>


### 网页的边栏：
用作文章的侧栏, 跟主体相关又不属于主体的内容 侧边栏
    <aside></aside>

    aside 的内容应该与 article 的内容相关。通常用来表现侧边栏或者标注框。以是与当前文章有关的相关资料、名次解释，等等
<br>

### 点击查看详情：
用来对显示在页面的内容做进一步骤解释
首先是`<details>`标签，里面接着是标题`<summary>`，这里面的内容一般简短，具有总结性，会展示在页面。

    <details>
        <summary>details 元素的标题</summary>
    </details>

    

接着可以跟任意类型的HTML元素作为详情内容，这些内容需要在点击`<summary>`才会呈现。

**open** 属性   
当然，你也可以通过给`<details>`标签设置open属性让它默认为展开状态。
<br><br>


**p元素中不能放任何块元素**

#

## 表格
<br>

### 行内合并单元格<br>
下一个删掉，前一个标签内部写`colspan='2'`
<br><br>

### 列内合并单元格
下一个删掉，前一个标签内部写`rowspan='2'`

- 如果表格中没有使用tbody而是直接使用tr，那么浏览器会自动创建一个tbody，并且将所有tr装进tbody中, 所以记住 tr不是table的子元素 是tbody的子元素

- 默认情况下 元素在td中是垂直居中的 可以通过vertical-align来设置垂直的对齐方式
<br><br>


### 表格样式
#### 多重边框
单线边框(给table加的属性)：

    border-spacing:;
    指定边框之间的距离

    border-collapse: ;
    设置边框的合并
<br><br>
表格隔行变色
tr:nth-child(odd) {
    background-color:red;
}

---------------------------------------------

@内联框架

    - 用于向当前页面中引入其它页面, 相当于插了一张图片一样
    - 内联框架不会被搜索引擎去检查

    - 内联框架的边框 属性：frameborder 值为 0 / 1    没有边框 / 有边框
    - eg:
        <iframe src="" frameborder="0"></iframe>    

---------------------------------------------

@音频 & 视频

音频兼容格式比较好的就是mp3
音视频文件引入时，默认情况下不允许用户自己控制播放停止的

替换元素 用来引入音频
<audio src="" controls></audio>
- 属性：
controls    是否允许用户播放
autoplay    音频文件是否自动播放   但是目前大部分浏览器都不会自动播放
loop        音乐是否循环播放

- 属性：source
除了通过src来引入文件外，还可以通过source来指定文件的路径
通过这种方式引入的文件，可以加提示语句 也就是说支持这个标签的会显示播放器 不支持的会显示提示文字
- eg：

<audio controls>
对不起您的浏览器不支持播放音频，请升级浏览器
<source src='.mp3'>      可以支持多个文件 可以传入多种格式的文件 最终只会显示一个播放器，看哪个格式能用
<source src='.ogg'>
<source src='.wav'>
</audio>


ie8 中可以使用  用来引入音视频文件 会自动播放 这个标签非常不好用
<embed src="" type="">
- 这个标签必须指定 width height
- type 用来指定文件格式的
type="audio/video/mp3"

// 解决兼容性问题 ie8中用embed 其他浏览器使用 audio
<audio controls>
<source src='.mp3'>      可以支持多个文件 可以传入多种格式的文件 最终只会显示一个播放器，看哪个格式能用
<source src='.ogg'>
<embed src="" type="">      前面有支持了到不到这里
</audio>


用来引入视频
<video src=""></video>


---------------------------------------------

// 常用的选择器：

@元素选择器：
- 可以根据标签名选择指定元素：
- 语法：
标签 { }
p{ } h1{ } div{ }

@id选择器：
- 根据我们元素的id属性值选择一个元素，因为id不能重复，只能选择一个元素
- 语法：
#选择器的名字 { }
#red{ }
#name{ }

@类选择器：
- class是所有标签中的一个属性，作用和id一样，不同的是同一页面，它可以用很多次可以重复使用，通过它来选择一组标签
- 语法：
.选择器的名字 { }
.red { }
.name { }
<!-- class还可以为同一元素使用多个class也可以，用空格来隔开 -->
<p class=“red name”></p>

@通配选择器
- 选中页面中所有元素
- 语法：
*{ }

---------------------------------------------

// 复合选择器

@交集选择器
- 选中同时符合多个条件的元素，希望元素满足多个条件的时候用它
- 语法： 
selector1selector2selector3
- 注意：
复合选择器中，如果有元素选择器，必须元素选择器开头

div.red{
font-size:30px;
}
.a.b.c{}

@选择器分组（并集选择器）
- 同时选择多个选择器对应的元素
- 语法：
selector1, selector2{};

---------------------------------------------

// 关系选择器

@子元素选择器：
- 选择指定父元素的指定子元素
- 语法：
父元素>子元素
- eg：
div > span {}
div > p >span {}

@后代元素选择器：   
- 选中指定元素内的指定后代元素
- 语法：祖先 后代
- eg:
div span {}     //div中所有span的后代元素，范围大了些

@兄弟元素选择器：
- 选择下一个兄弟 无论是 + 还是 ~ 选择的都是后面的
- 语法：
前一个 + 下一个
p + span {}    //选择p后面的span，是紧挨着的一个

前一个 ~ 后一个
p ~ span {}     //选择下边所有的兄弟

---------------------------------------------

@属性选择器：
- 是根据标签内部的属性来筛选内容 比如id class name title等等 任何属性都可以

[属性名]{ }                 
选择标签内部含有指定    属性名  的所有元素
-eg:
单独使用可以 一般情况下 还可以复合使用
p[title] {}

[属性名=属性值]{ }
选择标签内部含有指定    属性和属性名    的所有元素

[属性名^=属性值]{ }
^是对属性值位置的筛选 前面的意思
选择标签内部含有    指定属性名 + 指定属性值开头是abc 的所有元素

[属性名$=属性值]{ } 
$是对属性值位置的筛选 后面的意思
选择标签内部含有    指定属性名 + 指定属性值结尾abc 的所有元素

[属性名~=属性值]{ } 
选择标签内部含有    指定属性名 + 指定属性值前是空格 的所有元素

[属性名|=属性值]{ } 
选择标签内部含有    指定属性名 + 指定属性值 或 指定属性值作为前缀 的所有元素
name='value'   或   name='value-a'

[属性名*=属性值]{ }
*是对属性值位置的筛选 任意的意思
选择标签内部含有    指定属性名 + 指定属性值任意位置 的所有元素

---------------------------------------------

// 伪类选择器（前面带一个：）和伪元素选择器（前面带一个::）：

@伪类选择器：
- 特点：
伪类用来描述一个元素的状态 比如第一个元素 被点击等等 它们的状态是什么
伪类一般情况下都是以冒号开头, 查找的是子元素
- eg：
<ul>
<li>第一行</li>
<li>第二行</li>
<li>第三行</li>
<li>第四行</li>
<li>第五行</li>
</ul>

// 在 所有 子元素中查找
:first-child { }
在当前的选择器中 查找第一个子元素为xx的元素        
ul>li:first-child     
ul > 第一个为li的子元素

:last-child { }
在当前的选择器中 查找最后一个子元素为xx的元素      
ul>li:last-child      
ul > 最后一个为li元素


@ 对 p:first-clild 的理解
正确理解：  第一个为p的子元素
错误理解：  p下的第一个子元素


:nth-child() { }
查找第N个子元素         
ul>li:nth-child(n, 2n/even, 2n+1/odd)      
n全选， 偶数位， 奇数位



// 在 同类型的子元素中 查找
- eg：
<ul>
<span>我是新加进来的</span>
<li>第一行</li>
<li>第二行</li>
<li>第三行</li>
<li>第四行</li>
<li>第五行</li>
</ul>

:first-of-type {}
在同类型的元素中，查找第一个

:last-of-type {}
在同类型的元素中，查找最后一个

:nth-of-type() {}
在同类型的元素中，查找任意位置的元素



// 否定伪类
:not()
- 将符合条件的元素从所有元素中去除后  将剩下的元素  设置为一种样式
- eg：
ul>li:not(:nth-child(3)) {
color:red;
}



// 伪元素选择器：
- 伪元素表示页面中特殊的并不存在的元素（特殊的位置）
- 特点：伪元素选择器用::开头

::first-letter  第一个字母
::first-line    第一行

::selection     选中状态

::before        开始的位置 缝 那里
::after         最后的位置 缝 那里
使用上面两个伪元素选择器要结合content使用

- eg:
p::selection {
background-color：red；
}


// 在元素获得焦点时向元素添加特殊的样式。
:focus
-eg:
<input type="text" id='inp' name='testFocus'>
input[name^=test]:focus {
background-color: #ff9292;
}

---------------------------------------------

@超链接的伪类：
- 伪类是描述一些元素的状态，我们考虑一下超链接的话都有什么样的状态

访问过
未访问  访问过没有访问过是由用户的历史记录来决定的

超链接的几种状态：
1. 没有访问过的链接         :link 正常的链接，没访问过的链接
2. 访问过的链接             :visited 用来表示访问过的链接，
3. 鼠标移入特效             :hover
4. 鼠标点击的状态           :active 点住别松手 看看                                   

思考：
假如我想给没访问过的链接加个红色怎么办？
可以用类选择器，但是这么加上了 链接的状态还跟颜色有关系么？ 一会访问过了后还是回是红色
a:link {
color:red;
}

---------------------------------------------

@继承
    样式的继承，我们现实生活中，都有继承的情况，比如我们的富二代 富三代
    在css中其实也有继承的现象

    <P>
        我是一个p元素
        <span>我是p元素中的span元素</span>
    </P>

    <span>看看这个元素的颜色变化了么？</span>

那什么叫做继承呢？ 我们给p元素 设置一个color 我们看看
这就是样式的继承，我们为一个元素设置样式，也会应用在它的后代元素中, 继承只会发生在后代元素中

    我们再举个例子

    <div>
        我是div
        <span>
            我是div中的span元素
                <em>我是div中的span的em元素</em>
        </span>
    </div>

我们给div设置颜色看看

继承的设置是为了方便我们的开发，假如没有继承会发生什么样的情况？
利用继承我们可以把共同的样式 设置到祖先元素中，这样我们设置一次就可以让所有的元素都具有该样式

body

是不是所有的样式都会被继承？
比如 背景相关的 布局相关的，都不会被继承
p background-color

---------------------------------------------
    
@选择器的权重
    我们先举个例子
    <style>
        div {
            color:red;
        }
        .box1 {
            color:bule;
        }
    </style>
    <div  class="box1">我是一个div</div>

这种情况下是谁盖住谁？

这个就是样式的冲突，当我们通过不同的选择器选中相同的元素，并且设置了不同的值
发生样式冲突时，应用哪个样式，是根据选择器的优先级决定的
优先级最高的是
1.内联              1000
2.id                100
3.class和伪类       10
4.元素选择器        1
5.通配选择器的样式是 0
6.继承的样式没有优先级

div.red and .red

比较优先级是，需要将所有的选择器的优先级进行相加计算，最后看再看谁高
分组选择器是单独计算的，选择器的累加不会超过其最大的数量级

可以在某个样式后添加!important 则该样式将获得最高的优先级 设置超过内联样式，最高优先级，但在开发中一定要慎用，尽量不用

---------------------------------------------

@单位

像素：像素其实就是屏幕上的一个个小点
不同屏幕的像素大小是不同的，像素越小的屏幕 显示效果越清晰
所有同样的200px在不同的设备下显示的效果是不一样的

百分比：
也可以将属性值设置为相对于其父元素属性的百分比
设置百分比可以使子元素跟谁父元素的改变而改变
em
是相对于元素的字体大小来计算的
1em = 一个fontsize 一般默认是16px
那10em就是160像素
em会根据字体大小的改变而改变
rem
rem是相对于根元素的字体大小计算的，em是相对于自身的字体大小，rem是相对于html的字体大小计算的
比如 html {}

@HSL
h 色相
S 饱和度
L 亮度

---------------------------------------------
        
@文档流

网页是一个多层的结构，一层落着一层 通过css可以为每一层设置样式，作为用户来讲 只能看到最上面的一层
最低层就叫做文档流，文档流就是网页的基础 我们所创建的元素，默认都是在文档流中排列的

元素对于我们来讲主要有两个状态
一个是在文档流中
一个不在文档流中 叫做脱离文档流

元素在文档流中有什么特点：

块元素：
    独占一行 div
    默认宽度是父元素的全部，会把父元素撑满
    默认高度是被内容撑开，或者说被子元素撑开   
            
行内元素：
    行内元素不会独占一行，只占自身大小
    行内元素在页面中左向右水平排列
    它的高度和宽度是有多少字就是多高多宽

---------------------------------------------

 @盒模型
            
非常重要的东西 跟布局相关，你要理解了盒模型后才能更好的布局
假如我的页面中有一个div，就意味着我要开始布局了，也就意味着 我要把我的div放到想放的位置
            
但是怎么摆放呢？
我得知道元素的形状和大小，css将页面中的所有元素都设置了一个矩形的盒子
无论是块也好 行内也好 div也好 p也好 span也好 所有的东西都是盒子

将元素设置为矩形的盒子后 ，布局就相当于摆盒子 我们的观念就是 每一个元素都是个盒子 每一个都有以下的几个部分组成

内容区  content     元素中的所有子元素和文本内容都在内容区中，内容区大小由width和height两个属性决定
内边距 padding
边框    border      属于盒子边缘 设置边框至少要设置三个样式，
                    border-width
                    border-color
                    border-style
                    边框的大小会影响到盒子的大小
外边距 margin

---------------------------------------------

@边框 

我们先弄出个盒子，然后给它加上边框，上面说过吧 边框是用来区分盒子里面和盒子外面的

.box1 {
    width:200px;
    height:200px;
    background-color:deepskyblue;

    //四个方向边框的宽度
    border-width:10px;          
        border-width:10px 20px 30px 40px;
        border-width:10px 20px;

    // border- 方向 -width
        border-top/bottom/left/right-width:10px;
    
    //用来指定边框的颜色，规则跟border-width都一样
    border-color:gold;          
    border-style:solid;

    上面的有点麻烦，可以这么写
    border:1px red solid;
}
其中 border-width可以不写 因为它有一个默认值，3个像素的样子

---------------------------------------------

@内边距
            
.box2 {
    width:200px;
    height:200px;
    background-color:gold;
    border:10px red solid;

    // 内边距 padding 一共有4个方向的内边距
    padding-top
    padding-bottom
    padding-left
    padding-right

    // 这个是简写属性
    padding:100px；             
}

---------------------------------------------

@外边距

外边距不会影响盒子的可见框的大小，但是外边距会影响盒子的位置 
我们元素在页面中是按照自左向右排列，默认情况下
    如果设置左和上外边距 会移动自身
    如果设置下和右，会移动其他元素

.box3 {
    width:300px;
    height:300px;
    background-color:lightblue;
    border:10px red solid;

    margin-top:100px;
}

---------------------------------------------

@水平方向的布局
            
元素水平方向的位置，元素在其父元素中水平方向的位置由以下几个属性共同决定
    margin-left
    border-left
    padding-left
    width
    padding-right
    border-right
    margin-right

一个元素在其父元素中，水平布局必须要满足以下的等式：
    margin-left+border-left+padding-left+width+padding-right+border-right+margin-right = 其父元素内容区的宽度 必须满足

我们看看inner现在的宽度是多少
    0+0+0+200+0+0+0 = 800

以上必须满足 如果相加结果使等式不成立，则成为过渡约束，则等式会自动调成
如果所有的值，没有为auto的情况 则浏览器会自动调整margin-right的值使等式满足

这7个值中有三个值可以设置为auto 如果这几个值中有auto，则会自动调整auto的那个值以使等式成立
    width
    margin-left
    margin-right

如果一个宽度和一个外边距设置为auto，则宽度会调整到最大，设置为auto的外边距会自动为0
优先满足宽度，调整外边距auto


@元素水平居中
如果将两个外边距设置为auto，宽度固定，则会将外边距设置为相同的值
    所以我们经常利用这个特点，来是一个元素在其父元素中水平居中

    width:100px;
    margin:0 auto;
   
---------------------------------------------

@垂直方向的布局
           
默认情况下 父元素的高度被内容撑开
在父元素中设置overflow属性，来解决元素高度溢出的问题

属性：
overflow:
    visible：   默认值，子元素会从父元素中溢出，在父元素外部显示
    hidden:     溢出的部分，将会被裁剪
    scroll:     生成两个滚动条，通过滚动条来查看完成的内容
    auto：      根据需要生成滚动条
    overflow-x;
    overflow-y;     这可以试验一下

---------------------------------------------

@外边距的折叠 

           
相邻的垂直方向的外边距会发生重叠现象
- 兄弟元素
    兄弟元素之间的相邻垂直外边距 会取两者之间的较大值
    特殊情况
        相邻的外边距一正一负 取和
        相邻的外边距都是负值，取绝对值 大的

兄弟元素之间的外边距重叠，对于开发是有利的，不需要处理
                        


- 父子元素
    父子元素之间的相邻外边距，子元素的会传递给父元素（上外边距）
    子元素设置了上外边距，其实也是给父元素设置了上外边距，所以会同时发生变化

父子外边距的折叠，我们必须要处理 会影响到布局
    1、可以不用margin改成padding 然后再减去父元素的高度
    2、发生外边距折叠，是因为box3和box4重叠，
            所以我们可以让它不重叠，可以在box4上边加一个bordertop

---------------------------------------------

@行内元素的盒模型

行内元素的盒模型
    我们的行内元素 不支持设置width 和 height 它不能通过宽高设置大小 它就是由元素来决定的
    行内元素可以设置padding，但是垂直方向padding不会影响页面的布局
    行内元素可以设置border，垂直方向的border不会影响到页面的布局
    行内元素可以设置margin，垂直方向的margin不会影响布局

- 属性：
    display: 用来设置元素的显示类型
    可选值：
        inline:将元素设置为行内元素
        block：将元素设置为块元素
        inline-block：将元素设置为行内块元素，宽高生效还没有独占一行
        table：将元素设置为一个表格
        none：元素不在页面中显示 用来隐藏一个东西
    
    visibility: 用来设置元素的显示状态
    可选值：
        visible：元素在页面中正常显示
        hidden：元素在页面中隐藏，位置保留

---------------------------------------------

@盒子的大小

默认的情况下 盒子的可见框大小是由 内容区 内边距 和 边框共同决定的

- 属性：
    box-sizing
        - 用来设置盒子尺寸的计算方式（width 和 height的作用）
    可选值：
        content-box 默认值，宽度和高度用来设置内容区的大小

        border-box 宽度 和 高度 用来设置整个盒子可见框的大小
        width和height 指的是内容区 和 内边距 和 边框的总大小 自动调整内容区的空间 说白了就是往里挤
 
---------------------------------------------

###兼容前缀

-webkit- 兼容谷歌
-moz- 兼容火狐
-o- 兼容欧朋
-ms- 兼容IE

---------------------------------------------

@轮廓 圆角 阴影

.box1 {
    width:100px;
    height:100px;
    background-color:red;

    border:10px red solid;
    outline:10px red solid;
    box-shadow:10px 10px 10px rgba(0,0,0,.5);
    border-top-left-radius:10px；
}

设置border后 相当于增加了可见框的大小假如下面有元素的话 会把元素往下挤

outline 
    - 轮廓 用来设置元素的轮廓线，用法和border一模一样
                轮廓和边框不同的点，就是轮廓不会影响到可见框的大小
    - 一般不会这么写，一般都是 鼠标移入时 加的效果


box-shadow:
    - 用来设置元素的阴影效果，阴影不会影响页面布局
    - 默认情况下 在元素的正下方，跟元素一边大
        1. x偏移量：设置阴影的水平位置 正值 负值
        2. y偏移量：设置阴影的垂直位置 正值 负值
        3.阴影的模糊半径：
        4.阴影颜色 rgba(0,0,0,alpha)
        5.inset outset

border-radius
    - 用来设置圆角的， 圆角设置的是圆的半径大小
    - 圆角一般都有4个方向
        border-top-left-radius
        boeder-top-right-radius
        border-bottom-left-radius
        border-bottom-right-radius 

    - 圆角 现实生活中 圆角 不单单是正圆还有椭圆
        所以一个属性中可以设置两个属性
        border-bottom-right-radius:10px 20px;   第一个是水平 第二个是垂直

    - border-radius 可以分别指定四个角的圆角
        左上 右上 右下 左下
        左上 右上/左下 右下
        左下/右下 右上/左下

    - 元素设置一个圆形：border-radius:50%;

---------------------------------------------

@浮动的简介

通过浮动，可以使一个元素向其父元素的左侧或者右侧移动
- 属性： float
    - 当我们设置float后 可以把元素想象成气球，可以让气球往父元素的左侧或者右侧飘
    - 它只会在它的父元素内飘 不会飘出父元素
    - 可选值        
        none
        left
        right
    - 注意：元素设置浮动以后 水平布局的等式 就失效了

- 浮动的特点：
    1，浮动元素会完全脱离文档流，不再占据文档流中的位置
    2，设置浮动以后 元素会向父元素的左侧或者右侧移动，
    3，浮动元素默认不会从父元素中移出，父元素就相当于浮动元素的一堵墙没办法逾越的
    4，浮动元素向左向右移动时，不会超过它前边的其它浮动元素（html代码的位置）
                如果浮动元素的上边是一个没有浮动的块元素
    5，浮动元素不会超过它上边的浮动的兄弟元素，最多最多就是和它一样高


// 浮动其他的特点

我们的浮动元素不会盖住我们的文字 文字会自动环绕在盒子的周围
    所以我们可以利用浮动来设置文字的环绕图片效果

没设置宽度所有默认全屏
    没设置高度所以默认被里面的元素撑开
    这时候我们给盒子设置浮动, 发现宽度没有了 为什么？

元素设置浮动以后 将会从文档流中脱离，从文档流中脱离后，元素的一些特点也会发生变化
    那元素脱离文档流后有什么样的特点呢？
    1，块元素不在独占一行 
    2，脱离文档流以后 块元素的高度和宽度都被内容撑开 脱离之后就没有全屏一说的

行内元素
    脱离文档流以后 会变成块块元素 和块元素一样
    脱离文档以后 就不需要区分块和行内了

---------------------------------------------

@高度塌陷

浮动的一些问题
一般我们在写pc端的代码时，一般宽度都是写死的 或者宽度会指定一个范围
但是高度呢？假如一个页面没太多的变化 都是固定的 那无所谓, 很多时候父元素的是不会写死的 ，它根据内容会变的

<div class="outer">
    <div class="inner"></div>
</div>

一个inner还好 可以撑开父元素，但有些情况是
一个outer里有很多的inner 而且还需要这些inner 浮动
inner浮动后 outer高度没了 这就是高度塌陷的问题

在浮动的布局中 父元素的高度是被子元素撑开的，当子元素浮动以后其会完全脱离文档流，子元素从文档流中脱离
    将会无法撑起父元素的高度，导致父元素的高度丢失
父元素高度丢失以后， 其下的元素会自动上移，导致页面的布局混乱

高度塌陷是浮动布局中比较常见的一个问题，这个问题我们必须要处理

BFC
- 是css中一个隐藏的属性，可以为一个元素开启bfc 开启bfc该元素会变成一个独立布局的区域 和 其他的块 不同
- 元素开启bfc后的特点：
    1，开启bfc的元素 不会被浮动元素覆盖
    2，开启bfc的元素的子元素 和 父元素的外边距不会重叠 
    3，开启bfc的元素可以包含浮动的子元素

怎么开启bfc
    1，设置元素浮动，高度不塌了 但是它会从文档流中脱离 宽度丢失
    2，将元素设置为行内块元素 display:inline-block;
    3，将元素的overflow设置为一个非默认值 overflow:scroll / auto / hidden(常用)




@clear 清除浮动元素对其的影响

- eg：
    <div class="box1"></div>
    <div class="box3"></div>

假如box1浮动 box3会上移 也就是说box3受到了box1浮动的影响，位置发生了改变
如果我们不希望某个元素因为其它元素浮动的影响而改变位置，则可以
通过clear属性来清除浮动元素对当前元素所产生的影响

clear
    - 作用： 清除浮动元素对当前元素所产生的影响
    - left： 清除左侧浮动元素对当前元素的影响
    - right
    - both：清除两侧中 影响最大的那个 
    原理 设置清除浮动以后 浏览器会自动为元素添加一个上外边距，使其位置不受其他元素的影响


// 高度塌陷的最终解决方案

    - 方式一
    -eg：
        <div class="outer">
            <div class="inner"></div>
            <div class="box1"></div>        //box1 没有用 只是解决高度塌陷的一个问题
        </div>
        box1 {
            clear：both；
        }
        解决思路 在元素的最后面加一个空的标签 然后让这个标签 clear both 然后就能撑起父元素的高度了

    - 方式二  clearfix
    - eg：
        css解决css的问题
        ::after 如果我写 选择的就是outer的最后

@clearfix

    <div class="outer">
        <div class="inner"></div>
    </div>

    .clearfix::before,
    .clearfix::after {
        content:'';
        display:table;      //inline-block 也可以但是inline-block即使是空串 也会占一行 把inline-block当做一个字就好了 所以最好的办法是table 没有内容也能分开
        clear:both;
    }

    - 给父元素添加 clearfix 哦~

    clearfix 这个样式可以同时解决高度塌陷 和 外边距重叠的问题，当你再遇到这些问题时
    直接使用clearfix 这个类即可

----------------------------------------------------

@ 定位

/*  
笔记：
    一般我们会给开启 absolute的元素的父元素 开启relative
/

opsition 
    - 是一种更加高级的布局手段 通过定位可以把元素摆在页面中的任意位置

    - 可选值：
        - static：      默认值 没有开启定位
        - relative：    相对定位
        - absolute：    绝对定位
        - fixed：       固定定位
        - sticky：      粘滞定位

// 相对定位 relative
    - 特点：
    1.定位位置，左上角的坐标原点为：
            元素在文档流中原先的位置
    2. 相对定位会提升元素的层级
    3. 相对定位不会脱离文档流，不会改变元素的性质 块还是块 行内还是行内

    4. 不设置偏移量不会发生任何变化 通过偏移量可以移动元素的位置，上下左右只会影响自己
        top：       定位元素 和 定位位置 上边的距离
        bottom：    定位元素 和 定位位置 下边的距离
            // 定位元素 垂直方向的距离 由 top 和 bottom 来控制 通常情况下 只会用一个
        
        left：      定位元素 和 定位位置 左边的距离
        rigth：     定位元素 和 定位位置 右边的距离
            // 定位元素 水平方向的距离 由 left 和 right 来控制



// 绝对定位 absolute
    - 特点：
    1. 定位位置，左上角的坐标原点为：
        1-1 父元素没有开启定位时，在窗口的左上角
        1-2 父元素开启定位后，绝对定位元素是相对于包含块进行定位的

    2. 绝对定位后，元素的位置不会发生变化
    3. 绝对定位后，元素会脱离文档流，绝对定位会改变元素的性质 行内变成块，块的宽高被内容撑开
    4. 绝对定位后，元素会提升层级

@包含块：
    - 正常情况下也就是在文档流中的情况时，包含块就是
            当前元素 最近的 祖先 块元素
    - 开启绝对定位元素的包含块是
            当前元素 最近的 开启定位的 祖先元素



// 固定定位 fixed
    - 固定定位也是一种绝对定位，大部分特质跟绝对定位一样
    - 不同点：
        固定定位的位置 永远 参照于 浏览器的视口 进行定位



// 粘滞定位 sticky
    - 粘滞定位 和 相对定位 的特点基本一致，不同的是 当元素到达某个位置时将其固定

    - 粘滞定位的理解如下：
    - eg：
        导航条 拖动滚动条时 导航条的位置不会发生变化，当滚动条往下拖动，导航条碰到顶部时 就固定在视口上 就叫粘滞定位

        {
            position:sticky;
            top:0;              //当元素到0时，固定住 跟fixed一样的效果
        }
    
    - 兼容性不太好，尤其是IE 所以一样的效果还是要搭配JS去做

----------------------------------------------------

@绝对定位 元素的布局

正常情况下的水平布局 要满足

        7个属性相加  等于 父元素的宽度

当开启绝对定位以后 就变了
当到了绝对定位后 我们水平方向的布局等式 要添加left和right 此时的规则和之前的一样

    left + 以前的7个属性 +right = 包含块的内容区的宽度

当发生过度约束时
    如果9个值中没有auto，则自动调整right值 以使等式满足
    如果有auto 则自动调整auto的值 以使等式满足


margin width left right 可以设置auto

水平方向居中：
    margin-left:0;
    margin-right:0;
    left:0;
    right:0;


垂直方向的等式 也要满足9个值的高度 等于 包含块的高度
垂直方向居中：
    margin-top:auto;
    margin-borrom:auto;
    top:0;
    bottom:0;

----------------------------------------------------

@元素的层级
    对于开启了定位的元素 可以通过z-index来调整元素的层级
    z-index:1-9999;

    元素的层级一样时，优先显示靠下的 指的是结构上的

    祖先元素的层级再高也不会盖住后代元素

----------------------------------------------------

@行高
    - 行高是指文字占有的实际高度
    - 我们可以通过使用line-height来设置div的高度

    - 行高的单位 px em 也可以设置一个整数，整数是字体大小的倍数
    - 默认行高为1.33

字体框：
    字体存在的格子，设置font-size就是在设置文字框的大小

行高的分配：
    行高会在字体框的上下平均分配 (100-50)/2

行间距：
    行间距 = 行高 - 字体大小


@单行文字垂直方向居中
    {
        font-size:50px;
        line-height:50px;
    }

@多行文字 或 元素 在父元素内居中
将父元素的显示模式设置为 table-cell 然后用vertical
.outer {
width:300px;
height:300px;
background-color:red;

// 将元素设置为成 单元格 td
display:table-cell;
vertical-align:middle;

}

.inner {
width:100px;
height:100px;
background-color:blue;

// td有的属性 对td好用的效果都好用  如果是文字的话好用，框体的话还是要用 margin:0 auto
text-align:center;
}

----------------------------------------------------

@表单
    - 表单用来提交数据 将本地数据提交给服务器

// 创建表单
<form action=""></form>
    - 属性： action
    - form表单中必须要有的一个属性
    - 表单要提交服务器的地址
    - <form action="target.html"></form>

// 表单项
文本框
    - 数据要提交给服务器，必须要为元素指定一个name值 name的值根据你文本框填写的内容来定
        <input type="text" name='username'>
    - 属性：
        autocomplete="on/off"       根据我们历史输入 自动补全 开启 关闭
        readonly                    将表单项设置为只读 跟value配合使用，数据会提交
        disabled                    将表单项设置为禁用
        autofocus                   自动获取焦点

密码框
    - 密码框要想提交也必须要指定一个name值
        <input type="password" name='password'>

提交按钮
    <input type="submit" value='btnname'>

单选按钮
    - 单选按钮也必须要指定name属性 用来进行分组 所以一组的东西必须有相同的name属性
    - 单选按钮还必须要指定value属性，value值最终会作为用户填写的值传递给服务器

    - 属性 checked 默认选中
        <input type="radio" name="sex" value='men' id="">
        <input type="radio" name="sex" value='women' id="">

多选按钮
    - 多选按钮也必须要name属性，一组的元素name属性应该一样
    - 多选按钮也必须要value属性
        <input type="checkbox" name="aihao" value='xx' id="">
        <input type="checkbox" name="aihao" value='yy' id="">
        <input type="checkbox" name="aihao" value='zz' id="">

下拉列表
    - 也需要指定name属性
    - option标签内部 可以写 selected 代表默认选中
    - eg：
        <select name="" id="">
            <option value=""></option>
        </select>

重置按钮
    <input type="reset" value="">

按钮
    <button type='button'></button>
    <button type='reset'></button>


移动端：
    移动端使用这两个标签会多一些 因为会弹出对应的键盘
    <input type="tel" name="" id="">
    <input type="email" name="" id="">


----------------------------------------------------

@字体的简写属性
    - 最好写在最前面
    - 顺序： 
        [字体粗细(bold) 字体样式(italic)] 字体大小(倒数2)/行高 字体族(倒数1)
// 字体大小 和 字体族 是必写属性 而且必须在最后面
// 行高 不写不是没有，而是使用了行高的默认值，所以可能会用默认值 覆盖掉 上面的line-height
// 字体粗细 字体样式 不写不是没有，而是相当于设置了默认值 normal 写在下面有可能会覆盖掉上面的样式
{
    font: bold italic 50px/2 中华正楷
}

    - eg:
        font-style:
        font-weight:

----------------------------------------------------

@字体族
特殊字体 怎么才能让客户去用

让用户可以使用服务器上的字体

@font-face{         //可以将服务器中的字体直接提供给用户去使用
font-family:;       //指定字体的名字 我给这个字起的名字 myFont
src:url();          //服务器上字体的路径
}

----------------------------------------------------

@图标字体
                
在网页中经常要使用一些图标，可以通过图片引入图片 但是图片本身会大 也不灵活
    所以在使用图标时，我们还可以将图标直接设置为字体，然后通过font-face的形式来对字体进行引入

我们就可以通过使用字体的形式来使用图标了
    我们可以把图标做成字体文件 然后通过font-face的形式 发回来使用

网上有很多图标字体库 
    国内比较多的是 iconfont 阿里的图标库

国外的是 font Awesome 英文的比较新
font Awesome
1. 下载
2. 解压
3. css 和 webfonts 移动到项目中 它俩必须在一起
4. 将css文件引入到网页中 
<link rel="stylesheet" href="">
5. 使用图标字体
- 直接通过类名来使用图标字体 fas或者fab是固定的
<i class="fas 图标名字"></i>
            
li::before {
content:'\编码';
font-family:去css文件中看看这个图标使用的哪款字体;
font-weight:900;    这个是css中字体下面带的 一起粘贴过来
}

- 通过实体使用来使用图标字体
<i class="fas">&#x图标的编码;</i>


> 阿里图标的使用方式
1. 引入iconfont.css
2. 创建一个<i class="iconfont">去复制实体</i>标签

----------------------------------------------------

@文本的对齐方式

水平方向的对齐方式
    text-align:

垂直方向的对齐方式
    vertical-align:
        baseline    基线对齐 默认值
        middele     子元素的中线和X的中线对齐 并不是严格意义上的垂直居中
        数值        可以通过数值来调整位置 正数往上 负数往下
    - eg:
        p {font-size:50px}
        span {font-size:15px; vertical:top}
        <p>今天天气<span>真不错</span></p>
        

// 垂直对齐 文字默认都是在基线上排列的
    vertical-align：bottom 子元素底部和父元素底部对齐


// 引入图片后 图片会与边框有一个缝隙 解决方案
    - 原因，img是替换元素，相当于一个文字，文字是沿着基线去对齐的 图片也一样
    - 解决方案：
        在img中设置 vertical-align：bottom/top 只要不是默认值baseline就可以

----------------------------------------------------

@文本的一些属性

// 文本修饰
text-decoration: underline overline line-through

还是可以指定完线的样式后添加颜色属性，跟边框的写法差不多 但是ie不支持
text-decoration:underline red soild;



// 省略文字... 效果

    .box2 {

        width:200px;

        // 必要的3个条件
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;

        // 设置网页如果处理空白
        white-space:nowrap;     //normal  nowrap 不换行  pre 保留
    }

----------------------------------------------------

@京东页面点击按钮 出现下拉框
    
    先做个框 然后放在北京的祖先盒子里，这个下拉框 一上来应该是隐藏的display:none;
    也就是鼠标移入到北京时，下拉框就显示出来了
            
    是绑定给北京的超链接么？
    :hover
    当鼠标移入一个div时，让它下面的兄弟元素显示出来
    也就是说 要给current-city绑定hover

    .current-city:hover + .city-list{
        display:block;
    }

    但是绑定给current-city后 鼠标再移出后 下拉框又消失了 到底要绑定给谁？
    应该绑定给他们的共同的父元素 这样的范围最大

    .location:hover  .city-list{
        display:block;
    }

    <div class="location">
        <div class="current-city">
            <i class="fas "></i>
            <a href="">北京</a>
        </div>
        <div class="city-list"></div>
    </div>

----------------------------------------------------

@背景相关

背景颜色：
background-color: ;


背景图片：
background-image: url('links/1.jpg');
- 背景图片默认在元素的左上角
- 如果背景图片 小于 元素，背景图片会自动在元素中铺满
- 如果背景图片 大于 元素，背景图片将有一部分无法显示
- 可以同时给背景设置 背景颜色 和 背景图片 背景颜色将成为背景图片的背景色


背景图片重复方式：
background-repeat: ;
- 可选值：
repeat      默认值
repeat-x    沿着x轴重复
repeat-y    沿着y轴重复
no-repeat   不重复


背景图片位置
background-position: ;
- 可用通过left right top bottom center几个方位的词来设置背景图片的位置
- eg：
top left      top center      top right

left center   center center   right center

bottom left   bottom center   bottom right
- 使用方位名词的时候 至少需要两个词 如果只写一个词的话 第二个值默认就是center

- 还可以通过偏移量设置 图片 的位置 至少需要两个值
- eg:
background-position:10px 10px;


设置背景图片的原点
background-origin: ;
- 设置背景图图片偏移量计算的圆点
- 可选值：
padding-box     默认值：background-position从内边距处开始计算，就是说图片的原点在内边距的左上角
centent-box     背景图片的偏移量从内容区处开始计算，也就是图片的原点在内容区的左上角
border-box      背景图片的额偏移量从边框处开始计算，也就是图片的原点在边框处的左上角


设置背景图片的范围      ie8不支持
background-clip:;
- 边框的下面有背景的 当我们想设置背景图片的范围时可用这个属性
- 可选值：
border-box      默认值： 背景会出现在边框的下面
padding-box     背景只会延伸到内边距，不会再出现在border的下方
content-box     背景只会延伸到内容区


设置背景图片的尺寸
background-size: ;
- eg:
background-size: 100px 100px;   
// 第一个值是宽度 第二个值是高度 如果只写一个 第二个值为auto
- 可选值：
cover:      图片比例不变 将元素铺满 以框体为主
contain：   图片比例不变 将图片在元素中完整显示 以图片为主


设置背景图片是否跟元素移动
background-attachment: ;
- 可选值：
scroll      默认值  背景图片跟着元素一起移动
fixed       背景图片会固定在页面中 不会随着元素一起移动
// 这个时候再进行定位 就是按照 视口 来定位了


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
- 如果有background-size属性的话
要写在position的后面 用 / 隔开
- eg：
background:red url('') center center/cover ....

- 如果有background-origin: ; 和 background-clip:; 的话, 
background-origin必须在前面
-eg：
background:red url('') center center/cover border-box content-box

----------------------------------------------------

@渐变
- 渐变是图片 需要通过background-image来设置 它的很多特点是跟背景图片一样的 跟color属性相距甚远
- 它属于一种颜色，特质跟图片一样
- 对老版本的ie兼容性不是很好


// 线性渐变
background-image: linear-gradient();
- 第一个参数可以传递方向
to right / to top left / 45deg(度数) / 1turn(一圈，.5turn .25turn)
- 颜色可以传递多个 默认情况下平均分配
也可以手动分配颜色分布情况 颜色的起始位置，颜色和数值之间用空格链接
红色从50px开始发生过渡渐变
background-image: linear-gradient(red 50px, yellow 70px);
- eg：
background-image: linear-gradient(to left, red, yellow, blue);


// 重复线性渐变
background-image: repeating-linear-gradient();
- 可以平铺的线性渐变 上面设置数值后 空白区域都是纯色平铺的
如果希望渐变平铺用这个属性
- eg:
当传递两个值时，和linear-gradient没有区别
background-image: repeating-linear-gradient(red, yellow);

当在颜色后面设置数值 也就是起始位置时，会有区别
background-image: repeating-linear-gradient(red 50px, yellow 100px);
高度为200px 渐变范围是50px，200/50=4个部分开始重复渐变


// 径向渐变：
background-image:radial-gradient()
- 第一个值在最中心，第二个值在外围
- 默认情况下，径向渐变的形状根据元素的形状计算的

- 指定径向渐变的范围 在第一个参数的位置
- 可以指定数值，还有预定义的语句：
circle  正圆 
ellipse 椭圆
- eg:
background-image:radial-gradient(100px 100px, red, yellow)
// 径向渐变的范围是100px x 100px
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



// 重复径向渐变：
background-image: repeating-radial-gradient(red, yellow);

----------------------------------------------------

@三角形的做法

box {
width:0px;
height:0px;
border:10px red solid;

// 下面是个尖朝上的三角 接下来这么操作
border-top:none;    //尖朝哪个方向 哪个方向的属性就设置为none 
// 剩下保留左右两边 和 下边

// 除了目标边 剩下的三边的颜色 换成透明色
// 这里和上面的正好相反，尖朝上 颜色就设定在下
border-color:transparent transparent white transparent

}

不想加结构的话，可以通过伪元素来设置
.app::after {
content:'';
// 变成块元素 才能设置 width 和 height
display:block;

width:0;
height:0;

// 写在下面的样式 都是相当于围绕content里面的内容添加样式
border:10px solid transparent
border-bottom-color:white;

// 这个放到最后吧
border-top:none;

position:absolute;
left:0;
right:0;
margin-left:auto;
margin-right:auto;
margin-top:-10px;

}

- 总结下：
::after before 里面的样式都是对content的值的设定

------

    另一种做法：
    .test {:
        width:0;
        height:0;
        border-width:40px;
        border-style:dashed soild dashed dashed;
                // 虚线起始为空阶段
        border-color:transparent red transparent transparent;
        overflow:hidden;
    }

----------------------------------------------------

@显示 与 隐藏

加过渡效果 hover时 结构上要关系

通常我们都是通过display来把元素进行 显示 和 隐藏的设置
{
display:none;
}
这样再加动画效果的时候 并不好处理
我们可以通过设置height来隐藏元素
{
height:0;
// 高度没有了 文本会移除 隐藏移除部分
overflow:hidden;
}

然后通过设置高度来显示元素
{
height:100px;
}

----------------------------------------------------

接上

@动画   过渡效果

属性:
- transition: ;
- 用于为样式设置过渡效果
- 样式改变时 必须是具体的数值
0 - 55 不能是 auto - 55 所以在移动偏移量时，要手动设置left:0
- eg：

xx {
height:0;
overflow:hidden;

// 当高度属性发生变化时 我要花3秒钟的时间去切换
transition:height 3s;
}
xx:hover {
height:55px;
}


----------------------------------------------------
    
@图片横向切换效果

有点像轮播图 鼠标移入后 切换了左边的图片

1. 图片如果是链接的话 可以用a标签，a标签用css样式设置背景图片

<div class="wrapper">
    <div class="img1">图片1</div>
    <div class="img2">图片2</div>
</div>

设计好结构之后 剩下的就是整体的移动两个元素 像移动轮播图的ul似

.wrapper {
    width: 100px;
    height: 100px;
    position: relative;
    overflow: hidden;
}

.img1, .img2 {
    width: 100px;
    height: 100px;
    background-color: #f2a154;
    text-align:center;
    line-height:100px;
    color:#314e52;
    position: absolute;
    left:0;

}
.img1 {
    transition:left .5s;
}
.img2 {
    background-color: #f7f6e7;
    left:-100px;
    transition:left .5s;
}

.wrapper:hover .img1 {  //hover效果要添加给他们的父元素
    left:100px;
}
.wrapper:hover .img2 {
    left:0px;
}                       //这里left的值并不是移动多少距离 而是移动到哪里 原先它的
                                left值为-100px, 我要移动到0px的位置

----------------------------------------------------

@固定定位，调整浏览器窗口 水平位置也不会变的技巧

在此之前先复习下 定位之后 我们水平方向的布局 要满足的等式
left + margin-left + border-left + padding-left +width + padding-right + border-right + margin-right = 包含块的宽度

这里我们先直说，固定定位（它是相对于视口来计算偏移量的）
left + margin-left +width + margin-right = 视口

需求：
空白 + 页面宽度 + 空白
空白 + 页面宽度 紧挨 目标div + 空白

不管怎么拖动浏览器水平的大小 我们的div都紧紧的挨着页面宽度

div {
position:fixed;
right:50%;
margin-right: 父容器的一半 + div的宽度
}

原理：
right:50% 让它到页面的中间 div右侧就是中线
left就是auto 那现在的等式就是

left + margin-left +width + margin-right = 视口
auto + 0 + div宽度 + 0 + 50% = 视口

我们不能给left指定固定值，还是因为浏览器窗口可能会改变
但我们可以减小margin-right的值，left的值为了使等式满足就会自动增大
然后通过left的值将我们的目标顶到目标位置，这样都是自动计算的 不管再怎么改变浏览器的水平窗口 目标位置也不会发生改变

- eg:
.targetBox {
width:50px;
height: 100px;
background-color: aquamarine;

// 经常会用到 这么写是利用了等式的原理
position:fixed;
right:50%;
margin-right:-550px;
bottom:270px;
}

----------------------------------------------------

@设置网站的图标 会在标题栏和收藏栏里显示

head标签里
<link rel="icon" href="图片地址">

- 网站图片一般都在网站的根目录下，名字一般都叫做 favicon.ico
- 可以去百度下 制作 ico图片

----------------------------------------------------

@网站上线时 压缩代码

VSCode里的插件：JS & CSS Minifier (Minify)
用法：
F1 --- minify:document

- 删除一些： 空格 换行 注释等
- 目的： 加载速度快 用户体验好 


----------------------------------------------------

项目练习：

/*  
笔记：

body的真实大小 要通过border来查看 直接给body设置背景颜色 其实是给html设置的

index.html  作为首页
index.css   开发时，样式写在外部样式表中链接进来，名字和html文件起成一样的
创建base.css文件用来放一些公共样式 内部比如整个网站要用的字体是什么 clearfix等等
引入图标字体库

主要区域的宽度是多少，一般是1200 1000

min-width:1200px;
最小宽度1200px 这样防止拖动浏览器 视口变小时影响布局

有的时候发现 上面元素虽然设置了 margin-bottom：17px 明明有地方 但是下面的文字上不去
看看是不是父元素里共同设置了line-height 下面的那行文字可能继承了line height属性 所以上不去 重置下就好了

以前会认为img之类的标签也属于行内元素，但设置text-align center 却没有生效 因为img属于行内块元素

想让一个对象不在父元素中占据位置 可以设置position:absolute


1， LOGO属于网页中最重要的部分 所以 logo 应该放在h1标签中   

2， 相对路径指的是 你写在哪里就相对于当前文件 去找图片

3. 背景图片居中 用background-position

4. logo h1等 上面要加上title

5. 在h1中 最好写上文字 方便搜索引擎能爬到 但写上文字后 会出现在屏幕上
所以 这时候我们用
text-indent:-9999px;

6. 使用display:none 隐藏元素 隐藏的元素不会占页面的位置 会影响布局
这时候我们可以用 visibility:hidden

7. 弹出层的问题 ul li a 结构是这样的 现在我给li绑定的hover 这样我离开li后
弹出层会消失，所以 还要给弹出层绑定hover
.nav li:hover ~ .goods-info,
.goods-info:hover {}

8. 接上，在所有li中 刨除第一个和最后两个
.nav li:not(:first-of-type):not(:nth-child(10):not(:nth-child(9))):hover ~ .goods-info
也可以要把 显示的东西 加上共同的类

9. 下拉层 应该有很好的层级 不要让别的元素盖住

10. button里的提示文字也可以是一图标字体 来完成 放大镜按钮
<button class="search-btn">
<i class="fas fa-search"></i>
</button>

11. input设置高度 不会太准 因为 内部有些默认的padding导致的
所以在设置input样式时 里面的padding去掉
可能要有边框的问题 border:none

12. button 里 有个默认属性 是box-sizing:border-box
这里的设置button的大小 会设置整个可见框的大小

13. 搜索框中的 div 文字 加 背景 点击的时候 消失 移出的时候显示 有字的时候也没有
只有没字的时候才会出现
这就是两个div 通过绝对定位 定到这里就可以

14. 输入框 点进去后发生 样式的改变 :Focus 

15. 结构要分析好 比如 一个div放哪

16. 垂直方向的问题 我们第一个想想行高的问题

17. 固定定位 垂直方向好调 bottom就可以
但是水平方向不行
窗口一拖动 水平方向就变了
布局等式 只针对这里：
left+margin-left+width+margin-right+right = 视口的宽度
刚才的做法是
auto + 0 + 26 + 0 + 60 = 视口的宽度
解决方案：
{
position:fixed;
right:50%;
//将right值设置为视口宽度的50% 效果就是不管浏览器怎么放大或者缩小
它的位置都在视口的一半 图形右边是中线
}
auto + 0 + 26 + 0 + 50% = 视口的宽度

这时候 我们想让图形左边的距离增大 那么只能减小marginleft或者marginright的值
因为减小marginleft的值 auto为了使等式满足就会增大
但是我们要减小marginright的距离

18. 用正方形等做线 
横线用width:70px height:1px 
竖线用width:1px height:70px;

19. 媒体查询

20. 项目在上线的时候 最重要的一点是访问速度 我用户需要多长时间才能把项目加载出来
时间越快 用户的体验就越好 所以我们不仅要把功能完成 还要尽可能的让项目小

所以往往在项目完成后 还要对我们的代码进行压缩 也就是没用的东西都删除
比如：
注释 换行 空格 
但是自己删这些东西有些麻烦，所以这里我们就有一个工具 代码压缩的工具
比如 vsCode里的插件 JS & CSS Minifier (Minify)
F1 --- minify:document


----------------------------------------------------

@animation  过渡


// 过渡 transition
- 过渡效果 是一种交互效果 是鼠标移入的时候 开始进行过渡效果
- 通过过渡可以指定当一个属性发生变化时的切换方式，可以提升用户体验
- 大部分属性都可以进行过渡 只要它的值是可以计算的 所以必须是 一个有效数值 向 另一个有效数值进行过渡
eg:
margin:auto     就不能过渡 因为auto没办法实现

- 执行过渡效果 有两个属性是必须的
1， 过渡的属性
2， 过渡花费的时间

- 用法：
1， 在目标元素中 设置属性
transition: [name] [ms / .2s];   /  transition: all [ms / .2s];
2， 给 目标元素 添加 :hover 来改变目标元素的 目标尺寸

- 属性：
- 过渡属性如果有多个 用逗号隔开 如果全部要发生改变 那就填写all

// 要执行过渡的属性
transition-property: ;          
eg：
transition-property: width;

// 指定过渡效果持续的时间
transition-duration: ;          
eg：
transition-duration: 2s / .2s = 20ms;

// 过渡的时序函数 (指定过渡的执行方式)
transition-timing-function: ;  
- 可选值：
ease            默认值      慢速开始 先加速 再减速 停的时候感觉很好
ease-in         加速运动
ease-out        减速运动
ease-in-out     先加速 再减速
linear      匀速

cubic-bezier()   通过贝塞尔曲线指定时序函数
https://cubic-bezier.com/#.17,.67,.83,.67
网站中可以查询数值#.17,.67,.83,.67      手柄的两个坐标
eg：
transition-timing-function: cubic-bezier(0,0,1,1); 

steps()          分步执行过渡效果
参数：分几步    steps(3) 
参数：end默认值 假如我们的总时长是2s 分2补 每步就是1s
    end    在时间结束时开始过渡
    start  在时间开始时开始过渡
steps(2, end / start) 
eg：
transition-timing-function: steps(2, end / start) ;

// 过渡效果的延迟  
transition-delay: ; 
- 等待一段时间后再执行过渡效果
eg:
transition-delay: 2s;


- 技巧：
简写属性：
可以同时设置过渡相关的所有属性，只有一个要求 要是写延迟 第一个时间是持续时间 第二个时间是延迟时间
eg：
transition: left 2s 2s ease;

margin-right等 也是可以过渡的 效果就是移动

属性也可以分别设置过渡时间：
transition-property: width, height;
transition-duration: 1s, 2s

----------------------------------------------------

@过渡 - 相关技巧

- 传统使用hover去移动 只能移动一次
- 这里我们可以用 时序函数来分几步进行操作
-eg：
transition-timing-function: steps(3)

----------------------------------------------------

@animation  动画

- 动画 和 过渡类似都是可以实现一些动态效果
不同的是过渡是在某个属性发生变化的时候才会触发 而动画
自动触发动态效果

- 设置动画效果，必须要设置一个关键帧，一副图片就是一帧（题外fps就是帧数）
- 关键帧：
设置了动画执行的每一个步骤
@keyframes identifier {
/* 动画开始的位置 from也可以使用       0%表示/
from{
margin-left:0;
}
/* 动画结束的位置 to也可以使用        100%表示/
to{
margin-left:700px;
}
}
不光只能指定开始 和 结束位置 还可以指定中间位置
@keyframes identifier {
from{
margin-left:0;
}

33% {

}

66% {


}

to{
margin-left:700px;
}
}

- animation 属性：
animation-name:             要对当前元素生效的名字
animation-duration:         动画执行的时间
animation-delay：           动画的延时
animation-timing-function:  动画的方式

animation-iteration-count:  动画执行的重复次数
- eg：animation-iteration-count: 3 / infinite 无限

animation-direction:        动画执行的方向
- 可选值：
normal      从from - to 运行
reverse     从to - from 运行
alternate   来回运行    去：from - to 回来：to - from
alternate-reverse
    回来运行    去：to - from 回来：from - to

animation-play-state:       动画执行的状态
- 可选值：
running 默认值 动画执行
paused 动画暂停  比如 当鼠标移入时暂停

animation-fill-mode:        动画的填充模式
- 可选值：
none        默认值 动画执行完毕元素回到初始位置 原来位置
forwards    动画执行完毕 停止在to的位置 终点位置
backwards   动画延时等待时 就会展示from里的状态
both        结合了forwards 和 backwards两个属性的特点 动画开始时就在开始位置 结束时在结束位置

简写属性：
没有特别的顺序要求，只需要注意时间 第一个是duration 第二个是delay
animation: test 2s 2 1s alternate;


操作步骤：
1， 设置关键帧
2， 把关键帧的名字添加给目标元素
3， 在元素中写 关于动画的各种属性

- eg：
@keyframes name {
/* 动画开始的位置 from也可以使用       0%表示/
from{
margin-left:0;
}
/* 动画结束的位置 to也可以使用        100%表示/
to{
margin-left:700px;
}
}

.targetBox {
width:100px;
height: 100px;
background-color: #FFA000;

animation: name 2s infinite alternate;

}



搜索spirite animation关键字 网上有一堆的连续静态动作图片
奔跑的少年练习：
.box1{
width: 256px;
height: 256px;
margin: 0 auto;
background-image: url('./img/12/bg2.png');
animation: run 1s steps(6) infinite;
}

/* 创建关键帧 /
@keyframes run {
from{
background-position: 0 0;       使用的是position让图片动起来的
}

to{
background-position: -1536px 0;
}
}

----------------------------------------------------

@变形

@开启视距后 页面就会有透视效果
- 想做3D效果一定要写上 perspective
html {
// 设置当前网页的视距为800px，人眼距离网页的距离 也就是说我眼睛和屏幕之间的距离是800px
perspective:800px;      

// 设置的不宜过小 600 - 1200 / 800 - 1000 这个区间范围
}


@是否显示元素的背面
{
backface-visibility:hidden / visible
}


@2D - 3D
- transform 变形的默认效果 是2D效果 假如需要显示3D效果 则需要开启
{
transform-style: preserve-3d;
}


X轴：水平方向叫X轴
Y轴：垂直方向叫Y轴
Z轴：想象成屏幕有一根箭 扎向眼睛 元素里我们人的距离叫做Z轴 Z轴越大离我们就越近

// 变形
- 变形就是指通过CSS来改变元素的形状或位置
- 变形不会影响页面的布局 只会影响自己 不会影响别的元素

- 可以写多个变形 多个变形中间 用空格隔开
- eg：
transform:translateX() translateY()


@平移：
transform:   用来设置元素变形的效果 里面怎么变还是要通过函数来指定
- 可选值：
translate();        平移
- translateX()      沿着X轴方向平移     可以指定具体数值，也可以指定百分比
在指定百分比时 偏移量是相对于自己进行计算的
- eg：
transform:translateX(50%);
    // 向右移动自身宽度的50%
- eg：
transform:translateX(100px);        //元素向右移动100px的距离 有点像margin但是不会影响别的元素
- translateY()      沿着Y轴方向平移


- translateZ()      沿着Z轴方向平移
- Z轴平移 调整元素在Z轴的位置，正常情况下就是调整元素和人眼之间的距离 直接开启的话没有效果
- Z轴平移属于立体效果（近大远小） 默认情况下网页是不支持透视的 如果需要看见效果
必须要设置网页的视距
html {
// 设置当前网页的视距为800px，人眼距离网页的距离 也就是说我眼睛和屏幕之间的距离是800px
perspective:800px;      设置的不宜过小 600 - 1200 / 800 - 1000 这个区间范围
}

然后再开启
box {
transform:translateZ(100px);
}
- 这个不是改变元素的大小，大小没有变，而是离我们近了或者远了



- 技巧：
// 块元素 垂直 水平 双方向居中
- 利用 变形效果中的平移属性
- transform:translateX()

之前我们可以 要设置水平 垂直方向居中的话 都是通过定位后 那个布局等式来操作的
方式一	元素高度 宽度确定
有局限性 这个方向 元素的大小是确定的 width height都有固定的值时可以 但是假如我希望元素的高度和宽度是不确定的 也就是被内容撑开的 也就是大小不确定 我还希望这个元素在屏幕中居中
{
position:absolute;
left:0;
right:0:
top:0;
bottom:0;
margin:auto;
}

方式二：
{
position:absolute;
left:50%;
// 这时候元素会在屏幕中间 但是中线是div的左边缘 也就是说元素在整个屏幕的中间偏右

transform:translateX(-50%);
// 上面是在中间偏右，偏了一个div的宽度 这时候这么设置 再往左拉会div宽度一半的距离就是水平方向居中
}
position:absolute;
left:50%;
top:50%;
transform: translate(-50%, -50%);


// 元素浮出效果 利用transform:translateY() 来实现的
.testBox {
width:200px;
height: 200px;
background-color: #FFA000;

margin:100px auto;

/* 给平移添加过渡效果 /
transition:transform .3s;
}

.testBox:hover {
transform: translateY(-3px);
box-shadow: 0 5px 5px rgba(0,0,0,.5);
}


----------------------------------------------------

@旋转
开启视距后 更加的明显

通过旋转可以让元素沿着 XYZ轴 旋转到指定的角度
transform:rotate()
- turn deg

rotateX()           往后仰
rotateY()
rotateZ(45deg)      Z轴在中心 围着中心旋转45度 平面旋转
- 中心点的设置

----------------------------------------------------

@ 练习 钟表

秒针的思路：
    正常我们给元素设置 rotateZ(360deg)的话 中心在下面，但是秒针的话 应该是沿着根部旋转
    ----- 中心 ----

    解决方案:
    我们把做好的秒针 放在外面容器的div中 秒针的高度是div高度的一半 然后把div设置旋转
    然后去掉div的背景色

    .testBox {
        width: 400px;
        height: 400px;
        /* background-color: #FFA000; /

        margin:50px auto;
        position:relative;

        // 开启动画
        animation: run 60s;
    }

    .targetBox {
        height:200px;
        width:3px;
        background-color: #212121;
        margin:0 auto;
    }

    .en {
        width:10px;
        height: 10px;
        background-color: tomato;

        // 设置水平垂直双方向居中
        position:absolute;
        left:50%;
        top:50%;
        transform:translateX(-50%) translateY(-50%);

        // 圆角
        border-radius:50%;
        
    }

    // 设置关键帧
    @keyframes run {
        from{
            transform:rotateZ(0);
        }
        to {
            transform: rotateZ(360deg);
        }
    }

----------------------------------------------------

@ 练习 立方体 复仇者联盟

笔记：
    1. 给图片设置透明效果
        可以给装图片的容器设置透明效果：
        div {
            opacity:0.5;
        }
    
    2. transform 变形的默认效果 是2D效果 假如需要显示3D效果 则需要开启
            transform-style: preserve-3d;

----------------------------------------------------

@缩放

transform:scale()
- 对元素进行缩放 缩放的原理是把对应的轴给延长 所以Z轴是没有用的
- 要想看到Z轴的效果 必须要开启3D效果
- eg： transform-style:preserve-3d;
- scaleX()
- 参数：
整数：放大倍数     小数：缩小
transform:scaleX(2);    //沿着X轴放大两倍
- scaleY()
- scale()
X Y轴 双方向缩放


@变形的圆点

transform-origin:
- 可选值：
center：    默认值
0 0：       元素的左上角

----------------------------------------------------

@less 简介

    - less是一门css的预处理语言，是css的增强版，通过less可以编写更少的代码实现更强大的语言
    - 在less中添加了许多的新特性，比如对变量的支持，对mixin的支持
    - less的语法大体上和css的语法一直，但是less中增添了许多对css的扩展
            所以浏览器无法直接运行less代码，要执行必须先将less转换为css，然后再由浏览器去执行

    - less的转换插件：
        easy less 安装完插件后 自动把less转换为css语言

    - less的使用 新建一个文件.less  比如test.less 在这个新文件中书写less的代码
        然后在保存时同文件下会生成 同文件名的css文件
        test.less
        test.css




    - css的不足点：
        1. 同一个颜色可能因为设计风格统一 会应用到许多的地方 这个颜色在我们的网页中是需要反复去使用的
                比如有100个地方使用了 未来在修改换风格的时候 修改起来会非常麻烦

        - 解决方案：
            把这个颜色存起来 把它变成一个变量 这样去要使用颜色的地方应用变量 未来修改的时候会很轻松

            我们在根标签中设置变量
            html {
                --变量名：样式值
                --color:#bfa        //现在我设置了一个变量名为color 值为#bfa的变量
                --length:100px;
            }

            box {
                // 用var 代表要使用变量
                background-color:var(--color)
                width:var(--length);
                height:var(--length);
            }

        
        2. 在布局 或者 使用图片的时候 我们经常需要去算一些数据 在css中有自动算的函数
        
        - 解决方案：
            calc();     //计算函数
            {
                width:calc(1000px/2);
            }
        
        css中是支持变量已经计算函数的但是浏览器的兼容性不好

----------------------------------------------------

@less的语法

一， 选择器的一些写法

// 后代元素选择器：
CSS中想些box1的后代元素box2的样式，需要这么写：
box1 box2 {
    background-color:red;
}

less中 可以这么写：
box1 {
    background-color:#bfa;

    box2 {
        background-color:yellow;
    }
}


// 子元素选择器的写法
.box1 {
    color:red;

    // box1的后代元素box2
    .box2 {
        color:yellow;
    }

    // box1的子元素box3
    >.box3 {
        color:blue;
    }
}


// 加hover
    - & 就代表 {} 外的选择器， &写在哪里 就代表当前{}括号外的元素
CSS中：
.box1 {
    color:red
}
.box1:hover {
    color:blue;
}

less中:
.box1 {
    color:red;

    &:hover {
        color:blue;
    }
}


// 选择器 样式扩展 

方式一：
:extend()
    - 对当前选择器扩展指定样式
    - 通过选择器来选择 指定选择器内部的样式
    - 语法：
        当前选择器:extend(继承选择器字符串不单可以是一个选择器 还可以是子元素选择器等等) {}

        CSS中：
        .p1 {
            width:100px;
            height:100px;
        }
        .p2 {
            width:100px;
            height:100px;
        }
        这时候我们可以用分组选择器吧
        p1, p2 {
            width:100px;
            height:100px;
        }
        当p2 还需要写不同的样式时怎么办？
        p1, p2 {
            width:100px;
            height:100px;
        }
        p2 {
            color:red;
        }

        less中 可以这么解决：
        p1 {
            width:100px;
            height:100px;
        }

        p2:extend(.p1) {        //扩展p2选择器的样式，并继承p1的样式
            color:red;  
        }

方式二：
    - 混合函数
    - 通过复制来选择指定选择器的样式

p1 {
    width:100px;
    height:100px;
}

// p3要扩展样式
.p3 {
    // 直接对指定的样式进行引用 就相当于把p1的样式在这里进行复制
    .p1();
}


// 还有一种更常见的用法 创建混合函数给别人用 这也是less里特别重要的特性
// 创建一个mixin 也就是混合函数
.p4(){
    width:100px;
    height:100px;
    background-color:red;
}

// 在p5里调用
.p5 {
    .p4();
}




二， 变量的创建和使用 变量生效值的原则

    - 在变量中可以存储任意的一个值 并且我们可以在需要的时候，任意的修改变量中的值
    - 变量的原则：
        就近原则，谁越靠下 谁就生效

    - 语法：
        创建变量
        @变量名: 值 值可以是任意类型

    - 使用变量：
        如果是直接使用 以@开头 @a
        如果是作为类名，或者一部分值使用时 必须以 @{变量名}的形式使用

    - eg：
        @a:100px;
        @b:red;
            - eg：
                .box1 {
                    width:@a;
                    background-color:@b;
                }

        @c:box5;
            // 变量值可以是任意内容，可以是一个类名
            - 作为 类名 使用时 要把变量用{}括起来
            - eg：
                .@{c} {
                    width:@a;
                }


三，引用变量
    - 有些时候我们需要一个值 引用上面的值 这样两个值可以一起更改
    - 语法
        引用哪个值的前面加上$，然后作为值来使用
        $width
    - eg：
        .box {
            width:100px;
            height: $width;
        }


四， 混合函数
    - 在混合函数中可以设置形参
            这样可以根据我们的实际需求去设置盒子的大小
    - eg：
        之前的用法：
        // 创建混合函数
        .p1(){
            width:100px;
            height:100px;
        }
        // p2中引用p1
        .p2 {
            // 这是p1中的样式
            .p1();

            // 下面的是新样式
            color:red;
        }

        还可以在混合函数中传递形参  形参中还可以传递默认值 这样的好处就是 在写实参的时候 有些值可以不写 就代表使用默认值
        .p1(@w, @h){            .p1(@w:100px, @h:200px){
            width:@w;
            height:@h;
        }

        // div引用创建好的混合函数p1
        div {
            // 调用混合函数p1 按顺序传递值
            .p1(200px, 100px);     这时候来赋值给形参

            // 不按顺序时 可以指定变量名 和 变量值
            .p1(@w:100px, @h:100px);
        }


五， 取两个颜色中的平均值
average();

span {
    color:average(red, yellow);         //文字颜色或者红色和黄色的中间值
}


六， 颜色加深
- darken();

需求：当鼠标移动到div上时 比之前的颜色加深指定数值
html {
    width:100%;
    height:100%;
}

body {
    width：100%；
    height:100%;
    background-color:#bfa;
}

body:hover {
    // 想比bfa加深10%
    background-color:darken(#bfa, 10%)           //如果不起作用的话 给html指定个高度和宽度就好了
}


七， less中最强大的功能
- 在less中所有的数值都可以直接运算

.box1 {
    width:100px + 100px;
    height:100px;
}


less模块化处理：
八， 引入 在less中引入外部别的文件
@import:'css/.less'

优点是可以对less文件做一个模块化的处理
比如：
    我可以创建4个less文件
    第一个负责：定义变量
    第二个负责：定义动画效果
    第三个负责：定义布局相关的东西
    第四个负责：对它们的整合

这样方便我们的维护哪个出问题了 去哪个里面找就可以了


九，配置css 和 less 之间的映射
- 正常我们代码出错后 在网页中能看到第几行出现的问题 但是这个行数指的是css文件中的行数
        由于我们的代码是在less编写的 这样我们就需要知道css中的44行 是 less中的多少行
    所以我们需要一个映射关系

- 配置vs code里的插件
{
  "less.compile": {
    "compress": true, // true => remove surplus whitespace
    "sourceMap": true, // true => generate source maps (.css.map files)
    "out": false // false => DON'T output .css files (overridable per-file, see below)
  }
}
设置 -- 扩展 -- less --  

----------------------------------------------------

@弹性盒子

- flex（弹性盒，伸缩盒）
是CSS中又一种布局手段，它主要是用来代替浮动来完成页面的布局 
它是为了解决浮动的问题的又一种布局方式
- 比如子元素浮动 父元素高度塌陷的问题

如果是不用兼容老的浏览器 做的移动端的项目就可以用flex

- flex可以使元素具有弹性，让元素可以跟随页面的大小的改变而改变
- 弹性容器的设置：

- 弹性容器：
要使用弹性盒，必须要将一个元素设置为弹性容器 我们通过display来设置弹性容器
display:flex;           块级弹性容器
display:inline-flex;    行内的弹性容器


- 弹性元素：
弹性容器的直接子元素是弹性元素（弹性项）
一个元素可以同时是弹性容器 和 弹性元素


- eg：
<ul>                弹性容器
<li></li>       弹性元素
<li></li>
<li></li>
</ul>

ul {
width:800px;
border:10px solid black;

display:flex;
}

li {
display:flex;   这时候li既是弹性容器 又是弹性元素
}




- flex的样式
- 弹性容器 和 弹性元素 各有自己的样式

// 弹性容器的样式：
- flex-direction:  指定容器中弹性元素的排列方式， 也可以说是指定主轴
- 可选值：
row             默认值 弹性元素在容器中水平排列 左向右  跟国家的书写习惯有关 中国就是 左 → 右  日本可能就是 上 ↓ 下
主轴： 自左向右

row-reverse     弹性元素在容器中反向水平排列 右向左  
主轴： 自右向左

column          弹性元素纵向排列 自上向下
主轴： 自上向下

column-reverse  弹性元素反向纵向排列 自下向上
主轴： 自下向上
- eg:
ul {                    它现在是弹性容器
display:flex;
flex-direction:column;

}

- 主轴 和 侧轴
- 主轴： 弹性元素的排列方向 称为 主轴
- 侧轴： 与主轴 垂直方向的 称为 侧轴

- flex-wrap:    设置弹性元素是否在弹性容器中自动换行
当盒子本身的宽度不足以容纳盒子内部的元素时是否换行
- 可选值：
nowrap      默认值 不换行
wrap        元素沿着侧轴方向自动换行 往下走
wrap-reverse    元素沿着侧轴反方向换行 往上走

---- flex-flow:    wrap 和 direction的简写属性
- flex-flow: row wrap;    横向排列 换行

- justify-content：     如何分配主轴上的空白空间 
也可以理解为主轴上的元素如何排列
- 可选值：
flex-start      元素沿着主轴起边排列 意味着如果有空白 空白应该在最后
flex-end        元素沿着主轴终边排列 意味着如果有空白 空白应该在开始
center     元素居中排列 空白就会分部在两边
space-around    空白分布到元素两侧
space-evenly    空白分布到元素的单侧    浏览器的兼容性不太好
space-between   空白均匀分布到元素间
- 应用：
元素这时候想水平居中的话 直接
justify-content:center;


技巧：
看到justify都是主轴的属性
看到align-items都是侧轴上的属性

- align-items:      元素在侧轴上如何对齐 它设置的是元素间的关系
- 可选值：
stretch     默认值 将元素的长度设置为相同的值
flex-start  元素不会拉伸 沿着侧轴起边对齐
flex-end    元素不会拉伸 沿着侧轴终边对齐
center      居中对齐
baesline    基线对齐

- align-content：   侧轴上的空白空间的分布
跟justify-content的可选值 的 效果是一样的

弹性容器上的属性 主要是用来控制元素的对齐方式的

穿插一个 弹性元素的样式
- align-self:   用来覆盖当前弹性元素上的align-items



// 侧轴富裕空间的管理
单列单行：
align-items
align-self(优先级高)
多行多列
align-content




// 弹性元素的样式：

- flex-grow:    指定弹性元素伸展的系数 默认值为0，不伸展
当父元素有多余的空间时，子元素如何伸展 
父元素的剩余空间，会按照比例进行分配
- eg：
flex-grow:1         //平均分配剩余空间  

- 假如父元素剩余空间为600
- eg：
li:nth-child(1){ flex-grow:1 }  100
li:nth-child(2){ flex-grow:2 }  200
li:nth-child(3){ flex-grow:3 }  300


- flex-shrink:  指定弹性元素收缩的系数
- 当父元素中的空间不足以容纳所有的子元素时，如何对子元素进行收缩 
默认值是1 等比例进行收缩 0就是不收缩 也就是元素会溢出

- 缩减系数的计算方式比较复杂，缩减多少主要是根据缩减系数 和 元素大小来计算的
- 基本的理论就是元素越大缩减越多

- 假如父元素为500，每个li为200，父元素差了100
- eg： 
li:nth-child(1){ flex-shrink:1 }  
li:nth-child(2){ flex-shrink:2 }  
li:nth-child(3){ flex-shrink:3 }  值越大收缩的越多


- flex-basis:   元素的基础长度 跟width一样 用它来指定元素的基础长度 width就没有用了
- 元素在主轴上的基础长度
如果主轴是横向的 该值指定的就是元素的 宽度
如果主轴是纵向的 该值指定的就是元素的 高度

- 默认值是auto 表示参考元素自身的高度 或 宽度
如果传递了具体的数值，就以该值为准

- flex-grow         弹簧能伸多长
- flex-shrink       弹簧能缩多短
- flex-basis        弹簧静止时的状态
- 这三个就像弹簧的三个状态


--- flex：    简写属性 可以设置弹性元素的所有三个样式
- 顺序： 增长 缩减 基础
- 预定义值：
initial     相当于      flex: 0 1 auto; 
auto        相当于      flex: 1 1 auto;
none：      相当于      flex: 0 0 auto;     弹性元素没有弹性

- eg：
flex: 1 1 auto;

flex:1  (flex-basis:0% flex-grow:1 flex-shrink:1);
// 等分布局


order:      决定弹性元素的排列顺序
- 有了它以后 就不用再通过结构去改变元素的顺序了 直接可以指定
- eg：
box1 box2 box3
box1 {order:3}
box2 {order:1}
box3 {order:2}

box2 box3 box1

----------------------------------------------------

@浏览器的宽度 和 分辨率 不一致

我的电脑屏幕分辨率是1920*1080的，我开发了一个网页，宽度是100%，
可为什么我使用$(window)、$(document)、$(document.body)、window.screen获取到的
最大宽度、高度都不足1920*1080呢？即便我把页面全屏显示了也是如此。

后来又尝试获取鼠标在页面的位置坐标，仍然如此，这是为什么呢？

那说明该浏览器的物理尺寸被缩放了；
如果操作系统使用直接的物理尺寸（尤其你屏幕的外观尺寸又小），
你的所有的窗口是看不清楚的，你可以看看你的显示设置，可能是Scale 120的样子

的确，在 显示设置 里面有一个 更改文本、应用和其他项目的大小：125%（推荐），更改为100%后效果就有了。

----------------------------------------------------

@像素
- 屏幕是由一个个发光的小点构成的 一个点就是我们的像素
- 分辨率 就是屏幕中小点的数量

- 在前端开发中 像素要分两种情况谈论，CSS像素 和 物理像素
- 物理像素： 上述的分辨率就是物理
- CSS像素：  编写网页时，我们所用的像素都是CSS像素
eg：    width:100px;

- 浏览器在显示网页时，需要将CSS像素转换为物理像素然后再呈现
- 一个CSS像素 最终 有几个物理像素显示 有浏览器决定
默认情况下 PC端：一个CSS像素 = 一个物理像素

@视口(viewport)
- 视口就是屏幕中用来显示网页的区域
- 我们可以通过查看视口的大小，来观察CSS像素 和 物理像素的比值
- 一般看视口的时候 我们只看 宽度 不看 高度
原理：
网页中一个块元素的宽度 是 父元素的100% 所以只需要找到视口的子元素就可以了
视口的子元素就是html
先把浏览器的缩放功能重置到100% 直接点html标签 看右侧的盒模型
- 默认情况下 视口宽度 1920px 像素 这时候 视口宽度 和 物理像素 是一样的
- 此时 CSS像素 和 物理像素 是1:1

- 我们的浏览器 按钮ctrl + 滚轮 可以缩放大小 放大网页 视口的可视区域就变小了

- 放大两倍的情况下
- 视口宽度是 960px （CSS像素）
- 物理像素是1920px 物理像素是不会变的
- 此时CSS像素 和 物理像素 是1:2
- eg：
width:100px;
height:100px;
background-color:#bfa;
- 此时CSS像素是100px 物理像素是200px 怎么确认 用截图工具去量 截图工具量到的都是物理像素

- 我们可以通过改变视口大小 来改变CSS像素和物理像素的比值

// 总结 
我们可以先观察下 物理像素，然后再检查下开发者管理工具html的宽度 是否和物理像素一样
然后我们可以在显示设置中查看 显示比例是不是100%
这时候就能知道 物理像素 和 CSS像素的比值关系了

----------------------------------------------------

@移动端

在不同的屏幕 单位像素的大小是不同的，像素越小屏幕会越清晰

https://material.io/resources/devices/
上述网站可以查询一部分手机的分辨率

智能手机像素点 远远小于 计算机的像素点 视网膜屏像素点不能被肉眼察觉 特别的小

举个例子：
24寸的显示屏    1920X1080
i6 4.7寸屏      750X1334

问题：
一个宽度为900像素的网页 在i6中要如何显示呢？
// PC端的尺寸
.box1 {
width:900px;
height:100px;
background-color: tomato;
}

// 然后在页面中打开 查看i6屏幕的情况 发现900px竟然还没有把i6的750 撑满
因为：
i6的750像素 是物理像素 而900px是CSS像素 所以不能直接看900 和 750这两个数值 比值不一样
我们应该看的是 视口大小 我们看下 控制台里 Computed里现实的宽度 是980px

// 默认情况下，移动端的网页都会将视口设置为980像素（CSS像素）
以确保PC端的网站可以在移动端正常访问 
如果网页大小超过980 移动端的浏览器会自动对网页进行缩放以完整的显示网页
其实就是当网页过宽的时候 视口会自动调整

以前比较早的时候 网页的宽度都不会超过1000px 一般都是980 960的宽度
所以移动端把视口设置为980 这样就可以达到一个效果 我随便打开一个网页 就能看到网页的全貌


所以大部分的PC端网站都可以在移动端正常浏览 但是往往都不会有一个好的体验

比如:
我们将网页的宽度设置为了980像素（CSS像素），但是物理像素是750 （131%）
网页过小 没办法看

为了解决这个问题大部分网站都会为移动端设计一个网站 PC端访问是一个 移动端是一个
如果你的网站也要给移动端浏览 必须为移动端再设计一个网页


----------------------------------------------------

@开发移动端页面
// 将网页的视口设置为完美视口 开发移动端 先写这句话
<meta name="viewport" content="width=device-width, initial-scale=1.0">

先说一个问题 比如 我写一个100px x 100px的盒子 在PC端看 和 在移动端看 大小不一样 移动端的小了 为什么？


移动端默认视口是980px（CSS像素）默认情况下 

移动端的像素比： 980 / 移动端宽度   （eg： i6   980 / 750 = 1.31）

如果在网页中直接编写移动端代码 这样在980的视口下，像素比是非常不好的，导致网页中的内容非常非常的小

所以在编写移动页面时，必须要确保有一个比较合理的像素比：
1个CSS像素 对应 2个物理像素   相当于 比PC端放大两倍    有的时候还可以 
1个CSS像素 对应 3个物理像素 

@我们要写移动端页面时 第一件事就是调整网页的像素比，把像素比调整到一个比较合理的范围

@调整像素比
我们可以通过改变视口大小 来改变CSS像素和物理像素的比值
比如i6 物理像素是750 那我把视口调成375 那是不是就是1 ： 2了

- 我们可以通过meta标签来设置视口的大小


// 设置视口大小 将网页的视口设置为完美视口
<meta name="viewport" content="width=device-width, initial-scale=1.0">



name是要设置数据的名字 viewport视口
content是设置多少 我们只考虑宽度 视口的宽度是width 高度不用考虑
- eg: 
<meta name='viewport' content='width=100px' >
// 把视口的大小设置为100px
那现在的像素比是多少，
100 / 750 等于 1 / 7.5 一个像素 等于 7.5个像素
假如调整成200px，那像素比为
200 / 750 等于 1 / 3.25 一个像素 等于 3.25个像素


每一款移动设备在设计时，都会有一个最佳的像素比 一般我们只需要将像素比设置为该值即可得到一个最佳的效果

比如： 我们看那个网站 https://material.io/resources/devices/ 的最后一列
i6 最后一列是 2.0 也就是 1个css像素 对应 2个物理像素 xx / 750 = 1 / 2
<meta name='viewport' content='width=375px' >  这时候就能达到i6的最佳像素比

将像素比设置为最佳像素比的视口大小我们称其为完美视口 但是不同设备中完美视口的大小并不一样
上面那个网站 dpi那列就是完美视口的尺寸


所以 content中不能写固定的数值 要写上width=device-width
device-width是一个网页中提供的一个变量 表示设备的宽度 也就是设备的完美视口

<meta name="viewport" content="width=device-width>

initial-scale=1.0 是初始化缩放是1倍

----------------------------------------------------

@移动端的单位

不同设备的完美视口是不一样的 比如
iphone6     完美视口是375
iphoneX     完美视口是414

box1 {
width:375px;
height:100px;
}
在i6中中能完美全屏，但是在ix中就缺了一块

由于不同设备视口和像素比不同，所以同样的375个像素在不同设备下意义是不一样的

所以在移动端开发时，就不能再使用 px 来进行布局了

// vw
- 表示视口的宽度（viewport width）
- 100vw = 一个视口宽度   /   1vw = 1%视口宽度
- vw这个单位永远相当于视口宽度进行计算的

----------------------------------------------------

@vw的换算

设计图的宽度 750px 1125px 一般常见的移动端设计图宽度是这两个 最早都是参考苹果的屏幕去计算的 i6 的完美视口就是375
也就是说i6中一个css像素 对应 两个物理像素

750  称之为 2倍图
1125 称之为 3倍图

为什么是倍数呢 正好是375不好么？ 如果我的图就是375的话 在移动端显示时放大2倍就是750 就会失真
所以我们的设计图干脆就是750 这样拿到的所有图都是2倍效果 这再拿到移动端里看时 就不会失真
为什么现在都是3倍图呢？ 因为现在的屏幕越来越清晰了 现在可能3倍图才能满足一个大部分的情况



设计图是750 使用vw作为单位，那100vw是750ox

100vw = 750px


那假如我的需求是创建一个 48px x 35px 大小的元素 
- 注意 这只是图片的单位，这种设计图 放在移动端的网页里不能要求像素了 只能要求比例

100vw = 750px   几个vw = 1px   100 /750
↓
0.1333333333333333vw = 1px;

48px = 48 X 0.1333333333333333 = 6.4vw
35px = 4.667vw

----------------------------------------------------

@vw的适配

网页中字体大小最小是12px，不能设置一个比12px还要小的字体 0可以 其它的都不行
如果我们设置了一个小于12px的字体 则浏览器自动修正为12px


上面讲到 如果设计图是750px 100vw是视口的宽度 也就是750px
我们首先得知道1px = 0.1333333333333333vw    算法 100vw / 750px = 0.1333333333333333
假如我想创建 50px x 50px的框体 那么就需要用 0.1333333333333333px x 50 比较麻烦


所谓的vw的适配 就是指 让整个计算的过程并不那么麻烦
首先我们要回忆下 rem 这个单位

rem：
- 1rem = 1html的字体大小
- eg：
html {
font-size:50px;
}

box1 {
width:1rem;         这里就是50 x 50的大小的盒子
height:1rem;
}

那假如：
html {
font-size: 0.1333333333333333vw
// 相当于font-size:1px;
}

// 那么我接下来 创建 50 x 50的盒子 是不是可以?
box {
width:50rem;
height:50rem;
// 不行 因为网页中最小的字体就是12px 不够12px 会重置为12px
}

// 那我在这里x10            那1rem = 10px
html {
font-size: 1.333333333333333vw
// 相当于font-size:10px;        //也不行 这里还是不够12
}

// 那我在这里再扩大40倍      那1rem = 40px
html {
font-size: 5.3333vw
// 相当于font-size:40px; 
}
// 接下来 创建一个 48 X 35 的盒子
box {
width:48 / 40 = 1.2rem
height:35 / 40 = 0.845rem
}

换句话说 就是代替0.133333 用了整数 去进行计算

总结：
首先    要知道1px 等于 多少vw
100 / 设计图宽度（750） = 单位结果
然后    设置html标签内部的 font-size:
font-size: 单位结果 X 40
最后    计算实际尺寸时 用 xx px / 40 得出rem 


那40也不好计算啊 好算 我们可以用less来写

----------------------------------------------------

@移动端页面的练习

重置样式表在移动端的意义不是那么大

1. 搭建项目
1.1 创建style.less 在页面中link上 style.css
1.2 在style.less中编写代码

2. vw的适配
html {
// less中可以写公式  100 / 750 X 40
font-size:100vw / 750 * 40;
}

// 也可以把设计图的宽度定义成变量
@total-width:750;
html {
font-size:100vw / @total-width * 40;
}

3. 移动端没有hover

----------------------------------------------------

@响应式布局

- 我们的网页根据不同的设备 或者 窗口大小呈现不同效果
- 使用响应式布局 可以使一个网页适用于所有设备

- 大公司很少用 但是响应式设计并没有我们想象的那么完美 我们再移动端看一个网页 和 在pc端的习惯是不一样的
沿用一个设计 没有两个设计体验好

- 现在网页像活了一样 好像知道浏览器窗口有多大

- 响应式布局的关键就是 媒体查询

@媒体查询
- 通过媒体查询 可以为不同的设备 或 设备不同状态来分别设置样式
不同设备：比如手机 计算机 打印机 在媒体查询这有屏幕的算一同一种设备
不同状态：同一种设备有不同的状态 比如一个屏幕大 一个屏幕小 有的屏幕横着的 有的屏幕是竖着的

- 媒体查询 是CSS3里的一个特性
- 用法：
@media 查询规则{}

- 关键字
only        让老的浏览器失效 处理兼容的问题
and         同时满足多条规则
,           满足a生效 或者 满足b也生效
not         取反

- 媒体属性：
width，(max min)
//浏览器的窗口尺寸

device-width，(max min)
//设备独立尺寸

device-pixel-ratio(必须加-webkit-前缀)，(max min)
// 像素比

orientation     portrait竖屏
landscape横屏
// 横竖屏切换

- 媒体类型：    指的就是设备类型
all         所有设备
print       打印设备
screen      带屏幕的设备
speech      屏幕阅读器

projection     手持设备
tv             电视
braille        盲文触觉设备
embossed       盲文打印机
speech         “听觉”类似的媒体设备
tty            不适用像素的设备

- eg：
<style>
@media all{                     //无论在什么设备 背景颜色都是bfa 我的样式会对所有设备都生效
//print 在打印的时候才会打印出绿色
//还可以写多个设备 print, screen
body {
backgroud-color:#bfa
}
}
</style>

- 可以在媒体类型前添加一个only，表示只有。 only的使用主要是为了兼容一些老版本的浏览器
- eg：
@media only screen {            
body {
background-color:#bfa;
}
}


@媒体的特性：
- width：   视口的宽度      一般情况下不管宽度只管高度
- height：  视口的高度

- min-width     视口的最小宽度  >500 样式生效
- max-width     视口的最大宽度  <500 样式生效
- eg：
media (width:500px){        //当视口是500px时 样式生效
background-color:#bfa;
}

media (min-width:500px){    //当视口 > 500px时 样式生效
background-color:#bfa;
}


- 样式切换的分界点 我们称之为断点 也就是网页的样式会在这个点时发生变化
- 布局上大的变化 需要满足某一个点的（横向排列 纵向排列）

- 一般比较常用的断点
小于768(max-width:768)      超小屏幕    一般都是手机
大于768(min-width:768)      小屏幕      
大于992(min-width:992)      中型屏幕    ipad       
大于1200(min-width:1200)    大型屏幕    电脑 

- 用 , 号连接   表示或
- 用 and 连接   表示与  要求同时满足 在 a and b之间的范围
- 用 not 连接   表示非  除了后面匹配的
-eg：
// 大于500px 或者 小于700px 样式就会生效
media (min-width:500px),(max-width:700px) {
background-color:#bfa;
}      

// > 500px  和  <700px  同时要求满足 
media (min-width:500px) and (max-width:700px) {
background-color:#bfa;
}

// 必须是屏幕 在500-700之间 
media only screen and (min-width:500px) and (max-width:700px) {
background-color:#bfa;
}

----------------------------------------------------

@响应式网站的练习   --- 美图网站

用响应式设计网站的时候 有两个原则：
1. 移动端优先
因为是响应式设计 就要有屏幕比较宽的情况 和 屏幕比较窄的情况 在写代码的时候 可以先把移动端的情况写出来 然后再写pc端的
2. 渐进增强
先写移动端的东西 然后确保在移动端内可以正常显示 然后一点点的增强pc端的功能

所以在写这种布局的代码时 先以最小的情况作为参照去写代码

技巧：
定位元素布局 背景撑满视口
left:0
right:0
top:0
bottom:0
假如width 或者 height为auto就是优先调整它们 背景就是撑满全屏

做完移动端的东西时，找断点 看看什么时候布局发生改变的 768px
然后 直接在上面的代码 下面写 媒体查询
@media only srceen {
// 当大于768时发生变化
@media (min-width:768px){

}
}

----------------------------------------------------

@canvas
    - canvas是html新增的元素 可用于通过js脚本来绘制图形 它可以用于绘制图形 创建动画
    - canvas相当于一个画布，画图形还是要通过js

    - canvas元素默认的宽高
        width:300px;
        height:150px;

    - canvas 有两个属性，width height
        但是 给canvas标签指定高宽的时候 要通过内联样式指定
        如果 在style里写width 和 height 的话 会缩放里面的内容

    - ie9以下的浏览器不认canvas 所以在标签内部最好写上提示语句 认canvas的标签会忽略内部文字

    - 渲染上下文（画笔）
        <canvas>元素只是创造了一个固定大小的画布，要想在上面绘制内容，我们需要找到它的渲染上下文
        canvas元素有一个方法  getContext()  的方法，这个方法是用来获得渲染上下文和它的绘画功能
        - 它只有一个参数 就是2d
        - 获取画笔之前 要检查
    
    - 获取方式：
        let canvas = document.getElementById('box');
        let ctx = canvas.getContext('2d');

    - 检查支持性：
        let canvas = document.getElementById('box');
        if(canvas.getContext){
            let ctx = canvas.getContext('2d');
        }
        

// 创建画布
<canvas id='test'>您的浏览器不支持</canvas>

//画图是通过js来实现的 所以我们要在script标签中写对应代码
window.onload = function(){

    //querySelector 有些问题

    // 拿到画布
    let testNode = document.querySelector('#test');

    // 判读是否有笔 testNode.getContext, 有些浏览器不支持 所以必须要判断下
    if(testNode.getContext){

        let ctx = testNode.getContext('2d');        //一般笔的变量是 ctx （）传递一个模式

    }
};

----------------------------------------------------

@canvas 绘制矩形

    HTML中的元素canvas只支持一种原生的图形绘制，矩形。
    所有其他的图形绘制都至少需要生成一条路径

canvas提供了三种方法绘制矩形
1. 绘制一个填充的矩形（默认色为黑色）
    fillRect(x, y, width, height)

2. 绘制一个矩形的边框（默认1px黑色实心）
    strokeRect(x, y, width, height)

3. 清除指定的矩形区域，让清除部分完全透明
    clearRect(x, y, width, height)

    x y 指定了在canvas画布上所绘制的矩形的左上角（相对于圆点）的坐标
    w h 指定了矩形的高度 和 宽度



strokeRect时，边框像素渲染问题
案例渲染出的边框应该是1px的，canvas在渲染矩形边框时，边框的宽度是平均分在偏移位置的两侧





*/

    </script>

    <style>
        body {
            background-color: pink;
        }
        #test {
            background-color:white;
            position:absolute;
            left:0;
            top:0;
            bottom:0;
            right:0;
            margin:auto;
        }
    </style>


</head>
<body>

    <canvas id='test'>
        <span>您的浏览器不支持</span>
    </canvas>
















</body>
</html>