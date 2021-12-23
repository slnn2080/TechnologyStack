### https://www.bilibili.com/video/BV12J41147fC?p=33&spm_id_from=pageDriver
- 看到这里

-------------------

### 正则资料整理
- u
- 匹配国家文字
- http://www.unicode.org/standard/supported.html

- \p{}
- https://www.regular-expressions.info/unicode.html#prop

- 资料来源
- https://blog.csdn.net/rambler_designer/article/details/120280676

-------------------

### 创建正则表达式的两种方式
> /.../igs
- 要点:
- 这种方式创建的正则没办法识别变量
<!-- 
  let str = "houdunren.com"
  let a = "u"
  /a/.test(hd)      // 这样找的是a 不是预期中的u
 -->

**扩展:**
> eval(...)
- 将参数部分解析为表达式
<!-- 
  let str = "houdunren.com"
  let a = "u"
  eval( `/${a}/`.test(hd) )
 -->

> new RegExp("正则", "igs")
- 这种方式第一个参数内部是识别变量的
<!-- 
  let str = "houdunren.com"
  let a = "u"
  let reg = new RegExp(a, "igs")
 -->

-------------------

### 正则方法 exec
> reg.exec(str)
- 

> reg.lastIndex
- 依次查找字符串中每一个字符的位置 该属性代表当前字符所在的位置
- 每一次匹配能得到最新的位置
- 直到查询结束
**注意：**
- 当使用 匹配模式g 的时候 lastIndex 才会发生变化 不然后是0
<!--  
  let hd = "houdunren"
  let reg = /\w/g

  reg.lastIndex   // 0
  reg.exec(hd)    
  reg.lastIndex   // 1
  reg.exec(hd)    

  while((res = reg.exec(hd))) {
    log(res)
  }
 -->

-------------------

### 匹配模式
> i
- 匹配时不区分大小写

> g
- 匹配到结尾 不加仅匹配一个

> s
- 视为单行匹配
- 将换行符视为空白(.能匹配到换行了) 设置s就是能匹配到换行符
- 或者说忽略换行符

> m
- 每一行单独处理

> u
- 使用字符属性的时候使用
- 开启这个模式也能匹配宽字节字符 奇奇怪怪的字符

> y
- 必须连续的满足条件
<!-- 
  let hd = "后盾人qq群: 1111,9999后端人"
  let reg = /(\d+),?/y
  reg.lastIndex = 7
  let qq = []
  while((res = reg.exec(hd))) {
    qq.push(res[1])
  }
 -->

-------------------

### 转义
> //写法的时候
- 1. .想作为普通的字符点的时候 需要转义 \.
- 2. d为普通的字符串 \d 就是转义为代表0-9的数值

> new RegExp写法的时候
- new RegExp("这里是字符串的位置是么")
- 如果写在这里的形式是这样的 new RegExp("\d") 其实和 RegExp("d") 是没有任何区别的 

- 也就是说在字符串中 "\d == d" 它俩是一样的 但是我们想在字符引号中只用正则 所以要再次的进行转义

  new RegExp("\\d")
  new RegExp("\\.")

- 要用 \\ 用一个\跟不加\是一样的

-------------------

### 字符属性 和　汉字的匹配
- 我们的任意字符都有相对应的属性 来进行区分 比如 a [L] a有L属性就代表是一个字母
- doc.houdunren.com

**注意**
- 字符属性的使用必须配合 *匹配模式 u 来进行操作*

> \p{字符属性}
- 要点：
- p是一个普通的字符 \p 将它转义为功能性的字符 \p{字符属性}
<!-- 

  let hd = "houdunren2010"

  // 我们要提取字母
  hd.match(/\p{L}/gu/)
 -->


> 字符属性 \p{L}
- 匹配所有字母

> 字符属性 \p{P}
- 匹配所有标点符号

> 字符属性 \p{N}
- 所有数字

> 字符属性 \P{N}
- 大写P的是时候是除了 这就是除了数字

> 字符属性 \p{sc=Han}
- 匹配汉字(日韩都可以)
<!-- 
  let res = hd.match(/\p{sc=Han}/gu)
  console.log(res);
 -->

- Han
- 汉字

- Hiragana
- 平假名

- Katakana
- 片假名

- Unified_Ideograph

-------------------

### 正则符号

> 正则表达式1 | 正则表达式2
- 或 的意思 | 左右两侧是表达式
<!-- 
  let hd = "houdunren"
  /aaau|@/.test(hd)     // false

  它会检查 aaau 
 -->

- 要点:
- 1. | 两侧为表达式
- 2. - 在正则中有特殊的含义 需要转义
- 3. () 编组 在一个组内的两种情况
<!-- 
  let tel = "010-999999"
  /010\-\d{7,8}|020\-\d{7,8}/

  (010|020)-\d{7,8}
 -->


> []
- 匹配里面的元素有或的意思
<!-- 
  [123456]
    匹配的是当中的一个元素 有哪个都会匹配成功
    并不是匹配123456
 -->

- 注意点:
- ()在正则中是组的意思 但是放在[()]里面的时候 就表示普通的()了
- . 和 + 也是放到[]里面就变成普通的字符了 转义也不行
<!-- 
  ["(", ")"]
 -->


> [^]
- 匹配除了里面的内容
<!-- 
  let hd = "张三:010-9999"
  hd.match(\[^-\d:,\s]\)    // ["张三"]
 -->


> ()
- 整体的意思 被包裹起来的部分是一个整体
<!-- 
  (12|34)
    或者匹配(12)
    或者匹配(34)

  比如有 888222 它不会单独匹配一个2 它必须匹配 12 这个整体
 -->

- 在正则里面可以这样
- 要点：
- ([-\/]) 对它进行了编组 后面 就可以用 \1
<!-- 
  2022-02-23
  /^\d{4}([-\/])\d{2}\1\d{2}$/
 -->


> .
- 除换行外的任何字符
- 因为是匹配除了换行的字符 所以再次遇到换行符就停止了


> ^
- 限定起始便捷


> $
- 限定结束边界


> 元字符
- 表示一类字符当中的一个

  - \d
  - 表示 0-9 当中的一个数值

  - \D
  - 表示 除了数字

  - \s
  - 表示空白 空格 换行 制表符 都属于空白

  - \S
  - 表示除了空白

  - \w
  - 表示字母 数字 下划线 (囊括了\d)

  - \W
  - 除了字母 数字 下划线
  <!-- 
    用户注册 用户名要求 字母数字下划线
    ^[a-z]\w{4,9}$
   -->

  - +
  - 1个或多个

  - +?  {2, 100}?
  - 或倾向1个 or 倾向2个  往最少的一面


> 技巧
- [\s\S]
- 能匹配所有字符
<!-- 
  let span = "div<span>hello</span>div"
  let reg = /<span>[\s\S]+<\/span>/
  let ret = span.match(reg)[0]
  console.log(ret);
 -->

-------------------

### 原子组
> ()    --  \1
- 使用院子组包裹起来的部分是一个整体 就想图层里面的元素 移动的时候都是按照整体来操作 ctrl+g
<!-- 
  <h1>
    houdunren
  </h1>

  let reg = /<h[1-6]>[/s/S]*</h[1-6]>/ig

  // h[1-6] 的部分重复了

  (h[1-6])  ---- 对应着 ---  \1
 -->

- 当我们使用 match 方法去提取 有原子组的数据的时候
- 有 匹配模式 g 的时候
<!-- 
  let reg = /<(h[1-6])>.+<\/\1>/gi

  let ret = body.innerHTML.match(reg)
  console.log(ret);
      // ['<h1>houduren</h1>', '<h3>hdcms</h3>']
  
  结果将收集到的数据会放在一个数组中
 -->

- 没有 匹配模式 g 的时候
- 搜索到的结果会多一些
- 数组中的 索引为0的
      就是我们通过正则匹配到的完整数据

- 数组中 索引为1的
      就是原子组匹配到的信息  *原子组的信息是从1开始*

- 数组中 索引为1的
      index属性: 表示从哪开始匹配的
      input属性: 原始的字符串 我们就是基于原始的字符串进行匹配的
      groups属性: 组的别名
<!-- 
  [
    '<h1>houduren</h1>', 
    'h1',     // 原子组包起来的数据
    index: 16, 
    input: '\n  <p>后盾人</p>\n  <h1>houduren</h1>\n  <h3>hdcms</h3>…}\n    // })\n    // console.log(ret);\n\n  <\/script>', 
    groups: undefined
  ]
 -->

- 我们在reg正则里面定义了 () () 两个原子组
  - 如果是在正则是复用原子组的话 那么 \1 \2 的形式
  - 如果是要替换的话 $1 $2 的形式

  - 也就是说我们在正则的方法中 也可以使用原子组 比如 replace - $2
<!-- 
  let hd = `
      <h1>houduren</h1>
      <span>后盾人</span>
      <h3>hdcms</h3>
    `

  let reg = /<(h[1-6])>([\s\S]+)<\/\1>/ig

  let res = hd.replace(reg, "<p>$2</p>")
  console.log(res);
 -->

-------------------

### 不记入组
> (?:)
- 我们可以对正则来进行分组 那分组之后每一个组就会产生对应的编号 比如
- (\w+)\.(\w+)

- 这样就会产生两个小组 $1 和 $2 它们就会产生对应的$1 和 $2编号
- 但有的时候 我不希望其中的一个小组产生编号 那么就可以使用 不计入组
- (\w+)\.(?:\w+)

- 这样第二个分组就不会有编号 \2 $2 之类的效果

- 应用场景
- 我们有一个域名 https://www.houdunren.com
- 我们指向提取 www.houdunren.com 前面不要 怎么操作?
- 首先写出匹配 https://www.houdunren.com 的正则
- 然后对想要提取的内容进行分组
- 不加g的时候 1就是分组1的信息  
<!-- 
  let hd = "https://www.houdunren.com"
  let reg = /https:\/\/(\w+\.\w+\.(?:com|cn|org))/i
  console.log(hd.match(reg)[1]);
 -->

-------------------

### 定义多条正则 全部符合后为true  有点秀 every方法
- 要点:
- 使用了 every方法 该方法当全部满足时 结果才会是true

<!-- 
  input.addEventListener("keyup", (e) => {
    // 获取输入的值
    console value = e.target.value

    // 定义多条规则
    - 输入框的内容为字符数字5到9位
    - 还要包含一个大写字母
    const regs = [
      /^[a-z0-9]{5,10}$/i,
      /[A-Z]/
    ]

    // 结果全部为真的时候 整个表达式为真
    let status = regs.every(e => {
      e.test(value)
    })

    log(status)
  })

 -->

-------------------

### 需求: 将h1 和 h2换成p标签  --  原子组 替换
- 要点:
- 我们在reg正则里面定义了 () () 两个原子组
  - 如果是在正则是复用原子组的话 那么 \1 \2 的形式
  - 如果是要替换的话 $1 $2 的形式

  - 也就是说我们在正则的方法中 也可以使用原子组 比如 replace - $2
<!-- 
  let hd = `
      <h1>houduren</h1>
      <span>后盾人</span>
      <h3>hdcms</h3>
    `

  let reg = /<(h[1-6])>([\s\S]+)<\/\1>/ig

  let res = hd.replace(reg, "<p>$2</p>")


  // 回调参数 1正则匹配的内容 2原子组1 3原子组2
  let res = hd.replace(reg, (search, s1, s2) => {
    return `<p>${s2}</p>`
  })

  console.log(res);

 -->

-------------------

### 需求 删除h1标签
- 我们当然也能操作dom还进行 但这里介绍下正则的方式
- 1. 首先获取body内容 
<!-- 
  let body = document.body
  console.log(body.innerHTML)   // 字符串

  let reg = /<(h[1-6])>.+<\/\1>/gi
  body.innerHTML = body.innerHTML.replace(reg, "")
-->

-------------------

### 需求 提取指定的数据 太秀了
- 要点 
- 数组的结构
- 当我们整理出来 *["js", "200元"]* 的时候 我们可以通过结构变量的形式赋值
<!-- 
    let [name, price] = ["js", "200元"]
          // 这样的结果就是 name = “js” 的形式
    returen {name, price}
          // 这样就是 {name: "js"}
 -->  

<!-- 
  let hd = `
    #1 js,200元 #
    #2 php,300元 #
    #9 houdunren,400元 # 后端人
    #3 node,200元 #
  `
  // [{name: "js", price: "200元"}] 要整理成的样式

  let ret = hd.match(/^\s*#\d+\s+.+\s+#$/gm).map(item => {
    // 将前面的 # 删除
    item = item.replace(/\s*#\d+\s*/, "").replace(/\s*#$/, "")
    console.log(item) // js,200元

    let [name, price] = item.split(",")
    return {name, price}
  })
  console.log(ret);
 -->

-------------------

### 检测用户输入 3-6 位
- 我们需要检查用户输入字符的位数

- 要点:
- 1. 字符串.match()
    找不到为 null
    找到了为 数组

- 2. /[a-z]{3,6}/
    用户输入7位的时候也能匹配到 因为包含6位

- 3. 这种情况下 我们要使用 边界符号 ^ $ 表示我们只找3-6位
<!-- 
  inp.addEventListener("keyup", function() {
    log(this.value.match(/[a-z]{3,6}/))
  })
 -->

-------------------

### 需求 文字高亮显示
- 要点:
- new RegExp(con, "g")
    这种方式创建的正则 支持变量

- .replace(con, (search) => {
    return `
      <span style="color: red">${search}</span>
    `
  }
> replace方法 支持回调
.replace(正则, (正则匹配的内容, 原子组1, 原子组2...) => {
  return `
    <span style="color: red">${search}</span>
  `
}
<!-- 
  let con = prompt("请输入要检查的内容 支持正则")
  let div = document.querySelector("div")

  let reg = new RegExp(con, "g")
  div.innerHTML = div.innerHTML.replace(con, search => {
    return `
      <span style="color: red">${search}</span>
    `
  })
 -->

**扩展**
> str.replace("正则", "@")
- 正常的方式是将第一个参数a 替换为@
<!-- 
  str.replace("a", "@")
 -->

- 第一个参数的位置还支持正则

> str.replace("正则", (匹配的元素) => { 每个匹配的元素都会过边回调} )
- 第二个参数的位置还支持回调
- 回调中的参数为 通过正则找到内容 回调中需要有返回值 return
<!-- 
  "abc".replace(/\w/g, search => {
    return "@"
  })
 -->

-------------------

### 需求 提取字符串中的数字
> 要点:
- parseInt();
    可以将一个字符串类型的数字转换为纯数字 如果转化不了 会是NaN

- Number.isNaN();
    判断一个数字是否是NaN值

- [...str]
    必须创建一个变量来接收

<!-- 
  let str = "adasdf834saf"
  let res = [...str].filter(item => !Number.isNaN(parseInt(item)))
  console.log(res.join(""))

  let res = str.match(/\d/g).join("")
  console.log(res)

  let reg = /\d+/g
  let res = reg.exec(str)[0]
  console.log(res)
 -->


