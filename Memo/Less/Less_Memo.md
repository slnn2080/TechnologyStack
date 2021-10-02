<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LESS 笔记</title>

<script>
/* 
LESS介绍
less是一种动态样式语言，属于css预处理器的范畴，它扩展了 CSS 语言，
增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展
LESS 既可以在 客户端 上运行 ，也可以借助Node.js在服务端运行。

less的中文官网：http://lesscss.cn/
bootstrap中less教程：http://www.bootcss.com/p/lesscss/

----------------------------------------------------

less模块化处理：
使用
@import:'文件路径'  在less中引入外部别的文件 达到模块化的效果

@import:'css/.less'

优点是可以对less文件做一个模块化的处理
比如：
我可以创建4个less文件
第一个负责：定义变量
第二个负责：定义动画效果
第三个负责：定义布局相关的东西
第四个负责：对它们的整合

这样方便我们的维护哪个出问题了 去哪个里面找就可以了

----------------------------------------------------

CSS的预处理器：
比较大的就是Less（写音悦台项目时要用的预处理器） 和 Sass（写相册的时候要用的预处理器）， 还有一个stylus（写Vue的时候要使用的预处理器）
语法都差不多

// CSS垂直水平居中
.outer {
position:relative;
width:500px;
height: 500px;
border:1px solid black;
margin:0 auto;
}

.inner {
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height: 100px;
background-color: tomato;
}

----------------------------------------------------

//Less的使用方法
1. 通过node.js去安装

2. 通过vs code里的插件

3. 通过 浏览器端的使用方式      不推荐 因为不是预处理
3.1 引用js文件      这个js文件就是用来做编译的 放在body标签的下面
<script src="less.min.js" type="text/javascript"><script>  已经下好 在less文件夹中的css文件夹里
3.2 在style标签中，把type属性的值改为 type='text/less'
<style type='text/less'><style>

----------------------------------------------------

//less中的注释
以  //       开头的注释，不会被编译到css文件中
以  /##/     包裹的注释会被编译到css文件中  

----------------------------------------------------

//less中的变量
- 语法:
定义变量：
@变量名:值;

使用变量：
width:@变量名;

- 属性值            为 变量     使用时直接使用   @变量名
- 选择器 和 属性名  为 变量     使用时  @{变量名}

- less里的变量都是延时加载的
变量靠下的会生效
变量在块级作用域里生效 块级作用域里的定义的变量 在使用时 不会去别的作用域里查找

----------------------------------------------------

//less的嵌套规则
1. 祖先 后代选择器
- eg：
outer {
inner {

}
}

2. 子元素选择器
- eg：
outer {
>inner {

}
}

2. &
- 使用 & 时 &代表当前括号外的选择器
- eg:
outer {
inner {
    &:hover {

    }
}
}

代表：  outer inner:hover{}

----------------------------------------------------

混合就是将一系列属性从一个规则集引入到另一个规则集的方式
1.普通混合    
不加括号的 混合函数     不加括号会被输出到css文件中

2.不带输出的混合
加括号的混合函数        加上括号不会被输出到css文件中

3.带参数的混合
混合函数中可以传递形参，调用的时候传递实参

4.带参数并且有默认值的混合
混合函数中的形参 可以指定默认值，优点是没有传递对应的实参时一不会报错 二会使用默认值

5.带多个参数的混合

6.命名参数
- 在传递实参的时候 要按照形参的顺序指定对应的值
- 还可以在调用的时候，在实参里写上 形参:值 这样就可以不用在意顺序了
.混合函数名(@c:pink, @h:200px);  

----------------------------------------------------

//less的混合
需求：
1. 我要现在有两个div 都要垂直 水平居中
我们可以这么写:
.outer {
position:relative;
width:500px;
height: 500px;
border:1px solid black;
margin:0 auto;

.inner {
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height: 100px;
background-color: tomato;
}

.inner2 {
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height: 100px;
background-color: tomato;
}
}
但是上述的写法中 有很多的重复代码 
为了解决上述问题 我们就需要用到混合

- 解决方案：

1. 首先定义混合函数
.混合函数名(){              //括号可以不写这个混合函数的代码就会被编译到css中，写上就不会被编译到css中
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height:100px;
}

2. 调用定义好的混合函数
.inner {
.混合函数名();          //括号可以不写
}


上述的 混合函数中 还可以指定形参
.混合函数名(@w, @h){
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:@w;        //这里
height:@h;
}

.inner {
.混合函数名(200px, 200px);
}

上述的 混合函数中 还可以指定形参的默认值
.混合函数名(@w:100px, @h:200px)

----------------------------------------------------

7.匹配模式
需求：现在我要在页面上画三角形，方向自定

1. 定义混合函数
.triangle(@c, @w){
width:0px;
height:0px;
border:@w @c solid;

border-color:transparent transparent @c transparent
border-top:none;
}
2. 调用
box {
.triangle(blue, 10px);
}
可是还是有些不只能 怎么控制方向？


// less中 可以在 混合参数的 形参 中传递一个匹配符 这样在调用参数时 可以调用指定的混合函数
- 匹配符是第一个参数 

.triangle(L, @c, @w){
width:0px;
height:0px;
border:@w @c solid;

border-color:transparent transparent @c transparent
border-top:none;
}

box {
.triangle(L, blue, 10px);       这样调用了 与L匹配的混合函数
}

----------------------------------------------------

// less中 对于 同名的 混合函数 提供了 复用函数 减少对同一段代码的重复编写
- 复用函数中的 形参 传递 @_ 这样在编写同名混合函数时 会自动带上复用函数中的代码
- eg：
//定义 L 为左的混合函数 效果为三角形
.triangle(L, @c, @w){
width:0px;
height:0px;
border:@w @c solid;

border-color:transparent transparent @c transparent
border-top:none;
}
//定义 R 为右的混合函数 效果为三角形
.triangle(R, @c, @w){
width:0px;
height:0px;
border:@w @c solid;

border-color:transparent transparent @c transparent
border-top:none;
}

// 上面的代码中 还是有 重复的代码吧 也可以把重复的代码提取出来

1. 定义复用函数
.triangle(@_){      //这里必须是同名函数 形参必须是 @_
width:0;
height:0;
}
2. 下面写同名混合函数时，会自动带上复用函数中的代码

----------------------------------------------------

8.arguments变量
- 使用arguments变量时，前面要加上 @ 

.triangle(@l, @c, @s){

border:@l, @c, @s;      //正常我要这么写是吧

border:@arguments;      //全是形参的时候可以传递 实参列表
}

.triangle(1px, black, solid);   //传递实参

----------------------------------------------------

@less运算
- 在less中可以进行加减乘除的运算
- 计算的双方只需要一方带单位就可以了 这个单位会保留下来
- 两个数都有单位且不一样的时候, 最后的结果以第一个单位为准

- 除法的元素要括号括起来
- 运算符前后必须用空格隔开

- eg：
@border:5px + 5;
box {
    width:100px + 100;
    border:@border red solid;
}

background:#444 - #222 颜色只要用数字就可以进行运算

----------------------------------------------------

@继承

混合的概念是 复制粘贴 把同类代码定义成要复制文本 然后再复制到各个应用的地方
不好的地方就是CSS中会出现很多重复代码
- eg：
box1 {
width：100px;
height：100px;
}
box2 {
width：100px;
height：100px;
}
box3 {
width：100px;
height：100px;
}

继承的概念是，把相同的代码通过分组选择器 写一遍
- eg:
box1, box2, box3 {
width:100px;
height:100px;
}


// 继承
- 性能上比混合要高，灵活性没有混合强
- 写all 代表把跟匹配选择器的所有相关样式都继承过来 包括hover
- 语法：
当前选择器:extend(选择器字符串 [all]) {

}
- eg
- 不写all：
.box1 {
width:100px;
height:100px;
background-color:red;
}

.box1:hover {

background-color:yellow;
}

.box2:extend(.box1){
background-color:blue;
}

- 结果：
.box1,
.box2 {
width: 100px;
height: 100px;
background-color: red;
}
.box2 {
background-color: blue;
}


- 写all 代表把跟匹配选择器的所有相关样式都继承过来 包括hover
- eg:
.box1 {
width:100px;
height:100px;
background-color:red;
}

.box1:hover {
background-color: yellowgreen;
}

.box2:extend(.box1 all){
background-color:yellow;
}

- 结果：
.box1,
.box2 {
width: 100px;
height: 100px;
background-color: red;
}
.box1:hover,
.box2:hover {
background-color: yellowgreen;
}
.box2 {
background-color: yellow;
}

----------------------------------------------------

@避免编译：
- 语法：    ~'内容' 
- 里面的内容不会被编译到css文件里












/

.outer {
position:relative;
width:500px;
height: 500px;
border:1px solid black;
margin:0 auto;
}

.inner {
position:absolute;
left:0;
right:0;
top:0;
bottom:0;
margin:auto;

width:100px;
height: 100px;
background-color: tomato;
}
</script>
</head>
<body>

</body>
</html>