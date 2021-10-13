
### ES6的兼容性不是很好, 有一些特性并不支持, 比如一些解构赋值 IE10+

### 编译 转换
- 让es6在低版本中也能跑的了

> 在线转换 browser.js  babel == browser.js
- 用户每次打开页面都要花费时间来转换, 是一个js文件
- 在使用babel的时候要给一个type
<!-- 
    <script src="browser.js" charset="UTF-8"></script>

    // 在引入进来后需要在type里面声明这是一个babel
    <script type="text/babel">
        在这里敲代码
    </script>
 -->

-------------------------------

### let
- let用来声明变量, 作用和var一样
let a, b, c;
let e = 100, h = [], g = 'abc';

### 特性:
> 变量不能重复声明, 防止变量污染
<!-- 
    let a = 1;
    let a = 2;
 -->

> 块级作用域(全局, 函数, eval, 块级作用域)
- 代码块还包括:   if  else  while  for 在这里let声明的变量也是块级作用域
<!-- 
    {
        变量只在代码块内部有效, 出去无效
        let a = 10;
    }
    console.log(a);     //a未定义   报错
 -->

> 不存在变量提升
> 使用let声明时不影响作用域链

-----

> 对let的解析实例:
- 之前我们使用var进行for循环绑定监听, 更改样式内部使用的都是this, 因为使用items[i]会报错, 因为for循环跑完后i的值为3

- 因为使用的是var, 存在这变量提升, var是在全局里保存的, 每次var的值会被上一次的结果覆盖掉
<!-- 
    for(var i=0; i<items.length; i++){
        items[i].onclick = function(){
            // this.sytle.background = 'pink';
            items[i].style.background = 'pink';
        };
    }
    {
        var i = 0;
    }

    // 被修改为
    {
        var i = 1;
    }

    // 被修改为
    {
        var i = 2;
    }

    // 最终全局只有一个i的值
--> 

-----

- 使用let的时候, 因为是块级作用域, 点击items时回调函数中没有i 会向上一级找i, 找到了i=0, 相当于在let的各自的作用域下运行, 所以它们会使用当前的作用域内的let值

<!--
    for(let i=0; i<items.length; i++){
        items[i].onclick = function(){
            // this.sytle.background = 'pink';
            items[i].style.background = 'pink';
        };
    }
    {
        let i = 0;
        items[i].onclick = function(){
            // this.sytle.background = 'pink';
            items[i].style.background = 'pink';
        };
    }
    {
        let i = 1;
        items[i].onclick = function(){
            // this.sytle.background = 'pink';
            items[i].style.background = 'pink';
        };
    }
    {
        let i = 2;
        items[i].onclick = function(){
            // this.sytle.background = 'pink';
            items[i].style.background = 'pink';
        };
    }
 -->

-------------------------------

### const 常量
- 值不能修改的量称之为常量
- 优先使用const
- 在定义数组 以及 对象的时候 我们使用const比较好
<!-- 
    const SCHOOL = '八中';
 -->

> 注意事项:
- 一定要赋初始值
<!-- const a;    // 报错 -->

- 一般常量使用大写

- 常量的值不能修改

- 它也是块级作用域
<!-- 
    {
        const PLAYER = 'uzi';
    }
    console.log(PLAYER);    // 外部输出会报错
 -->

- 对于数组和对象的元素修改, 不算做对常量的修改, 不会报错
<!-- 
    const TEAM = ['uzi', 'ming'];
    TEAM.push('Meiko');

    // 不会报错, 因为常量所指向的地址没有发生改变
 -->

> 以后声明数组 和 对象的时候用const声明比较好, 避免误操作修改了数组 和 对象的地址值, 造成一些问题

-------------------------------

### 解构赋值
- ES6中允许按照一定的模式从数组和对象中提取值, 对变量进行赋值, 这被称为解构赋值
- 等号左右两边 结构 必须一样
- 右边必须是个东西 左边是数组 右边也要是数组, 左边是对象 右边也要是对象
- 声明和赋值不能分开(必须在一句话里面)

- 左边{变量名} 只能是目标的属性名
- 左边{变量名} 的顺序没有要求

- 所谓的解构赋值 是 解构 + 赋默认值

> 数组的解构
- 之前我们要把数组里面的元素,放到变量里可能会这么做

    let arr = [1,2,3]
    let a = arr[0]
    let b = arr[1]
    let c = arr[2]

    let [a,b,c] = [1,2,3]
<!-- 
    很简单 就是一一对应 右边的给左边
    按照对应位置 对变量赋值
    这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
 -->

<!-- 
    const F4 = ['小沈阳', '刘能', '赵四', '宋小宝'];
    ↓
    想把数组中的一个元素, 赋值给一个变量
    ↓
    使用let, 用数组的形式声明4个变量 然后 = 目标数组
    let [xiao, liu, zhao, song] = F4;
    console.log(xiao, liu, zhao, song);
 -->

- 嵌套数组的结构：
- let [foo, [[bar], baz]] = [1, [[2], 3]];

- 解构数组中指定的元素
- 使用,号占位
- let [ , , third] = ["foo", "bar", "baz"];

- 解构一个元素，剩余的还是数组：
- let [head, ...tail] = [1, 2, 3, 4];

- 解构set结构的数据
- let [x, y, z] = new Set(['a', 'b', 'c']);


> 解构的时候允许指定默认值
- 注意该方式，能设置默认值的元素必须是undefined 默认值才会生效
- 如果数组的成员是null 那默认值就不会生效，因为null不严格等于undefined
- let [foo = true] = [];
- let [x, y = 'b'] = ['a']; // x='a', y='b'
- let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'



> 对象的解构, JSON的解构
- 对象的解构与数组有一个重要的不同。
- 数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
- 
- 如果解构失败，变量的值等于undefined。

    let {a,c,d} = {a:12, c:5, d:6};

    const ZHAO = {
        name: '赵本山',
        age: '不详',
        xiaopin: function(){
            console.log('我可以演小品')
        }
    }
    ↓
    let {name, age, xiaopin} = ZHAO;


> 解构对象时的重命名
- let {data: res} = await...


> 成分复杂的数组解构
- 要点是一一对应的关系
<!-- 
    [{a:12, b:5}, [12,5,8], 'cs', 8]

    我们可以这样

    let [{a, b}, [n1, n2, n3], str, num] = [{a:12, b:5}, [12,5,8], 'cs', 8]
    console.log(a,b,n1,n2,n3,str,num)

    还可以这样 只要是结构一样就可以
    let right = [{a:12, b:5}, [12,5,8], 'cs', 8]
    console.log(a,b,n1,n2,n3,str,num);

    let [json, arr, num, str] = right;
 -->


> 对象单独解构:
- 声明的变量名 和 目标对象中变量名一致, 就能提取出对应的元素
- 如果只想获取部分属性, 只写这个属性名就可以
<!-- 
    const OBJ = {
        name:'sam',
        age:35,
        sayName:function(){
            console.log('this.name');
        }
    }

    // 这里让sayName的变量名 和 目标对象中变量名一致, 就能提取出对应的元素
    let {sayName} = OBJ;
    console.log(sayName);
    sayName();
 -->


> 对象解构时的默认值
- 与数组一样 对象中的属性名是undefined的时候 我们才可以给这个属性赋默认值
- var {x = 3} = {};
- var {x: y = 3} = {};


> 字符串的解构
- 字符串跟数组解构的方式一样
- 在单独解构的时候也有 ,, 的用法

    let str = 'hello';
    let [a,b,c] = str;      // h e l


> 函数参数的解构
- 当实参的类型是一个对象的时候, 我们可以使用解构的方式定义形参
- 函数中的形参也可以用解构的方式的书写, 当想使用对象中的数据的时候, 可以使用对象解构的方式传入形参的位置
<!-- 
    let obj = {
        name: 'nodejs',
        age: 11,
        email: '@163.com'
    };

    function fn({name, age}) {
        通过形参的结构 我们可以直接拿到变量名 不用再
        obj.name, obj.age 了

        我们可以直接使用 name age 了
        console.log(name, age);
    }

    fn(obj);
    调用这个函数的时候, 传进来的对象必须有name age属性, 如果没有值为undefined
 -->

- 传入空对象不会报错
<!-- 
    当调用fn() 函数时, 如果不传递参数 相当于传递了null进去 结果会报错
    我们可以传入fn({})空对象 相当于传递了undefined 不会报错
 -->

- 函数参数中解构的初始值
<!-- 
    function fn({name, age}) {
        console.log(name, age);
    }

    fn();
    如果调用参数时没有传递实参 这种情况下会报错


    function fn({name, age}={}) {
        console.log(name, age);
    }
    我们可以通过给解构形参赋初始值的方式 传入默认值{}


    function fn({name='sam', age=1}={}) {
        console.log(name, age);
    }
    我们还可以给形参中的name和age赋初始值
 -->

-------------------------------

### ES6中对字符串的扩展
- 字符串也可以使用 for...of 来进行遍历


> 新增的方法：
> 字符串.includes("字符串", [从哪个位置开始查找])
- 返回布尔值，表示是否找到了参数字符串

> 字符串.startsWith("字符串", [从哪个位置开始查找])
- 返回布尔值，看看参数字符串是否在原字符串的头部

> 字符串.endsWith("字符串", [从哪个位置开始查找])
- 返回布尔值，看看参数字符串是否在原字符串的尾部

> 字符串.repeat(num)
- 该方法会返回一个新的字符串 num表示重复几次 如果是小数会向下取整

> 字符串.padStart(num:指定长度, "用什么字符来补位")
> 字符串.padEnd(num:指定长度, "用什么字符来补位")
- 如果原字符串的长度 等于或大于最大长度 则字符串补全不生效，返回原字符串
- 'x'.padStart(5, 'ab')

- 如果省略第二个参数 默认使用空格补全长度

- 应用场景：
- 为数值补全指定位数
- '1'.padStart(10, '0') // "0000000001"

- 提示字符串格式。
- '12'.padStart(10, 'YYYY-MM-DD')


> 字符串.trimStart()
> 字符串.trimEnd()
- 他们的使用方式和.trim()一样
- trimStart() 用于消除字符串的头部空格
- trimEnd() 用于消除尾部的空格。
- 它们返回的都是新的字符串 不会修改原始的字符串


> 字符串.matchAll()
- 返回一个正则表达式在当前字符串的所有匹配
- 相当于 /g
- 返回一个新的字符串


> 字符串.replaceAll()
- 替换所有匹配
- 相当于 /g
- 返回一个新的字符串

- 参数：
- 参数1: 正则
- 参数2: 表示替换的文本 可以用特殊符号

  $&：匹配的字符串。
  $`：匹配结果前面的文本。
  $'：匹配结果后面的文本。
  $n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
  $$：指代美元符号$。

<!--
  // $& 表示匹配的字符串，即`b`本身
  // 所以返回结果与原字符串一致
  'abbc'.replaceAll('b', '$&')    // 'abbc'
  
  // $` 表示匹配结果之前的字符串
  // 对于第一个`b`，$` 指代`a`
  // 对于第二个`b`，$` 指代`ab`
  'abbc'.replaceAll('b', '$`')
  // 'aaabc'
  
  // $' 表示匹配结果之后的字符串
  // 对于第一个`b`，$' 指代`bc`
  // 对于第二个`b`，$' 指代`c`
  'abbc'.replaceAll('b', `$'`)
  // 'abccc'
  
  // $1 表示正则表达式的第一个组匹配，指代`ab`
  // $2 表示正则表达式的第二个组匹配，指代`bc`
  'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
  // 'bcab'
  
  // $$ 指代 $
  'abc'.replaceAll('b', '$$')
  // 'a$c'
-->

-------------------------------

### Math 对象的扩展
> Math.trunc(4.1)
- 去除一个数的小数部分，返回整数部分。
- 对于非数值，Math.trunc内部使用Number方法将其先转为数值。

-------------------------------

### ES6中关于数组的新方法
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

- reduce又叫做归纳函数, 累加器函数

- 语法:
- 参数:
- 1. 累加器
- 2. 当前项
- 3. index
- 4. 元素组
- 5. 初始值


> 没有初始值的情况
- reduce会拿数组中的第一个元素作为初始值, 从第二个元素开始循环
<!-- 
  [0,1,2,3,4,5].reduce((pre, item, index, arr) => {}, 没有初始值的情况)
  pre是 0
  从1开始循环

  let arr = [0,1,2,3,4]
  let res = arr.reduce((pre, item) => {
      return pre + item
  })
  console.log(res)

  没有初始值 那pre就会拿数组的第一个元素作为pre 从第二个元素开始循环, 也就是pre为0, 第一轮从1开始循环

  0 + 1
  1 + 2
  3 + 3
  6 + 4
  10

  数组里面的元素依次相加 求和
 -->

- reduce需要累加一个值出来 也就是说return一个值出来 不像其他的方法需要return一个true或者false, 返回的这个值作为下一个循环的累加器的结果

- 累加器的结果会覆盖上一次累加器的结果


> 指定初始值(比如指定10)
- 这个初始值, 会作为pre的值
- 如果指定了初始值, 那么第一轮循环会从数组中第一个元素开始

<!-- 
  let arr = [0,1,2,3,4]
  let res = arr.reduce((pre, item) => {
      return pre + item
  }, 10)
  console.log(res)

  因为有初始值 pre为10, 第一轮的循环从数组的第一个元素0开始
  
  10 + 0
  10 + 1
  11 + 2
  13 + 3
  16 + 4
  20

  初始值 + 数组中的每一个元素相加的结果
 -->


> reduce的核心功能
- 它是要返回一个值的 我们可以指定一个初始值 我们希望reduce返回的是一个什么样的数据类型, 可以直接放入到初始值中

- 案例:
- [{x:1}, {x:2}, {x:3}] 这是一个数组, 我们希望x的值进行累加
<!-- 
  如果是以前的我们需要进行for循环 拿到每一项x的值
  let x = 0
  sum.forEach((item) => {
    x += item.x
  })
  这样不好的地方在于 x是一个临时变量 参与完成后我们根本不需要它


  // reduce
  let init = 0
  let sum = [{x:1}, {x:2}, {x:3}].reduce((pre, item) => {
      return pre + item.x
  }, init)

  console.log(sum)

  初始值 + 对象中每一个x的值
 -->


- 案例:
- 将data中每一个对象的值, 放入到一个新数组中
- 要点:
- 初始值可以设置[], {}, 代表把pre设置成一个数组或者对象类型 
<!-- 
  let data = [
    { course: 'cc' },
    { course: 'dc' }
  ]

  let newArr = data.reduce((pre, item) => {
      // 把对象中的每一个属性放到了pre中
      pre.push(item.course)

      // 返回pre
      return pre
  }, [])

  console.log(newArr)
 -->


- 案例:
- 将二维数组转换为一维数组 [[0, 1],[2, 3],[4, 5]]
<!-- 

  先复习一波 数组 concat方法 可以拼接数组
  1. 可以追加元素到数组中
  let arr= [1,2]
  arr = arr.concat(3, 4)        // [1, 2, 3, 4]

  2. 可以连接两个数组
  let arr = [1,2]
  let brr = [3,4]
  let res = arr.concat(brr)   // [1, 2, 3, 4]



  // 使用reduce

  pre是一个数组, 里面使用的concat的方法
  第一次pre里面是1 2
  第二次往pre里面拼接了3 4


  let arr = [[0, 1],[2, 3],[4, 5]]

  arr = arr.reduce((pre, item) => {
    return pre.concat(item)

    // 也可以用这种方式
    return [...pre, ...item]
  }, [])

  console.log(arr)



  // 使用...
  let arr = [[0, 1],[2, 3],[4, 5]]

  let newArr = []
  arr.forEach((item) => {
      newArr.push(...item)
  })
  console.log(newArr)
 -->


- 案例:
- 计算数组总每个元素出现的次数
<!-- 
  let names = ['sam', 'erin', 'nn', 'sam']
  let res = names.reduce((pre, item) => {

    // 如果名字在pre中(pre已经是一个对象了 可以用in) 那就给这个名字加1 第一次肯定不在, 所以都会走else 给每一个人的名字添加一个属性1
    if(item in pre) {
        pre[item]++
    }else {
        pre[item] = 1
    }

    return pre
  }, {})
 -->


- 案例:
- 数组去重
<!-- 
  let arr = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']

  let res = arr.reduce((pre, item) => {
    if(pre.indexOf(item) === -1) {
        pre.push(item)
    }

    return pre
  }, [])

  console.log(res)
 -->


- 案例:
- [{value: '1,2'}, {value: '3'}, {value: '4'}] 将里面的value对应的值提取成一个数组

- 初始值我们还是给pre一个[], 这样能确定它的类型
<!-- 
    // 先复习一波 split()
    注意: 即使不符合split()中的拆分条件, 也可以拆 拆成前面的

    let str = '3'
    let test = str.split(',')
    console.log(test)               // ['3']


    let data = [{value: '1,2'}, {value: '3'}, {value: '4'}]

    // 这里使用了 ...之间展开 会发现字符串也能被展开 1 , 2
    let res = data.reduce((pre, item) => {
        return [...pre, ...item.value]
    }, [])
            // 结果: ["1", ",", "2", "3", "4"]


    // 这里使用了concat 给数组追加元素, pre是数组, item的value可以通过split转为数组,同时对, 进行拆分
    let res = data.reduce((pre, item) => {
        return pre.concat(item.value.split(','))
        
        // 也可以
        return [...pre, ...item.value.split(',')]
    }, [])

    console.log(res)
 -->

-------


> filter()
- 过滤
- 留一部分, 消失一部分, 通过true决定保留与否, 需要定义一个新数组来接受
- filter的回调函数的要求: 必须返回一个布尔值
- 如果为true 函数内部会自动将这次回调的value 加入到数组中
- 如果为false 函数内部会过滤掉这次的value

- 每遍历一次数字就会执行一次这个回调函数
<!-- 
    let arr = [12,5,8,99,27,36,75];
    let result = arr.filter(function(value){
        if(value % 3 == 0) {
            return true;
        }
    })
    console.log(result);

    注意 value % 3 == 0 这个部分本身就是一个布尔值所以可以这样写

    let arr = [12,5,8,99,27,36,75];
    let result = arr.filter(function(value){
        return value % 3 == 0;
    })
    console.log(result);

    ------

    let arr = [
        {title:'男士衬衫', price:75},
        {title:'女式包', price:576664},
        {title:'男士包', price:33},
        {title:'女士鞋', price:12130},
    ];
    
    let result = arr.filter(json => json.price >= 10000);
    console.log(result);
 -->


> forEach()
- 循环

-------------------------------

### 字符串相关的改变
- 多了两个新方法

> startsWith
- 以....开头
- 返回的是布尔值

<!-- 
    // 判断下字符串是否以xx开头
    let str = 'adsadfasga';

    alert(str.startsWith('a'));     //true


    // 判断网址类型
    let str = 'http://it.kaikeba.com';
    if(str.startsWith('http://')) {
        alert('普通网址');
    } else if (str.startsWith('https://')) {
        alert('加密网址');
    }
 -->

> endWith
- 以....结尾
- 返回的是布尔值
<!-- 
    // 判断文件类型
    if(str.endWith('.txt')) {
        alert('这是一个文本文件');
    }

 -->

-------------------------------

### 模板字符串 [``]
let str = `我也是一个字符串`;

> 内容中可以直接出现换行符
- '' ""内部是不允许出现换行符的
<!-- 
    let str = '<ul><li>沈腾</li><li>马冬梅</li></ul>' 
-->
<!-- 
    let str = `<ul>
                <li>沈腾</li>
                <li>马冬梅</li>
               </ul>`
-->


> 变量拼接 使用 `${变量名}另一个变量的内容` 
let str = '小呀小苹果';
let prevstr = '你是我的'

- 之前的方式:
<!-- 
    str = prevstr + '小呀小苹果';
    console.log(str);   //你是我的小呀小苹果
 -->

- 使用模板字符串
<!-- 
    str = `${prevstr}小呀小苹果`;
    console.log(str);   //你是我的小呀小苹果
 -->

-------------------------------

### 面向对象
- 一般面向对象的语言里面都有雷, 实例对象这些概念, 我们通过实例化类, 得到实例对象

- 我们先来看看老版的面向对象的写法 和 继承
<!-- 
    function Father(name, age) {
        this.name = name;
        this.age = age;
    }

    // 给父类的原型对象添加方法
    Father.prototype.showName = function() {
        console.log(this.name);
    }

    // 给父类添加静态的方法
    Father.showAge = function() {
        console.log('我是静态的方法')
    }
        // 类的静态方法只能通过 类名.静态方法名() 调用
        Father.showAge()


    functin Son(name, age, level) {
        // 继承父类中的属性 使用call方法传递this进去
        Father.call(this, name, age);

        // Son自己的属性
        this.level = level
    }

    // 让子类型的原型对象指向父类型的实例
    Son.prototype = new Father();

    // 让子类的constructor指回自己
    Son.prototype.constructor = Son
 -->


> ES6中定义一个类 使用 class 关键字
- es6中定义一个类需要使用class关键字
- class 类名 { ... }

> ES6中的继承 使用 extends 关键字
- 一般使用extends 关键字来进行继承
- class 子类名 extends 父类名 { ... }

> ES6中的静态方法 使用 static 关键字
- static 方法名() { ... }

> ES6中的静态属性 在类的外面定义

> super - 超类 = 父类
- 我们平时叫父类和子类 更专业点的叫法是超类
- 继承父类的方法,相当于 call()

> 定义一个类
<!-- 
    class Father {

        // 属性放在 constructor 构造器 中 实例属性
        constructor(name) {
            this.name = name;
        }

        // 定义一个实例方法(实例方法就是给实例化对象取用的)
        showName() {
            console.log(this.name)
        }

        // 定义一个静态方法
        static like() {
            console.log('i love erin');
        }
    }

    // 定义静态属性, 注意这里是外面
    Father.sex = 'man';

    let f1 = new Father('sam');     // sam会传进constructor中
    f1.showName();
    console.log(f1.name)  // sam

    // 调用静态方法
    Father.like();
 -->

> 上面的要点:
- 1. constructor什么时候执行? 实例化对象的时候自动执行, 只要有new了 就会执行constructor里面的代码 new多少次就会执行多少次(创建多少次实例对象就会执行多少次constructor)

- 2. 实例属性和实例方法都是给实例对象取调用的
- 3. 每一个实例对象在内存中是独立的, 各自拥有自己的属性和方法, 互不干扰互相独立
<!-- 
    比如我创建了2个实例对象, A和B 
    1. A和B在内存都有各自自己的内存空间
    2. A和B都有各自的属性和方法, 我修改B的name属性 不会影响到A的name属性 即使他们是通过一个class类实例化出来的
 -->

- 4. 静态方式是通过类名来调用的
- Father.like();


> 类的继承
<!-- 
    class Father {
        constructor(name) {
            this.name = name;
        }

        showName() {
            console.log(this.name)
        }

        static showAge() {
            console.log('我是Father中的静态方法')
        }
    }

    // 我们只需要写关键字 extends 就可以拿到父类中的属性和方法 自己里面不用定义任何东西
    class Son extends Father {

        constructor(name, age) { 这里写父类的形参和子类的形参
            // 调用父类的constructor方法, 跟call一样但不那么麻烦, 父类里面的形参别忘记
            super(name)

            this.age = 10;
        }


        // 子类可以有自己独立的方法
        duli() {
            console.log('我是子类独立的方法')
        }

        // 重写父类中的同名方法
        showName() {
            console.log('我是子类中的showName')
        }
    }


    // 创建Son的实例对象
    let s1 = new Son('nn');

    // 通过子类名调用父类中的静态方法
    Son.showAge();
 -->

> 上面的要点:
- 1. 父类的静态方法也可通过 子类名.父类中的静态方法名() 调用
<!-- 
    就是说子类可以继承到父类中的静态方法, 而且是通过自己的类名进行调用的
 -->

- 2. 当子类中的方法名和父类中的方法名一样的时候, 会发生重写现象
<!-- 
    这里相当于覆盖了(也叫重写)了父类中的方法, 调用的结果是重写后的方法内容
 -->

- 3. 子类中的 constructor 里如果不写 super() 的话 也会发生重写的现象
<!-- 子类中只要写了construtor就要调用下super() -->

- 4. 子类中的this, 在调用super()之后才起作用, 子类的对象是在super之后才起作用在super()方法之前使用this会报错

> 再写一个继承的例子
<!-- 
    class User {
        constructor(name, pass) {
            this.name = name;
            this.pass = pass;
        }

        showName() {
            alert(this.name);
        }
    }

    class VipUser extends User {
        constructor(name, pass, level) {

            // 这么写法相当于执行父类的构造函数, 跟call一样的不是那么麻烦
            super(name, pass);

            // 扩展自己的属性, 继承了父类的属性
            this.level = level;
        }

        // 方法的话, extends已经继承完了, 我们直接扩展新方法就可以了
        showLevel() {
            alert(this.level);
        }

        // 这里定义了一个和父类方法名一样的方法
        // 这里相当于覆盖了(也叫重写)了父类中的方法, 调用的结果是重写后的方法内容
        showName() {
            alert(this.name);
        }
    }
 -->

-------------------------------

### JSON对象

- stringify 字符串话
- parse 解析

> json的标准写法
- 只能用双引号 不能用单引号
- 所有的名字都必须用引号包起来
<!-- 
    错误的json:
    {a:12, b:5}         {a:'abc', b:5}  不能用单引号

    对的json:
    {"a":12, "b":5}     {"a":"abc", "b":5}
 -->

> 把json变成字符串 

    JSON.stringify(json);


> encodeURIComponent(uri)
- encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
<!-- 
    http%3A%2F%2Fwww.w3school.com.cn
    http%3A%2F%2Fwww.w3school.com.cn%2Fp%201%2F
    %2C%2F%3F%3A%40%26%3D%2B%24%23
 -->

    

<!-- 
    let json = {a:12, b:5}

    // 我想把json拼到里面去
    let str = 'http://it.kaikeba.com/path/user?data=' + json;
    // 结果: 后面会拼接上两个 ?data=object, object

    // 我们可以这样 把json转换为字符串
    let str = 'http://it.kaikeba.com/path/user?data=' + JSON.stringify(json);
    // 结果是 ?data={a:12, b:5}

    // 但是上面还是没办法用 所以我们需要这样
    let str = 'http://it.kaikeba.com/path/user?data=' + encodeURIComponent(JSON.stringify(json));
 -->


> 把字符串变为json

    JSON.parse()
<!-- 
    let str = '{"a":12, "b":5, "c":"abc"}'
    let json = JSON.parse(str);
 -->



> JSON 或者叫 对象的简写
- 名字一样的话可以简写, 当名字和值一样的时候 我们可以只写一个
<!-- 
    let a = 12;
    let b = 5;

    // json的原始写法
    let json = {a:a, b:b}

    // json的简写
    let json = {a, b};
 -->

- 方法可以简写, 省略function
<!-- 
    let json = {
        a:12,
        show: function() {
            alert(this.a);
        }
    }

    // 简写
    let json = {
        a:12,
        show() {
            alert(this.a);
        }
    }
 -->

-------------------------------

### 简化对象写法 (跟上面说的是一个事儿)
- ES6 允许大括号里面, 直接写入变量和函数, 作为对象的属性和方法, 这些书写更加的简洁
<!-- 
    let name = 'sam'
    let change = function(){
        cosnole.log('test');
    };
 -->

> 省略了 : 和 function
<!-- 
const SCHOOL = {                const SCHOOL = {
    name,                           name:name,
    change              =           change:change

    //简化函数写法
    fn:function(){                  fn(){
        console.log('test');            console.log('test');
    }                               }
}
 -->

-------------------------------

### 箭头函数
- ES6 允许使用箭头 => 定义函数
- 如果只有一个参数, ()可以省
- 如果只有一个return, {}可以省
 
<!-- 
    // 声明一个函数, 之前:
    let fn = function(){  };
 -->
> 箭头函数的书写格式:
> let fn = (a, b) => {  }     使用箭头链接形参 和 函数体  省略了function

> 箭头函数的简写:
>   > 省略小括号, 当形参有且只有一个的时候 可以省略
<!--
    let add = (n) => {      
        return n + n;
    }

    简写成:
    
    let add = n => {} 
-->
>   > 省略花括号, 当代码体只有一条语句的时候, 可以省略花括号, 此时return也必须省略, 而且语句的执行结果就是函数的返回值
<!-- 
    let pow = (n)=>{
        return n*n;
    }
    console.log(pow(9));

    简写成:
    
    let pow = n => n * n
 -->
<!-- 
    const arr = [1, 6, 9, 10, 100, 22];
    const result = arr.filter(item => item % 2 === 0)
    console.log(result);

    一个参数可以省略小括号, 里面只有一条语句, 省略花括号和return, 函数体直接就是返回值
 -->


### 箭头函数中的this
> 理解1
- 箭头函数没有自己的作用域, 即箭头函数this 指向其外层作用域(或者理解成和外成的作用域是相同的) 

- 下面的例子中, 如果在setTimeout中输出 this.name 会出现 this丢失(输出空白或者undefined)的情况
- 原因就是 setTimeout中的function有自己的作用域, 它里面的this找不到
- 以前的解决方法就是把外层的this保存 然后里面使用_this
<!-- 
    function People(name, age) {
        this.name = name;
        this.age = age;
        this.say = function() {
            console.log(this.name);
            // 保存this的指向
            let _this = this;      

            setTimeout(function() {
                //function有自己的作用域, 这个作用和上面的say的function是两个不同的作用域

                console.log(_this.name);
                输出是空白 有人说this的指向丢失    
            }, 1000)
        }
    };

    let p1 = new People('sam', 18);
    p1.say();
 -->

- 如果上面使用箭头函数也就可以办到的, 因为箭头函数没有自己的作用域, 和外层的一样
<!-- 
    this.say = function() {
        setTimeout(() => {
            console.log(this.name)  这里是能正常输出的
        })
    }
 -->


> 理解2:
- this是静态的, this始终指向函数声明时所在作用域下的this的值, this是不会变的
- 和上面的一样
<!-- 
    window.name = '我是全局中的name';

    const SCHOOL = {
        name:'我是对象中的name'
    };


    function getName(){
        console.log(this.name)
    };

    let getName2 = () => {
        console.log(this.name)
    };


    //  直接调用
    getName();      //我是全局中的name
    getName2();     //我是全局中的name
    

    --- getName(), 直接调用this指向window
    --- getName2(), 是在全局作用域下声明的 所以指向函数声明时所在的作用域的值
    

    // call方法调用
    getName.call(SCHOOL);   // 我是对象中的name
    getName2.call(SCHOOL);  // 我是全局中的name 
-->

> ↓ 这里的this指向的也是div, 因为它是在 'click' function(){}里声明
<!-- 
    let box = document.getElementById('ad');
    box.addEventListener('click', function(){

        console.log(this);          

        setTimeout(()=>{

            // 这里的this指向的也是div, 因为它是在 'click' function(){}里声明的 所以this指向这个所在的作用域
            console.log(this);  

            this.style.background = 'pink';   
        }, 2000);
    });
 -->

> 不能作为构造实例化对象
<!-- 
    let Person =  (name, age)=>{
        this.name = name;
        this.age = age;
    };

    let me = new Person('xiao', 30);     // 报错
 -->

> 箭头函数里不能使用arguments变量

### ↑ 箭头函数适合与this无关的回调, 定时器, 数组的方法回调, 不适合与this有关的回调, 比如dom元素的事件回调, 对象的方法


> 箭头函数不适合对象方法
{
    name: 'sam',
    getName:function(){
        this.name
    }                       这时候this指向的是 sam
}
{
    name: 'sam',
    getName:()=>{
        this.name
    }                       这时候this指向的是 外层 this, 与我们的意思就有偏差了
}


### 箭头函数的使用场景
- 当我们想把函数作为参数传递到另一个函数里面去的时候 用函数最多的
<!-- 
    setTimeout(function() {}, 100)
    setTimeout(() => {}, 100)
 -->

-------------------------------

### ES6中 函数 形参的初始值
> 具有默认值的参数, 一般位置要靠后
<!-- 
    function add(a, b, c){
        return a+b+c;
    }
    let result = add(1,2,3);
    console.log(result);    //6
-->

- 如果c的值没有传递, 那就是undefined, 那就是1+2+undefined, 那就是NaN的结果
<!-- 
    let result = add(1,2);
    console.log(result);    //NaN
-->

- 我们给函数形参赋初始值, c=10, 这时c的默认值就是10, 如果我们不传递第3个实参会使用默认值
<!-- 
    function add(a, b, c=10){
        return a+b+c;
    }
    let result = add(1,2);
    console.log(result);    //13
 -->

> 与解构赋值结合使用
- 将形参中的变量 和 对象中的属性名 起一样的, 这样就可以使用对象中的对应属性值
<!-- 
    function connect(obj){
        // 每次这么写 都要写obj 有重复的部分
        let host = obj.host;
        let username = obj.username;
        let password = obj.password;
        let port = obj.port;
    }

    //我们可以这么写, 跟解构赋值配合使用
    function connect(host, username, password, port){
        console.log(host, username, password, port);
    }

    // 调用的时候
    connect({
        host:'localhost',
        username:'root',
        password:'root',
        port:3306
    });
 -->

-------------------------------

### rest参数  ...args 这个参数放在最后
- 用于获取函数的实参, 用来代替arguments
<!-- arguments可以获取函数在调用时的所有实参 -->

- 语法:
- ...变量名

- ...args是一个数组, 是数组的话就可以使用一切API的方法
- 比如: filter, some, every, map

> ES5:
<!-- 
    function date(){

        // arguments是一个对象
        console.log(arguments);     
    };
    date(1,2,3);        
 -->

> ES6:
- 使用rest参数时, 必须在形参中传递 ...args 变量
<!-- 
    function date(...args){

        // args是一个数组, 是数组的话就可以使用一切API的方法
        // filter, some, every, map
        console.log(args);          
    };
    date(1,2,3);       
 -->

- rest参数必须放在参数的最后
<!-- 
    function fn(a,b, ...args){
        console.log(a);
        console.log(b);
        console.log(...args);
    }
    fn(1,2,3,4,5,6);
 -->

> 剩余参数 必须是最后一个参数
- 比如 有些时候函数里的形参定义了a b两个 但是我不知道会传递几个实参进来, 就可以这么写
- 收集剩余的参数, 前有有几个你就用几个 剩下的都装我这里
<!-- 
    function test(a, b, ...args) {

    }
    fn(1,2,3,4,5,6);
 -->

-------------------------------

### 函数的尾调用
- 某个函数的最后一步是调用另一个函数 就叫做函数的尾调用
- function f(x) { return g(x) }

- 尾调用：
- 之所以与其他调用不同 就在于它的特殊的调用位置
- 函数调用会在内存形成一个 调用记录 又叫做调用帧 保存调用位置和内部变量等信息
- 如果在函数A的内部调用函数B 那么A的调用帧上方 还会形成一个B的调用帧 等到B运行结束 将结果返回到A
- B的调用帧才会消失，如果函数B的内部还调用函数C 那么就还又一个C的调用帧，以此类推 所有的调用帧 就形成一个 调用栈

- 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧 取代外层函数的调用帧就可以了

<!--
  function f() {
    let m = 1;
    let n = 2;
    return g(m + n);
  }
  f();
  
  // 等同于
  function f() {
    return g(3);
  }
  f();
  
  // 等同于
  g(3);
-->

-------------------------------

### 数组

### 扩展运算符 ...
- 展开数组
- 相当于把数组里面的元素拿出来直接放那(去掉[])
<!-- 
    let arr = [1,2,3];
    ...arr;

    1,2,3 相当于把数组里的东西掏出来往这一放

    function show(a,b,c) {
        alert(a)
        alert(b)
        alert(c)
    }
    show(...arr)
 -->

- ... 扩展运算符能将 数组 转换为 逗号分隔的 参数序列
> let arr = [];   fn(...arr);
<!-- 
    const tfboys = ['易烊千玺', '王俊凯'];    ... 将这个数组转换为了一个参数序列

    function chunwan() {
        console.log(arguments);
    }
    // 这样打印出来 有1个 arguments里只有一个参数 是一个数组
    chunwan(tfboys);     
    // 这样打印出来 有3个    
    chunwan(...tfboys);    =>  相当于  chunwan('易烊千玺', '王俊凯')
 -->

> 还能展开字符串


> 扩展运算符还可以配合表达式
- 使用圆括号将表达式包裹起来 ...()
<!--
    const arr = [
        ...(x > 0 ? ['a'] : []),
        'b',
    ]
-->


> 注意：
- 1 只有函数调用时才可以把 扩展运算符放在圆括号中


> 应用：

> 复制数组：
- 在es5中 我们是通过这种方式 克隆数组
- const a1 = [1, 2];
  const a2 = a1.concat();

- es6中
- const a1 = [1, 2];
  const a2 = [...a1];


> 合并数组：
- [...arr1, ...arr2, ...arr3]


> 将字符串转为数组
- [...'hello']

> 将伪数组转为真正的数组
- let nodeList = document.querySelectorAll('div');
  let array = [...nodeList];


> 数组中新增的方法

> Array.from()
- 1 将类数组对象
- 2 将可遍历的对象 包括set map
- 3 将字符串转换为真正的数组
- 
- 把以上的形式转为真正的数组
- 如果参数是一个真正的数组 则会返回一个一模一样的新数组


<!--
    类数组对象的定义：
        1 对象内部的属性名为 索引值
        2 对象内部有length属性

    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    
    // es5中将伪数组转换为真的数组
    let arr = [].slice.call(arrayLike)
-->

- Array.from(伪数组, callback)
- callback的用法和其他数组的回调一样 用来对每个元素进行处理，将处理后的值放入返回的数组里面
- Array.from(arrayLike, x => x * x);
  // 等同于
  Array.from(arrayLike).map(x => x * x);



> Array.of()
- 将一组值 转换为数组
- Array.of(3, 11, 8)


> 数组.copyWithin(target, [start], [end])
- 它会改变当前数组
- 它会将指定位置的元素复制到其他位置(会覆盖原有成员) 然后返回当前数组
<!--
    let arr = [0, 1, 2, 3, 4, 5]
    arr.copyWithin(0, 1, 3)
    console.log(arr)


    要点：
    数组的长度不会变 
    start是开始的位置 包括开始
    end是结束的位置 不包括结束
    target 它会提取start-end的数据放到0的位置 会覆盖
-->


> 数组.find()
> 数组.findIndex()
- 用于找出第一个符合条件的数组成员 参数是 callback
- 所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，
- 然后返回该成员。如果没有符合条件的成员，则返回undefined。

- 根据回调中的return true 来找到该成员 找不到就是undefind
- 它找到的是 真的元素
- 找不到的是 undefined

- 他们还可以指定第二个参数 this


> 数组.fill(给定值, [start], [end])
- 使用给定值，填充一个数组。
- fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。


> 数组.entries()
> 数组.keys()
> 数组.values()
- 该方法用于遍历数组，它们都返回一个遍历器对象 可以用 for...of循环来进行遍历
- keys()是对键名的遍历
- values()是对键值的遍历
- entries()是对键值对的遍历

<!--
    let arr = ["name", "gender", "address"]
    let res = arr.entries()
    for(let i of res) {
        console.log(i)
    }

    首先 res 是一个遍历器对话 输出它的话看不到任何结果 它需要使用 for...of 来遍历
    keys 我们遍历的结果会是 0 1 2
    values 我们遍历的结果会是 name gender address
    entries 我们遍历的结果会是 [0, 'name']
-->

- 如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
<!--
    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next().value);    // [0, 'a']
    console.log(entries.next().value);    // [1, 'b']
    console.log(entries.next().value);    // [2, 'c']
-->


> 数组.includes()
- 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。
<!--
    没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。
    indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。
    if (arr.indexOf(el) !== -1) {
      // ...
    }
-->

> 注意：
<!--
    另外，Map 和 Set 数据结构有一个has方法，需要注意与includes区分。
    Map 结构的has方法，是用来查找键名的，
    比如Map.prototype.has(key)、WeakMap.prototype.has(key)

    Set 结构的has方法，是用来查找值的，
    比如Set.prototype.has(value)、WeakSet.prototype.has(value)。
-->


> 数组.flat(num)
> 数组.flatMap()
- 转化为1维数组
- 它返回的是一个新数组 对原数组没有影响
- flat()方法默认拉平一层数组，如果想拉平两层传入参数2
- 不管多少层都转换为一维数组 可以传入 Infinity
- 如果原数组有空位，flat()方法会跳过空位。
<!--
    let arr = [1,2,3,4,[6,7,8]]
    let res = arr.flat()
    console.log(res)
-->

- flatMap()只能展开一层数组。
- 它需要传入一个回调函数 相当于内部执行了 map() 方法


> 注意：
- ES5中对于数组的空位
- 空位数组： [, , ,]
- 空位不是undefined，一个空位的值是undefined
- ES5中对空位的处理已经很不一致了 大多数情况下会忽略空位 或者跳过空位
<!--
    forEach(), filter(), reduce(), every() 和some()都会跳过空位。
    map()会跳过空位，但会保留这个值
    join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
-->

- ES6中明确将空位转为undefined 也就是说 es6的语法不会忽略空位
<!--
    Array.from(['a',,'b'])
    // [ "a", undefined, "b" ]
-->

-------------------------------

### 对象

> 对象的方法
> 
> Object.keys(目标对象)
- 将目标对象中的key遍历取出放到一个数组中 需要用变量接收

> Object.values()
- 将目标对象中的value遍历取出放到一个数组中 需要用变量接收

> Object.entries()
- 将目标对象中的 kv组合 放到一个数组中 最终是一个二维数组
- [["name", "sam"], ["age", "18"]]


> Object.fromEntries()
- 该方法是 Object.entries() 逆操作 用于将一个键值对数组转为对象
- Object.fromEntries([
      ['foo', 'bar'],
      ['baz', 42]
  ])
  // { foo: "bar", baz: 42 }
- 该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。


> Object.getOwnPropertyDescriptor(目标对象, "属性名")
- 展示给定对象 给定属性的状态
<!--
    {
       value: 123,
       writable: true,
       enumerable: true,        可枚举性
       configurable: true
    }
-->


> Object.is()
- 用来判断 a b 两个值是否一致
- Object.is(+0, -0)


> Object.assign(target, 要复制的对象)
- 该方法用于对象的合并 将源对象的所有可枚举属性 复制到目标对象中
- 参数：
- 参数1: 目标对象
- 参数2: 2及其以后都是要复制的对象 或者 叫做源对象

- 注意：
- 如果目标对象与源对象有同名属性 或多个源对象有同名属性 则后面的属性会覆盖前面的属性
- 如果只有一个参数 会直接返回该参数
- 如果该参数不是对象 则会先转成对象 然后返回 undefined 和 null违法转成对象

- assign()方法 他是浅拷贝 而不是深拷贝 也就是说 如果源对象的某个属性值是对象 那么目标对象拷贝得到的是这个对象的引用
- assign()方法 他可以用来处理数组，

- 应用技巧：
- 为对象添加属性：
- Object.assign(this, {x, y});

- 为对象添加方法：
- Object.assign(SomeClass.prototype, {
      someMethod(arg1, arg2) {
         ···
      },
      anotherMethod() {
         ···
      }
  });

- 克隆对象
- function clone(origin) {
      return Object.assign({}, origin);
  }
- 如果对象是一层 那就是 全新的对象 通过新对象修改属性也不会影响到原对象的值
- 如果对象是深层 那引用的就是地址值 修改新对象的同时 原对象的属性也会跟着变化

------------------------------

### ES6 中的Set
- es6提供了新的数据结果set(集合), 它的类型是object但类似于数组, 但成员的值都是唯一的(有去重的效果)
- 集合实现了iterator接口, 所以可以使用[扩展运算符] 和 for...of进行遍历

> 集合的属性和方法
- 1. size   返回集合的个数
- 2. add    增加一个新元素 返回当前集合
- 3. delete 删除元素, 返回boolean值
- 4. has    检查集合中是否包含某个元素, 返回boolean值

> 创建一个集合
- 和数学中的集合很像
- 通过new Set()来创建一个集合, 它的类型是 object
    let s = new Set()

> Set的初始化
- 我们可以传递一个数组(可迭代数据)
    let s2 = new Set([1,2,3,4,5])
    console.log(s2)         // Set(5) {1, 2, 3, 4, 5}

- 集合中的元素都是唯一的, 所以有去重的效果
    let s2 = new Set([1,1,2,2,3,3,4,5])
    console.log(s2)         // Set(5) {1, 2, 3, 4, 5}

> Set的个数    .size
- 我们使用size属性, 来获得元素的个数
- 数组叫length
    console.log(s2.size);   //5

> 添加元素    .add()
    s2.add(10);

> 删除元素    .delete()
    s2.delete(10)

> 检查是否有元素    .has()
- 会返回一个布尔值 true false
    s2.has(10)

> 清空    .clear()
    s2.clear()

> 遍历集合
- 我们可以使用for ... of 遍历
    for(let item of s2) {
        console.log(item);
    }


### 练习
- 1. 数组的去重
- 思路
- 我们利用集合的元素的唯一性, 根据arr创建一个集合
- 集合可以使用... 我们把集合展开放到数组里面
<!--    
    let arr = [1, 1, 2, 2, 3, 3, 4, 5]
    let s = new Set(arr)
    arr = [...s]
    console.log(arr);
 -->


- 2. 交集
- 跟数学中的交集是一样的
- 思路:
- 这里我们找去重后的相同元素
- 1. 我们利用 集合 把arr的元素进行去重, 然后利用filter方法 保留相同元素
- 2. 在filter方法中我们判断 arr中的元素在不在arr2中, 我们利用了集合的方式同时去重
- 3. 使用.has()方法
<!-- 
    let arr = [1, 1, 2, 2, 3, 3, 4, 5]
    let arr2 = [1, 2, 2,4, 4, 5, 4, 7]

    let newArr = [...new Set(arr)].filter(item => {
        // 在这里我们判断下, arr中的元素 在不在arr2 中 方法很多 这里我们还是利用 集合的方式, 我把arr2 也变成集合
        let s2 = new Set(arr2);

        // 我们判断下 arr的元素在不在arr2中, 或者arr2中的元素有没有arr的
        if(s2.has(item)) {

            // 如果有说明该元素既在arr中也在arr2中
            return true
        } else {
            return false
        }
    })

    console.log(newArr)         (4) [1, 2, 4, 5]
-->

- 3. 并集(合并一起的意思)
- 思路:
- 1. 我们利用... 将两个数组合并在一起, 但是有重复的元素
- 2. 我们利用set的特性进行数组去重
- 3. 将去重后的set利用...展开 放到数组里
<!-- 
    let arr = [1, 1, 2, 2, 3, 3, 4, 5]
    let arr2 = [1, 2, 2,4, 4, 5, 4, 7]

    let result = [...new Set([...arr, ...arr2])]
    console.log(result)
 -->

- 4. 差集
- 找两个集合做对比, 找没有的部分, 比如集合1(123) 集合2(345) 集合1为主做差集 结果就是1 2
- 就是上面交集的取反
<!-- 
    let newArr = [...new Set(arr)].filter(item => {
        let s2 = new Set(arr2);
        
        // 在这里取反
        if(!s2.has(item)) {
            return true
        } else {
            return false
        }
    })
 -->

-------------------------------

### ES6中的 Map
- es6中提供了map数据结构, 类似于对象, 也是键值对的集合
- 但是 '键' 的范围不限于字符串, 各种类型的值(包括对象) 都可以当做 键

- 存在map中的元素都是以 key : value 形式存在的

- Map也实现了iterator接口, 所以可以使用 [扩展运算符] 和 [for...of] 进行遍历

- Map就是一个升级版的对象

> Map的属性和方法
- 1. size:  返回Map的元素个数
- 2. set:   增加一个新元素, 返回当前Map
- 3. get:   返回键名对象的键值
- 4. has:   检查Map中是否包含某个元素, 返回boolean值
- 5. clear: 清空集合, 返回undefined

> 创建方式1
let m = new Map()

>> 添加元素 .set()
- m.set('键', '键值')
- m.set('name', 'sam');
<!-- 
    Map(1) {"name" => "sam"}
    key:    "name"
    value:  "sam"
 -->

- 添加函数 函数名 和 函数表达式
    m.set('change', function() {
      console.log('我们可以改变你')
    })

- 添加 key 为对象, 值为数组
    let key = {
      school: 'aiguigu'
    }
    m.set(key, ['北京', '上海'])


>> 删除元素 .delete()
- m.delete('key')
- m.delete('name')


>> 获取元素 .get()
- m.get('key')
- m.get('name');


>> 清空元素 .clear()
- m.clear();


>> 遍历元素
- 遍历出来的每一个元素在一个数组里面
    for(let item of m) {
      console.log(item)
    }

<!-- 
    (2) ["name", "sam"]
    (2) ["change", ƒ]
    (2) [{…}, Array(2)]
 -->


> 创建Map的方式2
- let m = new Map([['name', 'sam'], ['age', '18']]);

-------------------------------

### 扩展运算符的应用
> 数组的合并    const arr = [...arr1, ...arr2]
- 其实就是把单个数组转为 参数的序列 并排放一个数组里
<!-- 
    const kuaizi = ['王太利', '小杨'];
    const fenghuang = ['曾毅', '领花'];
    
    // 以前链接两个数组的话, 可以这么做  
    const zuixuanxiaopingguo = kuaizi.concat(fenghuang);

    // 使用扩展运算符 
    const zuixuanxiaopingguo = [...kuaizi, ...fenghuang];
    console.log(zuixuanxiaopingguo);
 -->

> 数组的克隆    let arr = [...arr1]
<!-- 
    const sanzhihua = ['E', 'G', 'M'];
    // 我想复制上面的数组
    const sanyecao =  [...sanzhihua];
    console.log(sanyecao);   //['E', 'G', 'M']
 -->

> 将伪数组 转为 真正的数组
<!-- 
    const divs = document.querySelectorAll('div');
    console.log(divs);       //NodeList(3) [div, div, div]   Object
    // 把上面的对象集合divs 转换为一个数组

    const divArr = [...divs];
    console.log(divArr);      // (3) [div, div, div]     Array
 -->

> 合并对象
- ...对象的形式 拆解出来的是键值对
- 如果有重复的属性, 后面的会覆盖掉前面的

- 不能单独使用...obj, 好像只能合并的时候使用
<!-- 
    let obj1 = {
        name:'sam',
        age:1
    };

    let obj2 = {
        email:'163@com'
    }

    let obj3 = {...obj1, ...obj2}
    console.log(obj3)
 -->

> 

-------------------------------

### Symbol数据类型 (这是一个动态值, 并不是一个固定的属性)
- ES6中引入了一种新的原始数据类型 Symbol, 表示独一无二的值
- 它是js语言的第七种数据类型, 一种类似于字符串的数据类型

> 那symbol到底是什么东西：
- 比如我们把皇帝比喻成一个对象 对象中有很多的属性 相当于 皇帝有很多的皇子和公主
- 其中皇帝有一个私生子就是symbol，而这个私生子不能让任何人知道，它就用symbol来表示

- 这个私生子只有皇帝知道外人用一般方法是查询不到的(for...in)

- 但是这个私生子很悲惨不能像其他的皇子和公主一样继承皇帝的财产 因为没有继承能力 因此我们不能new Symbol

- 有了symbol以后皇帝想要多少个私生子就要多少个私生子 每一个私生子之间都有唯一的symbol来进行标识

- 但是随着皇帝的私生子越来越多 有些私生子是同一个母亲生的 为了弄清这些私生子是同一个母亲生的 于是就在symbol的基础上使用了symbol.for()来进行表示

- symbol类型需要注意的核心点就在这个例子里面了
<!-- 
    // 比如 一个皇帝有 公主们和皇子们 我们可以这么表达
    let emperor = {
      prince: ["prince1", "prince2", "prince3"],
      princess: ["princess1", "princess2", "princess3"]

      当我们还想用 prince 来表达私生子的时候 就会出现 私生子会覆盖掉上面的 皇子数组
      prince: "bastard"
    }

    这个时候就需要用symbol了 我们在外面定义 symbol 然后将这个属性添加给皇帝
    symbol接收一个字符串做为参数 这个参数是一段描述是为了方便代码的阅读和后期的调试用的 如果不加描述的话 symbol() symbol() symbol()
    就会出现这种情况
    const prince = Symbol("bastard")
    emperor[prince] = "bastard"
 -->

- 上面说了很多方法都查询不到symbol的属性，那么怎么才能查询到呢？
> Object.getOwnPropertySymbols(对象)
- 这个方法返回目标对象中的所有 symbol 属性 它是一个symbol数组
<!-- 
    console.log(Object.getOwnPropertySymbols(emperor))
 -->


> Symbol.for("描述")
- 指明该symbol指向谁 是谁生的私生子
- 这个方法创建一个可共享的symbol 如果已存在共享的symbol 就会直接返回已有的symbol
<!-- 
    给这个属性名 设置为symbol 并设置归类
    const bastar1 = Symbol.for("如花")

    将这个symbol属性添加给皇帝 并赋值
    emperor[bastard1] = "如花的儿子"
 -->



> 特点:
- 1 : Symbol的值是唯一的, 用来解决命名冲突的问题
- 2 : Symbol的值不能与其他数据进行运算
- 3 : Symbol定义的对象属性不能使用for...in 循环遍历, 但是可以使用Reflect.ownKeys来获取对象的所有键名
> Reflect.ownKeys(objName);  遍历出来的是属性名 



> Symbol的创建
> 通过 Symbol();
- 通过函数来创建Symbol(通过函数调用来返回一个Symbol的值)
- 创建的值的唯一性是不可见的, 内部实现了唯一性
- 这里相当于我们创建了一个永远不会重复的字符串
<!-- 
    let s = Symbol();
 -->


> Symbol('描述字符串')
- 这个字符串为描述字符串, 通过这个描述字符串更好的理解这个值的作用, 作用跟注释差不多
- 用来区分我们创建的symbol字符串的，要不全是Symbol() Symbol()
<!-- 
    let s2 = Symbol('尚硅谷'); 
    console.log(s2, typeof s2);

    let s3 = Symbol('尚硅谷'); 
    console.log(s2 === s3);         //false

    // 这个描述字符串只是一个标识, 两个尚硅谷的编号是不一样的
 -->


> Symbol.for()
- 通过这个方法来创建Symbol
- 通过这种方式创建的Symbol可以通过描述字符串 得出唯一的Symbol值的
- 使用这种方式创建的symbol 系统会在内存中记录有一个这个描述的symbol 相当于在全局当中进行了保存
- 当我们再使用该方式定义symbol的时候 其实其他的symbol都是在引用第一个创建的s4
<!-- 
    let s4 = Symbol.for('尚硅谷'); 
    let s5 = Symbol.for('尚硅谷'); 

    console.log(s4 === s5);     //true
 -->

> Symbol.keyFor(symbol对象)
- 获取使用 Symbol.for() 创建的 symbol 对象的描述
<!-- 
    let cms = Symbol.for("hdcms")
    console.log(Symbol.keyFor(cms))     // hdcms
 -->


> symbol对象.description
- 输出该 symbol对象 的描述
<!-- 
    let s2 = Symbol('尚硅谷'); 
    console.log(s2.description);    // 尚硅谷
 -->


> symbol的简单应用
<!-- 
    // 当我们使用同一个属性名的时候 最终打印 对象中的属性 后面的会将前面的覆盖掉
    let user1 = "李四"
    let user2 = "李四"
    let grade = {
      [user1]: { js: 100, css: 89 },
      [user2]: { js: 35, css: 55 },
    }
    console.log(grade)  // {李四: {…}}


    // 解决方式
    let user1 = {
      name: "李四",
      key: Symbol()
    }
    let user2 = {
      name: "李四",
      key: Symbol()
    }
    let grade = {
      [user1.key]: { js: 100, css: 89 },
      [user2.key]: { js: 35, css: 55 },
    }
    console.log(grade)  
    // Symbol(): {js: 100, css: 89} Symbol(): {js: 35, css: 55}
    console.log(grade[user1.key])
 -->


> symbol在缓存容器中的应用



> Symbol不能与其他的数据进行运算
> 对以往的数据类型总结  USONB  you are so niubility
- u = undefined
- s = string symbol
- o = object
- n = null number
- b = boolean

-------------------------------

### Symbol的使用场景
- Symbol的使用场景就是给对象添加属性 和 方法, 表示独一无二的

- 现在有一个现有的对象 game, 我们要往这个对象中去扩展方法up down, 如果直接添加:
- 会很危险, 因为你并不知道会不会覆盖掉game中原有方法 这是用Symbol()就能解决

> 添加方式一:
<!-- 
    let game = {...};

    // 先创建一个对象, 并赋予属性唯一值
    let methods = {
        up:Symbol(),
        down:Symbol()
    }

    //接下来给game扩展方法
    game[methods.up] = function(){};
    game[methods.down] = function(){};

    // 调用
    game[methods.up]();
 -->

> 添加方式二:
- 使用 [], 在[Symbol('描述字符串')], 描述字符串用来给开发者看方法名的, 没有实际作用吧

- 调用:
- 调用时, 要先遍历出对象中的属性名, Reflect.ownKeys()方法, 遍历出属性名 + ()
<!-- 
    let youxi = {
        name:'狼人杀',

        // 在这个对象中添加一个独一无二的方法
        [Symbol('say')]: function(){
            console.log('我可以发言');
        },
        [Symbol('zibao')]: function(){
            console.log('我可以自爆');
        }
    }

    // 这种方式添加的方法, 先使用 Reflect.ownKeys(youxi) 遍历对象的属性名
    const langrensha = Reflect.ownKeys(youxi);
    console.log(langrensha);
    console.log(langrensha[0]);     //name 属性名
    youxi[langrensha[1]]();
 -->

-------------------------------

### Symbol内置值 Symbol的属性(扩展对象功能)
- 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。可以称这些方法为魔术方法，因为它们会在特定的场景下自动执行

- 下面的都是Symbol的属性, 而Symbol.xxx 又作为了对象的属性
- 比如Symbol.hasInstance, hasInstance是Symbol的属性, 而Symbol.hasInstance这个整体又会作为对象的属性
- eg: 对象[Symbol.hasInstance]  又会作为对象的属性 对对象进行设置

- 通过对它们的设置, 我们可以改变对象在特定场景下表现的结果, 扩展对象功能

> Symbol.hasInstance    
- 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法
<!-- 
    let o = {};
    class Person {

        static [Symbol.hasInstance](){
            // 自动打印出来的这句话 这个方法跟普通方法不一样,有自己的自动执行场景,在特定的时机执行
            console.log('我被来用检查类型了')
        };
    };
    console.log(o instanceof Person);
    // 结果:我被来用检查类型了  false

    --- 

    // 我们现在要检查o的类型, 看看它是不是person的实例, 我们自己决定是还是不是
    let o = {};

    class Person {

        // 我们先传递一个param参数,  -- param这个参数 是这个函数的结果可以由你来决定 你说什么就是什么
        static [Symbol.hasInstance](param){
            console.log(param);
            console.log('我被来用检查类型了')

            // 如果我内部返回的是一个true, 那o instanceof Person的结果就是true
            return true;
        };
    };
    console.log(o instanceof Person);   // true
 -->

> Symbol.isConcatSpreadable
- 对象的 Symbol.isConcatSpreadable 属性等于的是一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开
- true  可以展开
- false 不可以展开

- 数组展开的意思是, 是作为一个整体来进行数组的合并, 还是分元素合并

- 当我们用arr.concat()方法对数组进行合并的时候, 通过对这个Symbol.isConcatSpreadable属性的设置, 我们决定这个值是否可以展开
<!-- 
    let arr = [1,2,3];
    let arr2 = [4,5,6];

    // 我们现在做数组合并
    console.log(arr.concat(arr2));  //(6) [1, 2, 3, 4, 5, 6]

    // 接下来我们设置一下arr2
    arr[Symbol.isConcatSpreadable] = false;
    console.log(arr.concat(arr2));  // [Array(3), 4, 5, 6]
 -->

> Symbol.species
- 创建衍生对象时，会使用该属性

> Symbol.match
- 当执行 str.match(myObject) 时，如果该属性存在，会调用它，返回该方法的返回值

> Symbol.replace
- 当该对象被 str.replace(myObject)方法调用时，会返回该方法的返回值

> Symbol.search
- 当该对象被 str.search (myObject)方法调用时，会返回该方法的返回值

> Symbol.split
- 当该对象被 str.split(myObject)方法调用时，会返回该方法的返回值。

> Symbol.iterator
- 对象进行 for...of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器

> Symbol.toPrimitive
- 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

> Symbol.toStringTag
- 在该对象上面调用 toString 方法时，返回该方法的返回值

> Symbol.unscopables
- 该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除。

> 这些属性, 都是控制对象在特定场景下的一个表现

-------------------------------

### 迭代器  
- 遍历器（Iterator）就是一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。

- ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费
    - 只要这个数据结构部署了 iterator接口, 就可以使用for...of来遍历这个数据

- iterator接口就是对象里的一个属性, 属性的名字叫Symbol.iterator

- 原生具备 iterator 接口的数据(可用 for of 遍历)
- a) Array
- b) Arguments
- c) Set
- d) Map
- e) String
- f) TypedArray
- g) NodeList

### 可以遍历的原理
- a) 创建一个指针对象，指向当前数据结构的起始位置
- b) 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员
- c) 接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员
- d) 每调用 next 方法返回一个包含 value 和 done 属性的对象

<!-- 
    原理: 先创建了一个指针对象, 通过调用对象的next方法, 不断的指向下一个元素

    const xiyou = ['唐僧', '孙悟空', '猪八戒'];

    - 创建一个指针对象，指向当前数据结构的起始位置
    - 获取指针对象:
    let iterator = xiyou[Symbol.iterator]();
    console.log(iterator);
            // 结果: Array Iterator {},   __proto__: Array Iterator  next: ƒ next()

    - 创建完的指针对象里有next(), 指针自动指向数据结构的第一个成员
    console.log(iterator.next());   
            // 结果: {value: "唐僧", done: false} 

    - 接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员
    console.log(iterator.next());   // {value: "唐僧", done: false} 
    console.log(iterator.next());   // {value: "孙悟空", done: false} 
    console.log(iterator.next());   // {value: "猪八戒", done: false} 
    console.log(iterator.next());   // {value: undefined, done: true}

    - done代表完成时  true代表循环完成 false代表循环未完成
 -->

-------------------------------

### 迭代器的应用
- 迭代器用来自定义遍历数据, 按照我们自己的意愿遍历数据

<!-- 

/* 
迭代器用来自定义遍历数据, 按照我们自己的意愿遍历数据
需求:
    遍历下面的对象, 每次返回的结果是数组里的成员
*/

const banji = {
    name:'终极一班',
    stus:[
        'xiaoming',
        'xiaoning',
        'xiaotian',
        'xiaohong'
    ],

/* 
    添加iterator接口, 并在内部自定义遍历内容
*/
    [Symbol.iterator](){
        // 3 声明一个索引变量, 让它不断指向下一个成员
        let index = 0;
        // 创建保存外层this的变量
        let _this = this;

        // 1 创建一个指针对象
        return {
            // 2 创建一个next();
            next:function(){
                // 根据下标返回结果, 在这里定下来 需要遍历哪个对象
                if(index < _this.stus.length){   //如果小于stus.length代表遍历没有结束

            // 每次调用next方法返回的是一个包含value 和 done属性的对象
            const result = {value:_this.stus[index], done:false}

            /* 
            this的问题, 我们的this是在next:function(){} 里的 所以我们要在外部创建一个变量用来保存外部的this
            */

            // 4 下标自增, 不自增永远为0
            index++;

            // 5 返回结果
            return result;
            }else{
                //遍历完成
                return {value:undefined, done:true};
            }
            }
        };
    }
}

        
    for(let n of banji){
        console.log(n);     
        //TypeError: banji is not iterable banji这个变量不能迭代(遍历), 因为没有iterator接口
        // 那我们就在上面的班级里(要遍历的对象里添加接口)
    }

 -->

-------------------------------

### Generator - 生成器
- 简单的说就是靠这个东西生成一堆, 它是一个相对特殊一些的函数
- 写法 函数名 和 function中间有 *
- 它也是用来解决异步操作的问题的

- 普通函数的特点
- 一条路走到黑, 开始了就不会停 直到函数结束 才算完事
<!-- 
    把普通函数理解成飞机, 中间不能停接朋友?疯了把
 -->

- Generator函数
- 它中间能停
<!-- 
    把Generator函数理解成出租车, 想停哪停哪
 -->

- 它最大的特点就是可以交出函数的执行权(即暂停执行)
- yield可以定义不同的状态 方便根据不同的情况注入数据，
<!-- 
    状态其实就是数据 内部的状态就是函数内部的值 它在不同的时候 是不一样的
 -->

- 本质上：
- 整个generator函数就是一个封装的异步任务 或者是异步任务的容器


- yield命令是异步阶段的分界线 所以说有时候也把yield当成是return 当然 yield跟return有本质的不同


> Generator的特点
- 书写方式不同
<!-- 
    function * fn() { ... }
 -->

- 它可以分部执行, 需要和 yield 配合使用
<!--    
    yield翻译过来就是放弃的意思, 在执行的代码的时候碰到yield会暂停执行
    简单的理解为暂时放弃执行, 暂时把控制权交出去, 过一会需要重新执行的时候, 再把控制权还给我
 -->

- 函数调用和普通函数不同
<!-- 普通函数调用一次会直接执行, 并且执行内部的全部代码 -->

- 生成器函数 需要接收调用函数后的返回值
<!-- 
    let genObj = fn()
 -->

- 生成器函数需要和next方法搭配使用, next()方法简单理解为 踹一脚走一步
<!-- 
    genObj.next();
    碰到yield后会暂停执行, 再次调用next()方法, 如果后面没有yield才会执行全部代码
 -->


> 那为什么需要让函数停呢?
- 比如说请求数据, 请求数据并不是瞬间能回来的 不管是什么方式ajax也好vue也好 他们都是需要一个时间的过程 是一个异步操作

- 这个时候我们就可以用暂停等数据过来
<!-- 
    正常函数是这样的

    function 函数() {
        代码...

        // 中间要读数据了
        ajax(xxx, function(){
            代码... 因为请求的数据文件可能很多会出现回调地狱的问题
        }, function(){})
    }


    如果是生成器函数的话
    function 函数() {
        代码...

        // 中间要读数据了, 我先yield让它暂停着, 并在这里配上获取数据的相关操作比如ajax
        yield ajax(xxx); 
        
        代码...
    }
 -->

> 生成器函数和普通的函数并没有太大的区别, 也是能取名字能传递参数, 它最大的特点就是能走走停停, 如果普通函数涉及到异步的操作我们只能用回调的方式


> 它是怎么做到走走停停的?
- 它其实是用一个生成器函数生成了一堆的小函数 它相当把一个大函数切分成两个小函数
<!-- 
    function * show() {
        alert("a");

        yield;

        alert("b");
    }

    它可以理解为生成了两个函数
    function show1() {
        alert("a");
    }
    function show2() {
        alert("b");
    }

    // 第一次next()的时候走的是show1
    // 第二次next()的时候走的是show2
 -->

> 简单的解析一下
- 普通函数开始运行后一条路走到黑

    function show() {
        alert("a");
        alert("b");
        alert("c");
    }
    show();
<!-- 
    现在我的需求是 a 运行完后不要走等一下 停一会再出现b
    function * show 这种书写方式就是生成器函数
    
    它需要和yield搭配使用, 我在哪停的告诉我吧(yield告诉我在哪停)
    yield英语意思可以叫放弃, 简单的理解为暂时放弃执行, 暂时把控制权交出去
    过一会需要重新执行的时候, 再把控制权还给我
 -->

    function * show() {
        alert("a");

        yield;

        alert("b");
        alert("c");
    }

<!-- 
    生成器函数还有一个不同的地方就是在函数调用, show()不会直接运行函数内部的代码
    相反它会创建一个生成器的实例对象(创建了一个生成器对象)
    有了这个对象来能接着执行
 -->
        
       
    let genObj = show();
    console.log(genObj);        // show {<suspended>}
<!--
    genObj对象里面有一个特别重要的方法 next: ƒ next()
    在genObj.__proto__.__proto__里面

    next();的含义就是踹一脚走一步
-->
    genObj.next();  // 踹了一脚 打印了一个a 它是执行了之后碰见yield 放弃了执行
    genObj.next();  // 又踹了一脚到b了 



> yield
- yield既可以传递参数 又可以返回


> yield传参
- 给yield传参需要在next()方法中传递, yiled需要创建变量来接受传递的参数
- 对于传参来说, 通过yield来传参的时候, 第一个next里面的参数是废的

    function * show() {
        console.log(1);

        let a = yield;  // 用这种方式接收参数

        console.log(2);
        console.log(a)
    }

    let fn = show()
    fn.next(12);        // 结果是console.log(1)的部分
<!-- 
    第一个next执行的是函数开始 到 第一个yield
    对于传参来说:
        通过yield来传参的时候, 第一个next里面的参数是废的
        fn.next(12);    是没办法给yield传参的
 -->

    fn.next(5);         // 结果是2, 5(接收到了5的参数)  
<!-- 
    第二个next执行的是let a 到 console.log(a) 之间的代码 
    所以第二个next传递的参数5 是a接收到的
        // next() 里面传递的参数就会来到yield的上, 要是接受参数的话 let a = yield
 -->

> 对上面的代码的解析
<!-- 
    上面的代码可以理解为被yield分为两个过程, 第一部分受第一个yield来支配, 第二部分受第二个next来支配

    第一个next执行的部分是 console.log(1) ~ 等于右边的yield
    第二个next执行的部分是 let a ~ 最后

    所以第二个next(5), 这个5的参数会传递给 a let a 接到的是 5

    总结:
    对于传参来说:
    通过yield来传参的时候, 第一个next里面的参数是废的
    fn.next(12);    是没办法给yield传参的
 -->


> yield的返回
- yield对于整个函数来说, 可以理解为 yield属于中间结果, 返回一个中间结果

买回来的菜(函数参数)

        ↓

       洗菜             切菜            炒菜           (整个功能分3个环节)

        ↓           ↗       ↘       ↗   ↘

     干净的菜    →             切好的菜     炒好的菜    (中间结果)

<!-- 
    比如我们把做菜 分为3个环节, 洗菜 切菜 炒菜
    那每一步会有一个中间结果, 最开始我输入的是菜市场买回来的菜, 相当于函数的参数(相当于 function fn(num1, num2) {   })

    每一步会有中间的结果, 比如洗菜后的中间结果就是 刚买回来的菜变成了干净的菜

    前一步的结果成为了下一步的输入, 切菜的话得拿干净的切不能拿脏的切

    切菜的环节也会产生中间结果 切好的菜 这个切好的菜又作为中间结果输入下一个环节

    而炒菜又会产生一个结果 这个就是最终的结果

    每一步都会有一个中间的结果

    而每一步的中间结果就相当于 yield

    最初的参数就是正常函数传递的参数, 最后的结果会对应一个return

 -->
 

> yield的书写格式

    let 变量 = yield;

- 上述的方式是用来接收next(实参)中传递的实参

    yield 12;

- 上述的方式需要通过 let res = gen.next()的方式获取中间结果
- 其中间结果的格式为
    {value: 12, done: false}
    {value: undefined, done: true}
- 其中 value 的值为 yield后面跟的表达式
- 其中 done 的值 需要根据函数有没有执行完毕
- 最后一个next()的方法 的value值会是undefined, 所以最后一个yield的结果 需要通过return来返回
<!-- 
    return 55;
    那res2 的  {value: 55, done: true}
 -->

> 看个小例子:
- 返回
    function * show() {
        console.log('a');

<!-- yield的后面可以跟一些东西, 这个12将作为 中间结果的value -->
        yield 12;   

        console.log('b');
        
    }

 <!-- 创建个生成器对象, 有了生成器对象后需要两个next() -->
    let gen = show();

<!-- 使用变量用来接收next()返回的中间结果 -->
    let res1 = gen.next();
    let res2 = gen.next();

    console.log(res1);      // 中间结果是: {value: 12, done: false}
    console.log(res2);      // 中间结果是: {value: undefined, done: true}

<!-- 
    done: 英语意思是完成, false是函数没有执行完
    res1: value是12 yield后面的值, done表示函数没走完

    res2: value是undefined, 因为res2是函数的最后一道工序, 最后一道工序就没有yield的了
    最后一道工序想返回要靠return 

    return 55;
    那res2 的  {value: 55, done: true}
 -->

<!-- 
    查看通过next()传递进去的参数, 需要将yield赋值给一个变量, 然后在函数内部打印已经被赋值的变量
    let result = yield;
    console.log(result)     // 5

    gen.next();
    gen.next(5);


    查看yield产生的中间结果 需要将 gen.next()赋值给一个变量, 然后再函数外部打印已经被赋值的变量
    let result = gen.next();
    console.log(result)
-->


> 再次解析
    function * 炒菜(菜市场买回来的新鲜的菜) {
        // 洗菜 ---(会变成) --- 洗好的菜


        let干净的菜 = yield 洗好的菜;  
<!-- 
    我们将洗好的菜返回出去, 等到下一个人就接收干净的菜
-->

       // 第二个环节 拿着干净的菜 ---(切)--- 切好的丝

       let 切好的菜 = yield 丝;
<!-- 把这个丝返回出去 让下一个人使用-->

       // 第三个环节 切好的菜 ---(炒)--- 做好的菜

       return 做好的菜
    }

- 就是一个中间步骤可以返回出去 另一个人拿着结果接续

-------------------------------

### 案例 
- 先准备两个文件
    1.txt   [12,5,8]
    2.txt   ["a":12, "b":5]
    3.txt   [{"name":"sam", age:18}, {"name":"erin", age:20}]

- 我们看下生成器函数在数据读取操作中怎么应用
<!-- 
    runner(function * () {
        let data1 = yield $.ajax({url:'data/1.txt', dataType:'json'});
        let data2 = yield $.ajax({url:'data/2.txt', dataType:'json'});
        let data3 = yield $.ajax({url:'data/3.txt', dataType:'json'});

        console.log(data1, data2, data3);
        能打印出3个文件中的json对象

    解析下:
    $.ajax({url:'data/1.txt', dataType:'json'}); 会返回一个promise对象
    然后
    把这个promise对象 yield出去 yield给runner(因为是runner在执行生成器函数)
    然后
    这个函数暂停了 因为遇到yield的了嘛
    然后
    runner就会执行promise的结果(数据请求), 等到它执行完了 控制权再还给生成器函数 就回到了 data1

    下面也一样, 读完了给data2, 读完了给data3
    })
 -->
- 它的好处就在于可以像同步一样 写异步的操作

> 当我们面对异步的操作有几种写法
1. 老老实实的用回调来写, 回调地狱
2. promise
3. generator

1. 回调
<!-- 
    $.ajax({
        url:'xxx',
        dataType: 'json',
        success(data1) {
            $.ajax({
                url:'xxx',
                dataType: 'json',
                success(data2) {
                    $.ajax({
                        url:'xxx',
                        dataType: 'json',
                        success(data3) {
                            // 完事了
                        },
                        error() {
                            alert('错了');
                        }
                    })
                },
                error() {
                    alert('错了');
                }
            })
        },
        error() {
            alert('错了');
        }
    })
 -->

2. promise
- 如果是就三个数据已经确定了的情况下, 跟generator没什么区别
<!-- 
    Promise.all([
        $.ajax({url:'xxx', dataType:'json'}),
        $.ajax({url:'xxx', dataType:'json'}),
        $.ajax({url:'xxx', dataType:'json'}),
    ]).then(results => {
        // 完事了
    }, err=>{
        alert('错了');
    })
 -->

3. generator
- 它适合掺杂一些逻辑
- 比如第一个读取的是用户数据, 然后我根据用户数据中用户是不是vip来读别的东西比如如果是vip我就读vip的商品 如果是普通用户就读普通用户的商品
<!-- 
    runner(function * () {
        let data1 = yield $.ajax({url:'data/1.txt', dataType:'json'});
        let data2 = yield $.ajax({url:'data/2.txt', dataType:'json'});
        let data3 = yield $.ajax({url:'data/3.txt', dataType:'json'});

        // 完事
    })
 -->

> 我们看看带逻辑的promise 和 带逻辑的generator是什么样子
1. promise
- 这种情况下 使用promise跟普通回调嵌套的方式区别不大了
<!-- 
    Promise.all([
        $.ajax({url:'xxx', dataType:'json'})
    ]).then(results => {
        let userData = results[0];

        // 接下来对userData进行判断 如果是vip则进行什么样的操作
        if(userData.type === 'VIP') {
            // 如果是vip的话我们就读取另一个东西
            Promise.all([
                $.ajax({url:'xxx', dataType:'json'})
            ]).then(results => {
                let items = results[0]

                // 得到数据后, 可以做其他的事情, 比如生成列表啊 加时间等
            }, err => {
                alert('错了')
            })

        } else {
            // 这里是普通的用户
            Promise.all([
                $.ajax({url:'xxx', dataType:'json'})
            ]).then(results => {
                let items = results[0]

            }, err => {
                alert('错了')
            })
        }

    }, err => {
        alert('失败了')
    })
 -->

2. generator
- 这里就能看出来生成器函数在处理带逻辑的数据读取的优势
- 当有了逻辑后就非常的方便
<!-- 
    runner(function * () {
        let userData = yield $.ajax({url:'generator', dataType:'json'});

        if(userData.type === 'VIP') {
            let item = yield $.ajax({url:'generator', dataType:'json'});
        } else {
            let item = yield $.ajax({url:'generator', dataType:'json'});
        }
    })

    // 生成....
 -->

> 总结:
- Promise适合一次读一堆
- generator适合夹杂着逻辑性判断的东西, 我有可能读这个 有可能读那个



-------------------------------

### 生成器 (另一个老师的讲解)
- 生成器函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同
- 生成器是一个特殊的函数, 作用是异步编程(之前我们再处理异步编程时, 使用的是纯回调函数)

> 声明方式 和 调用方式:
-  在function 和 函数名之间加 *
<!-- 
    function * fn(){ 
        console.log('test');
    }; 
-->

> 调用方式
- 获取迭代器对象, 调用迭代器内部的next()方法
<!-- 不同于传统的函数xx()就会出现结果的这种调用方式 -->

\\ 获取迭代器对象
    let iterator = fn();

\\ 使用迭代器内部的next()方法来进行调用
    iterator.next();
<!-- 
    let iterator = fn();
    console.log(iterator) 
    // 返回的结果是一个迭代器对象里面有一个next(), 利用iterator, 内部的next()方法来调用 内部的命令

    iterator.next();    //调用函数内部的所有命令
-->

> 函数体内部的  yield语句
- yield 后面跟 表达式, 或者 字面量
- 生成器函数内部可以出现 yield语句, yield语句相当于函数代码的分隔符
<!-- 
    // yield的分割情况
    function        ---
    console.log(1)      这是一段
    yield 1         ---
    console.log(2)      这是二段
    yield 2         ---
    console.log(3)      这是三段
    yield 3         ---
                        value:undefined done:true
 -->
- 当出现yield语句后, 我们使用 iterator.next(), 调用时,只能依次调用yield之上的语句, 如果函数体内部有多条语句, 要使用多次 iterator.next() 命令

- 有几个 yield 语句就调用几次 iterator.next() 方法, 当没有yield后再次调用, 这是yield的值为undefined done:true
<!-- 
    function * fn(){ 
        console.log(111);
        yield '----';
        console.log(222);
        yield '----';
        console.log(333);
        yield '----';
        console.log(444);
    };

    let iterator = gen();
    iterator.next();        111
    iterator.next();        222
    iterator.next();        333
    iterator.next();        444
 -->

> iterator.next()   &   console.log(iterator.next());
- iterator.next()
        是调用函数体内部的语句, 当有yield语句时,依次输出yield之上的语句
- console.log(iterator.next());
        是iterator.next()的返回结果, 会执行 yield 之上的语句 和 yield后面的表达式或字面量
<!-- 
    function * fn(){ 
        console.log(111);
        yield 'AAA';
        console.log(222);
        yield 'BBB';
        console.log(333);
        yield 'CCC';
    };

    let iterator = gen();
    iterator.next();        // 111

    console.log(iterator.next());       // 111 {value:AAA, done:false}
 -->

- 既然这个生成器函数是一个迭代器对象, 它也可以用for of来遍历
- 可以遍历出 函数体内语句(语句的结果, yield后的表达式和字面量)
<!-- 
    function * gen(){ 
        console.log(111);
        yield 'A';
        console.log(222);
        yield 'B';
        console.log(333);
        yield 'C';
        console.log(444);
    };

    for(let n of gen()){
        console.log(n)      111 A 222 B 333 C 444
    }
    // 每次调用的返回结果是yield后面的表达式的结果 或者 字面量的值
 -->

-------------------------------

### 生成器函数的参数
- 生成器函数gen() 和 调用时的next()内可以传实参

- next()可以传递实参, 这个实参就是yield语句的返回结果
- 第二次调用next()传递进去的实参会是上一个yield语句的返回结果
<!-- 
    function * gen(arg){
        console.log(arg);
        yield 111;
        console.log(2)
        yield 222;
    };

    // 传递一个实参
    let iterator = gen('AAA');
    console.log(iterator.next());
        // 调用第一次, 输出第一个yield之上的语句  和
        // 第一个yield后边的字面量或表达式 111
 -->

<!-- 
    function * gen(arg){
        console.log(arg);
        let one = yield 111;
        console.log(one);
        let two = yield 222;
        console.log(two);
        let three = yield 333;
        console.log(three);
    };

    // 传递一个实参
    let iterator = gen('AAA');
    console.log(iterator.next());       // AAA    {value: 111, done: false}
        
        // 调用第一次, 输出第一个yield之上的语句  和
        // 第一个yield后边的字面量或表达式 111

    console.log(iterator.next('BBB'));  //BBB    {value: 222, done: false}
        // 调用第二次, 输出第二个yield之上的语句 BBB  和
        // 第二个yield后边的字面量或表达式

    console.log(iterator.next('CCC'));  //CCC    {value: 333, done: false}
        // 调用第三次, 输出第三个yield之上的语句 CCC  和
        // 第三个yield后边的字面量或表达式

    console.log(iterator.next('DDD'));  //DDD    {value: undefined, done: true}
        //调用第四次, 传递的实参将作为第三个yield的返回结果, 没有了后面
            
 -->

-------------------------------

### 生成器函数主要是针对异步编程的主要解决方案
> 回调地狱:
- 需求:
1s后控制台输出111 然后 2s后输出222 然后 3s后输出333
也就是说整个代码的运行需要6s钟 才能输出 1 2 3

下面的这种方式也能完成需求, 但是要是还有异步任务的话, 我们还需要套新的一层, 这时候代码的缩进不断的向前推进, 阅读起来不方便 调试错误也非常的不方便, 有可能还会 出 编辑区域, 这种现象叫做 回调地狱

<!-- 
    setTimeout(()=>{
        console.log(111);
        setTimeout(()=>{
            console.log(222);
            setTimeout(()=>{
                console.log(333);
            }, 3000)
        }, 2000)
    }, 1000)
 -->

> 使用生成器函数避免回调地狱
<!-- 
    // 生成器函数怎么操作
    // 先声明三个函数, 这三个函数分别完成3个异步任务
    function one(){
        setTimeout(()=>{
            console.log(111);
            // 2 所以我们在每个函数中都执行 iterator.next();
            iterator.next();
        }, 1000);
    };
    function two(){
        setTimeout(()=>{
            console.log(222);
            iterator.next();
        }, 2000);
    };
    function three(){
        setTimeout(()=>{
            console.log(333);
            iterator.next();
        }, 3000);
    };

    // 创建生成器函数, 把上面3个函数放到yield语句里面
    function * gen(){

        yield one();
        yield two();
        yield three();

    };

    // 调用生成器函数
    let iterator = gen();
    iterator.next();        //1 如果只写这里 只会出现第一个yield之上的部分
 -->

> 模拟获取用户数据, 订单数据, 商品数据, 生成器函数解决异步任务
<!-- 
    // 模拟获取 先来用户数据 然后订单数据 最后商品数据
    // 我们用定时器模拟异步行为
    function getUsers(){
        setTimeout(() => {
            let data = '用户数据'
            // 调用next()方法, 并且将数据传入
            iterator.next(data);    //2 这是第二次调用, 所以它的实参将作为第一次yield的返回结果
        }, 1000);
    };

    function getOrders(){
        setTimeout(() => {
            let data = '订单数据'
            iterator.next(data);    //4 这是第三次调用, 所以它的实参将作为第二次yield的结果返回
        }, 1000);
    };

    function getGoods(){
        setTimeout(() => {
            let data = '商品数据'
            iterator.next(data);    //6 这是第四次调用, 所以它的实参将作为第三次yield的结果返回
        }, 1000);
    };

    // 先来获取用户
    function * gen(){
        //3 创建变量, 接收第一个yield的返回结果, 因为2中是第二次调用next()
        let Users = yield getUsers();
        console.log(Users);
        //5 创建变量, 接收第二个yield的返回结果, 因为4中是第三次调用next()
        let Orders = yield getOrders();
        console.log(Orders);
        //7 创建变量, 接收第三个yield的返回结果, 因为6中是第四次调用next()
        let Goods = yield getGoods();
        console.log(Goods);
    };

    let iterator = gen();
    iterator.next();        //1 会运行第一段 运行完后会把getUsers()运行的结果返回

    /* 
        上面的代码实际在运行时是异步的, 这是生成器函数在异步任务的时候的表现
    */
 -->

-------------------------------

### Promise
> 异步和同步的回顾
- 异步:
- 操作和操作之间是没关系的我们是差着走的你爱去哪去哪
- 那也就是说可以同时进行多个操作
- 可以同时处理多个操作, 操作之间互不干扰 会让代码变的更复杂

- 同步:
- 就像两个人商量好的一块走
- 那也就是说同时只能做一件事
- 代码简单

> 思考:
- 既然上面的两种方式各有有点和缺点 那么能不能结合到一起 既像同步一样书写清晰简单, 又像异步那样性能好 不会卡页面


> promise的概述
- Promise 是 ES6 引入的异步编程的新解决方案。
- 简单的理解可以 消除异步操作,  用同步一样的方式, 来书写异步代码

- 语法上 Promise 是一个构造函数，用来实例化对象, 内部用来封装异步操作并可以获取其成功或失败的结果。

- 异步编程主要指的是i/o代码, 比如文件i/o 数据库io 网络请求, Promise主要解决之前回调地狱的一个问题

1) Promise 构造函数: Promise (excutor) {}
2) Promise.prototype.then 方法
3) Promise.prototype.catch 方法


> promise的使用方式
- promise是一个构造函数 所以需要先实例化对象
- 里面接收一个参数为回调函数, 所有的异步代码都写在里面

- 函数内部有两个参数
    - resolve     代表Promise对象的状态    成功
    - reject      代表Promise对象的状态    失败

    let p = new Promise(function(resolve, reject) {});


- 当promise执行完毕有结果后就会调用then
- then方法中用两个函数作为参数
- 当成功的时候会调用第一个函数, 当失败的时候会调用第二个函数

    p.then(function(){      // 参数可以是 arr 下面例子中的数据
        alert('成功了');
    }, function(){
        alert('失败了')
    })


<!-- 
    // 使用Promise封装ajax操作
    // 创建一个文件夹, 创建一个arr.txt, 里面是一个普通的数组
    let p = new Promise(function(resolve, reject) {

        $.ajax({
            url:'arr.txt',          // url必须有
            dataType: 'json',       // 希望把数组解析为json
            success(arr) {          // 成功的时候接收arr
                resolve(arr)        // 正确的时候调用resolve()
            },
            error(err){
                reject(err);        // 错误的时候调用reject()
            }
        })
    });

    // 上面promise简单的写完了 然后怎么用它
    p.then(function(arr){      // 参数可以是 arr 下面例子中的数据
        alert('成功了');
    }, function(){
        alert('失败了')
    })
 -->


> 当要获取的文件比较多的情况下 我们可以使用
- Promise.all()
- 全部执行完毕后, 它接收一个数组作为参数
- 获取返回的结果可以利用解构赋值
<!-- 
    let [res1, res2] = arr
 -->

    Promise.all([
        p1, p2
    ]).then(function(arr){          // 这里会有一个数组作为成功返回的结果
        alert("全成功了");

    }, function(){
        alert("至少有一个失败了");
    })
<!-- 
    既然是all 那就是所有的都成功了才算是成功
    只要有一个失败了 那就是失败了
 -->


<!-- 
    // 上面是简单的情况, 现在假如我们有两个文件要获得
    1. data/arr.txt
    2. data/json.txt

    // 接下来我们要封装两个promise
    // arr.txt
    let p1 = new Promise(function(resolve, reject) {
        $.ajax({
            url:'data/arr.txt',
            dataType: 'json',
            success(arr) {
                resolve(arr)
            },
            error(err){
                reject(err); 
            }
        })
    });

    //json.txt
    let p2 = new Promise(function(resolve, reject) {
        $.ajax({
            url:'data/json.txt',
            dataType: 'json',
            success(arr) {
                resolve(arr)
            },
            error(err){
                reject(err); 
            }
        })
    });

    Promise.all([
        p1, p2
    ]).then(function(arr){          // 这里会有一个数组作为成功返回的结果
        alert("全成功了");

        // 获取成功返回的结果(arr, json), 结果会封装到一个数组里面, 我们可以通过解构赋值来取回
        let [res1, res2] = arr;
        console.log(res1, res2);
        
    }, function(){
        alert("至少有一个失败了");
    })

 -->

> 上面还是有点麻烦, 因为我们要写两个promise对象, 但是我们发现仅仅是url不一样, 所以我们可以封装成一个函数
<!-- 
    function createPromise(url) {
        return new Promise(function(resolve, reject) {
        $.ajax({
            url:url,                // 当属性名和属性值一样的时候可以简写
            dataType: 'json',
            success(arr) {
                resolve(arr)
            },
            error(err){
                reject(err); 
            }
        })
    });
    }


    Promise.all([
        createPromise('data/arr.txt'),
        createPromise('data/json.txt')

    ]).then(function(arr){ 
        alert("全成功了");

        let [res1, res2] = arr;
        console.log(res1, res2);
        
    }, function(){
        alert("至少有一个失败了");
    })
 -->

> 上面的还可以继续简化, jQ3.xx版本以上自带对promise的支持
> promise完美写法
<!-- 下面的代码存在返回值, 返回值就是promise对象 -->
    let p = $.ajax({url:'data/arr.txt', dataType:'json'})
    console.log(p);     // promise

- 所以根本不用自己去封装promise对象, jQ都给我们封装好了
- 直接写 不用先创建promise实例化什么的
<!-- 
    Promise.all([
        $.ajax({url:'data/arr.txt', dataType:'json'}),
        $.ajax({url:'data/arr.txt', dataType:'json'})

    ]).then(function(data){ 
        alert("全成功了");

        let [res1, res2] = data;
        console.log(res1, res2);
        
    }, function(){
        alert("至少有一个失败了");
    })
 -->


### promise的方法
> Promise.all([])
- 一个个都得成功 一个不能缺一个不能少, 都成功后才会执行then()方法
- 参数:
- Promise.all() 中需要传入数组, 数组中包含每一个promise对象
- then() 中的参数也是一个数组, 包含着每一个成功的结果
<!-- 
  Promise.all([
    new Promise((resolve, reject) => {
      $.ajax({
        url:'url1',
        success: function(data) {
          resolve(data)
        }
      })
    }),

    new Promise((resolve, reject) => {
      $.ajax({
        url:'url2',
        success: function(data) {
          resolve(data)
        }
      })
    }),
  ]).then(results => {
    // results 是一个数组 我们通过下标的方式 获取上面的每一次和请求结果
    results[0]
    results[1]
  })
 -->

> Promise.race()        竞速
- 我这有5个资源, 先读到哪个算哪个, 谁先来了我用谁
- 即使有失败的我可以进行忽略, 只要成功的
- race的用法和all是一样的

-------------------------------


### promise (sgg李强)
> 实例化 Promise 对象
- const p = new Promise();

- new Promise()中接收一个参数, 参数是一个函数类型的值, 这个函数参数有两个形参
- 这两个形参代表了 Promise对象的状态(初始化, 成功, 失败)
- resolve     代表Promise对象的状态    成功
- reject      代表Promise对象的状态    失败

- 这个参数函数中, 封装了异步的操作

<!-- 
    // resolve, reject决定p对象的状态是成功还是失败
    const p = new Promise(function(resolve, reject){

        // 函数内部封装了异步的操作, 我们用定时器模拟下
        setTimeout(function(){

        }, 1000)
    });
 -->

- 根据 Prosime对象的状态 成功 失败 可以调用 Promise对象的 then()
- then()中, 有两个参数(回调1, 回调2)
- 回调1中的形参为 成功      value
- 回调2中的形参为 失败      reason

- 当Promise对象的状态为 成功 的时候, then()会执行第一个回调函数中的内容
- 当Promise对象的状态为 失败 的时候, then()会执行第二个回调函数中的内容
<!-- 
    p.then(function(value){}, function(reason){})
 -->


> 模拟读取数据成功
<!-- 
    const p = new Promise(function(resolve, reject){

        setTimeout(function(){

            let data = '数据库中的用户数据';
            resolve(data);      // 调用resolve()函数 表示p对象的状态为成功
        }, 1000)
    });

    // 当p的状态为成功时, 调用then()中的第一个回调
    p.then(function(value){

        console.log(value)
            // 这里会输出 Promise对象中 resolve()方法传捡来的data的值
    }, function(reason){

    }
    )
 -->

> 模拟读取数据失败
<!-- 
    const p = new Promise(function(resolve, reject){

        setTimeout(function(){

            let err = '读取数据失败';
            reject(err);      // 调用reject()函数 表示p对象的状态为失败
        }, 1000)
    });

    // 当p的状态为失败时, 调用then()中的第二个回调
    p.then(function(value){
        console.log(value)

    }, function(reason){
        console.log(reason)
            // 这里会输出 Promise对象中 reject()方法传捡来的err的值
    }
    )
 -->

-------------------------------

### Promise封装读取文件内容
> NodeJs的方式:
<!-- 
    // 1. 引入 fs 模块
    const fs = require('fs');

    //2. 调用方法读取文件
    fs.readFile('./为学.md', (err,data)=>{

        //如果失败则抛出错误 有err就是错误对象 没err err就是null
        if(err) throw err;

        //如果没有错, 则输出内容
        console.log(data.toString());
    });
 -->

> Promise封装读取文件:
- 优点可以避免出现回调地狱
<!-- 
    const p = new Promise(function(resolve, reject){

    // 这里是异步的操作, 而读取文件就是异步的操作
    fs.readFile('./为学.md', (err, data)=>{

        //判断如果失败, 我们就改变p对象的状态, 通过调用reject()更改p对象的状态为失败, 并且还可以设置失败的值是错误对象
        if(err) reject(err);

        //如果成功
        resolve(data);
        //如果成功那就调用resolve() 更改p对象的状态为成功, 传递成功的值
    })
    });

    //上面异步任务封装之后, 可以通过then方法处理成功和失败的结果
    p.then(function(value){
        console.log(value.toString());
    }, function(reason){
        console.log('读取失败!!')
    })
 -->

-------------------------------

### Promise封装AJAX请求

接口地址: https://api.apiopen.top/getJoke

> 原生AJAX 向 URL发送请求
<!-- 
    // 1 创建对象
    const xhr = new XMLHttpRequest();

    // 2 初始化 发get请求, 给后面的URL发
    xhr.open('GET', 'https://api.apiopen.top/getJoke')

    // 3 发送
    xhr.send();

    // 4 绑定事件, 处理响应结果
    xhr.onreadystatechange = function(){
        // 判断, 证明进入最后一个阶段 所有的响应体都回来了
        if(xhr.readyState === 4){

            //判断响应状态码 200 - 299 在这个区间内表示成功
            if(xhr.status >= 200 && xhr.status < 300 ){ //表示成功

                //成功后在控制台输出结果
                console.log(xhr.response);
            }else{
                // 如果失败
                console.error(xhr.status);
            }
        }
    };
 -->

> 使用Promise对象 对原生AJAX方式做封装
- 对于异步成功和失败的结果的处理方式不一样了, 原生的AJAX是在回调函数中操作
- Promise里是在异步任务的后面 通过then()方法来指定的回调, 结构看起来更加的清晰 也不会产生回调地狱, 
<!-- 
    // 我们再AJAX方式的基础上做一个改进:
    const p = new Promise(function(resolve, reject){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.apiopen.top/getJoke')
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){

            //判断响应状态码 200 - 299 在这个区间内表示成功
            if(xhr.status >= 200 && xhr.status < 300 ){
                //200-299既然在这个区间 表示成功了 那我们就调用resolve(), 来修改P对象的状态
                resolve(xhr.response);
            }else{
                //如果失败 就调用
                reject(xhr.status);
            }
        }
    };
    });

    p.then(function(value){
        console.log(value)
    }, function(reason){
        console.error(reason);
    })
 -->

-------------------------------

