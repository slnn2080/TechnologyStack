<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script>

/\*

### 复习：

// 注意点：
canvas 图像的渲染 有别于 html 图像的渲染
canvas 的渲染极快 不会出现代码覆盖后延迟渲染的问题
写 canvas 代码的时候要具有同步思想

// 获取上下文的时候要判断 获取画笔的时候

// 画布高宽的问题：
一定要使用内联样式来设置画布的宽高通过 css 的形式 会缩放画布内的图像

// 绘制矩形的问题：
边框的宽度是在偏移量处 上下 各渲染一半 会出现小数边框 会向上取整
canvas 的 api 只支持一种图形的原生直接渲染：矩形

2、
画布上的 API
canvas.getContext('2d');
canvas.width; 画布在横向上 css 像素的个数
canvas.height;
canvas.toDataURL(); 拿到 canvas 图像的地址

3、
// 上下文的 API（画笔的方法）
// 绘制填充矩形：
ctx.fillRect(w,y,w,h);
// 绘制描边矩形
ctx.strokeRect(w,y,w,h);

// 清除画布，注意原点的位置
ctx.clearRect(0,0,c.width,c.height)

// 样式：
ctx.fillStyle = '';
背景：fillstyle 的值 可以是 createPattern(image, repetition)返回的对象
渐变：fillstyle 的值 可以是 线性 和 径向

ctx.strokeStyle = '';
ctx.linewidth = 数字;
ctx.lineCap = '';
ctx.lineJoin = '';

// 路径：
将画笔抬起点到 x y 处
ctx.moveTo(x,y)
将画笔移动 x y 处
ctx.lineTo(x,y)

// 绘制矩形路径
ctx.rect(x,y,w,h);

// 绘制圆形路径
ctx.arc(x,y,r,s,deg,boolean)
deg:0-360\*Math.PI/180

// 绘制弧形
ctx.arcTo(cpx1,cpy1,x,y， r)
第一个点是 moveTo(x,y)
第二个点是控制弧度的，
第三个点形成夹角
肯定会经过 cpx1 cpy1

// 二次贝塞尔曲线
quadraticCurveTo(cp1x, cp1y, x, y)
起点为 moveTo
cp1x,cp1y 为一个控制点，x,y 为结束点。
终点为 x y
cp1 cp2 用来控制弧度 必须经过起点 和 终点

// 三次贝塞尔曲线
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
起始点为 moveto 时指定的点
cp1x,cp1y 为控制点一，cp2x,cp2y 为控制点二，x,y 为结束点。
cp 为控制圆弧的点

// 清除路径容器：
ctx.beginPath();
闭合路径
ctx.closePath();
fill() 为自动闭合
stroke() 得手动闭合

// ctx.save()
将画布的当前的状态押入到样式栈中，包括样式相关 和 变换相关
// ctx.restore()
将样式栈中栈顶的元素弹到样式容器里
图像最终渲染 依赖样式容器

// 将原点按当前坐标轴位移到指定位置
ctx.translate(x,y);

// 将坐标轴按顺时针方向旋转
ctx.rotate(deg);

// 放大 或 缩小
ctx.scale(因子，因子)

// 引入图片
ctx.drawImage(img,x,y,w,h);
在 canvas 引入图片 一定要在图片加载完成后再去操作

// 得到文本的宽度
ctx.measureText('文本');
返回持有文本渲染宽度的对象

ctx.fillText()
ctx.strokeText()
ctx.font
ctx.textAlign
ctx.textBaseline
shadowOffsetX = float
shadowOffsetY = float
shadowBlur = float
shadowColor = color(必需项)

// 像素操作
ctx.getImageData(x,y,w,h)
ImageData 对象
width：选中区域在横向上 css 像素的个数
height：选中区域在纵向上 css 像素的个数
data:数组
选中区域所有像素点的 rgba 信息，rgba 的取值从 0 到 255

ctx.createImageData(w,h)
返回的是 imgdata 对象 默认像素点的信息是 rgba(0,0,0,0)

ctx.putImageData(imgdata,x,y)

ctx.globalAlpha
取值为 0 到 1
ctx.globalCompositeOperation
source-over(默认值):源在上面,新的图像层级比较高
source-in :只留下源与目标的重叠部分(源的那一部分)
source-out :只留下源超过目标的部分
source-atop:砍掉源溢出的部分

    destination-over:目标在上面,旧的图像层级比较高
    destination-in:只留下源与目标的重叠部分(目标的那一部分)
    destination-out:只留下目标超过源的部分
    destination-atop:砍掉目标溢出的部分

ctx.ispointinpath(x,y)
x,y 这个点是否在路径上

4.实例
时钟动画：结合了所有基础 api
飞鸟动画：结合图片创建动画
马赛克：像素操作
刮刮卡：合成+像素操作

---

### 笔记：

// canvas 中的透明度是 0-255

// 怎么用 debugger 测试
1、打上断点
2、在 sources console 的旁边 找到断点行
3、右侧 watch 栏里是监听
4、在代码上右键 能把代码对象 加入监听

// canvas 修改 透明度

4*i+3 = 3，7，11，15，19
4*i+1 = 1，5，9，13，17
隔 4 个数字 从 1 开始

难道是隔几个数字 从几开始？

let imgData = ctx.getImageData(0,0,150,150);
假如我想画一个带有透明度的矩形
1、我可以 ctx.fillStyle = 'rgba(x,x,x,x)';

另外一种方式：
因为 getImageData 获取的是 每一个像素点的 rgba 的信息
[r, g, b, a, r, g, b, a, r, g, b, a]
也就是我要获取 3，7，11，5.....
修改数组中 a 的值
for(let i=0; i<imgData.data.length; i++){
imgData.data[4*i+3] = 100;
}

// 设置缩放 让它在 0-2 之间变化 使最小值和最大值各乘以 50 0 - 100
// 当系数为 0 时，自增到 100，当到 100 时开始自减
if(scale == 0){
maxScale = 1;
}else if(scale == 100){
maxScale = -1;
}
// 自增 自减的单位为 1
scale += maxScale;
// 条件完成后开始设置放大缩小
ctx.scale(scale/50,scale/50);

---

let num = 0;
// 定义增长系数
let num_coe = 0;

let test = setInterval(function(){
if(num == 100){
// 当到 100 的时候开始自减 系数为 1
num_coe = -1;
}else if(num == 0){
// 当到 0 的时候开始自增 系数为 1
num_coe = 1;
}
num += num_coe;
console.log(num);
},100);

###canvas 基本用法：

<canvas> 是 HTML5 新增的元素，可用于通过使用 JavaScript 中的脚本来绘制图形
它 canvas 就相当于一个画布，要是画图的话 还是需要 js 可以用于绘制图形，创建动画。

<canvas> 看起来和 <img> 元素很相像 唯一的不同就是它并没有 src 和 alt 属性。
<canvas> 标签只有两个属性—— width 和 height。这些都是可选的。
当没有设置宽度和高度的时候，canvas 会初始化宽度为 300 像素和高度为 150 像素。

// 不要用 css 给 canvas 指定高宽 它会缩放里面的内容的 使用内联样式定义 canvas 画布的大小

ie8 以及以下不支持 canvas
但在这些浏览器上你应该要给用户展示些替代内容。
支持 <canvas>的浏览器将会忽略在容器中包含的内容，并且只是正常渲染 canvas。
不支持 <canvas>的浏览器会显示代替内容

<canvas id='test' width='300px' height='300px'>
    <span>您的浏览器不支持画布元素</span>
</canvas>

### 获取画布 和 画笔

.getContext()
<canvas> 元素只是创造了一个固定大小的画布，要想在它上面去绘制内容，我们需要找到它的渲染上下文
这个方法是用来获得渲染上下文和它的绘画功能。

@获取画笔的方法
let ctx = 获取画布对象.getContext('2d');

支持检查性 因为我们写的是 js 代码，ie8 以及以下不支持 canvas 要是不写检查性就会报错的
if (canvas.getContext){
var ctx = 获取画布对象.getContext('2d');
}

2d 传入 2d 字符串
3d 传入 webgl 字符串 去查看下网站

### 对上总结：

// 获取画布
let canvas = document.querySelector('#test');
// 获取画笔
// let ctx = canvas.getContext('2d');

// 获取画笔
// 支持检查性 查看当前浏览器支持 canvas api 么？
if(canvas.getContext){
let ctx = canvas.getContext('2d');
}

---

### 绘制矩形：

在 canvas 中通过调用一个方法能画出来的图形只有矩形，所有其他的图形的绘制都至少需要生成一条路径

canvas 提供了三种方法绘制矩形(调用画笔的方法（Api = 方法）)：
@ fillRect(x, y, width, height)
绘制一个填充的矩形（填充色默认为黑色）

@ strokeRect(x, y, width, height)
绘制一个矩形的边框（默认边框为:1px 实心黑色）

注意：
css 中不能出现 0.5px（会进位），所以自动渲染为 1px，stroke 中默认边框为 1px，但是是 x 上边 0.5，x 下边 0.5
这样 css 在渲染时会自动调整为 2px
如果想画一个 1px 边框 可以调整偏移量，在 x y 上写小数
eg：
ctx.strokeRect(105, 5, 100, 100);
x y 上各加 o.5
ctx.strokeRect(105.5, 5.5, 100, 100);

@ clearRect(x, y, width, height)
清除指定矩形区域，让清除部分完全透明。填充的永远是底色

x， y ： 指定了在 canvas 画布上所绘制的矩形的左上角（画布的左上角为原点）的坐标。
w， h ： width 和 height 设置矩形的尺寸（存在边框的话，边框会在 width 上占据一个边框的宽度，height 同理）
不用加单位

if(canvas.getContext){
let ctx = canvas.getContext('2d');

    // 调用ctx的api 绘制填充矩形矩形
    ctx.fillRect(0, 5, 100, 100);

    // 调用ctx的api 绘制边框矩形矩形
    ctx.strokeRect(105, 5, 100, 100);

    // 跟底色一样的矩形 跟上面的矩形原位置重叠了 盖住了一部分，调整偏移量加减0.5 变相实现了1px边框 
    ctx.clearRect(105, 5, 100, 100);

}

### 在 canvas 上添加样式

canvas 上的任何元素，不能通过 css 来渲染，只能通过 canvas 自身的方法来处理
不能加单位哦
canvas 里必须要有同步思维，自上而下的显示效果 比如 样式的设定 要先设定完 再绘制

// 画笔身上的属性：
fillStyle
设置图形的填充颜色。相当于给画笔塞染料

strokeStyle
设置图形轮廓的颜色。
默认情况下，线条和填充颜色都是黑色（CSS 颜色值 #000000）

lineWidth
这个属性设置当前绘线的粗细。属性值必须为正数。
描述线段宽度的数字。 0、 负数、 Infinity 和 NaN 会被忽略。默认值是 1.0。

lineJoin
线条与线条间接合处的样式（默认是 miter）
round : 圆角
bevel : 斜角
miter : 直角

if(canvas.getContext){
let ctx = canvas.getContext('2d');

    // 设置填充颜色：
    ctx.fillStyle = '#FFEB3B';
    // 设置描边颜色：
    ctx.strokeStyle = '#212121';
    // 设置描边粗细（不要加单位）：10px是中线上5px，中线下5px
    ctx.lineWidth = 5;
    // 上面的设置相关必须要写在绘制图形功能的上面 放在下面会不起作用
    // canvas里的东西都是同步的 自上而下的顺序

    // 设置边框的角的样式
    ctx.lineJoin = 'bevel'

    ctx.fillRect(0, 5, 100, 100);
    ctx.strokeRect(105, 5, 100, 100);
    ctx.clearRect(105, 5, 100, 100);

}

---

### 绘制路径(钢笔工具么？)

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。

每次绘制新图形前尽量养成习惯：
ctx.save();

---

关于样式的修改全都写在 beginPath()的上面
ctx.fillStyle = 'pink';

---

## ctx.beginPath(); 这里只清除路径容器 跟样式没有关系

## 绘制图形从这里开始

ctx.restore();

###步骤 1.首先，你需要创建路径起始点。 2.然后你使用画图命令去画出路径 3.之后你把路径封闭。 4.一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

// 画笔的属性：
moveTo(x, y)
将笔触移动到指定的坐标 x 以及 y 上
当 canvas 初始化或者 beginPath()调用后，你通常会使用 moveTo()函数设置起点

lineTo(x, y)
将笔触移动到指定的坐标 x 以及 y 上
绘制一条从当前位置到指定 x 以及 y 位置的直线。

stroke()
通过线条来绘制图形轮廓。不会自动调用 closePath()

fill()
通过填充路径的内容区域生成实心的图形。自动调用 closePath()

beginPath()
新建一条路径，生成之后，图形绘制命令被指向到路径上准备生成路径。

生成路径的第一步叫做 beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，
所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，
然后我们就可以重新绘制新的图形。

closePath()
闭合路径 闭合路径之后图形绘制命令又重新指向到上下文中。（抬笔了？）
闭合路径 closePath(),不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。
如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做
当你调用 fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用 closePath()函数。
但是调用 stroke()时不会自动闭合

if(canvas.getContext){
let ctx = canvas.getContext('2d');

    // 画图：
    // 抬起画笔 移动到10 10准备下笔
    // ctx.moveTo(10,10);
    // 将画笔移动到指定的点上，并没有画，只是说下一个点在哪
    // ctx.lineTo(100,100);
    // ctx.lineTo(10,100);
    // 画图，画图时会自动调用closePath() 用来闭合图形
    // ctx.fill();

    // 画线:
    ctx.moveTo(10,10);
    ctx.lineTo(100,100);
    ctx.lineTo(10,100);
    // 闭合路径 画线的时候不会自动调用closePath()需要自己调用
    ctx.closePath();
    // 闭合路径后开始画线
    ctx.stroke();

}

moveTo lineTo 都是路径 每写一次的时候 路径（点）都会在一个容器中保存，直到调用 stroke(), fill()函数来绘制
但是每调用一次绘制函数，都会把保存在容器中的路径 重新的绘制一遍 会和上一个图形关联
假如我想画两个不相干的图形 在绘制图形之前调用 beginPath()，清空容器列表，这样再绘制才是一个新图形
eg:
ctx.moveTo(250,50);
ctx.lineTo(450,345);
ctx.lineTo(50,345);
ctx.closePath();
ctx.stroke();

// 清空路径容器 重新绘制新的图形
ctx.beginPath();
ctx.moveTo(50,155);
ctx.lineTo(450,155);
ctx.lineTo(250,450);
ctx.closePath();
ctx.stroke();

---

rect(x, y, w, h)
当该方法执行的时候，moveTo()方法自动设置坐标参数（0,0）。也就是说，当前笔触自动重置会默认坐标
绘制矩形路径，和我们上面调用 api 绘制的矩形不一样，这个是路径要存到路径容器里的
ctx.rect(50,50,100,100);
ctx.stroke();

lineCap
lineCap 是 Canvas 2D API 指定如何绘制每一条线段末端的属性。
这个要在绘制之前 设置好 还是一样 同步思想

butt :线段末端以方形结束。
round :线段末端以圆形结束
square:线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域

let ctx = canvas.getContext('2d');
ctx.lineWidth = 10;
// 要先定义 再绘制
ctx.lineCap = 'round';

ctx.moveTo(50,50);
ctx.lineTo(350,50);
ctx.stroke();

---

save() 押栈
是 Canvas 2D API 通过将当前状态放入栈中，保存 canvas 全部状态的方法
栈结构 先进 后出 save()把样式相关的东西 押入栈里 押进栈里的是 save()上面的状态

代码部分
ctx.save(); 1 把现在的状态押入栈里 默认色是黑色，就是把黑色押入栈里
粉色
ctx.save(); 2 把现在的状态押入栈里 也就是把粉色押入栈里
深粉
蓝色
ctx.save(); 3 把蓝色押入栈里
红色
ctx.save(); 4 把红色押入栈里
绿色
ctx.save(); 5 把绿色押入栈里

ctx.restore(); 弹出栈顶的颜色 绿色 也就是当前会是绿色
ctx.restore(); 弹出栈顶的颜色 红色 也就是当前会是红色
ctx.restore(); 栈顶为蓝色
ctx.restore(); 栈顶为粉色
ctx.restore(); 栈顶为黑色

栈结构部分：
5：绿色
4：红色
3：蓝色
2：粉色
1：黑色

ctx.fillRect(50,50,100,100) 如果没有 restore() 那么最终的颜色看 代码部分 谁在最后 有的话 看弹出时栈顶是谁

当前的变换矩阵。 | 当前的剪切区域。 | 当前的虚线列表。 | 以下属性当前的值：
strokeStyle,
fillStyle,  
lineWidth,
lineCap,
lineJoin...

restore() 弹栈
是 Canvas 2D API 通过在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。
如果没有保存状态，此方法不做任何改变。

save(); -----
之间的部分有点像块级作用域，作用域之间互不影响 它俩成对出现
restore() -----

### canvas 书写模板:

ctx.save(); 画图形时读的不是样式栈，读的是样式容器，只不过在弹栈的时候会将栈顶容器里的样式，弹到样式容器最下面，把样式容器里的状态覆盖掉
ctx.beginPath();
ctx.restore();

也就是说我们用三个容器
路径容器 每次调用路径 api(moveTo,lineTo,rect)时都会往路径容器里面做登记，调用 beginPath 时清空整个路径容器
样式容器 每次调用样式 api 时都会往样式容器里做登记，
调用 save()时，将样式容器里的状态押入样式栈里，
调用 restore()时将样式栈顶状态弹出到样式容器里 进行覆盖
样式栈

---

### 练习 --- 签名

// 拿到画布
let canvas = document.getElementById('test');
let ctx;
// 拿到画笔
if(canvas.getContext){
ctx = canvas.getContext('2d');
}

// 给画布绑定 onmousedown 事件
canvas.onmousedown = function(event){
event = event || window.event;

    // 我们去拖拽一个网页中的内容时，浏览器会默认去搜索引擎中去搜索内容, 此时会导致拖拽功能异常，这个是浏览器提供的默认行为
    // 我们可以通过return false来取消这个默认行为，但是ie不支持 ie中要使用setCapture() 和 releaseCapture(), 为了兼容ie和chrome又要写下面的代码
    canvas.setCapture && canvas.setCapture();

    // 接下来 在我点击的时候 我要让笔的坐标和鼠标的坐标一致把，这里就要想 event.clientX Y鼠标的坐标是相对于视口的，画笔的坐标是相对于画布的
    // 也就是说我们要用获取鼠标的坐标 - 画布左上角的坐标
    // 插入： 每次画的时候都要清空前一次的路径
    ctx.beginPath();
    ctx.moveTo((event.clientX - canvas.offsetLeft), (event.clientY - canvas.offsetTop));

    // 要写字嘛，给文档绑定onmousemove
    document.onmousemove = function(event){
        event = event = window.event;

        // 加颜色的话
        ctx.save()
        ctx.strokeStyle = '#C2185B';

        // 开始写笔画的时候怎么办，在move里面lineTo嘛
        ctx.lineTo((event.clientX - canvas.offsetLeft), (event.clientY - canvas.offsetTop));
        // 然后连线
        ctx.stroke();

        // 和save()成对出现的 restore()
        ctx.restore();
    };
    document.onmouseup = function(){
        document.onmousemove = null;

        // 迷惑 我上面是给画布设置的捕获 这里不应该取消对画布的捕获么 为什么视频里是document.releaseCapture && document.releaseCapture()
        canvas.releaseCapture && canvas.releaseCapture();
    };
    return false;

};

---

### 绘制曲线

角度与弧度的 js 表达式:radians（弧度）=(Math.PI/180)\*degrees。

// canvas 绘制圆形

arc(x, y, radius, startAngle, endAngle, anticlockwise)
画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，
按照 anticlockwise 给定的方向（默认为顺时针）来生成。
ture：逆时针
false:顺时针

x,y 为绘制圆弧所在圆上的圆心坐标
radius 为半径
startAngle 和 endAngle 参数用弧度定义了开始以及结束的弧度。这些都是以 x 轴为基准 0 - 360 度
anticlockwise 为一个布尔值。为 true 时，是逆时针方向，否则顺时针方向。

ctx.arc(150,150,100,0,360*Math.PI/180,false);
以 150 150 为圆心，100 为半径，从 0 开始 按照 360*Math.PI/180 这个弧度 去画圆，顺时针，调节 360 可以调节画到哪
到 360 就是正圆，90 就是 1/4 元 180 就是半圆 270 就是 3/4 圆

// 画东西之前都清空一次
ctx.beginPath();
ctx.moveTo(100,100);
ctx.arc(100,100,100,0,270\*Math.PI/180,false);
ctx.closePath();
ctx.stroke();

// canvas 绘制圆弧

arcTo(x1, y1, x2, y2, radius)
根据 3 个点形成的夹角，按照半径 绘制圆弧
第一个点 moveTo()
第二 三个点是 arcTo()中的点，radius 为半径的圆弧

根据给定的控制点和半径画一段圆弧
肯定会从(x1 y1) 但不一定经过(x2 y2);(x2 y2)只是控制一个方向

// 画东西之前都清空一次
ctx.beginPath();
ctx.moveTo(100,100);
ctx.arcTo(500,200,100,300,80)
ctx.stroke();

ctx.save();
ctx.strokeStyle = '#C2185B';
ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(500,200);
ctx.lineTo(100,300)
ctx.stroke();
ctx.restore();

// 绘制曲线
二次贝塞尔
quadraticCurveTo(cp1x, cp1y, x, y)
绘制二次贝塞尔曲线，cp1x,cp1y 为一个控制点，x,y 为结束点。
起始点为 moveto 时指定的点

起点为 moveTo
终点为 x y
cp1 cp2 用来控制弧度

// 画东西之前都清空一次
ctx.beginPath();
ctx.moveTo(100,100);
ctx.quadraticCurveTo(500,200,100,300);
ctx.stroke();

ctx.save();
ctx.strokeStyle = '#C2185B';
ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(500,200);
ctx.lineTo(100,300);
ctx.stroke();
ctx.restore();

三次贝塞尔
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
绘制三次贝塞尔曲线，cp1x,cp1y 为控制点一，cp2x,cp2y 为控制点二，x,y 为结束点。
起始点为 moveto 时指定的点

cp 为控制圆弧的点

ctx.beginPath();
ctx.moveTo(50,50);
ctx.bezierCurveTo(300,0,200,200,300,100)
ctx.stroke();

ctx.save();
ctx.strokeStyle = '#C2185B';
ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(300,0);
ctx.lineTo(200,200)
ctx.lineTo(300,100)
ctx.stroke();
ctx.restore();

---

### canvas 中的变换

radians（弧度）=(Math.PI/180)\*degrees。
变换是让画布里的图像进行变换，画布里的图像没办法通过 css 和 绑定事件来添加效果
canvas 里的变换要用 canvas 里自己的 api

以下的方法都是 ctx 的方法

translate(x, y) 累加
移动 canvas 的 原点 到一个不同的位置。在 canvas 中 translate 是累加的
translate 方法接受两个参数。x 是左右偏移量，y 是上下偏移量

比如之前画的矩形 画线都是参考画布左上角的原点 translate()就是动这个原点
eg:
ctx.fillStyle = '#C2185B'; //深粉
// translate() 也属于样式，先写再说上面
ctx.translate(50,50);
// 还可以写多次，是累加的 原点再次移动 50 50 到 100 100 了
ctx.translate(50,50);

ctx.beginPath();
// 这时候绘制的正方形原点是参考 50 50 了
ctx.fillRect(0,0,100,100);
ctx.stroke();

rotate(60*Math.PI/180) 累加
旋转多少度：radians（弧度）=(Math.PI/180)*degrees。
这个方法只接受一个参数：旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。
旋转的中心点始终是 canvas 的原点，如果要改变它，我们需要用到 translate 方法
eg：
ctx.fillStyle = '#C2185B'; //深粉
ctx.translate(200,200);
// rotate() 也属于样式，先写再说上面
// ctx.rotate(45);
ctx.rotate(45\*Math.PI/180);
ctx.fillRect(0,0,100,100);
ctx.fill();

// ctx.rotate(45\*Math.PI/180);
// ctx.translate(200,200);
// 假如写成这样 和 上面的效果是不一样的 canvas 是同步思想，从上向下
// 这样是先转，再移动，上面是先移动再转

scale(x, y) 累加
scale 方法接受两个参数。x,y 分别是横轴和纵轴的缩放因子，它们都必须是正值。
值比 1.0 小 表示缩小，比 1.0 大 则表示放大，值为 1.0 时什么效果都没有。
缩放一般我们用它来增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大。
在 canvas 中 scale 是累称的

放大：
放大的是整个画布区域，所以位置也会发生变化
css 像素的面积，不是增加 css 像素的数量，而是把单个 css 像素增大了，区域内 css 像素的个数变少

缩小：
缩小 css 像素的面积，区域内 css 像素的个数变多，占据的实际尺寸变小了

@感觉就是画布大小没变，里面的东西本身高度宽度和位置整体扩大或缩小

eg：
ctx.fillStyle = '#C2185B'; //深粉
ctx.scale(2,1);
ctx.fillRect(100,100,100,100);
ctx.fill();

---

### 变换的相关练习

要点：
怎么让一个系数 不断的增加到指定值 和 缩小到指定值

let ctx;
// 定义一个角度 并赋初始值；
let deg = 0;

// 定义缩放系数
let scale = 0;
let maxScale = 0; //最大系数

let canvas = document.getElementById('test');
if(canvas.getContext){
ctx = canvas.getContext('2d');

## 下面的部分都不用要，老师的思路太不清晰了

    // 有样式就save 和 restore一下 形成个块级作用域
    ctx.save();
    // 设置原点为 元素的中心点，先设置元素左上角的原点为画布的中心点
    ctx.translate(250,250);
    ctx.beginPath();
    // 上面原点移动到画布的中心点了，然后元素x y各减去一半的高度 和 宽度，让原点为元素的中心点
    ctx.fillRect(-75,-75,150,150);
    ctx.restore();

---

// 开启定时器 用来进行旋转
let timer = setInterval(function(){

    // 让旋转的角度自增
    deg++;

    // 清除前一个图形,不清理的话 在定时器里面绘制图形会叠到第一个图形上，清理画布
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // 这里重新绘制图形，因为上面用clearRect清掉了画布元素 不用担心会被叠加
    ctx.save();
    ctx.translate(250,250);

    // 让它以deg为单位旋转 每次进入定时器内 让deg++
    ctx.rotate(deg*Math.PI/180);

    // 下面开始控制放大 缩小 来控制scale中的系数，让它不断自动的从0-目标最大值去变化
    if(scale == 100){
        maxScale = -1;
    }else if(scale == 0){
        maxScale = 1;
    }
    // 每次使值自增 和 自减，如何自增 正数自增，如何自减 负数自减
    scale += maxScale;
    // 系数范围太大了 除以50 0.02-2之间不断变化
    ctx.scale(scale/50,scale/50);

    ctx.beginPath();
    ctx.fillRect(-75,-75,150,150);
    ctx.restore();

},1000/60)
}

- 自己做的作业：
  let ctx;
  // 定义度数
  let deg = 0;
  // 定义缩放系数
  let scale = 0;
  // 定义缩放系数的最大值
  let maxScale = 0;

let canvas = document.getElementById('canvas');
if(canvas.getContext){
ctx = canvas.getContext('2d');

    // 自动旋转 放大 缩小 那就开启定时器
    let timer = setInterval(function(){

        // 使单个图形发生变化 清楚掉前一个图形 清空画布
        ctx.clearRect(0,0,canvas.width, canvas.height);
        // 创建图形
        ctx.save();
        // 样式相关
        ctx.fillStyle = '#C2185B';
        // 使原点在元素的中心点
        ctx.translate(250,250);
        // 设置旋转
        deg++;
        ctx.rotate(deg*Math.PI/180);

        // 设置缩放 让它在0-2之间变化 使最小值和最大值各乘以50 0 - 100
        // 当系数为0时，自增到100，当到100时开始自减
        if(scale == 0){
            maxScale = 1;
        }else if(scale == 100){
            maxScale = -1;
        }
        // 自增 自减的单位为1
        scale += maxScale;
        // 条件完成后开始设置放大缩小
        ctx.scale(scale/50,scale/50);

        // 绘制一个正方形
        ctx.beginPath();
        ctx.fillRect(-75,-75,150,150);
        ctx.restore();
    },1000/60);

}

---

### 练习 --- 时钟

总结：
1、区域 1 中放初始化设置 也就是共通设置
ctx.save(); -- 区域 1

ctx.restore(); -- 区域 1

2、在区域 1 里 每画一次图形可以创建一个 save 作用域
区域 2 中可以继承区域 1 中的样式，想要单独设定的话 在区域 2 中再次设定
ctx.save(); -- 区域 1
ctx.save(); -- 区域 2

    ctx.restore();  -- 区域2

ctx.restore(); -- 区域 1

---

画完一个路径后 可以用 for 循环来创建多个，如果需要 for 循环的部分不需要把 save restore 放进 for 循环里

钟表练习中 关于画分针刻度的问题，假如我不喜欢 时针刻度的位置上 有分针刻度
我想想法是 switch 和 continue
它的想法是
for(let i=0; i<60; i++){
if(i%5 != 0){
ctx.beginPath();
ctx.moveTo(0,-114);
ctx.lineTo(0,-110);
ctx.stroke();
}
ctx.rotate(6\*Math.PI/180); //放在上面会串一个 那就放在下面 等它们画完了再转
}

当 0 5 10 15 20 25 30 35 40 45 50 55 的时候不要画
i%5
0%5 0
1%5 1
2%5 2
3%5 3
4%5 4
5%5 0
6%5 1
7%5 2
8%5 3
9%5 4
10%5 0
每隔 5 怎么样 可以选择 i%5

@取得时间
let date = new Date();
获取 秒
let s = date.getSeconds();
获取 分
let m = date.getMinutes();
获取 时
let h = date.getHours();
console.log(s,m,h);

let date = new Date();
// 获取 秒
let s = date.getSeconds();
// 获取 分
let m = date.getMinutes()+s/60;
// 获取 时
let h = date.getHours()+m/60; //现在的 h 是 24 小时制
h = h>12?h-12:h;

@ 用 canvas 写动画就是覆盖 每次画不一样的帧上去 把上一次的清掉

let canvas = document.getElementById('clock');
let ctx;
if(canvas.getContext){
ctx = canvas.getContext('2d');

    setInterval(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    },1000);  //相当于这个move函数 1秒执行一次

    move();
    function move(){
    ctx.save();     // 区域1
    // 调整 原点 到中心位置
    ctx.translate(200,200);
    // 设置表盘的样式
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#212121';


    // 绘制外层空心圆盘
    ctx.save();     // 区域2
    // 一样的样式可以继承区域1里的，想单独设定的话 在这里再次设定
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#C2185B';
    ctx.beginPath();
    ctx.arc(0,0,140,0,360*Math.PI/180);
    ctx.stroke();
    ctx.restore();  // 区域2


    // 绘制外层圆盘的修饰环
    ctx.save();
    ctx.strokeStyle = '#FF5252';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0,0,132,0,360*Math.PI/180);
    ctx.stroke();
    ctx.restore();


    // 时针刻度
    ctx.save();
    // 在Y轴上画 上是负 下是正 下面是画了一个刻度，画多个怎么办？for循环呗
    // 那for循环内部用不用把save 和 restore放到for循环里 不用！ 因为不涉及到样式
    for(let i=0; i<12; i++){
        // 每个路径移动30度 rotate是累加的
        ctx.rotate(30*Math.PI/180);

        ctx.beginPath();
        ctx.moveTo(0,-114);
        ctx.lineTo(0,-94);
        ctx.stroke();
    }
    ctx.restore();


    // 分针刻度
    ctx.save();
    // 设置分针刻度长度
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#D32F2F';
    for(let i=0; i<60; i++){
        // 让每个小刻度移动6度
        ctx.rotate(6*Math.PI/180);
        ctx.beginPath();
        ctx.moveTo(0,-114);
        ctx.lineTo(0,-110);
        ctx.stroke();
    }
    // 换了一个写法：
    // for(let i=0; i<60; i++){
    //     if(i%5 != 0){
    //         ctx.beginPath();
    //         ctx.moveTo(0,-114);
    //         ctx.lineTo(0,-110);
    //         ctx.stroke();
    //     }
    //     ctx.rotate(6*Math.PI/180);      //放在上面会串一个 那就放在下面 等它们画完了再转
    // }
    // ctx.restore();

    // 画个圆心
    ctx.save();
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0,0,7,0,360*Math.PI/180);
    ctx.stroke();
    ctx.restore();


    // 画 时针 分针 秒针
    // 先取得时间
    let date = new Date();
    // 获取 秒
    let s = date.getSeconds();
    // 获取 分
    let m = date.getMinutes()+s/60;
    // 获取 时
    let h = parseInt(date.getHours()+m/60);       //现在的h是24小时制
    h = h>12?h-12:h;

    // console.log(h);

    // 时针
    ctx.save();
    // 宽度为14默认宽度为8，
    ctx.lineWidth = 8;
    // 让时针转到对应的位置上, 1小时=30度
    ctx.rotate(h*30*Math.PI/180);
    ctx.beginPath();
    // 时针 圆心外溢出80 收20  那就是-20 画到+80呗
    ctx.moveTo(0,20);
    ctx.lineTo(0,-60);
    ctx.stroke();
    ctx.restore();

    // 分针
    ctx.save();
    // 宽度为14默认宽度为8，
    ctx.lineWidth = 5;
    // 让时针转到对应的位置上, 1分钟转6度
    ctx.rotate(m*6*Math.PI/180);
    ctx.beginPath();
    // 时针 圆心外溢出80 收20  那就是-20 画到+80呗
    ctx.moveTo(0,25);
    ctx.lineTo(0,-100);
    ctx.stroke();
    ctx.restore();

    // 秒针
    ctx.save();
    // 宽度为14默认宽度为8，
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FF4081';
    // 让时针转到对应的位置上, 1分钟转6度
    ctx.rotate(s*6*Math.PI/180);
    ctx.beginPath();
    // 时针 圆心外溢出80 收20  那就是-20 画到+80呗
    ctx.moveTo(0,35);
    ctx.lineTo(0,-110);
    ctx.stroke();
    ctx.restore();

    // 以上都创建好后 让它自动动起来


    ctx.restore();  // 区域1
    };

}

// 区域 1 的 save 和 restore 是用来做初始化工作
// 区域 2 的 save 和 restore 是用来画空心圆盘的 区域 2 中有样式不用改的 就会继承区域 1 的部分

---

### 使用图片 & 设置背景

canvas 操作图片时，必须要等图片加载完才能操作

### 引入图片：

ctx.drawImage(img, x, y, w, h)
img: 图片对象 或 canvas 对象，把哪张图片引入进来，为什么还能是 canvas 对象因为 canvas 本身就是一个图片
x y 是其在画布中的起始位置坐标
w h 用来控制 图片的尺寸

img 对象有 width 和 height 属性 所以可以这么写
ctx.drawImage(img, 0, 0, img.width, img.height);

在 canvas 中插入图片需要 image 对象
// 创建 image 对象
let img = new Image();
// 设置链接路径
img.src = '路径';
// 操作图片要等图片加载完成
img.onload = function(){
// 在这里操作图片

    // 在这里引入录图片

};

eg:
if(canvas.getContext){
ctx = canvas.getContext('2d');

let img = new Image();
img.src = './links/1.jpg';
img.onload = function(){

    // 为了避免在这里写太多的代码，可以使用函数
    draw();

};
// 其实就是把上面的代码抽到这里
function draw(){
// ctx.drawImage(img, 0, 0, img.width, img.height);
ctx.drawImage(img, 0, 0, 100, 100);
};
}

### 设置背景

ctx.createPattern(image, repetition)
它具有返回值，一般情况下，我们都会将 createPattern 返回的对象作为 fillstyle 的值
image:图像源
repetition:
"repeat"
"repeat-x"
"repeat-y"
"no-repeat"
背景和图片有关系 所以必须等图片加载成功

eg:
if(canvas.getContext){
ctx = canvas.getContext('2d');

let img = new Image();
img.src = './links/1.jpg';
img.onload = function(){

    // 为了避免在这里写太多的代码，可以使用函数
    draw();

};
// 其实就是把上面的代码抽到这里
function draw(){

    // 先画一个框体 背景得在这个框体里
    // 正常来讲 填充背景色就是背景了吧，那现在我是不是让颜色值等于背景图片就行了
    // ctx.fillStyle = '#C2185B';
    // ctx.fillRect(20,20,200,200);

    // 创建变量接收 设置背景方法的返回值 用来给 fillStyle
    let pattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(20,20,200,200);

};
}

### 渐变

线性渐变：

// 设置方向：
let 渐变对象 = ctx.createLinearGradient(x1, y1, x2, y2)
创建渐变对象，用来下一步操作 x y 表示渐变的起点 (x1,y1) 与终点 (x2,y2)
这两个点还控制了纯色的分布区域
1 --- 1 --- 0
1 到 1 是渐变的两个点 后面的 1 到 0 就是纯色部分

// 设置渐变条上的锚点 和 颜色
渐变对象.addColorStop(position, color)
position：渐变条上的锚点，表示渐变中颜色所在的相对位置 取值 0.0 - 1.0
color：颜色 如 #FFF， rgba(0,0,0,1)

// 将渐变对象 传递给 fillStyle

let gradient = ctx.createLinearGradient(0,0,200,200);
eg：
// 设置渐变方向
let gradient = ctx.createLinearGradient(0,0,200,200);
// 设置锚点 和 颜色
gradient.addColorStop(0, '#C2185B');
gradient.addColorStop(.5, '#FF4081');
gradient.addColorStop(1, '#BDBDBD');
ctx.fillStyle = gradient;
ctx.fillRect(20,20,200,200);

径向渐变：
createRadialGradient(x1, y1, r1, x2, y2, r2)
前三个参数则定义另一个以(x1,y1) 为原点，半径为 r1 的圆，
后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
渐变范围：
大圆 - 小圆 剩下的部分 是渐变范围
eg：
let gradient = ctx.createRadialGradient(100,100,100, 150,150,200);
// 设置锚点 和 颜色
gradient.addColorStop(0, '#C2185B');
// gradient.addColorStop(1, '#FF4081');
gradient.addColorStop(1, '#BDBDBD');
ctx.fillStyle = gradient;
ctx.fillRect(20,20,350,350);

---

### 练习 --- 飞鸟

要点：
两个作用域之间 对象看不见 可以用 this 来传递
draw(this);
function draw(img){}

让画布大小等于视口的大小
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

做 canvas 的动画就是清楚 加载的反复

++ 慢， += 快

let canvas = document.getElementById('canvas');
// 让画布的大小等于视口的大小
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx;
if(canvas.getContext){
ctx = canvas.getContext('2d');

    // 制作飞鸟的话 肯定是要拿到图片的 怎么拿呢？一堆呢
    // 创建 变量
    let flag = 0;

    // 为了改变引入图片的位置 创建一个变量让它不断改变 x 的值
    let site = 0;

    setInterval(function(){

        // 没进循环定时器后 清楚一次
        ctx.clearRect(0,0,canvas.width, canvas.height);

        // 为了拿到图片让flag自增
        flag++;
        // 判断图片
        if(flag == 9){
            flag = 1;
        }

        // 改变图片 x 的位置
        site += 15;

        // 每次进到这里 建立img对象 引入图片
        let img = new Image();
        img.src = './links/q_r'+(flag)+'.jpg';
        // 等图片加载完毕操作图片
        img.onload = function(){

            draw(this);     //这里的this是img 为了解决两个作用域img对象传递不过去的问题
        };

        // 怎么让鸟往前走，我们做canvas的动画主要就是覆盖 那就是不断的改变 图片的导入位置，
        // ctx.drawImage()中的x y就是图片的位置，改变它就可以了不是么
    },100);

    // 把图片的相关操作写在外面
    function draw(img){
        // 引入图片, 这有个问题，第一个参数要传递图片对象，但是图片对象是在定时器的函数中，我现在是在draw的函数中
        // 两个作用域了 传不过来
        // 上面用哪个this传递进来了
        ctx.drawImage(img,site,0)
    };

}

---

### 文本相关

文本的 x y 0 0 的位置 默认是文字底部的基线 并不是理解的文本框的左上角

// 绘制文本
文本也是 canvas 画到画布上去的

// 在指定的(x,y)位置 文本是正常文字效果 填充
ctx.fillText(text, x, y)

// 在指定的(x,y)位置 文本只有描边
ctx.strokeText(text, x, y)

// 文本样式

// 设置 字号 字体
ctx.font = '10px 字体名'
必须同时有字号字体，且 字体只支持 sans-serif 系列

// 设置文本水平对齐的方式
ctx.textAlign = 'left right center'

left： 文本的左边靠到 x 的位置
right： 文本的右边靠到 x 的位置
center： 文本的中间位置 在 x 的位置上
也就是说文本一半在 x 的左边，一半在 x 的右边

// 设置文本垂直对齐的方式
ctx.textBaseline = 'top middle bottom'
top 文本基线在文本块的顶部。
middle 文本基线在文本块的中间。
bottom 文本基线在文本块的底部。
按基线对齐

// 获取 文本尺寸的信息
ctx.measureText()
返回一个 TextMetrics 对象，包含关于文本尺寸的信息（例如文本的宽度）
eg：
ctx.fillText('今天天气真不错',0,0);
// ctx.strokeText('今天天气真不错',50,50);
debugger;
let tinfo = ctx.measureText('今天天气真不错');
// tinfo 能返回 这个字符串 在我画布上的一个宽度 210
所以我们还能写:
tinfo.width

// 文本的水平 垂直 居中
这点就用到了 上面的 ctx.measureText('字符串')功能
// 实现文字水平垂直方向居中
ctx.font = '60px ss';
// 设置文本垂直方向居中对齐
ctx.textBaseline = 'middle';
// 获取文本的宽度
let textWidth = ctx.measureText('找工作').width;
ctx.fillText('找工作',(canvas.width - textWidth)/2, (canvas.height - 60)/2);

// 文本阴影 盒模型阴影
shadowOffsetX = float
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，
它们默认都为 0。

shadowOffsetY = float
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，
它们默认都为 0。

shadowBlur = float
shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。

shadowColor = color(必需项)
shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

eg:
ctx = canvas.getContext('2d');
ctx.fillStyle = '#C2185B';
ctx.strokeStyle = 6;

// 设置阴影
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;
ctx.shadowColor = 'black';

ctx.rect(100,100,200,200);
ctx.fill();

---

### 像素操作

总结：
通过
ctx.getImageData(0,0,100,100) 获取 img 对象

然后
img 对象中有 3 个属性，width height data（0-255 rgba 的信息）

最后还有一个
ctx.putImageData(imgData,x,y);

引入
比如我现在画好了一个矩形，然后我想复制一份怎么办？ 不要 ctrl+c 哈，因为有的情况是
我对这个图形进行了 n 多操作，现在我想 100%的复制一份 那应该怎么办？
目标矩形：ctx.fillRect(0,0,100,100);

我可以把这个目标矩形的每一个点的像素信息拿到，怎么拿？canvas 给我们提供了一个方法
可以获取 指定 起点（x y）， 范围（100，100）内的所有信息

eg:
ctx.fillRect(0,0,100,100);

let imgData = ctx.getImageData(0,0,100,100);
获取从 0 0 位置开始 100 - 100 范围内的所有数据

// 得到场景像素数据
ctx.getImageData()
获得一个包含画布场景像素数据的 ImageData 对像,它代表了画布区域的对象数据

let imgData = ctx.getImageData(0,0,100,100);
imgData 中有几个属性：
width： 横向上像素点的个数 图片宽度，单位是像素
height：纵向上像素点的个数 图片高度，单位是像素
data： 数组 里面放的是每一个像素点的 rgba 信息 所以是 10000 个 x 4
包含着 RGBA 格式的整型数据，范围在 0 至 255 之间（包括 255）
R:0 --> 255(黑色到白色)
G:0 --> 255(黑色到白色)
B:0 --> 255(黑色到白色)
A:0 --> 255(透明到不透明)

假如我想画一个带有透明度的矩形
1、我可以 ctx.fillStyle = 'rgba(x,x,x,x)';

另外一种方式：
因为 getImageData 获取的是 每一个像素点的 rgba 的信息
[r, g, b, a,r, g, b, a,r, g, b, a]
也就是我要获取 3，7，11，5.....
修改数组中 a 的值
for(let i=0; i<imgData.data.length; i++){
imgData.data[4*i+3] = 100;
}

// 在场景中写入像素数据
ctx.putImageData(获取到的 imgData, dx, dy)
dx 和 dy 参数表示你希望在场景内左上角绘制的像素数据所得到的设备坐标

// 创建一个 ImageData 对象
ctx.createImageData(width, height);
width : ImageData 新对象的宽度。
height: ImageData 新对象的高度。

默认创建出来的是透明的

创建完的修改后 还可以通过 putImageData 添加到其他地方

---

### 单像素的操作

### 获取 拿这个

function getPxInfo(imgData,x,y){

    let colorInfo = [];
    let data = imgData.data;
    let w = imgData.width;
    let h = imgData.height;
    colorInfo[0] = data[(y*w+x)*4]
    colorInfo[1] = data[(y*w+x)*4+1]
    colorInfo[2] = data[(y*w+x)*4+2]
    colorInfo[3] = data[(y*w+x)*4+3]
    return colorInfo;

}

### 设置 拿这个

function setPxInfo(imgData,x,y,color){
let data = imgData.data;
let w = imgData.width;
let h = imgData.height;
data[(y*w+x)*4] = color[0]
data[(y*w+x)*4+1] = color[1]
data[(y*w+x)*4+2] = color[2]
data[(y*w+x)*4+3] = color[3]
}

上面我们了解了 怎么取得一块区域的像素信息，那么怎么拿到一个点的像素信息呢？
我们自己定义一个方法

注意：我那取的是画布上的图像的像素点信息，假如取到画布背景的话 那就是黑色 即使我们画布的背景是别的颜色
那只是 css 里设置的背景色，我们画布的背景 默认是 黑色 透明

// imgData: 整个像素点的信息

### 解析定义方法中数据

getPxInfo(imgData,x,y)

imgData：
获取的哪块区域的信息
x：不是偏移量中的 x 而是一行中从 0 开始到 x 个
y：不是偏移量中的 y 而是几行的意思

□□□□□□
□□□□□□
□□□■□□ 　 y\*w + x 2 行 X 6 + 3（黑色方框前面的 3 个）

setPxInfo(imgData,x,y,color)

// 获取 画布上某个像素上图像的像素信息
function getPxInfo(imgData,x,y){

let colorInfo = [];
let data = imgData.data;
let w = imgData.width;
let h = imgData.height;

// 目标(3,3)取得这个点的信息
// 这个点 前面有多少个像素点 xw+y
// r
colorInfo[0] = data[(y*w+x)*4]
// g
colorInfo[1] = data[(y*w+x)*4+1]
// b
colorInfo[2] = data[(y*w+x)*4+2]
// a
colorInfo[3] = data[(y*w+x)*4+3]

return colorInfo;
// 试验下 看看能不能直接返回个 rgba 好直接使用，但好像不行呢咋
return 'rgba('+ colorInfo[0]+', '+colorInfo[1]+', '+colorInfo[2]+', '+colorInfo[3] +')';

}

// 假如我要拿到区域内一个像素点 比如（3，3） 怎么拿到？
// （3，3） 前面有多少个像素点 y _ width(区域的宽度) + x 个像素点
// y _ width(区域的宽度) + x y 为多少行 x 为第几个像素点 w 为一行像素点的个数(拿到的 imgData 区域的宽度)
// 那 yw+x 个像素点占 data 中的多少位 X4 吧一个像素点的信息就是 rgba4 个 位数 那这 4 个位数就是这个点的 rgba 的信息

eg:
if(canvas.getContext){
ctx = canvas.getContext('2d');

ctx.save();
ctx.fillStyle = '#7B1FA2'
ctx.beginPath();
ctx.fillRect(50,50,100,100);
ctx.restore();

let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
let targetColor = getPxInfo(imgData,49,49);
console.log(targetColor);
}

// 设置
// 参数 color: 是一个数组
function setPxInfo(imgData,x,y,color){
let data = imgData.data;
let w = imgData.width;
let h = imgData.height;

// r
data[(y*w+x)*4] = color[0]
// g
data[(y*w+x)*4+1] = color[1]
// b
data[(y*w+x)*4+2] = color[2]
// a
data[(y*w+x)*4+3] = color[3]
}
设置完后不要忘记再 putImageData 进去 放到跟获取区域一样的位置
setPxInfo(imgData,49,49,[0,0,0,255]);
ctx.putImageData(imgData,0,0);

// 修改某一个行上的所有信息

□□□□□□
□□□□□□
□□□■□□ 　 y\*w + x 2 行 X 6 + 3（黑色方框前面的 3 个）

for(let i=0; i<imgData.width; i++){
// 我要修改某一行上的所有像素点，seiPxInfo 中的 x y 并不是偏移量要记住
// 我们看看偏移量 x 和 y 代表着什么 x 肯定是我们要变的 i y 正常应该是代表着哪行
setPxInfo(imgData,i,50,[0,0,0,255]);
}

---

### 练习 --- 马赛克

思路：
两幅图

正常 ---- 马赛克图

1、我拿到正常图的所有像素点 就能对这些像素点进行操作 最终再把它放回去 变成一个马赛克图
怎么操作？
2、定义一个马赛克矩形 矩形的尺寸随意 5 x 5 | 4 x 4 都可以， 把这个矩形当中的所有像素点 随机挑一个出来
让其它的像素点都跟这个像素点一模一样 最后就是马赛克

比如现在有 100 _ 100 的矩形图片，我们要把这张图片变成马赛克
1、先定义一个 矩形 5 _ 5 然后 把 100*100 分成 横向 20 个 5*5 矩形 纵向 20 个 5*5 矩形
2、在原图中横向 20 个 5*5 矩形中的第一个 5*5 矩形中 随机抽出来一个像素点的信息 rgba
3、将这个 5*5 矩形中的所有颜色统一设置成随机抽出来的那个像素点的信息 rgba，并放入新照片的横向 20 个中的第一个上
4、以此类推 横向操作 20 次，纵向操作 20 次

要点：

随堂作业：
// 画布的宽度 最好动态设置 因为是图片的 2 倍
let canvas = document.getElementById('canvas');
let ctx;
if(canvas.getContext){
ctx = canvas.getContext('2d');

    // 引入图片
    let img = new Image();
    img.src = './links/5.jpg';
    // 等图片加载完成后 操作图片
    img.onload = function(){
        // 图片加载完成后 修改画布的高度和宽度
        canvas.width = img.width * 2;
        canvas.height = img.height;

        // 定义一个方法 操作图片
        draw();
    };


    // 定draw()
    function draw(){

        // 把图片导入到画布中
        ctx.drawImage(img,0,0);

        // 像素操作 肯定要获取imgData, 获取图片的信息，注意这个函数里获取不到上一个函数中的img信息 用过this来传递
        let oldImgData = ctx.getImageData(0,0,img.width,img.height);

        // 创建一个新的
        let newImgData = ctx.createImageData(img.width,img.height);


        // 马赛克
        // 思路：
        // 1、选区一个马赛克矩形
        // 2、从马赛克矩形中随机抽出一个像素点的信息rgba
        // 3、将整个马赛克矩形中的像素点信息统一调成随机抽出的那个

        // 1、选区一个马赛克矩形
        // 假如我创建一个5 x 5的矩形 那在图片上体现出来就是 (0,0) - (4,4) 一共是25个像素点
        let size = 5;
        // 上面这个size 减小 变清晰了 比如1 2 10 各有不同的效果

        // 这里为什么要除以5，因为我们是以5 x 5的正方形为一个单位 按照这个单位区遍历 一个坐标的结果里有5 x 5个像素
        for(let i=0; i<oldImgData.width/size; i++){
            for(let j=0; j<oldImgData.height/size; j++){
                // (i,j) 为每一个马赛克矩形的坐标
                // 如果是(0,0)的话 实际代表(0,0) - (4,4)
                // 如果是(0,1)的话 实际代表(0,5) - (4,9)

                // 如果是(1,0)的话 实际代表(5,0) - (9,4)
                // 如果是(1,1)的话 实际代表(5,5) - (9,5)

                // 2、从马赛克矩形中随机抽出一个像素点的信息rgba
                // 开区间：a - b 不包含ab，闭区间：a - b 包含ab
                // Math.random()  [0-1]
                // Math.random()*size  [0-4] 不包含0 和 5
                // Math.floor() 向下取整，小数位部分会被舍弃掉
                // Math.floor(Math.random()*size)

                // let color = getPxInfo(oldImgData,Math.floor(Math.random()*size),Math.floor(Math.random()*size));
                // 上面这行现在都是在为第一个马赛克矩形做设计 想为所有的马赛克矩形做设计的话 肯定是跟i j有关系的
                let color = getPxInfo(oldImgData,i*size+Math.floor(Math.random()*size),j*size+Math.floor(Math.random()*size));
                // 上面这行 i每次+1 x就会往右5个 加上5的话 就相当于 x轴上的第2个马赛克矩形
                // 上面这行 j每次+1 y就会往下5个 加上5的话 就相当于 y轴上的第2个马赛克矩形 以此类推 横向和纵向都会轮一遍
                // 到这才能得到所有的马赛克矩形



                // 3、将整个马赛克矩形中的像素点信息统一调成随机抽出的那个
                // 统一调怎么调？是不是for循环出 马赛克矩形中的所有像素点吧 那是不是横向 和 纵向都需要循环
                for(let a=0; a<size; a++){
                    for(let b=0; b<size; b++){
                        // 每一个位置都要轮一次 所有是马赛克矩形的a b
                        // 我们要修改newImageData吧，怎么改，从oldImageData里随机拿一个颜色出来 将newImageData里的数据全都改成新的
                        // 只不过我们改的是newImageData里的第一个马赛克矩形 因为ab的值是0 0 - 4 4
                        // 最后一个参数color是上面随机抽出来的数组

                        // setPxInfo(newImgData,a,b,color);
                        // 上面这行处理单纯的a b的还是处理一个马赛克矩形

                        setPxInfo(newImgData,i*size+a,j*size+b,color);
                        // 跟i j关联在一起才是处理所有的马赛克矩形
                    }
                }
            }
            // 内层循环走完处理的是一列
        }   // 外层循环全部走完才是全部

        // 最后 把新的对象放到画布上
        ctx.putImageData(newImgData,img.width,0)
    };


    // 获取
    function getPxInfo(imgData,x,y){

        let colorInfo = [];
        let data = imgData.data;
        let w = imgData.width;
        let h = imgData.height;
        colorInfo[0] = data[(y*w+x)*4]
        colorInfo[1] = data[(y*w+x)*4+1]
        colorInfo[2] = data[(y*w+x)*4+2]
        colorInfo[3] = data[(y*w+x)*4+3]
        return colorInfo;
    }

    // 设置
    function setPxInfo(imgData,x,y,color){
        let data = imgData.data;
        let w = imgData.width;
        let h = imgData.height;
        data[(y*w+x)*4] = color[0]
        data[(y*w+x)*4+1] = color[1]
        data[(y*w+x)*4+2] = color[2]
        data[(y*w+x)*4+3] = color[3]
    }

}

---

### 全局透明度的设置

ctx.globalAlpha = 0.0 -1.0
这个属性影响到 canvas 里所有图形的透明度 从完全透明 - 完全不透明
eg:
ctx = canvas.getContext('2d');
ctx.globalAlpha = 0.5;
ctx.fillStyle = '#7B1FA2';
ctx.fillRect(0,0,100,100);
// 想让上面的矩形透明 有很多方式 1、设置颜色 rgba；2、像素操作；
// 如果全局就一个对象要透明 还可以用 globalAlpha 0-1

### 合成

是多张图片图片叠在一起的时候 怎么去展现

下面的功能有点像 ai 里的路径查找器 形状模式那

source:新的图像(源)  
 新的图像指的是在代码上最后画的 也就是屏幕上最上面的

destination:已经绘制过的图形(目标)
已经绘制过的图像指的是在代码上之前画的 也就是屏幕上被压着的

ctx.globalCompositeOperation
// 以源为中心 进行 图片之间的相切 交集 减去顶层等操作
source-over(默认值):源在上面,新的图像层级比较高  
 source-in :只留下源与目标的重叠部分(源的那一部分) 交集
source-out :只留下源超过目标的部分  
 source-atop:砍掉源溢出的部分

    // 以绘制过的图形为中心 进行 图片之间的相切 交集 减去顶层等操作
    destination-over:目标在上面,旧的图像层级比较高
    destination-in:只留下源与目标的重叠部分(目标的那一部分)
    destination-out:只留下目标超过源的部分
    destination-atop:砍掉目标溢出的部分

ctx.globalCompositeOperation = ''
要注意在代码中的位置

---

// 下面的就是：destination
ctx.fillStyle = '#7B1FA2'; 这部分相当于 目标
ctx.fillRect(0,0,100,100);

### ctx.globalCompositeOperation = 'source-in' 留下源与目标重叠的部分，下面的是源 上面的是目标

// 下面的就是：source
ctx.fillStyle = '#9C27B0'; 这部分是 源
ctx.fillRect(50,50,100,100);

---

---

### 刮刮卡

要点：
1、移动端的话 这行代码一定要写
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

2、让图片和视口宽度 高度一样大
background-size:100% 100%;

3、动态更改画布尺寸 跟视口一样
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

4、移动端没有 mouse 和 click 事件的 点击事件 使用 touchstart 事件 相当于 onmousedown
移动端手指点上去的事件

5、当画布不是和视口一样时，在画布上点击的位置应该是：
手指距离视口的距离 - canvas 画布的偏移量

6、移动端对额事件不要用 onlick 没用的

7、当过渡执行完毕后触发事件 transitionend 事件
canvas.addEventListener('transitionend', function(){
this.remove()
});

8、dom 也有.remove()方法

9、移动端 必须要 先 touchstart 然后才能 touchmove 而 pc 端可以直接使用 onmousemove 事件

思路：
刮刮卡的效果 是 2 层 上面一层是 canvas 下面一层是图片 canvas 这层把图片盖住了
每次刮的时候 手指和图片是有重叠区域的 只留下目标溢出那一部分就可以来了

看下文件夹里的联系 我觉得我记得很详细

---

###将画布导出为图像 canvas 元素上的方法
canvas.toDataURL(注意是 canvas 元素接口上的方法)

let canvas = document.getElementById('canvas');
let result = canvas.toDataURL();
console.log(result); //是一个保存 canvas 图片的网址 可以在网页上打开

注意 canvas 是同步思想 保存导出图片链接 要在图片完成后

正常来讲的话 在浏览器上右键 保存图片就可以
移动端的话没办法右键

### 事件操作

ctx.isPointInPath(x, y)
判断在当前路径中是否包含检测点 也就是说 这个 x y 的点是不是在这条路径上
x:检测点的 X 坐标
y:检测点的 Y 坐标

注意，此方法只作用于最新画出的 canvas 图像

canvas 的图形能不能有事件 能 所以推出了上面的 api

给 canvas 的图像加事件是很难的

另外 点一个图形弹出 123 点另一个图形弹出 456 也是可以的 好像需要利用原型

if(canvas.getContext){
ctx = canvas.getContext('2d');
// 情况一：单独的一个图形 可以触发下面事件
// ctx.fillStyle = 'pink';
// ctx.rect(0,0,100,100);
// ctx.fill();

// 情况二：虽然我画了两个图形 但是因为没有清空 path 所以相当于再画第二个图形时，连带第一个也重新画了一次
// 所以两个图形都会触发事件
// ctx.fillStyle = 'pink';
// ctx.rect(0,0,100,100);
// ctx.fill();
// ctx.rect(100,00,100,100);
// ctx.fill();

// 情况三：我们用 save restore 加上 beginPath 的话 只有最新的才会有事件的触发
// ctx.fillStyle = 'pink';
// ctx.rect(0,0,100,100);
// ctx.fill();
// ctx.beginPath();
// ctx.rect(100,00,100,100);
// ctx.fill();

// 为图形绑定事件
canvas.onclick = function(event){
event = event || window.event;
let x = event.clientX - canvas.offsetLeft;
let y = event.clientY - canvas.offsetTop;

    // 如果点击的点 在最新画出的图形内则触发
    if(ctx.isPointInPath(x,y)){
        alert(123);
    }

    // 其实点canvas内也触发click了 只是没有进入判断去弹框而已

};

    }

---

\*/

window.onload = function(){

    // 荧幕
    let canvas = document.getElementById('test');
    let ctx;
    // 放映机
    let video = document.querySelector('video');

    // 需求 我们让视频在画布上播放，video其实就是一帧一帧全是静态画
    // 我们将video

    if(canvas.getContext){
        ctx = canvas.getContext('2d');

        // 跟导入图片的方式一样
        ctx.drawImage(video,0,0,canvas.width,canvas.height);
        // 如果没导入进来的话 可以加载事件 比如第一帧事件




    }

};
</script>
<style>

        html, body{
            height:100%;
            overflow:hidden;
        }

        body {
            background:#BDBDBD;
        }

        #test {
            background:#FFC107;
            position:absolute;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
        }


    </style>

</head>
<body>
    <canvas id='test' width='500' height='500'>
        <span>您的浏览器不支持画布元素</span>
    </canvas>
    
</body>
</html>
