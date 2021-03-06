### 激活码网址
- https://www.ideajihuoma.com/
- 程序猿编程社区 -- 回复 -- idea


### 补充知识:
> Java Number类
- Number 是一个抽象类，也是一个超类（即父类）
- Number 类属于 java.lang 包，所有的包装类（如 Double、Float、Byte、Short、Integer 以及 Long）都是抽象类 Number 的子类。

- Number 类定义了一些抽象方法，以各种不同数字格式返回对象的值

> byte byteValue();  	
- 返回 byte 类型的值

> double doubleValue();	
- 返回 double 类型的值

> float floatValue();	
- 返回 float 类型的值

> int intValue();	
- 返回 int 类型的值

> long longValue();	
- 返回 long 类型的值

> short shortValue();	
- 返回 short 类型的值

- 抽象类不能直接实例化，而是必须实例化其具体的子类。
- Number num = new Double(12.5);

------

### BigDecimal的运算
- 我们可以将数据定义成此类型 该类型中可以进行 加减乘除绝对值等函数方法

> BigDecimal的实例化
> new BigDecimal(数值)
- 我们传入的数值 必须也是一个BigDecimal的类型
- 参数:
- 1. 纯数字
- 2. 字符串型的数字


> 通过 BigDecimal 的对象可以调用 对应的加减乘除等方法
> num.add(bd对象)
- 加法运算

> num.subtract(bd对象)
- 减法运算

> num.multiply(bd对象)
- 乘法运算

> num.divide(bd对象)
- 除法运算

> num.abs(bd对象)
- 绝对值运算

```java
BigDecimal num1 = new BigDecimal(1);
BigDecimal add = num1.add(new BigDecimal(2));
System.out.println(add);
```

------

### 正则表达式
- 作用:
- 正则表达式就是利用预定义的符号 定义出字符串的某种结构的特征

- 我们要知道正则表达式的内容 都是匹配字符串

> 要点：
> 1. java中我们要定义正则的时候 必须使用
  \d -> \\d
- \\d 第一个反斜杠是转义字符


> 2. []
- 我们知道定义在这里的都是可以被匹配的字符
- 我们也写过 0-9 a-z 知道是连续的意思
- 0-z呢？ 其实也可以 是按照 unicode 编码来的
- 编码小-编码大 的范围

> 3. 当我们想在 [] 里面匹配 ] 的时候
- \[]x]\
- 我们要将 ] 写在 方括号的最前面
- 左方括号不允许出现在[]中

> 4. 字符串写法的正则中 \ -> \\

> 5. 还原特殊符号(特殊符号失效区)
- 我们使用 定义一个区域 该区域中的特殊符号不需要转义字符的形式
- \\.\\.\\[a\\]

- \\Q开头
- \\E结尾
- \\Q..[a]\\E

- 注意: 不能嵌套使用 特殊符号失效区

> 6. 0次会出现一些特殊的效果 跟我们的预期不一样
> 0 ? *

```java
String str = "123a23456bcd"
String r = s.replacrAll("\\d?", "*")
sout(r)
// ****a******b*c*d*
```

- 上面的预期跟我们想的不一样 我们会认为结果应该是
- ***a******bcd
- 因为 ? 是我的印象中 代表0次或1次 也就是有就替换 没有的话就忽略

- 但我们发现不是我们想象中的忽略 而是0次也会产生匹配上的效果

> 解析:
- 123a23456bcd  -  ****a******b*c*d*
- \d? ? 意味着0次或1次
- 1 能匹配上 那就替换成 * 23也符规律所以也能完成替换

- a不是数字 不能完成匹配 但是在3和a之间 什么都没有 但是表达式引擎认为 什么都没有就等同出现了0个数字 所以也能完成一次匹配 按照这种理解数字3和字母a之间 就又出现了一个可以匹配的字符 虽然这个字符事实是不存在的 但仍然被替换成了一个 * 

- b后面什么都没有就如同出现了0个数字 所以也会多出来一个*

- **字符串中任意两个连续的字符 只要后面的字符不是数字 表达式引擎都会认为两个数字之间有0个数字**

- js也是一样的
```js
let str = "123a23456bcd"
let reg = /\d*/g

str = str.replace(reg, "*")
console.log(str);
// **a**b*c*d*
```

---

> 符号
> \d
- 代表一个 数字字符
- 不能代表一个真正意义上的数字

---

> 定义出现次数
- {2,3}
- 当我们这么定义正则的时候 那是匹配2个的还是匹配3个的?
- 匹配的原则是每次进行匹配的时候会尽量把更多的目标字符串包进来或者说尽量用更多的字符完成一次匹配

- 当一个字符串既满足2又满足3的时候 会按照3来完成匹配
- 这也是*拼车原则* 


> 贪婪模式 和 非贪婪模式
- str = "dxxxdxxxd"
- d.+ -> *
- 结果: *

-  按照拼车原则的理解 .+ *会尽量匹配更多的字符* 所以在实际的匹配过程当中 .+会匹配到首字母d以后的所有字符

- 拼车原则的官方称呼 叫做 贪婪模式 表达式引擎默认会以贪婪模式工作

--- 

> 贪婪模式要让位于整体匹配成功
- str = "dxxxdxxxd"
- d.+d
- 表达式发生了些变化 要求表达式以字母d开头还必须以字母d结尾

- 按照贪婪模式的理解 .+ 会匹配到首d后所有的字母 xxxdxxxd
- 那么就不会满足 我们定义的正则 但是我们发现也匹配成功了 这就是正则引擎的作用 它做了一些让步 不能因为贪婪而导致整个匹配的失败

- 正则引擎默认是以贪婪模式工作了 我们也可以人为的设置为非贪婪模式 也叫做勉强模式

- 非贪婪模式的原则:
- 尽可能的在匹配的时候少包含字符

- 非贪婪模式的设置方式:
- ? * + 的后面加上? ?? *? +?

- str = "dxxxdxxxd"
- d.+?
- *xx*xxd

- 如果是贪婪模式的话 .+ 会尽可能的多匹配字符 后面所有
- 非贪婪模式就恰恰相反 .+? 会尽可能少的匹配字符
- +最少要匹配一个字符 也就是底线 那么.+? 就勉勉强强的去匹配这一个字符 所以 d.+? 就匹配了 dx
- 这么勉强不情愿的匹配 也叫勉强模式

- 我们修改下正则 看看运行结果
- 无论是贪婪模式 还是 非贪婪模式都要以匹配成功为准
- 那么.+? 就不能仅匹配一个x 因为还要满足后面的d
- 所以正则表达式的含义就变成了匹配以字母d开头以字符d结尾的子串 并且两个 d之间要尽可能少的包含字符d

- 所以表达式会以中间的d作为结束的d 而不是以最后的d作为结束的d 因为要尽可能的少包含字符

- str = "dxxxdxxxd"
- d.+?d
- *xxxd


- \\(注: .+?\)\

---

> 边界符的使用 \b
- xxx\b
- 目标字符串的右边必须是空白字符 才能完成匹配

- \bxxx
- 目标字符串的左边必须是空白字符

- 空白字符包括 空格 制表符 换页符
- 另外字符串的开头和结尾也算空白字符
<!-- 
  aaa aaa
  a\b

  表达式引擎因为 末尾的aaa的右边也是空白字符
   aa* aa*
 -->

- "win a window"
- win\\b

- 观察规律发现 win 的右侧有一个空格(空白字符)
- 如果想表示某个字符串的右边是一个空格 就可以使用边界符

> \B 非空白字符

> \s 是实实在在的空白字符 是存在的
> \b 指的是目标字符串所处的位置

---

> 反向引用
- 指的是想表达式引擎向左去寻找前面出现过的内容

- 123abba456cdcd789effe00qweee
- 需求:
- 要求字符串必须包含4个字符并且这4个字符是对称结构的 把这些子字符串替换成 * 
- abba effe eeee

- 思路
- 我们需要告诉正则引擎 目标字符串有4位 并且是对称的 但是正则引擎并不知道对称含义
- 我们可以告诉它要寻找的目标字符串 
- 第一个字符 和 第二个字符可以是任意字符
- 第三个字符 和 第二个字符是相同的
- 第四个字符 和 第一个字符是相同的

- 所以我们要对 第一个 和 第二个 进行编号 使用() 这时候编组的内容就自动会有一个编号了
- (.)(.)\2\1

- \1\2 也是一个字符 和编组内容相同的字符


> 当括号发生嵌套的时候 表达式引擎优先对外层的内容进行编号
- aba#ababcc
- ((a)b)\1
- ab为因为是一组 并编号为1 检索部分就是 abab

- ((a)b)(c) 编号
- ab是1
- a是2
- c是3

**规律: 按左括号出现的顺序进行编号**

- (?:aaa) 该括号中的内容就不编号了
- (?<name>c) 该括号中的内容叫name
- 引用个时候 \k<name>


---

> 字符串形式的正则的匹配模式
> 表达式的前面加 (?标识符)正则
- String r = str.replaceAll("\\d[abc]", "*")
- 加上匹配模式
- String r = str.replaceAll("(?i)\\d[abc]", "*")
<!-- 
  i 忽略大小写
  iu 忽略大小写的范围扩展到unicode字符集
  m 多行
  s .忽略换行符
  x 忽略正则表达式中的空白字符
 -->

> 匹配模式的作用范围
> (?x) 正则 (?-x)
- 这就是匹配模式的作用范围 在开始符号和结束符号之间才有作用

- "(?x)a " 
- 标识符(?x)后面的部分才开始享受匹配模式的作用

- " (?x)a "
- 标识符(?x)前面的空格不会忽略

- " (?x)a (?-x)"

------

### Java中表示正则表达式的类
- jdk1.4开始 util 包下 添加了一个子包 regex
- 这个子包下有一个 Pattern 类 该类就是专门表达正则表达式的 

- 一个 pattern类的实例对象中 就封装了一个经过编译的正则表达式

> 创建 正则表达式的对象
- 通过 Pattern的静态方法 compile()

> Pattern.compile("字符串型的正则语句", [匹配模式1|匹配模式2])
- 返回正则表达式对象
- 正则表达式都是用来寻找目标字符串的 我们使用该对象也可以去某个字符串中寻找符合特定格式的目标字符串

- 参数:
- 1. 正则
- 2. 可选 匹配模式 多个匹配模式用 | 分隔


  - Pattern.CASE_INSENSITIVE
  - 只对英文进行忽略大小写 i


  - Pattern.CASE_INSENSITIVE|Pattern.UNICODE_CASE
  - 对所有语言都进行忽略大小写
  (将忽略大小写从英文字母扩大到所有的unicode字符集)
  - 先设置CASE_INSENSITIVE 两个标识符都要加上


  - Pattern.MULTILINE
  - 多行 m
  - $符号只能匹配整个字符串的结尾
  - 设置了该模式后 会将整个字符串看做为多行 每一个换行符都会表示结尾
  <!-- 
    String str = "xyzla\nuvw2Brst3cpiq";
    String r = 
      str.replaceAll("(?m)\\w$", "*");

    // xyzla\nuvw2Brst3cpi*  a没有被替换成*
   -->


  - Pattern.DOTALL 
  - 标识符 s
  - . 在正则中可以匹配换行外的所有字符
  - 如果我们希望 . 也能够匹配换行符 就是设置
  <!-- 
    String str = "xyzla\nuvw2Brst3cpiq";
    String r = 
      str.replaceAll("(?s)a.", "*");

    // xyzl*uvw2Brst3cpiq
   -->


   - Pattern.COMMENTS
   - 标识符: x
   - 忽略*正则表达式中*的空白字符(不是忽略字符串中的空白字符)
   - 设置了该模式并不会忽略 \s 表达式哦

   <!-- 
    String str = "xyzlauvw2Brst3cpiq";
    String r = 
      str.replaceAll("(?x)a ", "*");

    // xyzl*uvw2Brst3cpiq
   -->


```java
Pattern pattern = Pattern.compile("\\d[abc]"); 
```

> 正则表达式对象.pattern()
- 获取 正则表达式中 包含的正则

- 返回 正则表达式
- 返回值:
- String

```java
String reg = pattern.pattern();
System.out.println(reg);
// \d[abc]
```

> 使用 pattern对象分割一个字符串
> pattern对象.split(被分隔字符串, [limt])
- pattern对象中封装了一个正则表达式
- 通过该对象.split() 方法 可以按照正则将字符串进行分隔

- 该方法不仅仅可以分隔String 也可以分隔StringBuffer 和 StringBuild 但是分隔的结果会统一保存在String[]

- 参数:
- 1. 正则
- 2. 把一个字符串最多可以分隔为几个部分

- 返回值:
- 字符数组

```java
Pattern pattern = Pattern.compile("\\d[abc]");

String str = "xyzlauvw2brst3cpiq";
String[] strings = pattern.split(str);

for (String string : strings) {
  System.out.println(string);
}

// xyzlauvw
// rst
// piq
```


> Pattern静态方法
> Pattern.matches(reg, str)
- 作用:
- 某个字符串是否能和正则表达式相匹配

- 参数1: 正则字符串
- 参数2: 字符串

- 返回值:
- boolean

```java
boolean matches = Pattern.matches("\\d[abc]", "3a");
System.out.println(matches);
```


> Pattern.quote(reg)
- 将传入的正则放在 \Q...\E 中
- 将正则放在了特殊字符失效区中 然后以字符串的形式返回

- 参数
- 字符串型的正则

- 返回值:
- String

```java
String quote = Pattern.quote("\\d[abc]");
System.out.println(quote);
// \Q\d[abc]\E
```

------

### Matcher
- 这个类就像一个智能机器人 手里拿着一个正则表达式 脚下是一个字符串 它拿着正则表达式在字符串上来回移动 寻找能够匹配的目标字符串 当机器人找到了目标字符串后 可以对目标字符串做很多的操作

- 机器人手里的正则:
- Pattern对象
<!-- 
  机器人手里的正则对象可以随时替换成别的正则对象
 -->

- 机器人脚下的字符串
- String StringBuffer StringBuild



> pattern对象.matcher("字符串")
- 创建 matcher 对象
- 也就是说 match对象里面 既有正则也有字符串喽？
<!-- 
  Matcher源码
  new Matcher(pattern, input)

  - 当我们通过 pattern.matcher(input) 方法创建matcher的时候 我们发现内部调用了Matcher的构造方法 并把正则 和 字符串传进去了

  - 所以我们将matcher形容为主要的部分 机器人 
  - 而机器人手里拿着正则和脚下的字符串
 -->

- 返回值:
- Matcher

```java
String str = "1a";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);
```


> matcher对象.pattern()
- 返回机器人手里的正则对象

- 返回值:
- Pattern

```java
Matcher matcher = pattern.matcher(str);

Pattern pattern1 = matcher.pattern();
System.out.println("pattern1: -- " +  pattern1);

// pattern1: -- \d\w
```

------

### Matcher的匹配方法
- 我们上面说了 机器人的功能很强大

> 字符串匹配方面的功能
> matcher.matches()
- 类型 test()
- 查看正则是否和字符串是否*整体*匹配
<!-- 
  不是局部
 -->

- 返回值
- boolean

```java
String str = "1a";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

boolean matches = matcher.matches();
System.out.println(matches);  // true
```


> matcher.lookingAt()
- 检查字符串是否以正则匹配的内容开头

- 返回值
- boolean

```java
String str = "1aadsfasdf";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

// 这里
boolean matches = matcher.lookingAt();
System.out.println(matches);
```


> matcher.find([int])
- 在字符串中检索能够与正则表达式相匹配的目标字符串
- 如果找到了目标字符串就返回 true
- 如果没有找到目标字符串就返回 false
- 匹配方向 从左到右

- 参数
- 开始搜索的位置 index 

- 返回值:
- boolean

- 这个方法只是标记是否找到


> matcher.group([int 组编号])
- 用于获取当前匹配项的内容
- 返回 match.find() 方法找到的当前匹配项

- 它必须是在执行了 find() matches() lookingAt() 用来完成匹配的方法后调用

- 直接调用group()的话 就会产生异常 no match found(当前匹配项不存在)
- 同时lastIndex已经为0了 再调用group()方法也是这个异常


> 参数
- 可选: 如果当前匹配项里面进行了分组 那么我们可以指定组编号获取到指定组的内容
- 如果我们传递参数0 就相当于无参 拿到当前匹配项的整体内容

- 如果我们给组起名字了 那么我们也可以传入字符串 获取组名对应的内容

 
> 返回值
- String

```java
String str = "1aadsfasd2fsd";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

if(matcher.find()) {
  String group = matcher.group();
  sout
}

if(matcher.matches()) {
  System.out.println(matcher.group());
}

if(matcher.lookingAt()) {
  System.out.println(matcher.group());
}

// 1a


--- 

// 获取当前匹配项中 分组的情况
String str = "1a";
// 对文本进行了分组
Pattern pattern = Pattern.compile("(\\d)(\\w)");

Matcher matcher = pattern.matcher(str);

// 提取指定组的内容
if(matcher.lookingAt()) {
  System.out.println(matcher.group(2));
}
```

- 上面我们只是找了一个 matcher.find() 方法的匹配项 那么多个匹配项怎么查找

- 用 while 我们只需要将 if -> while

```java
String str = "1aadsfasd2fsd";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

// 当没有匹配项的时候 终止循环
while (matcher.find()) {
  String group = matcher.group();
  System.out.println(group);
}

// 1a
// 2f
```


> matcher.start([int])
> matcher.end([int])
- 当前匹配项的起始 和 结束位置

- 参数:
- 传递 int 型的值
- 获得某一个组的起始位置
- 该参数跟组有关系 比如我们传递2
- 那就是找组2对应的字符的起始位置

- 返回值:
- int
- 1a2 找a 起始位置1 结束位置2


```java
String str = "1aadsfasd2fsd";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

while (matcher.find()) {
  System.out.println("当前匹配项: " + matcher.group());
  System.out.println("当前匹配项起始位置: " + matcher.start());
  System.out.println("当前匹配项结束位置: " + matcher.end());
}

/*
当前匹配项: 1a
当前匹配项起始位置: 0
当前匹配项结束位置: 2

当前匹配项: 2f
当前匹配项起始位置: 9
当前匹配项结束位置: 11
*/

while(matcher.find()) {
  System.out.println("当前匹配项:" + matcher.group());

  // 这里指定了 2
  System.out.println("当前匹配项中组2的起始位置:" + matcher.start(2));
}

/*
当前匹配项:1a
当前匹配项中组2的起始位置:1
*/
```


**注意:**
- 像 matches() lookingAt() 都会引起 matcher 的位置的变化 这个部分有些想 lastIndex
- 当我们调用这些方法的时候 指针也是往后走的


> matcher.reset()
- 将检索指针 回到最开始的位置 相当设置了 lastIndex = 0

```java
String str = "1aadsfasd2fsd";
Pattern pattern = Pattern.compile("\\d\\w");

Matcher matcher = pattern.matcher(str);

// 注意这里:
System.out.println(matcher.lookingAt())

// 回复指针的位置
matcher.reset()

while (matcher.find()) {
  System.out.println("当前匹配项: " + matcher.group());
  System.out.println("当前匹配项起始位置: " + matcher.start());
  System.out.println("当前匹配项结束位置: " + matcher.end());
}
```


> matcher.groupCount()
- 返回正则中编组的数量

- 返回值:
- int

```java
sout(matcher.groupCount());  // 2
```


> matcher.toMatchResult();
- 将找到的目标字符串的所有信息 封装到一个对象中

- 返回值:
- MatchResult

- 该对象中的方法
- result.group();
- result.end();
- result.start();

```java
while(matcher.find()) {
  MatchResult result = matcher.toMatchResult();
  System.out.println(result.group());
  System.out.println(result.end());
  System.out.println(result.start());
}
```


> matcher.hitEnd()
- 测试在字符串的末尾 增加新的字符的情况下 会不会改变原来的匹配结果

- 注意:
- 我们不仅要看 hitEnd() 的属性值 还要看有没有找到匹配项

- 情况:
- 1. hitEnd 返回的true 并成功找到了 匹配项
- 推定: 在字符串的末尾添加新的字符可能会改变原来的匹配结果
<!-- 
  在找到了 匹配项的情况下 并且hitEnd的返回值为true
  这种情况下 在末尾添加新的字符可能产生新的匹配项

  String str = "abc1234";
  Pattern pattern = Pattern.compile("\\d+");

  Matcher matcher = pattern.matcher(str);

  if(matcher.find()) {
    System.out.println(matcher.hitEnd()); 
    // true
  }

  什么叫可能产生新的匹配项
  我们上面发现 hitEnd()的返回值为 true 并且能找到匹配项 
  那么
  原先匹配结果为 1234
  新的匹配结果为 12345

  那如果 字符串是 abc1234a
  这种情况下就不会产生新的匹配项
 -->

- 2. 没有找到匹配项 同时 hitEnd 返回的是true 在字符串的末尾新增新的字符 会产生一个匹配项
<!-- 
  上面这句话翻译下就是
  原来在找不到匹配项的情况下 如果在字符串的末尾输入了字符 是能够产生一个匹配项的 但并不表示说一定会产生一个匹配项

  String str = "abc";
  // 正则是数字
  Pattern pattern = Pattern.compile("\\d+");

  Matcher matcher = pattern.matcher(str);

  // 那么肯定找不到匹配项
  if(matcher.find() == false) {
    System.out.println(matcher.hitEnd()); 
    // true
  }

  
  // 如果我们在字符串的末尾增加1234
  那么就会得到一个匹配项
 -->

- 3. 能够找到匹配项的前提下 hitEnd() 的返回值为false 那么在原有字符串的末尾新增字符 不会改变原有的匹配结果
<!-- 
  String str = "1234a";
  Pattern pattern = Pattern.compile("\\d+");

  Matcher matcher = pattern.matcher(str);

  if(matcher.find() == true) {
    System.out.println(matcher.hitEnd()); 
    // false
  }


  这种情况下 无论我们在字符串的末尾添加什么字符 都不会改变原有的匹配结果
 -->

- 4. 在找不到匹配项的情况下 hitEnd 的返回值为false 那么在原有字符串的末尾新增加字符 不会产生匹配项


- 返回值
- boolean

- 那是不是说 
- 匹配项在字符串末尾 hitEnd 会返回true
- 匹配项在字符串前部分 hitEnd 会返回false


> matcher.requireEnd()
- 表明在字符串末尾增加字符 是否会让正向的匹配 变成 负向的匹配

- 正向匹配 代表 匹配成功
- 负向匹配 代表 匹配失败

- 如果没有找到匹配项 返回值是什么意义的
- 就是在讨论requireEnd的值的时候 必须在先要找到匹配项的情况下 再去讨论requireEnd的返回值

- 情况:
- 1. 如果能够找到匹配项 并且 requireEnd返回true
- 这时候在字符串的末尾再增加新的字符 有可能会导致原来的匹配项丢失
<!-- 
  String str = "1234";

  // 找到一个或对个位于末尾的数字字符
  Pattern pattern = Pattern.compile("\\d+$");

  Matcher matcher = pattern.matcher(str);

  if(matcher.find() == true) {
    System.out.println(matcher.requireEnd());
    // true
  }

  我们能够找到这个匹配项 1234 这个就是位于字符串末尾的连续数字

  能找到匹配项 并且 requireEnd 的返回值为 true
 -->

- 2. 如果能够找到匹配项 并且 requireEnd返回false
- 这时候在字符串的末尾再增加新的字符 可能会导致匹配项的变化(有可能产生一个新的匹配项) 但原来的匹配项不会丢失
<!-- 
  String str = "1234";

  Pattern pattern = Pattern.compile("\\d+");

  Matcher matcher = pattern.matcher(str);

  if(matcher.find() == true) {
    System.out.println(matcher.requireEnd());
    // false
  }
 -->


- 返回值
- boolean

------

### Matcher的替换方法
- matcher对象不仅仅能在字符串中找到匹配项 还能将这些匹配项替换成某个字符串


> 游标位置
- matcher前面我们说了 它就是一个小机器人 它脚下有一个字符串 小机器人去搜索目标字符串 在搜索的过程中 机器人就会变换位置 不管机器人在哪里 它所在的位置就是游标位置 机器人在执行替换方法的时候 也会引起游标的变化(前面的匹配方法也会引起游标的变化)

- 一旦游标位置发生变化就会影响到下一次执行搜索或者替换操作的执行结果

- 很多人在执行替换方法后又执行搜索方法 那么结果可能会得不到预期

- 所以我们记得在合适的位置 调用 调整游标的位置
- matcher.reset()


> matcher.replaceFirst("替换成啥")
- 作用:
- 把字符串中第一个匹配项替换为参数指定的字符串

- 要点:
- 该方法的执行会影响到Matcher对象的游标位置

- 返回值:
- String 替换后的新的字符串

```java
String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

String s = matcher.replaceFirst("*");
System.out.println(s);    // a*b2c3
```


> matcher.replaceAll("替换成啥")
- 作用:
- 把字符串中所有匹配项替换为参数指定的字符串

- 要点:
- 该方法的执行会影响到Matcher对象的游标位置

- 返回值:
- String 替换后的新的字符串
```java
String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

String s = matcher.replaceAll("*");
System.out.println(s);    // a*b*c*
```


> matcher.appendReplacement(StringBuffer sb, String replacement);
- 我们从单词名上理解下
- append: 追加
- Replacement: 替换

- 作用:
- 在字符串中找到匹配项(匹配项为1) 然后将匹配项替换为指定的字符串* 最后将游标前面的所有内容(a*) 添加到 StringBuffer 中
<!-- 
  严谨的说法:
  - 把当前匹配项前面的 还没有添加过的那部分内容 以及当前匹配项被替换后的哪个字符串 统统添加到 sb 对象的末尾
 -->

- 1. a1b
- 2. \d -> *
- 3. a*
- 4. xxxa*

- 参数:
- 1. StringBuffer
- 2. 要替换成啥

```java
String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

// StringBuffer的初始值是 xxx
StringBuffer sb = new StringBuffer("xxx");

// 找到匹配项为前提
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
  System.out.println(sb);
  // xxxa*
}

--- 

String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

// StringBuffer的初始值是 xxx
StringBuffer sb = new StringBuffer("xxx");

if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 接着游标的位置开始找
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
  // 这次会找到2 - b* - 将b* 添加到sb的末尾
}
System.out.println(sb); // xxxa*b*

--- 

String str = "a1b2c3";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

// StringBuffer的初始值是 xxx
StringBuffer sb = new StringBuffer("xxx");

// 游标的位置动了 a1没有添加过
matcher.find();

// 再找就是b*
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 再找就是c*
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 将没有添加过的部分都添加到sb中
System.out.println(sb); // xxxa1b*c*
```


> matcher.appendTail(StringBuffer sb);
- 上面我们介绍了appendReplacement()方法 将处理过(替换后)的字符添加sb中 如果字符串中还有没处理过的部分 也想添加到sb中 我们就可以调用该方法

```java
String str = "a1b2c3yyy";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);

// StringBuffer的初始值是 xxx
StringBuffer sb = new StringBuffer("xxx");

// 游标到a1 
matcher.find();

// 游标到b2 -> b*
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}
// 游标到c3 -> c*
if(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 字符串中还有 yyy 我们把yyy也追加到 sb 中
matcher.appendTail(sb);

System.out.println(sb); // xxxa1b*c*yyy

--- 优化下代码

String str = "a1b2c3yyy";
Pattern pattern = Pattern.compile("\\d");

Matcher matcher = pattern.matcher(str);
StringBuffer sb = new StringBuffer("xxx");


// 游标到b2 -> b*
while(matcher.find()) {
  matcher.appendReplacement(sb, "*");
}

// 将剩余的部分 也追加到sb末尾
matcher.appendTail(sb);

System.out.println(sb); 
```

- 那是不是说我们可以利用
- appendReplacement()
- appendTail()

- 处理一个字符串中的局部 然后将整个字符串追加到一个sb中

- 优势:
- 我们可以选择性的替换局部(如果使用replaceAll那替换的就是所有)
```java
// 奇数出现的匹配项 用 * 替换后 追加到 sb中
String str = "a1b2c3yyy";
  Pattern pattern = Pattern.compile("\\d");
  Matcher matcher = pattern.matcher(str);
  StringBuffer sb = new StringBuffer("xxx");

  int i = 0;
  while(matcher.find()) {
    ++i;
    if (i % 2 != 0) {
      matcher.appendReplacement(sb, "*");
    }
  }

  -- while里还可以写成
  int i = 0;
  while(matcher.find()) {
    // 当找到匹配项后 执行++i
    if (++i % 2 == 1) {
      matcher.appendReplacement(sb, "*");
    }
  }

  matcher.appendTail(sb);
  System.out.println(sb);
```

------

### 设置 Matcher 搜索范围
- 之前我们一直把matcher比作是只能的机器人 机器人脚下有一个字符串 它在脚下的字符串中搜索能够与正则匹配的匹配项 

- 在默认情况下 机器人可以搜索整个的字符串 如果我们希望机器人只搜索字符串的一部分

- 这时候我们可以设置 region() 来显示机器人的搜索范围

> matcher.region(int start, int end)
- 设置 机器人的检索范围

- 参数:
- 1. 范围的开始
- 2. 范围的结束 不包括该位置
<!-- 
  matcher.region(4,9)
  0123456789
  0xxxa1b2c3yyy9
      ↑   ↑
          9的前面 范围其实是到这
 -->

```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");
// 默认会搜索整个的字符串
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

while(matcher.find()) {
  System.out.println(matcher.group());
  // 1 2
}
```

**注意:**
- 1. region()方法 对 replaceFirst() | replaceAll()不起作用

- 演示代码:
```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

System.out.println(matcher.replaceFirst("*"));
// *xxxa1b2c3yyy9

// 按理说我们设置了搜索范围 从a开始 那第一个数字字符应该是1啊 但我们发现我们替换的还是 0
```

- 之前不是说过 我们替换的时候 会找find()等方式的匹配项呢 那调用find() 肯定会改变游标的位置

- 为什么这两个替换的方法又重新回到开头去搜索了呢？
<!-- 
  我们看下两个替换方法的源码
  我们发现 源码中 第一行的位置 就调用了 reset()

  也就是说 上面就将搜索范围的设置 解除了
 -->

- 2. 同时上面说的 appendReplacement() appendReplacement() 也不会搜 region() 方法的限制


- 3. 当 region的开始的位置 和 find(指定位置) 冲突的时候
- region(4,10)
- find(0)
- 结果是以find(0)中指定的为准 同时会搜索到字符串的末尾 因为find(带参的时候) 也调用了reset() 所以会取消结束范围的设置

- 通常情况下我们都是使用region()设置搜索范围 然后使用没有参数的find()方法找到所有的匹配项 并处理

- 4. 0xxxa1b2c3yyy9 设置了 region(4, 10) 后 字符串的开头就是0 结尾就是3

- 5. 那当我们不想出现4中的效果怎么办 也就是还想让开头和结尾是正常的
> matcher.useAnchoringBounds(false);

> matcher.hasAnchoringBounds();
- 返回值
- boolean

- true:
- 将搜索范围的首尾字母当做字符串的开头和结尾了

- false
- 没有将搜索范围的首尾字母当做字符串的开头和结尾

```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

// 不会将搜索范围的首尾字母当做字符串的开头和结尾了
matcher.useAnchoringBounds(false);

// 查看是否以搜索范围的首尾字母当做字符串的开头和结尾了
boolean flag = matcher.hasAnchoringBounds();
sout(flag) // false
```

- 6. 设置了搜索范围后 搜索位置的开头就是指定字符了 这时候该开头的位置是空白字符么？ 是！ 仍然是
```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\ba");
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

// a就是搜索范围的开头了 那么开头的左边 系统会默认为有空白字符么?
sout(m.find())    // true 有
```

- 7. 如果不希望在设置搜索范围后 开头和结尾处 有空白字符的设定 那我们就调用如下的方法
> matcher.useTransparentBounds(true);
- 搜索范围的首尾字母前不再是空白字符的设置
```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");
Matcher matcher = pattern.matcher(str);

// 设置它的搜索范围
matcher.region(4,9);

// 搜索范围的首尾字母前不再是空白字符的设置
matcher.useTransparentBounds(true);
```

> matcher.hasTransparentBounds();
- 查看 搜索范围的首尾字母前后 系统是否认为有空白字符

- 返回值
- boolean

- false:
- 说明 当前系统会认为 搜索范围首位字母前后 有 空白字符

- true
- 说明 当前系统会认为 搜索范围首位字母前后 没有 空白字符

---

> matcher.regionStart()
> matcher.regionEnd()
- 在设置了搜索范围的前提下 获取 开始范围是多少

- 返回值 
- int

```java
// 设置它的搜索范围
matcher.region(4,9);
System.out.println(matcher.regionStart());
```


> matcher.reset()
- 当我们设置了搜索范围后 我们调用该方法 可以重置到机器人最初的状态(*解除搜索范围*)

------

### 重置 Matcher类对象
- 上面我们说了 matcher.reset()

- 该方法也可以有参数 有参数的reset()对象 不仅仅能将游标拉回起点 *还可以将机器人脚下的字符串彻底的换掉*

> 替换机器人手中的字符串
> matcher.reset("新字符串")
- 3种 string类型
```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");

// 机器人脚下的字符串是str
Matcher matcher = pattern.matcher(str);

// 如果调用有参数的reset() 可以替换机器人脚下的字符串
matcher.reset("abcdef");

// 替换了字符串后 我们看看正则还能找到东西么
System.out.println(matcher.find());  // false
```


> 替换机器人手中的正则
> matcher.usePattern(pattern2);
- 参数要传递一个正则对象

- 更换正则表达式后 并不影响游标的位置

```java
String str = "0xxxa1b2c3yyy9";
Pattern pattern = Pattern.compile("\\d");

// 机器人脚下的字符串是str
Matcher matcher = pattern.matcher(str);

// 定义一个新的正则对象
Pattern pattern2 = Pattern.compile("[abc]");
matcher.usePattern(pattern2);
```

------



### java学习路线
- java基础
  - javaweb
    - 常用框架技术
      - 微服务开发
        - 分布式高级
          - 项目实战

- 这个视频下方的链接里面 有完整的学习视频 
- https://www.bilibili.com/video/BV1Rq4y1G7WL?from=search&seid=12422859657765526209&spm_id_from=333.337.0.0

- 视频的学习路线
- https://www.bilibili.com/read/cv5216534?spm_id_from=333.788.b_636f6d6d656e74.7


- javascript 数据结构与算法
- https://www.bilibili.com/video/BV1x7411L7Q7?from=search&seid=12134091894926563791&spm_id_from=333.337.0.0

- java 数据结构与算法
- https://www.bilibili.com/video/BV1E4411H73v?from=search&seid=5591420206587441709&spm_id_from=333.337.0.0


- 1. java基础部分
  - 宋红康视频

  - mysql
  - 宋红康视频 只有基础部分
  - https://www.bilibili.com/video/BV1iq4y1u7vj?from=search&seid=5669396497179590778&spm_id_from=333.337.0.0

  - 李老师视频 基础部分和高级部分 比较全
  - https://www.bilibili.com/video/BV12b411K7Zu?from=search&seid=5669396497179590778&spm_id_from=333.337.0.0

  - jdbc
  - https://www.bilibili.com/video/BV1eJ411c7rf?spm_id_from=333.788.b_636f6d6d656e74.9

- 2. javaweb部分
  - https://www.bilibili.com/video/BV1Y7411K7zz

  - 在这个部分我们需要懂如下的核心
  - servlet
  - filter
  - listener
  - cookie&session原理
  

- 3. 常用框架
  - maven   怎么把项目搭建 架构出来 1天

  - spring5
  - https://www.bilibili.com/video/BV1Vf4y127N5 5天

  - springMVC 开发网页应用的
  - https://www.bilibili.com/video/BV1Ry4y1574R 3天

  - mybaits3  操作数据库的 4天 原理扩展等视频可以跳过
  - mybaits plus

  - ssm整合
  - https://www.bilibili.com/video/BV17W411g7zP

- 4. 微服务开发
  - linux
  - https://www.bilibili.com/video/BV11W411T7jR

  - redis6最新版
  - redis经典版
  - springBoot2 原理先不用听 我们要用起来后才知道原理 场景整合先不用管
  - https://www.bilibili.com/video/BV19K4y1L7MT
  <!-- 
    我们在学完常用创建之后做SSM整合项目的时候会很麻烦 要写一堆配置的东西
    springBoot2 可以帮我们完成这些配置的自动化 它是对常用框架的总结

    老师推荐好好听 花上10天的时间
   -->

  - springCould 只听入门
  - 尚筹网

- 5. 分布式高级(为了面试长见识)
  - git gitee github
  - zookeeper
  - docker
  - elasticSearch
  - 谷粒学院

- 6. 项目实战
  - 谷粒商城 大型分布式电商项目 40天

--- 上面是初学者25k应该掌握的东西 ---

- 1. 大数据 运维 前端了解
- 2. docker k8s云平台熟悉
- 3. 各种技术深入理解
- 4. 掌握多门语言更佳

----------------------------

### java版的hello world
- 1. 将 java 代码编写到扩展名为 .java 的文件中
- 2. 通过 javac 命令对象该文件进行编译

> 格式:
> javac Java文件名.后缀名
- 将文件编译为字节码文件
- 语法不对就会编译不通过
<!-- 
  javac demo.java
  .java文件会被编译成 字节码文件(.class文件)

  此命令在 java文件存放于根目录的时候有用
 -->

> java 字节码文件名(类名) -- 不要.class后缀
- 执行字节码文件


- 3. 通过 java 命令对生成的class文件进行运行
- 这里注意 我们使用 java 运行字节码文件的时候*不要加.class后缀*
<!-- 
  java Demo

  此命令在 java文件存放于根目录的时候有用
 -->

- 完整的步骤
```js
  class Demo {
    public static void main(String[] args) {
      System.out.println("Hello, world");
    }
  }

  javac demo.java
  java Demo     // 这里没有后缀名 .class
```  


**注意：**
> 1. classpath的问题
- 当我们使用 java Demo 去执行这个.class字节码文件的时候 可能会提示操作 找不到或无法加载主类 Demo

- 这可能是我们配置过classpath 我们可能在网上看过 除了配置path环境变量之外还要配置classpath

- 但是我们不用配置classpath
- classpath就是.class字节码文件的path 如果我们配置了classpath就意味着 我们输入java Demo 命令的时候 会去classpath里面找 而实际上我们的字节码文件可能在别的位置上 所以会报错

- 默认会在当前路径下找 .class 文件


> 2. java文件里面单词严格区别大小写


> 3. java文件里面执行语句后都要有分号
```js 
  System.out.println("Hello, world");
```

> 4. 一个源文件中是可以声明多个class类的 但是*最多只能有一个类可以被声明为 public 的*
- public 权限修饰符 用来修改这个类的权限大小

- 同时 
- public关键字 在修饰类的时候只能加在 *类名和java文件名同名的类前* 类名和原文件名必须相同
- 文件名为demo 那么 public 只能加在 demo类 前 

```java
// 我们的文件是 Demo
// public只能在家 demo 类前
public class demo { }
```


> 5. 程序的入口是main()方法  格式是固定的

```java 
  class Hello {
    // main()方法
    public static void main(String[] args) {

    }
  }
```


> 6. 输出语句
> System.out.println("")

- 该语法会在语句输出后 换行  先输出后换行
```java 
  System.out.println()    // 里面什么也不写的话 就是代表换行
```

> System.out.print("")
- 该语法不会换行


> System.currentTimeMillis()
- 返回值:
- long型 的毫秒数

- 跟 console.time 一样可以用来测试程序的性能

```java 
  long start = System.currentTimeMillis();
```

> 7. 每一条执行语句都以分号结尾
- 技巧:
- 从右往左看 除了 } 结尾的 剩下的都要以分号结尾

---

> 编译过程
- 编译以后 会生成一个或多个字节码文件 有几个类就会有几个字节码文件 
- *内部类也会生成字节码文件*

- 字节码文件的文件名与java原文件中的类名相同

---

> java特性
- 面向对象性：

  两个要素: 类 对象

  三个特征: 封装 继承 多态

- 健壮性:
- 去除了c语言中的指针 有了自动的垃圾回收机制

- 跨平台性
- 功劳归功于 jvm 我们现在使用的虚拟机是 hotspot

----------------------------

### 注释
- 用于注解说明解释程序的文字就是注释
- java中的注释类型

> 单行注释  //

> 多行注释  /* */

> 文档注释(java特有)
- 语法：
  /**

  */

- 注释内容可以被JDK提供的工具 javadoc 所解析 生成一套以网页文件形式体现的该程序的说明文档

> 要点
- 1. javadoc 解析的类 类前要加上 public
- 2. javadoc 只能解析 文档注释标记起来的内容
<!-- 
  /** 
    文档注释
    @author: sam
    @version: v1.0
    
    这是我的第一个程序
  */
  public class Demo { ... }
 -->


> 文档注释执行命令
- javac -d 文件名字 -author -version 文件名.java
- 生成的文件夹会在当前目录
- -author -version对应着@author @version


> 当我们使用 文档注释给方法添加指明参数的含义的时候
- 在调用方法的时候 就会有入参提示

----------------------------

### 关键字 和 保留字

> 关键字
- 定义:
- 被java语言赋予了特殊的含义 用作专门用途的字符串

- 特点
- 关键字中所有字母都为小写

- 网址
- https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keyword.html

<!-- 
  用于定义数据类型的关键字

    class     interface     enum      byte      short
    int       long          float     double   char
    boolean   void



  用于定义流程控制的关键字

    if      else    switch    case    default
    while   do      for       break   continue
    return



  用于定义访问权限修饰符的关键字

    private   protected   public



  用于定义类 函数 变量修饰符的关键字

    abstract    final   static    synchronized


  
  用于定义类与类之间关系的关键字

    extends   implements


  
  用于定义建立实例及引用实例 判断实例的关键字

    new     this      super     instanceof



  用于包的关键字

    package   import



  其他修饰符关键字

    native    strictfp    transjent   volatile    assert



  用于定义数据类型值的字面值    下面的三个不算关键字 但还可以当做关注字

    true    false   null
 -->


> 保留字
- 现有java版本尚未使用 但以后版本可能会作为关键字使用 自己命名标识符时要避免使用这些保留字
<!-- goto const 等 -->

----------------------------

### 标识符
- java对各种变量 方法 和 类等要素命名时使用的 字符序列(单词) 被称为标识符
- 总的来说 *凡是自己可以起名字的地方都叫做标识符*


> 定义合法标识符规则
- 1. 26个英文字母大小写 0-9 _ $ 组成
- 2. 数字不可以开头
- 3. 不可以使用关键字和保留字 但能包含关键字和保留字
- 4. java中严格区分大小写 长度无限制
- 5. 标识符不能包含空格


> 命名规范
- 包名
- 多单词组成时所有字母都小写 *xxxyyyzzz*

- 类名 接口名 大驼峰
- 多单词组成时 第一个单词首字母小写 第二个单词开始每个单词首字母大写 *XxxYyyZzz*

- 变量名 方法名 小驼峰
- 多单词组成时 第一个单词首字母小写 第二个单词开始每个单词首字母大写 *xxxYyyZzz*

- 常量名
- 所有字母都大写，多单词时每个单词用下划线连接 *XXX_YYY_ZZZ*

**注意：**
- 如果不遵守如上的规则 编译可以通过 编译能通过 运行也没有问题 但建议遵守
 
----------------------------

### 变量

> 变量的概念
- 内存中的一个存储区域
- 该区域的数据可以在**同一类型范围内**不断变化, *只能在同类型的值之间进行相互的赋值*

- 变量是程序中最基本的存储单元 包含变量类型 变量名 存储的值 3个部分


> 变量的作用
- 用在内存中保存数据 数据是保存在内存中的


> 使用变量的注意
- 1. java中每个变量必须**先声明 后使用**
- 2. 使用变量名来访问这块区域的数据

- 3. 变量的作用域：
- 其定义所在的一对{ }内

- 4. 变量只有在其作用域内才有效
- 5. 同一个作用域内 不能定义重名的变量


> 数据类型 变量名 = 变量值
- java定义变量的格式

```java

public class Demo {

  public static void main(String[] args) {
    // 整型
    int myNum = 666;
      
    // 或者还可以这么写
    int myAge;
    myAge = 18;
  }
}
```

**注意：**
- 1. 变量必须要赋初始值
- 2. 变量必须先声明后使用 注意书写顺序
- 3. 变量有作用域 在作用域内有效
- 4. 同一个作用域内 不能声明同名变量

- 如下: 编译时报错
```java 
  int myAge;
  // 错误: 可能尚未初始化变量myAge
  System.out.println(myAge);    
```


> 变量的类型 --- 按照类型区分
- 数据类型分为两类

> 1. 基本数据类型
  - 数值型
    - 整数类型(byte, short, int, long)
    <!-- 存储空间是从小到大来的 -->

    - 浮点类型(float, double)

  - 字符型(char)
  - 布尔型(boolean)


> 2. 引用数据类型
  - 类(class) :java里字符串String是一个 类 的类型 也就是引用类型
  - 接口(interface)
  - 数组([])


> 变量的类型 --- 按照在类中声明的位置区分(面向对象的时候会详细讲)
- 成员变量
- 局部变量 -- 局部变量必须初始化

- 补充知识：
- 成员变量: 在*方法体外 类体内* 声明的变量
- 局部变量: 在*方法体内* 声明的变量

<!--          
                      实例变量 -- 不以static修饰
            成员变量
                      类变量   -- 以static修饰
  所有变量

                      形参(方法 构造器中定义的变量)
            局部变量   方法局部变量 (在方法内定义)   
                      代码块局部变量 (在代码块内定义)
 -->

- 注意：
- 两者在初始化*值方面的异同*

- 同：都有生命周期
- 异：局部变量除形参外 需显示初始化

---

> 基本数据类型的使用 -- 整型
- 表示整数的 正负都可以 
- java中定义了4种整型 区别就是它们占用的空间不一样

- java各整数类型有固定的 *表数范围* 和 *字段长度* 
- 不受具体os(操作系统)的影响 以保证java程序的可移植性

- *java的整型常量默认为int型*


> long型要点：
- *声明long型常量必须加  l 或 L*
- 在使用long型的时候 必须以小写l 或者 大写L结尾

```java
  long num = 345223L;    // 输出结果不会带有L
```

**注意:**
- 在定义long型的时候, 如果我们没有在值的末尾添加L 相当于我们赋值了一个int的值 然后通过自动提升转换为long型


- java程序中变量通常声明为int 除非不足以表示较大的数 才用long

---

> 四种整数类型：
- 我们是按照有符号位计算 

- 类型        占用存储空间      表数范围
- byte        1字节=8bit位    -128 ~ 127
- short       2字节           -2^15 ~ 2^15-1  -- *32768*
- int         4字节           -2^31 ~ 2^31-1(约21亿)
- long        8字节           -2^63 ~ 2^63-1


> byte -- 字节：
- 从存储上讲是最小的单位 
- 1字节=8bit 
- 一个bit 是 存0 或者 存1 两种情况
- 一共8个 所以byte一共有多少种组合方式 2^8=256 

- 所以一个byte能表示256个数 0~255，
- 但是这么表示就没有负数了 所以就是-128~127 加起来就是256


> short:
- 是2个字节
<!-- 
  它是byte的两倍 也就是 2^16 
  那我们也分一半 就变成了 -2^15 ~ 2^15-1  因为还有一个0
 -->

> int   
- 是 short 的2倍
- 4个字节

> long  
- 是 int 的2倍
- 8个字节

```java 
  byte b1 = 12;
  byte b2 = -128;
  // b2 = 128;     编译不通过 超出范围了 -128 ~ 127

  // 声明long型变量 必须以"l" or "L"结尾
  long b3 = 234234234L;     // 234234234

  System.out.println(b1);
  System.out.println(b2);
  System.out.println(b3);
```

----------------

> 基本数据类型的使用 -- 浮点型
- 通俗的讲就是带有小数点, 也就是浮点型必须有小数点
- 与整数类型类似 java浮点类型也有固定的表数范围和字段长度 不受具体操作系统的影响

- 浮点型常量有两种表示形式

- 十进制数形式: 
    - 5.12    512.0f    .512(必须有小数点)

- 科学计数法形式:
    - 5.12e2  512E2   100E-2


> float:  
- 单精度 尾数可以精确到*7位有效数字* 很多情况下精度很难满足需求
<!-- 
  float存储数据量不仅少 精度也有限
  float表示数值的范围比long还大
 -->


> double: 
- 双精度 精度是float的两倍 也就是可以保留14位小数 通常采用此类型
<!-- 
  double存储数据量不仅多 精度也高
 -->

- 通常定义浮点型变量时 使用 double型
- 声明 float型 常量 结尾必须加 "f" 或 "F"


- 类型            占用存储空间         表数范围
- 单精度 float     4字节            -3.403E38 ~ 3.403E38
- 双精度 double    8字节            -1.798E308 ~ 1.798E308

- 这里的E指的是10 - E38 -> 10^38

```java 
  double b4 = 11.03;

  // 定义float型时  变量要以 F 结尾
  float d5 = 12.4F;
```

----------------

> 基本数据类型的使用 -- char 字符类型(只能声明一个字符)
- char型数据用来表示通常意义上的 1字符(2字节)
- 用处：
- 声明一个字符

- 1个字符 = 2个字节
- char型会占用16个bit

- 通过 char型 定义的变量 只能定义一个字符

```java 
  char c1 = 'a'

  // 这里不能写两个 因为这相当于两个字符
  c1 = 'AB'   
```

- 比如我们要是想定义 “张三” 这时候就不能使用char型 而是要使用字符串型
- java中的所有字符都使用unicode编码 *故一个字符可以存储一个字母 一个汉字或者其它书面语的一个字符* 

- 因为是unicode编码所以每一个字符都会对应一个数字

- 字符型 变量的三种表现形式


> char 变量 = '单个字符'
- 单引号('')括起来的单个字符 但是内部有且只能放一个 少了多了都不行 
- *char型里面必须要有值 为空报错*

```java 
  char a = '';     // 报错
  char a = ' ';    // 这可以
```

- 比如：
  char c1 = 'a';
  char c2 = '中';
  char c3 = '9';

- java中还允许使用转义字符 “\” 来将其后的字符转变为特殊字符型变量

- 例如
```java
  char c4 = '\n';    \n表示换行符 \t制表符
```

- 我们还可以直接使用 Unicode 值来表示字符型常量
- 比如

  char c5 = '\u0043'
  代表一个十六进制整数 底层输出一个数的时候 也对应一个字符

**char类型是可以进行运算的 因为它都对应有 Unicode 码**

**注意：**
- 命令行默认是使用系统的编码格式解析的 比如我们中国电脑的系统默认格式为gbk
- 当我们将编码格式改为utf-8的时候 打印中文的时候可能会出现乱码
- 我们要保证 写入 和 读取 时候的字符集是同一个

----------------

> 基本数据类型的使用 -- 布尔型
- 布尔型只能有两个值

  boolean b1 = true;

- 我们常常在条件判断 循环结构中使用

```java 
  boolean b1 = true
  if(b1) {
    System.out.println("你就不能参\'单身派对\'了")
  } else {
    System.out.println("你有女朋友了")
  }
```

**注意:**
- 我们在用js的时候 经常会写如下的逻辑
- 定义一个布尔型的变量 用于控制输出 还会利用 ! 等符号来进行bool类型之间的转换
- 1. 下面的情况是可以的
```java
boolean flag = true;
if(!flag) System.out.println("我会不会输出");
```

- 2. java是强类型语言 只有同类型之间数据之间才能相互赋值
- 既然连赋值都会报错 所以更谈不上 下面还想通过 ! 来进行转换了
```java
// 报错 因为我们定义的是bool类型 但是我们赋值了一个字符串
boolean flag = "";
if(!flag) System.out.println("我会不会输出");


// 报错 因为我们定义的是bool类型 但是我们赋值了一个null
boolean flag = null;
if(!flag) System.out.println("我会不会输出");


// 这里可以
Object flag = null;
// !flag这里会报错 因为 ! 只能用在boolean类型上面
if(!flag) System.out.println("我会不会输出");
```

- 所以 我们只能通过 这样的形式 判断是否为null if(flag == null)

----------------------------

### 输出变量的类型
- js中常常都会有 typeof 方法 用于监测这个变量的数据类型
- java中是通过 获取实例对象后调用 getClass() 方法查看该实例对象的父类

**注意:**
- 基本数据类型没有属性和方法 要是想调用 getClass() 要通过其包装类来完成逻辑

```java
public void showType(Object o) {
  System.out.println(o.getClass().getName())
}
```

- 示例：
```java
public void test1() {
  Integer integer = new Integer(10);
  System.out.println(integer.getClass());
     // class java.lang.Integer

  System.out.println(integer.getClass().getName());
    // java.lang.Integer
}
```

----------------------------

### 基本数据类型转换
- 我们下面说的运算包括 运算 和 赋值
- 也就是说赋值也是运算的一种情况

> 自动类型提升:
- 容量小的类型 自动转换为 容量大的数据类型
- 数据类型按容量大小排序为

```java 
  byte
  char    -- int -- long -- float -- double
  short
```

**注意:**
- byte, char, short 相互之间做运算的话 结果的类型都应该取 int
- 那是不是说只要是这三种类型参与运算 结果都是 int 呢

```java
byte b1 = 10;
short s1 = 20;

// 报错 提示需要定义int行的变量来接收结果
short res = b1 + s1;
```


> 定义：
- 有多种类型的数据混合运算时 *系统首先自动将所有数据转换成容量最大的那种数据类型 然后在进行计算*

- 当表数范围小 和 表数范围大 的变量进行运算的时候 结果自动提升为表数范围大的类型(比如一个byte 一个int 那么计算结果要取int 或 以上)


- 表数范围小: byte 一个字节 8bit
  表数范围大: int  四个字节 32bit

  当它们进行运算的时候 结果 的类型就是int 因为类型会自动提升到 表数范围大的类型上

```java  
  byte b1 = 2;
  int i1 = 13;

  // 计算结果为int型的res
  int res = b1 + i1;
  System.out.println(res);  // 15

  // 也就是 在取两个类型结果的时候 我们要定义什么类型去接收这个结果(res)
  // 我们也可以定义 long 来接收
  long res = b1 + i1;     // 15

  // 我们也可以定义 float 来接收
  float res = b1 + i1;    // 15.0  结果会补个0
```

- 一个表数范围小的类型 赋值给 表数范围大的类型 也没有问题
```java 
  short num = 1;
  double number = num;
```

- 说明
- *此时的容量大指的是 表示数的范围的大和小* 不是指占用的内存空间 比如 float容量要大于long容量
- 所以我们看的是这个类型占了几个字节

----------------

> char型运算
- char型时可以做运算的 

```java 
  // char型的变量 对应着 unicode 码
  char str = 'a';  // 97
  int num = 8;

  int res = str + num;
  System.out.println(res);      // 105


  char str = 'A';
  System.out.println(str + 0);  // 65
```


> 总结
- boolean 不能与其它类型进行运算 因为它只有true 和 false
<!-- 
  java中
  true 就是 true 
  false 就是 false 

  不能像js那样 0 1
  所以下面中 我们所提到的 自动类型提升 不包括 布尔型

  byte short int long 可以做运算因为它们是数值
  char 能做运算 
    因为它的unicode对应着一个编码 比如 a 对应 97 97可以做运算
 -->
      

**注意:**
- 1. 自动类型提升 不包括 布尔型
- 2. byte short char 之间不会相互转换 他们三者在计算时首先转换为int类型
<!-- 
  byte    ↘
  short     →   int
  char    ↗
 -->

**boolean类型不能与其它数据类型运算 结果就是拼串**
- 当把任何基本数据类型的值 和 字符串(String)进行连接运算时(+) 基本数据类型的值将自动转化为字符串(String)类型

**注意:**
- boolean类型不可以转换为其它的数据类型

----------------

> 强制类型转换
- 强制类型转换是自动类型提升的逆运算，将 容量大的数据类型 转换为 容量小的数据类型
<!-- 
  正常来说两个基本类型变量间运算的时候 
  容量小的会自动提升为容量大的数据类型

  但是我们有的时候就希望
  运算后的结果的类型是容量小的那个类型
 -->

- 场景：
- 比如数据库中会存放很多的表 有一张用户的表中的数据有10万条 
- 我们使sql查询这个表有多少条记录 它会返回一个值 默认情况下 我们查询这个表的数据有多少 它会返回一个long型的结果(它怕int装不下)

- 但是我们在java里面就想拿int去接收这个数 这时候就需要将long型强制转换为int型 这时候我们就需要使用*强转符*

----------------

> 强制转换符: ()
> 使用方式: 使用指定的类型接收 变量 = (指定要转成哪种类型)变量

```java
// 目标 我们定义一个double类型的变量 就用int来接收
double num = 12.3;

// 使用强转符 内部指定要强制转换为什么类型
int number = (int)num;

// 我们使用的是int来接收 int是整型 所以是12 即使num是12.9 接收后也是12
System.out.println(number);    // 12
    - 这种现象叫做截断
```

> 思考: 
```java
// 还有一种情况 下面这种情况也算精度损失 至于为什么是-128等到2进制的时候我们再来看
int i = 128;
byte b = (byte)i

System.out.println(b)   // -128

// 127 1111 1111
// 128 1 0000 0000
```


> 损失精度
```java
double num = 12.3;
int number = (int)num;  // 12
```
- 上面我们能看到本身这个数据是12.3但是转换后精度降低变成12了 这种现象叫做损失精度


> 扩展:
- 通常 字符串不能直接转换为基本类型 但通过基本类型对应的包装类则可以实现把字符串转换为基本类型
<!-- 
  String a = "43"; 
  int i = Integet.parseInt(a);
 -->


> 变量运算规则的两种特殊情况 

> long值不加L
- 1. 上面说了定义 long型 变量的时候 数值的后面要加上L
- 但是有的时候 我们在编译 long型 变量的时候 后面不加L 能编译也不报错

```java
long i = 123333;
```
- 结尾没加L 这是这个123333就会被认为是 int 型
- int型赋值给long 相当于自动类型提升了

- 当 123333这个部分要是超出int的表数范围就会报错 这时候我们就要加上L
- int是4个字节 long是8个字节



- *float型一定要加F 不然编译都会不通过*
- 因为: 
- 浮点型的数值默认是double类型
- 整型的数值默认是int类型

```java
float f = 12.3; 
  // 这里不加F的话 12.3会默认为double 这时double转为float就会报错了
  // 上面是 int 转为 long 属于自动提升
```


> 常量数值的默认是int型  单独的一个数字就认为是常量
- 2. 我们看下下面的情况

```java
// 定义一个byte
byte num = 12;
byte res = num + 1    // 报错
```
- 我们定义了一个byte 然后让它 + 1  然后我们试着用byte型变量去接收 就会提示错误

- 上面的1我们看做是一个常量 不像是变量可以不断的变化值 对于整型的常量来将默认的是int型


> 总结:
- 1. 对于整型*常量*    *默认为 int 型*
- 2. 对于浮点型*常量*  *默认为 double 型*

----------------------------

### String 引用类型的变量(字符串类型)
- *String*不是基本数据类型 *属于引用数据类型*
- String定义的数值使用 "" 包裹 不是单引号 这里要跟char型区分开
<!-- 
  我的天啊 在js里 字符串是基本数据类型 但是这里竟然是引用数据类型
 -->


> 使用方式:
- String 变量 = “值”
- 使用方式 与 基本数据类型一致

```java
  // 下面的情况都可以
  String str = "hello";
  String str = "a";
  String str = "";

  System.out.println(str);
  System.out.println("hello");    // 这里相当于输出的是一个常量
```

----------------

> String 和 8种基本数据类型 之间的运算 - 拼串
- String可以和8种基本数据类型做运算(包括 boolean) 且运算只能是 + (连接运算 拼串)

- 相当于跟其它类型的结果拼接成字符串(拼接的结果的类型也是 String )

```java
  String str = "学号";
  int num = 1001;

  // 只能是连接运算 同时接受变量的类型也是 String
  String info = str + num;

  System.out.println(info);
```

- 我们在程序中怎么判断+是字符串的连接还是 运算的+ 
- 我们就看 + 的前后有没有String


> 练习
- 要点: 
- char型做运算的时候会对应 ASCII码 所以会是正常的数字
- 也就是说 '' 就代表了char型

```java 
  // 终端输出 * *
  System.out.println("* *");              // * *

  // 如果使用单引号输出* 没什么好说的
  System.out.println('*');  // *

  // 但是如果单引号的* 进行了运算 那么结果会是数字
  System.out.println('*' + 1);  // 43  因为*的ASC码对应着42

  System.out.println('*' + '\t' + '*');   // 93  char对应ASCII码 会做运算
  System.out.println('*' + "\t" + '*');   // * *  
  System.out.println('*' + ('\t' + "*")); // * *
  System.out.println('*' + '\t' + "*");   // 51*
```


- 判断
- 要点
- 3.5f float数值最后的f 只是用作于标识 实际结果 和 运算都是没有f的情况下进行的

- 在做字符串拼接的时候 f也是没有的

```java
String str1 = 4           // 编译报错
String str2 = 3.5f + ""   // "3.5"
```

----------------------------

### 不同进制表示的方式
- 所有数字在计算机底层都以 二进制 形式存在

- java整数常量默认是int类型

- 二进制默认占64位 第64位是符号位
<!-- 
  int型是4字节
  1字节是8位 int型的总长度就是32位

  二进制默认为64位 相当于两个int 一个long
 -->

- 二进制的整数有如下的三种形式


> 原码
- 直接将一个数值 换成二进制数 最高位是符号位
<!-- 
  符号位
  ↓
  0000 0000 0000 0000 0000 0000 0000 0000
  0000 0000 0000 0000 0000 0000 0000 0000
 -->


> 负数的反码
- 是对原码按位取反 只是最高位(符号位)确定为1
<!-- 
  符号位
  ↓
  1111 1111 1111 1111 1111 1111 1111 1111
  1111 1111 1111 1111 1111 1111 1111 1111
 -->


> 负数的补码
- 反码加1


**总结**
- 计算机以二进制补码的形式保存所有的整数
- 正数的原码 反码 补码都相同
- 负数的补码是反码+1
- 正数的补码是其本身

- 负数在计算即底层使用正数的补码保存的 没办法通过输出的 或者计算器查看一个正数的负数

----------------

> 对于整数 有四种表示方式
- 1. 二进制(binary): 0, 1
    满2进1， 以0b 或 0B 开头

- 2. 十进制(decimal): 0-9
    满10进1

- 3. 八进制(octal): 0-7
    满8进1 以数字0开头表示

- 4. 十六进制(hex): 0-9 and A-F
    满16进1 以0x或0X开头表示
    此处的A-F不区分大小写 如: 0x21AF + 1 = 0X21B0

```java
  // 打印结果都是10进制
  int num1 = 0b110;     // 0b开头  是2进制    6
  int num2 = 110;       //                  110
  int num3 = 0127;      // 0开头   是8进制    87
  int num4 = 0x110A;    // 0x开头  是16进制   4362

  System.out.println("num1 = " + num1);
  System.out.println("num2 = " + num2);
  System.out.println("num3 = " + num3);
  System.out.println("num4 = " + num4);
```

----------------

> 符号位
- 一个2进制的数的最高位(最左侧的位数) 称之为符号位
- byte的最高位就是 从右往左 第8位
- int的最高位就是 从右往左 第32位

- 该符号位 如果是0 就表示正数
- 该符号位 如果是1 就表示负数
<!-- 
  // 1byte
  0 0 0 0  1 1 1 0   // 正数
  1 0 0 0  1 1 1 0   // 负数
 -->

- 一个正整数的负数 要经过 反码 + 确定符号位 + 1 一系列的操作
  00001110  - 原码
  11110001  - 反码
  11110010  - 补码

- -14在顶层就是使用补码的形式 存储的

> 扩展
- 输出一个数字的二进制
```java
BigInteger num = new BigInteger("14")
System.out.println(num.toString(2));
```

----------------

> 2进制 -> 10进制
- 正数的原码 补码 反码是一样的 叫做三码合一
- 所以 一个正数的二进制数 你叫做原码 补码 反码都可以

- 演示：
<!-- 
    我们定义一个byte

    --- --- --- --- --- --- --- --- 
    0   0   0   0   0   1   1   0       = 6

    从右往左看 第一位是第0位 第二位是第1位
 -->

----------------

> 正数的 2进制转为10进制的 技巧：
- 2进制1000 = 8
- 每一位就是 2^几次幂 比如第0位就是 2^0
- 然后我们看看当前位是0 还是 1 (最右边是0位开始)
- 如果是1 就是 1*2^0
- 如果是0 就是 0*2^0

- 最后我们进行累加
<!-- 
  1000
  2^3*1 + 2^2*0 + 2^1*0 + 2^0*0 = 8
 -->

- 那1110是多少? 
- 1110 = 1*2^3 + 1*2^2 + 1*2^1 + 0*2^0 = 14(10进制的14)
<!-- 
  // 我们还可以看下1101110是多少  -- 110
  0 1 1 0 1 1 1 0
 -->

----------------

> 二进制中的负数
- 我们拿到负数的时候 首先要关心我们拿到的是 负数的原码? 负数的反码? 还是 负数的补码?

- 负数的原码:
- 将正数的最高位改成1 就是该负数的原码
<!-- 
  00001110 是正数 上面我们计算的结果是 14
  10001110 是负数 我们可以叫他 -14 的原码
 -->

- 反码
- 我们拿到了负数的原码后 除了符号位 各个位取反 结果就是反码
<!-- 
  00001110    正数 14
  10001110    负数 -14 的原码

  11110001    负数 -14 的反码
 -->

- 补码
- 我们拿到了反码 在反码的基础上加1
<!-- 不是每一位+1 就是最右侧的位数加1 -->
<!-- 
  11110001  负数-14的反码

  11110001 + 1 
  11110010  负数-14的补码
 -->

- *计算机的底层都以补码的方式存储数据* 不管是正数还是负数
- 正数的补码就是自己
- 负数的补码 需要反码+1

- 为了得到补码才需要原码和反码 之后就可以不要它们了

<!-- 
  10111011 这是10进制的几？
  首先这一定是补码 默认就是补码 其它两码没有用

  10111011 - 1 = 10111010(反码) = 11000101(原码) = 69

  ---

  正127 byte类型最大8bit 01111111

  +127  01111111
  -127  11111111  原码
  -127  10000000  反码
  -127  10000001  补码  底层-127 就是这样

  -128长啥样
  10000001 - 1 = 10000000 底层-128
 -->

- 上面我们接触过一个案例 我们将int类型的数据 强制转换为 byte类型的数据的时候 会发现原来的128 竟然变成了 -128 这是为什么?
<!-- 
  int i = 128;
  byte b = (byte)i;

  System.out.println(b)   // -128


  int是32位的 我们强制转换为byte后就剩 1000 0000了 然后这个输出后就是-128
  1000 0000在int里面1不是符号位 而转换为byte后就变成符号位了
 -->

----------------------------

### 10进制如何转为2进制
- 技巧:
- 除2取余的逆
- 这个数除以2得到的商继续除以2 看余数的部分

- 案例
- 13的2进制是多少？
<!-- 
  13 / 2 = 商6余1
  商6 / 2 = 商3余0
  商3 / 2 = 商1余1
  商1 / 2 = 商0余1    
      一个数除以另一个数,要是比另一个数小的话,商为0,余数就是它自己。
  商0 / 2 = 商0余0    从下往上看 0不算 取逆 1101
 -->

- 总结：
- 这个数除以2 看余数商继续除以2 递归 结果从下往上看 就是 2进制


> 那2 8 10 16进制之间怎么转换？
- 进制的基本转换

----------------

> 十进制 二进制互转
- 二进制转成十进制 乘以2的基数
- 十进制转成二进制 除以2取余数

----------------

> 二进制 和 八进制 十六进制
- 因为八进制恰好是二进制的三次幂 十六进制是二进制的四次幂
- 所以

> 2进制 -> 8 16进制
<!-- 
  000 000 011 101 001

          3    5    1

  八进制就是0351
  因为8是2的3次幂 所以我们将2进制中每3位算出一个数字


  十六进制就是每4位算出一个数字
  1110 1001
     E    9

  十六进制就是 0xE9
-->

----------------

> 8 16进制 -> 2进制
- 08进制就拿出每一位数字 拆成3位 01组成的
- 16进制就拿出每一位数字 拆成4位 01组成的


- 思路
- 上面我们了解了 二进制和十进制之间的转换 那我们再知道二进制和八进制 和 十六进制之间如何转换
- 我们再在这几个进制之间转换的时候 就可以通过二进制过渡下再得到结果 

----------------------------

### 运算符
- 运算符是一种特殊的符号 用以表示数据的运算 赋值 和 比较等
- 1. 算术运算符
- 2. 赋值运算符
- 3. 比较运算符 或者叫 关系运算符
- 4. 逻辑运算符
- 5. 位运算符(开发的时候用的比较少)
- 6. 三元运算符


### 算术运算符
- 这个部分很常见 我们下面先拿除法来举例子

> 除法
- 12 / 5  --- 除法简单说理解就是将一个数分成几份

- 要点:
- 1. int型在除不尽的时候 *小数部分会省略*

```java
int num1 = 12;
int num2 = 5;

int res = num1 / num2;          // 2
int res = num1 / num2 * num2;   // 10
```
  
- 2. 思考：
  - 12 / 5 我们就想得到比较精确地结果应该怎么做？

  - 方法1:
  - 我们定义一个double型 接收 两个int型的结果可以么? -- 不行！！
  - 因为num1 / num2先是int的结果已经是2了 然后赋值给double 所以是2.0
    double res = 12 / 5;     // 2.0


  - 方法2:
  - 既然优先右侧的运算 那么我们就在重点放在右侧的运算上 在右侧将一个数值转为double类型
  - 先利用 + 将num2的结果转为浮点型结果 然后num1 与 浮点型进行运算结果会类型提升到double型
    double res = 12 / (5 + 0.0);
    System.out.println(res);


  - 方法3:
  - 利用强制类型转换 得到我们想要得结果
  - 转换哪边都没有关系
  - double res = (double)num1 / num2;

----------------

> 取模 %
- 结论:
- 结果的符号(是+ 还是-) 跟被模数(n % m, n就是被模数)的符号相同

```java 
  int m = -12
  int n = 5

  int res = m % n     // -2
  int res = n % m     // 5
```

**技巧**
- a % b 的结果是 0 到 b - 1
- 比如 12 % 5 结果不会超过5 为 0 到 4
<!-- 
  a % 1 的结果肯定是0 
  1. 因为不可能超过1 
  2. 任何数/1都会除尽
 -->

----------------

> ++n, 先运算后取值  - 先自增1 然后再运算
> n++, 先取值后运算  - 先运算  然后再自增1
- 不管是++n 还是 n++ 都表示变量自增1
- 区别是 它们在涉及到运算的时候 是先自增 还是先运算

**注意： 自增1 不会改变它原本变量的数据类型**

```java 
  int a = 10;
  int b = ++a;
  System.out.println("a = " + a + ", b = " + b);     // 11 11

  int a1 = 10;
  int b1 = a1++;
  System.out.println("a1 = " + a1 + ", b1 = " + b1); // 11 10

-----

  对于a来讲 不管是++n 还是n++ 都是自增1

-----

  int a = 10;
  a++;  or  ++a;    这里都自增1了
  int b = a;
  System.out.println("a = " + a + "b = " + b);   // b： 11
```

**注意： 基本数据类型 再与 常量数字进行运算时 会因为转型的问题报错**
- 我们在使用的时候可能会出现这种情况
- 定义一个short型变量10 然后让它变成11
```java 
  short a = 10;
  a = a + 1;
```
- 编译报错:
  常量1会被当成整型int 这样运算右侧的结果会类型自动提升为int 再将结果赋值给原先的 short型的a 就会编译报错


- 那应该怎么解决？
- 方式1: 强转
- 强转就是截断
```java 
  a = (short)(a + 1);
```

- 方式2: 自增
- 或者让数字自增1 自增运算不会改变原本数据的数据类型

```java
short a = 10;
a++;
System.out.println(a);
```

- 思考：
- 假如我们定义一个byte 127 让这个变量自增 结果会怎么样

```java
byte a = 127;
a++;

System.out.println(a);    -128
```
- 01111111...   127 正数 除了符号位是0 其余位是1 然后 +1  进位
- 10000000...   符号位为1 其余是0 就是 -128 呗


> 练习:
- 随意给出一个整数 打印显示它的个位数 十位数 百位数的值

- 格式：
- 数字 xxx 的情况如下
- 个位数: 
- 十位数: 
- 百位数: 

- 例如
- 数字 153 的情况如下:
- 个位数: 3
- 十位数: 5
- 百位数: 1

```java
int num = 187;
int bai = num / 100;

int shi = num % 100 / 10;     方式1
int shi = num / 10 % 10;      方式2

int ge = num % 10;

System.out.println("百位为: " + bai);
System.out.println("十位为: " + shi);
System.out.println("个位为: " + ge);
```

- 百位逻辑:
  187 / 100 = 1.87 int 取整 1

- 十位逻辑:
  187 % 100 = 87  --  87 / 10 int 取整 8

- 个位逻辑
  187 % 10 = 7
  除以10商依次是1 8 然后7为余数

----------------

> 符号 = -- 赋值
- 当 = 两则数据类型不一致的时候会自动类型转换 或 使用强制类型转换原则进行处理


- 支持连续赋值，先分别定义 再连续赋值

```java
int num, num1;
num = num1 = 10;
```

- 同时定义多个变量(共用一个类型)
```java
int num = 10, num2 = 20;
```

----------------

> 扩展赋值运算符:
- += -= *= /= %=
- 要点:
- 利用这样的形式 去运算*不会改变该变量的类型*
- 上面还提到 ++ 的方式也不会改变变量的类型

```java 
  int num = 10;
  num += 2;   // num = num + 2  // 12
  num %= 2;   // num = num % 2  // 0

  -----

  // 之前我们知道 如果这样写的话会 编译不通过 解决方式 或者用int接收 或者 强转为short
  short num = 10;
  num = num + 2;    // 因为2被看成一个int
      

  // 我们还可以这样: 这样编译可以使用+=因为这样写不会改变原类型
  short num = 10;
  num += 2;       
```

- 在开发中 如果希望变量实现+2的操作 有几种方法 int = 10;
- 1. num = num + 2;
- 2. num += 2; (推荐 因为不会改变数据类型)
<!-- 
  int的时候感觉不出来 当不是int类型的时候 一定是这种方式是最好的
 -->


> 练习：
- 1. 
```java 
  int i = 1;
  i *= 0.1;     // *=不会改变原变量的类型 所以还是int 结果是0
  System.out.println(i);
```

- 2. 
```java 
  int n = 2;
  int m = 3;
  n *= m++;

  System.out.println(n)   // 6
  System.out.println(m)   // 4
```

- 3. 
```java 
  int n = 10;
  n += (n++) + (++n);
  System.out.println(n);  // 32
```

- 解析：
  n = n + (n++) + (++n)
     10 + 10(原值) + 12(前面n自加了一次是11， 然后++n是新值就为12)

----------------

### 比较运算符
- 比较运算符的结果都是boolean型 也就是要么是true 要么是false

> == != < > <= >= instanceof

> 对象 instanceof 类
- 检查对象是否是类的实例

```java 
  "hello" instanceof String    // true
```

----------------------------

### 逻辑运算符
- 逻辑运算符只适用布尔类型的变量
- 在高一的时候 都会将集合的概念 或 且 非
<!-- 
  或: 都行的意思 
  且: 必须都满足 取交集的意思
  非: 就是取补集的意思
 -->

- &    逻辑与
- &&   短路与

- |    逻辑或
- ||   短路或

- ！    逻辑非


- ^    逻辑异或
- 理解方式:
- 我希望a b它们是异(不一样) 当不一样的结果的时候 运算结果就是true

- 当 a 和 b 相同的时候 结果是 false
- 当 a 和 b 不同的时候 结果是 true

```java 
  a = true
  b = true
  a ^ b    // false
```


 > 短路的概念
 - 这里扩展一下高中的物理概念
 <!-- 

    ---- x -----
    |           |
    ------。↗ ---
    - 当我们合上开关的时候 小灯泡会亮


      ↗ → → ↘
    -↗-- x --↘--
    |           |
    ------。↗ ---
    - 这种情况下 即使我们合上开关 小灯泡也不会亮 因为线路绕过小灯泡了

  - 结合上面的知识点 我们再看看 false && true
  - 如果第一个值为false 相当于绕过了第二个值
  -->

> &&
- 只有前后都是true的时候结果才是true

```java 
  boolean b = false;
  int num = 10;
  if(b && (num++ > 0)) { ... }
```

- 如果 b 是false 那么条件2 就不重要了 因为短路了
- 如果 b 是true  要需要看条件2的值

- 结合js中的知识点 && 中 如果条件1为true 会检查条件2


> & and &&
- 例子：
- 下面的例子主要观察 & 和 &&

- js中没有&
- 它们都是代表逻辑 区别在于


- 结果 & 和 && 是一样的 但是当条件1为false的时候 
- &   
    会执行条件2

- &&  
    不会执行条件2


```java
  boolean b = true;
  b = false;
  int num = 10;

  if(b & (num++ > 0)) {
    System.out.println("我现在在北京");
  } else {
    System.out.println("我现在在南京");
  }

  - & 会执行条件2 所以num的值会增加
  System.out.println(num);  // 11

  ------

  boolean b1 = true;
  b1 = false;
  int num1 = 10;

  if(b1 && (num1++ > 0)) {
    System.out.println("我现在在北京");
  } else {
    System.out.println("我现在在南京");
  }

  - && 会短路 不会执行条件2 所以num的值不会增加
  System.out.println(num);  // 10
```

> 总结：
- 相同点
- 我们不管使用的是单& 还是双&& 运算结果都是相同的 都是只有条件1 条件2都满足的时候才会是true
- 相同点:
- 1. & 与 && 的运算结果相同
- 2. 当符号左边是true的时候, 二者都会执行符号右边的运算

- 不同点:
- 当符号左边是false的时候, &会继续执行右边条件2的运算, &&就不再执行符号右边条件2的运算了


> | && ||

```java 
  boolean b = false;
  int num = 10;
  if(b | (num++ > 0)) 
  if(b1 || (num++ > 0)) 

  - b 和 b1 都是false 所以整体结果是什么 都要看条件2的


  boolean b = true;
  int num = 10;
  if(b | (num++ > 0)) 
  if(b1 || (num++ > 0)) 

  - b 和 b1 都是true | 还会看条件2的 但是短路|| 就不会看条件2了 因为已经是true了
```

- 结论
- 相同点:
- 1. | 与 || 的运算结果相同
- 2. 当符号左边是false的时候, 二者都会执行符号右边的运算


- 不同点:
- 当符号左边是true的时候, 单|会继续执行右边条件2的运算, 双||就不再执行符号右边条件2的运算了
<!-- 
  参考js资料:
    - 如果第一个表达式的值为真, 则返回表达式1
    - 如果第一个表达式的值为假, 则返回表达式2
 -->


> 总结
- 上面的是 单 还是 双 都没有区别 但是在开发的时候 我们选择单还是双呢？
- 我们在开发的时候 优先使用短路的 也就是 双 && 和 ||


> 练习：
- 1. 
- 要点:
- if(条件这里是否会运行 或者说 是否会影响到结果)
- 虽然是条件 但是程序还是运行这里了 所以相应在输出的时候 值也会发生变化
- 只是走不走大括号里面的逻辑 是要看条件是否成立
```java 
  int x = 1;
  int y = 1;

  if(x++ == 2 & ++y ==2) {
    x = 7;
  }

  System.out.println(x + ", " +  y);    // 2 2
```


- 2. 
- 要点:
- if(条件里面的运算是会运行的 会影响到其它的变量)

```java 
  boolean x = true;
  boolean y = false;
  short z = 42;

  if((z++ == 42) && (y = true)) z++;
  if((x = false) || (++z == 45)) z++;

  System.out.println("z= " + z);

  - 解析：
  if((z++ == 42) && (y = true)) z++;
  z++是旧值是42   --  true
  y被修改为       --  true
  所以 z++ 也会执行 这里 z++包括条件里面的 一共是2次 到这里z为44


  if((x = false) || (++z == 45)) z++;
  x为false会看条件2 ++z是新值 45 条件2里等式成立 会运行最后的z++ 

  所以结果是46
```

----------------

> 位运算符
- 我们看到这里的时候先不用看注释的部分 先看下面 回头在看注释里总结的部分

- 位运算不会影响到原数据(如果没有赋值回去的话)
```java
int num = 2;
System.out.println(num << 3);   // 8  都是在原数据的基础上 计算
System.out.println(num);        // 2  都是在原数据的基础上 计算
System.out.println(num >> 1);   // 1  都是在原数据的基础上 计算
```

> <<      左移        
- 扩大2的几次幂倍大, 原数 * 2^?

- 例如: 
- 3 << 2 = 12

- << 2  == 2^2
- << 3  == 2^3
- << 4  == 2^4

- 3 << 2 == 3 * 2^2 = 12
<!-- 
  空位补0， 被移除的高位丢弃 空缺位补0
 -->

> >>      右移        
- 3 >> 1 = 1   -- 3 / 2 = 1
<!-- 
  被移位的二进制最高位是0 右移后 空缺位补0
  最高位是1 空缺位补1
 -->

> >>>     无符号右移   
- 3 >>> 1 = 1  -- 3 /2 = 1
<!-- 
  被移位二进制最高位无论是0 或者 1 空缺位都用0补
 -->

> &       与运算     
- 该运算需要把数字转为2进制之后再进行运算
- 6 & 3 = 2   *找11的 11=1 否为0*
<!-- 
  110
  011
  010

  二进制位进行 & 运算 只有 1&1时 结果是1  否则是0
 -->

- 扩展1:
<!-- 
  0000 是0
  0001 是1

  - 也就是说二进制是从0开始的
 -->

- 扩展2: 从2进制速算10进制
<!-- 
  按照 16 8 4 2 1 代表二进制 “亮灯” 后的结果
  1代表亮灯

  举例:
  0001    1位亮灯为1  = 1
  0010    2位亮灯为2  = 2
  0100    3位亮灯为4  = 4
 -->


> |       或运算      
- 6 | 3 = 7     - *找00的 00=0 否为1*
<!-- 
  110
  011
  111

  二进制位进行 | 运算 只有 0|0时 结果是0 否则是1
 -->

> ^       异或运算    
- 6 ^ 3 = 5     - *找不同的 不同为1 相同为0*
<!-- 
  110
  011
  101 

  相同二进制位进行 ^ 运算 结果是0  1^1=0    0^0=0
  不相同二进制位进行 ^ 运算 结果是 1^0=1    0^1=1
 -->

> ~       取反运算    
- ~6 = -7
- 包括符号位在内各位取反
<!--  
  正数取反 各二进制码按补码各位取反
  负数取反 各二进制码按补码各位取反
 -->


- 位运算是直接对 *整数的二进制*进行的运算
- 位运算操作的都是数值 而其结果也是一个数值
<!-- 
  这里注意是对 整数 的二进制
  没有对小数 也就是浮点型的数字进行左右移动的
 -->

- 但是用的频率比较低

> << 左移
- 例子： 
- int num = 21；
<!-- 
  0000 0000 0000 0000 0000 0000 0001 0101

  num << 2    左移两位
  相当于左边出去两位 右边就需要补2位 拿0补
    0000 0000 0000 0000 0000 0000 0001 0101
  0000 0000 0000 0000 0000 0000 0001 010100

  原先：
  10101     对应着  2^4  2^2  2^0  它们相加为21

  现在
  1010100   对应着  2^6  2^4  2^2

  首先我们会发现规律：
  1. 左移两位 幂发生了变化 幂数 + 2了
  2. 实际上相当于原先的结果( 2^4  2^2  2^0 ) 21 再乘以 2^2

  也就是说 21 * 2^2 = 21 * 4 = 84


  - 那要是向左移3位呢？ num << 3 ? 
  - 那是不是说 21 * 2^3 = 168   对
 -->

> << 左移 结论
- 每向左移动一位 相当于在原来的基础上 乘以2
- 每向左移动几位 相当于用原来的数 乘以 2的几次幂


> >> 右移
- 每向右移动一位 相当于再原来的基础上 除以2
- 每向右移动几位 相当于用原来的数 除以 2的几次幂
- 貌似的规律貌似的规律都是原数减一半 但是也是在一定的范围内
- 同时注意 我们右移后的结果都是整数

```java
int num = 21;
num >> 1;     // 10   21 / 2 = 10
num >> 2;     // 5
num >> 3;     // 2
```

- 注意：
- 当我们进行右移的时候 需要拿数补位
- 当原数为正数的时候 空位我们全部拿 0 补
- 当原数为负数的时候 空位我们全部拿 1 补

```java 
  int num = 21;
  num << 2;   21 * 2 * 2
  num <<< 3;  21 * 2 * 2 * 2
  num <<< 4;  21 * 2 * 2 * 2 * 2
```

```java 
  int num = 80;
  int res = num >> 3;   80 / 8 = 10

  num >> 1;   // 40
  num >> 2;   // 20
  num >> 3;   // 10
```

**注意**
- 1. 位运算符操作的都是整型的数据
- 2. << 在一定范围内 每向左移1位相当于 * 2    原数加一倍
- 3. >> 在一定范围内 每向右移1位相当于 / 2    原数减一半
<!-- 
  那是不是说当整型数字 减少一半的时候 或者 增加一倍的时候 
  我们就可以对这个数字进行 >> << 的操作呢？ 哈哈 
-->

- 4. 负数也适用于这个规律
<!-- 
  什么叫在一定范围内呢？ 我们现在是依次左移 但是假如移动到最高位也就是符号位由原来的0变为1了 也就是说由原来的正数变为负数了 那就有问题了
 -->

- 5. 注意 负数 右移补位的问题 正数拿0补 负数拿1补
<!-- 
  右移两位
  100000010011
    100000010011

  我们要拿数补位 因为原本就是负数 所以这时候我们补位要拿1补
  100000010011
  11100000010011
 -->


> 面试题
- 最高效的计算 2 * 8 
- 答案:
- 1. 2 向左移动 3位
- 2. 8 向左移动 1位
<!-- 
  int num = 2;
  int res = num << 3;

  第一种想法：
  单独去想 8 是 2的几次幂   因为左移就是在用数值 * 2的几次幂

  第二种想法：
  2会被扩大几倍 扩大了8倍 但不能直接用2 * 2^8 
  而是我们这种想法要考虑 2分几次翻倍了
  翻一次会是 4
  翻二次会是 8
  翻三次会是 16

  岂不是又到想法1了
 -->
 

> >>> 无符号右移
- 不管这个数原来是正数 还是 负数 补位的时候*都拿0来补*
- 也就是 原本的数 如果是负数 往右 无符号移动一位 瞬间就变成正数了
<!-- 
  使用无符号右移的时候根本就不是想进行 /2 的操作了
  在求集合 和 哈希值原码的时候 底层会用到这个符号 先不讲了
 -->


> &
- n = 12; m = 5;  n & m 结果为4
- 我们要将数值转换为二进制 然后每一位进行 &运算判断

- 技巧：
  我们把0当成false 把1当成true 我们将false 和 true进行 & 逻辑运算
  所以只有 true true结果才是true 其它的结果都是0

- *也就是说 1 和 1 才是1 其它都是0*

> 要点： 11为1 找true

<!-- 
  12的底层2进制为   00001100
  5的底层2进制为    00000101    它们进行 & 运算

  
  0 0 0 0 1 1 0 0   &
  0 0 0 0 0 1 0 1
  0 0 0 0 0 1 0 0

  2^2 结果为 4
 -->


> |
- 技巧
- 1看成true 0看成false 然后进行同位 | 运算 
- 只有都是false的时候 才是false 其它的都是true

- *0 和 0 才是0 其它都是1*

> 要点： 00为0 找false
<!-- 
  0 0 0 0 1 1 0 0   |
  0 0 0 0 0 1 0 1
  0 0 0 0 1 1 0 1

  2^3 2^2 2^0 = 13
 -->


> ^ 异或
- 技巧
- 1看成true 0看成false 然后进行同位 ^ 运算 
- ^ 异或 *找不同* 我们希望看到的结果是不一样 所以 不一样就是true 对应1
- 其余的情况都是0

> 要点： 一样为0
<!-- 
  0 0 0 0 1 1 0 0   ^
  0 0 0 0 0 1 0 1
  0 0 0 0 1 0 0 1

  2^3 2^0 = 9
 -->


> ~ 取反
- 包括符号位在内 所有的数值0变1 1变0
- int num = 6; ~num;
<!-- 
  0000 0000 0000 0000 0000 0000 0110
  1111 1111 1111 1111 1111 1111 1001  

  结果是 -7 

  6 进行 ~6 是 -7 那 ~-7 是多少？ 是6 
 -->


> 练习：
- int num1 = 10; int num2 = 20;
- 交换两个变量的值

- 场景：
- 1. 购买火车票的时候 我们点击按钮可以互换地址
<!-- 
  北京 -- 唐山
  唐山 -- 北京
 -->

- 2. 数字排序 1 5 4 2 3 排成 1 2 3 4 5
<!-- 
  这里少不了交换变量位置的值 比如5 和 3交换一下
 -->

- 上述的场景中都少不了交换两个变量的值


> 方式1
- 定义一个临时变量

- 技巧
- 每一行最后一个变量 是下一行的开头
<!-- 
  int temp = num1;
  num1 = num2;
  num2 = temp;
 -->


> 方式2
- 相加操作
- 理解举例：
- 有两个岛分别站了一个人 甲乙, 岛周围全是水, 水里有鳄鱼, 
- 甲乙要交换地方
- 做法 甲 跳到 乙的脖子上 让乙跳到甲的位置上 然后甲再蹦到乙的位置上
- 用代码来实现乙蹦到甲的脖子上就是 两个数相加
<!-- 
  // 乙跳到了甲的脖子上 num1为30了 两个人一起的重量 
  并且两个人在同一个岛上 为了交互位置 甲带着乙跳到了 乙所在的岛上 
  接下来开始卸货
  num1 = num1 + num2;   

  // num1为两个人的重量 我们要减去其中的一个人的重量 并赋值给这个人 
  这时候为了交换我们要减去另一个人的重量 不要减自己 (减自己等于没换)
  num2 = num1 - num2;   // num2 = 10 这时候num1还是30

  // 这步就是为了交换值
  num1 = num1 - num2;   // 30 - 10 = 20  num1 = 20
 -->

- 好处： 不用定义临时变量
- 弊端： 两数相加超过本身变量的存储范围 对于数值型的可以用 非数值型的不好用 也就是说有数据类型的限制


> 方式3
- 要点:
- 两个数之间进行异或运算再进行异或运算其中的一个数 结果是另一个数
- a ^ b 如果再 ^ a 结果就是 b
- a ^ b 如果再 ^ b 结果就是 a

<!-- 
  0000 1101    m = 13
  0000 0101    n = 5     ^
  0000 1000    ^运算的结果为8

  0000 0101   n = 5 再跟上面的结果进行^运算
  0000 1101   ^ 2次^运算的结果是13


  1. n ^ m 的结果为k 等于 8
  2. 让k再继续异或其中的一个数 比如我们用k ^ n 结果就变成m了
  m = k^n = (m^n)^n

  n ^ m 得到的结果 ^ n 得到的结果就是 m
  就是两个数异或运算再异或一个数结果就是另一个数 (变过去异或再变回来)
 -->

- 具体实现步骤
```java 
  // 实现 交换两个变量的值
  int num1 = 10;
  int num2 = 20;

  // 1. 我们将第一次的异或运算的结果保存
  num1 = num1^num2;

  // 2. 将保存的结果 再次异或其中的一个数值 结果会是另一个数值
  // 这里num1^num2 结果会是num1的值 但是我们为了交换将这个值给num2
  num2 = num1^num2;

  // 3. 这时候num1还是我们上面保存的结果 我们再次异或num2 
  // 这里注意经过上面的步骤num2的值已经是num1的值了 也就是说 我们得到的结果会是num2的值 为了交换 我们将结果赋值给num1
  num1 = num1^num2;


  int temp = num1 ^ num2;
  num1 = temp ^ num1;
  num2 = temp ^ num1;
```

----------------

> 三元运算符
> 格式： (条件表达式) ? 表达式1 : 表达式2
- 当条件表达式为true的时候  运算结果是表达式1
- 当条件表达式为false的时候 运算结果是表达式2

**注意：**
- 接收三元运算符的变量*类型必须是能够统一* 表达式1 和 表达式2 的类型
- 也就是说 表达式1 和 表达式2 的部分 必须用统一出来一个类型 当表达式1和表达式2的类型不一致的时候 编译器会报错

- 1. 表达式1 和 表达式2 为同种类型 这样接收结果的类型也跟它们一样
```java 
  int m = 12;
  int n = 5;
  int max = (m > n) ? m : n;

  // n m 都是int 接收它们结果的类型也是int
```

- 2. 接收结果为能统一它们的类型
```java 
  int m = 12;
  int n = 5;
  double num = (m > n) ? 2 : 1.0

  // 因为num要么就是int 要么就是double 我们要将num定义成能够接收它们两个的类型
```

- 下面的情况就不行 这样怎么定义类型接收呢？ *没办法统一*
```java
  (m > n) ? "n大" : 2   // 报错
```

- 总结:
- 要么我们定义变量的类型是能接收 条件1 和 条件2 的类型
- 要么我们 条件1 和 条件2 的类型可以统一


> 三元运算符 与 if-else的联系 与 区别
- 1. 三元运算符可简化if-else语句
- 2. 三元运算符要求必须返回一个结果
- 3. if后的代码块可以有多个语句

```java
  // 获取两个整数的最大值
  int m = 12;
  int n = 5;
  int max = (m > n) ? m : n;
```


> 三元表达式的嵌套
- *第二个结构要加上 ( )*
- String max = (m > n) ? "m大" : ((m == n) ? "m n相等" : "n")


> 练习
- 获取三个数的最大值
```java 
  // 获取两个整数的最大值
  int n1 = 12;
  int n2 = 5;
  int n3 = -43;

  int max = (n1 > n2) 
            ? ((n1 > n3) ? n1 : n3) 
            : ((n2 > n3) ? n2 : n3);
```

- 注意：
- 开发的时候这样不好 觉得很帅 但不是真的帅 以后改哪都不敢下手
- 代码帅的定义
- 1. 效率高 这点是基于算法的改良
- 2. 上面的3行代码整成一行了 感觉帅了 但是是让可读性变差了 效率并没有提高 大家还看不懂


> 结论
- 凡是可以使用三元运算符的地方都可以改写成if else
```java 
  if(m > n) {
    System.out.println(m)
  } else {
    System.out.println(n)
  }
```

- 能用if else的一定能改成三元么？ 不是
- 三元运算符的结构简单 接收变量的类型还有限制 if else比较灵活

- 如果程序既可以使用三元运算符 又可以使用if-eles 那么优先选择三元运算符 原因 简洁 执行效率高
- 三元运算符的效率高 毕竟它只是个运算符 而if else是比较复杂的流程控制语句 

----------------------------

### 运算符的优先级
- 运算符有不同的优先级 所谓优先级就是表达式运算中的运算顺序
- 如下表 上一行运算符总是优先于下一行

- 只有单目运算符 三元运算符 赋值运算符是从右向左运算的
<!-- 
  0.  . () {} ; ,
  1.  ++ == ~ ()
  2.  * / %
  3.  + -
  4.  << >> >>>
  5.  < > <= >= instanceof
  6.  == !=
  7.  &
  8.  ^
  9.  |
  10. &&
  11. ||
  12. ? :
  13. =  *=  /=  %=  +=  -=  <<=  >>=  >>>=  &=  ^=  =
-->

- 85集讲刚毕业就业

----------------------------

> & && 异同
- 从使用来讲 它们用哪个都是可以的 都表示& 从结果上看都用它们两个谁都是一样的
- 当前面结构为false的时候 &&右侧是不执行的

**String类型的数据之间不能比较大小**
- 可能只能比较其内容是否相同

- > < >== <== 只能使用在数值类型的数据之间
- == 不仅可以使用在数值类型的数据之间 还可以*使用在是他的引用类型*之间
```java 
  // 1000 2000 是余额
  Account acct1 = new Account(1000)
  Account acct2 = new Account(2000)

  // 这时候比较的是 两个账户是不是同一个账户 比较的是地址值
  acct1 == acct2;   
```


> 使用程序求一个 0-255 范围内的整数的十六进制
- 该题利用了 
- 1. & 运算
- 2. >>> 无符号右移
- 3. char型与数值的计算

- &运算要点
- 1. 11得1(true true是true) 其余都是0
- 2. 技巧:
- 取到二进制数的末4位的值 可以让 该数 与 15 二进制进行&运算
<!-- 
  15的二进制末4位是1111 其余都是0
 -->

- >>> 无符号右移
- 当右移的时候我们不关注/2 目的只是为了取2进制数 拿0补位 就用无符号右移

- char型与数值的计算
- 这题里面利用了三元表达式 当x > 9的时候 做逻辑处理
- 所有将结果确定位char型 x > 9 那么就可能是10 11 12 ...
<!-- 
  A是65
  (i2-10+'A')
  当 i2 为 10 的时候 就是 0 + A = 0 + 65 = 65 = A
  当 i2 为 11 的时候 就是 1 + A = 1 + 65 = 66 = B
 -->

> 具体逻辑
- 核心思路：
- 2进制 转为 16进制，可以将每4位01进行累加算出一个结果
- 0011 1100   60的二进制
- 3    C
<!-- 
  但问题是怎么才能将 1100 单独的从2进制中取出来？

  为了将 末尾4位单独拿出来 
  可以让i1和15进行 &运算 因为15的未4位是1111 其余28位为0
  int i2 = i1 & 15;

  1100
  1111  &
  1100

  我们可以看到和15进行&运算后的结果就是 我们想取出60的2进制的未4位本身


  int i1 = 60;

  // 15的二进制末4位是1111 其余是0 就能够得到60的2进制的末四位
  int i2 = i1 & 15;

  // 这里是 算出 C 的逻辑 利用了 char型变量的相加
  String j = (i2 > 9) ? (char)(i2-10+'A') + "" : i2 + "";  // c

  上面是将0011 1100最低4位取出来了 接下来怎么取0011这四位?
  我们将i1 整体的右移四位 0011 就成为了最低的4位
  只有当我们关心右移是代表/2的时候 才用>> 只是想右移拿0补 目的只是为了取数 那就>>>
  int temp = i1 >>> 4;
  i2 = temp & 15;
  String k = (i2>9) ? (char)(i2-10+'A') + "" : i2 + "";  // 3

  System.out.println(k+""+j);
-->

----------------------------

### 程序流程控制
- 流程控制语句是用来控制程序中各语句执行顺序的语句 
- 可以把语句组合成能完成一定功能的小逻辑模块

- 其流程控制方式采用结构化程序设计中规定的三种基本流程结构
- 1. 顺序结构
- 2. 分支结构
- 3. 循环结构 


> 顺序结构
- 程序从上到下逐行的执行 中间没有任何判断和跳转


> 分支结构
- 根据条件 选择性的执行某段代码
- 有 if else 和 switch case 两种分支语句


> 循环结构
- 根据循环条件 重复性的执行某段代码
- 有 while do for 三种循环语句
<!-- JDK提供了forEach循环 方便的遍历集合 数组元素 -->

------------------

### 分支结构 if else
- 这个语法分成了3种情况用于应对需求
- 条件判断结构

> 1. if(条件表达式) { ... }
- 如果条件表达式为true 则执行 花括号内部的代码逻辑
- 如果条件表达式为false 则跳过 花括号内部的代码逻辑 往下执行(不考虑大括号内部代码)
<!-- 
        条件表达式  ↘
          true    faflse
            ↓        ↓
        执行代码块    ↓
            ↓     ↙
            ↓   ↙
 -->        

- 举例1 体检
```java
  int heartBeats = 78;

  if(heartBeats < 60 || heartBeats > 100) {
    System.out.println("您需要做进一步的检查");
  }

  System.out.println("检查结束");
```


> 2. if(条件表达式) { ... } else { ... }
- 二选一执行
- 如果条件表达式为true 则执行if后的逻辑 
- 如果条件表达式为false 则执行else后的逻辑
- 一条分支执行完毕后 接下来顺序往下执行

- 该分支语句一定会在两个条件中选择一个执行
<!-- 
        条件表达式
      ↙          ↘
    true        false
      ↓           ↓
      ↓           ↓
      ↓  →  ↓  ←  ↓
            ↓
 -->

- 举例2
- 2选一 一定会执行下面条件中的一个

```java
  int age = 18;
  if(age < 18) {
    System.out.println("你还可以看动画片");
  } else {
    System.out.println("你要工作了");
  }
```


> 3. if(条件表达式1) { ... } else if(条件表达式2) { ... } else{ }
- 多选一 
- 选择符合条件的其中一条执行大括号内部的语句 然后接着往下执行
- *匹配一个条件执行完毕后 直接会跳出分支结构*

- 举例3
```java
  int age = 18;
  if(age < 0) {
    System.out.println("您输入的数据非法");

  } else if(age < 18) {
    System.out.println("青少年时期");

  } else {
    System.out.println("您该工作了");
  }
```


> if-else 使用的说明
- 1. 条件表达式必须是布尔表达式(关系表达式 或 逻辑表达式) 布尔变量
- 2. 语句块只有一条执行语句的时候 一对{}可以省略 但建议保留
- 3. if else语句结构 根据需要可以嵌套使用

- 当if else结构是 多选一 的时候 最后的else是可选的 根据需要可以省略
- *当多个条件是 互斥 关系的时候*   条件判断语句以及执行语句间顺序无所谓
- *当多个条件是 包含 关系的时候*   ”小上大下 / 子上父下“


> 扩展: Scanner的应用
- 创建scanner的实例对象后 调用scanner对象的方法 会要求用户在控制台输入信息 同时该方法也能获取到用户的输入信息


> 通过键盘输入 拿到值
- 该问题 需要新知识 这里只是简单的了解下
- 通过键盘获取不同类型的变量(值) 需要使用 Scanner 类
- 该类用于通过键盘获取值

> 具体的使用方式
- 1. 导包:
- 我们想在代码中使用 Scanner 类 这个类在另外一个包下 我们需要将这个类导进来, 导包操作要写在 Demo类声明的上方

- 2. Scanner的实例化 
- 相当于创建Scanner对象
- Scanner scan = new Scanner(System.in);
<!-- 
  该操作在main方法内部 main()是一个入口 
  我希望一上来就执行所以放在了这里面
  System.in 键盘输入 上面整体是将Scanner实例化
 -->

- 3. 调用 Scanner 类的相关方法 来获取指定类型的变量
- 在Scanner类下有很多的功能 也就是方法 其中有一个方法叫做 nextInt() 读取一个int型的值

- 调用该方法 会等待用户输入 没有输入的话 会阻塞程序运行
```java 
  // 导包
  import java.util.Scanner;

  class Demo {
    public static void main(String[] args) {
      
      Scanner scan = new Scanner(System.in);

      // 执行完这行代码后 
      // 会要求用户在控制台上输入 不然会阻塞下面程序的执行
      int num = scan.nextInt();
      System.out.println(num);
    }
  }
```
- 我们还可以获取别的类型的值 也是需要查看 Scanner 类中对应的方法


> scanner实例对象.方法
- 1. 获取String型数据
- next() or nextLine()

- 2. 获取基本数据类型的输入值
- nextByte()
- nextInt();
- nextDouble()
- nextFloat()
- nextLong()
- nextBoolean()

```java
  // 导包
  import java.util.Scanner;

  class Demo {
    public static void main(String[] args) {

      Scanner scan = new Scanner(System.in);

      // 获取String类型
      System.out.println("请输入你的姓名: ");
      String name = scan.next();
      System.out.println(name);

      // 获取int类型
      System.out.println("请输入你的年龄: ");
      int age = scan.nextInt();
      System.out.println(age);

      // 获取double类型
      System.out.println("请输入你的体重: ");
      double weight = scan.nextDouble();
      System.out.println(weight);

      // 获取boolean类型
      System.out.println("你是否相中我了呢?(true/false): ");
      boolean isLove = scan.nextBoolean();
      System.out.println(isLove);

      // 对于char型的获取 Scanner 没有提供相关的方法 只能够获取一个字符串  假如我们就想定义一个char型变量
      // 可以使用字符串提供的 charAt() 方法 提取指定位置的字符
      char genderChar = gender.charAt(0)
    }
  }
```
- 当用户输入和我们定义接收的类型不相符的时候就会报错
- 程序过程当中一旦出现异常就会终止

**注意**
- 需要根据相应的方法 来输入指定类型的值 如果输入的数据类型与要求的类型不匹配的时候 会报异常 "inputMissMatchException" 导致程序终止


> 练习
- 岳小鹏参加java考试 他和父亲岳不群达成承诺 如果
- 成绩为100 奖励一辆bmw
- 成绩为(80, 99]时 奖励一台iphone
<!-- 
  左开右闭 不包括80 包括99
 -->

- 成绩为[60, 80]时 奖励一个ipad
- 其它时 什么奖励也没有 请从键盘输入岳小鹏的期末成绩 并加以判断
```java 
  import java.util.Scanner; 

  class Demo {
    public static void main(String[] args) {

      Scanner scan = new Scanner(System.in);
      System.out.println("请输入岳小鹏的期末成绩: (0-100)");
      int score = scan.nextInt();

      if(score == 100) {
        System.out.println("奖励一辆BMW");
      } else if(score > 88 && score <= 99) {
        System.out.println("奖励一台iphone");
      } else if(score >= 60 && score <= 80) {
        System.out.println("奖励一个ipad");
      } else {
        System.out.println("什么也没有");
      }
    }
  }
```

- 总结:
- 1. else的逻辑是可选的 可以不写
- 2. if else if 只要有一个逻辑匹配上了 就会跳出整个结构
- 3. 
  - 如果多个条件表达式之间没有交集的关系时 哪个判断和执行语句声明在上面还是下面 无所谓

  - 如果多个条件表达式之间有交集的关系时 需要根据实际情况考虑清楚应该将哪个结构声明在上面

  - 如果多个条件表达式之间有包含的关系时 通常情况下 需要将范围小的声明在范围大的上面 否则范围小的就没有机会执行了


> 练习2
- 编写程序: 由键盘输入三个正数分别存入变量num1 num2 num3中 并对它们进行排序(使用if else) 并且从小到大输出

```java 
  import java.util.Scanner; 
  class Demo {
    public static void main(String[] args) {

      Scanner scan = new Scanner(System.in);
      System.out.println("请输入第一个整数: ");
      int num1 = scan.nextInt();

      System.out.println("请输入第二个整数: ");
      int num2 = scan.nextInt();

      System.out.println("请输入第三个整数: ");
      int num3 = scan.nextInt();

      if(num1 > num2) {

        // 比较num3是否比大的还要大
        if(num3 > num1) {
          System.out.println(num2 + " > " + num1 + " > " + num3);

          // 比较num3是否比小的还要小
        } else if (num3 < num2) {
          System.out.println(num3 + " > " + num2 + " > " + num1);

          // 剩下的情况就是在中间了
        } else {
          System.out.println(num2 + " > " + num3 + " > " + num1);
        }

        // 现在就是num2大的情况 我们再拿num3来进行比较
      } else {
        if(num3 > num2) {
          System.out.println(num1 + " > " + num2 + " > " + num3);
        } else if(num3 < num1) {
          System.out.println(num3 + " > " + num1 + " > " + num2);
        } else {
          System.out.println(num1 + " > " + num3 + " > " + num2);
        }
      }
    }
  }
```

**注意：**
- *else也有就近原则* 当配对关系不明确的时候 *else就会和最近的if进行配对*
```java 
  if(x > 2) 
    if(y > 2)   // 下面的 else 会和这个if配对
      System.out.println()  

  else {
    这个else和谁配对? 最外围的if没有 { }
  }
```


> 练习3
- 我家狗狗5岁了 5岁的狗相当于人类多大呢？
- 狗的前两年 每一年相当于人类的10.5岁 之后每增加一年就增加4岁
- 那么5岁的狗相当于人类多少年龄呢？

- 应该是 10.5 + 10.5 + 4 + 4 + 4 = 33岁

- 编写一个程序 获取用户输入的狗的年龄 通过程序显示其相当于人类的年龄
- 如果用户输入负数 请显一个提示信息

```java 
  import java.util.Scanner; 
  class Demo {
    public static void main(String[] args) {

      Scanner scan = new Scanner(System.in);
      int age = scan.nextInt();

      if(age < 0) {
        System.out.println("请输入正确的年龄");
      } else {
        if(age > 0 && age <= 2) {
          System.out.println("狗狗的年龄为: " + age * 10.5 + "岁");
        } else {
          System.out.println("狗狗的年龄为: " + (2*10.5 + (age - 2) * 4) + "岁");
        }
      }
    }
}
```


> 练习4
- 假设你想开发一个玩彩票的游戏 程序随机地产生一个两位数的彩票 提示用户输入一个两位数 然后按照下面的规则判定用户是否能赢

- 1. 如果用户输入的数匹配彩票的实际顺序 奖金10000
- 2. 如果用户输入的所有数字匹配彩票的所有数字 但顺序不一致 奖金3000
- 3. 如果用户输入一个数字仅满足顺序情况下匹配彩票的一个数字 奖金1000
- 4. 如果用户输入一个数字仅满足非顺序情况下匹配彩票的一个数字 奖金500
- 5. 如果用户输入的数字没有匹配任何一个数字 则彩票作废


> 随机数 Math.random()
- 它会获得一个double型的数据
- 该方法会返回 >= 0.0 <=1.0 之间的数
<!-- 
  如果 Math.random() * 100 那就变成 [0.0 - 100.0)
 -->

- 上面的题里要求的是2位数 所以我们不能乘以100 我们乘以90 再加上10
<!-- 
  Math.random()*90  [0.0, 90.0)
  然后+10 就会变成[10.0, 100.0)
 -->

- (int)(Math.random() * 90 + 10)

> 公式：
- [a, b]: (int)(Math.random() * (b - a + 1) + a)
- 后面的减去前面的+1 +前面的

```java
  public static void main(String[] args) {
    int value = (int)(Math.random() * 90 + 10);
    System.out.println(value);
  }
```

---------------------------- 

### switch case 结构 分支语句2 

> 结构
- 1. break 关键字不是必须写的 为可选 根据实际情况
- 一旦执行到此关键字就跳出当前结构

- 2. switch后的 (表达式) *不是条件表达式*

- Java中
- 条件表达式代表它是布尔类型的 *switch后面的表达式不是条件表达式*
- 这个表达式的类型只能是如下6中数据类型之一

  - 1. byte
  - 2. short
  - 3. char
  - 4. int

  - 5. 枚举类型    (jdk5.0新增)
    - 因为枚举类的对象是有限的 确定的 常量

   - 6. String类型 (jdk7.0新增)

- 没有double类型呢？

- switch后面的表达式的值会依次跟case后面的值进行==匹配
```java 
  switch(表达式) {  // 该表达式不是条件表达式

    case 常量1:     // 只能声明常量 不能声明范围 num > 10 这样不行
      语句；
      break;

    case 常量2:
      语句；
      break;

      ...

    // 类似 else 上面的都没有匹配上的话 我们会执行default
    default:
      语句；
      break；
  }
```

- 3. default关键字的位置不是固定的 它可以放到任意位置
- 就是说default后面最好也有break 如果default的位置在其他位置的情况下

```java 
  int num = 3

  default: 
    System.out.println("zero");
  case 1:
    System.out.println("zero");
    break;
```
- 进入执行程序后还是先看case有没有匹配上的 没有的话走default
- 但是default后面没有break 所以还会执行 case1后面的语句 case后面的语句有break 停止

> 要点：
- 1. 和 if else 不一样的地方是 一旦if else匹配上其中的一个都 就会跳出整个结构

- 2. switch case 当没有break的时候 一旦匹配上条件后并不会跳出 而是会接着执行其它case结构中的执行语句 
- *直到遇到break关键字 或者 到程序结束为止*

- 3. 当多个case后的执行语句一样的时候我们可以考虑合并操作
<!-- 
  case 0:
  case 1:
  case 2:
  case 3:
    System.out.println("不及格");
    break;
 -->

**注意：**
- 一旦匹配上其中的一个条件后 会不进行判断就执行下面的语句

```java
  class Demo {
    public static void main(String[] args) {
      
      - 注意：
      - switch后面的表达式对数据类型有要求 
        1. 不能放浮点型
        2. 不能放布尔型

      int num = 0;    

      switch(num) {
        case 0:
          System.out.println("zero");
        case 1:
          System.out.println("one");
        default:
          System.out.println("default");
      }
    }
  }

  - 要想执行多选一的话 我们要加上break关键字
```


> 练习：
- 1. 使用 switch 把小写类型的 char型转为大写 只转换 a b c d e 其他的输出 other

- 提示： 
  String word = scan.next();
  char c = word.charAt(0);
  switch(c) { ... }

- 2. 对学生成绩大于60分的 输出合格 低于60分的输出 不合格
```java 
  class Demo {
    public static void main(String[] args) {
      int score = 78;
      switch(score/10) {  // 让情况减少  

        // 我们还可以除以60 结果为0就是不及格 为1就是及格
        case 0:
          System.out.println("不及格");
          break;
        case 1:
          System.out.println("不及格");
          break;
      }
    }
  }
```

- 3. 编写程序 从键盘上输入2019年的 month 和 day 要求通过程序输出输入的日期为2019年的第几天
- 思路：
  比如 2月 15日 那就1月的31 + 15呗
```java 
  import java.util.Scanner;
  class Demo {
    public static void main(String[] args) {
      Scanner scan = new Scanner(System.in);
      System.out.println("请输入2019年的月份: ");
      int month = scan.nextInt();

      System.out.println("请输入该月的某一天: ");
      int day = scan.nextInt();

      // 定义一个变量 保存总天数
      int num = 0;
      switch(month) {

        // 我们倒着写 从12月份开始写 然后不写break 然后程序就会执行下面的逻辑 把 = 改成 +=
        case 3:
          num += 28;
        case 2:
          num += 31;
        case 1:
          num += day;
      }
    }
  }
```


> 总结
- 1. 凡是可以使用switch case的结构都可以转换为if-else 反之不成立

- 2. switch(表达式) 表达式的要求:
- 基本数据类型 string 枚举类 但不包括浮点型 

- 3. 当我们写分支结构时 既可以用if else又可以用switch case 优先使用switch case情况过多除外
<!-- 
  switch的实行效率稍高
 -->

----------------------------

### 循环结构 和 for循环的理解
- 在某些条件满足的情况下 反复执行特定代码的功能

- 循环语句分类
- for
- while
- do while

> 循环语句的四个组成部分
- 1. 初始化部分
- 2. 循环条件部分   -- 是boolean类型
- 3. 循环体部分
- 4. 迭代部分


- 解析：
-  1. 先是初始化的部分 
    -- 再对循环条件进行判断 看它是否满足进入循环的条件 -- 如果不满足直接退出循环结构

- 2. 如果满足循环条件 则进入循环体部分执行循环逻辑 
    -- 进入迭代部分(i++) -- 然后判断这次变化是否满足循环条件 -- 如果还满足则循环执行循环体内部逻辑

- 3. 如果不满足循环条件则退出循环结构


> for循环的结构
  for(①; ②; ④) { ③ }

> 示例： 
```java 
  class Demo {
    public static void main(String[] args) {
      for(int i=0; i<5; i++) { 
        System.out.println("输出for结构");
      }

      for(int i=0; i<5; i++) { 
        System.out.println("输出for结构");
      }
    }
  }
```

- 思考:
- 上面有两个for循环结构 同时都使用了 i 冲突么？
- 不冲突 因为它们有各自的作用域 属于定义在了 循环体中 在for循环外部 访问不到 i


> 练习：
- 要点：
- 1. 初始化部分放在了外面
- 2. 1;2;3 这三个部分中都可以假如其它的语句 其它语句同时也会得到执行
- 3. 如果 3 中有多条语句的话 中间要使用,分割

```java 
  int n = 1;
  for(System.out.println("A"); n < 3; System.out.println("C"), n++) {
    System.out.println(" B");
  }

  - 输出结果 ABCBCBC
```

- 总结：
- for循环的条件部分和if条件部分一样都能够得到执行 所以当中也能写逻辑


> 练习2：
- 遍历100以内的偶数 输出所有偶数的和 输出偶数的个数

```java 
  class Demo {
    public static void main(String[] args) {

      int num = 0;
      int odd = 0;

      for(int i=0; i<100; i++) {
        if(i % 2 == 0) {
          System.out.println(i);

          num += i;
          odd = i;    // 或者让 ood+ 额 我基础真差
          odd++;      // or
        }
      }

      // 整个循环结束以后 告诉我结果是多少
      System.out.println(num);
      System.out.println("偶数的个数为： " + odd);
    }
  }
```


> 练习3：
- 编写程序从1循环到150 并在每行打印一个值 另外在每个3的倍数行上打印出 “foo”， 在每个5的倍数行上打印“biz” 在每个7的倍数航上打印输出“baz”
<!-- 
  1
  2
  3 foo
  4
  5 biz
  6
  7 baz
 -->

- 错误的思路:
- 这里我使用了else if的结构 因为else if是多选一 当次i的结果只会进入其中的一个分支判断结构
- 我们的例子中 有些数字既能被3整除 又能被 5 7 整除 所以我们要是使用else if的话 当有符合多个情况的数字的时候 只能打印出一种
```java 
  if(i % 3 == 0) {
    System.out.println(i + " foo");
  } else if(i % 5 == 0) {
    System.out.println(i + " biz");
  } else if(i % 7 == 0) {
    System.out.println(i + " baz");
  } else if(i % 3 == 0 || i % 5 == 0 || i % 7 == 0) {
    System.out.println(i + " foo biz baz");
  } else {
    System.out.println(i);
  }
```

- 所以我们要使用if 独立判断 当次的循环逻辑 会依次的进入到 其它的if中

- 要点：
- 1. 我们要使用 System.out.print 当次循环的最后再使用 System.out.println来换行

- 2. 比如当次是x 先是print输出 x 然后进入其它if判断 符合输出 foo
- 这时当次一行的结果就是 x foo
- 然后进入其它的if判断 如果符合if 当次当行输出 biz
- 这时当次一行的结果就是 x foo biz 因为我们使用的是print
- 最后的时候我们要使用 println 换行

```java 
  for(int i=1; i<=150; i++) {
    // 1. 先输出 i 
    System.out.print(i + "  ");
    
    // 2. 如果当次循环符合其它情况就输出 if 中的语句
    if(i % 3 == 0) {
      System.out.print("foo ");
    }

    if(i % 5 == 0) {
      System.out.print("biz ");
    }

    if(i % 7 == 0) {
      System.out.print("baz ");
    }

    System.out.println();
  }
```


> 练习4
- 题目： 
- 输入两个正整数m n 求其最大公约数 和 最小公倍数
- 比如 12 和 20的最大公约数是4 最小公倍数是60

- 前置理解:
- 约数: 
- 比目标数小 能被目标数除尽的数 叫约数 
- 12的约数有1 2 3 4 6 12

- 倍数:
- 比目标数大 除以目标数能除尽的
- 12的倍数有12 24 36

- 公约数:
- 即是你的也是我的就叫做公约数
- 12 20的公约数 既能被12除尽 又能被20除尽的数 1 2 4


- 思路：
- 约数代码上的体现: m 除以一个数(i)等于 0 这个数就是约数
- 倍数代码上的体现: i 除以 m 等于0 这个i就是m的倍数

- 公约数和公倍数就是 && m % i == 0 && n % i == 0

> 公约数
- i的取值范围：
- 约数：
- 约数不能比n m当中最小的数还大 我们拿到n m当中最小的数
- 比如 12 的约数 1 2 3 4 6 12 约数不会比12本身还要大
- 
- i的取值范围就应该是1 - 12

- 怎么求最大的公约数
- 上面 i 的取值范围知道了是1 - 12 那么我们从12开始往前 依次拿每一个数当做n m的除数 看看能否除尽一旦除以 它就是n m的最大公约数 

- 要点： 要加break 因为我们是从后往前去匹配 第一个匹配到的就是最大的公约数 所以要break下


> 公倍数
- i的取值范围
- 公倍数(i) 肯定不能比 12 20(n, m)还小 所以肯定大于20
- 20 ~ ？
- 
- ？ 是多少呢 我们定为 n x m 虽然肯定不是最大公倍数 但是它一定能保证是n 和 m的倍数

- 所以i的取值范围就是 12 ~ 12 X 20
- 然后我们开始进行判断

```java

  import java.util.Scanner;
  class Demo {
    public static void main(String[] args) {

      Scanner scan = new Scanner(System.in);
      System.out.println("请输入第一个正整数: ");
      int m = scan.nextInt();

      System.out.println("请输入第二个正整数: ");
      int n = scan.nextInt();

  - 公约数
  - 1. 
    m % i == 0 && n % i == 0 这个条件只能保证 i 是约数 
    但是不能保证这个i是最大的约数

  - 2. 怎么保证 约数i是最大的公约数
    约数的范围是12 那我就拿着 1 - 12 这个范围的数字 依次去除n m
    12 11 10 从后往前的除 一旦发现一个能除尽就说明这个数是最大的公约数

  - 3. i的范围是多少呢
    约数不能比这个数本身还大 公约数不能比12 20这个12还要大
    i的范围就是 i不能超过12 
    i的范围就是 1 - 12


  - 公倍数
  - 1. 
    公倍数肯定不能比12 20小 所以肯定是>=20 所以i的值就是从两个数中的较大的数开始 
    开始的数是20 那结束的数是多少？  12 x 20 两个数相乘肯定是这两个数的倍数 但肯定不是最小公倍数 这样i的范围就能确定下来
    20 - 12x20

  - 2. 范围确定了 那就从20开始循环判断 只要i能除尽n m i就是最小公倍数

  // 获取两个数中最小的数
  int min = (m > n) ? n : m;

  // 方法1： 定义一个最大公约数
  int maxY = 0;

  // 因为我们要从12依次往前去判断 所以初始值是12 每次要-- 循环条件是什么？ 到什么时候停 正常我们循环5次的话是 i<5 现在是倒着的 我们要到1停 那就是 i >= 1呗
  for(int i=min; i >= 1; i--) {
    if(m % i == 0 && n % i == 0) {
      // 找到的是所有的约数
      // System.out.println(i);

--
  // 方式2： 直接使用break关键字 因为我们是从后往前去输出 匹配到的第一个一定是最大的公约数 所以匹配到一个就使用break
  // break;
--

      // 方法1： 使用外部变量进行判断赋值
      if(i > maxY) {
        maxY = i;
      }
    }
  }
  System.out.println("最大公约数为: " + maxY);

-- 公倍数：

  int max = (n > m) ? n : m;
  for(int i = max; i < n * m; i++) {
    if(i % n == 0 && i % m == 0) {
      System.out.println("最小公倍数为: " + i);
      break;
    }
  }
}}
```

----------------------------

### while循环
- 循环结构的四要素
- 1. 初始化条件
- 2. 循环条件     -- boolean类型
- 3. 循环体
- 4. 迭代条件

- 通常情况下 循环结束都是因为 2 中循环条件返回false了


> while结构
  ①
  while(②) {
    ③
    ④
  }

**注意:**
- 写while循环千万不要丢了迭代条件 一旦丢了 就可能导致死循环


> 执行过程: ① -- ② --　③ --　④　　-- ② --　③ --　④ ...

```java
  // 遍历100以内的所有偶数
  class Demo {
    public static void main(String[] args) {
      int num = 0;
      while(num < 100) {
        if(num % 2 == 0) {
          System.out.println(num);
        }
        num++;
      }
    }
  }
```


> for while 区别
- for循环和while循环是可以相互转换的
- 初始化条件的位置不同 for循环的时候是局部变量 while循环的时候是全局变量

----------------------------

### do while 循环
- 循环结构的四要素
- 1. 初始化条件
- 2. 循环条件     -- boolean类型
- 3. 循环体
- 4. 迭代条件

> do while 结构

  ①
  do {
    ③     至少也会执行依次循环体
    ④
  }while(②)


> 执行过程: ① --　③ --　④ -- ② -- ③ --　④ ...
- 上来先走依次逻辑 然后再判断条件
```java 
  class Demo {
    public static void main(String[] args) {
      // 遍历100以内的偶数
      int num = 1; 
      do {
        System.out.println(num);
        num++;
      } while (num < 100);
    }
  }
```


> 练习:
- 从键盘读入个数不确定的整数 并判断读入的正数和负数的个数 输入为0时结束程序
- 一般涉及到循环就要知道 循环结构中的4个部分
  - 循环次数： 这道题我们判断不出来要循环多少次
  - 循环终止的条件: 输入 0 的时候


> 技巧
- 最简单 无限 循环格式: while(true) for(;;)
- 无限循环存在的原因是并不知道循环多少次 需要根据循环体内部某些条件来控制循环的结束

```java 
  import java.util.Scanner;
  class Demo {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        // 定义正数 和 负数
        int z = 0;
        int f = 0;

        while(true) {
          // 这步相当于初始化条件
          int num = scan.nextInt();
          
          if(num > 0) {
            z++;
          } else if(num < 0) {
            f++;
          } else {    // 一旦是0的时候 执行break 跳出循环
            break;
          }
        }

        // 跳出循环后 输出 正负数的个数
        System.out.println(z);
        System.out.println(f);
    }
  }
```

> 总结
- 结束循环有几种方式
- 1. 循环条件部分返回false
- 2. 在循环体中 执行break

----------------------------

### 嵌套循环
- 将一个循环结构A声明在另一个循环结构B的循环体中，就是嵌套循环
- 在开发中嵌套循环一般不会超出3层

- 外层循环： B
- 内层循环： A

> 要点：
- 1. 内层循环结构遍历一遍 只相当于外层循环 循环体执行了一次
<!-- 
  假设外层循环需要执行m次 
  内层循环需要执行n次 
  此时内层循环的循环体一共执行了 n * m 次
 -->

- 2. 外层循环控制行数 内层循环控制列数

```java 
  class Demo {
    public static void main(String[] args) {

      // 输出6个星
      for(int i=0; i<6; i++) {
        System.out.print("*");
      }

      // 输出4行6个星
      for(int i=0; i<4; i++) {
        
        for(int j=0; j<6; j++) {
          System.out.print("*");
        }
        System.out.println();
      }

      - 外层控制行数
      - 内层控制每行的星星

      for(int j=0; j<6; j++) {
        System.out.print("*");
      }
      System.out.println();

      for(int j=0; j<6; j++) {
        System.out.print("*");
      }
      System.out.println();

      for(int j=0; j<6; j++) {
        System.out.print("*");
      }
      System.out.println();

      for(int j=0; j<6; j++) {
        System.out.print("*");
      }
      System.out.println();

      - 既然要输出4行6颗星 那是不是说就可以把上面的代码重复写4次
      - 那500行呢？
      - 所以我们可以把这重复的代码 放到 另一个循环结构中

      - 要点：
      - 先考虑一行怎么输出 然后把实现一行输出的逻辑放入另一个循环中
      - 有一些像 抽离公共部分
    }
  }
```


> 打印 正三角形
<!-- 
  *
  **
  ***
  ****
  *****
 -->

- 我的思路
- 外层循环是控制行数的 那么i=0 i<5
- 内层是用来控制输出*的 那每行输出多少呢？ 我们发现第一行i为0 输出1个* 第二行i为1 输出2个星 那就是<j+1

- 还有一种理解方式 j的个数就等于行号

```java
  for(int i=1; i<=5; i++) {
    for(int j=1; j<=i; j++) {
      System.out.print("*");
    }
    System.out.println();
  }

  // or

  for(int i=0; i<5; i++) {
    for(int j=0; j<i+1; j++) {
      System.out.print("*");
    }
    System.out.println();
  }
``` 


> 打印 倒三角形
- 技巧:
- 在找规律的时候 我们可以将两个数相加 然后用总和减去其中的一个变量

- 技巧:
- 还可以用两个变量相乘得到一个范围(这是突然想起上面的求最小公倍数的案例了)
<!-- 
  *****   0  5    规律 i + j = 5 换句话说 j = 5 - i
  ****    1  4
  ***     2  3
  **      3  2  
  *       4  1
 -->

```java 
  for(int i=0; i<5; i++) {
    for(int j=0; j<5-i; j++) {
      System.out.print("*");
    }
    System.out.println();
  }
```


> 打印 菱形
<!-- 
          *
         * *
        * * * 
       * * * *
      * * * * *
       * * * *
        * * *
         * *
          *
 -->

- 思路:
- 分成两段打印 先打印 ***** 上面的部分 因为上下两部分的规律不一样
- 外层for循环是控制行数
- 内层1for控制 空格
- 内层2for控制 *

```java 
  // 上半部分
  for(int i=0; i<5; i++) {

    // 输出空格
    for(int j=0; j<4 - i; j++) {
      System.out.print(" ");
    }

    // 输出星号
    for(int k=0; k<i + 1; k++) {
      System.out.print("* ");
    }

    System.out.println();
  }

  // 下半部分 偏左平行四边形
  for(int i=0; i<4; i++) {

    // 输出空格
    for(int j=0; j<i+1; j++) {
      System.out.print(" ");
    }

    // 输出星号
    for(int k=0; k<4 - i; k++) {
      System.out.print("* ");
    }

    System.out.println();
  }
```


> 100以内的所有质数
- 质数：
- 只能被1和自身整除的自然数（约数里面只有1和它本身 比如7 约数为1，7）
- 质数在很多地方都有使用 因为质数的特性就是不能再分了

- 取值范围
- 除了1 和 这个数本身的数 跟n相除 看看余数 有没有除尽的
- 所以取值范围就是 2 ~ n - 1

> 方式1: 
- 要点:
- flag变量放在外面 做为全局变量使用 这时候 每一次内层循环结束后 都要讲flag设置为初始值
```java 
  // 标识i是否被j除尽过 一旦除尽 就修改其值
  boolean flag = true;

  for(int i = 2; i <= 100; i++) { // 遍历100以内的自然数
    for(int j = 2; j < i; j++) {  // j被i去除

      // 如果 i % j == 0 说明这个数一定不是一个质数 因为我们的取值范围就是 2 ~ n-1 如果这里还有==0能除尽的 那就说明它一定不是质数

      // i % j != 0 这个数是质数么？ 得除完 也就是 i 得把所有的j 都除一遍 才能确定是不是一个质数 一次搞不定
      if(i % j == 0) {
        flag = false;
      }
    }

    if(flag == true) {
      System.out.println("质数为: " + i);
    }

    // 重置 flag 因为到4的时候 flag为false flag再就没有被修改回初始值 然后 4 之后就不会再被打印
    flag = true;
  }
}
```


> 方式2
- 要点:
- flag变量放在外层循环的里面 这样每一次循环的时候 都会有自己的flag
```java 
  for(int i = 2; i <= 100; i++) {
    for(int j = 2; j < i; j++) {

      // 放在内层循环的里面
      boolean flag = true;

      if(i % j == 0) {
        flag = false;
      }
    }

    if(flag == true) {
      System.out.println("质数为: " + i);
    }

    flag = true;
  }
}
```


> 方式3
- 当 i % j == 0 的时候 我们直接开始下一轮 看看3 是不是质数
```java 
  label:for(int i = 2; i <= 10000; i++) {
    for(int j = 2; j <= Math.sqrt(i); j++) {
      if(i % j == 0) {
        continue label;
      }
    }

    // 能执行到此步骤的都是质数
    System...
  }
```


> 优化
- 1. break
- 只对本身是非质数的自然数是有效的

> System.currentTimeMillis()
- long end = System.currentTimeMillis();

```java 
  if(i % j == 0) {
    flag = false;
    break;
  }


  long start = System.currentTimeMillis();

  for(int i = 2; i <= 100000; i++) {
    boolean flag = true;
    for(int j = 2; j < i; j++) {
      if(i % j == 0) {
        flag = false;
        break;
      }
    }

    if(flag == true) {
      System.out.println("质数为: " + i);
    }
    flag = true;
  }

  long end = System.currentTimeMillis();
  System.out.println(end - start);
```

- 2. 开方
- 对本身是质数的自然数是有效的
- 注意要加上等于 j <=
<!-- 
  for(int j = 2; j <= Math.sqrt(i); j++)
 -->

- 3. 偶数肯定不是质数 我们可以把偶数抽离出来 只去判断奇数


> 完数
- 一个数如果恰好等于它的因子之和 这个数就成为完数
- 例如：
- 6 = 1 + 2 + 3

- 编程找出1000以内的所有完数 (因子: 除去这个数本身的其它约束)
```java 
  public static void main(String[] args) {

    int factor = 0;

    for(int i = 1; i <= 1000; i++) {
      for(int j = 1; j < i; j++) {      还可以是 j<=i/2
        // 进去下面的条件就说明它是因子
        if(i % j == 0) {
          factor += j;
        }
      }

      if(i == factor) {
        System.out.println(i);
      }

      // 重置 factor
      factor = 0;
    }

  }
```

----------------------------

### 特殊关键字的使用
> break
- 使用在switch case 和 循环结构中

- 作用:
- 结束当前循环


> continue
- 只使用在循环结构中

- 作用
- 结束当次循环

**注意:**
- 1. break 和 continue 的后面不能加其它的执行语句
- 2. break默认情况下 会跳出包裹此关键字最近的一层循环
```java 
  for(int i=1: i<=4; i++) {
    for(int j=1: j<=10; j++) {
      if(j % 4 == 0) {
        break;
      }
      System.out.print(j)
    }
    System.out.println()
  }

  // 123
  // 123
  // 123

  因为到4的时候就会结束内层循环 所以每次都是打印到123
```

- 3. continue也是跳出包裹此关键字的当次循环

> 如何让 break 和 coutinue 跳出指定的for循环
- 在for循环的前面 打一个标记 标记: -- break 标记;
```java 
  label: for(int i=1: i<=4; i++) {
    for(int j=1: j<=10; j++) {
      if(j % 4 == 0) {
        break label;
      }
      System.out.print(j)
    }
    System.out.println()
  }
```

----------------------------

### 家庭记账软件
- 模拟实现一个基于文本界面的 家庭记账软件
- 主要设计以下的知识点
- 1. 变量的定义
- 2. 基本数据类型的使用
- 3. 循环语句
- 4. 分支语句
- 5. 方法声明 调用 和 返回值的接收
- 6. 简单的屏幕输出格式控制

<!-- 
  运行项目后显示的用户界面

  1. 收支明细
  2. 登记收入
  3. 登记支出
  4. 退出

  请选择(1-4): 
 -->

- 需求说明
- 假设家庭其实的生活基本金为10000元
- 每次登记收入后 收入的金额应累加到基本金上 并记录本次收入明细 以便后续的查询

- 每次登记支出后 支出的金额应从基本金中扣除 并记录本次支出明细 以便后续的查询
- 查询收支明细时 将显示所有的收入 支出明细列表
- 这里等到学完后面再回来看吧 有些不是技术性的问题

----------------------------

### 数组
- 数组是多个相同类型的数据 按一定顺序排列的集合 并使用一个名字命名
- 并通过编号的方式对这些数据进行统一的管理

> 数组的常见概念:
- 数组名
- 下标
- 元素
- 数组的长度

- 数组本身是 **引用数据类型** 而数组中的元素可以是任何数据类型 包括基本数据类型 和 引用数据类型

- 创建数组对象会在内存中开辟 **一整块** **连续的空间** 而数组名中引用的是这块连续空间的首地址
<!-- 
  数组中一块连续的空间 不会有断开的地方
  不连续的叫做链表 通过地址找到下一个表
 -->

- *数组的长度一旦确定 就不能修改*
<!-- 
  长度一旦确定 就不能修改
  比如我做着做着发现还想在数组中增加的元素 在后面补补 不行补不了
 -->

- 我们可以直接通过下标的方式调用指定位置的元素 速度很快

- 数组的分类：
- 1. 按照维度
    一维数组 二维数组 ...

- 2. 按照元素的数据类型分: 
    基本数据类型元素的数组 引用数据类型元素的数组(即对象数组)

----------------------------

### 一维数组的初始化

> 一维数组的声明和初始化
- 数组的初始化 分为 **静态初始化** 和 **动态初始化** 
- 数组是引用类型的数据 在创建数组的时候 需要使用 new 关键字 (相当于创建一个对象)


> 静态初始化
- 解析:
- 数组的初始化和数组元素的赋值操作同时进行

- 语法:
    - 数组类型[] 数组名 = new 数组类型[]{指定元素, 指定元素...}
    - int[] ids = new int[]{1, 2, 3};


> 动态初始化
- 解析:
- 数组的初始化和数组元素的赋值操作分开进行

- 语法:
    - 数组类型[] 数组名 = new 数组类型[指定数组长度]
    - String[] names = new String[5]

**注意:**
- 不管是静态初始化 还是 动态初始化 *一旦数组初始化完成 数组的长度就确定了*
- 长度一旦确定就不能修改
<!-- 
  也就是说 我们创建了一个长度为5的数组 然后我们要存7个数据
  那没有办法 只能再创建一个长度为7的数组 然后把数据一个个的复制进来
 -->


> 如何调用数组的指定位置的元素
- java中通过**索引**来给数组的元素赋值 或者 调用元素
<!-- 
  String[] names = new String[5];
  names[0] = "sam";
  names[1] = "erin";
  names[2] = "nn";
  
  我们这里只添加了3个元素
 -->  


**注意:**
- 这里注意 我们只能写到0 - 4 再给下标5添加数据的时候 在java中是不行的
- 数组的长度是5 但是我们只添加了3个元素 那么其余的两个元素为**null** 因为是String类型的数组
<!-- 
  这里跟js不一样 js中是undefined
 -->  


> 如何获取数组的长度
- 数组的下标是从0开始 到数组的长度-1结束

- 属性:
- length
<!-- 
  System.out.println(ids.length);
 -->


> 如何遍历数组
```java 
  String[] names = new String[5];

  for(int i=0; i<names.length; i++) {
    System.out.println(names[i]);
  }
```


> 数组元素的默认初始化值
- 我们没有给数组的元素指定值 但是该元素会有默认值
- 该初始化值是系统在给我们分配空间的时候自动指定的值

```java 
  // 该数组 我们并没有给元素指定 值
  int[] arr = new int[6];

  for(int i=0; i<arr.length; i++) {
    System.out.println(arr[i]);     // 0 int类型的数组的默认值
  }
```

> 数组的默认初始化值:
- 1. 所有数组的元素是整型的时候 它的初始化值都一样为: 0
<!-- 
  - int[]     初始化值为 0
  - byte[]    0
  - short[]   0
  - long[]    0

  long[] arr = new long[6]
 -->

- 2. 数组元素的类型为 浮点型 的时候 它的初始化值为: 0.0
<!-- 
  float[] arr = new float[6]
 -->

- 3. 数组元素的类型为 char 型 它的初始化值为: 0(ASCII码的0) 
<!-- 
  控制台会显示不出来 像是空格
  但它不是真正的空格 它就是一个 ASCII码的值
 -->

- 4. 数组元素的类型为 boolean 型 它的初始化值为: false
<!-- 
  因为在底层 false 就是0
  boolean[] arr = new boolean[6];
 -->

- 5. 数组元素的类型为 String 型 它的初始化值为: null
<!-- 
  String[] arr = new String[6]
-->

- 6. 所有的引用类型的初始值都为 null
<!-- 
  引用类型的变量 要么就是null 要么就是地址值
 -->


> 数组的内存解析
- 数组在内存中是怎么分配结构的

- 内存的简化结构:
- 先说下常用的结构 栈(stack) 和 堆(heap) 和 方法区(method area)
<!-- 
  stack栈
  栈是一个从下至上的结构 线性的放数据

  stack中存放着一般是局部变量(一般方法中的变量都是局部变量)
  后添加的在上面 当整个方法结束后 会释放变量 变量依次从栈顶弹出 

  也就是说 栈结构是先进后出

  --------        
  | 数据4 |
  | 数据3 |
  | 数据2 |
  | 数据1 |
  --------


  heap堆
  堆中存放的数据是new出来的结构  比如 对象 和 数组
  ----------------------
  |                     |
  |                     |
  |                     |
  |                     |
  ----------------------


  method area
  静态域里存放着静态的变量
  方法区里面除了常量池 和 静态域之外 还有类加载的信息
  ----------------------------------
  |    常量池         静态域         |
  |   --------      -------------  |
  |   |       |     |           |  |
  |   |       |     |           |  |
  |   |       |     |           |  |
  |   --------      -------------  |
  |                                |
  ----------------------------------

  后面介绍的字符串就放在了 常量池
  static就放在了静态域中
 -->


> 示例： 一维数组的内存解析
- 通过代码我们看看下列的两种情况在内存中是如何分配 和 解析的
  int[] arr = new int[] {1, 2, 3};

<!-- 
  1. 放在main方法中的变量都是局部变量 局部变量都会在 栈结构 中 
      我们在栈结构中 放入arr变量

  2. new int[]{1,2,3} 只要是new出来的都是在 堆结构 中
      而且这个数组的长度是3 所以在堆结构中创建一个 长度为3且连续的存储的结构 并赋上元素的初始值

  3. 堆结构中的 □-□-□ 会有一个 首地址值(第一个元素的地址值)
      首地址值通常是用一个16进制的数(0x开头)来表示 我们会把这个地址值赋值给 栈空间 中的arr

  4. 栈空间中的arr变量 通过地址值 就能找到堆空间中的数组了

  5. 然后开始对堆空间中的数组进行赋值 将默认值替换掉

  --- 栈空间 ---        --- 堆空间 ---

  arr:0x34ab           □-□-□ (第一个元素会有一个首地址值: 0x34ab)

-->

- 我们再来看看下面的代码

  String[] arr = new String[4];
  arr[1] = "刘德华";
  arr[2] = "张学友";
  arr = new String[3];
 
<!--
  1. String[] arr -- 该arr会在 栈空间中声明一个变量 arr
  2. new String[4]; -- 然后会在堆空间中开启一个长度为4且连续的数组
  3. 堆空间中的数组会有一个首地址值 将首地址值赋值给栈空间中的arr
  4. arr通过首地址值指向堆空间中数组的实体 并赋元素初始值

  5. 通过下标的找到堆空间的数组中的 第2 3个元素进行赋值
  6. arr又指向了一个新的数组

  原本的数组会触发垃圾回收(垃圾回收使用了 引用技术算法)

  // 引用技术算法
  - 判断下堆空间中的数组是否还有栈空间的引用指过来 现在发现栈空间没有引用指向这个数组 就意味着它不会再次被调用了 那就会被当做是垃圾 然后被回收 该垃圾会在一个不确定的时间被回收掉


  // 最后 整个main方法执行完毕后 局部变量都会没有了 依次会从栈顶弹出
  变量弹出后 堆空间中的数组没有变量指向它 它也会被当做垃圾被回收掉

  // 所以main方法执行完后 栈 和 堆 都会被清空掉
 -->

> 练习
- 升景坊单间短期出租4个月 550一个月(水电煤公摊 网费35) 空调 卫生间 厨房齐全
- 屋内均是it行业人士 喜欢安静 所以要求出租者最好是同行 或者 刚毕业的年轻人 爱干净 安静
```java 
  package src.com;
  public class Demo {
    public static void main(String[] args) {
      
      int[] arr = new int[]{8, 2, 1, 0, 3};
      int[] index = new int[]{2, 0, 3, 2, 4, 0, 1, 3, 2, 3, 3};
      String tel = "";
      for(int i=0; i<index.length; i++) {
        tel += arr[index[i]];
      }
      System.out.println("联系方式: " + tel);
    }
  }

  // 联系方式: 18013820100
```


> 练习2:
- 从键盘读入学生成绩 找出最高分 并输出学生成绩等级
- 成绩 >= 最高分 - 10  -- 等级为A
- 成绩 >= 最高分 - 20  -- 等级为B
- 成绩 >= 最高分 - 30  -- 等级为C
- 其余 等级为D

- 提示 先读入学生人数 根据人数创建 int数组 存放学生成绩

- 要点:
- 1. Scanner效果是让用户输入数据 在控制台中 然后我们用变量来接收数据
- 2. if else if 范围大的放在下面 范围小的放在上面
```java 
  package src.com;

  import java.util.Scanner;
  public class Demo {
    public static void main(String[] args) {

      int max = 0;
      Scanner scan = new Scanner(System.in);

      System.out.println("请输入学生人数");
      // 用户与控制台交互效果 让用户输入数据
      int count = scan.nextInt();

      // 根据学生个数创建数组
      int[] arr = new int[count];

      // 给数组的元素赋值
      System.out.println("请依次输入"+count+"名学生的成绩");
      for(int i=0; i<arr.length; i++) {
        arr[i] = scan.nextInt();
        if(arr[i] > max) {
          max = arr[i];
        }
      }

      for(int i=0; i<arr.length; i++) {
        // 范围小的放在上面 范围大的放在下面
        if(arr[i] >= max - 10) {
          System.out.println("成绩为" + arr[i] + " -- 对应等级是: A");
        } else if(arr[i] >= max - 20) {
          System.out.println("成绩为" + arr[i] + " -- 对应等级是: B");
        } else if(arr[i] >= max - 30) {
          System.out.println("成绩为" + arr[i] + " -- 对应等级是: C");
        } else {
          System.out.println("成绩为" + arr[i] + " -- 对应等级是: D");
        }
      }
    }
  }
```

----------------------------

### 多维数组的使用
- 数组属于引用数据类型 数组的元素也可以是引用数据类型

- java语言里提供了支持多维数组的语法
- 如果说可以把一维数组当成几何中的线性图形 那么二维数组就相当于一个表格 像右图excel中的表格一样
<!-- 
  姓名    联系电话
  sam    18698712060
 -->

- 对于二维数组的理解：
- 我们可以看成是一维数组arr1又作为另一个一维数组arr2的元素而存在
<!-- 
  是不是说 一维数组相当于flex 二维数组就是grid
  下面有说
 -->

> 应用场景
- 既然老师说二维数组就是像excel表格那样 姓名 和 电话 一一对应 而姓名和电话又各自是一个数组
- 然后我们就能用同一个index 获取对应位置的一组数据了
<!-- 
  name    tel
  sam     186

  name[0] : tel[0]
 -->

- 其实从数组底层的运行机制来看 其实没有多维数组
<!-- 
    --- 栈结构 ---      --- 堆结构 ---
                         □-□ □-□ □-□   
                        ↗ ↗ ↗
    arr        →       □-□-□

    本质上看arr还是一个一维数组 只不过arr中的每一个元素又是一个一维数组
    或者准确电视或 每一个arr中的元素 存放在另一个数组的地址值
 -->


> 二维数组的声明和初始化
- 和一维数组类似
<!-- 
  回顾一维数组
  int[] arr = new int[]{1,2,3}
 -->

> 二维数组静态初始化
- 语法:
- int[][] arr = new int[][]{{1,2,3}, {4,5,6}}
- 每一个元素的位置是一个数组
- arr[0] = {1, 2, 3}
- arr[1] = {4, 5, 6}
<!-- 
  [[1,2,3], [4,5,6]]
 -->

> 二维数组动态初始化
- new String[3][2] 
<!-- 
  -------------
  |     |     |   第一行  每行里面有两个元素 [?, ?]
  -------------
  |     |     |   第二行  每行里面有两个元素 [?, ?]
  -------------
  |     |     |   第三行  每行里面有两个元素 [?, ?]
  -------------

  [3]可以看做是3行
  [2]可以看做每行的两个元素  [?, ?]
 -->

- 语法:
- String[][] arr = new String[3][2]
- String[][] arr = new String[3][]
<!-- 
  String[][] arr = new String[3][2]
  先是3个元素构成的一个数组 内部的每一个元素又是一个数组 这个数组的长度为2
  [[1,2], [2,3], [4,5]]

  String[][] arr = new String[3][]
  [[], [], []]    里面还不知道是长度为几的数组
 -->


- 应用场景: 
- 1. String[][] arr = new String[3][2]
- 2. String[][] arr = new String[3][]

- 1的应用场景:
- 当我们 ”行“ ”列“ 都固定的情况下 我们使用 1

- 2的应用场景:
- 当我们 ”行“ 确定 但是 ”列“ 不确定是长度为几的数组的时候 我们可以先不指定 之后用到的时候再指定
<!-- 
  new String[3][]
  System.out.println(strArr[0][0]);   // 空指针异常
  -------
  new Sting[3]    我们可以动态指定内层元素数组的长度
  -------
  new Sting[7]
  -------
  new Sting[10]
  -------
 -->


- 这样写也行
<!-- 
  int arr[] = new int[]{1, 2, 3}
  int arr[][] = new int[]{{1, 2, 3}, {4, 5, 6}}

  int[] arr[] = new int[]{{1, 2, 3}, {4, 5, 6}}
 -->


> 数组的简写形式 (类型推断)
- 只针对于静态数组的创建方式 
<!-- 
  其实就是 let arr = [1,2,3] 和 let arr = new Array(1,2,3) 一样
 -->

- 语法：
- int[] arr = {1,2,3}

- 语法:
- int[][] arr = {{1,2,3}, {1,2,3}}


**注意：**
- 简写方式的时候 静态数组的 创建和初始化是在一行的可以简写
- int[] arr = {1,2,3}   // ok

- int[] arr;
- arr = {1,2,3}         // error

- int[] arr;
- arr = new int[]{1, 2, 3}    // ok


> 如何调用数组的指定位置的元素
- 静态初始化的二维数组 的指定位置的元素
- int[][] arr = new int[][]{{1,2,3}, {4,5}};    // 输出2
- System.out.println(arr[0][1]);

- 动态初始化的二维数组 的指定位置的元素
- String[][] arr2 = new String[3][2];   // 输出null
- System.out.println(arr2[1][1]);

> 有点难的地方
- String[][] arr3 = new String[3][];    // NullPointerException
- System.out.println(arr3[1][0]);
<!-- 
  java.lang.NullPointerException
  空指针 的报错信息

  new String[3][]
        --  显示创建了 3行 但是每一行的位置是空的
        -- 每一行的位置应该存的是 另一个一维数组的地址值
        -- 现在没有创建另一个一维数组 就没有地址值 就是空指针
      

  new String[3][]
      这只是有了3行元素 但是每个元素上还没有东西
      我们要是想输出System.out.println
      就要赋值
 -->

- new String[3][]  --  strArr[1][0]
- 上面说了假如我们直接输出的话 会报错
- 因为每一行的元素 还没有值 我们假如想打印第2行的第一个元素 就必须先赋值
- 怎么赋值呢？
- strArr[1] 是第二行元素
- strArr[1] = new String[3]
- 既然每一个元素还是一个一维数组 那我就给它设置为一维数组 长度为3 这样它就又默认值了
```java 
  String[][] strArr = new String[3][];
  // System.out.println(astrArrrr3[1][0]);  报空指针的错

  strArr[1] = new String[3];
  System.out.println(strArr[1][0]);

  // 输出2维数组中的一个元素 这个元素是一个长度为3的一维数组 输出这个一维数组的第0个值
```

- 3维数组:
- 如果定义的是3维数组 那就是3个 String[][][] arr = new ...


> 如何获取数组的长度
- 只要是数组就应该有 length 属性

- int[][] arr = new int[][]{{1,2,3}, {4,5}, {6,7,8}};
- System.out.println(arr.length);   // 3
<!-- 
  上面这样是打印 arr 这个数组的长度 跟它每一个元素（又是一个一维数组)没有关系
  arr[1].length  查看的是 内部第2个元素对应的数组的长度
-->


> 如何遍历二维数组
- 需要*双层for循环*
- 3维数组就是3层for循环
```java 
  int[][] arr = new int[][]{{1,2,3}, {4,5}, {6,7,8}};
  System.out.println(arr.length);   // 3

  for(int i=0; i<arr.length; i++) {
    // 输出二维数组的外层所有元素;
    System.out.println("@整体数组的每个元素为" + arr[i]); 

    for(int j=0; j<arr[i].length; j++) {

      // 输出二维数组的每一个元素对应的数组
      System.out.println("#内层每一个元素中的一维数组的元素为" + arr[i][j]);

    }
  }
```


> 数组元素的默认值初始化值
- 规定：
- 二维数组分为外层数组的元素 和 内层数组的元素
<!-- 
  int[] arr = new int[4][3]

  外层元素:
    arr[0], arr[1], arr[2], arr[3], 

  内层元素:
    arr[0][0], arr[0][1], arr[0][2], 
 -->

- 外层数组：
- 因为外层数组的每一个元素就是一个一维数组 这时候我们输出的 就会是这个*一维数组的地址值*
<!-- 
  因为变量里面保存的就是地址值
  而外层数组的每一个元素位保存的就是 另一个一维数组的地址值
 -->

```java
  // 只有动态创建的数组 才能够看出来 默认值
  // 外层元素的默认值
  System.out.println(arr[0]);     // [I@626b2d4a地址值

  // 内层元素的默认值
  System.out.println(arr[0][0]);  // 0
```

> 地址值解析 [I@626b2d4a
- [ -- 一维数组
 
  [   一维
  [[  二维
  

- I        -- int型
- F        -- float型
- Ljava.lang.String;@5e265ba4  -- string
- @        -- 在什么位置
- 626b2d4a -- 真正的地址值 16进制标识的


- int[][] arr = new int[4][];
- System.out.println(arr[3]);     // null
- System.out.println(arr[3][1]);  // 报错


> 总结
- 针对于初始化方式一: int[][] arr = new int[4][2]
    - 外层元素的初始化值为: 地址值
    - 内层元素的初始化值为: 与一维数组初始化情况相同

- 针对于初始化方式二: int[][] arr = new int[4][]
    - 外层元素的初始化值为: null
    - 内层元素的初始化值为: 报错 不能调用 空指针异常


> 二维数组的内存解析
<!-- 
  int[][] arr = new int[4][];
  arr[1] = new int[]{1, 2, 3}
  arr[2] = new int[4]
  arr[2][1] = 30



  int[][] arr = new int[4][];
  因为是[4][] 所以arr的每一个元素的默认值为 int[] 
  但是int[] 还没有赋值 就是null
  因为默认值是什么取决于这个数组对应元素的类型

  --- 栈结构 ---          --- 堆结构 ---

                          首地址值: 0x1234
                          ---------
                          int[] -- null
                          ---------
                          int[] -- null   → 
                          ---------
                          int[] -- null
                          ---------
                          int[] -- null
  arr:0x1234              ---------


  arr[1] = new int[]{1, 2, 3}
  通过 arr[1] 索引 找到了第2行的元素
  new int[]{1, 2, 3} 给它赋了一个数组 这时候的默认值就是 int - 0

                        首地址值: 0x7788
  ---------             ---------
  0x7788        →       0 0 0    --  1 2 3
  ---------             ---------
 -->


> 练习1
- 声明: int[] x, y[] 在给x y变量赋值以后 以下选项允许通过编译的是
<!-- 
  x是一维数组
  y是二维数组   相当于

  int[] x;
  int[][] y;
  int[] y[];
 -->

- a. x[0] = y
<!-- 
  x是一个一维数组 
  x[0] 是一维数组中的一个数字

  y是一个二维数组

  数字 和 二维数组的类型不一样 在java中不能赋值
  int num = 1
  int[] arr = {1, 2, 3}
  num = arr; 

  // 不適合な型: int[]をintに変換できません:
  类型不符 且不能自动类型提升
 -->

- b. y[0] = x
<!-- 
  二维数组的元素是一维的 x也是一维的 类型相同可以赋值
 -->

- c. y[0][0] = x
<!-- 
    y[0][0] 它是int型的一个数字
    x是一个数组

    类型不同 不行
 -->

- d. x[0][0] = y

- e. y[0][0] = x[0]
<!-- 
  双方都是int型的数字 类型相同 可以赋值
 -->

- f. x = y
<!-- 
  类型不同 因为 一个一维数组 一个二维数组 类型不同 不能赋值
  int[]

  int[][]

  java在定义变量的时候就给变量确定的类型 赋值的时候 只有同类型的才能相互赋值

  但是 x y 存储的不都是地址值么 按照这么来说 为什么会报错呢？
  它们其实存储的不光是地址值 我们在打印的数组的时候 不光有地址值 还有该数组的类型
  [
  [[
  赋值的时候 先是类型匹配 然后才要求地址值也匹配 因为xy的类型不一样 所以不行
 -->

- 要点：
- *赋值的时候 同类型之间的才能赋值*
<!-- 
  比如 flase 只能赋值给 布尔值
  比如 1.1 只能赋值给 浮点型
 -->

- 能不能通过编译 就看 满足不满足 赋值的规则


> 练习2
- 使用二维数组打印一个 10行的 杨辉三角

- 提示
- 第一行有一个元素 第n行有n个元素
- 第一行的第一个元素 和 最后一个元素都是1
- 从第三行开始 对于非第一个元素 和 最后一个元素的即


- 杨辉三角
- 随便找一个数字 这个数字上面的数字 和 上面数字左面的数字的和 等于随便找的这个数字
- 用代码翻译的话 就是

-   随便找的数字    上行数字的左侧数字      上行数字
- yanghui[i][j] = yanghui[i-1][j-1] + yanghui[i-1][j]

<!-- 
      1
      1 1
      1 2 1
      1 3 3 1
      1 4 6 4 1
      1 5 10 10 5 1
 -->

- 每行除了第一个 和 最后一个数字 其余的数字都按照这个规律来就是杨辉三角

- 思路：
- 我们造一个二维数组 然后给这个二维数组赋值 在赋值的时候满足这个规律就可以了

- https://www.bilibili.com/video/BV1Kb411W75N?p=160&spm_id_from=pageDriver
- 没看 这个链接的上一集 没事的时候可以看看



### 数组中涉及到的常见的算法
> 扩展练习
- 1. 数组元素的赋值(杨辉三角, 回形数等)
- 2. 求数值型 数组中元素的最大值 最小值 平均数 总和等
- 3. 数组的复制 反转 查找(线性查找， 二分法查找)
- 4. 数组元素的排序算法


> 1. 数组元素的赋值
- 创建一个长度为6的int型数组 要求数组元素的值都在1-30之间 且是随机赋值
- 同时 要求元素的值各不相同  (难点就是在这 怎么保证元素的值不相同)

- 思路:
- 1. 创建动态数组
- 2. 赋值 当赋值给0索引的时候没有问题 当赋值给1索引的时候 要比较下前面的 看看是不是重复的 一样的就要重新赋值 重新赋值后还要对比 直到跟前面的元素不一样了 再下一个

- 3. 每写入一个数字都要和前面的数字进行对比 看看一样不一样 一样可以 不一样还要重新赋值 并继续对比

```java 
  int[] arr = new int[6]
  for(int i=0; i<arr.length; i++) {
    arr[i] = (int)(Math.random()*30) + 1;

    boolean flag = false;
    while(true) {
      for(int j=0; j<i; j++){
        if(arr[i] == arr[j]) {
          flag = true;
          break;
        }
      }

      if(flag) {
        arr[i] = (int)(Math.random()*30) + 1);
        flag = false;
        continue;
      }
      break;
    }
  }

  for(int i=0; i<arr.length; i++) {
    System.out.println(arr[i])
  }

------------------

  方式2: 这个可以呀

  int[] arr = new int[6];
  for(int i=0; i<arr.length; i++) {
    arr[i] = (int)(Math.random()*30) + 1;
    for(int j=0; j<i; j++) {
      if(arr[i] == arr[j]) {
        i--;
        break;
      }
    }
  }

  for(int i=0; i<arr.length; i++) {
    System.out.print(" " + arr[i]);
  }
```


> 算法题
- 如果我输入一个数字3 希望在控制台打印出如下形式的数据 矩阵赋值的时候是回形数
<!-- 
  1 2 3
  8 9 4
  7 6 5
 -->

```java 
  // 方式1
  int len = scanner.nextInt();

  创建一个动态数组 用来承接这些数字
  int[][] arr = new int[len][len];

  int s = len * len
  // k = 1 : 向右
  // k = 2 : 向下
  // k = 3 : 向左
  // k = 4 : 向上

  int k = 1;
  int i = 0, j = 0;

  for(int m = 1; m <= s; m++) {
    if(k == 1) {
      if(j<len && ar[i][j] == 0) {
        arr[i][j] = m;
      } else {
        k = 2;
        i++;
        j--;
        m--;
      }
    } else if(k == 2) {
      if(i<len && arr[i][j] == 0) {
        arr[i++][j] = m;
      } else {
        k = 3;
        i--;
        j--;
        m--;
      }
    } else if(k == 3) {
      if(j>=0 && arr[i][j] == 0) {
        arr[i][j--] = m;
      } else {
        k = 4;
        i--;
        j++;
        m--;
      }
    } else if(k == 4) {
      if(j==0 && arr[i][j] == 0) {
        arr[i--][j] = m;
      } else {
        k = 1;
        i++;
        j++;
        m--;
      }
    }
  }

  for(int m = 0; m <arr.length; m++) {
    for(int n=0; n<arr[m].length; n++) {
      System.out.print(arr[m][n] + "\t");
    }
    System.out.println();
  }

  还有种做法 自己看看吧
```


> 2. 求数值型 数组中元素的最大值 最小值 平均数 总和等
- 定义一个int型的一维数组 包含10个元素 分别赋一些随机整数
- 然后求出所有元素的最大值 最小值 和值 平均值 并输出出来

- 要求:
- 所有随机数都是两位数

- 提示：
- [0, 1) * 90 -- [0, 90) + 10 -- [10, 100) -- [10, 99)
- (int)(Math.random()*90 + 10)

```java 
  // 生成随机的两位数 [10, 99]
  // 公式： (int)(Math.random() * (99 - 10 + 1) + 10)
  int[] arr = new int[10];

  // 给这个数组 赋上两位随机数 也就是赋值操作
  for(int i = 0; i < arr.length; i++) {
    arr[i] = (int)(Math.random() * (99 - 10 + 1) + 10);
  }

  // 遍历数组 看看啥样的
  for(int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
  }
  System.out.println();

  // 求数组元素的最大值
  int maxValue = 0;  // 还可以取数组中的第一个元素的值
  for(int i = 0; i<arr.length; i++) {
    if(arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }
  System.out.println("最大值为: " + maxValue);
  

  // 求数组元素的最小值
  int minValue = arr[0];  // 还可以取数组中的第一个元素的值
  for(int i = 1; i<arr.length; i++) {
    if(arr[i] < minValue) {
      minValue = arr[i];
    }
  }
  System.out.println("最小值为: " + minValue);


  // 求数组元素的总和
  int sum = 0;
  for(int i = 0; i<arr.length; i++) {
    sum += arr[i];
  }
  System.out.println("总和: " + sum);


  // 求数组元素的平均数
  double avgValue = 0;
  avgValue = sum / arr.length;
  System.out.println("平均数为: " + avgValue);
```


> 3. 数组的复制 反转 查找(线性查找， 二分法查找)
- 使用简单数组
- 1. 定义arr1 和 arr2 两个变量 int类型的数组
- 2. 静态初始化数组 8个元素 2 3 5 7 11 13 17 19
- 3. 显示arr1的内容
- 4. 赋值arr2变量等于arr1 修改arr2中的偶数索引元素 使其等于索引值
- 5. 打印arr1

- 思考
- arr1 和 arr2什么关系

- 扩展
- 修改题目 实现arr2 对 arr1 数组的复制

```java 
  int[] arr1, arr2;

  arr1 = new int[] {2, 3, 5, 7, 11, 13, 17, 19};

  for(int i = 0; i < arr1.length; i++) {
    System.out.print(arr1[i] + " ");
  }
  System.out.println();

  // 赋值arr2变量等于arr1 修改arr2中的偶数索引元素 使其等于索引值
  arr2 = arr1;  
      // 该操作不能称作数组的复制 这相当于创建了一个快捷方式


  for(int i = 0; i < arr2.length; i++) {
    if(i % 2 == 0) {
      arr2[i] = i;
    }
  }

  // 分别看下 arr1 和 arr2
  for(int i = 0; i < arr1.length; i++) {
    System.out.print(arr1[i] + " ");
  }
  System.out.println();
  for(int i = 0; i < arr2.length; i++) {
    System.out.print(arr2[i] + " ");
  }
  System.out.println();

  // 我们修改的是arr2 但是arr1也发生了变化 为什么？
  // 因为我们是把arr1的地址值给了arr2 堆空间中只有一个数组 都指向了堆空间中唯一一个数组的实体

  // 或者 我们这么记 我们new一次堆中就有一个数组 我们上面new了一次 所以堆中只有一个数组
```

- 实现复制arr1的逻辑
- 上面我们直接 arr1 = arr2 这种做法相当于 创建了快捷方式 堆中还是一个数组
```java
  arr2 = new int[arr1.length];  // new就相当于创建了一个数组
  for(int i = 0; i < arr1.length; i++) {
    arr2[i] = arr1[i];
    System.out.print(arr2[i]);
  }
  System.out.println();
```

- 要点：
- 要实现复制的话 我们就*真的要重新 new 一个数组* 这样才是在堆结构中创建了一个数组


> 复制
```java 
  String[] arr1 = new String[]{"jj", "dd", "mm"};

  // 数组的复制
  String[] arr2 = new String[arr1.length];
  for(int i=0; i<arr1.length; i++) {
    arr2[i] = arr1[i];
  }
```


> 反转
- 方式1：
- 思路:
- 我们定义 临时变量 然后第一个 和 最后一个 利用临时变量交换位置 第二个 和 倒数第二个交换位置 依次进行

- 要点:
- 既然数组是一对对的 那么我们只需要换一遍 比如 1 2 3 4 5 6 循环3遍就可以了
- 如果循环arr1.length 那就说明循环了6遍 相当于 又换回去了 因为循环3遍的时候 已经是 6 5 4 3 2 1 了

- 那 / 2 的话 会不会除尽 或者 i<arr1.length / 2 要不要 <= 呢
- 如果要是7个元素呢？ 其实7个元素 也/2就可以了 中间的不用换
```java 
  String[] arr1 = new String[]{"jj", "dd", "mm"};

  // 数组的反转
  for(int i=0; i<arr1.length / 2; i++) {

    // 将第一个元素给临时变量
    String temp = arr1[i];

    // 将最后一个元素给第一个元素
    arr1[i] = arr1[arr1.length - i - 1];

    // 将临时变量中保存的第一个元素 给 最后一个元素
    arr1[arr1.length - i - 1] = temp;
  }
```

- 方式2：
- 思路：
- 定义一个头的变量 再定义一个尾的变量 让i++ 让j--；
- 终止条件为 i<j
<!-- 
  i 是从前往后
  j 是从后往前

  i 和 j 不要碰头(要不反过来了) 所以当不满足 i < j 的时候停止
 -->

```java 
  // 方式2 定义一个头的变量 再定义一个尾的变量 让
  for(int i=0, j=arr1.length-1; i<j; i++, j--) {

    // 将第一个元素给临时变量
    String temp = arr1[i];

    // 将最后一个元素给第一个元素
    arr1[i] = arr1[j];

    // 将临时变量中保存的第一个元素 给 最后一个元素
    arr1[j] = temp;
  }
```


> 查找
- 在众多的数据当中查找一个数据看看存在与否
- 查找有很多的实现方式 这里只提出两种方式
- 1. 基本的 线性查找
- 2. 用的多 二分法查找

> 线性查找
- 从前往后依次查找 找到之后就停止
- 通过遍历的方式 一个一个的数据进行比较 查找
- 具有普遍的实用性

- 查找结果
- 1. 利用 true 和 false 来解决
- 2. 找到后告诉我位置 没找到告诉我没有

**注意：**
- 如果是判断是否相等的时候 如果是 int型 我们使用 ” == “
- 如果是判断是否相等的时候 如果是 String型  我们使用 字符串.equals(内容) 看看字符串中是否有给定的内容

> 字符串.equals(给定内容)
- 查看该字符串中是否包含给定内容

```java 
  String[] arr1 = new String[]{"jj", "dd", "mm"};

  // 查找 or 搜索 -- 线性查找(从前往后一个个找)
  // 1 定义一个查找的目标
  String desc = "ll";

  // flag为true = 没找到
  boolean flag = true;

  for(int i=0; i<arr1.length; i++) {

    // 当字符串做全等判断的时候 使用
    if(desc.equals(arr1[i])) {
      System.out.println("找到了指定的元素 位置为: " + i);

      // 当找到了的时候将flag置为false 代表找到了
      flag = false;
      break;
    }
  }

  // 因为循环结束后才知道结果 所以在循环外打印
  // 因为上面要过遍循环才会走到这里 所以到这里就能看到结果 
  if(flag) {
    System.out.println("没有找到哦");
  }
```


> 二分法查找
- 前提:
- 所要查找的数组必须有序 在有序的前提下 我们再进行查找
<!-- 
  String[] arr1 = new String[]{"jj", "dd", "mm"};
  上面的数组就看不到顺序

  int[] arr = new int[] {-98, -34, 2, 24, 55, 88, 988};
  上面的数组就有顺序 至于升序还是降序就无所谓
 -->

- 相对于线性查找的话 比较快 二分法查找也叫做 **折半查找**
- 上来我就定位到中间
<!--  
    1 2 3 4 5 6 7 8 9 10
    上来就从一半的位置开始
 -->

- 思路：
- 每次比较中间值 折半的方式检索
<!-- 
    1. 我们先拿 目标值 和 中间值 15 进行对比 如果 目标值 > 中间值 就对右侧部分再次进行对半分
                小          大
                      |
                      |
          2 5 6 8 10 1|5 18 20 22 25 28

    2. 再次对半 然后在看中间值 和 目标值的大小 然后再进行选择对哪个部分进行对半
                       |
                18 20 2|2 25 28
 -->

- 要想得到中间值(中间索引) 那就要 未 - 头 / 2

- 代码部分
```java 
  // 二分法查找 前提要查找的数组必须有序 降序还是升序无所谓
  int[] arr = new int[] {-98, -34, 2, 24, 55, 88, 988};

  // 定义目标值
  int dest = -34;

  // 求中间值
  // 定义 首索引
  int head = 0;
  
  // 定义 末位索引
  int end = arr.length - 1;

  // 默认 true 为 没找到
  boolean flag = true;

  // 循环终止的条件 head 不能超过 end 两个值相当的时候也要看一下 万一它就是我们想要得值呢？
  while(head <= end) {
    // 获取 中间值 因为是int所以除不尽的时候我们取的就是整数部分 正好
    int middle = (head + end) / 2;

    // 得到中间值后 就看看 目标值 和 中间值 进行比较
    // 如果 目标值 和 中间值相等 说明找到了
    if(dest == arr[middle]) {
      System.out.println("找到了指定的元素 索引位置为：" + middle);
      flag = false;
      break;

      // 进入以下判断说明我们的目标值应该在 左部分 那我们只考虑 end
    } else if(arr[middle] > dest) {
      // 那我们就让 end 为 middle 前面一个索引
      end = middle - 1;

      // 进入下面的循环代表我们的目标值应该在 右部分 我们只考虑 head
    } else {
      head = middle + 1;
    }
  }

  if(flag) {
    System.out.println("没有找到哦");
  }
```


> 技巧
- 前提 数组有序 且 规律 我们可以不用从1半的位置开始查找 而是从 几分之几的位置开始
<!-- 
  目标值 - 第一个元素 / 最大的元素 - 第一个元素
 -->


> 排序算法
- 排序的操作在实际开发中用的也比较多 很多情况下都有排序的诉求
- 必须评分高低 排序
- 距离远近 排序
- 价格 销量 评价等等

- 有的时候我们为了查找更快 也可以先对数组进行排序 比如二分法 但二分法会要求数组有序 所以我们可以先对数组进行排序 后进行二分法查找

- 排序定义：
- 假设含有n个记录的序列(r1, r2, ...rn) 其相应的关键字序列为(k1, k2, ...kn)
- 将这些记录重新排序为(ri1, ri2, ...rin)
- 使得相应的关键字值 满足条件(ki1, ki2, ...kin)这样的一种操作 成为排序

- 通常来说 排序的目的就是快速查找
<!-- 
  比如我们有一个数组 就是整型的数据 它的关键字就是我们数的本身 我们希望它是从小到大的

  我们在排序的时候 不一定是一个纯数字 比如 我们在淘宝上买水杯 会显示一个水杯的列表
  那一个水杯并不是一个 数字 是一个 对象了

  这些对象也是可以排序的 我们按照对象中的属性来排序 这些属性就可以理解为上面说的关键字
 -->


> 衡量排序算法的优劣
- 通常的算法主要是从时间和空间上 我们追求的是高效率和低存储
- 但是针对排序算法的话 我们又会多一个 稳定性的指标

- 1. 时间复杂度
- 分析关键字的比较次数 和 记录的移动次数

- 2. 空间复杂度
- 分析排序算法中需要多少辅助内存
<!-- 
  比如 反转 我们上面的例子中就 使用了中间变量 开辟了 一个temp空间
 -->

- 3. 稳定性
- 若两个记录a和b的关键字相等 但排序后 a b的先后次序保持不变 则称这种排序算法是稳定的
<!-- 
  比如 3 4 1 5 2 3 排序后 肯定是 1 2 3 3 4 5

  如果排序前 3 的位置 和 排序后的位置 没有发生变化 就是稳定的
  比如排序前 3[0] 3[1] 排序后还是 3[0] 3[1] 就是稳定的
 -->

- 稳定性的作用
<!-- 
  比如 商品 我们已经按照销量从高到低 排序的
  但是这些商品中可能有价格一样的

  这时候我们可能会有这样的场景 在指定销量从高到低排序的基础上 在指定价格从低到高排序

  这时候 如果两个商品的价格一样 我们就希望 销量高的在上方
  本身就是按照销量高 - 低排序的 
  我们再次按照价格排序的时候 不要改变 原本销量的顺序

  这就是稳定性
 -->


> 排序算法的分类
- 1. 内部排序
- 整个排序过程不需要借助于外部存储器(如磁盘) 所有排序操作都在内存中完成

- 2. 外部排序
- 参与排序的数据非常多 数据量非常大 计算机无法把整个排序过程放在内存中完成 必须借助于外部存储器 外部排序最常见的是多路归排序，可以认为外部排序是由多次内部排序组成
<!-- 
  比如2g的数据 但是内存只有1g
 -->


> 十种排序算法
- 1. 选择排序
  - 直接选择排序 堆排序

- 2. 交换排序
  - 冒泡排序 快速排序

- 3. 插入排序
  - 直接插入排序 折半插入排序 shell排序(希尔排序)

- 4. 归并排序

-- 上面比较常用 --

- 5. 桶式排序
- 6. 基数排序


> 算法的5大特征
- 1. 输入(input)
- 有 0 个或多个输入数据，这些输入必须有清楚的描述和定义
<!-- 
  算法要做点事儿必须要有原材料 输入点东西
 -->

- 2. 输出（Output)
- 至少有 1 个或多个输出结果，不可以没有输出结果
<!-- 
  算法算了半天要有输出的结果
 -->

- 3. 有穷性（有限性，Finiteness)
- 算法在有限的步骤之后会自动结束而不会无限循环，并且每一个步骤可以在可接受的时间内完成
<!-- 
  我们的算法要在有限的步骤内结束 每个步骤必须在可接受的时间内完成
 -->

- 4. 确定性（明确性，Definiteness)
- 算法中的每一步都有确定的含义，不会出现二义性

- 5. 可行性（有效性，Effectiveness)
- 算法的每一步都是清楚且可行的，能让用户用纸笔计算而求出答案
<!-- 
  不借助计算机也能算出来
 -->

- 说明：满足确定性的算法也称为：确定性算法。 现在人们也关注更广泛的概念 
- 例如考虑各种非确定性的算法 如并行算法、概率算法等。
- 另外 人们也关注并不要求终止的计算描述 这种描述有时被称为过程 procedure。


> 冒泡排序
- string类型也是可以排序的 按照abc 或者 unicode 的值 
- 对象排序的话 可以按照对象的属性来排序

- 思想：
- 冒泡排序的原理非常简单，它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。

- 1. 比较相邻的元素。如果第一个比第二个大（升序），就交换他们两个。

- 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
<!-- 
  每比较一轮都会产生一个最大值 每一大轮都是从头开始 同时每一轮要比较的数就减少了
 -->

- 3. 针对所有的元素重复以上的步骤，除了最后一个。
- 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较为止 。
<!-- 
  8个元素 总共要比较7轮 最后一轮就是最小的数了
  每一轮都会产生一个最大值 放在依次放在最后面
 -->

- 代码部分:
```java 
  int[] arr = new int[] {43, 32, 76, -98, 0, 64, 33, -21, 32, 99};

  // 冒泡排序
  // 外层for是几大轮 arr.length-1 
  // 因为假如数组的长度为8 那我们就比较7轮 因为最后一轮就是最小的一个数
  for(int i=0; i<arr.length-1; i++) {

    // 当i=0的时候 我们比较7次 当i为1的时候我们比较6次 因为越来越少 所以arr.length-1-i
    for(int j=0; j<arr.length-1-i; j++) {
      // 如果前面的数 比 后面的数大 就交换位置 每次外层+1 内层就是-1 因为 j<arr.length-1-i
      if(arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }

  for(int i=0; i<arr.length; i++) {
    System.out.print(arr[i] + "\t");
  }
```


> 快速排序
- 介绍：
- 快速排序通常明显比同为O(nlogn) 的其他算法更快，因此常被采用，而且快排采用了分治法的思想，所以在很多笔试面试中能经常看到快排的影子。
- 可见掌握快排的重要性 。

- 快速排序（Quick Sort）由图灵奖获得者 Tony Hoare 发明，被列为 20 世纪十大算法之一 ，是迄今为止所有内排序算法中速度最快的一种。

- 冒泡排序的升级版，交换排序的一种。快速排序的时间复杂度为 O(nlog(n)) 。


- 排序思想:
- 1. 从数列中挑出一个元素，称为 基准 pivot
- 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区结束之后，该基准就处于数列的中间位置这个称为分区（ partition ）操作。

- 3. 递归地（ recursive ）把小于基准值元素的子数列和大于基准值元素的子数列序。

- 4. 递归的最底部情形，是数列的大小是零或一，也就是永远都已经被排序好了。虽然一直递归下去，但是这个算法总会结束，因为在每次的迭代iteration ）中，它至少会把一个元素摆到它最后的位置去。

<!-- 
  比如

  keyword
  ↓
  5 2 9 3 8 4 0 1 6 7
    ↑               ↑
    low             high

  1. 首先我们定义一个keyword(keyword我们选择数组中的任意一个都可以) 这里取第一个

  2. 然后我们定义两个指针 low high
  这里注意 
  我们定义的  low指针   要比keyword要小
  我们定义的  high指针  要比keyword要大

  3. low指针不断的往右走 high指针不断的往左走

  4. low指针 high指针的停止条件 
  low指针首次出现比keyword大了
  high指针首次出现比keyword小了

  5. 出现上述的条件的时候 我们把 两个指针指向的元素对调一下
  (说白了我们定义一个keyword 想达到的效果就是想keyword为基准 左边是比keyword小的 右边是比keyword大的)

  6. 经过了一轮之后 就会以keyword为准 左边部分是比keyword小的 右边是比keyword大的

  7. 然后就相当于有了两个数组(左 右) 针对于左部分数组 我们再次的定义low high
 -->

- 代码部分:
<!-- 
  代码部分在资料里面自己看看 pdf
 -->

----------------------------

### Arrays工具类的使用
- import java.util.Arrays;

- java.util.Arrays类 即为操作数组的工具类 包含了用来操作数组(比如排序和搜索)的各种方法

- 再出现数组的问题的时候 我们要先考虑Arrays中是否有对应的结构供我们去调用

- 常见的方法:

> Arrays.equals(int[] a, int[] b)
- *判断两个数组是否相等*
- 会返回一个布尔值 注意创建变量接收
```java
  int[] arr = new int[] {1, 2, 3, 4};
  int[] arr2 = new int[] {1, 3, 2, 4};

  boolean res = Arrays.equals(arr, arr2);
  System.out.println(res);    // false

  // 数组是有顺序 arr 和 arr2 的顺序不一样 所以它们不向相等
```

- equals方法的原码
- 1. 先去比较地址值 如果地址值一样代表 就是一个对象 不用比了

  if(arr = arr2) return true    // 这么比较的时候 比较的是地址值

- 2. 然后再比较两个数组的长度 长度不一样 也是false
- 3. 然后长度一样之后 看看里面的元素是否一样 就是一个个元素比较

**注意:**
- 如果数组中元素相同但元素在数组中的位置不同的时候 进行比较的两个数组也不相等


> Arrays.toString(int[] a)
- *输出数组信息。*相当于遍历给定的数组
- 结果是一个字符串 [元素1,元素2]

- 返回值:
- String

```java 
  System.out.println(Arrays.toString(arr));
  // [1, 2, 3, 4]


  // 接收返回值
  String string = Arrays.toString(arr);
  System.out.println(string);

  // 还可以输出数组指定元素的内容 -- 我用咋报错
  System.out.println(Arrays.toString(arr[1]));  // null
```


> Arrays.fill(int[] a, int val)  没有返回值
- *将指定值填充到数组之中。*
- 将原数组中的每一个元素 都替换成val

- 返回值:
- 无, 也就是会影响原数组

```java 
  Arrays.fill(arr, 10);
  System.out.println(Arrays.toString(arr));   [10,10,10,10]
```


> Arrays.sort(int[] a)
- 对数组进行排序。

- 返回值:
- 无, 也就是会影响原数组

```java
  int[] arr = new int[] {1, 3, 2, 4};
  Arrays.sort(arr);
  System.out.println(Arrays.toString(arr));

  // [1, 2, 3, 4]
```


> Arrays.binarySearch(数组, 目标元素)
- 对排序后的数组使用二分法检索指定的值。

- 找到的话 返回 给定元素所在的索引
- 没找到的话 返回 负数

- 返回值: 
- int型

```java 
  int[] arr = new int[] {-98, -34, 2, 24, 54, 66, 79, 105};
  int res = Arrays.binarySearch(arr, 105);
  System.out.println(res);
  // 7
  // 如果我们找到一个不存在的数值 会返回 负数
```


> Arrays.copyOf(目标数组, 新数组的长度)
- 作用:
- 复制一个数组 不会影响原数组
- 参数2要传递一个新的数组的长度 如果超过原数组的长度 则会用默认值来代替

```java
int[] arr = {1, 2, 3};

// 定义长度为2
int[] arr2 = Arrays.copyOf(arr, 2);

String res = Arrays.toString(arr2);
System.out.println(res);    // [1, 2]
```

----------------------------

### 数组使用中的常见异常
- 一旦程序出现异常以后 后面的代码就不会执行了

> 1. ArrayIndexOutOfBoundsExcpetion
- *数组角标越界的异常*   

- System.out.pirntln(arr[-2])
```java 
  int[] arr = new int[] {1,2,3,4,5};

  // i <= arr.length 循环的时候不小心写了一个 = 也会报错
  for(int i=0; i<arr.length; i++) {
    System.out.println(arr[i]);
  }
```


> 2. NullPointerException
- *空指针异常*

- 情况1：
- arr变量 没有对应的地址值找不到堆空间的实体的时候就会报错
- 1维数组中出现该问题 就看看我们有没有造数组 然后看看赋值


- 情况2：
- 二维数组中的内存数组 如果是null的情况下 那么它就会报空指针异常错误
```java 
  int[][] arr = new int[4][]
  arr2[0]    // null

  arr2[0][0]  // 空指针异常
```


- 情况3：
- 当我们使用 toString() 方法输出指定数组的值的时候 当该值为null 
- 那么也会抛出空指针异常的错误
```java 
  String[] arr = new String[] {"aa", "bb"};
  arr[0] = null;
  System.out.println(arr[0].toString());
```


> Interrupted Exception
- *中断故障(异常)* 
- 在线程安全里遇到的异常 有一些方法会抛这样的异常
- sleep wait等

----------------------------

### 面向对象

> java面向对象学习的三条主线
- 对象也是由类派生的 也可以说对象是由类来创建的

> 1. java类 及 类的成员

> 类的成员:
- 1. 属性
  2. 方法
  3. 构造器
  4. 代码块
  5. 内部类


> 2. 面向对象的三大特征
- 1. 封装 
  2. 继承 
  3. 多态 (抽象性)



> 3. 其它关键字
- this super static final abstract interface package import


**扩展**
> 何谓 面向对象 的编程思想
- 首先解释一下”思想“
- 先问你个问题 你想做个怎样的人
- 可能你会回答 我想做个好人 孝敬父母 尊重常备 关爱朋友
- 你看 这就是思想 这是你做人的思想 或者说 是你做人的原则
- 做人有做人的原则 编程也有编程的原则 这些编程的原则 就是 编程思想

- 编程思想：
- 包含: 类 对象 面向对象的三大特征


> 理解面向过程 和 面向对象
- 面向过程pop 与 面向对象oop
<!-- 
  面向对象: object oriented programming
  面向过程: procedure oriented programming
 -->

- 两者都是一种思想 面向对象是相对于面向过程而言的

- 面向过程： 
    强调的是功能行为 以函数为最小单位 **考虑怎么做**
    *强调的仅仅是功能*


- 面向对象：
    将功能封装进对象
    强调具备了功能的对象 以类 或者 对象为最小单位 **考虑谁来做**
    *强调的是功能的主体*


- 面向对象更加强调运用人类在日常的思维逻辑中采用的思想方法与原则
- 如抽象 分类 继承 聚合 多态等

<!-- 
  人把大象装进冰箱

  1. 面向过程
  - 下面的每一个过程都体现着功能和行为 用函数来进行刻画
      把冰箱门打开
      抬起大象 塞进冰箱
      把冰箱门关闭


  2. 面向对象
  - 在用面向对象的方式去思考这个过程的时候 我们首先要考虑的是主体都有什么
  - 人
  - 冰箱
  - 大象

  - 然后我们再考虑这个主体应该具备什么样的功能 把这个功能我们封装到主体(对象)里面去

  - 我们看下各自的主体应该具备什么样的功能(方法) 每一个主体就是一个类
  - 然后我们要考虑实现这个功能各自的类中需要什么对应的方法

    Ren {
      打开(冰箱) {
        冰箱.开门();
      }

      抬起(大象) {
        大象.进入（冰箱）；
      }

      关闭（冰箱） {
        冰箱.闭合（）；
      }
    }
    
    Bingxiang {
      开门() { ... };
      闭合() { ... };
    }

    Daxiang {
      进入(冰箱) { ... }
    }
 -->


> 面向对象中的两个概念： - 类和对象
- 类：
- 抽象的 概念上的内容

- 对象：
- *实实在在存在的一个个体*
- 生活中的实实在在是一个摸得到的对象
- *代码中的实实在在是内存中有这个东西* 在*内存中创建了一个对象* 占据了内存中的一定空间

- 两者关系：
- 对象是类的实例 是由类new出来的

- 对象是类的实例化 通过类来实例化对象 然后通过对象调用属性和方法
<!-- 
  js中对象其实就是new Object得到的
 -->

- 例子: 最好举我们开发中的场景


> 面向对象的思想概述
- 程序员从面向过程的执行者转化成了面向对象的指挥者


> 面向对象思想的体现
- 类 和 对象的创建和执行操作有哪三步
- 1. 创建类
- 2. 类的实例化
- 3. 通过调用对象的属性和方法


> 面向对象分析方法 分析问题的思路和步骤
- 1. 根据问题需要 选择问题所针对的现实世界中的实体
- 2. 从实体中寻找解决问题的相关属性和功能 这些属性和功能就形成了概念世界中的类
- 3. 把抽象的实体用计算机语言进行描述 形成计算机世界中类的定义 即借助某种程序语言 把类构造成计算机能够识别和处理的数据结构
- 4. 将类实例化成计算机世界中的对象 对象是计算机世界中解决问题的最终工具


> 练习：
- 我要开车去丽江
- 上述这句话中包含的类有什么
<!-- 
  人 - 类
  车 - 类

  如果想描述丽江的信息非常的多 那么就将丽江也分装成一个类 
  如果只是调用了一下 就当做是一个普通的字符串就可以了
 -->


> 面向对象的三大特征
- 1. 封装
- 2. 继承
- 3. 多态

----------------------------

### 类 和 对象
- 类 class 和 对象 object 是面向对象的核心概念
- 类是对一类事物的描述 是抽象的 概念上的定义
- 对象是实际存在的该类事物的每个个体 因而也成为实例

- 万事万物皆对象

- 面向对象程序设计的重点是 **类的设计**
- **类的设计** 其实就是类的成员的设计


> 类的成员: 属性 和 方法
- 属性: 
- 对应类中的成员变量

- 行为:
- 对应类中的成员方法

<!-- 
  Field = 属性 = 成员变量
  Method = 成员方法 = 函数
 -->

<!-- 
  java中的各种项目 不管大小内部都是由一个个的类构成了 简单到一个helloworld也是由类构成的
 -->


> 接下来我们创建一个person类
- 我们可以看到 我们创建一个类 和 js中的方式很像
- 唯一不同的地方在于 在定义变量和方法的时候 有些像ts 要求定义变量和方法的时候更加的严谨

- 比如定义变量 我们要在变量前指定其变量的类型
```java 
  class Person {
    // 属性
    String name;
    int age = 1;
    boolean isMale;

    // 方法(功能)
    public void eat() {
      System.out.println("人可以吃饭");
    }

    public void sleep() {
      System.out.println("人可以睡觉");
    }

    public void talk(String language) {
      System.out.println("人可以说话 使用的语言是: " + language);
    }
  }
```


> 类中属性的定义: 
> 类型名 变量; 
- 以下两种方式可以声明成员变量
- String name;
- String name = "sam";

- 声明属性 或者 声明属性的同时对其进行初始化


```java
// 下面的方式 会提示错误 Syntax error on token ";",
class Person {
  String name;
  name = "sam";   // 报错
}
```

**注意:**
- 类中只能定义(声明)属性和方法 
- *关于属性的赋值操作 不属于声明操作 不能写在类中方法外*

- 比如: 
- 我们可以属性的将赋值操作放在 方法里 或者 构造器里 或者 代码块里


- 非static属性都是通过实例化这个类的实例对象身上的
- 调用实例对象方法的对象 就是 name属性 所在的对象 因为这些属性都是归具体的某一个对象所有的

- 每造一个对象 这些属性都会独立的有一份 抛开对象谈属性现阶段试没有意义的
- 因为这些属性都要归到某一个对象里面

- 掉调用实例对象的方法 方法中的属性就是方法所在的对象中的属性
<!-- 
  比如我们是通过 c1 实例对象调用的 show方法 
  show方法中的color属性就是c1实例对象中的
 -->


> 类中方法的定义: 
> public 关键字 方法名() { ... }
- 
  public void sleep() {
    System.out.println("人可以睡觉");
  }

**注意:**
- *方法中不可以再定义方法* 方法就是一个个独立的功能 彼此都不相关的
- 但是可以调用方法
```java 
  // 方法中再次定义方法是不行的 这点跟js不一样
  public void test() {
    System.out.println("test");
    
    // 方法中不能再次定义方法 -- 报错
    public void test2() {
      System.out.println("test2");
    }
  }
```


> 创建类的对象 = 类的实例化 = 实例化类
> Person p1 = new Person();
- 跟js比较像 区别就在于 我们前面不是用var let const 来声明变量 
- 而是定义对象的变量时 其变量的类型为 类的类型

```java 
  class Person { }

  // 类的实例化
  Person p1 = new Person();
```


> Person类的属性和方法的调用
- 面向对象思想落地的实现
```java 
  // 定义main方法作为程序的入口
  public static void main(String[] args) {


    // 创建Person类的对象 也叫类的实例化 类名 变量名 = new 类名() 这就是类的实例化
    Person p1 = new Person();

    // 调用对象的结构 调用属性 和 调用方法
    // 调用属性 对象.属性
    p1.name = "Tom";
    p1.isMale = true;


    System.out.println(p1);        
    // src.com.Person@5e91993f 地址值

    System.out.println(p1.name);   // Tom
    System.out.println(p1.isMale); // true

    // 调用方法
    p1.eat();
    p1.talk("中国语");
  }
```


> 思考:
- 上面我们通过 Person类 new了一个p1对象 然后我们通过 p1.name 赋值为 Tom
- 那么这时候 我们再new一个p2对象 这时候打印p2.name会是什么结果？ null
<!-- 
  我们想想在堆空间中有几个对象？ 两个！
  因为每new一次 相当于又造了一个对象 说明在堆空间中是有两个对象实体的

  Person p1 = new Person();
  Person p2 = new Person();

  每一份对象实体都一份独立的属性
  (我们是通过类的模板来创建的对象)
 -->

> 总结:
- 如果创建了一个类的多个对象 *则每个对象都独立的拥有一套类的属性*(非static 没有加static关键字)

- 如果我们修改一个对象的属性a 则不影响另外一个对象属性a的值

----------------------------

### 对象的内存解析
- 这节里我们看看对象在内存中的结构是什么样的
- 内存解析是在文件运行的时候才会涉及到的东西

- 内存解析网址：
- https://www.bilibili.com/video/BV1Kb411W75N?p=197&spm_id_from=pageDriver

<!-- 
  技巧：
    - 在画内存结构图的时候 我们直接从 main方法里面开始看 看 new Student 部分

    - 这样才能着手在堆空间中画图

    - 1. 声明 栈 和 堆
    - 2. 从new Student开始看 ...

    - 3. 非static属性都是在堆空间中
    (js中非static属性都是类的实例化对象的 所以在堆空间中)
    (js中static属性是类自己的属性)
 -->

- 流程:
- 编译完源代码以后 生成一个或多个字节码文件 我们使用jvm中的类的加载器和解释器对生成的字节码文件进行解释运行
<!-- 
  运行的时候意味着我们源代码中的变量 对象会被创建 在内存中运行
  将字节码文件对应的类加载到内存中 涉及到内存解析
 -->

> 堆heap 
- 此内存区域的唯一目的就是**存放对象实例** 几乎所有的对象实例都在这里分配内存
- 这一点在java虚拟机规范中的描述是： 所有的对象实例以及数组都要在堆上分配


> 栈stack 
- 是指虚拟机栈
- 虚拟机栈用于**存储局部变量**等 局部变量表存放了编译期可知长度的各种基本数据类型(boolean byte char short int float long double)
- 对象引用(reference类型 它不等同于对象本身 是对象在堆内存的首地址)
- *方法执行完 自动释放*


> 方法区method area
- 用于存储已被虚拟机加载的 **类信息 常量 静态变量 即时编译器编译后的代码** 等数据

<!-- 
  class文件    →      类装载器
                      ↑   ↓
                      内存区域

              方法区    虚拟机栈    本地方法栈
                                              →  垃圾收集器
              堆       程序计数器


  局部变量存储在    - 栈结构中
  new出来的结构在   - 堆空间中

  实例对象的属性在  - 堆空间中

  
  static属性会在方法区 非static会在堆空间中
  
  方法区： 
    - 方法区包括
    - 类的加载信息 常量池 静态域

  <<JVM规范>> 这是一本书 内部提到了内存结构 可以扩展看看
 -->


> 对象的内存解析
- Person p1 = new Person();
- p1.name = "Tom";
- p1.isMale = true;

- Person p2 = new Person();
- System.out.println(p2.name);

- Person p3 = p1;
- p3.age = 10;

- 目前我们没有用到方法区 主要是栈和堆的结构
<!-- 栈的特点是先进后出 -->

<!-- 
    栈                    堆

                          new Person();

                          0x12ab
    p1: 0x12ab   ↗        ---------
                          属性： 
                          它们不同与栈中的局部变量 局部变量在栈里 
                          属性属于对象的一部分在堆空间里面

                          name;
                          age;
                          isMale;

------

                          new Person();

                          0x7788
    p2: 0x7788   ↗        ---------
                          属性： 
                          它们不同与栈中的局部变量 局部变量在栈里 
                          属性属于对象的一部分在堆空间里面
                          name;
                          age;
                          isMale;
 -->


**注意：**
- 引用类型的变量 只可能存储两类值
- 1. 空值
- 2. 地址值(地址值中也包含变量的类型)
<!-- 
  比如:
  - 我们创建了一个存放引用类型的元素的数组
  - 数组中每一个元素的位置 不是直接存放对象 而是存放的地址值 
  - 该地址值指向堆空间中的一个对象的实体
 -->

----------------------------

### 类中的属性
- 在类中有属性和方法 那么下面我们主要研究下属性 和 方法

> 属性的使用:
- 属性也叫做成员变量 


> 成员变量 和 局部变量
\\ 不同点1:
- 主要是根据声明它们的位置不同才有这样的区分

- 属性(成员变量):
- 直接定义在类的一对{ }内
```java 
  class Person {
    
    // 属性的位置
    String name;
    int age = 1;
    boolean isMale;

  }
```

- 局部变量:
- 声明在 **方法内 方法形参 代码块内 构造器形参 构造器内部的变量** 都叫做局部变量

```java 
  // 局部变量 -- 形参
  public void talk(String language) {
    System.out.println("我们使用" + language + "进行交流");
  }


  // 局部变量 -- 方法内定义的变量
  public void eat() {
    String food = "烙饼";
    System.out.println("北方人喜欢吃" + food);
  }
```

\\ 相同点
- 1. 定义变量的格式一样 数据类型 变量名 = 变量值
- 2. 先声明 后使用
- 3. 变量都有其对应的作用域


\\ 不同点2：
> 属性 - 权限修饰符
- 对于属性来讲 可以在声明属性时 指明其权限 使用权限修饰符

- 常用的权限修饰符
- 1. private (出了定义它的类后 该属性就不能调用了)
- 2. public
- 3. 缺省
- 4. protected

```java 
  class Person {
    
    // 没有些权限修饰符的时候就是 缺省 状态
    String name;

    // 带权限修饰符
    private int age;
    public String name;

  }
```

- 作用：
- 权限修饰符是指该属性被调用时候可见性的大小
<!-- 
  在类的封装性的时候再讲 我们现阶段设置属性的时候 使用缺省就可以了
 -->

**局部变量不能使用权限修饰符**
- 还可以理解为*局部变量的权限就被方法的权限代替*了 因为方法是public那么该属性的权限也是public


\\ 不同点3: 
> 属性 - 默认初始化值(也是局部变量和属性的不同点)
- 对于类中的属性来讲是有默认初始化值的
- 对于属性来讲 它是可以直接使用的 即使没有赋值(因为有初始化值)

- 类的属性 根据其类型 有默认初始化值的
- 整型:   byte short int long  *初始化值为*  0
- 浮点型: float double  *初始化值为*  0.0
- 字符型: char *初始化值为*  0 或 \u0000
- 布尔型: *初始化值为* false
- 引用数据类型: 类 数组 接口 *初始化值为* null


**局部变量没有初始化值**
- 这样意味着 我们在调用局部变量之前 一定要显式赋值
<!-- 
  下面有一个问题 就是因为 
  局部变量没有初始化值在使用局部变量之前一定要先赋值
  但是
  属性就有默认得初始化值
 -->

\\ 局部变量的特别之处
- 形参在调用时 赋值即可
- 我们声明了形参但是调用方法的时候如果没有传递实参就会报错 也就是说java中定义的形参必须要传递实参么？


> 属性 和 局部变量 在内存中加载的位置不一样
- 属性: 
       加载在堆空间中

- 局部变量:
       加载到栈空间


**回顾变量分类**
                ↗ 基本数据类型 : 数值型(byte short int long float..)
                               字符型(char)
                               布尔型(boolean)
- 1. 按照数据类型 
                ↘ 引用数据类型 : 类 接口 数组

          
- 2. 在类中声明的位置 
                   ↗ 实例变量(不以static修饰)
        ↗ *成员变量*  
                   ↘ 类变量(以static修饰)
所有变量
                   ↗ 形参(方法 构造器中定义的变量)
        ↘ *局部变量* →  方法局部变量(在方法内定义)
                   ↘ 代码块局部变量(在代码块内定义)
 
----------------------------

### 类中的方法
- 这节我们研究下类中的方法的声明和使用
<!-- 
  在类当中属性就属于我们定义的一些变量了 用来描述类中对象的特点
  方法是用来刻画我们类应该具有的功能 
  每一个方法用来做特定的事情 完成特定的功能
 -->


> 方法的作用
- 用来描述类应该具有的功能
- 方法就是功能 将功能封装到方法中


> 方法的声明
- 格式:
  权限修饰符 [关键字] 返回值类型 方法名(形参) { 方法体 }

  public void sleep(int hour) {
    System.out.println("客户睡了" + hour + "小时");
  }

> 部分1: 权限修饰符
- private(私有) / public(公共) / 缺省 / protected
- 权限修饰符的作用就是: 方法被调用的时候的权限大小
<!-- 
  封装性的时候我们再说 权限修饰符 目前先用public
 --> 


> 部分2: 返回值类型
- 有返回值的情况:
- 如果方法有返回值 **则必须在方法声明时 指定返回值的类型 同时方法中需要使用 return关键字** 来返回指定类型的数据

- 没有返回值的情况:
- 如果方法没有返回值 **则方法声明时 使用 void 来表示**
- 通常没有返回值的方法中 不需要使用return 但是如果使用return的话
- 只能 **return;** 表示结束该方法
```java
  public void eat() {
    System.out.println("客户吃饭");
    return；
  }
```


> 部分3: 方法名
- 方法名就是标识符 在写方法名的时候 要遵循标识符的规则和规范 要 见名知意


> 部分4: 形参
- 方法可以声明0个 1个或多个形参

- 格式:
- (数据类型 形参, 数据类型2 形参2)


> 部分5: 方法体
- 方法功能的体现


> return 关键字的使用
- 使用范围:
- 使用在方法体中

- 作用: 
- 1. 结束一个方法 类似break
- 2. 针对于有返回值类型的方法 使用 "return data" 返回指定的数据
- 3. return关键字后面不可以有任何语句


> 方法的返回值类型
- *处于方法名前*

- void:
- 没有返回值

- String:
- 返回值的类型为字符串

- int[]
- 返回值的类型为数组

- Bank
- 返回值的类型为一个类


> 类中的方法 特点
- 1. 类中方法内 可以调用当前类中的属性 和 方法
<!-- 
  递归方法：
  方法A中调用了方法A 就叫做递归方法
 -->

- 2. 方法中不能定义别的方法
<!-- 
  错误的方式
  public void info() {
    public void swim() {

    }
  }
 -->


> 一个包文件夹中的一个.java文件可以调用另一个.java文字中的代码
```java 
  public class PersonTest { }
  public class Person { }

  - 上述的两个类在各自的两个.java文件中
  - 这两个java文件在一个包文件夹下

  // PersonTest 类中 不用引入 Person文件 直接可以new Person 和 通过实例调用方法和属性
  public class PersonTest {
    // 不用在该文件中引入 Person.java 文件
    Person p1 = new Person();
  }
```

**java文件中的/** */注释 在别的java文件中调用的时候 起到了提示的作用*


> 练习1:
- 创建一个Person类 其定义如下:
- 要求:
- 1. 创建Person类的对象 设置该对象的name age sex属性 调用study方法 输出字符串“studying” 调用showAge方法显示age值 调用addAge方法给对象的age属性增加2岁

- 2. 创建第二个对象 执行上述的操作 体会同一个类的不同对象之间的关系

- 类图
<!-- 
  Person
  name: String
  age: int
  sex: int

  +study():void
  +showAge():void
  +addAge(int i):int
 -->

```java 
  package src.com;
  public class PersonTest {
    public static void main(String[] args) {
      Person p1 = new Person();
      p1.name = "Tom";
      p1.age = 16;
      p1.sex = 1;

      p1.study();
      p1.showAge();

      int newAge = p1.addAge(2);
      System.out.println(p1.name + "的新年龄为 " + newAge);
      System.out.println(p1.age);    // 20
            // 因为addAge这个方法内部修改的就是 age
    }
  }

------

  package src.com;
  public class Person {
    String name;
    int age;

    /**
    * sex: 1 表明是男性
    * sex: 0 表明是女性
    */
    int sex;

    public void study() {
      System.out.println("studying");
    }

    public void showAge() {
      System.out.println("age: " + age);
    }

    public int addAge(int i) {
      return age += i;
    }
  }


  - addAge方法中的形参i是局部变量
  - 所以i定义在栈中 i: 2

  - 然后addAge方法内部在age中累加了2 那么堆空间的对象实体的age就累加了2
  - 我们输出 newAge 是输出的 栈中的newAge变量
  - 我们输出 p1.age 是输出的 堆中的age属性


  - ！！！局部变量放在栈
  - ！！！属性放在堆
```

**注意**
- 当我们没有给age重新赋值的时候 age是有默认值的 int型的age默认值为0
- 不同于我们的js 如果不赋值会值undefined 进行计算的时候会是 NaN
- 但是java中整型是的默认值为0 所以我们即使不赋值 直接进行计算 也会是正确的结果
<!-- 
  一个类调用另一个类的时候吧 要不平时会报错呀
 -->

> 解析上面的问题： 
- 我们在创建数组的时候 int[] arr = new int[6]
- 我们这样是创建了一个int型的动态的数组对象 这时候里面元素虽然没有值 但是有默认值
- 我们可以之后再给动态数组中的元素进行赋值操作

- 类的创建也是一样 都是引用类型的数据 
- class Student {
    int age;
  }

- 我们在类中定义了 非static属性 我们可以在实例化对象之后 通过实例对象给age进行赋值

- 这时候跟动态数组一样 虽然我们age是没有值的但是它有默认值 int型的默认值为0
- 所以可以直接计算 也有一个结果


> 练习2:
- 利用面向对象的编程方法 设计类Circle计算圆的面积
```java 
  public class Demo {
    public static void main(String[] agrs) {

      Circle c1 = new Circle();

      c1.radius = 10.0;   // 可以先赋值

      System.out.println(c1.area()); 
          // 到这步的时候直接输出 会是 0.0
          // 因为radius定义了 并没有赋值 默认值为0

    }
  }


  class Circle {
    // 属性  半径作为属性比较好 下面的方法中不要定义形参
    double radius;

    // 求圆的面积
    public double area() {
      return Math.PI * radius * radius;
    }
  }
```


> 练习3
- 1. 编写程序 声明一个method方法 在方法中打印一个10 * 8的*矩形 在main方法中调用该方法

- 2. 修改上一个程序 在method方法中 除打印一个10 * 8的*型矩形外 再计算该矩形的面积 并将其作为方法返回值 在main方法中调用该方法 接收返回的面积值并打印

- 3. 修改上一个程序 在method方法提供m 和n两个参数 方法中打印一个m * n的 *型矩形 并计算该矩形的面积 将其作为方法返回值 在main方法中调用该方法 接收返回的面积值并打印

```java 
  // 1
  public class Demo {
    public static void main(String[] agrs) {
      Demo d1 = new Demo();
      d1.method();
    }

    
    public void method() {
      for(int i=0; i<10; i++) {
        for(int j=0; j<8; j++) {
          System.out.print("*");
        }
        System.out.println();
      }
    }
  }
```

**要点:**
- 在上面我们写类的时候 都是一个public类和一个对象类 然后我们在public类中通过创建对象类的实例的形式 调用对象类中的方法和属性
```java 
  // public类
  public class Demo { ... }

  // Test对象类
  class Test { ... }

  ------

  public class Demo {
    Test t1 = new Test();
    ... 
  }
```

- 在上面的例子1中 我们在Demo类中 除了main方法外的 还定义了一个method方法
- 但是在main方法中调用method方法的时候 我们在main方法中实例化了Demo类 创建了实例对象 通过实例对象调用的method方法
```java 
  public class Demo {
    public static void main(String[] args) {

      // 实例化 Demo public类对象
      Demo d1 = new Demo();
      d1.method();
    }

    // 在同一个public类中创建了另一个method方法
    public void method() { ... }
  }
```


- 2. 
```java 
  public class Demo {
    public static void main(String[] agrs) {
      Demo d1 = new Demo();
      int res = d1.method();
      System.out.println(res);
    }

    public int method() {
      for(int i=0; i<10; i++) {
        for(int j=0; j<8; j++) {
          System.out.print("* ");
        }
        System.out.println();
      }
      return 10 * 8;
    }
  }
```

- 3. 要点是定义属性也好 还是形参也好 我们都要先确认类型
```java
  public class Demo {
    public static void main(String[] agrs) {
      Demo d1 = new Demo();
      int res = d1.method(8, 8);
      System.out.println(res);
    }

    public int method(int m, int n) {
      for(int i=0; i<m; i++) {
        for(int j=0; j<n; j++) {
          System.out.print("* ");
        }
        System.out.println();
      }
      return m * n;
    }
  }
```


> 练习4
- 定义类Student 包含3个属性 学号number int； 年级state int； 成绩score int； 
- 创建20个学生对象 学号1到20 年级和成绩都由随机数确定

- 问题1 打印出3年级state值为3的学生信息
- 问题2 使用冒泡排序按学生成绩排序 并遍历所有学生信息

- 提示
- 1. 生成随机数 math.random 返回值类型double
- 2. 四舍五入取整 math.round(double d) 返回值类型为long

```java 
  // 卡壳的地方 
  - 既然创建20个学生对象 那么肯定要用到循环 但是用js的想法 发现写不下去了

  - for(int i=0; i<20; i++) {
        Student 属性名没办法依次指定 = new Student();
    }

  - 解决方法
  - 在java中 我们可以创建 动态对象数组
  - 我们class Student这个类也是一个对象 因为数组的元素包括任何自定义类型 自然也包括我们自定义的class类

  - 上面我们创建字符串类型的数组是这样 String[] str = new String[10]
  - 现在我们创建 类对象(js中的class类在java中好像就是对象)

  - Student[] studs = new Student[20]

  - 这里我们先是创建了一个数组 是什么型的数组呢？
  - 也就是说数组的元素是什么类型的呢？ 是Student类的一个个对象
  - 数组本身是引用数据类型的 数据的元素既可以是基本数据类型 又可以是引用数据类型
  - 这里元素是引用类型 只不过是我们自定义的Student类
  - 我们的数组中每一项是一个Student类型的

  - 然后我们依然往里输入值

  public class Demo {
  
    public static void main(String[] args) {
      // 声明一个 Student类型 的数组
      Student[] studs = new Student[20];


      for(int i=0; i<studs.length; i++) {
        studs[i] = new Student();
      }
    }

  }

  class Student {
    int number;
    int state;
    int score;
  }
```


- 更新上面下一阶段的代码
- 上面说了 我们可以创建动态数组 然后利用循环依次向数组中的元素中追加值

- 然后我们想打印输出下 看看这个类对象数组中都有什么
- 方式1:
- 循环遍历加拼接: 
- System.out.println(studs[i].number + ", " + studs[i].state + ", " + studs[i].score);

- 方式2:
- 既然数组中每一个元素都是一个类对象 那类中就能有自己的方法 studs[i] 就是每一个对象 那么studs[i]就能调用自己的方法
- 在Student类中创建一个方法
- public String info() {
    return "学号: " + number + ", 班级: " + state + ", 成绩: " + score; 
  }
```java 
  package src.com;

  public class Demo {
    
    public static void main(String[] args) {
      Student[] studs = new Student[20];

      for(int i=0; i<studs.length; i++) {

        studs[i] = new Student();

        // 给stud对象的属性赋值
        studs[i].number = i + 1;
        // Math.random() * (6-1+1) + 1 是一个double类型的值 该值不能赋值给int
        studs[i].state = (int)(Math.random() * (6-1+1) + 1);
        studs[i].score = (int)(Math.random() * (100-0+1));
      }

      // 遍历学生数组
      for(int i=0; i<studs.length; i++) {
        // 这样会输出地址值
        // System.out.println(studs[i]);
        // System.out.println(studs[i].number + ", " + studs[i].state + ", " + studs[i].score);
        System.out.println(studs[i].info());
      }
    }
  }

  class Student {
    int number;
    int state;
    int score;

    // 显示学生信息的方法
    public String info() {
      return "学号: " + number + ", 班级: " + state + ", 成绩: " + score; 
    }
  }
```

- 更新一下最新阶段的代码
- 要点：
- 在给对象做冒泡排序的时候 我们判断的是对象中的属性 但是交换的是对象本身
- 在定义中转变量的时候 我们对象的类型就是new Student的类型
```java 
  package src.com;

  public class Demo {
    
    public static void main(String[] args) {
      Student[] studs = new Student[20];

      for(int i=0; i<studs.length; i++) {
        studs[i] = new Student();

        studs[i].number = i + 1;
        studs[i].state = (int)(Math.random() * (6-1+1) + 1);
        studs[i].score = (int)(Math.random() * (100-0+1));
      }

      // 遍历学生数组
      for(int i=0; i<studs.length; i++) {
        if(studs[i].state == 3) {
          System.out.println(studs[i].info());
        }
      }
      System.out.println("**********************");

      // 使用冒泡排序按学生成绩排序 并遍历出所有学生信息
      for(int i=0; i<studs.length-1; i++) {
        for(int j=0; j<studs.length - 1 - i; j++) {
          if(studs[j].score > studs[j+1].score) {

            - 我们交换的不是成绩 而是学生对象的顺序 
            - 注意这里我们定义变量的类型 因为我们交换的是对象 
            - 每一个对象都是new Student出来的 
            - 所以每一个对象的类型都是Student

            Student temp = studs[j];    // 注意

            studs[j] = studs[j+1];
            studs[j+1] = temp;
          }
        }
      }

      // 遍历查看下结果
      for(int i=0; i<studs.length; i++) {
        System.out.println(studs[i].info());
      }
    }
  }

  class Student {
    int number;
    int state;
    int score;

    // 显示学生信息的方法
    public String info() {
      return "学号: " + number + ", 班级: " + state + ", 成绩: " + score; 
    }
  }
```

> 对上优化
- 上面我们对数组的遍历 冒泡排序 以及输出指定班级学生信息 都写在了main方法中并没有封装成一个个的方法

- 接下来我们将操作数组的功能封装到一个个的方法中

- 要点：
- 我们在main方法中调用这个类的其它方法时 
- 现阶段需要先根据当前类 先new一个对象 通过实例对象调用除了main方法以外的其它方法
```java 
  package src.com;

  public class Demo {
    
    public static void main(String[] args) {
      // 声明一个 Student类型 的数组
      Student[] studs = new Student[20];

      for(int i=0; i<studs.length; i++) {
        studs[i] = new Student();

        // 给stud对象的属性赋值
        studs[i].number = i + 1;
        // Math.random() * (6-1+1) + 1 是一个double类型的值 该值不能赋值给int
        studs[i].state = (int)(Math.random() * (6-1+1) + 1);
        studs[i].score = (int)(Math.random() * (100-0+1));
      }

      // 我们在main方法中调用这个类的其它方法时 现阶段需要先根据当前类 先new一个对象 通过实例对象调用除了main方法以外的其它方法
      Demo d1 = new Demo();
      d1.searchState(studs, 3);
      System.out.println("****************");
      d1.sort(studs);
      d1.showInfo(studs);

    }

    // 遍历Student[]数组的方法
    // 参数： 我们要遍历哪个对象数组
    public void showInfo(Student[] studs) {
      for(int i=0; i<studs.length; i++) {
        System.out.println(studs[i].info());
      }
    }

    /**
    * @Description 查找Student数组中指定年级的学生
    * @author Sam
    * @param studs 要查找的数组
    * @param state 指定的年级
    */
    public void searchState(Student[] studs, int state) {
      for(int i=0; i<studs.length; i++) {
        if(studs[i].state == state) {
          System.out.println(studs[i].info());
        }
      }
    }

    /**
    * @Description 给指定数组进行排序
    * @param studs 给定数组
    */
    public void sort(Student[] studs) {
      for(int i=0; i<studs.length-1; i++) {
        for(int j=0; j<studs.length - 1 - i; j++) {
          if(studs[j].score > studs[j+1].score) {
            Student temp = studs[j];
            studs[j] = studs[j+1];
            studs[j+1] = temp;
          }
        }
      }
    }
  }

  class Student {
    int number;
    int state;
    int score;

    // 显示学生信息的方法
    public String info() {
      return "学号: " + number + ", 班级: " + state + ", 成绩: " + score; 
    }
  }
```

- 这样整个代码会看起来干净一些 因为main方法中调用的是一个个的功能



> 练习5
- 声明一个日期类型MyDate 有属性 年 月 日 创建2个日期对象 分别赋值为 你的出生日期 你对象的出生日期 并显示信息
<!-- 
  这个看看资料
 -->


> 练习6
- 面向对象的方法 -- 自定义数组的工具类
- 1. 创建一个 数组工具类的java文件
```java 
  package src.com;

  /**
  * 自定义数组的工具类
  */
  public class ArrayUtils {

    // 最大值
    public int getMax(int[] arr) {
      return 0;
    }


    // 最小值
    public int getMin(int[] arr) {
      return 0;
    }

    // 总和
    public int getSum(int[] arr) {
      return 0;
    }

    // 平均值
    public int getAvg(int[] arr) {
      return 0;
    }

    // 反转数组
    public void reverse(int[] arr) { }

    // 复制数组 需要返回值 返回值为新的数组 方法返回值的类型 int[]
    public int[] copy(int[] arr) {
      return null;
    }

    // 数组排序
    public void sort(int[] arr) { }

    // 遍历数组
    public void print(int[] arr) { }

    // 查找指定元素
    public int getIndex(int[] arr, int index) {
      return 0;
    }
  }
```

- 2. 在测试类中实例化工具类对象 通过对象调用具体的方法

**要点:**
- 返回值为数组: return null;
- 因为数组是引用类型 所以我们返回值可以设置为null

- 方法的*返回值为int[]数组*
- public int[] copy(int[] arr) { ... }

----------------------------

### 什么叫做万物皆对象
- 1. 在java语言范畴中 我们都将功能和结构封装到具体的类当中 通过类去实例化对象 通过实例对象去调用功能

- 2. 涉及到java语言与前端html 后端数据库交互时 前后端的结构在java层面交互时 都体现为类 和 对象
<!-- 
  java擅长做后台 后台需要跟前端进行交互 
  比如前端发请求 后台返数据
  前端发送的请求 后台接收的时候 都会看做一个个类的对象

  <></> 比如这一对标签 在java端进行调用的时候 就会体现为某一个类的对象

  ------

  java还会跟数据库进行交互 数据库中有一个个的表
  表在数据库中也是一个个的数据库对象
  这个表是如何跟java交互的呢？

  java中比如有一个Custom类 数据库中有一个Custom表
  java中就会用这个类去对应这个表

  我们让表中的一条记录对应java类中的一个对象
  表中纵向的一个结构对应java类中对象中的一个属性
 -->

- 也就是说不管前端还是数据库跟java进行交互的时候 在java里都会体现成一个对象

----------------------------

### 匿名对象
- 我们new类的时候没有创建变量来接收对象 也就是没有显示的赋给一个变量名 其为匿名对象
<!-- 
  Phone p = new Phone();
      // 这就是有名的实例对象 名为p

  new Phone();
      // 这就是 匿名对象
 -->

> 匿名对象的特征
- 只能调用一次(再想调用就是另外一个对象了)
<!-- 
  new Phone().price = 1999;
  new Phone().showPrice();
      // 这两个调用 调用的不是同一对象方法 因为每new一次就是造了一个对象
 -->

- 使用场景举例:
- *当参数传递到形参中*

----------------------------

### 方法 - 面向对象
- 接下来我们再看看方法的相关知识点

- 1. 方法的重载
- 2. 可变形参的方法
- 3. 方法参数的值传递机制 (重要)
- 4. 递归方法 (理解)


> 1. 方法的重载(overload)
- 在java中同一个类中 允许存在一个以上的同名方法，这些方法之间的关系 我们称之为重载的关系

- 方法的重载要求: 
- 方法的*参数个数*或者*参数类型*或*参数顺序*不同即可
<!-- 
  比如Arrays工具类中 有很多同名的方法 方法名相同 参数参数不同
  binarySearch(参数种类1)
  binarySearch(参数种类2)
  binarySearch(参数种类3)
 -->


> 为什么要造这么多同名的方法?
- 我们在起方法名的时候都要求见名知意，比如排序我们会起名字为sort
- 但是我们可能对byte类型的数组排序 也可能对int类型的数组排序 对不同类型的数组排序就需要提供不同的方法 但是sort方法名更加的直观 那我们就起个一样的方法名
- 但是参数列表不一样
<!-- 
  比如我们上面创建的数组的工具类 反转数组
  public void reverse(int[] arr) { ... }
  public void reverse(String[] arr) { ... }

  上面的两个方法都是reverse但是参数列表不一样 它们之间就是方法的重载
 -->

- 那调用的时候 调用的是哪个？
- 调用的时候取决于我们参数的类型 它会自动调用对应的方法


> 方法重载的特点
- *与返回值类型无关*
- *只看参数列表* 且参数列表必须不同(参数个数或参数类型)
- 调用时 根据方法参数列表的不同来区别


> 技巧: 两同一不同
- 满足下面条件的就叫做方法的重载
- 1. 同一个类 同一个方法名
- 2. 参数列表不同
    - 参数个数不同
    - 参数类型不同
```java 
  // 参数个数不同
  public void getSum(int[] i) { ... }
  public void getSum(int[] i, int[] j) { ... }

  // 参数类型不同
  public void getSum(int[] i) { ... }
  public void getSum(double[] i) { ... }

  // 参数列表的顺序不同也算方法的重载
  public void getSum(String[] i, int[] j) { ... }
  public void getSum(int[] j, String[] i) { ... }
```

> 请关注: 类型 个数 顺序


**注意:**
- 1. 形参名无所谓的 主要看的是参数列表的类型
```java
  // 这样就不算重载 因为都是参数列表的两个参数的类型都一样 参数名其实无所谓
  public void getSum(int[] i, int[] j) { ... }
  public void getSum(int[] j, int[] i) { ... }
```

- 跟方法返回值的类型也没有关系
```java 
  // 虽然方法返回值的类型不一样 但是并不是方法的重载
  public void getSum(int[] i, int[] j) { ... }
  public int getSum(int[] i, int[] j) { ... }
```

- 跟方法的权限修饰符也没有关系
```java 
  public void getSum(int[] i, int[] j) { ... }
  private void getSum(int[] i, int[] j) { ... }
```

> 总结:
- 跟方法的权限修饰符 返回值类型 形参变量名 方法体都没有关系


> 调用时候的注意点
> 调用方法时传入参数的类型
- 创建重载方法1 int int
- 创建重载方法2 double double

- 当我们调用的时候 传入的实参如果是int int 那么调用的肯定是 方法1
- 当我们将方法1注释掉 会报错么？ 不会
- 我们传递的实参int会自动提升到 double double 也就是会匹配到 方法2

----------------------------

### 可变个数的形参:
- javaSE5.0中提供了Varargs机制 允许直接定义能和多个实参相匹配的形参
- 从而可以用一种更简单的方式 来传递个数可变的实参
```java
  // jdk5.0以前:
  - 采用数组形参定义方法 传入多个同一类型变量
  public static void test(int a, String[] books) { }

  // jdk5.0:
  - 采用可变个数形参来定义方法 传入多个同一类型变量
  public static void test(int a, String... books) { }
```


> 可变个数形参的方法
- 它是jdk5.0以后的新特性


> 具体使用:
> 可变个数形参格式
- 数据类型... 形参变量名

- 当调用可变个数形参的方法时 传入的参数个数可以是0个 1个 n个
- 既然是可变个 那就说明我们在传递实参的时候可以是0个 1个 n个
- 跟js中的...args差不多
```java 
  - 我们肯定见过这么写 String[] strs 一样的 
  - 可变个数的形参String... strs

  public void show(String... strs) {
    System.out.println(3 + "String... strs");
  }

  - 调用:
  d.show("hello", "world");
```

- 要求:
- 我们传入的实参类型必须是 指定类型的
```java 
  (String... strs)  我们传递的参数类型必须都是String
```

- 特点:
- 可变个数形参的方法与本类中方法名相同 形参不同的方法之间构成重载


> 可变形参的2种写法(jdk5.0之前之后)
- 下面的两种写法不构成重载 它们二者不能共存
```java 
  // 编译器认为下面的两种方法都是在定义可变个数的形参方法
  public void show(String... strs) { }
  public void show(String[] strs) { }
```


> 方法1 jdk5.0之前
- 现在也可以使用 但是传入实参 和 方法内部使用数组中的参数的时候有一些麻烦
- public void show(String[] strs) { }

- 调用:
- 我们在调用方法传入实参的时候 需要传入一个数组
- test.show(new String[] {"hello", "world"})

> 方法内使用形参:
- 通过遍历的方式获取实参数组中的元素
<!-- 
  for(int i=0; i<strs.length; i++) { ... }
 -->


 > 方法2 jdk5.0之后
 - 可变个数形参 String... strs
 - public void show(String... strs) { }

- 调用:
- 跟js中的 ...args 一样 我们在传入实参的时候 直接写就可以
- test.show("hello", "world")

> 方法内使用形参:
- 通过遍历的方式获取实参数组中的元素 (String... strs) 就相当于是一个数组


> 可变个数形参 只能声明在末尾且只能写一个可变个数形参结构
- 跟js的...args一样
- public void show(int a, String... strs) { }
  
----------------------------

### 方法参数的值传递机制

> 回顾: 关于变量的赋值
- 对于基本数据类型来讲 int n = m 实际上就是将m存的数据给了n 
- 这时候内存中 10 是有两份的

```java 
  // 基本数据类型的举例
  public static void main(String[] args) {
    
    int m = 10;
    int n = m;
    System.out.println("m = " + m + ", n: " + n);

    // 当我们把n改为20的时候 m是多少 因为是值传递 所以不会影响到 m
    n = 20;
    System.out.println("m = " + m + ", n: " + n);
  }
```

- 栈: 因为是局部变量

----------
n: 10  ->  n: 20
m: 10
----------


- js中我们创建对象的方式:

    let obj = new Object();
    let obj = {name: "sam"}

- 有上述的两种方式创建一个普通的对象

- java中是面向对象的编程方式 在创建对象的时候就是创建一个类 添加属性 就是在类的内部添加成员属性 添加方法就是在类的内部添加成员方法

    class Order { orderId: 1001 }
    Order o = new Order();


```java 
  // 引用数据类型的举例
  public class Demo {

    public static void main(String[] args) {
      
      Order o1 = new Order();
      o1.orderId = 1001;

      // 引用数据类型的时候 我们传递的是地址值 
      // 这样 o1 o2 都指向了同一个对象实体
      Order o2 = o1;
      System.out.println("o1.orderId = " + o1.orderId + ", o2.orderId: " + o2.orderId);

      // 因为指向了同一个对象实体 所以通过一个对象修改属性会影响到另一个对象
      o2.orderId = 1002;
      System.out.println("o1.orderId = " + o1.orderId + ", o2.orderId: " + o2.orderId);
    }
  }

  // 创建一个对象(java中就是创建一个类)
  class Order {
    int orderId;
  }
```

**引用数据类型的时候 我们传递的是地址值**


> 变量是基本数据类型的时候
- 此时赋值的是变量所保存的数据值。

> 变量是引用数据类型的时候
- 此时赋值的是变量所保存的数据的地址值。

------

> 方法形参的传递机制 之 值传递
- 其实和上面的规律是一样 我们从形参的角度看看怎么去理解

> 形参
- 方法定义时 声明的小括号内的参数

> 实参
- 方法调用时 实际传递给形参的数据


> java的实参值如何传入方法呢？
- java里方法的参数传递方式只有一种： *值传递*
- 即将实际参数值的副本(复制品)传入方法内 而参数本身不受影响

> 形参是基本数据类型:
  实参传递给形参的就是 实参真实存储的数据值(copy)
  *可能就会导致方法内有一份 方法外有一份 两份数据互不干扰 造成方法内爱怎么玩怎么玩不会对方法外的数据造成影响*

- 例如:

```java 

  - 我们交换两个变量的位置的时候 会写这样的逻辑 
    int temp = m;
    m = n;
    n = temp;

  - 因为交换两个变量的位置在很多地方都会使用我们能不能将其封装成一个方法?
  - 然后在合适的位置进行调用
    public void swap(int m, int n) {
      int temp = m;
      m = n;
      n = temp;
    }

  
  - 结果发现不行 我们输出的结果还是未交换之前的
    int m = 10;
    int n = 20;
    System.out.println("m: " + m + ", n: " + n);   // m:10 n: 20

  // 调用了方法变量也没有交换
    swap(m, n);
    System.out.println("m: " + m + ", n: " + n);   // m:10 n: 20
```

- 原因:
- 当数据为普通数据类型的时候我们传递到形参中的仅是数据
- 我们调用swap方法交换的方法内部的两个形参局部变量的值


- 我们看看内存解析
- 1. 所有main方法中 定义了 int m = 10， int n = 20
  
  那我们就在栈中创建两个变量

  栈
  ------
  m: 10  main方法中定义的
  n: 20  main方法中定义的


- 2. 调用 swap(m, n)

  接下来我们调用了swap方法将上面m n的值copy给形参m n
  因为形参也是局部变量所以还要在栈中再次创建 m n


  栈
  ------

  m: 10  swap方法中形参m
  n: 20  swap方法中形参n

  m: 10  main方法中定义的
  n: 20  main方法中定义的

  
  temp变量  swap方法中的局部变量
  也就是说我们调用swap后 是将swap方法里面的形参 m n 变量交换了位置

  当swap方法执行完毕后 *swap内部的形参会被销毁出栈* 我们再打印m n的时候打印的是main方法放到栈中的m n


  栈
  ------

  m: 10  swap方法中形参m    - 出栈
  n: 20  swap方法中形参n    - 出栈

  m: 10  main方法中定义的
  n: 20  main方法中定义的




> 形参是引用数据类型: 
- 将实参引用数据类型变量的 "地址值"传递给形参

```java 
  package src.com;
  public class Demo {

    public static void main(String[] args) {

      // 3. 将Data类实例化对象
      Data data = new Data();
      data.m = 10;
      data.n = 20;
      System.out.println("data.m: " + data.m + ", data.n: " + data.n);
      
      // 4. 实例化Demo类调用swap方法
      Demo d = new Demo();
      d.swap(data);
      System.out.println("data.m: " + data.m + ", data.n: " + data.n);
    }

    // 2. 交换两个变量值的方法 参数为Data类 类型
    public void swap(Data data) {
      int temp = data.m;
      data.m = data.n;
      data.n = temp;
    }
  }

  // 1. 我们要创建一个对象
  class Data {
    int m;
    int n;
  }
```

- 因为基本数据类型的时候 我们传递到形参的值为copy的原始值
- 我们现在形参的位置是一个对象 它跟形参保存的都是地址值 都指向堆空间中的一个对象实体

  栈                   堆   0x7788
  ------              ------
  data: 0x7788 形参
  data: 0x7788 main中new Data

                      
                      m: 0  - 10
                      n: 0  - 20


- 然后我们调用 swap(data) 将data传递进去 data是引用数据类型
- 保存的是地址值 0x7788

- 现在通过地址值都指向堆空间中的数据m n 所以交换的也是堆空间中的m n


```java 
  // 这是一个封装好的排序方法
  public void sort(int[] arr) {
    for(int i=0; i<arr.length-1; i++) {
      for(int j=0; j<arr.length - 1 - i; j++) {
        if(arr[j] > arr[j+1]) {
          
          // 我们把这个部分逻辑也封装成一个方法
          int temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp

          // 如果这么传递值的话 还是会跟上面的情况一样 
          // 我们把arr[j], arr[j+1]对应的值copy给了形参 它们还是会在方法内部自己干自己的
          - swap(arr[j], arr[j+1])


          // 正确的方法
          swap(arr, j, j+1)
        } 
      }
    }
  } 

  // 这里我们也是将 交换两个变量 的逻辑封装成了一个方法
  // 在形参为基本数据类型的时候 我们使用swap方法未成功 那在这里可以么？


  // 这样定义形参传递进来的值是基本数据类型 所以不行
  public void swap(int i, int j) {
    int temp = i;
    i = j;
    j = temp
  }

  // 我们把引用类型的数组传递进来 这里的int i j不是元素 而是索引位置
  public void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp
  }
  
```


> 练习： 网红题
- 定义一个int型的数组
- int[] arr = new int[]{12, 3, 3, 34, 56, 77, 432}
- 让数组的每个位置上的值去除以首位置的元素 得到的结果 作为该位置上的新值 遍历新的数组

```java 
  // 错误的答案
  for(int i=0; i<arr.length; i++) {
    arr[i] = arr[i] / arr[0]
  }

  当i=0的时候 12 = 12 / 12 = 1
  因为首位置已经是1了 所以

  当i=1的时候 3 = 3 / 1 = 3     因为上面arr[0]的位置已经被改成1了
  所以上面的答案不对
```

```java 
  // 正确答案
  for(int=arr.length - 1; i>=0; i--;) {
    arr[i] = arr[i] / arr[0]
  }

  // 我们倒着来 保证第一个元素的值始终为12
```

```java  
  // 正确方法2
  int temp = arr[0]
  for(int i=0; i<arr.length; i++) {
    arr[i] = arr[i] / temp
  }

  // 我们将数组中第一个元素保存到外面 让它的值不变
```


> 练习2：
- 下面的代码分别输出什么？
```java 
  int[] arr = new int[] {1,2,3};
  System.out.println(arr);    // [I@626b2d4a


  char[] arr1 = new char[] {'a','b','c'};
  System.out.println(arr1);   // abc
```

- 第一个int型   是地址值
- 当我们传入的是int[]数组的时候 会调用重载方法 println(Object)

- 第二个char型  是abc
- 当我们传入的是char[]数组的时候 会调用重载方法 println(char[])
- 该方法体内部的逻辑是遍历 char型数组的


> 练习3：
- 1. 
- 定义一个Circle类 包含一个double型的radius属性代表圆的半径
- 一个findArea()方法返回圆的面积

- 2. 
- 定义一个类PassObject 在类中定义一个方法printAreas() 该方法的定义如下
- public void printAreas(Circle c, int time)
- 在printAreas方法中打印输出1到time之间的每个整数半径值 以及对应的面积
- 例如：
- times为5 则输出半径 1 2 3 4 5 以及对应的圆面积

- 3. 
- 在main方法中调用printAreas()方法 调用完毕后输出当前半径值
- 程序运行结果如下
<!-- 
  Radius        Area
  1.0           3.14...
  2.0           12.56...
  3.0           28.27...
  4.0           50.26...
  5.0           78.53...
 -->

```java 
  package src.com;
  public class Circle {
    double radius;

    // 求圆的面积 不用有形参 直接用对象中的radius
    public double findArea() {
      return radius * radius * Math.PI;
    }
  }
```

```java 
  package src.com;
  public class PassObject {

    public static void main(String[] args) {

      PassObject test = new PassObject();
      Circle c = new Circle();
      test.printAreas(c, 5);
    }

    public void printAreas(Circle c, int time) {
      System.out.println("Radius\t\tAreas");
      for(int i=1; i<=time; i++) {
        c.radius = i;
        System.out.println(c.radius + "\t\t" + c.findArea());
      }
    }
  }
```

----------------------------

### 递归方法
- 一个方法体内调用它自身
- 方法递归包含了一个隐式的循环 它会重复执行某段代码 但这种重复执行无须循环控制
<!-- 
  方法在运行的时候调用了自己就是递归
  def f(x)
    if x > 0
      return x + f(x-1)
    else 
      return 0    // 终止条件

    参数x的值     函数的返回值
    x = 3        3 + f(2)

        参数x的值     函数的返回值
        x = 2        2 + f(1)

            参数x的值     函数的返回值
            x = 1        1 + f(0)

    其中 f(x-1) 就相当于 i-- 当x为0的时候 就终止

  结果：
    f(3) = 3 + f(2)
         = 3 + 2 + f(1)
         = 3 + 2 + 1 + f(0)
         = 3 + 2 + 1 + 0
 -->


> 技巧: x + f(x-1)
- 先记住 这种写法就是求n之前的累计数 累计数不光光是相加还有相乘


**注意：**
- 递归一定要向已知方法递归 否则这种递归就变成了无穷递归 类似于死循环
<!-- 
  在程序运行的时候是有代价的 要占用一片栈的内存空间 当调用函数时 都必须要放一些数据到栈里

  当函数运行结束时 这些数据会从栈中弹出
  可是 如果调用了很多函数但是这些函数都不返回 栈就被塞满了 数据没地方放了 就是栈溢出
 -->


> 练习：
- 计算1-100之间所有自然数的和

```java 
  public void sum(int num) {
    if(num == 1) {
      return 1 
    } else {
      return num + sum(num - 1);
    }
  }
```

- 数组中的快排 排序 内部用的就是递归方法


> 练习2
- 已知有一个数列
- f(0) = 1
- f(1) = 4
- f(n+2) = 2 * f(n+1) + f(n)
- 其中n是大于0的整数 求f(10)的值
```java 
  public int f(int n) {
    if(n == 0) {
      return 1;
    } else if(n == 1) {
      return 4;
    } else {
      return 2 * f(n - 1) + f(n - 2);
    }
  }
```

----------------------------
 
### 封装与隐藏(封装性) 面向对象特征之一: 
- 面向对象的三大特点: 封装 继承 多态

- 为什么需要封装？ 封装的作用和含义？
<!-- 
  我要用洗衣机 只需要按一下开关和洗涤模式就可以了
  有必要了解洗衣机内部的结构么？ 有必要碰电动机么？
 -->

- 程序设计追求"高内聚 低耦合"
- 高内聚：
- 类的内部数据操作细节自己完成 不允许外部干涉
<!-- 
  简单的说就是封装起来了
 -->

- 低耦合：
- 仅对外暴露少量的方法用于使用

- 隐藏对象内部的复杂性 只对外公开简单的接口(API)
- 便于外界调用 从而提供系统的可扩展性 可维护性 
- 通俗的说 *把该隐藏的隐藏起来 该暴露的暴露出来 这就是封装性的设计思想*


> 为什么要对属性进行封装和隐藏
- 当我们创建一个类的对象以后 我们可以通过"对象.属性"的方式 对 对象的属性进行赋值
- 这里赋值操作要受到属性数据类型和存储范围的制约(int型的变量不能被赋double)
- 但是除此之外没有其它制约条件 但是在实际问题中 我们往往需要给属性赋值加入额外的限制条件 这个条件就不能在属性声明体现
- 我们只能通过方法进行限制条件的添加(比如下面例子中的setLegs方法) 
- 同时我们需要避免用户再通过"对象.属性"的方式 对 对象的属性进行赋值 则需要*将属性声明为私有的(private)*

- 此时 针对于属性就体现了封装性

> 举例
- 我们举一个简单的例子
- 我们创建一个 Animal类 然后在Demo类中 设置Animal类中的属性
- legs 一个动物 腿的数量肯定是正数 但是由于我们实例化对象后 可以通过 a.legs 的方式给legs属性 赋任意值 
- 这时候我们就需要对 legs属性进行限制 同时还需要将 a.legs 的方式进行隐藏
- 我们利用对外提供设置属性的方法的形式 和 使用 private 关键字将legs属性私有化
```java 
  // Demo类
  public class Demo {

    public static void main(String[] args) {

      // 实例化 Animal类 
      Animal a = new Animal();
      a.name = "花花";
      a.age = 1;

/*
  腿是不能有负数的 也就是我们在给属性赋值的时候 是会有一些限制 
  比如输入姓名的时候 姓名的长度不能太短等
  那怎么才能在我们赋值的时候对我们赋值进行一些限制呢？ 

  比如只能赋值为正数 那我们只能通过方法了 
  我们可以在Animal类中创建一个专门给legs属性赋值的方法
*/

      // 调用对外暴露的 setLegs 方法 因为不满足条件 legs属性 走else逻辑 设置为0 不让它赋值负数 或者 不是偶数的情况
      a.setLegs(5);
      a.show();

/*
  现在我们确实可以使用 setLegs方法去给legs属性来赋值  但是我们是不是还可以直接写 a.legs = -4; 这样的逻辑 

  那就还避免不了用户去写 还是避免不了出现负数的情况 所以除了我们设置一个可以设置legs的方法 
  
  还需要将 a.legs = -4; 这样的逻辑禁掉 不让用户通过这样的方式去修改legs属性

  所以一方面我们提供一个方法 通过方法里面对legs属性进行限制条件给legs属性赋值 同时还要将直接调属性的方式禁掉 

  所以:
  我们使用 private权限修饰符 将legs属性声明为 私有的 
  这样别的类中再调用legs属性就会报错了 以上我们就完成了对legs属性的封装

  Animal类中有这个属性但是外部还不能调用
  我们的类就像一个盒子一样 我们在内部定义属性legs 这个属性存在这个类当中 我们在legs属性前面加上private后 

  外部就不能调用了 你要是想修改legs属性 我给你提供了一个口(方法 or 接口) 
  这就是一个封装 或者说是 隐藏 使得外部不能直接看到它
*/
    }
  }


  // Animal类
  class Animal {
    String name;
    int age;

    // 对属性进行私有化 封装
    private int legs;

    public void eat() {
      System.out.println("进食");
    }

    public void show() {
      System.out.println("name: " + name + ", age: " + age + ", legs: " + legs);
    }

    // 这个方法就是专门给legs属性赋值的方法 对外暴露修改属性的方法
    public void setLegs(int l) {
      if(l >= 0 && l % 2 == 0) {
        // 满足上述条件才允许赋值
        legs = l;
      } else {
        legs = 0;
        // 可以在这部分的逻辑里面 抛出一个异常
      }
    }
  }
```


> 封装性的体现
- 我们将类的属性私有化(private) 同时提供公共(public)的方法来获取和设置此属性的值
- 这只是封装性的体现 但是这不等同于封装性 只是封装性中的一个点

```java 
  // 这个方法就是专门给legs属性赋值的方法
  public void setLegs(int l) {
    if(l >= 0 && l % 2 == 0) {
      // 满足上述条件才允许赋值
      legs = l;
    } else {
      legs = 0;
      // 可以在这部分的逻辑里面 抛出一个异常
    }
  }

  // 设置 读取legs属性的方法
  public int getLegs() {
    // return 当前实例对象的legs属性
    return legs;
  }
```

- 自己的思考要点:
- 上面的代码中 getLegs方法中 我以为要 return this.legs
- 没想到直接的 return legs 就可以 
- 因为谁调用这个方法 就会打印对应的堆空间的对象实体中的legs属性的值

- 以上就是属性的封装性的体现 我们不让用户去调私有化的属性 而是通过set 和 get方法完成这样的操作

- 封装性的体现很多
- 1. 私有化属性(上面的例子)
- 2. 不对外暴露的私有的方法
- 3. 单例模式 ...
<!-- 
  单例模式是指将构造器私有化 构造器是用来造对象的
  如果将构造器私有化了就意味着外面就不能随意调用构造器了 

  单例模式就是单独的一个实例
 -->

- 4. 如果不希望类在包外被调用 可以将类设置为缺省的
<!-- 
  只要是使用了4种权限修饰符的 都是封装性的体现
 -->


> 四种权限修饰的理解
- *封装性的体现需要权限修饰符的配合* 封装性之所有能够体现出来就是因为我们设置了权限修饰符

- java规定了4种权限(从小到大排列) 属性和方法在调用的时候能不能调 完全看权限
- private < 缺省 < protected < public
<!-- 
  缺省是什么也不写也是一种权限

  String name;
    // 这时候就是缺省的权限
 -->

- java权限修饰符置于类的成员定义前 用来限定对象对该类成员的访问权限
<!-- 
    修饰符      类内部    同一个包    不同包的子类    同一个工程

    private     yes

    缺省        yes        yes

    protected  yes        yes       yes

    public     yes        yes       yes         yes
 -->

**注意:**
- 对于class的权限修饰只可以用*public和缺省*
- pubic类可以在任意地方被访问
- 缺省类只可以被同一个包内部的类方法

- 扩展:
- 在同一个包下不能造相同文件名的类 但是不同包里是可以造相同文件名的类的


> private
- 在哪声明的就在哪用 类就是最小的
- 只能用于该类内部


> 缺省
- 能用于类内部 和 同一个包内(别的包就不能用)


> protected
- 能用于类内部 和 同一个包内 和 不同包的子类
<!-- 
  不同包的子类 涉及到继承 后面再说
 -->


> public
- 任何地方都能用(类内部 同一个包 不同包的子类 同一个工程)


> 4种权限可以用来修饰什么？
- 可以用来*修饰类* 以及 *类的内部结构*(属性 方法 构造器 内部类)
- 4种权限都可以用来修饰类的内部结构


**注意: 修饰类的时候**
- 只能使用 public 或者 缺省(什么也不写)

```java 
  package com;

  public class Order {
    private int orderPrivate;
    int orderDefault;
    public int orderPublic;

    private void methodPrivate() {
      orderPrivate = 1;
      orderDefault = 2;
      orderPublic = 3;
    }

    void methodDefault() {
      orderPrivate = 1;
      orderDefault = 2;
      orderPublic = 3;
    }

    public void methodPublic() {
      orderPrivate = 1;
      orderDefault = 2;
      orderPublic = 3;
    }
  }


  public class OrderTest {
  public static void main(String[] args) {

    // 创建 我们要使用属性的类的对象
    Order order = new Order();

    order.orderDefault = 1;
    order.orderPublic = 2;
    // order.orderPrivate = 3;    报错 .不出来这个属性

    // 报错信息: The field Order.orderPrivate is not visible
    // 出了Order后 私有的属性就不可以被调用 方法也一样 private的方法是调用不了的
  }
}
```

- 同包下:
- 出了Order类后 私有的属性就不可以被调用 方法也一样 private的方法是调用不了的

- 不同包下:
- 出了Order类所属的包之后 私有的结构 缺省声明的结构就不可以调用了


> 总结:
- java提供了4种权限修饰符来修饰类以及类的内部结构 体现类以及类的内部结构在被调用时可见性的大小


> 练习：
- 编码习惯:
- 一般情况下 都是一个源文件当中写一个类

\\ 类图
<!-- 
  Person
  ------
  -age:int        // -号就是私有化的意思
  ------
  +setAge(i:int)  // +号是public
  +getAge():int   // ():int 方法的返回值类型
 -->


- 要点:
- throw new RuntimeException("")

```java 
  package src.com;

  public class Person {
    private int age;

    public void setAge(int a) {

      // 方式1：
      if(a > 0 && a < 130) {
        age = a;
      } else {
        System.out.println("您输入的年龄不合法请输入0~130之间的整数");
        age = 1;
      }

      // 方式2： 抛出异常
      if(a < 0 || a > 130) {
        throw new RuntimeException("传入的数据非法！");
      } else {
        age = a;
      } 

      // 方式3： return
      if(a < 0 || a > 130) {
        System.out.println("您输入的年龄不合法请输入0~130之间的整数");
        return;
      }

      age = a;
    }

    public int getAge() {
      return age;
    }
  }

```

----------------------------

### 构造器(或构造方法) 类的成员之三: 
- 上面我们讲了类的成员 属性和方法 这个部分我们来讲下构造器
- 任何一个类都有构造器 比较重要哦

> 构造器的作用: 创建对象
- 作用：
- 创建对象

- 说明：
- 如果没有显式的定义类的构造器的话 则*系统默认提供一个空参的构造器*
<!-- 
  之前我们要调用 Person类中的结构都是 Person p = new Person();
  我们用上面的命令来创建对象 

  那我们上面又说 构造器的作用是创建对象 那和 new Person() 有什么关系?
  其实 new Person() == new + 构造器
 -->


> 定义构造器的格式
- 权限修饰符 类名(形参列表) { 构造器的体 }

- 功能：
- 构造器长的很像方法 但它和方法的功能不一样 一般方法都是通过对象去调用 
- 而构造器主要的功能就是用来*造对象*的

```java  
  class Person {
    // 属性
    String name;
    int age;

    // 构造器 --- 空参构造器
    public Person() { }
      - 之前没写构造器的时候 我们在new Person() 的时候 其实就是调用的这个 
      - 当没显式的写出得时候 系统会添加一个默认的空参构造器


    // 方法
    public void eat() {
      System.out.println("人吃饭");
    }
  }
```

- 如果我们没有显式的定义构造器 那么系统会自动添加默认的构造器
- *默认的构造器的权限 和 类的权限一致* 如果类的权限是public 那么构造器的权限也是public 如何类没有权限属于缺省权限 那么构造器的权限也是缺省权限


> 构造器的作用2: 创建对象的同时给对象属性做初始化
- 构造器的作用除了可以创建对象 还跟js中的constructor功能一样 可以用来在实例化对象的时候通过传递实参动态的进行初始化值

- js中: 
```js 
  class Person {
    constructor(name) {
      this.name = name
    }
  }

  const p = new Person("刘德华")
```

- java: 
- 构造器可以在类中定义多个, 构造器的名都是Person 那么区别就是形参不同
- 所以一个类中*多个构造器构成重载*
```java 
  public class Person {
    
    String name;

    // 一个类中构造器可以有多个
    public Person() { }

    // 我们可以利用构造器 初始化当前类的属性
    public Person(String n) {
      // 通过实参传递进来的数据 赋值给了类中的 name 属性
      name = n;
    }
  }

  Person p = new Person("张学友")
```

- 和js一样 在构造器中的逻辑*会在实例化对象的时候自动执行* 不仅可以在构造器中对属性进行初始化 还可以自动执行一些逻辑

- 比如 一出生就必须先洗澡 我们就可以在 人 的构造器中加入完成 洗澡 的代码
- 于是每个 人 一出生就会自动完成 洗澡

- 程序就不必再在每个人刚出生的时候一个个地告诉他们要 洗澡 了

```java 
  // 构造器
  public Person(String n, int a) {
    name = n;
    age = a;
    System.out.println("我要洗澡了");
  }
```


**注意**
- *一旦我们显式的定义了类的构造器之后 系统就不在提供默认得空参构造器*
- 一个类中至少有一个构造器（不是默认的 就是我们显式定义的）
- *构造器中没有返回值*


**自我总结:**
- 1. 类中的属性声明为 private 后 该属性仍然可以通过构造器的方式赋初始值
<!-- 
  这不是不对 只是我在想 能不能行的问题 这里只是做在记录
 -->

- 2. 上面说了构造器不仅仅是给属性进行初始化 写在构造器中的逻辑还能被自动执行
- 自动指定的


> 练习:
- 在前面定义的Person类中添加构造器 利用构造器设置所有人的age属性 初始值都为18
```java 
  package src.com;
  public class PersonTest {
    public static void main(String[] args) {
      
      Person p = new Person();
      int res = p.getAge();
      System.out.println(res);

    }
  }

  class Person {
    
    String name;
    int age;

    // 构造器 权限修饰符 类型(形参列表) {方法体}
    public Person() {
      age = 18;
    }

    public int getAge() {
      return age;
    }
  }
```

- 修改上题中类和构造器 增加name属性 使得每次创建Person对象的同时初始化对象的age属性值 和 name属性值
```java
  package src.com;
  public class PersonTest {
    public static void main(String[] args) {
      
      Person p = new Person("sam", 18);
      int age = p.getAge();
      String name = p.getName();

      System.out.println(age);
      System.out.println(name);
    }
  }

  class Person {
    
    String name; 
    int age;

    public Person(String n, int a) {
      age = a;
      name = n;
    }

    public int getAge() {
      return age;
    }

    public String getName() {
      return name;
    }
  }
```


> 练习2
- 编写两个类 TriAngle 和 TriAngleTest 其中TriAngle类中声明私有的底边长base和高height
- 同时声明公共方法访问私有变量 此外提供类必要的构造器 另一个类中使用这些公共方法 计算三角形的面积
```java 
  package src.com;

  public class PersonTest {
    public static void main(String[] args) {
      
      Person p = new Person(10, 30);
    }
  }

  class Person {
    
    // 底边长
    private int base;
    // 高
    private int height;

    // 还可以提供set方法
    public int getBase() {
      return base;
    }
    // 还可以提供set方法
    public int getHeight() {
      return height;
    }

    // 一般在真实开发中 都习惯的提供一个空参的构造器
    public Person() { }

    public Person(int b, int h) {
      base = b;
      height = h;

      // 该逻辑会在实例化对象的时候自动调用
      System.out.println("给定三角形的面积为: " + (b * h) / 2);
    }
  }
```


> 总结:
- 1. 在开发中习惯的把类中的属性进行私有化 体现封装性
- 一般读属性的时候的时候其实都是在调用方法

- 2. 在开发中习惯先提供一个空参的构造器
- 为了方便以后使用 反射 来造对象 反射喜欢调用空参的构造器


> 总结属性的赋值过程(先后顺序问题)
- 现在有很多地方都可以给属性进行赋值操作

- 1. 默认初始化值 int age;      // int型的默认初始化值为0
- 2. 显示初始化值 int age = 1;  // 显式初始化值
- 3. 构造器中赋值
- 4. 通过对象.set方法 或 对象.属性

- 上面赋值操作的先后顺序是 1 - 2 - 3 - 4 (后面的会覆盖前面的)
- 1 2 3只会执行一次所以叫做初始化 4可以反复执行

----------------------------

### JavaBean(后续到web的时候可以有更好的理解)
- 我们会在javaweb中体会到JavaBean的概念
- JavaBean是一种Java语言写成的可重用组件

- 所谓JavaBean 是指符合如下标准的Java类
- 1. 类是公共的
- 2. 有一个无参的公共的构造器
- 3. 有属性(私有属性)， 且有对应的get set方法


- 用户可以使用JavaBean将功能 处理 值 数据库访问和其他任何可以用Java代码创造的对象进行打包

- 并且其他的开发者可以通过内部的JSP页面 Servlet 其他JavaBean applet程序或者应用 来使用这些对象

- 用户可以认为JavaBean提供了一种随时随地的赋值和粘贴的功能 而不用关心任何改变

----------------------------

### UML类图

<!-- 
  banking             包名
  ----------------------
         Account      类型
  ----------------------
  -balance: double    前面是属性后 后面是属性的类型
  ----------------------
  +Account(int balance: double)     
                     若方法有下划线表示为构造器

 -->


> + 表示 public 类型
> - 表示 private 类型
> # 表示 protected 类型
> → 表示 extends 继承


> 方法的写法:
- 方法的类型(+ -)
- 方法名(参数名: 参数类型): 方法返回值类型

----------------------------

### this关键字的使用
- 在Java中 this关键字比较难理解 它的作用和其词义很接近
  - 它在方法内部使用 *即这个方法所属对象的引用* (也就是方法所属的当前对象)
  - 它在构造器内部使用 表示该构造器正在初始化的对象 (实例化对象)

- this表示当前对象 *可以调用类的属性 方法和构造器*

- 什么时候使用this关键字呢？
- 当在方法内需要用到调用该方法的对象时 就用this

- 具体的 我们可以用this来区分局部变量和属性
- 比如 this.name = name;

- 举例:
```java 
  class Person {

    private String name;
    private int age;

    // 之前 A
    public void setName(String n) {
      name = n;
    }


    // 之后 B
    public void setName(String name) {
      name = name;
    }
  }
```
- 上面我们简单的定义一个类 并且将属性私有化 对外提供修改和读取属性的方法
- 之前我们都是像上述 A 那样定义的

- 但是都说形参要见名知意 所以我们将形参定义为name 那么就会有 
  name = name 的样子 虽然编译不报错但是系统会把这两个name都认为是形参的name
  
- 这时我们在name属性的前面加上 this
    this.name = name
  
- this可以理解为当前对象 可以用. this.点出来的不是属性就是方法
  所以 this.name 前面的name就是属性 后面的形参name就是局部变量

- 之后我们再方法中给属性 通过形参给属性赋值的时候 都要使用 this.name = name 的形式(之前形参名和属性名没有重名 所以没有在属性前加this)


> this的使用
- 1. this可以用来.属性 .方法 和 .构造器
```java 
  // 构造器
  public Person(String name) {
    this.name = name;
  }
```

- 2. this理解为当前对象 也可以理解为实例化后的对象
```java  
  public void setName(String name) {
    // 给实例对象的身上的name属性赋值为形参name
    this.name = name;
  }

  Person p = new Person();
  p.setName("sam")

  // this就是对象p
```

- 3. 在类的方法中 可以使用 this.属性 或 this.方法的方式 调用当前对象的属性和方法 *但是通常情况下 我们都选择省略 "this."*

```java  
  // 之前我们在封装性的体现中 会定义 getAge 的方法 方法内会return age 其实我们就是省略了this.

  public void getAge() {
    return age;       // 之前都是这么直接return的
    return this.age;  // 其实相当于省略了 this.
  }
```

- 特殊情况下 如果方法的形参和类的属性同名时 我们必须显式的使用this.变量的方式表明此变量是属性而非形参


**思考:**
- 跟js的一部分差不多 都是代表实例对象的意思 但是还有this()的写法


> this 调用构造器  -- this(形参列表)
- 要点:
- 1. 我们在*类的构造器*中 可以显式的使用 '*this(形参列表)*' 方式 调用本类中指定的(重载的)其他构造器

- 情景:
- 很多情况下 我们在对类进行初始化的时候 我会执行一些默认得逻辑
- 比如属性的赋值 和 初始化节点等 这时候我们就会在构造器中执行很多的逻辑

- Java中一个类中可以声明多个构造器(构造器的重载主要以形参列表来区分)
- 所以当对象实例化 new Person(形参列表) 指定构造器的时候 都需要初始化一段逻辑

- 所以就会要求 类中的每一个构造器中都要有 初始化的逻辑 但相同的代码都写在多个构造器里面的话 会造成代码的冗余

- 解决方式1：
  在类中定义方法 然后在构造器中调用方法

- 解决方式2
  在类中调用写好逻辑的其它构造器

```java 
  // 比如我们当前有一个Person类
  class Person {

    // 属性
    private String name;
    private int age;

    // 空参构造器
    public Person() {
      String info = "Person在初始化时 需要考虑如下的 1 2 3 4 ... (共40行代码)";
      System.out.println(info);
    }
    
    public Person(int age) {
      // 调用空参构造器
      this();
      this.age = age;
    }

    // 这是有参数的构造器
    public Person(String name, int age) {

      // 根据形参类型调用指定的构造器 调用上面的构造器
      this(age);
      this.name = name;

      // 这里调用 this(age); 相当于省略了 this.age = age; 的逻辑
    }
  }
```

- 2. 构造器中不能通过 this(形参列表) 调用自己(只能调用其它的构造器) 
<!-- 
  构造器调用的时候不管 内部连续调用了几个构造器 创建的对象只是一个
  只是借用了其它构造器内部的逻辑而已
 -->

- 3. 如果一个类中有n个构造器 则最多有n - 1个构造器可以使用 this(形参列表)
<!-- 
           →
      ↗         ↘
    构造器1    构造器2      构造器3      构造器4
      ↖         ↙
           ←

  构造器1 能调用 构造器2 但是构造器2 不能再调用构造器1 不能成为一个环
  这样就是死循环

  构造器1能调用构造器2 构造器2能调用构造器3 构造器3能够调用构造器4
  但是 构造器4不能调用其它的任何的构造器 调用谁都是死循环

  所以一个类中有n个构造器 则最多有n - 1个构造器可以使用 this(形参列表)
 -->

- 4. *规定: this(形参列表) 必须声明在当前构造器的首行*
<!-- 
  类似supper的写法 先指明要调用哪个构造器 然后再写自己的逻辑 
-->

- 5. 构造器内部最多只能声明一个 this(形参列表) 这种方式 用于调用其它的构造器

- 应用场景:
- 当A构造器中已经有现成的逻辑的时候 就不要在B构造器中再次的书写 可以使用 this()的方式调用A构造器


> 练习:
- 记入要点:
- 1. 
```java 
  // 当前属于 Girl 类中的方法 该方法需要传入 Boy类的对象
  public void marry(Boy boy) {
    System.out.println("我想嫁给" + boy.getName());

    // 传入Boy类的实例对象后 调用Boy类的marry方法 传入girl对象
    boy.marry(this)

    - 这里我们传入 this this就是当前的对象 谁调用这个方法当前对象就是谁
    - 既然boy.marry需要传入girl对象 我们就可以传入this
  }
```


- 2. 比较两个对象的大小 会使用 compare方法
- public int compare(Girl girl) { }

- 注意:
- 该方法的返回值是 int型
- 如果返回值为正数 则代表 -- 当前对象大
- 如果返回值为负数 则代表 -- 当前对象小
- 如果返回值为0   则代表 -- 当前对象 和 形参对象 相等

```java 
  public int compare(Girl girl) {
    if(this.age > girl.age) { 
      return 1;
    } else if(this.age < girl.age) {
      return -1;
    } else {
      return 0;
    }

    // 简化
    return this.age - girl.age; 
        // 如果this.age大那么就是正数 否则就是负数 或 0
  }
```

----------------------------

### Account Customer 实验1： 
- 写一个名为Account的类模拟账户
- 该类的属性和方法如下图 
- 该类包括的属性：
- 账号id
- 余额 balance
- 年利率 annualInterestRate

- 该类包含的方法
- 访问器方法(get set)
- 取款方法withdrawal()
- 存款方法deposit()

- 提示:
- 在提款方法 withdrawal 中 需要判断余额是否能够满足提款数额的要求如果不能，应给出提示。
<!-- 
  ------------
    Account
  ------------
  private int id
  private double balance
  private double annualInterestRate
  ------------
  public Account (int id, double bal ance, double  annualInterestRate )
  ------------
  public
  String getFir stName()
  public
  String getLastName()
  public
  Account getAccount()
  public void setAccount(Account account)
  ------------
 -->


- 创建 Customer 类
- 声明三个私有对象属性： firstName 、 lastName 和 account 。
- 声明一个公有构造器，这个构造器带有两个代表对象属性的参数（ f 和 l
- 声明两个公有存取器来访问该对象属性，方法 getFirstName 和 getLastName 返回相应的属性。
- 声明 setAccount 方法来对 account 属性赋值。
- 声明 getAccount 方法以获取 account 属性。


> 类的关联关系
- 在一个类中声明另外一个类 这种关系叫做关联关系
- Customer类中将Account类当做属性 这种就是关联关系
<!-- 
  ------------
    Customer
  ------------
  private String firstName
  private String lastName
  private Account account
  ------------
  public Customer(String f,String l)
  ------------
  public int getId()
  public double getBalance()
  public double getAnnualInterestRate()
  public void setId( int id)
  public void setBalance(double balance)
  public void setAnnualInterestRate(double annualInterestRate)
  public voi
  d with d raw (double amount) 取钱
  public void deposit (double amount) 存钱
  ------------
 -->

- 写一个测试程序。
- 创建一个 Customer ，名字叫 Jane Smith, 他有一个账号为 1000 ，余额为 2000 元， 年利率为 1.23 的账户。

- 对 Jane Smith 操作。
- 存入
- 100 元，再取出 960 元 。 再 取出 2000 元。
- 打印出Jane Smith 的基本信息
<!-- 
  成功存入 ：100.0 
  成功取出：960.0 
  
  余额不足，取款失败 
    Customer [Smith, Jane] has a account: id is 1000, annualInterestRate is 1.23 ％％, balance is 1140.0
 -->


- 这两个类的关系
- Customer类是人的信息 内部包含姓名和银行账户
- Account类是账户的信息 内部包含余额 年利率 和 账户 以及操作账户的方法

- Customer类是包含(该类里面有一个属性是Account类)Account类的

```java 
  // 测试类
  public class CustomerTest {
    public static void main(String[] args) {
      // 初始化指定姓名的账户信息
      Account account = new Account(1000, 2000, 0.0123);

      // account还没有初始化 为null
      Customer JS = new Customer("Jane", "Smith");


      // 该方法让账户和客户一一对应 
      说白了就是让它们两个有关系 JS客户有了账户了 
      相当于银行创建了一个账户 然后给了JS一张卡 JS就可以操作这个账户 这
      
      个账户现在有两个指针 JS 和 account对象 都可以操作账户
      JS.setAccount(account);


      // getAccount返回这个账户 就说明拿到了 account对象 该对象中有对应的存钱取钱的方法
      JS.getAccount().deposit(100);
      JS.getAccount().withdraw(960);
      JS.getAccount().withdraw(2000);
    }
  }


  // Account 类
  public class Account {
    // 账号
    private int id;
    // 余额
    private double balance;
    // 年利率
    private double annualInterestRate;


    // 构造器 对账号 余额 年利率的初始化
    public Account(int id, double balance, double annualInterestRate) {
      this.id = id;
      this.balance = balance;
      this.annualInterestRate = annualInterestRate;
    }

    public int getId() {
      return this.id;
    }

    public void setId(int id) {
      this.id = id;
    }

    public double getBalance() {
      return this.balance;
    }

    public void setId(double balance) {
      this.balance = balance;
    }

    public double getAnnualInterestRate() {
      return this.annualInterestRate;
    }

    public void setAnnualInterestRate(double annualInterestRate) {
      this.annualInterestRate = annualInterestRate;
    }

    // 取钱
    public void withdraw(double amount) {
      if(this.balance < amount) {
        System.out.println("余额不足 取款失败");
        return;
      }
      // 走到下面的逻辑说明余额够了 那就进行取款的操作
      balance -= amount;
      System.out.println("成功取出: " + amount);
    }

    // 存钱
    public void deposit(double amount) {
      if(amount > 0) {
        this.balance += amount;
        System.out.println("成功存入: " + amount);
      }
    }
  }


  // Customer类
  public class Customer {
    
    private String firstName;
    private String lastName;

    // 首次出现自定义类的变量 -- 变量可以是任何数据类型 也可以是一个Accout类的用户
    private Account account;

    // 构造器 对firstName lastName进行初始化
    public Customer(String firstName, String lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    public String getFirstName() {
      return this.firstName;
    }
    public String getLastName() {
      return this.lastName;
    }
    // 得到这个account对象 可以通过该对象调用account中的方法
    public Account getAccount() {
      return this.account;
    }

    // 通过该方法让account属性也指向 new Account 创建的对象
    public void setAccount(Account account) {
      this.account = account;
    }
  }
```

----------------------------

### 实验2： Account Customer
- 这个比上一个实验1 更加的难一些 除了上面的Account Customer之外还有一个银行的类 银行的类可以存多个客户 这就构成了一个由客户构成的数组

<!-- 
  ----------------
    Account
  ----------------
  - balance: double
  ----------------
  +Account(init_balance: double)    -- 构造器
  +getBalance(): double
  +deposit(amt: double)
  +withdraw(amt: double)
  ----------------

  在提款方法 withdraw中 需要判断用户余额是否能够满足提款数额的要求
  如果不能应给出提示 deposit方法表示存款
 -->

<!-- 
  ----------------
    Customer
  ----------------
  -firstName: String
  -lastName: String
  -account: Account
  ----------------
  +ACustomer(f:String, l:String)    -- 构造器
  +getFirstName(): String
  +getLastName(): String
  +getAccount(): Account
  +setAccount(acct:Account)
  ----------------
 -->

<!-- 
  ----------------
    Bank
  ----------------
  -customers: Customer[]
  -numberOfCustomer:int
  ----------------
  +Bank()    -- 构造器
  +addCustomer(f:String, l:String)
  +getNumberOfCustomers(): int
  +getCustomer(index:int):Customer
  ----------------

  addCustomer方法必须依照参数(姓 名) 构造一个新的Customer对象
  然后把它放到customer数组中
  还必须把numberOfCustomer属性的值加1

  getNumberOfCustomers方法返回 numberofCustomers 属性值
  getCustomer方法返回 numberofCustomers属性值
  getCustomer方法返回与给出的index参数相关的客户
 -->

- 创建 bankTest 类 进行测试

> Account类
- 这个类为账户的类 提供了存钱 取钱 查看余额的方法 
- 构造器初始化的余额


> Customer类
- 这个类为客户信息 姓名和关联哪个账户
- 构造器初始化用户姓名 提供了获取该客户账户 和 设置该客户账户的方法


> Bank类
- 这个类为银行账户
- 属性：
- 有存放多个客户的数组 
    private Customer[] customers;

- 有实际客户数量
    private int numberOfCustomers;
<!-- 
  注意
  客户的个数和customers数组的长度不是一个东西 
  比如我们有一个客户数组能存放10个客户 但是实际上里面存了2个客户 numberOfCustomers 就是这两个客户 所以这个部分不能用数组的长度来衡量
 -->

- 方法:
- 添加客户
```java 
  public void addCustomer(String f, String l) {

    // 创建客户对象
    Customer cust = new Customer(f, l);

    // 将客户对象加入到 customers 数组中
    customers[numberOfCustomers] = cust;
    numberOfCustomers++;
    // customers[numberOfCustomers++] = cust; 还可以这样
  }

  我们第一次往customers数组里添加的时候 customers的下标应该为0
  这里首次调用的时候我们应用到了numberOfCustomers变量
  因为它的默认值为0 同时还可以刻画实际用户数量
```

- 获取指定用户的信息
```java 
  public Customer getCustomer(int index) {
    // return customers[index];  这样的话不严谨 可能包异常

    if(index >= 0 && index < numberOfCustomers) {
      return customers[index];
    } 
    
    return null;
  } 
```

- 代码部分:
```java
  // BankTest类
  public class BankTest {
    public static void main(String[] args) {
      // 首先造一个银行
      Bank bank = new Bank();
      // 添加用户 
      bank.addCustomer("Jane", "Smith");
      // 先得到刚才添加的用户对象调用setAccount方法 关联一个账户
      bank.getCustomer(0).setAccount(new Account(2000));

      // 取得第一个用户调用对应的方法
      bank.getCustomer(0).getAccount().withdraw(500);
      double balance = bank.getCustomer(0).getAccount().getBalance();
      System.out.println("客户: " + bank.getCustomer(0).getFirstName() + bank.getCustomer(0).getLastName() + "的账户余额为: " + balance);
    }
  }


  // Account类
  public class Account {
    // 余额
    private double balance;

    public Account(double init_balance) {
      this.balance = init_balance;
    }

    public double getBalance() {
      return balance;
    }

    // 存钱
    public void deposit(double amt) {
      if(amt > 0) {
        balance += amt;
        System.out.println("存入金额为: " + amt);
      }
    }

    // 取钱
    public void withdraw(double amt) {
      if(balance < amt) {
        System.out.println("余额不足");
        return;
      }
      balance-=amt;
      System.out.println("取出金额: " + amt);
    }
  }


  // Customer类
  public class Customer {
    private String firstName;
    private String lastName;
    private Account account;

    public Customer(String f, String l) {
      this.firstName = f;
      this.lastName = l;
    }

    public String getFirstName() {
      return this.firstName;
    }
    public String getLastName() {
      return this.lastName;
    }
    public Account getAccount() {
      return this.account;
    }
    public void setAccount(Account acct) {
      this.account = acct;
    }
  }


  // Bank类
  public class Bank {
    
    // 用来存放多个客户对象的数组
    private Customer[] customers;

    // 记录实际客户的个数
    private int numberOfCustomers;

    public Bank() {
      // private Customer[] customers; 只是创建了装数组的变量 并没有实际new一个数组 这里我们new一个
      this.customers = new Customer[10];
    }

    // 添加客户
    public void addCustomer(String f, String l) {
      // 创建客户对象
      Customer cust = new Customer(f, l);

      // 将客户对象加入到 customers 数组中
      - customers第一次是数组为0的位置 这里我们应用到了numberOfCustomers变量 
      - 首次调用的时候 它的默认值为0
      customers[numberOfCustomers] = cust;
      numberOfCustomers++;
        // customers[numberOfCustomers++] = cust; 还可以这样
    }

    // 获取实际客户的数量
    public int getNumberOfCustomers() {
      return this.numberOfCustomers;
    }

    // 获取指定用户的信息
    public Customer getCustomer(int index) {
      // return customers[index];  这样的话不严谨

      if(index >= 0 && index < numberOfCustomers) {
        return customers[index];
      } 
      
      return null;
    }

  }
```

----------------------------

### package import 关键字 的使用

> package关键字的使用
- package翻译过来就是 包
- 1. 为了更好的实现项目中类的管理 提供了包的概念
- 我们可以在项目中按照功能创建多个包 我们写的类就放在包下
<!-- 
  比如一个班级就相当于一个package
 -->


- 2. 使用package声明 类或接口 所属的包 声明在源文件的首行
- package com.atguigu.exer

- 3. 包 属于标识符 需遵循标识符的命名规则 规范 "见名知意"
- 包名都是小写
- 通过包名大概也能看出下面的内容是做什么的

- 4. src.com 每.一次就代表一层文件目录

- 补充:
- 同一个包下 不能命名同名的接口 或者 类
- 不同的包下可以命名同名的接口 或者 类
<!-- 
  不能定义同名文件
 -->


> JDK中主要的包介绍
- 1. java.lang
    - 包含一些java语言的核心类 如String Math Integer System 和 Thread 提供常用的功能

- 2. java.net
    - 包含执行与网络相关的操作的类和接口

- 3. java.io
    - 包含能提供多种输入 输出功能的类

- 4. java.util
    - 包含一些使用工具类 如定义系统特性 接口的集合框架类 使用与日期日历相关的函数

- 5. java.text
    - 包含了一些java格式化相关的类

- 6. java.sql
    - 包含了java进行JDBC数据库编程的相关类 接口

- 7. java.awt
    - 包含了构成抽象窗口工具集(abstract window toolkits)的多个类
    - 这些类被用来构建和管理应用程序的图形用户界面 b/s c/s
<!-- 
  java可以写客户端的api 现在java一般都是写后台了 这部分可以不看了
 -->


> import关键字的使用
- import翻译过来的话为 导入

- 作用:
- 1. 在源文件中显式的使用 import 导入指定包下的类 或 接口
- 2. 声明在包的声明和类的声明之间
<!-- 
  import java.util.Arrays
  import src.com.Bank
 -->

- 3. 如果需要导入多个结构 顺序向下依次写出即可
- 当我们使用了一个包下的多个类时 我们可以采用这样的书写方式 
<!-- 
  // 导入指定包下的所有结构
  import src.com.*
 -->

- 4. 如果使用的类或接口是*java.lang包*下定义的 则可以省略import结构
<!-- 
  // 这里的 String[] 和 System 为什么就不用导包  
  public static void main(String[] args) {
    System.out.println()
  }
 -->

- 5. 如果使用的类或接口是*本包*下定义的 可以省略import结构
- 换句话说*使用别的包下的类那就要显式使用 import 导入该包*
<!-- 
  如果我们调用的是其它包下的 或者 lang包下定义的 则需要显式的使用import结构导入包
 -->

- 6. 如果在源文件中 使用了不同包下的同名的类 则必须至少有一个类需要以 *全类名 的方式*显示(包含包在内的完整的路径名)
- 如： src.azz.Account acct = new Account();

- 当我们想要使用的类处于不同包下且该类还同名的时候 我们就要使用包名指定该类了
<!-- 
  src.com
    class Account { }

  src.azz
    class Account { }

  
  上面的同名Account类处于不同的包下 假如我们要在一个文件中同时使用Account类的话

  1. 先导入其中的一个包下的类 import src.com.Account
  2. 然后 当要想使用azz下的Account类的时候 使用包名指定类

      src.azz.Account acct = new Account();
    
     没写包名的就会使用 import 导入的
 -->

- 7. 如果使用'xxx.*'的方式表明可以调用xxx包下的所有结构 但是如果使用的是xxx子包下的结构 则仍需要显示导入
- * 不包括子包
<!-- 
    src.com
      java文件1
      java文件2

      src.azz
        java文件3

  com下有一个子包azz 假如我们再java文件1中 想使用java文件3的话 仍需要使用import 显式导入
 -->

**注意:**
- 上面说过当使用的是 java.lang 包下的结构的时候 我们不用使用import显示导入
- 但是如果我们使用的是 java.lang.*子包 的时候 仍需要显式导入*

- 总结:
- *遇到子包的时候 就显式导入吧*

- 8. import static 导入指定类或接口中的静态结构(属性或者方法)
<!-- 
  比如我们可以这样 表示使用System下的静态结构
  import static java.lang.System.*

  这么写后就可以直接写
  out.println()

  import static java.lang.Math.*
 -->

**注意:**
- import 的落脚点是一个类
- import static 的落脚点必须是类中的一个结构
<!-- 
  import static java.lang.Math.*

  不能是
  import static java.lang.Math 落脚点不能试Math类 必须是里面的一个结构
 -->

----------------------------

### MVC的设计模式
<!-- 
  我们创建一个工程的时候会有很多的类 这些类我们通过包的方式来进行管理 
  对于管理的话 我们有一种设计模式
 -->

- mvc是常用的设计模式之一 将整个程序分为3个层次

- 视图模型层 V
- 控制器层 C
- 数据模型层 M

- 这种将程序输入输出 数据处理 以及数据的展示分离开来的设计模式
- 使用程序结构变的灵活而且清晰 同时也描述了程序各个对象间的通信方式
- 降低了程序的耦合性


> 模型层 model 主要处理数据 - 数据保存
- 数据对象封装 model.bean / domain
- 数据库操作类 model.dao
- 数据库      model.db


> 视图层 view 显示数据 - 用户界面
- 相关工具类  view.utils
- 自定义view view.ui


> 控制层 controller 处理业务逻辑
- 应用界面相关      controller.activity
- 存放fragment     controller.fragment
- 显示列表的适配     controller.adapter
- 服务相关的        controller.service
- 抽取的基类        controller.base


> 各个部分之间的通信
- 1. view传送指令到controller
- 2. controller完成业务逻辑后 要求 model 改变状态
- 3. model将新的数据发送到view 用户得到反馈

- 所有的通信都是单向的
<!-- 
                View

            ↙         ↖

    Controller    →     Model
 -->


> MVP模式
- 模式将 Controller 改名为 Presenter，同时改变了通信方向。
- 1. 各部分之间的通信，都是双向的。
- 2. View 与 Model 不发生联系，都通过 Presenter 传递。
- 3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。
<!-- 
              View

          ↗↙         

    Presenter    → ←    Model
 -->


> MVVM
- MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。
- 唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然
<!-- 
              View

          ↗↙          

       VM    → ←    Model
 -->

----------------------------

### 项目2 客户信息管理软件
- 模拟实现一个基于文本界面的 <客户信息管理软件>
- 进一步掌握编程技巧 和 调试技巧 熟悉面向对象编程
- 主要涉及以下知识点
- 1. 类结构的使用 属性 方法以及构造器
- 2. 对象的创建与使用
- 3. 类的封装性
- 4. 声明和使用数组
- 5. 数组的插入 删除 和 替换
- 6. 关键字的使用 this

- 该软件由以下三个模块组成
- 1. CustomerView
- 2. CustomerList
- 3. Customer

- CustomerView为主模块 负责菜单的显示和处理用户操作
- CustomerList为Customer对象的管理模块 内部用数组管理一组Customer对象 并提供相应添加 修改 删除 和 遍历方法 供CustomerView调用
- Customer为实体对象 用来封装客户信息

- 我们可以把 Customer类 放在 bean包下
<!-- 
  | - src
    | - cmu
      | - bean
        - Customer类

      | - service
        - CustomerList类    controller层

      | - ui
        - CustomerView类    view层

      | - util
        - 老师提供的类

  这里我们按照业务不一样 将不同的类放入不同的包下
 -->

> Customer类
- 初始化客户的信息 内部根据属性分别提供了get set方法
```java 
  package src.cmu.bean;
  public class Customer {
    private String name;

    // 性别的变量类型为什么用char
    private char gender;
    private int age;
    private String phone;
    private String email;

    public String getName() {
      return this.name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public char getGender() {
      return this.gender;
    }

    public void setGender(char gender) {
      this.gender = gender;
    }

    public int getAge() {
      return this.age;
    }

    public void setAge(int age) {
      this.age = age;
    }

    public String getPhone() {
      return this.phone;
    }

    public void setPhone(String phone) {
      this.phone = phone;
    }

    public String getEmail() {
      return this.email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    // 提供一个空参的构造器
    public Customer() {}

    // 提供一个给所有属性赋值的构造器
    public Customer(String name, int age, char gender, String phone, String email) {
      this.name = name;
      this.age = age;
      this.gender = gender;
      this.phone = phone;
      this.email = email;
    }
  }
```

> 要点：
- 1. 如果我们要使用的类不处于当前的包下 那么就要使用 import 显式导入该类
<!-- 
  import src.cmu.bean.Customer;
  落脚点是类名
 -->

- 2. *java中数组元素的删除*
- 不能将指定位置的数据设置为null 因为数组都是有序的 连续的空间 中间不能空着(尾部元素可以直接置换成null)

- 所以在java中当删除数组的元素的时候 都是用后面一个将前面一个元素覆盖掉 然后把最后一个元素设置为null

```java 
// total标识着这个数组中已保存客户的总数
for(int i=index; i<total-1; i++) {
  customers[i] = customers[i+1];
}
```
- 比如:
- 长度为10的数组 里面只存放了3个客户 那么total的值就为3

- 思路：
- 我们既然要删除数组中指定位置的数据 
    arr = [1, 2, 3, 4, 5]
- 我们要删除索引为2的数据 那么跟索引为0 1位置的数据就没有关系吧

- 所以循环中 i的初始化值为index

- 那么循环到什么时候结束？ total-1
  total=5 - > -1 为4

- 当index为2的时候 就是 i=2; i<4; i++
- 整个循环执行2次 数组的最后一个元素没有在循环的次数里
  customers[i] = customers[i+1];

- 但是正好我们要将i的下一个元素赋值给前一个 
- 如果循环条件为i<total的话 customers[i+1]就越界了


**扩展:**
- 现阶段我们对数组增删改查的时候 都是我们亲自的一点点去操作这个数组 尤其想删除的时候还得走一些逻辑

- 后面我们我们在学习集合的时候会使用 ArrayList 代替数组 因为它里面都封装好了 我们可以调用现成的方法 实现增删改查就可以了
<!-- 
  js的Array么？
 -->

- 现阶段用数组的时候还有一个不好的地方 比如我们创建了一个长度为10的数组 当我们想添加第11个客户的时候就添加失败了
<!-- 
  数组的话确实有一个长度 一旦数组初始化完成后 就不能修改了
  但是我们想完成不停的往里面追加 不让它满了 但也不能让数组在初始化的时候创建的长度特别的长 
  所以我们也想当这种情况出现的时候 可以对数组进行扩容 扩容的事儿ArrayList也有体现
 -->

- 开发的时候 我们也是使用ArrayList替换数组


> CustomerList类
- 该类主要负责对数组客户的增删改查等操作
```java 
  package src.cmu.service;
  import src.cmu.bean.Customer;

  // 里面造一个数组 对Customer进行 增 删 改 查 操作的类
  public class CustomerList {
    
    // 属性
    // 用来保存客户对象的数组
    // 这里相当于定义了一个数组类型的变量 我们还需要对它进行数组化
    private Customer[] customers;

    // 记录已保存客户对象的数量
    private int total = 0;

    /**
    * @param totalCustomer
    * 指定customers数组的长度
    * 
    * 用途: 构造器 用来初始化customers数组
    */
    public CustomerList(int totalCustomer) {
      customers = new Customer[totalCustomer];
    }

    /**
    * 
    * @param customer
    * 指定要添加的客户对象
    * 用途: 将指定的客户添加到数组中
    * 
    * 添加成功返回true 添加失败返回false 
    * - 数组满了就失败了
    */
    public boolean addCustomer(Customer customer) {
      // total 是已保存客户的数量
      if(total >= customers.length) {
        return false;
      }

      // 添加客户到数组中 total++ 保证每次存放客户的时候指针的位置是对的
      customers[total] = customer;
      total++;
      return true;
    }



    /**
    * 修改指定索引位置上客户的信息
    * @param index
    * @param cust
    * @return 修改成功true false修改失败
    * 
    * 修改失败的原因： 跟index有关 
    * 比如我们数组里面存放了3个客户 那索引值的有效范围就是0-2 其它位置都是null不能修改
    * total属性是已保存客户的数量 保存了3个客户 index 只能是0-2 所以index不能>=total
    */
    public boolean replaceCustomer(int index, Customer cust) {
      if(index < 0 || index >= total) {
        return false;
      }

      // 把我们customers数组上 index位置的客户 改成新的
      customers[index] = cust;
      return true;
    }

    // 删除指定位置的客户
    public boolean deleteCustomer(int index) {
      if(index < 0 || index >= total) {
        return false;
      }

      // 错误的 - 数组是有序的 不能直接将这个位置的数据置为null 应该是后面的将前面的覆盖掉
      // customers[index] = null;

      /*
      数组删除元素的逻辑
      我们是从index的位置删除 
      我们要将index位置的下一个元素 赋值给 index位置上的元素
      所以i要从index的位置开始 因为index前面的元素不用动呀

      到那停呢？ 到total停? 但是我们要拿i+1位置的元素 如果是<total停
      i+1的时候就会越界 所以 <total-1

      比如 arr = [1, 2, 3] 我们的index为1
      i<total-1 说明i<2 循环一次
      也就是说整个循环到数组最后一位的前一位停止 但是i+1的位置还是有的
      */

      for(int i=index; i<total-1; i++) {
        customers[i] = customers[i+1];
      }

      // 客户数组的最后一个有数据的元素需要置空
      customers[total - 1] = null;
      // customers[--total] = null;

      // 注意
      // 往数组中添加客户的时候我们++ 删除客户的时候同样我们也要--
      total--;
      return true;
    }

    // 获取所有的客户信息
    // 注意我们不能直接return customers 因为有的位置可能是null的
    // 我们想输出的信息是客户信息 如果我们直接返回customers 那这个数组中保存的会是[1, 2, 3, null, null]
    // 所以我们要创建一个新的数组 将客户信息保存到新的数组中
    public Customer[] getAllCustomers() {
      Customer[] custs = new Customer[total];
      for(int i=0; i<custs.length; i++) {

        // 这里面赋的是地址值 地址值也好当customers做了修改操作之后 我们返回的也是修改后的对象
        custs[i] = customers[i];
      }

      return custs;
    }


    // 获取指定索引位置上的客户
    public Customer getCustomer(int index) {
      if(index < 0 || index >= total) {
        return null;
      }

      return customers[index];
    }

    // 获取已存储客户的数量
    public int getTotal() {
      return total;
    }
  }

```


> CustomerView类
- 部分1：
- 界面的绘制：
```java 
  package src.cmu.ui;

  import src.cmu.service.CustomerList;
  import src.cmu.util.CMUtility;

  // 该类负责界面 与 和用户交互的类
  public class CustomerView {
    
    // 相当于创建了一个customerList对象 对象中有customers客户数组的属性和方法
    // 我们给这个customerList对象中的数组长度指定了值
    private CustomerList customerList = new CustomerList(10);

    // 显示主界面的方法
    private void enterMainMenu() {
      // 呈现界面
      boolean isFlag = true;
      do {
        System.out.println("\n-----------------客户信息管理软件-----------------\n");
        System.out.println("                   1 添 加 客 户");
        System.out.println("                   2 修 改 客 户");
        System.out.println("                   3 删 除 客 户");
        System.out.println("                   4 客 户 列 表");
        System.out.println("                   5 退       出\n");
        System.out.print("                   请选择(1-5)：");

        // 从键盘上获取用户输入的值
        char menu = CMUtility.readMenuSelection();

        // char型要加'''
        switch(menu) {
          case '1' :
            addNewCustomer();
            break;
          case '2' :
            modifyCustomer();
            break;
          case '3' :
          deleteCustomer();
            break;
          case '4' :
            listAllCustomers();
            break;
          case '5' :
            System.out.println("确认是否退出(Y/N)");
            char isExit = CMUtility.readConfirmSelection();

            // 基本数据类型不能. 之前有个equals方法 但是 char型是基本数据类型 不能点也就是没有方法
            // 它只能 == 判断两个的ASCII码的值是否相等
            if(isExit == 'Y') {
              // 在某一个时刻我们将isFlag改为false停止循环
              isFlag = false;
            }
            break;
        }
      } while(isFlag);
    }


    // 添加客户的操作
    private void addNewCustomer() {
      System.out.println("添加客户");
    }

    // 修改客户的操作
    private void modifyCustomer() {
      System.out.println("修改客户");
    }

    // 删除客户的操作
    private void deleteCustomer() {
      System.out.println("删除客户");
    }

    // 显示客户列表的操作
    private void listAllCustomers() {
      System.out.println("显示客户列表");
    }


    // 程序要想执行都是从main方法中进入
    public static void main(String[] args) {
      // main方法中要想调用当前类的方法 那么就要在这里面创建当前类的对象
      CustomerView view = new CustomerView();
      view.enterMainMenu();
    }
  }

```

- 部分2
- 完成 CustomerView类 中的各个方法

> 显示客户列表的操作
  private void listAllCustomers() {
    System.out.println("显示客户列表");
  }

```java 
  private void listAllCustomers() {

    // 拼接 界面 结构
    System.out.println("---------------------------客户列表---------------------------");

    // 如果没有保存客户数据 展示 ”没有客户数据“ 的样式
    // 根据 CustomerList类中的 getTotal 方法 获取已保存的用户数据
    int total = customerList.getTotal();
    if(total == 0) {
      System.out.println("没有客户记录");
    } else {
      // 进入到这里代表找到客户记录
      System.out.println("编号\t姓名\t性别\t年龄\t电话\t邮箱");

      // 展示所有客户的记录
      // 调用getAllCustomers方法得到的是一个保存客户记录的数组
      Customer[] custs = customerList.getAllCustomers();
      for(int i=0; i<custs.length; i++) {
        // 拼接客户信息
        // 注意 客户信息中的编号字段不属于 Customer类中的属性 就是依次往下排的
        // (i+1) + '\t' 不能这么写 这么写就成加法运算了 因为单引号是char型
        System.out.println((i+1) + "\t" + custs[i].getName() + "\t" + custs[i].getGender() + "\t" + custs[i].getAge() + "\t" + custs[i].getPhone() + "\t" + custs[i].getEmail());
      }
    }

    System.out.println("---------------------------客户列表完成---------------------------");
  }
```


> 添加客户的操作
  private void addNewCustomer() {
    System.out.println("添加客户");
  }

```java 
  private void addNewCustomer() {
    System.out.println("---------------------添加客户---------------------");
    System.out.print("姓名: ");

    // 从键盘获得结果
    System.out.print("姓名：");
		String name = CMUtility.readString(4);

		System.out.print("性别：");
		char gender = CMUtility.readChar();

		System.out.print("年龄：");
		int age = CMUtility.readInt();

		System.out.print("电话：");
		String phone = CMUtility.readString(15);

		System.out.print("邮箱：");
		String email = CMUtility.readString(15);

    // 我们将信息获取到后 我们要存数组中 将上述的变量封装到一个对象当中
    Customer customer = new Customer(name, age, gender, phone, email);

    // 调用customerList的添加用户的方法 将用户添加到数组中
    // 这个方法会返回返回值 true false用来判断添加客户是否成功
    boolean isSuccess = customerList.addCustomer(customer);
    if(isSuccess) {
      System.out.println("添加完成");
    } else {
      System.out.println("添加失败");
    }
  }
```


> 修改客户的操作
  private void modifyCustomer() {
    System.out.println("修改客户");
  }

```java 
  private void addNewCustomer() {
    System.out.println("---------------------添加客户---------------------");
    System.out.print("姓名: ");

    // 从键盘获得结果
    System.out.print("姓名：");
		String name = CMUtility.readString(4);

		System.out.print("性别：");
		char gender = CMUtility.readChar();

		System.out.print("年龄：");
		int age = CMUtility.readInt();

		System.out.print("电话：");
		String phone = CMUtility.readString(15);

		System.out.print("邮箱：");
		String email = CMUtility.readString(15);

    // 我们将信息获取到后 我们要存数组中 将上述的变量封装到一个对象当中
    Customer customer = new Customer(name, age, gender, phone, email);

    // 调用customerList的添加用户的方法 将用户添加到数组中
    // 这个方法会返回返回值 true false用来判断添加客户是否成功
    boolean isSuccess = customerList.addCustomer(customer);
    if(isSuccess) {
      System.out.println("添加完成");
    } else {
      System.out.println("添加失败");
    }
  }

  // 修改客户的操作
  private void modifyCustomer() {
    System.out.println("---------------------修改客户---------------------");
    // 逻辑:
    /*
    当我们输入的不是 正常范围内的数字的话 请选择待修改客户编号的逻辑会反复执行
    知道我们输入的是正确的数字才可以
    */

    Customer cust;
    int num;
    for(;;) {
      System.out.print("请选择待修改客户编号(-1退出)：");
      num = CMUtility.readInt();
      if(num == -1) {
        return;
      }

      // 当用户输入的是-1我们退出当前方法 当用户输入不是合理范围内的索引的时候 我们也要进行判断
      // 方式1 我们可以判断下 用户输入的数字是否是 total 范围内的
      // 方式2 我们可以利用 customerList.getCustomer() 这个方法 该方法是根据index去数组中找对应位置的客户 如果没找到它会返回null 我们可以判断结构是否为null 从而判断用户输入的是否合理

      // 这里要注意的是 用户输入的是编号从1开始的 我们的索引是从0开始了 我们要-1
      cust = customerList.getCustomer(num-1);
      if(cust == null) {
        System.out.println("无法找到指定客户！");
      } else {
        // 找到了相应编号的客户 接下来也可以在else里面写修改客户的逻辑 但是逻辑中可能还需要用的for循环 整个for就会变的很复杂 这里我们写break终止循环
        break;
      }
    }

    // 上面break后 代码就会结束循环跑到这里 跑到这里就意味着找到了客户 我们在这里修改客户信息
    System.out.print("姓名(" + cust.getName() + ")：");
    // 从键盘上获取用户输入想改的信息
    String name = CMUtility.readString(4, cust.getName());

    System.out.print("性别(" + cust.getGender() + ")：");
		char gender = CMUtility.readChar(cust.getGender());

		System.out.print("年龄(" + cust.getAge() + ")：");
		int age = CMUtility.readInt(cust.getAge());

		System.out.print("电话(" + cust.getPhone() + ")：");
		String phone = CMUtility.readString(15, cust.getPhone());

		System.out.print("邮箱(" + cust.getEmail() + ")：");
		String email = CMUtility.readString(15, cust.getEmail());

    // 收集到数据后 我们要拿到新数据装到一个新的对象中
    Customer newCust = new Customer(name, age, gender, phone, email);

    // 调用customerList.replaceCustomer 方法 修改指定索引上的客户
    boolean isReplace =  customerList.replaceCustomer((num-1), newCust);
    if(isReplace) {
      System.out.println("---------------------修改完成---------------------");
		} else {
			System.out.println("----------无法找到指定客户,修改失败--------------");
		}
  }
```


> 删除客户的操作
  private void deleteCustomer() {
    System.out.println("删除客户");
  }

```java 
  private void deleteCustomer() {
    System.out.println("---------------------删除客户---------------------");

    // 
    int num = 0;
		Customer cust = null;
		for (;;) {
			System.out.print("请选择待删除客户编号(-1退出)：");
			num = CMUtility.readInt();
			if (num == -1) {
				return;
			}

			cust = customerList.getCustomer(num - 1);
			if (cust == null) {
				System.out.println("无法找到指定客户！");
			} else {
        break;
      }
		}  

    // 走到这里代码找到该客户了 接下来我们要进行删除的逻辑
    System.out.print("确认是否删除(Y/N)：");
		char isDelete = CMUtility.readConfirmSelection();
		if (isDelete == 'N')
      // 选择n是退出该方法
			return;

		boolean deleteSuccess = customerList.deleteCustomer(num - 1);
		if (deleteSuccess) {
			System.out
					.println("---------------------删除完成---------------------");
		} else {
			System.out.println("----------无法找到指定客户,删除失败--------------");
		}
  }
```

> 项目2中的总结
- 我们项目的核心就写了三个类 每一个类负责相关的业务
- 比如
- Customer类 提供了一个客户的基本属性和对应的get set方法(JavaBean)
- CustomerList类 提供了客户的增删改查的

- 我们都是各种类互相配合 互相调用

- 整个项目就是在内存层面对Customer这个对象进行增删改查
- 本质就是一个数组 在数组中我们进行了增删改查的操作 将对数组的这些操作封装到了一个类中CustomerList

- 数组中存放的都是Customer类的对象  
- 显示菜单 和 用户的交互都是在 CustomerView 类中

----------------------------

### extends 继承性 
- public class 子类 extends 基类 { }
- 当我们使用 extends关键字 继承了基类(父类)后 基类中定义的属性 和 方法 每一个子类中都有 都可以进行调用和修改
<!-- 
  我们也可以理解为 我们将n个类中的共同部分 抽出来放到一个基类中
  然后n个类我们可以继承基类(父类)
 -->

- 继承性的优势
- 1. 减少了代码的冗余 提供了代码的复用性
- 2. 便于功能的扩展(把子类都想扩展的功能 可以定义在父类中)
- 3. 为了之后的*多态性的使用 提供了前提*


> 继承性的格式 extends
- class A extends B { }
- A: 子类, 派生类(subClass)
- B: 父类, 超类, 基类(supperClass)

- 体现：
- 一旦子类继承了父类 子类就获取了父类中声明的所有的结构(主要说的是属性和方法 包括private权限的)

- 父类中声明的private的属性或方法 子类继承父类以后 也继承了private权限修饰的属性和方法 只是由于封装性的影响 *使得子类不可以直接调用父类的private结构*

```java 
  // 父类
  public class Person {
    private int age;    // 这是权限 private

    public Person() {}
    public Person(String name, int age) {
      this.age = age;
    }

    public int getAge() {
      return this.age;
    }

    public void setAge(int age) {
      this.age = age;
    }
  }


  // 子类
  - 上面父类中的age属性设置了权限 private 
  - 当子类 extends 父类之后 其实也继承了 age 属性 只是由于封装性的影响 我们不能直接 调用

  - p1.age = 1;   这样是不行的

  - 但是父类中可以提供 get set 方法 因为方法的权限是public 所以我们可以通过这些方法 来调用age 用来读取和设置
  - p1.getAge
  - p1.setAge

  ------

  - 方法也是一样 假如父类中的方法的权限被设置为了private
  - 当子类 extends 父类后 子类也会有这个方法 只是由于封装性的原因不能直接调用但是可以这样实验下

  // 比如 父类中对 sleep 方法设置了权限 private
  private void sleep() {}

  // 我们可以在 public 的方法中调用 sleep
  public void showInfo() {
    sleep()
  }

  - 然后在子类中通过实例对象调用 showInfo 方法 假如能输出sleep中的逻辑就说明我们继承到了 sleep 方法 事实证明也是可以的
```

- 封装性想解决的是: *结构可见性的问题* 
- 继承性想解决的是: *能否拿到父类中的结构* 
- 但是继承后的结构能不能调用还是要看封装性 不冲突

- 子类继承父类以后 还可以声明自己特有的属性和方法 实现功能的拓展
```java  
  // 父类
  String name;
  int age;

  // 子类 继承父类后 
  // 还可以声明自己的属性 major
  String name;     -- 继承来的
  int age;         -- 继承来的
  String major;

  // 子类的构造器中 因为继承了父类的name age 还有自己的major 构造器中的属性要写全
  public Student(String name, int age, String major) {
    this.name = name;
    this.age = age;
    this.major = major;
  }
```

- 由于子类可以扩展自己的属性和方法 从功能性来讲子类要比父类强很多
<!-- 
  extends的英文释义： 延展 扩展
 -->


> 总结一波:
- 1. 继承后 属性问题:
- 当子类继承父类后 父类中声明的结构 子类也能看到 但是由于封装性的影响 父类中private的结构 我们在子类中是不能直接调用的

- 2. 继承后 子类带参构造器的问题
  - 2.1 父类中 *没有private的属性的情况下* 在子类中我们能拿到父类中的属性 那么就可以在构造器中直接使用这些属性进行属性的初始化操作
  ```java
  // 父类
  public class Person {
    String name;
    int age;
  }

  // 子类
  public class Son {
    // 扩展自己的属性
    boolean sex;

    // 带参构造器的写法1:
    public Son(String name, int age, boolean sex) {
      this.name = name;
      this.age = age;
      this.sex = sex;
    }
  }
  ```

  - 2.2 父类中 有*private的属性的情况下* 在子类中我们就不能通过如下的方式对子类对象进行初始化了
  ```java
  // 子类
  public class Son {
    // 扩展自己的属性
    boolean sex;

    // 带参构造器的写法1:
    public Son(String name, int age, boolean sex) {
      this.name = name;
      this.age = age;   -- 比如 父类中 age是private 那么这里就不行了
      this.sex = sex;
    }
  }
  ```

  - 我们可以参数这种方式 调用父类的构造器 将参数传递进去
  ```java
  public Son(String name, boolean sex) {
    super(name, age);
    this.sex = sex;
  }
  ```


> java中关于继承性的规定
- 1. 一个类可以被多个子类继承
<!-- 
          父类

  子类  子类  子类  子类
 -->

- 2. 一个子类只能有一个父类(类是单继承，java中的接口是可以多继承的 c++也是可以多继承的)

- 3. 子父类是相对的概念(多层继承)
- 我们还可以让直接父类再去继承一个类 这样子类能有更多的功能扩展
<!-- 
          人类
        ↙   ↓   ↘
    学生    白领    军人
     ↓
   大学生


   java中可以多层继承 
   人类 是 学生的父类   学生 是 人类的子类
   但对于大学生类来讲 学生是它的父类

   人类     父类  - 间接父类(以上都是间接父类)

   学生     父类  - 直接父类

   大学生   子类  - 对于大学生来讲 (该类拥有所有父类的属性和方法)
 -->

- 4. 子类直接继承的父类 称为 直接父类 间接继承的父类称为 间接父类
- 5. 子类继承父类以后 就获取了直接父类以及所有间接父类中声明的属性和方法

- 6. 如果我们没有显式的声明一个类的父类的话 则此类继承与 java.lang.Object 类(它是所有类的父类)

- 7. 所有的java类(除了java.lang.Object类以外) 都直接或间接的继承于 java.lang.Object 类 意味着所有的java类具有java.lang.Object声明的功能
<!-- 
  js的原型链的尽头么？
 -->


> 如果判断是否该继承某个类
- ( ... ) is a ( ... )
- 我们使用上面的格式来套用 

- 比如 Student is a Person 如果是 那么我们就可以继承
- 比如 Dog is a Person 这种情况我们就不应该继承


> 练习
- 1. 定义一个 ManKind 类 包括
  - 成员变量 int sex 和 int salary
  - 方法：
  - void manOrWoman 根据sex的值显示 man 或者 woman
  - void employeed  根据salary显示 nojob 或者 job

- 2. 定义Kids类继承Mankind
  - 成员变量 int yearsOld
  - 方法
  - printAge打印yearsOld的值

- 3. 定义类KidsTest 在类的main方法中实例化Kids的对象someKid 用该对象访问其父类的成员变量以及方法
```java 
  // ManKind类
  package src.com;
  public class ManKind {
    int sex;
    int salary;

    public ManKind() {}
    public ManKind(int sex, int salary) {
      this.sex = sex;
      this.salary = salary;
    }

    public void manOrWoman() {
      if(sex == 1) {
        System.out.println("我的性别是: man");
      } else {
        System.out.println("我的性别是: woman");
      }
    }

    public void employeed() {
      if(salary == 0) {
        System.out.println("我还没有工作");
      } else {
        System.out.println("我已经有工作了");
      }
    }
  }


  // Kids
  package src.com;
  public class Kids extends ManKind {
    int yearsOld;

    public Kids() {}
    public Kids(int yearsOld) {
      this.yearsOld = yearsOld;
    }
    public Kids(int sex, int salary, int yearsOld) {
      this.sex = sex;
      this.salary = salary;
      this.yearsOld = yearsOld;
    }

    public void printAge() {
      System.out.println("我今年: " + yearsOld + "岁了。");
    }
  }


  // KidsTest类
  package src.com;
  public class KidsTest {
    public static void main(String[] args) {
      
      Kids someKid = new Kids(1, 0, 18);
      someKid.printAge();
      someKid.manOrWoman();
      someKid.employeed();
    }
  }
```


> 总结:
- java中的面向对象风格
- 我们会定义一个一个的类 相当于我们定义了一个个的对象
<!-- 
  类中定义了 构造器用来对 对象进行初始化

  类中定义了 属性和方法 
    属性用来描述该对象
    方法是该对象提供的功能 可能是修改对象属性 可能是对外提供某些功能

    但都是用来操作该对象的
 -->

- 然后我们分别创建类的实例对象 通过实例对象互相调用对象的属性和方法 来完成逻辑
```js 
  - 相当于 js 中的这种模式
  let ManKid = {
    sex: 0,
    salary: 0,

    manOrWoman() {
      if(sex == 1) {
        console.log("我的性别是: man");
      } else {
        console.log("我的性别是: woman");
      }
    }
  }

  - 我们在其他的地方 或全局 或函数中通过 对象来调用这些属性和方法 
  - 不同于js的地方在于 java中定义对象是通过 class 类 定义的
```


> 练习2
- 根据下图实现类 在CylinderTest类中创建Cylinder类的对象 设置圆柱的底面半径和高 并输出圆柱的体积
<!-- 
    Circle类

    -radius: double

    Circle(): 构造器 将radius属性初始化为1
    +setRadius(double: radius): void
    +getRadius(): double
    +findArea():double 计算圆的面积


    Cylinder类

    Cylinder(): 构造器 将length属性初始化为1
    +setLength(double length): void
    +getLength(): double
    +findVolume(): double 计算圆柱体积
 -->

```java 
  // Circle类
  package src.com;
  public class Circle {
    private double radius;

    public Circle() {
      radius = 1.0;
    }

    public double getRadius() {
      return radius;
    }

    public void setRadius(double radius) {
      this.radius = radius;
    }

    public double findArea() {
      return Math.PI * radius * radius;
    }
  }


  // Cylinder类
  package src.com;
  // 圆柱类 继承 圆类
  public class Cylinder extends Circle {
    private double length;

    public Cylinder() {
      this.length = 1.0;
    }

    public double getLength() {
      return this.length;
    }

    public void setLength(double length) {
      this.length = length;
    }

    public double findVolume() {
      // 底面积 X h
      // 这里 * length 也行
      return findArea() * getLength();
    }
  }


  // 测试类
  package src.com;
  public class CylinderTest {
    public static void main(String[] args) {
      
      // 我们new的是子类
      Cylinder cy = new Cylinder();

      // 我们调用的是子类继承到父类的方法
      cy.setRadius(2.1);
      cy.setLength(2.6);

      double res = cy.findVolume();

      System.out.println(res);
    }
  }

```

----------------------------

### Debug调试
- 调试程序的两种方式:
- 1. 在程序中写输出语句 System.out.println
- 一遍走一边看 依次加输出语句慢慢调试

- 2. debug调试
  - 1. 设置断点 我们在程序的行编号那里点击 设置断点
  <!-- 
    断点相当于 我们在程序从上到下执行的过程当中设置的一个个关卡
    当我们加上断点之后 程序再次执行的时候就会在小关卡的地方停一下
   -->

  - 2. 然后我们在程序中 右键 选择 *Debug java*
    - 当我们首次运行的时候 一下就会到我们打断点的位置
    - 我们可以在左侧变量 - local 中看到 内存中加载了什么变量 值是多少

    - 点击 继续 是执行下一行语句
    - 点击 单步调试是进入该行语句的方法内部 然后继续点击 单步调试是在方法内部 执行下一行语句

----------------------------

### 方法的重写 (override / overwrite)
- 上面我们讲过方法的重载(overload)
<!-- 
  一个类中同方法名 不同参数列表的方法 就构成了重载
 -->

> 方法的*重写* (简单的理解就是覆盖父类中的*同名同参数*的方法)
- 定义:
- 在子类继承父类以后，在子类中可以根据需要对父类中继承来的方法进行改造 也称为方法的重置 覆盖

- 相当于在子类中把父类中的*同名同参数的方法*在子类中又重新的定义了一份

- 在程序执行时 子类的方法将覆盖父类的方法
- 重写以后 当创建子类对象以后 通过子类对象调用父类中的同名同参数的方法时 实际执行的是子类重写父类的方法

- 如果我们在子类中定义的方法不是同名同参的方法 那就不会构成重写


```java
  // 父类
  public class Person {
    String name;
    int age;

    public Person() {}
    public Person(String name, int age) {
      this.name = name;
      this.age = age;
    }

    public void eat() {
      System.out.println("吃饭");
    }

    public void walk(int distance) {
      System.out.println("今天我走了， " + distance + "公里");
    }
  }


  // 子类
  public class Student extends Person {

    String major;

    public Student() {}
    public Student(String name, int age, String major) {
      this.name = name;
      this.age = age;
      this.major = major;
    }

    public void study() {
      System.out.println("学习, 专业是: " + major);
    }

    // 我们对父类中的方法进行重写
    // 要求： 方法名和形参列表必须和父类的一样的 因为要覆盖么!!!!!!
    public void eat() {
      System.out.println("学生因为正在学习要吃有营养的食物");
    }
  }


  // 测试类
  public class PersonTest {
    public static void main(String[] args) {
      
      // 学生类调用的是重写后的eat方法
      Student s = new Student();
      s.eat();

      // 父类调用的是自己的eat方法
      Person p = new Person();
      p.eat();
    }
  }
```


> 面试题：区分方法的重载与重写
- 重写是子类对父类目标方法(*同名同参数*)的覆盖操作 在调用子类中的该方法的时候 调用的是新方法

- 重载是在一个类中允许有多个同名方法 区分它们的条件就是形参列表(个数, 类型, 顺序)


> 重写的方法的声明:
  权限修饰符 返回值类型 方法名(形参列表) {
    // 方法体
  }

<!-- 
  约定俗成：
  父类中的叫做被重写的方法
  子类中的叫做重写的方法
 -->


> 重写方法的细节要求：
> 条件
> 1. 子类重写的方法*必须*和父类被重写的方法具有相同的*方法名和参数列表*
<!-- 
  子类重写的方法 方法名 形参列表 == 父类被重写的方法的方法名 形参列表
  我就想覆盖你 所以方法名和形参列表一样
 -->


> 返回值要求
> 2. 子类重写的方法的返回值类型*不能大于*父类被重写的方法的返回值类型
- 子类重写的方法的返回值 <= 父类被重写的方法的返回值

- 1. 如果父类中的被重写的方法的返回值是 void
          那么子类中重写的方法只能是 void

- 2. 如果父类中的被重写的方法的返回值是 *对象类型 - a类型*
          那么子类重写的方法的返回值类型 可以是a类或a类的子类
    public Object info() { }  -- 父
    public String info() { }  -- 子

    子类的返回值类型是String的话也是可以的 
        因为String是Object的子类

    上面说的 a类 或 a类的子类 是针对于类来讲的 类属于引用数据类型 那我们知道方法的返回值除了引用数据类型之外 还可以是基本数据类型

- 3. 如果父类中的被重写的方法的返回值是 *基本数据类型*
        那么子类重写的方法的返回值类型 必须是相同的基本数据类型
      
    父类如果是 double
    子类必须是 double


> 访问权限要求
> 3. 子类重写的方法使用的访问权限*不能小于*父类被重写的方法的访问权限
- 子类重写的方法的权限修饰符 >= 父类被重写的方法的权限修饰符


**注意:**
- 子类不能重写父类中声明为private权限的方法
<!-- 
  父类中有一个方法它的权限比较小 已经是private了 那么子类就不能对这个方法进行重写
  重写的方法 我们调用的时候会是子类最新的方法
 -->


> 异常要求
> 4. 子类方法抛出的异常*不能大于*父类被重写方法的异常
- 子类抛出的异常类型 <= 父类抛出的异常类型

- 方法体前面还可以加上 异常的类型

    权限修饰符 返回值类型 方法名(形参列表) throws 异常类型 {
      // 方法体
    }

<!-- 
  子类重写的方法抛出的异常 <= 父类被重写的方法的抛出的异常
  具体放在异常处理的位置上再详解
 -->

**注意**
- 子类与父类中同名同参数的方法必须同时声明为非static的(即为重写)
- *也就是说只有非static的方法 才能被重写*

- 或者同时声明为static(不是重写)
- 因为static方法是属于类的 子类无法覆盖父类的方法

- 子类和父类中同名同参数的方法要么都声明为非static的(这时候才能考虑重写) 
- 要么都声明为static的(不用考虑重写 static的方法*一定不可以被重写的*)


> 智慧的体现:
- 在实际开发过程中 当我们想重写父类的方法的时候 直接去父类中复制方法声明的部分到子类中 进行重写就可以了

----------------------------

### 测试4种不同的权限修饰
- 上面我们说过4种权限修饰符的可见性 现在我们讲了继承 我们再看看 protected 权限的可见性

<!-- 
  修饰符      类内部    同一个包    不同包的子类    同一个工程

  private     yes

  缺省        yes        yes

  protected  yes        yes       yes

  public     yes        yes       yes         yes
 -->

- protected可以在不同包的子类下看到
<!-- 
  SubOrder.java 在A包中
  Order.java 在B包中

  public class SubOrder entends Order {

  }

  在A包中 使用 SubOrder类 继承 B包中的Order类
  这样就是不同包的子类下 

  那也就是说 我们需要在另外一个包里 继承Order类之后 protected 的对应的属性和方法才能够看见
  因为继承了Order类 所以Order内部的结构 SubOrder是都能够看见的


  // 报错的情况
  public class SubOrder {
  public void method() {
      // 不同包 读取 protected属性 看不见
      Order order = new Order();
      order.orderProtected = 2;   // 报错

      不同包下的普通类(非子类) 要使用Order类 不可以调用声明为private 缺省 protected 声明的属性 和 方法
    }
  }


  // 正确的情况
  public class SubOrder extends Order {
    public void method() {
      orderProtected = 2;

      在不同包的子类中 不能调用Order类中声明为private和缺省权限的属性和方法

    }
  }
  不同包下 我们继承 Order 这样 因为继承后 内部结构都能够看见 就不用再通过创建order对象调用 
  我们可以直接使用 orderProtected
 -->

- 实际开发中 我们使用protected的时候不多 用的多的还是private和public

----------------------------

### super关键字
- 现在有子父类的概念了 比如父类中定义了方法A 子类中将父类的方法A进行了重写了 也就是子类中的方法会覆盖父类中的方法
- 在执行的时候执行的是子类中重写后的方法, *那我们在子类中还能不能用下父类中被重写的方法?*
- 可以，这时候我们就*用super*来区分


> super关键字的使用
- 1. super理解为： - 父类的
- 2. super可以用来调用父类的： 属性 方法 构造器
<!-- 
  super和this相似 都可以调用属性 方法 构造器
  this.name
  super.name
 -->

```java 
// 父类
package src.com;
public class Person {
  String name;
  int age;

  int id = 1001;  // 身份证号

  public Person() {}
  public Person(String name) {
    this.name = name;
  }

  public Person(String name, int age) {
    this(name);
    this.age = age;
  }

  public void eat() {
    System.out.println("人，吃饭");
  }

  public void walk() {
    System.out.println("人，走路");
  }
}
```

```java 
// 子类
package src.com;
public class Student extends Person {

  String major;

  int id = 1002;  // 学号

  public Student() {}
  public Student(String major) {
    this.major = major;
  }

  public void study() {
    System.out.println("学习, 学习知识");
  }

  // 对父类中的方法的重写
  public void eat() {
    System.out.println("学生, 因为正在学习要吃有营养的食物");
  }
}
```

- 上面我们定义了两个类 父类Person 子类Student 
- 接下来我们在子类中定义了一个方法 show
```java 
  public void show() {
   
    System.out.println("name = " + this.name + ", age = " + this.age);
    System.out.println("name = " + super.name + ", age = " + super.age);
  }
```

- 比如我们在子类中重写父类中的方法 编辑器默认生成的模板是
```java
@Override
public void show() {
  // 这就是通过super调用父类中的指定方法 我们可以删除这行逻辑 写自己的逻辑
  super.show();
}
```

- 我们在show方法中 分别通过this和super调用属性 有什么样的区别？
- 上述的情况没有过多的区别 当我们继承了父类后 父类中定义的属性和方法在子类的堆空间中也有一份

- 但有一种情况就会产生冲突 *父类中的属性 和 子类中的属性 重名的时候*
- 比如我们在Person类中定义  id 代表 身份证号
- 然后我们在Student类中定义 id 代表 学号

- 那么在内存中会有两个id 因为属性来说 不会像方法那样存在重写覆盖的情况 *属性是不会覆盖的*

- 1. 当我们通过this或者什么都不写调用的时候 调用的会是子类中定义的id
- 2. 当我们通过 super.id 调用的时候 调用的会是父类中的id值

-  也就是说当我们遇到 父类和子类都有同一个属性的时候 我们要通过*super关键字来区别我们调用的是谁*


> 总结1: 
- 我们可以在子类的方法或构造中 通过 super.属性 或 super.方法 的形式 显式的调用父类中声明的属性和方法
- 通常情况下 都习惯省略 super.

<!-- 
  - this.name
  - 程序会先在当前类中找name属性 如果没有找到会去父类中找

  - super.name
  - 程序没有在本类中找name 直接回父类中找了
 -->


> 总结2: 
- 特殊情况 当子类和父类中定义了同名的属性的时候 我们要想在子类中调用父类中声明的属性 则必须显式的使用 super.属性 的方式 表明调用的是父类中声明的属性

- *通常我们在开发中子类中不会声明同名的属性*


> 总结3: 
- 当子类重写了父类中的方法后 我们想在子类中调用父类中被重写的方法时 则必须显式的使用 super.方法 的方式 表明调用的是父类中声明的方法

- 子类调用重写父类的方法 肯定是子类中的新方法
<!-- 
  父类定义 eat()
  子类重写 eat()

  子类在调用的时候 肯定是子类中重写后的eat()
  默认省略了this.eat()

  super.eat()
    这样我们调用的就是父类中被重写的方法

  对于没有重写的方法前面 this 还是 super 都没有太大的关系
  this的话先在本类中找该方法 没找到回父类找 (间接父类也会找 直到找到为止)
  super直接回父类中找
 -->

- 上面讲了 super关键字 如何调用属性和方法 下面说说super如果调用构造器


> super调用构造器  super()
- super代表的是父类的 那么通过super来调用的话 调用的也是父类的构造器(指定的构造器 我们通过形参列表一一对应来指定)

- 如下的代码里面会说 当父类的属性被声明为private的时候 我们怎么对private的属性进行初始化

```java
// Person类
public class Person {
  String name;
  int age;

  int id = 1001;  // 身份证号

  public Person() {}
  public Person(String name) {
    this.name = name;
  }

  public Person(String name, int age) {
    this(name);
    this.age = age;
  }

// Student类
public Student(String name, int age, String major) {

  // 因为父类中name age的权限不是private 所以我们这里可以初始化
  this.name = name;
  this.age = age;

      // 假如父类中的属性时private的情况下 我们可以在这里写setName
      // 但是我自己实验了一下 不行啊
      this.name = setName
      this.age = setAge

  - 还有一种更好的方式 
  - 我们在一个类中可以通过this() 调用本类中的其他构造器
  - 我们还可以通过super关键字来调用父类中的指定构造器 super()

  super(name, age);   // 调用父类中的构造器 传过去数据 进行初始化
  this.major = major;
}
```

- 1. 我们可以在子类的构造器中显式的使用 *super(形参列表)* 的方式 调用父类中声明的指定的构造器

- 2. super(形参列表) 的使用 必须声明在子类构造器的*首行*！
- 3. 我们在类的构造器中针对于 this(形参列表) super(形参列表) 只能两选一 *不能同时出现*

- 4. 在构造器首行没有显式的声明 this(形参列表) 或 super(形参列表) 那么*默认调用的是父类中空参的构造器* -- *系统默认会调用 super()*
<!-- 
  可能是为了继承过来父类中的结构？
 -->

```java 
  // 子类的构造器
  public Student(String major) {
    // super();   即使不写 系统也会默认加上
    this.major = major;
  }
```

- 即使我们上面子类的构造器中只写了 this.major = major; 因为我们是继承的原因 默认也会有一个 super() 那也就是意味着*父类中必须有一个空参构造器*

**注意:**
- 当有*继承关系*的时候 父类中*必须有一个空参构造器* 原因如上
- 因为子类构造器中上来就会调用 super() 调用父类的空参构造器

- 5. 在类的多个构造器中 至少有一个类的构造器中使用了 super(形参列表) 调用父类的构造器
<!-- 
  前面我们说了 当继承了父类的时候 父类中的结构 子类中也会有 
  就是因为默认调用了 super()
 -->

- this()  调用的是本类中的其它构造器
- super() 调用的是父类中的构造器

----------------------------

### 子类对象实例化过程
- 举例
- 我们造了一个Dog类 Dog还有父类 如下
<!-- 
  栈空间 
  ------  
  dog

             堆空间
             ------

             ______  -- Object类

             age;
             ______  -- Createure类

             name;
             food;
             ______  -- Animal类

             hostName;
             ______  -- Dog类

  Dog类上面还有 Animal类 Createure类 最上层是Objec类

  当我们 Dog dog = new Dog("小花", "小红") 的时候
  我们继承父类的时候 那么子类中就拥有了父类中的结构
 -->

> 子类对象实例化的全过程
- 1. 从结果上来看 (继承性)
  当子类继承父类以后 就获取了父类中声明的属性或方法
  创建子类的对象 在堆空间中 子类中就加载所有父类中声明的结构

- 2. 从过程上来看
  当我们通过子类的构造器创建了子类对象时 我们一定会直接或间接的调用其父类的构造器 进而调用父类的父类的构造器 直到调用了java.lang.Object类中的空参构造器为止

  正因为加载过所有的父类的结构 所以内存中才能看到父类中的结构 子类对象才可以考虑进行调用

- 虽然创建子类对象时 调用了父类的构造器 但是自始至终就创建了一个对象 即为new的对象

<!-- 

  ----------
     Object
  ----------

              ↖

  ----------    ----------    ----------    Creature
              →             ←
  ----------    ----------    ----------    

              ↖                    ↑

  ----------    ----------    ----------    Animal
              →
  ----------    ----------    ----------    

      ↑

  ----------    ----------    ----------    Dog
              ←             ←
  ----------    ----------    ----------  


  每一个小格就是一个类中的构造器  
  我们前面说过一个类中有n个构造器 最多有n-1个写this() 最后一个肯定是super()

  那也就是说 我们new Dog对象一定会直接或间接的 调用到 Animal构造器
  Animal也是同样的道理 直接或间接的调用到Creature类中的构造器

  Creature也一样 也会直接或间接的调用到Object的构造器

  虽然我们直接会间接的调用了父类中的构造器 super()
  那内存中 我们造了几个对象？ 我们只造了一个对象 这个对象就是我们new Dog的对象

  只是说我们调用父类的构造器 并不是new 所以不是造对象
 -->

- 父类中不定义构造器 子类在继承父类的时候不会报错

- 就是我们在通过构造器对属性初始化的时候 即使不写super() 默认也是有的 正因为我们默认调用了super() 内存中就加载了父类的结构(直至加载到Object为止) 我们才能在内存中看到父类的结构 从而才能调用

```java
  public Student(String name, int age) {
    this.name = name;
    this.age = age;
  }

  - 上面我们没有写super 其实默认也是有的
    super();
    this.name = name;
    this.age = age;

  - 不管是子类会默认调用 super()
    我们所谓的父类Person内部的构造器里也会调用super() 因为它继承于Object
```


> 总结
- 无论通过哪个构造器创建的子类对象 *首先都会初始化父类* 目的就是当子类继承父类以后 (这就是构造器中首行要写super的原因)

- 继承父类中所有的属性和方法 因为子类有必要知道父类如何为对象进行初始化
- 所以优先加载父类 一直加载到Object


> 对一个练习的总结
- 1. 当我们创建了一个子类 继承父类 那么该类中就必须写构造器
  - 要么父类中定义一个空参的构造器
  - 要么子类中的构造器中调用父类指定的构造器

```java 
  // 子类构造器
  public CheckAccount(int id, double balance, double annua, double overdraft) {

    // 这里调用父类中指定的构造器
    super(id, balance, annua);

        // 这里注意 我们传入的是 父类中定义好的属性 id, balance, annua 并没有传递 子类中的属性
  }
```

- 2. 当父类中的属性时 private 的时候子类想去调用父类中的属性 通过super调用是不对的 因为*super解决的是同名属性在子父类中冲突的问题* 并不能解决封装性的问题 所以还是需要使用get set方法


- 3. 当我们在子类中想要完成取钱的操作的时候 注意当前的取钱的方法是重写父类的取钱的方法

```java
  public void withdraw(double amount) {

    // 如果余额大于要取的钱
    if(getBalance() >= amount) {
      // 错误方式1
      getBalance() -= amount;
          - 原因 -= 相当于 a = a-1 是一个赋值的过程 get只能用来读取不能设置
          - 使用getBalance方法的原因就是父类中 balance 的权限是private所以提供了get set方法

      // 正确的方式 通过set方法来设置余额 完成取钱操作
      setBanlance(getBalance() - amount);

      // 正确的方式
      super.withdraw(amount)
        - 使用super关键字调用父类中的取钱逻辑
        - 问题:
          - 这样修改的不是父类中的余额么
          - 还是说我们就造了一个对象 new的时候 构造器中调用了super 这样父类中的结构 子类中都有 相当于有两个方法都是对这个子类开放的 就看我们使用哪个 默认是使用重写后的 被重写的也有只是需要用super来调用
    }
  }
```

----------------------------

### 多态性
- 多态性最重要的应用就是 代码的复用性
- 我们可以在形参中传入子类的对象

- 多态性 是面向对象中最重要的概念 下面我们先看一个例子

- 什么是多态性：
- 多态性又称对象的多态性

    Person p = ... new (这个部分要是一个子类对象)
    - 我们new了一个子类的对象 赋值给了声明为父类的变量

- 上面的代码中右侧的部分的对象体现了多种形态 叫做对象的多态性
- 也就是*子类的对象赋给父类的引用* 或者 *父类的引用指向子类的对象*


> Person父类
- 定义了属性 name age 方法 eat walk

```java 
public class Person {
  String name;
  int age;

  public void eat() {
    System.out.println("人吃饭");
  }

  public void walk() {
    System.out.println("人走路");
  }
}
```

> Man子类
- 继承了Person父类 同时拓展了属性isSmoking 方法earnMoney
- 重写了Person父类 中的eat walk方法
```java 
public class Man extends Person {
  
  // 子类中特有的属性和方法
  boolean isSmoking;

  public void earnMoney() {
    System.out.println("男人负责赚钱养家");
  }


  // 对父类中方法的重写
  public void ear() {
    System.out.println("男人多吃肉 长肌肉");
  }

  public void walk() {
    System.out.println("男人要霸气的走路");
  }
}
```


> 测试类 Demo
- 之前我们要是想调用另一个类中的结构 我们需要在main方法中实例化该对象 通过实例对象.的方式 获取实例对象的属性和方法

- 简单的说就是造个类 造个对象 造个方法
  - 创建个父类对象
    Person p1 = new Person();
    p1.eat();

  - 创建个子类对象 继承父类 就能得到父类中的结构
    Man man = new Man();
    man.age = 25;
    man.earnMoney();

- 在我们学了继承后 当子类继承了Person类 子类还可以重写父类中的同名同参数的方法
- 我们注意下 之前我们实例化对象的时候 左边声明的什么对象类型 右边就new什么类型的对象
    Person p1 = new Person();

- 我们来看看 多态性的体现:
    Person p2 = new Man();

  - 解析：
  - 我们左边声明了一个Person类型
  - 我们右边却 new Man() *new的是父类的子类*
<!-- 
  这也是对象的多态性 
  我们左面声明了一个变量 当右侧的值是一个对象的时候 
  
  这个对象体现了多种形态
  上面左边变量类型是Person 右侧是一个Man 
  不仅可以是Man 还可以是Woman 甚至只要是Person的子类 
  我都可以去new 右侧是一个对象 这个对象是多种形态的
-->


> 多态性的体现: 
- 上面概括一句话就是：
- *父类的引用* 指向 *父类的子类的对象*
- 父类的引用就是p2 
- 子类的对象 子类的对象就是new Man


> 多态性中的虚拟方法调用
- 上面我们创建了p2 但是p2是new Man产生的 
- 那么我们调用里面的eat方法的时候 是Person类中被重写的方法 还是 Man类中重写后的方法呢？

  - 答案：
  - p2.eat(); 
  - Man子类重写后的方法


> 虚拟方法调用概念:
- 当通过父类引用调用子父类同名同参数的方法时 实际执行的是子类重写父类的方法

- 思考:
- 那能不能通过p2去调用 Man 中特有的方法？
```java 
  // earnMoney()方法为子类中特有的方法
  p2.earnMoney(); 
    // Cannot resolve method 'earnMoney' in 'Person'
```

- 上面说该方法在Person中未定义 也就是说我们*只能通过父类引用p2调用Person中声明过的方法* 上面是编译过程中报错 
- 也就是说编译的时候 看的是左边 Person p2 声明的是什么类型 我们才能.出什么结构
<!-- 
  (比如我们p2.eat() 点一下eat方法会跳到父类中 因为编译的时候看的是声明的类型 也就是Person类中) 
-->

**注意:**
- 多态性不适用于属性 对于属性来说 编译和运行都看左边
  
- 我们可以调用Person中定义好的方法 eat walk 但是不能调用子类特有的earnMoney() 

- p2.eat()
- 但是执行(运行)的时候 我们发现执行的是子类中重写的方法

- *在有了多态以后 我们相当于将程序分为两个状态 一个是编译状态 和 运行时状态*

```java
public class Demo {
  public static void main(String[] args) {

    Person p1 = new Person();
    p1.eat();

    Man man = new Man();
    man.age = 25;
    man.earnMoney();

    System.out.println("***********多态性***********");

    // new的是Person类的子类
    Person p2 = new Man();
    p2.eat();     // 执行的是子类重写过的方法
    p2.walk();
  }
}
```


> 对象的多态性: 
- 可以理解为一个事物的多种形态

- 定义: 
- 父类的引用指向子类的对象(或者说子类的对象赋值给父类的引用)

- 使用:
- 虚拟方法调用 
- 有了对象的多态性以后 我们在编译期 只能调用父类中声明的方法 但在运行期 我们实际执行的是子类重写父类的方法
<!-- 
  多态性跟属性没多大关系？
 -->

- 总结：
- 调用方法时：
- 编译看左边 
  (我们看看左边是什么类型的 编译的时候我们就能调用这个类型中的结构 没有的就调不了 看父类)
  <!-- 
    因为左边是父类的类型引用 编译器只能看父类中声明的结构 只能调用父类中的声明的结构
   -->

- 运行看右边 (调用的就是重写后的方法)

**多态性的使用前提:**
- 1. 要有类的继承关系 没有继承就没有多态性
- 2. 要有方法的重写(要不就没有必要new子类了 直接new父类就好了)

----------------------------

### 多态性的使用举例
- 我们前面知道了继承性 和 封装性 它们也很容易理解一个是扩展功能 一个是使用权限修饰符还来控制结构可见性的大小

- 但是多态性就一个 Person p = new Man() 
- 这怎么理解 又为什么这样设计呢？ 但其实多态性应用的非常广 没有多态性后续的抽象类和接口都没有意义了

- 我们来举一个多态性的例子 来看看多态性的应用
- 下面的例子中 我们分别定义了 

  - Animal父类:
    - 提供了两个方法

  - Dog Cat子类
    - 重写了父类的两个方法

  - AnimalTest测试类
    - 我们定义了一个方法用于输出对象中的eat shout方法

```java 
// Animal类中还定义了这个方法 形参是 Animal animal 父类
public void func(Animal animal) {
  animal.eat();
  animal.shout();
}

// 我们在测试类中调用的时候传入的是子类的对象
public static void main(String[] args) {
  Animal animal = new Dog();
  animal.func(new Dog());     // 结果是 子类中重写后的方法
}
```

- 注意：
- 上面在定义func方法的形参 我们定义的是父类Animal animal
- 但是调用方法传递的实参却是 new Dog 传入的是 Animal的子类

- 我们声明的是Animal形参 那么编译的时候会看形参的类型 我们能调用的结构必须是该类型中的结构(必须是父类中声明过的结构)

- 但是执行的时候 执行的是子类中重写后的方法

- 上面就是就是多态性的一个应用*我们在定义形参的时候传入的是父类 调用方法的实参是子类* 这样这个方法就能输出各个子类中的重写方法


**自己的总结：**
- 那是不是说 我们为了通过一个形参(父类类型的形参) 去执行不同子类中重写父类的方法
- 再说一边多态性要有: 1. 继承关系;  2. 重写父类后的方法


- 代码部分
```java 
public class AnimalTest {
  
  public static void main(String[] args) {
    
    // 我们要在这里调用当前类的属性 和 方法 就要在这里创建 当前类的对象
    AnimalTest animalTest = new AnimalTest();

    // 我们要在这里传一个实例
    animalTest.func(new Dog());   // 执行的结果是狗特有的方法
    animalTest.func(new Cat());
  }

  public void func(Animal animal) {
    animal.eat();
    animal.shout();
  }
}


// 父类
class Animal {

  // 方法
  public void eat() {
    System.out.println("动物进食");
  }

  public void shout() {
    System.out.println("动物叫");
  }
}


// 子类
class Dog extends Animal {

  // 对父类中的方法进行重写
  public void eat() {
    System.out.println("狗吃狗粮");
  }

  public void shout() {
    System.out.println("汪汪汪");
  }
}

// 子类
class Cat extends Animal {

  // 对父类中的方法进行重写
  public void eat() {
    System.out.println("猫吃鱼");
  }

  public void shout() {
    System.out.println("喵喵喵");
  }
}
```

> 思考:
- 假如上面 AnimalTest类 func方法没有多态性的话的 是不是说 
- 我们形参定义的是Animal 
- 那么我们传入的也必须是一个Animal 只能new Animal不能new别的 因为没有多态性

- 那就意味着 如果我们想调用其它子类中的方法 那就要在AnimalTest类中再定义两个形参为 Dog dog 和 Cat cat 的方法 
- 如果没有多态性 我们声明什么类型 只能new这个类型的对象
<!-- 
  public void func(Dog dog) { ... }
  public void func(Cat cat) { ... }
 -->

- 如果没有多态性的话 就意味着我们要造很多重载的方法


> 再次尝试总结:
- 首先多态性的前提是 继承 和 重写方法 主要是针对 重写父类中的方法而言
- 我们在前面讲了方法的重载 在一个类中可以声明同名方法 但要参数不一样 这样的方式解决了 方法名要见名知意的问题
<!-- 
  public void showInfo(String name) { }
  public void showInfo(int age) { }
 -->

- 但是也有了另一个问题, 就是我们定义了很多的方法 内容的逻辑都是一样的
- 那有没有一个方法我们通过一个形参能适用各种类型的形参

- 这时候就有了多态性
- 我们定义形参为父类 但是实参传入父类的子类 执行的就是子类重写父类后的方法

- 这时候我们唯一要注意的就是 我们可以调用的子父类中同名的方法(也就是说调用的方法要是重写和被重写的关系)


- 扩展：
- 我们后面还会接触mysql oracle db2 ss 我们需要用java链接这些数据库并操作数据库中的数据 要想操作数据 就要先获得数据库的链接 我们要先搭上链接 然后才能进行操作
<!-- 
class Driver {
  public void doData(Connection conn) {
    // 后续的操作数据库 都是很规范的 不管操作哪个数据库都是3步
  }
}
 -->
- Connection类型的形参我们定义一个父类类型的形参 
- 当我们调用这个方法的时候 我们传的都是子类的对象了

- 比如我们传递实参的时候 传递进去 new MySQLConnection 这就相当于我们建立的是mysql的链接 
- 比如我们还可以传递进去 new oracle 那么我们建立的就是oracle数据库的链接 


> 多态性不适用于属性
- 我们在父类 Person类中 定义属性 int id = 1001;
- 我们在子类 Man类中 定义属性 int id = 1002;
- 然后我们 Person p = new Man();
- 我们输出 p.id 会是什么结果？

- 属性是不存在覆盖之说的 结果只能是父类中的id=1001;
- 结果是父类中定义的属性


> 总结:
- 对象的多态性只适用于方法 不适用于属性 (属性的时候 编译和运行都看左边)

<!-- 
  Person p = new Man()

  栈结构      堆结构
  p           name
              age
              id:1001

              isSmocking
              id:1002

  子类继承了父类Person 并且我们还使用了多态的形式
  这时候的内存结构图中 
  1 是有父类的结构 还有子类中自己的结构
  2 这时候我们观察 堆空间中是同时有两个id的 属性不存在覆盖一说(跟js不一样耶)

  那么这两个id到底调用的是哪个？
  这时候的编译和运行都不看左边了 p.id 那他调用的就是 父类中的id
  只有我们 new Man().id 的时候会是 子类中的id
 -->


> 虚拟方法调用的再理解 (父类中被重写的方法就是虚拟方法)
- 上面说了多态性只适用于方法不适用于属性 方法我们指的就是虚拟方法的调用

- 正常方法的调用:
    Person p = new Person();
    p.getInfo();

    Student s = new Student();
    s.getInfo();


> 虚拟方法的调用:
- 子类中定义了与父类同名同参数的方法(重写) *在多态情况下 将此时父类的方法称为虚拟方法*

- 父类根据赋给它的不同子类对象 动态调用属于子类的该方法(重写后的方法) 这样的方法调用在编译期是无法确定的(编译期的时候不知道右边new的是哪个对象的)
<!-- 
  我们认为
    在编译期的时候调用的还是 父类的虚拟方法
    
  父类的方法是虚的 编译的时候让你看一下 运行的时候跟它就没关系了
 -->

  Person p = new Student();
  p.getInfo();

- 编译时类型 和 运行时类型
- 编译时p为Person类型 而方法的调用时在运行时确定的 所以调用的是Student类的getInfo方法 --- *动态绑定*


- 那多态的使用是编译时的行为 还是运行时的行为呢？
- 是运行时行为 真正运行的时候才知道造的是哪个子类对象
 

> 面试题
- 多态是编译时的行为 还是运行时的行为 如何证明

```java 
  class Animal {
    protected void eat() {
      system.out.println("animal eat food")
    }
  }

  class Cat extends Animal {
    protected void eat() {
      system.out.println("cat eat fish")
    }
  }

  class Dog extends Animal {
    protected void eat() {
      system.out.println("dog eat bone")
    }
  }

  class Sheep extends Animal {
    protected void eat() {
      system.out.println("sheep eat grass")
    }
  }


  // 
  public class InterviewTest {

    public static Animal getInstance(int key) {
      switch(key) {
        case 0:
          return new Cat();
        case 1:
          return new Dog();
        default:
          return new Sheep();
      }
    }


    // main方法
    public static void main(String[] args) {
      // 随机数 0 - 2
      int key = new Random().nextInt(3);
      System.out.println(key);

      // 调用getInstance方法将随机数传入 将getInstance的返回值赋值给animal 也就是animal是父类 赋的值是子类 这里就是多态性
      Animal animal = getInstance(key);

      // 单纯的看整个代码的逻辑看到这里 是没有返回知道 打印的结果是什么 是吃草 吃鱼 还是吃骨头
      animal.eat();
    }
  }

  // 要是能看出就是编译行为
  // 要是看不出来就是运行行为(只有运行的时候才能确定new的是谁)
```


> 面试题方法的重载与重写
- 1. 二者的定义
- 2. 从编译和运行的角度看

- 重载
- 是指允许存在多个同名方法 而这些方法的参数不同 编译器根据方法不同的参数表 对同名方法的名称做修饰
- 对于编译器而言 这些同名方法就成了不同的方法 *它们的调用地址在编译期就绑定了*

- java的重载是可以包括父类和子类的 即子类可以重载父类中的同名不同参数的方法
<!-- 
  比如父类中定义的 eat 两个参数
  子类中定义的 eat 也有两个参数
  这种情况也叫做重载
 -->

- 所以对于重载而言 在方法调用之前 编译器就已经确定了所要调用的方法 这成为 早绑定 或 静态绑定

- 而对于多态 只有等到方法调用的那一刻 解释运行器(也可以范范的说是编译器)才会确定所要调用的具体方法 这成为 晚绑定 或 动态绑定

- 总结：
- 不要犯傻 如果它不是晚绑定 它就不是多态


> 对多态性的理解
- 封装性:
- 我们把信息都封装在类中了 类中定义了很多的功能 这些功能如果不想对外暴露的话 使用权限修饰 去描述我们的封装性

- 继承性:
- 让类和类之间达到继承关系 从而让代码能够进行重用

- 多态性
- 多态性想要完成的事情 就是尽可能的让代码能用*具有通用性*
<!-- 
  比如equals方法 形参中的类型 都是object 然后我们传入对象的时候可以传入任意的子类对象

  之所以能够传入子类对象 就是因为有多态性的存在
  我们不光光能放Object类型的 还可以放它子类类型的
 -->

- 抽象类和接口的使用也能体现多态性
- 如果没有多态性 抽象类和接口就没有意义 也就是说抽象类 接口的使用肯定体现了多态性(因为抽象类 接口不能实例化)

- *多态是运行时行为*

----------------------------

### instanceof 关键字 多态性下调用子类特有的结构
- 上面我们写的例子的代码体现了多态性
<!-- 
  Person p1 = new Man();
  p1.eat();

  编译的时候看左边 看Person类中的结构
  运行的时候看右边 看子类 运行的是子类重写后的方法
 -->

- 上面的代码 我们声明的 p1实际new的是Man 我们在编译器认为p1就是Person 我们只能够调用Person中声明的属性和方法
<!-- 
  我们是不能通过p1(父类的引用)调用子类独有的方法
  原因就是编译时 p1是Person类型 在Person中就没有定义过 子类独有的方法
 -->

- 那我们思考一下 我们上面 执行了 new Man() 逻辑后 内存中有没有 子类特有的属性和方法
- 有的

- 也就是说 Person p1 = new Man(); 这样的逻辑后
- 在堆空间中 new Man() 这个对象中是有 Person 和 Man 的所有属性和方法的 

- 但是p1的类型是Person 它只能调用对象中Person的结构 相当于对象中子类的特有的结构被屏蔽掉了


> 总结
- 有了对象的多态性以后 内存中实际上是加载了子类特有的属性的方法的 由于变量声明为父类类型 导致编译时只能调用父类中声明的属性和方法 子类中特有的属性和方法不能调用
<!--  
  子类的结构在内存中确实是加载了 但是我们调不了
 -->


> 那如何才能调用子类特有的属性和方法呢？
- 要是想调用子类特有的属性和方法 那对于我们编译器来讲它看到p1的类型就不能是一个Person类型的才可以

- 编译只能看左边 你要是想调子类的结构 那么就需要将左边的类型改掉 比如这样
```java
  // 修改成这样 变量 父类赋值给子类了
  Man m1 = p1     // 报错
```

- 原因：
- = 是赋值符号 赋值符号要求 要么是两边的类型一样 要么有基本数据类型提升
- 现在是一个类类型的不行 子类对象可以往父类身上赋值 但是父类不能赋值给子类


- 解决方法：
- 使用强制类型转换符 Man m1 = (Man)p1

```java
  Man m1 = (Man)p1;
  // 我把 Person类型的变量 p1 强制转换为 Man类型
```

- 上面的这种方法又称为 *向下转型*


> 自我总结：
- 向下转型用在当有多态的时候 我们是将子类对象赋值给父类的引用 当通过父类的引用调用重写的方法的时候

- 1. 通过父类引用 只能调用父类中声明过的方法 子类特有的方法结构 被屏蔽掉了(看不见)
  
- 那么我们想调用子类特有的方法的时候 该怎么做呢？
- 我们可以通过*向下转型的方法* 转型后通过转型后的对象调用子类中特有的结构

```java
// 父类
class Person {

  // 父类中的方法
  public void say() {
    System.out.println("人可以说话");
  }
}

// 子类
class Student extends Person {

  // 对父类中的方法进行的重写
  public void say() {
    System.out.println("学生说: 老师好");
  }

  // 子类特有的方法
  public void play() {
    System.out.println("学生偶尔玩玩游戏吧");
  }
}


// 测试类
public class Demo {

  public static void main(String[] args) {
    
    // 多态 通过父类引用调用子类重写后的方法 -- 虚拟方法调用
    Person p = new Student();
    p.say();

    // 那么我们如果想要调用子类中特有的方法呢？ 
    // 将 p 引用向下转型 得到 子类引用 s 通过 s 调用子类特有的方法
    Student s = (Student)p;
    s.play();
  }
}
```

> 向下转型
- 前面我们学习基本数据类型的时候 提到到 强制类型转换 和 自动类型提升
<!-- 
            较高的基本数据类型

     强制类 ↓ 型转换    自动类 ↑型提升

            较低的基本数据类型

  比如
  有一个int类型变量想要转成double类型的 直接赋值过去就可以
  有一个double类型的先概要转成int类型的 那么就要使用()
 -->  

- 在多态性这里有跟上面相类似的知识
- 前面说的基本数据的向上转型和数据类型的强制转换 也适用于多态性


> 向上转型(多态)
- 当有一个Student对象(子类) 可以直接赋值给父类类型 是ok的(体现为多态)


> 向下转型
- 声明为父类(Person变量) 向下转型为(Student类型) *需要使用强制类型转换符*

    Student s = (Student)p

**理解: 我声明的是父类引用， 想把它转为子类**

- 因为子类肯定要比父类的功能更强一些 *向下转型的目的*就是为了让多态性的p能调用子类中特有的方法和属性

- 比如 equals() 方法
<!-- 
  public boolean equals(Object obj) { }

  在方法体中判断的时候 我们必须将obj 转为user类型
  不向下转为user类型的话 我们就没办法看到 user类中的name age属性
 -->

- 当我们把一个子类放入形参中的时候 会发生多态(子类对象赋值给父类引用) 把子类提升到Object类

- 然后当我们内部要重写equals方法的时候 会向下转型 将提升到Object类的obj转为和子类一样的类型

<!-- 
              父类(如: Person)

            ↓                 ↑
          向下转型          向上转型
      使用 instanceof       多态
         进行判断   

            子类(如: Student)
 -->


- Person p = new Man()
- 我们通过p.的形式调用可以调用Person类中定义过的结构(调用的还是Man对象中的结构 这些结构只能是Person类中定义过的 没定义过Man对象里面特有的调用不了)

> Man m = (Man)p
- 这里使用强制类型转换符 将p(Person)类型的变量 向下转型(转成子类的Man)
- 这样我们就能通过m 调用Man对象中(子类特有的属性和方法了)

- m.特有的属性    // ok
- m.特有的方法    // ok

- 内存结构图
<!-- 
    栈空间
    m   ↘
    p     
        ↘ 地址值 地址值是包含两部分有 类型@地址

            堆空间
            ---------------------------

            ---------------------------
            | 有person中声明的属性和方法 |
            ---------------------------

            ---------------------------
            | 有man中声明的属性和方法    |
            ---------------------------

            ---------------------------

  因为地址值有类型的限制 所以当我们赋值给m的时候会报错不行 类型不一样 因为有类型的存在
  Man m = p

  所以要加强制转换符
  Man m = (Man)p

  m这样也指向堆空间的对象了 由于m是Man 所以m就能调用对象中特有独有的结构了
 -->

- 但是凡是使用 强制转换符的都会有风险
- 在基本数据类型中的强转 代表精度会有损失

- 在这里的体现就是转不成功 使用强转时可能出现 *“ClassCaseException”* 的异常 当类型不能转换的时候会报这样的异常

- 当我们进行向下转型的时候 使用强制转换符 为了避免出现这样的问题 我们要使用 instanceof

> instanceof 关键字
- 判断是否是类的实例 如果是 返回true 如果不是 返回false
- 格式：
- a(变量名) instanceof A(类型)
- a(对象) instanceof A(类)

- 判断对象a是否是类A的实例

<!-- 
  if(p instanceof Woman) {
    Woman w = (Woman)p
    w.女人类特有的结构
  }


  Person p = new Man()
  if(p instanceof Man) { } 结果为true

  是因为 p 的结果就是一个 Man
 -->

> 应用场景
- 为了避免向下转型时出现 ClassCaseException 的异常 在向下转型之前 先进行instanceof的判断 一旦返回true 就进行向下转型 如果返回false 不进行向下转型

- 如果 
- a instanceof A 返回 true
- a instanceof B 也返回 true
- 那么 类B是类A的父类
<!-- 
  如果 a instanceof A 返回 true 
  那么A的位置替换成A类的父类 也一定是对的
 -->

**注意:**
- 要想向下转型能成功 我们new的肯定不能试自己 只能new子类
<!-- 
  Person p = new Man()      这可以
  Person p = new Person()   这不行
 -->

- instanceof关键字两侧 必须是子父类关系


> 向下转型中的常见问题
- 问题1: 编译时通过 运行时不通过
```java 
  Person p = new Woman();
  Man m = (Man)p

  - 编译时通过 运行时不通过
  - 因为Man Woman这两个类型之间没有关系


  Person p = new Person();
  Man m = (Man)p

  - 我们new的是一个Person 怎么能强转成子类呢
```

- 问题2: 编译通过 运行时也通过
```java 
  Object obj = new Woman();
  Person p = (Person)obj;

  编译通过 运行时也通过

            ---- Object
          ↙                ↖
向下转型   ↓  ---- Person    ↑   向上转型 多态
          ↘                ↗
            ---- Woman

  Object obj = new Woman();  向上转型 多态
  Person p = (Person)obj;    向下转型
```

- 问题3: 编译不通过
```java 
  Man m = new Woman()
  String str = new Date();    这也是错的 不是js哈哈
  
  日期对象和String对象类型不匹配
  赋值的时候必须是子类 类型不匹配 它俩没啥关系
```

- 总结:
- 不相关的两个类是没有办法互相赋值了


> 练习：
- 要点：
- 1. 一旦子类继承了父类 那么子类new的对象里面就有父类和子类的所有结构
  - 当不存在继承的时候
    - 通过实例对象.的方法去调用属性和方法 跟this.的就近原则一样 如果自己定义的结构中有 就调用自己的 如果没有就去看父类中定义的结构

  - 当存在继承的时候
    - 就要看是否是多态的形式 如果是
    - 创建的变量 只能调用父类中定义的属性和方法

  - 子父类中的属性不存在覆盖
  - 当调用方法的时候 会调用子类中重写后的方法

```java 
class Base {
  int count = 10;

  public void display() {
    System.out.println(this.count);
  }
}

class Sub extends Base {
  int count = 20;

  // 对父类的方法进行了重写
  public void display() {
    System.out.println(this.count);
  }
}

public class Demo {
  public static void main(String[] args) {
    // 一旦子类继承了父类 那么子类new的对象里面就有父类和子类的结构

    // this.属性 这个属性不一定是自己类定义的 也可能是父类中定义的 只是是先在自己的类中去找 没找到再去父类中找 要是在子类中找到了就用自己的 就近原则

    // Sub 也是一样 就近原则 先在自己里面找 找到了就是20
    Sub s = new Sub();
    System.out.println(s.count);  // 20
    s.display();  // 20

    // 多态
    Base b = s;
    // 对于引用数据类型的 == 比较的是引用数据类型变量的地址值
    System.out.println(b == s);   // true

    // 多态性不适用属性 count只会在Base中定义的结构中去找
    System.out.println(b.count);  // 10

    // 虚拟方法调用 执行的子类中重写后的方法
    b.display();    // 20
  }
}
```

- 总结：
- 若子类重写了父类方法 就意味着子类里定义的方法彻底覆盖了父类里的同名方法 系统将不可能把父类里的方法转移到子类中
<!-- 
  虚拟方法 执行时就是执行的子类中重写后的方法
 -->
**对于方法: 编译看左边 运行看右边**

- 对于实例变量则不存在这样的现象 即使子类里定义了与父类完全相同的实例变量 这个实例变量依然不可能覆盖父类中定义的实例变量
<!-- 
  堆空间中存在两个同名变量 到底调用谁 就看声明的是谁(编译阶段看左边 会去左边里面找对应的结构)

  Base b = s;
  b.count 调用的就是Base类中定义的结构
 -->
**对于属性: 编译运行都看左边**


> 练习2
- 定义三个类
- 父类: GeometricObject 代表几何形状
- 子类: Circle 代表圆形
- 子类: MyRectangle 代表矩形

- 测试类: GeometricTest
  - 编写equalsArea方法测试两个对象的面积是否相等 注意方法的参数类型 利用动态绑定技术

  - 编写displayGeometricObject方法显示对象的面积 注意方法的参数类型 利用动态绑定技术

- 类图
<!-- 
  GeometricObject
  -----------------
  #color: String
  #weight: double
  -----------------
  #GeometricObject(color:String, weight:double)
  -----------------
  属性的get set方法
  +findArea():double


  Circle
  -----------------
  -raduis:double
  -----------------
  Circle(radius:double, color:String, weight:double)
  -----------------
  radius属性的set get方法
  +findArea():double 计算圆的面积


  MyRectangle
  -----------------
  -width:double
  -height:double
  -----------------
  +MyRectangle(width:double, height:double, color:String, weight:double)
  -----------------
  属性的get set方法
  +findArea():double 计算矩形的面积
 -->

- 简单的使用多态性 这里也是常用的场景
- 我们声明的时候声明的是父类的类型 调用的时候 传入的是子类的对象
```java 
// 父类 几何图形类
public class GeometricObject {
  protected String color;
  protected double weight;  // 权重

  public GeometricObject() {}
  public GeometricObject(String color, double weight) {
    super();
    this.color = color;
    this.weight = weight;
  }

  public String getColor() {
    return this.color;
  }
  public double getWeight() {
    return this.weight;
  }

  public void setColor(String color) {
    this.color = color;;
  }
  public void setWeight(double weight) {
    this.weight = weight;
  }

  // 求几何图形的面积
  // 但是怎么写呢？ 几何图形不一样 求面积的方式也不一样
  // 这个方法肯定会被子类求面积的方法重写 所以先返回一个0.0
  public double findArea() {
    return 0.0;
  }
}


// 子类 圆类
public class Circle extends GeometricObject{
  private double radius;

  public Circle(String color, double weight, double radius) {
    super(color, weight);
    this.radius = radius;
  }

  public double getRadius() {
    return this.radius;
  }

  public void setRadius(double radius) {
    this.radius = radius;
  }

  // 重写父类中的求面积的方法
  public double findArea() {
    return Math.PI * radius * radius;
  }
}


// 测试类
public class GeometricTest {

  public static void main(String[] args) {
    GeometricTest test = new GeometricTest();

    Circle c1 = new Circle("yellow", 1.0, 2.3);
    test.displayGeometricObject(c1);

    Circle c2 = new Circle("red", 2.0, 2.3);
    test.displayGeometricObject(c2);

    boolean isEquals = test.equalsArea(c1, c2);
    String str = isEquals ? "相等" : "不等";
    System.out.println("c1 和 c2的面试是否相等: " + str);
  }
  
  // 下面的方法就是多态性的使用 我们声明的时候声明的是父类的类型 调用的时候 传入的是子类的对象

  // 判断两个对象的面积是否相等 我们的父类GeometricObject是几何图形对象 我们把父类传入到形参中
  public boolean equalsArea(GeometricObject o1, GeometricObject o2) {
    return o1.findArea() == o2.findArea();
  }

  // 显示对象的面积
  public void displayGeometricObject(GeometricObject o) {
    double res = o.findArea();
    System.out.println("面积为: " + res);
  }
}
```


> 练习
- 以下的输出结果是什么
- 要点:
- public void add(int a, int[] arr)   子类方法
- public void add(int a, int ...arr)  父类方法

- 子类方法算不算对父类方法的重写 
- 如果是重写 那么就是sub
- 如果不是重写 那么就是base

- 是重写

```java
class Base {
  public void add(int a, int ...arr) {
    System.out.println("base");
  }
}

class Sub extends Base {

  public void add(int a, int[] arr) {
    System.out.println("sub");
  }

  // 如果加上了该方法 输出结果是什么？   sub
  - 还是我们要看这个方法是不是对上面方法的重写
  - 在多态的时候 编译的时候要去看父类中的结构
    执行的时候执行的是重写后的方法 下面这个方法不是重写的方法 多态的时候只会调用重写的方法 所以会调用上面那样 输出sub
  public void add(int a, int b, int c) {
    System.out.println("sub2");
  }
}

public class Demo {
  public static void main(String[] args) {
    Base base = new Sub();
    base.add(1, 2, 3);
 
    Sub s = (Sub)base;
    s.add(1,2,3);     // sub2
  }
}
```

----------------------------

### Object类的使用
- Object类是所有Java类的根父类
<!-- 
  java类的继承关系实际上是树形结构 既然是树形结构那么一定会有一个根节点
 -->

- 如果在类的声明中未使用extends关键字指明其父类 则默认父类为java.lang.Object类

  public class Person { }

  等价于

  public class Person extends Object { }


- 我们可以从代码层面看看 Object是否为 根父类

> 对象.getClass()
- 获取当前对象是哪个类造的

> 对象.getSuperclass()
- 获取其父类

```java 
public class Demo {
  public static void main(String[] args) {
    TestClass tc = new TestClass();
    System.out.println(tc.getClass().getSuperclass());
      // class java.lang.Object
  }
}

class TestClass { }
```

- Object类既然是所有类的直接或间接父类 就说明这个类中定义的功能是通用的 那都有哪些功能
<!-- 
  Object类中
      1. 没有定义属性
      2. 只有空参构造器
 -->

> 实例对象.clone()
- 复制一个对象 返回当前对象的复制品
- 深拷贝 克隆后的对象和原对象之间没有任何关系

- 使用方式:
- 1. 实例对象所在的类要实现 implements Cloneable
- 2. 实例对象躲在的类要重写clone()方法
```java
// 比如我们要复制dog对象 那么dog的类就要完成 1 2 两项要求
public class Dog implements Cloneable {

  @Override
  protected Object clone() throws CloneNotSupportedException {
    return super.clone();
  }
}
```

- 3. 通过 实例对象.clone() 复制一个对象
- 返回值:
- Object

- 异常:
- CloneNotSupportedException

```java
Dog dog = new Dog();

try {
  Object o = dog.clone();
  System.out.println(o == dog); // false

} catch (CloneNotSupportedException e) {
  e.printStackTrace();
}
```

```java
  // 我们创建一个
  Person p = new Person();

  // clone() 方法返回的是Object类型 这里我们可以直接强转为 Person
  Person vp = (Person)p.clone();
```


> 实例对象.finalize()  -- *我们不要自己调用该方法*
- 该方法是垃圾回收机制自己调用的
- 当没有引用指向堆空间的一个对象的时候 该对象被回收之前 垃圾回收机制会自己调用该方法


> 实例对象.getClass()
- 获取当前对象的所属类 就是谁造的该对象
- 任何对象都有能力获取它的类(每个对象有权利知道自己是谁造的)
<!-- 
  TestClass tc = new TestClass();
  System.out.println(tc.getClass());
        // class src.com.TestClass
 -->


> 实例对象.hashCode()
- 返回当前对象的哈希值

- 返回值:
- int

```java
Dog dog = new Dog();

int i = dog.hashCode();
System.out.println(i);    // 1513712028
```


> 扩展
- 数组也可以看做是一个特殊的类，继承我们的Object
- 也就是说当有一些参数为Object类型的形参的时候 我们也可以把数组往里面丢

- 同时arr也能.出Object类中的方法
<!-- 
  arr.clone()
  arr.equals()
  arr.getClass() 获取arr是哪个类
  arr.getClass().getSuperclass   // Object
  ...
 -->

------

> 实例对象.equals(Object obj)
- 比较两个对象是否相等
- 返回值: boolean

- 默认的情况下：
- 比较的是两个对象的地址值是否相同



- 我们在这里先回顾一下 == 然后研究下 == 和 equals 方法有什么样的区别

> ==
- == 是一个运算符
- 1. 可以使用在基本数据类型变量 和 引用数据类型变量中

\\ 基本数据类型:
- 使用 == 的时候 比较两个变量保存的数据是否相等(不一定类型要相同 自动类型提升)
```java 
  int i = 10;
  int j = 10;
  double d = 10.0;
  i == j;    // true
  i == d;    // 因为有类型提升 所以是true
```

- 扩展:
- 基本数据类型的自动类型提升适用于任何符号



\\ 引用数据类型:
- 比较两个对象的*地址值是否相同*(两个引用是否指向一个对象的实体)
```java
  Cusomer cust1 = new Customer("Tom", 21);
  Cusomer cust2 = new Customer("Tom", 21);

  cust1 == cust2;   // false  new了两次

  // String类也可以new
  String str1 = new String("sam")
  String str2 = new String("sam")

  str1 == str2;     // false 只要是引用类型的 == 都是在比较地址值
```

- 2. == 符号使用时 必须保证符号左右两边的变量类型一致(统一一下 别左边是个String 右边是个Date)


> equals()方法的使用
- 相当于==来讲 equals()是一个方法 并非是一个运算符
- 该方法需要通过实例对象来调用 所以不能使用在基本数据类型上 *适用于引用数据类型*

```java
  int i = 0;
  i.equqals()   // 不行 i不是对象

  Cusomer cust1 = new Customer("Tom", 21);
  Cusomer cust2 = new Customer("Tom", 21);

  // 使用equals方法来判断
  cust1.equals(cust2);    // false
```

- 我们看在 equals方法 在Object类中的定义原码
- Object类当中定义的方法 和 == 的作用是相同的
```java 
  public boolean equals(Object obj) {
    return (this == obj)
  }
```

- 但是有些对象调用equals方法的时候返回的又是true 比如String Date等
```java 
  String str1 = new String("sam")
  String str2 = new String("sam")

  str1.equals(str2);    // true



  Date date1 = new Date(32432525324L);
  Date date2 = new Date(32432525324L);
    // 这也是两个对象 如果用 == 去判断的话 肯定是false

  date1.equals(date2)   // true
```

- 像 *String Data File 包装类* 等, 都*重写*了Object类中的 equals() 方法
- 重写后:
- 比较的不是两个引用的地址是否相同 而是比较两个对象的"实体内容"是否相同(我们new对象时传入的参数都是对象中的属性 它比较的就是这个属性对应的数据是否相同)


- 但是通常情况下 我们 对象.equals 了说明想比较的也是实体内容而不是地址值, 该怎么做呢？

- 那我们也必须对Object类中的equals方法进行重写了


> 自定义类如何重写equals()
- 通常情况下 我们自定义的类如果使用equals的话 也通常是想比较两个对象的实体内容是否相同 那么我们就需要对Object类中的equals方法进行*重写*

- 解析：
- 如果我们想比较两个对象的实体内容是否相同 也就是说我们比较的是 对象中的属性是否相同

- 重写规则:
- 比较两个对象的实体内容'(即: name age)是否相同

- 重写目标:
- 比较两个Dog类实例的对象 那么我们就在Dog类中重写equals方法

```java 
  public class Customer {
    private int age;
    private String name;


    // 我们在这个类里面 重写 Object中的equals方法
    public boolean equals(Object obj) {
      // 重写规则:
      - 比较两个对象的实体内容 (即: name age)是否相同

      // 当前对象和传入对象的地址值一样的情况下 我们return true
      if(this == obj) {
        return true;
      }

      // 地址不一样的情况 我们看看obj是不是Customer的子类
      if(obj instanceof Customer) {

        // 强制转换的目的 向下转型 obj是Object类型
        向下转型后 它就能和cust一样点出一样的属性
        Customer cust = (Customer)obj;
            // 比较两个对象的属性是否相同

        // this.name == cust.name这里不能这么写 因为字符串是引用数据类型 我们比较的时候 调用String类中重写的equals方法 比较的是内容
        if(this.age == cust.age && this.name.equals(cust.name)) {
          return true
        } else {
          return false
        }

        // 或者 第二种方式
        return this.age == cust.age && this.name.equals(cust.name);
      } 

      return false
    }
  }
```

- 开发中编辑器中有重写equals的快捷键 可以设置让哪些属性参与equals的比较
- 编辑器自动生成的equals
```java 
  public boolean equals(Object obj) {
    if(this == obj) return true;
    if(obj == null) return false;
    if(getClass() != obj.getClass()) return false;

    Customer other = (Customer)obj;
    if(age != other.age) return false;
    if(name == null) {
      if(other.name != null) return false;
      else if(!name.equals(other.name)) retur false;
    }
    return true;
  }
```

----------------------------

### toString()使用
- Object类中 toString() 方法的使用

> 实例对象.toString()
- 当我们输出一个对象的引用(对象的变量)的时候 实际上就是调用了这个当前对象的toString()方法

- 默认情况下:
- 我们输出的是该对象的地址值

- 也就是说 toString() 方法也需要重写

```java 
  Customer cust = new Customer()

  // 调用对象的toString()方法 打印的是地址值
  println(cust.toString())   // 地址值
          - src.com.TestClass@5e91993f

  // 直接输出对象也是地址值
  println(cust)   // 地址值
          - src.com.TestClass@5e91993f
```

- Object类中toString()的定义 也就是源码
```java 
  public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
  }

  getClass().getName()
      - 这个对象的类的类名
    
  Integer.toHexString(hashCode())
      - 根据hashCode值计算这个对象在堆空间的位置 并且转为16进制
```

- Java中的内存地址是虚拟的内存地址 因为我们在操作系统之上还有一层jvm jvm就是虚拟的操作系统 所以我们的内存地址也是虚拟的内存地址 是哈希code算出来的值

- 我们看下下面的情况
- 上面说过我们输出一个对象的引用的时候 实际上调用的就是这个对象的toString方法
- 下面相当于 str.toString() date.toString()

```java 
  String str = new String("MM");
  System.out.println(str); 
        // 输出的是MM

  Date date = new Date(324254235236L);
  System.out.println(date);
        // 1980-04-11
```

- 像String Date File 包装类等都重写了Object类中的toString方法 重写后的toString()方法输出的是内容实体

- 使得在调用对象的toString方法时 返回的“实体内容”信息


- 上面我们说了*输出一个对象的引用的时候 实际上是调用这个对象的toString方法*
```java 
  String s = "abc";

  System.out.println(s);
  System.out.println(s.toString());
        -- 这时候 上面的两条 输出是一样的

  ------ 

  String s = "abc";
  s = null;

  System.out.println(s);
        -- null

  System.out.println(s.toString());
        -- null.toString() 会是空指针异常
```

- 当时null的使用 上面的 *结论* 有些区别
- 在println里面有保护机制 当我们传入是个String s类型的参数的时候 内部会做判断 if(s == null) s = "null"
- 所以它输出的是字符串类型的 null


> 自定义类 重写toString()方法
> public String toString() {}
- 当调用我们重写的toString方法时 返回对象的实体内容

- 返回值:
- String

```java 
public class Demo {
  public static void main(String[] args) {
    
    // 直接输出对象的引用 相当于调用了o.toString()方法 而这个方法我们在Order类中进行了重写
    Order o = new Order("sam", 18);
    System.out.println(o);
    
  }
}

class Order {
  private String name;
  private int age;

  public Order() {}
  public Order(String name, int age) {
    this.name = name;
    this.age = age;
  }

  // 重写toStringfangfa
  public String toString() {
    return "Customer[name = " + name + ", age = " + age + "]";
  }
}
```

- 以后我们想输出对象的地址值就直接调用对象的toString方法
- 如果我们想通过 toString方法输出 对象的内容 就需要重写toString方法

- 这个toString也是比较常用的功能 所以编辑器里面有直接重写toString的功能
- ctrl + shift + p 选择 然后生成 就可以

------------------

> 练习
- 定义两个类 父类Geometric代表几何形状 子类Circle代表原型
<!-- 
  GeometricObject
  ------------------
  protected String color;
  protected double weight;
  ------------------
  protected GeometricObject()
  protected GeometricObject(String color, double weight)
  ------------------
  属性的get set
  ------------------

  初始化对象的color属性为 white weight为1.0

  ↑
  Circle
  ------------------
  private double radius
  ------------------
  public Circle()
  public Circle(double radius)
  Public Circle(double radius, String color, double weight)
  ------------------
  radius属性的set get
  public double findArea() 计算圆的面积
  public boolean equals(Object obj)
  public String toString()

  构造器1
  初始化对象的color属性为 white weight属性为1.0
  radius属性为1.0

  构造器2
  初始化对象的color属性为white weight属性为1.0
  radius根据参数构造器确定

  重写equals方法 比较两个圆的半径是否相等 
  重写toString方法 输出圆的半径


  写一个测试类创建两个Circle对象 判断其颜色是否相等 利用equals方法判断其半径是否相等 利用toString方法输出其半径
 -->

- 基类 GeometricObject

```java 
public class GeometricObject {
  protected String color;
  protected double weight;
  
  protected GeometricObject() {
    this.color = "white";
    this.weight = 1.0;
  }

  protected GeometricObject(String color, double weight) {
    this.color = color;
    this.weight = weight;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public double getWeight() {
    return weight;
  }

  public void setWeight(double weight) {
    this.weight = weight;
  }
}
```

- 子类 Circle
```java 
public class Circle extends GeometricObject {

  private double radius;

  public Circle() {
    this.color = "white";

    // 因为父类中已经做过初始化了 子类中这个部分可以注释掉
    // this.weight = 1.0;
    // this.radius = 1.0;
  }

  public Circle(double radius) {
    // this.color = "white";
    // this.weight = 1.0;
    this.radius = radius;
  }

  public Circle(double radius, String color, double weight) {
    super(color, weight);
    this.radius = radius;
  }

  public double findArea() {
    return Math.PI * this.radius * this.radius;
  }

  // 重写equals 判断半径是否相等
  public boolean equals(Object obj) {
    if(this == obj) return true;
    if(obj instanceof Circle) {
      Circle c = (Circle)obj;
      return this.radius == c.radius;
    }
    return false;
  }

  @Override
  public String toString() {
    return "Circle [radius=" + radius + "]";
  }
}
```

- 测试类
```java 
public class Demo {
  public static void main(String[] args) {
    
    Circle c1 = new Circle(2.3);
    Circle c2 = new Circle(3.3, "white", 2.0);

    // 判断两个对象的颜色是否相等 比内容就用equals
    System.out.println("颜色是否相等: " + c1.getColor().equals(c2.getColor()));

    // 半径是否相等 因为重写的equals方法比较的就是半径 直接调
    System.out.println("半径是否相等: " + c1.equals(c2));

    // 调用toString方法输出半径值
    System.out.println(c1.toString());
    System.out.println(c2.toString());
  }
}
```

> 要点:
- 只要是比较内容 那么我们就使用equals方法

----------------------------

### 单元测试方法的使用
- 我们在测试的时候 经常会在代码的一个部分里 利用输出的形式输出分割符 用到分割想要测试的部分
<!-- 
  System.out.println("***************");
 -->

- 在实际的开发中也是 有一些代码的部分我们测试过了 就不想再测了
- 最好的结果就是我们想测试哪段就测试哪段
<!--
  -----------
    先测试这段
  -----------

  code....

  -----------
    再测试这段
  -----------
-->

- 这就是单元测试
- 想测试哪段代码就测试哪段代码

> JUnit 单元测试
- 1. 选中当前工程 就是选中项目文件夹(最外围的) 右键 -- Bulid path -- Add Lib... -- JUnit -- JUnit4 -- 完成

- 2. 然后工程下会多了一个 JUnit4 的包
- 3. 新建一个类 进行单元测试
  - 此时的java类 要求：
  - 1. *此类是公共的 public*
  - 2. 此类要提供一个公共的*无参的构造器*(不要写构造器就完事了)
  <!-- 
    这个类就是用来测试的 不是用来造对象的
   -->
  - 3. 在此类中声明单元测试方法 要求此方法的*权限是public* *没有返回值* *没有形参*
   <!-- 
      public class JUnitTest {
        // 创建测试方法 testXxx方法名
        public void testEquals() {

        }
      }
    -->

  - 4. 此单元测试方法上需要声明 *@Test* 注解 *并在单元测试类中导入 import org.junit.Test;*
  <!-- 
    // 这是单独的一个类
    import org.junit.Test;
    public class JUnitTest {

      // 这个类中可以定义属性 测试类中的属性可以直接在测试方法中使用 不同通过造本类对象然后.的形式调用属性
      int num = 10;

      @Test      
      public void testEquals() {
        // 我们把它想象成main方法 在这里面进行代码测试
        String s1 = "MM"
        String s2 = "MM"
        System.out.println(s1.equals(s2))
      }
    }
   -->
  
  - 5. 声明好单元测试方法以后 就可以在方法体内测试相关代码
  - 6. 写完代码以后 双击选中方法名 右键 run as junit Test

  - 7. 我们测试完一段逻辑后 可以再造一个测试方法再测试下一个结构

- 说明：
- 如果执行结果没有任何异常是绿色条
- 如果执行失败或出现异常是红色条


- 扩展:
- 之所以在main方法中要使用本类的方法和属性的时候 要先造本类对象 通过对象.的形式调用属性和方法 的原因是 main方法是静态的 static

- 之所以在测试方法中不用通过造对象 .属性的方式 就能够直接的使用本类中的属性 是因为 它就是一个普通的方法 普通方法可以直接读本类中的属性

> vscode中的测试方式
- 好像是 ctrl shift p 输入测试关键字 找对应的选项
- https://blog.csdn.net/ME__WE/article/details/104887568?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link

- 好像就是导入jar包就可以了

----------------------------

### 包装类(Wrapper)的使用
- java提供了8种基本数据类型对应的包装类 使得基本数据类型的变量具有类的特征

- 有了类的特点 就可以调用类中的方法
<!-- 
      基本数据类型            包装类
                                      -------------
      byte                  Byte
      short                 Short
      int                   Integer    这些都算数值型的
      long                  Long       父类为 Number
      float                 Float       
      double                Double
                                      -------------
      boolean               Boolean
      char                  Character
 -->

- int i 来举例： 
- 包装类(Integer)相当于把我们的基本数据类型封装到一个类当中了 类中有一个属性时int型的i

- 也就是说我们希望让java中基本数据类型的变量也有类的特征 所以我们给每一种基本数据类型对应的生成了一种包装类
<!-- 
  星矢 -- 菜 -- 关键 -- 射手座圣衣 -- 牛逼了
 -->

- 以后我们使用基本数据类型的时候就可以使用对应的类型的包装类了
- 那基本数据类型 和 包装类 和 String 三者之间是如何转换的呢？

- 下面我们研究下它们之间的相互转换

<!-- 
        装箱: 
        1. 通过构造器:  Integer t = new Integet(11);
        2. 通过字符串参数: Float f = new Float("32.1F");
        3. 自动装箱

                → →
  基本数据类型          包装类
                ← ←

        拆箱:
        1. 调用包装类的方法: xxxValue()
        2. 自动拆箱

  ------

        1. String类的 valueOf(3.4f)方法
        2. 23.4+“”

                → →
  基本数据类型          String类
                ← ←

        1. 调用响应的包装类的 parseXxx(String)静态方法
        2. 通过包装类构造器: boolean b = new Boolean("true")

  ------

        1. 包装类对象的toString()方法
        2. 调用包装类的toString(形参)方法

          → →
  包装类          String类
          ← ←

        通过字符串参数
        Float f = new Float("32.1F")
 -->

> 基本数据类型 转换为 包装类

> Integer in1 = new Integer(num1);
- 只需要通过 new + 对应类型的构造器就可以了 但是高版本中该方法已经被弃用了

- 类型是 Integer
- new Integer(int型的数字 or "字符串型数字")

- 异常:
- NumberFormatException

```java
  // 高版本弃用方法
  int num1 = 10;
  Integer in = new Integer(num1);
  Integer in = new Integer("123");  // 注意: "123ab" 这样的不行
  // NumberFormatException


    // 新方法
    Integer num2 = 10;
    System.out.println(num2.toString());

    Integer in1 = Integer.valueOf(num1);
    System.out.println(in1.toString());


  // 高版本弃用方法
  Float f1 = new Float(12.3f)   // 注意: float类型要加上f
  System.out.println(f1.toString());  

    // 新方法
    Float f1 = 12.3f;
    System.out.println(f1.toString());


  // 高版本弃用方法
  Boolean b1 = new Boolean(true);
  Boolean b1 = new Boolean("true");

      // 新方法
      Boolean b1 = Boolean.valueOf(true);
      Boolean b2 = Boolean.valueOf("true");
      System.out.println(b1);
      System.out.println(b2);

      Boolean b3 = true;
      System.out.println(b3);
```

**注意: Boolean包装类的注意点**
- Boolean b1 = new Boolean("true123");    // false

- 布尔类型的包装类 可以传递 "true123" 类似这样的数据
- 因为布尔类型的包装类做过优化 只有传入true的时候才是true *而且忽略大小写* 否则其它的都是false
<!-- 
  Boolean b1 = new Boolean("TruE")   // true 忽略大小写
 -->

- 上述的方式在java9以上不使用 使用下面的方式包装
- Boolean b = Boolean.valueOf("true123");

> 将基本数据类型转换为包装类的3种方式
- 1. new Integer()
- 2. Integer.valueOf()
- 3. Integer num = 10    -- 自动装箱


> 扩展
- 基本数据类型变为包装类后 默认值会发生改变 *null*
```java 
  Order order = new Order();
  System.out.println(order.isMale);   // false  基本数据类型的默认值
  System.out.println(order.isFemal);  // null 因为人家是一个类 所以null

  class Order {
    boolean isMale;
    Boolean isFemal;    // isFemal 已经是一个类(对象了)
  }
```

**注意:**
- 9以上 new Integer(num1) 方式弃用了 可能改成以下的两种方式了

> 1. Integet in1 = Integer.valueOf(num1);
- 调用包装类的valueOf方法
- *弹幕上说一般用valueOf 构造的方法被弃用了*
- 该方法可以传递"123"形式的数据
<!-- 
  Float in1 = Float.valueOf("23.3");
  System.out.println(in1.toString());
 -->

> 2. Integer in = 10;
- 直接声明为int型的包装类 然后定义变量赋值
- 自动装箱

```java
  Integer num = 10;
  System.out.println(num.toString());

  Integer in1 = Integer.valueOf(num1);
  System.out.println(in1.toString());
```

**注意:**
- 自动装箱的方式 不能将其它字符串类型的数据 转为包装类
<!-- 
  Float f1 = "12.3";  不会将字符型的数字转换为数字
 -->
   

> 包装类 转换为 基本数据类型
- 包装类作为类的对象 是*不可以参与加减乘除运算*的 所以在参与运算的时候 我们需要把包装类转换为基本数据类型

> 已被包装类包装的变量.包装类类型Value();
- 调用包装类的xxxValue()
- 该方法会返回一个基本数据类型

- int型:
- intValue();

- float型:
- floatValue();

- double型:
- doubleValue();

- 以下同理

```java 
  // 低版本
  Integet in1 = new Integer(12)
  int i2 = in1.intValue();

  // 高版本
  Integer num = 10;  
  int i1 = num.intValue();

  System.out.println(i1 + 1);
```


> 自动装箱 and 自动拆箱
```java 
  int num1 = 10;

  // 多态 method 方法接收 一个对象
  public void method(Object obj) {

  }
```

- 但是这时候我们要是想将num1放入method方法中 是不可以的 因为num1是基本数据类型我们想放进去是不行的

  method(num1);
  
- 所以我们需要先把基本数据类型 转换为 包装类的对象 我们相当于转换为 Integer了 Integer间接继承Object类 这样我们就可以往里面放了

- 反过来也是 我们不能让一个类去做加减乘除 所以就需要将包装类转换为基本数据类型

- 上面将基本数据类型转为包装类 和 将包装类转为基本数据类型 很常用
- 所以在jdk5.0的时候加入了新特性 新特性的名字是 自动装箱与拆箱

- 上面的例子中 按正常来讲我们的 num1 是没办法 放入到 method() 方法中的
- 但是 method(num1) 也没报错

```java 
  @Test
  public void test3() {
    int num = 10;
    method(num);

    -  这里 并不是 Object obj = num 将int类型的num 赋值给了形参Object类型的obj 
    - num 和 obj的类型不一样 也没有子父类的关系 

    - 但是为什么不报错呢？ 因为隐含了一个知识点 就是自动装箱和拆箱
  }

  public void method(Object obj) {
    System.out.println(obj);    // 不仅没有报错还能正常的输出
  }
```

> 自动装箱
- 实现了 基本数据类型 ---> 包装类
- 我们可以直接把一个基本数据类型的值 赋值给声明为包装类类型的变量 这里就是自动装箱

- 但是 自动装箱不能转换 字符串型的数字

```java
  int num2 = 10;
  Integer in1 = num2;

  Integer num = "123"   // 这是不行的
```

- 有了自动装箱的特性后 我们再包装基本数据类型的时候就不用我们new了
<!-- 
  boolean b1 = true
  Boolean b2 = b1   // 自动装箱
 -->


> 自动拆箱
- *直接把一个包装类的对象赋值给基本数据类型的变量*

```java 
  int num2 = 10;
  Integer in1 = num2;

  // 自动拆箱
  int num3 = in1;

  Integer numWrap = Integer.valueOf("123");
  int num = numWrap;
```

- 5.0之后才可以使用自动装箱 和 自动拆箱


> 基本数据类型 和 包装类 转换为 String类型
- 我们看下下面的问题 我们把一个int型的数据 赋值给String类型的变量是不行的 因为基本数据类型和String类型之间没有自动类型提升

```java 
  import org.junit.Test;
  @Test
  public void test4() {

    int num1 = 10;
    String str1 = num1;   // 编译器报错

  }
```

- 但是我们可以这样 String str1 = *num1 + ""*;
- 我们让基本数据类型 链接一个空字符串 这样它就是一个String类型的了

- 除了int之外的所有基本数据类型都可以


> 基本数据类型 转换为 String类型 方式1
> 连接运算 -- 基本数据类型 + ""
```java 
  int num1 = 10;
  String str1 = num1 + "";
```


> 基本数据类型 转换为 String类型 方式2
> String.valueOf(基本数据类型数据)
- 该方法返回的是一个String类型的数据
<!-- 
  我们把一个基本数据类型的变量 可以通过 包装类valueOf方法 将其转换为包装类对象

    Integer num = Integer.valueOf("123");
 
  一样 我们想将基本数据类型的变量 转换为字符串也可以调用 String.valueOf() 方法

    String str = String.valueOf(num);
 -->

```java 
  float f1 = 12.3f;
  String str= String.valueOf(f1)  // "12.3"
```

- 因为有自动拆箱的概念 所以我们也可以往 String.valueOf(*往这里丢包装类*)
```java 
  Double d1 = new Double(12.3)
  String.valueOf(d1)

  - 我们往()中丢了一个包装类对象进去 因为有自动拆箱的功能 所以这样做也是可以的
```


> Sring类型 转换为 基本数据类型 和 包装类
- 现在我们要将 String类型的数据 转换为 基本数据类型
```java 
  String str = "123";
  int num = str;

  // 这样肯定是不可以的
```

- 当我们要将String类型的数据 转换为 基本数据类型的时候 我们要调用*包装类的parseXxx()方法*

> Integer.parseInt(String s)
- 该方法会返回一个基本数据类型的数据

- 参数2:
- 可选 可能是转换的进制
```java 
  String str = "123";
  int num = Integer.parseInt(str);
```

> Boolean.parseBoolean(变量)
> Float.parseFloat(变量)

- *我们要保证要转换的数 是可以转的*


> 小总结一下:
- 不一定对 我没检查 看看就可以
- 基本数据类型 转换为 包装类:
    1. new Integer()
    2. Integer.valueOf()
    3. 自动装箱 我们可以把基本数据类型的数据 直接放入到包装类类型的变量里面

- 包装类 转换为 基本数据类型:
- 包装类是对象 没办法进行加减乘除的运算 所以我们要进行转换
    1. 自动拆箱
      - 我们可以直接把包装类对象 赋值给 基本数据类型的变量

    2. num.intValue()

- 基本数据类型 和 包装类 转换为 string
    String.valueOf()

- String类型的数据转换为包装类
  - 包装类.parseInt()


> 面试题：
- 如下两个题目输出结果相同么？ 各是什么
```java 
  Object o1 = true ? new Integer(1) : new Double(2.0)
  system.out o1    // 1.0
```

- 为啥是1.0呢？
- 为啥不是1

> 解析：
- 当我们使用 三元运算符的时候 前后两个条件 要统一成一个类型
- 因为编译的时候 就需要统一成一个类型 才能根据条件 赋值给 定义的变量 因为变量的类型已经定义好了 它只能接收确定的一种类型吧

        A                 B
  new Integer(1) : new Double(2.0)

- A和B要统一成一个类型 所以这里面就包含了 自动类型提升 的概念


- 下面没啥知识点就是1

```java 
  Object o2;
  if(true) o2 = new Integer(1)
  else 
    o2 = new Double(2.0)

  system.out o2    // 1
```


> 2
- 之前老师说过在println()的时候 对于数组的情况
- 当我们里面放的是char型数组的时候 我们输出的是内容 
- 除了char型数据 其它输出的都是地址值

```java 
  public void method1() {
    Integer i = new Integer(1)
    Integer j = new Integer(1)
    System.out.println(i == j)  // 引用类型比地址 false


    Integer m = 1;
    Integer n = 1;
    System.out.println(m == n)  // 自动装箱 true


    Integer x = 128;
    Integer y = 128;
    System.out.println(x == y)  // false 为什么跟上面看着一样却是false
  }
```

- Integer包装类是对int变量的一个封装
<!-- 
  包装类其实很简单 核心就是 将基本数据类型的变量给我们包了一下 作为该类的属性出现了 另外加了一些方法
  class Integer {
    private int value
  }
 -->

> 练习
- 那为什么下面两个输出结果会不同
```java
Integer m = 1;
Integer n = 1;
System.out.println(m == n) true


Integer x = 128;
Integer y = 128;
System.out.println(x == y) false
```

- 因为在 Integer类中定义了一个 *内部类* 叫 IntegerCache  
- 这个内部类中有一个数组 是Integer类型的数组 Integer cache[]
- 这个数组中存了 从 -128 - 127 之间的数 相当于 byte范围的数

- 这个数组的目的就是方便我们去用 因为在这个范围内的数 用的非常的频繁 所以处于性能的原因 我们就有这个缓存数组 提前加载好  

- 所以当我们自动装箱的时候 
  Integer m = 1 
  - 那么就直接走的缓存数组中的1 因为走的是缓存数组 地址值一样

  Integer n = 1
- 还是个1 那么还走缓存数组 因为缓存数组都是一个 所以地址值相同
- 那我们使用 == 比较两个对象的时候 比较的就是地址值
- 所以是true

- 当我们写128的时候 不在缓存数组中了 那么就会新创建两个128的包装类因为是两个对象 地址值就会不同 
- 所以是false

> 总结
- Integer内部定义了IntegerCache结构 IntegerCache中定义了 Integer[] 保存了-128 - 127 范围的整数

- 如果我们使用自动装箱的方式 给Integer赋值的范围在 -128 - 127 范围内时 可以直接使用数组中的元素 不用再去new了 目的就是为了提高效率

- 128则相当于 new了一个Integer对象


> 为什么要使用包装类
- 因为有些方法的形参就是Object类型 我们要是把基本数据类型往里面放是放不进去的 所以必须要以包装类的形式往里面放

- 同时才想取出来的时候 要进行运算的时候 还要转换为 基本数据类型


> 基本数据类型 和 包装类 互转 String类型 的技巧
> A 转换 S

- 如果 A 转为 S  那就去调用 S中的方法 String.valueOf(Xxx)
- 如果 S 转为 A  那就是调用 A中的方法 包装类.parseXxx(S)


> 练习
- 利用Vector代替数组处理:利用
- 从键盘读入学生成绩（以负数代表输入结束），找出最高分，并输出学生成绩等级。
<!-- 
  为什么要使用Vetor代替数组？
  数组一旦创建，长度就固定不变，所以在创建数组前就需要知道它的长度。而向量类 java.util.Vector 可以根据需要动态伸缩。
 -->

  - 提示：
  - 创建 Vector 对象： 
      Vector v=new Vector();

  - 给向量添加元素 
      v.addElement(Object obj); 
    - obj 必须是对象
    
  - 取出向量中的元素： 
      Object obj v.elementAt(0)
    - 注意第一个元素的下标是 0 ，返回值是 Object 类型的。

  - 计算向量的长度： 
      v.size()

  - 若与最高分相差 
    10 分内： A 等； 
    20 分内： B 等； 
    30 分内： C 等；
    其它：    D 等；

```java 
package src.com;
import java.util.Scanner;
import java.util.Vector;

import org.junit.Test;

public class Demo {
  public static void main(String[] args) {

    // 1. 实例化 Scanner 用于从键盘获取学生成绩
    Scanner scan = new Scanner(System.in);

    // 2. 创建vector对象 相当于原来的数组
    Vector<Integer> v = new Vector<Integer>();

    // 定义最大值
    int maxScore = 0;

    // 3. 通过循环的方式给vector中添加数据
    for(;;) {
      System.out.println("请输入学生成绩(输入负数表示结束)");
      int score = scan.nextInt();

      // 3.2 当输入是负数的时候跳出循环
      if(score < 0) { break; }
      if(score > 100) { 
        System.out.println("成绩非法, 请重新输入");
        continue; // 因为成绩非法 跳过这次 存储操作
      }


      // 3.1 添加操作 v.addElement(Object obj)
    - 将成绩添加到 Vector 中 在jdk5.0之前
    - 我们要添加到Vector中必须使用new Integer的形式创建包装类 
    - 将成绩转为包装类对象再放入到Vector方法中 
    // Integer inScore = new Integer(score)  
    // v.addElement(Object obj)
    // v.addElement(inScore)
        - 转为对象后就可以放进去了    
      
      // 自动装箱
      v.addElement(score);

      if(maxScore < score) {
        maxScore = score;
      }
    }

    // 遍历Vector 得到每个学生的成绩 并与最大成绩比较 得到每个学生的等级
    char level;
    for(int i=0; i<v.size(); i++) {

      - 我们取出来的是一个 object类型的 
      - 因为我们放里放的时候就是Object类型 取的时候也是这个类型 
      - 但是我们要转成int型的包装类 所以下面要强转
      Object obj = v.elementAt(i);

      - 我们要将对象转为基本数据类型 与最大值比较 得到学生的等级
      - jdk5.0之前
      - Integer inScore = (Integer)obj
      - int score = inScore.intValue()

      // 5.0之后
      // 这里正常应该先拆成包装类 然后再拆成int
      int score = (int)obj;

      if(maxScore - score <= 10) {
        level = 'A';
      } else if(maxScore - score <= 20) {
        level = 'B';
      } else if(maxScore - score <= 30) {
        level = 'C';
      } else {
        level = 'D';
      }

      System.out.println(level);
    }
  }
}
```

----------------------------

### static 关键字
- static关键字修饰一个变量 不归每一个具体的对象所有 而是大家共享
<!-- 
  当我们编写一个类的时候 其实就是在描述其对象的属性和方法 而并没有产生实质上的对象 只有通过new关键字才会产生出对象 这时系统才会分配内存空间给对象 其方法才可以供外部调用 我们有时候希望无论是否产生了对象或无论产生了多少对象的情况下

  --- 某些特定的数据在内存空间里只有一份 ---
  --- 有些时候希望一个属性不归具体的对象所有 ---

  例如所有的中国人都有个国家的名称 每一个中国人都共享这个国家的名称 不必在每一个中国人的实例对象中都单独分配一个用于代表国家的名称变量
 -->


> static: 静态的
- 主要是用来修饰类的内部结构的 它会随着类的加载而加载 *不能修饰构造器*
<!-- 
  构造器处于 类 和 对象 链接的位置上
  左侧是随着类加载的结构是static
  右侧是随着对象的创建而加载

  构造器是用来区分左边和右边的 中间的构造器就不要static修饰了

                    构
  --- 类的加载 ---   造   --- 对象的创建 ---
                   器
 -->

- static: 可以用来修饰： *属性* *方法* *代码块* *内部类*


> static 修饰属性
- 静态变量(变量分为局部变量和属性 static只能修饰属性)
- 属性按是否使用 static 修饰 分为
  - 1. 静态属性
  - 2. 非静态属性(实例变量 或 实例属性)
<!-- 
  实例变量:
  没有用static修饰的属性就是 实例变量
 -->

> 实例变量
- 我们创建了类的多个对象 每个对象都独立的拥有一套类中的非静态属性
<!-- 
  实例 实例 实例的对象 是归实例化的对象所有的变量 
 -->

- 要点:
- 当修改其中一个对象中的非静态属性时 不会导致其它对象中同样的属性的值的修改


> 静态变量(类变量)
- 比如我们创建了类的多个对象 *多个对象共享同一个静态变量*
- 当通过某一个对象修改静态变量时 会导致其它对象调用此静态变量时 是修改过的

```java 
public class StaticTest {

  public static void main(String[] args) {

    Chiness c1 = new Chiness();
    Chiness c2 = new Chiness();

    c1.nation = "CHN";
    System.out.println(c2.nation);
          -- 不是空 而是 CHN
  }
}

class Chiness {
  static String nation;
}
```

- 我们可以这么理解 static
- 一个家 很多房间 每一个房间就相当于一个对象 房间内的设备是对象中的一个个属性(实例变量) 而厨房和卫生间是共享的(静态变量)


> static修饰属性 - 其它说明
- 静态变量(类变量) 跟具体的对象没有关系了 而是归类所有
- 1. 静态变量随着类的加载而加载 可以通过*类.静态变量*的方式调用
- 2. 静态变量的加载要早于对象的创建
<!-- 
  以前说过 实例变量在我们new完以后 就在堆空间中加载到对象内部了
  也就是说实例变量是随着对象的创建而加载的

  现在是静态变量随着类的创建而加载的 也就是数静态变量的加载 会早于 实例变量的加载
 -->

- 3. 由于类只会加载一次 则静态变量在内存中也只会存在一份 存在方法区的静态域中
<!-- 
  jvm会将整个类加载到方法区 它会把类本身缓存起来 只要我们用这个类 它还都在

  除非我们把java虚拟机关掉 或者 缓存不足的时候 否则类会一直在
  也就是说 在类的生命周期中 static修饰的结构就一份
 -->

- 4. 类.实例变量 
- 不能通过类去调用实例变量


> 静态属性举例
- System.out
- Math.PI


- 以前我们说过要想使用类中的属性 我们要先创建当前类的对象 通过对象.属性的方法我们去调用 现在需要做一些调整

- 对于非静态的属性 
  我们在调用属性的时候 要先通过实例化对象 通过 对象.属性 的方式调用

- 对于静态的结构
  我们就不用去造对象了 直接可以通过类去调用(通过对象调也行)


> 静态变量 和 实例变量的内存解析
<!-- 
  class Chinese {
    String name;
    int age;
    static String nation;   // 静态
  }

  执行步骤
  - 1. Chinese.nation = "中国";
  - 2. chinese c1 = new Chinese();


  栈结构             堆结构
  ---------        ---------
  栈: 局部变量       堆: 存放 new出来的结构: 对象和数组

  c1        →       name:null / age:0
                    name: "张三"    age: 40
                        -- 张三其实是放在常量池中的 这里存放的是地址值



                    方法区
                    ---------
                    方法区: 类的加载信息 静态域 常量池

                    执行步骤1
                    类一上来就加载了 所以类中的静态属性也会在这里被加载

                    nation: null;  默认值 后来修改为 中国
                        -- 静态属性就一份 哪个对象修改 修改的都是这里的nation
 -->


> static 修饰方法
- 使用 static修饰的方法 就是静态方法
- *操作静态属性的方法 通常设置为static的*
<!-- 
  也就是说但我们要操作静态属性的时候 我们要将方法声明为static的
 -->

- 1. 随着类的加载而加载 可以通过 类.静态方法 的形式来调用
- 2. *实例对象也可以调用静态方法* 

- 3. 
  静态方法: 
  - 只能调用静态的结构 静态属性 或 静态方法

  非静态方法:
  - 既可以调用调用非静态的方法或属性 也可以调用静态的方法或属性

- 4. 在静态的结构中 *不能使用this super关键字*

- 5. 对于静态属性和静态方法 在静态方法中调用的时候 可以 *省略 类名.* 
- 比如nation 直接写 nation 的时候 相当于省略了 Chinese.nation

```java
  System.out.println(nation)
  System.out.println(Chinese.nation)

  - 就跟 实例变量
  name == this.name 一样 省略了this

  - nation == Chinese.nation
  省略了 Chinese


  public static void walk() {

  }

  ---

  // 类中
  static String name;   // 静态属性
  int age;              // 非静态属性

  public static void main(String[] args) {
    name = "sam";   // 可以正常调用
    age = 18;       // 静态方法中这么写会编译错误
  }
```

- 6. 关于静态属性和静态方法的使用 大家都从生命周期的角度去理解
- 7. 类中的常量也常常声明为 static
- 这个常量就是 针对每个对象来讲 都是这个值 所以让所有对象都共享这一个就可以了


**注意:**
- static 中 不能写 this 关键字 因为this是当前对象 
- eat方法是实例对象的 在静态方法里的时候 还没有对象呢

```java 
  public static void show() {
    eat();      // 报错

    eat(); == this.eat();  // 也说明静态方法中不能写this
  }
```

- super也是 在static中不能写 super 关键字 
- 因为super也是必须有当前对象了 基于当前对象的父类 静态结构中 还没有对象呢 所以也不能使用super


> 类的销毁
- 当内存中不会再使用类的时候 如果内存足够 那就是当jvm停下来的时候 那我们就会把类的加载也在内存中进行销毁

- 一开始类的加载是放在缓存区的 不会马上销毁掉 你再去用 再去加载
- 类加载的时间比较长 当jvm关掉以后 jvm加载的内存结构也就销毁了

- 这就是类的销毁 类销毁的时候 静态的结构也就销毁了 *静态结构完全是跟类的生命周期是同步的*
<!-- 
  非静态结构是跟对象是同步的
  也就是说 晚出生的可以调用早出生的 早出生的不能调用晚出生的
 -->


> static的应用场景:

- 在开发中 如何确定一个属性是否要声明为static的？
> 属性是可以被多个对象所共享的 不会随着对象的不同而不同 static

- 在开发中 如何确定一个方法是否要声明为static的？
> 操作静态属性的方法 通常设置为 static
<!-- 
  比如 静态属性的get set方法 也应该是静态的
 -->

> 工具类中的方法 习惯上声明为 static
<!-- 
  声明为static的方法后 就不用造对象了
  比如Math Arrays Collections 都是直接调用方法的
 -->


> 静态属性的get set方法示例：
```java 
  // 静态属性设置get方法的时候 不能加this
  public static double getInteresRate() {
    // 可以省略类名.
    return interesRate;
  }

  // 静态属性设置set方法的时候 要如下
  public static void setInteresRate(double interesRate) {
    Account.interesRate = interesRate;
  }

  public static double getMinMoney() {
    return minMoney;
  }

  public static void setMinMoney(double minMoney) {
    Account.minMoney = minMoney;
  }
```


> 练习1
- 编写一个类实现银行账户的概念 包含的属性有
  - 账号 密码 存储余额 利率 最小余额
- 定义封装这些属性的方法 *账号要自动生成*
- 编写主类 使用银行账户类 输入 输出3个储户的上述信息

- 考虑 哪些属性可以设计成static属性?
<!-- 
  账号 密码不行 存储余额 因为每个对象的账号密码应该不一样
  利率 最小余额 可以 因为大家都一样
-->

- 要点:
- 1. 要注意静态属性的get set方法中没有this只能同过类名的形式赋值
- 2. 实例对象身上的属性(非静态属性)我们才考虑在构造器中进行初始化
- 也就是说 静态属性一般不会在构造器中初始化

```java 
public class Account {
  
  private int id;
  private String pwd = "000000";
  private double balance;

  // 利率和最小余额都应该是共同的
  private static double interesRate;
  private static double minMoney = 1.0;

  // 因为账号要自动生成 用于自动生成id使用的
  private static int init = 1001;

  public Account() {
    // 自动生成账户 利用了static 初始值 init属性完成的
    id = init++;
  }


  // 实例对象有的属性 我们才考虑在构造器中初始化 静态的属性通常不会在构造器中进行初始化工作
  public Account(String pwd, double balance) {
    this.pwd = pwd;
    this.balance = balance;
    id = init++;
  }

  public int getId() {
    return this.id;
  }

  public String getPwd() {
    return this.pwd;
  }

  public void setPwd(String pwd) {
    this.pwd = pwd;
  }

  public double getBalance() {
    return this.balance;
  }

  // 静态属性设置get方法的时候 不能加this
  public static double getInteresRate() {
    return interesRate;
  }

  // 静态属性设置set方法的时候 要如下
  public static void setInteresRate(double interesRate) {
    Account.interesRate = interesRate;
  }

  public static double getMinMoney() {
    return minMoney;
  }

  public static void setMinMoney(double minMoney) {
    Account.minMoney = minMoney;
  }
}
```


> 练习2 static关键字的应用
- 需求：
- 1. 每创建一个圆 圆的id值 自增
- 2. 统计圆的个数

- 圆的属性:
- 半径: radius
- id

- 为了统计圆的个数(total) 和 id自增(init)
- 我们就可以考虑 让这两个属性 设置为static 这样所有圆共用total 每创建一个圆就total就会加1
<!--  
  如果不设置为static 那么每一个对象上都会有一个total 这样就不能统计了
 -->

- Circle类
```java 
class Circle {
  // 每个圆都有自己不同的半径 id 所以是非static的
  private double radius;
  private int id;


  // 统计圆的个数的属性 记录下造了多个圆
  private static int total;

  // 希望每造一个圆的对象的id值 是依次递增的 这个属性也设置为static
  // 多个对象共享
  private static int init = 1001;


  // 想让id属性为自动赋值 我们可以在构造器中完成逻辑
  public Circle() {

  /*
  能不能这么写?
  id = init
  不能
  这样的话 我们造的每一个对象的id就相同了 因为我们拿 静态属性init赋值的 这里可以让init++
  */

    // 第一次我们造对象的时候 是1001 第二次的时候就是1002
    id = init++;

    total++;
  }


  // 给半径赋值的构造器
  public Circle(double radius) {
    this();
    this.radius = radius;

      - 注意 这两个也要放进来 用这个构造器创建对象也要自动累加
      - id = init++;
      - total++;
      - 也可以在构造器最上面调用 this();
  }

  // 每个圆的面积不一样 所以求面积的方法也是非静态的方法
  public double findArea() {
    return Math.PI * radius * radius;
  }


  public double getRadius() {
    return this.radius;
  }

  public void setRadius(double radius) {
    this.radius = radius;
  }

  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  // total是静态变量 所以我们也要提供了一个静态的get方法
  public static int getTotal() {
    return total;
  }
}
```

- 测试类调用

```java 
public class Demo {
  public static void main(String[] args) {

    Circle c1 = new Circle();
    Circle c2 = new Circle();

    System.out.println(c1.getId());
    System.out.println(c2.getId());

    System.out.println("创建圆的个数为: " + Circle.getTotal());

  }
}
```

----------------------------

### 单例设计模式
- 设计模式：
- 设计模式是在大量的实践中总结和理论化之后优选的代码结构 编程风格 以及解决问题的思考方式

- 设计模式就像是经典的棋谱 不同的棋局 我们用不同的棋谱 免去我们自己再思考和摸索 *套路*


> 单例模式：
- 所谓类的单例设计模式 就是采取一定的方法保证在整个的软件系统中 对某个类只能存在一个*对象实例*。并且该类只提供一个取得对象实例的方法
<!-- 
  主要就是想创建一个对象
 -->

- 如果我们要让类在一个虚拟机中只能产生一个对象 我们首先*必须将类的构造器的访问权限设置为private* 这样 就不能用new操作符在类的外部产生类的对象了

- 但在类内部仍可以产生该类的对象 因为在类的外部开始还无法得到类的对象
- 只能*调用该类的某个静态方法*以返回类内部创建的对象 静态方法只能访问类中的静态成员变量 所以指向类内部产生的*该类对象的变量也必须定义成静态的*
<!-- 
  创建型模式 供5种
    工厂方法模式 抽象工厂模式 单例模式 建造者模式 原型模式
  
  结构型模式 供7中
    适配器模式 装饰器模式 代理模式 外观模式 桥接模式 组合模式 享元模式

  行为型模式
    策略模式 模板方法模式 管擦着模式 迭代子模式 责任链模式 命令模式 备忘录模式 状态模式 访问者模式 中介者模式 解释器模式
 -->


> 单例模式 -- 饿汉式实现
- 单例模式的核心 就是只打造一个对象

- 实现步骤:
- 1. 类内部私有化类的构造器 
- *避免在Bank类的外部调用构造器 创建对象*

- 2. 类内容提供 私有的静态属性 值为当前类的类型的 实例对象
- 类内部通过构造器创建实例对象 *创建的该对象 相当于类的属性*
```java
  // 下面 name 和 bank 都是类的属性
  class Demo {
    name = "sam"
  }

  class Demo {
    // 静态属性 Bank类类型 值为Bank的实例对象
    private static Bank bank = new Bank();
  }
```

- 3. 提供公共的静态方法 返回类内部创建的实例对象
- *注意：创建的实例对象 和 对外提供的get方法都必须是static*

- 因为在类内部创建的static 静态属性是公共的 唯一的 类外部不管怎么调用修改 改的都是同一个 想想厕所的例子

```java  
// 测试类调用
public class Demo {
  public static void main(String[] args) {

    // 返回的就是一个Bank实例对象
    Bank bank = Bank.getInstance();

    // 再次调用 Bank.getInstance() 
    // 得到的还是我们Bank类中唯一new的那个对象
    Bank bank2 = Bank.getInstance();

    // bank1 == bank2;  true
  }
}

// 单例银行类 只造一个对象
class Bank {

  // 1. 私有化类的构造器
  // - 目的: 避免在Bank类的外部调用构造器
  private Bank() {}

  // 
  // 2. 内部创建类的对象
  - 私有化构造器后 外部没办法造对象了 那只能在Bank类内部造对象
  - 实例对象也相当于类的一个属性了 跟int name = “sam” 没区别
  private static Bank instance = new Bank();

  // 3. 提供公共的方法 返回类的对象
  // 但是在类的外部怎么调用该方法 方法是非静态的 如果要在类的外部调用的话 得创建类的对象 但是单例模式还没办法创建 怎么处理？ 

  // 将方法声明为static 这样我们就可以通过类去调用getInstance()
  public static Bank getInstance() {

    // 静态方法中只能调用静态的结构 所以创建的 instance 对象也必须是static类型的
    return instance;
  }

  // 注意 类内部实例化的对象 和 对外暴露提供实例对象的get方法都必须是静态的 因为静态方法中只能用静态属性 所以必须都是静态的
}


// 饿汉式的另一种实现方法 使用了静态代码块
class Order {
  private Order() {}
  private static Order instance = null

  static {
    instance = new Order();
  }

  public static Order getInstance() {
    return instance;
  }
}


// 饿汉式的另一种实现方法 使用了final
class Bank {
  private Bank() {}
  public static final Bank instance = new Bank();
}
```
- 外部通过类名调用该 instance 属性 
- Bank bank1 = Bank.instance

- 因为是static 所以静态域中就一个对象
- 因为是final 所以我们没有办法修改 所以它也是个单例


> 单例模式 -- 懒汉式实现
- 和饿汉式单例模式的区别就在于 懒汉式在类中先声明(类中方法外) 
- 然后在方法中 进行了判断 如果为空再赋值

```java 
class Bank {

  // 1. 私有化类的构造器
  private Bank() {}

  // 2. 先声明当前类的实例对象 此对象也必须是 static 但没有初始化
  private static Bank instance = null;

  // 3. 声明public static的返回当前实例对象的方法
  public static Bank getInstance() {
    if(instance == null) {
      instance = new Bank();
    }

    return instance;
  }
}
```

- 啥时候用啥时候造 这叫懒
- 一上来就造好 这叫饿


> 区分饿汉式 和 懒汉式
> 饿汉式:
- 坏处 对象加载时间过长
- 好处 线程是安全的 天然就是安全的
<!-- 
  比如有一张票 21 三个人同时买 在一个恰好的时间点 可能会同时进入if判断
  造成3个人都买到票

  饿汉式的线程天然就是安全的
 -->

- 延伸:
- static的好处是 内存中只占一份 已经提前有了 随时能用 效率上快
- 弊端就是生命周期过长 当类被清掉的时候 结构才会被清掉

> 懒汉式:
- 优点: 延迟对象的创建
- 缺点: 线程不安全 当到多线程的时候 再修改
<!-- 
  我们在使用懒汉式的时候 要写线程安全的那版 虽然现在还没有学
 -->

----------------------------

### 单例模式的使用场景
- 由于单例模式只生成一个实例 减少了系统性能开销 当一个对象的产生需要比较多的资源的时候

- 如读取配置 产生其它依赖对象时 则可以通过在应用启动时直接产生一个单例对象 然后永久驻留内存的方式解决

<!-- 
  在java中有一个类 java.lang.Runtime 就是典型的单例模式

  每创建一个java程序的之前都需要有运行时这个环境
 -->

> 应用场景

- 1. 网站的计数器：
- 一般也是单例模式实现 否则难以同步
<!-- 
  流量信息等
 -->

- 2. 应用程序的日志应用：
- 一般都使用单例模式实现 这一般是由于共享的日志文件一直处于打开状态 因为只有一个实例去操作 否则内容不好追加

- 3. 数据库连接池：
- 这个设计一般也是采用单例模式 因为数据库链接是一种数据库资料

- 4. 读取项目配置文件的类：
- 项目中 读取项目配置文件的类 一般也只有一个对象 没有必须每次使用配置文件数据 都生成一个对象去读取

- 5. application也是单例的典型应用
<!-- 
  应用程序刚装好之后 应用程序没有开 点一下后应用程序就运行起来了 只要应用程序运行起来之后就有一个进程了

  一个进程可以理解为一个应用程序 在整个应用程序运行的过程中只会有一个类叫做application
 -->

- 6. windows的task manager(任务管理器)就是很典型的单例模式

- 7. windows的recycle bin(回收站) 
- 也是典型的单例应用 在整个系统运行过程中 回收站一直维护着仅有的一个实例

----------------------------

### main方法的语法
- 1. main() 方法作为程序的入口
- 2. main() 方法也是普通的静态方法 也可以通过类.的形式来调用(那就当做普通的方法来调用了)
<!-- 
  public static void main(String[] args) { }

  - 我们说一个源文件中只能有一个 public 的类
  - 其中每一个类中都可以有一个 main方法
  - 我们在运行程序的时候 会选择把哪个main方法当做程序的入口
 -->

- 3. main()方法是一个静态方法 当中能使用的只有静态属性 所以以前老师说要想在main方法中调用对象的属性 必须要先造一个对象的原因就是这样
```java  
  public static void main(String[] args) {

    // 静态方法里面只能调用静态属性 所以非静态的属性只能通过对象来调用
    Demo d = new Demo();
    d.show();
  }

  // 以后我们可以考虑把方法定义为静态方法 这样在mian方法中直接调用了 因为静态方法可以被类直接调用
```

- 4. main() 方法的形参String[] args也可以作为我们与控制台交互的一种方式
<!-- 
  之前我们都使用 Scanner
  使用 Scanner 可以从控制台获取 用户输入

  我们直接main方法也可以完成相应的逻辑
 -->

- 命令行的方式 利用mian方法的形参 与控制台进行交互
> java 类名 参数
- 运行的时候传入参数 并不是编译的时候传入(javac)
- 通过命令行的方法 带入的参数就会被main方法中的形参接收到
- 注意:
- 这时候的形参的类型是 String类
- 如果有数字需要进行运算的话 需要将String类型的数字转换为int型的

- *Integer.parseInt(args[i])*

```java  
  - 如果直接输入 会报无法加载主类的错误
  - java Demo

  - 这时候我们需要将Demo.java文件的首行的package删掉再次运行
  - java Demo

  public static void main(String[] args) {
    
    // 通过命令行 接收参数
    for(int i=0; i<args.length; i++) {
      System.out.println("****" + args[i]);

      - 假如我们通过命令行输入的是数字 并想让数字进行运算 
      - 我们需要转换成int型
      int num = Integer.parseInt(args[i]);
      System.out.println("####" + num);
    }
  }
```


> public static void main(String[] args) {}
- public -- 权限修饰符
- private 缺省 protected public

- static -- 修饰符
- static / final / abstract / native 可以用来修饰方法

- void -- 返回值类型
- 返回值类型: 无返回值 / 有返回值

----------------------------

### 代码块(初始化块)
- 代码块的功能是用来做初始化的

- 代码块属于面型对象的三条主线中的第一条
- 类和类的成员 -- 属性 方法 构造器
- 除了上面的三个常用的结构外 我们还可以定义 代码块 和 内部类 

> 代码块
- 我们可以把代码块理解成方法体

- 格式：
- 直接使用 { } 声明在类的内部
    {
      
    }

- 作用：
- 用来初始化类 或者 初始化实例对象 也被称为初始化块

- 代码块的修饰符 只有 *static 和 缺省*
    static {

    }

    或 缺省

    {

    }

> 类的结构示例:
```java  
// Person类
class Person {

  // 属性
  String name;
  int age;
  static String desc = "我是一个人";

  // 构造器
  public Person() {}
  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  // 代码块
  - 当Person类被加载的时候 该代码块中的逻辑自动输出
  static {
    System.out.println("hello static block");
  }

  {
    System.out.println("hello block");
  }


  // 方法
  public void eat() {
    System.out.println("吃饭");
  }

  @Override
  public String toString() {
    return "{" +
      " name='" + name + "'" +
      ", age='" + age + "'" +
      "}";
  }
}
```

- 要点:
- 我们在Person类中定义了静态属性 static desc

    String desc = Person.desc;

- 当我们执行上面的语句的时候 或者说当我们使用一个类的时候 类就会加载到内存中

- 上面的赋值操作 Person类就会被加载到内存中 Person类加载到了内存中 那么整个Person类中的静态结构都会加载到内存中(静态属性和静态方法会随着类的加载而加载)

- 同理 *静态的代码块* 也会被加载到内存中 静态代码块中的逻辑会随着类的加载而自动被调用 

```java  
// Person类的测试类
public class Demo {
  public static void main(String[] args) {

    // 这时候我们发现 当Person类被加载到内存中的时候
    - 静态代码块中的语句就输出了
    String desc = Person.desc;
  }
}
```


> 分类:
> 静态代码块:
- 1. 代码块内部可以有输出语句
- 2. 静态代码块 随着类的加载*自动执行*
- 3. 静态代码块中的逻辑只会执行一次 执行的实际就是类加载的时候
<!-- 
  只要当前的类没有重新加载 它就不会重新执行
 -->

- 4. 作用：
- 初始化当前类的信息 对类中静态的属性进行赋值
```java  
  static String desc = "我是一个人";

  static {
    System.out.println("hello static block");
    desc = "我是一个爱学习的人";
  }

  - 输出结果是 静态代码快中的结果
```

- 5. 静态代码块可以在类中定义多个 按照声明的先后顺序执行
- 6. 静态代码块的执行要优先于非静态代码块的执行
- 7. 静态代码块只能调用静态结构


> 非静态代码块:
- 1. 代码块内部可以有输出语句
- 2. 非静态代码块 随着对象的实例化(对象的创建)而*自动执行*
- 3. 每创建一个对象 就执行依次非静态代码块
<!-- 
  那是不是说我们创建对象的时候非静态代码块可以帮我们做一些事情
 -->

- 4. 作用：
- 在创建对象时 对对象的属性等进行初始化
- 也就是说我们的属性赋值 又多了一个位置

- 属性赋值的位置
- 1. 默认初始化
- 2. 显示初始化
- 3. 构造器中初始化
- 4. 对象.属性 或 对象.方法的形式赋值
- 5. 代码块中赋值

```java  
  public static void main(String[] args) {

    // 类加载的时候 静态代码块自动执行
    String desc = Person.desc;

    // 对象实例化的时候 非静态代码块自动执行
    Person p = new Person();

  }
```

```java  
  {
    System.out.println("hello block");
    age = 20;
  }
```

- 6. 非静态代码块也可以定义多个 按照先后声明的顺序执行
- 7. 非静态代码块中可以调用静态结构


- 代码块的出现 相当于对属性赋值多了一种方式 因为还有很多种别的赋值方式 所以代码块在开发中使用的情景不是特别高


> 练习
- 简单看一下static的应用
```java  
  class Person {
    public static in total;

    static {
      total = 100;
      System.out.println("in static block!")
    }
  }

  public class PersonTest {
    public static void main(String[] args) {
      System.out.println("total =" + Person.total );
      System.out.println("total =" + Person.total );
    }
  }

  // 输出
  in static block  
  total = 100
  total = 100
```


> 练习
- 创建了 Root 基类
- 创建了 Root基类的子类 Mid Root - Mid
- 创建了 Root - Mid - Leaf

- Root
  - 静态代码块 - 非静态代码块 - 无参构造器

- Mid
  - 静态代码块 - 非静态代码块 - 无参构造器 - 带参构造器msg

- Leaf
  - 静态代码块 - 非静态代码块 - super(msg)构造器

- 然后我们观察下这些的输出的执行顺序是什么

```java  
  class Root {
    static {
      System.out.println("Root的静态初始化块")
    }

    {
      System.out.println("Root的非静态初始化块")
    }

    public Root() {
      System.out.println("无参构造器")
    }
  }


  // 子类
  class Mid extends Root {
    static {
      System.out.println("Mid的静态初始化块")
    }

    {
      System.out.println("Mid的非静态初始化块")
    }

    public Mid() {
      System.out.println("Mid的无参构造器")
    }

    public Mid(String msg) {
      // 通过this调用同一类中重载的构造器
      this();
      System.out.println("Mid的带参数的构造器 其参数值" + msg)
    }
  }


  // 子类的子类
  class Leaf extends Mid {
    static {
      System.out.println("Leaf的静态初始化块")
    }

    {
      System.out.println("Leaf的非静态初始化块")
    }

    public Leaf() {
      // 通过super调用父类中一个字符串参数的构造器
      super("尚硅谷")
      System.out.println("Leaf的构造器")
    }
  }


  // 测试类
  public class leadTest {
    public static void main(String[] args) {
      new Leaf();
    }
  }
```

- 解析：
- *从入口程序开始* 
- 1. new Leaf(); -- 会到Leaf类
- 2. 一new子类(Leaf)的时候先调子类构造器 但别忘了会先看到父类的东西 因为继承的情况下 构造器中第一行默认就是 super()
```java   
  public Leaf() {
    super("尚硅谷")
    System.out.println("Leaf的构造器")
  }
```

- 3. 然后我们会到父类Mid的带参构造器 带参(msg)构造器上来就调用this()也就是本类的无参构造器

- 而Mid的无参构造器中第一行默认有super()
```java  
  public Mid(String msg) {
    this();
    System.out.println("Mid的带参数的构造器 其参数值" + msg)
  }

  public Mid() {
    System.out.println("Mid的无参构造器")
  }
```

- 4. 因为Mid的无参构造器中第一行默认有super()然后会直接跑到Root里面

- 5. 因为Mid的无参构造器 super() 调用 Root的无参构造器会被调用  而无参构造器的第一行默认又是一个super() 所以还会跳到 Root的父类 因为Root的父类没有显式的写 但是也会加载Object类中的结构
```java  
  public Root() {
    System.out.println("无参构造器")
  }
```

- Object加载结构  
    ↓
- Root加载结构

- Root加载结构后自动调用静态代码块
```java  
  System.out.println("Root的静态初始化块")
```
    ↓
- Mid加载结构 自动调用静态代码块
    ↓
- Leaf加载结构 自动调用静态代码块
    ↓
- 也就是先让Root Mid Leaf的静态代码块先跑一遍
    ↓
- 然后我们真正的到new Leaf()的逻辑 这时候就涉及到 Leaf里面的构造器 和 Leaf里面的非静态代码块 它俩之间又是谁先执行 谁后执行呢

> 代码块的执行要先于构造器

- 答案
<!-- 
  Root的静态初始化块
  Mid的静态初始化块
  Leaf的静态初始化块
      -- 静态的先加载完

  Root的普通初始化块
  Root的无参构造器

  Mid的普通初始化块
  Mid的无参构造器
  Mid的带参数构造器 msg

  Leaf的普通初始化块
  Leaf的构造器
 -->

- 执行完静态之后 还是从父类开始 因为*代码块要先于构造器* 在调用父类的构造器之前 先把非静态的代码块先执行一下

- 然后再执行向下子类按照上面的逻辑


> 总结：
- 由父及子 静态先行

```java  
  // Main方法也是静态的方法 里面的逻辑也是得通过类去调用 类调用之前类需要先加载
  public static void main(String[] args) {
    System.out.println("777777")
    System.out.println("******")
    new Son()
  }

  // Sys会等调用main的时候执行 new Son()被加载到内存中 那么Son类的一系列父类加载 父类中的静态代码块 和 非静态代码块中的逻辑就会先执行
```


> 属性赋值的先后顺序
- 我们上面又解除了 代码块中也能给属性赋值 那么这些地方赋值的先后顺序是什么

  - 1. 默认初始化
  - 2. 显示初始化
  - 3. 构造器中初始化
  - 4. 有了对象后 通过.属性 .方法的形式 赋值
  - 5. 在代码块中赋值

- 在代码块之前 属性赋值的先后顺序是
- 1 - 2 - 3 - 4

- 有了代码块之后的的属性赋值的顺序？
- 1 - 2/5 - 3 - 4
<!-- 
  2/5
  只要看2和5书写的顺序的
  2要是在5的上面 那么就是 1 2 5 3 4
  5要是在2的上面 那么就是 1 5 2 3 4 

  通常在实际开发中 不会一上来就写代码块的
  通常都是先声明 后代码块
 -->
  
----------------------------

### final 关键字
- 英文翻译： 最终的

> final 可以用来修饰的结构
- 类 方法 变量
- 那我们都可以理解为最终的类 最终的方法 最终的变量


> final修饰类 
- 替代 public 的位置
  final class Person {

  }

- final修饰的类 叫做最终的类(太监类) *此类不能被其它的类所继承*
<!-- 
  比如 String类 System类 这些类都被声明为final类
  所以上述的类都不能被技能
 -->


> final 修饰方法
- 声明为final的方法 此方法不可以被重写
```java  
  class Person {

    // final修饰的方法不能被子类重写
    public final void show() {}
  }

  class Student extends Person {

    // 不能重写父类的show方法
    public void show() {}
  }

  - 比如 Object类中的getClass（） 获取当前对象所属的类
  - 该方法就是final的 不能被重写
```


> final 修饰变量(属性属于变量的一部分)
- 用final修饰的变量 会成为一个常量 也就是该变量不能再变了
- 用final修饰的属性 属性名一般大写

```java  
  final int WIDTH = 10;

  width = 20;   // 不能被修改
```

> final修饰属性: 
- 可以考虑的赋值位置有
- 1. 显示初始化

```java  
  final int WIDTH = 10;
```

- 2. 代码块中赋值
```java  
  final int WIDTH;
  {
    WIDTH = 20;
  }
```

- 3. 构造器中赋值 有多个构造器的时候 每个构造器都要给final修饰的属性赋值

```java  
  final int WIDTH;
  public Demo() {
    WIDTH = 20;
  }

  public Demo(int num) {
    WIDTH = num;
  }
```

- 如果对象的值都是一样的 那么我们就使用显示初始化的方式赋值
- 如果对象的值不一样 那么我们就是通过构造器来赋值
- 如果赋值是一段逻辑后才能给属性赋值 那么我们就在代码块中处理


> final 修饰局部变量
- 局部变量有两种:
- 1. 方法内声明的局部变量

```java 
  public void show() {
    // num被final修饰后就属于常量了
    final int NUM = 10;

    // 类似如下的操作就不好用了
    // NUM += 20;
  }
```

- 2. 形参
- 形参的赋值是调用的时候才赋值 赋值后就不能再改了 因为是final
- 赋值后只能调用 不能在方法内再对它进行修改

```java 
  public void show(final int num) {
    实参赋值后 num不能再被修改了
  }
  show(20)
```

- 尤其是使用final修饰形参时 表明此形参时一个常量 当我们调用此方法时 给常量形参赋一个实参 一旦赋值以后 就只能在方法体内使用此形参 但不能进行重新赋值

- final修饰一个结构 称之为最终的

> static final 全局常量
- static final 可以用来修饰: 属性 方法
- static final 修饰的属性 称之为 全局常量
- 一般接口中的属性都是 全局常量 的
<!-- 
  - 我们在实际开发的时候也会发现 static final 的形式

  - static 体现了 随着类的加载而加载
  - final 体现了 不能变


  如果属性时一个final的 而是还显示赋值了
  final int num = 10;

  如果我们不用static修饰 就意味是非静态的 那就意味是它是随着对象的创建而加载的 而且在堆空间中每个对象就一份

  每个对象都各有一份还都是一样的 那就没必要放在实例对象中了 干脆用static修饰得了
  static final int num = 10；
 -->

- final修饰的属性常常和static搭配在一起

> static final 修饰方法：
- 该方法只能通过类来调用 不能被重写
- 一般自己定义方法用final来修饰的情况比较少
- 但是我们修饰属性 且需求是这个属性不能变的 那么我们就使用final来修饰


> 练习
- 看看下面的两道练习题

```java
  public class Something {
    public int addOne(final int x) {

      return ++x;
        - 不行 常量不行

      return x + 1;
        - 可以 x没有变 我们只是返回x+1以后的数

    }
  }
```

```java
  public class Something {
    public static void main(String[] args) {
      Other o = new Other();
      new Something().addOne(o);
    }

    public void addOne(final Other o) {

      o = new Other();
        - 不行

      o.i++;
        - 可以 

    }
  }

  class Other {
    public int i;
  }
 ```

----------------------------

### native 关键字
- 英文翻译: 本地的
- 声明为native的方法 方法体是底层的c或c++ 不会用java代码来实现 相当于隐藏了一样
<!-- 
  public final native Class<?> getClass();
 -->

- 关键字的意思是
- 我需要调用底层的c或c++

----------------------------

### 抽象类与抽象方法 abstract
- 随着继承层次中一个个新子类的定义 类变得越来越具体 而父类则更一般 更通用

- 类的设计应用保证父类和子类都能共享特征(因为继承性父类的功能子类能拿到) 有时将一个父类设计的非常抽象 以至于它没有具体的实例 这样的类叫做 *抽象类*

- 解释下
<!-- 
      Person
    ↙    ↓    ↘
  官员  农民  老师...

  一开始我们在Person中还是定义了功能的 属性和方法都有 而且开发中也会new Person

  但是后来我们创建的子类越来越多 越来越丰富 这些子类在继承父类的时候还进行了重写 有自己特有的属性和方法
  这样的子类的功能肯定比父类的功能要强大 最起码跟父类一样 这样就导致我们在开发中应用的时候 我们要具体用人的时候 我们都看看具体要用哪种人

  然后我们都会new子类的对象了 以至于后面我们都不去new Person了
  既然这样我们以后人的类就不在造对象了 父类不再造对象了

  怎么证明父类不再造对象了呢？ 我们需要拿一个关键字去修饰 这个关键字就叫做 abstract

  用该修饰符修饰的类 就不能实例化对象了(不能 new Person) 你要想造对象 因为你都继承了Person了   那你就去造子类的对象
 -->

- 首先要理解的是:
- 抽象类也是一个类 是一个父类 它必须要被继承
- 抽象类中的方法必须要被重写
- 抽象类更像把父类定义成了一个标准 具体的功能(方法)需要子类自己去实现
- 抽象类多态性的体现 我们在形参中定义为抽象类类型 这样就是多态性的体现 因为我们传入的必须是抽象类的子类对象


> abstract 关键字的使用
- abstract可以修饰: *类 和 方法*
- 使用该关键字的类 不能实例化
- 使用该关键字的方法 一定要重写


> 抽象类
- 一旦使用 abstract 修饰类了 那么该类就*不能实例化对象*了
- 抽象类中一定有构造器, 便于子类对象实例化的时候调用
- 开发中 都会提供抽象类的子类 让子类对象进行实例化 完成相关的操作
<!--  
  都会提供抽象类的之类 如果不提供那么抽象类就很尴尬了 自己又不能造对象
 -->

```java
// 下面的代码会报错 因为Person 被修饰成了抽象类 就不能实例化对象p了
abstract class Person { }
Person p = new Person();
```

> 抽象的使用前提 -- 继承性
- 假如我们定义了一个结构叫做抽象 它使用的前提 我们需要提供它的子类 就依托于继承性 只要看到抽象类了 那肯定有它的子类 也就是说我们想使用抽象类 那么必须要new 它的子类对象


> 抽象类的 -- 多态性
- 抽象类的多态性的体现 可以从方法的形参上看 形参定义为抽象类 类型的
- 下面方法的形参是抽象类 类型的
- 我们传递实参的时候 一定是抽象类的子类的对象
```java
// 方法的情况
public void method(抽象类 p) { }

// 声明的情况 声明的时候是抽象类 那么右侧肯定也是抽象类的子类
抽象类 p = 抽象类的子类
```

> 从声明的位置看多态还是继承的体现
- 也就是说 我们声明的时候 声明的是父类类型 那么就是多态性的体现
- 如果声明的是子类的类型 那就不是多态性 只是继承性的体现


- 思考：
- 父类被abstract修饰后 不能实例化对象了 也就是说 我们没有办法通过构造器实例器对象了 那么父类Person中的构造器还有用么？

- 虽然Person自己不能使用构造器实例化对象了 但是子类实例化子类对象的时候*一定会调用父类的构造器*

```java
// 父类
abstract class Person {
  public Person() {}
  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
}

// 子类
class Student extends Person {
  public Student(String name, int age) {
    super(name, age);
  }
}
```


> 抽象方法
- 使用 abstract 关键字修饰方法 方法可以没有方法体 子类必须实现抽象方法
- 抽象方法只定义了一种功能的标准 具体的执行 需要子类去实现
 
- 1. 抽象方法只有方法的声明 没有方法体

```java
  public void eat() {
    System.out.println("吃饭");
  }

  // 抽象方法
  abstract public void eat();
```

- 2. 抽象方法必须在抽象类中 包含抽象方法的类一定是抽象类

- 3. 只有子类重写了父类中的所有抽象方法后 子类才可以实例化
- 若子类没有重写父类中所有的抽象方法 则该子类也是一个抽象类 必须使用abstract去修饰下
<!-- 
  ts中说 抽象方法就是让子类去重写的

  因为如果有没重写的抽象方法 那么该子类也得是一个抽象类 因为抽象方法只能存在于抽象类中
 -->


**注意:**
- 是重写父类中的所有抽象方法 不仅仅是父类 间接父类中的抽象方法在子类中也必须要重写

```java
  abstract class Creature {
    public abstract void breath();
  }

  abstract class Person extends Creature {
    public abstract void eat();
  }

  - 请问Person类有几个抽象方法？ 2个 一个是自己的 一个是继承父类的

  - 那么就意味着Student就要重写父类和间接父类中的抽象方法

  class Student extends Person {
    // 重写父类中的所有方法
    public void breath() { ... }
    public void eat() { ... }
  }
```


**体会:**
- 我们在使用抽象类的时候 实际上就是继承该抽象类 实现抽象类中定义的方法


> abstract抽象的 应用场景
- 在上面的一个案例中
- 有一个几何图形的类 然后有圆形 和 长方形的子类
- 父类中定义了求面积的方法 但是因为圆形和长方形的面积公式不一样 父类的求面积的方法比较难写(因为不知道图形是什么) 
- 求面积的方法不知道怎么定义才好 我们就直接 return 0.0 然后要求子类去重写该方法
```java

// 父类 类内部有抽象方法 那么该类也必须是抽象类
public abstract class GeometricObject {

  // 求面积的方法
  public double findArea() {
    return 0.0
  }

  // 这时候该方法就可以设置为抽象方法
  public abstract double findArea();
}
```

- 之前return 0.0的时候 我们子类中需要记得点 findArea方法需要在子类中重写
- 但是定义为 abstract 之后 不重写一定会提示报错


> abstract 使用时候的注意点
- 1. abstract不能用来修饰 *属性* *构造器* 等结构
- 2. abstract不能用来修饰 
  - 私有方法(private) 
  - 静态方法(static) 
  - final的方法
  - final的类

<!-- 
  私有方法的原因:
    因为声明为 private 的方法 不能被重写 所以没有办法设置为 abstract

  静态方法的原因:
    当初我们说重写的时候 就说过只有非静态的方法才能被重写
    如果父类有一个静态方法 子类也有一个静态方法 同名同参数的
    我们不认为这两个方法是覆盖
 -->


> 抽象性的练习
- 1. 为什么抽象类不可以用final关键字声明
- 抽象类都要求子类去继承 final代表不能继承 冲突

- 2. 抽象类中可以定义构造器么？
- 可以 子类造对象的时候 会默认调用父类的构造器去加载父类的属性和方法

- 3. 是否可以这样理解 抽象类就是比普通类多定义了抽象方法 除了不能直接进行类的实例化操作之外 并没有任何的不同？
- 也可以这样想

- 4. 编写一个Employee类 声明为抽象类 包含三个属性
  name id salary
- 提供必要的构造器和抽象方法: work()
- 对于Manager类来说 他即是员工 还具有奖金 bonus 的属性
- 请使用继承的思想 设计CommonEmployee类和Manager类 要求类中提供必要的方法进行属性访问

```java
public abstract class Employee {
  private String name;
  private int id;
  private double salary;

  public Employee() {
    // 即是不显式的写出来 默认也会调用super
    super();
  }

  public Employee(String name, int id, double salary) {
    this.name = name;
    this.id = id;
    this.salary = salary;
  }

  // 方法通常定义为public
  public abstract void work();
}


// 哪怕是老大也属于员工
public class Manager extends Employee {
  private double bonus;

  // 空参构造器
  public Manager() {}

  // 单独属性的构造器
  public Manager(double bonus) {
    this.bonus = bonus;
  }

  // 全部属性的构造器
  public Manager(String name, int id, double salary, double bonus) {
    super(name, id, salray);
    this.bonus = bonus;
  }

  // 重写抽象方法 就不用有 abstract关键字了
  public void work() {
    System.out.println("管理员工 提高公司运行效率")
  }
}

// 普通员工的类
public class CommonEmployee extends Employee {
  
  // 重写方法
  public void work() {
    System.out.println("员工在一线车间生产产品")
  }
}


// 测试类
public classs EmployeeTest {

  Manager manager = new Manager("sam", 1001, 20000, 20000);
  manager.work();

  // 如下的方式是多态的使用
  Employee manager = new Manager("sam", 1001, 20000, 20000);
    - 解析:
    - 为什么要使用多态
    - Employee类是一个抽象的类 当有一个方法的形参必须放一个抽象类作为参数的时候
    - 我们就使用利用多态的形式 声明一个父类型是抽象类(父类的类型具有通用性) 但是造的是子类的对象
    - 然后我们把这个对象丢到形参里面去
}
```


> 抽象类的匿名子类
- 之前我们介绍过 匿名对象 这个部分我们来了解下一下 匿名类

- 先回顾一下*匿名对象*的使用方式
```java
  public class PersonTest {
    public static void main(String[] args) {
      
      // 非匿名对象
      Student stud = new Student();


      // 匿名对象的传参方式
      method(new Student())
    }

    /*
    之前我们要是想在main方法中调用method方法 必须要new当前类的对象 通过对象来调用method方法
    我们也可以将下面的方法用static来修饰 这样可以直接在main方法中调用
    */

    // 将方法声明为static 这样main方法是静态方法 可以直接调用静态的结构
    public static viod method(Student s) {}
  }
```


- 然后我们再看下*匿名子类*的使用方式:

- 场景:
- Person类现在是一个abstract抽象类





```java
  public class PersonTest {


    // 测试类中定义一个方法 形参声明为抽象类形参 也可以理解为父类型 Person现在就是一个抽象类
    public static void method(Person p) {
      p.eat();
    }

      - 如上:
      - 我们在调用method方法的时候需要传递 Person抽象类子类对象 Person本身是抽象的 所以我们必须new一个Person子类的对象


    // 非匿名的类 和 非匿名的对象 正常的写法
    // 有名的类 有名的对象
    Worker worker = new Worker();
    method(worker);


    // 非匿名的类 但是对象是匿名的 匿名对象当实参来传递的
    // 有名的类 没有名的对象
    method(new Worker());

-------

    - 匿名类:
    - 我们看下下面的结构: =左边是对象 =右边是类
    Worker worker = new Worker();
           对象          类

    - 上面的示例属于 有名的对象 有名的类

    method(new Worker());
    - 上面的示例属于 有名的类 匿名对象

-------

    - 接下来我们看看:
    - 匿名类 又因为Person是一个抽象类 抽象类我们说的都是子类 所以又叫做 匿名子类

    Person p = 这里我们要new一个Person抽象类的子类对象 但是这里我们不像知道Worker或者是Student 我们不知道要new的子类的类名是什么

    - 当不知道我们要new哪个抽象类的子类的对象的时候我们可以这么写

    Person p = new Person();
    - 但是这么写显然是不对的 因为这么写相当于new了一个Person类 而Person本身是抽象类 不能够造对象 而且我们Person抽象类中有抽象方法

    - 所以我们匿名子类(不知道new抽象类的哪个子类) 要如下处理
    Person p = new Person() {
      // 重写抽象类中的抽象方法
    };

    - 上面的写法不要理解为我们new了一个Person 或者 new了一个抽象类对象 因为抽象类本身不能够造对象

    - 我们创建了一个 匿名子类的对象 该对象的名字叫做 p 该子类没有名字



    // 创建了一个匿名子类的对象 然后使用了多态形式赋给了父类的引用
    // 下面new的不是Person类而是Person的子类
    Person p = new Person() {
      // 只有子类才能重写方法 这种形式其实也是在new子类 匿名的子类 这里面要重写抽象方法 
    }
    method(p);

-------

    // 创建匿名子类的匿名对象
    method(new Person() {
      // 重写抽象类中的方法
    })
  }

  // 定义Person子类
  class Worker extends Person { }
```


> 匿名子类的创建方式
```java
Person p = new Person() {
  // 重写抽象类中的抽象方法
};
```

- 匿名子类的创建方式:
  Person p = new Person() { // 内部重写抽象方法 }

- 要点：
- new Person() { 有方法体 }
- 这不是在创建Person的实例化对象 而是创建了一个Person类的子类 就是这个子类没有名字

- Person p = new Person() { 有方法体 }
- 这是什么意思呢？ 这是多态
- 我们将匿名子类赋值给父类Person的引用

- 作用:
- 匿名子类的对象 像下面 Person类是一个抽象类 我们要使用下面的方法就要传入一个抽象类的子类 既然是子类我们是不是需要 要先创建一个子类 然后实例化子类 得到子类对象 然后才能放到形参里面去

```java
public static void method(Person p) {
  p.eat();
}
```

- 匿名子类的好处就是 我们就使用一次 不想造子类 不想实例化子类了 所以有了如下的写法 匿名的子类(我们拿Person充当了下) 但是对象是有名的 就是p
```java 
Person p = new Person() {
  ... 重写抽象方法
}
```


> 练习:
- 编写工资系统 实现不同类型员工(多态)的按月发放工资
- 如果当月出现某个 Employee对象的生日 则将该员工的工资增加100元

- 实现说明
- 1. 定义一个Employee类该类包含
  - private String name
  - private int number
  - birthday 是MyDate类的对象

  - abstract earnings()
  - toString()方法 输出对象的name number birthday


> Employee类
- 该类为抽象类 定义了员工的基本信息 其中员工的生日是一个对象
- 提供了全参的构造器 初始化的时候 初始化一个员工的对象
- 提供了一个抽象计算工资的方法 要求继承的子类来重写

```java
public abstract class Employee {
  private String name;
  private int number;
  private MyDate birthday;

  public Employee(String name, int number, MyDate birthday) {
    this.name = name;
    this.number = number;
    this.birthday = birthday;
  }

  // 抽象方法
  public abstract double earnings();

  // 这个部分提供get set方法

  @Override
  public String toString() {
    return "{" +
      " name='" + name + "'" +
      ", number='" + number + "'" +
      ", birthday='" + birthday.toDateString() + "'" +
      "}";
  }
}
```
------

- 2. MyDate类包含
  - private year month day
  - toDateString() 放回日期对应的字符串 xxx年xx月xx日


> MyDate类
- 这个类就是一个日期对象 里面涉及了 属性的get set方法
- 输出整体年月日信息的toDateString方法

```java
public class MyDate {
  private int year;
  private int month;
  private int day;

  public MyDate(int year, int month, int day) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  public String toDateString() {
    return year + "/" + month + "/" + day;
  }
}
```
------

- 3. 定义SalariedEmployee类继承Employee类
  - 实现按月计算工资的员工处理
  - 该类包括：
  - private monthlySalary
  - 实现父类的抽象方法earnings() 该方法返回monthlySalary值
  - toString()方法输出员工类型信息以及员工的name number birthday

> SalariedEmployee类
- 该类是抽象Employee类的子类 
- 这个类描述的是正常上班的人的信息 继承了父类的基本信息的基础上还有自己的月工资的属性

```java
public class SalariedEmployee extends Employee {

  // 月工资
  private double monthlySalary;

  // 通过传参的方法实例化自己的属性的时候 要调用super
  public SalariedEmployee(String name, int number, MyDate birthday) {
    super(name, number, birthday);
  }

  public SalariedEmployee(String name, int number, MyDate birthday, double monthlySalary) {
    super(name, number, birthday);
    this.monthlySalary = monthlySalary;
  }

  @Override
  public double earnings() {
    return this.monthlySalary;
  }

  public String toString() {
    // 父类中有toString方法 我们可以通过super直接调用
    return "当前员工的类型: SalariedEmployee" + super.toString();  
  }
}
```
------

- 4. 参照SalariedEmployee类定义HourlyEmployee类 实现按小时计算工资员工处理 该类包括
  - private成员变量 wage 和 hour
  - 实现父类的抽象方法earnings() 该方法返回wage * hour值
  - toString()方法输出员工类型信息以及员工的name number birthday

```java
public class HourlyEmployee extends Employee {

  // 每小时的工资
  private int wage;

  // 月工作的小时数
  private int hour;

  public HourlyEmployee(String name, int number, MyDate birthday) {
    super(name, number, birthday);
  }
  public HourlyEmployee(String name, int number, MyDate birthday, int wage, int hour) {
    super(name, number, birthday);
    this.wage = wage;
    this.hour = hour;
  }

  @Override
  public double earnings() {
    return wage * hour;
  }

  public String toString() {
    // 父类中有toString方法 我们可以通过super直接调用
    return "当前员工的类型: HourlyEmployee" + super.toString();  
  }
}
```

- 5. 定义PayrollSystem类创建Employee变量数组并初始化 该数组存放各类雇员对象的引用 利用循环结构遍历数组元素 输出各个对象的类型 name number birthday 以及该对象生日 
- 当键盘输入本月月份值时 如果本月是某个Employee对象的生日 还要输出增加工资信息

- 提示
- 定义People类型的数组 People c1[] = new People[10]
- 数组元素赋值
- c1[0] = new People("John", "0001", 20)
- c1[1] = new People("Bob", "0002", 19)

- 若People有两个子类Student和Officer 则数组元素赋值时 可以使父类类型的数组元素指向子类
- c1[0] = new Student("John", "0001", 20, 85.0)
- c1[1] = new Officer("Bob", "0002", 19, 90.5)

```java
import java.util.Calendar;
import java.util.Scanner;

public class PayrollSystem {
  public static void main(String[] args) {

    // Scanner scan = new Scanner(System.in);
    // System.out.println("请输入当月的月份: ");
    // int month = scan.nextInt();

    // 通过日期对象 得到当前的月份
    Calendar calendar = Calendar.getInstance();
    // 获取当前的月份
    int month = calendar.get(Calendar.MONTH);
    
    // Employee类型不是一个抽象类么 这里要画结构图的话 就是堆空间中有一个数组 长度是2 每一个位置声明为一个Employee类型 并不是new Employee对象 new对象的时候不能new Employee 只能new它的子类对象
    // 多态性的体现 声明Employee类型但是放的是子类对象
    Employee[] emps = new Employee[2];
    

    emps[0] = new SalariedEmployee("sam", 1001, new MyDate(1985, 10, 02), 10000);
    emps[1] = new HourlyEmployee("erin", 1002, new MyDate(1986, 10, 22), 60, 240);

    for (int i = 0; i < emps.length; i++) {
      System.out.println(emps[i]);
      double salary = emps[i].earnings();
      System.out.println(salary);

      // 加100元的逻辑 
      if(month+1 == emps[i].getBirthday().getMonth()) {
        System.out.println("生日快乐 奖励100元");
      }
    } 
  }
}
```

----------------------------

### 设计模式之 模板方法设计模式
- 这里也是 抽象和多态的应用

- 抽象类体现的就是一种模板模式的设计
- 抽象类作为多个子类的通用模板 子类在抽象类的基础上进行扩展 改造 但子类总体上会保留抽象类的行为方式

- 解决的问题：
- 1. 当功能内部 一部分实现是确定的 一个部分实现是不确定的 这时可以把不确定的部分暴露出去 让子类去实现

- 2. 换句话说 在软件开发中实现一个算法时 整体步骤很固定 通用 这些步骤已经在父类中写好了 但是某些部分易变 易变部分可以抽象出来 供不同子类去实现 这就是一种模板模式

> 举例
- 我们现在想要测试一段代码的所花费的时间 我们就可以使用这种模板设计模式

- 逻辑有一部分是固定 当中包含了不确定的部分 我们将不确定的部分使用 abstract 关键字 封装成一个方法 暴露出去 让继承的子类来重写

```java
  public void spendTime() {
    long start = System.currentTimeMillis();

    ---- 就这个部分是要测试的代码 ----
    
    long end = System.currentTimeMillis();
    System.out.println("这段代码总消耗时间为: " + (end - start) + " 毫秒");
  }
```

- 比如上面 要测试的代码就是个不确定的部分 我们可以将这个部分封装成一个抽象方法 然后让子类重写 我们在这里通过this来调用子类的重写后的逻辑

- 这样这段逻辑在这里执行了 我们就能计算出这段逻辑所花费的时间了

```java
abstract class Template {

  public void spendTime() {
    long start = System.currentTimeMillis();

    // 这里时候this 这样 实例化的对象再调用spendTime()方法的时候 就会执行实例化对象的code方法
    this.code();
    
    long end = System.currentTimeMillis();
    System.out.println("这段代码总消耗时间为: " + (end - start) + " 毫秒");
  }

  // 定义抽象方法: 既然是抽象方法 那么当前类也必须是抽象类
  public abstract void code();
}
```

- 上面的关键点:
- this.code();
- 像个钩子一样 具体执行时 挂哪个子类 就执行哪个子类的实现代码

> 完整示例：
```java

// 测试类
public class TemplateTest {
  public static void main(String[] args) {

    // 多态 声明父类的类型 new的子类对象 
    Template t = new SubTemplate();  
    t.spendTime();

    ------

    // 造个子类的也没有问题因为子类继承了父类 也有这个方法
    SubTemplate t = new SubTemplate();
    t.spendTime();
  }
}


// 模板父类
abstract class Template {

  // 计算某段代码执行所花费的时间的方法
  public void spendTime() {
    long start = System.currentTimeMillis();

    this.code(); // 不确定的部分 或者说 易变的部分
    
    long end = System.currentTimeMillis();
    System.out.println("这段代码总消耗时间为: " + (end - start) + " 毫秒");
  }

  public abstract void code();
}


// 模板父类的子类
class SubTemplate extends Template {

  // 重写抽象方法 这个code就是我们要测试的目标逻辑代码
  public void code() {
    for(int i=2; i<1000; i++) {
      boolean flag = true;
      for(int j=2; j<=Math.sqrt(i); j++) {
        if(i % j == 0) {
          flag = false;
          break;
        }
      }
      if(flag) {
        System.out.println(i);
      }
    }
  }
}
```

----------------------------

### interface 接口
- 一方面 有时必须从几个类中派生出一个子类 继承它们所有的属性和方法
<!-- 
  也就是说这个子类继承了好几个父类
 -->

- 但是 java不支持多重继承(java是单继承，没有多继承的功能扩展的快) 有了接口 就可以得到多重继承的效果
<!-- 
  通过让一个类实现多个接口从而解决java的单继承性的问题
 -->

- 另一方面 有时必须从几个类中抽取出一些共同的行为特征 而它们之间又没有is-a(student is a person)的关系 仅仅是具有相同的行为特征而已
<!-- 
  不是继承的关系
 -->

- 例如 鼠标 键盘 打印机 扫描仪 摄像头 充电器等都支持usb链接
<!-- 
  比如上面的商品 能抽取取来usb的功能 比如数据怎么传输
  但是把usb封装成一个类不太合适 我们不能说 mp3 手机都 is a usb

  那怎么描述这种非is a的关系 我们就有了接口的概念 
 -->

<!-- 
                 学习的技能(接口)
                  ↑        ↑
        运动员     ↑        ↑   学生
      ↙       ↘   ↑        ↑  ↙   ↘
篮球运动员    跨栏运动员      大学生    中学生


运动员 和 篮球跨栏 描述的是is-a的关系
学生 和 大学生 中学生也是这种关系 我们都用实线来表示

三个箭头的部分就是 接口的关系
运动员和学生都有学习的技能 那我们就把这个学习的技能封装起来
但是它又不能是一个父类 
跨栏运动员 和 大学生 都有自己的父类了 java的单继承性 又不能同时有同级的其它父类

另一方面 跨栏运动员 is a 学习技能 这种描述也不合适
java中怎么描述这种关系呢？ 我们把学习技能封装到一个接口当中 让类实现接口

实现接口 跟继承有些像 接口中定义的功能 它(实现类)就有了
 -->

- 接口就是规范 定义的是一组规则 体现了现实世界中 如果你是要...则必须能... 的思想
- *继承是一个“是不是”的关系 而接口实现则是 “能不能”的关系*

- *接口的本质是契约 标准 规范* 就像我们的法律一样 指定好后大家都要遵守

- 接口的主要用途就是被实现类实现(面向接口编程)
<!-- 
  项目具体需求是多变的 我们必须以不变应万变才能从容开发 此处的 不变 就是 规范 因此 我们开发项目往往都是面向接口编程
 -->

- 接口和类是并列关系 或者可以理解为一种特殊的类 从本质上讲接口一种特殊的抽象类 这种抽象类中只*包含常量和方法的定义(JDK7之前)* 而没有变量和方法的实现


> 接口的定义与使用 interface 关键字
- 之前我们在定义一个类的时候 格式如下:
- class Demo { }

- 定义一个接口
- interface Demo { }

- 要点：
- 1. 在java中接口和类是并列的两个结构
- 2. 接口中的属性都是public的
- 3. 接口也可以用public来修饰
- 4. *接口中是不能定义构造器的* 意味着接口不可以实例化

```java
public interface InnerDemo {

  - 全局常量
  - 抽象方法

  - 不能定义构造器

}
```


> 接口中可以声明的结构
> JDK7以及JDK7以前的版本
- 只能定义全局常量和抽象方法

  - 1. 全局常量:
  - public static final 的变量
  - 定义的全局常量我们可以通过 接口去调用
  - 也就是说接口中定义的变量都是常量

  ```java
  interface Flyable {
    public static final int MAX_SPEED = 7900;
  }

  // 接口调用全局常量
  Flyable.MAX_SPEED
  ```
  <!-- 
    书写的时候可以不写 public static final 但是它也在默认就有

    public static final int MAX_SPEED = 7900;
    int MAX_SPEED = 7900;

    上面的写法在接口中 认为是一样的
  -->

  - 2. 抽象方法
  - public abstract 的方法
  <!-- 
    书写的时候可以不写 public abstract 但是它也在默认就有

    public abstract void stop();
    void stop();

    上面的写法在接口中 认为是一样的
   -->

- 在接口中 我们定义的常量都是 全局常量 不能修改
- int num = 10;

- 在接口中 我们定义的方法都是 抽象方法 需要接口的实现类 实现它
- void show()

- 以上都有省略
- 1. public static final
- 2. public abstract


> 接口的实现类 implements 接口
- 在java开发中 接口通过让类去实现 (implements) 的方式来使用
- 如果实现类覆盖了接口中的所有抽象方法 则此实现类就是可以实例化(可以造对象了)
- 如果实现类没有覆盖接口中所有抽象方法 则此实现类仍为一个抽象类

**注意:**
- 父类的时候 我们对于抽象方法 叫做重写
- 接口的时候 我们对于抽象方法 叫做实现

```java
// 接口
interface Flyable {

  // 全局常量 1秒7.9公里 第一宇宙速度(摆脱引力的速度)
  public static final int MAX_SPEED = 7900;
  int MIN_SPEED = 1;

  // 抽象方法
  public abstract void fly();
  void stop();
}


// 实现类
class Plane implements Flyable {

  @Override
  public void fly() {
    System.out.println("飞机通过引擎起飞");
  }

  @Override
  public void stop() {
    System.out.println("驾驶员减速停止");
  }
}


// 测试类
public class Test {
  public static void main(String[] args) {
    
    // 实例化实现类
    Plane plane = new Plane();
    plane.fly();
  }
}
```

> java中接口的特性
- Java类可以实现多个接口(多实现) 弥补了java单继承的局限性

```java
// 子弹实现类 实现两个接口 Attackable Flyable
class Bullet implements Flyable, Attackable {

  - 注意：
  - 这时如果 Bullet 类想要实例化 就必须实现 两个接口中的所有抽象方法

  @Override
  public void attack() { }

  @Override
  public void fly() { }

  @Override
  public void stop() { }
}
```

> 子类 继承 实现 接口 的格式：
- 先继承父类 后实现接口
```java
  class 子类 extends 父类 implements 接口1, 接口2 { }
```


> 接口 和 接口之间的多继承 extends
- *接口与接口之间可以继承* 而且可以多继承

```java
// 接口
interface AA {
  void method1();
}

interface BB {
  void method2();
}

interface CC extends AA, BB {

  - cc接口中 就有两个抽象方法了 method1 2 
  - 这时有类实现我们的接口CC的时候 要求也要实现抽象方法

}
```


> 细节
- 1. 接口的具体使用 体现多态性 也就是说接口要是用的话 也必须使用多态的方式去用了(它自己又没有构造器对象又造不了)
<!-- 
  因为抽象类和接口都不能实例化 在这点它们之间还是有共性的

  如果一个方法的形参声明成一个 抽象类 或者接口了 我们要是传参的话就必须体现多态的特性了

  我们只能提供子类或者实现类的对象
 -->


- 2. 接口实际上就可以看做是一种规范
<!-- 
  接口中定义了全局常量 每个实现它的类 都有 且不能改
  接口中定义了 实现类中的方法 可以重写 但必须有

  也就是说 实现了这个接口 那么这个实现类一定有该属性和该方法

  这些全局属性和抽象方法相当于制定了规范
 -->

- 比如下面的示例
- 比如我们制定了usb接口 现在我们生产一个设备 这个设备实现了usb接口

  那么这个设备就要遵循 usb接口中的常量(长宽高 不然生产的设备插不进去)
  要遵循接口中的方法 比如方法名接口中定义好了 就识别这个方法名 你生产出来的设备弄个不一样的方法名 兴许就识别不了

  这就是规范


> 上面的2中细节上的示例: 
- 设备和电脑之间可以传输数据，但怎么和电脑连在一起(U盘 还是 数据线的接口头) 和 电脑中传输数据时 需要遵循的方法
<!-- 
  比如:
  电脑会定义接口出的 长 宽 针头 --- 常量

  电脑在传输数据时候规定的方法
  - 1. 先开启设备
  - 2. 传输数据
  - 3. 关闭设备
 -->

- 我们要想和电脑链接传输数据都要遵从这种规范 下面我们从代码上看看具体的实现

```java
// 电脑类
- 电脑类中 定义了传输数据的方法 要求传入的是一个实现了接口的对象

class Computer {

  // 电脑类中定义了一个传输数据的方法 要求要传入USB类型的对象 USB没办法造对象 就拿它的实现类造对象
  public void transferData(USB usb) {

    // 1. usb开启
    usb.start();

    // 2. 省略具体的传输细节
    System.out.println("具体的传输细节");

    // 3. usb关闭
    usb.stop();
  }
}


// USB接口
interface USB {

  // 常量: 定义了长宽最大最小的传输速度
  void start();
  void stop();

  - 这里也相当于一种规范 这种规范叫做USB 
  - 谁要是想传输数据 都的实现这个接口 把规范明确一下 
  - 因为电脑类中用到了这个接口 
  - 也就是说想用电脑来传输数据 必须先遵循USB接口的规范
} 


// Upan实现类
class Upan implements USB {

  @Override
  public void start() {
    System.out.println("U盘开启工作");
  }

  @Override
  public void stop() {
    System.out.println("U盘停止工作");
  }
}
```

>  实现类 实现类对象的多种书写格式

```java

// 1. 创建了接口的 非匿名实现类的 非匿名对象
Flash flash = new Flash();
computer.transferData(flash);


// 2. 创建了接口的 非匿名实现类的 匿名对象
computer.transferData(new Flash());


// 3. 创建了接口的 匿名实现类的 非匿名对象
// 猛一看USB接口怎么还能new呢 其实是造的匿名实现类的对象
USB phone = new USB() {
  // 这里要重写接口中的抽象方法
};
computer.transferData(phone);


// 4. 创建了接口的 匿名实现类的 匿名对象
computer.transferData(new USB() {
  // 这里要重写接口中的抽象方法
});
```

> JDK8
- 除了定义全局常量和抽象方法 还可以定义*静态方法和默认方法*

----------------------------

### 设计模式之 代理模式(proxy)
- 这里也是接口的应用
- 概述：
- 代理模式是java开发中使用较多的一种设计模式
- 代理模式就是其它对象提供一种代理以控制对这个对象的访问
<!-- 
                  接口
              ↗         ↖
ProxyObject(代理类)    Objecttimpl(被代理类)

  +proxyObject()      +action():void
  +action():void


  ProxyObject 和 Objecttimpl 实现了 接口
  我们想想租房 中介 明星 经纪人
 -->

- 这里老师没有讲太细 等以后学业有成再回来看看这部分吧

> 逻辑：
- 我们拿明星和经纪人说
- 明星要想去参加商演 她必须要完成 下面的一系列操作
  
  面谈 - 签合同 - 订票 - 唱歌(重点) - 收钱

- 明星很忙 所以她将除了重点以外的事情 都可以让经纪人去做

- 所以我们可以将上面的一系列的事情抽成一个接口
  面谈 - 签合同 - 订票 - 唱歌(重点) - 收钱

- 然后 经纪人(代理类) 和 明星(被代理类) 都实现这个接口
- 然后双方都有
  面谈 - 签合同 - 订票 - 唱歌(重点) - 收钱
  这一系列的功能

- 经纪人负责
  面谈 - 签合同 - 订票 - 唱歌(重点) - 收钱

- 但是再唱歌里面 我们调用的是 明星 让明星自己去唱歌
- 上面就是代理

- 从代码的外观上看 没有直接操作 明星 操作的都是经纪人 但是经纪人中 唱歌的方法内部 调用的是明星的


> 实现要点
- 1. 定义接口
- 这点没什么说的 将共同的部分 抽成一个接口 让代理类 和 被代理类都继承这个接口

- 2. 被代理类
- 定义真正要做的事情 关键的事情 比如唱歌

- 3. 代理中
- 要定义一个接口类型的属性
- 利用构造器给它初始化
- 在唱歌的方法中 通过 接口属性去调用唱歌的方法
- 因为在实例化代理类的时候 会将被代理类放入形参中

```java
public class NetWorkTest {
  public static void main(String[] args) {
    // new一个真实的服务器
    Server server = new Server();
    // 相当于将 
    ProxyServer proxyServer = new ProxyServer(server);
    proxyServer.browse();
  }
}


// 接口
interface NetWork {
    
  // 只要能连上网 我们就有 浏览的功能
  public void browse();
}


// 被代理类
class Server implements NetWork {
  // 实现抽象方法
  public void browse() {
    System.out.println("真实的服务器访问网络");
  }
}


// 代理类
class ProxyServer implements NetWork {

  // 利用接口的多态 我们可以在方法中传入实现类
  private NetWork work;

  // 当前代理类的构造器
  public ProxyServer(NetWork work) {
    // 在这里对 NetWork work 属性进行初始化
    this.work = work;
  }

  // 代理 服务器访问网络的时候 先做一些校验的操作
  public void check() {
    System.out.println("联网之前的一些检查工作");
  }

  public void browse() {
    // 先校验
    check();

    // 让NetWork的实现类来调用browse()方法 也就是让真正的明星调用这个方法 这里的work相当于接口的实现类
    work.browse();
  }
}
```

> 应用场景
- 1. 安全代理:
  - 屏蔽对真实角色的直接访问

- 2. 远程代理:
  - 通过代理类处理远程方法调用(RMI)

- 3. 延迟加载:
  - 先加载轻量级的代理对象 真正需要再加载真实对象
<!-- 
  比如你要开发一个大文档查看软件 大文档中有大的图片 有可能一个图片有100mb 在打开文件的时候 不可能将所有的图片都显示出来 这样就可以使用代理模式 

  当需要查看图片的时候 用proxy来进行大图片打开
 -->

- 分类:
- 静态代理(静态定义代理类)
- 动态代理(动态生成代理类)
- jdk自带的动态代理 需要反射等知识

----------------------------

### 设计模式之 工厂模式
- 也属于接口的应用
- 工厂是用来造对象的


- 工厂模式:
- 实现了创建者(new对象的叫做创建者)与调用者的分离 即 将创建对象的具体过程屏蔽隔离起来 达到提高灵活性的目的

- 其实设计模式和面向对象设计原则都是为了使得开发项目更加容易扩展和维护 解决方式就是一个“分工”


- 工厂模式分类
- 1. 简单工厂模式
- 用来生产同一等级结构中的任意产品(对于增加新的产品 需要修改已有代码)

- 2. 工厂方法模式
- 用来生产同一等级结构中的固定产品(支持增加任意产品)

- 3. 抽象工厂模式
- 用来生产不同产品族的全部产品(对于增加新的产品 无能为里 支持增加产品族)

> 无工厂的代码逻辑
```java
  interface Car {
    void run();
  }

  class Audi implements Car {
    public void run() {
      System.out.println("奥迪在跑")
    }
  }
  class BYD implements Car {
    public void run() {
      System.out.println("比亚迪在跑")
    }
  }

  // 测试类中创建对象的样子
  public class Client01 {
    public static void main(String[] args) {
      Car a = new Audi();
      Car b = new BYD();

      a.run();
      b.run();

      - 上面的逻辑中 创建对象 和 调用方法 的逻辑就混在了一起
    }
  }
```

> 简单工厂模式
- 简单工厂模式 从命名上就可以看出来这个模式一定很简单 它存在的目的很简单 定义一个用于创建对象的工厂类
```java
interface Car {
  void run();
}

class Audi implements Car {
  public void run() {
    System.out.println("奥迪在跑");
  }
}

class BYD implements Car {
  public void run() {
    System.out.println("比亚迪在跑");
  }
}

// 工厂类
- 以后我们看到XxxFactory就是Xxx的工厂 提供了静态方法
- 我们特意定义了一个工厂类 体现了创建者的角色
class CarFactory {
  // 方式1
  public static Car getCar(String type) {
    if("奥迪".equals(type)) {
      return new Audi();
    } else if("比亚迪".equals(type)) {
      return new BYD();
    } else {
      return null
    }
  }

  // 方式2
  public static Car getAudi() {
    return new Audi();
  }

  public static Car getByd() {
    return new BYD();
  }
}


// 测试类
- 这个类里面独立的体现了调用者
public class Client02 {
  public static void main(String[] args) {
    Car a = CarFactory.getCar("奥迪")；
    a.run();
  }
}
```

- 上面的逻辑完成了 调用者只要知道他要什么 从哪里拿 如何创建 不需要知道
- 分工 多处了一个专门生产Car的实现类对象的工厂类 *把调用者与创建者分离*

- 小结：
- 简单工厂模式也叫静态工厂模式 就是工厂类一般是使用静态方法 通过接收的参数的不同来返回不同的实例对象

- 缺点：
- 对于新增新产品 不修改代码的话 是无法扩展的 违反了开闭原则（*对扩展开放 对修改封闭*）


> 工厂方法模式
- 为了避免简单工厂模式的缺点 不完全满足OCP(对扩展开放 对修改关闭)工厂方法模式和简单工厂模式最大的不同在于

- 简单工厂模式只有一个(对于一个项目或者一个独立的模块而言)工厂类，而工厂方法模式有一组实现了相同接口的工厂类

- 这样在简单工厂模式里集中在工厂方法上的压力可以由工厂方法模式里不同的工厂子类来分担

```java
interface Car {
  void run();
}

class Audi implements Car {
  public void run() {
    System.out.println("奥迪在跑");
  }
}

class BYD implements Car {
  public void run() {
    System.out.println("比亚迪在跑");
  }
}

// 简单工厂是用类来完成逻辑了 工厂模式里是用接口来实现
interface Factory {
  // 返回值类型是Car
  Car getCar();
}

// 两个工厂类 实现了Car接口 重写了返回Car的方法
class AudiFactory implements Factory {
  public Audi getCar() {
    return new Audi();
  }
}

class BYDFactory implements Factory {
  public BTD getCar() {
    return new BYD();
  }
}

// 测试类
public class Client {
  public static void main(String[] args) {
    Car a = new AudiFactory().getCar();
    a.run();
  }
}
```

- 总结：
- 简单工厂模式与工厂方法模式真正的避免了代码的改动了？ 没有 在简单工厂模式中 新产品的加入要修改工厂角色中的判断语句

- 而在工厂方法模式中 要么将判断逻辑留在抽象工厂角色中 要么在客户程序中将具体工厂角色写死(就像上面的例子一样)

- 而且产品对象创建条件的改变必然会引起工厂角色的修改 面对这种情况 *java的反射机制与配置文件的巧妙结合突破了限制--在Spring中完美的体现了出来*


> 抽象工厂模式
- 抽象工厂模式和工厂方法模式的区别就在于需要创建对象的复杂程度上，而且抽象工厂模式是三个里面最为抽象 最具一般性的

- 抽象工厂模式的用意为 给客户端提供一个接口 可以创建多个产品族中的产品对象 而且使用抽象工厂模式还要满足一下条件

- 1. 系统中有多个产品族 而系统一次只可能消费其中一族产品
- 2. 同属于同一个产品族的产品以其使用

- 看过了前两个模式 对这个模式各个角色之间的协调情况应该心里有数了 这里没举例子


> 面试题
- 一下程序有没有问题 如果有问题 怎么改
```java
interface A {
  int x = 0;
}

class B {
  int x = 1;
}

class C extends B implements A {
  public void pX() {
    // The field x is ambiguous
    System.out.println(x)

    - 因为C类中既有接口的x 也有B类的x 编译器不知道 上述的print中的x是谁 所以报错了

    - 1. 如果要调用父类中的x
    System.out.println(super.x);

    - 2. 如果要调用接口中的x
    System.out.println(A.x);
      // 因为接口中的x是全局常量 static final
  }

  public static void main(String[] args) {
    new C().pX();
  }
}
```
<!-- 
  我们接口 和 父类 可以理解为是平级的

      ----- 接口 ----- 父类 -----

                  ↖     ↑
                       子类
 -->


> 面试题2
- 下面两个接口都有 play() 方法 但是类中只有一个play()的实现 有没问题么？
- 没问题
- 谁让接口中的play()方法名重复了呢？ 类中的play()方法会被认为同时对两个接口中的play方法的重写(实现)

```java
  interface Playable {
    void play();
  }

  interface Bounceable {
    void play();
  }

  interface Rollable extends Playable, Bounceable {
    // 这相当于我们声明了一个属性
    Ball ball = new Ball("PingPang");
  }

  class Ball implements Rollable {
    private String name;
    public String getName() {
      return name;
    }

    public Ball(String name) {
      this.name = name;
    }

    // 重写
    public void play() {
      // 接口中的ball是全局常量 不能被赋值 
      ball = new Ball("Football");

      System.out.println(ball.getName());
    }
  }
```

> 练习
- 定义一个接口用来实现两个对象的比较
```java
  interface CompareObject {
    public int compareTo(Object o);
    // 若返回值为0 - 相等; 正数 - 当前对象大; 负数 - 当前对象小
  }
```

- 定义一个Circle类 声明redius属性 提供get set方法
```java
public class Circle {
  private double radius;

  public double getRadius() {
    return this.radius;
  }

  public void setRadius(double radius) {
    this.radius = radius;
  }


  public Circle() { }
  public Circle(double radius) {
    this.radius = radius;
  }
}
```

- 定义一个ComparableCircle类 继承Circle类 并且实现CompareObject接口
- 在ComparableCircle类中给出接口中方法compareTo的实现体 用来比较两个圆的半径大小
```java
public class ComparableCircle extends Circle implements CompareObject {

  public ComparableCircle(double radius) {
    super(radius);
  }

  public int compareTo(Object o) {
    // 先判断当前的this 和 o 是不是同一个引用 同一个引用就不用比了
    if(this == o) {
      return 0;
    }

    // 不是同一个引用 我们就要比较半径了 比较的时候我们要把Object o 强转
    if(o instanceof ComparableCircle) {
      ComparableCircle c = (ComparableCircle)o;
      // 强转为int型后精度损失可能结果会是0 2.3 - 2.1
      // return (int)(this.getRadius() - c.getRadius());
      if(this.getRadius() > c.getRadius()) {
        return 1;
      } else if(this.getRadius() < c.getRadius()) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return 0;
      // throw new RuntimeException("传入的数据类型不匹配")
    }
  };
}
```

- 定义一个测试类 interfaceTest 创建两个ComparableCircle对象 调用compareTo方法比较两个类的半径大小
```java
public class ComparableCircleTest {
  public static void main(String[] args) {

    ComparableCircle c1 = new ComparableCircle(3.4);
    ComparableCircle c2 = new ComparableCircle(3.6);

    int compareValue = c1.compareTo(c2);

    if(compareValue > 0) {
      System.out.println("c1对象大");
    } else if(compareValue < 0) {
      System.out.println("c2对象大");
    } else {
      System.out.println("一样大");
    }
  }
}
```

- 当属性radius声明为Double类型时 可以调用包装类的比较方法
<!-- 
  this.getRadius().compareTo(c.getRadius())
 -->

- 思考：
- 参照上述做法定义举行类Rectangle和ComparableRectangle类 在ComparableRectangle中给出compareTo方法的实现 比较两个矩形的面积大小

----------------------------

### 接口 在JDK8中的新特性
- java7中规定了类中只能定义两个结构 一个 全局常量 抽象方法

- java8中 你可以为接口添加静态方法和默认方法 从技术角度来说 这是完全合法的 只是它看起来范围了接口作为一个抽象定义的丽娘

> 静态方法： static
- 使用 *static* 关键字修饰 可以通过接口直接调用静态方法 并执行其方法体
- 我们经常在相互一起使用的类中使用静态方法 你可以在标准库中找到想 Collection/Collections或者Path/Paths这样承兑的接口和类

> 默认方法： default
- 默认方法使用 *default* 关键字修饰 可以通过实现类对象来调用
- 我们在已有的接口中提供新方法的同时 还保持了与旧版本代码的兼容性
- 比如: java8 api中对 Colletion List Comparator等接口提供了丰富的默认方法


> 要点:
- java8中的接口越来越像一个类了 在接口中定义的静态方法和默认方法 因为有方法体 子类在实现接口的时候就可以考虑不用重写了

> 1. 接口中定义的静态方法只能通过接口来调用
<!-- 
  接口中定义的静态方法 实际上不是想让实现类去继承的 我想自己用的
  这样的接口就有些像工具类了
 -->

> 2. 通过实现类的对象 可以调用接口中默认的方法 如果实现类重写了接口中的默认方法 调用时 仍然调用的是重写后的方法

> 3. 如果子类(或实现类)继承的父类和实现的接口中都声明了同名同参数的方法 那么子类在没有重写此方法的情况下 *默认调用的是父类中的同名同参数的方法* --> *类优先原则*
<!-- 
  接口和类中的同名属性不是哦 必须要显示区分
  但是接口和类中的同名同参数的方法 有 类优先原则
 -->

> 4. 如果子类(或实现类) 如果实现类实现了多个接口 而这多个接口中定义了同名同参的默认方法 那么在实现类没有重写此方法的情况下 会报错 --> *接口冲突*
<!-- 
  接口1
    default show() {
      Sytem.out.println("hellow")
    }

  接口2
    default show() {
      Sytem.out.println("hellow")
    }

  当类同时实现了这两个接口的时候 调用show()会报错 因为接口冲突
  编辑器不知道调用哪个接口的方法
 -->

- 当*接口冲突*的时候 我们必须在实现类中重写此方法

```java
interface CompareA {

  // 静态方法 
  public static void staticMethod() {
    System.out.println("CompareA: 北京");
  }

  // 默认方法
  public default void defaultmethod() {
    System.out.println("CompareA: 上海");
  }

  // public 可以省略掉 但默认还是会有
  default void method3() {
    System.out.println("CompareA: 深圳");
  }
}


// 测试类
public class Demo {
  public static void main(String[] args) {
    SubClass s = new SubClass();

    // 通过实例对象能调用的只有接口中的默认方法
    s.defaultmethod();

    // 通过接口名调用 接口中的静态方法
    CompareA.staticMethod();
  }
} 
```

> 5. 实现类中调用接口中的默认方法? 
> 接口.super.默认方法()
```java
class SubClass extends SuperClass implements CompareA, CompareB {
  publc void myMethod() {
    // 调用本类中重写的方法
    method();

    // 调用父类中声明的方法
    super.method();

    // 调用接口中的默认方法
    CompoareA.super.method();
  }
}
```

> 接口和抽象类的总结:
- 1. 接口可以继承接口
- 2. 抽象类也可以实现接口
- 3. 抽象类可以继承非抽象的类(抽象类本身就继承Object类)

- 4. 抽象类和接口有哪些共同点和区别？
- 共同点：
- 它们不能实例化 需要提供它们的子类或者实现类
- 内部都可以定义抽象方法 抽象类不一定有抽象方法 接口中通常都会定义抽象方法(接口中就是一种规范 规范就主要就是从抽象方法中体现的)
- 都可以被继承
- 
- 不同点：
- 抽象类有构造器
- 接口没有构造器

- 抽象类和接口是并列的结构
- 接口可以多继承 抽象类只能单继承

- 类和类之间是继承关系 - 单继承
- 接口跟类之间是实现关系 - 多实现
- 接口和接口之间是多继承 extends
- 接口随着jdk的不断迭代 我们看到的趋势就是接口在不断的往类靠近 尽可能的让功能的扩展性强一些


> 练习：
- 接口冲突的解决方法
```java
// 孝顺的
interface Filial {
  default void help() {
    System.out.println("老妈 我来救你了")
  }
}

// 痴情的
interface Spoony {
  default void help() {
    System.out.println("媳妇 我来救你了")
  }
}

class Man implements Filial, Spoony {
  //  当实现的接口中 有同名同参数的默认方法 我们必须要重写 我们必须要选择一个
  default void help() {
    System.out.println("我该怎么办呢?")

    Filial.super.help();
    Spoony.super.help();
  }
}
```

----------------------------

### 内部类
- 当一个事物的内部 还有一个部分需要一个完整的结构进行描述 而这个内部的完整的结构又只为外部事物提供服务 那么整个内部的完整结构最好使用内部类
<!-- 
  比如我们定义了一个 Person类 我们可以在类中定义 name age 属性
  
  这时候我还想定义一个类 大脑
  但是如果放在外面 那么 大脑类 和 Person 属于平级关系 

  我们的大脑类 只想在Person类里面 用来描述大脑的完整结构
  这时候我们就可以使用内部类 
-->

- 1. 在java中 允许一个类A声明在另一个类B中 则类A就是*内部类* 类B就是*外部类*

- 2. 内部类的分类:
- 和变量一样如果我们定义在类内部 方法构造器代码块等外部 我们通常将该变量称之为成员变量 而定义在方法代码块等内部的我们称之为局部变量 内部类也一样

> 内部类的声明位置
- 成员内部类(static成员内部类和非static成员内部类)
- 局部内部类(方法内 代码块内 构造器内) 匿名内部类

```java
class Person {

  // 静态成员内部类
  static class Dog {}

  // 非静态成员内部类
  class Cat {}


  // 定义在方法中的局部内部类
  public void method() {
    // 局部内部类
    class AA {}
  }


  // 定义在代码块中的局部内部类
  {
    class BB {}
  }


  // 定义在构造器中的局部内部类
  public Person() {
    class CC {}
  }

}
```


> 成员内部类的特点
- 我们从两方面谈论成员内部类的特点
> 1. 从类的角度谈成员内部类能做什么？
  - 内部类内可以定义属性 方法 构造器等 也可以继承

  - final:
  - 可以被final修饰 表示此内部类不能被继承 言外之意不使用final就可以被继承

  - abstract:
  - 可以被abstract修饰 表示此内部类不能被实例化

```java
class Person {

  // 静态成员内部类 - 用abstract修饰
  abstract static class Dog {
    String name;

    // 构造器
    public Dog() {}

    // 方法
    public void sing() {
      System.out.println("我是一只小小小小狗");
    }
  }

  // 非静态成员内部类 - 用final修饰
  final class Cat { }
}
```

> 2. 内部类作为外部类的成员能做什么？（String name 就是成员）
  - 1. 内部类中可以调用外部类的结构
  - 静态内部类中不可以调用外部类的结构
  - 非静态内部类中可以调用外部类的非静态属性
  <!-- 
    内部类的方法中 调用了 eat() 相当于
    eat()
    Person.this.eat();
   -->

```java
class Person {

  String name;
  int age;

  public void eat() {
    System.out.println("吃饭");
  }

  // 静态内部类
  static class Dog {
    String name;
    int age;

    public void show() {
      // 我在静态的内部类中  可以调用外部类的eat()方法么？
      eat();
        - 不行 因为静态结构加载的早 所以不能调用eat()

      System.out.println("卡拉是条狗")
    }
  }

  // 非静态内部类
  class Bird {
    String name;
    
    public void sing() {
      System.out.println("我是一只小小鸟")

      // 我在非静态的内部类中 可以调用外部类的eat()方法么？
      eat();
      Person.this.eat();
        - 可以

        - 要点:
        - eat(); 的前面 省略了 Person.this.eat()
        - Person.this.eat()的书写方式 相当于 obj.name
        - 内部类作为成员变量 不就是通过Person.属性的方法么
    }
  }
}
```

  - 2. 可以被static修饰
  - static主要用来修饰类的内部成员 非构造的器其它结构 本来外部类肯定不能用static来修饰 但我们现在是内部类的话就没有问题了
```java
class Person {

  // 内部类使用static来修饰
  static class Dog {
    String name;
    int age;

    public void show() {
      System.out.println("卡拉是条狗")
    }
  }
}
```
  - 3. 内部类作为外部类的成员可以被4种不同的权限修饰符修饰(内部类就相当于一个类的属性 和用权限修饰符修饰属性时一样的)


- 下面我们要研究下
- 1. 如何实例化成员内部类的对象
- 2. 如何在成员内部类中区分调用外部类的结构
- 3. 开发中局部内部类的使用


> 1. 如何实例化成员内部类的对象
  - 1. 静态内部类的实例化
  - Person.Dog dog = new Person.Dog();
  - new Person的静态内部类Dog

  - 2. 非静态内部类的实例化
  - 先实例化外部类 然后通过外部类的对象 new 内部类
  - Person p = new Person();
  - Person.Bird bird = p.new Bird();

- 两种方式 好好记下前面的声明 都是 

  Person的xx内部类 = 静态就是 实例对象.new 非静态内部类
  Person的xx内部类 = 非静就是 new 类.静态内部类

```java
class Person {

  String name;
  int age;

  public void eat() {
    System.out.println("人吃饭");
  }

  // 静态成员内部类
  static class Dog {
    public void show() {
      System.out.println("卡拉是一条狗");
    }
  }

  // 非静态成员内部类
  class Bird {
    public void sing() {
      System.out.println("我是一只小小鸟");
    }
  }
}


// 测试类
public class Demo {
  public static void main(String[] args) {

    // 创建 静态内部类的实例化对象
    Person.Dog dog = new Person.Dog();
    dog.show();

    // 创建 非静态内部类的实例化对象
    // 因为Bird是非静态的 我们需要创建外部类的实例 然后new里面非静态的结构
    Person p = new Person();
    Person.Bird bird = p.new Bird();
    // p.new Bird(); 有了实例对象 然后new内部类的结构
    bird.sing();
  }
}
```

> 2. 如何在成员内部类中区分调用外部类的结构
- 当没有重名的时候 内部类可以直接调用外部类中的结构
  eat();
  Person.this.eat();

- 内部类中直接写外部类的结构就可以 但是默认会有 Person.this.xx

```java
class Person {

  String name;
  int age;

  public void eat() {
    System.out.println("吃饭");
  }

  // 静态内部类
  static class Dog {
    String name;
    int age;

    public void show() {
      // 我在静态的内部类中  可以调用外部类的eat()方法么？
      eat();
        - 不行 因为静态结构加载的早 所以不能调用eat()

      System.out.println("卡拉是条狗")
    }
  }

  // 非静态内部类
  class Bird {
    String name;
    
    public void sing() {
      System.out.println("我是一只小小鸟")

      // 我在非静态的内部类中 可以调用外部类的eat()方法么？
      eat();
      Person.this.eat();
    }
  }
}
```

- 当有重名的属性的时候
- 外部类中有 name 属性
- 内部类中有 name 属性
- 内部类的方法中的形参还是 name 属性

- 这时我们怎么在 display 方法中 区分调用这三个 name 呢？

```java
class Person {

  String name;

  // 非静态内部类
  class Bird {
    String name;
    public void display(String name) {
      // 调用形参的name
      System.out.println(name);

      // 调用Bird内部类的name 
      System.out.println(this.name);
        - display方法所在类的name 通过this

      // 调用外部类的name
      System.out.println(Person.this.name);
    }
  }
}
```

- 没有重名的属性的时候 直接调用就可以 通过作用域就找到了


> 3. 开发中局部内部类的使用

- 下面这种局部内部类的情况很少见
```java
public class Demo {

  // 下面这种的内部类情况比较少
  public void method() {
    // 局部内部类
    class A { }
  }
}
```

- 常见的局部内部类 
- 方法的返回值是一个*接口* 调用该方法返回一个实现了该接口的类
```java
public class Demo {

  // 一般都是方法有返回值的类型 Compareable是接口
  // 返回一个实现了Compareable接口的类的对象
  public Compareable getCompareable() {

    // 创建一个实现了Compareable接口的类
    class MyCompareable implements Compareable {

    }

    return new MyCompareable;
  }
}

- 该内部类就是方法类 造一个内部类 这个内部类为接口的实现类 然后返回

- 方式2：
- 创建一个实现了 Compareable 接口的匿名实现类的匿名对象
public class Demo {

  public Compareable getCompareable() {

      // 实现类没有名对象也没有名
      return new Compareable() { }
  }
}

```

- 内部类在开发中用的不多
- 成员内部类和局部内部类 在编译以后 都会生成字节码文件
- 格式：
- 成员内部类: 外部类$内部类名.class
- 局部内部类: 外部类$数字 内部类名.class


> 在局部内部类的方法中注意点:
- 在局部内部类的方法中（比如下面的show()) 如果调用局部内部类所声明的方法中的局部变量的话

- 要求:
- 此局部变量声明为final(num)

- 为什么要声明成 final 的?
- 规定
- 外部类的话会生成字节码文件 内部类也是独立的字节码文件 相当于两个文件了 两个文件就对应着两个类 method方法是存在外部类的结构里 method方法中有一个num变量 该变量出了方法就失效了

- 而内部类也是个独立的文件 这个文件中用了num变量 因为是两个文件了 实际上我们给内部类文件传递过去的是一个num的副本

- 也就是说相当于重新复制了一个变量给内部类用的 内部类只能用 不能改 因为你也改不了 因为传入的是一个副本 所以我们标记为final 明确 你只能用不能改

```java
public class Demo {
  public static void main(String[] args) {

  }

  // 方法
  public void method() {

    // 局部变量
    int num = 10;

    - jdk7中 该属性如果给内部类用的话要显示声明为 final
    - final int num = 10;

    - jdk8中 该属性如果给内部类用的话可以不显示声明 但是默认会有final

    // 内部类
    class AA {

      // 方法
      public void show() {

        // 局部内部类可以直接调用 局部内部类所在的方法中的属性
        System.out.println(num);
        - 我们在这里直接调用num是没有问题的 但是 有要求 num必须是一个final的
        - 也就是说我们在内部类中给num重新赋值 会报错
      }
    }
  }
}
```
 
- 在移动端这情况比较常见

----------------------------

### 异常处理
- 在使用计算机语言进行项目开发的过程中 即使程序员把代码写的尽善尽美 在系统的运行过程中仍然会遇到一些问题 

- 因为很多问题不是靠代码能够避免的 比如 客户输入数据的格式 读取文件是否存在 网络是否始终保持通畅等等

> 异常
- 在java语言中 将程序执行中发生的不正常情况成为  异常
<!-- 
  开发过程中的语法错误和逻辑错误不是异常
 -->

- java程序再执行过程中所发生的异常事件可分为两类

> Error:
- java虚拟机无法解决的*严重问题*
<!--  
  我们程序分为编译过程和运行过程 运行的时候需要用java虚拟机的加载器和解释运行器 帮我们去解释运行 在解释运行的过程中java虚拟机都没有办法帮我们运行了
 -->
- 如 jvm系统内部错误 资源耗尽等严重情况
- 比如: StackOverflowError和OOM 一般不编写针对性的代码进行处理(一般也不用编写代码去解决这样的error，只能改原代码)

> 栈溢出异常: java.lang.StackOverflowError

```java
// 比如递归调用就会导致栈溢出的error
public class ErrorTest {
  public static void main(String[] args) {
    main(args)
  }
}
```

> 堆溢出异常: java.lang.OutOfMemoryError
- 简称OOM

```java
// 如果堆空间不够大 堆空间就会报错
public class ErrorTest {
  public static void main(String[] args) {
    Integer[] arr = new Integer[1024*1024*1024]
  }
}
```


> Exception
- 其它因编程错误或偶然的外在因素导致的一般性问题 可以使用针对性的代码进行处理
- 1. 空指针访问
- 2. 试图读取不存在的文件
- 3. 网络连接中断
- 4. 数组角标越界

- 对于这些错误 一般有两种解决方法
- 1. 遇到错误就终止程序的运行 
- 2. 由程序员在编写程序时 就考虑到错误的检测 错误消息的提示 以及错误的处理

- 捕获错误最理想的是在*编译期间* 但有的错误只有在*运行时*才会发生
<!-- 
  编译期异常 - 受检checked 异常 - 
  运行时异常 - 非受检unchecked 异常 - runtime exception
 -->

- 比如 
- 除数为0 数组下标越界(空指针异常)等

- 分类：
- 编译时异常和运行时异常


> 异常的体系结构
- java.lang.Throwable (异常的顶级父类)
  | -- java.lang.Error
  | -- java.lang.Exception

    | -- 编译时异常(checked受检时异常)

    | -- 运行时异常(unchecked非受检时异常)
      -- nullPointerException
      -- ArrayIndexOutOfBounds
      -- ClassCastException      - 类型转换异常
      -- NumberFormatException   - 数字格式化异常
      -- InputMissMatchException - 输入不匹配异常
      -- ArithmeticException     - 算数异常


> 常见的运行时异常 示例
```java
public class ExceptionTest {
  
  // 算数异常 ArithmeticException
  @Test
  public void test6() {
    int a = 10;
    int b = 0;
    // 除了个0
    a / b;
  }


  // InputMissMatchException
  // 输入的值数据类型与设置的值数据类型不能匹配。”
  @Test
  public void test5() {
    // 当我们输入的不是int型的时候 会报这个异常
    Scanner scanner = new Scanner(System.in);
    int score = scanner.nextInt();
  }


  // 数字格式化异常 NumberFormatException
  @Test
  public void test4() {
    // 试图将 abc 转换为 数字
    String str = "abc";
    int num = Integer.parseInt(str);
  }


  // 类型转换异常 ClassCastException
  @Test
  public void test3() {
    Object obj = new Date();
    String str = (String)obj;
  }


  // 角标越界 ArrayIndexOutOfBounds
  @Test
  public void test2() {
    int[] arr = new int[10];
    arr[10];  // 不在0-9

    // StringIndexOutOfBounds
    String str = "abc";
    str.charAt[3]; 
  }


  // 空指针异常
  @Test
  public void test1() {
    // nullPointerException
    int[] arr = null;
    arr[3]

    // nullPointerException
    // 试图通过对象去调方法 对象还是个空的
    String str = "abc";
    str = null;
    str.charAt[0]; 
  }
}
```


> 常见的编译时异常 示例：
- 下面的就当看看吧 没学呢
- 下面的代码在编译时就会报错 也就是说对应的字节码文件是不会生成的

```java
public class ExceptionTest {
  
  public void test() {

    FileInputStream fis = null; 

    try {
      File file = new File("hello.txt");
      fis = new FileInputStream(file);
  
      int data = fis.read();
  
      while(data != -1) {
        System.out.print((char)data);
        data = fis.read();
      }

    } catch(Exception e) {
      e.printStackTrace();

    } finally {
      // 我们将关闭操作放在finally中 
      try {
        fis.close();
      } catch(IOException e) {
        e.printStackTrace();
      }

      - 之所以加try catch 因为fis.close();也可能会出现异常
    }
  }
}
```

----------------------------

### 异常的处理方式
- 在编写程序的时候 经常要在可能出现错误的地方加上检测的代码 如进行x/y的运算的时候 要检测分母为0 数据为空 输入的不是数据而是字符等

- 过多的if-else分支会导致程序的代码加长 臃肿可读性差 因此采用异常处理机制


> java异常处理
- java采用的异常处理机制 是将异常处理的程序代码集中在一起 与正常的程序代码分开 使得程序间接 优雅 并易于维护


> 异常的处理: 抓抛模型

- 过程1 "抛": 
- 程序在正常的执行的过程中 一旦出现异常 就会在异常代码处生成一个异常类的对象
- 并将此对象抛出(抛给程序的调用者)
- 一旦抛出对象后 其后的代码就不再执行


- 过程2 "抓":
- 抓住抛出来的异常对象 也就是异常的处理方式
- 异常的处理方式有两种 
- 1. try catch finally
- 2. throws

### try catch finally (自己解决异常)
- catch可以有多个结构，当出现异常类型1的时候 走对应的逻辑
- 就跟switch case一样

> 结构
```java
  try {
    // 可能出现异常的代码
  } catch(异常类型1 变量名1) {
    // 处理异常的方法1
  } catch(异常类型2 变量名2) {
    // 处理异常的方法2
  } catch(异常类型3 变量名3) {
    // 处理异常的方法3
  }
  ...
  finally {
    // 一定会执行的代码
  }
```

- 其中 finally结构 是可选的


- 我们看看代码部分的示例:

```java
public void test1() {
  String str = "123";
  str = "abc";
  try {
    int num = Integer.parseInt(str);  
  } catch (NumberFormatException e) {
    System.out.println("出现数字转换异常了 不要着急...");
  }
}
```

- 1. 首先在 可能出现异常的部分 使用 try { } 包住 在执行过程中一旦出现异常 就会生成一个对应异常类的对象 根据此对象的类型 去catch中进行匹配

- 2. 然后在 catch的形参中 指明异常对象的类型 一旦try中的异常对象匹配到某一个catch的时候 就会进入catch中进行异常处理 *一旦处理完成以后就会跳出当前的 try-catch结构(在没有写finally的情况下)* 继续执行其后的代码

- 3. 这样catch就会捕获指定异常类型的被抛出来的异常对象
- 也就是说 *我们自己指定的异常类型 要和 异常本身的类型 一致*

- 4. catch中的异常类型如果没有子父类关系 则谁声明在上 谁声明在下无所谓
- 如果catch中的异常类型满足子父类关系 则*要求子类一定要声明在父类的上面*

- 5. 在try结构中声明的变量 再出了try结构以后 就不能被调用 作用域的问题
- 6. try catch finally结构可以嵌套使用

**注意:**
- 1. 
- catch(指明指定异常) { ... }
- catch(Exception e) { ... }
- Exception是所有异常 上面的两种写法都可以
```java
try {
  int num = Integer.parseInt(str);  

} catch(NumberFormatException e) {
  System.out.println("出现数字转换异常了 不要着急...");

  // 总异常
} catch(Exception e) {
  System.out.println("出现异常了 不要着急...");
}
```

- 2. 
- 异常对象也是一个类 每一个异常对象可能是并列的子类 或者 嵌套的子类
<!-- 
  异常对象1   异常对象2     --- 并列关系

  异常对象1                --- 嵌套关系
    异常对象2
 -->

- 这里跟if 和 else if一样
- 如果是两个没关系的子类的时候 catch的顺序 谁写上面 谁写下面没有关系
- 但是如果是嵌套关系的话 我们就要将父类写在下面 确保我们想要执行的逻辑写在上面(放在上面会报错)


> try catch的执行逻辑
- 我们定义了 两行测试语句 看看测试语句的执行

```java
public class Demo {

  @Test
  public void test1() {
    String str = "123";
    str = "abc";
    try {

      - 下面的代码会有异常产生
      int num = Integer.parseInt(str);  

      - 一旦在这个位置出现异常了 就会在这个位置出现一个异常对象 NumberFormatException 

      - 然后这个异常对象就会抛出来 
      - 然后就会到catch的位置进行匹配 
      - 配上对应的异常类型就会被捕获 
      - 然后就会执行对应catch中的逻辑 
      - 然后相当于我们把异常处理掉了 
      - 所以会看到 测试 ---- 语句2

      System.out.println("测试 ---- 语句1");
      // 这句没有执行 原因可能是在发生错误的地方 抛出了异常对象后 后面的逻辑就不执行了

    } catch (NumberFormatException e) {
      System.out.println("出现数字转换异常了 不要着急...");
    }

    System.out.println("测试 ---- 语句2");
  }
}

// 结果:
- 出现数字转换异常了 不要着急...
- 测试 ---- 语句2
```

> 常用的异常对象 e 身上的方法
- catch (NumberFormatException e)
- 该对象身上的方法用于处理异常

> e.getMessage();
- 该方法返回值为字符串
```java
System.out.println(e.getMessage());
// For input string: "abc"
```

> e.printStackTrace();
- 直接调用就可以 没有返回值
- 该方法的效果就是 报错 但是不影程序的向下执行 而且该方法的输出信息中包含了 e.getMessage(); 的内容

```java
catch(Exception e) {
  e.printStackTrace();
}
```

- 使用try catch finally处理编译时异常 使得程序再编译时就不再报错了 但是运行时仍可能报错

- 相当于我们使用try catch finally结构将一个编译时可能出现的错误延迟到运行时了


> finally的使用
- finally结构中的代码一定会执行 该结构为可选
- 如果有必须要执行的代码的情况下 可以选择使用该结构

- finally中声明的是一定会被执行的代码 即使catch中又出现异常了 或者 try和catch当中有return语句等情况 finally中的结构也会被执行

```java
// catch中有异常的情况
public void test1() {
  try {
    int a = 10;
    int b = 0;
    System.out.println(a/b);

  } catch(ArithmeticException e) {

    // catch中也可能会有异常哦 如果这个部分没有try catch那么程序到这里 因为异常会导致跳出该方法
    int[] arr = new int[10];
    System.out.println(arr[10]);

    e.printStackTrace();

    // 但是有finally的情况下 该结构也会执行
  } finally {
    System.out.println("有return也会被执行哦");
  }
}


- 注意：
- 执行顺序可能是先finally 再是catch中的逻辑
- 比如下面的逻辑

public class Demo {

// 有return的情况
  @Test
  public void show() {
    int num = test1();
    System.out.println(num);
  }

  public int test1() {
    try {
      int a = 10;
      int b = 0;
      System.out.println(a/b);
      return 0;

    } catch(ArithmeticException e) {
      e.printStackTrace();
      return 1;

    } finally {
      System.out.println("我好帅啊");
    }
  }
}

- 执行顺序：
- 先执行 finally 然后执行 catch 中的 return
```

> 对上解析
- 方法中的逻辑是从上到下执行的 只有执行到最后一行 方法才会得到返回值
- 所以当最后有finally的时候 会执行完finally 然后再看返回值
- *所以finally中的逻辑 在整个的输出结果中是在前面的*


> 什么情况下 要使用finally
- 必须一些必须执行的操作 比如物理链接 数据库链接 输入输出流 socket链接 jvm是没办法将这些物理上链接的操作关闭的 需要我们自己去关(不关的话 会有泄漏的风险 和 内存会持续占用) 也就是说对于这样的链接操作我们要自己去关闭

- 即使之前的代码出现异常 我们也保证要让链接关闭掉

- 像数据库连接 输入输出流 网络编程socket等资源 jvm是不能自动的回收的 我们需要自己手动的进行资源的释放
- 这些资源释放的操作 就需要声明在finally中
<!-- 
  以防关闭的操作 受到前面代码异常的影响 导致关闭操作没办法执行
  这样不行 不管有没有异常 我们是一定要释放的 所以要将逻辑放入到finally当中
 -->

```java
public class ExceptionTest {
  
  public void test() {

    FileInputStream fis = null; 

    try {
      File file = new File("hello.txt");
      fis = new FileInputStream(file);
  
      int data = fis.read();
  
      while(data != -1) {
        System.out.print((char)data);
        data = fis.read();
      }

    } catch(Exception e) {
      e.printStackTrace();

    } finally {
      // 我们将关闭操作放在finally中 
      try {
        if(fis != null) fis.close();
      } catch(IOException e) {
        e.printStackTrace();
      }

      - 之所以加try catch 因为fis.close();也可能会出现异常
    }
  }
}
```


> 编译时异常和运行时异常的不同处理
- 在开发中对于运行时异常 我们不用try catch处理
- 但是如果是编译期的异常 我们就会使用try catch要不编译过不去
<!-- 
  我们在处理异常的时候 会使用e.printStackTrace()
  该方法是在出现异常的时候 为了让程序不崩溃 打印异常信息

  但是使用try catch e.printStackTrace() 和不使用它们没什么区别

  比如我们没使用try catch在运行的时候也是会爆同样的错误
  所以使用try结构 和 不使用的区别 几乎没有 所以在运行时异常 我们就不使用try catch结构了
 -->

- 上面我们说过 我们使用 try结构处理编译时异常 使得程序再编译时就不再报错 但是运行时仍可能报错 相当于我们将编译时异常转化为运行时异常

- 但是对于本身就是运行时异常就没必要用try结构了

- 开发中由于运行时异常比较常见 所以我们通常就不针对运行时异常编写try结构 但是针对于编译时异常我们一定要处理

----------------------------

### throws + 异常类型
- 异常的第二种处理方式 我们也是在编译时异常的情况下 可以使用该方式

- 比如下面的代码会是编译时异常 当出现异常以后 要么我们选择用 try catch处理 要么就可以选择 throws
<!-- 
  throws方法本质上来讲 并没有把异常catch住 干掉
  而是选择了向上抛异常的策略 让它的上一级去处理

  throws后面加的是异常的类型 看看我们下面的程序中会有什么样的异常
 -->

> throws的书写位置和格式
> (形参) throws 异常类型1, 异常类型2 {方法体}
- 我们将method方法中的异常抛到上一级 也就是谁调用method方法 就抛给谁

```java
public class ExceptionTest {

  // main方法
  public static void main(String[] args) {
    try {
      method2();

      // 别人抛出了几个异常对象 我们这就写几个 
    } catach(FileNotFoundException e) {
      e.printStackTrace();
    } catach(IOException e) {
      e.printStackTrace();
    }
  }

  - 注意:
  - 由于FileNotFoundException和IOException是子父类的关系(包含关系) 如果我们处理逻辑是一样的 我们可以只写一个IOException的处理方案


  // 接着往上一层抛异常 抛到了main方法中 相当于到头了
  public void method2() throws FileNotFoundException, IOException {
    method();
  }


  // 抛出异常的方法 谁调用该方法就将异常抛给谁
  public void method() throws FileNotFoundException, IOException {

    File file = new File("hello.txt");
    fis = new FileInputStream(file);
    int data = fis.read();
    while(data != -1) {
      System.out.print((char)data);
      data = fis.read();
    }
    fis.close();
  }
}
```

- 从上面的代码我们能看到 throws只是将异常往上抛 当前的结构没有异常了 但是本质来讲异常并没有被解决掉 try catch 的方法才是真正的去解决异常


> 总结
- 1. throws + 异常类型 写在方法的声明处 指明此方法执行时 可能会抛出的异常类型 一旦当方法体执行时 出现异常 仍会在异常代码处生成一个异常类的对象 此对象满足throws后异常类型时 就会被抛出 

- 异常代码后续的代码 就不再执行

- 2. 体会：
- try catch finally 真正的将异常处理掉了 
- throws的方式只是将异常抛给了方法的调用这 并没有真正的将异常处理掉


> 重写方法抛出异常的规则
- 方法被重写的时候 方法是可以抛出异常的 如果父类中被重写的方法抛出了一个异常 子类也要抛出异常 但是要满足一定的规则 子类抛出的异常不能大于父类抛出的异常
<!-- 
  比如
    父类抛出的异常是 IOException
  那么
    子类抛出的异常可以是 IOException 也可以是File的
 -->

> 方法重写的规则之一：
- 子类重写的方法抛出的异常类型不大于父类重写的方法抛出的异常类型
- 如果父类中的方法没有抛出异常 子类也不能抛出异常
```java
// 父类
class SuperClass {
  public void method() throws IOException {

  }
}

// 子类
class SubClass extends SuperClass {
  // 重写父类中的方法

  // 1. 该形式也算重写 子类的异常类型可以比父类的小 小到极限就是没有
  public void method() { }

  // 2. 异常类型可以一样大
  public void method() throws IOException { }

  // 3. 异常类型可以比父类的要小
  public void method() throws FileNotFoundException { }
}
```

- 为什么？
- 存在这样的一种情况
```java
// 定义父类
class SuperClass {
  public void method() throws IOException { }
}

// 定义子类 重写父类中的方法
class SubClass extends SuperClass {
  public void method() throws FileNotFoundException { }
}

// 定义一个方法 该方法形参为父类对象 体现多态
public void display(SuperClass s) {
  // 既然method可能会抛出IOException
  try {
    s.method();
  } catch(IOException e) {
    e.printStackTrace();
  }
}

- 当我们调用display()方法的时候 必须传入对象
- 假如我们子类重写的方法 抛出的异常 比父类的IOException还要大的情况下

- 那上面display方法中的try catch就罩不住了
- 所以子类中的异常不能比父类的大 就是因为这个

```


> 开发中使用哪种方式处理异常
- 1. 如果父类中被重写的方法没有抛出异常(throws) 则子类重写的方法也不能使用throws 意味着如果子类重写的方法中有异常 必须使用try catch的方式处理异常

- 2. 执行的方法A中 先后又调用了另外的几个方法 这几个方法是递进关系(方法1的结果方法2要用方法2的结果会传入方法3)执行的
- 我们建议这几个方法使用throws的方式进行处理 而执行的A中考虑统一用try catch进行处理

- try catch的本意是 给我们的代码做一个预案 预估下我们代码可能出现的问题 然后给出一个友好的提示 不至于让用户看到乱码 或者 错误代码的界面 

- 但是本意我们还是要回来修改源代码来清楚实际问题的

----------------------------

### 手动抛出异常
- 关于异常对象的产生 上面都是系统在出现异常的时候自动生成的对象
- 这节我们说下如何手动的生成一个异常对象 并抛出 *throw*
<!-- 
  throw 是手动产生一个异常对象
  throws 是处理异常的一种方法 系统自动抛出异常
 -->

- 有些情况下 我们还必须抛出一个异常
- 比如下面 我们给id进行赋值 当为正数的时候 给id赋值 当用户输入为负数的时候 我们给出提示

- 但即使我们给出提示 输出的也会是id的默认值0
- 这时候我们就可以手动的抛出一个异常

```java
public class Demo {

  public static void main(String[] args) {
    Student s = new Student();
    s.regist(-1001);

    System.out.println(s);
  }
}


class Student {
  private int id;

  public void regist(int id) {
    if(id > 0) {
      this.id = id;
    } else {
      System.out.println("您输入的数据不合法");

      // 这里我们还可以自定义一个异常
    }
  }

  @Override
  public String toString() {
    return "{" +
      " id='" + id + "'" +
      "}";
  }
}
```


> 手动创建异常 
> throw new 异常类型
- 这里我们可以考虑 Exception 或者 RuntimeException
- 我觉得也可以定义指定异常类型对象

```java
throw new Exception();
throw new RuntimeException("您输入的数据非法");
```

> throw new RuntimeException("提示文字")
- 运行时异常
- 这是抛出的运行时异常 可以不用try catch进行处理


> throw new Exception("提示文字")
- 编译时异常
- 这时候我们就需要选择来处理异常了

```java

public static void main(String[] args) {
  try {
    Student s = new Student();
    s.regist(-1001);
      - 由于这个位置出现了异常 下面的System输出不会执行 会跳到catch里面

    // 不会执行
    System.out.println(s);

  } catch(Exception e) {

    // 这时我们输出的message就是我们自定义的异常中的提示字符串
    System.out.println(e.getMessage());
  }
}

// 下面我们选择的是 throws 抛出异常
public void regist(int id) throws Exception {
  if(id > 0) {
    this.id = id;
  } else {
    // 在方法内生成一个异常对象
    throw new RuntimeException("您输入的数据非法");
      - 运行时异常 不用处理

    throw new Exception();
      - 编译时就会报错 我们要考虑使用哪种方式处理
  }
}
```


> 比较 throw 和 throws 的异同
- 相同点：
- 它俩没什么相同点 没啥关系

- 不同点：
- throw:
- 手动生成一个异常对象 并抛出 
- throw使用在方法内部 场景就是*给用户的一个提示*

- throws:
- 处理异常的方式 有别于 try catch finally
- throws使用在() *这个位置* {}

- throw和throws是递进关系 前一个环节 和 后一个环节的关系

----------------------------

### 自定义异常类
- 上面我们在手动抛出异常的时候 我们通过 throw new 异常对象
- 我们new的异常对象 都是API中提供好的 那我们可不可以自己定义一个异常类型

- 首先 我们创建一个 异常类的.java文件 然后让它继承现有的异常结构 继承现有的异常类通常我们只会选择两个
- 1. RuntimeException
  - 运行时异常 - 不用考虑显式的处理

- 2. Exception
  - 编译时就会报错 - 需要处理
<!-- 
  MyException.java
 -->

> 如何自定义异常类
- 1. 继承于现有的异常结构
```java
public class MyException extends RuntimeException {
  
}
```

- 2. 提供全局常量 serialVersionUID 序列号
- 这个是属性时static的随着类的加载而加载 就一份 是对我们类的标识
```java
public class MyException extends RuntimeException {
  static final long serialVersionUID = -7034897190745766939L;
}
```

- 3. 提供重载的构造器
```java
public class MyException extends RuntimeException {
  
  static final long serialVersionUID = -7034897190745766939L;

  // 空参构造器
  public MyException() {}

  // 带参的构造器 msg就是提示文字 这个是父类中有的
  public MyException(String msg) {
    super(msg);
  }
}
```

- 当我们定义的异常是 运行时异常 那就不用处理
- 当我们定义的异常是 编译时异常 那我们调用的结构中就要选择处理方式


> 练习
- 判断程序的输出结果

```java
public class ReturnExceptionDemo {
  static void methodA() {
    try {
      System.out.println("进入方法A");
      throw new RuntimeException("制造异常")
    } finally {
      System.out.println("用A方法的finally");
    }
  }


  static void methodB() {
    try {
      System.out.println("进入方法B");
      return;
    } finally {
      System.out.println("调用B方法的finally");
    }
  }


  public static void main(String[] args) {
    try {
      methodA();
    } catch(Exception e) {
      System.out.println(e.getMessage());
    }

    methodB();
  }
}

// 结果：
- 1. System.out.println("进入方法A");
- 2. System.out.println("用A方法的finally");
- 3. 制造异常
- 4. System.out.println("进入方法B");
- 5. System.out.println("调用B方法的finally");

```


> 练习2
- 编写应用程序EcmDef.java 接收命令行的两个参数 要求不能输入负数 计算两数相除

- 对数据类型不一致(NumberFormatException)
- 缺少命令行参数(ArrayIndexOutOfBoundsException)
- 除0(ArithmeticException)
- 输入负数(EcDef自定义的异常)
- 对以上异常进行处理

- 提示：
- 1. 在主类(EcmDef)中定义异常方法(ecm)完成两数相除功能
- 2. 在main方法中使用异常处理语句进行异常处理
- 3. 在程序中 自定义对应输入负数的异常类(EcDef)
- 4. 运行时接受参数java EcmDef 20 10 (args[0] = "20")
- 5. Integer类的static方法parseInt(String s)将s转成对应的int值
<!-- 
  int a = Integer.parseInt("3.14");
  a = 3.14;
 -->

> 要点
- 这道题的意思是
- 我们从命令行接受两个参数 然后让这两个参数进行运算 在运算的期间可能会出现什么样的异常信息

- 1. ecm()方法 用于计算两个数据相除 并返回结果
- 如果接收到的参数是负数的情况下 我们要考虑抛出一个异常

- 所以下面的代码中我们抛出了一个自定义的异常 又因为是递进关系的方法 我们选择使用 throws 方法将异常抛给调用ecm方法的地方统一进行处理

```java
public int ecm(int i, int j) throws EcDef {
  if(i < 0 || j < 0) {
    throw new EcDef("分子或分母为负数了");
  }

  return i / j;
}
```

> 完整的代码部分
```java
public class EcmDef {
  public static void main(String[] args) {

    // 直接往里面放会报错 因为args是String类型 ecm的返回值是int类型
    // ecm(args[0], args[1]);

    try {
      int i = Integer.parseInt(args[0]);
      int j = Integer.parseInt(args[1]);
      int res = ecm(i, j);
      System.out.println(res);

      // 可能转换出异常
    } catch(NumberFormatException e) {
      System.out.println("数据类型不一致");

    } catch(ArrayIndexOutOfBoundsException e) {
      System.out.println("缺少命令行参数");

    } catch(ArithmeticException e) {
      System.out.println("除0");

      // 自定义异常的处理
    } catch(EcDef e) {
      System.out.println(e.getMessage());
    }
  }

  public static int ecm(int i, int j) throws EcDef {
    if(i < 0 || j < 0) {
      throw new EcDef("分子或分母为负数了");
    }

    return i / j;
  }
}
```
----------------------------

### 异常总结

        捕获异常        抛出异常        声明异常

try     执行可能产生      throw         throws
        异常的代码
                      异常的生成阶段    异常的处理方法
                      手动抛出异常对象  声明方法可能要
                                     抛出的各种异常类
catch   捕获异常


finally 无论是否发生异常
        代码总被执行

- 上游排污 下游治污


> throw 和 throws 的区别
- throws是抛出异常 对异常处理的一种方式
- throw是生成对象的一种情况 用来手动抛出一个异常对象

- 它们属于两个环节 throw是生成异常对象的环节 throws是处理异常对象的环节

----------------------------

### IDEA相关

- 创建包
- src - 右键 创建 package 输入包名
  com.sam.java

- 创建类
- 在包下右键创建 class 类


> 创建模块(module)
- 我们在idea的工程下 右键 创建module

- 比如我们创建了一个 java_exer 的项目
- 这个项目下可以有很多的模块 
<!-- 
  | - java_exer
    | - module1
      | - src
        | - 创建package包
    | - module2
      | - src
        | - 创建package包

  相当于 
  java_idea_project
    day01
      src
        com.sam.java

    day02
      src
        com.sam.java
 -->

- 在eclipse中我们有 workspace(工作空间) 和 project(工程)的概念

- 在idea中只有project和moudule的概念 这里对应的关系为

<!-- 
  eclipse中的 workspace 相当于
    idea中的 project

  eclipse中的 project 相当于
    idea中的 moudule
 -->

- idea中一个工程只能维护一个窗口 我们要是想再开启一个创建 相当于我们要重新再创建一个项目

- 但是一个工程下我们可以提供多个module
<!-- 
  比如我们开发京东商城 一个京东商城就是一个项目
  这个京东商城下面 有很多的模块
  登录模块
  秒杀模块

  我们把一个项目打成很多的模块 把这些模块集成在一起构成整个的一个项目
 -->
  
- 小项目就无需搞得这么复杂 只有一个module的结构idea也是支持的 并且idea创建项目的时候 默认就是单模块的


> 删除模块
- 1. 模块处右键 - open module setting - 点击减号

- 2. 模块处右键 - remove

- 最后 右键 delete
<!-- 
  移除module的身份后 就是一个普通的文件目录了 右键的时候就有delete了
 -->


> 常用配置
- idea - preferences

- 配置项
- Appearance & Behavior (外观和行为)

- Keymap (快捷键)

- Editor (编辑器)
  - 设置编辑区的主题 color scheme
  - http://www.riaway.com
  - 下载以后
  - file - import setting - 选中下载的主题jar文件 - 一路确认 - 重启

- Plugins (插件)

- Version Contorl (版本控制)

- Build Execution Deployment (构建 执行 部署)

- Languages && Frameworks (语言 架构)

- Tools (工具集)

- Advanced Setting


> 设置文档头部信息
- editor - file and code templates - includes


> 快捷键
- psvm
  - main方法

- "hello".sout
- sout
  - system.out.println

- 右键 run 运行

- ctrl + d
  - 复制

- ctrl + enter
  - 创建对象
  - 先写new Data()然后使用快捷键

- ctrl + n

- https://www.cnblogs.com/zhaoyan001/p/7499235.html


- ctrl + alt + t
  - 包围代码块

- ctrl + n
  - 重写 构造器等

- ctrl + alt + u
  - 查看类的继承树

- control + h
  - 查看子类

- command + option + b
  - 查看类的实现类
```java
Driver driver = null
// 我们在 Driver 上按下快捷键 可以看到该接口的实现类
```

----------------------------

### java多线程篇

### 程序 进程 线程 基本概念

> 程序 program
- 程序是为完成特定任务(程序要完成什么功能) 用某种语言编写的一组指令的集合 即指*一段静态的代码* 静态对象
<!-- 
  我们写完的代码就认为是静态的
  
  当我们把程序加载到内存当中 这时候它运行要占用cpu的资源 这就是一个动态的过程
 -->

- 一旦我们把一个程序加载到内存中让它跑起来了 它就是一个进程了

- 也就是说程序是一段静态的代码 而进程是这段静态代码的一次执行过程


> 进程 process
- 是程序的一次执行过程 或者*正在运行的一个程序*
- 是一个动态的过程 有它自身的产生 存在 和 消亡的过程 -- *生命周期*
<!-- 
  当我们把程序加载到内存中的时候 就是存在了
  当我们把程序从进程中清掉 关闭程序 就是消亡了
 -->

- 如： 运行中的QQ 运行中的MP3播放器
- 程序时静态的 而进程是动态的
- *进程做为资源分配的单位* 系统在运行时会为每一个进程分配不同的内存区域(每一个进程有独立的方法区和堆)


> 线程 thread
- 进程可进一步细化为线程 *是一个程序内部的一条执行路径*
- 若一个进程同一时间并行执行多个线程 就是支持多线程的
<!-- 
  一个进程中有一条线程 -- 单线程
  ------------------
  |                |
  |  ~~~~~~~~~~~~~ |
  |                |
  ------------------


  多条执行路径 并列执行 -- 多线程
  ------------------
  |  ~~~~~~~~~~~~~ |
  |  ~~~~~~~~~~~~~ |
  |  ~~~~~~~~~~~~~ |
  ------------------
 -->

- 我们的main方法其实就是一条线程

- *线程做为调度的执行的单位 每个线程拥有独立的运行栈和程序计数器* 线程切换的开销小
<!-- 
  简单的说下 jvm内存

  class文件 ---- > 类加载器

                    ↑ ↓

  内存区域：

  方法区      虚拟机栈    本地方法栈

  堆          程序计数器


  先是类的加载器把我们的.class文件加载进来
  我们的类就加载到内存当中了 内存中就会有上面的对应的结构


  虚拟机栈 -- 就是我们知道的栈空间


  本地方法栈 -- 
      native当中的方法 好像是c吧


  程序计数器 和
  虚拟机栈    -- 
      它们两个每一个线程有一份 比如如果有一个进程里面有两个线程 就意味着 这两个线程各自有一套 程序计数器 和 虚拟机栈


  方法区 -- 
      存放静态结构


  堆  -- 
      new的对象在这里

  - 方法区和堆是一个进程有一份
  - 而一个进程当中有多个线程 就意味着这些线程共用一个方法区和堆结构
 -->

- 一个进程中的多个线程共享相同的内存单元/内存地址空间(共享堆和方法区)

- 它们(线程)从同一个堆中分配对象 可以访问相同的变量和对象 这就使得线程间通信更简便 高效

- 但多个线程操作共享的系统资源可能会带来*安全的隐患*
<!-- 
  到底你操作数据 还是我操作数据
  或者
  我操作数据的时候 你又来了 这就是安全隐患的问题
 -->


> 单核cpu和多核cpu的理解
- 单核cpu
- 其实是一种假的多线程 因为在一个时间单元内 也只能执行一个线程的任务
<!-- 
  单核cpu就意味着只有一个核能进行 数据处理

  单核的时候
  我们发现我们也能开好多个程序 每一个程序都是一个进程 而每一个进程里面至少有一个线程
  那是不是说单核的时候 也是多线程的呢？

  其实这时候是一个假的多线程 简单的说 就是一个核 有好多进程过来都希望它能够执行

  cpu会给一个进程执行一段时间然后换下一个进程再执行一段时间 依次执行 因为cpu的主频太高了

  虽然单核的cpu同一个时间段只能做一件事情 但是它太快了

  就像饭店的大厨 虽然只有一个大厨 但它同时做了好多桌的菜 一个炒这个 一个炒那个 能让你感觉出来后台有好多厨师
 -->

- 例如：
- 虽然有多车道 但是收费站只有一个工作人员在收费 只有收了费才能通过

- 那么cpu就好比收费人员 如果有某个人不想交钱 那么收费人可以把他“挂起”(晾着他 等他想通了 准备好钱了 再去收费) 但是因为cpu时间单元特别短 因此感觉不出来

- 如果是多核的话 才能更好的发挥多线程的效率(现在的服务器都是多核的)

- 一个java应用程序java.exe 其实至少有3个线程：
- 1. main()主线程
- 2. gc()垃圾回收线程
- 3. 异常处理线程

- 当然如果发生异常 会影响主线程


> 并行 与 并发
- 并行(同时)：
- *多个cpu*同时执行多个任务 比如 多个人*同时做不同的事情*
<!-- 
  我们可以理解为两个人吃两个包子
  甲吃A包子
  乙吃B包子
  互相不干涉
 -->


- 并发(交替执行)：
- *一个cpu*(采用时间片的策略切换不同的任务, 也就是说它是一个交替执行的动作 cpu在几个任务之间来回切换) *同时执行多个任务* 
<!-- 
  比如 
  cpu在处理A任务的时候 B任务是等待状态 然后CPU处理完A后再切换到B
  依次交替执行 

  可以理解为一个人同时吃2个包子 先吃A一口再吃B一口
-->

- 多线程是使用并发还是并行呢？ 不一定
- 取决于CPU
- 当一个进程里面有多个线程的时候 就是单核cpu在多线程任务之前的切换此时使用的就是并发

- 如果是多核CPU且核数大于线程的数量 此时使用的就是并行





- 比如 秒杀 *多个人做同一件事* -- 并发
<!-- 
  多个人做同一件事
    - 多个线程做同一件事


  秒杀
    - 100台iphone 1万个人在秒杀它 这些人同一时间段涌进来 来抢这100台手机

  篮球在空中 一堆人去抢 这个画面就是并发
 -->


> 使用多线程的优点
- 背景
- 以单核cpu为例 只使用单个线程先后完成多个任务(调用多个方法) 肯定比用多个线程来完成用的时间更短 为何仍需多线程呢？
<!-- 
  比如
  我们c盘有1g的文件 要复制到d盘中
  我们e盘有1g的文件 要复制到f盘中

  假设电脑只有一个单核cpu
  看看下面两种方式哪个快

  先复制c-d       然后e-f
  ---------     ---------

  还是c-d e-f同时进行
  ---------
  ---------

  上面的两种方式哪个快？
  第一个快一些 第二个为什么慢么呢？
  因为一个cpu但是有两个任务 第二种方式相当于有两个线程 这时候我们不光要复制 还要来回的不停切换 第二种方式反而是慢了

  但是有多核的时候 不用来回切换了 第二种方式就快了
 -->

- 切换耗时！

- 但是也不是说 单核的时候就不会创建多线程

- 多线程程序的优点
- 1. 提高应用程序的响应 对图形化界面更有意义 可增强用户体验
<!-- 
  比如360的界面 有的时候我们就需要同时做多个事情

  要是dos的时候 我们通过命令行的方式 一个线程就可以了
  但是图形化界面的时候 比如 先是电脑体检 然后同时 我们还想来一个电脑查杀
 -->

- 2. 提高计算机系统cpu的利用率
- 3. 改善程序结构 将既长又复杂的进程分为多个线程 独立运行 利于理解和修改


> 何时需要多线程
- 程序需要同时执行两个或多个任务
<!-- 
  比如java程序 一方面我们要开启mian方法 主线程跑我们的程序 还有垃圾回收的线程
 -->
- 程序需要实现一些需要等待的任务时 如用户输入 文件读写 网络操作 搜索等
- 需要一些后台运行的程序时

----------------------------

### 线程的创建和使用

- 先看下下面的代码 注意 它不是多线程的代码
```java
package com.sam.java;

public class Sample {
  public  void method1(String str) {
    System.out.println(str);
  }

  public void method2(String str) {
    method1(str);
  }

  public static void main(String[] args) {
    Sample s = new Sample();
    s.method2("hello");
  }
}
```

- 上面的代码不是在main方法中执行method2了 还执行method1了 为什么不是多线程呢？

- 怎么判断是不是多线程 我们就看能不能用一条线画出来 我们说一个一个线程就是程序执行的一条路径 我们要是能用一条线画出来的就是一条路径 就是单线程

- 如果发现这一条路径画不完了 同时还有另外一条路径就是多线程

- 比如上面的代码 main方法进来

    造对象
      ↓
  调用method2
      ↓
  method2内部调用method1
      
- 我们能用一条线给它画出来 那它就是单线程


> 线程的创建和启动
- 一个Thread对象就是一条线程 java语言的jvm允许程序运行多个线程 *它通过java.lang.thread类来创建多线程*


> Thread类的特性
- 每个线程都是通过某个特定的Thread对象的run()方法来完成操作的 *经常把run()方法的主体称为线程体*

- 通过该Thread对象的start()方法启动这个线程 而非直接调用run()


> 创建线程的方式1: 继承于Thread类
> 创建线程的步骤
- 1. 创建一个继承于Thread类的子类

- 2. 重写Thread类中的run方法
- 主要是重写run方法的方法体 *我们将这个线程要做的事情放在方法体中*

- 3. 创建Thread类的子类的对象
- 实例化对象的操作 要在主线程中做 也就是main方法中

- 4. 通过此对象调用start()
- *调用start()方法后会自动调用当前线程对象的run()方法*

```java
// 创建一个继承于Thread类的子类
class MyThread extends Thread {

  // 重写Thread类中的run方法
  @Override
  public void run() {

    // 我们将这个线程要做的事情 写在run()的方法体中
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(i);
      }
    }
  }
}

// 测试类
public class ThreadTest {
  public static void main(String[] args) {
    // 主线程中的逻辑

    // 创建Thread类的子类的对象
    MyThread t1 = new MyThread();

    // 通过此对象调用start() 会自动调用当前线程对象的run()方法
    t1.start();

    // 如下的逻辑 仍然是在main线程(主线程)中执行的
    System.out.println("hello");
  }
}
```

- 上面的代码就是 就是创建的就是一个新的线程了 不同于我们的main 
<!-- 
  main方法中做了
    MyThread t1 = new MyThread();  
    t1.start(); 
  
  等主线程的事
-->

- 解析上面代码的执行过程
- main()方法开始 
- 先造了一个对象MyThread t1 = new MyThread(); 
<!-- 
  这里是main方法对应的主线程完成的逻辑
  也就是说 t1 这个线程是在主线程中造的
 -->

- 调用t1.start(); 方法 也是主线程做的
<!-- 
  调用start方法后 t1线程开始执行了
 -->

- 调用完start以后执行的是 线程中的run()方法里面的逻辑

- 而 System.out.println("hello"); 还在主线程里面执行的
- 也就是说这时候两两个线程在执行 但是hello在哪个地方出来就不确定了 因为两个线程一起执行的

- 小结:
- main方法是主线程 当我们调用分线程的时候 逻辑开始同时进行


> 线程实例对象.start();
- 作用：
- 1. 启动当前的线程
- 2. 调用当前线程的run()方法
<!-- 
  也就是说 
  我们调用 t1.start(); 包括这句代码本身 
  都是 mian()方法对应的主线程 帮我们做的事情

  在启动线程以后 start()方法会自动帮助我们调用 当前线程的run()

  当前线程的run()就是Thread类中的run方法 但由于我们对run方法做了重写

  继承里面说过 当重写父类中的方法后 调用的就是重写后的方法 就会自动执行 我们创建的线程类 MyThread 的run方法
 -->

**注意：**
- 不能让已经调用start()的线程 再次调用start()(试图开始另外一个线程) 会报 IllegalThreadStateException

- 也就是说一个线程对象只能调用一次start()


> 线程实例对象.run();
- *该方法是通过 start()方法自动调用的* 不需要自己去调用
- 因为自己调用该方法 相当于普通的调用t1对象中的方法 并不是开启一个线程

- 我们也会发现 当我们调用t1.run()后 run方法中的逻辑还是在主线程中执行的


> 实现多线程
- 上面的代码我们启动了一个线程(除了main主线程外) 那如何再启动一个线程呢？

- 要想创建多个线程就去造多个线程对象
<!-- 
  那怎么让不同的线程做不同的事儿？
  创建多个线程类么？
 -->

- 我们要重新创建一个线程对象并调用start()方法(new一个新对的线程对象)
```java
public class ThreadTest {
  public static void main(String[] args) {
    
    MyThread t1 = new MyThread();
    t1.start();

    MyThread t2 = new MyThread();
    t2.start();
  }
}

子线程1-- : 0
子线程2-- : 0
子线程2-- : 2
子线程1-- : 2
子线程1-- : 4
子线程2-- : 4
子线程1-- : 6
子线程1-- : 8
```
- 上面代码的执行效果是 同样的事情 同时在执行
- 1执行100以内的偶数遍历 从0开始
- 2执行100以内的偶数遍历 从0开始
- 1 2 同时执行


> 练习
- 需求两个分线程
- 一个线程遍历100以内的偶数
- 一个线程遍历100以内的奇数

- 上面的案例中我们只接触过 两个线程执行的逻辑是一样的

- 这个案例中我们两个线程执行的逻辑是不一样的 怎么办？
- 我们可以*造两个Thread类的子类*呀

```java
package com.sam.thread_exer;

public class ThreadDemo {
  public static void main(String[] args) {
    Thread1 thread1 = new Thread1();
    Thread2 thread2 = new Thread2();

    thread1.start();
    thread2.start();

    System.out.println("main");
  }
}

// 创建一个输出偶数的线程
class Thread1 extends Thread {
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println("Thread1 *** " + i);
      }
    }
  }
}

// 创建一个输出奇数的线程
class Thread2 extends Thread {
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if(i % 2 != 0) {
        System.out.println("Thread2 *** " + i);
      }
    }
  }
}

------

// 多线程的简写方法 
- 虽然也是这4步 但是我们可以调整下 变成匿名子类的方法
new Thread() {
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println("匿名子类 *** " + i);
      }
    }
  }
}.start();
```

> Thread类的相关方法
> 实例对象.start();
- 返回值 void
- 启动当前线程 并自动调用当前线程对象中的run()方法


> 实例对象.run();
- 通常需要重写Thread类中的run()方法
- 线程在被调用的时候自动执行

- 将要在线程中执行的逻辑放在run()方法中
<!-- 
  就是这个线程到底要干什么
 -->


> Thread.currentThread();
- Thread类的静态方法
- 返回当前执行代码的线程 
<!-- 
  Thread.currentThread() 执行这行代码的当前线程
 -->

- 在Thread子类中就是this 通常用于主线程和Runnable实现类
<!-- 
  Thread.currentThread() 就是当前线程
  比如我们给当前线程设置名字
  Thread.currentThread().setName()

  是不是相当于 this.setName()
 -->


> 实例对象.getName();
- 返回值 String
- 返回线程的名称


> 实例对象.setName(String name);
- 设置该线程的名称
- 要在start()方法执行之前设置

```java
// 测试类
public class TreadMethodTest {
  public static void main(String[] args) {
    ThreadTest1 t1 = new ThreadTest1();
    
    // 设置线程名称 必须在start()方法之前
    t1.setName("线程一");

    t1.start();

    // 给主线程设置线程名
    Thread.currentThread().setName("主线程");

    // 主线程中测试的逻辑
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(Thread.currentThread().getName() + ":" + i);
      }
    }
  }
}

// 线程类
class ThreadTest1 extends Thread {
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(Thread.currentThread().getName() + ":" + i);
      }
    }
  }
}

// 结果： Thread-0:90
```

> 给线程起名字 - 方式2
- 上面我们可以通过 setName() 方法给线程起名字
- 我们还可以在Thread子类中 通过构造器的形式给线程起名字
- 在Thread的子类中 填入构造器 在构造器中传入 String name
```java
// Thread的子类的构造器
public ThreadTest1(String name) {
  super(name);
}
```


```java
// 测试类
public class TreadMethodTest {
  public static void main(String[] args) {

    // 起名的方式2
    ThreadTest1 t1 = new ThreadTest1("Thread: 1");

    // t1.setName("线程一");  起名的方式1

    t1.start();
  }
}


// Thread子类
class ThreadTest1 extends Thread {

  // 通过构造器的形式给线程起名字
  public ThreadTest1(String name) {
    super(name);
  }

  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(Thread.currentThread().getName() + ":" + i);
      }
    }
  }
}
```

> yield() -- 线程调用该方法

- 作用:
- *暂停当前正在执行的线程 把执行机会让给优先级相同或更高的线程* 若队列中没有同优先级的线程 忽略此方法

- 释放当前cpu的执行权(有可能又被cpu分配回来)

- 返回值:
- void

- 线程中的方法 所以得是一个线程去调用该方法
- 或者看看下面的例子中是怎么调用的

<!-- 
  // Thread: 1 是分线程

  主线程: *** :2
  主线程: *** :4
  主线程: *** :6
  Thread: 1 *** :54
  Thread: 1 *** :56
  Thread: 1 *** :58
  Thread: 1 *** :60
  主线程: *** :8


  我们观察分线程能发现 我们连续执行了 四个分线程的语句 54 56 58 60

  就是说 执行完54以后 cpu还继续执行分线程的56 58 60

  相当于在这段时间内主线程是没有做任何事情的都分给分线程来做了
 -->

```java
// 测试类
public class TreadMethodTest {
  public static void main(String[] args) {

    // 通过构造器的形式给分线程起名字
    ThreadTest1 t1 = new ThreadTest1("Thread: 1 *** ");
    t1.start();

    // 主线程的测试逻辑
    Thread.currentThread().setName("主线程: *** ");
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(Thread.currentThread().getName() + ":" + i);
      }
    }
  }
}


// 线程类
class ThreadTest1 extends Thread {

  public ThreadTest1(String name) {
    super(name);
  }

  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(Thread.currentThread().getName() + ":" + i);
      }

      if(i % 20 == 0) {

        yield();
        // this.yield();
        // Thread.currentThread().yield(); 这两种写法是一回事
        - run() 方法中调用 yield() 方法
        - 相当于方法中调用方法 一般省略的都是this

        - this代表当前类的对象 也就是实例对象 t1
        - t1也相当于当前的线程(Thread.currentThread())
      }
    }
  }
}
```

- yield();
- 释放当前cpu的执行权 我们在i为60的时候 释放了当前线程的执行权 那么就意味着执行权就会被另外的一个线程拿到

- 注意:
- 我们虽然释放了当前线程的执行权 但是还有可以被重新抢回来

- 比如:
- Thread: 1 *** :60
  Thread: 1 *** :62
  主线程: *** :8

- 正常60的时候我们会释放执行权 后面应该执行其它线程的逻辑 但是我们发现60后面还是62

- 因为分线程释放了执行权 但是又被分线程抢到了
- 或者说cpu又把执行权分给分线程了



> join() -- 线程调用该方法
- 使用方式:
- 线程中的方法 让线程去调 比如 线程的实例对象

- 异常:
- InterruptedException

- 作用:
- 线程A中 调用线程B的join()方法 此时线程A进入阻塞状态 直到线程B完全执行完以后 线程A才会结束阻塞状态

- 解析:
- 也就是说让另外一个线程加进来 先执行这个另外的线程直至结束 原本的线程才会继续执行

- 也就是说 让另外一个线程加入进来会阻塞原本的线程

- 比如当前的线程正在执行(A) 这时候我们调用了另外一个线程(B)的join方法 这时候就会执行另外一个线程(B)的逻辑 直到另外一个线程B执行完毕后 才会继续执行线程A
<!-- 
  | 主线程
  || 分线程


  |
  |
  |
  |       分线程 join
  ||    ↙
  ||
  ||
  ||    → 分线程执行完毕
  |     → 分线程执行完毕后 恢复主线程的执行
  |
  |
 -->

- 应用场景:
- 线程A执行执行 执行到一半的时候需要一些数据 这些数据需要另外一个线程帮它提供 

- 这时候就去调用另外一个线程的join方法 另外一个线程就会执行 在另外一个线程执行的期间 线程A不要动 当数据完全提供给你以后 线程A再继续往下走

```java
public class TreadMethodTest {
  public static void main(String[] args) {
    ThreadTest1 t1 = new ThreadTest1("Thread: 1 *** ");
    // 在这调用start()方法的话 有可能是子线程先执行一部分然后到20的时候子线程全部执行完 但是这样跟要求有点不相符
    t1.start();

    // 以下都是主线程的逻辑
    Thread.currentThread().setName("主线程: *** ");
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(Thread.currentThread().getName() + ":" + i);
      }

      // 主线程中 调用 join();
      if(i == 20) {
        try {
          // 我们在这里调用start()方法和题目的要求相符
          t1.start();

          // 在这里我们调用了另外一个线程(t1这个线程的join方法)
          t1.join();

        } catch(InterruptedException e) {
          e.printStackTrace();
        }
      }
    }
  }
}
```


> sleep(long millis); (毫秒) -- 线程调用该方法
- 作用：
- 让当前线程阻塞(睡眠)指定的毫秒数 在指定的毫秒时间内 当前的线程是阻塞状态


- 使用方式:
- 比如: 
- 1. 可以通过Thread.currentThread().sleep()调用
- 2. 它也是静态方法 也可以使用Thread类去调用
- Thread.sleep();
- 3. 也可以在线程类中直接使用 因为相当于省略了this 而this就是实例对象 也就是线程

- 返回值: 
- void

- 当 当前线程执行完毕后 也不是马上的执行后面的逻辑 而是等待cpu给我们分配资源
- 令当前活动线程在指定时间段内放弃对cpu控制 使其他线程有机会被执行 时间到后重排队

- 异常:
- InterruptedException

- 应用场景
- 比如写桌面级的应用 倒计时 每一秒出现一个 我们就可以用这个sleep方法 让数字每秒跳一下

```java
public class reviewTest {

  public static void main(String[] args) {
    Thread1 t1 = new Thread1("Thread: ");
    t1.start();
  }
}

class Thread1 extends Thread {

  public Thread1(String name) {
    super(name);
  }

  @Override
  public void run() {
    for(int i=0; i<20; i++) {
      try {
        sleep(1000);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      // 这里也不能使用throws 抛异常 因为run方法是重写父类中的方法 父类中没有throws异常 所以我们子类也不能往上抛异常

      // 每次先阻塞一秒 然后再执行下面的逻辑
      System.out.println(Thread.currentThread().getName() + " : " + i);
    }
  }
}
```


> stop();
- 当执行此方法时 强制结束当前线程 不推荐使用 *弃用了*


> isAlive();
- 返回值 boolean
- 判断线程是否还活着
- 线程 当run方法执行完后 就消亡了

```java
System.out.printl(t1.isAlive());
```


> 线程的通信的方法
- 线程的通信的方法还有以下的3个 
- wait()
- notify()
- notifyAll()

- 上面的三个方法没有定义再Thread类中 而是定义在了Object类中


> 线程的分类(了解用)
- java中的线程分为两种:

- 1. 守护线程
- 垃圾回收线程就是守护线程

- 2. 用户线程
- mian方法跑起来 这是主线程 主线程就是一个用户线程


- 当我们的用户线程执行结束的时候 守护线程也就结束了
- 也就是说守护线程依赖于用户线程

- 它们在几乎每个方法都是相同的 唯一的区别是判断jvm何时离开
- 守护线程是用来服务用户线程的 通过在start()方法前调用 *线程.setDaemon(true)* 可以把一个用户线程变量一个守护线程

- java垃圾回收就是一个典型的守护线程 若jvm中都是守护线程 当前jvm将退出

- 形象的理解： 兔死狗烹 鸟尽弓藏

----------------------------

### 线程的调度
- 什么叫做调度？
- 我们创建的多个线程被cpu执行的时候 涉及到cpu调度的策略
- 正常来说cpu采用的时间片的方式来回切换 每个线程执行一段时间
<!-- 
    ---   ---   ---
      ___   ___   ___
 -->

- 除了时间片的方式 还有一种方式 叫做 *抢占式*
- *高优先级的线程抢占cpu*
- 我们可以给线程设置优先级 高优先级的线程会抢占低优先级线程的cpu资源

- 也就是说cpu在切换的时候会优先考虑高优先级的线程
<!-- 
  比如我们去工商银行 办理业务 排号 有A开头 有T开头
  我们有的时候会发现 叫了好几次T才叫一个A 说明T的优先级要比A高
 -->


> java的调度方法
- 同优先级线程 组成先进先出队列(先到先服务), 使用时间片策略

- 对高优先级 使用优先调度的抢占式策略(高优先级抢占低优先级)
<!-- 
  相当于给线程设置为vip客户 
 -->


> 线程的优先级等级
- 1. MAX_PRIORITY: 10   -- 最大优先级
<!-- priority -->

- 2. MIN_PRIORITY: 1    -- 最小优先级
- 3. NORM_PRIORITY: 5   -- 默认优先级

- 这些常量是直接定义在 Thread类 中的
<!--  
  也就是说 线程的优先级有10档
 -->  

- 我们使用这些常量的时候 也是通过 Thread去调用
- Thread.MAX_PRIORITY


> 获取 和 设置 当前线程的优先级
> getPriority();
- 获取当前线程的优先级

> setPriority(int newPriority)
- 设置当前线程的优先级
- 在 线程对象.start() 方法前 修改 线程的优先级

**说明：**
- 线程创建时继承父线程的优先级
- 低优先级*只是获得调度的概率低* 并非一定是在高优先级线程之后才被调用
<!-- 
  高优先级的线程要抢占低优先级线程cpu的执行权
  但是只是从概率上讲 高优先级的线程高概率的情况下被执行

  并不意味着只有当优先级的线程执行完以后 低优先级的线程才执行
 -->

- 比如我们可以*查看*下 当前线程的*优先级*

- 要点：
- 我们可以利用 线程中的"this"(Thread.currentThread())来调用 getPriority() 方法
```java
// 分线程
class ThreadTest1 extends Thread {

  @Override
  public void run() {

    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {

        System.out.println(
          // 获取当前线程名
          Thread.currentThread().getName() 
          + ":"
          + i 
          + " *** 当前线程的优先级: " 
          + 
          // 获取当前线程的优先级值
          Thread.currentThread().getPriority());
      }

      if(i % 20 == 0) {
        yield();
      }
    }
  }
}

// 因为在线程类中 我们也可以省略 
// Thread.currentThread()

// 结果:
Thread: 1 *** :0 *** 当前线程的优先级: 5
主线程: *** :0 *** 当前线程的优先级: 5
主线程: *** :2 *** 当前线程的优先级: 5
主线程: *** :4 *** 当前线程的优先级: 5
Thread: 1 *** :2 *** 当前线程的优先级: 5
```


- 比如我们可以*设置*下 当前线程的*优先级*
- 要点：
- 要在*start()方法前* 设置线程的优先级
```java
public class TreadMethodTest {
  public static void main(String[] args) {

    // 设置分线程的优先级
    // t1.setPriority(10);  -- 最高
    t1.setPriority(Thread.MAX_PRIORITY);

    t1.start();


    // 给主线程设置 线程名
    Thread.currentThread().setName("主线程: *** ");

    // 给主线程设置 优先级  --- 最低
    Thread.currentThread().setPriority(Thread.MIN_PRIORITY)

    // 主线程的测试逻辑
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(
          Thread.currentThread().getName() 
          + ":" 
          + i 
          + " *** 当前线程的优先级: " 
          + 
          Thread.currentThread().getPriority());
      }

      // 主线程中 调用 join();
      if(i == 20) {
        try {
          t1.join();
        } catch(InterruptedException e) {
          e.printStackTrace();
        }
      }
    }
  }
}
```

- 总结：
- 我们观察执行结果能看到 当我们把分线程的优先级调成最高 主线程的优先级调成最低

- 结果并不是分线程执行完后 才执行主线程的逻辑 实际上它们之间也有交错输出逻辑

- 我们只能说分线程设置的优先级比较高 从概率上讲 分线程就有可能被cpu优先执行 但并不一定会被执行


> 练习：
- 需求： 创建3个窗口卖票 总票数为100张

- 要点:
- 我们造3个Window的对象 然后分别start() 让它们执行内部的run()方法 这三个方法都做同一件事情 就是卖票

- 我们发现 线程类中的ticket必须声明成static的 因为这样才能解决 三个窗口共用一份数据的问题

- 那我们不加static有没有办法解决这个问题呢？
- 这就涉及到我们创建多线程的第二种方式

```java
package com.sam.java;

public class WindowTest {
  public static void main(String[] args) {
    Window t1 = new Window();
    Window t2 = new Window();
    Window t3 = new Window();

    // 给线程起名字
    t1.setName("窗口1");
    t2.setName("窗口2");
    t3.setName("窗口3");

    t1.start();
    t2.start();
    t3.start();
  }
}

// 创建线程
class Window extends Thread {

  // 一共100张票 要加static哦
  private static int ticket = 100;

  @Override
  public void run() {
    // 这个线程主要做的事情就是卖票
    while (true) {

      // 说明还有余票
      if(ticket > 0) {
        // getName() 相当于 Thread.currentThread().getName()
        System.out.println(getName() + ": 卖票, 票号为: " + ticket);

        // 票一张 就减少一张
        ticket--;

      } else {
        // 如果ticket为0了 跳出循环
        break;
      }
    }
  }
}
```

----------------------------

### Error: java: 无效的源发行版: 1.9
- 主要是针对jdk1.9 相当于我们在1.9的版本上跑了 
- 比如我们当前项目的 External Libraries 是jdk1.8
- 然后我们试图让它用jdk1.9去跑 报的错误

- 可能是 Project Structure 设置中
- project选项卡
- A module specific language level can be congifured for each of ths modules as required

- 这里选择8
- 或者 选择 SDK default

----------------------------

### 创建线程的方式2: 实现Runnable接口
- 我们上面就说过有多种方式来创建多线程 上面介绍了创建一个线程类然后让它继承Thread类的方式 创建的线程

- 这里再介绍一种方式 实现Runnable接口 的方式

- 方式1: 让一个类继承 Thread 类重写run()方法
- 方式2: 让一个类实现 Runnable 接口 实现run()方法 创建实现类对象 将对象放入 new Thread(实现类对象) 中


> 完整步骤:
> 实现Runnable接口的具体步骤
- 1. 创建一个实现了 Runnable 接口的类 (实现类)
- 2. 实现类去实现Runnable中的抽象 run() 方法
- 3. 创建实现类的对象
- 4. 将实现类的对象作为参数传递到Thread类的构造器中 创建Thread类的对象
- 5. 通过Thread类的对象 调用start()

```java
public class ThreadTest2 {
  public static void main(String[] args) {
    // 3. 创建实现类的对象
    ThreadRunnable threadRunnable = new ThreadRunnable();

    // 4. 创建Thread类的对象 将实现类的对象作为参数传递到Thread类的构造器中
    Thread t1 = new Thread(threadRunnable);
      - Thread(Runnable) Thread类中有一个构造器的参数就是Runnable接口 
      - 这里我们传入的是该接口的实现类 属于多态的形式了

    // 5. 通过Thread类的对象 调用start()
    t1.start();
  }
}

// 1. 创建一个实现了 Runnable 接口的类 (实现类)
class ThreadRunnable implements Runnable {

  // 2. 实现类去实现Runnable中的抽象 run() 方法
  @Override
  public void run() {
    // 线程中要做的事情
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(i);
      }
    }
  }
}

- 上面我们创建了一个 t1 线程
- 谁start()的 谁就是线程
```

> 思考： 为什么 t1.start() 后执行的是实现类中的run()
- 上面我们讲过 t1.start() 的方法的作用
- 1. 启动线程
- 2. 调用当前线程的run() 那它调用的应该是Thread类中的run()方法
<!-- 
  Thread t1 = new Thread(threadRunnable);
 -->

- 之前(继承Thread类的方式创建线程)我们通过t1.start()的时候 因为是继承了Thread类 然后重写了Thread类中的run方法，所以我们执行的是 线程类中重写后的run方法中的逻辑

- 但现在是我们创建了一个类 实现了Runnable接口 接口中实现了run()方法
- 为什么t1.start()执行的是 实现类中的run方法的逻辑呢？我们确实实现了Runnable 但继承的是Object类啊

- 我们看下原码
- 我们调用start()后 确实执行的是Thread中的run
```java
public void run() {
  if(target != null) target.run();
}
```

- target 是 Thread类中声明的一个变量 它就是Runnable的类型
```java
private Runnabale target;
``` 

- 上面我们创建Thread类的时候 我们用的是带参的Thread构造器
```java
public Thread(Runnable target) { }
```

- 相当于我们在 Thread t1 = new Thread(threadRunnable); 放入形参的就是实现类

- 然后原码中将我们传入的实现类 赋值给了 target
- private Runnabale target; 

- 然后我们再看下面的原码就知道 调用的是target.run()就是调用的实现类中的run()
```java
public void run() {
  if(target != null) target.run();
}
```


> 再创建一个线程 执行同样的逻辑
```java
public class ThreadTest2 {
  public static void main(String[] args) {
    ThreadRunnable threadRunnable = new ThreadRunnable();

    Thread t1 = new Thread(threadRunnable);
    t1.start();

    // 再启动一个线程 遍历100以内的偶数
    Thread t2 = new Thread(threadRunnable);
    t2.start();
  }
}
```


> 练习
- 需求： 多窗口卖票 总票数100张
- 使用实现Runnable的方式

- 要点：
- 为什么我们在实现类中没有加static 它们也是共用同一个ticket呢？

```java
package com.sam.java;
public class WindowTest2 {
  public static void main(String[] args) {

    Window2 w = new Window2();
    // 答案： 
    - 我们只造了一个实现类的对象 
    - 这一个对象放到了下面3个Thread构造器中 
    - 相当于这3个线程用的都是同一个实现类的对象 
    - 所以实现类中的ticket自然而然的用的就是同一个

    Thread t1 = new Thread(w);
    Thread t2 = new Thread(w);
    Thread t3 = new Thread(w);

    t1.setName("窗口1");
    t2.setName("窗口2");
    t3.setName("窗口3");

    t1.start();
    t2.start();
    t3.start();
  }
}


class Window2 implements Runnable {

  private int ticket = 100;

  @Override
  public void run() {
    while(true) {
      if(ticket > 0) {
        System.out.println(Thread.currentThread().getName() + ": 卖票, 票号为: " + ticket);
      } else {
        break;
      }
    }
  }
}
```

----------------------------

### 两种创建多线程的方式对比
- 一种是继承Thread类的方式 另一种是实现Runnable接口的方式 那两种方式有什么样的区别呢？

- 继承方式的弊端：
<!-- 
  我们在讲继承的时候说话 在java类的层面有局限性 
  比如上面的方式一的买卖票案例中 我们让窗口继承Thread类 总感觉从语义上讲 有些怪怪的 

  因为不符合is-a的关系

  而我们为了实现多线程还必须让窗口去继承Thread类
  而java又是单继承的 继承Thread类后 又不能继承其它的类了 这里就是一个弊端

  另外一个方面 如果窗口这个类已经显式的有一个父类了 那么窗口这个类就继承不了Thread类了 因为有单继承性的限制
 -->


- 实现Runnable接口的方式：
<!-- 
  我们发现在实现Runnable接口的方式的时候 我们不用把ticket声明成静态的

  而在继承的方式当中必须把ticket声明成一个静态的
  实现Runnable接口的方式 天然就满足 共享数据的概念

  Window2 w = new Window2();

  Thread t1 = new Thread(w);
  Thread t2 = new Thread(w);
  Thread t3 = new Thread(w);

  我们把new的唯一的Window2对象 最为参数传递到多个线程当中
  自然而然的 Window2 w 对象就是这三个线程的共享数据
 -->


> 比较创建线程的两种方式：
- 开发中：
- 优先选择实现Runnable接口的方式

- 原因：
- 1. 实现Runnable接口没有类的单继承性的局限性
- 2. 实现Runnable接口更适合处理多个线程有共享数据的情况

- 两者之间的联系：
- public class Thread implements Runnable {}

- 相同点:
- 两种方式都需要重写run方法 将线程要执行的逻辑声明在run()中

- 目前两种方式 要想启动线程都是调用的Thread类中的start()方法

<!-- 
                    ------------
                    | Runnable |
                    ------------
      Thread类实现 ↗
    ---------           ↑
    | Thread |          ↑
    ---------           ↑
        ↑
    方式1 继承Thread   方式2 实现Runnable


    我们看源码能看到 Thread类也实现了Runnable


    方式1相当于我们造了一个Thread类的子类

    方式2不去继承Thread类了 既然Thread类实现了Runnable接口 那我也直接实现Runnable接口

    方式1就子类重写父类的方法 父类实现Runnable中的run

    方式2 我们直接实现Runnable中的run
 -->

----------------------------

### 线程的生命周期
- jdk中用Thread.State类定义了线程的几种状态
- 要想实现多线程 *必须在主线程中创建的线程对象* java语言使用Thread类以及子类的对象来表示线程 在它的一个完整的生命周期中通常要经历如下的五种状态

> 1. 新建
- 当一个Thread类或其子类的对象被*声明并创建时* 新生的线程对象处于新建状态

> 2. 就绪
- 处于新建状态的线程被*start()后* 将进入线程队列等待cpu时间片 此时它已具备了运行的条件 只是*没有分配到cpu资源*

> 3. 运行
- 当就绪的线程*被调度并获得cpu资源时* 便进入运行状态 run()方法定义了线程的操作和功能

> 4. 阻塞
- 某种特殊情况下 被认为挂起或执行输入输出操作时 让出cpu并临时中止自己的执行 进入阻塞状态

> 5. 死亡
- 线程*完成了它的全部工作*或*线程被提前强制性中止*或*出现异常导致结束*
- 线程一定是奔着死亡去的 也就是说线程一定会死亡


> 线程状态的切换 -- 方法的调用导致状态的切换
- 线程状态的切换有别于我们的vue里面的生命周期 vue中是状态的切换导致的某个方法的执行(这个方法称之为回调方法)

- 线程是某个方法的调用导致线程状态的切换
- 比如本来线程是运行的状态 我们调用了另外一个线程的join方法 导致了我们当前的线程从运行到阻塞了


> 线程的生命周期图
<!-- 
                  (阻塞)
      
  (新建) -- (就绪)        (运行) -- (死亡)


  新建:
  - Thread t1 = new Thread()

  ---

  就绪:
  - 注意 并不是我们调用start后线程就马上运行
  t1.start()

  ---

  阻塞:
  - 此状态的线程什么也干不了 cpu想执行它也不行
  - 阻塞后不能马上回到运行 而是先回到就绪 然后 cpu给你执行权了 然后才能运行

  - 阻塞的情况如下:
  - 1. sleep(long ms)
  - 2. join()
  - 3. 等待同步锁
  - 4. wait()
  - 5. suspend()  -- 挂起 -- 废弃

  - 阻塞不是一个线程的最终状态 阻塞一定会回到就绪 最终状态一定是死亡

  - 回到就绪状态的情况
  - 1. sleep() 的时间到了 就回到就绪了
  - 2. join()对应的线程执行结束
  - 3. 获取同步锁后
  - 4. notify() notifyAll()
  - 5. resume()   -- 结束挂起的状态 -- 废弃

  ---

  运行:
  - 线程获取cpu的执行权后 就可以运行了
  - 这个期间也可以回到就绪(失去执行权) cpu是来回切换的 也就是说
  - 是在 就绪 和 运行 之间来回切换

  - 还可以通过 yield() 一调用该方法就释放执行权 相当于回到就绪状态了

  ---

  死亡:
  - 下面3种是死亡的情况
  - 1. 执行完run方法
  - 2. stop()
  - 3. 异常 or error 且没处理
 -->


> 说明:
- 阻塞状态是一种临时状态 可以阻塞但不能一直阻塞 不可以作为最终状态
- 对于线程来讲 最终都是走向死亡的 

----------------------------

### 理解线程安全问题
- 上面我们做过多线程卖票的练习 在练习中会有重票和错票的问题 这些就是线程的安全问题
<!-- 
  比如有一个账户 账户里面有3000 
  - 线程1
  我拿着银行卡想去银行取2000

  - 线程2
  erin在网上买东西2000

  - 有种极端的现象 我刚取钱银行系统也判断成功 但是突然线程阻塞了 就在阻塞的这段期间 erin那边也判断成功了 因为都判断成功 两边都会取出2000

  - 这就是线程的安全问题
 -->

- 我们在写多线程的时候 不一定会出现线程的安全问题
- *当有共享的数据的时候 操作共享数据的时候 就可能会出现线程安全问题*

- 问题的提出
- 多个线程执行的不确定性一起执行结果的不稳定
- 多个线程对账本的共享 会造成操作的不完整性 会破坏数据

----------------------------

### 线程安全问题的举例和解决措施
- 上面我们做过通过多线程的方式 卖票的练习
- 但是我们发现 当我们使用共享数据的时候 会产生 线程安全的问题 比如我们上面的练习中就出现了 卖重票的问题

> 重票
- 重票是线程安全中的一种情况
```java
package com.sam.java;

public class WindowTest {
  public static void main(String[] args) {
    Window w = new Window();
    Thread t1 = new Thread(w);
    Thread t2 = new Thread(w);
    Thread t3 = new Thread(w);

    t1.setName("窗口1");
    t2.setName("窗口2");
    t3.setName("窗口3");

    t1.start();
    t2.start();
    t3.start();
  }
}

class Window implements Runnable {
  private int ticket = 100;

  @Override
  public void run() {
    while (true) {
      if(ticket > 0) {
        System.out.println(Thread.currentThread().getName() + ": 卖票，票号为: " + ticket);
        ticket--;
      } else {
        break;
      }
    }
  }
}

```

<!-- 
  窗口3: 卖票，票号为: 100
  窗口3: 卖票，票号为: 99
  窗口1: 卖票，票号为: 100
  窗口1: 卖票，票号为: 97
  窗口2: 卖票，票号为: 100

  我们会看到 窗口1 2 3 都卖了100号的票 -- 重票了
-->


> 错票
- 错票也是线程安全中的另一种情况
- 为了演示线程安全问题 我们将线程 sleep 下

```java
class Window implements Runnable {
  private int ticket = 100;

  @Override
  public void run() {
    while (true) {
      if(ticket > 0) {
        // 1. sleep方法会抛异常
        // 2. sleep方法是静态的方法
        try {
          Thread.sleep(100);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }

        System.out.println(Thread.currentThread().getName() + ": 卖票，票号为: " + ticket);
        ticket--;
      } else {
        break;
      }
    }
  }
}
```

<!-- 
  窗口3: 卖票，票号为: -1

  我们发现卖票的结果中出现 -1 的情况
 -->

> 思考:
- 为什么加上sleep后会出现 -1 的情况呢？
- 我们没有加sleep的时候 出现0票 和 -1票的概率小一些 但是加上sleep以后 相当于让线程进入try的时候 会阻塞一下

- 我们加sleep的目的不是让原来不出现0 -1 让0 -1出现 原来的情况也是会出现的 只是我们使用sleep后让0 -1的出现的概率变大了
<!-- 
  情景重现
  有一种极端状态 ticket只有1张了 现在有3个线程要执行run方法中的逻辑

  线程1先去执行 run中if会判断ticket是否>0 线程1就能进入if语句 进入if语句后 就被sleep进入了阻塞状态

  就在线程1被阻塞的时候 线程2 3也有非常大的概率也会进到run方法中 和 if语句的判断里

  它们也会碰到sleep后 被阻塞 也就是说 现在有3个线程都处于了阻塞状态

  等sleep时间到了后 这三个线程就会变成就绪状态 cup就会相继的执行这3个线程

  因为都在if语句里 都会执行ticket--的操作 就会变成如下状态
  t1 - 打印车票 1
  t2 - 打印车票 0
  t3 - 打印车票 -1

 -->

- 我们不能因为出现重票和错票的概率小 就不去解决这个问题 0.01%的概率我们也要去解决
<!-- 
  这里面最好的例子就是春运 上10亿的人迁徙 就容易出现上面的重票和错票的问题
 -->

- 以上就是待解决的线程问题
- 1. 问题：
- 卖票过程中 出现了重票和错票 -- 线程的安全问题

- 2. 问题出现的原因：
- 当某个线程操作车票的过程中 尚未操作完成时 其它的线程参与进来 也操作车票(共享数据)

- 3. 解决方法：
- 当一个线程a在操作ticket的时候 其它的线程bc不能参与进来 直到线程a操作完ticket的时候 其它的线程才可以操作ticket 这种情况即使线程a出现了阻塞 也不能被改变
<!-- 
  举个生活中的例子:
  - 学校厕所的坑位是有限的 学生们下课需要上厕所 正常来说 一个学生进去后 拉完 下一个学生才能进 但是有极端案例 你上厕所的时候 另一个学生也进去了

  - 解决方式
  - 学生进去后 把门上锁 这样其它人就进不来了

  - 车票的问题也是 
  - 我们的线程进入到run方法中后 即使sleep了 别的线程也不准进来 知道我自己单独走完卖票的逻辑 别的线程再进来
 -->

----------------------------

### 同步代码块 和 同步方法 解决 实现Runnable和继承Thread方法的线程安全问题

> 同步代码块 处理 实现Runnable接口的线程安全问题
- 在java中 我们通过同步机制 来解决线程的安全问题
- java中解决线程安全问题 一共有3种方式
- jdk5.0之前有两种 之后有一种新增的方式


> JDK5.0之前的方式1：  同步代码块(相当于synchronized函数)
- *操作共享数据的代码* 就是 *需要被同步的代码*

> 1. 共享数据：
- 多个线程共同操作的变量(数据)就是共享数据 比如上面案例中的ticket就是共享数据

> 2. 同步监视器：
- 俗称：锁
<!-- 
  比如上面的去厕所的例子 怎么才算安全呢？ 我们进去以后锁一下 一锁就安全了 别人开门开不开 因为锁给锁住了

  这时候我们就放把锁 谁进去谁就拿着这把锁 没进去的人就拿不到锁 谁能拿到锁谁就操作这段代码
 -->

- 锁：
- 任何一个类的对象　都可以充当锁
```java
// 这个obj也可以当锁
Object obj = new Object();
```

> 锁的要求：
- 多个线程必须要共用同一把锁(共用同一个监视器)
- 当我们发现已经使用同步方法解决线程安全的问题 但是结果却还是出现错票等情况 我们就要考虑是否线程们没有用同一把锁


> 具体代码
```java
  synchronized(同步监视器) {
    操作共享数据的代码(需要被同步的代码) 
  }
```
- 作用:
- 保证这些代码在执行的过程中是单线程的 在操作的过程中别的线程进不来


**注意：**
- “需要被同步的代码” *不能包多了 也不能包少了*
<!-- 
  包多了为什么不对 
  1. 包起来的代码就会变成单线程 有效率上的问题
  2. 有的时候包多了 就错了 
  - 比如下面的代码中 我们就没有包 while true 包上后 就变成一个线程把这些票都卖了
 -->

```java
  // 部分代码
  Object obj = new Object();    // 1. 创建锁

  // 2. 传入锁
  synchronized(obj) {

    // 3. 包裹操作共享数据的代码
    if(ticket > 0) {
      try {
        Thread.sleep(100);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      System.out.println(Thread.currentThread().getName() + ": 卖票，票号为: " + ticket);
      ticket--;
    } else {
      break;
    }
  }
```
- 结合上面的卖票的案例 把操作ticket数据的代码 就是需要被同步的代码

<!-- 
  一些代码 == 需要被同步的代码

  下面的 "一些代码" 我们希望线程过来执行 可能会阻塞
          ---------------
  线程  → |   一些代码     |  → 出去
          ---------------

  只要 "一些代码" 还在 synchronized的方法体里面 
  这时候 其它的线程都得等着

  当线程出去以后 其它线程看谁能抢到cpu分配的执行权 谁再进去执行
 -->


> 同步代码块的方式 解决 实现Runnable方式的线程安全问题
- 代码部分：
```java
package com.sam.java;

public class WindowTest {
  public static void main(String[] args) {
    // 因为我们只new了一个对象 里面对应的就一把锁 t123共用这个对象
    Window w = new Window();
    Thread t1 = new Thread(w);
    Thread t2 = new Thread(w);
    Thread t3 = new Thread(w);

    t1.setName("窗口1");
    t2.setName("窗口2");
    t3.setName("窗口3");

    t1.start();
    t2.start();
    t3.start();
  }
}

class Window implements Runnable {

  private int ticket = 100;

  // 任何对象都可以充当锁 
  // 但要求就是 所有线程共用同一把锁
  Object obj = new Object();

  @Override
  public void run() {
    while (true) {
      // 共享数据是ticket 
      // 我们将操作共享数据的代码 用 synchronized 的方法体包起来
      // if ticket > 0 也属于操作ticket了
      synchronized(obj) {
        if(ticket > 0) {
          try {
            Thread.sleep(100);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }

          System.out.println(Thread.currentThread().getName() + ": 卖票，票号为: " + ticket);
          ticket--;
        } else {
          break;
        }
      }
    }
  }
}
```

> 同步代码块的方式 解决 继承Thread类的方式的线程安全问题
- 代码部分
```java
package com.sam.java;

public class WindowTest2 {
  public static void main(String[] args) {
    Window2 t1 = new Window2();
    Window2 t2 = new Window2();
    Window2 t3 = new Window2();

    t1.setName("窗口1");
    t2.setName("窗口2");
    t3.setName("窗口3");

    t1.start();
    t2.start();
    t3.start();
  }
}

class Window2 extends Thread {

  private static int ticket = 100;
  
  // 注意多个线程需要共用一把锁 要求唯一
  private static Object obj = new Object();

  @Override
  public void run() {
    while (true) {
      
      // 使用 synchronized()
      synchronized(obj) {
        if(ticket > 0) {

          try {
            Thread.sleep(50);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }

          System.out.println(Thread.currentThread().getName() + ": 卖票，票号为: " + ticket);
          ticket--;
        } else {
          break;
        }
      }
    }
  }
}
```


> 关于锁的简单用法 
- 上面我们使用同步代码块的方式解决实现Runnable接口 和 继承Thread类的两种方式的线程安全问题

- 当中我们都使用 Object obj = new Object() 造了一个obj来充当"锁"
- 那有没有什么简单的 对象 可以用 不用每次都造呢？

> 实现Runnable接口 --- this
- 当前对象!!!
```java
class Window implements Runnable {
  public void run() {
    while (true) {
      // 这里使用 this
      synchronized(this) {

      }
    }
  }
}

- this谁？
- this代表着当前对象 调用run方法的对象 就是this 
- 而run方法定义在Window类中
- Window的对象就是this
- 我们只造过一个Window的对象 Window w = new Window()  w
- 所以 this -- w 就是唯一的
```


> 继承Thread类的方式 --- Window.class
- *该方式不能使用this*
- 因为我们new了3次Window对象 就有3个this
```java
Window2 t1 = new Window2();
Window2 t2 = new Window2();
Window2 t3 = new Window2();
```

- 但是该种方式 我们可以用 Window.class 我们拿当前类去充当“锁”
- 因为类也是对象 因为类只会加载一次 所以也是唯一的

```java
class Window implements Runnable {
  public void run() {
    while (true) {
      // 这里使用 Window.class
      synchronized(Window.class) {

      }
    }
  }
}
```

> 总结：
- 在实现Runnable接口创建多线程的方式中 我们可以考虑使用this充当同步监视器

- 在继承Thread类创建多线程的方式中 慎用this充当同步监视器(这里我们要考虑线程们是否用的同一把锁 也就是说this到底是代表谁) 如果this不靠谱可以考虑当前类充当同步监视器 Window.class


> JDK5.0之前 解决线程安全问题的第2种方式:
> synchronized 同步方法 解决实现Runnable和继承Thread的线程安全问题
- 如果操作共享数据的代码完整的声明在一个方法中 我们不妨将此方法声明为同步的 该方法就是同步方法

> 同步方法: public synchronized void run() { }
- 在方法的返回值类型前面使用 synchronized 关键字 进行修饰
- 注意：
- 我们使用 synchronized 关键字 包裹的是 处理同步数据的逻辑 不能包多也不能包少

```java
public synchronized void run() { }
```

- 如果run方法里面完整的就是操作共享数据的逻辑 我们可以考虑给run()方法添加该关键字 但是不适用于我们卖票的逻辑
- 因为如果将while也包进去的话 会变成一个线程单独卖100张票的情况


- 适用 synchronized关键字 修饰的同步方法 就跟 使用同步锁的功能是一样的
- 同步方法外面可能有好几个线程 但是同步方法里面只能进去一个线程


> 代码演示部分 -- 同步方法解决 实现Runnable接口方式的线程安全问题
```java
class Window3 implements Runnable {

  private int ticket = 100;

  @Override
  public void run() {
    while(true) {
      // 调用show方法
      show();
    }
  }

  // 定义一个操作共享数据的show方法 里面是完整的操作共享数据的代码
  // 我们对这个方法 使用 synchronized 关键字修饰
  private synchronized void show() {
    if(ticket > 0) {
      try {
        Thread.sleep(50);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      System.out.println(Thread.currentThread().getName() + ": 卖票，票号为: " + ticket);
      ticket--;
    }
    // break要用在循环当中 show()方法里面没有循环 所以不能适用break
    // else { break; }
  }
}
```

- 思考
- 同步方法中有没有同步监视器(锁)?
- 在同步方法中默认的监视器就是this 所以不用显示声明


> 代码演示部分 -- 同步方法解决 继承Thread类方式的线程安全问题
- 这里我们使用同步方法解决继承Thread类方式的线程安全问题

> 代码演示部分
```java
class Window4 extends Thread {
  private static int ticket = 100;

  @Override
  public void run() {
    while (true) {
      // 非静态的方法是可以调用静态的方法
      show();
    }
  }

  // 必须加上static
  private static synchronized void show() {
    if(ticket > 0) {
      try {
        Thread.sleep(50);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      System.out.println(Thread.currentThread().getName() + ": 卖票，票号为: " + ticket);
      ticket--;
    }
    // else { break; }
  }
}
```

- 思考：
- 继承方式中 使用同步方法 我们将*方法声明为static* 那么这时候的同步监视器是谁
- *Window4.class*

> 总结一小波
- 在处理继承Thread类的情况下 不管是定义共享数据 还是同步方法解决安全问题我们都不要忘记 使用 *static*


> 关于同步方法的总结：
- *同步方法仍然涉及到同步监视器 只是不需要我们显式声明*
- 非静态的同步方法 同步监视器("锁"): this
- 静态的同步方法 同步监视器("锁"): 当前类本身 Window4.class
<!-- 
  静态方法中是不能用this的 因为静态方法是随着类的加载而加载 加载后还没有当前对象呢（this）
 -->


> 同步的方式 解决线程的安全问题的优缺点
- 1. 优点
- 解决了线程安全问题

- 2. 缺点
- 操作同步代码时 只能有一个线程参与 其它线程等待 相当于是一个单线程的过程 效率低

- 但即使这样我们为了解决安全性的问题也要这么做


> 同步代码块 和 同步方法 都是执行完 操作共享数据的逻辑后自动释放同步监视器

----------------------------

### 单例模式（懒汉式） 的线程安全问题
- 之前我们说过懒汉式是线程不安全的一种模式 我们将懒汉式改为线程安全的
- 
- 我们使用同步的方式来解决线程安全的问题 有2点缺点
- 1. 因为成为同步了 那么效率会有些低
- 2. 容易造成 “死锁”


> 场景：
- 我们创建单例模式就是为了只创建一个实例 当在多线程的情况下 有可能实例对多次创建 这就是在懒汉式带来的线程安全问题

- 我们创建多个线程 它们各自去调用 run方法 在各自的run方法中又调用了 createBank()

- 就意味着可能会有多个线程来调用 createBank()方法
- 在极端情况下 一个线程进入if判断后可能会遇到阻塞的情况 另外的一个线程这时候也会进来 就可能造成会创建两个Bank实例

- 之所以出现了线程安全问题 是因为我们有两个线程 而且还有共享数据 bank

> 共享数据：
- 我们对bank共享操作一方面判断它是不是null 一方面给它进行了赋值
- return bank 算不上是对共享数据的操作 上面的if和赋值才算 包不包都行


> 解决方案
- 关于解决线程安全问题 有两种解决方法 同步代码块 和 同步方法

- 1. 同步方法
- 我们直接在createBank方法的前面使用synchronized修饰 这时候它就是一个线程安全的
- public static synchronized Bank createBank() { }

- 原因:
- 这时候 createBank就是一个同步方法 同步方法的所是当前类
- 静态类的同步方法的锁是当前类本身


> 演示代码部分
```java
package com.sam.java1;

// 使用同步机制将单例模式中的懒汉式改写为线程安全的
public class BankTest {

}

class Bank {
  private static Bank bank = null;
  private Bank() { }

  // 使用同步方法 解决
  public static synchronized Bank createBank() {
    if(bank == null) {
      bank = new Bank();
    }
    return bank;
  }


  // 这种方法效率比较差
  // 使用同步代码块的方式 解决
  public static Bank createBank() {

    // 使用代码块进行包裹 注意静态方法中的锁是 类本身
    synchronized (Bank.class) {
      if(bank == null) {
        bank = new Bank();
      }
      return bank;
    }
  }
}
```


> 为什么使用同步代码块的方式解决线程安全问题 效率会比较差？
- 比如我们 synchronized 代码块外面有多个线程 线程a拿到同步锁了进到if里面了 然后它把对象创建了 然后出了代码块

- 线程b等线程a执行完后也进去if里面了 但是什么也没有干 出了if直接拿着return的结果出去了 因为不为null了所以什么也没干

- 后面还有线程cdefg 它们也会进到if 而实际上它们不用进到if 可以直接拿着return的结果走就可以了

- 修改：
```java
public static Bank createBank() {
  if(bank == null) {
    synchronized (Bank.class) {
      if(bank == null) {
        bank = new Bank();
      }
    }
  }
  // 这里就没有把return bank认为是操作共享数据
  return bank;
}
```

- 为什么上述方式效率比较高？
- 后来的线程再进去的时候 判断if就不是null了 所以拿着return的结果直接就走了


- 总结：
- 以后写单例模式要写一个线程安全的模式

----------------------------

### 线程的死锁问题
- 以前我们说过死循环 死锁就是锁住出不来了

> 死锁：
- 不同的线程分别占用对方需要的同步资源不放弃 都在等待对方放弃自己需要的同步资源 就形成了线程的死锁

- 出现死锁后 不会出现异常 不会出现提示 只是所有的线程都处于阻塞状态 无法继续

<!-- 
  // 例子
  - 我们现在要吃饭 桌子上有很多的菜 假设我们都要用筷子 现在有两个吃饭 但只有一双筷子

  - 正常来讲一个人吃完另一个人吃 对应着正常都能执行
  - 现在的情况是 一个人拿了“一根筷子” 都在等待对方将手里的筷子给自己 僵持下来了 最后就是谁也吃不到
 -->

> 解决方法
- 专门的算法 原则
<!-- 
  利用算法避开两个类的同步方法 互相调用的情况
 -->

- 尽量减少同步资源的定义
<!-- 
  不用同步的时候 就不要使用同步 使用多了效率低 一旦嵌套就死锁了
 -->

- 尽量避免嵌套同步


> 出现死锁的情况
- 演示的时候我们使用的是匿名方式创建多线程 分别用了继承和实现

- 首先
- 我们创建了两个字符串对象 s1 s2 
然后创建两条线程往s1 s2字符串对象中添加字符
```java
StringBuffer s1 = new StringBuffer();
StringBuffer s2 = new StringBuffer();

// 线程A 预定往s1 s2中分别添加 a b 1 2
// 线程2 预定往s1 s2中分别添加 c d 3 4

// 多线程的执行结果可能有两种
// - abcd 1234
// - cdab 3412
```

- 它们都要操作s1 s2对象 所以出现了共享数据 为了避免线程安全问题 我们要考虑使用同步方法块的方式去解决问题
- 但在同步代码块中 我们使用了嵌套锁的逻辑

- 下面看下代码
```java
public class ThreadTest {
  public static void main(String[] args) {
    // 造两个字符串对象
    StringBuffer s1 = new StringBuffer();
    StringBuffer s2 = new StringBuffer();

    // 匿名的方式 + 继承的方式 创建一条线程
    new Thread(){
      @Override
      public void run() {

        // 使用同步代码块 解决线程安全问题 使用s1当锁
        synchronized(s1) {

          // 往s1字符串里面添加了一个"a"
          s1.append("a");
          s2.append("1");

          // 让这段代码容易出现死锁的现象
          try {
            Thread.sleep(100);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }

          // 创建嵌套的锁
          synchronized(s2) {
            s1.append("b");
            s2.append("2");

            System.out.println(s1);
            System.out.println(s2);
          }
        }
      }
    }.start();

    // 匿名的方式 + 实现Runnable接口的方式 创建线程
    new Thread(new Runnable() {
      @Override
      public void run() {

        // 和上面不一样的地儿 线程进来先握s2锁
        synchronized(s2) {
          s1.append("c");
          s2.append("3");

          // 让这段代码容易出现死锁的现象
          try {
            Thread.sleep(100);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }

          // 里面需要再握s1锁
          synchronized(s1) {
            s1.append("d");
            s2.append("4");

            System.out.println(s1);
            System.out.println(s2);
          }
        }
      }
    }).start();
  }
}
```

- 上述代码的解析：
- 1. 我们有两把锁 两个线程
- 2. 
  线程A的run方法中的锁顺序是s1 s2
  线程B的run方法中的锁顺序是s2 s1


- 线程A进入run()方法
  synchronized(s1) { }
                ↑
  线程A拿到s1锁后 能够执行完下面的逻辑
    s1.append("a");
    s2.append("1");

  线程A要是想执行
    synchronized(s2) { } 里面的逻辑 
                  ↑
  必须要再拿到s2锁 拿到s2锁后才能执行 下面的逻辑
    s1.append("b");
    s2.append("2");
    System.out.println(s1);
    System.out.println(s2);


- 线程B进入run()方法后 会先遇到s2锁 然后是s1锁
  synchronized(s2) { }

------

- 上面我们知道了一条线程想要执行到最后的逻辑
- 现在我们再创建两条线程 同时在各自的run方法中
  内部锁的前面 添加sleep()
  
- 让它更容易出现死锁的情况
```java
synchronized(s1) {

  // 这里添加sleep
  try {
    Thread.sleep(100);
  } catch (InterruptedException e) {
    e.printStackTrace();
  }

  synchronized(s2) {
```

- 线程A拿到 s1锁 后后给s1字符串添加了 a 1
  然后遇到了sleep 阻塞了

- 在线程A阻塞的期间 线程B开始执行
  
- 线程B开始执行 进入同步代码块 先拿到的是 s2锁 后后给s2字符串添加了 c 3
  然后遇到了sleep 阻塞了

- 然后等线程A B都醒了之后 
- *线程A等着去拿s2锁 而线程B等着拿s1锁*
  
- 大家就互相僵持下去 这时候就是*死锁的情况*


> 总结
- 我们使用同步的时候 要避免出现死锁(就想不要出现死循环一样)


> 死锁的演示2
```java
class A {

  // 主线程调用foo()方法 同步方法 默认的同步锁是 当前类的对象 this 也就是拿的是a锁
  public synchronized void foo(B b) {
    // ①
    System.out.println("当前线程名: " + Thread.currentThread().getName() + "进入了A实例的foo方法")

    try {
      Thread.sleep(200);
    } catch(InterruptedException ex) {
      ex.printStackTrace();
    }

    // ③
    System.out.println("当前线程名: " + Thread.currentThread().getName() + "企图调用B实例的last方法");

    // b.last逻辑也是同步方法 
    // 也就是说 主线程先拿到了a锁 但是要想执行完last() 还要拿b锁 因为last方法付在B类里面也是 synchronized同步方法 默认锁还是this
    b.last();
  }

  public synchronized void last() {
    System.out.println("进入了A类的last方法内部")
  }
}

- 对上总结：
- 主线程想要执行完全部逻辑 就必须拿到 a锁 和 b锁


class B {

  // 分线程调用该方法的时候 会拿到b锁
  public synchronized void bar(A a) {
    // ②
    System.out.println("当前线程名: " + Thread.currentThread().getName() + "进入了B实例的bar方法")

    try {
      Thread.sleep(200);
    } catch(InterruptedException ex) {
      ex.printStackTrace();
    }

    System.out.println("当前线程名: " + Thread.currentThread().getName() + "企图调用A实例的last方法");

    // 分线程要想执行完last里面的逻辑 就要再拿a锁
    a.last();
  }

  public synchronized void last() {
    System.out.println("进入了B类的last方法内部")
  }
}

- 对上总结：
- 分线程想要执行完全部逻辑 就必须拿到 b锁 和 a锁


// 下面也是有两个线程 分线程 和 主线程
public class DeadLock implements Runnable {
  A a = new A();
  B b = new B();

  // main方法中的主线程 调用 init()方法
  public void init() {

    // 主线程 做的逻辑如下
    Thread.currentThread().setName("主线程");
    // 调用a对象的foo方法
    a.foo(b)
    System.out.println("进入了主线程之后")
  }


  //  分线程执行的逻辑就是这个 run() 方法
  public void run() {
    Thread.currentThread().setName("副线程")
    // 调用a对象的bar方法
    b.foo(a)
    System.out.println("进入了副线程之后")
  }

  public static void main(String[] args) {
    // 启动分线程
    DeadLock d1 = new DeadLock();
    new Thread(d1).start();
      - 分线程start后 会执行run里面的逻辑 run里面调用了b.foo

    // 主线程调用init()方法
    d1.init();
  }
}
```

- 也就是说主线程先拿a锁 然后b锁
- 分线程先那b锁 然后a锁 然后都sleep了下 当它们都醒了后 都在等待对方放弃手里面的锁 就出现了死锁的现象


> 总结
- 像上面的案例死锁的现象就会隐蔽一些 不是说死锁的代码很简单 一看就能看出来 而是整体的逻辑有时候会很隐蔽

- 后面我们将集合和stringBuffer方法等都是同步方法 只要我们用同步的方法就会涉及到同步监视器 

- 如果我们用的是两个不同类的同步方法 那就是两个不同类的对象作为同步监视器
- 如果一个线程是先调a 后调b 另外一个线程是先调b 后调a 里面就一定会出现死锁的问题 

- 死锁不容器发现 因为我们不会在逻辑中特意去添加sleep 故意让它出现
- 有的时候我们的程序运行出结果了 正常 但不意味着它没有死锁 有的时候有死锁 但是你没发现

----------------------------

### JDK5.0之后 解决线程安全问题
- 上面我们讲了 解决线程安全的两种方法 同步代码块 和 同步方法

> Lock(锁) -- 它是一个接口
- 从jdk5.0之后 java提供了更强大的线程同步机制 -- 通过显式定义同步锁对象来实现同步  同步锁使用Lock对象充当

- *java.util.concurrent.locks.Lock* 接口是控制多个线程对共享资源进行访问的工具
<!-- 
  Lock(锁)是一个接口 我们要用这个接口的实现类
 -->

- 锁提供了对共享资源的独占访问 每次只能有一个线程对Lock对象加锁 线程开始访问共享资源之前应先获得Lock对象

- ReentranLock类实现了Lock 它拥有与synchronized相同 并发性和内存语义 在实现线程安全的控制中 比较常用的是ReentrantLock 可以显式加锁 释放锁
<!-- 
  ReentranLock类就是 java.util.concurrent.locks.Lock接口的实现类

  我们使用 ReentranLock类 的对象来解决线程的安全问题
 -->


> Lock方式解决线程安全问题的步骤
- Lock本身是一个接口 我们使用的时候 使用的是它的实现类 *ReentrantLock*

- 也就是说我们要创建 ReentrantLock类的实例化对象lock

```java
// 实例化ReentrantLock的对象
ReentrantLock lock = new ReentrantLock();

// 讲解部分
- 1. 
ReentrantLock lock = new ReentrantLock();
- 2. 
ReentrantLock lock = new ReentrantLock(true);

- new ReentrantLock(); 里面的参数默认是false
- new ReentrantLock(true); 还可以设置为true

- 设置为true的时候 表示一个公平的lock 

- 正常来说 比如3个线程 当1线程执行完后 是有可能再次抢到cpu分配的执行权的 

- 如果我们设置为true的话 就会按照线程进来时候的先后顺序分配cpu的执行权 比如1 2 3顺序进来的 那么1执行完后 下一个就是2 再下一个就是3
```


- lock对象上有两个方法
- 1. lock.lock();
- 调用锁定方法lock() 作用是获取同步监视器

- 2. lock.unlock();
- 调用解锁的方法
- 比较灵活 我们想在哪调用就在哪调用 只要调用了就算结束同步效果了

> 具体步骤
> 1. 实例化ReentrantLock对象
- ReentrantLock lock = new ReentrantLock();

**注意：**
- 1. 实现Runnable接口的时候 我们直接实例化ReentrantLock对象就可以 天然的共享数据

- 2. 继承Thread类的方式的时候 就要加上static关键字 因为我们要用同一把锁来开锁和解锁
```java 
  private static ReentrantLock lock = new ReentrantLock();
```

> 2. 使用 try finally结构将操作同步数据的代码用try包起来finally中调用解锁的方法
  try {
    // 上锁
    lock.lock();

  } finally {
    // 解锁
    lock.unlock();
  }

- 在try里面的代码实现了跟同步代码块一样的功能 单线程的
- try中先调用lock.lock();方法相当于 进厕所先锁门
- finally中调用lock.unlock();方法相当于 出厕所开门

> 3. try代码块最开始的逻辑是 上锁 finally代码块是解锁

> 代码部分
```java
package com.sam.java1;
import java.util.concurrent.locks.ReentrantLock;

public class LockTest {
  public static void main(String[] args) {
    Window w = new Window();
    Thread t1 = new Thread(w);
    Thread t2 = new Thread(w);
    Thread t3 = new Thread(w);

    t1.setName("窗口1");
    t2.setName("窗口2");
    t3.setName("窗口3");

    t1.start();
    t2.start();
    t3.start();
  }
}


// 创建多线程
class Window implements Runnable {

  private int ticket = 100;

  // 1. 实例化ReentrantLock Lock
  private ReentrantLock lock = new ReentrantLock();

  @Override
  public void run() {
    while (true) {

      // 1. 我们将操作同步数据的代码防到try当中
      try{

        // 2. 在try中我们先进行这样的操作 调用锁定方法lock() 作用是获取同步监视器 在这调用就相当于上了锁保证后面的是单线程的
        lock.lock();
        // 这样我们能保证在try里面的代码实现了跟同步代码块一样的功能 单线程的


        if(ticket > 0) {
          try {
            Thread.sleep(50);
          } catch (InterruptedException e) {
            e.printStackTrace();
          }

          System.out.println(Thread.currentThread().getName() + ": 售票, 票号为: " + ticket);
        } else {
          break;
        }
      } finally {
        // 3. 在最后我们要解锁 调用解锁的方法
        // 如果不手动解锁 后续的代码都变成单线程的了
        lock.unlock();
      }
    }
  }
}
```


> 面试题：
- synchronized 与 lock 的异同？
- 二者都可以解决线程的安全问题

- 不同点：
- 1. synchronized机制在执行完相应的同步代码以后 自动的释放同步监视器(出了{ }后自动释放)

- 2. lock需要手动的启动同步(lock()) 同时结束同步也需要手动的实现(unlock())

------

- lock是显式锁(手动开启和关闭锁 别忘记关闭锁)
- synchronized是隐式锁 出了作用域自动释放

- lock只有代码块锁 synchronized有代码块锁和方法锁

- 使用lock锁 jvm将花费较少的时间来调度线程 性能更好 并且具有更好的扩展性(提供更多的子类)

> 优先使用顺序
- Lock -> 同步代码块(已经进入了方法体后 才分配相应资源) -> 同步方法(整体是同步的 没有代码块灵活)

----------------------------

> 练习 1
- 银行有一个账户(共享数据)
- 有两个储户分别向同一个账户存3000元 每次存1000 存3次
- 每次存完打印账户余额

- 问题：
- 该程序是否有安全问题 如果有 如何解决？
- 1. 是多线程的问题 多线程是 储户A 和 储户B
- 2. 因为有共享数据 账户或者说我们操作的账户的余额
- 3. 因为储户A和储户B操作了共享数据 就一定有线程安全问题

- 使用同步机制的方式解决线程安全问题

- 提示
- 1. 明确哪些代码是多线程运行代码 须写入run方法
- 2. 明确什么是共享数据
- 3. 明确多线程运行代码中哪些语句是操作共享数据的

- 扩展问题：
- 可否实现两个储户交替存钱的操作

> 我们先来看看 没解决线程安全问题之前的代码
- 要点：

- 1. 共享数据 账户：
- 共享数据不单单是一个简单的值 可能也是一个对象
- 这个案例中 我们将账户做为共享数据 既然它是对象 那么对象中的属性和方法都是共享数据的一部分

- 账户对象中
- 有余额属性
- 有存钱方法

- 2. 下面的代码中多线程就是储户甲和储户乙 
- 这两个线程都会执行线程类中的run方法 也就是存钱

- 3. 我们上面创建了一个账户对象 那怎么才能让账户对象跟线程对象关联起来呢？
- 我们在储户类(线程类)里面定义账户的属性 这样每一个储户都会有账户属性
- 我们在储户类里面通过构造器对账户属性进行赋值

- 将账户实例化对象传入储户类中 对账户进行赋值
- 因为我们只new了一个Account 所以两个储户类的实例化对象就共用了一个账户对象

```java
package com.sam.exer;

// 共享数据是账户 我们创建一个类 一个账户类
class Account {
  // 账户里面有属性 余额 
  - 余额也是共享数据 我们操作的时候也要保证它是安全的
  private double balance;

  public Account(double balance) {
    this.balance = balance;
  }

  // 面向对象的逻辑 
  - 账户应该有存钱的方法 这也是操作共享数据的方法
  public void deposit(double amt) {
    if(amt > 0) {
      balance += amt;

      // 我们加下sleep方法 体现下线程安全问题
      try {
        Thread.sleep(100);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }

      System.out.println(Thread.currentThread().getName() + " : 存钱成功。余额为: " + balance);
    }
  }
}


// 创建 Customer类 继承Thread类
class Customer extends Thread {

  private Account acct;
  // 在构造器中对acct属性(账户)进行初始化
  public Customer(Account acct) {
    this.acct = acct;
  }

  @Override
  public void run() {
    // 存钱 三3次
    for (int i = 0; i < 3; i++) {
      // 每次存1000
      acct.deposit(1000);
    }
  }
}

public class AccountTest {
  public static void main(String[] args) {
    // 这里我们要new两个customer 怎么体现让他们共用一个账户呢？
    // 我们创建了一个账户的类 然后创建线程实例化的时候 初始化acct 我们传入的是一个账户所以还是共享数据
    Account acct = new Account(0.0);
    Customer c1 = new Customer(acct);
    Customer c2 = new Customer(acct);

    c1.setName("储户甲");
    c1.setName("储户乙");

    c1.start();
    c2.start();
  }
}

// 结果
储户乙 : 存钱成功。余额为: 2000.0
储户甲 : 存钱成功。余额为: 2000.0
储户乙 : 存钱成功。余额为: 4000.0
储户甲 : 存钱成功。余额为: 4000.0
储户乙 : 存钱成功。余额为: 6000.0
储户甲 : 存钱成功。余额为: 6000.0
public void deposit(double amt) {
  if(amt > 0) {
    balance += amt;

    // 我们加下sleep方法 体现下线程安全问题
    try {
      Thread.sleep(100);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    System.out.println(Thread.currentThread().getName() + " : 存钱成功。余额为: " + balance);
  }
}
- 乙进入存钱的方法后 存钱了 然后遇到sleep后睡着了 没有输出余额
- 然后睡着期间 甲也进入存钱的方法后 存钱了 然后sleep睡着了
- 然后甲乙醒来之后 它们一输出都是2000了
```

> 解决方式1: synchronized 
- 我们没有在run方法中使用 synchronized 而是在存钱的方法中使用了 synchronized 
- 也就是说 存钱的方法才是操作共享数据的逻辑 我们看来得找对地方啊
```java
public synchronized void deposit(double amt) {
  if(amt > 0) {
    balance += amt;

    try {
      Thread.sleep(100);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    System.out.println(Thread.currentThread().getName() + " : 存钱成功。余额为: " + balance);
  }
}
```

----------------------------

### 线程的通信
- 什么是线程的通信?
- 两个线程都要操作共享数据 它们之间有某种“交流”
- 比如 我们要打印1-100个数 我们要求这两个线程交替打印 线程a打印1 打印完后线程2打印2 依次交替打印 这就是线程通信

> 例题
- 使用两个线程打印1-100 线程1 线程2 交替打印

> 线程通信的三个方法
> wait(); 
- 一旦执行此方法 *当前线程就进入阻塞状态 并释放同步监视器*
<!-- 
  - 1. 调用wait()方法的地方 线程到这里会被阻塞
  - 2. 调用wait()方法后 会释放当前线程拿到的锁
 -->

- 该方法还可以指定long型毫秒数 过了给定时间后自动醒


> notify() / notifyAll()
- notify():
- 一旦执行此方法 就会唤醒被wait的一个线程 如果有多个线程被wait 就唤醒优先级高的那个线程

- notifyAll()
- 一旦执行此方法 就会唤醒被wait的所有线程
<!-- 
  // 下面的案例中只有两个线程 
  
  - 线程1可以唤醒线程2 线程2可以唤醒线程1 
  - 如果有3个线程 其中两个都wait了 第3个线程调用notifyAll()的话 可以唤醒前面两个线程
 -->


**注意：**
- 1. 线程的通信的方法必须使用在同步方法中
- wait() notify() notifyAll() 这三个方法必须使用在同步代码块或同步方法中 
<!-- 
  使用在lock中也不行 lock中有别的通信方式
 -->

- 2. 下面的代码中我们会发现wait() 和 notify() 并没有加对象.wait()的方式 那就是说是this调用的

- 非静态省略了this 静态方法省略了类.

- 3. 这三个方法的调用者 必须是同步代码块或同步方法中的同步监视器 否则会出现*IllegalMonitorStateException*异常
<!-- 
  也就是说 我们自己创建个对象 充当锁的方法 在这里是不行的
  Object obj = new Object()
  synchronized (obj) {
    this.wait()
  }

  这样是不行的 obj锁和wait的调用者 不是同一个

  为了保证代码的正确 我们可以把this改成obj
  Object obj = new Object()
  synchronized (obj) {
    obj.wait()
  }
 -->

- 4. 上述的上述方法是定义在Object类中
<!-- 
  因为 同步监视器任何类的对象都可以充当 只要这个对象充当同步监视器了 那么就会拿着这个对象去调用 wait等方法
  Object obj = new Object()
  synchronized (obj) {
    obj.wait()
  }
  
  那就要保证任何对象有这个方法 所以定义在了Object类下
 -->



> 代码逻辑
```java

public class CommunicationTest {
  public static void main(String[] args) {
    Number n = new Number();
    Thread t1 = new Thread(n);
    Thread t2 = new Thread(n);

    t1.setName("线程1");
    t2.setName("线程2");

    t1.start();
    t2.start();
  }
}


class Number implements Runnable {
  // 共享数据
  private int number = 1;

  @Override
  public void run() {
    while (true) {
      // 代表块解决线程安全问题
      synchronized (this) {
        
        // 这里的逻辑类似 js 中的节流阀
        // 下一个线程进来后 先进行唤醒notify()
        this.notify();

        if(number <= 100) {
          System.out.println(Thread.currentThread().getName() + " : " + number);
          number++;

          // 我们要想让线程交替打印 就要在这里让线程阻塞一下 因为线程a进入if判断 1输出2++ 然后让线程a阻塞下 
          
          // 因为只有线程a阻塞了 线程b才能进来 我们在这里使用wait() 这个方法本身有异常 我们要处理下它的异常

          // wait()当一个线程运行的时候 我们调用wait该线程就会阻塞 想让线程恢复到就绪状态我们要调用notify()/notifyAll()
          try {

            // 使得调用如下wait()方法的线程 进入阻塞状态
            wait();

          } catch (InterruptedException e) {
            e.printStackTrace();
          }
        } else {
          break;
        }
      }
    }
  }
}
```
- 代码解析:
- 线程1先进入同步代码块 先是notify但是没有意义 
- 因为没有wait的线程 然后线程1输出了1 然后++ 然后wait 

- 线程2就进来了 它进来先notify 线程2就把线程1唤醒了 
- 虽然把线程1唤醒了 但是线程2拿着锁 虽然线程1醒了 但是它也进不来 因为线程2握着锁 

- 接着线程2 输出了2 然后++ 然后wait 
- 然后后面就是一样的逻辑 

- 要点:
- 一旦wait了就会释放锁 只有线程2释放了锁 线程1才能进来

- 这点wait和sleep不一样 调用wait的时候会释放锁 而调用sleep虽然线程阻塞了但不会释放锁


> 面试题:
> sleep 和 wait 的异同
- 相同点：
- 一旦执行方法 都可以使得当前的线程进入阻塞状态

- 不同点：
- 1. 两个方法存在的位置不一样 
- sleep()方法在Thread类中 wait()方法在Object类中

- 2. 调用的要求不一样
- sleep的调用无要求 可以在任何需要的场景下调用
- wait方法必须使用在同步代码块和同步方法中

- 3. 如果两个方法都使用在同步代码块或同步方法中 sleep不会释放锁 而wait会释放锁


> 释放锁的操作
- 1. 当前线程的同步方法 同步代码块执行结束

- 2. 当前线程在同步代码块 同步方法中遇到break return终止了该代码块 该方法的继续执行

- 3. 当前线程在同步代码块 同步方法中出现了未处理的Error或者Exception 导致异常结束

- 4. 当前线程在同步代码块 同步方法中执行了线程对象的wait()方法 当前线程暂停 并释放锁


> 不会释放锁的操作
- 1. 线程执行同步代码块或同步方法时 程序调用Thread.sleep() Thread.yield()方法暂停当前线程的执行

- 2. 线程执行同步代码块时 其它线程调用了该线程的suspend()方法将该线程挂起 该线程不会释放锁(同步监视器)
<!-- 
  尽量避免使用suspend()和resume()来控制线程
  容易导致死锁 但已弃用
 -->

----------------------------

### 多线程中经典的问题 -- 生产者 消费者例题
- 生产者将产品(productor)交给店员(clerk) 
- 而消费者(customer)从店员处取走产品 

- 店员一次只能持有固定数量的产品(比如：20 因为柜台有限)

- 如果生产者试图生产更多的产品(生产者的任务就是不断的生产产品 让产品的数量不断的增加) 店员会叫生产者停一下(当如果产品超过20的时候 我就让生产者wait下)

- 如果店中有空位放产品了(不足20的时候) 再通知生产者继续生产

- 如果店中没有产品了(如果产品是0了) 店员会告诉消费者等一下(wait一下) 如果店中有产品了再通知消费者来取走产品(有产品的时候再将你唤醒 消费者就可以继续消费了)


- 这里可能出现两个问题(线程的安全问题)
- 1. 生产者比消费者快时 消费者会漏掉一些数据没有取到
- 2. 消费者比生产者快时 消费者会取相同的数据


> 代码分析
- 生产者 Productor
- 消费者 Customer
- 店员   Clerk

- 分析：
  - 1. 多线程
      - 生产者的线程
      - 消费者的线程

  - 2. 共享数据
      - 店员(或产品)： 生产者生产的东西交给了店员 消费者也是给了店员

  - 3. 如何解决线程的安全问题
      - 同步机制

  - 4. 线程通信
      - wait  notify

- 上面涉及到的结构 我们都应该把它们当做是类来进行处理

> 线程安全问题的体现
- 两个线程都在操作共享数据 productCount
- 就有可能发生 生产者线程 正在判断 productCount 并执行++的时候 比如生产第10个产品 生产者线程刚productCount++整准备输出生产了第10个产品的时候 这时候阻塞了 消费者线程进来开始productCount--了 导致生产者输出了生产了第9个产品

- 因为两个线程都在操作 productCount

- 为了保证两个线程在操作共享数据的时候只能有一个线程去做 要处理线程安全问题

- 我们把clerk中的两个方法同步下


- 为什么是店员来调用这两个方法？
- 生产和消费的线程在start后就自动开始生产 和 消费了 店员来调用只是通知店员让数量加一或者减一


> 具体代码部分
```java
package com.sam.exer;

// 店员类 生产者 和 消费者 共用的Clerk
class Clerk {
  // 产品
  private int productCount = 0;

  // 生产产品
  public synchronized void produceProduct() {
    if(productCount < 20) {
      productCount++;
      System.out.println(Thread.currentThread().getName() + ": 生产者1开始生产第 " + productCount + " 个产品");

      // 生产者只要生产一个产品 就可以唤醒消费者
      notify();
    } else {
      // 当产品数量 > 20的时候 先不要生产
      try {
        wait();
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }

  // 消费产品
  public synchronized void consumeProduct() {
    if(productCount > 0) {
      System.out.println(Thread.currentThread().getName() + ": 开始消费第 " + productCount + " 个产品");
      productCount--;

      // 消费者消费一个产品 就可以唤醒生产者继续生产了
      notify();
    } else {
      // 当产品数量<0的时候 wait只能使用在同步代码块中 所以必须保证当前方法是同步方法
      try {
        wait();
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
  }
}

// 生产者 - 线程
class Producer extends Thread {
  private Clerk clerk;
  // 利用构造器 给Clerk赋值
  public Producer(Clerk clerk) {
    this.clerk = clerk;
  }

  @Override
  public void run() {
    System.out.println(getName() + ": 开始生产产品...");
    // 生产者生产产品没有限制 一顿生产就可以了
    while (true) {
      try {
        // 让它慢点生产
        Thread.sleep(10);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      // 相当于我们以前的案例中让账户对象调用存钱的方法
      // 店员上架产品
      clerk.produceProduct();
    }
  }
}

// 消费者 - 线程
class Consumer extends Thread {
  private Clerk clerk;
  // 利用构造器 给Clerk赋值
  public Consumer(Clerk clerk) {
    this.clerk = clerk;
  }

  @Override
  public void run() {
    System.out.println(getName() + ": 开始消费产品...");
    // 生产者生产产品没有限制 一顿生产就可以了
    while (true) {
      try {
        Thread.sleep(10);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      // 店员卖出产品
      clerk.consumeProduct();
    }
  }
}


// 测试类
public class ProductTest {
  public static void main(String[] args) {
    // 我们造一个Clerk店员
    Clerk clerk = new Clerk();
    Producer p1 = new Producer(clerk);
    p1.setName("生产者1");
    Consumer c1 = new Consumer(clerk);
    c1.setName("消费者1");

    // 跑起来后就能执行各自线程中的run方法
    p1.start();
    c1.start();
  }
}
```

----------------------------

### JDK5.0 新增的创建线程的方式
- 新增的方式有两种

### 新增方式一: 实现Callable接口
- 与使用Runnable相比 Callable功能更强大写
- 1. 相比run() 可以有返回值
- 分线程可以返回一个结果 给另外一个线程使用

- 2. 方法可以抛出异常
<!-- 
  抛异常后 其它线程还可以拿到异常 我就知道当前线程出了什么问题
  run有异常只能是try catch 里面处理外面看不到
 -->

- 3. 支持泛型的返回值
- 4. 需要借助FutureTask类 比如获取返回结果
<!-- 
  Callable接口 要想使用的话 需要借助 FutureTask类
 -->


> <扩展> Future接口的作用:
- 可以对具体Runnable Callable任务的执行结果进行取消 查询是否完成 获取结果等

- *FutureTask是Future接口的唯一的实现类*

- FutureTask同时实现了Runnable Future接口 它既可以作为Runnable被线程执行 又可以作为Future得到Callable的返回值


> FutureTask实现类
- 我们前面讲解的创建线程的方式中 不断是继承Thread类还是实现Runnable接口的方式 都可以通过线程对象.start()的方式 启动线程执行run方法

- 但是Callable接口没有start()方法 要想启动线程 要借助FutureTask类 FutureTask类就是Future接口的实现类

- 作用：
- 1. 获取call方法中的返回值
- 2. 将FutureTask类的实例化对象作为参数传递给Thread类的构造器中 - 调用start()的方法的前置工作


> FutureTask类的实例对象.get();
- 作用：
- 获取call方法的返回值
- futureTask.get()方法的返回值即为Callbale实现类重写的call()方法中的返回值
```java
@Override
public Object call() throws Exception {
  int sum = 0;
  return sum;
}
```

- 该方法会抛异常需要使用try catch包一下
```java
try {
  // 这个接收到的值就是call方法中return出来的值
  Object sum = futureTask.get();
  System.out.println(sum);
} catch (InterruptedException e) {
  e.printStackTrace();
} catch (ExecutionException e) {
  e.printStackTrace();
}
```


> 具体步骤:
> 1. 创建一个实现Callable接口的实现类
- 目的：
- 相当于实现Runnable接口的步骤 

- 创建完的对象作为参数传入到FutureTask类的形参中
```java
numberThread -- 
                                        ↘
    -- futureTask = new FutureTask(numberThread);
                        ↘
        -- new Thread(futureTask)
```

> 2. 在 Callable接口 的实现类中 实现call()方法
```java 
public Object call() throws Exception {
  return null;
}
```

- 要点:
- 1. call方法有返回值 如果不想返回内容 return null;
- 2. call方法可以往上层抛出异常
- 3. call方法和run方法一样 将线程需要执行的操作声明在call()方法里面

- 返回值可以通过 FutureTask类的对象 futureTask
- futureTask.get()来接收 返回值类型为*Object*
```java
Object sum = futureTask.get();
```

> 3. 实例化Callable接口的实现类
```java
NumberThread numberThread = new NumberThread();
```

> 4. 将Callable实现类对象作为参数传递到FutureTask构造器中创建FutureTask的对象
```java
FutureTask futureTask = new FutureTask(numberThread);
```

> 5. 将FutureTask的对象作为参数传递到Thread类中 创建Thread对象 调用start()启动线程 自动调用call方法
```java
new Thread(futureTask).start();

or

Thread t1 = new Thread(futureTask);
t1.start();
```


> 完整代码
- 使用实现Callable接口的方式创建多线程 输出100以内的偶数

```java
package com.sam.java1;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

// 创建线程的方式三 实现Callable接口方式 -- jdk5.0新增
public class ThreadNew {
  public static void main(String[] args) {

    // 3
    NumberThread numberThread = new NumberThread();

    // 4
    FutureTask futureTask = new FutureTask(numberThread);


    // 分线程执行
    // 5
    new Thread(futureTask).start();


    // 总线程接收分线程的返回值并输出结果
    try {
      // 这个接收到的值就是call方法中return出来的值
      Object sum = futureTask.get();
      System.out.println(sum);
    } catch (InterruptedException e) {
      e.printStackTrace();
    } catch (ExecutionException e) {
      e.printStackTrace();
    }
  }
}

// 1. 创建一个实现Callable接口的实现类
class NumberThread implements Callable {

  // 2. 实现call方法 相当于run() 但它可以抛异常
  // 将此线程需要执行的操作声明在call()当中
  @Override
  public Object call() throws Exception {
    // 遍历100以内的偶数并且返回所有数的和
    int sum = 0;
    for (int i = 1; i < 100; i++) {
      if(i % 2 ==0) {
        sum += i;
      }
    }

    // 这里注意 
    - 方法的返回值要求的是Object 
    - 但是我们返回的是int int并不是对象是基本数据类型 
    - 这里没报错因为相当于我们将int转换为Integer包装类了 
    - 然后赋给Object相当于多态的形式
    return sum;
  }
}
```


> 如何理解Callable接口的方式创建多线程比Runnable接口强大
- 1. call()方法是有返回值的 可以给另外一个线程一个结果
- 2. call()方法可以抛出异常 被外面的操作捕获 获取异常的信息
- 3. Callable支持泛型

----------------------------

### 新增方式二: 使用线程池
- 在开发中我们不会自己去一个个的造线程 开发中应用的都是线程池
<!-- 
  比如 我们手机移动端浏览一个页面 大体上都是如下的布局

  ------      ---------
  |     |     ---------
  ------      ---------

  ------      ---------
  |     |     ---------
  ------      ---------

  ------      ---------
  |     |     ---------
  ------      ---------

  我们都会用手指往上滑动 
  我们往上滑动会有一个线程帮我们装数据(通常都是主线程帮我们做的)

  再往上滑动的过程中有很多的图片要进行加载 通常图片都比较大再加上网不好加载的速度可能有些慢 会有卡顿的感觉

  为了让用户体验好一些 都是在分线程中下载图片 主线程加载文本
  一个页面中有很多的图片 每一个图片有对应的一个线程来加载 那就意味着要开很多的分线程

  当我们手指往上滑的时候 只要一组结构露一下 就意味我要开一个分线程去加载图片 造线程也需要花时间 造完线程去下载图片也要花时间

  滑快了cpu和内存就消耗的会很多 而且图片显示完后线程就会消亡 
  很多个线程都是在创建  -  消亡的中不断反复

  我们在滑动的过程当中会造大量的线程
  所以在开发中我们不会一个个的去造线程 效率差
 -->

- 背景:
- 经常创建和销毁 使用量特别大的资源 比如并发情况下的线程对性能影响很大

- 思路:
- 提前创建好多个线程 放入线程池中 使用时直接获取 使用完放回池中 可以避免频繁创建销毁 实现重复利用 类似生活中的公交交通工具
<!-- 
  比如 我们想去天安门 想要做一件事情(run方法中的逻辑)
 -->

- 好处:
- 1. 提高相应速度(减少了创建新线程的时间)
- 2. 降低资源消耗(重复利用线程池中的线程 不需要每次都创建)
- 3. 便于线程管理
  - corePoolSize: 核心池的大小
  - maximumPoolSize: 最大线程数
  - keepAliveTime: 线程没有任务时最多保持多长时间后会终止


> 使用线程池
- jdk5.0起提供了线程池相关api: *ExecutorService 和 Executors*


> Executors(工具类):
- 工具类 
- 作用：
- 线程池的工厂类 使用该工具类调用对应的方法 用于创建并返回不同类型的线程池

- 返回值：
- 就是 ExecutorService 接口的实现类对象 service
```java
ExecutorService service = Executors.newFixedThreadPool(10);
```

> Executors.newCachedThreadPool()
- 创建一个可根据需要创建新线程的线程池

> Executors.newFixedThreadPool(n)
- 创建一个可重用固定线程数的线程池

> Executors.newSingleThreadExecutor()
- 创建一个只有一个线程的线程池

> Executors.newScheduledThreadPool(n)
- 创建一个线程池 它可以安排在给定延迟后运行命令或者定期地执行

--- 

> ExecutorService:
- 真正的线程池接口 常见子类ThreadPoolExecutor

> service.execute(Runnable command):
- 执行任务 / 命令 没有返回值 一般用来执行Runnable

> service.submit(Callable<T>task):
- 执行任务 有返回值 一般用来执行Callable

> service.shutdown()
- 关闭连接池

---


> 使用线程池的步骤
> 1. 提供指定线程数量的线程池
-  在main方法中 使用Executors工具类 创建线程池

- Executors工具类创建连接池的方法的返回值是ExecutorService接口的实现类的对象service, service就是连接池
```java
ExecutorService service = Executors.newFixedThreadPool(10);

// newFixedThreadPool没有特殊需求的时候可以选择这个方法创建固定数量的线程池
```


> 2. 执行指定的线程的操作 需要提供实现Runnable接口或Callable接口实现类的对象
- 上面我们创建了线程池 service(线程池对象)
- service有两个方法

> service.execute(Runnable)
- 参数只能是Runnable 里面只有run方法 且没有返回值

> service.submit(Callable)
- 如果我们是使用callable方式造的多线程的话可以传入future 可以获取call方法的返回值

- 调用 service.execute(传入线程对象)
```java
service.execute(new NumberThread2());
service.execute(new NumberThread3());

- 线程池也需要我们创建多线程 目的是为了让线程池知道我们要做什么
- 如果创建多个线程就创建多了实现类
class NumberThread2 implements Runnable
class NumberThread3 implements Runnable
```


> 3. 创建线程 使用实现Runnable接口的方式创建 
- 我们创建这个线程的目的就是为了告诉线程池我们要干什么
```java
class NumberThread2 implements Runnable {
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(Thread.currentThread().getName() + ": " + i);
      }
    }
  }
}
```


> 4. 如果要设置线程的话
- 看完整代码中的部分


- 完整代码
```java
package com.sam.java1;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

public class ThreadPool {
  public static void main(String[] args) {
    // 提供指定线程数量的线程池
    ExecutorService service = Executors.newFixedThreadPool(10);

    // 设置线程池的属性 -- 管理
    // 我们看看service是哪个类造的 ExecutorService是一个接口 它肯定不是造service的
    // System.out.println(service.getClass());  // ThreadPoolExecutor

    // ThreadPoolExecutor这个类实现了ExecutorService接口 有了这层关系我们就可以将 service 强转成 ThreadPoolExecutor类型的对象 通过该对象设置连接池的属性
    ThreadPoolExecutor service1 = (ThreadPoolExecutor)service;

    service1.setCorePoolSize(15);
    service1.setKeepAliveTime(1100);


    service.execute(new NumberThread2());
    service.execute(new NumberThread3());

    // 3. 关闭连接池
    service.shutdown();
  }
}

// 3. 创建线程
class NumberThread2 implements Runnable {
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if(i % 2 == 0) {
        System.out.println(Thread.currentThread().getName() + ": " + i);
      }
    }
  }
}

// 4. 假如想再创建一条线程的话 我们就再创建一个线程
class NumberThread3 implements Runnable {
  @Override
  public void run() {
    for (int i = 0; i < 100; i++) {
      if(i % 2 != 0) {
        System.out.println(Thread.currentThread().getName() + ": " + i);
      }
    }
  }
}
```


> 谈谈你对同步代码块中 同步监视器和共享数据的理解 以及各自的要求
- 同步监视器: 锁
- 要点:
- 1. 任何一个类的对象都可以充当 锁
- 2. 多个线程共用同一把锁

- 共享数据: 多个线程共同操作的数据
- 要点:
- 需要使用同步机制将操作共享数据的代码包起来 不能包多了 也不能包少了

----------------------------

### 跟字符串相关的类

###  String
- String类代表字符串 在java程序中的所有字符串字面值("abc")都作为此类的实例实现

- String是一个final类(不能被继承) 代表*不可变的字符序列*
- *字符串是常量* 用双引号引起来表示 它们的值在创建之后*不能更改*

- String对象的字符内容是存储在一个char[]字符数组中的
<!-- 
  每一个字符存储在char型数组中 这个数组是final的
  private final value[]

  说明这个数组是一个常量 数组都是有地址值的 修饰成final后 就代表地址值不能被修改
 -->


> 重新理解 Sting
- 首先我们看看字符串 String类 的特性
- 1. String类是声明为final的 不可被继承
- 2. String实现了如下3个接口

> Serializable(可序列化的)
- 字符串是支持序列化的
- java是面向对象的语言 数据都封装在对象中 而对象是可以进行传输的 

- 比如A电脑中的对象可以通过网络发送给B电脑 B电脑接收到后再将对象还原回来 传输的时候我们使用的是流 字节的方式传输 而对象默认情况下是不能传输的 

- 但是字符串序列化之后就可以进行传输了
- 而String实现了这个接口后 就可以通过网络的方式进行传输了


> Comparable接口(比较器)
- 实现了该接口String就可以比较大小了


> CharSequence接口


- 3. String内部定义了
  final char[] value

  - 用于存储字符串数据 因为是final修饰的 也就是说这个char[]数组*不能被重新赋值* 而且该*数组中的元素也不能被修改*


- 4. 通过字面量的方式(区别于new)给一个字符串赋值 此时的字符串值声明在字符串的常量池中
- 字符串常量池中是不会存储相同内容的字符串的(相当于我们拿String类中重写后的equals比较真实的内容)


- 5. String代表不可变的字符序列 简称 不可变性
  - 1. 当对字符串重新赋值的时候 需要重写指定内存区域赋值 不能对原有的char[]进行重新赋值

  - 2. 当对现有的字符串进行连接操作的时候 也需要重新指定内存区域赋值 不能对原有的char[]进行重新赋值

  - 3. 当调用String的replace()方法修改指定字符或字符串时 也需要重新指定内存区域赋值 不能对原有的char[]进行重新赋值


> 字符串的不可变性
- 创建字符串有两种方式 一种是普通的赋值 也就是字面量的赋值方式 另一种是通过new(我还没看过 可能前面有 但忘记了)
```java
// 字面量赋值的方式
String str = "abc"
```
- 而我们通过字面量赋值的方式 是在堆空间 - 方法区 - 常量池中创建 字符串的
- 常量池中的特点就是 不能存储一样的字符串 
- 常量池中的字符串有对象的特点有地址值 我们是把地址值赋值给变量 变量拿到引用
- 字符串不能被修改 替换 修改和替换都是在常量池中创建新的存储空间

- 代码部分
```java
@Test
  public void test1() {

    String s1 = "abc";
    String s2 = "abc";
    /*
      String是一个类 
      但是赋值的时候可以不用new 直接就可以使用字面量的形式赋值
      使用字面量赋值的方式 s1 s2拿到的是同一个常量池中的字符串的地址值
    */

    // 两个对象用 == 比较的是地址值
    System.out.println(s1 == s2); //true

    s1 = "hello";
    /*
      当s1的值重新赋值为hello的时候 并不是将常量池的abc修改为hello 

      我们的abc底层是使用char[]存储的 存放abc的char[]数组的长度就是3 
      而hello的长度是5 数组的长度确定后是不能修改的 

      而char[]数组是final的不能被重新赋值 所以当s1="hello"的时候 
      是在常量池中新造了一个hello的值
    */

    System.out.println(s1); // hello
    System.out.println(s2); // abc

    System.out.println("**********");


    // 对原有字符串进行拼接的情况
    String s3 = "abc";

    // 相当于在现有的字符串上拼接了一段内容
    s3 += "def";

    // 注意当拼接新内容的时候 也不是在原有的abc的后面添加新内容 我们是在常量池中新造了一个abcdef
    System.out.println(s3); // abcdef

    // 怎么证明是不是新建了一个abcdef 那么我们输出下s2 看看结果就可以
    System.out.println(s2);

    System.out.println("**********");

    // 对原有字符串进行修改的情况
    String s4 = "abc";

    // 将a修改为m
    String s5 = s4.replace("a", "m");

    System.out.println(s4);   
    // abc  s4没有变 也就是说即使仅仅是替换char[]数组中的元素 也不是对原有的char[]进行修改 而是又在常量池中新创建了一个mbc

    System.out.println(s5);   // mbc
  }
```


> 常量池中的逻辑解析
<!-- 

// String通过字面量赋值的时候 它们在内存中同一个
String s1 = "abc";    --- 1 生成abc
String s2 = "abc";


    栈空间               堆空间
    -------             --------------



                        方法区
       ↗  0x1212       --------------
    s2             ↘   | 字符串常量池
                  
       ↗  0x1212→       0x1212
    s1                  abc
                ↘
                        0x2323
                        hello
s1 = "hello"
 -->
- 解析：
- 通过字面量的形式赋值 我们认为数据都是在方法区的字符串常量池中

- 字符串常量池中的特性：
- 不会存两个相同内容的字符串的

  当 String s1 = "abc"; 的时候
  在栈中定义s1 
  首次没有abc的时候 会在方法区的 字符串常量池中造一个abc

  当 String s2 = "abc"; 的时候
  系统会先去常量池中找找看看有没有abc 有的话我们就会复用 所以就会将 0x1212 的地址给s2

- 所以这时候我们比较 s1 == s2 就是true


- 当我们进行 s1 = "hello" 的操作的时候
- 会在常量池里面新造一个hello 并将hello的地址值 给了栈空间中的s1 也就是说赋值的操作仅仅是换了一个地址值

- 注意：
- 这里并不是将常量池的abc修改为hello 我们的abc底层是使用char[]存储的 存放abc的char[]数组的长度就是3 
- 而hello的长度是5 数组的长度确定后是不能修改的 
- 同时char[]数组是final的不能被重新赋值 所以当s1="hello"的时候 是在常量池中新造了一个hello的值 并将地址值给了栈空间的s1


> String对象的创建
- 也就是使用字符串的两种方式
- 上面讲了使用字面量赋值方式的一些特点 现在我们看看 还有什么方式

> 字面量的赋值方式
> String str = "hello"
- 这种就相当于我们在常量池中直接造了一个字符串 将地址值赋值给了str变量


> new的方式
- 该方式我们可以传入各种类型的格式 比较灵活 作用会很多吧
- 我们传入构造器中的数据 就是给底层的char[] 赋值
- 1. 传空: 
  代表造了一个长度为0的数组

- 2. 传数据: 
  代表根据数据生成字符串

- 3. 传char[]: 
  代表把char[]复制给底层数组 生成字符串

- 4. 传char[] + 起始位置 + 个数
  代表根据char[]数组中 截取指定的数据放入底层数组 生成字符串


> String str = new String();
- 我们使用上述方式赋值 相当于赋了一个 new char[0] 长度为0
- 我们给字符串赋值 本质就是给String类内部的char[]数组赋值
<!-- 
  private final value[]

  原码当中的赋值方式
  this.value = new char[0]
 -->


> String str = new String(String original);
- String str = new String("hello");
- 相当于底层是hello的长度是5 造了一个长度是5的char[]
<!-- 
  原码当中的赋值方式
  this.value = original.value
 -->


> String str = new String(char[] a);
- 还可以直接传递一个char[] 实际上相当于一个copy的操作了
<!-- 
  原码当中的赋值方式
  this.value = Arrays.copyOf(value, value.length)
 -->


> String str = new String(char[] a, int startIndex, int count)
- 传递char[] 从中挑指定位置的指定个数的字符


> 我们主要说说 new 的方式
- 之前我们说过 new的结构都会在堆里 而字面量的形式是存在常量池中 这两种的方式的区别是什么？

```java
String str1 = "abc"

and

String str2 = new String("abc")
```

> new String方式声明的数据
- 我们通过如下的方式创建的字符串 是在堆空间声明了一个对象
  String str2 = new String("abc")

- 该对象中有value属性 值为一个char[]数组
- str2拿到的是堆空间中对象的地址值
- 堆空间中对象的value属性拿到的是 "abc"在常量池中的地址值

<!-- 
    堆空间        栈空间变量 str
              ↗ 该对象的地址值
      -- 对象
            ↘ 堆空间中对象的属性: value
          -- value(值 char[])
                ↘
                  ↘ 
                    常量池中的地址值
 -->

```java
public void test2() {
    // 字面量方式声明的 数据javaEE 是声明在方法区中的字符串的常量池中
    String s1 = "javaEE";
    String s2 = "javaEE";

    // 通过new + 构造器的方式 此时的s3 s4保存的地址值 是数据在堆空间中开辟空间以后对应的地址值 堆空间的地址给了s3 和 s4
    String s3 = new String("javaEE");
    String s4 = new String("javaEE");

    System.out.println(s1 == s2);   // true

    // 这里比较的是常量池的地址值 和 堆的地址值 不一样所以是false
    System.out.println(s1 == s3);   // false

    // 2个新的对象 相比当然是false
    System.out.println(s3 == s4);   // false
  }
```

> 内存解析
<!-- 
  String str2 = new String("abc")
  我们new了一个String 存放在堆空间中 也就是说我们new了一个对象

  该对象中有value的属性
  value的值是char[] final的

  而value属性时一个引用类型的变量 它存的也是一个地址值
  value属性存放的地址值 就是 常量池中 abc 的地址值

    栈空间               堆空间
    -------             --------------
         0x2345 →       0x2345
        ↗               value: char[] final
    str2                value也存的是地址值指向常量池
                        0x1212

                          ↓

                        方法区
                        --------------
                        字符串常量池         
                        0x1212
                        abc
 -->


- 思考：
- 之前我们经常写这样的代码 分析下下面的问题 以及想想内存中的结构是什么样的？

```java
class Person {
  String name;
  int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
}

public class PersonTest {
  public static void main(String[] args) {
    Person p1 = new Person("Tom", 12)
    Person p2 = new Person("Tom", 12)

    p1.name == p2.name ?  // true
  }
}
```

- 上面Person类中使用字面量方式定义的Tom 实际上是存放在常量池中 name拿到的是常量池中的地址值
<!-- 
    栈空间               堆空间
    -------             --------------
                        1. 0x7788
                        name: 0x123
                        age: 12
                  ↗
    p1: 0x7788
    p2: 0x9988
                  ↘
                        2. 0x9988
                        name: 0x123
                        age: 12

                        ↓
    
                        方法区
                        --------------
                        常量池
                        0x123
                        Tom

 -->


> 面试题
- String s = new String("abc") 方式创建对象 在内存中创建了几个对象?

- 两个
- 1个是堆空间中new的结构
- 另1个是堆空间对象中的char[]对应的常量池中的数据(本质上的abc)


> String不同拼接操作的对比
- 1. 常量与常量(字面量的创建方式的结果)的拼接结果在常量池中 且常量池中不会存在相同内容的常量
<!-- 
  两个字面量的连接的结果 和 一个字面量一样的时候 常量池中认定它们就是同一个
  String s3 = "javaEEhadoop";
  String s4 = "javaEE" + "hadoop";
 -->

- 2. 只要=右侧拼接中有一个是变量 结果就在堆中
<!-- 
  就是说=右侧拼接中有一个是变量 那就相当于在堆空间new了一下
  那就是说 s变量拿到的是堆空间中对象的地址值
 -->

- 3. 如果拼接的结果调用 intern()方法 返回值在常量池中
<!-- 
  String s8 = s5.intern();
  System.out.println(s3 == s8); // true

  该方法返回得到的s8使用的常量池中已存在的“javaEEhadoop”
  既然常量池中有javaEEhadoop 那就把这个常量池中的地址值给s8

  s3 == s8 两个常量池中的地址值对比就是true
 -->

> 字符串.intern();
- 要求该方法的返回值在常量池中声明  不管之前是在堆还是在常量池 都要求在常量池声明

- 就是说返回值如果常量池有那就复用得到常量池中的地址值


```java
  @Test
  public void test3() {
    String s1 = "javaEE";
    String s2 = "hadoop";

    // 这里是一个字面量
    String s3 = "javaEEhadoop";

    // 这里是两个字面量的连接 也就是 常量和常量的拼接
    String s4 = "javaEE" + "hadoop";
    

    String s5 = s1 + "hadoop";
    String s6 = "javaEE" + s2;

    String s7 = s1 + s2;

    // == 比较看的都是地址
    System.out.println(s3 == s4); // true
      // 两个字面量的连接的结果 和 一个字面量一样的时候 常量池中认定它们就是同一个


    // 以下的 只要发现 = 右侧赋值的时候有变量名参与了 这时候都不是在常量池了 而是在堆空间中开辟 相当于new s变量存储的就是堆空间的地址值 下面的所有结果都是两个堆空间的地址值在比较
    System.out.println(s3 == s5); // false
    System.out.println(s3 == s6); // false
    System.out.println(s5 == s6); // false

    System.out.println(s3 == s7); // false
    System.out.println(s5 == s6); // false
    System.out.println(s5 == s7); // false
    System.out.println(s6 == s7); // false
  }
```

- 类似下面的情况也是 属于在堆空间里面创建 类似new
```java
String s = 0;
for(int i=0; i<5; i++) {
  s += i;
    // s = s + i 也是=右侧有变量的形式
  System.out.println(s)
}

- 上面的这种情况s都是在堆空间中存放的
```


> 面试题
- 下列程序运行的结果?

```java
public class StringTest {
  String str = new String("good");
  char[] ch = {'t','e','s','t'};

  // 形参str是一个新的变量
  public void change(String str, char ch[]) {
    str = "test ok";
    ch[0] = 'b';
  }

  public static void main(String[] args) {
    StringTest ex = new StringTest();
    ex.change(ex.str, ex.ch);
    System.out.println(ex.str);
        // good
    System.out.println(ex.ch)
        // best
  }
}
```

- 解析： 
- 当我们传递实参 str 的时候 会被形参str接收

  public void change(String str, char ch[])

- 因为传递的是地址值 那么形参str接收到的就是地址值 形参str指向了good

- 但是change方法内部将形参str修改了 但是String是不可变的 方法内部的str是"test ok"; 但是类中的变量仍然还是good


- *char[]没有什么不可变* 传递实参ch的时候 传递的是地址值 所以形参和实参都指向了一个对象 修改也会影响到方法外的ch

----------------------------

### jvm中涉及字符串的内存结构
- java虚拟机的规范会随着jvm的版本的变化而变化 规范最终也会落地 那就涉及到最终的jvm jvm不只一个

- jvm要针对具体问题做一些优化处理 所以就开发了不同的jvm


> 三种JVM
- 1. Sun公司的 HotSpot
- 2. BEA公司的 JRockit
- 3. IBM公司的 J9 VM

- 我们通常所说的jvm都是HotSpot

<!-- 
          JVM运行时数据区

  A              B             B
  -----------   -----------   -----------
  方法区          虚拟机栈        本地方法栈
  -----------   -----------   -----------

  A              B
  -----------   -------------------------
  堆              程序计数器
  -----------   -------------------------


  -----------   -----------
  执行引擎        本地库接口
  -----------   -----------


  A: 由线程共享的数据区
  B: 线程私有的数据区
 -->

- 上图我们能看到 *堆 和 方法区 是两个并列的结构*

> 堆的细分
- 我们再来说下堆 堆细分有3部分

- 一个jvm实例只存在一个堆内存 堆内存的大小是可以调节的
- 类加载器读取了类文件后 需要把类 方法 常变量放到堆内存中 保存所有引用类型的真实信息 以方便执行器执行 

- 堆内存分为3个部分
- 1. 新生区     Young 
- 2. 养老区     Old
- 3. 永久存储区  Perm   --- 又是非堆 不属于堆的一部分

- 从规范上将堆有3部分(上述123) 但事实上Perm又没有划分到堆里面 *永久区Perm可以看做是方法区*
<!-- 
  虽然jvm规范将方法区描述为堆的一个逻辑部分 
  但它却还有一个别名叫做Non-Heap(非堆)

  目的就是要和堆分开
 -->


> 新生区 异常 Java heap space
- 新生区是属于堆 当堆出问题的时候 会报 *Java heap space异常* 说明java虚拟机的堆内存不够 原因可能是
- 1. java虚拟机的堆内存设置不够 可能通过参数-Xms -Xmx来调整
- 2. 代码中创建了大量大对象 并且长时间不能被垃圾收集器收集(存在被引用) --- 内存溢出 内存泄漏


> 永久区 异常 PermGen space
- 永久存储区是一个常驻内存区域 用于存放jdk自身所携带的class interface的元数据
- 也就是说它存储的是环境必须的类信息 被装载进此区域的数据是不会被垃圾回收器回收掉的 关闭jvm才会释放此区域所占用的内存

- 如果出现了 java.lang.OutOfMemoryError: PermGen space 
- 说明java虚拟机对永久代Perm内存设置不够 一般出现这种情况 都是程序启动需要加载大量的第三方jar包

- 例如 在一个tomcat下部署了太多的应用 或者大量动态反射生成的类不断被加载 最终导致Perm区被占满

- jdk1.6以及之前: 常量池分配在永久代 1.6在方法区
- jdk1.7: 有 但已经逐步 去永久代 1.7在堆
- jdk1.8以及之后: 无, 1.8在元空间



> JDK1.6
- JDK1.6中把常量池放在了方法区 (具体实现: 永久代)
- 我们上面讲的所有情况都是基于JDK1.6 也就是常量池在方法区
- 永久代

> JDK1.7
- JDK1.7中把常量池放在了堆里面

> JDK1.8
- JDK1.8中把常量池放在了方法区 (具体实现: 元空间)
- 元空间

- 现阶段我们说字符串的常量池在方法区了

----------------------------

### String的常用方法

> 字符串.length();    -- int
- 返回字符串的长度
<!-- 
  底层来说 就是char[] value的长度 return value.length
 -->
```java
System.out.println(s1.length());
```

> 字符串.charAt(int index);   -- char
- 取指定位置上的字符

- 返回值类型:
- char

```java
String str = "123";

char c = str.charAt(0);
System.out.println(c + 1);
```


> 字符串.isEmpty();   - boolean
- 判断是否为空字符串
<!-- 
  底层来说 就是判断char[] value的长度
  return value.length == 0
 -->

- 返回值类型:
- boolean

```java
String str = "";
boolean empty = str.isEmpty();
System.out.println(empty);
```


> 字符串.toLowerCase()
> 字符串.toUpperCase()
- 使用默认语言环境 将字符串转为小写 / 大写
- 需要创建变量接收新的字符串

```java
- js中经常会说 会不会影响原字符串 
- 因为*字符串的不可变性* 即使是转换大小写 也是新造的字符串

String s1 = "HelloWorld";
String s2 = s1.toLowerCase();

System.out.println(s1);   // HelloWorld
System.out.println(s2);   // helloworld
```


> 字符串.trim();
- 去除两端空格 
- 结果需要创建变量接收(相当于用新的变量指向新字符串)
```java
s1 = "  hello  ";
String s2 = s1.trim();
```


> 字符串.equals(Object obj);    -- boolean
- 比较*实际的内容是否相同*
- 字符串是严格区分大小写的

- 返回值类型:
- boolean

```java
String s1 = "HelloWorld"
String s2 = "helloworld"
s1.equals(s2);    // false
```


> 字符串.equalsIgnoreCase(String anotherString) -- boolean
- 在忽略大小写的情况下 比较实际内容是否相同

- 返回值类型:
- boolean

```java
String s1 = "HelloWorld"
String s2 = "helloworld"
s1.equalsIgnoreCase(s2);    // true
```


> 字符串.concat(String str); 
- 将指定的字符串*链接*到此字符串的结尾 *等价于 +*
- 创建新的变量接收
```java
String s1 = "abc";
String res = s1.concat("def");


String str = "abc";
String str2 = "efg";
String concat = str.concat(str2);
System.out.println(concat);
```


> 字符串.compareTo(String anotherString);    -- int
- 比较两个字符串的大小
- 返回结果是int型的 
- 如果返回
  负数则当前对象小 
  正数则当前对象大 
  0则相等

- 因为String类实现了Comparable接口 所以可以比较大小
<!-- 
  String实现了抽象方法 compareTo
  底层就是 
  拿着每一个元素去对比 如果有不一样的 就让两个元素相减
 -->

- 返回值类型:
- int

- 应用场景:
- 字符串排序 手机联系人

```java
String s1 = "abc";
String s2 = "abe";

int res = s1.compareTo(s2);   // -2
```


> 字符串.substring(int beginIndex, [endIndex])
- 如果只传入beginIndex 则从指定位置开始*截取字符串* 包含index位置
<!-- 
  截所有
 -->

- 如果传入endIndex 则截取从开始(包括)到结束(不包括)的字符串
- 返回一个新的字符串 
```java
String s1 = "北京尚硅谷教育";
// 目标 尚硅谷教育
String res = s1.substring(2); // 尚硅谷教育

// 目标 尚硅谷
String res = s1.substring(2, 5); // 尚硅谷
```


> 字符串.endsWith(String 给定字符);   -- boolean
> 字符串.startsWith(String 给定字符);   -- boolean
- 判断字符串是否以 给定字符 结束 / 开始
- 需要创建变量接收

- 返回值类型:
- boolean

```java
String str = "helloworld";
boolean res = str.endsWith("ld"); // true
```


> 字符串.startsWith(String 给定字符, int index);   -- boolean
- 判断从index位置为准(包含开始位置) 是否以给定字符串开始
- 需要创建变量接收

- 返回值类型:
- boolean

```java
String str = "helloworld";
boolean res = str.endsWith("ll", 2); // true
```


> 字符串.contains(CharSequence s);    -- boolean
- 判断当前字符串中是否包含给定字符串 (子串)
- 对大小写敏感

```java
String str1 = "helloworld";
String str2 = "wo";
boolean res = str1.contains(str2);  // true
```


> 字符串.indexOf(String str);   -- int
- 返回指定字符在字符串中第一次出现的索引
- 没找到返回 -1

```java
String str1 = "helloworld";
int res = str1.indexOf("lo");  // 3
```


> 字符串.indexOf(String str, int index);   -- int
- 从指定的位置开始 返回指定字符串在字符串中第一次出现的索引
- 没找到返回 -1

```java
String str1 = "helloworld";
int res = str1.indexOf("lo", 5);  // -1
```

- 应用场景
- 我们可以查找 or 出现了几次
- helloworld
- 我们找到第一个or出现的位置后 比如是7 然后让它加上or的长度2 让它从l的位置(9)开始接着往后找


> 字符串.lastIndexOf(String str);   -- int
- 从后往前找 给定字符串在字符串中首次出现的索引
**注意:**
- 虽然是从后往前找 但是返回的还是从前往后的索引


> 字符串.lastIndexOf(String str, int index);   -- int
- 返回指定字符串在字符串中最后一次出现的索引 *从指定的索引开始反向搜索* 也就是从右往左

**注意:**
- 索引还是从做往右数的 在指定索引位置后 从索引的位置往左找

```java
String str = "hellorworld";
// 注意 从o的位置  往左!!! 找
int res = str.lastIndexOf("or", 6); // 4
```

> 什么情况下 indexOf 和 lastIndexOf 返回值相同
- 要么只有一个 也就是存在唯一的一个str
- 要么就没有  也就是不存在str


> 字符串.replace(旧字符, 新字符);
> 字符串.replace(旧字符串, 新字符串);
- 返回一个新的字符串
- 将字符串中的目标字符 替换为 指定字符 (会将字符串中所有的目标字符修改为指定字符)
```java
String str = "北京尚硅谷教育北京";
String res = str.replace("北", "东");  
  // 东京尚硅谷教育东京
```


> 字符串.replaceAll(String 正则, 给定字符串)
- 返回新的字符串
- 将符合正则的部分 替换为给定字符串

**注意:**
- 1. *正则是字符串形式的* 相当于在 new RegExp("正则") 当中写正则表达式 注意要对符号进行转义

- 2. replaceAll方法只有符合正则的全部都会被替换 相当于开启了匹配模式g
```java
String str = "12hello34world5java789mysql456";
String newStr = str.replaceAll("\\d+", ",").replaceAll("^,|,$", "");
```


> 字符串.replaceFirst(String 正则, 给定字符串)
- 将符合正则的部分 替换为给定字符串
- 只替换第一个匹配到的内容 相当于匹配模式中的i


> 字符串.matches(String 正则);    -- boolean
- 告知此字符串是否匹配给定的正则表达式 返回布尔值

- 作用:
- 指定字符串是否匹配正则的格式
- 相当于 test();

- 返回值类型:
- boolean

```java
String str = "12345";
boolean res = str.matches("\\d+");    // true
```


> 字符串.split(String 正则);    -- String[]
> 字符串.split(String 正则, int limit);    -- String[]
- 根据正则将匹配的内容*拆分成String[]数组* (不包含匹配的内容)

- 带limit参数的方法
- 根据匹配给定的正则来拆分此字符串 最多不超过limit个
- 如果超过了 剩下的全部都放到最后一个元素中

- 返回值类型:
- String[]

```java
String str = "hello|world|java";
String[] strs = str.split("\\|");

for(int i=0; i<strs.length; i++) {
  System.out.println(strs[i]);
  // hello world java
}
```

----------------------------

### String类与其它结构之间的转换
> String 与基本数据类型, 包装类之间的转换

- 1. String --> 基本数据类型 包装类
    - 调用包装类的静态方法: parseXxx(str)
```java
String str = "123";
int num = Ingeter.parseInt(str);
```


- 2. 基本数据类型 包装类 --> String
    - 调用String.valueOf(xxx)
```java
int num = 1;
String str = String.valueOf(num);
```

----------------------------

### String与char[]数组之间的转换

> char[] -> 字符串
- 将char[] 转换为 字符串 只需要调用String的构造器就可以了
```java
char[] arr = new char[] {'h', 'e', 'l', 'l', 'o'}
String str = new String(arr);   // hello
```

> 将char[]数组中指定位置指定长度的字符转为字符串
> String(char[], int beginIndex, int length)
- 调用String的构造器就可以了
```java
char[] arr = new char[] {'h', 'e', 'l', 'l', 'o'};
String str = new String(arr, 1, 3);
System.out.println(str);    // ell
```


> 字符串 -> char[]
> 字符串.toCharArray()
- 将字符串转为char[]数组 
- 该方法的返回值就是一个char[]
```java
String str = "abc123";
char[] charArray = str.toCharArray();

for (int i = 0; i < charArray.length; i++) {
  System.out.println(charArray[i]);
}
```


> 将字符串中指定位置的字符 放到 char[]的指定位置
> 字符串.getChars(int strIndexBegin, strIndexEnd, char[] arr, arrIndexBegin)
- 该方法没有返回值

- 参数1: int index 字符串中开始位置的索引(包括)
- 参数2: int index 字符串中结束位置的索引(不包括)
- 参数3: char[] 
- 参数4: char[] 的起始位置
```java
String str = "abc123";
// 先定义一个char[]
char[] strArr = new char[8];

// 将abc赚到arr里面 从1的位置开始装
str.getChars(0, 3, strArr, 1);

for (int i = 0; i < strArr.length; i++) {
  System.out.println(strArr[i]);
}


String str = "abc123efg";

char[] chars = new char[2];
str.getChars(0,2, chars, 0);

String s = new String(chars);
System.out.println(s);    // ab
```


> 思考
- String str = "abc123";
- 组织成 a21cb3

- 提示：
- a和3不动 bc12反转

```java
String str = "abc123";
char[] chars = str.toCharArray();

for(int i=1, j=chars.length-2; i<j; i++, j--) {
  char temp = chars[i];
  chars[i] = chars[j];
  chars[j] = temp;
}

String s = Arrays.toString(chars);
System.out.println(s);
```

> 

----------------------------

### String与byte[]数组之间的转换
- 在io流的里面就涉及到了这里的操作

- 编码:
- 将我们能看的懂的转换为看不懂的
- 我们写了两个字符(文本数据) 我们按照某种编码集和字符集转成底层的二进制数据(字节)

- 字符串 -> 字节
<!-- 
  字符串是我们能看的懂的东西
  字节就是底层的数了
 -->


- 解码:
- 将看不懂的二进制数据转换为能看得懂 不一定是字符串了
- 编码的逆过程就是解码

- 字节 -> 字符串
- 解码和编码的编码集要一致


> byte[] -> 字符串    -- 相当于解码的过程
> String(byte[], [charsetName])
- 调用String的构造器
- 返回值为byte[]

- charsetName为可选 选择字符集
- 如果不指定解码的字符集 会使用默认的

- 注意:
- *编码和解码对应的字符集要一样*

```java
String str = "abc123中国";
// 使用默认的字符集进行的编码
byte[] bytes = str.getBytes();    // 编码的过程
// [97, 98, 99, 49, 50, 51, -28, -72, -83, -27, -101, -67]

// 将byte[]转换为 字符串 使用默认的字符集进行的解码
String newStr = String(bytes)     // 解码的过程
// abc123中国
```

> new String(byte[], int beginIndex, int length)
- 将char[]数组中指定位置指定长度的字符转为字符串

---

> 字符串 -> byte[]    -- 相当于一个编码的过程
> 字符串.getBytes();
- 作用:
- 将字符串转为byte数组
- 使用默认的字符集对该字符串进行转换为byte[]

- 返回值类型:
- 返回值一个byte[]数组

```java
String str = "abc123";
byte[] bytes = str.getBytes(); 

// 使用 Array.toString 遍历 byte[]
System.out.println(Array.toString(bytes))
// [97, 98, 99, 49, 50, 51]
```


> 当有汉字的情况下 我们是根据指定的编码集对汉字进行byte字节的转换
```java
String str = "abc123中国";
byte[] bytes = str.getBytes();
System.out.println(Array.toString(bytes))
// [97, 98, 99, 49, 50, 51, -28, -72, -83, -27, -101, -67]
```
- 我们要知道到byte这个阶段(字节阶段) 就是纯数了
- 比如a对应的是asc码里面的97

- 但是"中"不存在asc码 由于我们系统当前使用的编码集是utf-8 
- 在调用str.getBytes(); 方法的时候 就是按照当前系统的编码集将中文解析为了byte[]
- 而在utf-8当中 一个汉字就是3位字节
<!-- 
  中: -28, -72, -83
  国: -27, -101, -67
 -->

- 我们上面是使用的是默认的当前系统(编辑器里面设定的)的编码集
- 我们还可以指定编码集


> 字符串.getBytes(String charsetName);
- 返回一个byte[]
- 使用指定的字符集 进行转换

- 异常:
- UnsupportedEncodingException

- 该方法会抛异常 *UnsupportedEncodingException*(比如我们输入的不是正确的编码集 所以报错 所以该方法在设置的时候 就会往外抛*不支持*的异常) 我们可以选择处理异常的方式

```java
@Test
public void test() throws UnsupportedEncodingException {
  String str = "abc123中国";
  byte[] bytes = str.getBytes("gbk");

  System.out.println(Array.toString(bytes))
  // gbk是专门针对汉字进行编码的 简体 繁体都有
  // 中国对应的编码集 就变成了 2位一组
  // 中: -42 -48
  // 国: -71, -6
}
```

- utf-8和gbk在指定字母的时候 跟asc是一样的
- gbk中一个汉字用两个字节来表示


> 练习
- 上面我们说String的时候说过 常量 和 常量 进行拼接的时候 是在常量池 
<!-- 
  String str = "javaEE" + "hadoop";   // 常量池
  String str2 = str + "hadoop";       // 堆空间
 -->

```java
@Test
public void test() {
  String s1 = "javaEEhadoop";
  String s2 = "javaEE";
  String s3 = s2 + "hadoop";

  s1 == s3;   // false

  // final修饰的变量就是常量了
  final String s4 = "javaEE";
  String s5 = s4 + "hadoop";

  s4 == s5;   // true
}
```

- 没加final之前 s3的值是由含有变量的数据进行拼接的
- 加final之后 为什么是true呢？
- 我们说常量和常量的拼接在常量池 *我们使用final后 该变量就变成常量了* 所以还在常量池


> 总结:
- 1. *final可以修饰局部变量*
- 2. final修饰的变量 是 常量
- 3. 常量 和 常量进行拼接会在常量池

----------------------------

### StringBuffer类
### StringBuilder类
- String类是不可变的字符序列
- 而StringBuffer代表 StringBuilder类为 *可变的字符序列* jdk1.0中声明 可以对字符串内容进行增删 此时不会产生新的对象


> String StringBuffer StringBuilder 三者的异同

> String
- *不可变的字符序列* 该类为jdk1.0就开始有的


> StringBuffer
- *可变的字符序列* 该类为jdk1.0就开始有的
- 该类中的方法都是*线程的安全的*(效率低)


> StringBuilder
- *可变的字符序列* 该类为jdk1.5后新增的
- 该类中的方法几乎和StringBuffer是一样的 但是没有synchronized修饰 就是*线程不安全的*(效率高一些)


> StringBuilder效率该但线程不安全 
> StringBuffer线程安全但效率低 那我们怎么选择?
- 看是否为多线程的问题
- 不是多线程问题的时候 我们选择StringBuilder 提高效率


> 相同点
- 底层都是使用char[]存储


> 推荐使用 new StringBuffer(int num) 构造器
- 原因看完这章会有答案


> 思考
- 为什么都用char[]数组存 String就不可变 StringBuffer StringBuilder就可变呢？

- 可变的体现
```java
StringBuffer sb1 = new StringBuffer("abc");

// 将字符串指定位置的字符 替换为给定字符 该方法没有返回值 修改字符串中的字符
sb1.setCharAt(0, 'm')   // mbc
```

- 我们说*String类*是不可变的 它*调用方法修改字符串后都需要创建新的变量来接收* 并不影响原字符串

- 而我们发现 *setCharAt方法 没有返回值 真的把原字符串直接修改了* 也就是说 影响的就是原字符串

- 这就是可变的


- 那大家底层都一样 为什么它就是可变的呢？ 接下来我们看看它的底层实现


> 原码分析
- String str = new String();
- 如果我们这么new了一个str 那么底层它帮我们new了一个char[0]数组 长度为0

- char[] value = new char[0]

- String str = new String("abc")
- 如果我们这么new了一个str 那么底层它帮我们创建了一个 如下的char[] 长度为3
- char[] value = new char[] {'a','b','c'}


- 当我们使用空参的StirngBuffer创建一个sb1的时候
- StringBuffer sb1 = new StringBuffer()
- char[] value = new char[16]
- 底层创建了一个长度为16的char[]

- 比如我们添加了一个'a' 相当于
- sb1.append('a');  --  value[0] = 'a'
- sb1.append('b');  --  value[1] = 'b'
- sb1.append('c');  --  value[2] = 'c'

- 也就是说 String和StringBuffer底层都是char[]数组 因为char[]的初始化长度不一样 往里面添加元素的方式不一样 所以体现的可变


- StringBuffer sb2 = new StringBuffer("abc");
- public StringBuffer(String str) {
  super(str.length() + 16)
}
- 使用上面方式创建的sb2 相当于在字符串的长度之外 额外的+16
- char[] value = new char["abc".length + 16]

- 相当于我们每次造完后都额外的空出来16个char


> 问题1: 
- sb1 sb2的长度是多少呢？
```java
StringBuffer sb1 = new StringBuffer()
System.out.println(sb1.length());   // 0

StringBuffer sb2 = new StringBuffer("abc");
System.out.println(sb2.length());   // 3
```
- length()方法返回的是char[]数组中 实际的元素个数


> 问题2: 
- new StringBuffer() 这种方式创建的字符串相当于创建了一个长度为16的char[]

- 如果要添加的数据底层盛不下了 那就需要扩容底层的数组
- 默认情况下 扩容为原来容量的2倍 + 2
- *同时将原有数组中的元素复制到新的数组中*

- 我们看看 append() 方法底层是怎么样的逻辑


> 扩容的原码解析
```java
if(str == null) return appendNull();

// 当我们传入str有长度的时候
int len = str.length();

/*  
  先确保容量是够的
  比如 我们已经存了15个了 现在还要添加"abc"
  count就是15 + 3 = 18
*/
ensureCapacityInternal(count + len);


// 看看 ensureCapacityInternal 方法 value.length是底层的数组
// 18 - 16 > 0 说明数组不够了 
if(18 - value.length > 0) {  
  value = Array.copyOf(value, newCapacity(18))
}

// 然后调用的了 newCapacity 将数组扩容了一倍 然后+2
- int newCapacity = (value.length << 1) + 2


str.getChars(0, len, value, count);
count += len;
return this
```

- 如果开发中 我们需要对一个字符串频繁的进行修改 我们尽可能的不要选String(它的效率最差 因为每次都要新造一个字符串) 而StringBuffer StringBuilder当原有的16长度不够用的时候才会扩容
<!-- 
  先是扩容一倍+2 再超过就拿超过的长度赋值给value[]
 -->

- 应用场景
- 当我们知道 我们要调用 append() 方法多少次的时候
- 我们尽可能的使用 下面的构造器


> new StringBuffer(int num)
- 创建指定容量的StringBuffer 为了避免自动扩容
- 比如造一个长度为30 40长度的
<!-- 
  因为默认就是16 16个字符
 -->

```java
StringBuffer sb = new StringBuffer(40);
System.out.println(sb.length());
// 0  length()方法获取的是该sb中元素的个数
```

- StringBuffer 和 StringBuilder 使用哪个我们就要看线程是否安全

----------------------------

### StringBuffer(StringBuilder) 常用方法
- 下面我们说的都是StringBuffer方法 StringBuilder差不多 区别就是是否是同步了
<!-- 
  append 和 insert 时 如果原来value数组长度不够 可扩容
  下面这些方法支持方法链操作
 -->

```java
// 方法链原理
@overwrite
public StringBuilder append(String str) {
  super.append(str);
  return this;
}
```


> sb.append([int char float double long boolean char[] String str CharSequence s StringBuffer sb])
- 我们可以传递多种数据类型

- 作用：
- 往字符串中*添加字符*

```java
// 调用空参构造器创建sb空字符串(可扩展)
StringBuffer sb = new StringBuffer();

sb.append(1);
sb.append("b");
sb.append("字符串");
sb.append(0.0);

System.out.println(sb);
// 1b字符串0.0
```

> sb.delete(int start, int end)
- *删除*指定位置的内容
- 包括开始位置 不包括结束位置
- 还必须传递两个参数

- 影响原字符串

- 返回值
- 也可以创建变量接收删除指定字符后的结果(没必要啊)

```java
StringBuffer sb = new StringBuffer("abc");
sb.append(1);
sb.append(1);

System.out.println(sb);
// abc11

sb.delete(2, 4)
// ab1    -- 删除了c1

StringBuffer res = sb.delete(2, 4)
System.out.println(res);
// ab1
```


> sb.replace(int start, int end, String str)
- 将指定位置的字符 *替换*为新的字符串
- 包括开始位置 不包括结束位置

- 影响原字符串

```java
StringBuffer sb = new StringBuffer("abc");
sb.replace(0, 2, "hello")   // helloc
```

> sb.insert(int offset, [int char long float double boolean Object String char[]])
- 在指定的位置 *插入*数据
- 能插入的类型有很多 但*最终都会转为字符串*

- 在给定的位置上插入 原位置的数据会后移
<!-- 
  abc
   ↑
  给定索引位置为1
  就在b的位置上插入数据

  a数据bc
 -->

- 影响原字符串

```java
StringBuffer sb = new StringBuffer("abc");
sb.insert(1, true)
// atruebc
```

> sb.reverse()
- 反转字符串
- 影响原字符串

- String类没有这样的方法


> sb.indexOf(String str)
- 返回值为int型
- 返回给定字符串在原字符串中首次出现的位置
- 没有找到是-1


> sb.substring(int start, int end)
- 返回值为String型
- *截取*指定位置的字符，包括开始 不包括结束

- 需要创建变量接收新的字符串


> sb.length()
- 返回值为int型
- 返回字符串的长度


> sb.charAt(int n)
- 返回值为char型
- 跟String类型里面的使用方式一样


> sb.setCharAt(int n, char c)
- 没有返回值
- *修改*原字符串中指定位置的字符
- 只能修改一个字符


> 总结：
- 增 : append()
- 删 : delete()
- 改 : setCharAt() / replace()
- 查 : charAt()
- 插 : insert()
- 长度 : length()
- 遍历 : toString() / for + charAt()


> String StringBuffer StringBuilder效率测试
- 从高到低 StringBuilder > StringBuffer > String

----------------------------

### String 转换为 StringBuffer StringBuilder
### StringBuffer StringBuilder 转换为 String 
- 调用StringBuffer的构造器
- 调用String的构造器


> String -> StringBuffer StringBuilder
- 以 String -> StringBuffer 为例
```java
String str = "abc"
StringBuffer strBuf = new StringBuffer(str);
```

> StringBuffer StringBuilder -> String
- 1. 调用String的构造器
- 2. 调用StringBuffer.toString()返回的就是一个String类型的字符串

----------------------------

### String相关练习 常见的算法题
> 1. 模拟一个trim方法 去除字符串两端的空格
```java
public String myTrim(String str) {
  if (str != null) {
    // 用于记录从前往后首次索引位置不是空格的位置的索引
    int start = 0;

    // 用于记录从后往前首次索引位置不是空格的位置的索引
    int end = str.length() - 1;

    while (start < end && str.charAt(start) == ' ') {
      start++;
    }

    while (start < end && str.charAt(end) == ' ') {
      end--;
    }
    if (str.charAt(start) == ' ') {
      return "";
    }

    return str.substring(start, end + 1);
  }
  return null;
}
```

------

> 2. 将一个字符串进行反转 将字符串中指定部分进行反转
- 比如 "ab*cdef*g 反转为 ab*fedc*g

> 方式1
```java
/**
* @param str  要反转的字符串
* @param startIndex  反转指定位置的子串 - 开始位置
* @param endIndex  - 结束位置
* @return 返回String类型 因为要返回反转后的字符串
*
* 思路：
* 方式1：
* 转换为char[] 利用数组来解决问题
* 成为数组后 我们可以依次交换两个元素的位置
* x最前面的元素 y最后面的元素 这样最前最后两个位置的元素交换
* 然后x++ y-- x往右一位 y往左一位 继续交换
* 直到最后
*/

public String reverse(String str, int startIndex, int endIndex) {
  // 将字符串转为数组
  char[] arr = str.toCharArray();

  // 快速处理机制 如果传递的数据是null的话 直接return null
  if(str != null) {
    // 对指定范围进行反转 因为 ab ... g 是固定
    // 1. 初始化两个x y变量
    // 2. 让x++ y-- 一个往前走 一个往后走 终止条件为 位置互换 x < y
    for (int x = startIndex, y = endIndex; x < y; x++, y--) {
      char temp = arr[x];
      arr[x] = arr[y];
      arr[y] = temp;
    }

    // 将结果返回
    return new String(arr);
  }
  return null;
}
```

------

> 方式2
```java
/**
  * @param str  要反转的字符串
  * @param startIndex  反转指定位置的子串 - 开始位置
  * @param endIndex  - 结束位置
  * @return 返回String类型 因为要返回反转后的字符串
  *
  * 方式2：
  * 使用String的拼接操作
  *
  * 思路：
  * 将目标字符串 abcdefg 看做是 StringBuilder
  * 将目标字符串 abcdefg 看做是3部分 ab + 目标子串 + g
  * 
  * 然后将ab部分提取出来 + for循环倒叙反转目标子串 + 最后的部分
  */
public String reverse(String str, int startIndex, int endIndex) {
  // 部分1 开始固定的ab部分
  // 截取 abcdefg 0 2 -> ab 也就是将指定位置前的字符 提取出来
  String reverseStr = str.substring(0, startIndex);

  // 部分2 目标子串
  // 利用 倒！ for循环提取 目标子串 部分 拼接到 strPart1 中
  for (int i = endIndex; i > startIndex; i--) {
    reverseStr += str.charAt(i);
  }

  // 部分3 最后固定的g
  reverseStr += str.substring(endIndex + 1);

  return reverseStr;
}
```

------

> 方式3: (对方法2的优化)
```java
/**
* 方式3:
* 使用StringBuffer替换String
*/
public String reverse(String str, int startIndex, int endIndex) {
  // 放用户输入的字符串比较长的时候 不让它被动的扩展容量(默认只有16个)
  // 创建一个指定容量的字符串
  StringBuilder builder = new StringBuilder(str.length());

  // 将原有的字符串的3部分 放到 builder 里面
  // 放入第一部分子串
  builder.append(str.substring(0,startIndex));

  // 放入第2部分子串
  for (int i = endIndex; i > startIndex; i--) {
    builder.append(str.charAt(i));
  }

  // 放入第三部分
  builder.append(str.substring(endIndex + 1));

  // 最后我们返回一个String类型 现在是sb类型
  return builder.toString();
}
```

------

> 3. 获取一个字符串在另一个字符串中出现的次数
- 比如 获取 "ab" 在 "abkkcadkabkebfkabkskab" 中出现的次数

> 方式1:
```java
/**
* 获取subStr在mainStr中的次数
*
* @param mainStr
* @param subStr
* @return int count
*
* 思路：
* "ab" 在 "abkkcadkabkebfkabkskab" 中出现的次数
* 1. 创建一个计数变量
* 我们用 mainStr.indexOf(subStr) ab 第一次出现的位置是 0
* 结果不为-1我们让计数变量++下
*
* 2. 下次我们在 mainStr.indexOf(subStr) 就应该用kk开始了 从2开始
* 也就是说 indexOf 返回的索引位置 + subStr的长度
*/
public int getCount(String mainStr, String subStr) {
  int mainLen = mainStr.length();
  int subLen = subStr.length();

  int count = 0;
  int index;
  // 我们要查找的是短字符串在长字符串中出现的次数 所以判断下
  if(mainLen >= subLen) {
    // 将ab第一次出现的位置 给 index
    while((index = mainStr.indexOf(subStr)) != -1) {
      count++;
      // 下一次我们要从 抛去ab之后的字符串中进行indexOf查找
      mainStr = mainStr.substring(index + subStr.length());
    }
    return count;
  } else {
    return 0;
  }
}

@Test
public void test() {
  String mainStr = "abkkcadkabkebfkabkskab";
  String subStr = "ab";
  int count = getCount(mainStr, subStr);
  System.out.println(count);
}
```

------

> 方式2： (对方式1的改进)
- 要点：
- 这里我们还用的while循环 和 indexOf
- 但要点区别于方式1
- 方式1中是开始从主串: abcdedfg中找ab 当找到第一次后
- 我们将主串重新赋值了 主串变成了cdedfg

- 方式2中 我们没有采用重新赋值的方式 而是利用了
- indexOf(给定字符串, 开始查找的位置)
- 这个方法 还是一个主串 abcdedfg
- 当找到第一个ab后 给index重新赋值 然后下一轮从index的位置找

```java
public int getCount(String mainStr, String subStr) {
  int mainLen = mainStr.length();
  int subLen = subStr.length();

  int count = 0;
  int index = 0;

  if(mainLen >= subLen) {
    while((index = mainStr.indexOf(subStr, index)) != -1) {
      count++;
      index += subLen;
    }
    return count;
  } else {
    return 0;
  }
}
```

> 4. 获取两个字符串中最大的相同子串
- str1 = "abcwerthelloyuiodef"
- str2 = "cvhellobnm"
- 提示：
- 将端的那个串进行长度依次递减的子串与较长的串比较

```java
/**
* 获取两个字符串中最大的相同子串(查找两个字符串中相同的部分 hello)
* - str1 = "abcwerthelloyuiodef"
* - str2 = "cvhellobnm"
*
* 思路：
* 我们先想想12和16中的最大公约数 找的时候 我们是从12开始递减的左找
* 最大公约数是不会超过12的 也就是说 最大的相同子串不会超过短的str2的
* 我们找完12 11 10 找到4 发现是 那下面就不用找了
*
* 上面这道题也是
* 1. 我们看看这个短串在不在长串里面
* 2. 如果不在 我们就在短串中减一个 但有两种情况我们都要考虑
* 比如 abcd 减一个 abc 或者 bcd
* 相当于我们需要定义两个指针 一个指针当头 一个指针当尾
* 第一轮 指针头部就在头 尾部就在尾 也就是字符串本身
* abcdefg
* ↑     ↑
* 第二轮相对于原字符串来讲 相当于扣出去一个
* 第三轮相对于原字符串来讲 相当于扣出去二个
* 第四轮相对于原字符串来讲 相当于扣出去三个 以此类推
*
* 扣出去一个的时候 就涵盖了两种情况
* 扣出去三个的时候 情况更多 所以最少我们要使用双重for循环
*/
public String getMaxSameString(String str1, String str2) {

  // 先判断两个str谁短 我们要操作短的
  String maxStr = (str1.length() >= str2.length()) ? str1 : str2;
  String minStr = (str1.length() < str2.length()) ? str1 : str2;

  // 我们要扣出去的轮数 实际上就是 短的字符串的长度
  int length = minStr.length();
  for (int i=0; i<length; i++) {
    // 在这里定义两个指针 控制截取短串 y第一轮是最后一个 第二轮就是-1 三轮-2 所以-i
    for (int x=0, y=length-i; y <= length; x++, y++) {
      String subStr = minStr.substring(x, y);
      // 第一轮 一个也不扣出去的情况 指针就是头尾 所以subStr = minStr
      if(maxStr.contains(subStr)) {
        return subStr;
      }

      // 第二轮 我们要判断的是minStr的子串 因为我们要从它身上扣出去一个
      // 我们先考虑第二轮的第一种情况 abcd 扣一个abc的情况
    }
  }
  return null;
}
```

> 对上扩展
```java
// 如果存在多个长度相同的最大相同子串
// 此时先返回String[]，后面可以用集合中的ArrayList替换，较方便
public String[] getMaxSameSubString1(String str1, String str2) {
  if (str1 != null && str2 != null) {
    StringBuffer sBuffer = new StringBuffer();
    String maxString = (str1.length() > str2.length()) ? str1 : str2;
    String minString = (str1.length() > str2.length()) ? str2 : str1;

    int len = minString.length();
    for (int i = 0; i < len; i++) {
      for (int x = 0, y = len - i; y <= len; x++, y++) {
        String subString = minString.substring(x, y);
        if (maxString.contains(subString)) {
          sBuffer.append(subString + ",");
        }
      }

      if (sBuffer.length() != 0) {
        break;
      }
    }
    String[] split = sBuffer.toString().replaceAll(",$", "").split("\\,");
    return split;
  }

  return null;
}
```


> 对上扩展
```java
// 如果存在多个长度相同的最大相同子串：使用ArrayList
public List<String> getMaxSameSubString1(String str1, String str2) {
  if (str1 != null && str2 != null) {
    List<String> list = new ArrayList<String>();
    String maxString = (str1.length() > str2.length()) ? str1 : str2;
    String minString = (str1.length() > str2.length()) ? str2 : str1;

    int len = minString.length();
    for (int i = 0; i < len; i++) {
      for (int x = 0, y = len - i; y <= len; x++, y++) {
        String subString = minString.substring(x, y);
        if (maxString.contains(subString)) {
          list.add(subString);
        }
      }
      if (list.size() != 0) {
        break;
      }
    }
    return list;
  }

  return null;
}
```


> 5. 对字符串中字符进行自然顺序排序
- 提示：
- 1. 字符串变成字符数组
- 2. 对数组排序 选择 冒泡 Arrays.sort()
- 3. 将排序后的数组变成字符串
```java
public void testSort() {
  String str = "abcwerthelloyuiodef";
  char[] arr = str.toCharArray();
  Arrays.sort(arr);

  String newStr = new String(arr);
  System.out.println(newStr);
}
```

----------------------------

### IDEA的 Debug
> 步骤
- 1. 在需要观察的行号位置 点击 加上红点
- 2. Test方法名的位置 右键 - Debug "对应的test方法"

- 假如我们要是想看源码 点击 ↓ into 想从源码出来 点击 ↑ out
<!-- 
  红色箭头是强制进入
 -->  

- step over是下一行代码

- 左侧有一个播放的箭头 是进入到下一个debug点
- 比如我们有3个debug点 我们点击3下 会依次进入到3个debug点

- 左侧有停止按钮 就是停止debug操作的意思

- 测试用的代码
```java
@Test
public void testStringBuffer() {
  String str = null;
  StringBuffer sb = new StringBuffer();
  // 通过append方法 将null放入sb中 没有抛异常 把null添加进去了
  sb.append(str);

  System.out.println(sb.length());  // 4
  System.out.println(sb);   // "null"

  // 通过构造器的方式 将null放进去 抛异常了 NullPointerException
  // 因为我们把null放进去 源码中是 super(str.length() + 16) null.length就是空指针了
  StringBuffer sb1 = new StringBuffer(str);
  System.out.println(sb1);
}
```
----------------------------

### 日期时间API -- JDK8之前

> System.currentTimeMillis()
- 返回值:
- long型
- 得到的是毫秒数(时间戳)

- 返回当前时间与1970年1月1日0时0分0秒之间 以毫秒为单位的时间差
- 此方法适用于计算时间差

```java
long time = System.currentTimeMillis();
```


> Date类
- Date类有两个地方都有
<!-- 
  | -- ava.util.Date
    | -- java.sql.Date

  这两个类是子父类的关系
 -->

- 我们先说说 java.util.Date 类：
- java.sql.Date类对应着数据库中的日期类型的变量
- 数据库中的一条记录会转换为java层面的一个对象 而数据库中的date转换为对象后 对应的就是 sql.Date 类 跟数据库交互的时候我们才会用 sql.Date 类


> 创建 Date 对象    -- java.util.Date
- 注意：
- 因为两个地方都有Date类 所以idea不会帮我们自动导包 我们要自己选择使用哪个Date类


> new Date();   -- 空参构造器
- 空参构造器返回的是当前时间的date对象

```java
import java.util.Date;

@Test
public void test() {

  Date date = new Date();

  System.out.println(date);
  // Tue Jan 11 18:11:10 JST 2022
  // xian是当前的 年月日时分秒

  System.out.println(date.toString());
  // 输出和上面一样 意思也和上面的一样 该方法在Date类中重写过
}
```


> new Date(long date)
- 传入给定的毫秒数
- 根据指定毫秒数的date对象

```java
Date date = new Date(1550306204104L);

System.out.println(date);
// Tue Jan 11 18:11:10 JST 2022
```

> date.getTime();
- 获取的是毫秒数(时间戳)

- 返回值
- long型

```java
Date date = new Date();
System.out.println(date.getTime());
// 1646302005462
```


> 创建 Date 对象    -- java.sql.Date
> new java.sql.Date(long date)
- 如果项目有已经导入 java.util.Date了 那我们再使用sql.Date的时候 就要显式的指定包名

```java
java.sql.Date date = new java.sql.Date(1550306204104L)
System.out.println(date);
// 2016-10-01
// sql.Date 的toString输出的是 2016-10-01
```

- 该类同样有toString() 和 getTime()


> sql.Date对象 - 多态 -> util.Date对象
- 这两个对象之间又如何转换呢？
- 直接赋值 因为是子父类的关系 多态


> util.Date对象 --> sql.Date对象
- 相当于从父类的往子类去转
```java

// 多态的体现 sql.Date赋值给util.Date
Date date = new java.sql.Date(1550306204104L)

// 将父类型的Date date强转为子类的sql.Date
java.sql.Date date2 = (java.sql.Date)date2

- 上面相当于sql.Date多态转上去 再强转下来
```


> 另一种情况
- 场景：
- 我们在java层面new了一个util下的date对象 我们要将该对象塞到数据库中

- 我们不可能直接塞过去 因为数据库的date对象是跟sql.Date搭配
- 所以我们这种情况下要将util.Date转为sql.Date

```java
Date date = new Date();

// 下面的方式进行强转肯定报错 classCastException
java.sql.Date date2 = (java.sql.Date)date // x
```

- 我们new的是util.Date对象 怎么可能转换为java.sql.Date对象呢
- 也就是说我们new的就是父类 怎么可能转换为子类呢？
- 我们以前讲的强转能成都是因为我们new的子类 多态到父类 然后再强转下来 这可以



> util.Date -> sql.Date 解决方式

```java
Date date = new Date();

// 调用date的getTime()方法 拿到毫秒数
long time = date.getTime();

// 利用毫秒数重新状态sql.Date对象
java.sql.Date date2 = new java.sql.Date(time)
```

----------------------------

### 日期时间API SimpleDateFormat类 -- JDK8之前
- 直译: 简单的日期格式化
- Date类的API不易于国际化 大部分被废弃了 
- java.text.SimpleDateFormat类是一个*不与语言环境有关*的方式来*格式化和解析日期的具体类*

- *SimpleDateFormat类*说白了*就是对Date类进行一些的操作 这些操作涉及到了格式化和解析*

  格式化:  日期 -> 文本 (指定格式的字符串)
  
  解　析:  文本 (指定格式的字符串) -> 日期


> 该类就是对日期Date类进行解析和格式化的
- *该类只能操作Date* 不能操作Calendar


> SimpleDateFormat类的实例化 -- 使用默认的构造器
> SimpleDateFormat sdf = new SimpleDateFormat();
- 通过空参构造器 得到一个 sdf实例化对象

**注意:**
- sdf实例化对象 只能将 date对象格式化成 默认格式的日期字符串
- sdf实例化对象 只能将 默认格式的日期字符串 解析成date对象


> sdf.format(Date date);
- 该方法用于 将日期对象进行格式化操作 日期 -> 文本
- 参数
- 日期对象

- 返回值
- String

- 格式化默认格式
- 2022/01/12 13:49

```java
// 实例化 SimpleDateFormat
SimpleDateFormat sdf = new SimpleDateFormat();

// 格式化: 日期 -> 字符串
Date date = new Date();
System.out.println(date);
    // Wed Jan 12 13:49:04 JST 2022

// 该方法返回的是格式化后的字符串
String dateFormat = sdf.format(date);
System.out.println(dateFormat);
    // 2022/01/12 13:49
```


> sdf.parse(指定格式的日期文本)
- 将日期格式的文本 转换为 date对象

- 返回值
- Date date

- 异常
- ParseException

- 对传入的字符串的格式有要求
- 默认是什么格式的 我们就要传入什么格式的文本 我们可以先调用format()方法看看默认格式
<!-- 
  2022/01/12 13:49
 -->

```java
throws ParseException

// String str = "2016-10-01 上午11：39";   报错 格式不对
String str = "2016/10/01 13:58";
Date date1 = sdf.parse(str);
System.out.println(date1);
    // Sat Oct 01 13:58:00 JST 2016
```


> 常用该格式的构造器
- 我们可以在 SimpleDateFormat(格式) 构造器里面传入格式参数

> SimpleDateFormat sdf = new SimpleDateFormat(格式);
- 我们可以传入一个指定格式 然后通过 format() 或者 parse()
- 可以格式化成我们指定格式的日期字符串
<!-- 
  格式符号:
  G 年代标志符
  y 年
  M 月
  d 日
  h 时 在上午或下午 (1~12)
  H 时 在一天中 (0~23)
  m 分
  s 秒
  S 毫秒
  E 星期
  D 一年中的第几天
  F 一月中第几个星期几
  w 一年中第几个星期
  W 一月中第几个星期
  a 上午 / 下午 标记符
  k 时 在一天中 (1~24)
  K 时 在上午或下午 (0~11)
  z 时区

  最常用的格式
  yyyy-MM-dd HH:mm:ss
 -->

```java
SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyy.MMMMM.dd GGG hh:mm aaa");
String format = sdf1.format(date);
System.out.println(format);
    // 02022.1月.12 西暦 02:14 午後
```


**注意：**
- 解析的时候 我们要用格式化的格式
- 要求字符串必须是符合SimpleDateFormat识别的格式(通过构造器参数体现的) 否则就会抛异常


> 练习:
- 字符串 "2020-09-08" 转为java.sql.Date

- 场景：
- 我们注册时候的生日 会写入日期 然后前端要将数据传到后台 传到后台的时候 我们以字符串的形式没有问题 但是后台最终要将数据保存到数据库

- 而数据库中需要的是sql.Date对象 所以我们在java层面 将字符串 的日期 转为 sql的Date对象

```java
String birth = "2020-09-08";
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

// 解析成 util.Date 对象
Date date = sdf.parse(birth);

long ms = date.getTime();
java.sql.Date sqlDate = new java.sql.Date(ms);

System.out.println(sqlDate);
```


> 练习2:
- 让渔夫 从 1990-01-01 开始 执行三天打鱼两天晒网的逻辑
- 1 2 3打鱼 4 5晒网 6 7 1打鱼
- 我们要求 在以后的某年每月某日 这个渔夫是在打鱼还是在晒网

- 思路：
- 三天打鱼两天晒网 相当于5天一个周期
- 我们要求出来 某年每月某日 - 1990-01-01 之间的天数
- 或者说 某年每月某日 是 1990-01-01起的多少天

- 举例：
- 2020-09-08是在打鱼还是在晒网

- 总天数 % 5 看余数
- 余数是1 2 3的时候在打鱼 0 4的时候在晒网

> 方式1:
- (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24) + 1
<!-- 
  因为有除不尽的情况 所以+1
 -->

----------------------------

### Calendar日历类的使用
- *Calendar是一个抽象基类* 主要用于完成日期字段之间相互操作的功能
- 既然是抽象类就意味着它不能进行实例化 也就是说我们要通过*实现了它的子类去造对象*了 

- Calendar的实现子类 -- *GregorianCalendar*


> 实例化对象
> 1. 通过 Calendar的实现子类 -- GregorianCalendar 调用该子类的构造器 创建calendar实例对象

```java
GregorianCalendar calendar = new GregorianCalendar();
```


> 2. 使用 Calendar.getInstance() 方法创建 Calendar的实例对象
- 这个方式创建 calendar实例比较方便

```java
Calendar calendar = Calendar.getInstance();
System.out.println(calendar.getClass());
    //  java.util.GregorianCalendar
```

> 解析： 
- Calendar类是抽象类 我们创建的也是Calendar类子类的对象 只不过在这返回的类型是Calendar

- 看不到之类是哪个类了 但通过calendar.getClass()方法查看 能看到实际还是 GregorianCalendar

> 注意:
- 两种方式创建的实例对象 类型不同
- GregorianCalendar
- Calendar

- 两种方式其实是一样的 只是GregorianCalendar太难记 喜欢使用第二种方式


> calendar的常用方法

> 获取
> calendar.get(Calendar.XXX)
- 从当前日期对象中得到年月日时分秒

- 返回值
- int

- 参数
- 参考上面 注意是通过 Calendar 调用的常量
```java
Calendar.DAY_OF_MONTH
    // 获取当前时间对象中的 一个月当中的第几天

Calendar.DAY_OF_WEEK
    // 周几 英国国家 星期是从 星期日开始算 0
    // 比如今天是周四 我得到的是5 

Calendar.DAY_OF_WEEK_IN_MONTH
    // 获取这个月的第几周

Calendar.DAY_OF_YEAR
    // 一年中的第几天

Calendar.WEEK_OF_MONTH
    // 获取这个月的第几周

Calendar.WEEK_OF_YEAR
    // 这一年当中的第几周

Calendar.HOUR_OF_DAY
    // 获取一天当中的第几小时

Calendar.YEAR

Calendar.MONTH
    // 结果要+1

Calendar.DATE

Calendar.HOUR_OF_DAY
Calendar.MINUTE
Calendar.SECOND
```

```java
Calendar calendar = Calendar.getInstance();

calendar.get(Calendar.DAY_OF_MONTH);  // 12
calendar.get(Calendar.DATE)   // 12
calendar.get(Calendar.MONTH)  // 要加1
```


> 设置
> calendar.set(int field, int value)
- 没有返回值
- 将指定的属性 设置为指定的值 修改的就是calendar对象本身

```java
// 将当天修改为 指定的时间22号
calendar.set(Calendar.DAY_OF_MONTH, 22);

// 再获取下当天的时间看看
int day1 = calendar.get(Calendar.DAY_OF_MONTH);
System.out.println(day1);   // 12 -> 22
```


> 加减运算 增加
> calendar.add(int field, int value)
- 没有返回值
- 在指定日期上进行加的运算 正数是加 负数是减

```java
calendar.add(Calendar.DAY_OF_MONTH, 3);
calendar.add(Calendar.DAY_OF_MONTH, -3);
```


> calendar.getTime()  -- 日历类 --> Date
- 将calendar对象转换为date对象

- 返回值
- Date

```java
Date date = calendar.getTime();
System.out.println(date);
    // Wed Jan 12 23:04:17 JST 2022


// 创建一个calendar对象
Calendar calendar = Calendar.getInstance();

// 将日历转换为日期
Date date = calendar.getTime();

// 创建一个date格式化的类
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

// 将我们的日期对象按照执行的格式格式化成字符串 
String format = sdf.format(date);
System.out.println(format);
```


> calendar.setTime(Date date)  -- Date --> 日历类
- 将date对象转换为calendar对象

- 返回值
- Calendar

```java
Date date = new Date();

// 设置calendar的时间为date
calendar.setTime(date);
```

**注意:**
- 获取月份时: 一月是0 ... 12月是11
- 获取星期时: 周日是1, 周一0, 周六7


> 个人总结:
- Date类
  - util.Date
    - sql.Date

- SimpleDateFormat
- 该类用于将Date类型的对象 进行 格式化 和 解析

- Calendar
- 日历类
- 该类中定义了很丰富的静态常量 可以通过 Calendar.xxx 的形式来调用

- 同时也提供了 Date - Calendar 对象之间的转换
- getTime() 日历 - 日期
- setTIme() 日期 - 日历

----------------------------

### JDK8 -- 日期时间API
- 我们最开始关于时间的api是jdk1.0中引入的概念Date类, 但是它的太多数方法在jdk1.1引入calendar类引入之后就被弃用了

- 而Calendar类并不比Date好多少 它们面临的问题是

- 1. 可变性
- 像日期和时间这样的类应该是不可变的
<!-- 
  而我们可以根据 set add等方法修改时间 
  正常应该像String那样 我们能得到的是返回值 而不是修改时间对象本身

  jdk8中的就是不可变的
 -->

- 2. 偏移性
- Date中的年份是从1900开始的 而月份都从0开始
```java
Date date = new Date(2020, 9, 8);
date.sout
  // Fri Oct 08 00:00:00 GMT+08:00 3920

- 2020年 变成 3920
    // 底层源码在 year+1900
- 9月8日 变成 10月8日
    // 月份是从0开始的 我们输入的9 实际就是10

- 如果我们真想表示2020年9月8日 我们要先处理偏移量 将偏移量减下去之后再当做参数放入构造器中

Date date = new Date(2020-1900, 9-1, 8);
```

- 3. 格式化
- 格式化只对Date有用 Calendar则不行

- 此外 它们也不是线程安全的 不能处理润秒等
- 总结 对日期和时间的操作一直是java程序员最痛苦的地方之一


- 上面我们知道有很多不足的地方 所以在java 8中引入了java.time API 已经纠正了过去的缺陷 将来很长一段时间内它都会为我们服务

- java8吸收了 *Joda-Time* 的精华 以一个新的开始为java创建了优秀的API

- 新的 java.time 中包含了所有关于
    本地日期(localDate)
    本地时间(localTime)
    本地日期时间(localDateTime)
    时区(ZoneDateTime)
    持续时间(Duration) 的类

- 历史悠久的Date类新增了toInstant()方法 用于把Date转换成新的表示形式 这些新增的本地化时间日期API大大简化了日期时间和本地化的管理

<!-- 
  java.time -- 包含值对象的基础包
  java.time.chrono -- 提供对不同的日历系统的方法
  java.time.format -- 格式化和解析时间和日期
  java.time.temporal -- 包括底层框架和扩展
  java.time.zone -- 包含时区支持的类

  大多数开发者只会用到基础包和format包 也可能会用到temporal包
  因此 尽管有68个新的公开类型 大多数开发者 大概将只会用到其中的三分之一
 -->

----------------------------

### LocalDate, LocalTime, LocalDateTime
- 这三个类是其中比较重要的几个类 它们的实例是*不可变的对象* 分别表示使用 ISO-8601 日历系统的 日期 时间 日期和时间
<!-- 
  ISO-8601 日历系统时国际标准化组织制定的现代公民的日期和时间的表示法 也就是公历
 -->

- 它们提供了简单的本地日期或时间 并不包含当前的时间信息 也不包含与时区相关的信息

- LocalDate 代表IOS格式(yyyy-MM-dd)的日期 可以存储生日 纪念日等日期

- LocalTime 表示一个时间 而不是日期

- LocalDateTime 用来表示日期和时间的 *这是一个最常用的类之一*


> LocalDate LocalTime LocalDateTime
- LocalDate
    打印的是日期 - 2022-01-13

- LocalTime
    打印的是时间 - 15:26:27.531941

- LocalDateTime
    打印的是日期+时间 - 2022-01-13T15:27:36.098656


> 实例化对象
- 注意 3个类返回的都是各自类型的

> 实例化方式1: 通过各自类调用 now() 方法
> LocalDate.now([时区])
> LocalTime.now([时区])
> LocalDateTime.now([时区])
- 返回的是对应类型的时间对象 当前系统的时间

```java
// 获取当前本地的日期
LocalDate localDate = LocalDate.now();
System.out.println(localDate);  
    // 2022-01-13

// 获取当前本地的时间
LocalTime localTime = LocalTime.now();
System.out.println(localTime);  
    // 15:26:27.531941

// 获取当前本地的日期+时间
LocalDateTime localDateTime = LocalDateTime.now();
System.out.println(localDateTime);  
    // 2022-01-13T15:27:36.098656
```


> 实例化方式2: 通过各自类调用 of() 方法
- of()方法可以创建指定的时间对象 
- of()方法必须要传递参数

> LocalDate.of(指定日期)
> LocalTime.of(指定时间)
> LocalDateTime.of(指定日期和时间)
- 该方法可以根据给定的数据 设置指定的年 月 日 时 分 秒 不用考虑没有偏移量的问题

- 指定时间的方式 年 月 日 时 分 秒 之间以逗号分隔
```java
LocalDateTime localDateTime1 = LocalDateTime.of(2020, 10, 6, 13, 23, 43);
System.out.println(localDateTime1);
    // 2020-10-06T13:23:43
```


> 时间对象.get相关方法
- 没有偏移量的问题哦
- 该方法用于 *获取* 时间对象中的 年 月 日 时 分 秒

- 返回值类型:
- int

```java
LocalDateTime time = LocalDateTime.of(2016, 10, 1, 13, 25, 22);
int year = time.getYear();
System.out.println(year);   // 2016

// 注意: 获取月份的方法名 getMonthValue 得到的是int
int month = time.getMonthValue();
System.out.println(month);    // 10


// 注意得到的类型
Month month1 = time.getMonth();
System.out.println(month1);   // OCTOBER


int day = time.getDayOfMonth();
System.out.println(day);    // 1


DayOfWeek week = time.getDayOfWeek();
System.out.println(week);   // SATURDAY


// 获取时分秒
int hour = time.getHour();
int minute = time.getMinute();
int second = time.getSecond();
System.out.println(hour);
```


> 时间对象.with相关方法
- 该方法用于 *设置* 时间对象中的 年 月 日 时 分 秒
- 不用考虑偏移量的问题
- *不可变性* 需要创建对应类型的变量接收结果

```java
LocalDateTime time = LocalDateTime.of(2016, 10, 1, 13, 25, 22);


// 设置 修改时间对象的 - 日 有返回值
// 传入 int型 数据
LocalDateTime localDateTime = time.withDayOfMonth(8);
System.out.println(localDateTime);    
// 2016-10-08T13:25:22


// 设置 年
localDateTime.withYear();

// 设置 月
localDateTime.withMonth();

localDateTime.withDayOfYear();

localDateTime.withHour();
localDateTime.withMinute();
localDateTime.withSecond();
```


> 时间对象.plus相关方法
> 时间对象.minus相关方法
- 该方法用于 *运算-加减* 时间对象中的 年 月 日 时 分 秒
- 参数类型为 long型

- 不可变性

- 有返回值
- 为各类时间对象

```java
localDateTime.plusYears(3);
localDateTime.plusMonths();
localDateTime.plusDays();

localDateTime.plusHours();
localDateTime.plusMinutes();
localDateTime.plusSeconds();

localDateTime.plusWeeks();
```

> 扩展
- 毫秒 - 微妙 - 纳秒(nanos)

----------------------------

### 扩展: 2020-01-12T15:17:21
- 为什么 日期 和 时间 中间要有一个 T 呢
- 国际标准化组织的国际标准ISO 8601是日期和时间的表示方法，
- 全称为《数据存储和交换形式·信息交换·日期和时间的表示方法》

- 日期和时间的组合表示法编辑:
合并表示时，要在时间前面加一大写字母T，
如要表示北京时间2004年5月3日下午5点30分8秒，可以写成2004-05-03T17:30:08+08:00或20040503T173008+08。

----------------------------

### Instant类
- Instant
- 时间线上的一个瞬时点 这可能被用来记录应用程序中的事件时间戳

- 在处理时间和日期的时候 我们通常会想到年 月 日 时 分 秒
- 然而 这只是时间的一个模型 是面向人类的

- 第二种通用模型是面向机器的 或者说是连续的 -- Instant类
<!-- 对于机器来说它只认数 -->

- 在此模型中 时间线中的一个点表示为一个很大的数 这有利于计算机处理

- 在unix中 这个数从1970年开始 以秒为的单位 同样的 
- 在java中也是从1970年开始 但以毫秒为单位
<!-- 既然机器只认数 那么数就要有一个起始点 1970 -->

- java.time包通过值类型instant提供机器视图 不提供处理人类意义上的时间单位

- instant表示时间线上的一点 而不需要任何上下文信息
- 例如
- 时区概念上讲 它只是简单的表示自1970年1月1日0时0分0秒开始的秒数

- 因为java.time包是基于纳秒计算的 所以instant的精度可以达到纳秒级

- 1ns = 10^-9s
- 1秒 = 1000毫秒 = 10^6微妙 = 10^9纳秒


- 该类类似于 java.util.Date 类

> 扩展
- UTC 统一标准时间
- GMT 格林威治标准时间  -- 欧洲 英国
- CST 中央标准时间  -- 美国


> 实例化方式1
> Instant.now()
- 创建 Instant 实例对象
- 默认得到的是中时区的时间对象

```java
Instant instant = Instant.now();
System.out.println(instant);
    // 2022-01-13T07:18:47.287346Z
```

- 我们发现上面的输出结果 小时上 有所差别
- 07
- 16
- 差了9个小时(中国的话差8个小时)

- 中国在东八区
- 伦敦在中时区(子午线 - 格林威治时间)

- 如果我们是早上9点 伦敦就是凌晨1点
- 而Instant的时间就是中时区的时间 到中国的话结果+8 到日本的话结果就要+9


> 得到指定所在时区的instant时间对象
> instant对象.atOffset(Zone.xxx)
- 根据时区调整偏移量

```java
// 日本要加9小时
OffsetDateTime offsetDateTime = instant.atOffset(ZoneOffset.ofHours(9));

System.out.println(offsetDateTime);
    // 2022-01-13T16:26:02.385918+09:00
```

> 实例化的方式2
> Instant类.ofEpochMilli(long型);
- 根据给定毫秒数创建时间对象 获取instant实例
```java
Instant instant1 = Instant.ofEpochMilli(1642059179780L);

System.out.println(instant1);
```


> instant对象.toEpochMilli()
- 获取瞬时点的毫秒数 从1970年1月1日0秒 开始的毫秒数
- 返回值是long型

- 和date.getTime()类似

```java
long milli = instant.toEpochMilli();
```

----------------------------

### DateTimeFormatter的使用
- 需要 格式化 解析日期或时间的时候 我们就使用该类 用来*替换原有的SimpleDateFormat类*

- java.time.format.DateTimeFormatter类 提供了三种实例化的方式

> DateTimeFormatter的实例化
> 方式1: 预定义的标准格式
> DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
- 通过调用DateTimeFormatter类的常量 创建一个 formatter 对象

- 该对象用于格式化 或 解析 日期或时间对象

**注意:**
- 通过此方式创建的 formatter对象 只能格式化成 或 解析成默认格式的时间字符串

- 解析只能解析成默认格式(解析成时间对象的时候 我们要传入字符串 传入的字符串的格式必须和格式化出来的格式一致)

- 格式化也只能格式化默认格式

--- 

> 方式2: 本地化的相关的格式
> DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG)
- 参数有如下3个 参数不同 我们得到的时间格式也不同
- 下面3个参数用于指定 格式化的风格

- FormatStyle.LONG
    - 使用LONG格式报错 没有时区信息
    - .withZone(ZoneOffset.ofHours(9))
    - 2022年1月13日 21:15:18 +09:00

- FormatStyle.MEDIUM
    - 2022/01/13 21:17:08

- FormatStyle.SHORT
    - 2022/01/13 21:07

```java
// 创建一个format对象用于解析 和 格式化 日期 时间对象 
DateTimeFormatter format = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT);


// 使用LONG的时候报错 说没有时区信息 我们在后面加上了
// .withZone(ZoneOffset.ofHours(9));
DateTimeFormatter format1 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG).withZone(ZoneOffset.ofHours(9));



// 创建一个日期时间对象
LocalDateTime localDateTime = LocalDateTime.now();

// 调用format()方法 格式化日期时间对象 得到一个str
String dataStr = format.format(localDateTime);
System.out.println(dataStr);
    // 2022/01/13 21:07
```

> DateTimeFormatter.ofLocalizedDate()
- 参数有如下4个
- FormatStyle.FULL
    - 2022年1月13日木曜日

- FormatStyle.LONG
- FormatStyle.MEDIUM
- FormatStyle.SHORT

```java
DateTimeFormatter format1 = DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL);

String dataStr = format1.format(LocalDate.now());
System.out.println(dataStr);
    // 2022年1月13日木曜日
```

- 使用这种方式创建的formatter对象 格式化的格式是不能变的


> 方式3: 自定义的格式   -- 常用
> DateTimeFormatter formatter = DateTimeFormatter.ofPattern("指定格式");
- 该方法便于我们指定我们自己想要的时间格式

```java
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");

String s = formatter.format(LocalDateTime.now());
System.out.println(s);
    // 2022-01-13 09:23:25
```


> 格式化
> formatter.format(时间或日期对象)
- 日期 -> 字符串

- 返回值类型
- String类型

```java
DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

// 格式化  日期 -> 字符串
LocalDateTime localDateTime = LocalDateTime.now();

String str1 = formatter.format(localDateTime);
System.out.println(str1);
    // 2022-01-13T20:40:32.295775
```


> 解析
> formatter.parse(字符串)
- 字符串 -> 日期
- 我们传入的格式 一定要和指定格式化的格式一致

```java
TemporalAccessor parse = formatter.parse("2022-01-13T20:40:32.295775");
- 这里接收的类型 因为我们没有指定Date 还是Time 还是DateTime 所以这里呈现的是一种接口的形式 这里相当于一种多态的形式

- 我们可以对parse对象做一些转换

System.out.println(parse);
// {},ISO resolved to 2022-01-13T20:40:32.295775
```

----------------------------

### 其它的日期时间 相关的API使用

> ZoneId类
- 全世界一共分成了24个时区
- 该类中包含了所有的时区信息 一个时区的 ID 
- 如 Europe/Paris


> ZoneId.of("Asia/Tokyo")
- 获取指定时区的时间

```java
LocalDateTime
localDateTime = LocalDateTime.now(ZoneId.of("Asia/Tokyo")
System.out.println(localDateTime);
```


> ZonedDateTime类
- 带时区的日期时间

```java
// 获取本时区的 zonedDateTime 对象
ZonedDateTime zonedDateTime = ZonedDateTime.now();

// 获取指定时区的 zonedDateTime 对象
ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("Asia/Tokyo");
```


> Clock
- 使用时区提供对当前即时 、 日期和时间的访问的时钟 。


> Duration类
- 当我们想计算两个时间的间隔 以秒和纳秒为基准
- 持续时间:
- 用于计算两个 时间 间隔

```java
LocalTime localTime = LocalTime.now();
LocalTime localTime1 = LocalTime.of(15, 23, 32);

// 创建 Duration对象 表示两个时间的间隔
Duration duration = Duration.between(localTime, localTime1)

System.out.println(duration.getSeconds())
System.out.println(duration.getNano())
System.out.println(duration.toDays())

```

> Period
- 计算年月日之间的间隔
- 日期间隔
- 用于计算两个 日期 间隔

```java
LocalDate localDate = LocalDate.now()
LocalDate localDate1 = LocalDate.of(2028, 3, 18)

Period period = Period.between(localDate, localDate1)

System.out.println(period.getYears())
System.out.println(period.getMonths())
System.out.println(period.getDays())

Period period1 = period.withYears(2)
System.out.println(period1)
```

> TemporalAdjuster
- 调整时间的
- 时间校正器。有时我们可能需要获取例如：将日期调整 到“下一个工作日”等操作。

> TemporalAdjusters
- 该类通过静态方法
(firstDayOfXxx()/lastDayOfXxx()/提供了大量的常用
TemporalAdjuster的实现 。

```java
// 获取当前日期的下一个周日是哪天？
TemporalAdjuster temporalAdjuster = TemporalAdjusters.next(DayofWeek.SUNDAY)

LocalDateTime localDateTime = LocalDateTime.now().with(temporalAdjuster)

// 获取下一个工作日是哪天
LocalDate localDate = LocalDate.now().with(new TemporalAdjuster() {
  @Override
  public Temporal adjustInfo(Temporal temporal) {
    LocalDate date = (LocalDate) temporal;
    if(date.getDayOfWeek().equals(DayOfWeek.FRIDAY)) {
      return date .plusDays(3)
    } else if(date.getDayOfWeek().equals(DayOfWeek.SATURDAY)) {
      return date .plusDays(2)
    } else {
      return date .plusDays(1)
    }
  }
})
```



<!-- 
java.time.Instant
与 
java.util.Date 
      // To遗留类
      Date.from(instant)

      // From 遗留类
      date.toInstant()


java.time.Instant
与 
java.sql.Timestamp 
      // To遗留类
      Timestamp.from(instant)

      // From 遗留类
      timestamp.toInstant()


java.time.ZonedDateTime
与 
java.util.GregorianCalendar 
      // To遗留类
      GregorianCalendar.from(zonedDateTime)

      // From 遗留类
      cal.toZonedDateTime()



java.time.LocalDate
与 
java.sql.Time 
      // To遗留类
      Date.valueOf(localDate)

      // From 遗留类
      date.toLocalDate()



java.time.LocalTime
与 
java.sql.Time
      // To遗留类
      Date.valueOf(localDate)

      // From 遗留类
      date.toLocalDate()


java.time.LocalDateTime
与
java.sql.Timestamp
      // To遗留类
      Timestamp.valueOf(localDateTime)

      // From 遗留类
      timestamp.toLocalDateTime()


java.time.ZoneId
与
java.util.TimeZone
      // To遗留类
      Timezone.getTimeZone(id)

      // From 遗留类
      timeZone.toZoneId()


java.time.format.DateTimeFormatter
与
java.text.DateFormat
      // To遗留类
      formatter.toFormat()

      // From 遗留类
      无
 -->

----------------------------

### Java比较器
- 我们前面学过比较运算符
- == != < > <= >= instanceof 我们会发现绝大数的运算符是使用在基本数据类型中的

- 但是我们有个述求 我们希望java对象是可以比较大小的 就有了java的比较器
<!-- 
  比如京东上对商品的排序 比如按综合 按销量 按评论 按新品等等 
-->

- java中的对象 正常情况下 只能进行比较: 
- == 或 !=  因为我们使用它们的时候比较的是地址值
- 不能使用 > 或 < 

- 但是在开发场景中 我们需要对多个对象进行排序 言外之意 就是需要比较对象的大小

- 如何实现？ 
- 我们就需要使用下面的两个接口 我们比较大小用到的两个接口


> java实现对象排序的方式有两种
- 自然排序: 
  - java.lang.Comparable

- 定制排序:
  - java.util.Comparator


- 之前我们说过实现了Comparable接口的类就可以进行比较了
- 比如我们前面说到的String类 它就实现了Comparable接口 从而String类这种引用数据类型的 也可以进行对象的大小的比较了
```java
// 创建一个字符串数组
String[] arr = new String[] {"AA", "CC", "MM", "GG", "JJ", "DD", "kk"};

Arrays.sort(arr);
String s = Arrays.toString(arr);
System.out.println(s);
// [AA, CC, DD, GG, JJ, MM, kk]
```

- 我们发现字符串数组是从小到大的顺序排列的 
- 为什么可以排序?
- 就是因为String实现了Comparable接口

- String里面重写了compareTo方法 源码中的比较方式 就是从前往后比 有不一样的就做减法


> 重写compareTo(obj)的规则：
- 像String包装类等*实现了Comparable接口* *重写了compareTo方法* 给出了比较两个对象大小的方式

- 对于String和包装类来说 重写的规则如下

- 如果当前对象this大于形参对象obj 则返回正整数
- 如果当前对象this小于形参对象obj 则返回负整数
- 如果相等则返回0

- String包装类重写compareTo()方法以后 *默认情况下是重小到大的顺序排列的*

- 实现Comparable接口的对象列表(和数组)可以通过Collections sort或Arrays.sort进行自然排序
- 这些方法在排序的时候默认会考虑我们指定的规则进行排序

- 实现此接口的对象可以用作有序映射中的键或有序集合中的元素 无需指定比较器


> 总结：
- 对于实现了Comparable接口的类 我们想对它们进行排序的时候 直接调用方法就可以了
<!-- 
  因为上述的类已经重写过了Comparable接口中的compareTo()方法了
 -->

> Arrays.sort()
> Collections.sort()

----------------------------

### 自然排序 -- 自定义类实现Comparable接口
> 扩展总结
- 创建一个对象 相当于开一个文件创建一个类

- 上面说了 如果是String类 包装类的时候 我们要对它们进行排序直接调用Arrays.sort方法就可以了

- 但是如果是自定义的类(对象) 我们要对它们进行排序的时候 就要按照下面的步骤来处理


> 自定义类 -- 自然排序 -- 排序要点
- 1. 让自定义类实现 Comparable接口
- 2. 类中重写 compareTo()方法 在compareTo()方法中指明如何排序
<!-- 这里只是定义排序规则而已 -->

- 3. 调用现成的别的类的排序方法

- 比如
- 我们对商品对象的价格进行排序 从低到高

```java
@Test
public void goodsTest() {
  // 我们造一个长度为4的数组 类型为Goods对象
  Goods[] arr = new Goods[4];

  arr[0] = new Goods("lianxiangMouse", 34);
  arr[1] = new Goods("dellMouse", 43);
  arr[2] = new Goods("xiaomiMouse", 12);
  arr[3] = new Goods("huaweiMouse", 65);

  Arrays.sort(arr);
  System.out.println(Arrays.toString(arr));
  /*
  这里注意 在没有将商品对象实现Comparable接口之前 调用
  Arrays.sort(arr); 方法 会报异常

  java.lang.ClassCastException: class com.sam.exer.Goods cannot be cast to class java.lang.Comparable

  原因是我们调用了sort 里面涉及到数组的元素进行排序 就意味着要比较大小 而我们的元素是对象 默认的情况下是不能比较大小的

  要想排序 必须要实现接口 重写方法 
  实现和重写做完之后 就不会报错了
  */
}



// Goods对象类
// 商品类
public class Goods implements Comparable {

  private String name;
  private double price;

  public Goods() {}
  public Goods(String name, double price) {
    this.name = name;
    this.price = price;
  }


  // 如果没有重写toString()方法输出的会是地址值
  @Override
  public String toString() {
    return "Goods{" +
        "name='" + name + '\'' +
        ", price=" + price +
        '}';
  }


  // 在该重写的方法中 
  // 我们指明按照什么方式进行排序(指明商品比较大小的方式)
  @Override
  public int compareTo(Object o) {

    // 在强转之前的判断
    if(o instanceof Goods) {
      Goods goods = (Goods)o;
      // 价格从低到高
      if(this.price > goods.price) {
        return 1;
      } else if(this.price < goods.price) {
        return -1;
      } else {
        // 没有商品价格一样的情况
        return 0;

        // 当两个商品的价格一样的时候 我们可以按照产品名称再次排序 从低到高
        return this.name.compareTo(goods.name);

        // 从高到低
        return -this.name.compareTo(goods.name);
      }

      // 方式2
      // return Double.compare(this.price, goods.price);
    }

    // 有可能传入的不是一个商品 o instanceof Goods 为false的情况 我们抛出一个异常
    throw new RuntimeException("传入的数据类型不一致");
  }
}
```

----------------------------

### 定制排序 -- 使用Comparator
- 定制排序也是一个接口 java.util.Comparator
- 定制排序 按照我们的需求定制排序

> 应用场景
- 当元素的类型没有实现 java.lang.Compoarable接口
- 而又不方便在自定义类中修改代码 或者 实现了 java.lang.Comparable接口规则不适合当前的操作 
<!-- 
  比如jdk当中现有的类 没有实现Compoarable接口 但我们又不能修改当前类

  或者实现了Compoarable接口但是里面的方式 又不符合当前的操作
  就像String默认是从小到大 但我现在的需求就是从大到小
  就像上面的例子中的goods 我就想姓名先排 然后再按照价格排

  这时候我们可以定制排序
 -->

- 既然 Comparator 是一个接口 那我们还是要使用该接口的实现类的对象

> 使用方式
- Arrays.sort(要排序的对象, new Comparator() {

})

- Collections.sort(要排序的对象, new Comparator() {
  
})

- 在上面两个方式中的第二个参数的位置 传入一个Comparator接口的匿名实现类对象 在方法体中重写compare()方法


> 重写compare()方法 抽象方法
- 重写规则：
- 重写compare(Object o1, Object o2)方法
- 比较o1 和 o2的大小
- 如果方法
    返回正整数 则表示o1大于o2 

- 如果方法
    返回0 则表示相等

- 如果方法
    返回负整数 则表示o1小于o2

<!-- 
  // compare 和 compareTo 的区别
  compare(二个参数) 这里是让形参这两个对象比大小
  compareTo(一个参数) 我们拿着调用这个方法的对象和形参去比大小
 -->

```java
String[] arr = new String[] {"AA", "CC", "KK", "GG"};

Arrays.sort(arr, new Comparator() {
  @Override
  public int compare(Object o1, Object o2) {
    return 0;
  }
});
```

> 基本使用的示例
- "AA", "CC", "KK", "GG" 我们要对这个字符串排序
- 但是还没有讲泛型 而且能看到我们在compare(o1, o2)方法中定义的都是object类型的

- 而我们要对字符串进行排序 所以我们这里要进行下判断 我们传入的o1 和 o2是不是String类型 如果是 我们进行下强转
```java
Arrays.sort(arr, new Comparator() {
  // 按照字符串从大到小的顺序进行排列
  @Override
  public int compare(Object o1, Object o2) {
    if(o1 instanceof String && o2 instanceof String) {
      String s1 = (String)o1;
      String s2 = (String)o2;

      // s1.compareTo(s2); 默认是从小到大 但是我们可以在前面加一个-
      return -s1.compareTo(s2);
    }
    throw new RuntimeException("传入的数据类型不符合");
  }
});

System.out.println(Arrays.toString(arr));
```

- 总结:
- 个人看法 很多时候我们不能修改类的原码去让该类实现comparable接口 但还想实现比较大小的逻辑

- 或者像上面的例子 String虽然实现了comparable接口 但是默认的从小到大的排序规则 不适合我们 我们想要从大道小

- 这时候我们就可以使用Comparator接口 像*打补丁似的*给一个方法注入 排序 指定排序规则

> 技巧
- s1.compareTo(s2); 是从小到大
- -s1.compareTo(s2); 就是从大到小


> 自定义类实现定制排序的示例
- 即使这个类内部已经实现了Comparable接口 我们觉的这个接口的排序方式不适合我们

- 我们还可以通过"打补丁"的方式使用Comparator接口的实现类方式 指定新的排序规则

- 比如我们上面的案例中Goods类已经实现了Comparable接口也重写了compareTo方法

- 内部指定的排序规则是 价格从低到高
- 但我们觉得这个规则不适合我们 下面我们是用“打补丁”的方式 修改下排序规则

```java
public void test2() {
  Goods[] arr = new Goods[5];
  arr[0] = new Goods("lenovoMouse", 34);
  arr[1] = new Goods("dellMouse", 15);
  arr[2] = new Goods("huaweiMouse", 99);

  // Arrays.sort(arr); 如果没有指定第二个参数 那么默认还是从小到大

  Arrays.sort(arr, new Comparator() {
    // 指明商品比较大小的方式: 按照产品名称从低到高排序 再按照价格从高到低排序
    @Override
    public int compare(Object o1, Object o2) {
      if(o1 instanceof Goods && o2 instanceof Goods) {
        Goods g1 = (Goods)o1;
        Goods g2 = (Goods)o2;

        // 如果它们的名字一样 按照价格排 不一样
        if(g1.getName().equals(g2.getName())) {
          return -Double.compare(g1.getPrice(), g2.getPrice());
        } else {
          // 名字不一样 按照名字从低到高排序
          return g1.getName().compareTo(g2.getName());
        }
      }

      throw new RuntimeException("传入的数据类型不一致");
    }
  });
}
```

> 总结
- 只要我们在程序中涉及到对象来比较大小了
- 就会跟这两个接口打交道

- 区别
- 我们让两个对象比较大小

- 使用Comparable方式
  - 相当于让对象所属的类 实现Comparable接口
  - 一劳永逸
  - 一旦指定 能够保证Comparable接口实现类的对象在任何位置都能比较大小


- 使用Comparator方式
  - 我们调用排序方式的时候 临时给了一种排序方式
  - 打补丁
  - 临时性的比较

----------------------------

### System, Math, BigInteger, BidDecimal的使用


### System类
- 该类代表系统 系统级的很多属性和控制方法都放置在该类的内部 该类位于java.lang包
<!-- 
  该类的构造器是private的 所以无法创建该类的对象 也就是无法实例化该类

  其内部的成员变量和成员方法都是static的 所以也可以很方便的进行调用
 -->

- 类似一个工具类 因为都是通过类名调用的

> 成员变量
- System类内部包含 in out err 三个成员变量

- 分别代表
  标准输入流(键盘输入) 
  标准输出流(显示器)
  标准错误输出流(显示器)


> 成员方法
> System.currentTimeMillis()
- native long currentTimeMillis()
- 该方法的作用是返回当前的计算时间 时间的表达格式为当前计算机时间和GMT时间(格林威治时间) 1970 1 1 0 0 0所差的毫秒数


> System.exit(int status)
- void exit(int status)
- 该方法的作用是退出程序
- 其中status的值为0 -- 正常退出
- 非0 -- 异常退出

- 使用该方法可以在图形界面编程中实现程序的退出功能等


> System.gc()
- void gc()
- 该方法的作用是请求系统进行垃圾回收 至于系统是否立刻回收则取决于系统中垃圾回收算法的实现以及系统执行时的情况


> System.getProperty(String key)
- String getProperty(String key)
- 该方法的作用是获得系统中属性名为key的属性所对应的值 系统中常见的属性名以及属性的作用如下表
<!-- 
      属性名          属性说明
    java.version    java运行时环境版本
    java.home       java安装目录
    os.name         操作系统的名称
    os.version      操作系统的版本
    user.name       用户的账户名称
    user.home       用户的主目录
    user.dir        用户的当前工作目录
 -->

----------------------------

### Math
- java.lang.Math提供了一系列的静态方法用于科学计算 其方法的参数和返回值类型一般为double型

> abs
- 绝对值

> acos, asin, atan, cos, sin, tan
- 三角函数

> sqrt
- 平方根

> pow(double a,doble b) 
- a的b次幂

> log
- 自然对数

> exp 
- e为底指数

> max(double a,double b)
> min(double a,double b)
> random()
- 回 0.0 到 1.0 的随机数

> long round(double a) 
- double型数据 a 转换为 long 型 四舍五入 

> toDegrees(double angrad)
- 弧度 -> 角度

> toRadians(double angdeg)
- 角度 -> 弧度

----------------------------

### BigInteger类
- Integer 类作为 int 的包装类 能存储的最大整型值为2^31-1 
<!-- 
  int是4个字节 4 x 8 32位 一半正的一半负的
 -->
- Long 类也是有限的 最大为 2^63-1。如果要表示再大的整数 不管是基本数据类型还是他们的包装类都无能为力 更不用说进行运算了

- java.math包的BigInteger可以表示不可变的任意精度的整数 想要多少位就有多少位

- BigInteger提供所有java的基本整数操作符的对应物
- 并提供java.lang.Math的所有相关方法 另外 BigInteger还提供以下运算

- 模算术
- GCD计算
- 质数测试
- 素数生成
- 位操作
- 以及一些其它操作

> 构造器
> BigInteger(String val)
- 根据字符串构建BigInteger对象

> 常用方法
> public BigInteger abs()
- 返回此BigInteger的绝对值的BigInteger

> BigInteger add(BigInteger val)
- 返回其值为(this + val)的BigInteger

> BigInteger subtract(BigInteger val)
- 返回其值为(this - val)的BigInteger

> BigInteger multiply(BigInteger val)
- 返回其值为(this * val)的BigInteger

> BigInteger divide(BigInteger val) 
- 返回其值为(this / val)的BigInteger 整数相除只保留整数部分

> BigInteger remainder(BigInteger val)
- 返回其值为(this % val)的BigInteger

> BigInteger[] divideAndRemainder(BigInteger val)
- 返回包含(this / val)后跟(this % val)的两个BigInteger的数组

> BigInteger pow(int exponent)
- 返回其值为(this^exponent)的BigInteger


### BidDecimal类
- BigInteger对应的整型 BidDecimal对应的就是浮点型

- 一般的float类和double类可以用来做科学计算或工程计算 但在商业计算中 要求数字精度比较高 故用到java.math.BigDecimal类

- BigDecimal类支持不可变的 任意精度的有符号十进制定点数


> 构造器
> public BigDecimal(double val)
> public BigDecimal(String val)


> 常用方法
> public BigDecimal add(BigDecimal augend)
- 加

> public BigDecimal subtract(BigDecimal subtrahend)
- 减

> public BigDecimal multiply(BigDecimal multiplicand)
- 乘

> public BigDecimal divide(BigDecimal divisor, int scale, int roundingMode)
- 除

```java
BigInteger bi = new BigInteger("121212");
BigDecimal bd = new BigDecimal("12.2342")

BigDecimal bd2 = new BigDecimal("11")

bd.divide(bd2)  // 报错 因为除不尽我们要指定除不尽的时候 怎么解决 比如下面的两种方式

// 四舍五入
bd.divide(bd2, BigDecimal.ROUND_HALF_UP)

// 要求保留15位小数
bd.divide(bd2, 15, BigDecimal.ROUND_HALF_UP)
```

----------------------------

### 枚举类
> 什么叫枚举类？
- 统计学中 就经常用到枚举法 比如两个骰子 随机丢 问结果<=7的概率是多少
- 这时候我们就要把<=7的情况都列出来 6x6=36种情况
- 像上面把*所有的情况都列出来* 就是枚举法

- 也就是说:
- 枚举法的前提是能将所有的情况列全
  情况必须是 有限个！！！ 确定的！！！ 才能枚举


- 什么叫有限个 和 确定的？
- 星期: 1-7
- 性别: 男 女
- 季节: 4个
- 就职状态: Busy Free Vocation Dimission
- 线程状态: 创建 就绪 运行 阻塞 死亡

- 枚举类: 类中的对象的个数是确定的 有限个


> 枚举类的定义
- 当一个 "类" 中的 "对象" 是有限个 确定的 的时候 这个类就是枚举类

- 场景:
- 当需要*定义一组常量*时 强烈建议使用*枚举类*
<!-- 
  枚举类中有好几个对象 对象是常量
  一组常量 意味着它们之间是有相互关系的 它们都是在描述一件事情
 -->

- 如果枚举类中只有一个对象 则可以作为一种单例模式的实现方式


> 定义枚举类1(jdk5.0之前 自定义枚举类)
- *枚举类中的对象是确定且有限的* 言外之意我们一开始就知道 
- 也就是说 我们首*先要私有化类的构造器* 如果没有私有化 就意味着我们可以在类的外面调用构造器 创建多个对象

- 如果枚举类中需要属性的话 那么属性也要声明为private final的 因为枚举类中的对象是常量 

- 也就是说对象造完之后就不能赋值了 一旦赋值以后就定了 对象是常量了 对象还有属性 所以下面的属性我们也不让它们变了 全是常量

- 因为我们将构造器私有化了 也就是在外面不能造对象了 所以只能在类内部造 这里不是提供get set方法 而是相当于声明 public static final的常量 外部可以通过 类.常量 的形式拿到对象

- 1. 私有化类的构造器 并通过构造器给当前类中的属性进行赋值 并用private修饰
- 2. 定义类对象的属性 并用private final修饰
- 3. 类内部创建对象 声明为public static final的
```java
  public static final Season SPRING = new Season("春天", "春暖花开");
```


> 具体代码实现
```java
package com.sam.exer;

// 测试类
public class SeasonTest {
  public static void main(String[] args) {
    // 这就是一个常量的对象
    Season spring = Season.SPRING;
    System.out.println(spring.toString());
  }
}

// 自定义枚举类
class Season {
  
  // 1. 声明Season对象的属性(private final修饰)
  private final String seasonName;
  private final String seasonDesc;
      // 这里单独这么写会报错
      // final修饰的变量必须要赋值 
      // 赋值的方式 显示赋值 代码块赋值 构造器赋值 
      // 如果使用代码块赋值 显示赋值的话 就意味着所有的变量的值都一样 
      // 如果想让每一个对象的属性值都不一样就使用构造器的赋值方式


  
  // 2. 私有化类的构造器 并给对象属性赋值 
  private  Season(String seasonName, String seasonDesc) {
    this.seasonName = seasonName;
    this.seasonDesc = seasonDesc;
  }

  // 3. 提供当前枚举类的多个对象(声明为public static final)
  // public 不提供get set方法 外面还想用 所以定义成public
  // static 直接通过类去调用 所以定义成static
  // final 对象造好以后作为常量出现 所以定义成final
  public static final Season SPRING = new Season("春天", "春暖花开");
  public static final Season SUMMER = new Season("夏天", "夏日炎炎");
  public static final Season AUTUMN = new Season("秋天", "秋高气爽");
  public static final Season WINTER = new Season("冬天", "冰天雪地");

  // 4. 其它述求 
  // 获取枚举类对象的属性 类外面提供对象的属性 get方法
  public String getSeasonName() {
    return seasonName;
  }

  public String getSeasonDesc() {
    return seasonDesc;
  }

  // 5. 其它述求2
  @Override
  public String toString() {
    return "Season{" +
                   "seasonName='" + seasonName + '\'' +
                   ", seasonDesc='" + seasonDesc + '\'' +
                   '}';
  }
}

```

**注意:**
- 枚举类中的对象的修饰符是 public static final
```java
// 这里的对象也是一个属性
public static final Season WINTER = new Season("冬天", "冰天雪地");
```

- public 权限的够
- static 加载的时间早
- final  不能被修改了


> 定义枚举类2(jdk5.0之后 使用 enum关键字 定义枚举类)
- enum关键字的使用

> 要点:
- 1. 将class 替换成 enum
```java
class Season { ... }

替换成

enum Season { ... }
```

- 2. enum类中 顶部位置 声明对外提供的常量对象
- 注意：
- 多个对象之间使用","隔开 末尾使用";"结束

```java
enum Season2 {
  SPRING("春天", "春暖花开"),
  SUMMER("夏天", "夏日炎炎"),
  AUTUMN("秋天", "秋高气爽"),
  WINTER("冬天", "冰天雪地");
}
```

- 因为创建的就是当前类的对象 所以 public static final 类类型(Season) new Season都可以省略掉
```java
public static final Season SPRING = new Season("春天", "春暖花开");

去掉后：

SPRING("春天", "春暖花开"),
```

- 3. 私有化构造器 和 提供 实例对象的属性还是一样的
```java
enum Season2 {

  // 1. 提供当前枚举类的对象
  SPRING("春天", "春暖花开"),
  SUMMER("夏天", "夏日炎炎"),
  AUTUMN("秋天", "秋高气爽"),
  WINTER("冬天", "冰天雪地");

  // 2. 对象属性 还是一样的
  private final String seasonName;
  private final String seasonDesc;

  // 3. 私有的构造器
  private Season2(String seasonName, String seasonDesc) {
    this.seasonName = seasonName;
    this.seasonDesc = seasonDesc;
  }
}
```

- 4. 关于重写toString方法
- 使用enum关键字修饰的类 默认父类 是 class java.lang.Enum
- 所以该类中的toString 输出的是当前类的常量 SPRING

- 如果有需求可以在enum类中重写toString


> 完整代码
```java
package com.sam.exer;

// 使用enum关键字定义枚举类
public class SeasonTest2 {
  public static void main(String[] args) {
    Season2 spring = Season2.SPRING;
    System.out.println(spring);     // SPRING
    // 我们发现下面我们没有重写toString方法 却也能输出不是地址值的结果 SPRING 输出的是常量名

    // Season2类没有指定父类那么就应该是Object 但是Object的话 那输出应该就是地址值 但是结果还不是 说明enum修饰的类的父类不是Object

    // 我们看看enum修饰的类的父类是谁 class java.lang.Enum
    System.out.println(Season2.class.getSuperclass());

    // 说明 定义的枚举类默认继承的 class java.lang.Enum

  }
}

// enum类的使用 将class 换成 enum
enum Season2 {
  // 类中首部位置 一定要先声明对外提供的常量对象
  // 1. 提供当前枚举类的对象 多个对象之间用, 隔开 末尾对象用;结束
  SPRING("春天", "春暖花开"),
  SUMMER("夏天", "夏日炎炎"),
  AUTUMN("秋天", "秋高气爽"),
  WINTER("冬天", "冰天雪地");

  // 2. 对象属性 还是一样的
  private final String seasonName;
  private final String seasonDesc;

  // 3. 私有的构造器
  private Season2(String seasonName, String seasonDesc) {
    this.seasonName = seasonName;
    this.seasonDesc = seasonDesc;
  }
}
```

----------------------------

### Enum类的常用方法
- 也就是说 只有 *enum关键字* 修饰的类才有这些方法

> 枚举类对象.equals
- 在枚举类型中可以直接使用 == 来比较两个枚举常量是否相等
- Enum提供的这个equals()方法 也是直接使用 == 实现的
- 它的存在是为了set list 和 map中使用

- 注意 equals()是不可变的

```java
Season spring = Season.SPRING;
Season summer = Season.SUMMER;

boolean equals = spring.equals(summer);
System.out.println(equals);
```


> 枚举类对象.getDeclaningClass
- 得到枚举常量所属枚举类型的Class对象
- 可以用它来判断两个枚举常量是否属于同一个枚举类型

```java
Class<Season2> declaringClass = winter.getDeclaringClass();
System.out.println(declaringClass);
    // class com.sam.exer.Season2
```

> 枚举类对象.name()
- 得到当前枚举常量的名称
- 建议优先使用toString
```java
System.out.println(winter.name());
    // WINTER
```

> 枚举类对象.ordinal()
- 得到当前枚举对象在枚举类中的位置 

- 我们在enum类中声明枚举对象的时候是如下的形式 它们就有位置一说 也可以想象它们就是一个数组 所谓的获取的位置就是 索引

```java
enum Season {
  SPRING("春天", 23), SUMMER("春天", 23);
}
```

- 返回值
- int
```java
Season spring = Season.SPRING;
Season summer = Season.SUMMER;

int i = spring.ordinal();
System.out.println(i);    // 0
```


> 枚举类对象.compareTo(枚举类对象)
- 枚举类型实现了Comparable接口 这样可以比较*两个枚举对象的大小*
- 按声明的顺序排序

- 返回值
- int型
```java
Season2 winter = Season2.valueOf("WINTER");
Season2 autumn = Season2.valueOf("AUTUMN");
int i = winter.compareTo(autumn);
System.out.println(i);
```

> clone
- 枚举类型不能被Clone
- 为了防止子类实现克隆方法 Enum实现了一个仅抛出CloneNotSupportedException异常的不变Clone()

------

- 该类的方法很多 我们这里只看看主要的方法

> 枚举类.values()
- 返回枚举类型的对象数组 
- 该方法可以很方便的遍历所有的枚举值

- 返回值
- 对象数组

- 场景 我们看看当前枚举类里面有几个状态就可以这么调用

```java
// Season2是枚举类
Season2 spring = Season2.SPRING;

Season2[] values = Season2.values();
System.out.println(Arrays.toString(values));
    // [SPRING, SUMMER, AUTUMN, WINTER] 这里是一个个的对象
```


> 枚举类.valueOf(String objName)
- 在枚举类中找指定名的对象
- 要求字符串必须是枚举类对象的"名字" 如找不到 会报运行时异常 *IIIegalArgumentException* 参数非法的异常

```java
Season2 winter = Season2.valueOf("WINTER");
System.out.println(winter);
```


> 枚举类对象.toString()
- 返回*当前枚举类对象常量的名称*
```java
Season2 spring = Season2.SPRING;
System.out.println(spring.toString());   // SPRING
```

----------------------------

### 使用 enum关键字 定义的枚举类 实现接口
- 如果是自定义类 实现接口的时候 直接implements接口 如果有抽象方法就实现方法就可以了

> enum定义的枚举类实现接口的情况1:
- 和正常情况一样
- 实现接口 在enum枚举类中实现抽象方法

```java
// 接口
interface Info {
  void show();
}


// 枚举类 实现 Info接口
enum Season2 implements Info {

  SPRING("春天", "春暖花开"),
  SUMMER("夏天", "夏日炎炎"),
  AUTUMN("秋天", "秋高气爽"),
  WINTER("冬天", "冰天雪地");

  private final String seasonName;
  private final String seasonDesc;

  private Season2(String seasonName, String seasonDesc) {
    this.seasonName = seasonName;
    this.seasonDesc = seasonDesc;
  }

  // 实现接口中的方法
  @Override
  public void show() {
    System.out.println("这是一个季节");
  }
}


// 测试类
public static void main(String[] args) {
    Season2 spring = Season2.SPRING;
    spring.show();
  }
```


> enum定义的枚举类对象分别实现接口的情况2: 特殊
- 让枚举类对象分别实现接口中的抽象方法

- 我们在情况1中 实现了Info接口 里面实现了show()
- 但是我们发现 所有的枚举类对象调用show()方法的时候 都是同一个内容
```java
spring.show();    // 这是一个季节
summer.show();    // 这是一个季节
autumn.show();    // 这是一个季节
winter.show();    // 这是一个季节
```

- 现在我希望 每个季节输出的内容是不一样的怎么操作呢？
<!-- 
  有点像具体的成员一样了
 -->

- 这时候我们就让*每个枚举类对象重写*一下show()方法

```java
enum Season2 implements Info {

  // 每一个枚举类对象 在()的后面加上{ } 里面实现show方法
  SPRING("春天", "春暖花开") {
    @Override
    public void show() {
      System.out.println("这是春天");
    }
  },
}
```

- 如果枚举类中实现了show()方法后 枚举对象中也实现了show()方法后 以枚举对象中的为准
```java
Season2 winter = Season2.valueOf("WINTER");
winter.show();    // 这是一个季节

Season2 summer = Season2.valueOf("SUMMER");
summer.show();    // 这是一个季节

Season2 spring = Season2.SPRING;
spring.show();    
    // 这是春天   --- 因为这个枚举对象中自己实现了show()
```

- 如果接口中定义了多个抽象方法的话 我们可以重写多个
```java
SPRING("春天", 23) {
  // 接口中定义了两个抽象方法 我们这里就重写两个
  @Override
  public void speak() {
    System.out.println("我是春天我会说英语");
  }

  @Override
  public void walk() {
    System.out.println("我是春天能很快哦");
  }

}, SUMMER("春天", 23);
```

----------------------------

### 导入工程
- 1. 我们将实体文件夹 放入 idea工程下
- 2. 在idea中将普通文件夹修改为module
<!-- 
  1. Project Structure 面板中 点击 + 号
  2. import 找到指定文件夹
  3. next就可以了
 -->

----------------------------

### 注解(Annotation)
- jdk5.0中增加了注解的功能
- Annotation就是代码里的*特殊标记*  

- 以下都是注解
  @Override

  @Description
  @author
  @date
  @version


- 这些标记可以在 编译 类加载 运行时 被读取 并指定相应的处理(怎么处理就看是什么注解了)

- 通过使用注解 程序员在不改变原有逻辑的情况下 在源文件中嵌入一些补充信息 代码分析工具 开发工具和部署工具可以通过这些补充信息进行验证或者进行部署

- 注解可以像修饰符一样被使用 可用于修饰*包 类 构造器 方法 成员变量 参数 局部变量声明* 这些信息被保存在 Annotation的”name=value“对中
```java
@Transactional(
  propagation=Propagation REQUIRES_NEW,
  isolation=Isolation READ_COMMITTED,readOnly=false,timeout=3)
```

- 在java基础部分 注解的使用目的比较简单 例如标记过时的功能 忽略警告等 

- 在javaEE/Android(企业项目 大数据)中注解占据了更重要的角色 例如 用来配置应用程序的任何切面 代替javaEE旧版只能够所遗留的多余代码和xml配置等
<!-- 
  以前通过方法和配置文件做的一些关联 现在都可以使用注解来进行替换
 -->

- 未来的开发模式都是基于注解的 jpa(java持久化)是基于注解的 spring2.5以上都是基于注解的 hibernate3.x以后也是基于注解的 现在struts2有一部分也是基于注解的了

- 注解是一种趋势 一定程度上可以说: 
- *框架 = 注解 + 反射 + 设计模式*

----------------------------

### 常见的Annotation示例
- 使用Annotation时要在其前面增加 @ 符号
- 并把 Annotation 当成一个修饰符使用 用于修饰它支持的程序元素

> 示例1: 生成文档相关的注解
- @author
- 标明开发该类模块的作者 多个作者之间使用 , 分割

- @version
- 标明该类模块的版本

- @see
- 参考转向 也就是相关主题

- @since
- 从哪个版本开始增加的

- @param
- 对方法中某参数的说明 *如果没有参数就不能写*

- @return 
- 对方法返回值的说明 *如果方法的返回值是void就不能写*

- @exception
- 对方法可能抛出的异常进行说明 *如果方法没有用throws显式抛出异常就不能写*

- 其中
- @param @return @exception *这三个标记都是只用于方法的*

> @param的格式要求: 
- @param 形参名 形参类型 形参说明

> @return的格式要求
- @return 返回值类型 返回值说明

> @exception的格式要求
- @exception 异常类型 异常说明

- @param 和 @exception 可以并列多个

```java
/**
* @author shkstart
* @version 1.0
* @see Math.java
*/

public class JavadocTest {
  /**
    * @param args String[] 命令行参数
    */
  public static void main(String[] args) {
    /**
      * 求圆面积的方法
      * @param radius double 半径值
      * @return double 圆的面积
      */
    public static double getArea(double radius) {
      return Math.PI * radius * radius
    }
  }
}
```

> 示例2: 在编译时进行格式检查(JDK内置的三个基本注解)
> @Override
- 该注解只能用于方法上面 用于校验该方法是否重写于父类或者接口中
- 如果没有该注解仍然可能是重写方法 但是没有校验功能了
<!-- 
  我们不加 @Override 也是重写 但是没有校验的功能了 有校验的功能便于我们发现错误 Override只是写在方法上面
 -->
```java
// @Override的示例
class Person {
  public void walk() {
    System.out.println("人走路");
  }

  public void eat() {
    System.out.println("人吃饭");
  }
}

// 接口
interface Info {
  void show();
}

// 子类 -- @Override
class Student extends Person implements Info {
  // 重写父类中的方法
  @Override
  public void walk() {
    System.out.println();
  }

  @Override
  public void show() { }
}
```


> @Deprecated
- 用于表示所修饰的元素(类 方法等)已过时 
- 通常是因为所修饰的结构危险或存在更好的选择
```java
public class AnnotationTest{
  public static void main(String[] args ) {
    @SuppressWarnings
    int a = 10;
  } 

  @Deprecated
  public void print() {
    System.out.println("过时的方法")
  }

  @Override
  public String toString() {
    System.out.println("重写的方法")
  }
```

> @SuppressWarnings()
- 抑制编译器警告
- 比如我们定义了一个变量没有使用 有的编辑器会有警告信息
- 我们也可以选择在该变量的上面添加注解

```java
@SuppressWarnings("unused")
int num = 10;
```


> 示例3: 跟踪代码依赖性 实现替代配置文件功能
- servlet3.0提供了注解(annotation) 使得不再需要在web.xml文件中进行servlet的部署

```java
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

  private static final long serialVersionUID = 1L;

  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServlettException, IOException{
    
    ...

  }

  ...
}
```

- spring框架中关于”事务“的管理
```java
@Transactional(propagation=Propagation
REQUIRES_NEW,
isolation=Isolation
READ_COMMITTED,readOnly=false,timeout=3)

public void buyBook(String username, String isbn)

// 1 查 书的单价
int price = bookShopDao.findBookPriceByIsbn(isbn)

// 2 更新库存
bookShopDao.updateBookStock(isbn)

// 3 更新用户的余额
bookShopDao.updateUserAccount(username price)
```

------

> Junit单元测试中的注解
- Junit单元测试中也有大量注解的使用

> @Test
- 标记在非静态的测试方法上
- 只有标记@Test的方法才能作为一个测试方法单独测试 一个类中可以有多个测试方法 运行时如果只想运行其中的一个 那么选择这个方法名 然后单独运行 否则整个类的所有标记了@Test的方法都会被执行


> @BeforeClass
- 标记在静态方法上 因为这个方法只执行依次 在类初始化时执行


> @AfterClass
- 标记在静态方法上 因为这个方法只执行一次 在所有方法完成后时执行


> @Before
- 标记在非静态方法上 在@Test方法前面执行 而且是在每一个@Test前面都执行


> @After
- 标记在非静态方法上 在@Test方法后面执行 而且是在每一个@Test方法后面都执行


> @Ignore
- 标记在本次不参与与测试的方法上 这个注解的含义就是 某些方法尚未完整 暂不参与此次测试


> @BeforeClass @AfterClass @Before @After @Ignore都是配合@Test使用的 单独使用没有意义

```java
public class JunitTest {
  private static Object[] arr;
  private static int total;

  @BeforeClass
  public static void init() {
    sout("初始化数据")
    arr = new Object[5]
  }

  @Before
  public void before() {
    sout("调用之前total=" + total)
  }

  @Test
  public void add() {
    // 往数组中存储一个元素
    sout("add")
    arr[total++] = "hello"
  }

  @After
  public void after() {
    sout("调用之前total = " + total)
  }

  @AfterClass
  public static void destroy() {
    arr = null
    sout("销毁数组")
  }
}
```

- 感觉这里 好像生命周期啊 *注解版@Test的生命周期*么？

----------------------------

### 自定义注解 Annotation
- 参照 @SuppressWranings 的定义方式


> 步骤1. 我们创建一个 Annotation 文件
<!-- 
  Annotation 和 class interface enum是并列的
 -->

> 步骤2. 注解声明为 
  public @interface 注解名 { }

```java
// 下面就是注解的一个固定结构 和interface一点关系也没有
public @interface MyAnnotation {
  
}
```

> 步骤3. 方法体中 定义成员变量
```java
public @interface MyAnnotation {
  // 定义成员变量
}
```

> 定义成员变量的要求:
- 该成员变量是以无参数的方法的形式定义的 但其实是一个成员变量
- 该方法的 *方法名* 和 *返回值* 定义该成员的名字和类型
- 我们叫它 配置参数 

- 格式: "参数名" = "参数值"
- *如果只有一个参数成员 且名称为value 可以省略"value = "*

- 如果只有一个成员变量 建议使用 参数名 value

```java
public @interface MyAnnotation {
  // 成员变量
  String value();
}
```

> 成员变量的类型
- 类型只能是八种基本数据类型 和 以下
- String类型 Class类型 enum类型 Annotation类型以上所有类型的数组
<!-- 
  基本上什么都行
 -->


> 成员变量的默认值的指定:
- 在设置默认值的时候 我们可以*使用defaule关键字*
```java
String value() default "默认值"
```

```java
public @interface MyAnnotation {
  // 一个成员变量 如果想像@SuppressWranings那样传入多个参数 就可以定义成String[]
  String value();

  // 指定value的默认值
  String value() default "hello";
}
```

> 使用方式
- 在其他的class文件中(我们的注解在MyAnnotation文件中) 直接使用注解

- 如果定义的注解含有配置参数 那么使用时必须指定参数值 除非它有默认值

- 1. 当成员变量有指定默认值的时候 我们使用的时候不用指定参数
- 2. 当我们没有在Annotation里面指定默认值的时候 使用的时候我们就要指定参数
```java

// 我们要指定一个值 
// 有点像对象的实例那样 在这里面(value = "sam")指定成员变量
@MyAnnotation(value = "sam")

// 如果只有一个参数成员 且名称为value 可以省略"value = "
@MyAnnotation("sam")

// 有默认值的情况
@MyAnnotation()
class Person {

}
```

- 我们自定义的注解 使用的时候 必须指定值
  @MyAnnotation(value = "sam")

- 但是 @Override 为什么没有呢？
- 我们观看 @Override 的原码后发现 方法体里面什么也没有
- 这种没有成员定义的 Annotation 称为*标记*

- 包含成员变量的 Annotation 成为 元数据 Annotation

**注意:**
- 自定义注解必须配上注解的信息处理流程才有意义


> 可是注解到底有什么用呢？
- 体现到注解作用就要设计到反射了 我们在类上面加了 注解声明
```java
@MyAnnotation("sam")
class Person {

}
```

- 这个声明想干什么 我们利用反射 去读这个注解 然后看看注解的值 判断我们具体要干什么 然后我们再去做相应的操作
- 上面说了自定义注解必须配上注解的信息处理流程才有意义
- 这里的信息处理流程就要配合反射来实现的了

- 后面再说

----------------------------

### 元注解 (jdk提供的4种)
- jdk的 元Annotation 用于修饰其它Annotation定义

> 元注解
- 对现有的注解解释说明的注解
- 元注解就是用来修饰其它注解的 修饰其它注解的注解
<!-- 
  元数据:
  对现有数据的修饰的数据就叫做元数据
  比如下面的结构中 有三个部分 String name sam 它们哪个是最重要的？
  String name = "sam"

  "sam" 是最重要的 -- 真实的数据
  而String name是对 sam的修饰
  String 表明数据的类型
  name 给数据起了个名字

  所以String name就是sam的元数据
 -->

```java
@Override 我们打开这个Override看源码 发现有两个元注解

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override { }
```

- @Target(ElementType.METHOD) 
- @Retention(RetentionPolicy.SOURCE)
- 在@Override注解上的上面还有两个注解 这两个注解就是对@Override的元注解

- 元注解一共有4个


> @Retention
- 只能用于修饰一个Annotation定义(修饰注解的注解)

- 作用:
- *用于指定@Retentio修饰的注解的生命周期*

> @Retention(RetentionPolicy.SOURCE)
- @Retention 包含一个 *RetentionPolicy*类型的成员变量
<!-- 
  RetentionPolicy是一个枚举类 里面定义了三种状态

  - SOURCE 
  - CLASS(默认值) 
  - RUNTIME(反射的时候声明为它)
 -->

- 使用@Retention时*必须为该value成员变量指定值*
  Retention(RetentionPolicy.SOURCE)

- 这三个成员变量分别指明了@Retention所修饰的注解的生命周期到底持续到哪


> @Retention(RetentionPolicy.SOURCE)
- 在源文件中有效(即源文件保留) 编译器直接丢弃这种策略的注释

- SOURCE 表明在.class文件中不会保留该注解 如果反编译看.class文件是看不见被修饰的注解的 因为在编译的时候就被丢弃了


> @Retention(RetentionPolicy.CLASS)
- 在class文件中有效(即class保留) 当运行java程序时 jvm不会保留注释 这是默认值

- 编译器编译之后会被保留在.class文件中 但不会加载到内存当中
- 也就是我们通过java.exe执行.class文件的时候 被修饰的注解不会加载到内存中


> @Retention(RetentionPolicy.RUNTIME)
- 在运行时有效(即运行时保留) 当运行java程序时 jvm会保留注释 程序可以通过反射获取该注释

- 会被编译到.class文件中 也会加载到内存中 加载到内存中了 我们就可以通过反射去读取 通过反射使用注解

<!-- 
  SOURCE      ClASS         RUNTIME
      ↘ 编译 ↗     ↘ 类加载 ↗       ↘ 反射
     javac.exe     java.exe       自定义注解信息处理流程
 -->


**注意:**
- 只有声明为 RUNTIME 生命周期的注解 才能通过反射获取


> @Target
- 用于修饰注解定义
- 用于指定被修饰的注解 能用于修饰哪些结构
- 比如：
```java
// 下面的参数是 ElementType.METHOD 表明@Override只能修饰方法
@Target(ElementType.METHOD)
public @interface Override { }
```

- 参数传递了什么 该注解就可以在对应的结构上面使用
- 如果没有指明@Target 代表在哪都可以用

> @Target的参数
- @Target也包含一个名为value的成员变量

  CONSTRUCTOR
      - 用于描述构造器
      - constructor

  FIELD
      - 用于描述属性

  LOCAL_VARIABLE
      - 用于描述局部变量

  METHOD
      - 用于描述方法

  PACKAGE
      - 用于描述包

  PARAMETER
      - 用于描述参数

  TYPE
      - 用于描述 类 接口(包括注解类型) 或 enum类
      - class interface enum

  ANNOTATION_TYPE
      - 注解类型



- 下面这两是类型注解
  TYPE_PARAMETER
      - 

  TYPE_USE
      - 


> 格式
- @Target({TYPE, FIELD, METHOD, PARAMETER ... })
- 当我们这么使用的时候 前面必须加上
```java
import java.lang.annotation.Target;

// 必须加上这句
import static java.lang.annotation.ElementType.*; 

// 然后这里才不会报错
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
    String value() default "hello";
}
```

- @Target(ElementType.METHOD)


> 经验
- 自定义注解通常都会指明两个元注解: Retention Target


********下面的元注解出现频率较低********


> @Documented
- 用于指定该元注解修饰的注解类将被javadoc工具提取成文档
- *默认情况下 javadoc是不包括注解的*

- 如果想让javadoc生成的文档中包含注解 就在注解上声明为@Documented

- 注意:
- 定义为 Documented的注解必须设置Retention值为RUNTIME


> @Inherited
- 被它修饰的注解 *将具有继承性*
- 如果某个类使用了被@Inherited修饰的注解 则其子类将自动具有该注解
<!-- 
  比如
  如果把标有@Inherited注解的自定义的注解标注在类级别上
  子类则可以继承父类类级别的注解

  实际应用中使用较少
 -->

----------------------------

### 注解的新特性 -- jdk8中

> 可重复注解
- 注解可以重复定义多个
- 类似如下代码 类似 我们只是先看看什么是可重复注解 一个注解声明多次
```java
@MyAnnotation("hi");
@MyAnnotation("abc");
class Person { }
```

- 在jdk8之前如果有可重复注解的需求 我们要如下的方式来实现
```java
// jdk8之前这么写不行 会报错 就像变量一样 我们只能给变量赋一个值
// @MyAnnotation("hi");
// @MyAnnotation("abc");
class Person { }

----

// jdk8之前 我们需要在注解文件中声明一个数组 来实现重复注解的功能
public @interface MyAnnotations {
  MyAnnotation[] value();
}


// 测试类
@MyAnnotations({@MyAnnotation("hi"), @MyAnnotation("abc")})
class Person { }
```


> 在jdk8之后 我们要是想实现可重复注解怎么办呢？

> @Repeatable(注解文件容器.class)
- @Repeatable是元注解 
- 参数是注解文件的类名(MyAnnotations)

- 使用在 注解文件 中

- 1. 创建自定义注解文件 MyAnnotation 注解文件
```java
// 自定义注解文件 文件名 MyAnnotation
public @interface MyAnnotation {
  String value() default "hello";
}
```

- 2. 创建能承装多个 自定义注解文件 的文件(MyAnnotations) 相当于创建一个注解文件的容器
- 成员变量声明为 注解文件类型的数组
```java
public @interface MyAnnotations {
  MyAnnotation[] value();
}
```

- 3. 在注解文件(MyAnnotation) 的上方使用@Repeatable元注解 并在元注解中传入 容器注解文件.class
```java
// @Repeatable()
@Repeatable(MyAnnotations.class)
public @interface MyAnnotation {
  String value() default "hello";
}
```

**注意：**
- 1. 容器注解文件 和 注解文件 中的生命周期要保持一致 不一定是RUNTIME 但要保持一致
- @Retention(RetentionPolicy.RUNTIME)

- 2. 如果注解文件上有 @Target 的话 也要保持一致
- 3. 也就是说容器注解文件 和 注解文件 上的元注解都要保持一致

```java
// 注解文件容器
@Retention(RetentionPolicy.RUNTIME) // 保持一致
public @interface MyAnnotations {
  MyAnnotation[] value();
}

// 注解文件
@Retention(RetentionPolicy.RUNTIME) // 保持一致
@Repeatable(MyAnnotations.class)
public @interface MyAnnotation {
  String value() default "hello";
}
```


> 类型注解
- 在上面的部分我们介绍了 @Target 元注解 用来修饰其它的注解
- 作用是指明被修饰的注解可以用在什么结构上

- 当我们使用 @Target() 元注解的时候 需要传递参数

```java
// 使用格式
@Target({TYPE, FIELD, METHOD, PARAMETER ... })
@Target(ElementType.METHOD)
public @interface Override { }
```

- 参数有 CONSTRUCTOR FIELD LOCAL_VARIABLE METHOD PACKAGE PARAMETER TYPE ANNOTATION_TYPE

- 在jdk1.8中 有多了两个值
- TYPE_PARAMETER
- TYPE_USE


> ElementType.TYPE_PARAMETER
- 表示该注解能写在类型变量的声明语句中(如: 泛型声明)

- 在java8之前 注解只能是在声明的地方使用
- java8之后 注解可以应用在任何地方

- 比如 泛型中
- 开发中 在泛型的位置 也是有必要写入注解的 因为后续可以通过反射来读取泛型的注解
```java
// 要想在泛型里面使用注解 那必须在该注解文件中 声明该注解可以修饰泛型
class Generic<@MyAnnotation T> {

}

@Target({ElementType.TYPE_PARAMETER})
@Target({TYPE_PARAMETER, TYPE, FIELD, METHOD ... })
public @interface MyAnnotation {
  String value() default "hello";
}
```


> ElementType.TYPE_USE
- 表示该注解能写在表示类型的任何语句中

- ElementType.TYPE_PARAMETER解决了在泛型中声明注解的功能
- 下面 我们发现 异常前面可以使用注解 变量类型中可以使用注解 强转中也可以使用注解

- 但是要想这么做 首先要声明该注解可以用在任何地方

```java
class Generic<@MyAnnotation T> {
  public void show() throws @MyAnnotation RuntimeException {

    // 修饰泛型的部分
    ArrayList<@MyAnnotation String> list = new ArrayList<>();
    int num = (@MyAnnotation int)10L;
  }
}


// 注解文件
@Target({TYPE_PARAMETER, TYPE_USE ... })
public @interface MyAnnotation {
  String value() default "hello";
}
```

- 这两种使用注解的目的 都是通过反射去获取注解 使用注解

----------------------------

### 集合 (容器)
- 面向对象语法 对事物的体现都是以对象的形式 为了方便对多个对象的操作 就要对 对象进行存储

- 使用Array存储对象方面具有一些弊端 而集合就是就是为了解决数组的弊端 就像是一个容器 可以*动态*地把多个对象的引用放入容器中

- 特点：
- 集合也好还是数组也好都是对多个数据(对象)进行存储的操作的结构 简称java容器
<!-- 
  这里存储都是针对内存层面来进行存储的 
  不涉及到硬盘（持久化）的存储
 -->


> 数组在内存存储方面的特点
- 1. 数组初始化以后 长度就确定了
- 2. 数组一旦定义好(定义数组的时候要先指明数组的类型) 其元素的类型也就确定了(我们往里装数据也只能是该类型的数据) 只能操作指定类型的数据了

```java
String[] strArr
int[] numArr
```

- 当然我们也能使用多态性 比如我们声明一个Object类型的数组 这样我们往里面装数据的时候就体现了多态性


> 数组在存储数据方面的弊端
- 1. 数组初始化以后 长度就不可变了 不便于扩展

- 2. 数组中提供的属性和方法少 不便于进行添加 删除 插入等操作 且效率不高 同时无法直接获取存储元素的个数
<!-- 
  操作原始数组的方式：

  获取实际个数
  定义total变量 往里添加一个我们就total++下 最后查看total

  插入元素
  我们把要插入的位置的元素 依次往后移动

  删除元素
  我们要将指定元素后面的元素往前移动 最后的位置置为null
 -->

- 3. 数组存储的数据是有序的 中间不能有空 还能存储可以重复的数据 对于无序和不可重复的需求 数组是不能满足的
<!-- 存储数据的特点单一 -->

- java集合类可以用于存储数量不等的多个对象 还可以用于保存具有映射关系的关联数组


- 也就是说 集合是为了解决数组的弊端 弊端中就有数组只能存一种类型的数据 那么集合中就可以存储的数据可以不是一个类型的
- 比如在集合中存个对象 再存一个1 都是可以


> 开发中:
- 凡是涉及到对多个数据进行操作的情况下 我们很少直接调数组 
- 只是有的时候我们调用方法 方法里面不让我们放集合 只能放数组 这时候我们造一个数组

- 或者是调用方法返回的是一个数组 这时候我们要创建数组对象去接收
- 集合出现的目的就是让我们去替代数组的

----------------------------

### 集合框架涉及到API
- java集合可分为 Collection 和 Map 两种体系
- Collection 和 Map 是两个接口

> Collection接口
- 单列数据 
- 该接口中定义了存取一组对象的方法的集合
<!-- 
  存的都是一个个的数据 也就是常规数组样子的数据 区别于Map
  □ □ □ □     单列数据
 -->

- Collection在实际操作的时候还要进行细分 这里先说两个还有其它的
- 1. List: 元素有序 可重复的集合
- 2. Set: 元素无序 不可重复的集合
<!-- 
  - 存储数据方法还有很多的细分情况 我们关注的只是上面那两个

    BeanContext BeanContextServices
    BlockingDeque
    BlockingQueue
    Deque
    NavigableSet
    Queue
    SortedSet
    TransferQueue
    ...
 -->


 > Collection接口继承树
*使用 ++ 注明的位置是实现关系*

    迭代器
  Iterator        ← 获取      Collection
      ↓                     ↗         ↖
  ListlIterator   ←获取     List     Set
                          ↗
  --------------------------------
  *以下是与List是实现关系*
  Vector    ArrayList   LinkedList    ↓
                                      ↓

                        ---------------------------
                        ++
                        HashSet       SortedSet
                           ↓              ↓
                                        ++
                     LinkedHashSet     TreeSet


        对象排序接口             容器工具类
  ----------------------      -----------
  Comparable  Comparator      Collections


> Map接口
- 双列数据 
- 保存具有映射关系 "key-value对" 的集合
- Map提供了直接的实现类
<!-- 
  Map存储的数据 是两个数据 谁映射谁 前面的是key 后面是value
  □   □
  □   □
  □   □
  双列
 -->


> Map接口继承树

                  Map
        ++↗        ↑++        ↖
  Hashtable     HashMap         SortedMap
      ↑            ↑                ↑ ++
  Properties    LinkedHashMap   TreeMap


> 集合框架
| -- Collection接口 : 单列集合 存一个个对象 
                    基本数据类型以包装类存储

    | -- List子接口
          : 有序的可重复的数据 *也叫做动态数组*
          可以说List是替换原有数组结构的
        
        | -- ArrayList  实现类
        | -- LinkedList 实现类
        | -- Vector     实现类


    | -- Set子接口
          : 无序的不可重复的数据 *类似高中集合*

          高中集合的特点： 无序性 确定性 互异性
          无序性: 乱七八糟
          确定性: 数据在不在集合中是确定的
          互异性: 彼此不一样

          场景:
          解决数据重复问题

        | - HashSet       实现类
        | - LinkedHashSet 实现类
        | - TreeSet       实现类


| -- Map接口 : 双列集合 存一对对数据
            两个key可以对应一个value
    
    | - HashMap
    | - LinkedHashMap
    | - TreeMap
    | - Hashtable
    | - Properties

----------------------------

### Collection接口中常用的方法
- 我们在讲对象的时候 就先讲的Object因为所有的对象都继承于它 它身上就会有一些通用的方法

- Collection也一样 List接口 和 Set接口都实现了Collection接口 我们这里研究下 在存储单列数据方面 不管是有序还是无序也会有一些通用的操作 既然又适用于List 又适用于Set 那么通用的操作也会定义再Collection中

- 我们看看Collection中定义了哪些Api 我们主要关心下接口中的方法
<!-- 
  为什么主要关心下接口中的方法:
  因为接口中只能定义常量 所以我们这里只关心方法
-->


> Collection接口中的抽象方法
- 接口中定义的方法都是抽象的 抽象的都是定死的

```java
// 创建一个ArrayList的容器
Collection coll = new ArrayList();
    // 左面 声明为Collection 
    // 右边 new的时候 我们拿ArrayList来充当
```

- 原因:
- 因为下面的方法都是在父接口中定义的 那子接口或者子接口的实现类就都可以用: 
  Collection - List - ArrayList


**!!!!!!!!!要点:**
- 向Collection接口的实现类的对象中添加数据obj时 *要求obj所在类要重写equals()方法*

- 因为Collection接口中的方法的形参都是 obj 类型
- 所以我们要在 obj所在类中重写equals()

- 要注意的重写equals方法的有 *contains remove equals* 等等


> 实现类对象.add(Object o)
- 将元素 o 添加到集合中


> 实现类对象.size()
- 获取添加的元素的个数

```java
// 声明为Collection 右边new的时候 我们拿ArrayList来充当
Collection coll = new ArrayList();

// add()
coll.add("AA");
coll.add("BB");

// 能放基本数据类型 - 自动装箱
coll.add(122);
coll.add(new Date());

System.out.println(coll.size());  // 4
```


> 实现类对象.addAll(Collection c)
- 将给定集合中的元素添加到当前的集合中
- 参数是一个集合对象

```java
// 我们在创建一个集合 
// addAll(Collection c)
Collection coll2 = new ArrayList();

// 向集合2中添加元素
coll2.add("456");
coll2.add(123);

// 将集合2中的元素 添加到集合1中
coll.addAll(coll2);
System.out.println(coll.size());  // 6
```


> 实现类对象.toString()
- 实现类对象中的重写toString()的方法 用于查看集合中的内容
```java
// 下面两种方式 实际上的效果是一样的
System.out.println(coll.toString());
System.out.println(coll);
// [AA, BB, 122, Sun Jan 16 14:08:43 JST 2022, 456, 123]
```


> 实现类对象.isEmpty()
- 判断当前集合是否为空

- 返回值
- Boolean
<!-- 
  不是判断是不是null 是判断集合中是否有元素
  言外之意是size()

  源码： 
  public boolean isEmpty() {
    return size == 0;
  }
 -->

```java
// 集合中有元素的时候
System.out.println(coll.isEmpty());   // false
```


> 实现类对象.clear()
- 清空集合元素
<!-- 
  Collection coll = new ArrayList();

  不是将 coll 赋值为 null
  也是里面的数据不要了
 -->

```java
coll.clear();
System.out.println(coll.isEmpty());   // true
```


> 实现类对象.contains(Object obj)
- 判断当前集合中是否包含obj
- 我们在判断时会调用*形参obj所在类的equals()方法*
- *判断的是内容 不是地址*

- 要求：
- 向Collection接口的实现类的对象中添加数据obj时 *要求obj所在类要重写equals()方法*
<!-- 
  我们往形参里面放的都是obj类型 肯定都有自己所在的类
 -->

- 返回值
- boolean

> 演示1:
```java
Collection coll = new ArrayList();

coll.add(123);

boolean res = coll.contains(123);
System.out.println(cres);   // true
System.out.println(coll.contains(123)); // true
```


> 演示2:
```java
coll.add(new String("Tom"));

// 集合中有了一个Tom 现在使用contains方法判断集合中是否有Tom
System.out.println(coll.contains(new String("Tom")));     // true
```
- 要点: 这个我们使用的是new的方法 正常来说两个对象类型比较应该是false

- 但是 contains() 内部的逻辑是 调用形参obj所在类的equals()比较的内容 String类中重写了equals() 所以比较的是内容


> 演示3:
```java
// 我们往集合中添加了一个Person对象
coll.add(new Person("erin", 18));

// 然后使用contains()方法判断 集合中有没有Person对象
System.out.println(coll.contains(new Person("erin", 18)));    // false
```

- 为什么演示2中的String就可以 但是这里的Person就是false呢？
- 原因

- 上面说了 contains() 内部的逻辑是:
- 1. 通过形参obj调用形参obj所在类的equals() 
- 2. 将集合中的元素传入形参obj所在类的equals()中 进行形参和集合元素的内容的比较
- 3. 因为List是有序的所以会将集合中的第一位元素开始传入 依次进行比较 知道相同为止

```java
// 集合中有一个123
coll.add(123);

// 内部调用形参123所在类的equals()方法 依次将集合中的元素 传入equals(123)方法中进行内容的比较
coll.contains(123);
```

- 演示2中输出true 因为String类中重写了equals() 所以比较的是内容

- 而我们自定义Person类中并没有重写equals()方法 所以内部调用的是Object中的equals() 内部就是使用 == 判断的是地址值

- 所以我们要在形参obj所在类中重写equals()方法



> 实现类对象.containsAll(Collection coll2)
- 判断形参coll2集合中的所有数据是不是都存在于当前coll1集合中
- 都在返回true 有一个不在就是false

- 要求:
- *要求obj所在类要重写equals()方法*

- 返回值:
- boolean

```java
// 创建coll集合
Collection coll = new ArrayList();

// 向coll集合中添加元素 -- 方式1
coll.add(123);
coll.add(new String("Tom"));

// 创建coll1集合 同时调用 Arrays.asList(元素) 方法向结合中添加元素
Collection coll1 = Arrays.asList(123, 456);

// 判断coll1中的元素是否都在coll中
System.out.println(coll.containsAll(coll1));
```

------

> 扩展:
- 像集合中添加元素的两种方式

> 方式1:
- 1. 创建先集合
- 2. 然后调用实现类对象的add()方法添加

```java
Collection coll = new ArrayList();
coll.add(123);
```


> 方式2: 
> Arrays.asList(元素...);
- 使用 Arrays.asList() 方法, 创建集合的同时 向集合中添加元素

- 注意: 
- 我们虽然调用的是Arrays的方法 但是返回不是工具类中的ArrayList

- 返回值类型是 
- Array内部类的ArrayList 

```java
Collection coll1 = Arrays.asList(123, 456);

List list = Arrays.asList("AA", 12, new Date());
// Arrays.asList(元素)的方式返回的是一个List List又是Collection的子接口 多态的方式
```

**注意:**
- 下面发现 当我们的集合的元素是使用方式2 创建添加元素的时候
- 后续调用add remove方法会报错 

```java
// 使用 Arrays.asList 方式创建的集合 和 添加的元素
Collection coll = Arrays.asList(123, 456, new Person("sam", 18), false, new String("Tom"));

// 当调用remove方法的时候 报错
coll.remove(123);
    // java.lang.UnsupportedOperationException
```

- 原因:
- 调用Arrays.asList()生产的List的add、remove方法时报异常
- 这是由Arrays.asList() *返回的是Arrays的内部类ArrayList 而不是java.util.ArrayList*

- Arrays的内部类ArrayList和java.util.ArrayList都是继承AbstractList

- remove、add等方法AbstractList中是默认throw UnsupportedOperationException而且不作任何操作

- java.util.ArrayList重写了这些方法
- 而Arrays的内部类ArrayList没有重写，所以会抛出异常。

------

> 实现类对象.remove(Object obj)
- 从当前集合中移除obj元素

- 前提:
- *obj所在类要重写equals()方法*
<!-- 
  remove()方法中也会调用形参obj所在类的equals() 因为要判断有没有给定元素 判断出来有才能移除

  如果没有重写equals()那么比较的就是地址值 会导致删除失败
 -->

- 返回值
- boolean

> 演示1:
```java
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(new Person("sam", 18));
coll.add(false);
coll.add(new String("Tom"));

System.out.println(coll.size());
System.out.println(coll);
System.out.println("********");
// [123, 456, Person{name='sam', age=18}, false, Tom]


// 123自动装箱 包装类中重写过equals()
coll.remove(123);   // 它还有返回值可以接收
System.out.println(coll); // 删除了
```

> 演示2:
```java
// 创建集合
Collection coll = new ArrayList();
// 添加一个Person对象
coll.add(new Person("sam", 18));

// 删除一个Person对象 注意这里是新new的
coll.remove(new Person("sam", 18));
System.out.println(coll);
```

- 要点:
- 如果Person类没有重写equals() 那么就会删除失败
- 如果Person类*重写了equals()* 那么就会删除*成功*


> 差集操作
> 实现类对象.removeAll(Collection coll1)
- 从当前集合中移除coll1中所有的元素
- 内部也调用形参所在类的equals()了

- 要求:
- *要求obj所在类要重写equals()方法*

<!-- 
  移除的是 coll 和 coll1 中公有的元素
  也就是交集的元素
 -->

```java
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);

Collection coll1 = Arrays.asList(123, 4567);
coll.removeAll(coll1) 

// 只会移除123 因为coll中没有4567
```


> 交集操作
> 实现类对象.retainsAll(Collection coll1)
- 获取当前集合和coll1集合的交集 将结果重新赋值给了coll(相当于直接修改了coll)
- 也就是说*只保留两个集合中相同的元素* 删除不一样的元素

- 要求:
- *要求obj所在类要重写equals()方法*

- 返回值
- boolean

```java
// 集合1
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(new Person("sam", 18));
coll.add(false);
coll.add(new String("Tom"));

// 集合2
Collection coll2 = Arrays.asList(123, 456, 789);

System.out.println(coll);   // 1
coll.retainAll(coll1);
System.out.println(coll);   // 2

// 结果: coll集合中只保留了两个集合中相同的元素
// 1
[123, 456, Person{name='sam', age=18}, false, Tom]

// 2
[123, 456]
```


> 实现类对象.equals(Collecton coll1)
- 要想返回true 需要当前集合和形参集合的元素都一样
<!-- 
  该方法内部是一个一个对象去进行比较的
 -->

- 要求:
- *要求obj所在类要重写equals()方法*

- 如果右侧声明的是ArrayList(有序)的时候 那么元素的顺序在两个集合中也要相同

- 有序的结构 要考虑先后顺序的问题
- 无序的结构 不用考虑先后顺序的问题

- 返回值
- boolean

> 演示1:
- 两个集合内部的对象的顺序是*一样*的时候 返回true
```java
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);

Collection coll1 = new ArrayList();
coll1.add(123);
coll1.add(456);

System.out.println(coll.equals(coll1)); //true
```

> 演示2:
- 两个集合内部的对象的顺序是*不一样*的时候 返回false
```java
Collection coll = new ArrayList();
coll.add(456);    // 不一样哦
coll.add(123);

Collection coll1 = new ArrayList();
coll1.add(123);
coll1.add(456);

System.out.println(coll.equals(coll1)); //false
```

**注意:**
- 上述原因是因为 有序 造成的 也就是说我们使用ArrayList
- 因为ArrayList是有序的 所以即使是元素一样 但顺序不一样 也不算是相同


> 实现类对象.hashCode()
- 返回当前对象的hash值
<!-- 
  如果没有重写hashCode()方法 就相当于一个随机数了
  自定义类中可以重写hashCode()方法

  模板如下:
  name age是Person类中的属性

  public int hashCode() {
    return Objects.hash(name, age);
  }
 -->

```java
System.out.println(coll.hashCode());
// -752915805
```


> 集合 --> 数组
> 实现类对象.toArray()
- 返回值
- Object类型的数组 Object[]

```java
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(new Person("sam", 18));
coll.add(false);
coll.add(new String("Tom"));

// 返回的类型是 Object[]
Object[] arr = coll.toArray();
System.out.println(Arrays.toString(arr));

// 还可以使用fori 来输出
```


> 数组 --> 集合
> Arrays.asList(可变形参直接写数据就可以)
- List arr = Arrays.asList(123， 456);

- 调用Arrays类的静态方法 asList()
- 参数是可变形参 相当于数组类型

- 返回值
- List
<!-- 
  跟数组对应的集合是List 所以返回的是List类型的
 -->

```java
// 传个数组进去 可变形参也相当于数组
List<String> list = Arrays.asList(new String[]{"AA", "BB", "CC"});

System.out.println(list);
    // [AA, BB, CC]
```

**注意:**
- Arrays.asList(参数部分的问题)
- 参数是以对象为基准

- 1. 如果我们传入的是 基本数据类型的数组 那么整体会被当做是一个元素
```java
List<int[]> arr = Arrays.asList(new int[]{123, 456});
System.out.println(arr);
    // [[I@2db7a79b] 输出的是 里面就一个元素 该元素是一维数组 int型的 
```

- 2. 我们可以将数组转换为包装类的形式 就可以被识别为两个元素了
```java
List arr = Arrays.asList(new Integer[] {123， 456});

// 或者写成这样 也可以
List arr = Arrays.asList(123， 456);
```

- 也就是说 我们创建的是包装类的对象就会被识别为其中的两个元素了

----------------------------

### 使用 Iterator接口 遍历Collection (Map不用Iterator)
- 集合元素的遍历操作 使用 Iterator接口

> 作用：
- Iterator对象成为迭代器 主要用于遍历 Collection集合中的元素

> GOF给迭代器模式的定义为：
- 提供一种方法访问一个容器(container)对象中各个元素 而又不需暴露该对象的内部细节
<!-- 
  - 迭代器模式: 就是为容器而生
  - 类似 公交车上的售票员 火车上的乘务员 空姐 -- 检票 

  - 一个个的都过一下
 -->


- Collection接口继承了java.lang.Iterator接口 
- 该接口有一个iterator()方法 那么所有实现了Collection接口的集合类都有一个iterator()方法 
- 用以返回一个实现了Iterator接口的对象

- *Iterator仅用于遍历集合* iterator本身并不提供承装对象的能力 如果需要创建iterator对象 则必须有一个被迭代的集合

- 集合对象每次调用iterator()方法都得到一个全新的迭代器对象 默认游标都在集合的第一个元素之前

> 生成迭代器对象
> 迭代器对象 = 实现类对象.iterator()
- 通过集合实现类对象调用iterator()方法，*返回Iterator接口的实例* 用于遍历集合元素

- 要想遍历就要用到迭代器对象 它只是用于遍历的 它不是容器
- 集合对象每次调用iterator()方法都得到一个全新的迭代器对象 默认游标都在集合的第一个元素之前

- 返回值:
- Iterator

**注意:**
- 每创建一个 iterator对象 它们都独有一套next()指针

- 比如:
- 我们创建了 iterator对象 拿着它去遍历了一个集合
- 然后我们还想使用该iterator对象 去遍历另一个集合 不行了 因为next指针已经指到最后了

- 这时我们想遍历另一个集合的时候 我们要重新创建一个 iterator 对象

```java
// 创建集合
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(new Person("sam", 18));
coll.add(false);
coll.add(new String("Tom"));


// 通过集合对象 调用 iterator()方法 得到迭代器对象
Iterator iterator = coll.iterator();

// ... 接下来通过 迭代器对象 遍历集合
```


> 迭代器对象.hasNext()
- 判断是否还有下一个元素
<!-- 
  判断集合中是否还有未遍历元素
 -->

> 迭代器对象.next()
- 指针指向下一个元素 默认游标都在集合的第一个元素之前
- 1. 指针下移
- 2. 将下移以后集合位置上的元素返回
- 返回的元素类型是 Object
```java
Object obj = iterator.next();
```

- 遍历元素演示：
```java
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(new Person("sam", 18));
coll.add(false);
coll.add(new String("Tom"));

Iterator iterator = coll.iterator();

// 推荐方式 还可以用 fori coll.size() 但是一般不用
while(iterator.hasNext()) {
  // 判断当前集合中是否还有元素 有元素就进入循环体 没有就不要进去了
  System.out.println(iterator.next());
}
```


> 迭代器iterator的执行原理
- 我们看看下面的代码的执行逻辑
```java
// 创建迭代器对象 和 指针
Iterator iterator = coll.iterator();

// 判断指针下方是否有元素
while(iterator.hasNext()) {
  System.out.println(iterator.next());
}
```

<!--  
    当前集合  
                          ← 指针
    123
    new String("AA")
    new Date()
    1
    2
    new Customer()

    1. 我们调用iterator方法 返回迭代器对象 然后就创建了 指针
    - 指针是指在第一个元素的上面(指的是一个空的位置)

    2. 我们调用了 iterator.hasNext() 让它看看指针下方是否还有元素 返回true

    3. 一旦返回true 调用next() 调用该方法后 我们做了好几件事情
      - 1. 指针下移
      - 2. 把指针下移之后对应的元素返回 next() 会返回一个值
      
    4. 以此类推
 -->



> iterator遍历集合的*两种错误写法*
```java
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(new Person("sam", 18));
coll.add(false);
coll.add(new String("Tom"));

Iterator iterator = coll.iterator();

// 错误写法1
while((iterator.next()) != null) {
  System.out.println(iterator.next());
}

    - 会跳着输出 456 Tom 异常


// 错误写法2
while((coll.iterator().hasNext())) {
  System.out.println(coll.iterator().next());
}

    - 每当调用 iterator() 都会返回迭代器对象 新的迭代器的对象的指针就会在第一个元素位置之前
```


> 迭代器对象.remove()
- 调用remove()方法 移除集合中的元素
- 在遍历的过程当中帮我们删除不想要的元素

- 迭代器对象内部定义了remove方法在遍历的时候 删除集合中的元素
- 此方法不同于 集合对象.remove()

- 要点:
- 一个iterator对象 有一套指针
- 遍历操作的时候 想指针重新开始就要重新创建一个iterator对象

```java
// 创建集合
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(new Person("sam", 18));
coll.add(false);
coll.add(new String("Tom"));

// 创建 迭代器对象
Iterator iterator = coll.iterator();

// 移除指定的元素
while(iterator.hasNext()) {
  // 把next返回的元素接收 用于判断
  Object obj = iterator.next();

  // 如果返回的数据是Tom 那就移除
  if("Tom".equals(obj)) {
    iterator.remove();
  }

      - 要点:
      - 这里使用的是 "Tom".equals(obj)
      - 没有使用 obj.equals("Tom")
      - 是为了如果我们集合中取的是null 那么拿着null去调用equals就会报空指针异常的错误
}

// 遍历删除元素后的集合
// 这时候我们还想用上面iterator遍历集合是不行的 因为上面的iterator对象的指针已经到最后了
// 重新创建一个iterator对象 让指针从头开始
Iterator iterator1 = coll.iterator();
while(iterator1.hasNext()) {
  System.out.println(iterator1.next());
}
```

**注意:**
- 1. iterator可以删除集合的元素 但是是遍历过程中通过迭代器对象的remove()方法 不是集合对象的remove方法

- 2. 没调用next()方法 直接进行remove操作 会报IllegalStateException异常

- 3. 调用next()方法后 调用两次remove操作也会报 IllegalStateException异常

----------------------------

### foreach 循环遍历集合 或 项目 (新特性)
- 上面我们讲了通过 iterator 迭代器的方式 遍历集合
- 这里我们再介绍另外一种遍历的方式 foreach


- java5.0提供了 foreach 循环遍历 Collection(集合) 和 数组
<!-- 
  - 遍历操作不需要获取Collection或数组的长度 无需使用索引访问元素
  - 遍历集合的底层调用iterator完成操作
  - foreach还可以用来遍历数组
 -->

```java
for(Person p: persons) {
  System.out.println(p.getName());
}

(Person p: persons)
Person: 
  - 要遍历的元素类型

p: 
  - 遍历后自定义元素名称

persons:
  - 要遍历的结构名称(arr list等)


// js
for(let key of arr) 

// java
for(Person p: arr)
```

> foreach的使用方式
> 格式:

  for(集合中元素类型 局部变量: 集合/数组) {
    ...
  }

  元素类型取决于 集合/数组中元素的类型
  :前面的部分相当于定义了一个局部变量而已

- 遍历集合
```java
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(new Person("sam", 18));
coll.add(false);
coll.add(new String("Tom"));

for(Object obj: coll) {
  System.out.println(obj);
}
```

- 遍历数组
```java
int[] arr = new int[] {1, 2, 3, 4, 5};
for(int i: arr) {
  sout(i)
}
```

> foreach的执行过程
- 上面的案例中 coll 是我们要遍历的集合 该集合会自动取里面的元素 它*会先取集合中的第一个元素 赋值给obj变量* 然后打印obj

- 注意这里 就提取数组或集合中的一个元素 赋值给另一个变量

- 然后接着取集合中的第二个元素 再赋值给obj 依次类推 直到最后一个元素 

- 内部的原理还是调用的跌代器


**注意:**
- 我们使用
> 练习:
```java
String[] arr = new String[] {"MM", "MM", "MM"};
// 普通for循环的赋值操作
for (int i = 0; i < arr.length; i++) {
  arr[i] = "GG";
}

for (int i = 0; i < arr.length; i++) {
  System.out.println(arr[i]); // GG
}

    - 这里相当于 拿着本身的值做修改



// 增强型的赋值操作
for(String s: arr) {
  s = "GG";
}

for(String s: arr) {
  System.out.println(s);    // MM
}

    - 这里相当于将元素取出来 赋值给s 我们把s给改了
    - 然后我们输出的s

    - 不会修改原有数组中的元素
```


> 扩展 forEach遍历
- 这里使用了lamda表达式 后面再讲
```java
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(789);

// java8.0里的新特性
coll.forEach(System.out.println);
```

----------------------------

### List接口 - Collection子接口之一
- 鉴于java中数组用来存储数据的局限性 我们*通常使用List代替数组*
- 所以我们通常把 List接口 称之为 *动态数组*
<!-- 
  原来数组的长度是固定的 以前造数组的时候 要先告诉它数组有多长 
  而
  List是不用关心数组的长度 它会动态的帮我们去变换 避开了角标越界的异常
 -->

> List接口的特点
- List集合类中*元素有序，且可重复* 集合中的每个元素都有其对应的顺序索引

- List容器中的元素都对应一个整数型的序号记载其在容器中的位置 可以根据序号存储容器中的元素


> List常用的实现类
- jdk api中*List接口的实现类常用的有*: 
  - ArrayList 
  - LinkedList 
  - Vector


> 对比 ArrayList LinkedList Vector
- 面试题:
- ArrayList LinkedList Vector 三者的异同

- 相同点:
- 三个类都实现了List接口 存储的特点相同 元素有序，且可重复的数据

- 异同点: 如下

> ArrayList
- 作为List接口的主要实现类
- 也就是说没有特殊需求的话 只是用来替换数组 我们默认就new ArrayList就可以

- 线程:
- ArrayList执行效率比较高(线程不安全)

- 底层:
- ArrayList底层使用 Object[] elementData 进行存储(这点和Vector一样)
<!-- 
  说用ArrayList替换数组 
  其实就是对数组进行的一层封装 数据仍然存在数组当中
 -->


> LinkedList
- 作用
- 它跟ArrayList的区别就是底层结构的不同

- 底层
- 底层使用双向链表存储
<!-- 
  ArrayList是顺序存储的数组 LinkedList是链表

  原码：
  transient Node first; 记录链表结构中前一个元素
  transient Node last;  记录链表结构中后一个元素
 -->

```java
private static Node<E> {
  E item;
  Node<E> next;
  Node<E> prev;

  Node(Node<E> prev, E element, Node<E> next) {
    this.item = element
    this.next = next;
    this.prev = prev;
  }
}

- 双向链表内部没有声明数组 而是定义了Node类型的first和last用于记录首末元素 同时定义内部类Node
- 作为LinkedList中保存数据的基本结构 Node除了保存数据 还定义了两个变量

- prev变量记录前一个元素的位置
- next变量记录后一个元素的位置
```

- 场景
- 对于频繁的插入和删除操作的时候 我们使用此类的效率比ArrayList高

- 数组和链表的区别
- 使用链表存储和数组存储表现出来的特点就不同了
<!-- 
  数组的存储
  □ □ □ □ □ □ □ □

  删除
  当我们要删除其中的一个元素的时候 也必须是后一个替换前一个
  比如我们现在使用ArrayList装了1万条数据 现在我们要删掉第3条 这个效率想想

  插入
  当我们要插入一个元素的时候 后面的元素要依次往后移动(先移最后一个) 把位置空出来 然后插入元素 比如再有1万条

  ---

  双向链表

  一个元素分3个部分 中间的部分存的是核心数据 左右两侧是前一个元素是谁 和 后一个元素是谁

          一个元素
          □  □  □
        ↙    ↓    ↘
前一个     核心数据   后一个
元素是谁             元素是谁
没有就是null

         →        →
         ←        ←
  □ □ □     □ □ □     □ □ □
  (1)       (2)       (3)


  当我们想把(2)元素删掉 那就
  把(2)的next地址给(1) 让(1)指向(3)
  把(2)的pre地址给(3)  让(3)指向(1)

  比如我们1万条数据要删除第3条 那么只跟2 4有点关系 跟其它的没有关系
 -->


> Vector(线程安全的 效率低)
- 作为List接口的古老实现类(不怎么用, 老臣)
<!-- 
  jdk1.0时候出现的 ArrayList和LinkedList在1.2 出现的
  而List接口也是1.2出现的 也就是说Vector比List接口出现的还要早 多老
 -->

- 线程:
- Vector执行效率低(线程安全)

- 底层
- 底层使用Object[]进行存储(这点和ArrayList一样)

> 扩展: Stack栈 是 Vector的子类
- 我们点击 control+h 查看下Vector类之间的关系 我们能看到 Vector有一个子类 Stack(栈)

- 栈：
- 也是一种数据结构 它典型的特点就是*先进后出*
- 像我们往数组里面存数据 我们想往哪个位置放元素就往哪个位置放

- stack不一样 我们要放里面放入元素只能在后面放 不能往前面放

- 普通的数组结构我们要删除可以删除任意位置的元素

- stack不一样 我们要删除只能删除尾部的元素
- 整体表现出来的就是先进后出的特点 相当于对原有数组更加严格的控制

- stack继承vector vector底层结构是数组 stack也一样是用数组存的 只不过在数组上控制操作数组的数据 只能从尾部添加 只能从尾部删除

----------------------------

### ArrayList源码分析
- ArrayList在jdk7 和 jdk8中稍有不同

- ArrayList不管7还是8底层的存储结构是不会变的都是
- private transient Object[] elementData;

> jdk7的情况下
- 我们看看调用ArrayList里面的方法 看看怎么进行添加 

> 关注点:
> 1. 从构造器开始的原码解析:
> ArrayList实例化
> ArrayList list = new ArrayList();
- 底层传递了一个长度是10的Object[]数组 
- Object[] elementData


- list.add(123)
- elementData[0] = new Integer(123)

- ... 第11次

- list.add(添加第11个数据)
- 如果此次的添加导致底层elementData数组的容量不够 则扩容
- 默认情况下 扩容为原来的容量的1.5倍 同时需要将原有数组中的数据复制到新的数组中
<!-- 
  底层不断的在进行抛弃旧的 创建新的 这样一个过程
 -->


- 当我们调用空参构造器的时候 源码解析如下
```java
// 创建一个底层长度为10的Object[]数组
public ArrayList() {
  // 首先内部调用了 重载的构造器 传入了10
  this(10);
}

// 传入的10会到这个构造器里面

public ArrayList(int initialCapacity) {
  super();

  if (initialCapacity < 0)
    throw new IllegalArgumentException("Illegal Capacity: "+ initialCapacity);

  // 相当于创建了一个长度为10的Object[]
  this.elementData = new Object[initialCapacity];
}
```

- 关注add()方法源码
```java
// 还没有讲泛型 这里我们将E看做是Object
public boolean add(E e) {
  
  /*
    - 方法: ensureCapacityInternal()
    - 作用: 判断数组是否需要扩容
    - 参数: size已有的元素个数 初次add的时候会是0
  */
  ensureCapacityInternal(size + 1);
    
  // 向数组中添加元素的操作 当满了需要添加第11个数据的时候 会在ensureCapacityInternal方法中 判断后调用扩容方法grow()
  elementData[size++] = e;

  return true;
}



/*
  - 方法: ensureCapacityInternal
  - 作用: 用于判断数组是否需要扩容

  参数就是传入了的size+1 初次add的时候就是0+1
*/
private void ensureCapacityInternal(int minCapacity) {
  // 这个变量关乎快速失败机制的 我们不关心
  modCount++;

  // 我们将传入的size和本身的底层数组长度相减
  if (minCapacity - elementData.length > 0)

    // 如果结果是负数 那就不需要扩容 如果是正数那就需要扩容
    grow(minCapacity);
}



/*
  - 方法: grow()
  - 作用: 给数组进行扩容
  - 参数: minCapacity
*/
private void grow(int minCapacity) {
  // 首先记录本身底层数组的长度 oldCapacity旧的容纳能力
  int oldCapacity = elementData.length;

  // 新的容纳能力 = 旧的容纳能力 + 旧的容纳能力的一半
  // 默认情况下 扩容原来的1.5倍
  int newCapacity = oldCapacity + (oldCapacity >> 1);

  // 扩容完之后发现跟实际需要的容量还是小
  if (newCapacity - minCapacity < 0)
    // 那我就直接拿你的容量
    newCapacity = minCapacity;
  
  // 如果容量超过了整型int的最大值
  if (newCapacity - MAX_ARRAY_SIZE > 0)
    // 那就取整型的最大值
    newCapacity = hugeCapacity(minCapacity);

  // 扩容完之后还要将原有数组中的数据copy到新数组中
  elementData = Arrays.copyOf(elementData, newCapacity);
}

```


> 结论
- 在开发过程当中基本确定ArrayList中要放多少数据 我们就尽量不要使用空参的构造器
- 建议开发中使用带参的构造器

> 当知道大致的数据长度的时候 请指定容器长度
> ArrayList list = new ArrayList(int capacity)
- 这样可以直接指定容器的长度 会避免在中间的环节去扩容

```java
// 源码
public ArrayList(int initialCapacity) {
  super();
  if (initialCapacity < 0)
      throw new IllegalArgumentException("Illegal Capacity: "+ initialCapacity);
  this.elementData = new Object[initialCapacity];
}
```


> jdk8当中ArrayList的变化
- 当我们使用如下的方法创建 ArrayList 的时候
- ArrayList list = new ArrayList()

- 此时 底层Object[] elementData初始化为{} 意味着并没有创建长度为10的数组

- list.add(123)
- 当第一次调用add()方法的时候 底层才创建了长度为10的数组 并将数据123添加到elementData[0]的位置一样

- 后续的添加和扩容操作跟jdk7一样

- 上面内容相关的原码部分
```java
public ArrayList() {
  /*
    给底层数组指定了一个常量 

    该常量的底层: 
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {}

    没有像jdk7一样在new的时候就将底层数组初始化长度为10了
  */
  this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
```

- 上面源码我们发现在 new ArrayList() 的时候没有给底层的数组分配长度 而是个 {} 那什么时候开始赋值的呢？

- 我们关注下add操作
```java
public boolean add(E e) {
  // 首先确认下容量够不够 调用了ensureCapacityInternal()
  ensureCapacityInternal(size+1);
  elementData[size++] = e;
  return true;
}


// ensureCapacityInternal()方法
private void ensureCapacityInternal(int minCapacity) {
  // 当我们首次调用add()方法的时候 elementData = {}
  if(elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
    
    /*
      如果add()是第一次的话
      会在minCapacity DEFAULT_CAPACITY取较大值

      DEFAULT_CAPACITY常量10 
    */
    minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity)
  }

  ensureExplicitCapacity(minCapacity)
}


// ensureExplicitCapacity()方法
private void ensureExplicitCapacity(int minCapacity) {
  modCount++;

  // 如果10-0>0那么就执行扩容操作
  if(minCapacity - elementData.length > 0) {
    grow(minCapacity)
  }
}
```

> 小结:
- jdk7的ArrayList有点像饿汉式 一开始就造好
- jdk8的ArrayList有点像懒汉式 等需要的时候再造 好处是延迟了数组的创建过程 节省了内存

----------------------------

### LinkedList源码分析
- 在数据结构当中提到数据存储 有两个典型的基本结构
- 1. 数组 - 顺序表
- 2. 链表
<!-- 
  还有树 图都是由上面的两种数据结构改造出来的
 -->

> 场景：
- 当我们频繁的要进行插入 删除操作的话 我们使用LinkedList 反之我们使用ArrayList

- 对于平时的遍历 查找 在头或者末尾添加呀 不涉及到插入删除的时候我们选择 ArrayList

- 涉及到频繁的插入删除的时候我们选择 LinkedList
<!-- 
  如果仅仅是放进去在某个位置再取出来 我们选择ArrayList
  因为ArrayList这个场景的效率会高一些

  ArrayList造完数组通过角标直接往里放就可以了
  LinkedList还要维护一对指针

  如果我们想查找角标为10的元素 数组可以直接的定义到这里
  而LinkedList得从第一个开始找 找到目标的元素
 -->

> 1. 从构造器开始的原码解析:
> LinkedList实例化
> LinkedList list = new LinkedList();
- 内部声明了Node类型的first和last属性 默认值为null

```java
transient int size = 0;
transient Node<E> first;
transient Node<E> last;
```
- 我们能在LinkedList的源码中看到 上面的结构
- Node类型的 first
- Node类型的 last

- Node就是它数据存储的基本单位 我们的数据都存在Node里面
- 我们通过 LinkedList对象 调用add(数据)方法 往里放的数据 就作为Node的一部分
- 我们添加一个数据 底层就会创建一个Node 

- 我们打开Node就能看到下面这样的结构


```java
/*
  这是 LinkedList 的内部类
  该类只在 LinkedList 内部自己用
*/
private static class Node<E> {
  // item 就是add(数据)方法添加进来的数据
  E item;

  // 记录当前元素的下一元素的指针
  Node<E> next;
  // 记录当前元素的上一元素的指针
  Node<E> prev;

  Node(Node<E> prev, E element, Node<E> next) {
    this.item = element;
    this.next = next;
    this.prev = prev;
  }
}
```

- 开始解析:
- LinkedList list = new LinkedList();

- 当我们创建了 list对象 之后 就会有first 和 last
```java
// 分别记录整个链条的头 和 尾
transient Node<E> first;
transient Node<E> last;
```

- first 和 last 的作用:
- first
  想找某一个元素的时候要从头开始查找

- last
  想添加的话都要从尾部开始添加 


> 2. 调用add()方法添加元素
- 当调用list.add() 往里添加一个具体的对象的时候
- 将123封装到Node中 创建了Node对象

```java
// 调用add()方法添加元素
public boolean add(E e) {
  linkLast(e);
  return true;
}


// linkLast()
/*
  last当前的最后一个元素
  如果我们是首次调用add方法 last就是null
*/
void linkLast(E e) {
  // l成目标的最后一个元素
  final Node<E> l = last;

  /*
    一个元素分三个部分
    prev data next
    
    比如我们要添加的数据是e
    A       B       C
    □□□  ←  □□□  ←  □□□
            pen

    相当于把A的next给了B的p 就意味着B指向了A

    如果本身是第一个元素的话
    A
    □□□
    pen
    p就是null
  */
  final Node<E> newNode = new Node<>(l, e, null);

  // 我们要添加的就作为last出现了
  last = newNode;

  // 先是判断l是null么？ 如果l是null说明以前没有add过 那新添加的元素就是first 同时也是last 因为就自己
  if (l == null)
      first = newNode;
  else
      // 如果不是第一个元素 也就是不是null 让我成为最后一个 往后排
      l.next = newNode;
  size++;
  modCount++;
}
```

----------------------------

### Vector源码分析
- Vector和ArrayList还有别的不一样的地方的话
- 它们的扩容方式稍微有些不同

- jdk7 8中通过 Vertor() 构造器创建对象时 底层都创建了长度为10的数据

- 扩容方面 
- 默认扩容为原来的数组长度的2倍

```java
private void grow(int minCapacity) {
  int oldCapacity = elementData.length;

  // oldCapacity + oldCapacity 新的容量默认是扩容为原来的2倍
  int newCapacity = oldCapacity + ((caoacityIncrement > 0) ? caoacityIncrement : oldCapacity);

  if (newCapacity - minCapacity < 0)
    newCapacity = minCapacity;
  
  if (newCapacity - MAX_ARRAY_SIZE > 0)
    newCapacity = hugeCapacity(minCapacity);

  elementData = Arrays.copyOf(elementData, newCapacity);
}
```

> 那回到线程安全问题的时候 我们选择 ArrayList 还是 Vector？
- 我们说过Vector是线程安全的
- 那万一我们要处理线程的安全问题 那共享数据恰好是ArrayList 那不就的用Vector么

- 实际上到那个时候我们也不愿意用vector 我们后面会说工具类Collections

- 工具类中有 *synchronized(ArrayList)* 方法 我们把ArrayList丢进去 返回的就是线程安全的

----------------------------

### List接口中常用方法的测试
- List是Collection的子接口 那Collection当中定义的15个方法(上面讲过) List中就都能用

- 又因为List是有序的(Set是无序的) 所以List里面又会额外的加一些关于索引的方法

- 下面我们说说List中的常用方法 这里我们还以ArrayList为例 因为它是一个比较常用的实现类

```java
// 共通代码
ArrayList list = new ArrayList();
list.add(123);
list.add(456);
list.add("AA");
list.add(new Person("Tom", 12));
list.add(456);

System.out.println(list);
// [123, 456, AA, Person{name='Tom', age=12}, 456]
```

> 实现类对象.add(int index, Object obj)
- 在index位置插入元素

```java
// 在1的位置插入BB
list.add(1, "BB");
```


> 实现类对象.add(int index, Collection coll)
- 在index位置开始将coll集合的所有元素添加进来
- 如果没有传递第一个参数 默认在默认添加

- 返回值
- boolean

```java
// 创建一个集合
List list1 = Arrays.asList(1, 2, 3);

// 将集合放进去
list.addAll(list1);
```


> 实现类对象.get(int index)
- 获取指定index位置的元素

- 返回值
- Object

```java
Object o = list.get(0);
System.out.println(o);
```


> 实现类对象.indexOf(Objecct obj)
- 返回obj在集合中首次出现的位置
- 没有的话返回-1

- 返回值
- int

```java
int i = list.indexOf(456);
System.out.println(i);
```


> 实现类对象.lastIndexOf(Objecct obj)
- 返回obj在集合中最后出现的位置
- 没有的话返回-1

- 返回值
- int

```java
int i = list.lastIndexOf(456);
System.out.println(i);

// [123, BB, 456, AA, Person{name='Tom', age=12}, 456, 1, 2, 3]
// 5
```


> 实现类对象.remove(int index)
- 移除指定index位置的元素 并返回此元素
<!-- 
  该方法是List中重载Collection中的方法
  Collection:
    remove(obj)

  List:
    remove(index)

  所以我们在使用的时候 要小心 因为它既可以传入指定对象删除 也可以传入index 来删除
 -->

- 返回值
- Object

```java
Object o = list.remove(0);
System.out.println(o);    // 123
System.out.println(list); // 没了123后的集合
```


> 实现类对象.set(int index, Object obj)
- 设置指定index位置的元素为obj

```java
// 将索引为1位置上的元素 修改为CC
list.set(1, "CC");
System.out.println(list);
```


> 实现类对象.subList(int fromIndex, int toIndex)
- 返回从fromIndex到toIndex位置的*子集合*
- 包括开始 不包括结束

- 必须传递两个参数

- 不影响原List

- 返回值
- List

```java
List list1 = list.subList(0, 3);
System.out.println(list1);


// 截取从指定位置到最后的元素
// 我们传入 list.size() 它就是比最后一个元素索引要大1的值 因为我们不包括最后一个索引 所以可以这么写吧
List list1 = list.subList(2,list.size());
System.out.println(list1);
```

----------------------------

### List部分中的常用方法的总结
- 增
  - add(obj)

- 删
  - remove(index / obj)

- 改
  - set(index, obj)

- 查
  - get(index)

- 插
  - add(index, obj)

- 长度
  - size()

- 遍历
  - iterator迭代器方式
  - 增强for循环
  - 普通循环


> List的遍历
```java
// 迭代器
Iterator iterator = list.iterator();
while(iterator.hasNext()) {
  System.out.println(iterator.next());
}

System.out.println("*****");

// 增强for
for(Object obj: list) {
  System.out.println(obj);
}


// 普通for
for(int i=0; i<list.size(); i++) {
  System.out.println(list.get(i));
}
```


> 面试题 区分List中remove(int index) 和 remove(Object obj)
```java
@Test
public void testListRemove() {
  List list = new ArrayList();

  // 以包装类存的123 是对象
  list.add(1);
  list.add(2);
  list.add(3);
  updateList(list);

  sout(list)
      // 1 2
}

private static void updateList(List list) {
  // 考点: 删掉的是2还是3
  // 因为remove有两个方法 我们传入2是索引 所以把3干掉了
  list.remove(2)

  // 删数据2
  list.remove(new Integer(2));
}
```

----------------------------

### Set接口
- Set接口是Collection的子接口 Set接口没有提供额外的方法

- Set集合不允许包含相同的元素 如果试把两个相同的元素加入同一个Set集合中 则添加操作失败

- Set判断两个对象是否相同不是使用 == 运算符 而是根据 equals()方法


> Set的实现类
  | - HashSet       实现类
  | - LinkedHashSet 实现类
  | - TreeSet       实现类


- 对比 HashSet LinkedHashSet TreeSet

> HashSet - 主要实现类
- HashSet作为Set接口的主要实现类
- 线程不安全的
- 可以存储null值
- 不能保证元素的排列顺序


> LinkedHashSet - 实现类
- 它其实是HashSet的子类
<!-- 
  相当于:
  | - HashSet       
      | - LinkedHashSet   
 -->

- 言外之意它在HashSet的基础上加了指针 

- 特点:
- 让它看上去是有序的 当我们遍历LinkedHashSet的时候 可以按照添加的顺序进行遍历


> TreeSet - 实现类
- 特点
- 可以按照添加对象的指定属性 进行排序

- 底层存储数据的方式是 二叉树(红黑树)

- 要点:
- 我们添加的元素必须是同一个类new的对象
- 我们可以按照这个对象的某些属性来进行排序


----------------------------

### Set接口无序性和不可重复性的理解
- 我们说Set存储的数据是无序的 和 不可重复的
- 那我们怎么理解 无序性 和 不可重复性

**注意:**
- Set接口中没有额外的定义新的方法 我们使用的都是Collection中声明的方法
<!-- 
  List有一波自己的方法 是因为有索引
  Set没有所有 所以它的方法都是Collection中的
 -->


- 共通代码:
```java
Set set = new HashSet();
set.add(456);
set.add(123);
set.add("AA");
set.add("CC");
set.add(new Person("Tom", 12));
set.add(129);
```


> 1. 无序性
- 1. 无序性不等于随机性
- 我们发现输出虽然没有按照添加顺序 但是 每次输出结果的顺序却是一样

```java
// 我们看看无序性 是输出的时候 没有按照添加的顺序么?
Iterator iterator = set.iterator();
while(iterator.hasNext()) {
  System.out.println(iterator.next());
}

// 输出结果 且 每次输出的顺序都是一样的 它也有一个顺序 每次都是这个顺序
AA
CC
129
456
123
Person{name='Tom', age=12}
```

- 在List中每一个元素 都是按照0 1 2 3 ... 的顺序放入的 这是有序

- 无序性(以HashSet为例):
- 不等于随机性 存储的数据在底层的数组中并非按照数组的索引的顺序进行添加 而是根据 hashCode()
- hashCode() 会根据我们要添加的数据的哈希值 来决定在数组中的哪个位置 而不是一个挨一个的放
<!-- 
  HashSet的底层也是用数组存的 jdk7当中底层创建的数组的长度是16
 -->

    □ □ □ □ □ □


- 然后我们添加的456 并不在第一个位置 比如可能在这
    
    □ □ □ □ □ □
            ↑
            456(根据456的哈希值决定的位置)

- 然后我们添加的123 添加的位置也是随机的

    □ □ □ □ □ □
        ↑
        123(根据123的哈希值决定的位置)

- 以此类推 也就是添加时候的顺序是无序的 添加后还是在数组中 所以整个数组 还有一个顺序的


> 2. 不可重复性
- 我们说往set当中添加的数据是不能重复的 当我们加两个123的时候 发现后一个添加不进去

- 不可重复性:
- 保证添加的元素按照equals()判断时 不能返回true
- 即 相同的元素只能添加一个

**注意:**
- 类中要重写hashCode() 和 equals()

<!-- 
  当我们没有重写 equals() 和 hashCode() 方法的时候
  添加两个对象的时候 都能添加进去 因为我们比较的是地址值

  当重写equals() 和 hashCode() 方法后 我们两个一样的对象 就只能添加进去一个了
 -->


> HashSet中元素的添加过程(add()操作的时候)
- 我们先思考一下
- 上面我们说set当中存的数据都是不可重复性 添加到set当中的数据不能重复 假如我们自己实现这个事情 该怎么做？

- 不可重复
- 我们有一个容器 要往里面放数据 假如我们先放了一个A 接下来要放一个B 为了完成不可重复的逻辑 我们需要拿B跟A equals()下 如果结果是false 意味着是不相同的内容就可以添加到容器里面

- 当我们放入C的时候 要拿C跟B A都equals()下 那假如我们有1000个数据要存 那就需要将1000个跟前面的999个都equals()下

- 所以上述的方式 效率很低！！！

------

- Set就没有像上面那样保证不可重复性 它选择了一种巧妙的方式 它先考虑的是 哈希值

- Set底层也是一个长度为16的数组

      □ □ □ □ □ □ □ 

- 先要添加A元素 首先计算A元素的哈希值(调用这个元素所属类的hashCode()方法计算的 我们要保证相同的属性 通过哈希值算出来的都是一样的 唯一的哈希值 是拿着对象的属性计算出来的) 

- 比如我们计算出来的哈希值是13462 这个数就决定了这个元素在数组中存放的位置 那这个元素存在数组的哪里？ 它会使用散列函数计算13462得到 这个元素应该存放在这个数组中的哪个位置
<!-- 
  我们先来一个low点的算法 我们让 13462 % 16
  得到的就是0-15 我们将这个结果作为这个元素在数组中存放的位置
-->

- A通过上面low的方法的放到数组中了 然后我们放B 我们先算一下元素B的哈希值 得到要存放的位置后 我们要先看看该位置上有没有元素 如果没有就直接放进该位置

- 然后我们放C 一样的道理 假如也放进去了
- 这时候我们想下 我们放了3个元素 这3个元素互相都没有进行过比较(equals过) 

- 然后我们放D 这时候发现我们D要放的位置和C一样 也就是说 D要放的位置上已经有元素了 这时候C和D就要进行比较 是否相同

- 这里再思考下 我们C D都要放在同一个位置 那它们的哈希值一样吗？
- 不一定
<!-- 
  比如 
  C得到哈希值是17 然后我们 17 % 16 = 1 1决定了C在数组中的位置
  D得到哈希值是1  然后我们 1 % 16 = 1 1决定了D在数组中的位置

  证明C D只是在数组中存放的位置一样 但它们的哈希值不一定一样
 -->

- 如果C和D的哈希值不一样 我们就认为它们是不一样的元素 我们的D就可以添加成功

- 那C已经放进去了 D放在哪里呢？ 这时候我们就要以链表的形式存放C和D了
- 也就是说set复杂在里面即出现了数组也出现了链表 是数组和链表的结合体

- 至于谁链谁 jdk7 和 jdk8 中还是有区别
<!-- 
  // jdk8 当有位置一样的元素的时候 使用链表的形式添加 下面的是8
    C 
  □ □ □ □ □ □ □ □ 
    ↓
    □
    D 


  // jdk7 当有位置一样的元素的时候 使用链表的形式添加 下面的是7
    D 
  □ □ □ □ □ □ □ □ 
    ↓
    □
    C 
     

  7 跟 8 的区别是谁在数组中 
  jdk8的时候 原来在数组中的元素还在数组中 后来的在下方

  jdk7中 让新的元素放在数组中 原有的元素在下方

  --- 技巧 ---

  怎么记呢？ 7上8下 
  7上新的元素在上面
  8下新的元素在下面
 -->

- 然后我们再添加E 发现E跟A的位置是一样的 这时候我们发现 A 和 E的哈希值一样 哈希值一样的时候我们还要进行A和E的equals()

- 当两个元素的哈希值不一样 我们以链表的形式进行存储
- 当两个元素的哈希值一样 我们就要再次使用equals()来对两个元素进行判断

- 我们是调用的 E元素 所在类的equals()方法 把A作为参数放进去 然后我们看返回值 如果返回值为true 说明两个元素一样 这时候E元素就添加不进去

- 如果equals()方法的返回值是false 这时候E元素也要添加成功 还是按照链表的结构存储

- 这么存储的好处是什么？
- 比如我们现在要添加第1000个数据 意味着前面已经有999个了 也是我们先算第1000个元素的哈希值 然后计算它在数组中的位置 然后看看它要放的位置上有没有元素 如果没有元素直接添加成功 想想比一个一个比的效率高多了吧

- 如果这个位置上有元素 那就比 这个位置上可能有链表 链表的结构可能很长 那就进行遍历比较 一个个比完发现都不一样 那就存下来

- 然后我们再回过头看看无序性：
- 放在数组中的位置 不是按顺序来的

- 不可重复性就是我们上面说的过程


> 总结：
- 我们向HashSet中添加元素A 首先调用元素A所在类的hashCode()方法
- 计算元素A的哈希值 此哈希值接着通过某种算法计算出在hashSet底层数组中存放的位置 判断数组此位置上是否已经有元素

- 如果此位置上没有其它元素 则元素a添加成功
- 如果此位置上其它元素B 或以链表形式存在的多个元素 则比较元素a与元素b的哈希值

- 如果哈希值不相同则添加成功
- 如果哈希值相同 进而需要调用元素a的所在类的equals(b) 根据equals的返回值 true则添加失败 false则添加成功


> HashSet的扩容方式:
- 底层也是数组 初始容量为16 当如果使用率超过0.75 (16*0.75=12)
- 就会扩大容量为原来的2倍(16扩容为32 依次64 128...)


> 扩展技巧:
- A数 % B数 结果会是0 ~ B-1数
<!-- 
  12345%16 结果会是0-15
 -->


> 关于hashCode()和equals()的重写
```java
Set set = new HashSet();
set.add(456);
set.add(123);
set.add("AA");
set.add("CC");
set.add(new Person("Tom", 12));
set.add(new Person("Tom", 12));
set.add(129);
```

- 我们回头看下上面的问题
- 我们添加了两个Person对象 内容一样
- 但是我们没有重写Person类中 hashCode() 方法的时候 我们发现两个Person对象都添加进去了

- 我们没有重写 hashCode() 方法但是也调用了 调用的是Object类中的hashCode()方法

- 而Object类中的hashCode()是 
<!-- 
  public native int hashCode()
  Object中的hashCode()方法是随机计算的
 -->

- 上面两个Person内容是相同的 一个Person对象通过hashCode()给我们计算了一个地址值 放在了堆空间中

- 另一个Person对象通过hashCode()也计算了一个地址值 放到了堆空间

- Object类中的hashCode()是随机算的一个数

- 两个Person对象的哈希值不一样 在放入数组中之前会根据哈希值计算出该元素应该在数组中的位置 这样由于哈希值不一样 那么放入的位置也不一样

- 当我们重写了hashCode()方法之后 hashCode()方法是根据类中的属性写的

```java
@Override
public int hashCode() {
  // 如果name不是null就先算name的hashCode
  // name是String String中也重写过hashCode() 保证 通过String计算出来的hashCode是一样的
  int result = name != null ? name.hashCode() : 0;

  // 得到的新的result返回 31相当于2<<5-1
  result = 31 * result + age;
  return result;
}


// 自己写hashCode()的逻辑
public int hashCode() {
  // 稍微low点 但也能用
  return name.hashCode() + age;
}
```

> 自己写的 hashCode() 带来的弊端
- low的算法能导致 本来哈希值不一样 但是变的一样
- 比如 
- name的到是24 + 20 age
- name的到的20 + 24 age

- 两个对象不一样但我们的算法得到的哈希值却是一眼的 然后我们根据哈希值得到的是数组中的同一个位置 
- 然后调用equals方法 发现不同 得到的结果就是以链表的形式进行的存储(如果哈希值不一样的话 就会是在数组中的另一个位置)

- 我们的原则是能不在链表上就不要在链表上


> 上面系统的hashCode()里面为什么会带31?
- 1. 选择系数的时候选择尽量大的系数 因为如果计算出来的hash地址越大 所谓的 冲突 就越少 查找起来效率也会提高

- 2. 并且31只占用5bits 相乘造成数据溢出的概率较小

- 3. 31可以由 i*31 == (i << 5) - 1来表示
- 现在很多虚拟机里面都有做相关的优化 
<!-- 
  为了得到这样一个尽可能大的数 我们想用位移运算得到这个数的话是最好的 我们会优先考虑2的几次幂

  - https://www.bilibili.com/video/BV1Kb411W75N?p=538&spm_id_from=pageDriver
 -->  

- 4. *31是一个素数 素数作用就是如果我用一个数字来乘以这个素数 那么最终出来的结果只能被素数本身和被省属还有1来整除(减少冲突)*


> 要求
- 为了保证我们添加到set中的元素是无序和不可重复的
- 向set中添加的元素 其所在的类一定要重写equals() 和 hashCode(Object obj) 方法

- 重写的quals() 和 hashCode(Object obj) 方法尽可能的要保持一致性
<!-- 
  一致性：
  - equals()方法判断两个对象一样的时候 那么 这两个对象的哈希值也要一样
 -->


**注意:**
- 对于存放在Set容器中的对象 *对应的类一定要重写equals()和hashCode(Object obj)方法 以实现对象相等规则*

- 即: "*相等的对象必须具有相等的散列码*"
<!-- 
  相等的对象: equals()方法判断属性等是相等的
  散列码: 就是哈希值
 -->


> 重写 hashCode() 方法的基本原则
- 在程序运行时 同一个对象多次调用 hashCode()方法应该返回相同的值

- 当两个对象的 equals()方法比较 返回true时 这两个对象的hashCode()方法的返回值也应该相等

- 对象中用作equals()方法比较的field 都应该用来计算hashCode值


> 确保一致性的操作(自动生成的就可以)
- 也就是说 我们在hashCode()方法里面用到的属性 我们也在equals()中用一下

- 反过来也一样 equals()里面的属性 在 hashCode()里面也用一下


> HashSet的底层实现是HashMap
- 当我们new一个 HashSet 的时候 源码中里面 其实又new了一个 HashMap

- 我们向HashSet中添加数据 我们发现实际上是把数据添加到HashMap当中了

- 上面我们所讲的也相当于在讲HashMap的底层实现

----------------------------

### LinkedHashSet的使用
- 通用代码
```java
Set set = new LinkedHashSet();
set.add(456);
set.add(123);
set.add("AA");
set.add("CC");
set.add(new Person("Tom", 12));
set.add(new Person("Tom", 12));
set.add(129);

Iterator iterator = set.iterator();
while(iterator.hasNext()) {
  System.out.println(iterator.next());
}

// 输出结果
456
123
AA
CC
Person2{name='sam', age=18}
129
```

- 上面我们发现 我们遍历出来的顺序和添加的顺序一样
- 虽然遍历的顺序和添加的顺序一样 但是LinkedHashSet还是无序的
<!-- 
  LinkedHashSet在存储数据的时候 它是HashSet的子类
  存储的结构没有变
  仍然是先有一个数组 还是利用hash值去得到在数组中的存储位置

  添加的时候存放的位置不是一个挨一个放的 这就是无序性
 -->

- 它按照添加的顺序是遍历的原因是:
- 它在原有的HashSet的基础之上 又给元素额外的提供了一对*双向链表 来记录添加的先后顺序*
<!-- 
  A   C   B
  □ □ □ □ □ 

  LinkedHashSet在添加元素的时候 同时 也给 ABC 添加了链表形式

  prev A next
  prev B next
  prev C next

  A是先添加进去的 第一个添加进去的元素 链表的结构为

      null A next 
      
  而next指向 B的 prev, B和C也会有这样的关系
 -->

- 总结：
- LinkedHashSet作为HashSet的子类 在添加数据的同时 还给每个数据维护了两个引用 记录了此数据的前一个数据和后一个数据

- 目的(优点)：
- 对于频繁的遍历操作 LinkedHashSet效率高于HashSet

----------------------------

### TreeSet的自然排序
- 它可以按照对象的指定属性进行排序

```java
TreeSet set = new TreeSet();

// 不能添加不同类的对象 失败了
set.add(456);
set.add("AA");
set.add(new Person("Tom", 12));

Iterator iterator = set.iterator();
while(iterator.hasNext()) {
  System.out.println(iterator.next());
}

```

- 上面我们遍历set的时候发现报错了
- *java.lang.ClassCastException异常*


- 原因：
- 我们说TreeSet可以按照对象的指定属性进行排序 TreeSet的意义就是提供了排序 我们按照对象的指定属性来排序 那就是说指定属性大家都要有 *也就是说这个对象不能是不同类造的对象*

- 比如上面 123 AA 一个是int型 一个是string型 不同的类型 可能就没有共同的属性了

> 要点:
- 1. 向TreeSet中添加的数据 要求是*相同类的对象*
<!-- 只有是相同类的对象才能去比较大小 -->

```java
set.add(1);
set.add(2);
set.add(8);
set.add(-4);
set.add(99);

// 遍历结果是 从小到大 排序的
-4
1
2
8
99
```

- 2. TreeSet的两种排序方式 自然排序 和 定制排序
- 我们向TreeSet中添加了几个对象 接下来我们要对它们进行下排序

```java
set.add(new Person("sam", 36));
set.add(new Person("erin", 33));
set.add(new Person("nn", 5));
set.add(new Person("niuniu", 0));

Iterator iterator = set.iterator();
while(iterator.hasNext()) {
  System.out.println(iterator.next());
}
```

> TreeSet的自然排序
- 自然排序中 比较两个对象是否相同的标准为 compareTo()返回0 *不再是equals()方法*
<!-- 
  返回0代表一样 则表示添加不成功
 -->

- TreeSet底层结构:
- 底层是树形结构 比34大的往右放 比34小的往左放 然后依次 比12大的往12的右侧放 比12小的往12的左侧放 

- 整个是一个顺序的状态

<!-- 
          34
      12     64
    1   13
 -->

- TreeSet和后面要讲的TreeMap采用的红黑树的存储结构
- 特点: 
- 1. 有序 查询速度比list快
- 2. 在树形结构中 不能放相同的数据(2叉树小的放左边大的放右边 没有中间)



- 1. 让Person类实现Comparable接口
```java
public class Person implements Comparable { }
```

- 2. 重写 compareTo抽象方法 指明排序规则
- 比如按照姓名从小到大排序
```java
// 重写方法 指明排序规则
@Override
public int compareTo(Object o) {
  if(o instanceof Person) {
    Person p = (Person)o;
    return this.name.compareTo((p.name));
  } else {
    throw new RuntimeException("输入的类型不匹配");
  }
}
```

- 3. 遍历TreeSet
```java
Iterator iterator = set.iterator();
while(iterator.hasNext()) {
  System.out.println(iterator.next());
}
```


- 要点:
```java
set.add(new Person("sam", 36));
set.add(new Person("sam", 23));

set.add(new Person("erin", 33));
set.add(new Person("nn", 5));
set.add(new Person("niuniu", 0));
```

- 按照前面的说法 当有两个sam的时候 因为年龄不一样 所以我们都会添加成功

- 但实际上 我们只添加了一个sam的对象 也就是说 我们按照compareTo方法比较 发现它们是一样的 相当于在重写的compareTo方法中return了一个0

> 总结：
- 在TreeSet中判断两个元素是否相同 不再是equals()
- 而是按照 compareTo 的标准去比较 如果返回0 就认为一样 就不会添加成功
<!-- 
  上面我们只在重写方法中比较了name 所以两个sam对象一样
 -->

- 如果我们希望下述情况下的sam对象也进来 *就要指定二级排序* 先看name是不是一样的
```java
set.add(new Person("sam", 36));
set.add(new Person("sam", 23));

@Override
public int compareTo(Object o) {
  if(o instanceof Person) {
    Person p = (Person)o;

    // 获取比较结果 0是一样
    int compare = this.name.compareTo((p.name));
    // 如果不等于0 就将name的排序结果返回
    if(compare != 0) {
      return compare;
      // 如果等于0 则比较年龄
    } else {
      return Integer.compare(this.age, p.age);
    }
  } else {
    throw new RuntimeException("输入的类型不匹配");
  }
}

```

----------------------------

### TreeSet的定制排序
- 定制排序要跟Comparator接口相关

> TreeSet的自然排序
- 在定制排序中 比较两个对象是否相同的标准为 compare()方法 不再是equals()
<!-- 
  添加数据如此
  调用remove contains等方法也是一样 根据compare()等方法来做判断
 -->

> 步骤:
- 1. 创建 Comparator 对象 并重写compare方法 并指定排序规则

- 2. 将 com对象 new TreeSet(com); 构造器中
```java
@Test
public void test1() {
  // 创建 Comparator 对象 按照年龄从小到大
  Comparator com = new Comparator() {
    @Override
      public int compare(Object o1, Object o2) {
        if(o1 instanceof Person && o2 instanceof Person) {
          Person p1 = (Person) o1;
          Person p2 = (Person) o2;

          return Integer.compare(p1.getAge(), p2.getAge());
        } else {
          throw new RuntimeException("输入的数据类型不匹配");
        }
      }
  };

  // 如果不加参数会按照自然排序的方式 如果加上Comparator对象的参数了 就按照Comparator的排序规则来
  TreeSet set = new TreeSet(com);

  set.add(new Person("sam", 36));
  set.add(new Person("erin", 33));
  set.add(new Person("nn", 5));
  set.add(new Person("niuniu", 0));

  Iterator iterator = set.iterator();
  while(iterator.hasNext()) {
    System.out.println(iterator.next());
  }
}
```

----------------------------

### 阶段性总结
> 集合Collection中存储的如果是自定义类的对象 需要自定义重写哪个方法？

- 回答：
- equals()
  - 原因 contais remove retainsAll等方法 需要判断指定元素 所以要重写equals

  - 另外因为collection没有提供直接的实现类 我们主要讲的是list和set的实现类

- 如下我们会发现List和Set都需要重写equals()所以说Collection都需要重写equals


- List: 
  - list实现类也需要重写equals()
  - 虽说list可以放入重复的数据 比如add的时候没有校验放入的数据是否相等 但是remove contains等方法的时候就需要用到equals()了


- Set:
  - HashSet LinkedHashSet
  - 需要重写两个方法 equals() 和 hashCode()

  - TreeSet
  - 它比较特别 它不用去重写equals() 和 hashCode()
  - 我们关心的是排序的时候的compare 和 compareTo

----------------------------

### TreeSet的练习
- 1. 按照 name 排序
- 2. 按照生日日期的先后顺序排序


> 自然排序：

```java
@Test
public void test() {
  // TreeSet 并往里面添加5个对象
  TreeSet set = new TreeSet();
  Employee e1 = new Employee("sam", 33, new MyDate(1985, 10, 2));
  Employee e2 = new Employee("erin", 32, new MyDate(1986, 10, 22));
  Employee e3 = new Employee("nn", 5, new MyDate(2016, 10, 1));
  Employee e4 = new Employee("laoye", 55, new MyDate(1975, 10, 12));
  set.add(e1);
  set.add(e2);
  set.add(e3);
  set.add(e4);

  // TreeSet在存储数据的时候 因为它是红黑树所以要知道存储的对象谁大谁小 好放左右两边 如果直接存储执行 会报错 所以我们必须要重写CompareTo方法

  // 要重写compareTo方法!!!

  // 遍历
  Iterator iterator = set.iterator();
  while(iterator.hasNext()) {
    System.out.println(iterator.next());
  }
}



// Empolyee类要重写 compareTo方法
@Override
public int compareTo(Object o) {
  if(o instanceof Employee) {
    Employee e = (Employee) o;
    return this.name.compareTo(e.getName());
  } else {
    throw new RuntimeException("传入的参数格式不符合");
    // return 0 也可以 就意味这条数据加不进来
  }
}

// 如果我们写的是中文的话 默认是按照utf-8编码集来计算谁大谁小
```


> 按照生日排序
```java
@Test
public void test() {

  Comparator com = new Comparator() {
    @Override
    public int compare(Object o1, Object o2) {
      if(o1 instanceof Employee && o2 instanceof Employee) {
        Employee e1 = (Employee) o1;
        Employee e2 = (Employee) o2;

        // 数小的就小 先看年 年一样再看月 月一样再看日
        MyDate b1 = e1.getBirthday();
        MyDate b2 = e2.getBirthday();

        // 先比较年
        int minusYear = b1.getYear() - b2.getYear();
        if(minusYear != 0) {
          // 说明年不一样 那么得到的结果不是正数就是负数 直接return
          return minusYear;
        }
        // 比较月
        int minusMonth = b1.getMonth() - b2.getMonth();
        if(minusMonth != 0) {
          return minusMonth;
        }

        // 直接return日就可以了
        return b1.getDay() - b2.getDay();

      } else {
        return 0;
      }
    }
  };

  // TreeSet 并往里面添加5个对象
  TreeSet set = new TreeSet(com);
  Employee e1 = new Employee("sam", 33, new MyDate(1985, 10, 2));
  Employee e2 = new Employee("erin", 32, new MyDate(1986, 10, 22));
  Employee e3 = new Employee("nn", 5, new MyDate(2016, 10, 1));
  Employee e4 = new Employee("laoye", 55, new MyDate(1975, 10, 12));
  set.add(e1);
  set.add(e2);
  set.add(e3);
  set.add(e4);

  // TreeSet在存储数据的时候 因为它是红黑树所以要知道存储的对象谁大谁小 好放左右两边 如果直接存储执行 会报错 所以我们必须要重写CompareTo方法
  // 要重写compareTo方法

  // 遍历
  Iterator iterator = set.iterator();
  while(iterator.hasNext()) {
    System.out.println(iterator.next());
  }
}
```
----------------------------

### Set面试题
> 1. 在List内去除重复数字值 要求尽量简单
- 比如 list 里面可能存了10000条数据
- 现在我们要让list中相同的数据留一个

- 这里我们使用set来过滤

> 要点:
- 可以通过 new ArrayList(set) 将 set 转换为 List

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public static List duplicateList(List list) {
  HashSet set = new HashSet();
  set.addAll(list);
  return new ArrayList(set);
}

public static void main(String[] args) {
  // 1. 创建了一个list 添加了很多的数据
  List list = new ArrayList();
  list.add(new Integer(1));
  list.add(new Integer(2));
  list.add(new Integer(2));
  list.add(new Integer(4));
  list.add(new Integer(4));

  // 2. 然后我们创建了一个set 把list放入里面 这样重复的数据就添加不进去了
  List list2 = duplicateList(list);

  // 遍历
  for(Object integer: list2) {
    System.out.println(integer);
  }
}
```


> 2. 看下方的输出是什么？
```java
HashSet set = new HashSet();
Person p1 = new Person(1001, "AA");
Person p2 = new Person(1002, "BB");

set.add(p1);
set.add(p2);
System.out.println(set);
    // new Person(1001, "AA");
    // new Person(1002, "CC");


p1.name = "CC";
set.remove(p1);
System.out.println(set);
    // new Person(1001, "CC");
    // new Person(1002, "BB");

- 当我们删除这个p1对象的时候 没删掉 按照正常的理解我们原先set中有两个对象 我要删除一个对象p1 那么就应该剩一个对象p2

- 但是结果却是还有两个对象
- 原因对象在set中存储的位置(set底层还是一个数组) 会根据对象中的属性计算hashCode()确定其在数组中的数值
- 因为对象中的属性做了修改 所以hashCode的结果发生了变化 它在删除的时候去另一个位置找要删除的元素 没找到


- p1 p2在数组中的位置 是根据两个对象中的属性计算哈希值得到的

    p1    p2
    □ □ □ □ □ □ 
    c     b

- 然后set.remove(p1) 首先我们还是能找到p1的位置 但是p1里面的属性发生了变化 由原来的 1001 AA 修改为了 1001 CC 了 

- 然后在set中remove 需要先判断有没有 

- 判断有没有 
- 1. 它要先看哈希值 所以它会先看1001 CC 的哈希值 然后通过一种算法计算哈希值 得到数据中的一个位置

- 然后得到的位置不是p1原来的位置 因为p1的位置是按照1001 AA计算出来的 它找就找到另外的位置了

- 比如我们这时添加一个 1001 CC 发现也能添加成功
set.add(new Person(1001, "CC"));
System.out.println(set);
    // new Person(1002, "BB");
    // new Person(1001, "CC");
    // new Person(1001, "CC");

- 这时候我们是拿1001 CC来计算位置 这个位置上是空的 空的就添加进去了


set.add(new Person(1001, "AA"));
System.out.println(set);
    // new Person(1002, "BB");
    // new Person(1001, "CC");
    // new Person(1001, "CC");
    // new Person(1001, "AA");

- 能加进去 先计算哈希值得到的p1的位置 equals()发现内容不一样 所以还是能加进去的
```

> 总结:
- 对于HashSet一定是先hashCode然后再equals
- 跟List不一样

----------------------------

### Map接口
- 它是并列与Collection(单列数据)的一个接口 用来存储双列数据
- 存储key-value对的数据

<!-- 
                  Map

  (实现类)       (实现类)         (Map子类口)
  Hashtable     HashMap         SortedMap

  (实现类)       (实现类)         (先实现SortedMap接口)
  Properites    LinkedHashMap   TreeMap(实现类)
 -->

> 结构
    | -- Map
        | -- HashMap
            | -- LinkedHashMap
        | -- TreeMap
        | -- Hashtable
            | -- Properites


> Map的实现类
- HashMap(*主要实现类*)
<!-- 没有特殊情况我们就使用HashMap -->
- LinkedHashMap

- TreeMap(先实现SortedMap接口 SortedMap又是Map的子类口)

- Hashtable(*古老的实现类*)
- Properites


> HashMap 和 Hashtable
- 它们之间的关系有些像ArrayList和Vecter 


> 简介
- 在jdk1.0的时候开始出现的 用来存储键值对类型的数据 在jdk1.2的时候不想用了 此时出现了Map接口 用Map接口来规范存储键值对特点的数据 然后提供了Map接口的主要实现类HashMap 同时存储有序的键值对有了TreeMap(如果不需要有序通常都用HashMap)

- 然后我们在遍历操作的时候发现HashMap的效率稍微低一些 于是在jdk1.4的时候出现了LinkedHashMap

- 在jdk1.2之后Hashtable就不怎么用了 原因还是在于同步的问题
- HashMap线程不安全 但是效率高
- Hashtable线程安全 但是效率低


> HashMap 和 Hashtable 对比
- HashMap:
- 可以存储null的key和value
<!-- key是null或者是value是null都是ok的 -->

- Hashtable:
- 是不能存储null的key和value
- 会报NullPointerException异常
<!-- 
  基于这点 它的健壮性不太好 比如 用户没有填入key value的值 我们可以认为是个null

  null的时候往Hashtable当中放不进去
  比如注册表单 我们会输入很多的表单项 我们点击按钮数据就会保存在map当中

  map中的保存形式是:
  username: xxx
  password: yyy

  当用户没有填写的时候 后台拿到的就是null值 如果我们往hashtable里面放 就会报空指针异常的信息
-->

```java
HashMap map = new HashMap();
// 往Map中添加数据的方法 实现类对象.put(key, value)
map.put(null, null);

Hashtable hashtable = new Hashtable();
// 在Hashtable上put null的key value的时候会报异常的错误
hashtable.put(null, null);
```

- 底层：
- HashMap的底层
  - (jdk7之前): 数组+链表
  - (jdk8): 数组+链表+红黑树

 
> LinkedHashMap
- 它是HashMap的子类 在原有的基础上加了一对指针 形成了链表结构

- 特点：
- 保证在遍历map元素时 可以按照添加的顺序实现遍历 因为 在原有的HashMap底层结构基础上 添加了一对指针 指向前一个和后一个元素

- 场景：
- 对于频繁的遍历操作 此类执行效率高于HashMap 也就是当有频繁的遍历操作的时候 我们使用LinkedHashMap


> TreeMap
- 保证按照添加的key-value进行排序 实现排序遍历

- 注意:
- TreeMap是按照key来排序的 所以我们要考虑key的自然排序或者定制排序

- 底层:
- 使用的是红黑树

- 使用的场景有限


> Properites
- 常用来处理配置文件 它作为 Hashtable 的子类
- 它的key 和 value都是String类型


> 面试题
- 1. HashMap的底层的实现原理
- 2. HashMap和Hashtable的异同
- 3. CurrentHashMap和Hashtable的异同(暂时不讲)
<!-- 
  CurrentHashMap涉及到
  在多线程访问Map的时候 HashMap是线程不安全的 Hashtable是线程安全的

  比如
  这时候我们有很多个线程要访问Map 不管怎么处理线程安全问题都是同步机制 
  也就是说在同步代码块中 是一个单线程的问题

  这样会导致多线程操作共享数据的时候效率偏差 为了在高并发的场景下 操作Map的执行效率更高 这就引入了一个新的结构 CurrentHashMap

  它能实现分段锁的技术

  原来是

  ↓  ↓  ↓  ↓  ↓  ↓  
  -----------------
        ↓
  -----------------


  现在是

  ↓  ↓  ↓  ↓  ↓  ↓  
  -----------------
        ↓
  -----------------

      ↙     ↓     ↘

  ----    ----    ----

  ----    ----    ----

  这样实现了类似于同一时间段多个线程都在进行操作共享数据
 -->

----------------------------

### Map中存储的key-value的特点 (Map结构的理解)
- 我们往Map里面put了4个键值对
- 比如key是学生 右侧是成绩
- 我们发现不同的学生是可以考相同的分数的 言外之意value是可以重复的 为了保证效率高 key不能重复且无序的
<!-- 
  双列数据

      key         value
    -------      -------
      AA            90
      BB            90      Entry对象
      CC            56
      DD            78

  key的部分相当于用Set去存储
    用set存 -- 保证所有的key无序

  value是可以重复的 也是无序的 相当于用Collection存的
    因为key是无序的 key对应着一个value
 -->

- 当我们往Map中put数据的时候 我们前面说是双列数据
- 但是我们往Map中放的数据还是一个一个的

- 比如上面我们就往Map中放个4个元素 每一个元素我们可以叫做一个Entry 而每一个Entry当中有两个属性

- 一个叫做key
- 一个叫做value

- 而我们put的时候 put的都是一个个的entry 
- 也就是我们在put key value的时候 在源码中 会帮我们把key value装成一个entry

- 我们往map中添加kv的时候 是将一个kv看做成一个entry


> Entry的特点
- 1. 无序的
- 2. 不可重复
- Entry可以理解为用Set来承装


> Map的结构的理解
- Map中的key: 无序的 不可重复的 使用Set存储所有的key
- Map中的value: 无序的 可重复的 使用Collection存储所有的value

- 一个键值对: key-value构成了一个Entry对象
- Map中的entry: 无序的 不可重复的 使用Set存储所有的entry

- 我们分成3个部分是记忆:
- 1. 整体是一个entry -- set -- 无序不可重复
- 2. key -- set -- 无序不可重复
- 3. value -- collection -- 无序的可重复


**注意:**
- Map的结构要求 *key*所在的类要*重写equals()和hashCode()* 
- Map的结构要求 *value*所在的类要*重写equals()* 
<!-- 
  这里是以hashMap为例的 
  如果是TreeMap的话 又涉及到了自然排序和定制排序的问题
 -->

----------------------------

### HashMap的底层实现原理 (jdk7)
> 过程讲述：
- 1. 
- 使用空参构造器 创建 HashMap 对象 然后看看底层做了什么事情
- HashMap map = new HashMap();

- 在实例化以后 底层创建了长度是16的一维数组 数组的类型是Entry类型的数组
- Entry[] table


- 2. 
- ... 已经执行过多次put了
- map.put("key1", "value1");

- 现在我们要把key1 value1放到数组中
- 我们要知道放在数组中的哪个位置 首先调用key1所在类的hashCode()计算key1的哈希值 此哈希值经过某种算法计算以后 得到在Entry数组中的存放位置(我们是拿Entry中的key看看存哪而已)

- 如果此位置上的数据为空 k1v1就直接添加成功(实际上是entry1添加成功) -- *情况1*

- 如果此位置上的数据不为空(意味着此位置上存在一个或多个数据 以链表的形式存在) 我们需要比较当前k1和以存在的一个或多个数据的这些key的哈希值

- 如果key1的哈希值与已经存在的数据的哈希值都不相同 此时k1-v1就能够添加成功 -- *情况2*

- 如果key1的哈希值与已经存在的数据的某一个数据(key2-value2)的哈希值相同 此时继续比较 调用key1所在类的equals()方法 把那个相同的key放入equals(key2)的参数中 比较

- 如果equals返回false 意味着不一样 k1v1添加成功 -- *情况3*

- 如果equals返回true  意味key是一样的 *使用value1替换相同key的value2值*
<!-- 
  这时候我们的put方法 相当于有修改的功能了

  put ("Tom", 23)
  put ("Tom", 45)

  我们存的会是Tom 45相当于把上面的覆盖掉了
 -->


- 关于情况2 和 情况3
- 情况2 和 情况3 都是数组的这个位置已经有数据了 那么就会以链表的形式来存储 就又涉及到了 谁指向谁的问题

- 此时key1-value1和原来的数据链表的方式存储


> 扩容
- 在不断的添加的过程中 会涉及到扩容的问题 当超出临界值(且要存放的位置非空)默认的扩容方式 扩容为原来的容量的2倍 并将原有的数据复制过来


----------------------------

### HashMap的底层实现原理 (jdk8)
- 讲述:
- jdk8相较于jdk7在底层实现方面的不同：
- 1. 
- new HashMap();
- jdk8中底层没有创建一个长度为16的数组 
- jdk8中底层的数组是: Node[] 而非Entry[]

- 2. 
- 首次调用put()方法时 底层创建长度16的数组

- 3. 
- jdk7底层结构只有 数据 + 链表
- jdk8底层结构只有 数据 + 链表 + 红黑树
- 当数组的某一个索引位置上的元素以链表的形式存在的数据个数 > 8 且 当前数组的长度 > 64时 此时此索引位置上的所有数据改为使用红黑树进行存储
- 查找的效率高 因为红黑树将结果再次的分支


- 虽然jdk8中底层数组的名字发生了变化 但是里面包含的信息还是一样的

- 对于一个Node来讲 它包含的信息就是
<!-- 
    ---------------------------
    |  hash  |  key   |  next |
    |        |  value |       |
    ---------------------------
 -->

- 因为在HashMap中形成链表的时候 某一个元素需要指向下一个元素 所以它必须有指向下一个元素的能力 我们得有一个属性叫做next
<!-- 
    □ □ □ □ □ □ □ 
      ↓
      □
      ↓
      □
 -->


----------------------------

### HashMap源码分析 (jdk7)
- HashMap在jdk7跟8当中还是有区别的 我们看看jdk7的源码分析

> 面试题
- 谈谈你对HashMap中put get方法的认知？
- 如果了解再谈谈 HashMap 的扩容机制？
- 默认大小是多少？
- 什么是负载因子（或填充比）?
- 什么是吞吐临界值 (或阈值 threshold)?

- 我们先来看看 常量 和 变量 代表什么意思

> DEFAULT_INITAL_CAPACITY:
  - HashMap的*默认容量*: 16

- MAXIMUM_CAPACITY:
  - HashMap的最大支持容量, 2^30

> DEFAULT_LOAD_FACTOR:
  - HashMap的默认*加载因子* 默认是0.75
  - 提前扩容的原因：
  - 因为它不是一个挨一个放的 而通过计算哈希值计算出来的位置 可能很多都是以链表形式存的了 而数组中的位置还有可能是空的
  - 可利用加载因子的原因就是想让数组中出现链表的情况尽量减少 
  
- TREEIFY_THRESHOLD:
  - Bucket中链表长度大于该默认值 转化为红黑树 默认值是8

- UNTREEIFY_THRESHOLD:
  - Bucket中红黑树存储的Node小于该默认值 转化为链表

- MIN_TREEIFY_CAPACITY:
  - 默认值是64
  - 桶中的Node被树化时最小的hash表容量(当桶中Node的数量大到需要变红黑树时，若hash表容量小于MIN_TREEIFY_CAPACITY时 此时应执行resize扩容操作这个MIN_TREEIFY_CAPACITY的值至少是TREEIFY_THRESHOLD的4倍)


- table:
  - 存储元素的数组 总是2的n次幂

- entrySet:
  - 存储具体元素的集

- size:
  - HashMap中存储的键值对的数量

- modCount:
  - HashMap扩容和结构改变的次数

> threshold:
  - 扩容的*临界值* = 容量 x 加载因子 

> loadFactor:
  - 填充因子
  

> 从空参构造器开始
```java
public HashMap() {
  // 调用同类中的带参构造器
  this(DEFAULT_INITIAL_CAPACITY, DEFAULT_LOAD_FACTOR);
}
```
- DEFAULT_INITIAL_CAPACITY:
    - 默认的初始化容量 值为16 
    - 它决定我们在底层创建数组的长度


- DEFAULT_LOAD_FACTOR:
    - 加载因子： 默认为0.75f


> 带参构造器
```java
public HashMap(int initialCapacity, float loadFactor) {
  if (initialCapacity < 0)
    throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
  if (initialCapacity > MAXIMUM_CAPACITY)
      initialCapacity = MAXIMUM_CAPACITY;
  if (loadFactor <= 0 || Float.isNaN(loadFactor))
      throw new IllegalArgumentException("Illegal load factor: " + loadFactor);

  ... 接下面
}
```

- 当我们new HashMap()的时候 我们写的是new HashMap(15) 我们以为底层创建的数组的长度可能是15 但其实不是 还是16

- 我们传递的15就是initialCapacity
```java
int capacity = 1;
// capacity < 我们传入的15 那capacity就扩大2倍 16就比15大
while(capacity < initialCapacity) capacity << 1;

... 接下面
```

- capacity决定底层我们数组的长度 它始终都是2的几次幂的形式 如果我们制定传入15但是底层的数组的长度不一定是我们传入的数字

- 接下来 我们传入的loadFactor 0.75就给了 this.loadFactor 当前对象的loadFactor 


- loadFactor就是加载因子 默认是15 而上面的capacity是16
```java
// this.loadFactor就是0.75了
this.loadFactor = loadFactor;

// threshold是临界值 = 12
// 我们传入的是15 capacity会扩至16 也就是16x0.75=12
threshold = (int)Math.min(capacity * loadFactor, MAXIMUM_CAPACITY + 1)

// 我们创建了一个entry数组 长度就是16 table就是HashMap的底层结构
table = new Entry[capacity]

useAltHashing = sun.misc.VM.isBooted() && (capacity >= Holder.ALTERNATIVE_HASHING_THRESHOLD)
init()
```

- threshold是临界值12影响的是扩容的时候
- 我们的数组是16 什么时候扩容呢？ 不是我们存入17的时候 而是不到16的时候就开始扩容了 我们就是拿临界值判断的 当超过临界值12的时候就开始扩容

- table
- 就是HashMap当中的底层结构 HashMap底层使用的是一个数组Entry[] table


> put数据的时候
```java
// 我们要把key 和 value放到HashMap当中
public V put(K key, V value) {

  // 首先看看这个key是不是null 是null的话 也往里面放了
  if(key = null) {
    return putForNullKey(value)
  }

  // 计算当前key的哈希值
  int hash = hash(key); 
  // 上面得到了hash值 我们说经过某种算法得到元素在数组中的位置 就是indexFor() 
  int i = indexFor(hash, table.length)

  /*
    ↑

    indexFor()
    static int indexFor(int h, int length) {
      return h & (length-1)

      - 我们前面说 哈希值 % 16 能够得到0-15之间的值
      - 这里不是取模 而是 & 也就是 

      - 哈希值 & 15
      - 15前面都是0 后面是1111

      - &符号保证上下都是1的时候结果才是1 所以只有后4位是有值的
      - 那就是0-15之间的随机值

      - 比取模的效率高 因为取模要一个劲的除这个数
    }
  */

  // 上面得到了我们在数组中的存放位置后 我们就要关系该位置上有没有数据
  // e = table[i] 我们取出当前table i位置上的数据
  for(Entry<K, V> e = table[i]; e != null; e = e.next) {
    // 如果数组的该位置上有值就会进入这个逻辑
    Object k

    // 已经在该位置的哈希值和要放进来的哈希值看看它们是不是 ==
    // e.hash == hash
    // 然后判断key是不是相等 或者 内容相等不相等
    if(e.hash == hash && ((k = e.key) == key || key.equals(k))) {
      // 7上8下 那新的value替换原有的value
      V oldValue = e.value
      e.value = value
      e.recordAccess(this)
      return oldValue
    }
  }

  modCount++;
  // 如果table i的位置上没有元素就可以添加成功
  addEntry(hash, key, value, i)
  return null
}
```

- hash() 计算哈希值的方法
```java
// useAltHashing的初始值 false
transient boolean useAltHashing; 

final int hash(Object k) {
  int h = 0;
  if(useAltHashing) {
    if(k instanceof String) {
      return sun.misc.Hashing.stringHash32((String) k);
    }
    h = hashSeed;
  }

  // useAltHashing是false 所以会到这里
  h ^= k.hashCode();

  h ^= (h>>>20) ^ (h >>>12)
  return h ^ (h>>>7) ^ (h>>>4)
}
```

- addEntry(hash, key, value, i);
```java
void addEntry(int hash, K key, V value, int bucketIndex) {
  // size >= 12 size是我们已经存了几个了 
  // null != table[bucketIndex] 要放得位置是不是也有元素
  // 我们上面说size的长度大于12就会扩容 严格上扩容的话还有一个条件 就是null != table[bucketIndex] 看看要放的位置空不空 空的话就放进去就不用扩容了 不空就扩容
  if((size >= threshold) && (null != table[bucketIndex])) {

    // 进入resize的条件是大于12 并且该位置还不空 扩容为全部table的长度x2 扩容2倍
    resize(2 * table.length)
    hash = (null != key) ? hash(key) : 0;
    bucketIndex = indexFor(hash, table.length)
  }

  // 不需要扩容的话 就是直接添加
  createEntry(hash, key, value, bucketIndex)
}
```

- createEntry()
```java
void createEntry(int hash, K key, V value, int bucketIndex) {
  // 先把原有位置上的元素取出来？
  Entry<K, V> e = table[bucketIndex]
  // 然后new一个新的Entry 就是我们要放的kv 把新造的Entry放在数组上 e就是数组上原有的元素 现在作为新Entry的next
  table[bucketIndex] = new Entry<>(hash, key, value, e)
  size++
} 
```

- new Entry
```java
Entry(int h, K km V v, Entry<K, V> n) {
  value = v

  // 把原有数组上的位置上的元素 作为新Entry的next出现了 n 就是上面传递过来的e
  next = n

  key = k
  hash = h
}
```

----------------------------

### HashMap源码分析 (jdk8)
- 看第二遍的时候补吧
- 后面听不懂了
- https://www.bilibili.com/video/BV1Kb411W75N?p=553&spm_id_from=pageDriver


- 1. 从空参构造器开始
```java
public HashMap() {
  // 只是给loadFactor赋值为0.75
  this.loadFactor = DEFAULT_LOAD_FACTOR; 
    // all other fields defaulted
}
```

- jdk8并没有像jdk7那样一上来就帮我们造一个数组 里面只写了一个简单的属性赋值 给加载因子赋值为0.75
- 赋值完后没干别的 所以jdk8底层没有创建一个长度为16的数组


- 2. 从put方法开始
- 我们现在需要将一个kv放在HashMap里面了
```java
public V put(K key, V value) {

  // hash(key) 算出哈希值 传入 k v 后面的两个不用关注
  return putVal(hash(key), key, value, false, true);
}
```

- putVal(hash(key), key, value, false, true);
```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {

  // 首次添加kv 首先声明tab为Node类型
  Node<K,V>[] tab; Node<K,V> p; int n, i;

  // 如果不是首次添加 下面的逻辑就不用考虑了
  // table 还没有对它进行初始化 这时候它是null 然后将 table赋值给tab 所以 null = null 成立 是true后面就不用管了
  if ((tab = table) == null || (n = tab.length) == 0)

      // true的时候 也就是当前的table是null的时候 将数组造好 也就是说首次的时候才会进入resize 如果当前的table已经有具体的数组了
      // 将tab resize下 resize就是扩容
      n = (tab = resize()).length;


  // (n - 1) & hash 判断我们在新的数组当中的哪个位置 看看当前的位置上是不是null
  if ((p = tab[i = (n - 1) & hash]) == null)
      // 如果当前数组上的位置 也就是我们要存放的位置上是null 直接存在这里就可以了
      tab[i] = newNode(hash, key, value, null);

  // 当不是null的时候 进入eles的逻辑 不是null说明该位置上就有值
  else {
      Node<K,V> e; K k;

      // p就是数组上的元素 看看它的哈希值和传进来的key的哈希值是不是相等 如果相等
      if (p.hash == hash &&
          // 如果相等就看看key是不是equals的
          ((k = p.key) == key || (key != null && key.equals(k))))
          // 把当前数组里面的元素存到e中
          e = p;
      else if (p instanceof TreeNode)
          e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);

      // 如果数组上的元素的哈希值和传入的key的哈希值不相等 会进入下面的逻辑
      else {

          // 如果要存放到数组中的元素的哈希值和数组中该位置上的哈希值不等 那么就看看该位置链表上的元素 
          for (int binCount = 0; ; ++binCount) {
              // 先取出p的next 先看看p的next是不是null 如果p的next是null 那就说明该位置就一个元素 就是p
              if ((e = p.next) == null) {

                  // 新造了一个Node 就是我们要放的kv 把我们新造的kv作为p的next 这就是7上8下的下
                  p.next = newNode(hash, key, value, null);
                  if (binCount >= TREEIFY_THRESHOLD - 1)

                      // 当链表的长度超过8的时候 就会变成tree的结构了
                      treeifyBin(tab, hash);
                  break;
              }

              // 如果p的next不是null 会进入下面的逻辑
              if (e.hash == hash &&
                  ((k = e.key) == key || (key != null && key.equals(k))))
                  break;
              p = e;
          }
      }

      // e被赋值为p了 如果我们发现要放的元素和已有的元素的哈希值是一样的 内容通过equals判断也一样 那我们就做了一个替换 因为8下
      if (e != null) { 
          V oldValue = e.value;
          if (!onlyIfAbsent || oldValue == null)
              // 将要放的value替换原有的value 替换的逻辑
              e.value = value;
          afterNodeAccess(e);
          return oldValue;
      }
  }
  ++modCount;
  if (++size > threshold)
      resize();
  afterNodeInsertion(evict);
  return null;
}
```

- resize()
- 扩容方法resize 底层造数组的事儿就是在这里面做的
```java
final Node<K,V>[] resize() {

  // 当前的table是null
  Node<K,V>[] oldTab = table;

  // 因为开始是null oldCap就是0
  int oldCap = (oldTab == null) ? 0 : oldTab.length;

  // 临界值还没有被赋值过 所以也就是0
  int oldThr = threshold;

  int newCap, newThr = 0;

  // 最开始的时候oldCap是0 所以不进去
  if (oldCap > 0) {
      if (oldCap >= MAXIMUM_CAPACITY) {
          threshold = Integer.MAX_VALUE;
          return oldTab;
      }
      else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                oldCap >= DEFAULT_INITIAL_CAPACITY)
          newThr = oldThr << 1; // double threshold
  }
  else if (oldThr > 0) // initial capacity was placed in threshold
      newCap = oldThr;

  // 1. 最开始的时候 都是初始化 走这里的逻辑
  else {
      // newCap是16了
      newCap = DEFAULT_INITIAL_CAPACITY;

      // newThr是12了 16x0.75
      newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
  }

  // newThr是12了 进不来
  if (newThr == 0) {
      float ft = (float)newCap * loadFactor;
      newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                (int)ft : Integer.MAX_VALUE);
  }

  // 将12赋值给了threshold 临界值的赋值
  threshold = newThr;


  @SuppressWarnings({"rawtypes","unchecked"})

  // new了一个Node 意味着数组出现了 newCap是16 造了一个长度为16的数组
  Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];

  // 将造好的数组给了table
  table = newTab;

  if (oldTab != null) {
      for (int j = 0; j < oldCap; ++j) {
          Node<K,V> e;
          if ((e = oldTab[j]) != null) {
              oldTab[j] = null;
              if (e.next == null)
                  newTab[e.hash & (newCap - 1)] = e;
              else if (e instanceof TreeNode)
                  ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
              else { // preserve order
                  Node<K,V> loHead = null, loTail = null;
                  Node<K,V> hiHead = null, hiTail = null;
                  Node<K,V> next;
                  do {
                      next = e.next;
                      if ((e.hash & oldCap) == 0) {
                          if (loTail == null)
                              loHead = e;
                          else
                              loTail.next = e;
                          loTail = e;
                      }
                      else {
                          if (hiTail == null)
                              hiHead = e;
                          else
                              hiTail.next = e;
                          hiTail = e;
                      }
                  } while ((e = next) != null);
                  if (loTail != null) {
                      loTail.next = null;
                      newTab[j] = loHead;
                  }
                  if (hiTail != null) {
                      hiTail.next = null;
                      newTab[j + oldCap] = hiHead;
                  }
              }
          }
      }
  }
  return newTab;
}
```

----------------------------

### LinkedHashMap源码分析
- 它是HashMap的子类
- 意味着它的底层存储还是用得HashMap定义的数组去做
- 它能够按照我们添加的顺序进行遍历
```java
@Test
public void test() {
  map = new LinkedHashMap();

  map.put(123, "AA");
  map.put(345, "BB");
  map.put(567, "CC");
  
  // 我们发现LinkedHashMap的结果是按照我们添加元素的顺序来得
  System.out.println(map);
}
```

> 从空参构造器开始分析代码
```java
public LinkedHashMap() {
  super();
  accessOrder = false;
}
```

> 从put()开始分析
- 我们在LinkedHashMap中查找put()方法发现没有 那就相当于我们调用的是LinkedHashMap父类的put()
- 我们调用的还是父类中的这个put
```java
public V put(K key, V value) {
  return putVal(hash(key), key, value, false, true)
}
```

- 而父类中的put内部调用了putVal()方法
```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {

  ...

  // 如果p是null 我们就会进入下面的逻辑 往里添加元素 而里面调用了 newNode() 方法
  if ((p = tab[i = (n - 1) & hash]) == null)
    tab[i] = newNode(hash, key, value, null);

```

- newNode()
- 我们发现在 LinkedHashMap 中 它把newNode()重写了
- 就是说我们一开始通过LinkedHashMap的实例 调用的put方法调用的是父类中的 put又调用了putVal还是父类的

- 但是在newNode(也就是new一个具体的元素的时候) 调用的旧是LinkedHashMap中重写的newNode方法
```java
Node<K,V> newNode(int hash, K key, V value, Node<K,V> e) {

  // 
  LinkedHashMap.Entry<K,V> p =
    new LinkedHashMap.Entry<>(hash, key, value, e);

  linkNodeLast(p);
  return p;
}
```


> 简单的说明
- HashMap中的内部类: Node
```java
static class Node<K, V> implements Map.Entry<K, V> {
  finale int hash;
  final K key;
  V value;

  // Node中的next 数组中的链表就是由它决定的
  Node<K, V> next;
}
```

- LinkedHashMap中的内部类: Entry
- 它集成了hashmap中的Node
```java
static class Entry<K, V> extends HashMap.Node<K, V> {
  // 在集成了上面Node类中的属性的同时 又多定义了两个变量 before after
  // 用来记录添加这个Entry的前一个是谁和下一个是谁
  Entry<K, V> before, after;

  Entry(int hash, K key, V value, Node<K, v> next) {
    super(hash, key, value, next)
  }
}
```

- 所以我们就可以按照添加的顺序进行遍历

> 总结：
- 对于频繁的遍历HashMap的述求 我们就可以考虑使用LinkedHashMap替换HashMap


> HashSet回顾
- 我们new HashSet() 其实底层帮我们new HashMap()
```java
public HashSet() {
  map = new HashMap();
}
```

- 当我们往HashSet中add元素的时候 相当于我们将元素放到map中了
```java
public boolean add(E e) {
  return map.put(e, PRESENT) == null
}
```

- 我们放到Set当中的数据 相当于Map中的谁呢？
- map.put(e, PRESENT)
- 相当于map中的key 

- 我们说set里面放的是一个个元素 我们其实是将一个个的元素放到map中的key的位置上了

- 那value是谁呢？
- map.put(e, PRESENT)
- value就是PRESENT
- value的值不是null 而是这个PRESENT常量

- PRESENT常量
```java
private static final Object PRESENT = new Object()
```

- 我们发现就是一个new Object() 其实也没有什么实际意义 就是为了避免是一个null 担心空指针 况且在Hashtable中也没有办法放null 所以就定义了一个空对象

- 而且是该对象是用private static final修饰的
- 说明我们在HashSet中存的值是存在了HashMap的key中 而value的值仅仅是为了避免null创建的一个空对象 没有实际的意义

- 所以我们将这个空对象用private static final来修饰
- 这样value位置上都会指向这一个空对象

----------------------------

### Map中的常用方法
- Map接口中定义的方法：
- Map是一个接口它当中的方法都是抽象方法 所以我们从它的实现类HashMap上看看这些方法应该怎么使用

> 添加 删除 修改操作
- 添加 和 修改 都用put()方法来体现

> 实现类对象.put(Object key, Object value)
- 作用：
- 添加 和 修改
- 当map中没有key的时候  -- 就是添加
- 当map中对已有的key进行put的时候 -- 就是修改

- 参数:
- Object 可以是任意类型
- 如果是基本数据类型的话 那就是以包装类的方法呈现

- 如果有重复key的时候 只能添加进去一个 同时原有的key对应的value值会被后添加的value值*覆盖*
<!-- 
  ！！！ 这对应的就是 修改 的操作
 -->

```java
Map map = new HashMap();
map.put("AA", 123);
    - 这体现的是添加的操作

// 我们写了两个AA 看看AA可以添加进去几个
map.put("AA", 87);
    - 这体现的是修改的操作

// value可以重复
map.put(45, 123);

System.out.println(map);
    // {AA=87, 45=123} AA值添加进去一个   key=value
    // 且, value值被替换成87了
```


> 实现类对象.putAll(Map m)
- 作用:
- 将一个形参集合中的数据添加到调用者的集合里

```java
Map map = new HashMap();
map.put("AA", 123);
map.put(45, 123);
map.put("AA", 87);

Map map2 = new HashMap();
map2.put("CC", 123);
map2.put("DD", 123);

map.putAll(map2);
```


> 实现类对象.remove(Object key)
- 作用
- 按照指定的key移除数据

- 返回值
- Object类型 
- 返回的是 给定的key所对应的value 要删除的对应的那个值

- 如果给定的key不存在 则返回 null

```java
map.remove("CC");

or

// 返回得是key对应的value
Object value = map.remove("CC")
```


> 实现类对象.remove(Object key, Object value)
- 作用
- 删除给定的键值对

- 返回值
- boolean

- 如果给定的键值对不存在则返回false

```java
boolean flag = map.remove("AA", 123);
System.out.println(flag);
    // false
```



> 实现类对象.clear()
- 作用
- 清空map(清空集合中的数据)

- 无返回值

- 清空后 map就是一个{} (并不是将map赋值为null 只是清空数据)
<!-- 
  清空后 堆结构中还是有集合的 也就是new的对象还存在 只是清空的集合数据
 -->

```java
map.clear();
map.size();   // 并不会是空指针异常 而是0
```


> 元素查询的操作
> 实现类对象.get(Object key)
- 作用
- 获取给定key对应的value值

- 返回值
- Object类型

- 如果给定的key不存在 则返回null

```java
Object num = map.get("AA");
```


> 实现类对象.containsKey(Object key)
> 实现类对象.containsValue(Object value)
- 作用:
- 判断当前的集合中是否包含给定的key
- 判断当前的集合中是否包含给定的value

- 返回值：
- boolean

- 注意：
- 1. 它是根据哈希值找数组中的位置 然后根据equals()看看内容是否相同
- 2. containsValue()当给定的value有重复的时候 只要找到一个就不会再继续往下找了

```java
boolean flag = map.containsKey("AA")
```


> 实现类对象.size()
- 获取集合中的kv对的个数

- 返回值
- int


> 实现类对象.isEmpty()
- 判断集合是否为空

- 返回值
- boolean


> 实现类对象.equals(Object obj)
- 判断两个集合是否是相同

- 返回值
- boolean

- 要点：
- 要想两个对象能进行判断 形参Object也必须是一个map类型的 同时里面存的数据也得一样
<!-- 
  造两个HashMap kv都一样 去调用这个方法试试
 -->


> 元试图操作的方法
- 这个部分的方法涉及到如果遍历集合中的key 及 value 及 key value

- 这个部分就是专门讲遍历的事儿
<!-- 
  前面我们说Collection可以使用迭代器 
  map中就没有迭代器了
 -->

- 但是我们说 map 中的结构是：
- 所有的key是一个     Set结构
- 所有的value是一个   Collection结构
- 键值对是一个        Set结构

- 那我们就可以
- 拿到所有的key(也就是Set) 拿Set调用iterator
- 拿到所有的value(也就是Coll) 拿Coll调用iterator
- 拿到所有的Entry构成的Set 调用iterator


> 实例对象.keySet()
- 将map中的所有key返回

- 返回值
- Set类型

- 应用
- 遍历map中的所有key值时可以调用该方法 通过返回得Set结构调用iterator来遍历

```java
Map map = new HashMap();
map.put("AA", 123);
map.put(45, 123);
map.put("BB", 87);

Set set = map.keySet();
Iterator iterator = set.iterator();

while(iterator.hasNext()) {
  System.out.println(iterator.next());
}
```


> 实例对象.values()
- 将map中的所有value返回

- 返回值
- Collection
```java
Collection coll = map.values();
Iterator iterator = coll.iterator();

while(iterator.hasNext()) {
  System.out.println(iterator.next());
}
```


> 实例对象.entrySet()
- 将map中的所有kv返回
- 返回得set中放着很多的Entry

- 返回值
- Set
```java
Set set = map.entrySet();
Iterator iterator = set.iterator();
while(iterator.hasNext()) {
  // obj就是Entry 
  Object obj = iterator.next()

  // 我们给它强转成Map里面的Entry
  Map.Entry entry = (Map.Entry) obj

}

// AA=123 BB=87 45=123
```

> 强转 entry
- entrySet集合中的元素都是entry
- 所以我们可以对它进行强转
- Map.Entry entry = (Map.Entry) obj

- 既然我们强转成entry对象了 这时我们想看看entry中的key 和 value 可以调用对应的方法

> entry.getKey()
- 获得entry中的key

- 返回值:
- Object

> entry.getValue()
- 获得entry中的value

- 返回值:
- Object

```java
Set set = map.entrySet();
Iterator iterator = set.iterator();
while(iterator.hasNext()) {
  // 获取每一个entry
  Object obj = iterator.next();

  // 将obj强转为entry后 通过调用entry的方法 输出key value
  Map.Entry entry = (Map.Entry) obj;
  Object key = entry.getKey();
  Object value = entry.getValue();
  System.out.println(key + ": " + value);
}
```

> 扩展
> Map.Entry
- 是Map中的定义的Map.Entry接口


> 诶？ 前面的set coll都是数组 只是特性不一样 而map相当于对象呀

> 总结: 常用方法
- 添加:
    - put()

- 删除: 
    - remove()

- 修改:
    - put()

- 查询:
    - get()

- 插入:
    - 没有插入的方法 因为无序 往哪插呀

- 长度:
    - size()

- 遍历:
    - keySet() values() entrySet()

----------------------------

### TreeMap 两种添加方式的使用
- TreeMap是通过key来进行排序的 所以*要求key得是同一个类的对象*

- 要求:
- 1. 向TreeMap中添加key-value *要求key必须是由同一个类创建的对象*

- 因为我们要按照key进行排序, 排序方式:
    - 自然排序
    - 定制排序


> TreeMap map = new TreeMap();
- 空参构造器

- 如果是自然排序的话 我们可以直接调用空参的构造器 但是key如果我们放的是一个对象的话

- 那么就要要求:
- 1. key是同一个类创建的对象
- 2. 该类中要实现 Comparable 接口 重写compareTo()方法 并指定排序的规则

> 自然排序
```java
// 对于自然排序来讲我们可以直接调用空参的构造器
TreeMap map = new TreeMap();

Person p1 = new Person("sam", 18);
Person p2 = new Person("erin", 19);
Person p3 = new Person("nn", 5);
Person p4 = new Person("laoye", 50);

// key是一个人的对象，value是期末成绩
map.put(p1, 98);
map.put(p2, 60);
map.put(p3, 0);
map.put(p4, 40);

// 遍历结果是 按照key所在类的compareTo()方法进行排序的
Set set = map.entrySet();
Iterator iterator = set.iterator();
while(iterator.hasNext()) {
  System.out.println(iterator.next());
}
```

- 要点:
- 我们在key的位置上放了一个对象 人的对象
- value的位置上放了 该人的期末成绩



> 定制排序
- 要点在 new TreeMap() 传入Comparator 并重写compare方法

```java
TreeMap map = new TreeMap(new Comparator() {
  @Override
  public int compare(Object o1, Object o2) {
    if(o1 instanceof Person && o2 instanceof Person) {
      Person p1 = (Person) o1;
      Person p2 = (Person) o2;

      return Integer.compare(p1.getAge(), p2.getAge());
    }
    throw new RuntimeException("传入的数据格式不匹配");
  }
});

Person p1 = new Person("sam", 18);
Person p2 = new Person("erin", 19);
Person p3 = new Person("nn", 5);
Person p4 = new Person("laoye", 50);

map.put(p1, 98);
map.put(p2, 60);
map.put(p3, 0);
map.put(p4, 40);

// 遍历
```

----------------------------

### Properties处理文件属性
- Properties类是Hashtable的子类 该对象用于处理属性文件
- 长得不像一个map但是它底层是一个map


- 由于属性文件里的key value都是字符串类型 所以*Properties里面的key和value都是字符串类型*

> 应用场景:
- Properties是用来处理配置文件 
- 配置文件就是物理上存放的文件 我们要把配置文件里面的数据读到内存当中 
<!-- 
  比如idea的配置文件 
  我们在配置文件修改的内容 idea读取该配置文件后 会修改idea里面的配置
-->

> 配置文件的创建 及 规则
- 配置文件的创建有两种方式
- 1. 在java的根目录下 
- 右键 -- new -- file 
  -- 创建文件名 -- 补全.properties后缀
<!-- 
  config.properties
 -->

- 2. 在java的根目录下
- 右键 -- Resource Bundle 
  -- 该选项会自动帮我们添加后缀

- 3. 规则
  - 不要留空格

- 4. idea配置中 file encodings 里 transparent native-to-ascii conversion 前面要打上对号 才能在配置文件中写中文 我们才能正常的读取
<!-- 
  // 配置文件
  name=Tom
  password=abc123
 -->


- 下面我们看看怎么读取配置文件中的信息

> 1. 创建文件流对象 读取文件内的 内容
> new FileInputStream("根目录下的文件名")
- 该方法会抛出异常 使用try catch finally 处理下

```java
FileInputStream fs = new FileInputStream("config.properites");
```

- 注意:
- fs最后要close(); 在finally里面关闭
- fs.close();
- fs.close();本身还会抛异常


> 2. 创建Properties实例对象 用于读取配置内容
> Properties prop = new Properties();
- 实例化prop

> prop.load(传入fs)


> 3. 调用prop对象的方法读取属性
> prop.getProperty("属性名");
- 返回值类型: String
```java
String name = prop.getProperty("name");
```


> 简单的示例演示:
```java
@Test
public void test() {

  // 先定义个变量下面要用
  FileInputStream fs = null;

  // 使用try catch fanilly结构 关闭fs
  try {
    fs = new FileInputStream("config.properites");
    prop.load(fs);

    Properties prop = new Properties();

    String name = prop.getProperty("name");
    String password = prop.getProperty("password");

    System.out.println(name + ":" + password);

  } catch (IOException e) {
    e.printStackTrace();

  } finally {
    if(fs != null) {

      // fs.close(); 还会抛异常 我们使用try catch处理
      try {
        fs.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}
```

> 存取数据时，建议使用
- setProperty(String key, String value)
- getProperty(String key)

----------------------------

### Collections工具类 常用方法
- 我们前面讲完了数组 之后就讲了Arrays 它是操作数组的工具类

- 现在我们讲了Map Collection 现在说说Collections工具类

- 它是*操作Collection 和 Map的工具类*

- 既然是一个工具类 以为里面的方法一般都是静态的方法了

> 介绍:
- Collections是一个操作*Set* *List* *Map*等集合的工具类

- Collections中提供了一系列*静态的方法*对集合元素进行排序, 查询和修改等操作, 对集合对象设置不可变, 对集合对象实现同步控制等方法
 
> 共同代码部分:
```java
List list = new ArrayList();
list.add(123);
list.add(33);
list.add(-3);
list.add(66);
list.add(1);
```

> 排序相关的操作
> Collections.reverse(List)
- *反转*给定List中元素的顺序

- 返回值
- 无 意味着修改的是原List

```java
Collections.reverse(list);

// 结果:
[123, 33, -3, 66, 1]
******
[1, 66, -3, 33, 123]
```


> Collections.shuffle(List)
- 对给定 List 集合元素进行随机排序

- 返回值
- 无 意味着修改的是原List

```java
Collections.shuffle(list);
```


> Collections.sort(List)
- 根据元素的自然顺序对指定 List 集合元素按升序排序

- 比如:
- 我们上面集合中的数据都是123 那它就会按照Integer里面的compareTo()

- 要求:
- 传入的List中的对象 可能得是同一个类造的 同时该类实现了Comparable接口 和 重写了compareTo方法

- 返回值
- 无 意味着修改的是原List

```java
Collections.sort(list);
```


> Collections.sort(List, Comparator)
- 根据指定的Comparator产生的顺序(定制排序) 对 List 集合元素进行排序

- 返回值
- 无 意味着修改的是原List


> Collections.swap(List, int, int)
- 交换给定List中 给定索引位置上的两个元素的位置

- 返回值
- 无 意味着修改的是原List

```java
Collections.swap(list, 0, 2);

// 结果:
[123, 33, -3, 66, 1]
******
[-3, 33, 123, 66, 1]
```


> Collections.max(Collection)
- 根据元素的自然排序 返回给定集合中的最大元素
- 右边的最大

- 返回值
- Object

> Collections.max(Collection, Comparator)
- 根据Comparator指定的顺序 返回给定集合中的最大元素

- 返回值
- Object

> Collections.min(Collection)
> Collections.min(Collection, Comparator)


> Collections.frequency(Collection, Object)
- 返回指定集合中指定元素的出现次数

- 返回值
- int型

```java
int i = Collections.frequency(list, 33);
```

---

> Collections.copy(List dest, List src)
- 将src中的内容复制到dest(目的地的意思)中
 
**注意：**
- 该方法必须 在创建dest的时候指定和src的长度一样才可以
- 否则报错Source does not fit in dest

```java
// 使用这种方式创建List
List dest = Arrays.asList(new Object[src.size()]);
```

- 返回值
- void 


> 错误的用法演示
```java
// 创建一个dest
List dest = new ArrayList();

// 将list中的数据copy到dest中
Collections.copy(dest, list);

// 报错： Source does not fit in dest
System.out.println(dest);
```
- 如果按照测试1中的逻辑写会报错
- Source does not fit in dest
- 原因:
- copy方法底层源码中是判断两个List中元素的个数
- 如果源中元素的个数要大于目标List中元素的个数 就会报这样的异常
```java
 if (src.size() > dest.size())
  throw new IndexOutOfBoundsException("Source does not fit in dest");
```

- 也就是说 我们在创建dest List的时候要将它的内部元素的个数撑起来

- 那我们可以这么做么？
```java
// 不行 这样dest.size()还是0
List dest = new ArrayList(list.size());
```

> 标准写法:
```java
List list = new ArrayList();
list.add(123);
list.add(33);
list.add(33);
list.add(-3);
list.add(66);
list.add(1);

System.out.println(list);
System.out.println("******");


// 我们使用这种方式 有list长度的元素 元素是null
List dest = Arrays.asList(new Object[list.size()]);

// 这时候 dest.size() == list.size()

Collections.copy(dest, list);
System.out.println(dest);
```

---


> Collections.replaceAll(List list, Objecet oldVal, Object newVal)
- 将给定List中的 给定旧值全部替换为新值

- 返回值:
- boolean 用来看看替换成功与否吧

```java
boolean b = Collections.replaceAll(list, 33, 66);
System.out.println(list);
System.out.println(b);

// 结果:
[123, 33, 33, -3, 66, 1]
******
[123, 66, 66, -3, 66, 1]
true
```

---

> 解决线程安全的问题：
- Collections类中提供了多个 synchronizedXxx()方法
- 该方法可以使指定集合包装成线程同步的集合 从而可以解决多线程并发访问集合时的线程安全问题

- 我们前面说了 ArrayList 和 HashMap 他们的线程都不安全

- 如果我们在使用这两个类的时候涉及到了线程安全问题的时候

> Collections.synchronizedCollection(Collection)

> Collections.synchronizedList(List)
> Collections.synchronizedMap(Map)
> Collections.synchronizedSet(Set)

> Collections.synchronizedSortedMap(SortedMap)
> Collections.synchronizedSortedSet(SortedSet)

- 上面返回得对应结构就是线程安全的

```java
List list = new ArrayList();
list.add(123);
list.add(33);

// 这个list1就是线程安全的
List list1 = Collections.synchronizedList(list);
```

---

> 练习:
- 1. 请从键盘随机输入10个整数保存到List中 并按倒序 从大到小的顺序显示出来


- 2. 请把学生名与考试分数录入到集合中 并按分数显示前三名成绩学员的名字
<!-- 
  - TreeSet(Student(name, score, id)) 
-->


- 3. 姓名统计
- 一个文本文件中存储着北京所有高校在校生的姓名 
- 格式如下:

- 每行一个名字 姓与名以空格分隔
- 张 三
- 李 四
- 王 小五

- 现在想统计所有的姓氏在文件中出现的次数 请描述一下你的解决方法


- 4. 对一个java源文件中的关键字进行计数
- 提示:
- java源文件中的每一个单词 需要确定该单词是否是一个关键字 
- 为了高校处理这个问题 将所有的关键字保存在HashSet中 
- 用contains()来测试

```java
File file = new File("Test.java")
Scanner scanner = new Scanner(file)
while(scanner.hasNext()) {

  // scanner通过它 可以取出一个个的单词
  String word = scanner.next()
  Sout(word)
}
```

----------------------------

### Java版的数据结构简述
- 数据结构涉及到的内容包含
- 1. 数据的逻辑关系
- 2. 数据的存储结构
- 3. 排序算法
- 4. 查找 搜索 等

- 简单来说：
- 数据结构 就是一种程序涉及优化的方法 目的是加快程序的执行速度 减少内存的占用空间

> 数据之间的逻辑结构
- 1. 集合
    - 数据元素之间只有'同属于一个集合'的关系

- 2. 线性关系
    - 数据元素之间存在一个对一个的关系(前面的一个元素指向后面的一个元素)
    - 对应java中的线性表: 顺序表 链表 栈 队列

- 3. 树形结构
    - 数据元素之间存在一个对多个的关系
    - 对应java中的树: 二叉树

- 4. 网状结构(或图状结构)
    - 数据元素之间存在多个对多个的关系
    - 对应java中的图


> 数据的存储结构(物理结构)
- 1. 真实结构
- 最基本的存储结构 在内存中就是有这些结构的

- 1. 线性表之顺序表(或静态数据结构)
- 数组Array ArrayList
<!-- 
  顺序表: 
  顺着一个挨一个的去存
  -->

> 顺序表的特点:
- 1. 使用连续分配的内存空间
- 2. 一次申请一大段连续的空间 需要事先声明最大可能要占用的固定内存空间

- 优点：
- 涉及简单 读取与修改表中任意一个元素的时间都是固定的

- 缺点：
- 1. 容易造成内存的浪费
- 2. 删除或插入数据需要移动大量的数据


> 2. 线性表之链表(动态数据结构)
- LinkedList

- 特点：
- 1. 使用不连续的内存空间
- 2. 不需要提前声明好指定大小的内存空间 一次申请一小块内存 按需申请

- 优点：
- 1. 充分节省内存空间
- 2. 数据的插入和删除方便 不需要移动大量数据

- 缺点：
- 1. 设计此数据结构较为麻烦
- 2. 查找数据必须按顺序找到该数据位置

--- 

- 2. 抽象结构
- 1. 栈
- 2. 队列
- 3. 树
- 4. 图
- 5. 其他

----------------------------

### 泛型 (Generic) jdk5.0后的新特性
- 泛型：
- 我们首先可以把泛型理解成标签(中药铺抽屉上的标签)

- 比如：
- 中药店 每个抽屉外面贴着标签
<!-- 
  这个抽屉也相当于一个容器 就像java中的集合一样
  抽屉上贴着标签 不用打开 我们也能知道它里面放的是什么东西

  我们要是找的话 通过标签就能知道里面是什么

  ---

  我们前面说的ArrayList 比如我们往里面添加数据会调用add(Object o)

  add()的参数是Object类型也就是说我们什么都能往里面丢 这其实是一种弊端

  严格是一件好事 比如原生数组 一个数组中只能放一种类型的数据 这样是好事 能避免漏洞

  ArrayList这时候什么都能放了 但是控制起来就不严格了
  比如我们想往ArrayList中装学生的成绩 但是因为太灵活就可能往里面装入别的类型数据了

  jdk5.0之前什么类型都可以往里面装 没有什么类型的限制

  jdk5.0之后 我们加入了泛型的概念 再往里面添加数据的时候限制它的类型

  就相当于我们给集合添加了一个标签 我们可以集合添加了 <大黄> 的标签后 里面就不能放别的东西
 -->


> 泛型的概念
- 把元素的类型设计成一个参数 这个类型参数叫做泛型
- 所谓泛型 就是允许在 定义类, 接口时 通过一个标识表示类中某个属性的类型 或者 某个方法的返回值 及 参数类型

- 这个类型参数将在使用时确定
<!-- 
  使用时:
  继承或实现这个接口 用这个类型声明变量 创建对象

  确定时
  即传入实际的类型参数 也成为类型实参
 -->


> 没有泛型的引发的问题
- 没有泛型之前的情况演示:
- 需求：
- 我们要将学生的成绩放入集合中 然后取出放入到变量里面
```java
ArrayList list = new ArrayList();

// 存放学生考试成绩
list.add(78);
list.add(88);
list.add(98);

// 问题1: 类型不安全 混进入了其它类型的数据
list.add("Tom");
```

- 由于ArrayList没有类型限制在往集合中放数据的时候 可能会放入其它类型的元素

- *问题1*: 
- 类型不安全

- 接下来我们要遍历集合 把元素取出来装入变量中
- 我们前面也知道 我们该集合中存的都是学生的成绩
- 所以 很自然的就会将成绩装入到 int型的变量中

```java
for(Object score: list) {

  // 要点: 这里要将Object类型向下转型为int
  int studentScore = (int) score;
  System.out.println(studentScore);
}
```

- *问题2*: 
- 强转时有可能出现ClassCastException
- 上面的代码就会出现异常:
- ClassCastException
<!-- 
  因为一开始对存放的数据类型没有要求 有一个字符串 在转换的过程中 报转换异常的错误
 -->

- 为了避免上述的情况发生 我们要在往集合中填入元素的时候 做一下类型的检查

- 这个类型的检查就是泛型


> 总结:
- 没有泛型后续的操作中就要涉及到强转，有泛型后就可以避免强转


> 集合中泛型的简单使用
- 我们可以在类的 方法中 或者 属性中 和 构造器中 我们可以定义泛型
```java
public interator Iterator<E> { ... }
```

- 当我们实例化类或者接口的时候 凡是类中用到泛型的位置都是我们实例化时指定的类型

- 也就是我们声明类结构的时候 声明有泛型了 以后我们使用调用的时候才能用泛型 结构里面没有使用泛型 外面也没办法指明泛型的类型


**注意:**
- 我们指定的泛型的类型不能是基本数据类型
- 基本数据类型的情况下 我们可以使用它的包装类
```java
// 对
new ArrayList<Integer>();

// 错
new ArrayList<int>();
```

> 格式：
> new ArrayList<泛型类型>
- 然后下面用到该类型的地方都要使用这个标签
- 使用该<泛型>的地方只能使用该类型了 不然编译期就会报错

> ArrayList的演示
```java
// 这里我们不能指定泛型为int 因为我们往集合里面添加的类型都是对象
ArrayList<Integer> list = 
    new ArrayList<Integer>();

// 存放学生考试成绩
list.add(78);
list.add(88);
list.add(98);

// 编译时就会进行类型检查 保证数据的安全
// list.add("Tom");


// 因为我们使用泛型指定类型了 所以这里可以直接写Integer
for(Integer score: list) {
  // 避免了强转操作 不会出现类型转换异常的信息
  int studentScore = score;
  System.out.println(studentScore);
}


// 迭代器
- Iterator<Integer>这里能加 是因为定义该结构的时候 这个位置就有泛型
- public interface Iterator<E>

Iterator<Integer> iterator = list.iterator();
while (iterator.hasNext()) {
  System.out.println(iterator.next());
}

```

> HashMap的演示:
- 要点1:
- 我们使用的是HashMap Map类型有k v, 指明泛型的是时候我们要传入两个

- new HashMap<String, Integer>();
<!-- 
  能写几个泛型 完全是根据 该类在内部定义的时候 定义了几个
 -->

- 要点2:
- 泛型的嵌套
- 我们发现当我们调用 map.entrySet(); 方法的时候它的返回得结果这如下的

- Set<Map.Entry<String, Integer>>
- 首先entry返回的是Set 
- Set里面是一个Map.Entry
- Map.Entry里面是String Integer

- 解析:
- 首先我们调用 map.entrySet() 返回得类型是 Set

- 指明泛型 也就是Set里面装的是什么
- Set<Map.Entry>

- 然后也需要指明 Map.Entry 里面装的是什么
- Set<Map.Entry<String, Integer>>

<!-- 
  Map.Entry
  为什么要这么写

  因为Entry是Map里面定义的一个内部类 所以我们要想调用它的时候要通过父类.的形式
 -->

```java
// Map中涉及到kv 所以泛型中就有两个
Map<String, Integer> map = new HashMap<String, Integer>();

// 存放学生考试成绩
map.put("sam", 99);
map.put("erin", 98);

// 使用map.entrySet()方法 来进行遍历 我们获取entry
Set<Map.Entry<String, Integer>> entry = map.entrySet();

// Iterator<> 里面放的要遍历的类型首先是Map.Entry Entry也有泛型<String, Integer> 这里就是泛型的嵌套
Iterator<Map.Entry<String, Integer>> iterator = entry.iterator();

while (iterator.hasNext()) {

  Map.Entry<String, Integer> e = iterator.next();

  String key = e.getKey();
  Integer value = e.getValue();

  System.out.println(key + ": " + value);
}
```

> 总结: 在集合中使用泛型
- 1. 集合接口或集合类在jdk5.0时 都修改为带泛型的结构了

- 2. 在实例化集合类时 指明泛型类型 我们<>放的是类型

- 3. 指明完后 在集合类或接口中凡是定义类或接口时 内部结构使用到类的泛型的位置 都指定为实例化时泛型的类型

- 内部结构:
- 方法 构造器 属性等等
<!-- 
  // 类中声明的时候
  add(E e)

  // 实例化调用的时候
  add(Integer e)
 -->

 - 4. 注意:
 - 泛型的类型必须是类 不能是基本数据类型 需要用到基本数据类型的地方 需要拿包装类去替换

 - 5. 如果实例化时 没有指明泛型的类型 默认类型为Object类型


 > 泛型当中的新特性 -- 简写
 - jdk7中 可以简写
 - 标准写法:
 - Map<String, Integer> map = new HashMap<String, Integer>();

 - 简写形式: (省略掉后面的)
 - Map<String, Integer> map = new HashMap<>();
 

 > 练习
 - 我们将以前做过的EmployeeTest中 涉及到泛型的地方 我们做下修改

 - 对比一下改之前之后的区别点是什么？
 ```java
 TrssSet<Employee> set = new TreeSet<Employee>();
 ```


- Comparable接口也带泛型
- 该泛型可以导致我们的compareTo()方法传入的对象是什么类型

- 我们想比较谁就写谁 我们需要比较的是Employee的大小 所以就将泛型的类型声明为Employee
```java
public class Employee implements Comprable<Employee> {

  @Override
  public int compareTp(Employee o) {
    reture this.name.compareTo(o.name);
  }
}
```

----------------------------

### 自定义泛型类(自定义泛型结构)
- 泛型类
- 泛型接口

- 泛型方法

> 泛型类的定义和使用
- 我们自定义类的时候 有些属性的类型我们是可以确认的 比如下面那样
```java
public class Demo {
  String name;
  int age;
} 
```

- 但是有的时候 类中的属性 我们没有办法确认它的类型 这时候我们就可以给该类 贴个"标签"(上个泛型)
<!-- 
  我们给类声明一个泛型的时候 并不是说该类的类型是T

  而是 泛型相当于我们给类 传递了一个类型参数(变量)
  这样类中的结构就可以使用该类型参数

  当类实例化的时候 我们就能给这个泛型T 一个确切的类型

  这样类中使用泛型T的地方自动会变成给定类型
 -->

- 常用的泛型变量有
- 1. K V 通常代表key value
- 2. T E等

- 要点:
- 1. 当我们定义完泛型类 但是实例化的时候不指明泛型的类型 默认就是Object类型的

```java
package com.sam.exer;

// 给类传递一个 T类型
public class Order<T> {

  // 当属性可以确定类型的时候
  String orderName;
  int orderId;

  // 当属性不能确定类型的时候 我们可以使用泛型
  T orderAttr;

  public Order() {}

  public Order(String orderName, int orderId, T orderAttr) {
     this.orderName = orderName;
     this.orderId = orderId;
     this.orderAttr = orderAttr;
  } 

  // 返回得类型是T
  public T getOrderAttr() {
    return this.orderAttr;
  }

  // 形参的类型也是T
  public void setOrderAttr(T orderAttr) {
    this.orderAttr = orderAttr;
  }
}
```

> 泛型自定义类的实例化
- 要点:
- 1. 如果定义了泛型类 但是实例化没有指明类的泛型类型 则认为此泛型类型为Object类型的

- 2. 如果定义类是带泛型的 建议实例化的时候要指明类的泛型类型

```java
    // 没有指明泛型类型的情况 --- 不推荐
    Order order = new Order();

    // 我们可以给orderAttr设置为任意值
    order.setOrderAttr("ABC");
    order.setOrderAttr(123);


    // 指明泛型的类型为String
    Order<String> order = new Order<>();
    order.setOrderAttr("BBB");

    // 下面的因为我们上面已经指明了泛型的类型是String 所以就不能存123
    // order.setOrderAttr(123);   // 报错
```


> 泛型类的子类如何处理泛型
- 上面我们定义了一个Order的泛型类，现在SubOrder要继承于Order 看看我们怎么写

> 情况1:
- 子类在继承泛型父类的同时 指明了泛型类型
- 那么该类就是一个普通的类了 实例化的时候 不用再指明泛型类型

```java
// 父类
public class Order<T> { ... }


// 子类
// 子类在继承泛型父类的同时指明了 泛型为 Integer
public class SubOrder extends Order<Integer> {

}


// 测试类
// 因为子类在继承的同时已经指明了泛型的类型 所以在new的时候就不用再指明了
SubOrder sub = new SubOrder();
sub.setOrderAttr(12);
```

> 情况2:
- 子类继承父类的同时 没有指明泛型类型 沿用了<T>
- 先关注下写法 子类类名 和 父类类名的后面都要写<T> 类似沿用的意思吧

- 这种情况下 子类仍然是一个泛型类 就意味着子类在实例化的时候需要指明泛型的类型
```java
public class SubOrder<T> extends Order<T> {

}
```


> 自定义泛型类和泛型接口的注意点
- 1. 泛型类的泛型可能有多个参数 此时应将多个参数一起放在尖括号内
<!-- 
  <T1, T2, T3>
 -->


- 2. 泛型类的*构造器*如下
- public GenericClass() {}
<!-- 
  // 错误的写法:
  public GenericClass<T>() {}

  - 泛型参数是使用在 class 类名<> 这里
 -->


- 3. 实例化后 操作原来泛型位置的结构必须与指定的泛型类型一致


- 4. 泛型不同的引用不能相互复制
- 尽管在编译时ArrayList<String> 和 ArrayList<Integer>是两种类型 但是 在运行时只有一个ArrayList被加载到jvm中

```java
ArrayList<String> list1 = null;
ArrayList<Integer> list2 = null;

// 原来的时候list1 和 list2 都是List类型的 那么 list1 = list2 list2可以赋值给list1
list1 = list2;  // 报错

// 现在list1 list2虽然都是ArrayList 但是此时它们之间不能相互赋值
```


- 5. 泛型如果不指定 将被擦除 泛型对应的类型均按照Object处理 但不等价于Object(还是有一些区别 在继承方面)
<!-- 
  经验:
  泛型要使用一路都用 要不用 一路都不要用
 -->


- 6. 如果泛型结构是一个*接口或抽象类* 则不可创建泛型类的对象


- 7. jdk1.7 泛型的简化操作
- ArrayList<Fruit> flist = new ArrayList<>()


- 8. 泛型的指定中不能使用基本数据类型 可以使用包装类替换


- 9. 在泛型接口 和 泛型类时 *在静态方法中不能使用类的泛型*(不能使用泛型修饰的结构 也就是说不能属性泛型修饰的属性)
- 
<!-- 
  在类/接口上声明的泛型 在本类或本接口中即代表某种类型

  可以作为
      非静态属性的类型
      非静态方法的参数类型
      非静态方法的返回值类型

  但是静态方法中不能使用类的泛型!!!
 -->

```java
public class Order<T> {

  String orderName;
  int orderId;
  
  // 泛型修饰的结构
  T orderAttr;

  // 成员方法
  // 可以正常使用 泛型修饰的变量 orderAttr
  public void show() {
    System.out.println(orderAttr);
  }

  // 静态方法
  // 静态方法中使用 泛型修饰的变量 就会报错
  public static void show() {
    System.out.println(orderAttr);
  }
}

```

- 原因:
- 类的泛型是在实例化的时候才会指定
- 而静态的结构在类加载的时候就会被指定 静态结构早于对象的创建 相当于 你的类型还没指定呢 我这边就要用了


- 10. 异常类不能是泛型的
```java
// Exception是一个异常体系 我们让MyException是异常体现下面的结构 -- 会报错
public class MyException<T> extends Exception {}
```

- 11. 不能使用 new E[] 也就是说不能new一个泛型数组
- 但是可以通过如下的方式来办到 也就是先new Object然后强转成泛型数组

- 但是可以: E[] elements = (E[]) new Object[capacity]
- 参考:
- ArrayList源码中声明: Object[] elementData 而非泛型类型数组

```java
// 我们想声明一个T类型的数组 怎么写呢？
// 写法错误 
T[] arr = new T[10];    // 编译不通过
// 原因
// 只有具体的东西才能new来操作 而我们的T还是属于一个变量 是一个参数

// 正确写法:
T[] arr = (T[]) new Object[10];
// 我们可以这么做 new一个Object类型的 然后指定长度 然后强转成泛型数组

// 我们在往数组里面装数据的时候必须是new的T或者是T的子类对象
```


- 12. 父类有泛型 子类可以选择保留泛型也可以选择指定泛型类型

- 子类不保留父类的泛型: (子类继承的时候指明)
  - 没有类型 -- 擦除
  - 具体类型

- 子类保留父类的泛型: 泛型子类
  - 全部保留
  - 部分保留

- 结论:
- 子类必须是"富二代" 子类除了指定或保留父类的泛型 还可以增加自己的泛型

```java
// 泛型父类
class Father<T1, T2> { ... }


// 子类不保留父类的泛型
// 1. 没有类型 -- 擦除 
class Son extends Father { ... }

// 2. 具体类型
class Son extends Father<Integer, String>



// 子类保留父类的泛型
// 1. 全部保留
class Son<T1, T2> extends Father<T1, T2>

// 2. 部分保留
class Son<T2> extends Father<Integer, T2>
```


- 更复杂的一些情况
```java
// 泛型父类
class Father<T1, T2> { ... }

// 子类不保留父类的泛型
// 1. 没有类型 -- 擦除
class Son<A, B> extends Father { ... }
  // 但子类自己定义了新的泛型


// 2. 子类指定了父类的泛型参数 自己额外又定义了两个泛型参数
class Son<A, B> extends Father<Integer, String>


// 子类保留父类的泛型 和 部分保留
class Son<T1, T2, A, B> extends Father<T1, T2>

class Son<T2, A, B> extends Father<Integer, T2>
```

----------------------------

### 泛型方法
- 上面我们介绍了泛型类 泛型接口 这里我们说说泛型方法

- 应用场景
- 在方法中有不确定的类型 我们调用方法的时候再指明类型是什么 就使用泛型方法

- 通过传递一个实参指明方法中的方形类型


- 泛型方法并不是说类中的方法中使用泛型就叫做泛型方法
- 比如
- Collection接口 会有下面的方法 但这不是泛型方法
```java
boolean add(E e);
```


> 泛型方法的格式
- 我们看看什么是泛型方法
```java
权限修饰符 <T> T[] toArray(T[] a) { ... }
```

- 我们泛型类定义的泛型参数是<E>的话 那么类中使用E的地方肯定不是泛型方法

> 泛型方法的应用场景
- *方法的返回值的类型不确定 我们才考虑使用泛型方法*


> 泛型方法:
- 在类中的方法中出现了泛型的结构 *方法的泛型参数与类的泛型参数没有任何关系* 泛型方法所属的类是不是泛型类都没有关系(泛型方法属于独立的)
<!-- 
  - 泛型方法是额外的有一个新的标识了 跟类的泛型参数<E>没关系

  - 或者换个说法 泛型方法所属的类或者接口是不是带泛型的没有关系 无所谓
 -->

- 泛型方法中的泛型类型参数的确定 是通过我们调用方法传入一个具体类型的实参的时候 决定的

- 举例说明:
- 需求:
- 我们创建一个方法 通过形参将传递进来的数组中的每一个元素复制到List中

```java
public List ListcopyFromArrayToList(arr);
```

- 这时候就有一个问题 数组是什么类型呢？ 它可以是int String boolean都可以 什么类型都可以

- 这时我就想把数组定义成泛型 那形参数组定义成泛型 那该方法的返回值的类型也应该是泛型
```java
public List<E> ListcopyFromArrayToList(E[] arr);
```

- 但是还是会报错，编译器不会把你认为是一个泛型参数 它会认为E[]是一个类型 跟String没区别 编译器会认为你有一个类就叫做E 其实不是 我们的E是一个变量 回头我们调的时候才确定类型

- 所以 就想我们要使用变量要先声明一样
- 我们要在最前面声明一个<E> 这样后面才能用该泛型参数
```java
public <E> List<E> copyFromArrayToList(E[] arr) { ... }
```

> 完整的方法
```java
// 泛型方法 要在最开始先声明泛型
public <E> List<E> copyFromArrayToList(E[] arr) {
  // 创建一个list 指明泛型结构
  ArrayList<E> list = new ArrayList<>();

  // 遍历这个数组 将这个数组中的每一个元素取出来放到list中
  for(E e: arr) {
    list.add(e);
  }
  return list;
}
```

- 使用:
```java
public void test() {
  // 创建当前类的对象 通过该对象来调用方法
  Order<String> order = new Order<>();

  // 创建一个数组
  Integer[] arr = new Integer[] {1, 2, 3, 4 ,5};

  // 返回得就是Integer类型的List 这个Integer是由我们让入的arr决定的
  List<Integer> list = order.copyFromArrayToList(arr);
}
```

> 总结：
- 1. 泛型方法在调用时 指明泛型参数的类型

- 2. 泛型方法的声明泛型参数要*放在方法返回值类型的前面* public等修饰符的后面
```java
权限修饰符 <泛型参数> 返回值类型<泛型参数> 方法名(形参类型<泛型参数> 形参变量) { 方法体 }
```

- 3. 前面说了类中的方法如果声明为static 那就不能在该方法里面使用类的泛型结构

- 泛型方法可以被声明为静态的 原因泛型参数是在调用方法的时候确定的 并非在实例化类时才确定

```java
public static <E> List<E> copy(E[] arr)
```
- 原因：
- 因为泛型方法中的泛型参数跟类没有关系 *泛型方法的确定是在方法被调用的时候确定的*

----------------------------

### 泛型类 和 泛型方法 的使用场景
- 什么时候我们需要用到泛型类 和 泛型方法？

> 泛型类
- 泛泛的说下后期慢慢的总结:
- 当类不知道是针对什么创建的对应结构的时候 我们考虑使用 泛型类

- 举例：
- 数据库中的每一张表会对应着java层面的一个类 
<!-- 
  比如:
    数据库中的 Customer 表 就对应着 java中 Customer 类
 -->

- 我们通过类来对数据库中的表进行增删改查等操作
<!-- 
  比如:
    向表中添加一条记录就是造这个类的一个对象
    向表中删除一条记录就是删除这个类的对象...
 -->

- 在完成对数据库表的操作的时候 我们使用下面的逻辑 逻辑中就体现了泛型的概念


> 结构:

    | -- DAO  (封装着对数据库表的 通用的 增删改查等操作)
        | -- XxxDAO  (继承DAO操作具体的某一张表 如CustomerDAO)
    
    | -- Customer  (该类用于映射数据库中的一张表 如Customer)


> DAO：
- data(base) access object 数据访问对象

- DAO相当于一个base 用来封装通用的操作 使用的时候我们造DAO的子类来操作具体的某一张表 怎么才能体现操作某一张表呢？ 继承父类的同时指定泛型参数类型



> DAO类中为什么要使用泛型:
- 既然我们要定义DAO这样的一个基本结构 里面封装对表的增删改查等操作
- 那我们到底要操作哪一张表呢？ 确定所以我们要使用泛型


> 具体解析:
- 1. Customer类
    - 该类用于映射数据库中的一个表 类中的属性可以参照数据库表中的字段


- 2. DAO类
    - 1. 该类用于封装操作数据表的通用操作
    - 2. 该类要使用泛型 继承该类的子类 指明泛型类型 这样在后续的添加 修改等操作 会是对指定的表进行操作

```java
// 我们指明了泛型 这样添加等操作 只能对指定类型进行操作
public class DAO<T> {

  // 添加一条记录
  public void add(T t) {
    System.out.println("添加逻辑");
  }

  // 删除一条记录
  public boolean remove(int index) {
    System.out.println("删除逻辑");
    return true;
  }

  // 修改一条记录
  public void update(int index) {
    System.out.println("修改逻辑");
  }

  // 查询一条记录
  public T get(int index) {
    System.out.println("查找逻辑");
    return null;
  }

  // 查询多条记录
  public List<T> getAll(int index) {
    System.out.println("查找小于index的所有数据");
    return null;
  }
}
```

- 3. CustomerDAO类
- 继承DAO类的同时 指定泛型类型 那么通过该类的实例对象调用的方法 只能操作指定的类型
```java
public class CustomerDAO extends DAO<Customer> {
  // 由于我们这个类是继承DAO的 那么DAO中那些通用的操作数据库的方法 就会被继承过来
}
```

- 4. 测试类
```java
@Test
public void test() {

  // 我们造一个CustomerDAO 用于专门操作数据库的某一张表
  CustomerDAO customerDAO = new CustomerDAO();

  // 这时候我们add(Customer t) 只能添加Customer 也就是说这个customerDAO 只是用来操作Customer的
  customerDAO.add(new Customer());

  // 得到List也是Customer类型的List
  List<Customer> list = customerDAO.getAll(2);

  // 得到的一个对象也是 Customer 类型的对象
  Customer customer = customerDAO.get(1);
}
```

- 比如我们还要操作student表 那么首先我们就创建一个student的类 类中的属性就参照数据库中表的字段 然后我们创建一个StudentDAO 继承 DAO的同时 指明泛型参数的类型 就是Student 这样我们创建StudentDAO的对象 然后调用方法的时候 只能操作student表了

- 后续我们有必要把一个类设计成泛型的 因为有不确定性


> 泛型方法:
- 首先泛型方法的泛型参数跟类的泛型没有关系
- 因为方法的返回值的类型不确定 所以方法才定义成一个泛型方法

- 举例: 
- 泛型方法因为有不确定性 因为不确定性我们才写成M的 那就意味着调用的时候可能有多种情况

- 比如 我们要获取表中一种有多少条记录 -- long
- 比如 获取最大的员工的入职时间 -- Date

```java
public <M> M getValue() {
  return null;
}
```

----------------------------

### 泛型在继承方面的体现
- 回顾:

- 继承的特点:
- 正因为子类是继承父类的 子类的对象可以赋值给父类的引用

```java
Object obj = null;
String str = null;

// 这时候是可以相互赋值的 因为String是子类 Object是父类
// 我们可以把子类的对象赋值给父类的引用 -- 多态的体现
obj = str;

---

// 数组也是这样
Object[] arr1 = null;
String[] arr2 = null;

// 这样也是对的
arr1 = arr2;
```

- 如果我们看到一个方法 方法的形参是Object类型的数组 那么这时候我们也可以把String[]也放进去 这也是多态的体现


- 情况1:
- 现在有这样的一个情况 这样可以么？
```java
List<Object> list1 = null;
List<String> list2 = null;

list1 = list2;    // 不行

// 这样相当于下面 我们将一个date类型的赋值给str类型
Stirng str = new Date();
```

- 情况1的报错原因:
```java
List<Object> list1 = null;
List<String> list2 = null;
```
- list1和list2 是完全没有子父类关系的 是完全并列的关系
- String确实是Object的子类但是List<String>类和List<Object>类 本身是没子父类关系的


> 反证法
- 假设 list1 = list2 是可以的
```java
List<Object> list1 = null;
List<String> list2 = new ArrayList<String>();

// 如果下面的情况是可以的
list1 = list2

list1.add(123);  // 导致混入给String类型的数据
```

- 那就会发生这样的问题
- list2是在堆空间中有一个实体 是String[]
- 如果我们将list2赋值给list1 list1就可以往数组中添加元素 但是list1是Object类型的 也可以添加个123进去 

- 这样就混进去了不同类型的元素 所以不行

- 我们看看下面的这种情况
```java
// 如果我们这定义方法 方法的通用性不会很好
public void show(List<Object> list) {

}

// 因为这里只能传入List<Object>类型的list
show(list1);

---

// 如果我们还想往里放list2 那就必须另外创建一个方法
public void show2(List<String> list) {

}

show2(list2);
```


- 类本身是子父类关系的时候 两者之间是可以相互赋值的
```java
List<String> list1 = null;
ArrayList<String> list2 = null

// 这时候是可以的
list1 = list2
```

> 总结:
- 虽然 类A 是 类B 的父类 但是G<A> 和 G<B> 二者不具备子父类元素 二者属于并列关系

- 类A 是 类B 的父类 A<G> 是 B<G>的父类

- 能不能赋值我们看的是<>外面的部分, 是不是子父类的关系 
- 而不是看泛型部分 <>里面

----------------------------

### 通配符的使用
- 上面我们说了 下面这种情况 他们之间是没有子父类关系的
```java
List<Object> list1 = null;
List<String> list2 = null;

public void show(List<Object> list) {

}
public void show2(List<String> list) {

}
```

- 那可能就会导致在开发中具有不便性
- 比如上面的show方法 内部就是相对List的遍历 可以上面还需要造两个方法show show2 因为传参的时候只能传指定类型的参数

- show只能传递Object类型的list
- show2只能传递String类型的list

- 现在的list1 和 list2没有子父类关系了 也就是没有多态的特性的(子类可以直接丢进去) 

- 如果没有多态就会导致我们要写很多重载的方法

- 上面就是泛型的部分不一样 那能不能通用下？
- 或者我们想想多态的使用 形参如果定义为父类型 那么子类都可以丢进到形参里面

- 也就是说 我们如果找到 下面list1 和 list2的共同父类 用通过父类作为形参 那么list1 和 list2都能丢到形参里面去
```java
List<Object> list1 = null;
List<String> list2 = null;
```

- 这样定义的方法更具有通用性


> 这里我们就要使用 -- 通配符 <?>
- 泛型<Object> 泛型<String> 的共同父类 <?>

```java
List<Object> list1 = null;
List<String> list2 = null;

// 那是不是说我们要先定义这样的一个结构
List<?> list = null;

// 相当于List<?>就是list1 和 list2的共同父类了
list = list1;
list = list2;


// 这时我们就可以定义一个通用的方法
public void show(List<?> list) {

  // 遍历的类型就是 <?> 
  Iterator<?> iterator = list.iterator()
  while(iterator.hasNext()) {

    // 返回的元素的类型定义成 ? 不行 但是我们可以定义成Object
    Object obj = iterator.next();
  }
}
```

> 总结:
- 类A 是 类B是父类 G<A>和G<B>是没有关系的 二者共同的父类时 G<?>

----------------------------

### 使用 通配符后数据的读取和写入要求
```java
List<Object> list1 = null;
List<String> list2 = null;

public void show(List<Object> list) { ... }
public void show(List<String> list) { ... }
```

- 
- 在上一节中 我们遇到上面的情况 只能定义很多重载的方法
- 所以我们想定义一个方法 想让这个方法更加的通用 能够让给这个方法传入不同的泛型类型

- show(A类型<T>)
- show(A类型<B>)
- show(A类型<E>)

- 为了能使用同一个show方法 传入不同的泛型类型
- 找到了 A类型<T> A类型<B> A类型<E> 的父泛型 --> A类型<?>

- 我们将形参定义为 List<?> 这样这个方法就可以传递任意泛型了
- public void show(List<?> list) { ... }

- 但是当我们定义了 List<?> list 后
- 我们通过list对象调用方法的时候 会有要求

> 要求1:
- List<?> list

- 添加(写入) 
- 1. 我们通过 list 存储/添加/写入 的时候 会报错

- 获取(读取)
- 2. 我们通过 list 读取 的时候 可以 读取到的数据类型为Object

```java
List<Object> list1 = null;
List<String> list2 = null;

// 创建一个父泛型 这样说可以么？
List<?> list = null;

// 堆空间中有了一个ArrayList
List<String> list3 = new ArrayList<>();

// 想ArrayList中添加数据
list3.add("AA");
list3.add("BB");
list3.add("CC");

// 这样相当于list也指向了堆空间中的ArrayList(list3也指向它)
list = list3;

// 思考： 
// 我们可以通过 list(父泛型对象) 想ArrayList中添加数据么？
list.add("DD"); 
    // 报错 说你现在是个？ 不能添加String类型的数据
```

> 总结:
- 我们使用通配符的情况下 List<?> list 就不能通过list对象向堆空间的结构里面添加数据了

- list.add(null) 唯一可以添加null


- 获取(读取) 允许读取数据 读取的数据类型为Object
```java
// 思考:
// 我们可以通过 list 获取数据么？
Object o = list.get(0);
System.out.println(o);
```

> 总结：
- 可以获取数据 获取的数据类型为Object


> 总结通配符的使用
- 使用类型 通配符: ?
<!-- 
  比如: List<?>  Map<?>

  List<?>是List<String> List<Object>等各种泛型List的父类
 -->


> 有限制条件的通配符
- <?> 允许所有泛型的引用调用

- 作用:
- *用来规定 ? 类型的范围*


> 通配符指定 上限
- 上限extends:
- 使用时指定的类型必须是继承某个类 或者实现某个接口
- *即 ?类型 <= XXX*


> 通配符指定 下限
- 下限super:
- 使用时指定的类型不能小于操作的类
- *即 ? >= XXX*


> 举例:
- <? extends Number>    (无穷小, Number]
- 只允许泛型为Number以及Number *子类* 的引用调用

- <? super Number>      [Number, 无穷大)
- 只允许泛型为Number以及Number *父类* 的引用调用

- <? extends Comparable>
- 只允许泛型为实现Comparable接口的 *实现类* 的引用调用


> 记忆技巧
- ? 可以看做数学中的 负无穷 和 正无穷
- 小到任何一个非常小的子类 大到没有界限 


- <? extends Person>
- ? 是一个不确定的 
- extends 说明 ? 可以是 Person 子类
- 或者 将extends看做是 <=
- ? <= Person

> <? extends Person> 读取数据的时候
```java
List<? extends Person> list1 = null;
```
- 当我们通过list1.get(0)读取索引位置的数据的时候 得到的结果 我们可以使用 Person/Object来接收
```java
Object p = list1.get(0);
Person p = list1.get(0);
```
- 因为 ? extends Person 相当于
- ? <= Person
- ?类型的范围不能大于Person 所以我们拿Person和Object来接收都可以


- <? super Person>
- 将super看做是 >=
- ? >= Person


> <? extends Person> 写入数据的时候
```java
List<? extends Person> list = null;
list.add(new Student());  // 会报错
```
- 不可以 编译不通过

- 原因：
- ?表示 (-负无穷, Person]

- 因为 ? 表示负无穷 它可能无限小 如果?代表的是比Student还小的
- 子类B 子类A Student Person

- 万一我们？代表的是子类A 而我们传递了一个Student 传递了一个父类 这样就不对了 右边的不能赋值给左边的


> <? super Person> 读取数据的时候
```java
List<? super Person> list1 = null;
```

- 当我们通过list1.get(0)读取索引位置的数据的时候 得到的结果 只能用Object来接收 Person也不行 因为Person是最小的一种情况
```java
Object p = list1.get(0);
```

> <? super Person> 写入数据的时候
- 写入是ok的 不能超过Person的都可以
- 有个底儿 底是Person 或者是Person的子类都可以

```java
List<? super Person> list = null;
list.add(new Student());  // 可以
list.add(new Person());   // 可以
```

----------------------------

### 自定义泛型类的练习
> 1. 定义个泛型类DAO<T> 
- 在其中定义一个Map成员变量 Map的键为String类型 值为T类型

- 分别创建以下方法
- public void save(String id, T entity):
- 保存T类型的对象到Map成员变量中

- public T get(String id)
- 从map中获取id对应的对象

- public void update(String id, T entity)
- 替换map中key为id的内容 改为entity对象

- public void delete(Stirng id)
- 删除指定id对象

```java
// 定义DAO泛型类 传入泛型参数
public class DAO<T> {

  // 成员变量中使用类的泛型key:String value:T
  private Map<String, T> map;

  // 保存T类型的对象到Map成员变量中
  public void save(String id, T entity) {
    map.put(id, entity);
  }

  // 从 map 中获取id对应的对象
  public T get(String id) {
    // 没找到的话本身会返回null
    return map.get(id);
  }

  // 替换map中key为id的内容 改为entity对象
  public void update(String id, T entity) {
    // 这么写稍微差点意思 逻辑不完整
    // map.put(id, entity);

    if(map.containsKey(id)) {
      map.put(id, entity);
    }
  }

  // 返回 map 中存放的所有T对象
  public List<T> list() {
    // 我们把所有的value取出来

    // 下面这种写法可以么? 不行！！
    // Collection<T> values = map.values();
    // return (List<T>) values;


    // 正确的将values取到后遍历下 装到一个List中
    // ArrayList<T> list = new ArrayList<>(); 这样也行 没什么区别
    List<T> list = new ArrayList<>();
    Collection<T> values = map.values();

    for(T t: values) {
      list.add(t);
    }
    return list;
  }

  // 删除指定id对象
  public void delete(String id) {
    map.remove(id);
  }
}
```

> 对上要点:
- 强转中发现的关键点： 强转要先上(多态)后下(强转)
- 不能直接从上直接转到下 需要一个过程

- 在上面的 public List<T> list() 方法中 我们要将所有的T对象装到一个List中然后返回 我们可能会定义下面的方法

```java
public List<T> list() {
  // 这样是错误的写法
  Collection<T> values = map.values();
  return (List<T>) values;
}
```

- 强转操作:
- 比如本身是A类型 我们要先升成B类型(多态上去了) 
- 然后我们才可以强转下来 -- 强转要先上后下 
<!-- 
  比如:
    我们造的就是一个Object 然后我们需要一个Person 
    然后我们把Object强转成Person 这样是肯定错的 
    
    这里也是一样values()返回得就是Collection 
    不是说values()返回得是List 我们把List又赋值给Collection了 
    
    然后Collection强转成List 如果真是这样那ok 
    
    但现在我们values()返回得就是一个Collection 我们非要把它强转成List 肯定不对


  另外我们还可以这样理解:
    map中的values是无序的 可重复的 我们直接转成一个List List是有序的
 -->


> 2. 定义一个User类
- 该类包含:
- private成员变量(int 类型) id age name

```java
// 一会实例化DAO的时候 我们就会将T认为是User了 由于T是存放在map当中了 通常User需要提供equals()
@Override
public boolean equals(Object o) {
  if (this == o) return true;
  if (o == null || getClass() != o.getClass()) return false;

  User user = (User) o;

  if (id != user.id) return false;
  if (age != user.age) return false;
  return name != null ? name.equals(user.name) : user.name == null;
}

@Override
public int hashCode() {
  int result = id;
  result = 31 * result + age;
  result = 31 * result + (name != null ? name.hashCode() : 0);
  return result;
}
```


> 测试类
```java
public class DAOTest {
  public static void main(String[] args) {
    // 因为是泛型类 首先要指明泛型参数
    DAO<User> dao = new DAO<>();

    // 我们调用save()的之前要确保map实例化了 不然会报空指针 因为我们要将User放入map里面但是 Map还没有实例化
    dao.save("1001", new User(1001, 33, "周杰伦"));
    dao.save("1002", new User(1002, 22, "周杰"));
    dao.save("1003", new User(1003, 11, "周华健"));

    // 修改
    dao.update("1003", new User(1003, 55, "方文山"));

    
    // 调用list()
    List<User> list = dao.list();
    // java8 新特性来遍历
    list.forEach(System.out::println);
  }
}
```

----------------------------

### IO流
- I: input 输入
- O: output 输出

- 这章里面涉及到的主要问题就是文件的传输 数据的持久化 那就需要我们将内存中的数据存储到硬盘上 以txt jpg avi等格式存储起来 
<!-- 
  IO流之前的部分涉及到的知识点都是将数据存储在内存中 jvm或者电脑关闭后 数据就没了
 -->

- *站在内存层面谈*
- 内存层面 - 写入到 - 具体文件(持久化层面): 叫做 输出
- 具体文件 - 读取到 - 内存层面: 叫做 输入

- 因为 输入 输出 分很多种情况(操作数据的特点不一样) 每种情况可能要对应一种流 所以这章里面会涉及到很多的流

- 在介绍各种流之前 我们要先说一个 File类
<!-- 
  比如:
     A                 B
    -------           -------
    内 存               .txt

    我们要将
    内存中的数据 写到 文件中    或者
    将文件中的数据 读到 内存里

    - 这时候我们要有一个端点(.txt) 从哪读进来 或者 写出到哪
    - 从哪读到内存中 从内存中写到哪个文件里面去

    - 这个端点是一个文件 
    
    - 在java层面就是一个对象 这个文件在java内存层面要拿一个类的对象去充当 这个对象就是File类型的

    .txt文件我们就用一个File类的对象去充当

    - File类的对象不光能充当文件 还可以表示一个文件目录
 -->

----------------------------

### File类
- File类的一个对象 代表一个 *文件* 或 *文件目录(文件夹)*
- File类声明在java.io包下


> 创建File类实例
- 创建实例肯定要调用File类的构造器 我们先看看有哪些构造器
```java
public File(String filePath)

public File(String parentPath, String childPath)

public File(File parentPath, String childPath)

public File(URI uri)
```

- 当我们调用该构造器后 相当于在内存层面拥有了一个file对象 不是必须一定要有实体文件


> 实例化方式1
> File file = new File(文件名 或 文件所在路径);
- public File(String filePath)

- 我们在传入参数的时候 并不是说一定要有这个实体文件
- 没有实体文件的话 相当于我们在内存层面创建了一个文件的对象

```java
// 即使文件目录中没有hello.txt和hi.txt也不会报错
// 此时只是在内存层面创建了一个对象
File file1 = new File("hello.txt");
File file2 = new File("/Users/LIUCHUNSHAN/Desktop/Sam/Java/hi.txt");

System.out.println(file1);
// 相当于调用了file1的toString() 相对路径会输出传递进入的文件名 绝对路径会输出文件所在的路径
```

> 相对路径:
- 1. idea中是相较于Module 如果没有Module就是相较于项目根目录下
<!-- 
  // 有module的情况
  | - Day08   -- module
    - 默认文件在这  -- file

    | - src
      - 包

  一般我们的文件都是在一个module的src的包下
  如果我们在包下的java文件中使用了相对路径
  那么意味着 文件会在 Day08下


  // 没有module的情况下
  | - 根目录
    - 默认文件在这  -- file
 -->

- 2. 看大大总结的是：
- 如果我们是在main()方法中 那么相对于当前工程下 也就是跟目录下
- 如果是测试方法 那就相较于module下
- 原因:
- 我们要看方法的调用者是谁
- main() 是程序的入口 - 所以是根目录下
- test() 我们是在module下导包进来的 所以module下
<!-- 
  eclipse 不分test main 都是相较于一个个的工程下
 -->

```java
// 相对路径
File file = new File("hello.txt");

// file1结果:
// hello.txt
```


> 文件对象.getAbsolutePath()
- 输出该文件的绝对路径看看

```java
@Test
public void test() {
  File file = new File("IOTest.txt");
  String absolutePath = file.getAbsolutePath();

  System.out.println(absolutePath);
  // /Users/LIUCHUNSHAN/Desktop/Sam/Java/review/IOTest.txt
}
```

> 技巧:
- 使用相对路径的时候:
- 我们的文件创建在 module 下 但是我们还是想使用main()方法该怎么处理?
<!-- 
  
  new File("Hello.txt")
  因为main()会在 项目根目录下找 指定文件 可我们的文件在module下 就会出现问题

  但是我们可以这么解决
  new File("Day08/Hello.txt")

  在文件前面我们把缺失的路径补上不就可以了么
 -->

```java
@Test
public void testFileReader() {
  File file = new File("Hello.txt");
}

public static void main(String[] args) {
  // 在前面补上 根目录 到 文件中缺失的路径部分
  File file = new File("Day01/Hello.txt");
  System.out.println(file.getAbsolutePath());
}
```


> 绝对路径:
- 包含盘符在内的文件或文件目录的路径
- D:/开始到文件的路径
```java
// 绝对路径
File file = new File("/Users/LIUCHUNSHAN/Desktop/Sam/Java/hi.txt");

// file2结果:
// /Users/LIUCHUNSHAN/Desktop/Sam/Java/hi.txt
```


**注意:**
- 路径分隔符和系统有关
- Windows和Dos系统默认使用 "\" 来表示
<!-- 
  windows里面的绝对路径 我们需要 \\java\\day08 
  也支持 "/"
-->

- Unix和URL使用 "/" 来表示

> File.separator -- 常量 相当于通用的 / 分隔符
- 为了避免还会记和使用麻烦 File类提供了一个常量 *separator*

- 优点：
- 在不同的平台下 该代码都不会有问题 就是繁琐 但是通用

```java
public static final String separator
```

- 作用:
- 根据操作系统 动态的提供分隔符

```java
// 示例:
new File("d" + File.separator + "sam" + File.separator + "test.js")
```



> 实例化方式2
> File file = new File(上一层路径, 目标文件或路径);
- public File(String parentPath, String childPath)

```java
// 在/Users/LIUCHUNSHAN/Desktop/Sam/目录下 的 Java目录
File file3 = new File("/Users/LIUCHUNSHAN/Desktop/Sam/", "Java");

// file3结果:
// /Users/LIUCHUNSHAN/Desktop/Sam/Java
```


> 实例化方式3
> File file = new File(File, "hi.txt");
- public File(File parent, String child)

```java
// 上面的实例化方式2
File file3 = new File("/Users/LIUCHUNSHAN/Desktop/Sam/", "Java");

// file3结果:
// /Users/LIUCHUNSHAN/Desktop/Sam/Java


// 参数1的位置需要放以个File类型的 我们将file3 放进去
File file4 = new File(file3, "he.txt");

    // file3 输出的时候就是一条路径 相当于我们往参数1的位置上放了一条路径

// file4结果:
// /Users/LIUCHUNSHAN/Desktop/Sam/Java/he.txt
```


> 要点:
- 1. File 能 新建 删除 重命名文件和目录 但 File不能访问文件内容本身

- 2. 如果需要访问文件内容本身 则需要使用输入/输出 流

- 3. 想要在java程序中表示一个真实存在的文件或目录 那么必须有一个File对象
- 但是java程序中的一个File对象 可能没有一个真实存在的文件或目录

- 4. File对象可以作为参数传递给流的构造器

- 5. 文件存在与否 是否可读可写 长度是多少 文件最近的修改日期是多少 File本身就能做这些

----------------------------

### File类常用方法

> 通用代码
```java
// 相对路径: 没有真实文件
File file1 = new File("hello.txt");

// 绝对路径: 真实文件
File file2 = new File("/Users/LIUCHUNSHAN/Desktop/ioTest/hi.txt");
```

> 文件对象.getAbsolutePath();
- 获取绝对路径

- 返回值:
- String
```java
File file = new File("IOTest.txt");
String absolutePath = file.getAbsolutePath();
System.out.println(absolutePath);
// /Users/LIUCHUNSHAN/Desktop/Sam/Java/review/IOTest.txt
```


> 文件对象.getPath()
- 获取路径

- 返回值:
- String
```java
File file = new File("IOTest.txt");
String path = file.getPath();
System.out.println(path); // IOTest.txt

// 如果我们new File() 的时候写的是绝对路径 返回的是绝对路径的地址 如果是相对路径返回的就是相对的地址
```


> 文件对象.getName()
- 获取名称 包括文件扩展名

- 返回值:
- String

```java
File file = new File("IOTest.txt");
String name = file.getName();
System.out.println(name);   // IOTest.txt
```


> 文件对象.getParent()
- 获取上层文件目录路径 若无 返回null
- 跟我们传入的相对路径和绝对路径有关系
- 如果我们传递的是 相当路径 则获取不到上层文件的目录
- 如果我们传递的是 绝对路径 则能获取上层完整的路径

- 返回值类型:
- String

- 默认值: null

```java
// 相当路径
File file = new File("IOTest.txt");
String parent = file.getParent();
System.out.println(parent);   // null


// 绝对路径
File file2 = new File("/Users/LIUCHUNSHAN/Desktop/Sam/Java/hello.txt");
String parent = file2.getParent();
System.out.println(parent);
    // /Users/LIUCHUNSHAN/Desktop/Sam/Java
```


> 文件对象.length()
- 获取文件长度(字节数) 不能获取目录的长度

- 返回值:
- long

- 默认值: 0
```java
File file = new File("IOTest.txt");
System.out.println(file.length());    // 19

// this is a test file 一共19个字符
```


> 文件对象.lastModified()
- 获取最后一次的修改时间 毫秒值

- 返回值:
- long

- 默认值: 0

```java
File file = new File("IOTest.txt");
long l = file.lastModified();
System.out.println(l);    // 1646491931576

Date date = new Date(l);
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:ss:mm");
String format = sdf.format(date);
System.out.println(format);   // 2022-03-05 23:11:52
```

------

- 下面的两个方法适用于文件目录 也就是file对象必须是new File(文件夹路径) new出来的

- 两个方法做的事儿差不多 就是返回值类型不一样 都是获取目录下的子目录 或者 文件

> 文件对象.list()
- 我们new File()的时候传入了一个文件夹 通过该文件夹对象调用的list()方法 或得到当前文件目录下的所有文件 和 文件夹

- 获取file文件所在目录下的所有文件或者文件目录的*名称数组*

- 特点:
- 如果是文件会有.后缀名
- 如果是文件夹则没有.后缀名
<!-- 
  package-lock.json   -- 文件
  vue2_local_pro      -- 文件夹
 -->  

- 要点:
- 该文件目录必须要存在 否则会报错

- 返回值:
- String[]

```java
// 我们拿Sam文件夹试试
File file = new File("/Users/LIUCHUNSHAN/Desktop/Sam");

// 调用list()
String[] list = file.list();

for(String name: list) {
  System.out.println(name);
}

// 结果：
TypeSctipt
vue2_local_pro
Javascript_pro
react-local-pro
vue3-local-pro
nuxt_local_pro

package-lock.json -- 文件
```


> 文件对象.listFiles()
- 获取指定目录下的所有文件或者文件目录的*File数组*

- 返回值:
- File[]

- 特点：
- 结果会以绝对路径的方式展现

```java
File file = new File("/Users/LIUCHUNSHAN/Desktop/Sam");

File[] files = file.listFiles();

for(File f: files) {
  System.out.println(f);
}

// 结果
/Users/LIUCHUNSHAN/Desktop/Sam/TestRepositories
/Users/LIUCHUNSHAN/Desktop/Sam/.DS_Store
/Users/LIUCHUNSHAN/Desktop/Sam/node_local-pro
```


> 文件对象.renameTo(File dest)
- 把文件重命名为指定的文件路径

- 返回值
- boolean

- 要点：
- 文件对象要在硬盘中存在
- dest对象不能在硬盘中存在

- 效果：
- 好像剪切粘贴啊
- 将文件对象 剪切到 指定的路径

```java
// file1在硬盘中是存在的
File file1 = new File("hello.txt");

// 该目录下没有hello.txt文件
File file2 = new File("/Users/LIUCHUNSHAN/Desktop/ioTest/hello.txt");

// 返回值类型是boolean
boolean isRes = file1.renameTo(file2);
System.out.println(isRes);

// 效果
- 跟目录下的hello.txt没有了 在Desktop/ioTest/ 路径下出现了
```

----------------

### File类的判断功能
- File对象既可以表示一个文件 也可以表示为一个文件目录

> 文件对象.isDirectory()
- 判断是否是文件目录

- 返回值:
- boolean

```java
// 这是一个文件
File file = new File("IOTest.txt");
System.out.println(file.isDirectory());   // false


// 这传入的是一个文件夹
File folder = new File("/Users/LIUCHUNSHAN/Desktop/Sam");
boolean directory = folder.isDirectory();
System.out.println(directory);    // true
```


> 文件对象.isFile()
- 判断是否是文件

- 返回值:
- boolean


> 文件对象.exists()   
- *这个是用来先判断文件是否真实存在的 就像canvas判断有没有画笔一样*
- 判断当前对象是否在硬盘中存在对应的文件 或 文件目录

- 返回值:
- boolean


> 文件对象.canRead()
- 判断是否可读

- 返回值:
- boolean


> 文件对象.canWrite()
- 判断是否可写

- 返回值:
- boolean


> 文件对象.isHidden()
- 判断是否隐藏

- 返回值:
- boolean


> 示例:
```java

// 针对于真实文件的情况
File file = new File("hello.txt");
File file = new File("/Users/LIUCHUNSHAN/Desktop/ioTest");


System.out.println(file.isDirectory());
System.out.println(file.isFile());
System.out.println(file.exists());

// 正常文件存在就是可读可写的状态
System.out.println(file.canRead());
System.out.println(file.canWrite());

System.out.println(file.isHidden());

// 真实文件的结果:
false
true
true
true
true
false


//  真实目录的结果
true
false
true
true
true
false
```

> 技巧：
- 我们在调用这个部分的方法的时候 要尽可能的先调用
- file.exists() 看看文件是不是真的存在后 再进行其他的操作

> 总结
- 当硬盘中真有一个真实的文件或目录存在的时候 创建File对象时 各个属性会有值

- 当硬盘中没有真实的文件或目录对应时 创建File对象时 各个属性会有都是默认值 false null 0

----------------------------

### File类的创建 删除功能
- 这部分的功能是*真正的在硬盘中*创建文件或文件目录

> 文件对象.craeteNewFile()
- *创建文件*
- 若文件存在 则不创建 返回false

- 异常:
- IOException

- 返回值:
- boolean

- 前提:
- 我们通过构造器 指定了一个内存中的对象

```java
// 创建了一个文件对象 目前 test.txt 并不存在 只是在内存中
File file = new File("test.txt");

// 先判断下文件是否存在
if(!file.exists()) file.createNewFile();
System.out.println("创建成功");
```

<!-- 
  相当于 我们右键 - 新建 - 文本文档
 -->


> 文件对象.mkdir()
- 创建文件目录 
- 若此文件目录存在 则不创建
- 若此文件目录的上层目录不存在 则不创建

- 返回值:
- boolean

```java
// ioTest存在
// 我们要在 ioTest -> 下 创建io1文件夹
File file = new File("/Users/LIUCHUNSHAN/Desktop/ioTest/io1");

// 如果上层木库 /Users/LIUCHUNSHAN/Desktop/ioTest存在的时候 mkdir()和mkdirs()是一样的
file.mkdir();
file.mkdirs();

-- 

// ioTest存在
// 我们要在 ioTest -> io1下 创建 io3 但是io2文件夹并不存在
  File file = new File("/Users/LIUCHUNSHAN/Desktop/ioTest/io2/io3");

  boolean mkdir = file.mkdirs();
  if(mkdir) {
    System.out.println("创建成功");
  } else {
    System.out.println("创建失败");
  }

  // 创建失败 因为 io3 的 上层目录 io2 不存在 所以创建失败
  // 但是如果是 mkdirs() 方法 则没有问题可以创建成功
```


> 文件对象.mkdirs()
- 创建文件目录
- 如果上层文件目录不存在 连带上层目录一起创建 

- 返回值:
- boolean

**注意:**
- 如果你创建文件或文件目录没有写盘符路径
- 那么默认在项目路径下


- mkdir() 和 mkdirs() 的区别就是 对于上层目录应该怎么处理


> 文件对象.delete()
- 删除文件或者文件夹

- 返回值:
- boolean

- 前提
- 我们通过构造器 指定了一个内存中的对象

**注意:**
- 1. java中要删除不走回收站
- 2. 要删除一个文件目录 *请注意该文件目录内不能包含文件或者文件目录*


> 总结:
- File类中涉及到文件或文件目录的创建 删除 重命名 修改时间 文件大小等方法 并未涉及到写入或读取文件内容的操作

- 如果需要读取或写入文件内容 必须使用io流来完成

<!-- 
    - 我们将
      内存中的数据写入硬盘文件中
      硬盘文件中的数据读取到内存中

    就需要 流 操作
    
    -----------             -----------
                    →
    硬盘中的文件     io流         内存
                    ←
    -----------             -----------


    - 如果不需要 读取 和 写入 操作
    - 我们只是看看文件名 文件大小 修改时间 上层目录等对文件的简单操作的话 我们使用File类就可以了
 -->

- 后续File类的对象常会作为参数传递到流的构造器中 指明读取或写入的"终点(从哪里读 写到哪里)"



> 练习
- 1. 利用File构造器 new一个文件目录file
  - 在其中创建多个文件和目录
  - 编写方法 实现删除flie中指定文件的操作

```java
File file = new File("/Users/LIUCHUNSHAN/Desktop/ioTest/hello.txt");

// 创建一个与file同目录下的另外一个文件 文件名为: haha.txt
File destFile = new File(file.getParent(), "haha.txt");

boolean newFile = destFile.createNewFile();
if(newFile) { 
  System.out.println("创建成功");
}
```


- 2. 判断指定目录下是否有后缀名为.jpg的文件 如果有 就输出该文件名称
```java
public class FindJPGFileTest {

	@Test
	public void test1(){
		File srcFile = new File("d:\\code");
		
		String[] fileNames = srcFile.list();
		for(String fileName : fileNames){
			if(fileName.endsWith(".jpg")){
				System.out.println(fileName);
			}
		}
	}
	@Test
	public void test2(){
		File srcFile = new File("d:\\code");
		
		File[] listFiles = srcFile.listFiles();
		for(File file : listFiles){
			if(file.getName().endsWith(".jpg")){
				System.out.println(file.getAbsolutePath());
			}
		}
	}
	/*
	 * File类提供了两个文件过滤器方法
	 * public String[] list(FilenameFilter filter)
	 * public File[] listFiles(FileFilter filter)

	 */
	@Test
	public void test3(){
		File srcFile = new File("d:\\code");
		
		File[] subFiles = srcFile.listFiles(new FilenameFilter() {
			
			@Override
			public boolean accept(File dir, String name) {
				return name.endsWith(".jpg");
			}
		});
		
		for(File file : subFiles){
			System.out.println(file.getAbsolutePath());
		}
	}
	
}

```

- 3. 遍历指定目录所有文件名称 包括子文件目录中的文件
  - 扩展1: 并计算指定目录占用空间的大小
  - 扩展2: 删除指定文件目录及其下的所有文件

```java
public class ListFilesTest {

	public static void main(String[] args) {
		// 递归:文件目录
		/** 打印出指定目录所有文件名称，包括子文件目录中的文件 */

		// 1.创建目录对象
		File dir = new File("E:\\teach\\01_javaSE\\_尚硅谷Java编程语言\\3_软件");

		// 2.打印目录的子文件
		printSubFile(dir);
	}

	public static void printSubFile(File dir) {
		// 打印目录的子文件
		File[] subfiles = dir.listFiles();

		for (File f : subfiles) {
			if (f.isDirectory()) {// 文件目录
				printSubFile(f);
			} else {// 文件
				System.out.println(f.getAbsolutePath());
			}
		}
	}

	// 方式二：循环实现
	// 列出file目录的下级内容，仅列出一级的话
	// 使用File类的String[] list()比较简单
	public void listSubFiles(File file) {
		if (file.isDirectory()) {
			String[] all = file.list();
			for (String s : all) {
				System.out.println(s);
			}
		} else {
			System.out.println(file + "是文件！");
		}
	}

	// 列出file目录的下级，如果它的下级还是目录，接着列出下级的下级，依次类推
	// 建议使用File类的File[] listFiles()
	public void listAllSubFiles(File file) {
		if (file.isFile()) {
			System.out.println(file);
		} else {
			File[] all = file.listFiles();
			// 如果all[i]是文件，直接打印
			// 如果all[i]是目录，接着再获取它的下一级
			for (File f : all) {
				listAllSubFiles(f);// 递归调用：自己调用自己就叫递归
			}
		}
	}

	// 拓展1：求指定目录所在空间的大小
	// 求任意一个目录的总大小
	public long getDirectorySize(File file) {
		// file是文件，那么直接返回file.length()
		// file是目录，把它的下一级的所有大小加起来就是它的总大小
		long size = 0;
		if (file.isFile()) {
			size += file.length();
		} else {
			File[] all = file.listFiles();// 获取file的下一级
			// 累加all[i]的大小
			for (File f : all) {
				size += getDirectorySize(f);// f的大小;
			}
		}
		return size;
	}

	// 拓展2：删除指定的目录
	public void deleteDirectory(File file) {
		// 如果file是文件，直接delete
		// 如果file是目录，先把它的下一级干掉，然后删除自己
		if (file.isDirectory()) {
			File[] all = file.listFiles();
			// 循环删除的是file的下一级
			for (File f : all) {// f代表file的每一个下级
				deleteDirectory(f);
			}
		}
		// 删除自己
		file.delete();
	}
}
```

----------------------------

### IO流的原理 与 流的分类
- IO是input和output的缩写 IO技术是非常使用的机刷 用于*处理设备之间的数据传输*

- 如读/写文件 网络通讯等

- java程序中 对于数据的(对于文件内容)输入/输出操作以"流(stream)"的方式进行

- java.io包下提供了各种"流"类和接口 用以获取不同种类的数据 并通过 标准的方法 输入或输出数据

- input output是一个相对的概念
- 我们要站位在内存的角度看输入还是输出


> 输入input
- 读取外部数据(磁盘 光盘等存储设备的数据)到程序(内存)中


> 输出output
- 将程序(内存)数据输出到磁盘 光盘等存储设备中


> 流的分类
- 1. 按照数据流的*流向*不同分为: 
    输入流 和 输出流
<!-- 站在内存的角度 -->

- 2. 按操作*数据单位*不同不同为: 
    字节流(8bit) 和 字符流(16bit)
<!-- 
  字节流的基本单位就是一个个的bit(01) 8bit是1个字节
  字符流就是2个字节 一个个char的方式存储的

  字符流
    字符更适合存储文本数据 比如一个txt文件 都是一个个文件 那么我们就可以使用字符的方式去存储

  字节流
    图片 视频等2进制数据的时候 也就是非文本的数据 我们希望使用字节流
 -->

- 3. 按照流的*角色*不同分为:
    节点流 和 处理流
<!-- 
    把文件中的数据加载到内存层面

    节点流:
    我们造 一个直接作用在文件上的流 称为节点流


    处理流:
    我们在节点流的基础上又包了一层流 
    也就是节点流的对象 作为外部流的构造器中的参数 传入 也就是节点流作为外部流的属性出现了

    外面包着这层流就是处理流

    =======处理流(参数: 节点流)=========
        -----------
        节点流 →
        -----------
    =======处理流(参数: 节点流)=========

    处理流可以有很多层 凡是在已有流的基础上进行包裹的都是处理流

  

    
    处理流有很多种 作用就不一样
    比如：
    在现有的流上包裹了一层处理流后可以加快流的传输速度
 -->


> IO流的体系结构
- InputStream OutoutStream Reader Writer是类
- 它们是抽象基类(不能实例化)

<!-- 
    抽象基类     字节流       字符流
    输入流    InputStream   Reader   
    输出流    OutoutStream  Writer

    // 按照数据单位
    InputStream OutoutStream是处理字节的
    Reader Writer是处理字符的

    // 按照流向
    InputStream OutoutStream 是 输入流
    Reader Writer 是 输出流
 -->


- 分类  
  字节输入流  
  字节输出流  
  字符输入流  
  字符输出流

- 下面标绿的是我们需要额外关注的

> 抽象基类
  InputStream   (字节输入流)
  OutputStream  (字节输出流)
  Reader  (字符输入流)
  Writer  (字符输出流)

- 我们把 抽象基类 分成了4行
- 下面每一个分类中的每一行对应着抽象基类的每一行

- 比如 下面的分类中的：
- 第一行 *都继承于* 抽象基类中的 *InputStream基类*
- 第二行 *都继承于* 抽象基类中的 *OutputStream基类*
- 第三行 *都继承于* 抽象基类中的 *Reader基类*
- 第四行 *都继承于* 抽象基类中的 *Writer基类*



> 访问文件 -- *典型的节点流* 也叫做文件流
  FileInputStream   (字节输入流)
  FileOutputStream  (字节输出流)
  FileReader  (字符输入流)
  FileWrite   (字符输出流)
<!-- 
  第一档
  这四个流可以 直接 操作 file

  我们这里这么记 输入还是输出都需要 端点 
  端点是以 File对象 来充当的 所以在抽象基类的前面加上 File
 -->


- 访问数组 (处理流)
  ByteArrayInputStream    (字节输入流)
  ByteArrayOutputStream   (字节输出流)
  CharArrayReader   (字符输入流)
  CharArrayWriter   (字符输出流)
<!-- 
  在抽象基类的前面加上 ByteArray 和 CharArray 
 -->


- 访问管道 (处理流)
  PipedInputStream    (字节输入流)
  PipedOutputStream   (字节输出流)
  PipedReader   (字符输入流)
  PipedWriter   (字符输出流)
<!-- 
  在抽象基类的前面加上 Piped
 -->

- 访问字符串 (处理流)
  空    (字节输入流)
  空    (字节输出流)
  StringReader    (字符输入流)
  StringWriter    (字符输出流)


> 缓冲流 (处理流)
  BufferedInputStream   (字节输入流)
  bufferedOutputStream  (字节输出流)
  BufferedReader  (字符输入流)
  BufferedWriter  (字符输出流)
<!-- 
  第一档
  处理流的一种

  在抽象基类的前面加上 Buffered
 -->

> 转换流 (处理流)
  空  (字节输入流)
  空  (字节输出流)
  InputStreamReader   (字符输入流)
  OutputStreamWriter  (字符输出流)
<!-- 
  第一档
 -->  


> 对象流
  ObjectInputStream   (字节输入流)
  ObjectOutputStream  (字节输出流)
  空  (字符输入流)
  空  (字符输出流)
<!-- 
  第一档
 -->  

  FilterInputStream   (字节输入流)
  FilterOutputStream  (字节输出流)
  FilterReader  (字符输入流)
  FilterWriter  (字符输出流)

- 打印流
  空  (字节输入流)
  PrintStream   (字节输出流)
  空  (字符输入流)
  PrintWriter   (字符输出流)

- 推回输入流
  PushbackInputStream (字节输入流)
  空  (字节输出流)
  PushbackReader  (字符输入流)
  空  (字符输出流)

- 特殊流
  DataInputStream   (字节输入流)
  DataOutputStream  (字节输出流)
  空  (字符输入流)
  空  (字符输出流)


- 我们要具备一种能力 就是一个流往这一放我们就要知道它是输入还是输出 是字节还是字符  

> 后缀: InputStream OutputStream
- 都是用来处理字节的

> 后缀: Reader Writer
- 都是用来处理字符的

---

- 1. java的io流共涉及40多个类 实际上非常规则 都是从如下4个抽象基类派生的

- 2. 由这四个类派生出来的子类名称都是以其父类名作为子类名后缀

----------------------------

### 节点流
- 从这里开始我们关注下 直接操作文件的 4个流
- 分别是:

- 操作字节的 
  FileInputStream & FileOutputStream

- 操作字符的
  FileReader & FileWriter

- 我们从操作字符的流开始:
- 为了测试的方便 我们在【Day01】module下创建了Hello.txt文件
<!-- 
  注意:
    我们在 module 下创建的 hello.txt 文件
    如果我们要使用 相对路径 的话 
      那我们就要用 @Test 不能使用 main()

    因为main()的相对的 项目下根目录
 -->


> 节点流中的端点的含义
- 下面提到的端点的意思 都是直接包一个文件
- 我们输出也好 还是输出也好 都要考虑输入到哪里(端点) 输出到哪里(端点)
- 这个端点在java层面我们就用一个 File 对象来代替

----------------------------

### FileReader读入数据的操作
- 自己起的名字: 字符输入流

> FileReader实例化
> FileReader fr = new FileReader(file);
- 创建读取文件数据的流(字符流)

- 构造器参数:
- 1. file对象
- 2. 具体的路径

- 异常:
- FileNotFoundException  文件找不到的异常

```java
public void testFileReader() throws IOException {
  // 需求: 将day01下的hello.txt文件内容读入内存(程序)中 并输出到控制台

  // 1. 实例化File类的对象 指明我们要操作文件
  File file = new File("Hello.txt");
}
```

> fr.close() !!!
- 流的关闭操作 一定不要忘记 
- 因为:
- 垃圾回收机制会把没用的东西都回收掉 但是对于其他物理连接 比如数据库连接 输入流输出流 socket连接 无能为力

- 我们需要手动关闭 否则会导致内存泄漏等问题

- 异常
- IOException


> 使用 fr.read() 空参读取文件数据
> fr.read()
- 用于读取文件的数据
- 它是一个重载的方法 参数不同读取的内容也就不同
<!-- 
  read()
  read(char[] cbuf)
  read(CharBuffer target)
  read(char[] cbuf, int offset, int length)
 -->

- 异常:
- IOException

- 返回值:
- int

- fr.read()
- 返回的是读入的一个字符(读入了一个字符char类型的)
<!-- 
  但是我们返回得是int类型
  每一个char都会对应着一个int
  a -> 97

  这里相当于用int型的方式存的a
 -->

- 我们读取文件的时候都是使用循环的方式读取文件中的数据

- 如果达到文件末尾了 *返回-1* (当该方法返回-1的时候 代*表文件读取完毕*)

- 如果文件里面是空的 那么上来就是-1 所以在读取文件的时候都会用while循环 条件就是判断是不是-1

- 需求: 
- 将day01下的hello.txt文件内容读入内存(程序)中 并输出到控制台

```java
@Test
public void testFileReader() throws IOException {
  // 1. 实例化File类的对象 指明我们要操作文件
  File file = new File("Hello.txt");

  // 2. 提供具体的流
  // new FileReader(指定路径 或者 file对象)
  FileReader fr = new FileReader(file);

  // 3. 方式1: 数据的读入  
  // 当读到-1的时候 代表结束
  int data = fr.read();
  while(data != -1) {
    // 强转成char 我们才能看懂
    System.out.println((char)data);

    // 将读到的内容在赋值给data 直到data为-1的时候会退出循环
    data = fr.read();
  }

  --- 

  // 3. 方式2: 数据的读入  
  // 语法上针对于方式1的修改
  int data;
  while((data = fr.read()) != -1) {
    System.out.println((char)data);
  }

  // 4. 流的关闭操作 !!!!!
  fr.close();
}
```

- 结果:
- 文件中的文本: this is a test file

- 为什么能输出呢？ 在循环中每次读到一个字符就将字符对应的数给data 然后输出一行data 如果我们换成 print 就是一行
```java
116
104
105
115
32
105
115
32
97
32
116
101
115
```


- 上面的例子中 不管是 new FileReader() 还是 fr.read() 都会抛出异常
<!-- 
   new FileReader() -- 文件找不到的异常
 -->

- 上面的例子中我们是使用 throws的方式 将异常抛到了外层方法上 这种方式并不好

- 那我们到底选择try catch finally 还是 throws 呢

```java
// 去掉 throws IOException 
@Test
public void testFileReader() {

  
  File file = new File("Hello.txt");

  - 1. ！！！异常处 - new File()
  FileReader fr = new FileReader(file);

  int data;

  - 2. ！！！异常处 - fr.read()
  while((data = fr.read()) != -1) {
    System.out.println((char)data);
  }


  - 3. ！！！异常处 - fr.close()
  fr.close();
}
```

> 异常处理:
- 为了保证流资源一定可以执行关闭操作 需要使用try-catch-finally来处理

- 上面的代码中 如果1的位置没有抛异常 就意味着 fr 可以正常的被创建
```java
FileReader fr = new FileReader(file);
```

- 然后就会继续的往下走 到2的位置
- 在我们调用read()的时候 有时候可能有阻塞的出现 始终数据读取不到 它就会抛出一个IOException

- 一旦出现异常就会在2的位置创建一个exception对象 该对象默认的情况下就会抛出去 相当于2位置后面的代码就不执行了

- 也就是我们创建的流 始终不会被关闭 资源浪费存在泄漏的问题

- 我们期望的是 我们创建好fr(创建好流)以后 即使2的位置出现了异常 我们也要保证流能够正常的被关闭

- 所以一定能执行的操作 我们最好*使用try catch finally*

```java
@Test
public void testFileReader() {

  // 将它提取出来 因为fr要在多个{ }用
  FileReader fr = null;

  try {
    // 1. 实例化File类的对象 指明我们要操作文件
    File file = new File("Hello.txt");

    // 2. 提供具体的流
    fr = new FileReader(file);

    // 3. 数据的读入
    int data = fr.read();
    while(data != -1) {
      System.out.println((char)data);
      data = fr.read();
    }
  } catch (IOException e) {
    e.printStackTrace();
  } finally {
    // 4. 流的关闭操作 fr.close(); 本身也会抛异常所以也要try catch处理
    try {

      // 要点1: 
      if(fr != null) fr.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

- 要点1: 
- 因为我们将 FileReader fr = null; 提到try { } 结构的外侧了 但是极有可能我们在 new File() 的时候就出现异常

- 如果1的步骤中出现异常 后面的代码就不会跑 但是 finally中的逻辑就会执行 所以 如果直接 fr.close(); 就会报空指针异常 因为fr是null

- 所以我们要在这里进行判断下 if(fr != null) fr.close();


**注意:**
- 在*读取操作*的时候 *文件必须要存在！！！*
- 不存在的话 FileReader fr = new FileReader(file); 就会报文件找不到的异常(FileNotFoundException)


> 读取文件数据的步骤:
- 我们是读入操作 所以首先要在硬盘中有这个文件

- 1. File类的实例化
- 2. 流的实例化(上面使用的是FileReader)
- 3. 读入的操作
- 4. 资源的关闭

------

> 思考:
- Hello.txt文件中只有[helloworld123]

- 上面我们在读取文件数据的操作时 使用的是 read() 方法
- 但是该方法 每次只能读到一个字符 如果文件中的数据很多的时候 需要用循环来不断的和硬盘进行交互 效率很差 

- 文件在硬盘中每次我们从硬盘中读到一个字符就进行输出一次 19个字符就输出19次 效率很差 

<!-- 
  比如 送快递也一样
  快递员不会每次给我们送一个快递 然后就回公司去取新的
  然后再送一个再取

  快递一般都有一个小车 快递员会装一车(放一波) 送完这波回去再取一波
 -->

- 所以read()也一样 每次读一个太慢了 怎么解决？

- 下面还是读取Hello.txt文件里面的数据 但是这次我们对read()方法的操作升级 使用read的重载方法


> read(char[] cbuf)
- 该方法会将文件数据读入到 我们准备好的 char[] cbuf中
- 每次我们读5个字符 那我们传入的char[]的长度就是一次读多少个
<!-- 
  所以在使用之前要先创建 char[] cbuf 数组

  char[]数组就是一个容器 意味着我们可以一次读多个
  既然要用数组 那么我们就要提前造出来 

  // 比如 我们可以设置为5 相当于快递小车就能装5个
  char[] cbuf = new char[5];
 -->

- 返回值
- int  
- 返回每次读入char[] chuf数组中的字符的个数
- 如果达到文件末尾 则返回-1

- 参数:
- char[]
- 读取字符 char[]
- 读取字节 byte[]

- 异常
- IOException

```java
@Test
public void testFileReader2() {
  FileReader fr = null;
  try {
    // 1. File类的实例化
    File file = new File("Hello.txt");

    // 2. FileReader流的实例化
    fr = new FileReader(file);

    // 3. 读取的操作
    // char[]相当于快递小哥的小货车 这个小货车只能装5个快递
    char[] cbuf = new char[5];

    // len为read(char[] cbuf)的返回值 为 读到的字符个数
    int len;
    while((len = fr.read(cbuf)) != -1 ) {

      // 错误的写法
      for(int i=0; i<cbuf.length; i++) {
        System.out.print(cbuf[i]);
        // helloworld123ld
      }
    }
  } catch (IOException e) {
    e.printStackTrace();
  } finally {
    try {
      // 4. 资源的关闭
      if(fr != null) fr.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

- 问题1:
- 为什么会输出 helloworld123ld?
- ld是哪来得？

- 解释:
- char[] cbuf相当于一个小车 有5个位置
- 第一轮 小车里面装的是
- h e l l o

- 第二轮 小车的每一个位置被替换成
- w o r l d

- 第三轮 小车的位置是规定的 但第三轮只有3个数 数组中只有前3个被覆盖了 后两个没有被覆盖 所以
- 1 2 3 l d

- 如果我们for循环里面写的终止条件是
  i<cbuf.length 
  那么就会将最后的两个也输出 我们不应该输出最后两个

- 所以我们不应该写i<cbuf.length 而是len就可以
- 第一轮读到5个 read(char[] cbuf) 会返回5
- 第二轮读到5个 read(char[] cbuf) 会返回5
- 第三轮读到3个 read(char[] cbuf) 会返回3

- 我们就不会输出ld 也就是每次读进去几个 我们就遍历几个


> 正确的写法:
- 我们如何输出正确的字符串呢？

```java
// 1. File类的实例化
File file = new File("Hello.txt");

// 2. FileReader流的实例化
fr = new FileReader(file);

// 3. 读取的操作
char[] cbuf = new char[5];

// len为read(char[] cbuf) 每次读到的个数
int len;

while((len = fr.read(cbuf)) != -1 ) {

  // 方式1: 外层循环一次 相当于拉了一趟小车 5个包裹 那内层循环输出5个包裹 每次输出的次数为 i < len 相当于读到几个输出几个
  for(int i=0; i<len; i++) {
    System.out.print(cbuf[i]);
  }

  // 方式2: 我们每次读到的char[] 转换为String
  // 从char[]中每次从头开始取 取len个
  String str = new String(cbuf, 0, len);
  System.out.print(str);

}
```


> read(char[] cbuf, int off, int len)
- 创建一个小车
- char[] cbuf = new char[5]

- 使用这个重载方法
- fr.read(cbuf, 0, 3)

- 小车本来有5个位置 但是我们指定小车只能装3个
- 从头装 小车装几个

- *一般不会调用这个方法 一般都是能写满就写满*

----------------------------

### FileWriter写出数据的操作
- 自己起的名字: 字符输出流
- 从内存中将数据写出到硬盘文件中

> 写出的步骤
- 1. 提供File类的对象，指明写出到的文件
- 也就是说我们要提供一个输出的端点(输出或者是写出到哪个文件)

```java
File file = new File("Hello2.txt");
```


- 2. 提供FileWriter的对象 用于数据的写出
- 也就是说指明写出的端点
```java
FileWriter fw = new FileWriter(file);
```

- 3. 写出的操作
- 4. 流资源的关闭


> 文件输出流的对象实例化
> FileWriter fw = new FileWriter(file, [true / false]);
- 提供FileWriter的对象 用于数据的写出 指明写出的端点

- 参数:
- 1. file对象
- 2. 是否在源文件上追加内容 
  false: 对原有文件的覆盖 -- 默认值
  true:  在原有文件上追加

- 异常:
- IOException


> fw.write(内容)
- 调用该方法 我们可以将 "内容(数据)" 写到断点文件里面去
- 如果文件不存在 会自动创建

- 我们可以写出一个 char[]
- 我们可以写出一个 String str
- 我们可以写出一个 指定长度的char 或者 String

- *参数类型: 都有用*
<!-- 
  // 以下5种都很常用
  fw.write(int c)
  fw.write(String str)
  fw.write(char[] cbuf)
  fw.write(String str, int off, int len)
  fw.write(char[] cbuf, int off, int len)
 -->


**注意:**
- 1. 输出操作, 对应的File可以不存在 如果不存在 在输出的过程中 会自动创建此文件 并不会报异常
<!-- 
  // 当我们创建的File对象 在硬盘中并不存在的时候
  File file = new File("Hello2.txt");

  我们调用
  fw.write()方法 会将自动创建该文件
-->

- 2. 如果对应的File存在 我们传递了第二个参数 false / true
- true:  在原有文件上   *追加*
- false: 对原有文件进行 *覆盖*


- 练习: 
- 向端点文件中 写入内容
```java
File file = new File("Output.txt");
FileWriter fw = new FileWriter(file);
fw.write("hello, world");

// 写出一个字符串
fw.write("i have a dream!");  
// 写出一个char[]
fw.write("i have a dream!".toCharArray());  

// 如果想写入多次内容 需要多次调用 fw.write() 方法
fw.write("i have a dream!\n");
fw.write("you need to have a dream");


fw.close();
```

- 每次读多少 就 写入多少
```java
while ((len = fr.read(cbuf)) != -1) {
  fw.write(cbuf, 0, len);
}
```


> 练习: 
- 使用FileReader 和 FileWrite实现文本文件的复制

```java
@Test
public void testCopy() {
  FileReader fr = null;
  FileWriter fw = null;
  try {
    // 1. 创建File类的对象指明读取哪个文件到内存中 和 将读到的数据写到哪个文件里面去
    File srcFile = new File("Hello.txt");
    File destFile = new File("Hello_copy.txt");

    // 2. 创建输入流和输出流的对象
    // 对于输入流来讲 文件是必须存在的
    fr = new FileReader(srcFile);
    // 对于输出来讲 文件不是必须存在的
    fw = new FileWriter(destFile);

    // 数据的读入和写出操作
    char[] cbuf = new char[5];
    // 记录每次读入到cbuf数组中的字符的个数
    int len;
    // 不是-1就代表还有数据
    while((len = fr.read(cbuf)) != -1) {
      // 每次读到几个 我就写出去几个 每次读到len个就写出去len个
      fw.write(cbuf, 0, len);
    }
  } catch (IOException e) {
    e.printStackTrace();
  } finally {

    // 4. 关闭流资源
    // 分开写： 关闭fr
    try {
      fr.close();
    } catch (IOException e) {
      e.printStackTrace();
    }

    // 分开写： 关闭fw
    try {
      fw.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```


> 字符流处理图片文件的测试 -- 不能
- 上面我们是使用FileReader FileWriter两个类做了文本文件的复制的例子 那这两个可以复制图片么？

- 我们把这个位置 换成了一张图片
```java
File srcFile = new File("图片1.txt");
File destFile = new File("图片1_copy.txt");
```

- 发现没有报错 也真生成了一张新图片 但是该图片打不开
- 这里相当于我们使用字符流 去处理 2进制的字节文件 是不对的

- 我们要处理二进制文件 只需要使用对应的处理2进制文件的流就可以
- FileReader  转换成  FileInputStream
- FileWriter  转换成  FileOutputStream

- 把上面例子中使用的 char[]
- 转换为 byte[]

---

> FileInputStream fis = new FileInputStream(参数);
- 二进制读取流

> FileOutputStream fis = new FileOutputStream(参数);
- 二进制写出流

- 使用方式和 FileReader 和 FileWriter 一样

---

> 字节流处理文本文件的测试 -- 可能会出现乱码
- 这里的代码 就相当于使用FileInputStream的方式

```java
// 测试使用 FileInputStream来处理 文本文件(字符文件)
FileInputStream fis = null;
try {
  // 1. 造文件
  File textFile = new File("hello.txt");

  // 2. 造流
  fis = new FileInputStream(textFile);

  // 3. 读数据
  // 创建一个字节流的数组
  byte[] buf = new byte[5];

  // 记录每次读取的字节的个数
  int len;

  // fis.read(buf)) 将数据读取到buf当中
  while((len = fis.read(buf)) != -1) {
    // 将读到的数据展示在控制台 将buf转换为字符串
    String str = new String(buf, 0, len);
    System.out.print(str);
  }
} catch (IOException e) {
  e.printStackTrace();
} finally {
  try {
    // 4. 关闭资源
    if(fis != null) fis.close();
  } catch (IOException e) {
    e.printStackTrace();
  }
}
}
```

- 我们发现：
- 如果文本文件是 英文或者数字 使用 FileInputStream 流 也能处理文本文件

- 如果文本文件是 中文 使用 FileInputStream 流 处理文本文件会出现乱码的

- 文本是英文数字的情况:
- 如果我们的文本内容是 英文数字等 比如我们的Hello.txt
- 它的内容就是: helloworld123
- utf-8也好 还是gbk也好 英文字符的话 一个字符还是使用一个字节来存的
<!-- 
  ASCⅡ码中用8位去存 能有256种情况 它只用了 128
  比如 a = 97
  我们用byte也可以存的下 因为byte是 -127~128

  英文中的abcd 一个字节就存下了
 -->


- 文本是中文的情况:
- 因为中文是汉字 我们再让这个汉字使用byte去存就装不下了 因为在utf-8中一个汉字是用3个字节来存的
<!-- 
  文本内容:
  helloworld123中国人

  utf-8中 “中” 占3个字节

  比如上面的代码中 
  byte[] buf = new byte[5]

  byte[]的长度是5 装
  第一轮 h e l l o
  第二轮 w o r l d

  中占3个字节 但是我们就剩2个位置了 难道还能把中劈成两半么 因为匹成两半了 所以出乱码了
  第三轮 1 2 3 □ □

  第三轮 1 2 3 中1 中2

  第四轮 中3 国1 国2 国3 人1

  第五轮 人2 人3

  结果就是中 人是乱码 因为匹成两半了
 -->

> 总结:
- 1. 对于文本文件 使用*字符流*来处理
<!-- 
  .txt
  .java
  .c
  .cpp

  .doc(它不算文本文件)
 -->

- 2. 对于非文本文件 使用*字节流*来处理
<!-- 
  .jpg
  .mp3
  .avi
  .doc
  .ppt
 -->


**byte[] 的长度一般定义为1024**

----------------------------

### 使用 FileInputStream FileOutputStream 读写二进制文件
- 因为 FileInputStream 和 FileOutputStream 的使用方式和 FileReader 和 FileWriter 一样

- 这里我们直接从需求入手看看 FileInputStream FileOutputStream 的使用方式

- 需求：
- 实现对图片的复制

```java
@Test
public void testFileIOTest() {
  // 1. 创建File类对象
  FileInputStream fis = null;
  FileOutputStream fos = null;

  try {
    File srcFile = new File("pic_safety_001.jpg");
    File destFile = new File("pic_safety_001_copy.jpg");

    // 2. 创建流
    fis = new FileInputStream(srcFile);
    fos = new FileOutputStream(destFile);

    // 读写数据(复制过程)
    byte[] buf = new byte[5];
    int len;
    while((len = fis.read(buf)) != -1) {
      // 读到多少写入多少
      fos.write(buf, 0, len);
    }

  } catch (IOException e) {
    e.printStackTrace();

  } finally {

    try {
      fis.close();
    } catch (IOException e) {
      e.printStackTrace();
    }

    try {
      fos.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```


> 封装一个复制文件的方法
- 要点:
- 数据小的时候: 我们定义byte[]的长度为 10
- 数据大的时候: 我们定义byte[]的长度为 1024
<!-- 
  我们本意是想用1000 底层我们都是使用2进制 1024是2^10
  它是最接近1000的一个数
 -->

```java
// 定义一个方法 实现指定位置下的文件复制的方法
public void copyFile(String srcPath, String destPath) {
  // 1. 创建File类对象
  FileInputStream fis = null;
  FileOutputStream fos = null;
  try {
    // 其实我们就修改了这里
    File srcFile = new File(srcPath);
    File destFile = new File(destPath);

    // 2. 创建流
    fis = new FileInputStream(srcFile);
    fos = new FileOutputStream(destFile);

    // 读写数据(复制过程) byte数组的长度一般都是1024
    byte[] buf = new byte[1024];
    int len;
    while((len = fis.read(buf)) != -1) {
      // 读到多少写入多少
      fos.write(buf, 0, len);
    }
  } catch (IOException e) {
    e.printStackTrace();
  } finally {
    try {
      fis.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
    try {
      fos.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}


@Test
public void testCopyFile() {
  long start = System.currentTimeMillis();

  copyFile("pic_safety_001.jpg", "pic_safety_001_copy2.jpg");

  long end = System.currentTimeMillis();

  System.out.println("复制操作花费的时间为: " + (end - start) + " 毫秒");
}
```


**扩展:**
- FileInputStream FileOutputStream 也可以用来实现对文本文件的复制操作
<!-- 
  这时候的它们就相当于搬运工 但是不能在内存读
  仅仅是复制操作的时候 是不会出现乱码的 
 -->

----------------------------

### 处理流
- 使用方式:
- "套接"在已有的流的基础上

### 缓冲流
- 缓冲流是处理流的一种
- BufferedInputStream   字节
- BufferedOutputStream  字节

- BufferedReader        字符
- BufferedWriter        字符

- 这四个处理流分别在前一个基础上进行包装(处理流就是对已有流进行包装)
- File..Stream  - BufferedInputStream
- File..Stream  - BufferedOutputStream
- File..Reader  - BufferedReader
- File..Writer  - BufferedWriter 

- 包装完之后我们就用上面右边的流进行处理(Buffer...)


> 缓冲流的作用:
- 缓冲流是处理流的一种 它主要的作用就是提高文件的读写效率
<!-- 
  开发的时候我们不会直接用 节点流那4个的(File...) 因为它们是比较基本的几个流 效率上稍微差一些 

  我们要用得话 也会考虑使用缓冲流(Buffer...) 
-->


> 缓冲流的使用：
- 使用方式和节点流几乎一样

- 要点1:
- 缓冲流不能直接作用在文件上 它只能作用在节点流的上面 所以在使用缓冲流的前提就是先创建节点流


> 缓冲流的要点:
- 把节点流对象当做参数传递到缓冲流的构造器中
```java
FileInputStream fis = new FileInputStream(srcFile);
FileOutputStream fos = new FileOutputStream(destFile);

BufferedInputStream bis = new BufferedInputStream(fis);
BufferedOutputStream bos = new BufferedOutputStream(fos);
```


- 要点2:
- 流的关闭:
- 我们一共创建了4个流 那就是说要关四个

-  关闭的顺序: 
- 先关闭外层的流 再关闭内层的流
<!-- 
  理解技巧:
    我们先创建的节点流 后创建的处理流
    关闭的时候 要
    先关闭处理流 再关闭节点流

    这点和穿脱衣服一样 穿的时候先穿内衣 脱的时候先脱外衣
  

  关闭的书写技巧:
    从下往上看 先看到哪个就关哪个 
-->

**注意:**
- 关闭外层的流的同时 会自动将内层的流进行关闭 关于内层流的关闭可以省略


> BufferedInputStream bis = new BufferedInputStream(fis);
- 将节点流对象传进去

> BufferedOutputStream bos = new BufferedOutputStream(fos);


> 缓冲流(字节型)对图片的复制
> 需求
- 对图片进行复制：
```java
@Test
  public void BufferedStreamTest() {

    BufferedInputStream bis = null;
    BufferedOutputStream bos = null;

    try {
      // 1 造文件
      File srcFile = new File("pic_safety_001.jpg");

      // 目标在哪
      File destFile = new File("pic_safety_001_copy.jpg");


      // 2 造流
      // 我们要使用缓冲流 但是缓冲流不能直接作用在文件上 它只能作用在节点流的上面 体现在代码层面

      // 创建节点流
      FileInputStream fis = new FileInputStream(srcFile);

      FileOutputStream fos = new FileOutputStream(destFile);

      // 造缓冲流 - 处理流
      // 将fis丢进去
      bis = new BufferedInputStream(fis);
      bos = new BufferedOutputStream(fos);


      // 3 复制的细节 读取 和 写入
      // 图片小点 不用太大
      byte[] buf = new byte[10];
      int len;
      while((len = bis.read(buf)) != -1) {
        bos.write(buf, 0, len);
      }
    } catch (IOException e) {
      e.printStackTrace();

    } finally {
      try {
        if(bos != null) bos.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
      try {
        if(bis != null) bis.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
```


> 缓冲流复制视频 对比 节点流复制视频
- 缓冲流的速度明显要比节点流的速度快

- 缓冲流能提高读写速度的 原因:
- 内部提供了一个缓冲区

- 我们点开 BufferedInputStream 源码查看
- 能够看到一个常量 
```java
private static int DEFAULT_BUFFER_SIZE = 8192;
```

- 我们能看到8192 8192/1024是8 是1024的8倍
- 8192就是内部提供的缓冲区 可以存放的字节数

- 在读取数据的时候 先会把数据读到buf缓冲区的里面缓存着 当达到指定大小之后自动的一次性的写出(flush出去 flush就是把缓冲区清空 把数据写出去)


> bos.flush()
- BufferedOutputStream实例对象.flush()

- 刷新缓冲区 主动清空缓冲区 写出数据

- 在bos.write()方法的源码中看到 调用该方法会自动flush()缓冲区 没有必要显式的调用



> 缓冲流(字符型)对文本文件的复制
- 通过这个例子我们了解下 BufferReader 和 BufferWriter 的使用


> BufferedReader br = new BufferedReader(节点流对象)

> BufferedWriter bw =  new BufferedWriter(节点流对象)

- 需求:
- 使用 BufferedReader和BufferedWriter实现文本文件的复制


> br.readLine()
- 作用:
- 也是读数据 但是一次读一行
- 如果数据有很多行的话 要使用循环
- 该方法要么返回当前行的数据 要么是null 也就是当读到最后的时候返回值是null

- 注意：
- 该方法不会包含换成符 需要自行添加

- 添加换行符的方式1:
- bw.write(data + "\n");

- 添加换行符的方式2:
- bw.newLine();
- 该方法就是添加换行符

- 返回值
- String

```java
// readLine()会将数据读到这里
String data;

while((data = br.readLine()) != null) {
  bw.write(data);
}
```
- 上面没有声明char[]而是声明了String 用来接收readLine()方法的返回值
- 再用bw将数据写出去



- 下面我们采用了连续匿名的方式创建的文件和流
```java
// 1. 造文件 + 造流
BufferedReader br = null;
BufferedWriter bw = null;

try {

  // 使用方式和上面讲的一样 但这里 我们采用的是匿名的方式
  br = new BufferedReader(new FileReader(new File("Hello.txt")));

  bw = new BufferedWriter(new FileWriter(new File("Hello_copy.txt")));




  // 2. 读写操作 复制的过程
  // 方式1:
  char[] cbuf = new char[1024];
  int len;
  while ((len = br.read(cbuf)) != -1) {
    bw.write(cbuf, 0, len);
  }



  // 方式2:
  // readLine()会将数据读到这里
  String data;
  while((data = br.readLine()) != null) {
    System.out.println(data);

    // 写出的data中不包含换行符
    bw.write(data);
    bw.write(data + "\n");

    bw.write(data);
    bw.newLine();
  }
  


} catch (IOException e) {
  e.printStackTrace();

} finally {
  // 3. 关闭资源
  try {
    bw.close();
  } catch (IOException e) {
    e.printStackTrace();
  }
  try {
    br.close();
  } catch (IOException e) {
    e.printStackTrace();
  }
}
```


> 总结

> FileReader
- 我们使用的是 read(char[] cbuf)

> FileWriter
- 我们使用的是 write(cbuf, 0, len)

> FileInputStream
- 我们使用的是 read(byte[] buf)

> FileOutputStream
- 我们使用的是 write(buf, 0, len)

--- 

> BufferedInputStream
- 我们使用的是 read(byte[] buf)

> BufferedOutputStream
- 我们使用的是 write(buf, 0, len)

> BufferedReader
- 我们使用的是 read(byte[] buf) 或者
- readLine()

> BufferedWriter
- 我们使用的是 write(buf, 0, len)


> 关于处理流
- 处理流式作用在现有流的基础上 像输出的对象 都会有一个flush()方法 每次调用该方法的时候不管缓冲区有多少 都会将数据写出去 然后刷新缓冲区


> 练习 1. 实现图片加密操作
- 效果:
- 加密后文件双击打不开


- 提示:
```java
int b = 0;
while(( b = fis.read()) != -1) {
  fos.write(b ^ 5);
}
```

- 要点:
- 1. new FileInputStream(文件路径)
- 字节型的节点流不仅仅能传入文件对象 还可以传入文件路径

- FileInputStream fis = new FileInputStream("pic_safety_001.jpg");

- 内部也会包装成一个文件对象的 本质还是一样的


- 2. 对文件的加密处理
- 我们可以将读到的每一个字节 进行 ^ 5 的运算 这个过程就是简单的加密

```java
byte[] buf = new byte[20];
int len;
while ((len = fis.read(buf)) != -1) {
  
  // 对字节数据进行修改 完成加密操作 buf中有多个字节 一个个的改就要使用循环了 这里相当于内循环


  // 错误的写法
  for(byte b: buf) {
    b = (byte) (b ^ 5);
  }  // 这样是把buf数组中的数据取出来进行了修改 buf数据并没有变
    


  // 正确的
  // 对buf字节数组中的每一个字节进行了修改
  for(int i=0; i<len; i++) {
    buf[i] = (byte) (buf[i] ^ 5);
  }

  // 将处理好的数据 写出去
  fos.write(buf, 0, len);
}
```

- 加密操作的代码
```java
@Test
public void test() throws IOException {
  // new FileInputStream(文件路径)
  FileInputStream fis = new FileInputStream("pic_safety_001.jpg");

  FileOutputStream fos = new FileOutputStream("pic_safety_001_copy.jpg");

  byte[] buf = new byte[20];
  int len;
  while ((len = fis.read(buf)) != -1) {

    // 对字节数据进行修改 完成加密操作 buf中有多个字节 一个个的改就要使用循环了

    // 对buf字节数组中的每一个字节进行了修改
    for(int i=0; i<len; i++) {
      buf[i] = (byte) (buf[i] ^ 5);
    }

    fos.write(buf, 0, len);
  }

  fos.close();
  fis.close();
}
```

- 解密的操作
```java
@Test
public void test() throws IOException {
  // new FileInputStream(文件路径)
  FileInputStream fis = new FileInputStream("pic_safety_001_copy.jpg");

  FileOutputStream fos = new FileOutputStream("解密后的图片.jpg");

  byte[] buf = new byte[20];
  int len;
  while ((len = fis.read(buf)) != -1) {

    // 解密还是这样写 原因如下
    for(int i=0; i<len; i++) {
      buf[i] = (byte) (buf[i] ^ 5);
    }

    fos.write(buf, 0, len);
  }

  fos.close();
  fis.close();
}
```

- 解密代码没改的原因:
- m = 12
- n = 5
- 交换他俩的值

- m ^ n ^ n = m
- 一样的 上面加密^5 得到的结果^5 就回去了


> 练习 2. 获取文本上每个字符出现的次数
- 提示:
- 遍历文本的每一个字符 字符一样的话就累加 不一样的话 重新在创建一个属性
```js
// 我觉得是这个意思
obj = {
  h: 1,
  e: 0
}
```

- 字符以及出现的次数保存在Map中 key放字符的位置 value的位置 先map.contains 看看有没有这个字符 没有put()的时候写1 再有就++

- map中的数据时内存中的不保险 我们将Map中的数据写入文件

```java
/**
 * 练习3:获取文本上字符出现的次数,把数据写入文件
 *
 * 思路：
 * 1.遍历文本每一个字符
 * 2.字符出现的次数存在Map中
 *
 * Map<Character,Integer> map = new HashMap<Character,Integer>();
 * map.put('a',18);
 * map.put('你',2);
 *
 * 3.把map中的数据写入文件
 *
 * @author shkstart
 * @create 2019 下午 3:47
 */
public class WordCount {
/*
说明：
如果使用单元测试，文件相对路径为当前module
如果使用main()测试，文件相对路径为当前工程
*/
@Test
public void testWordCount() {

  FileReader fr = null;
  BufferedWriter bw = null;

  try {
    //1.创建Map集合
    Map<Character, Integer> map = new HashMap<Character, Integer>();

    //2.遍历每一个字符,每一个字符出现的次数放到map中
    fr = new FileReader("dbcp.txt");

    int c = 0;
    while ((c = fr.read()) != -1) {
      //int 还原 char
      char ch = (char) c;

      // 判断char是否在map中第一次出现
      if (map.get(ch) == null) {
        map.put(ch, 1);
      } else {
        map.put(ch, map.get(ch) + 1);
      }
    }

    //3.把map中数据存在文件count.txt
    //3.1 创建Writer
    bw = new BufferedWriter(new FileWriter("wordcount.txt"));

    //3.2 遍历map,再写入数据
    Set<Map.Entry<Character, Integer>> entrySet = map.entrySet();

    for (Map.Entry<Character, Integer> entry : entrySet) {

    switch (entry.getKey()) {
      case ' ':
      bw.write("空格=" + entry.getValue());
      break;

      case '\t'://\t表示tab 键字符
      bw.write("tab键=" + entry.getValue());
      break;

      case '\r'://
      bw.write("回车=" + entry.getValue());
      break;

      case '\n'://
      bw.write("换行=" + entry.getValue());
      break;

      default:
      bw.write(entry.getKey() + "=" + entry.getValue());
      break;

    }

    bw.newLine();
  }
  } catch (IOException e) {
    e.printStackTrace();
  } finally {
    //4.关流
    if (fr != null) {
      try {
        fr.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
  }
    if (bw != null) {
      try {
        bw.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}
}
```

----------------------------

### 转换流
- 转换流也是处理流的一种
- 转换流提供了在 字节流 和 字符流 之间的转换
<!-- 
  有一个文本文件.txt - utf8
    正常我们要操作这个文件一般都会使用 字符流
    但是现在在这个文件上使用的是 字节流

      这时候我们就可以只用 转换流 将现在的字节流转换为字符流


  也就是将输入的 字节流 转换为输入的 字符流
 -->

> java API提供了两个 -转换流-
> InputStreamReader:  处理输入的流 Reader-char
- 记忆方法:
- InputStream 是字节流
- Reader 是字符流

- InputStream + Reader 将字节流 转换为 字符流

- InputStreamReader为
- 输入的转换流 将一个个byte *转换为 一个个char*

<!--          
                  程序
                  ↗
              字符流  char
              ↗
      InputStreamReader
          ↗
      字节流  byte
      ↗
  文件.txt
 -->


> OutputStreamWriter:  处理输出的流 Writer-byte
- 输出的转换流 将一个个char *转换为 一个个byte*
<!--          
假如我们内存层面操作的一个个char(一个个字符) 我们可以使用 OutputStreamWriter 将一个个char转换为一个个byte


        程序
          ↘
          字符流  char
            ↘
            OutputStreamWriter(gbk)
              ↘
              字节流  btye
                ↘
                gbk.txt
 -->

- 字节流中的数据都是字符时 转成字符流操作更高效
- 很多时候我们使用转换流处理文件乱码问题 *实现编码和解码的功能*


> 转换流的使用要点
- 1. InputStreamReader OutputStreamWriter
  - 它们要包裹在 Readerer Writer基类(实现类) 的外层

- 2. 它们操作的是char[]
<!-- 
  如果它们可以包裹在 FileInputStream 和 FileOutputStream (字节流)的外层的话 那它们操作的应该是byte[]

  可惜不是
 -->

> 作用:
- 提供字节流与字符流之间的转换

- InputStreamReader:  
- 将一个 字节的输入流 转换为 字符的输入流 - 解码

- OutputStreamWriter: 
- 将一个 字符的输出流 转换为 字节的输出流 - 编码


> 转换流的实例化
> InputStreamReader isr = new InputStreamReader(字节流输入对象, "UTF-8")

> OutputStreamWriter osw = new OutputStreamWriter(字节流输出对象, "GBK")
- 如果不传递参数2就是使用系统默认的字符集
<!-- 
  比如idea中我们设置成utf-8了
 -->

- 异常:
- UnsupportedEncodingException

- 参数1:
- 输入字节流对象
- 因为InputStreamReader是将 byte -> char 所以我们要包在字节流对象外层

- 参数2:
- 指定字符集
- 底层都是字节 现在我需要将字节转换为字符 你得指定按照什么解码集(字符集)来转
- 该字符集根据 txt文件当初存用什么字符集保存的 我们这里就用什么字符集去读
<!-- 这是一个解码的过程注意 -->

```java
// 创建输入字节流
FileInputStream fis = new FileInputStream("Hello.txt");

// 创建输入转换流 传入 字节流对象
InputStreamReader isr = new InputStreamReader(fis, "UTF-8");
```

- 注意：
- 我们转换流设置后 就是要将数据读到内存中 这时候就是char了 我们要使用char[]


- 需求:
- 我们将Hello.txt文件使用字节流读取到控制台上 正常会出现乱码但现在我们可以使用转换流转换之后 再输出到控制台

```java
@Test
public void test() throws IOException {
  // 我们将Hello.txt文件使用字节流读取到控制台上 正常会出现乱码但现在我们可以使用转换流转换之后 再输出到控制台

  FileInputStream fis = new FileInputStream("Hello.txt");
  InputStreamReader isr = new InputStreamReader(fis, "UTF-8");

  // 将字节流 -> 字符流 我们要准备个char[]将读到的数据保存在里面
  char[] cbuf = new char[20];
  int len;
  while ((len = isr.read(cbuf)) != -1) {

    // 输出方式1:
    String str = new String(cbuf);
    System.out.print(str);

    // 输出方式2:
    for(char c: cbuf) {
      System.out.print(c);
    }

    // 输出方式3:
    for(int i=0; i<len; i++) {
      System.out.print(cbuf[i]);
    }
  }

  // 关闭流
  isr.close();

  // 我们要使用try catch finally 不要忘记
}
```


- 需求:
- 目标文件是utf-8存的txt文件 我们综合使用 InputStreamReader 和 OutputStreamWriter 对utf-8存的txt文件转成gbk格式的txt文件 实现一个解码再另编码的过程

```java
@Test
public void testDecode() throws IOException {
  File srcFile = new File("Hello.txt");
  File destFile = new File("Hello_gbk.txt");

  // 创建输入字节流
  FileInputStream fis = new FileInputStream(srcFile);
  // 创建输出字节流
  FileOutputStream fos = new FileOutputStream(destFile);

  // 创建输入转换流
  InputStreamReader isr = new InputStreamReader(fis, "utf-8");

  // 创建输出转换流 指定编码的字符集
  OutputStreamWriter osw = new OutputStreamWriter(fos, "gbk");

  // 读写过程
  char[] cbuf = new char[20];
  int len;
  while((len = isr.read(cbuf)) != -1) {
    osw.write(cbuf, 0, len);
  }

  // 关闭资源
  osw.close();
  isr.close();
}
```

----------------------------

### 多种字符编码集的说明
- 计算机只能识别二进制数据 早期的由来是电信号
- 为了方便应用计算机 让它可以识别各个国家的文字 就将各个国家的文字用数字来表示
<!-- a - 97 -->

- 并一一对应 形成一张表 这就是编码表


> 常见的字符集
- 1. ASCⅡ:
- 美国标准信息交换吗 *用一个字节的7位可以表示*
<!-- 
  一个字节有8位 它有一个没有用 因为最高位是符号位 左右只有7位是用来表示数字的 2^8是256 2^7就是一半 128

  也就是只能表示128种情况 美国就够用
  一个字节就是8bit 最大是 1111 1111 可以表示256
  分成正负的话 也就是 -128 ~ 127
 -->

- 2. ISO8859-1:
- 拉丁码表 欧洲码表 *用一个字节的8位表示*

- 3. GB2312:
- 中国的中文编码表 *最多两个字节编码所有字符*
<!-- 
  每一个汉字都会对应一个数 一个汉字用两个字节来表示
  两个字节最大的范围是 65535
  分成正负的话 也就是 -32768~32767

  let num = 0b1111111111111111
  console.log(num.toString(10))   // 65535
 -->

- 4. GBK:
- 中国的中文编码表升级 融合了更多的中文文字符号 *最多两个字节编码*
<!-- 
  那 GBK 和 GB2312 最多用两个字节来表示

  那底层假如有两个字节 那这两个字节是表示一个字符还是两个字符？

  我们看首位 如果首位是0 该字节就是代表一个字符 下面两个字节就各代表一个字符
  --------  --------
  0         


  如果首位是1 就代表该字符一个字节表示不全 这时两个字节代表一个字符
  --------  --------
  1         
 -->

- 5. Unicode:
- 国际标准码 融合了目前人类使用的所有字符 为每个字符分配唯一的字符码
- *所有的文件都用两个字节表示*
<!-- 
  国家非常的多 不能一个国家整一个表 万一一个文件中有多国的文字 用谁读啊？
  所以我们创建了世界共用的一张表 哪个国家的一个字符都会对应着一个数
 -->

- 6. UTF-8
- 变长的编码方式
- *可用1-4个字节来表示一个字符*
<!-- 
  unicode有问题 内存层面存一个数是可以的 具体我们存在底层的文件上的时候就有问题的

  unicode是用两个字节去存 那也会出现跟GBK GB2312同样的问题
  两个字节是存一个字符还是两个字符

  --------  --------

  原来是2^16次方 但是如果使用首位标记01标记方法的话 那就剩2^15次方了
  就不够用了 

  2^16 -- 65535
  2^15 -- 32767

  所以就不能拿出一位用来标记两个字节到底是存一个字符还是两个字符
 -->

- utf-8  就是每次8个位去传递数据
- utf-16 就是每次16个位去传输数据

- 什么意思呢？
- 上面说了2个字节 如果想采用和GBK GB2312首位01标识的方式标记两个字节代表一个字符还是两个字符的方式 不行

- 会导致表数范围不够 那我们就想 我们可以用3个字节来表示 这样不就够了么？
- 又多带来一个问题
- 我们看首位 
- 如果首位是0 那就是想用一个字节
- 如果首位是1 那就是想用二个字节

- 二进制不是0就是1 那怎么表示三个字节的情况呢？

- 我们以utf-8为例
- 现在有一个数是用unicode表示的 该数是占一个字节？二个字节？三个字节？ 我们使用下面的方式来标记

- 如果是占用一个字节 那首位为0来标记      - 1个byte充当一个字符
<!-- 
  --------
  0
 -->

- 如果是占用二个字节 那前面用110来标记    - 2个byte充当一个字符
<!-- 
  --------  --------
  110       10
 -->

- 如果是占用三个字节 那前面用110来标记    - 3个byte充当一个字符
<!-- 
  --------  --------  --------
  1110      10        10
 -->

- 如果是占用三个字节 那前面用110来标记    - 4个byte充当一个字符
<!-- 
  --------  --------  --------  --------
  11110     10        10        10
 -->

- 后续的每一个字节的前面都有10作为填充位

> 举例：
- 尚
- 对应的unicode: 23578
- 十六进制: 5C1A
- 二进制: 0101 1100 0001 1010

- 现在我们这个数要存在底层的磁盘中 中文在utf-8中是3个字节存一个
- 尚的二进制： 0101 1100 0001 1010

- 我们要使用下面这种情况存储

  --------  --------  --------
  1110      10        10

- 所以我们就将 尚 的二进制 放在 1110的后面一个字节占满 把剩余的位数放在后一个字节的里面

  1110      10        10
  --------  --------  --------
      0101    110000    011010

- 相当于我们把尚对应的2进制数截成了3部分塞到了 utf-8对应的三个字节的规律空位上
- 底层看到首位1110 就知道将1110 10 10去掉剩下位置的数字提取出来拼接 就是 "尚"


**注意:**
- 在标准的utf-8编码中 超出基本多语言范围的字符 会4个字节表示
- 在后续的修正中可能使用6个字节

- unicode仅是字符集 该字符集定义了一个字符会对应一个编码 但是真正落地往底层去存的时候 读的时候 一个字符是一个字节还是二个字节还是三个字节

- 我们落地的 unicode的编码实现 我们提供了utf-8 utf-16 utf-32
<!-- 
  utf-32
    用固定的长度是存字符 不用utf-8的规律 就用4个字节存一个字符


  utf-16
    使用2或4个字节进行存储
 -->

----------------------------

### 标准的输入 输出流 -- System类
- System类有3个属性

> 属性:
- System.err
    标准的错误输出流

- System.in
    标准的输入流(默认从键盘输入)
    它就是键盘输入

- System.out
    标准的输出流(默认从控制台输出)
    它就是控制台输出


- 既然它们是属性的话就会有类型 比如 String name

- System.err的类型: PrintStream
- System.in的类型:  InputStream(IO体系中输入流的基类)
- System.out的类型: PrintStream

- 既然是属性的话也会有 set方法

> public static void setIn(InputStream in)
> public static void setOut(PrintStream out)
- 用来修改默认输入 和 默认输出
<!-- 
  重新指定输入和输出的位置
 -->


> 练习
- 练习System.in的操作
- 从键盘输入字符串 要求将读取到的整行字符串转成大写输出
- 然后继续进行输入操作 直至输入"e"或者"exit"时 退出程序

- 思考:
- 以前我们完成上述的操作是使用 Scanner 来完成的 现在我们使用System.in来完成

- 我们需要读到用户输入的一行数据 这里我们可以使用 readLine()方法 该方法相当于Scanner中的next()

- 那怎么才能从 System.in 到 readLine()呢？

- System.in 返回的是 InputStream 字节流
    - 我们需要的是字符流 所以我们要将 字节流 转成 字符流 就要用到 转换流

- 因为键盘输入 得到的是字节流 所以我们要用转换流InputStreamReader 将读到的结果转成char

- 转换流InputStreamReader需要的参数是输入字节流 而System.in的类型就是输入字节流的类型 所以我们可以传递进去

```java
// InputStreamReader是转换流 
// 它需要的参数就是InputStream输入字节流 而我们的System.in就是输入字节流类型, 同时System.in也代表从键盘输入
InputStreamReader isr = new InputStreamReader(System.in); // 断点不再是具体的file了 而是键盘输入


// InputStreamReader是Reader的子类 isr的类型就是Reader
// new BufferedReader()里面需要传递一个Reader isr就是
BufferedReader br = new BufferedReader(isr);

while (true) {
  System.out.println("请输入字符串: ");
  // 读到了一行数据
  String data = br.readLine();
  // 在忽略大小写的情况下 我们看看用户输入的是不是e 或者 exit
  if(data.equalsIgnoreCase("e")) {
    System.out.println("程序结束");
    break;
  }

  // 转成大写后输出
  System.out.println(data.toUpperCase());
}

// 关闭流
br.close();
```

----------------------------

### 打印流
- 实现将*基本数据类型*的数据格式转化为*字符串*输出
- 可以输出各种类型的数据

> 打印流
- 我们前面接触到的所有流都是成对的出现 一个输入一个输出
- 但是打印流不是 它两个都是输出

> PrintStream - 字节输出流
<!-- 
  System.out 就是一个 PrintStream
 -->

> PrintWriter - 字符输出流


> 特点
- 1. 提供了一系列重载的print()和println()方法 用于多种数据类型的输出

- 2. PrintStream和PrintWriter的输出不会抛出IOException异常
- 3. PrintStream和PrintWriter有自动flush功能
- 4. PrintStream打印的所有字符都使用平台的默认字符编码转换为字节 
- 5. 在需要写入字符而不是写入字节的情况下 应该使用PrintWriter类

- 5. System.out返回得是PrintStream的实例



> 利用System.setOut(); 将原本输出在控制台的内容输出到文件里面
- 保存我们原本在控制台输出的数据

```java
PrintStream ps = null; 
try {
  // 创建打印输出流,设置为自动刷新模式(写入换行符或字节 '\n' 时都会刷新输出缓冲区) ps = new PrintStream(fos, true);
  FileOutputStream fos = new FileOutputStream(new File("D:\\IO\\text.txt")); 

  ps = new PrintStream(fos, true);

  if (ps != null) {
    // 修改输出的位置 输出到文件 因为我们修改了输出的位置 下面再调用print方法就不会再在控制台输出了
    System.setOut(ps); 
  }

  // 输出ASCII字符 0-255 转成char输出 看看数字对应什么字符
  for (int i = 0; i <= 255; i++) { 
    System.out.print((char) i);

    if (i % 50 == 0) { // 每50个数据一行
      System.out.println(); // 换行 
    }
  }
  
  } catch (FileNotFoundException e) {
    e.printStackTrace(); 
  } finally {
    if (ps != null) { ps.close();
  }
  
```

----------------------------

### 数据流
- DataInputStream
- DataOutputStream
- 分别"套接"在InputStream OutputStream子类的流上面

- 作用:
- 用于读取或写出*基本数据类型的变量或字符串*
<!-- 
  调用对应的方法可以将内存中的基本数据类型和String写入到文件当中 保存起来

  也可以把写出去的文件还原到内存的层面
 -->


> DataInputStream中的方法
- 通过实例对象来调用
- boolean readBoolean()
- byte readByte()
- char readChar()
- short readShort()
- int readInt()
- float readFloat()
- double readDouble()
- long readLong()

- String readUTF()
<!-- 读字符串 -->
void readFully(byte[] b)
<!-- 读byte[] -->

> DataOutputStream中的方法
- 通过实例对象来调用
- write(int b)
- write(byte[] b, int offset, int len)
- write(byte[] b)

- writeInt(int v)
- writeLong(long v)
- writeBoolean(boolean v)
- writeByte(int v)
- writeBytes(String s)
- writeChar(int v)
- writeChars(String s)
- writeShort(int v)
- writeDouble(double v)
- writeFloat(float v)

- writeUTF(String str)


> DataOutputStream的实例化
> DataOutputStream dos = new DataOutputStream(节点流);
```java
DataOutputStream dos = new DataOutputStream(new FileOutputStream("data.txt"));

// 参数 是节点流
```
- 生成的文件不是让我们双击打开的方式读的 而是通过DataInputStream的方式读取的
- 双击打开有乱码的情况


> DataInputStream实例化
> DataInputStream dis = new DataInputStream(节点流);
- 将文件中存储的基本数据类型和字符串读到到内容中 保存在变量中

- 注意:
- 读取不同类型的数据的顺序要与当初写入文件时 保存的数据的顺序一致 不按顺序读取会报异常

```java
DataInputStream dis = new DataInputStream(new FileInputStream("data.txt"));
```


> 基本使用
- 将内存中的字符串 基本数据类型的变量写出到文件中
- 处理异常的话 仍然使用try catch finally
```java
DataOutputStream dos = new DataOutputStream(new FileOutputStream("data.txt"));

dos.writeUTF("sam");
// 每次写完可以显式的刷新缓冲区 写出去
dos.flush();

dos.writeInt(23);
dos.flush();

dos.writeBoolean(true);
dos.flush();

// 关闭
dos.close();
```


- 读取写出去的文件
- 要点:
- 写出的时候要按顺序写出 读的时候也要按照写出的顺序读取

```java
DataInputStream dis = new DataInputStream(new FileInputStream("data.txt"));

// 我们写的时候有顺序 从第一行到最后一行 我们读的时候也要按照这个顺序 写的时候最先是String 读的时候也要最先读String
String name = dis.readUTF();
int age = dis.readInt();
boolean sex = dis.readBoolean();

System.out.println(name + " " + age + " " + sex);

dis.close();
```

----------------------------

### 对象流
- 上面介绍了数据流 它只是对基本数据类型和字符串的读写操作 引用类型还不行 要想对对象进行持久化 我们就需要接触对象流

- ObjecctInputStream
- ObjectOutputStream
- 用于存储和读取*基本数据类型*数据或*对象*的处理流
- 比如:
- 我们的new Person new Student把类似这样的对象进行传输
<!-- 
  DataInputStream
  DataOutputStream 可以是用来处理基本类型数据

  ObjecctInputStream
  ObjectOutputStream 也可以处理基本数据类型 主要是处理对象的

  它的强大之处就是可以把java中的对象写入数据源中 也能把对象从数据源中还原回来
 -->

- 客户的两个进程之间 浏览器和服务器之间要想传输数据 这个数据得是可序列化的


> 序列化:   -- 保存
- 用*ObjectOutputStream*类*保存*基本类型数据或对象的机制
<!-- 
  序列化就是将对象写入到文件里
 -->

> 反序列化:  -- 读取
- 用*ObjectInputStream*类*读取*基本类型数据或对象的机制
<!-- 
  反序列化就是将写入文件的数据再读回到内存里
 -->


> 对象的序列化机制

- 序列化的过程:
- 该机制允许把内存中的java对象转换成平台无关的二进制流 从而允许把这种二进制流持久地保存在磁盘上 或通过网络将这种二进制流传输到另一个网络节点 

- 反序列化的过程:
- 当其它程序读取了这种二进制流 就可以恢复成原来的java对象

- 序列化的好处在于将任何实现了Serializable接口的对象转化为字节数据 使其在保存和传输时可被还原

<!-- 
  序列化是RMI(Remote Method Invoke - 远程方法调用) 过程的参数和返回值必须实现的机制 而RMI是Java EE的基础  
-->


> 可序列化的前提:
- *如果需要让某个对象支持序列化机制* 则必须让对象所属的类及其属性是可序列化的 为了让某个类是可序列化的 *该类必须实现*如下的*两个接口之一*, 否则会抛出*NotSerializableException*异常

- *Serializable*
- Extemalizable
<!-- 
  Serializable接口在io包下
 -->

- 注意:
- ObjectOutputStream 和 ObjectInputStream 不能序列化static和transient修饰的成员变量
<!-- 
  在我们序列化 自定义类的时候 如果自定义类的属性是
  static
  transient 
  修饰的话

  当我们序列化后 再进行反序列化的时候 
  static
  transient 
  修饰的变量 的结果都是默认值
 -->

```java
private static String name;
private transient int age;

// 这两个属性不能被序列化 其余的可以
```

> transient 关键字
- 如果有属性不想序列化的时候 我们可以拿它来进行修饰
- 作用:
- 不用被修饰的属性进行序列化

----------------------------

### 对象流(序列化反序列化操作字符串 / 自定义类)
- 序列化的过程: 
  - 将内存中的java对象保存到磁盘中 或 通过网络传输出去
  - 使用 ObjectOutputStream 实现


> ObjectOutputStream 实例化
> ObjectOutputStream oos = new ObjectOutputStream(节点流)
- 序列化的过程: 
- 将内存中的java对象保存到磁盘中 或 通过网络传输出去

- 下面的例子中我们选择用 .dat 文件来存储

> oos.writeObject(Object obj)
- write一系列的方法和数据流的差不多 但是多了一个它
```js
// 我们将一个字符串存储到.data文件中
oos.writeObject(new String("我是数据"));
```

- 注意:
- 需要显式的调用 flush()

- 基本使用:
```java
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("object.dat"));

oos.writeObject(new String("我是数据"));

// 需要显式的flush() 可以连续调用 持久化多个对象
oos.flush();

// 关闭流
oos.close();

// try catch finally 处理异常
```


> ObjectOutputStream 实例化
> ObjectInputStream ois = new ObjectInputStream(节点流);
- 反序列化的过程
- 将磁盘文件中的对象还原为内存中的一个java对象
- 使用 ObjectInputStream 实现

> ois.readObject()
- 读一个对象

- 返回值: 对象

```java
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("object.dat"));

Object obj = ois.readObject();
// 我们知道它是一个字符串 所以我们可以强转
String str = (String) obj;
System.out.println(str);
ois.close();
```


> 自定义类实现序列化与反序列化操作
- 这个部分我们将创建好的Person对象进行持久化到磁盘中 和 读到内存层面

- 自定义类(java对象)序列化的要点:
- 1. 自定义类需要实现 Serializable 接口 实现此接口后的自定义类都会被标识为可序列化的
- 没有具体的方法需要实现 因为接口中什么也没有 所以它也叫*标识接口*
```java 
  public class Person implements Serializable { ... }
```

- 2. 自定义类中必须声明一个 配置好的属性 全局常量
- public/private static final long serialVersionUID = 42L;
- 值我们自己指定 序列版本号 权限随意
<!-- 
  给该对象贴上标识 还原的时候不会出现问题
 -->

- 3. 除了当前Person类需要实现serializable接口之外 还必须保证其内容*所有属性也必须是可序列化*的 (默认情况下 基本数据类型是可序列化的)
<!-- 
  但是 如果 Person类中 定义了别的类的对象 
  那么这个类也要实现 Serializable 接口 和 提供 UID

  private Account acct;
 -->

```java
public class Person implements Serializable {
  // 必须
  public static final long serialVersionUID = 66212252345L;

  private String name;
  private int age;
}
```

- 异常:
- NotSerializableException (如果没有实现该接口会报错)


- 要点:
- 在反序列化的时候 我们要注意 先写出的什么 我们就要先读什么

```java
// 序列化
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("object.dat"));

oos.writeObject(new String("我是数据"));
oos.flush();

// 输出自定义类
oos.writeObject(new Person("sam", 18));
oos.flush();

// 关闭流
oos.close();



// 反序列化:
// 反序列化的过程: 指明要读进来的文件
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("object.dat"));

// 读取的时候也是有顺序的 先写什么就要先读什么
Object obj = ois.readObject();
String str = (String) obj;

// 读上面写入的对象
Object obj2 = ois.readObject();
// 强转为Person
Person p = (Person)obj2;

System.out.println(p.getName());
ois.close();



// 自定义类中的配置
public class Person implements Serializable {

  public static final long serialVersionUID = 66212252345L;
}
```


> serialVersionUID 的理解
- serialVersionUID是用来表明类的不同版本间的兼容性
- 简言之 其目的是以序列化对象进行版本控制 有关各版本反序列化时是否兼容

- 如果类中没有显示定义这个静态常量 它的值是java运行时环境根据类的内部细节自动生成的 *若类的实例变量做了修改* serialVersionUID可能发生变化 *所以要显式声明*

- 简单的来说 java的序列化机制是通过在运行时判断类的serialVersionUID来验证版本的一致性

- 在进行反序列化的时候 jvm会把传来的字节流中的serialVersionUID与本地相应实体类的serialVersionUID进行比较 如果相同就认为是一致的 可以序列化 

- 否则就会出现序列化版本不一致的异常(InvalidCastException)


> 简单的说
- 如果我们没有显式的定义UID那么java会自动生成 但是自动生成的UID会根据自定义类中的属性的变化发生变化

- 会导致序列化时 和 反序列化时的UID不一致 导致无法正常的还原

----------------------------

### RandomAccessFile - 任意存取文件流
- 该类既可以作为输入流 也可以做为 输出流
- 可读可写

- 它不是继承于我们上面的4个基类流 而是*直接继承于Object类*

- RandomAccessFile *实现了DataInput DataOutput接口*

- 因为继承了上面的两个接口 *所以这个流既可以做为输入流 又可以作为输出流*
<!-- 
  虽然RandomAccessFile既可以做为输入流 又可以作为输出流
  但是
  还是需要通过它造两个对象 一个对象是输出 一个对象管输入
 -->


> 特点:
- 写文件的时候 如果这个文件不存在可以帮我们创建文件
- 如果文件存在了 我们通过RandomAccessFile流去写数据的时候

- RandomAccessFile作为输出流出现时 写出到的文件如果不存在则在执行过程中自动创建
- 如果写出到的文件存在 则会对已存在的文件的内容 *从头开始进行覆盖操作, 能覆盖多少算多少*


**注意:**
- 从头开始进行覆盖操作 不是对文件的覆盖 也是从内容的开头位置 对原有文件内容进行覆盖
<!-- 
  源文件:
  abcdef

  // write("xyz".getBytes()) 后
  xyzdef
 -->


> 实例化 RandomAccessFile
> RandomAccessFile raf = new RandomAccessFile(file / "文件名", String mode)
- 参数:
- mode:
- 该参数指定 RandomAccessFile 的访问模式
- 1. r:   只可以读入 (作为输入流可以指定r)
- 2. rw:  既可以读入 也可以写出 (作为输出流指定rw)

- 3. rwd: 打开以便读取和写入 同步文件内容的更新
- 4. rws: 打开以便读取和写入 同步文件内容和元数据的更新

- 如果是r 则不会创建文件 而是读取一个已经存在的文件 如果读取的文件不存在则会出现异常

- 如果是rw 如果文件不存在则会去创建文件 如果存在则不会创建

<!-- 
  jdk1.6中上面写的每次write数据时
  rw模式 数据不会立即写到硬盘中
  rwd迷失 数据会被立即写入硬盘

  如果写数据过程发生异常 
  rwd模式中已被write的数据被保存到硬盘
  rw则全部丢失
 -->

- 基本使用:
```java
// 作为 输入流 出现的时候 传入读进来的位置 和 r
RandomAccessFile raf1 = new RandomAccessFile(new File("Hello.txt"), "r");

// 作为 输出流 出现的时候 输出的位置 和 rw
RandomAccessFile raf2 = new RandomAccessFile(new File("Hello_2.txt"), "rw");

byte[] buf = new byte[1024];
int len;
while((len = raf1.read(buf)) != -1) {
  raf2.write(buf, 0, len);
}

raf1.close();
raf2.close();
```


- 使用RandomAccessFile流进行写入操作的时候 是将目标文件的内容 从头开始进行覆盖操作

> 要点:
> "xyz".getBytes() 将字符串转换为byte[]
```java
// 创建一个作为写入的流
RandomAccessFile raf1 = new RandomAccessFile(new File("Hello.txt"), "rw");

// write()方法 比如要传入一个byte[] 我们可以将内容xyz转换为一个byte[]
raf.write("xyz".getBytes())
raf.close()

// 结果:
// 原来的abcdefg 变成 xyzdefg
```


> 注意:
- 该流流中的 write() 方法是一个覆盖操作 从头或指定位置开始能覆盖多少算多少的操作

----------------------------

### RandomAccessFile 实现数据的插入
- 原文件: abcdefg
- 需求:
- 我们想在abc的后面插入xyz

- RandomAccessFile对象 包含一个记录指针 用来标示当前读写处的位置
- 默认指针的位置是0: (首索引的位置是0)
- 代表在文件开头 


> RandomAccessFile实例对象.seek(long pos)
- 将文件记录指针定位到pos位置
- 从哪开始了 默认的位置是0
<!-- 
  当我们指定raf.write操作的时候 就代表从pos开始 执行能覆盖多少算多少的操作 
-->

- 返回值: 没有


> RandomAccessFile实例对象.getFilePointer()
- 获取文件记录指针的当前位置

- 返回值
- long


- 基本使用:
```java
// 我们在abc的后面插入xyz 索引从0开始的话 那目标所以就是3
  RandomAccessFile raf = new RandomAccessFile("Hello.txt", "rw");

  // 修改下指针的位置(相当于我们把光标插入哪里了吧)
  // 将指针调到角标为3的位置
  raf.seek(3);
  raf.write("xyz".getBytes());
  raf.close();
}

// 但是有个问题 raf.write() 是一个从指定位置开始 能覆盖多少算多少的操作 所以结果是 abcxyzg - 将def覆盖掉了
```

> 使用 RandomAccessFile 实现插入的效果
- raf.write()是一个从头或者指定指针位置开始的 能覆盖多少算多少的操作

- 所以当我们像上面那样操作后发现
- abc*def*g
- abc*xyz*g

- 也就是我们从指定指针位置开始覆盖了 那怎么才能做到插入的操作呢？

- 思路:
- 1. 我们要将目标插入位置后面的数据保存起来 也就是 defg
- 2. 注意当我们保存的过程中 指针也会移动 保存后的指针位置在文件的内容的最后
<!-- 
    a b c d e f g
          ↑

    // 复制完毕后 我们指针的位置是在最后
    a b c d e f g
                ↑

    // 调整指针的位置
    a b c d e f g
          ↑
 -->

- 3. 然后我们正常的执行raf.write()方法 此时指针的位置会自动在z的后面
<!-- 
  // 执行完后的效果
  abcxyzg
 -->

- 4. 将xyz后面的内容替换成 我们上面复制的内容


```java
// 我们在abc的后面插入xyz 索引从0开始的话 那目标所以就是3
RandomAccessFile raf = new RandomAccessFile("Hello.txt", "rw");

// 先调整指针的位置 到插入的目标位置
raf.seek(3);

// 因为目标位置后面的数据可能会很多 所以我们要使用循环来处理
byte[] buf = new byte[20];
int len;

// 为了避免StringBuilder再次扩容我们最好指定一个长度
StringBuilder builder = new StringBuilder((int) new File("Hello.txt").length());
while((len = raf.read(buf)) != -1) {
  // 将要复制的数据保存到字符串里面 将buf转成str
  // 这里就完成了将3后面的数据都保存在 builder 中了
  builder.append(new String(buf, 0, len));
}

// 因为上面的操作后 指针就跑到最后了 所以我们要将指针调整回来
System.out.println(raf.getFilePointer());
raf.seek(3);

// 写出去之后 指针就会在z的后面
raf.write("xyz".getBytes());

// 将builder中的数据进行写入
raf.write(builder.toString().getBytes());
raf.close();
```


> 方式2: ByteArrayOutputStream 流

> ByteArrayOutputStream实例化
> ByteArrayOutputStream baos = new ByteArrayOutputStream();

- 参数: 无
- 剩下我们自己研究下

- 插入消耗资源 通常我们都喜欢做追加而不是插入
- 上面我们使用了 StringBuilder 我们还可以使用 StringBuilder底层造一个数组

- ByteArrayOutputStream流来完成逻辑
<!-- 
  ByteArrayOutputStream也是一个输出流 但是我们看下面的代码中 我们没有在构造器中传入参数

  该流中也提供了一个数组
 -->
```java
ByteArrayOutputStream baos = new ByteArrayOutputStream();

byte[] buf = new byte[10];
int len;
while((len = fis.read(buf)) != -1) {
  // 这里我们会write到ByteArrayOutputStream流中的数组里面
  baos.write(buf, 0, len);
}
```


> RandomAccessFile 多线程断点续传
- 我们可以使用RandomAccessFile类来实现一个多线程断点下载的功能 我们下载工具都会在下载前建立两个临时文件 

- 一个是与被下载文件大小相同的空文件
<!-- 
  比如我们要下载一个1G文件 就会先创建一个空的1G文件
  然后将1G纷争4个部分 多线程 每一个线程将指针调整到每一个部分的开头
 -->
- 一个是记录文件指针的位置文件

- 每次暂停的时候都会保存上一次的指针 然后断点下载的时候 会继续从上一次的地方下载 从而实现断点下载或上传的功能

----------------------------

### NIO
- 从1.4版本开始引入的一套新的IO API可以代替标准的java io api
- nio与原来的io有同样的作用和目的 但是使用的方式完全不同 *nio支持面向缓冲区的*(io是面向流的) 基于通道的io操作

- *NIO将以更加高效的方式进行文件的读写操作*

- java api中提供了两套NIO :
  一套是针对标准输入输出NIO 
  一套就是网络编程NIO

- NIO中传输用的不是流 而是channel(通道)
 
| -- java.nio.channels.Channel

  | -- FileChannel: 处理本地文件

  | -- ScoketChannel: TCP网络编程的客户端的Channel
  | -- serverSocketChannel: TCP网络编程的服务器端的Channel
  | -- DatagramChannel: UDP网络编程中发送端和接收端的Channel


- nio2是jdk7中发布的 对nio进行了极大的扩展


> Path Paths Files核心的API
- 早期的java只提供了一个File类来访问文件系统 但File类的功能比较有限 所提供的方法性能也不高 而且 大多数方法在出错时仅返回失败 并不会提供异常信息

- NIO2为了弥补这种不足 引入了*Path接口* 代表一个平台无关的平台路径 描述了目录结构中文件的位置

> Path
- Path可以理解为NIO2中提供的一个类 *Path类就是用来替换原有的File*

- *Path可以看成File类的升级版本* 实际引用的资源也可以不存在
<!-- 
  在以前IO操作都是这样写:
  File file = new File("index.html")

  但是在java7中 我们可以这么写
  Path path = Paths.get("index.html")
 -->

- NIO2在java.nio.file包下提供了Files Paths工具类
- *Files*包含了大量*静态的工具方法来操作文件*
- *Paths*包含了两个*返回Path的静态工厂方法*


> Paths
- Paths是工具类 作用是创建Path的对象的(实例化)
- 我们通过调用 get() 方法来获取实例 -- Path对象


> Paths实例对象的方法

> 实例对象.toString()
- 返回调用Path对象的字符串表示形式

- 返回值:
- String


> 实例对象.startsWith(String path)
- 判断是否以path路径开始

- 返回值:
- boolean


> 实例对象.endsWith(String path)
- 判断是否以path路径结束

- 返回值:
- boolean


> 实例对象.getParent()
- 返回Path对象包含整个路径 不包含Path对象指定的文件路径

- 返回值:
- Path


> 实例对象.getRoot()
- 返回调用Path对象的根路径

- 返回值:
- Path


> 实例对象.getFileName()
- 返回与调用PAth对象关联的文件名

- 返回值:
- Path


> 实例对象.getNameCount()
- 返回path跟目录后面元素的数量

- 返回值:
- int


> 实例对象.getName(int idx)
- 返回指定索引位置idx的路径名称

- 返回值:
- Path


> 实例对象.toAbsolutePath()
- 作为绝对路径返回调用Path对象

- 返回值:
- Path


> 实例对象.resolve(Path p)
- 合并两个路径 返回合并后的路径对应的path对象

- 返回值:
- Path


> 实例对象.toFile()
- 将Path转化为File了的对象

- 返回值:
- File


------

> Files类
- 用于操作文件或目录的工具类

> Path copy(Path src, Path dest, CopyOption ... how)
- 文件的复制


> Path createDirectory(Path path, FileAttribute<?> ... attr)
- 创建一个目录


> Path createFile(Path path, FileAttribute<?> ... arr)
- 创建一个文件


> void delete(Path path)
- 删除一个文件/目录 如果不存在 执行报错


> void deletelfExists(Path path)
- Path对应的文件/目录如果存在 执行删除


> Path move(Path src, Path dest, CopyOption ... how)
- 将src移动到dest位置


> long size(Path path)
- 返回path指定文件的大小


> 用于判断的方法
> boolean exists(Path path, LinkOption ... opts)
- 判断文件是否存在


> boolean isDirectory(Path path, LinkOption ... opts)
- 判断是否是目录


> boolean isRegularFile(Path path, LinkOption ... opts)
- 判断是否是文件


> boolean isHidden(Path path)
- 判断是否是隐藏文件


> boolean isReadable(Path path)
- 判断文件是否可读


> boolwan isWritable(Path path)
- 判断文件是否可写


> boolean noExists(Path path, LinkOption ... opts)
- 判断文件是否不存在


> 用于操作内容
> SeekableByteChannel newByteChannel(Path path, OpenOption ... how)
- 获取与指定文件的连接 how指定打开方式

> DirectoryStream<Path> new DirectoryStream(Path path)
- 打开path指定的目录

> InputStream newInputStream(Path path, OpenOption ... how)
- 获取InputStream对象

> OutputStream newOutputStream(Path path, OpenOption ... how)
- 获取OutputStream对象 



> 常用方法的测试 Paths
```java
public class PathTest {

  //如何使用Paths实例化Path
  @Test
  public void test1() {
    //new File(String filepath)
    Path path1 = Paths.get("d:\\nio\\hello.txt");

    //new File(String parent,String filename);
    Path path2 = Paths.get("d:\\", "nio\\hello.txt");

    Path path3 = Paths.get("d:\\", "nio");
  }


  //Path中的常用方法
  @Test
  public void test2() {

    Path path1 = Paths.get("d:\\", "nio\\nio1\\nio2\\hello.txt");

    Path path2 = Paths.get("hello.txt");

    // String toString() ： 返回调用 Path 对象的字符串表示形式
    System.out.println(path1);


    // boolean startsWith(String path) : 判断是否以 path 路径开始
    System.out.println(path1.startsWith("d:\\nio"));


    // boolean endsWith(String path) : 判断是否以 path 路径结束
    System.out.println(path1.endsWith("hello.txt"));


    // boolean isAbsolute() : 判断是否是绝对路径
    System.out.println(path1.isAbsolute() + "~");
    System.out.println(path2.isAbsolute() + "~");


    // Path getParent() ：返回Path对象包含整个路径，不包含 Path 对象指定的文件路径
    System.out.println(path1.getParent());
    System.out.println(path2.getParent());


    // Path getRoot() ：返回调用 Path 对象的根路径
    System.out.println(path1.getRoot());
    System.out.println(path2.getRoot());


    // Path getFileName() : 返回与调用 Path 对象关联的文件名
    System.out.println(path1.getFileName() + "~");
    System.out.println(path2.getFileName() + "~");


    // int getNameCount() : 返回Path 根目录后面元素的数量
    // Path getName(int idx) : 返回指定索引位置 idx 的路径名称
    for (int i = 0; i < path1.getNameCount(); i++) {
      System.out.println(path1.getName(i) + "*****");
    }


    // Path toAbsolutePath() : 作为绝对路径返回调用 Path 对象
    System.out.println(path1.toAbsolutePath());
    System.out.println(path2.toAbsolutePath());


    // Path resolve(Path p) :合并两个路径，返回合并后的路径对应的Path对象
    Path path3 = Paths.get("d:\\", "nio");
    Path path4 = Paths.get("nioo\\hi.txt");
    path3 = path3.resolve(path4);
    System.out.println(path3);

    // File toFile(): 将Path转化为File类的对象

    //Path--->File的转换
    File file = path1.toFile();
    //File--->Path的转换
    Path newPath = file.toPath();
  }
}
```


> 常用方法的测试 Files
```java
@Test
public void test1() throws IOException{

  Path path1 = Paths.get("d:\\nio", "hello.txt");
  Path path2 = Paths.get("atguigu.txt");
		
  // Path copy(Path src, Path dest, CopyOption … how) : 文件的复制

  //要想复制成功，要求path1对应的物理上的文件存在。path1对应的文件没有要求。

  Files.copy(path1, path2, StandardCopyOption.REPLACE_EXISTING);
		
  // Path createDirectory(Path path, FileAttribute<?> … attr) : 创建一个目录
  //要想执行成功，要求path对应的物理上的文件目录不存在。一旦存在，抛出异常。
  Path path3 = Paths.get("d:\\nio\\nio1");
  Files.createDirectory(path3);
		
  // Path createFile(Path path, FileAttribute<?> … arr) : 创建一个文件
  //要想执行成功，要求path对应的物理上的文件不存在。一旦存在，抛出异常。
  Path path4 = Paths.get("d:\\nio\\hi.txt");
  Files.createFile(path4);
		
  // void delete(Path path) : 删除一个文件/目录，如果不存在，执行报错
  Files.delete(path4);
		
  // void deleteIfExists(Path path) : Path对应的文件/目录如果存在，执行删除.如果不存在，正常执行结束
  Files.deleteIfExists(path3);
		
  // Path move(Path src, Path dest, CopyOption…how) : 将 src 移动到 dest 位置
  //要想执行成功，src对应的物理上的文件需要存在，dest对应的文件没有要求。
  Files.move(path1, path2, StandardCopyOption.ATOMIC_MOVE);
		
  // long size(Path path) : 返回 path 指定文件的大小
  long size = Files.size(path2);
  System.out.println(size);

}

@Test
public void test2() throws IOException{
  Path path1 = Paths.get("d:\\nio", "hello.txt");
  Path path2 = Paths.get("atguigu.txt");
  // boolean exists(Path path, LinkOption … opts) : 判断文件是否存在
  System.out.println(Files.exists(path2, LinkOption.NOFOLLOW_LINKS));

  // boolean isDirectory(Path path, LinkOption … opts) : 判断是否是目录
  //不要求此path对应的物理文件存在。
  System.out.println(Files.isDirectory(path1, LinkOption.NOFOLLOW_LINKS));

  // boolean isRegularFile(Path path, LinkOption … opts) : 判断是否是文件

  // boolean isHidden(Path path) : 判断是否是隐藏文件
  //要求此path对应的物理上的文件需要存在。才可判断是否隐藏。否则，抛异常。
  System.out.println(Files.isHidden(path1));

  // boolean isReadable(Path path) : 判断文件是否可读
  System.out.println(Files.isReadable(path1));
  // boolean isWritable(Path path) : 判断文件是否可写
  System.out.println(Files.isWritable(path1));
  // boolean notExists(Path path, LinkOption … opts) : 判断文件是否不存在
  System.out.println(Files.notExists(path1, LinkOption.NOFOLLOW_LINKS));
}

/**
  * StandardOpenOption.READ:表示对应的Channel是可读的。
  * StandardOpenOption.WRITE：表示对应的Channel是可写的。
  * StandardOpenOption.CREATE：如果要写出的文件不存在，则创建。如果存在，忽略
  * StandardOpenOption.CREATE_NEW：如果要写出的文件不存在，则创建。如果存在，抛异常
  *
  * @author shkstart 邮箱：shkstart@126.com
  * @throws IOException
  */
@Test
public void test3() throws IOException{
  Path path1 = Paths.get("d:\\nio", "hello.txt");

  // InputStream newInputStream(Path path, OpenOption…how):获取 InputStream 对象
  InputStream inputStream = Files.newInputStream(path1, StandardOpenOption.READ);

  // OutputStream newOutputStream(Path path, OpenOption…how) : 获取 OutputStream 对象
  OutputStream outputStream = Files.newOutputStream(path1, StandardOpenOption.WRITE,StandardOpenOption.CREATE);


  // SeekableByteChannel newByteChannel(Path path, OpenOption…how) : 获取与指定文件的连接，how 指定打开方式。
  SeekableByteChannel channel = Files.newByteChannel(path1, StandardOpenOption.READ,StandardOpenOption.WRITE,StandardOpenOption.CREATE);

  // DirectoryStream<Path>  newDirectoryStream(Path path) : 打开 path 指定的目录
  Path path2 = Paths.get("e:\\teach");
  DirectoryStream<Path> directoryStream = Files.newDirectoryStream(path2);
  Iterator<Path> iterator = directoryStream.iterator();
  while(iterator.hasNext()){
    System.out.println(iterator.next());
  } 
}
```

----------------------------

### jar包的使用
- jar相当于一个js包 项目中引入jar包后 就可以使用jar对应的api
- 使用方式:
- 在module下创建libs文件夹 将jar包放进去 然后在jar文件上右键 - add as library

> FileUtils测试
- 我们引入了老师提供的jar 这个FileUtils就在这个jar包下面

- 比如我们想实现一个复制文件的功能 在开发中一般都会调用第三方的jar包来实现 一般不用自己写

```java
public static void main(String[] args) throws IOException {
  // 复制一个文件 main方法的路径要注意一下
  File srcFile = new File("Hello.txt");
  File destFile = new File("Hello2.txt");
  FileUtils.copyFile(srcFile, destFile);
}
```

----------------------------

### 网络编程概述
> 计算机网络
- 把分布在不同地理区域的计算机与专门的外部设备用通信线路连成一个规模大 功能强的网络系统 从而使众多的计算机可以方便地互相传递信息 共享硬件 软件 数据信息等资源


> 网络编程的目的
- 直接或间接地通过网络协议与其他计算机实现数据交换 进行通讯


> 网络编程中两个主要的问题
- 1. 如何准确地定位网络上一台或多台主机 定位主机上的特定的应用
- 2. 找到主机后如何可靠高效地进行数据传输


> IP和端口号
- IP:
  网络中唯一的一台主机

- 端口号:
  用来区分一个主机上的不同的应用程序

- 安全可靠的传输的规则:
- 规则: 网络通信协议(有两台参考模型)

- 1. OSI参考模型:
  模型过于理想化 未能在因特网上进行广泛推广

- 2. TCP/IP参考模型(TCP/IP协议) 
  事实上是国际标准


> 通信协议
- 计算机网络中实现通信必须有一些约定 即*通信协议， 对速率 传输代码 代码结构 传输控制步骤 出错控制等制定标准*


> 问题:
- 网络协议太复杂 计算机网络通信涉及内容很多 比如指定源地址和目标地址 加密解密 压缩解压缩 差错控制 流量控制 路由控制 如何实现如此复杂的网络协议？


> 通信协议分层的思想
- 在制定协议时 把复杂成分分解成一些简单的成分 再将它们复合起来 最常用的复合方式是层次方式
- 即*同层间可以通信 上一层可以调用下一层 而与再下一层不发生关系* 各层互不影响 利于系统的开发和扩展


> 图解
<!-- 
    OSI参考模型     TCP/IP参考模型    TCP/IP参考模型
                                    各层对应协议
    ---------       ---------      ---------
    应用层                           HTTP FTP
    ---------
    表示层            应用层          DNS Telnet
    ---------
    会话层
    ---------       ---------      ---------
    传输层            传输层          TCP UDP
    ---------       ---------      ---------
    网络层            网络层          IP ICMP ARP
    ---------       ---------      ---------
    数据链路层
    ---------       物理+链路        Link
    物理层
    ---------       ---------      ---------
 -->

- OSI参考模型将网络一共分成了7层 但是它划分的有些太细了 在实施的过程中有一些困难 在实际落地层面我们都是执行的 TCP/IP参考模型划分了4层

- 它们当中上一层和下一层之间是可以进行数据传输的

- 数据的传输的过程
- 我们的数据封装后开始传输从应用层开始层层封装 到物理层后开始进行传输出去 
- 然后在另一端从物理层开始拆封 层层拆封后到应用层再次的做展现
<!-- 
  像从淘宝购物 卖家把杯子打包 杯子易碎在里面加了泡沫 这就是封装的过程

  买家拿到快递后拆封就是数据拆封的过程
 -->

> 网络编程中的两个要素
- 1. 提供 IP和端口号
- 2. 提供 网络通信协议(TCP/IP参考模型 应 传 网 物+链)


> IP地址 (InetAddress类)
- InetAddress
- IP地址用来标识互联网上的一台计算机(通信实体)
<!-- 
  比如我们想进行本地文件的读入 我们需要对应一个file
  这个file就对应着真实的硬盘中的一个文件

  IP地址就是我们进行网络传输的一个终点 或者叫做节点 节点就叫做IP

  在java中我们要考虑使用一个类来表示IP 就像用File类的对象表示真实存在的一个文件一样 
  这里我们就要用到一个类 -- InetAddress类
 -->


> InetAddress类
- 在java中使用InetAddress类代表具体的IP
- 相当于一个InetAddress类的实例对象 就代表一个IP地址


> IP地址的分类方式1:
- 分为 *IPV4 和 IPV6*

- IPV4:
- 四个字节组成, 4个0-255
<!-- 
  IP地址分成4个部分
  每个部分为0-255

  0-255 . 0-255 . 0-255 . 0-255

  大概有42亿个数量 30亿都在北美 亚洲4亿 2011年初ipv4已经用尽 以点分十进制标识 未来就要倒向ipv6了
 -->
- IPV4的写法如 *192.168.0.1*


- IPV6:
- IPV6使用16进制来表示
- 128位(16个字节) 写成8个无符号整数
<!-- 
  ipv4分成4个部分 ipv6分成8个部分 每个部分有4位 用16进制表示
  每个整数用4个16进制位表示 数之间用冒号(:)
 -->

- IPV6的写法如：
  *3ffe:3201:1401:1280:c8ff:fe4d:db39:1984*

<!-- 
  也许以后我们能给生活中的任何一个物件 可以给它分配个ip地址 实现万物互联 真正的物联网 但是ipv4已经用尽了肯定做不到

  现在我们表示一个ip的话还是习惯用ipv4的方式
 -->


> IP地址分类方式2:
- 分为 *公网地址(万维网使用)* 和 *私有地址(局域网使用)*
- 192.168.开头的就是私有地址 
  范围即为192.168.0.0 - 192.168.255.255 专门为组织机构内部使用

- 特点: 不易记忆


> 域名
- IP地址比较抽象不容易记忆 我们通过域名的方式也能访问一个IP地址

- 通过域名访问IP地址的方式:
- 1. 地址栏键入 www.baidu.com

- 2. 将域名发送给dns域名解析服务器 它会帮我们将域名解析出来 域名的ip地址对应多少

- 3. 拿着解析后的IP地址访问对应的服务器 请求资源
<!-- 
  我们电脑里面有一个hosts文件 里面也是域名和IP地址的对应关系
  先在本地找 本地没有再发送给dns服务器

  先找本机hosts 是否有输入的域名地址 没有的话 再通过dns服务器 找主机
 -->


> 本地回路地址(hostAddress): 127.0.0.1
- 表示本机地址
- 127.0.0.1 - localhost
<!-- 
  比如我们后面接触到的数据库 
  我们在本机上装了一个mysql的数据库服务器
  然后我们还会在本机上装一个mysql的客户端 然后我们使用客户端软件访问自己主机的数据库服务器 我们会看到ip地址那写的就是localhost
 -->


> InetAddress的基本使用
- InetAddress类的构造器被私有化了 当我们调用它的静态方法会帮我们返回一个InetAddress实例

> InetAddress实例化方式1:
> InetAddress.getAllByName(String host)
> InetAddress.getByName(String host)
- 参数:
- host: 主机名 或者 我们可以写具体的IP

- 返回值:
- InetAddress类型

- 异常:
- UnknownHostException

> InetAddress实例化方式2:
> InetAddress.getAllByName(String 域名)
> InetAddress.getByName(String 域名)

```java
// 参数的方法1:
InetAddress inet1 = InetAddress.getByName("192.168.0.66");
System.out.println(inet1);
// /192.168.0.66

// 参数的方法2:
InetAddress inet2 = InetAddress.getByName("www.baidu.com");
System.out.println(inet2);
// www.baidu.com/119.63.197.139
```


> InetAddress.getLocalHost()
- 获取本机的ip地址

```java
InetAddress inet3 = InetAddress.getLocalHost();
System.out.println(inet4);
// orannoMacBook-Pro.local/192.168.3.10

// 我们在局域网内 表示成这样的一个IP了 local/192.168.3.10 还是我本机

// 实例对象.getHostName() 我们可以通过这个拿到127.0.0.1
```


> 实例对象.getHostName()
- 获取域名

- 返回值:
- String

```java
InetAddress inet3 = InetAddress.getByName("localhost");
String hostName = inet3.getHostName();
System.out.println("hostName: " + hostName);
// hostName: localhost
```


> 实例对象.getHostAddress()
- 获取主机ip地址

- 返回值:
- String

```java
InetAddress inet3 = InetAddress.getByName("localhost");
String hostAddress = inet3.getHostAddress();
System.out.println(hostAddress);
// 127.0.0.1
```


> 实例对象.getAddress()
- 或者ip地址的byte[]
- 返回得是byte[] ip地址的每一部分就是其中的一个元素
<!-- 
  {127, 0, 0, 1}
 -->

- 返回值:
- byte[]

```java
InetAddress inet3 = InetAddress.getByName("127.0.0.1");
byte[] address = inet3.getAddress();
System.out.println(address.length); // 4

// 输出需要遍历
```


> 端口号
- 端口号标识正在计算机上运行的进程(程序)
- 不同的进程有不同的端口号 被规定为一个16位的整数 0~65535
<!-- 
  每一个进程都有对应的一个端口号 我们可以通过IP地址定位到主机
  我们到底要跟哪一个进程进行通信 也要是明确的才可以 

  不同的进程对应不同的端口号
 -->


> 端口分类
- 1. 公认端口:
  0~1023: 被预先定义的服务通信占用
  (比如: HTTP占用80端口, FTP占用21端口, Telnet占用23端口)

- 2. 注册端口:
  1024-49151: 分配给用户进程或应用程序
  (比如: Tomcat占用8080端口, mysql占用3306端口, Oracle占用1521端口)

- 3. 动态 / 私有端口:
  49152~65535

- 端口号与IP地址的组合得出一个网络套接字: Socket
<!-- 
  IP地址和端口号相当于组成了一个节点 这个节点就可以叫做socket
  我们传输要用得就是一个socket

  网络通信 通常也叫做 socket通信 也叫socket编程
 -->

----------------------------

### 网路协议
### TCP UDP 网络通讯协议的对比
- 我们知道对方的主机和端口号 还要知道怎么去传 有什么样的规则 这个规则就是协议
<!-- 
  在传输中遵循的规则就是协议 但实际上因为协议太复杂了 所以我们进行了分层
  一层层的去说明 每一层解决每一层的问题
 -->

- 在传输层中有两个非常重要的协议
- 1. 传输控制协议TCP
- 2. 用户数据报协议UDP

> TCP/IP以及两个主要协议
- *传输控制协议(TCP)*和*网络互联协议(IP)*而得名 实际上是一组协议 包括多个具有不同功能且互为关联的协议

- IP协议是网络层的主要协议 支持网间互联的数据通信
- TCP/IP协议模型从更实用的角度触发 形成了高效的四层体系结构 即物理链路层 IP层 传输层 和 应用层


> TCP和UDP
- 它们虽然都是传输层的协议但是规则不一样


> TCP协议:
- 使用TCP协议前 *须先建立TCP连接* *先形成传输数据通道*
- 传输前采用 3次握手 方式 点对点通信 *可靠的*
<!-- 
  客户端发送数据到服务端 
  发送前先进行一次握手 通过握手确定对方在了 我们再发送数据

  三次握手

  1
      ↘
            2
      ↙
  3

  
  我是sam

        ↘

          我知道你是sam 
          我是马云

        ↙

  我知道 
  你知道我是sam 你是马云
  我是sam
 -->

- TCP协议进行通信的两个应用进程: 客户端 服务端
- 在连接中可*进行大数据的传输*
- 传输完毕 需*释放已建立的连接* 效率低(相对于UDP)
<!-- 
  释放连接的时候需要进行4次挥手
  客户端和服务器都可以主动的进行挥手(想断开连接)
  在socket编程中 任何一方执行close()操作即可产生挥手操作

   
  1 

            2

            3

  4


  客户端: 
  我想断开连接了


          服务端: 我接到你想断开连接的信息了
          服务端: 我现在已经断开连接了


  客户端: 
  再次发送消息 验证看看服务端能否接收到
  能接到就说明没断开
  发出去后没有后话了 就是真断开了
 -->


> UDP协议:
- 将 数据源 目的地 封装成数据包 *不需要建立连接*
- 每个数据报的大小限制在64k内
<!-- 
  数据多的时候需要发送很多的数据包
 -->

- 发送不管对方是否准备好 接收方收到也不确认 故是
*不可靠的*
<!-- 没有握手一顿发 -->
- 可以广播发送
- 发送数据结束时*无需释放资源 开销小 速度快*


> UDP的应用场景
- 看网络视频 正常播放就是 丢几桢也没关系


- TCP相当于打电话
- UDP相当于发短信

----------------------------

### TCP的网络编程
- 这节里面我们看看TCP网络编程在代码层面的体现

- 实现TCP网络编程一般都会有两个角色: 
- 1. 客户端
- 2. 服务器

- 下面的代码中 我们利用两个 @Test 来充当客户端和服务器
- 来完成 客户端发送一句话给服务端 服务端将数据显式在控制台上 的逻辑

> 思考:
- 客户端需要发送数据 之前我们需要先指明一个文件 现在我们不指明文件 直接在内存层面写一句话 然后通过流去输出

- 1. 客户端的逻辑:
- 我们是要给服务器发送的 那就要知道服务端是哪个IP和端口号 上面我们说了IP和端口号会封装为一个socket

- 所以我们要先创建一个scoket 里面就包含了具体的IP和端口号了 指明我们要往哪个目的地发送数据

- 通过scoket对象我们能获取输入输出流 然后我们通过输出流来写数据
- 最后关闭资源 流 和 socket都是资源 都需要关闭


- 2. 服务端的逻辑
- 首先我们要创建服务器端的socket对象
- 通过服务器端的socket对象 调用accept() 开始监听 当有连接接过来的时候 accept()就会将接收到的数据 包装成socket对象返回

- 我们通过调用socket获取输入流来读客户端发送过来的数据


> 客户端 Socket的实例化
> Socket socket = new Socket(InetAddress address, int port)
- 作用:
- 实例化socket对象 指明服务器的IP地址和端口号
- 将ip地址和端口号封装成一个socket对象

- 参数:
- IP地址
- 端口号

```java
InetAddress inet = InetAddress.getByName("127.0.0.1");

Socket socket = new Socket(inet, 8899);
```


> 客户端socket实例对象.getOutputStream();
- 获取字节输出流 用来发送数据

- 返回值:
- OutputStream

```java
OutputStream os = socket.getOutputStream();
os.write("你好, 我是客户端MM".getBytes());
```
<!-- 
  客户端实例对象.getInputStream()
  - 获取字节输入流对象 用来接收数据

  - 返回值:
  - InputStream
 -->


> 服务端 Socket的实例化
> ServerSocket ss = new ServerSocket(int port);
- 创建服务器的socket对象 并指明自己的端口号

- 参数:
- port
- 对于服务器来说 只需要指明服务器的端口号就可以
<!-- 
  服务器指明服务器的端口号为8899
  客户端就可以向8899发送数据

  也就是说 服务器说 我就是8899 来吧
  其实是先有服务器的ss 然后才有客户端的socket对象
 -->


> 服务器serversocket对象.accept();
- 相当于开始监听 监听客户端发送的socket 
- 一旦接收到 将数据包装成socket对象返回

- 返回值
- socket


> socket.getInputStream();
- 返回字节输入流对象
- 这个是服务端accept()方法返回得socket对象 里面有接收到客户端的数据
<!-- 
  socket.getOutputStream();
  - 返回字节输出流对象
  - 可以给客户端发送数据
 -->

> 总结下
- 客户端和服务端都有socket对象 socket对象身上有两个方法
- getInputStream()
- getOutputStream()
- 分别能获取字节输入流 字节输出流用于客户端和服务端互相发送数据



> socket.shutdownOutput();
> socket.shutdownInput();
- 当传输完毕后 我们要调用该方法表示 数据输入/输出结束 关闭输入/输出的操作
<!-- 
  read()方法是一个阻塞方法
  在两端互传输数据的时候 比如我们的例子中会往服务器端传输一张图片
  当我们传输完毕的时候 我们要显式的调用
  socket.shutdownOutput(); 表示传输结束 这样服务端才能走下去



  while ((len = fis.read(buf)) != -1) {
    os.write(buf, 0, len);
  }

  // 当客户端将数据传完以后 关闭数据的输出
  socket.shutdownOutput();
 -->



> ByteArrayOutputStream baos = new ByteArrayOutputStream();
- 它是处理流中的一种 字节输出流
- 该流内部会有一个自动扩容的数组 我们使用该流可以将数据先读到这个流对象内部 然后统一输出
<!-- 
- 访问数组 (处理流)
  ByteArrayInputStream    (字节输入流)
  ByteArrayOutputStream   (字节输出流)
  CharArrayReader   (字符输入流)
  CharArrayWriter   (字符输出流)
 -->

- 参数: 无



> 代码部分
```java
// 客户端
// 创建客户端Socket对象 指明服务器端的IP和端口号
InetAddress inet = InetAddress.getByName("127.0.0.1");
Socket socket = new Socket(inet, 8899);

// 返回输出流对象 获取一个输出流 用于输出数据 给服务端发送数据
OutputStream os = socket.getOutputStream();
// 因为是字节流 写出数据的操作
os.write("你好, 我是客户端MM".getBytes());

// 流和socket都是资源都需要关闭
os.close();
socket.close();



// 服务端
// 创建服务器端的socket ServerSocket 指明自己的端口号(服务器)
ServerSocket ss = new ServerSocket(8899);

// 监听客户端发送过来的socket 表示我们可以接收来自客户端的socket
Socket socket = ss.accept();
// socket.getInputStream(); 返回输入流 获取输入流
InputStream is = socket.getInputStream();


// 读取数据方式1:  不建议使用该方式
byte[] buf = new byte[5];
int len;
while((len = is.read(buf)) != -1) {
  String str = new String(buf, 0, len);
  System.out.print(str);
}

- 不建议方式1:
- 因为客户端发送的文本有中文: 你好呀 我是客户端...
- 如果我们的buf的长度是5 utf-8一个汉字是3 那么就会有汉字被拆成一半的现象发生 也就是会有乱码
- 解决方式: 可以将buf的长度加长 但是加多长没办法确定
- 所以我们推荐使用 ByteArrayOutputStream


// 读取数据方式2: ByteArrayOutputStream
ByteArrayOutputStream baos = new ByteArrayOutputStream();
// 不用管长度的问题
byte[] buf = new byte[5];
int len;
while((len = is.read(buf)) != -1) {
  // 会将buf中的数据写入baos类中的一个数组里面 只管往里面写就可以 不够的话会自动扩
  baos.write(buf, 0, len);
}


// 将里面的字节数组 转换为字符串了
System.out.println(baos.toString());


// 查看客户端的IP地址
System.out.println(socket.getInetAddress().getHostAddress());
baos.close();
is.close();
socket.close();

// 如果不需要连接的话就关闭 如果需要一直连接就不要关闭
ss.close();
```

- 理解下整个流程:
- 我们有两个岛(客户端岛A 和 服务端岛B)
- 现在A岛要将产品送往B岛进行买卖 两个岛之间我们需要用船来运输
- 这个小船就相当于(socket) 小船里面装产品(数据)

- A岛的小船需要知道要送往哪个岛的哪个港口(IP和端口号)
- 比如B岛要指明港口(端口号) 该港口一旦接收到小船后就获取小船中的产品(数据)



> TCP的网络编程 练习2
- 客户端发送文件给服务端 服务端将文件保存在本地
```java
// 客户端
@Test
public void client() throws IOException {
  // 创建客户端socket对象 指明服务器的地址和端口号
  Socket socket = new Socket(InetAddress.getByName("127.0.0.1"), 8899);

  // 传输数据造一个字节输出流
  OutputStream os = socket.getOutputStream();

  // 传输文件 先获取一个输入流将文件读到内存的层面
  FileInputStream fis = new FileInputStream("pic_safety_001.jpg");
  byte[] buf = new byte[1024];
  int len;
  while ((len = fis.read(buf)) != -1) {
    os.write(buf, 0, len);
  }

  os.close();
  fis.close();
  socket.close();
}


// 服务端
@Test
public void server() throws IOException {
  // 创建服务端的socket对象 指明端口号
  ServerSocket ss = new ServerSocket(8899);
  Socket socket = ss.accept();
  // 获取输入流is
  InputStream is = socket.getInputStream();

  // 将获取图片的流保存到本地中 获取输出流fos
  FileOutputStream fos = new FileOutputStream("test.jpg");
  byte[] buf = new byte[1024];
  int len;
  while ((len = is.read(buf)) != -1) {
    fos.write(buf, 0, len);
  }

  fos.close();
  is.close();
  socket.close();
}
```


> TCP的网络编程 练习3
- 从客户端发送文件给服务端 服务端保存到本地 并返回"发送成功" 给客户端 客户端将信息显示在控制台上 并关闭相应的连接
```java
@Test
public void client() throws IOException {
  Socket socket = new Socket(InetAddress.getByName("127.0.0.1"), 8899);

  OutputStream os = socket.getOutputStream();

  FileInputStream fis = new FileInputStream("pic_safety_001.jpg");

  byte[] buf = new byte[1024];
  int len;
  while ((len = fis.read(buf)) != -1) {
    os.write(buf, 0, len);
  }
  // read() 该方法是一个阻塞时的方法 我们现在是两端 也就是客户端和服务端 而read是一个阻塞的方法 也就是说我们要明确的指出数据输入或输出完成 服务端才知道客户端输出完毕 我可以接收了

  // 当客户端将数据传完以后 关闭数据的输出
  socket.shutdownOutput();

  // 接收来自于服务器端的数据 并显示到控制台上
  InputStream is = socket.getInputStream();
  // 要想在控制台上输出服务端发送过来的数据而不出现乱码 我们还是要使用
  ByteArrayOutputStream baos = new ByteArrayOutputStream();
  byte[] buffer = new byte[5];
  int len2;
  while ((len2 = is.read(buffer)) != -1) {
    baos.write(buffer, 0, len2);
  }

  System.out.println(baos.toString());

  os.close();
  fis.close();
  socket.close();
  baos.close();
}

@Test
public void server() throws IOException {
  ServerSocket ss = new ServerSocket(8899);
  Socket socket = ss.accept();
  InputStream is = socket.getInputStream();

  FileOutputStream fos = new FileOutputStream("test.jpg");
  byte[] buf = new byte[1024];
  int len;
  while ((len = is.read(buf)) != -1) {
    fos.write(buf, 0, len);
  }

  // 服务器端给予客户端反馈
  // 通过 Socket socket = ss.accept(); 返回的socket对象 调用getOutputStream()向客户端发送数据
  OutputStream os = socket.getOutputStream();
  os.write("你好, 照片已收到".getBytes());


  fos.close();
  is.close();
  socket.close();
  os.close();
}
```

----------------------------

### UDP网络编程
- 类 DatagramScoket 和 DatagramPacket 实现了基于UDP协议网络程序
- UDP数据报通过数据报套接字DatagramSocket发送和接收, *系统不保证UDP数据报一定能够安全送到目的地 也不能确定什么时候可以抵达*
<!-- 
  它就只管发 它可以发送很多个DatagramPacket数据包(报) 
  DatagramPacket里面封装了数据
 -->

- DatagramPacket对象封装了UDP数据报 在数据报中包含了发送端的IP地址和端口号以及接收端的IP地址和端口号

- UDP协议中每个数据报都给出了完整的地址信息 因此无须建立发送方和接收方的连接如同发快递包裹一样

- 在UDP网络编程中的两个角色 习惯成为发送端和接收端


> 发送方的逻辑
> DatagramScoket实例化 socket对象
> DatagramSocket socket = new DatagramSocket()
- 我们调用空参的构造器 实例化socket对象
<!-- 
  因为我们不会把从哪来的 目的地 数据放到DatagramSocket里面 
  我们主要都放在 DatagramPacket数据报 里面
 -->


> DatagramPacket实例化 packet对象
- 用于存储数据报 指明接收方的IP地址和端口号

> DatagramPacket packet = new DatagramPacket(byte[] buf, int offset, int len, InetAddress address, int port)
- 参数:
- byte[] buf, int offset, int len 可以指明数据是不是要都发 或者 指明发送哪一段的数据

```java
// 封装数据报
String str = "我是UDP方式发送的数据";  // 变成字节数组
byte[] data = str.getBytes();
InetAddress inet = InetAddress.getByName("localhost");

DatagramPacket packet = new DatagramPacket(data,0,data.length,inet,9090);
```

> socket对象.send(packet数据报)
- 用来发送数据报
```java
socket.send(packet);
```


> 接收端
- 它用的也是DatagramSocket实例化socket对象 但是要在构造器中指明接收端的端口号

> DatagramSocket socket = new DatagramSocket(int port)
- 接收端实例化socket对象的时候要指明端口号

> DatagramPacket packet = new DatagramPacket(byte[] buf, int offset, int lenth);
- 接收端也需要实例化packet对象 用于指明接收的数据放在哪里


> socket.receive(packet数据报)
- 该方法用来接收数据

> packet.getData()
- 用于获取封装在packet数据报中的数据

> packet.getLength()
- 用于获取封装在packet数据报中的数据的长度


> 代码部分
- 发送方:
```java
@Test
public void sender() throws IOException {
  // 使用 DatagramSocket 实例化 socket 我们使用空参的构造器就可以 
  // 因为我们不会把从哪来的 目的地 数据放到DatagramSocket里面 我们主要都放在DatagramPacket数据报里面
  DatagramSocket socket = new DatagramSocket();


  // 实例化packet 参数 byte[] buf, int offset, int len, InetAddress address, int port
  // 封装数据报
  String str = "我是UDP方式发送的数据";  // 变成字节数组
  byte[] data = str.getBytes();
  InetAddress inet = InetAddress.getByName("localhost");
  DatagramPacket packet = new DatagramPacket(data,0,data.length,inet,9090);


  // 通过socket对象发送数据报
  socket.send(packet);

  // 关闭socket
  socket.close();
}
```


- 接收端:
```java
@Test
public void receiver() throws IOException {
  DatagramSocket socket = new DatagramSocket(9090);

  // 创建接收数据的数据报
  byte[] buf = new byte[100]; // 要考虑容量的问题 造小了 byte[]接收不完
  // 把数据都封装在packet里面
  DatagramPacket packet = new DatagramPacket(buf,0,buf.length);
  // 接收数据到packet里面
  socket.receive(packet);

  // 我们将二进制数据输出到控制台
  // 调用packet中的方法获取数据
  String str = new String(packet.getData(), 0, packet.getLength());

  // 输出到控制台
  System.out.println(str);

  // 关闭资源
  socket.close(); 
}
```

- 注意:
- 这个部分的异常处理还是需要使用 try catch finally

----------------------------

### URL类的理解与实例化
- URL: 统一资源定位符 它表示internet上某一个资源的地址

- 它是一种具体的URI 即URL可以用来标识一个资源 而且还指明了如何locate这个资源

- 通过URL我们可以访问internet上的各种网络资源
- 比如 最常见的www, ftp站点 浏览器通过解析给定的URL可以在网络上查找相应的文件或其他资源

> URL的基本结构由5部分组成

  <传输协议>://<主机名>:<端口号>/<文件名>#片段名?参数列表

- 例如:
- http:192.168.1.100:8080/helloworld/index.jsp#a?username=shkstart

- #片段名: 即锚点, 例如看小说 直接定位到张杰
- 参数列表格式:
    参数名=参数值&参数名=参数值


> URL的实例化
- java.net.URL

> URL url = new URL(String url);
- 将给定的url解读成资源 方便我们通过各种方法调用
- 一个URL对象生成后 其属性是不能被改变的 但是可以通过它给定的方法来获取这些属性

```java
URL url = new URL("http://www.baidu.com?username=Sam");
```


> url对象的常用方法
> url.getProtocol()
- 获取该URL的协议名

- 返回值:
- String


> url.getHost()
- 获取该URL的主机名

- 返回值:
- String


> url.getPort()
- 获取该URL的端口号

- 返回值:
- String


> url.getPath()
- 获取该URL的文件路径

- 返回值:
- String


> url.getFile()
- 获取该URL的文件名

- 返回值:
- String


> url.getQuery()
- 获取该URL的查询明

- 返回值:
- String


- http://www.baidu.com?username=Sam
```java
System.out.println(url.getProtocol());
// http
System.out.println(url.getHost());
System.out.println(url.getPort());
System.out.println(url.getPath());
System.out.println(url.getFile());
// 端口号开始后面的都算 ?username=Sam
System.out.println(url.getQuery());
// ?后面的部分 username=Sam
```

----------------------------

### URL网络编程实现Tomcat服务端数据下载
- 这部分内容不涉及Tomcat服务器的相关知识 我们假定服务器已经开启
- 然后我们要将服务器中的资源下载下来
- http://localhost:8080/examples/test.jpg


> url.openConnection();
- 获取与服务器连接对象
<!-- 
  获取服务器的连接 我们获取的其实是HttpURLConnection 它是urlConnection的子类 所以我们通过强转得到HttpURLConnection类型的对象

  URLConnection urlConnection = url.openConnection();
 -->

- 返回值:
- urlConnection类

```java
HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
```

> urlConnection.connect();
- 获取与服务器的连接

> urlConnection.disconnect();
- 关闭与服务器的连接


> 代码部分
```java
// 传入我们要下载的资源url 该资源在Tomcat服务器上
  URL url = new URL("http://localhost:8080/examples/test.jpg");

  // 下载服务端中对应的test.jpg图片资源 我们还是以流的方式来操作
  // 获取服务器的连接 我们获取的其实是HttpURLConnection 它是urlConnection
  // URLConnection urlConnection = url.openConnection();
  HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();

  // 调用connect()获取连接
  urlConnection.connect();

  // 获取输入流 将服务器的资源读到内存中
  InputStream is = urlConnection.getInputStream();
  // 将文件保存到本地
  FileOutputStream fos = new FileOutputStream("本地文件,jpg");
  byte[] buf = new byte[1024];
  int len;
  while ((len = is.read(buf)) != -1) {
    fos.write(buf, 0, len);
  }

  // 关闭资源
  is.close();
  fos.close();
  // 断开连接
  urlConnection.disconnect();
}
```

----------------------------

### java反射机制概述
- Reflection(反射) 是被视为*动态语言*的关键
- 反射机制允许程序在执行期(javac解析运行)*借助与Reflection API取得任何类的内部信息 并能直接操作任意对象的内部属性以及方法*
<!-- 
  java程序分为两个过程 先编译 后运行
  编译的时候 我们不能确定 我们要造哪个类的对象 只有运行的时候我们才能确定下来 这种特性就是动态的特性
 -->

- *加载完类之后*(我们在java命令后就开始加载类) *在堆内存的方法区中就产生了一个Class类型的对象*(一个类只有一个Class对象) *这个对象就包含了完整的类的结构信息*

- 我们可以通过这个对象看到类的结构
- 这个对象就像一面镜子 *通过这个镜子看到类的结构 所以我们形象的称之为: 反射*


> 扩展: 动态语言 vs 静态语言
- 1. 动态语言 (弱类型语言)
- 动态语言是在运行时确定数据类型的语言 变量使用之前不需要类型声明 通常变量的类型 是 被赋值的那个值的类型

- 是一类在运行时可以改变其结构的语言

- 例如:
- 新的函数 对象 甚至代码可以被引进
- 已有的函数可以被删除或是其他结构上的变化
- *通俗点说就是运行时代码可以根据某些条件改变自身的结构*
<!-- 
  主要的动态语言(下面都是解释型语言 或叫 脚本语言)
  Object-C C# Javascript PHP Python Eriang
 -->

- 2. 静态语言 (强类型语言)
- 静态语言是在编译时变量的数据类型即可确定的语言 多数静态类型语言要求在使用变量之前必须声明数据类型
- 与动态语言相应而言, 运行时结构不可变的语言就是静态语言
<!-- 
  主要的静态语言
  Java C C++

  java不是动态语言 但java可以称之为"准动态语言"
  即java有一定的动态性 我们可以利用反射机制 字节码操作获得类似动态语言的特性

  java的动态性让编程的时候更加的灵活

  也就是说我们利用反射 可以让java在运行的时候再确定造的哪个类的对象 调用的是哪一个方法 在运行的时候再定下来
 -->


> 反射的理解
- 我们可以想想 光的反射
<!-- 
      1       2
        ↘ | ↗
        -----
 -->

- 1. 原来的时候(正常方式)
- 我们是先有的包 包下我们声明的类 通过类我们造的对象

  引入需要的"包类"名称 -> 通过new实例化 -> 取得实例化对象


- 2. 反射方式的时候
- 我们通过类的对象 我们就知道该对象是哪个类造的找到了所在的类 通过所在类的声明 我们又知道是哪个包下造的 

  实例化对象 -> getClass()方法 -> 得到完整的"包类"名称


> 反射机制的应用
- 通过反射的API我们可以都做些什么？

- 在运行时 判断任意一个对象所属的类
- 在运行时 构造任意一个类的对象
- 在运行时 判断任意一个类所具有的成员变量和方法
- 在运行时 获取泛型的信息
- 在运行时 调用任意一个对象的成员变量和方法
- 在运行时 处理注解
- 生成动态代理


>反射相关的主要API
- java.lang.Class: 代表一个类
<!-- 
  Class类是在lang包下定义 这个Class不是class关键字
  java是严格区分大小写的 Class 和 关键字class 是两个东西

  Class类表示通用的类 通用的 用来描述其它类的结构信息的
  也就是说 类似Person Dog这样的类 又是以Class类的实例出现读到

  Class类是用来描述类的类
 -->

- java.lang.reflect.Method: 代表类的方法
- java.lang.reflect.Field: 代表类的成员变量
- java.lang.reflect.Constructor: 代表类的构造器

----------------------------

### 反射之前/之后等 类的实例化等操作
- 我们定义了一个Person类 我们看看在反射之间我们可以对Person类做哪些事情

```java
package com.sam.reflect;

// Person类的操作
public class Person {
  // 私有权限
  private String name;
  public int age;

  public Person() {
  }

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  // 私有权限
  private Person(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  @Override
  public String toString() {
    return "Person{" +
        "name='" + name + '\'' +
        ", age=" + age +
        '}';
  }

  public void show() {
    System.out.println("我是一个人");
  }

  // 私有权限
  private String showNation(String nation) {
    System.out.println("我得国籍是: " + nation);
    return nation;
  }
}

```

- 反射之前我们能对Person类做的事情
```java
@Test
public void test1() {
  // 1. 创建Person类对象 Person实例化
  Person p1 = new Person("Sam", 16);

  // 2. 通过对象调用内部的属性和方法
  p1.age = 10;
  System.out.println(p1.toString());
  p1.show();


  // 注意:
  // 在Person外部 不可以通过p1对象调用Person类中private的结构的 如 name, showNation() 以及私有的构造器
}
```


> 使用反射 实现同上的操作
- 下面的反射的API我们都没有讲 先感觉下代码
```java
@Test
public void test2() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchFieldException {

  // 通过反射 完成Person类的实例化
  // Person类本身有一个属性是class Person.class 就是Class类的实例了
  Class clazz = Person.class;
  System.out.println(clazz);  
  // class com.sam.review.Person


  // 获取构造器对象
  // 通过 clazz.getConstructor(参数类型.class) 里面的参数我们可以看看Person中的构造器里面的参数是什么类型 我们获取了构造器
  Constructor cons = clazz.getConstructor(String.class, int.class);


  // 通过得到的构造器对象 传入构造器中需要的实参 来造对象(实例化) 得到的object类型 我们可以进行强转
  Object p1 = cons.newInstance("Sam", 18);
  Person p = (Person) p1;

  // 通过反射 调用对象指定的属性 和 指定的方法
  // 这样我们就能通过clazz对应的Person类里面age的属性
  Field age = clazz.getDeclaredField("age");

  System.out.println(age);
  // int com.sam.review.Student.age
  // 它是一个属性对象吧 并不是一个基本数据类型能让我们去输出

  // 修改age属性 但是我们可以通过这个age调用set()方法
  age.set(p, 10);
  System.out.println(p.toString());

  // 通过反射来调用Person类中的方法
  Method show = clazz.getDeclaredMethod("show");
  // 调用p对象的show方法
  show.invoke(p);
}
```


> 使用反射完成 正常使用方式达不到的事情 - 调用私有结构
- 我们使用正常的方法操作Person类的时候 在Person类外部 *不可以*通过Person类的对象*调用其内部私有结构*

- 但是我们通过反射 可以调用Person类的私有结构 比如私有构造器 方法 属性 都可以

```java
// 通过反射 调用Person类内部的私有构造器
Constructor constructor = clazz.getDeclaredConstructor(String.class);
constructor.setAccessible(true);
Object p2 = constructor.newInstance("Erin");
Person erin = (Person) p2;
System.out.println(erin.toString());

// 调用私有的属性和方法
Field name = clazz.getDeclaredField("name");
name.setAccessible(true);
name.set(erin,"nn");
System.out.println(erin.toString());

// 调用私有的方法
Method showNation = clazz.getDeclaredMethod("showNation", String.class);
showNation.setAccessible(true);
// invoke就是调用的意思 以前是p1.showNation("中国") 以前是对象调用方法 现在是方法调用对象的感觉 记住是感觉
// 接收方法的返回值 是如下的格式
String nation = (String) showNation.invoke(erin, "中国");
System.out.println(nation);
```


> 如何看待反射和封装性两个技术
- 之前我们再说封装性的时候在外部调用的结构就权限开放 如果不想让结构在外部被调用就将其私有 而且我们以前还讲过单例模式 为了不让我们在外面造对象 在类内部将构造器私有了 我们在类内部将对象造好 给外部用

- 可现在我们可以通过反射来调用类内部私有的结构 既然能调用私有的构造器了 我们也可以通过反射在类的外部造对象了

> 疑问1:
- 通过直接new的方式 和 反射的方式 都可以调用公用的结构 开发中到底用哪个

- 解答:
- 建议直接new的方式

- 什么时候会使用反射的方式?
- 反射的特征: 动态性
- 也就是说在编译的时候我们不能确定要new谁(编译的时候不知道要造哪个类的对象) 如果出现这样的情况就使用反射的方式
<!-- 
  后台把代码都写好了 已经部署到服务器上跑起来了
  现在通过浏览器去访问后台 前端可能是要登录或者是注册 不知道要干什么

  现在有url /login 我们把这个url发送到后台 java层面就获取了这个url 我们解析完url后确定是想登录

  但是我们的程序已经都跑起来了 这时候我们解析url后发现是想登录 我们才造login所对应的对象 这时候都是动态的
 -->

> 疑问2:
- 反射机制与面向对象中的封装性是不是矛盾的? 如何看待两个技术

- 解答:
- 不矛盾。
<!-- 
  封装性的体现其实是通过private public等关键字 告诉我们 哪些结构我们其实用不到

  比如private修饰的结构 可以已经在public中用过了 我们外部调用的时候不需要使用private的结构 直接public就可以了

  反射是说能不能调用的事儿 private是说不用调了 但是你非调的话 你就调

  封装性是建议你怎么调用的事儿
 -->

----------------------------


### Class的理解 
- java.lang.Class类的理解 *反射的源头*
- java语言编写完以后需要经过两个过程

> 1. 编译过程:
- 程序经过 javac.exe命令以后 会生成一个或多个字节码文件(.class) 

> 2. 解释运行过程:
- 接着我们使用java.exe命令对某个字节码文件进行解释运行 相当于将某个字节码文件加载到内存中(加载到内存中的过程就叫做类的加载)

- 注意:
- 类的加载不包括编译过程

> 运行时类
- 加载到内存中的类(类本身) 我们称为*运行时类* 此运行时类 就*作为Class实例*
- 当类加载到内存中时 称之为运行时类 该类就作为Class的实例出现
- 那是不是说反射读取的是运行时类

<!-- 
  Person类 就是 Class的实例
  但是
  类本身 不能直接写 Person(这么写在java中相当于类型)
  所以
  后面接上了.class属性 整体来表示类本身(Person.class)

  Class clazz = Person.class

  以前我们说通过类去造对象 现在我们知道 类本身也是对象(Class的对象)

  这也体现了万事万物皆对象
 -->

- 2. 换句话说 Class的实例对应着一个运行时类(数组 接口等都可以 只要是*加载到内存中的都是*)

- 3. 加载到内存中的运行时类 会缓存一定的时间 在此时间之类 我们可以通过不同的方式来获取此运行时类

----------------------------

### Class实例的获取方式
- 类加载到内存中的时候 就放在内存中了 如果我们要用到这个类本身了 我们可以把类本身赋值给一个变量 clazz 让它指向唯一存在的运行时类了

- 下面就是几种获取运行时类的方式 它们获取的都是*同一个*运行时类

> 方式1: 类本身.class
- 调用运行时类的属性 .class
- 返回的就是Class的实例对象 clazz

- 泛型:
- 类的类型
- 加上泛型避免以后在后面需要进行强转了

```java
Class<Person> clazz1 = Person.class;

// 我们输出下clazz1 发现就是当前类本身
System.out.println(clazz1);
// class com.sam.reflect.Person
```


> 方式2: 运行时类对象.getClass()
- 类对象.getClass()
- 任何一个类的对象 调用该方法都知道是哪个类造的
- 返回得就是Class的实例对象 clazz

- 泛型:
- Class<? extends Person> clazz = p.getClass();

```java
// 1. Person类实例化
Person p = new Person();  
    // Person p 就是运行时类的对象

// 2. 通过运行时类的对象p 调用getClass() 得到Class的实例
Class<? extends Person> aClass = p.getClass();

System.out.println(clazz2);
// class com.sam.reflect.Person
```


> 方式3: 通过Class的静态方法 Class.forName(String 类的全类名)
- 不管是我们自定义的类 还是API提供的类 类本身都可以作为Class的实例

- 参数:
- 类的全部类名

- 异常
- ClassNotFoundException

- 返回得就是clazz实例对象

```java
Class<?> clazz3 = Class.forName("com.sam.reflect.Person");

Class clazz3 = Class.forName("java.lang.String");
```

> 思考:
- 上面我们通过3种方式 获取了clazz 那我们做下判断
- clazz1 == clazz2  // true
- clazz2 == clazz3  // true

- 结果都是true 说明我们获取的是内存当中同一个运行时类
- 也就是说 我们的运行时类一旦加载到内存中后 它会缓存一段时间
- 我们上面的3种方式 只是通过不同的方式获取了内存中的运行时类 都是同一个



> 了解
> 方式4: 使用类的加载器: ClassLoader

- 1. 先通过 当前类的Class实例对象 调用getClassLoader()方法

> 当前类.class.getClassLoader()
- 获取当前自定义类的 类加载器(ClassLoader)

> ClassLoader.getSystemClassLoader()
- 通过这个方法也能获取系统类加载器

- 返回classLoader

- 类型:
- CLassLoader
```java
ClassLoader classLoader = ReflectionTest.class.getClassLoader();

// 我们现在是ReflectionTest类
```

- 2. 通过classLoader对象的 loadClass("类的全路径") 方法 显示的加载一个类

> classLoader.loadClass(String classPath)
- 返回得就是指定类的全路径的指定类 的 clazz 对象
```java
ClassLoader classLoader = ReflectionTest.class.getClassLoader();

Class<?> clazz4 = classLoader.loadClass("com.sam.reflect.Person");
```

- 相当于 我们先获取当前类的ClassLoader
- 然后通过classLoader显示加载指定的类 得到的就是指定类的clazz对象

- clazz1 == clazz4  // true


> 总结:
- 上面的4种方式中 方式3的使用频率是最多的
- Class.forName(类的全类名)

- 方式1 Person.class 
- 这种方式在编译期就写死了 而我们反射更想体现的是动态性 编译期写死了 还咋动态

- 方式3 在编译期不管类的全类名路径是否正确 都不会报错
- Class clazz3 = Class.forName("com.sam.reflect.Person1")
<!-- 
  我们包下并没有Person1 
  但也不会报错
 -->

- 不会报错的原因是 真正运行的时候才知道给定的类存在与否
- 通过方式3能更好的体现动态性(反射最想体现的就是运行时的动态性 编译期的时候先不去确定)

----------------------------

### Class实例对应的结构的说明
- 上面我们说 clazz对应一个运行时类 那除了类本身之外还有没有其他的结构可以作为Class的实例呢？

- 只要有结构加载到内存中后 都看做成Class的实例了
- *Class相当于加载到内存中的所有结构* 不光光是类


- Class实例可以是哪些结构的说明:

- 1. class
- 外部类 成员(成员内部类 静态内部类) 局部内部类 匿名内部类

- 2. 接口
- 3. 数组
- 4. 枚举
- 5. 注解
- 6. 基本数据类型
- 7. void类型
<!-- 
  我们在方法中会写String int 而void也可以看做是一个类型
 -->

- 测试
```java
Class c1 = Object.class
Class c2 = Comparable.class
Class c3 = String[].class
Class c4 = int[][].class
Class c5 = ElementType.class    // 枚举类
Class c6 = Override.class
Class c7 = int.class
Class c8 = void.class
Class c9 = Class.class

// 只要数组的元素类型与维度一样 就是同一个class
int[] a = new int[10]
int[] b = new int[100]
Class c10 = a.getClass()
Class c11 = b.getClass()
c10 == c11    // true
```

----------------------------

### ClassLoader的理解
- 类的加载器帮我们把类加载到内存中
<!-- 
    源文件 .java文件

        ↓ javac 编译器

    字节码 .class

        ↓ java 命令 加载到内存中

    类装载器

        ↓
    
    字节码校验器

        ↓

    解释器

        ↓
    
    操作系统平台
 -->

> 类加载器的作用
- 类加载的作用:
- 将class文件字节码内容加载到内存中 并将这些静态数据*转换成方法区的运行时数据结构* 然后在堆中生成一个代表这个类的java.lang.Class对象 作为方法区中类数据的访问入口

- 类缓存:
- 标准的javase类加载器可以按要求查找类 但一旦某个类被加载到类加载器中 它将维持加载(缓存)一段时间 
- 不过JVM垃圾回收机制可以回收这些Class对象


> ClassLoader
- 就是类的加载器
- 类加载器作用是用来把类(class)装载进内存的

- java虚拟机规范了如下的类的加载器
- 1. 引导类加载器 (*无法获取*)
- 负责java平台的核心库 用来装载核心类库 该加载器无法直接获取
<!-- 
  比如String类就是核心类 我们想要用它 也需要加载 就是引导类加载器加载的String
 -->

- 2. 扩展类加载器
- 负责jre/ilb/ext目录下的jar包或 java.ext.dirs指定目录下的jar包装入工作库

- 3. 系统类加载器 (*自定义类都是它加载的*)
- 负责java-classpath 或 java.class.path所指的目录下的类与jar包装入工作 是最常用的加载器

----------------------------

### 理解类的加载过程
- 上面我们说了 Class的实例对应着一个运行时类
- 当程序主动使用某个类时 如果该类还未被加载到内存中 则系统会通过如下三个步骤来对该类进行初始化

> 图解
<!-- 
    2.                      3.
    将类的二进制数据           JVM负责对类进行初始化
    合并到JRE中

                ↖                     ↑

    1.                2.              3.
    --------          --------        --------
    类的加载      →     类的连接    →    类的初始化
    (Load)             (Link)         (initialize)

      ↓

    1. 
    将类的class文件读取带内存 并为之
    创建一个java.lang.Class对象
    此过程由类加载器完成
 -->

- 1. 加载:
- 将class文件字节码内容加载到内存中 并*将这些静态数据转换为*方法区的*运行时数据结构*
- 然后生成一个代表这个类的java.lang.*Class对象 作为*方法区中类*数据的访问入口*(即引用地址)
- 所有需要访问和使用类数据只能通过这个Class对象 
- 这个加载的过程需要类的加载器参与


- 2. 链接:
- 将java类的二进制代码合并到JVM的运行状态之中的过程
- 验证: 确保加载的类信息符合JVM规范

- 准备: 正式为类变量(static)分配内存并*设置类变量默认初始值*的阶段 这些内存都将在方法区中进行分配
<!-- 
  int n
  在链接环节只会给n赋值为0

  n = 0
 -->

- 解析: 虚拟机常量池内的符号引用(常量名) 替换为直接引用(地址)的过程

- 3. 初始化:
<!-- 
  在初始化的环节才将n赋值为2 

  n = 2
-->
- 执行类构造器<clinit>()方法的过程
- *类构造器<clinit>()方法是由编译器自动收集类中所有类变量的复制动作和静态代码快中语句合并产生的*
<!-- 
  不是造对象的构造器
 -->

- 当初始化一个类的时候 如果发现其父类没有进行初始化 则需要先触发其父类的初始化

- 虚拟机会保证一个类的<clinit>()方法在多线程环境中被正确加锁和同步


> 代码部分
```java
public class ReflectionTest {
  @Test
  public void test() throws ClassNotFoundException {
    // 自定义类都是系统类加载器帮我们加载的 比如ReflectionTest类就是它负责加载的

    // 获取当前自定义类的 类加载器(ClassLoader)
    ClassLoader classLoader = ReflectionTest.class.getClassLoader();

    System.out.println(classLoader);
    // jdk.internal.loader.ClassLoaders$AppClassLoader@2c13da15 它就是系统类加载器
  }
}
```

> classLoader.getParent()
- 看看当前classLoader的上一层加载器是谁
```java
ClassLoader classLoader = ReflectionTest.class.getClassLoader();
System.out.println(classLoader);

// 通过getParent()方法查看当前加载器的上一层加载器
ClassLoader parentClassLoader = classLoader.getParent();
System.out.println(parentClassLoader);
// jdk.internal.loader.ClassLoaders$PlatformClassLoader@64f6106c 扩展类加载器
```


> 代码部分
```java
@Test
  public void test() throws ClassNotFoundException {
    // 自定义类都是系统类加载器帮我们加载的 比如ReflectionTest类就是它负责加载的
    // 获取当前自定义类的 类加载器(ClassLoader)
    ClassLoader classLoader = ReflectionTest.class.getClassLoader();
    System.out.println(classLoader);

    // 调用系统类加载的getParent() 获取扩展类加载器
    ClassLoader parentClassLoader = classLoader.getParent();
    System.out.println(parentClassLoader);

    // 调用扩展类加载器的getParent() 无法获取引导类加载器
    // 引导类加载器主要负责加载java的核心类库 无法加载自定义类的
    ClassLoader parent = parentClassLoader.getParent();
    System.out.println(parent); // null
  }
```

----------------------------

### 使用ClassLoader加载配置文件
- 我们在说集合的时候 提到过 Properties 它用来读取配置文件
- 这里我们也可以用ClassLoader来加载配置文件

> 方式1
- 我们先看看 使用Properties读取配置文件的方式
```java
Properties props = new Properties();

// 此时的文件默认在当前module下
FileInputStream fis = new FileInputStream("jdbc.properties");
props.load(fis);

String user = props.getProperty("user");
String password = props.getProperty("password");
System.out.println(user + " " + password);
```


> 方式2
- 接下来我们看看ClassLoader替换FileInputStream的方式读取配置文件的方式
> classLoader.getResourceAsStream("文件路径");
- 以流的方式获取资源

- 注意:
- 该方法的文件路径不以module为基准 而是module里面的*src*下

- 返回值
- InputStream

```java
Properties props = new Properties();

// 获取类的加载器(获取的也是系统类加载器)
ClassLoader classLoader = ReflectionTest.class.getClassLoader();

// 以流的方式获取资源
// 相对路径: 默认识别为当前module的src下
InputStream is = classLoader.getResourceAsStream("jdbc.properties");
props.load(is);

// 后面的部分一样
String user = props.getProperty("user");
String password = props.getProperty("password");
System.out.println(user + " " + password);
```


- 在开发中 我们是将配置文件写在module下还是src下？
- 不建议写在module下 因为我们部署到tomcat服务器以后 module下的配置文件会缺失 我们要想保证它的存在 我们需要将配置文件放到src的下面

- 如果我们使用的是方式1 那么我们在制定文件的路径的时候要加上src/
```java
FileInputStream fis = new FileInputStream("src/jdbc.properties");
```

----------------------------

### 通过反射创建运行时类的对象
- 这节里面我们看看 当我们有了Class实例对象后 我们可以做什么事儿
- 前面我们拿Person类举例子的 当我们把Person加载到内存中的时候 Person就是运行时类

- 现在我们要创建Person类的对象(不是new+构造器的方式) 而是通过反射来操作

- 下面我们通过反射创建对应的运行时类的对象
<!-- 
  Class对应的是哪个运行时类 那就只能创建那个类的对象
 -->

> clazz.newInstance()
- 通过Class实例对象调用newInstance() 创建对应的运行时类的对象
- 造对象的
<!-- 
  newInstance() 内部调用类中的空参构造器
  所以要想用此方法 那么类中必须要提供空参构造器

  上面我们在刚接触泛型的时候 写了一份测试代码 那时候我们是先创建 Class对象clazz

  clazz.getDeclaredConstructor(String.class, int.class);
  方式得到构造器对象 然后通过
  constructor.newInstance();

  得到对象实例

  这里是直接通过clazz.newInstance()
 -->

- 我们也可以如下的添加泛型 这样类的泛型决定了newInstance()的返回值
```java
Class<Person> clazz = Person.class
```

- 返回值:
- 对应的运行时类的对象
<!-- 
  newInstance() 
  弃用了 弹幕说
  clazz.getDeclaredConstructor().newInstance() 来代替

  clazz.getDeclaredConstructor(String.class, int.class).newInstance()

  Class clazz = Person.class;
  Object o = clazz.getDeclaredConstructor().newInstance();
  Person p = (Person) o;
  System.out.println(p);
 -->

- 异常:
- InstantiationException
  实例化时异常: 当没有空参构造器的时候 抛出

- IllegalAccessException
  非法访问: 结构是私有的 我们非要访问的时候 抛出
  (权限修饰符 权限不够的问题)


**注意**: 
- 要想newInstance()正常的执行必须满足如下条件

- 1. 运行时类必须提供空参的构造器
- 2. 空参构造器的访问权限得够 通常设置为public

<!-- 
  在javabean中要求提供一个public的空参构造器 
  1. 便于通过反射 创建运行时类的对象
  2. 便于子类继承此运行时类时 默认调用super() 保证父类有此构造器
 -->


```java
// 想通过反射创建Class的对象 那就要先有Class
Class clazz = Person.class;

// Object obj = clazz.newInstance();
// 我们可以强转下
Person p = (Person) clazz.newInstance();

or

// 这个方式没弃用提醒 上面的方式被弃用了
clazz.getDeclaredConstructor().newInstance()
```

- 习惯是调用空参的构造器创建对象 而不是带参的 因为空参的构造器 更加的通用 符合的情况更多


> 举例体会反射的动态性
- 我们观察下如下的代码 在编译期间不能判断造的是哪个类的对象
- 我们以前是通过new的方式造的对象 在编译期就能很明确的看出我们要造的是谁 比如 new Peron

- 而我们通过反射的方式在编译期是不能确定我们要造的是哪个类的对象的

- 具体的体会代码如下
```java
@Test
public void test() throws Exception {

  // 随机索取数字的方法 随机数的边界是3 返回得会是0 1 2
  int num = new Random().nextInt(3);
  String classPath = "";
  switch (num) {
    case 0:
      classPath = "java.util.Date";
      break;
    case 1:
      classPath = "java.lang.Object";
      break;
    case 2:
      classPath = "com.sam.reflect.Person";
      break;
  }

  // 根据clasPath创建类的对象
  Object obj = getInstance(classPath);
  System.out.println(obj);
}


// 创建一个指定类的对象 classPath: 指定类的全类名
public Object getInstance(String classPath) throws Exception {
  Class clazz = Class.forName(classPath);
  return clazz.newInstance();
}
```

----------------------------

### 获取运行时类的完整结构

> 提供结构丰富的Person类
- 我们先提供一个结构丰富的Person类 便于测试怎么通过反射拿到类中的结构

- 1. 我们提供了Person类的父类
  - 父类有泛型
  - 父类实现了 Serializable

- 2. 我们定义了接口 和 注解

- 3. Person类中继承了父类 实现了Comparable接口 和 自定义接口 使用了注解

- 4. Person类中提供了不同权限的修饰符

> 父类
```java
package com.sam.reflect;

import java.io.Serializable;

// Person类的父类 生物
public class Creature<T> implements Serializable {
  private char gender;
  public double weight;

  private void breath() {
    System.out.println("生物呼吸");
  }

  public void eat() {
    System.out.println("生物吃东西");
  }
}

```


> 自定义接口
```java
package com.sam.reflect;

public interface MyInterface {
  void info();
}

```


> 自定义注解
```java
package com.sam.reflect;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, MODULE})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
  String value() default "hello";
}

```


> Person类
```java
package com.sam.reflect;

@MyAnnotation(value="Person")
public class Person extends Creature<String> implements Comparable<String>, MyInterface{
  private String name;
  int age;
  public int id;

  // 接口中抽象方法的实现
  @Override
  public void info() {
    System.out.println("我是一个人");
  }

  @Override
  public int compareTo(String o) {
    return 0;
  }

  public Person() {
  }

  @MyAnnotation(value="Person_Constructor")
  private Person(String name) {
    this.name = name;
  }

  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  @MyAnnotation(value="Person_Method")
  private String show(String nation) {
    System.out.println("我的国籍是: " + nation);
    return nation;
  }

  public String display(String interest) {
    return interest;
  }


  @Override
  public String toString() {
    return "Person{" +
        "name='" + name + '\'' +
        ", age=" + age +
        '}';
  }
}

```

------

### 获取运行时类的属性结构及其内部的结构
- 都是通过clazz.getXxxx的形式 调用类中的各个结构 有些见名知意
- 我们通过 clazz. 得到的对象 都是结构对象 那就说该对象身上的结构我们都能获取到

> clazz.getFields()
- 获取当前运行时类*及其父类中*声明为*public*访问权限的属性
<!-- 
  只能获取public的属性
 -->

- 返回值:
- Field[]

```java
Class<Person> clazz = Person.class;

// 2. 获取Person类中所有属性结构
Field[] fields = clazz.getFields();

for(Field field: fields) {
  System.out.println(field);
}
// public int com.sam.reflect.Person.id
// public double com.sam.reflect.Creature.weight
```

>  clazz.getField("属性名");
- 获取当前运行时类*及其父类中*声明为*public*访问权限的*指定*属性
```java
Class clazz = Person.class;
Field weight = clazz.getField("weight");
System.out.println(weight);
```


> clazz.getDeclaredFields();
- Declared 声明过的
- 获取*当前运行时类中*声明的所有属性(不管什么权限, 不包含父类中声明的属性)

- 返回值:
- Field[]

```java
Field[] declaredFields = clazz.getDeclaredFields();

for(Field field: declaredFields) {
  System.out.println(field);
}
```

> clazz.getDeclaredField("属性名");
- 获取*当前运行时类中*声明的指定属性
```java
Field name = clazz.getDeclaredField("name");
System.out.println(name);
```

------

### 获取属性中的具体结构
- 属性一般分为如下的几个部分:
- 权限修饰符 数据类型 变量名 = 变量值
<!-- 
  能不能拿到变量值 要看是不是静态结构 是的话能拿到 不是的话拿不到
  因为实例成员 得有对象之后才能拿到
 -->

- 我们通过上面的两个方法能拿到属性们 而我们还可以通过反射拿到每一个属性中的上面几个部分

> 属性.getModifiers()
- 获取属性的权限修饰符

- 返回值
- int
<!-- 
  在java.lang.reflect 中有一个Modifier类 里面定义了权限修饰符对应的数字

  default     0
  public      1
  private     2
  protected   4
 -->

```java
Class<Person> clazz = Person.class;
Field[] declaredFields = clazz.getDeclaredFields();
for(Field field: declaredFields) {
  // 获取每个属性的权限修饰符
  int modifier = field.getModifiers();
  // 2 0 1
}
```

> Modifier.toString(modifier)
- Modifier类的静态方法 用于将属性.getModifiers()返回得int值 翻译回对应的权限类型

- 参数：
- 属性.getModifiers()的返回int型值
```java
Class<Person> clazz = Person.class;
Field[] declaredFields = clazz.getDeclaredFields();
for(Field field: declaredFields) {
  // 获取每个属性的权限修饰符
  int modifier = field.getModifiers();
  // 2 0 1

  // 将2 0 1翻译回权限修饰符
  System.out.println(Modifier.toString(modifier));
  // private public
}
```


> 属性.getType()
- 反射形式获取属性的类型

- 返回值
- Class
- 类型前面会保留java.lang 因为我们自己也可以定义为String
- 分了区分会以全类名的方式显示

```java
Class<Person> clazz = Person.class;
Field[] declaredFields = clazz.getDeclaredFields();

for(Field field: declaredFields) {
  Class type = field.getType();
  System.out.println(type);
    // class java.lang.String

  System.out.println(type.getName());
    // java.lang.String
}
```


> 属性.getName()
- 反射形式获取属性名

- 返回值:
- String

```java
Class<Person> clazz = Person.class;
Field[] declaredFields = clazz.getDeclaredFields();

for(Field field: declaredFields) {
  String name = field.getName();
  System.out.println(name);
}
```

------

### 获取运行时类的方法结构

> clazz.getMethods();
- 获取当前运行时类*及其所有父类*中声明为*public*类型的方法

- 返回值:
- Method[]

```java
Class clazz = Person.class;
// 获取方法构成的数组
Method[] methods = clazz.getMethods();

// 遍历所有方法 好多好多Object类中的方法也会被打印
for(Method m: methods) {
  System.out.println("所有的方法: " + m);

  System.out.println();
}
```

> clazz.getMethod("方法名");
- 获取当前运行时类*及其父类中*声明为*public*访问权限的*指定*方法

- 返回值:
- Method

```java
Class clazz = Person.class;
// 获取方法构成的数组
Method show = clazz.getMethod("eat");
System.out.println(show);
```

> clazz.getDeclaredMethods()
- 获取当前运行时类中声明的*所有方法*(不包含父类中声明的方法)

- 返回值:
- Method[]

```java
Class clazz = Person.class;

// 获取方法构成的数组
Method[] methods = clazz.getDeclaredMethods();
for(Method m: methods) {
  System.out.println("所有的方法: " + m);
}
```

------

### 获取运行时类的方法的内部结构
- 上面我们获取了属性当中的各个结构 方法也可以这样获取方法中的各个内部结构

- 也是先拿到方法的结构对象 通过结构对象.具体方法()的方式 拿到方法中的各个节后

> 方法中的结构:
- @注解
- 权限修饰符 返回值类型 方法名(参数类型1 形参名1, ...) throws 异常 {

}


> 获取方法声明的注解
- 通过反射 clazz.getDeclaredMethods(); 拿到每一个方法后 
- 通过 方法结构对象. 的形式 调用具体方法 获取注解
- 获取注解是所有方法的

> 方法.getAnnotations()
- 通过反射获取方法上方的注解
- 能获取到的注解 必须其声明周期为 RUNTIME

- 返回值
- Annotation[]

```java
Class clazz = Person.class;

// 获取运行时类中的方法
Method[] declaredMethods = clazz.getDeclaredMethods();

// 遍历方法集合拿到每一个方法
for(Method m: declaredMethods) {
  // 通过每一个方法.getAnnotations() 得到方法上面的注解
  Annotation[] annos = m.getAnnotations();
  for(Annotation a: annos) {
    System.out.println(a);
    // @com.sam.reflect.MyAnnotation(value="Person_Method")
  }
}
```


> 获取方法中的权限修饰符
- 通过反射 clazz.getDeclaredMethods(); 拿到每一个方法后
- 通过 方法结构对象. 的形式 调用具体方法 获取方法的权限修饰符

> 方法.getModifiers()
- 获取方法的权限修饰符

- 返回值
- int
- 和属性的返回值一样

```java
Class clazz = Person.class;
Method[] declaredMethods = clazz.getDeclaredMethods();


for(Method m: declaredMethods) {

  int modifiers = m.getModifiers();
  System.out.println(Modifier.toString(modifiers));
}
```


> 获取方法中的返回值类型
- 通过反射 clazz.getDeclaredMethods(); 拿到每一个方法后
- 通过 方法结构对象. 的形式 调用具体方法 获取方法的返回值类型

> 方法.getReturnType()
- 获取方法的返回值类型

- 返回值
- Class

```java
Class clazz = Person.class;
Method[] declaredMethods = clazz.getDeclaredMethods();

for(Method m: declaredMethods) {
  // 获取返回值的类型
  Class returnType = m.getReturnType();
  
  // 再获取返回值类型的名字
  String name = returnType.getName();
  System.out.println(name);

  System.out.println(m.getReturnType().getName());
}
```


> 获取方法中的方法名
- 通过反射 clazz.getDeclaredMethods(); 拿到每一个方法后
- 通过 方法结构对象. 的形式 调用具体方法 获取方法的返回方法名

> 方法.getName()
- 获取方法的方法名

- 返回值
- String

```java
Class clazz = Person.class;
Method[] declaredMethods = clazz.getDeclaredMethods();

for(Method m: declaredMethods) {

  String name = m.getName();
  System.out.println(name);
}
```


> 获取方法中的形参列表
- 通过反射 clazz.getDeclaredMethods(); 拿到每一个方法后
- 通过 方法结构对象. 的形式 调用具体方法 获取方法的返回形参列表

- 我们没有办法获取到形参名 只能获取到形参的类型

> m.getParameterTypes()
- 获取方法的形参列表中的*参数类型*

- 返回值
- Class[]

```java
Class clazz = Person.class;
Method[] declaredMethods = clazz.getDeclaredMethods();

for(Method m: declaredMethods) {

  // 获取参数类型
  Class[] parameterTypes = m.getParameterTypes();

  // 遍历Class[]
  for(Class p: parameterTypes) {
    System.out.println(p.getName());
    // java.lang.String
    // java.lang.String
    // java.lang.Object
    // java.lang.String
  }
}
```


> 获取方法中抛出的异常
- 通过反射 clazz.getDeclaredMethods(); 拿到每一个方法后
- 通过 方法结构对象. 的形式 调用具体方法 获取方法的异常


> m.getExceptionTypes()
- 获取方法的*异常*

- 返回值
- Class[]

```java
Class clazz = Person.class;
Method[] declaredMethods = clazz.getDeclaredMethods();
for(Method m: declaredMethods) {

  // 得到异常数组
  Class[] exceptionTypes = m.getExceptionTypes();

  // 判断是否有异常
  if(exceptionTypes.length > 0) {

    for (Class e: exceptionTypes) {
      System.out.println("throws: " + e);
    }

    // 没有异常的时候
  } else {
    System.out.println("没有参数列表");
  }
}
```

------

### 获取运行时类的构造器的结构

> clazz.getConstructors()
- *获取*当前运行时类当中 声明为*public的构造器*

- 返回值
- Constructor[]

```java
Class clazz = Person.class;
Constructor[] constructors = clazz.getConstructors();

for(Constructor c: constructors) {
  System.out.println(c);
  // public com.sam.reflect.Person(java.lang.String,int)
  // public com.sam.reflect.Person()
}
```

> clazz.getConstructor()
- 获取当前运行时类的指定构造器

- 参数：
- 构造器中形参列表的类型.class
- *不传就是获取空参构造器*
- String.class int.class

```java
Class clazz = Person.class;
Constructor constructor = clazz.getConstructor(String.class, int.class);

System.out.println(constructor);
// public com.sam.reflect.Person(java.lang.String,int)
```


> clazz.getDeclaredConstructors()
- 获取当前运行时类中的*所有构造器* (不分权限)

- 返回值
- Constructor[]

```java
Class clazz = Person.class;

Constructor[] declaredConstructors = clazz.getDeclaredConstructors();
```

> clazz.getDeclaredConstructor()
- 获取当前运行时类的指定构造器

- 返回值
- Constructor

- 参数
- *不传就是获取空参构造器*
- String.class int.class

------

### 获取运行时类的父类以及父类的泛型  -- 重点
- *这个还真有用到* 比上面的强

> clazz.getSuperclass()
- 获取运行时类的*父类*

- 返回值
- Class
<!-- 
  父类也是类 所以也是Class的实例
 -->

```java
Class clazz = Person.class;

Class superclass = clazz.getSuperclass();
System.out.println(superclass);
// class com.sam.reflect.Creature
```


> clazz.getGenericSuperclass()
- 获取运行时类*带泛型的父类*

- 返回值:
- Type
<!-- 
  Type是一个接口 Class实现了这个接口
 -->

```java
Class clazz = Person.class;

Type genericSuperclass = clazz.getGenericSuperclass();
System.out.println(genericSuperclass);
// com.sam.reflect.Creature<java.lang.String>
```


> paramType.getActualTypeArguments();
- 获取泛型参数(泛型类型)
- 获取运行时类的带泛型的*父类的泛型*

- 返回值:
- Type[]

- 1. 先获取带泛型的父类对象
- Type genericSuperclass = clazz.getGenericSuperclass();

- 2. 将 genericSuperclass *强转*成 ParameterizedType
<!-- 
  ParameterizedType: 带参数的类型
 -->

- 2. 通过 ParameterizedType*的对象* 调用方法 
- *paramType.getActualTypeArguments()*

```java
Class clazz = Person.class;

Type genericSuperclass = clazz.getGenericSuperclass();
ParameterizedType paramType = (ParameterizedType)genericSuperclass;
// 获取泛型参数
Type[] actualTypeArguments = paramType.getActualTypeArguments();
System.out.println(actualTypeArguments[0]);
    // class java.lang.String

System.out.println(actualTypeArguments[0].getTypeName());
    // java.lang.String

// Class才有getName()
System.out.println((Class)actualTypeArguments[0].getName());
    // java.lang.String
```

------

### 获取运行时类的接口 所在包 注解等    -- 重点(接口)

> clazz.getInterfaces()
- 获取运行时类的*接口*(不包括父类的接口)

- 返回值
- Class[]

```java
Class clazz = Person.class;

Class[] interfaces = clazz.getInterfaces();
for(Class c: interfaces) {
  System.out.println(c);
    // interface java.lang.Comparable
    // interface com.sam.reflect.MyInterface
}


// 获取运行时类父类实现的接口
Class[] interfaces1 = clazz.getSuperclass().getInterfaces();
```


> clazz.getPackage()
- 获取运行时类所在的*包*

- 返回值
- Package

```java
Class clazz = Person.class;

Package pack = clazz.getPackage();
System.out.println(pack);
// package com.sam.reflect
```

>clazz.getAnnotations();
- 获取运行类上方的*注解*

- 返回值:
-  Annotation[]

```java
Class clazz = Person.class;

Annotation[] annotations = clazz.getAnnotations();

for(Annotation a: annotations) {
  System.out.println(a);
  // @com.sam.reflect.MyAnnotation(value="Person")
}
```

----------------------------

### 调用运行时类中指定的结构  -- 需要掌握
- 结构包括:
- 属性 方法 构造器
- 上面三个中我们通常调用的都是 方法

------

### 调用运行时类中的指定属性
- 对于属性的调用我们分为两方面
- 1. 得到属性的值
- 2. 给属性赋值

- 非静态属性：
- 需要有运行时类的对象

> clazz.getField("id"); -- *通常不采用此方式*
- 获取运行时类指定的属性(只能获取public权限得属性)

- 参数
- String 属性名

- 返回值
- Field

- 异常
- NoSuchFieldException 没有给定的属性的时候的异常


> 属性对象.set(参数1, 参数2)
- 给属性赋值

- 参数1:
- Object obj
- 指明设置哪个对象的属性

- 参数2:
- Object value
- 将此属性设置为多少


> 属性对象.get(参数1)
- 获取哪个对象的属性
- 获取当前属性的值

- 参数
- Object
- 获取哪个对象的当前属性的值

- 返回值
- Object
- 所以这里我们可以进行下强转

```java
Class clazz = Person.class;

// 创建运行时类的对象 对象p是 set 和 get 方法需要的参数
Person p = (Person)clazz.newInstance();

// 获取指定的属性
Field id = clazz.getField("id");

// 设置当前属性的值
id.set(p, 1001);

// 得到的是Object类型 所以我们可以进行强转
Object o = id.get(p);
int pid = (int)o;
System.out.println(pid);    // 1001
```


> 开发中常用 getDeclaredXxx() 方法获取指定的属性
- 因为该方法可以获取运行时类的指定属性(不分权限)

> clazz.getDeclaredField(String fieldName)
- 获取指定变量名的属性(不分权限)

> 属性对象.setAccessible(true);
- 保证当前属性是可访问的

- 也就是说 只要是我们通过 clazz.getDeclaredXxx()的形式获取的属性结构对象 我们下面都要调用
- 属性对象.setAccessible(true); 方法

<!--  
  当我们读取或设置的属性的权限是default 或者 private的时候
  默认情况下是不允许我们访问的

  这时候我们就要 调用 setAccessible(true) 方法
  public的属性调用该方法也没事
 -->

```java
Class clazz = Person.class;
// 创建运行时类的对象
Person p = (Person) clazz.newInstance();

Field name = clazz.getDeclaredField("name");

// 不加这句 会报非法访问的异常
name.setAccessible(true);

name.set(p, "Sam");
System.out.println(name.get(p));
```

------

### 调用运行时类中的指定方法

> 非静态方法：
- 需要运行时类的对象
```java
Class clazz = Person.class;
Person p = (Person) clazz.newInstance();

// 我们需要拿到对象 p 
```

> clazz.getDeclaredMethod(String methodName, ...parameterTypes)
- 获取运行时类中的指定方法

- 参数1:
- String 指明要获取的方法的名称

- 参数2:
- 可变形参列表
- 同名方法(方法的重载)可能很多 所以告诉想要哪个参数的方法
- 参数名.class

- 异常
- NoSuchMethodException

- 返回值:
- Method


> 方法的调用
> 方法对象.invoke(对象(方法的调用者), (实参))
- 通过invoke() 调用该方法(方法对象所表示的方法)
- 当我们拿到方法结构对象后 通过该对象调用invoke() 来实现方法的调用

- 参数1:
- 方法的调用者
- 用哪个对象去调，非静态方法使用运行时类的对象去调用

- 参数2:
- 传递实参

- 异常:
- InvocationTargetException

- 非静态方法：
- 参数1的位置要传递 运行时类的对象

- 静态方法：
- 参数1的位置要传递 Person.class / clazz
<!-- 
  其实静态方法的第一个参数 也可以传递null
  在静态方法的时候 第一个参数不是那么重要 静态方法通过哪个对象调用都一样
  
  只有非静态方法才需要知道是哪个类的对象调用的
 -->

- 返回值:
- invoke()的返回值即为"方法对象"所表示的方法的返回值

- Object 返回值 = 方法对象.invoke()
- 我们能看到返回值的类型是Object 所以我们以可以使用强转

- 如果方法的返回值是void 那么我们从invoke()接收到的*返回值就是null*


**注意:**
- 如果我们调用的不是public权限得方法 还是要使用
> 方法.setAccessible(true);
- 保证当前的方法是可访问的


```java
@Test
public void test() throws InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {
  Class clazz = Person.class;
  Person p = (Person) clazz.newInstance();

  // 非静态方法的情况
  // 获取指定的方法
  Method show = clazz.getDeclaredMethod("show", String.class);

  // 保证当前方法是可以访问的
  show.setAccessible(true);

  // 拿到方法对象的返回值
  Object zh = show.invoke(p, "ZH");
  System.out.println(zh);

  System.out.println("*********");

  // 静态方法的情况
  Method showDesc = clazz.getDeclaredMethod("showDesc");
  showDesc.setAccessible(true);

  // 或者 Person.class / null
  showDesc.invoke(clazz);
}
```

------

### 调用运行时类中的指定构造器
- 我们通过反射调构造器肯定是想要造对象
- 但是我们最常用的就是 clazz.newInstance() (调用的都是空参的构造器) 
- 这个方法的使用量占到了99%

- 只有针对具体的某个问题才会造一个指定的构造器 所以使用的情况不是很高


> clazz.getDeclaredConstructor(指定参数列表);
- 获取构造器对象 

- 参数
- 指定构造器的参数列表
- 形参类型.class

- 异常:
- NoSuchMethodException

- 返回值
- Constructor

> 构造器对象.setAccessible(true);
- 保证构造器是可访问的

> 构造器对象.newInstance(实参)
- 创建实例对象 传递实际参数

- 返回值
- Object

```java
@Test
public void test() throws InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {
  Class clazz = Person.class;
  Constructor constructor = clazz.getDeclaredConstructor(String.class);
  // 保证此构造器是可访问的
  constructor.setAccessible(true);

  // 调用此构造器创建运行时类的对象
  Object sam = constructor.newInstance("Sam");

  // 这里我们还可以对sam对象进行强转
  Person p = (Person) sam
  System.out.println(p);
}
```

----------------------------

### 代理模式 和 动态代理
- 动态代理可以看做是反射的应用

> 代理设计模式的原理:
- 使用一个代理将对象包装起来 然后用该代理对象取代原始对象
- 任何对原始对象的调用要通过代理 代理对象决定是否以及何时将方法调用转换原始对象上
<!-- 
  这里说的是动态代理
  前面我们说过静态代理 不管哪个都属于代理模式 只不过指的是代理是编译时候定下来的 还是在运行的时候动态创建的 原理是一样的


                接口
              -------
          ↗           ↖

  类A: 代理类         类B: 被代理类
  ----------         ------------

  两个类都实现了接口

  比如 类B要租房子 那类B就要有找房子的功能 但是不是类B做的而是找了一个中介类A 中介代理类B做这件事

  说白了就是我们想调用的被代理类的对象 调用被代理类的方法
  但是类B的对象的创建和方法的执行 都是由代理类发起的 由代理类来决定要不要创建被代理类的对象 以及什么时候创建 和 方法何时调用 都是在代理类里面封装起来的
 -->

- 之前为大家讲解过代理机制的操作 属于静态代理 特征是代理类和目标对象的类都是在编译期间确定下来 不利于程序的扩展

- 同时 每一个代理类只能为一个接口服务 这样一来程序开发中必然产生过多的代理 *最好可以通过一个代理类完成全部的代理功能*

> 静态代理带来的问题 (动态代理产生的原因)
- 买房的问题 会有买房人和中介 这一套代理和被代理
- 唱歌的问题 会有歌星和经纪人 这一套代理和被代理
- 官司的问题 会有被告人和律师 这一套代理和被代理

- 上面的每种情况都会有代理类的出现 也就是说我们的程序里面就会创建多个代理类 产生过多的代理不太好
- 而我们代理类的功能就一个 就是对被代理类功能上的封装(通过代理类调用方法本质上都是调用被代理类了)
- 也就是说 代理类的功能都相同 那我们就会想能不能有一个通用得代理类 去完成这样的功能

- 但是这个通用的代理类又不能在编译期间就能确定下来 我们只能在运行期间确定
<!-- 
  比如运行期间我们加载的是类B被代理类 那我就根据这个被代理类 帮助我们动态的创建一个代理类 得到一个代理类的对象

  也就是我们需要在运行期间创建一个代理类(根据我们加载到内存中的被代理类是谁)

  加载哪个类就创建这个类对应的代理类

  而代理类和被代理类又要实现同一套接口 在运行期间根据加载到内存中的被代理类 我们看看它实现了哪些接口 然后我们创建代理类的时候也让它实现这些接口 这样就形成了上面的三角形的关系
 -->

- 动态代理是指客户通过代理类来调用其它对象的方法 并且是在程序运行时 根据需要动态创建目标类的代理对象

- 动态代理使用场合: 
- 1. 调试
- 2. 远程方法调用

- 动态代理相比于静态代理的优点: 
- 抽象角色中(接口)声明的所有方法都被转移到调用处理器一个集中的方法中处理 这样我们可以更加灵活和统一的处理众多的方法

----------------------------

### 回顾静态代理
- 我们先看看静态代理 也算是回顾一下

> 静态代理的所需要的结构
- 1. 接口
- 作用:
- 接口中会定义抽象方法 等代理类和被代理类来实现

- 2. 代理类
- 1. 定义接口类型的属性 是一个对象 该属性要通过 创建的被代理类对象来初始化

- 作用:
- 它有点像高阶组件那样 里面定义了除了 核心功能(被代理类中的功能) 之外的一些其他功能

- 它也会重写接口中的方法 并在核心的位置 通过被代理类对象调用被代理类中的接口中的抽象方法
```java
  @Override
  public void produceCloth() {
    ... 其他功能

        被代理对象.接口抽象方法()

    ... 其他功能
  }
```

- 3. 被代理类
- 被代理类的对象会传入代理类的构造器中
- 作用
- 在重写接口中的抽象方法的方法体中 定义 核心功能

> 代码部分:
```java
// 接口 
// 接口也是一种类型
interface ClothFactory {

  // 衣服工厂就会有生产衣服的功能
  void produceCloth();
}


--- 


// 代理类
class ProxyClothFactory implements ClothFactory {
  // 定义类型为接口类型的属性 用被代理对象进行实例化
  private ClothFactory factory;

  // 构造器 提供参数对 factory 属性 进行初始化
  public ProxyClothFactory(ClothFactory factory) {
    this.factory = factory;
  }

  // 实现接口中的方法
  @Override
  public void produceCloth() {

    System.out.println("代理工厂做一些准备工作");

    // factory是被代理类 也就是代理类调用的produceCloth()方法的时候 它的内部其实是被代理类调用自己的produceCloth()方法
    factory.produceCloth();

    System.out.println("代理工厂做一些后续的收尾工作");
  }
}


---


// 被代理类 nick的衣服工厂
class NickClothFactory implements ClothFactory {

  @Override
  public void produceCloth() {
    System.out.println("Nick工厂生产一批运动服");
  }
}


---


// 测试方法
public class StaticProxyTest {
  public static void main(String[] args) {

    // 1. 创建被代理类对象
    // 我们要造代理类的对象 但是代理类对象里面又需要一个参数(被代理类对象) 所以我们先造一个被代理类对象

    // 被代理类对象
    NickClothFactory nike = new NickClothFactory();

    // 2. 创建代理类对象 
    // 代理类对象的类型写 ProxyClothFactory 还是ClothFactory(接口) 都可以
    ClothFactory proxyClothFactory = new ProxyClothFactory(nike);


    // ClothFactory接口中声明过produceCloth()方法 
    // 这里就相当于是多态的形式一样 proxyClothFactory明明是代理类对象 
    // 我们调用produceCloth()方法 在编译期间 会因为是接口中的produceCloth()方法 实际执行的都是代理对象里面重写后的方法
    proxyClothFactory.produceCloth();

  }
}


// 结果:
- 代理工厂做一些准备工作
- Nick工厂生产一批运动服
- 代理工厂做一些后续的收尾工作
```

> 静态代理的特点 (缺点)
- 1. 静态代理 不管是代理类还是被代理类都写死了 也就是说*编译期间代理类和被代理类就确定下来了*，不利于程序的扩展

- 2. 每一个代理类只能为一个(一套)接口服务 这样程序开发中必定会产生过多的代理

---

> 静态代理的举例2:
- 实现Runnable接口的方法创建多线程
```java
// 我们自己定义的类 实现了Runnable接口
Class MyThread implements Runnable { ... }

// 我们发现 Thread类 本身也实现了Runnable接口
Class Thread implements Runnable { ... }
```

- 上面相当于有两个类 且这两个类都实现了Runnable接口
```java
main() {
  MyThread t = new MyThread();
  Thread thread = new Thread(t)

  // 启动线程 调用线程的run() 调用的thread里面的run() 但是真正执行的时候 执行的是MyThread类里面的run()
  thread.start();
}
```


----------------------------

### 动态代理的举例
- 动态代理也好 还是静态代理也好 都是代理模式 所以接口一定要有 被代理类要有 *只有代理类改成动态的了*

- 动态代理的优点就是能解决静态代理的缺点

- 动态代理的特点:
- 动态代理是指客户通过代理类来调用其它对象的方法 并且是在程序运行时根据需要动态创建目标类的代理对象

- 动态代理的接口:
- 1. 接口
- 2. 被代理类
- 3. 代理类 (动态的创建的了)


> 创建动态代理的核心的API
- 创建动态代理 有Proxy类给我们提供的 newProxyInstance() 方法 专门用来 *创建动态的代理类对象*

- Proxy类
- 它是所有动态代理类的父类
<!-- 
  Proxy类时反射包下的一个一个类 直接使用就可以
 -->

> Proxy.newProxyInstance(参数1, 参数2, 参数3)
- 该方法是通过Proxy类来调用 
- 作用:
- 创建动态代理对象 当我们*通过该对象*调用共同接口(代理类和被代理类的共同接口)的中方法的之后 *会自动调用被代理类中的同名方法*

- 参数1:
- 被代理类的加载器
- 被代理类时哪个加载器加载的
```java
// obj为上层方法的形参 是被代理类对象
obj.getClass().getClassLoader()
```

- 参数2:
- Class[] 接口
- 指明被代理类的接口然后创建代理类的时候 让其实现和被代理类一样的接口
<!-- 
  为什么要传递接口呢？ 我们要创建代理类对象 而代理类和被代理类要实现同样的接口 所以我们要看下被代理类对象所在的类实现了哪些接口 我就跟被代理类一样 也实现这些接口
 -->

```java
// obj为上层方法的形参 是被代理类对象
obj.getClass().getInterfaces()
```

- 参数3:
- InvocationHandler h
- InvocationHandler接口的实现类对象

- 该实现类对象 更想是一个代理对象的配置对象 配置代理类调用的方法的时候调用的是被代理类的同名方法

- 该实现类对象中要处理的逻辑:
- 1. 声明被代理类对象
- 2. 提供给被代理类对象初始化的方法(相当于set方法)
- 3. 实现InvocationHandler接口中 invoke() 方法
  - 该方法的作用:
  - 当代理类调用被代理类和代理类中的抽象方法的时候 会自动调用被代理类中的同名方法


> public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {...}
- 作用:
- 当通过代理类对象调用代理类和被代理类共同接口中的方法的时候
- 通过该invoke()方法中的逻辑 会自动调用被代理类中的同名方法

- 下面的参数不用我们创建传递

- 参数1:
- 代理类对象 也就是如下逻辑的时候返回得对象 
- newProxyInstance()方法返回得就是动态代理对象
```java
return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), handler);
```

- 参数2:
- 代理类调用的代理类和被代理类共同接口中的方法是什么方法 这里method就是那个方法

- 参数3:
- 代理类和被代理类共同接口中的方法需要的参数
- 就是方法中需要传递的实参


```java
// 创建 InvocationHandler接口的 实现类对象
class MyInvocationHandler implements InvocationHandler {
  /*
    1. 声明被代理类对象
      - 代理类对象的类型我们还是写Object这样更加的通用
      - 虽然声明为object但是赋值的时候也需要使用被代理类对象进行赋值
  */
  private Object obj;


  /*
    2. 提供给被代理类对象初始化的方法(相当于set方法)
      - 赋值的话 可以通过构造器 也可以通过方法给 obj进行赋值 这里我们提供一个方法
  */
  public void bind(Object obj) {
    this.obj = obj;
  }


  /*
    3. 实现invoke方法
      - 作用 当我们通过代理类的对象调用代理类和被代理类的接口中的抽象方法的时候 会自动的走如下的invoke()方法中的逻辑

      - invoke()方法中的逻辑: 
      - 将被代理类要执行的方法a的功能 声明在invoke()方法中
  */
  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    
    // obj是被代理类对象
    Object returnVal = method.invoke(obj, args);

    // 上述方法的返回值作为当前类中invoke()方法的返回值
    return returnVal;
  }
}
```


> 代码部分
- 思考:
- 动态代理 
- 根据加载到内存中的 被代理类是什么 我动态的创建一个跟被代理类实现接口一样的类

> 要想实现动态代理 需要解决的问题:
- 1. 如何根据加载到内存中的被代理类 动态的创建一个代理类及其对象
- 2. 当通过代理类的对象调用方法时 如何动态的去调用被代理类中的同名方法



- 1. 创建代理类:
- 和被代理类的接口 内部声明了抽象方法 该抽象方法就是被代理类要执行的核心代码 也是代理类调用该方法的时候会执行被调用类中的同名方法

```java
// 人类 接口
interface Human {
  // 获取信仰
  String getBelief();

  // 吃
  void eat(String food);
}
```

- 2. 被代理类
- 当通过代理类调用接口中的抽象方法的时候 会自动调用被代理类中的同名方法
```java
// 被代理类 (代理类要动态创建) 实现接口
class SuperMan implements Human {

  @Override
  public String getBelief() {
    return "我相信我能飞";
  }

  @Override
  public void eat(String food) {
    System.out.println("我喜欢吃: " + food);
  }
}
```

- 3. 创建专门生成代理类的工厂
- 内部定义静态方法用于通过类名调用获取代理类对象
- 也就是说我们的代理类是通过 代理类的工厂类 创建的
```java
class ProxyFactory {
  /*
    getProxyInstance(Object obj)方法:
    - 作用
      - 调用此静态方法 返回一个代理类对象 

      - 为了解决问题1: 如何根据加载到内存中的被代理类 动态的创建一个代理类及其对象

      - 前提就是告诉我 我此时创建的代理类是代理哪个被代理类的
      - 所以要传递进来一个被代理类对象

    - 参数obj:
      - 被代理类对象
    
    - 返回值:
      - Object 代理类的类型
      - 我们不要写具体的一个类型 那样就写死了 我们可能代理别的 不管代理什么 肯定是Object的一个实例
  */
  public static Object getProxyInstance(Object obj) {

    
    // newProxyInstance参数3需要的yInvocationHandler接口的实现类对象
    MyInvocationHandler handler = new MyInvocationHandler();

    // 通过bind()方法 给被代理类进行赋值操作
    // 我们要传递进来一个被代理类对象 而getProxyInstance方法的参数obj就是被代理类对象 我们丢进去
    handler.bind(obj);

    // 代理类对象
    return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), handler);

    // 当我们通过代理类对象调用Human接口中的方法的时候 它就会自动的转成参数3handler对象中的invoke()方法
  }
}
```

- 4. 测试类
```java
public class ProxyTest {

  public static void main(String[] args) {

    // 1. 创建代理类对象 传递被代理类对象
    SuperMan superMan = new SuperMan();

    // 2. 通过ProxyFactory类的静态方法创建代理类对象
    Human proxyInstance = (Human) ProxyFactory.getProxyInstance(superMan);
    /*  
      Object proxyInstance = ProxyFactory.getProxyInstance(superMan);

      - 代理类对象的返回值:
        - Object

      - 我们可以可以它强转成Human 但是它不能定义为SuperMan因为SuperMan是被代理类对象的类型
      
      - 这个逻辑是我们创建了SuperMan类的对象 也就是被代理类的对象 然后传递到getProxyInstance()方法中

      - 然后我们看看被代理类对象superMan实现了什么接口 我们造一个类(动态创建的代理类) 跟被代理类实现同一个接口

      - 所以我们可以写成被代理类和代理类共同的接口 这里我们不用Object类型 可以设置为接口类型 所以上面进行了强转
    */

    // 当通过代理类对象调用方法时 会自动的调用被代理类中的同名方法
    String belief = proxyInstance.getBelief();
    System.out.println(belief);
    proxyInstance.eat("四川麻辣烫");
  }
}
```

----------------------------

### AOP(Aspect Orient Programming)与动态代理的举例
- 前面介绍的Proxy和InvocationHandler 很难看出这种动态代理的优势 下面介绍一种更实用的动态代理机制

- 比如:
- 我们经常会遇到不同的代码段中 有着相同的代码段 而这些相同的代码在不同的代码段中出现会显得有些冗余

<!-- 
    代码段1             代码段2
    ---------          ---------
    相同的代码段         相同的代码段

                  ↘       ↓

    代码段3             方法A
    ---------     ↗    ---------
    相同的代码段         相同的代码段
 -->

- 所以我们会将这些相同的代码段抽离出来 抽成一个方法 方法造完以后我们就可以在代码段1 2 3中调用方法就可以了

- 改进后:
- 代码段1 2 3和相同的代码段分离了 但代码段1 2 3又和一个特定的方法A耦合了

- 最理想的效果是:
- 代码块1 2 3既可以执行方法A 又无须在程序中以硬编码的方式直接调用深色代码的方法

- 那能不能这个方法动态起来 想调用方法A就调用方法A 想调用方法B就调用方法B 这里我们就可以用动态代理

<!-- 
    -------------------
    动态代理增加的通用方法1 -- 固定[互换]

            ← 回调目标对象的方法 -- 动态的[互换] 
                                (想放哪个方法就放哪个方法)

    动态代理增加的通用方法2 -- 固定[互换]
    -------------------

    固定和动态之间是可以互换的
    上面是
      固定
        动态
      固定

    也可以看成
      动态
        固定
      动态
 -->

- 上面的方式也叫做切片编程
- 结合我们上面的动态代理的例子 我们也体会下 切片编程的方式
- 在上面的动态代理中 我们已经实现了 方法的动态调用 现在我们加上固定逻辑的部分
```java
interface Human {
  String getBelief();
  void eat(String food);
}

class SuperMan implements Human {

  @Override
  public String getBelief() {
    return "我相信我能飞";
  }

  @Override
  public void eat(String food) {
    System.out.println("我喜欢吃: " + food);
  }
}

// 创建一个固定逻辑的工具类
class HumanUtil {
  public void method1() {
    System.out.println("通用方法1+++++");
  }

  public void method2() {
    System.out.println("通用方法2-----");
  }
}

class ProxyFactory {
  public static Object getProxyInstance(Object obj) {
    MyInvocationHandler handler = new MyInvocationHandler();

    handler.bind(obj);

    return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), handler);
  }
}

class MyInvocationHandler implements InvocationHandler {

  private Object obj;
  public void bind(Object obj) {
    this.obj = obj;
  }

  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

    HumanUtil util = new HumanUtil();
    // 在这里调用 通用代码1
    util.method1();

    // 这里是动态的方法
    Object returnVal = method.invoke(obj, args);

    // 在这里调用 通用代码2
    util.method2();

    return returnVal;
  }
}

public class ProxyTest {

  public static void main(String[] args) {
    SuperMan superMan = new SuperMan();

    Human proxyInstance = (Human) ProxyFactory.getProxyInstance(superMan);

    String belief = proxyInstance.getBelief();
    System.out.println(belief);
    proxyInstance.eat("四川麻辣烫");
  }
}
```

----------------------------

### java8的新特性
-java8是java5以来最具革命性的版本

- 新特性:
- 速度更快
- 代码更少(增加了新的语法: Lambda表达式)
- 强大的StreamAPI
- 便于并行
- 最大化减少空指针异常: Optional
- Nashorn引擎, 允许在JVM上运行JS程序


> 并行流 和 串行流
> 并行流:
- 就是把一个内容分成多个数据块 并用不同的线程分别处理每个数据块的流 相比较串行的流, *并行的流*可以很大程度上*提高程序的执行效率*

- java8中将并行进行了优化 我们可以很容易的对数据进行并行操作
- StreamAPI可以声明性的通过 parallel()与sequential()在并行流与顺序流之间进行切换

----------------------------
### 复习
### Lambda表达式
- Lambda是一个匿名函数 我们可以把Lambda表达式理解为是*一段可以传递的代码*(将代码像数据一样进行传递)

- 使用它可以写出更简洁 更灵活的代码 作为一种更紧凑的代码风格 是Java的语言表达能力得到了提升
<!-- 
  说白了就是别的语言出现了这样的东西 挺好的然后java也加进来了
  就是抄抄别人的东西 让自己的语言更具有生命力
 -->

> 体验下 Lambda 表达式的写法
```java
package com.sam.proxy;
import org.junit.Test;
import java.util.Comparator;

public class Lambda1Test {
  @Test
  public void test1() {
    // 创建一个实现Runnable接口的匿名实现类对象 - 多线程的时候用到的接口
    Runnable r1 = new Runnable() {
      @Override
      public void run() {
        System.out.println("我爱北京天安门");
      }
    };

    // 就是普通的对象调用方法
    r1.run();

    System.out.println("******************:");

    // 下面使用Lambda的方法进行重写
    Runnable r2 = () -> System.out.println("我爱北京故宫");
    r2.run();
  }


  @Test
  public void test2() {
    // 提供Comparator的匿名实现类对象
    Comparator<Integer> com1 =new Comparator<Integer>() {
      @Override
      public int compare(Integer o1, Integer o2) {
        return Integer.compare(o1, o2);
      }
    };

    int compare1 = com1.compare(12, 21);
    System.out.println(compare1);

    System.out.println("******************:");

    // Lambda表达式的写法 ->
    Comparator<Integer> com2 = (o1, o2) -> Integer.compare(o1, o2);
    int compare2 = com2.compare(21, 1);
    System.out.println(compare2);

    System.out.println("******************:");

    // 方法引用 ::
    Comparator<Integer> com3 = Integer :: compare;
    int compare3 = com3.compare(21, 1);
    System.out.println(compare3);
  }
}

```

----------------------------

### Lambda表达式语言的使用1
> 格式:
- (o1, o2) -> Integer.compare(o1, o2);

> ->
  - Lambda操作符 或 箭头操作符
  - 箭头左边: Lambda的形参列表
    - 其实就是*接口中的抽象方法的形参列表*
    - 当有泛型的时候 通过类型推断有的时候可以省略 形参的类型

  - 箭头右边: Lambda体
    - 其实就是*重写抽象方法的方法体*


> Lambda表达式的使用:
- Lambda表达式的使用分为6种情况


> 语法格式1: 无参 无返回值 的情况
- 下面的代码就符合 无参 无返回值的情况

- 我们主要看下匿名实现类中的抽象方法:
- 我们可以看下 下面的代码中 我们都需要在接口的匿名实现类中实现抽象run()方法

- 使用Lambda表达式的方式的时候
- 1. run()的形参列表是没有参数的
- 2. run()也没有返回值 是void的

- 没有形参列表的时候 箭头的左边就可以使用 ()
- -> 的右边就是重写抽象方法的方法体

```java
@Test
public void test1() {
  // 之前重写接口中的抽象方法的方式:
  Runnable r1 = new Runnable() {
    @Override
    // 形参列表中没有参数
    public void run() {
      System.out.println("我爱北京天安门");
    }
  };
  r1.run();

  System.out.println("***************");
  

  // Lambda表达式 重写接口中的抽象方法的方式:
  Runnable r2 = () -> System.out.println("我爱北京故宫");
  r2.run();
}
```

- 以前的方式中 下面的代码作为 Runnable实现类的对象
```java
new Runnable() {
  @Override
  // 形参列表中没有参数
  public void run() {
    System.out.println("我爱北京天安门");
  }
};
```

- 现在使用Lambda表达式的时候 就由下面的代码替换了上面的代码 作为Runnable实现类的对象了
```java
() -> System.out.println("我爱北京故宫");
```

> Lambda表达式本质:
- 在js和python中 Lambda表达式是一个匿名函数
- 但在java的层面 它讲究万事万物皆对象 Lambda表达式不是一个匿名函数 而是一个对象 *作为接口的对象*
<!-- 
  Runnable r2 = () -> System.out.println("我爱北京故宫");
  上面的Lambda表达式作为左边Runnable接口的对象
 -->  

- *Lambda表达式的本质作为接口的实例(接口具体实现类的对象)*
<!-- 对象也叫做实例 -->

- 也就是说*Lambda表达式* 没有接口就没有意义了 *它是借助于接口才存在的*


> 语法格式2: Lambda需要一个参数 但是没有返回值
- 既然Lambda表达式需要借助于接口才能存在 为了展示语法格式 这里我们再拿Consumer接口来举例

- 原来的写法:
- 既然Consumer是个接口 那我们就需要提供一个接口的实现类对象 下面我们拿匿名实现类对象来举例
```java
Consumer<String> consumer = new Consumer<String>() {
  @Override
  // 之前重写接口中的抽象方法的方式: 这里有一个形参
  public void accept(String s) {
    System.out.println(s);
  }
};
```

- 使用 Lambda 表达式的写法:
- 要点: 
- 1. 下面并没有指明重写的是接口中的哪个方法呢 看起来重写默认的那个方法(接口中只有一个抽象方法)

- 2. 当有泛型的时候 形参的类型可以省略
- 3. 当方法体只有一句的时候 {}可以省略
```java
Consumer<String> consumer2 = (String s) -> {
  System.out.println(s);
};

// 其实跟箭头函数的规则有些像
Consumer<String> consumer2 = s -> System.out.println(s);

// 当调用accept()的时候 就调用了上面的方法体
consumer2.accept("不知道");
```


> 语法格式3: 数据类型可以省略 因为可由编译器推断得出 成为 "类型推断"
- 我们基于上面格式2中的代码进行扩展说明

```java
Consumer<String> consumer2 = (String s) -> {
  System.out.println(s);
};

// 优化如下:
Consumer<String> consumer2 = (s) -> {
  System.out.println(s);
};
```

- 以前接触到的类型推断的例子
```java
ArrayList<String> list = new ArrayList<>();
int[] arr = {1, 2, 3};
```


> 语法格式4: Lambda若只需要一个参数的时候 参数的小括号可以省略
```java
Consumer<String> consumer2 = s -> {
  System.out.println(s);
};
```

> 语法格式5: Lambda若有 两个或两个以上的参数 多条执行语句 并且可以有返回值的时候
- 这里我们拿Comparator接口举例
- 原来我们要是造Comparator接口的匿名实现类对象的时候
```java
Comparator<Integer> comparator = new Comparator<Integer>() {
  @Override
  public int compare(Integer o1, Integer o2) {
    return o1.compareTo(o2);
  }
};
```

- Lambda表达式的话：
```java
Comparator<Integer> comparato2 = (o1, o2) -> {
  System.out.println(o1);
  System.out.println(o2);
  return o1.compareTo(o2);
};
```


> 语法格式6: 当Lambda体只有一条语句时, return与大括号 都可以省略
```java
Comparator<Integer> comparato2 = (o1, o2) -> o1.compareTo(o2);
```


> 总结:
-> 左边:
  - Lambda形参列表的参数类型可以省略
  - 如果参数列表只有一个参数 ()可以省略
  - 如果没有参数或有多个参数的时候 ()不可以省略

-> 右边:
  - Lambda体应该使用一对{}包裹
  - 如果有Lambda体只有一条执行语句(可能是return) 可以省略{} 和 return关键字


**注意:**
- Lambda依托于接口 Lambda表达式相当于接口的实例对象 但是要求该接口内部只能有一个抽象方法

- *只有一个抽象方法的接口叫做函数式接口*

----------------------------

### 函数式接口的介绍
- 上面的例子中我们发现Lambda表达式都是依托于接口 Lambda表达式相当是接口的实现类对象

- 而我们对使用Lambda表达式的接口有要求 要求该接口中只能有一个抽象方法 所以我们在写Lambda表达式的Lambda体的时候就没必要指定抽象方法的方法名


> 本质：
- 也就是说: *Lambda表达式的本质: 作为函数式接口的实例对象*


> Lambda表达式的应用场景
- *只有*在*函数式接口进行实例化的时候* 我们才能用Lambda表达式


> 函数式接口:
- 如果一个接口中 只声明了一个抽象方法 则此接口就成为函数式接口

```java
// 我们看看 Runnable 接口 它就是一个函数式接口

// 看这个注解 也体现了函数式接口
@FunctionalInterface
public interface Runnable {
  public abstract void run();
}
```

- 我们自己也可以定义函数式接口
- @FunctionalInterface 使用与否 MyInterface 都是函数式接口 只不过我们如果使用了@FunctionalInterface注解 就会有校验功能
```java
@FunctionalInterface
public interface MyInterface {
  void method();
}
```

- 如果是函数式接口后 我们就可以通过 Lambda表达式来创建该接口的对象(若Lambda表达式抛出一个受检异常(即: 非运行时异常), 那么该异常需要在目标接口的抽象方法上进行声明)

- 我们可以在一个接口上使用 @FunctionalInterface 注解
- 这样做可以检查它是否是一个函数式接口 同时javadoc也会包含一条声明 说明这个接口是一个函数式接口

- 在java.util.function包下定义了java8的丰富的函数式接口

> 以前用匿名实现类表示的, 现在都可以使用Lambda表达式来写

----------------------------

### Java内置的函数式接口介绍 以及 使用举例
- java内置四大核心函数式接口
- 这4个核心的函数式接口相当于 四种模板 当我们需要定义的接口和这4个模板一样的时候 我们直接可以使用该4个接口


> 如何使用给定的函数式接口:
- 比如我们想定义一个接口 恰好我们的接口里面只有一个抽象方法
- 这个方法需要传递一个东西 *一个参数*就够 这个方法还*没有返回值* 以前的时候 我们可能就自己定义这个接口了

- 现在的话 我们就可以看到 上述的内容很像消费型接口 既然这样我们就没有必要定义这样的接口了 我们直接用Consumer就可以了 如果和我们想定义的名字可能有些出路 但是没必要自己定义接口了 直接使用就可以了


> Consumer<T>
- 消费型接口

- 参数类型: T
- 有一个参数 参数的类型是泛型T

- 返回值类型: void
- 就是无返回值

- 用途:
- 对传递进去的T类型的参数对象 应用操作(就是在方法内部操作这个对象)

- 包含的方法: 
- *void accept(T t)*
<!-- 
  void accept(T t) 
  抽象方法接收一个参数但是不返回 放一个参数 但是不返回

  消费的理解 我们给它东西 它不往回返
 -->

- 应用场景 传参没有返回值的时候 我们就可以用消费者


> Supplier<T>
- 供给型接口

- 参数类型: 无
- 没有形参

- 返回值类型: T
- 有返回值 返回值的类型是T类型


- 用途:
- 方法内部逻辑加工后返回一个T类型的对象

- 包含的方法: 
*T get()*
<!-- 
  供给的理解 不给它东西 它都往回返
  参数是空的 但会返回一个值
-->


> Function<T, R>
> Function<T>
- 函数型接口

- 参数类型: T

- 返回值类型: R
- 返回值类型2: T

- 用途:
- 对类型为T的对象应用操作 并返回结果

- 结果是R类型的对象
- 包含方法: 
- *R apply(T t)*

<!-- 
  我们放进去的东西 和 返回得东西可以不一样
  放个T进去 我们返回一个R
 -->


> Predicate<T>
- 断定型接口(判断型)

- 参数类型: T

- 返回值类型: boolean

- 用途:
- 确定类型为T的对象是否满足某约束 并返回boolean值

- 包含方法: 
- *boolean test(T t)*
- 抽象方法中定义判断的规则

> 应用场景总结
- 1. Predicate<T> 
- 传入一个参数 返回一个布尔值 可以根据布尔值进行过滤等
- 可以当做回调来理解 (布尔类型的回调)

- 2. js中很多数组方法的回调
- Function<T, R> 当回调里面需要*有参数* *有返回值*的时候 我们传入的是Function接口的实现类对象

- Supplier<T> 当回调里面需要 *无参数* *有返回值*的时候 我们传入的是Supplier接口的实现类对象

- Consumer<T> 当回调里面需要 *有参数* *无返回值*的时候 我们传入的是Consumer接口的实现类对象

- 其实我们直接当回调用可能就行了 不用考虑什么接口
- 但是可能需要考虑接口内的方法


> 总结:
- 1. 当我们以后遇到的情景是 我们传递形参 但不返回的情况下 我们就可以使用 消费型接口
- 也就是说 上面的4种接口相当于4种应用场景 当遇到对应的场景的时候 我们就可以使用这些接口 从而使用 Lambda表达式

- 2. 后续我们能看到有些形参会出现这些接口 当出现这些接口 我们要做实例化的时候 我们就可以考虑用 Lambda表达式


> 扩展的函数式接口
- 上面提到了 4种基本的函数式接口 除了上面的4种之外 还有其他的一些接口


> BiFunction<T, U, R>
- 参数类型: T U
- 返回值类型: R

- 用途: 
- 对类型为T U参数应用操作 返回R类型的结果
- 包含方法为: 
- *R apply(T t, U u)*


> UnaryOperator<T>
- Function子接口

- 参数类型: T
- 返回值类型: T

- 用途:
- 对类型为T的对象进行一元运算 并返回T类型的结果
- 包含方法为: *T apply(T t)*
<!-- 
  放进去的是T类型 出来的还是T类型
 -->


> BinaryOperator<T>
- BiFunction子接口

- 参数类型: T T
- 返回值类型: T

- 用途:
- 对类型为T的对象 进行二元运算 并返回T类型的结果
- 包含方法为: T apply(T t1, T t2)


> BiConsumer<T, U>
- 参数类型: T U
- 返回值类型: void

- 用途:
- 对类型为T, U参数应用操作
- 包含方法为: void accept(T t, U u)


> BiPredicate<T, U>
- 参数类型: T U
- 返回值类型: boolean

- 用途:
- 包含方法为: boolean test(T t, U u)


> ToIntFunction<T>
> ToLongFunction<T>
> ToDoubleFunction<T>
- 参数类型: T
- 返回值类型: int long double

- 用途:
- 分别计算 int long double值的函数


> IntFunction<R>
> LongFunction<R>
> DoubleFunction<R>
- 参数类型: int long double
- 返回值类型: R

- 用途:
- 参数分别为 int long double 类型的函数



> 我们看看各个接口的示例:
> Consumer接口的示例
- 1. 我们定义了一个方法
```java
// 一个普通方法 第二个参数为Consumer接口的实现类对象
public void happyTime(double money, Consumer<Double> con) {
  con.accept(money);
}
```

- 原来的方式调用
```java
@Test
public void test1() {
  // 第二个参数的位置要传递一个Consumer接口的实现类对象
  happyTime(500, new Consumer<Double>() {
    @Override
    public void accept(Double aDouble) {
      System.out.println("学习太累了 去天上人间买了水 价格为: " + aDouble);
    }
  });
}
```

- Lambda表达式的方式
- 因为我们发现 第二个参数的位置正好是函数式接口 所以我们就可以采用Lambda表达式来写
```java
// money参数的使用 是根据Consumer接口内的抽象方法的参数决定的 抽象方法中就一个参数
happyTime(500, money -> System.out.println("学习太累了 去天上人间买了水 价格为: " + money));
```


> Predicate接口的示例
- Predicate的抽象方法test中 是定义判断的规则
- 我们要将集合中的字符串进行过滤 将符合规则的字符串添加到新的List中

- 原来的方法:
```java
// 定义一个过滤集合中字符串的方法 使用了Predicate接口
public List<String> filterString(List<String> list, Predicate<String> pre) {
  // 创建一个集合
  ArrayList<String> filterList = new ArrayList<>();

  // 遍历集合中的元素
  for(String s: list) {

    // 如果是true就加到 filterList 集合中
    if(pre.test(s)) {
      filterList.add(s);
    }
  }

  return filterList;
}


- 返回值类型: List<String>
- 参数1: List<String> list
- 参数2: Predicate<String> pre 接口


@Test
public void test1() {
  // 定义一个字符串
  List<String> list = Arrays.asList("北京", "南京", "天津", "东京");

  // 参数2的位置 传入Predicate接口的匿名实现类对象 内部重写抽象方法 并 指定判断规则
  List<String> res = filterString(list, new Predicate<String>() {
    @Override
    public boolean test(String s) {
      // 是否包含 京
      return s.contains("京");
    }
  });

  System.out.println(res);
}
```

- Lambda表达式:
- 这里唯一迷惑的地方就在于 我们不知道函数式接口中的抽象方法长什么样 什么样的参数

- 所以在指定Lambda表达式的时候会有问题

```java
@Test
  public void test1() {
    List<String> list = Arrays.asList("北京", "南京", "天津", "东京");

    List<String> res = filterString(list, s -> s.contains("京"));

    System.out.println(res);
  }
```


> 函数式接口的使用场景
- 如果我们开发中需要定义一个函数式接口 首先看看在已有的jdk提供的函数式接口中是否提供了能满足需求的函数式接口 如果有 则直接调用即可 不需要自己再自定义了

----------------------------

### 方法引用与构造器引用
- 方法引用与构造器引用是基于Lambda表达式的

> 方法引用(Method References)
- 当要传递给Lambda体的操作 已经有了实现的方法了 可以使用方法引用
<!-- 
  我们在Lambda体中想写的方法形式 和 函数式接口中的抽象方法一致的时候 可以使用方法引用
 -->

- 方法引用可以看做是Lambda表达式深层次的表达
- 换句话说 *方法引用就是Lambda表达式 也就是函数式接口的一个实例*

- 通过方法的名字来指向一个方法 可以认为是Lambda表达式的一个语法糖

> 要求:
- 实现接口的抽象方法的参数列表和返回值类型 必须与方法引用的方法的参数列表和返回值类型保持一致

> 格式:
- 使用操作符 "::" 将类(或对象) 与 方法名分隔开来

> 三种主要使用情况:
> 对象 :: 静态方法名
> 类 :: 静态方法名

> 类 :: 非静态方法名  -- 有点难
- ::前面相当于调用者
- ::后面相当于调用的方法 是方法名 *参数列表不用写*
<!-- 
  对象 :: 实例方法(非静态方法)
  类 :: 静态方法
  类 :: 非静态方法
    - 这里类是可以调用非静态的方法的

  通过对象或类调用对应的方法
  我们看看是什么样的方法 然后选择前面用什么结构来调用
 -->


**注意:** 
- 关于方法引用的测试 在Day06中


> 方法引用的使用情景
- 当要传递给Lambda体的操作 已经有了实现的方法了(比如API中现成的方法) 可以使用方法引用
<!-- 
  API中现成的方法的结构 和 函数式接口中的抽象方法的结构一样的时候

  我们就可以使用API中现成的方法 来充当Lambda表达式的表达体部分
 -->

> 情况1: 对象 :: 实例方法
> Consumer接口下的使用情景
- 我们先看看 使用Lambda表达式的情景
```java
// 这里相当于我们创建了 Consumer接口的实现类对象 然后里面重写了accept()方法 方法体内容为System.out.println(str);
Consumer<String> con1 = str -> System.out.println(str);

// 
con1.accept("北京");
```

- 然后我们再看看使用方法引用的情景:
- 我们先观察下

- Consumer接口中 的抽象方法为
- void accept(T t)

- 而 System.out.println() 方法
- System.out为PrintStream打印流的对象 该对象有一个println()方法
- void println(T t)

- 这时候我们发现 Consumer接口中的抽象方法和现成的PrintStream打印流对象中的println(T t)是一样的

- void accept(T t)
- void println(T t)

- 我们发现它们正好匹配上 都是一个参数无返回 这时候我们就可以考虑使用方法引用 使用现成的println(T t)方法来代替Lambda表达式的表达体部分

- 方法引用替换的是 Lambda体的位置
- 那是不是说 重写方法的内容就是 System.out.println()

- 方法引用的实现
- println(T t)是非静态方法 可以由对象来调用
- 我们要使用 对象 :: 方法名 的结构 那我们就要提供一个对象

- PrintStream ps = System.out;
- ps :: println;

```java
PrintStream ps = System.out;

// println这里没有写参数 因为我们调用Consumer里面的accept方法的时候 传递的参数也会进去 因为两个方法形参列表是一样的

- void accept(T t)
- void println(T t)

Consumer<String> con2 = ps :: println;
con2.accept("beijing");
```


> Supplier接口下的使用情景
- 函数式接口 供给者

- Supplier接口中的抽象方法 T get()
- 自定义类中 String getName()
<!-- 
  public String getName() {
		return name;
	}

  这个方法就像供给中抽象方法的形式 什么也不放但是返回String
 -->

- 这两个方法也能匹配上 我们也可以使用方法引用

- Lambda表达式的写法:
```java
@Test
public void test2() {
  // 造一个员工的对象
  Employee emp = new Employee(1001, "sam", 23, 5600);

  // Lambda表达式来写
  // Supplier接口中的抽象方法 T get() 没有参数 所以我们如下写法 返回一个员工的名字
  Supplier<String> sup1 = () -> emp.getName();

  // 这里我们调用 Supplier接口中的get()方法的时候 会执行我们实例对象(Lambda表达式就是实例对象)重写后的逻辑
  System.out.println(sup1.get());
}
```

- 方法引用的写法:
```java
// 方法引用的写法
// 造一个员工的对象
Employee emp = new Employee(1001, "sam", 23, 5600);

// Employee类中的getName()方法是实例方法 要通过对象来调用 而 emp就是对象 方法的调用者 后面跟方法名
Supplier<String> sup2 = emp :: getName;
String name = sup2.get();
System.out.println(name);
```


**方法引用使用的要求:**
- 要求函数式接口中的抽象方法的形参列表和返回值类型 与 已有方法的形参列表和返回值类型一致时 才能使用方法引用


> 情况2: 类 :: 静态方法 
- 这里我们拿下面的两个举例说明
- Comparator中的 int compare(T t1, T t2)
- Integer中的 int compare(T t1, T t2)

- Lambda表达式的写法:
```java
// 我们在写Lambda表达式的时候 只要记住接口中的抽象方法长什么样
Comparator<Integer> com1 = (t1, t2) -> Integer.compare(t1, t2);

System.out.println(com1.compare(12, 21));
```

- 方法引用:
- 我们发现Comparator接口中的抽象方法int compare(T t1, T t2) 和
- Integer类中的静态方法 int compare(T t1, T t2) 一致 所以这里我们也可以使用方法引用

- 而 静态方法需要通过类来调用 对于静态方法的方法引用的结构为 类 :: 静态方法 所以如下

```java
// 方法引用
Comparator<Integer> com2 = Integer :: compare;
```

> 我们在看看另外一个例子
- Function<T, R>中的 R apply(T t)
- Math中的 Long round(Double d)

- 上面的结构又一样 我们看看怎么使用方法引用
```java
// 原始方法

// Function接口要求泛型为两个 一个作为内部抽象方法apply方法的参数 另一个作为apply方法返回值的类型
Function<Double, Long> fn = new Function<Double, Long>() {

  @Override
  public Long apply(Double d) {
    return Math.round(d);
  }
};


// Lambda表达式的写法

// 这里表达体的参数 我们要参照接口中的抽象方法的参数定义
Function<Double, Long> fn1 = d -> Math.round(d);


// 方法引用:
Function<Double, Long> fn2 = Math :: round;
```


> 情况2: 类 :: 实例方法
- 这里我们拿下面的两个例子说明
- Comparator中的
    int comapre(T t1,T t2)

- String中的
    int t1.compareTo(t2)

- 其实我们观察上面两个方法的结构并不一样 也就是说他们好像不太匹配
- 也就是说情况3 *类::实例方法* 这块*不适合用*上面的*规律*(要求接口中的抽象方法的形参列表和返回值类型与方法引用的方法的形参列表的返回值类型相同)

- Comparator接口中要重写的抽象方法是: 
  - int comapre(T t1,T t2)

```java
// Lambda表达式的写法
Comparator<String> com1 = (s1, s2) -> s1.compareTo(s2);
com1.compare("abc", "abd");

// 方法引用
// 参数1是作为compareTo()方法的调用者出现的时候 
Comparator<String> com2 = String :: compareTo;

// compareTo方法是通过String类来调用的 
```

> 我们再来看一个例子:
- BiPredicate中的
    boolean test(T t1, T t2);

- String中的
    boolean t1.equals(t2)

```java
// Lambda表达式的写法
BiPredicate<String, String> pre1 = (s1, s2) -> s1.equals(s2);
System.out.println(pre1.test("abc", "abc"));

// 方法引用
BiPredicate<String, String> pre2 = String :: equals;
System.out.println(pre1.test("abc", "abc"));
```


> 情况3: 类 :: 非静态方法
- 还是 函数式接口中的抽象方法 有两个参数
- 参数1作为别的API的方法中的调用者了 这时候我们也能用方法引用

- 当函数式接口方法的第一个参数是需要引用方法的调用者 并且第二个参数是需要引用方法的参数(或无参数)时 ClassName :: methodName

- Function中的
    R apply(T t)

- Employee中的
    String getName();
<!-- 
  这里t 是相当于Employee对象 调用getName()
 -->

```java
// Lambda表达式的写法
Employee employee = new Employee(1001, "sam", 23, 6666);
Function<Employee, String> fn = e -> e.getName();
// 方法直接完会得到name
System.out.println(fn.apply(employee));

// 方法引用
Function<Employee, String> fn2 = Employee :: getName;
fn2.apply(employee);
```


> 总结情况3中的规律:
- 形参列表不对应了 但是函数式接口中的抽象方法的参数1作为其他API的方法的调用者的时候 我们也可以使用方法引用


> 使用建议:
- 如果给函数式接口提供实例 恰好满足方法引用的使用情景 大家就可以考虑使用方法引用给函数式接口提供实例

- 如果我们不熟悉方法引用 那么还可以使用Lambda表达式

----------------------------

### 构造器引用 数组引用
- 构造器引用和数组引用跟方法引用类似 就是看匹配的情况

- 函数式接口的抽象方法的形参列表和构造器的形参列表一致
- 抽象方法的返回值类型即为构造器所属的类的类型

- *也就是函数式接口中的返回得类型 就是 我们要造的对象的情况下 我们就可以同构造器跟抽象方法进行匹配*

> 构造器引用格式: 类名 :: new
 

> 构造器引用
- Supplier<T>中的接口中的抽象方法为：
  T get()
- 也就是Supplier接口的返回值类型是T
- 也就是说抽象方法会返回一个值 比如我们会返回一个对象

- 我们看看Supplier接口的实现类对象怎么创建
```java
Supplier<Employee> sup = new Supplier<Employee>() {
  // 重写Supplier接口中的抽象方法 返回一个对象
  @Override
  public Employee get() {
    return new Employee();
  }
};
```

- 我们看看Lambda表达式怎么用
- 写Lambda表达式的时候需要记得函数式接口中的抽象方法的样子 参照着写
- T get() --  无参 但要返回一个对象(T类型)

```java
Supplier<Employee> sup = () -> new Employee();
// 调用抽象方法就能返回一个对象
sup.get();
```

- 我们再看看 构造器引用
- 上面说了 还是看匹配的情况
- T get() -- 没有参数但有返回值
- Employee()的空参构造器也是 没有参数 当我们new的时候 就相当于返回值
- get()返回得是T 而Employee()在new的时候就造了一个对象 造的对象就相当于T

- 当我们调用的是空参的构造器的时候 就可以写成 构造器引用的形式

> 构造器 :: new

```java
Supplier<Employee> sup2 = Employee :: new;
```


> 我们再看看下面的例子
- Function<T, R>接口中的
    R apply(T t)

- 该接口会返回R类型 传入T类型

- 我们看看Lambda表达式的写法
```java
// Function<形参, 返回值类型>  id就是Integer
Function<Integer, Employee> fn1 = id -> new Employee(id);
Employee employee = fn1.apply(1001);
System.out.println(employee);
```

- Function<T, R> - R apply(T t)
- 我们传入参数T类型 返回R类型

- 在看看 Empolyee(int id)的构造器 是不是匹配上了
- 传入id new的时候返回一个对象

- 上面的例子中空参构造器引用 我们用得 Employee :: new
- 这里 带参数的构造器 我们还用 Employee :: new
- 为什么?

- 上面的例子用得是 Supplier<T> 接口 这个接口是返回T 但无参
- 下面的例子用得是 Function<T, R> 接口 参数T 返回R 正好和 
- public Empolyee(int id) 一样 参数id 返回对象
```java
// 构造器引用
Function<Integer, Employee> fn2 = Employee :: new;
Employee employee2 = fn2.apply(1002);
System.out.println(employee2);
```


> 我们再看看下面的接口的例子
- BiFunction<T, U, R>
- 参数类型: T U
- 返回值类型: R

- R apply(T t,U u)

- 那是不是说 我们可以匹配两个参数的构造器
- public Employee(int id, String name)
- id相当于T name相当于U 返回得对象相当于R

```java
// Lambda表达式的写法
BiFunction<Integer, String, Employee> fn = (id, name) -> new Employee(id, name);

Employee erin = fn.apply(1006, "erin");
System.out.println(erin);


// 构造器引用的写法
BiFunction<Integer, String, Employee> fn2 = Employee :: new;
Employee nn = fn2.apply(1008, "nn");
System.out.println(nn);
```


> 数组引用
- 上面的如果理解了的话 我们这里可以将数组也看做是类类型 这样就没有什么区别了

- 大家可以把数组看做是一个特殊的类 则写法就跟构造器引用的方法一致了

> 数组引用的格式: 数组类型[] :: new

- 比如
- Function<T, R>中的
    R apply(T t)

- 我们把数组也看做是类 那在new的时候都差不多

```java
// Lambda表达式的形式

// 泛型不能用基本数据类型 如果用就要用包装类 返回String[] 
// Integer是用来定义数组的长度的
Function<Integer, String[]> fn = length -> new String[length];
String[] arr = fn.apply(5);
System.out.println(Arrays.toString(arr));


// 数组引用
Function<Integer, String[]> fn2 = String[] :: new;
```

----------------------------

### Stream API
- java8中有两大最为重要的改变
- 1. Lambda表达式
- 2. Stream API

- Stream API(java.util.stream)把真正的函数式编程风格引入到了java中 这是目前为止对java类库最好的补充
<!-- 
  因为Stream API可以极大提高java程序员的生产力 
  让程序员写出高效率 干净 简洁的代码 
-->

- Stream是java8中处理集合的关键抽象概念 它可以指定你希望对集合进行的操作 可以执行非常复杂的查找 过滤 和 映射数据等操作

- *使用Stream API对集合数据进行操作 就类似于使用sql执行的数据库查询*
- 也可以使用Stream API来并行执行操作

- 简言之 Stream API提供了一种高效且易于使用的处理数据的方式
<!-- 
  可以对内存中的数据进行过滤 排序 映射 归约等操作 类似于sql语言对数据库中表的相关操作
 -->


> 为什么要使用 Stream API
- 实际开发中 项目中多数数据都来自于Mysql Oracle等 但现在数据源可以更多了 有MongoDB Redis等 而这些NoSql的数据就需要Java层面去处理
<!-- 
  sql型的数据当查询近3个月的数据的时候 我们搜索3个月的数据 这样的逻辑是直接在sql层面来处理的

  但是对于非关系型数据库 这样的操作 就需要在java层面来处理
  在java层面做这样的事儿就需要使用Stream API
 -->

- Stream和Collection集合的区别:
- Collection是一种静态的内存数据结构(容器) 而Stream是有关计算的
- 前者主要面向内存 存储在内存中 后者主要是面向CPU 通过CPU实现计算
<!-- 
  内存是用来存数据的 - Collection
  CPU是用来计算的 - Stream API
 -->

> Stream到底是什么呢？
- 是数据渠道 用于操作数据源(集合 数组等)所生成的元素序列
- 集合讲的是数据
- Stream讲的是计算

> 1. 
- Stream关注的是对数据的运算 与CPU打交道
- 集合关注的是数据的存储 与内存打交道

> 2. 
  - 1. Stream自己不会存储元素
  <!-- 
    数据仍然在集合中 就像我们前面说的迭代器一样 迭代器是用来遍历集合的 迭代器本身它也不存数据 数据还是在集合里 Stream也一样
  -->

  - 2. Stream不会改变源对象 相反 他们会返回一个持有结果的新的Stream
  <!-- 
    Stream是不可变的特性 原本的对象不变
  -->

  - 3. Stream操作时延迟执行的 这意味着他们会等到需要结果的时候才执行

> 3. Stream的操作的三个步骤
- 比如当我们求个数 求最大最小等等 需要如下的3个步骤

  - 1. 创建 Stream 对象 - Stream的实例化
  - 一个数据源(如: 集合, 数组) 获取一个流

  - 2. 中间操作
  - 一个中间操作链 对数据源的数据进行处理

  - 3. 终止操作(终端操作)
  - 一旦执行终止操作, *就执行中间操作链* 并产生结果 之后 不会再被使用

<!-- 
  1                                 3
  数据源 -> filter -> map -> ... -> 终止操作
           |                  |
           --------------------
           2. 一系列 中间操作 形成的流水线


  1. 根据某个集合创建一个对象
  2. 然后我们有一系列的中间操作 比如过滤 映射等
  3. 求个数 变量 归约等等的终止操作


  什么是延迟的？
  中间操作中 每一个操作代表一个方法 每次调用完后就.下
  对于中间操作来讲 我们调用完后 只要我们没有调用终止操作

  中间操作都不执行 只有我们调用了终止操作 才会去执行中间操作中的方法

  一旦我们终止操作了 一系列就完成了 我们这个Stream对象就不能再进行.方法的操作了 因为已经终止了 就不可以被使用了
 -->

----------------------------

### Stream的实例化
- Stream的实例化有4种方式
- Stream对象就是用来操作一个容器的 跟集合打交道

> 创建Stream方式1: 通过集合
- java8中的Collection接口被扩展 提供了两个获取Stream流(对象)的默认方法
<!-- 
  也就是说下面的两个方法 是Collection接口中定义的
 -->

- 也就是通过集合创建Stream对象的两种方法

> 集合对象.stream():
- default Stream<E> stream():
- 通过集合对象来调用 list.stream()

- 返回值类型: E
- 返回一个顺序流

- 顺序流:
- 当我们执行中间操作的时候 会从集合中拿数据 拿数据的时候会按照我们添加的顺序来



> 集合对象.parallelStream():
- default Stream<E> parallelStream():
- 通过集合对象来调用 list.parallelStream()

- 返回值类型: E
- 返回一个并行流

- 并行流:
- 当我们执行中间操作的时候 会从集合中拿数据 拿数据的时候会像多线程似的 类似有几个线程 同时去取数据 顺序就不一定是添加的顺序了


- 上面的两个方法在集合中, Collection是一个接口 我们能看到上面都是接口中的默认方法

- 接口中的默认方法 我们不能直接拿接口本身去.


- 准备工作:
- 我们在 EmployeeData 类中定义了一个 getEmployees()方法 用来返回一个集合
```java
public class EmployeeData {
	
	public static List<Employee> getEmployees(){
		List<Employee> list = new ArrayList<>();
		
		list.add(new Employee(1001, "马化腾", 34, 6000.38));
		list.add(new Employee(1002, "马云", 12, 9876.12));
		list.add(new Employee(1003, "刘强东", 33, 3000.82));
		list.add(new Employee(1004, "雷军", 26, 7657.37));
		list.add(new Employee(1005, "李彦宏", 65, 5555.32));
		list.add(new Employee(1006, "比尔盖茨", 42, 9500.43));
		list.add(new Employee(1007, "任正非", 26, 4333.32));
		list.add(new Employee(1008, "扎克伯格", 35, 2500.32));
		
		return list;
	}
}
```

> 通过集合的方式获取Stream对象的代码部分:
```java
@Test
public void test() {

  // 1. 先创建一个集合 里面是一个个的员工数据
  List<Employee> list = EmployeeData.getEmployees();


  // 2. 通过集合对象 调用stream() 返回得是顺序流Stream对象
  Stream<Employee> stream = list.stream();


  // 通过集合对象 调用parallelStream() 返回得是并行流Stream对象
  Stream<Employee> parallelStream = list.parallelStream();
}
```


> 创建Stream方式2: 通过数组
- 集合是一种容器 数组也是容器 所以我们还可以通过数组的方式去创建Stream对象

- java8中的Arrays的静态方法 stream()可以获取数组流

> Arrays.stream(提供一个具体的数组)
- 返回一个stream流对象
<!-- 
  参数: 
    int[] arr
    long[] arr
    double[] arr

    T[] arr   -- 自定义类型的数组
 -->

- 返回值:
- 我们丢进去的是什么类型的数组 返回值的类型就是 数组的类型

- static <T> Stream<T> stream(T[] array):
- 如果我们传入的是自定义类型的数组 那么其返回值的类型是根据泛型T指定的 自定义数组是什么类型 返回得就是什么类型

- 也就是说我们创建的stream对象的类型是通过泛型体现的

- 重载形式, 能够处理对应基本类型的数组:
- public static IntStream stream(int[] arr)
- public static LongStream stream(long[] arr)
- public static DoubleStream stream(double[] arr)

```java
int[] arr = {1, 2, 3};

// 返回得是 IntStream
IntStream intStream = Arrays.stream(arr);


// 自定义的数组
Employee e1 = new Employee(1001, "sam");
Employee e2 = new Employee(1002, "erin");
Employee[] arr1 = new Employee[]{e1, e2};


// 返回得是Employee
Stream<Employee> stream = Arrays.stream(arr1);
```


> 创建Stream方式3: 通过Stream的of()
- 通过Stream类本身的静态方法 of() 也能创建一个stream对象
- 它可以接收任意数量的参数

> Stream.of(T ... values)
- 通过Stream类来调用

- 参数:
- 传递多个数据 相当于对这多个数据 包装成了一个容器
- 既然是T 那么就是泛型 那么就意味着传递的基本数据类型会被当做是包装类

```java
Stream<Integer> integerStream = Stream.of(1, 2, 3, 6);
```


> 创建Stream方式4: 创建无限流
- 使用的情景少 作为了解
- 可以使用静态方法 Stream.iterate() 和 Stream.generate() 创建无限流


> Stream.iterate(参数1, 参数2)
- 迭代
- 不停的根据条件创建元素 可以理解为将创建的元素放入一个容器中 因为stream对象就是要操作容器的
<!-- 
  public static<T> Stream<T> iterate(final T seed, final UnaryOperator<T> f) 
-->

- 参数1:
- seed: 种子 初始值

- 参数2:
- UnaryOperator<T>函数式接口 它是Function子接口
- 参数类型: T
- 返回值类型: T
- 内部的抽象方法: T apply(T t)
<!-- 
  放进去的 和 返回得都是 T
 -->
- 既然是参数式接口 那么我们可以用Lambda表达式去写参数2

- 参数2也可以是看做是迭代的规则是什么
- 比如我们放入一个t 然后返回t+2 那么每次得到的新的值 会继续加2 周而复始

- 因为是无限循环的操作 这里我们还需要借助两个以后讲的API
- 1. forEach(Consumer接口实现类)
- forEach()是终止操作 也是执行中间操作的必要环节
- 参数:
- 消费者接口 也就是我们要在里面传递一个Consumer接口实现类对象 内部会重写这个接口中的方法 该方法也作为终止操作的最后语句吧 先这么理解

- 因为是函数式接口我们可以写成方法引用或Lambda表达式

- 2. limit(10)
- 中间操作的一个方法 代表取前10个

```java
Stream.iterate(0, t -> t + 2).limit(10).forEach(System.out :: println);
```


> Stream.generate()
- 无限生成数据 帮我们去造数据
<!-- 
  - public static<T> Stream<T> generate(Supplier<T> s)
 -->

- 参数
- Supplier接口的实现类对象 
- T get() 无参但返回东西

```java
Stream.generate(Math :: random).limit(10).forEach(System.out :: println);
```


- 总结
- 我们主要关注数据本身是以什么方式呈现的 集合就通过集合对象创建stream对象 数组就用Arrays 什么也没有现造出来一个就用of()

- 无限流是特殊的情况下我们要造数据才用它

----------------------------

### Stream的中间操作
- 多个中间操作可以连接起来形成一个流水线 除非流水线上触发终止操作 否则中间操作不会执行任何的处理 而在终止操作时一次性全部处理 称为"惰性求值"

**每一个中间环节都能得到一个对应类型的Stream对象**
```java
// 我们既可以链式调用
list.stream().limit(3).forEach(System.out :: println);

// 也可以从某一个中间操作得到对应类型的stream对象
Stream<Employee> employeeStream = list.stream().limit(3);
    // 集合中每一个元素都是员工对象 我们得到的就是employeeStream

// 通过这个对象我们在调用终止操作的方法
employeeStream.forEach(System.out :: println);
```

> 通用操作
- 先准备一个集合
```java
public class EmployeeData {
	
	public static List<Employee> getEmployees(){
		List<Employee> list = new ArrayList<>();
		
		list.add(new Employee(1001, "马化腾", 34, 6000.38));
		list.add(new Employee(1002, "马云", 12, 9876.12));
		list.add(new Employee(1003, "刘强东", 33, 3000.82));
		list.add(new Employee(1004, "雷军", 26, 7657.37));
		list.add(new Employee(1005, "李彦宏", 65, 5555.32));
		list.add(new Employee(1006, "比尔盖茨", 42, 9500.43));
		list.add(new Employee(1007, "任正非", 26, 4333.32));
		list.add(new Employee(1008, "扎克伯格", 35, 2500.32));
		
		return list;
	}
}
```


> 筛选 与 切片
> filter(Predicate p)
- 接收Lambda, 从流中排除某些元素 相当于过滤
<!-- 
> Predicate<T>
- 断定型接口(判断型)

- 传一个参数返回一个boolean
- 包含方法: *boolean test(T t)*
 -->

- 参数:
- Predicate接口的实现类对象 我们可以传递Lambda表达式
- Predicate接口是传递一个参数 返回一个布尔值 *根据布尔值过滤集合中的元素*

- 需求:
- 查询员工表中工资大于7000的员工信息
```java
// 先准备一个集合
List<Employee> list = EmployeeData.getEmployees();

// 实例化stream对象
Stream<Employee> stream = list.stream();

// 我们传递一个Employee作为参数 也就是把每一个员工对象传递进去根据员工对象的属性 我们来进行排序
stream.filter(e -> e.getSalary() > 7000).forEach(System.out :: print);

// 注意: 上面已经进行了终止操作 下面就不能在通过stream对象调用中间操作了
stream.limit(3).forEach(System.out :: println);
```

**注意:**
- 如果我们已经调用的了终止操作forEach() 那么就代表该stream已经关闭了 后续不能在通过stream对象调用中间操作

- 异常
- java.lang.IllegalStateException: stream has already been operated upon or closed

- 解放方案:
- 重新生成一下
```java
// 先准备一个集合
List<Employee> list = EmployeeData.getEmployees();

Stream<Employee> stream = list.stream();
stream.filter(e -> e.getSalary() > 7000).forEach(System.out :: print);

// list.stream() 重新生成一个stream对象
list.stream().limit(3).forEach(System.out :: println);
```


> distinct()
- 筛选，通过流所生成元素的 hashCode() 和 equals() *去除重复元素*

- 根据自定义类中的 hashCode() 和 equals() 方法来去重 比如我们Employee中定义的方式是 全部一样才算一样才会被去重 有一个属性不一样都会两个对象都保留

```java
list.stream().distinct().forEach(System.out :: println);
```


> limit(long maxSize)
- 截断流，使其元素不超过给定数量
- 截取集合中数据的前3个

```java
list.stream().limit(3).forEach(System.out :: println);
```


> skip(long n)
- 跳过集合中指定的元素(数据)，比如过掉前3个数据 就从第4个开始

- 返回一个扔掉了前 n 个元素的流。若流中元素不足 n 个，则返回一个空流。与 limit(n) 互补



> 映射
> map(Function f)
- 接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素。(跟js里面的map差不多)
<!-- 
  > Function<T, R>
  - 函数型接口

  - 参数类型: T
  - 返回值类型: R

  - 包含方法: *R apply(T t)*
 -->

- 参数:
- Function接口的实现类对象 我们可以使用Lambda表达式
- R apply(T t)
- 放入一个形参 返回一个值

```java
List<String> list = Arrays.asList("aa", "bb", "cc");

list.stream().map(str -> str.toUpperCase()).forEach(System.out :: println);
// AA  BB  CC
```

- 需求:
- 获取员工姓名长度大于3的员工的姓名
```java
// 先获取员工的集合
List<Employee> list = EmployeeData.getEmployees();

// 通过stream对象调用对应的方法 -- map参数形式1
Stream<String> nameStream = list1.stream().map(e -> e.getName()).filter(name -> name.length() > 3).forEach(System.out :: println);
  - 映射:
  - 函数会作用在每一个元素上
  - 现在每一个元素都是 员工对象 然后每一个元素被修改为n员工的名字

  - 我们返回得就是一个名字构成的stream对象 我们可以通过这个返回得对象 继续调用中间操作的方法 或者 终止操作


// map参数形式2 -- 类 :: 实例方法
Stream<String> nameStream = list1.stream().map(Employee::getName);

nameStream.filter(name -> name.length() > 3).forEach(System.out :: println);
```


> flatMap(Function f)
- 接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流

> map(Function f) 和 flatMap(Function f)的*区别*
- 如果map中的形参里面是一个流(stream对象) map方法会把整个的流(stream对象)当成一个元素
<!-- 相当于[1, 2, 3, [4, 5, 6]] -->

- 如果flatMap中的形参里面是一个流(stream对象) flatMap方法就会把流(stream对象)里面的东西取出来 当成是一个大的流(stream对象)
<!-- 相当于[1, 2, 3, 4, 5, 6] -->

- 对于*集合里面套集合*的情况 *优先考虑用flatMap*
- 集合的扁平化

> 代码部分的举例
- 我们先创建一个方法 该方法会将字符串中的每一个字符取出来传入一个集合中 通过字符集合调用.stream()方法得到一个stream对象返回

- 比如我们传入aa 那我们得到的就是集合['a', 'a'].stream()返回得stream对象

```java
/*
  static:
    将该方法设置为static 方便我们使用 方法引用

  返回值 - Stream<Character>
  - 也就是stream对象中每一个元素都是一个char
*/
public static Stream<Character> fromStringToStream(String str) {

  // 集合中的每一个元素是一个char类型
  // Character - char的包装类
  ArrayList<Character> list = new ArrayList<>();

  for(Character c: str.toCharArray()) {
    list.add(c);
  }

  // Stream<Character> stream = list.stream();
  return list.stream();
}
```

- 先造一个集合
- 集合中每一个元素都是一个字符串
```java
List<String> list = Arrays.asList("aa", "bb", "cc");
```

- 通过上面的字符串集合调用stream() 得到stream对象
- 通过stream对象我们可以调用中间操作的一些方法 比如map() 或者 flatMap()

- 我们先拿map()方法说明
- map(Function f) 该参数Function会作用到每一个元素上 Function接口 有参数有返回值

```java
// 这里面list里面是一个个aa bb cc字符串 返回个什么呢？ 这里我们调用fromStringToStream方法 返回一个stream对象 [aa, bb, cc] -> [['a', 'a'], ['b', 'b'], ['c', 'c']] 也就是stream里面每一个元素又是一个stream 相当于一个二维数组
Stream<Stream<Character>> streamStream = list.stream().map(str -> StreamAPITest::fromStringToStream)
  // 我们从泛型那里也能看出来是一个二维数组的形式


// 既然是一个二维数组的形式 那我们就不能向下面这样循环输出
 streamStream.forEach(System.out :: println);
/*
  结果:
  java.util.stream.ReferencePipeline$Head@7403c468

  java.util.stream.ReferencePipeline$Head@43738a82

  java.util.stream.ReferencePipeline$Head@c81cdd1
*/


// 那我们就这样操作 forEach(Consumer接口) Consumer接口有参数无返回值
streamStream.forEach(s -> {
  // 内部再来输出
  s.forEach(System.out :: println);
});
```

- 上面我们使用map()方式 用了类似双重for循环的操作
- 当我们遇到二维数组的情况下我们可以考虑用 flatMap() 方法 它可以对二维数组进行扁平化处理
```java
// 这里从泛型也能看出来 flatMap 对集合做了扁平化的处理 [1, 2, 3, 4, 5, 6] 拆开了
Stream<Character> characterStream = list.stream().flatMap(StreamAPITest::fromStringToStream);

// 所以这里我们直接输出就可以了 不用双重for的结构
characterStream.forEach(System.out :: println);
```

- 还有一些方法我们可以看看

> mapToDouble(ToDoubleFunction f)
- 接收一个函数作为参数，该函数会被应用到每个元 素上，产生一个新的 DoubleStream。

> mapToInt(ToIntFunction f)
- 接收一个函数作为参数，该函数会被应用到每个元 素上，产生一个新的 IntStream。

> mapToLong(ToLongFunction f)
- 接收一个函数作为参数，该函数会被应用到每个元 素上，产生一个新的 LongStream。



> 排序
- 要求:
- 自定义类中要想comparable 和 comparator接口的问题

> sorted()
- 产生一个新流，就是*自然排序*
- 会根据stream容器内的类型(对应的类内部) 自然排序
- Stream<Integer> 可以从泛型看出来容器内元素的类型 该类型对应的类里面的自然排序规则 (从小到大的顺序)

```java
// 自然排序
List<Integer> list = Arrays.asList(12, 33, 65, 88, 98);

// 内部会调用Integer自然排序的方式
Stream<Integer> integerStream = list.stream().sorted();

integerStream.forEach(System.out :: println);


// 报错:
// 因为Employee类没有实现Comparable接口
List<Employee> employees = EmployeeData.getEmployees();

employees.stream().sorted().forEach(System.out :: println);
```


> sorted(Comparator com)
- 产生一个新流，就是*定制排序*
```java
List<Employee> employees = EmployeeData.getEmployees();

// sorted(传入Comparator接口的实现类对象)
employees.stream().sorted((e1, e2) -> Integer.compare(e1.getAge(), e2.getAge())).forEach(System.out :: println);
```

----------------------------

### Stream的终止操作
- 终端操作会从流的流水线生成结果 其结果可以是任何不是流的值
- 例如: List Integer void

- 流进行了终止操作后 不能再次使用

> 匹配与查找
> allMatch(Predicate p)
- 检查是否匹配所有元素 
- 所有的都是true 返回得才是true

- 返回值:
- boolean

- 是否所有员工的年龄大于18岁 allMath(Predicate p)
```java
boolean allMatch = employees.stream().allMatch(e -> e.getAge() > 18);

// 检查所有元素 有一个不符合 就是false
System.out.println(allMatch);
```


> anyMatch(Predicate p)
- 检查是否至少匹配一个元素
- 只要有一个匹配上了 就是true

- 返回值:
- boolean

- 是否存在员工的工资大于10000
```java
boolean anyMatch = employees.stream().anyMatch(e -> e.getSalary() > 10000);

// 所有元素中 只要有一个匹配成功 就是true
System.out.println(anyMatch);
```


> noneMatch(Predicate p)
- 检查是否没有匹配所有元素
- 没有一个匹配的 检查的是 是否没有！！！

- 返回值:
- boolean

- 是否存在员工姓"刘"
```java
boolean noneMatch = employees.stream().noneMatch(e -> e.getName().startsWith("刘"));
System.out.println(noneMatch);  // false 里面有姓刘的
```


> findFirst()
- 返回第一个元素

- 返回值:
- Optional<T>
- 返回得类型的泛型就是元素本身的类型

```java
Optional<Employee> employee = employees.stream().findFirst();

System.out.println(employee);
```


> findAny()
- 返回当前流中的任意元素

```java
Optional<Employee> any = employees.stream().findAny();

// 每次的执行结果都不同
System.out.println(any);
```


> count()
- 返回流中元素总数

- 返回值:
- long

```java
long count = employees.stream().count();
System.out.println(count);  // 8
```


> max(Comparator c)
- 返回流中最大值
- 通过Comparator接口 定义比较的原则

- 返回值:
- 

- 返回最高的工资
```java
// 方式1:
employees.stream().max(里面传入Comparator接口实现类对象 指定规则)

// 方式2:
// 先map下 将员工集合映射成工资的集合
Stream<Double> doubleStream = employees.stream().map(e -> e.getSalary());
    // 返回值的类型是Stream<Double>

// 然后我们通过doubleStream(容器里都是一个个工资) 然后调用max方法 
// Comparator需要传递两个参数返回一个int型的值 类 :: 静态方法
Optional<Double> maxSalary = doubleStream.max(Double::compare);

System.out.println(maxSalary);
  // Optional[9876.12]
```


> min(Comparator c)
- 返回流中最小值

- 返回最低工资的员工
```java
Optional<Employee> min = employees.stream().min((e1, e2) -> Double.compare(e1.getSalary(), e2.getSalary()));

System.out.println(min);
```


> forEach(Consumer c)
- 内部迭代
<!-- 
  使用 Collection 接口需要用户去做迭代 称为外部迭代。相反，Stream API 使用内部迭代——它帮你把迭代做了

  外部迭代:
    集合外面有一个指针 一点点往下移动取值

  内部迭代:
    集合内存 元素位置往下移动
 -->

```java
employees.stream().forEach(System.out :: println);

// 下面是通过集合调用forEach 只是一个集合中的普通方法
employees.forEach(System.out :: println);
```


> 归约
> reduce(T iden, BinaryOperator b)
- 可以将流中元素反复结合起来，得到一个值。返回 T
<!-- 
  map() 
    做的是映射 该方法是针对stream容器中的每一个元素 做一个映射
    比如我们将每一个员工对象 修改为工资属性

  reduce()
    我们可以将上面的工作属性做一个求和
 -->

- 参数1:
- 初始化(跟js一样)

- 参数2:
- BinaryOperator<T>
- 参数类型: T T
- 返回值类型: T
- T apply(T t1, T t2)
- 我们传入t1 t2 然后t的结果

- 需求：
- 求 1-10 的和
```java
// 创建一个集合
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 参数1: 为初始值
// 参数2: T apply(T t1, T t2)
// 而Integer.sum(int a, int b) 能匹配上 所以 方法引用
Integer reduce = list.stream().reduce(0, Integer::sum);

// 55
System.out.println(reduce);
```

- 需求:
- 计算公司所有员工工资的总和
```java
List<Employee> employees = EmployeeData.getEmployees();

// 我们得到是Double 所以用得 Double::sum
Optional<Double> sumMoney = employees.stream().map(e -> e.getSalary()).reduce(Double::sum);

// 这样写也行
Optional<Double> sumMoney = employees.stream().map(Employee::getSalary).reduce(Double::sum);


// 如果我们不知道 方法引用的方法 那就只能写Lambda表达式了
Optional<Double> sumMoney = employees.stream().map(Employee::getSalary).reduce((d1, d2) -> d1 + d2);
```


> reduce(BinaryOperator b)
- 可以将流中元素反复结合起来，得到一 个值。
- 返回 Optional<T>

- 参数:
- BinaryOperator<T>
- 参数类型: T T
- 返回值类型: T
- T apply(T t1, T t2)
- 我们传入t1 t2 然后t的结果

```java
Optional<Double> sumMoney = employees.stream().map(Employee::getSalary).reduce((d1, d2) -> d1 + d2);
```

- 备注:
  map 和 reduce 的连接通常称为 map-reduce 模式，
  因 Google 用它来进行网络搜索而出名。


> 收集
- 将我们处理后的数据 装到一个容器中 List Set等等

> collect(Collector c)
- 将流转换为其他形式。接收一个 Collector 接口的实现，用于给Stream中元素做汇总 的方法

- Collector 接口中方法的实现决定了如何对流执行收集的操作(如收集到 List、Set、 Map)。

- Collector接口的实现类对象 要通过Collectors实用类提供的静态方法来创建

- 也就是说我们要用下面的方法 创建一个Collector接口的实现类对象然后填入到collect(*这里*)


> Collector接口的实现类对象的创建方式：
> Collectors.toList()
- 把流中元素收集到List中

- 返回值类型:
- List<T>

- List<Employee> emps= list.stream().collect(Collectors.toList());


> Collectors.toSet()
- 把流中元素收集到Set中

- 返回值类型:
- Set<T>

- Set<Employee> emps= list.stream().collect(Collectors.toSet());

- 需求:
- 查找工资大于6000的员工 结果返回一个List
```java
// 得到了一个员工对象的集合
List<Employee> list = EmployeeData.getEmployees();

// 先对stream容器中的元素进行过滤 然后装到一个对应的容器中
// 得到一个List
List<Employee> employeeList = list.stream().filter(e -> e.getSalary() > 6000).collect(Collectors.toList());

// 通过List对象 调用List的forEach方法
employeeList.forEach(System.out::println);
```


> Collectors.toCollection()
- 把流中元素收集到创建的集合
- 我们把数据放入到一个Collection中 但是没有指定是用List 还是用Set去装
- 我们在创建的时候 指定用List还是Set
- Collectors.toCollection(ArrayList::new)

- 返回值类型:
- Collection<T>

- Collection<Employee> emps =list.stream().collect(Collectors.toCollection(ArrayList::new));


> Collectors.counting()
- 计算流中元素的个数

- 返回值类型:
- Long

- long count = list.stream().collect(Collectors.counting());


> Collectors.summingInt()
- 对流中元素的整数属性求和

- 返回值类型:
- Integer

- int total=list.stream().collect(Collectors.summingInt(Employee::getSalary));


> Collectors.averagingInt()
- 计算流中元素Integer属性的平均值

- 返回值类型:
- Double

- double avg = list.stream().collect(Collectors.averagingInt(Employee::getSalary));


> Collectors.summarizingInt()
- IntSummaryStatistics
收集流中Integer属性的统计值。如:平均值

- 返回值类型:
- IntSummaryStatistics

- int SummaryStatisticsiss= list.stream().collect(Collectors.summarizingInt(Employee::getSalary))


> Collectors.joining()
- 连接流中每个字符串

- 返回值类型:
- String

- String str= list.stream().map(Employee::getName).collect(Collectors.joining());


> Collectors.maxBy()
- 根据比较器选择最大值

- 返回值类型:
- Optional<T>

- Optional<Emp>max= list.stream().collect(Collectors.maxBy(comparingInt(Employee::getSalary)));


> Collectors.minBy()
- 根据比较器选择最小值

- 返回值类型:
- Optional<T>

- Optional<Emp> min = list.stream().collect(Collectors.minBy(comparingInt(Employee::getSalary)));


> Collectors.reducing()
- 从一个作为累加器的初始值开始， 利用BinaryOperator与流中元素逐 个结合，从而归约成单个值

- 返回值类型:
- 归约产生的类型

- int total=list.stream().collect(Collectors.reducing(0, Employee::getSalar, Integer::sum));


> Collectors.collectingAndThen()
- 包裹另一个收集器，对其结果转换函数

- 返回值类型:
- 转换函数返回的类型

- int how= list.stream().collect(Collectors.collectingAndThen(Collectors.toList(), List::size));


> Collectors.groupingBy()
- 根据某属性值对流分组，属性为K 结果为V

- 返回值类型:
- Map<K, List<T>>

- Map<Emp.Status, List<Emp>> map= list.stream() .collect(Collectors.groupingBy(Employee::getStatus));


> Collectors.partitioningBy()
- 根据true或false进行分区

- 返回值类型:
- Map<Boolean, List<T>>

- Map<Boolean,List<Emp>> vd = list.stream().collect(Collectors.partitioningBy(Employee::getManage));

----------------------------

### Optional类的介绍
- java是面对对象的 我们读什么都是通过对象... 如果对象为null 那么就会是空指针了

- *Optional<T>类*(java.util.Optional)*是一个容器类* 它可以保存类型T的值 代表这个值存在
<!-- 
  Optional类作为一个容器类能装的数据有限 它只装我们核心要的数据
  就像 Integer 也算是个容器 就装 int

  比如我们有一个Boy对象 我们就可以放入到Optional类中 该类就是一个容器
  凡是对Boy对象的操作 都可以封装成对Optional的操作

  就像包装类一样凡是对int的操作 都归结于对Integer的操作
 -->

- 或者仅仅保存null 表示这个值不存在 原来用null表示一个值不存在 现在Optional可以更好的表达这个概念 并且可以避免空指针异常

- Optional类的Javadoc描述如下:
- 这是一个可以为null的容器对象 如果值存在则isPresent()方法会返回true 调用get()方法会返回该对象

- Optional提供很多有用的方法 这样我们就不用显式进行空值监测


> 我们也可以把Optional理解成是一个容器
- 这个容器中就放一个东西 就是实际上我们想保存的数据
- 该数据的类型我们是通过泛型还体现的


> 创建 Optional 类对象的方法:
- 我们定义了两个类 
    Boy(里面有girl对象作为属性) 
    Girl(里面有name作为属性)


> Optional.of(T t):
- 创建一个Optional实例, *t必须非空*
- 传入一个对象就能创建Optional实例 既然是非空Optional的容器里面的数据就一定会存在

- 返回值:
- Optional<T>

```java
Girl girl = new Girl();

// 通过Optional类的静态方法of() 创建Optional类的对象 是个容器
Optional<Girl> optionalGirl = Optional.of(girl);
System.out.println(optionalGirl);
    // Optional[Girl{name='null'}]

// 当girl为空的时候 会抛出空指针异常
```

- 示例2:
```java
// Optional容器内只封装一个数据
String str = "hello";
Optional<String> op1 = Optional.of(str)
```


> Optional.empty():
- 创建一个空的 Optional实例
- 创建的Optional对象内部的value = null

```java
Optional<Object> op1 = Optional.empty();

// 判断Optional封装的数据是否包含数据
if(!op1.isPresent()) {
  System.out.println("数据为空")
}
```


> Optional.ofNullable(T t)
- t可以为null

```java
Girl girl = new Girl();

// girl非空的情况
Optional<Girl> optionalGirl = Optional.ofNullable(girl);
System.out.println(optionalGirl);
    // Optional[Girl{name='null'}]



// girl空的情况 
girl = null;

Optional<Girl> optionalGirl = Optional.ofNullable(girl);
System.out.println(optionalGirl);
    // Optional.empty  不会报异常
```

----------------------------

### Optional类的使用举例
- 为了在程序中避免出现空指针异常而创建的
- 常用的方法:
> ofNullable(T t)
> orElse(T t)


- 我们先定义两个类

- Boy:
- 内部有一个girl对象
```java
public class Boy {

  // 定义了一个girl对象
  private Girl girl;

  public Boy() {
  }

  public Boy(Girl girl) {
    this.girl = girl;
  }

  public Girl getGirl() {
    return girl;
  }

  public void setGirl(Girl girl) {
    this.girl = girl;
  }

  @Override
  public String toString() {
    return "Boy{" +
        "girl=" + girl +
        '}';
  }
}

```

- girl:
- 内部就一个name属性 和 对应的方法
```java
public class Girl {
  private String name;

  public Girl(String name) {
    this.name = name;
  }

  public Girl() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Girl{" +
        "name='" + name + '\'' +
        '}';
  }
}
```

- 然后我们在测试类中定义一个获取girl name的方法
- 下面的方法特别容易出现空指针
- 1. 如果我们传入的boy为空 就会有空指针的问题
- 2. 如果我们没有给girl赋值 那么girl就是null 也会出现空指针的问题
```java
public String getGirlName(Boy boy) {
  // 这样的写法会出现空指针
  return boy.getGirl().getName();
}
```

- 没有Optional的时候的优化方法
```java
public String getGirlName(Boy boy) {
  if(boy != null) {
    Girl girl = boy.getGirl();
    if(girl != null) {
      return girl.getName();
    }
  }

  return null;
}
```

- 有了Optional以后 我们看看它的优化方式变成了什么样子
```java
public String getGirlName(Boy boy) {
  // 将boy对象 包装在 Optional类的实例对象里面
  Optional<Boy> boyOptional = Optional.ofNullable(boy);
      - 这里我们没有使用 Optional.of() 方法 因为boy本身可能是null

  // 我们通过调用 boyOptional 对象的 orElse()方法来解决问题
  Boy boy1 = boyOptional.orElse(new Boy(new Girl("erin")));
      - orElse(备胎参数)
      - 该方法需要传递一个备胎参数 如果optional对象里面的元素为空的时候 就使用备胎对象

      - 这样就能保证boy1一定是非空的


  // 既然 boy1 一个非空 那他一定可以调用 getGirl();
  Girl girl = boy1.getGirl();

  // 我们要确保 girl 不为空 一定有值 (如果没给girl对象赋值就会是null) 所以我们还要对girl进行次包装
  Girl girl1 = girlOptional.orElse(new Girl("刘博"));

  return girl1.getName();
}
```


> 判断Optional容器中是否包含对象
> Optional实例对象.isPresent()
- 判断Optional封装的数据是否包含数据

- 返回值类型:
- boolean


> void ifPresent(Consumer<? super T> consumer)
- 如果有值 就执行Consumer接口的实现代码 并且该值会作为参数传给它


> 获取Optional容器的对象
> Optional实例对象.get():
- T get():
- 如果Optional容器封装的数据value为空 则get()报错
- 否则 value不为空 返回value

- 获取Optional容器里面的核心数据


**注意:**
- 当我们调用get()方法的时候 一定要保证Optional容器内一定要有值不能为空(Optional<Double> 比如double必须要有值 不能是null)

- get()方法通常和Optional.of()方法搭配使用

- 异常:
- 当Optional容器内的元素为null的时候
- No value present

```java
// 我们经常得到的结果的类型是 Optional<Double>
// 当我们想直接获取里面的值的时候 我们可以用 get()
Optional<Double> sumMoney = employees.stream().map(Employee::getSalary).reduce((d1, d2) -> d1 + d2);

sumMoney.get(); // 66666
```

- 为了要确保不为空的时候 可以用上面的
- boolean isPresent() 来判断一下 然后在get()


> Optional实例对象.orElse(T other) -- 备胎参数
- 如果有值则将其返回 否则返回指定的other对象
- 如果Optional容器中的对象不是null 那么我们就使用容器中的这个对象
- 如果Optional容器中的对象是null 那么我们就使用形参的other(它像个备胎) 
<!-- 
  orElse(T t1):
  如果当前的Optional内部封装的value是非空的 则返回内部的value
  如果内部的value是空的 则返回orElse()方法中的参数t1
 -->

- orElse(T other)一般我们和ofNullable(T t)搭配使用
- 没有的话用备胎充当下

- 返回值:
- T
- T orElse(T other)


> T orElseGet(Supplier<? extends T> other)
- 如果有值则将其返回 否则返回由Supplier接口实现提供的对象

> T orElseThrow(Supplier<? extends X> exceptionSupplier)
- 如果有值则将其返回 否则抛出由Supplier接口实现提供的异常

----------------------------

### Java9新特性
- 2017年9月21日发布 从java9开始 java的计划发布周期是6个月
- 2018年3月份发布的java10 也就做18.3
- 2018年9月份发布的java11 也就是18.9

- LTS 长期支持版本 以3年为周期发布长期支持版本

>  java9新特性:
- 提供了超过150项新功能特性 包括备受期待的模块化系统 可以交互的REPL工作: jshell, JDK编译工具 Java公共API和私有代码 以及安全增强 扩展提升 性能管理改善等 可以说 java9是一个庞大的系统工程完全做了一个整体改变

- 比较重要的的特性
- 1. 模块化系统   *(重要)*
- 2. jShell命令  *(重要)*
- 3. 多版本兼容jar包
- 4. 接口的私有化         *(语法层面的改变)*
- 5. 钻石操作符的使用升级  *(语法层面的改变)*
- 6. 语法改进: try语句    *(语法层面的改变)*
- 7. String存储结构变更    *(API层面的改变)*
<!-- 底层改为byte[] 不再是char[] -->

- 8. 便利的集合特性: of()  *(API层面的改变)*
- 9. 增强的Stream API     *(API层面的改变)*
- 10. 全新的HTTP客户端API  *(API层面的改变)*
- 11. Deprecated的相关API *(API层面的改变)*
- 12. javadoc的HTML5支持
- 13. javascript引擎升级: Nashorn
- 14. java的动态编译器


> java9 10 11的目录结构

<!-- 
                      JDK_HOME
          
    bin   conf    include   jmods   legal   lib

    没有名为jre的子目录 将8中的jre目录打散了
 -->

- bin目录:
  - 包含所有命令 在window平台上 它继续包含系统的运行时动态连接库

- conf目录:
  - 包含用户可编辑的配置文件 例如以前位于jre/lib目录中的 .properties和.policy文件

- include目录:
  - 包含要在以前编译本地代码时使用的C/C++头文件 它只存在JDK中

- jmodes目录:
  - 包含JMOD格式的平台模块 创建自定义运行时映像时需要它 它只存在于JDK中

- legal目录:
  - 包含法律声明

- lib目录:
  - 包含非Winodows平台上的动态连接本地库 其子目录和文件不应由开发人员直接编辑或使用

----------------------------

### Java9新特性: 模块化系统(Jigsaw -> Modularity)
- 谈到 Java 9 大家往往第一个想到的就是 Jigsaw 项目。众所周知，Java 已经 发展超过 20 年(95 年最初发布)，Java 和相关生态在不断丰富的同时也越 来越暴露出一些问题:

- 我们原来写一个项目就是整体一大块 比如我们需要把整体的API都加载进去(rt.jar) 现在我们希望将rt.jar打成一块块的 需要哪个用哪个 这就是模块化系统


> Java 运行环境的膨胀和臃肿。
- 每次JVM启动的时候，至少会有30~60MB的内存加载，主要原因是*JVM需要加载rt.jar*，不管其中的类是否被classloader加载，第 一步整个jar都会被JVM加载到内存当中去(而模块化可以根据模块的需要加载程 序运行需要的class)
<!-- 
  rt.jar:
    我们要是想运行 整个环境rt.jar必须要加载进来(里面是定义好的类库) 不管我们是不是全都能用到 但是都加载进来了
 -->

>当代码库越来越大， 创建复杂， 盘根错节的“意大利面条式代码”的几率呈指数级的 增长。
- 不同版本的类库交叉依赖导致让人头疼的问题，这些都阻碍了 Java 开发和 运行效率的提升。

- 很难真正地对代码进行封装, 而系统并没有对不同部分(也就是 JAR 文件)之间 的依赖关系有个明确的概念。*每一个公共类都可以被类路径之下任何其它的公共 类所访问到，这样就会导致无意中使用了并不想被公开访问的 API*

- *本质上讲*也就是说，用模块来管理各个package，通过声明某个package 暴露，*模块(module)的概念*，*其实就是package外再裹一层*，不声明默 认就是隐藏。因此，模块化使得代码组织上*更安全*，因为它可以*指定哪 些部分可以暴露，哪些部分隐藏。*


> 实现目标
- 模块化的主要目的在于减少内存的开销
- 只须必要模块，而非全部jdk模块，可简化各种类库和大型应用的开
发和维护
- 改进 Java SE 平台，使其可以适应不同大小的计算设备
- 改进其安全性，可维护性，提高性能


> 模块化的使用方式
- 1. 我们在ModuleA中定义了一个Person类 在ModuleB中调用ModuleA中的Person类造对象 这样是不行的

- 2. 要想两个不同的Module中进行调用 我们可以
- 在ModuleA的src上右键 创建 module-info.java
- 在ModuleB的src上右键 创建 module-info.java

> 暴露
- 如果我们在ModuleA中想把Person类暴露出去 就在ModuleA下的module-info.java里面

> 使用 exports 当前的package包名
```java
// 当前Module名为 java9test 暴露出去该Module在的哪个包
module java9test {
  exports com.sam.bean;
}
```

> 引入 requires 暴露的模块名
- 也是在module-info.java的文件内
```java
// 当前Module名为 Day06 引入指定的 Module名
module Day06 {
  requires java9test;

  // 当使用这种方法的时候 要使用junit测试 则需要这样 相当于注册似的
  requires junit;
}
```

> 在测试类中 在指定的位置 alt+enter
- Add dependency on module... 选中要引入的Module名
```java
import com.sam.bean.Person;

public class ModuleTest {
  public static void main(String[] args) {
    Person person = new Person("sam", 12);
  }
}
```

- 如果没有使用requires注册的东西 就不会引入 相当于手动的按需引入？

----------------------------

### REPL工具 交互式编程环境
- 比如我们要想在控制台输出一个hello world 以前我们要打开编辑器 然后创建.java文件 编译 运行 输出

- 或者计算两个变量 也是通过文件来实现的

> jshell命令 启动REPL界面
- 也可以在里面定义方法
- 也可以在里面定义类

- 在jshell窗口下的命令：
> /help
- 查看命令

> /edit
- 打开一个编辑窗口
- 定义错的代码 不会展示在编辑窗口里面

> /imports
- 显示已导入的包

> /vars
- 查看定义过的变量

> /list
- 查看定义过的数据的列表

> /methods
- 查看定义过的方法

> /open 路径
- 执行指定的java文件

> /exit
- 退出

----------------------------

### 接口中的私有方法
- java8中规定接口中的方法除了抽象方法之外 还可以定义静态方法和默认方法 一定程度上 扩展了接口的功能 此时的接口更像是一个抽象类
<!-- 
  接口中不单单的是抽象方法 可以有方法体了
  java8中有静态方法 和 默认方法(public) 这样接口越来越像类了 既然有方法体了 就代表可以直接使用 不用实现了
 -->

- 在java9中 接口更加的灵活和强大 *连方法的访问权限修饰符都可以声明为private的了* 此时方法将不会成为你对外暴露的API的一部分
<!-- 
  java9中在java8的基础上还可以有私有方法
 -->


> Java8中的接口示例:
```java
public interface MyInterface {
  // 抽象方法 -- 没写权限默认是public
  void methodAbstract();

  // 静态方法 -- 没写权限默认是public
  static void methodStatic() {
    System.out.println("我是接口中的静态方法");
  }

  // 默认方法 -- 没写权限默认是public
  default void methodDefault() {
    System.out.println("我是接口中的默认方法");
  }
}
```


> Java9以上的接口示例:
- jdk9中允许接口中定义私有的方法
- 私有方法不能在接口外调用 是在接口内使用的方法

```java
public interface MyInterface {

  // 默认方法 -- 没写权限默认是public
  default void methodDefault() {
    System.out.println("我是接口中的默认方法");

    // 接口中的私有方法是接口内部自己调用的
    methodPrivate();
  }


  // 私有方法
  private void methodPrivate() {
    System.out.println("我是接口中的私有方法");
  }
}
```

- 我们定义下接口的实现类
```java
public class MyInterfaceImpl implements MyInterface {

  // 必须实现 - 接口中的抽象方法
  @Override
  public void methodAbstract() {
    System.out.println("实现类重写抽象方法");
  }

  // 可以不实现 - 接口中的默认方法
  @Override
  public void methodDefault() {
    System.out.println("实现类重写接口中的默认方法");
  }


  public static void main(String[] args) {
    // 接口中的 静态方法 只能由接口自己调用
    MyInterface.methodStatic();

    // 创建一个 实现类对象 通过对象调用接口中的 默认方法
    MyInterface impl = new MyInterfaceImpl();
    impl.methodDefault();
  }
}

```

----------------------------

### 钻石操作符的使用升级(泛型中的<>)
- 钻石操作符和匿名实现类一起使用的时候 在Java8中是不可以的:
```java
Comparator<Object> com = new Comparator<> {
  @Override
  public int compare(Object o1, Object o2) {
    return 0;
  }
}
```

- 编译报错信息:
- Cannot use "<>" with anonymous inner classes

- 但是在java9中就可以了

----------------------------

### try结构的语法升级
- 我们之前处理异常 可以throws try catch fanilly
- 有的时候我们必须要加上fanilly因为涉及到资源的关闭了

- 这里我们对fanilly做了一些优化 当有要关闭的资源的时候 我们可以在try里进行关闭


> Java8以前 处理资源关闭的方式 -- 资源需要手动关闭
```java
@Test
public void test() {
  InputStreamReader reader = null;
  try {
    reader = new InputStreamReader(System.in);
    char[] buf = new char[20];
    int len;
    if((len = reader.read(buf)) != -1) {
      String str = new String(buf, 0, len);
      System.out.println(str);
    }
  } catch (IOException e) {
    e.printStackTrace();
  } finally {
    if(reader != null) {
      try {
        reader.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }
}
```

> Java8中 处理资源关闭的方式 -- 资源会自动关闭
- java8中可以实现资源的*自动关闭* 但是要求要关闭的资源在try(这里进行初始化)
<!-- 
  要关闭的资源报错是完整的初始化 包括赋值操作
    InputStreamReader reader = new InputStreamReader(System.in)
 -->

- 要点:
- try(把要关闭的资源放这, 比如流) { }
- try后面还可以加上() 我们将需要关闭的资源放入 () 中
- 放进去的资源会自动的进行关闭

```java
// try后还可以接() try() 我们把流的实例话逻辑放进去
try(InputStreamReader reader = new InputStreamReader(System.in)) {

  // 这里放我们要通过流来做什么
  char[] buf = new char[20];
  int len;
  if((len = reader.read(buf)) != -1) {
    String str = new String(buf, 0, len);
    System.out.println(str);
  }
} catch (IOException e) {
  e.printStackTrace();
}
```


> Java9中 处理资源关闭的方式 -- 资源会自动关闭
- 和java8的处理方式大概都差不多 只不过我们在try的外部定义的流
- 然后将流的实例化对象 放入了 try(这里流对象)

```java
// java9中的方式 和8的区别是 reader的初始化 没有放在try(里面)
InputStreamReader reader = new InputStreamReader(System.in);

// 我们直接将实例化对象放进来
try(reader) {

  char[] buf = new char[20];
  int len;
  if((len = reader.read(buf)) != -1) {
    String str = new String(buf, 0, len);
    System.out.println(str);
  }
} catch (IOException e) {
  e.printStackTrace();
}
```

**注意:**
- 我们放入try(流) 这个流只能用 不能改 放进去的资源属性 reader就相当于是一个*常量*

```java
InputStreamReader reader = new InputStreamReader(System.in);

try(reader) {

  char[] buf = new char[20];
  int len;
  if((len = reader.read(buf)) != -1) {
    String str = new String(buf, 0, len);
    System.out.println(str);
  }

  // 这样会报错 因为reader不能改
  reader = null;

} catch (IOException e) {
  e.printStackTrace();
}
```


> 如果有多个流的情况
- 在try(流1, 流2)
```java
InputStreamReader reader = new InputStreamReader(System.in)
OutputStreamReader writer = new OutputStreamReader(System.out)

try(reader, writer) {
  // reader, writer 是final的 不可再被复制
}
```

----------------------------

### String存储结构变更
- String类底层在存储字符串的时候使用的是char[]
- 一个char占两个byte(16个bit) 
- 但是里面都是用拉丁的字符集实现的 拉丁字符集只需要一个字符集就可以了 所以我们有一般的空间就浪费了

- 在java9中将底层的utf-16的char[]数组转成了byte[]数组 同时加上了一个标识是哪种编码集的字段

- 根据该字段就能知道是拉丁编码集还是utf-16编码集 要是拉丁的话就是一个字节 要是中文的就是两个字节
<!-- 
  如果是中文还是用byte[]数组存 只不过我们使用两个位置[][]
 -->

- 总结:
- String再也不用char[]来存储啦 改成了byte[]加上编码标记 节约了一些空间

```java
private final byte[] value;
```

- 那StringBuffer和StringBuilder呢？
- 跟String相关的也都变了

----------------------------

### 集合工厂方法: 快速创建只读集合(只能读不能变)
- 要创建一个只读, 不可改变的集合 必须构造和分配它 然后添加元素 最后包装成一个不可修改的集合

> Collections.unmodifiableList(List)
- 通过Collections工具类的方法 创建一个只读集合

```java
// 这也是以前创建只读集合的方式(Java8中的方式)
List<String> nameList = new ArrayList<>();
nameList.add("Joe");
nameList.add("Sam");
nameList.add("Erin");

// 返回得nameList只能读 不能改了
nameList = Collections.unmodifiableList(nameList);
System.out.println(nameList);

// 当我们往里再次添加数据的时候会报错
// UnsupportedOperationException 不支持的操作方式
nameList.add("xx");
```

- 怎么完成的add()操作就会抛异常呢?底层是怎么实现的呢？
```java
public boolean add(E e) {
  // 只要调用add 就抛异常
  throw new UnsupportedOperationException();
}
```

> Collections.unmodifiableMap(Map)
> Collections.unmodifiableSet(Set)
> Collections.unmodifiableCollection(Collection)


> Arrays.asList(数据)
- 该方法返回的集合也是*只读*集合
```java
// 这样创建的集合也是只读的
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);

// 异常: UnsupportedOperationException
list.add(6);
```

---

> Java9中创建只读集合的方式
> List.of(v)；
```java
List<Integer> list = List.of(1, 2);
```

> Map.of(k1, v1, k2, v2)；
```java
Map<String, String> map = Map.of("name", "sam", "name", "erin");

// 方式2
Map.ofEntries(Map.entry("Sam", 33), Map.entry("erin", 28))
```


> Set.of(v)；
```java
Set<String> set = Set.of("1", "2");
```
 
----------------------------

### InputStream的加强
- InputStream终于有了一个非常有用的方法

> 输入流对象.transferTo(输出流对象)
- 可以用来将数据直接传输到OutputStream 这是在处理原始数据流时非常场景的一种用法

- 内部也是封装了建立数据 循环传输数据的操作

```java
ClassLoader c1 = this.getClass().getClassLoader();

// 这里用了新的语法
try(
  InputStream is = c1.getResourceAsStream("hello.txt");
  OutputStream os = new FileOutputStream("/src/hello.txt")
) {

  // 把输入流中的所有数据直接自动的复制到输出流中
  is.transferTo(os);

} catch(IOException e) {
  e.printStackTrace();
}
```

----------------------------

### 增强的Stream API
- Java的Stream API是Java标准库最好的改进之一 *让开发者能够快速元素 从而能够有效的利用数据并行计算*
- Java8提供的Stream能够利用多核架构实现声明式的数据处理

- 在Java9中 Stream API变得更好 Stream接口中添加了4个新的方法

- takeWhile(Predicate)
- dropWhile(Predicate)
- ofNullable
- iterate

- 可以让你提供一个 (Predicate判断条件) 来指定什么时候结束迭代
- 除了对Stream本身的扩展 Optional和Stream 之间的结合也得到了改进 现在可以通过 Optional的新方法Stream()将一个Optional对象转换为一个(可能是空的)Stream对象


> 中间操作
> stream对象.takeWhile(Predicate函数式接口)
- 根据指定的规则 返回从头开始的尽量多的元素

- 会遇到第一个不满足条件的停止 即使后续有满足条件的也不会返回
- 下面就是返回满足 num < 60 *的元素*
```java
List<Integer> list = Arrays.asList(23, 22, 12, 35, 66, 77, 88, 12);

// 最后的12就没有返回 应为遇到66就停止了
list.stream().takeWhile(num -> num < 60).forEach(System.out::println);
// 23 22 12 35
```


> 中间操作
> stream对象.dropWhile(Predicate函数式接口)
- 与takeWhile正好相反 返回剩余元素
- 下面就是返回满足 num < 60 的*其他元素*

```java
list.stream().dropWhile(num -> num < 60).forEach(System.out::println);
// 66 77 88 12
```


> ofNullable()
- java8中Stream不能完全为null 否则会报空指针异常 而java9中的
ofNullable方法允许我们创建一个单元素Stream 可以包含一个非空元素 也可以创建一个空Stream

- 我们上面再讲Stream的时候说了4中创建stream的方式
- 1. 通过集合
- 2. 通过数组
- 3. Stream.of(...元素)


> Stream.of(...元素)
- 该方法在创建stream对象的时候 可以填充多个值 多个值中可以有null值

- *但是不能只存储单个null值*

```java
// 下面再java里面是允许的
Stream<Integer> stream = Stream.of(1, 2, 3, null);
stream.forEach(System.out :: println);


// 下面的方式 下面只填写了null 会抛出空指针异常
Stream<Object> stream1 = Stream.of(null);
stream1.forEach(System.out :: println);
```


> Stream.ofNullable(只能填写一个参数)
- 形参变量可以是null值的单个元素 不能放多个元素
- 如果是null值 该容器中的个数为0 空元素

```java
Integer i = 10;
i = null;
Stream<Integer> stream2 = Stream.ofNullable(i);

long count = stream2.count();
System.out.println(count);    // 0
```


> Stream.iterate(初始值, Predicate循环条件, Predicate迭代条件)
- 可以定义循环条件和迭代条件的无限流创建方式

```java
// java8中 无限流的创建方式
Stream.iterate(0, x -> x + 1).limit(10).forEach(System.out :: println);


// java9中Stream.iterate(参数1, 参数2, 参数3)的重载方法
// 参数2: x -> x < 100 相当于循环条件
// 参数3: x -> x + 1 相当于迭代条件 每次+1
Stream.iterate(0, x -> x < 100, x -> x + 1).forEach(System.out :: println);
```

----------------------------

### Optional获取Stream的方法
- 在Java9中它提供了一个
- stream()的方法

- 因为Optional也是一个容器 我们在将stream的时候 说它就是对容器的一个操作(对集合, 数组等操作)

- 而Optional也是一个容器 那按说Optional也可以获取一个stream对象 在java9中它也有了一个获取stream对象的方式


> optional对象.stream()
- 获取stream对象

```java
ArrayList<String> list = new ArrayList<>();
list.add("AA");
list.add("BB");
list.add("CC");

// Optional容器里面是个List List里面是一个String
Optional<ArrayList<String>> optional = Optional.ofNullable(list);

// 生成stream对象 变成Stream里面是个List List里面是一个String
Stream<ArrayList<String>> stream = optional.stream();
// x就是一个List 相当于List.stream()
stream.flatMap(x -> x.stream()).forEach(System.out :: println);
```

----------------------------

### Java10 新特性
- 2018年3月21日，Oracle官方宣布Java10正式发布。

- 需要注意的是 Java9 和 Java10 都不是 LTS (Long-Term-Support) 版本。和过去的Java大版本升级不同，这两个只有半年左右的开发和维护期。而未 来的 Java 11，也就是 18.9 LTS，才是Java8之后第一个 LTS 版本。

- JDK10一共定义了109个新特性，其中包含12个JEP(*对于程序员来讲，真正的新特性其实就一个*)，还有一些新API和JVM规范以及JAVA语言规范上的改动。

- JDK10的12个JEP(JDK Enhancement Proposal特性加强提议)参阅官方 

- 文档:http://openjdk.java.net/projects/jdk/10/


- 我们主要就看下面的新特性(主打功能)：
- Local-Variable Type Inference *局部变量类型推断*

----------------------------

### 局部变量的类型推断
>产生背景 
- 开发者经常抱怨Java中引用代码的程度。*局部变量的显示类型声明，常常被认为 是不必须的*，给一个好听的名字经常可以很清楚的表达出下面应该怎样继续。

- 好处: 
- 减少了啰嗦和形式的代码，避免了信息冗余，而且对齐了变量名，更容易阅读! 

- 我们看看类型有的时候是不需要的部分 都有什么样的情况 举例如下:

>场景一: 类实例化时
- 作为Java开发者，在声明一个变量时，我们总是习惯了敲打两次变量类型，第一次用于声明变量类型，第二次用于构造器。
```java
// 比如我们右边 new LinkedHashSet<>() 左边要么写成LinkedHashSet 要么写成它的父类或是接口的方式
LinkedHashSet<Integer> set = new LinkedHashSet<>();

// 但是左边的部分有些多余 因为左边肯定是LinkedHashSet或者是它的父类或接口 所以左边的部分其实是可以忽略掉的 但是变量名不能忽略
```


> 场景二: 返回值类型含复杂泛型结构
- 变量的声明类型书写复杂且较长，尤其是加上泛型的使用
```java
// set是map中的entry构成的set 当我们通过set调用iterator()方法的时候 返回得类型太长了Iterator<Map.Entry<Integer, Student>>  泛型里面调泛型 我们想想set.iterator()的方法也不能写别的啊
Iterator<Map.Entry<Integer, Student>> iterator = set.iterator();
```


> 场景三: 
- 我们也经常声明一种变量，它只会被使用一次，而且是用在下一行代码中，比如:
```java
// 比如这里我们 new URL("http://www.atguigu.com");  它的类型只能是URL 它也写不了别的啊
URL url = new URL("http://www.atguigu.com"); 

// 类型URLConnection 也想省
URLConnection connection = url.openConnection(); 

Reader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
```

- 尽管IDE可以帮我们自动完成这些代码，但当变量总是跳来跳去的时候，可读性还是会受到影响，因为变量类型的名称由各种不同长度的字符组成。而且，有时候开发人员会尽力避免声明中间变量，因为*太多的类型声明只会分散注意力，不会带来额外的好处。*

- 也就是说我们可以从右边的部分 去推断左边的类型
- 这就是我们想说的局部变量的类型推断


> 局部变量的时候 关键字 var
- 我们使用var关键字 代替变量的类型部分
- 声明变量时 根据所附的值 推断变量的类型
<!-- 
  赋值操作的时候 是由右边推断左边
  方法操作的时候 是由里面决定外面
 -->

- 接下来我们看看使用的例子：
```java
// java10之前 我们定义一个变量必须写该变量的类型
int num1 = 10;

// java10之后 我们可以通过var关键字 从=的右边推断该值的类型
var num2 = 10;

---

// java10之前 
/*
  我们会将 new ArrayList<>() 赋值给它的父类或者接口
  但是父类也好 还是父接口也好 对我们来说 都无所谓
  我们只想通过对象来调用方法
*/
ArrayList<String> list1 = new ArrayList<>();

// java10里面 我们可以使用var关键字来代类型
var list = new ArrayList<String>();
list.add("AA");
    // 但是集合中的元素类型 因为我们把左边干掉了 所以默认就是Object了 要想指定类型的话 就要在右边定义<String>



// 遍历操作
/*
  for(元素类型: 元素的变量名: 集合)
  也就是上来我们就要写元素的类型

  -- 

  java10之后的类型推断 
  当我们要遍历集合中的元素的时候 我们都知道集合中添加的是什么类型 所以就没有必要写了 类型的地方用var来代替
*/

// java10之前
for(String s: list) {
  System.out.println(s);
}

// java10的时候
for(var s: list) {
  System.out.println(s);
  // 获取该元素的类型 
  
  System.out.println(s.getClass().getName());
      // java.lang.String
}


// 普通的遍历操作
for(int i = 0; i < 100; i++)
for(var i = 0; i < 100; i++)
```


> 局部变量中使用时 如下的情况不适用
- 我们的类型推断是通过 = 的右边的值 推断其类型 首先不能出现的写法就是 

- 1. 局部变量赋值 就不能实现类型推断
```java
var num;
```

- 2. 初始值为null
```java
var a = null;
// 错误: 无法推断本地变量的类型 变量初始化程序为 null
```

- 3. 方法引用
- Lambda表达式中不行了 方法引用也不行

- 方法引用中 =左边的函数式接口不能声明为var
```java
Consumer<String> con = System.out :: println

// 方法引用要求Consumer的中的抽象方法的形参列表和返回值类型要和=右边的一样 当我们省掉接口的类型后 我们就不知道它是什么样的结构了 里面连有没有抽象方法都不知道 完全推断不出来
var con = System.out :: println
// 错误: 无法推断本地变量的类型 方法引用需要显式目标类型
```

- 4. Lambda表达式
- Lambda表达式只能赋值给函数式接口 我们下面var了就不明确后面的Lambda表达式到底匹配哪一个函数式接口 也就是说有多种情况但是没办法推断出来

- Lambda表达式中 =左边的函数式接口不能声明为var

```java
// 供给型接口 没有参数 有返回值 返回一个随机数
Supplier<Double> sup = () -> Math.random()

// 那我们能不能将sup的类型省略掉? 不行
var sup = () -> Math.random()
// 错误: 无法推断本地变量的类型 Lambda表达式需要显式目标类型
```

- 5. 为数组静态初始化
- 如下的情况也不可以

```java
int[] arr = new int[]{1,2,3,4}

// 这样可以
var arr = new int[]{1,2,3,4}

//  省略掉=右边的new int[]省这样不行 这样不知道要分配什么类型的数组
var arr = {1,2,3,4}
// 错误: 无法推断本地变量的类型 数组初始化程序需要显式目标类型
```

> 总结:
- 我们需要给数据一个明确的指示 局部变量的类型推断是根据右边推断左边 只要让右边不迷糊 不会出现歧义的情况 都可以实现


> 局部变量的类型推断不适用于以下的结构中
- 我们使用var的初衷是 让代码变得更简洁 而不是改变java的特性 java是静态语言 强类型

- 1. 没有初始化的局部变量声明
```java
var num;
```

- 2. 方法的返回类型
```java
// 这样是没问题的
public int method1() {
  return 0;
}

// 这样不行
public var method1() {
  return 0;
}

- 正常我们是根据方法的返回值类型 判断的方法内部应该需要return什么
- 如果我们写成var的话 var的思路是由return的内容决定方法的返回值 
- 如果是这样的话 那相当于可以返回任意类型了 
- 这样不对 方法是由方法的类型决定应该return什么
```

- 3. 方法的参数类型
```java
// 这样是可以的
public void method2(int num) { }

// 这样不行
public void method2(var num) { }
- 我们写int的时候 我们传递别的参数是不行的 
- 当我们写成var的话 代表传递什么都可以 java本质就变了
```

- 4. 构造器的参数类型
- 方法不行 构造器的参数也不行 和上面是一样的

- 5. 属性
- 我们说的是局部变量的类型推断
- 属性因为有默认值
```java
// 属性是可以如下定义的
int num;

// 但是 这样不行
var num;
```

- 6. catch块
```java
try {
      
  // 比如我知道你想抛什么样的异常 我这里写var 这样不行
} catch(var e) {
  e.printStackTrace();
}
```

- 也就是说我可以用在 = 的时候 从右边能够推测左边的类型的时候 再使用


> 工作原理 (由右边决定左边)
- *在处理var时 编译器显示查看表达式右边部分* 并根据右边变量值的类型进行推断 作为左边变量的类型 然后*将该类型写入字节码当中*(最终的class文件中 还是带类型的 不是var 我们写var就是省事)

> 注意:
- 1. var不是一个关键字
- 你不需要担心变量名或方法名会与var起冲突 因为var实际上并不是一个关键字 而是一个类型名 只有在编译期需要知道类型的地方才需要用到它 除此之外 *它就是一个普通合法的标识符* 也就是说 *除了不能用它作为类名 其他的都可以 但极少人会用它作为类名*

- 2. 这步是js
- 首先我要说明的是 *var并不会改变java是一个静态类型语言的事实*
- 编译期负责推断出类型 并把结果写入字节码文件 就好像是开发人员自己巧茹类型一样 

----------------------------

### 集合新增创建不可变集合的方法
- java9中 新增了创建只读集合的方法
- List.of(v)；
- Map.of(v)；
- Set.of(v)；

- 而java10中 也定义了创建只读集合的方法
- List.copyOf()

- 我们关注下下面的点

> List.copyOf(C coll)
- 如果参数coll本身就是一个只读集合 则copyOf()返回值即为当前的coll 

- 如果参数coll本身不是一个只读集合 则copyOf()返回一个新的集合 这个集合是只读的

```java
@Test
public void test() {
  
  // 示例1:
  // 通过of()方法创建了一个只读的集合
  var list1 = List.of("java", "python", "c");

  // 这里使用了copyOf() 放入了创建好的list1 得到了一个新的copy1
  var copy1 = List.copyOf(list1);

  // true
  System.out.println(list1 == copy1); // true


  // 示例2：
  var list2 = new ArrayList<String>();
  var copy2 = List.copyOf(list2);
  System.out.println(list2 == copy2); // false
}
```

- 为什么上面的代码差不多 得到的结果却不是一个呢
- 因为: copyOf()方法是返回一个只读的集合 如果集合本身就是只读的 那么通过copyOf方法得到的集合和之前的集合就是同一个 也就是 已经是只读了就没有必要再造一个只读的了 
- 如果集合本身不是只读的调用copyOf()方法 相当于新建了一个只读集合


----------------------------

### java11的新特性
- java11的主要的新特性就是引入两种新的GC 其中包括也许是划时代意义的ZGC

> String系列增加了字符串处理的方法

> 字符串.isBlank()
- 判断字符串是否为空白(去除*空格/制表符/换行符*后看看是不是空白 就是空串)


- 返回值:
- boolean


> 字符串.strip()
- 去除首尾空白(去除*空格/制表符/换行符*)

- 返回值:
- String


> 字符串.stripTrailing()
- 去除尾部空白(去除*空格/制表符/换行符*)

> 字符串.stripLeading()
- 去除首部空白(去除*空格/制表符/换行符*)

> 字符串.repeat(num)
- 重复指定次数的字符串

> 字符串.lines().count()
- 行数统计 看看字符串有多少行数据

----------------------------

### Java11 Ootional加强
- Optional也增加了几个非常酷的方法 现在可以很方便的将一个Optional转换成一个Stream 或者当一个空Optional时给它一个代替的


> optional对象.isEmpty()
- 判断value是否为空 
- JDK11
```java
Optional<Object> op = Optional.empty();
// 判断内部的value是否存在 存在为true 不存在为false
System.out.println(op.isPresent()); 

// 判断内部的value是否为空 为空就是true
System.out.println(op.isEmpty());
```


> optional对象.ifPresentOrElse(Consumer action, Runnable emptyAction)
- 参数1:
- 消费者

- 参数2:
- Runnable 里面有一个run() 里面没有参数 没有返回值
- 因为Consumer和Runnable接口都没有返回值 所以该方法也不用考虑返回值

- 如果optional对象里面的value是非空的，执行参数1功能
- 如果optional对象里面的value是空的，执行参数2功能
- JDK9


> optional对象.or(Supplier<?extends Optional<? extends T>> supplier)
- 参数: 
- Supplier供给者 供给者里面放的是Optional

- 如果optional对象里面的value是非空的，返回对应的Optional; 
- 如果optional对象里面的value是空的，返回形参封装的Optional
- JDK9

- 返回值:
- Optional<T> 
```java
// or()方法的参数要放一个供给者 没参数返回东西 返回一个Optional对象
Optional<String> op1 = Optional.of("hello");
Optional<Object> op2 = op.or(() -> op1);
System.out.println(op2);
```


> Stream<T> stream()
- value非空，返回仅包含此value的 Stream;
- 否则，返回一个空的Stream
- JDK9


> optional对象.orElseThrow()
- 要是Optional里面本身有数据 就返回里面的数据 如果没有数据就抛出异常

- value非空，返回value;
- 否则抛异常 NoSuchElementException
- JDK10

```java
Object o = op.orElseThrow();
// 如果op里面的value非空 就返回具体的值
System.out.println(o);
```

----------------------------

### Java11中局部变量类型推断的升级
- 局部变量类型推断是java10中引进来的 在java11中又做了升级

- 在var上添加注解的语法格式 在jdk10中是不能实现的 在jdk11中假如了这样的语法

- 当我们想用注解去修饰变量的时候 变量的类型必须要有
- 但是我们又想省略变量的类型 所以在java11中可以这样鞋

> @注解 var 变量

```java
// 错误的形式: 
// 必须要有类型 可以加上var

// 当回调中的参数只有一个参数的时候 该参数前面的类型是可以推断的
// 现在我们想使用注解来修饰变量 以前是不可以的 变量必须要有类型
Consumer<String> con = (@Deprecated t) -> System.out.println(t.toUpperCase());


// 正确的形式
// 使用var的好处是在使用Lambda表达式时给参数加上注解
Consumer<String> con = (@Deprecated var t) -> System.out.println(t.toUpperCase());
```

----------------------------

### 全新的HTTP客户端API
- java11中引进来HttpClient
- 它是用来替换HttpURLConnection
<!-- 
  HttpURLConnection我们在说网络编程的时候说过这个结构
  通过它获取连接下载数据 后台是图片 还是html格式的文件 

  后面我们会用HttpClient替换HttpURLConnection
 -->

- HTTP，用于传输网页的协议，早在1997年就被采用在目前的1.1版本中。直到2015年，HTTP2才成为标准

- HTTP/1.1和HTTP/2的主要区别是*如何在客户端和服务器之间构建和传输数据*

- HTTP/1.1 依赖于请求/响应周期。
- HTTP/2 允许服务器“push”数据(允许服务器将数据推送到客户端上) 它可以发送比客户端请求更多的数据

- 这使得它可以优先处理并发送对于首先加载 网页至关重要的数据。

- 这是Java9开始引入的一个处理HTTP请求的的 HTTP Client API，该API支持同步和异步，而在Java11中已经为正式可用状态，你可以在 java.net包中找到这个API。

- 它将替代仅适用于blocking模式的 HttpURLConnection (HttpURLConnection是在HTTP 1.0的时代创建的，并使用了协议无关的 方法)，并提供对WebSocket和HTTP/2的支持。


```java
// 同步的方式
HttpClient client = HttpClient.newHttpClient();

HttpRequest request = HttpRequest.newBuilder(URI.create("http://127.0.0.1:8080/test/")).build(); 

HttpResponse.BodyHandler<String> responseBodyHandler = HttpResponse.BodyHandlers.ofString(); 

HttpResponse<String> response = client.send(request, responseBodyHandler); 

String body = response.body();
System.out.println(body);


// 异步的方式
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder(URI.create("http://127.0.0.1:8080/test/")).build();

HttpResponse.BodyHandler<String> responseBodyHandler = HttpResponse.BodyHandlers.ofString(); 

CompletableFuture<HttpResponse<String>> sendAsync = client.sendAsync(request, responseBodyHandler);

sendAsync.thenApply(t -> t.body()).thenAccept(System.out::println); 

//HttpResponse<String> response = sendAsync.get();
//String body = response.body();
//System.out.println(body);
```

----------------------------

### 更简化的编译运行程序
```java
// 编译
javac javastack.java

// 运行
java javastack
```

- 在我们的认知里面 要运行一个java源代码必须先编译 再运行 两步执行动作 而在未来的java11中 通过一个java命令就直接搞定了

- java javastack.java


> 一个命令编译运行源代码的注意点:
- 执行源文件的*第一个类* *第一个类必须包含主方法* 并且不可以使用其他源文件中的自定义类 本文件中的自定义类时可以使用的
<!-- 
  这种方式只会执行第一个类中的main方法
 -->

----------------------------

### java11中的其他的新特性
- JVM是java的两大利器之一 它不光能跑java程序 还可以跑别的程序
- 另外一个就是GC

- GC是java主要优势之一。然而, 当GC停顿太长, 就会开始影响应用的响应时间。消除或者减少GC停顿时长, java将对更广泛的应用场景是一个更有吸引力 的平台。此外, 现代系统中可用内存不断增长,用户和程序员希望JVM能够以高效的方式充分利用这些内存, 并且无需长时间的GC暂停时间。


> ZGC
- ZGC, A Scalable Low-Latency Garbage Collector(Experimental)
ZGC, 这应该是JDK11最为瞩目的特性, 没有之一。 但是后面带了Experimental, 说明这还不建议用到生产环境。

- ZGC是一个并发, 基于region, 压缩型的垃圾收集器, 只有root扫描阶段会 STW(stop the world), 因此GC停顿时间不会随着堆的增长和存活对象的增长 而变长。

- 优势:
- GC暂停时间不会超过10ms
- 既能处理几百兆的小堆, 也能处理几个T的大堆(OMG)
- 和G1相比, 应用吞吐能力不会下降超过15%
- 为未来的GC功能和利用colord指针以及Load barriers优化奠定基础
- 初始只支持64位系统

- ZGC的设计目标是:支持TB级内存容量，暂停时间低(<10ms)，对整个 程序吞吐量的影响小于15%。 将来还可以扩展实现机制，以支持不少令人兴奋的功能，例如多层堆(即热对象置于DRAM和冷对象置于NVMe闪存)， 或压缩堆。

----------------------------

### 在当前JDK中看不到什么
- 一个标准化和轻量级的JSON API
- 新的货币API
- 时间是我们处理比较繁琐的API 因为涉及到不同的时区 货币也是 不同的国家的货币也不用

----------------------------

### 结尾

----------------------------

### 面试需要问的问题
- 我要是过来的话 项目的架构是什么 哪一块是用什么技术来实现的

----------------------------

### 创建工程的流程
> 1. 先创建 package
- 也就是先创建一个包 便于管理我们写的功能

- 作用: 
- 包相当于一个班级 每一个java文件相当于一个同学


> 包的规则:
- 1. 包名: 小写

- 2. 包名规范:
- 公司域名倒叙.项目功能名
- com.atguigu.contact
<!-- 
  网上说创建一个包 就是创建一个文件夹 但是文件夹中不能出现.
  所以创建包的时候 com/demo  
 -->


> vs code中的包
- vscode中是根据打开的文件夹来选定包名 也就是说 文件夹就是包
- 1. 如果 .java 文件处于打开的文件夹的根目录下 就不会被要求输入包名
- 2. 如果 .java 文件处于打开文件夹的子文件夹中 .java文件会全部被要求在文件头处输入 package 语句


> package 文件夹名;
- 上面就是如果 .java 文件处于子文件夹中 就要求该文件在开头出: package 文件夹名.文件夹名
<!-- 
  package src.com;
  该类在 
    src
      com
        文件
 -->
  

> 2. 在创建好的包下 右键创建class 就会生成一个java文件
<!-- 这是在老师讲的es编辑器中是这么操作的 -->
- https://blog.csdn.net/weixin_39777637/article/details/110474775



> 有 包 的情况下的 命令行 方式
- package src.com;

- java_exer
  - com
    Demo.java

- 1. 注意包名结构 返回 最开的src的上一层目录
> 编译 - 执行命令: 
  javac -d . src/包名(文件夹名)/文件名.java

> 执行 - 执行命令: 
  java src.包名.类名 (执行这个包下的指定类)

<!-- 
  javac -d . src/com/Demo.java
  java src.com.Demo

  注意:
  - 1. 返回src的上一层执行命令
  - 2. 路径都是从src开始的
 -->

> 命令参数解析:
- 指定编译生成的class文件存放路径 javac -d
- -d 指明 类层次的根目录
- . 就是当前目录


> 包名的命名规范
- https://www.cnblogs.com/luckforefforts/p/13642694.html

----------------------------

### Java基础教程所需软件下载地址：
- 链接: 
- https://pan.baidu.com/s/10P6JbKN6TG7wW-QXV8ANdQ 提取码: nkbv

----------------------------

### 基础扩展部分
### 命令
- java
  执行java文件时 使用的命令

- javac
  编译的时候 使用的命令
  编译层面都是些语法层面的问题

- javadoc
  生成一个以网页形式的文档

- jjs
  用来在jvm上执行js程序


> Java当中的多环境切换
```java 
  "java.configuration.runtimes": [
      {
          "name": "JavaSE-1.8",
          "path": "D:\\soft\\Java\\jdk1.8.0_231",
          "default": true
      },
      {
          "name": "JavaSE-11",
          "path": "D:\\soft\\Java\\jdk-11.0.2",
      },
  ],
```

----------------------------

### Oracle密码
- love.nn.linlin@gmail.com
- Xl5467426/

```js
https://login.oracle.com/mysso/signon.jsp

/Library/Java/JavaVirtualMachines/jdk-11.0.13.jdk/Contents/Home/
/Library/Java/JavaVirtualMachines/jdk1.8.0_311.jdk/Contents/Home/
/Library/Java/JavaVirtualMachines/jdk-11.0.13.jdk/Contents/Home



/Library/Java/JavaVirtualMachines/jdk-11.0.14.jdk/Contents/Home
/Library/Java/JavaVirtualMachines/jdk1.8.0_321.jdk/Contents/Home
```

> 环境变量
```js
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_311.jdk/Contents/Home/
PATH=$JAVA_HOME/bin:$PATH:
CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
export JAVA_HOME
export PATH
export CLASSPATH
```

- 多版本jdk切换
```js 
export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_321.jdk/Contents/Home
export JAVA_11_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.14.jdk/Contents/Home

export JAVA_HOME=$JAVA_8_HOME

alias jdk8="export JAVA_HOME=$JAVA_8_HOME"
alias jdk11="export JAVA_HOME=$JAVA_11_HOME"

// 我把这个注释掉 就可以通过 jdk8 或者 jdk11 进行多版本的切换了
export PATH=$PATH:$JAVA_HOME/bin:$GRADLE_HOME/bin
```

- sudo -i vi /etc/.bash_profile
- source /etc/.bash_profile
- source ~/.bash_profile

----------------------------

### 环境搭建

> JDK
- JDK里面包含了两个部分

- 1. JRE java运行环境
- 2. 开发工具： 
  编译工具 javac.exe  打包工具 jar.exe等

- 它是提供给java开发人员使用的 其中包含了java的开发工具 也包括了JRE
- 安装了JDK 就不用单独安装JRE了


> JRE java运行环境
- 包括 java虚拟机 和 java程序所需的核心类库(java se)等

- 如果想要运行一个开发好的java程序 计算机中只需要安装JRE即可
- 简单而言 使用 JDK 的开发工具完成的java程序 交给JRE去运行


> JRD
- JRD = JVM + Java核心类库


> 环境变量中的 JAVA_HOME
- 它里面存的是bin的上一层目录
<!-- path = %JAVA_HOME%\bin   //这是window里面的 -->


> JDK的安装地址
- www.oracle.com
- java.sun.com

----------------------------

### Java
- java基础是学习javaEE 大数据 android开发的基石

- 常用语法
- C C++ Java PHP Kotlin Python Scala等
<!-- 
  Kotlin 谷歌出的语言 用来开发安卓的
  python 快速开发效率高 适合处理数据 跟java比起来小巫见大巫
  Oc 苹果的开发语言
  Go 具有java的开发效率 和 C的执行效率
 -->

- Java语言的应用可以应用在3个不同的领域当中

>  Java SE 标准版
- 支持面向桌面级应用的Java平台 提供了完整的Java核心API 此版本以前称为J2EE
<!-- QQ 360 -->

>  Java EE 企业版 -- !
- 为企业环境下的应用程序提供的一套解决方案 该技术体系中包含的技术如 Servlet Jsp等 主要针对Web应用程序开发 版本以前称为 J2EE
<!-- Web后台 -->

>  Java ME 小型版
- 支持Java程序运行在移动端上的平台 对Java API有所精简 并加入了针对移动端的支持 此版本以称为J2ME


>  现在 Java 应用的领域
- 1. 企业级应用
  - 后台开发
  - 主要指复杂的大企业的软件系统 各种类型的网站 
  - java的安全机制以及它的跨平台的优势 使它在分布式系统领域开发中有广泛应用 
  - 应用领域包括金融 电信 电子商务

- 2. Android平台应用
  安卓应用程序使用java语言编写 安卓开发水平的高低很大程度上取决于java语言核心能力是否扎实

- 3. 大数据平台开发
  大数据都提供给java接口


>  java语言的特点
- 跨平台性
- 我们java的应用程序实际上是跑在JVM上面的 (虚拟机)
- JVM装在了不同的操作系统上 因为有了JVM 同一个Java程序在三个不同的操作系统中都可以执行 
- 这样实现的java程序的跨平台性

- 不同操作系统的jvm不同
<!-- 
  window linux mac
 -->


> JVM 虚拟机
- jvm是一个虚拟的计算机 具有指令集并使用不同的存储区域 负责执行指令 管理数据 内存 寄存器

- 对于不同的平台 有不同的虚拟机
- 只有某平台安装了对应的java虚拟机 java程序才可以在此平台运行
- java虚拟机机制屏蔽了底层运行平台的差别 实现了 一次编译 到处运行

- 我们写的源代码进经过编译后形成字节码文件
- 我们在画内存图的时候说变量放在栈还是堆 指的是运行的时候

- 编译源代码后还是一个硬盘上的文件 在运行这个文件的时候 才会执行里面的代码
- 创建类 属性 变量 对象等 这时候我们才会根据代码里面的内容 分配内存空间

----------------------------

### 人机交互方式
- 图形化界面 GUI
- 命令行方式 CLI
- 需要有一个控制台 输入特定的指令 让计算机完成一些操作

----------------------------

### 中央处理器
- CPU是计算机的大脑，它从内存中获取指令 然后执行这些指令

- 包括：
- 控制单元 和 算术/逻辑单元

- 控制单元：
- 用于控制和协调其他组件的动作

- 算术/逻辑单元：
- 用于完成数值运算 + - * / 和逻辑运算比较

- 每台计算机中都有一个内部时钟 该时钟以固定速度发射电子脉冲 时钟速度越快 在给定的时间段内执行的指令就越多
- 速度的计量单位是Hz 1Hz相当于每秒一个脉冲 随着cpu速度不断的发展 目前以千兆赫GHz来表述
<!-- 
  买电脑看GHz

  1khz = 1024hz
  1mhz = 1024khz
  1ghz = 1024mhz
 -->

- 最初一个cpu只有一个核core， 核是处理器中实现指令读取和执行的部分
- 一个多核cpu是一个具有两个或者更多独立核的组件 可提高cpu的处理能力

--------------------------------

### 计算机的硬件介绍
<!-- 
  输入设备 -- > 存   储   器 -- > 输出设备

             ↑ ↓       影↓ ↑虚

      -------------------------------
            运算器      控制器
      -------------CPU---------------
 -->

- 实体箭头 - 数据流
- 影体箭头 - 指令流
- 虚线箭头 - 控制流

--------------------------------

### IT定律之计算机行业发展规律
- 摩尔定律
- 安迪-比尔定律
- 反摩尔定律

--------------------------------

### 计算机硬件介绍
- 内存中的信息在断电的时候会丢失 那么我们可以考虑将程序和数据永久的保存在存储设备上
- 当计算机确定需要这些数据的时候 再移入内存 因为从内存中读取比从存储设备读取要快得多
- 存储设备主要有以下三种

> 磁盘驱动器
- 每台计算机至少有一个硬盘驱动器 硬盘用于永久的保存数据和程序

> 光盘驱动器 CD DVD
- CD的容量可达700mb
- DVD的容量可达4.7gb

> USB闪存驱动器
- 通用串行总线 可以使用usb打印机 数码相机 鼠标 外部硬盘驱动器连接到计算机上
- usb闪存驱动器很小 可用于存储和传输数据的设备


> 比特bit 和 字节byte
- 在讨论内存前 先清楚数据是如何存储在计算机中的

- 计算机就是一系列的电路开关 每个开关存在两种状态：
- 关 和 开
- 如果电路是开的 它的值就是1
- 如果电路是关的 它的值就是0

- 一个0 或者 一个1*存储为一个比特bit* 是*计算机中最小的存储单位*
- 一个字节是8位
  0000 1111 - 每一位是一个bit


> 字节： byte  1byte = 8bit
- 计算机中最基本的存储单元是字节 byte 每个字节由8个bit构成 
- *从存储数据的角度来看* 字节才是最小的单位

- 计算机的存储能力是以字节和多字节来衡量的如下

  千字节    kb = 1024byte = 1024*8bit
  兆字节    mb = 1024kb
  千兆字节  gb = 1024mb
  万亿字节  tb = 1024gb

- 后面还有pb eb zb yb等单位

<!-- 
  比如我读取了一张图片 
  这张图片的 size: 89249 也就是 89249字节 换算kb的话
  需要  89249字节(byte) / 1024 = ? kb

  - 答案:
  - 89kb
 -->


> 内存 RAM
- 由一个有序的字节序列组成 用于存储程序以及程序需要的数据
- 一个程序和他的数据在被cpu执行前必须移动计算机的内存中

- 每个字节都有一个唯一的地址 使用这个地址确定字节的位置 以便于存储和获取数据
<!-- 
  2000    01000011
  2001    01110010
 -->

- 一个计算机具有的ram越多 它的运行速度就越快 但是此规律是有限制的
- 内存与cpu一样 也构建在表面嵌有数百万晶体管的硅半导体芯片上 但内存芯片更简单 更低速 更便宜

<!-- 
      CPU         内存         硬盘

                              美女.jpg    二进制文件

  怎么将图片显示在屏幕上是要做运算的 并不是从硬盘直接到cpu 
  要想要cpu使用硬盘的数据 必须要将数据加载到 内存中

  cpu 只跟内存 进行交互 cpu的数据都是从内存中来来回回的读 再写到内存当中

  硬盘中的数据必须也要先加载到内存里面 
 -->

- 实测发现：
- 内存的读取数据的速度是硬盘读取速度的*10倍* 在某些环境里 硬盘和内存之间的速度差距可能会更大 而cpu的速度比内存不知道还要快多少倍
- 当我们把程序从硬盘放到内存以后 cpu就直接在内存运行程序 这样比cpu直接在硬盘运行程序要快很多

- 内存解决了一部分cpu运行过快 而硬盘数据存取太慢的问题 提高了我们电脑的运行速度 内存就如同一条高速车道 数据由传输速度较慢的硬盘通过这高速车道传送至cpu进行处理

- 但内存是带电存储的一旦断电数据就会消失 而且容量有限 所以要长时间存储程序或数据就需要使用硬盘

- 内存在这里起了两个作用
- 1. 保存硬盘读取的数据 提供给cpu使用
- 2. 保存cpu的一些临时执行结果 以便cpu下次使用或保存到硬盘

--------------------------------

### 输入与输出设备
- 常见的输入设备
  键盘 和 鼠标

- 常见的输出设备
  显示器 和 打印机

- 显示器屏幕分辨率：
  是指显示设备水平和垂直方向上显示的像素 px 
  分辨率可以手工设置
  分辨率越高 图像越锐化 越清晰

--------------------------------

### 万维网 因特网 互联网
- 关系
- 互联网 > 因特网 > 万维网
<!-- 
  万维网是无数个网络站点和网页的集合 他们在一起构成了因特网最主要的部分
  它实际上是多媒体的集合 是由超级链接连接而成的 我们通常通过网络浏览器上网观看的 就是万维网的内容

  万维网只是因特网最主要的一个部分 这里只说了 web客户端和web服务端
  因特网实际上还包含了 电子邮件 usenet以及新闻组

  互联网是最大的一个概念
 -->

--------------------------------

### 字符集
- 在计算机的底层都是2进制的 所有的汉字代码在底层存的时候 都是010101

- 比如
  一个 a 它是97
  一个 b 它是98
  一个 c 它是99

- a ~ z : 97 ~ 122
- A ~ Z : 65 ~ 90

- 我们将 97 98 99 用二进制去表示 传递给计算机底层
- 当我们打开某个文件的时候 再通过某种字符集的方式再还原回去a b c

- 我们如何将 a 对应成 2进制 再还原回来 中间的对应关系 就叫做字符集


- 1byte = 8bit
- 一个字节的表数范围 -128 ~ 127

-  127 -> 1111111
- -128 -> 10000000

- 比如
- a -> 97
- z -> 122


> Unicode 编码
- 乱码
- 世界上存在着多种编码方式 同一个二进制数字可以被解释成不同的符号 
- 因此 要想打开一个文本文件 就必须知道它的编码方式 否则用错误的编码方式解读 就会出现乱码

- unicode:
- 一种编码 将世界上所有的符号都纳入其中 每一个符号都给予一个独一无二的编码 使用 unicode没有乱码的问题

- unicode的缺点:
- unicode只规定了符号的二进制代码 却没有规定这个二进制代码应该如何存储 无法区别unicode和ASCII 

- 计算机无法区分
  三个字节表示一个符号
  还是分别表示三个符号 

- 另外我们知道 英文字母只用一个字节表示就够了 如果unicode统一规定 每个符号用三个或者四个字节表示 那么每个英文字母前必然有2到3个字节是0 这对存储空间来说是极大的浪费


> utf-8
- 它是unicode是一种落地的实现方式 也是更大的一种字符集 
- 它是一种边长???的编码方式 它可以使用1-6个字节表示一个符号 根据不同的符号而变化字节的长度


> utf-8的编码规则
- 对于单字节的utf-8编码 
- 该字节的最高位为0 其余7位用来对字符进行编码
<!-- 
  8个字节 
    无符号的情况下 表数范围最大  0~255
    有符号的情况下 表数范围最大 -128~127

  如果只有7位来对字符进行编码的话 0-128
 -->

- 对于多字节的utf-8编码 
- 如果编码包含n个字节 那么第一个字节的前n位为1
- 第一个字节的n + 1位为0 该字节的剩余各位用来对字符进行编码 在第一个字节之后的所有字节 都是最高两位为 10 其余6位用来对字符进行编码

--------------------------------

### 数据结构
- 1. 数据 与 数据 之间的逻辑关系: 比如
- 集合:
- 一对一 一对多 多对多

- 一对一 - 类似链表

- 一对多 - 树形结构(DOM树 顶层为html)
<!-- 
    一对2 就是 2叉树
    一对3 就是 3叉树

      a
    ↙   ↘
  □      □
-->

- 多对多
- 典型的就是社交网络 
- 每一个人都是一个节点 这个节点可以延伸出很多别的好友 别的好友也有可能是你 也就是说 你可以发散出去 别人也可以发散到你这里来
<!-- 
    □     □
      ↖ ↗
       □
      ↙ ↘
    □     □
-->

- 2. 数据的存储结构
- 数据之间的关系我们知道了后 我们需要将数据在内存层面 或者 硬盘层面存储起来 我们怎么通过实际的存储结构去刻画 上面说的关系呢？

- 线性表: 
- 主要刻画的是 一对第一 的关系
  - 1. 顺序表（典型的实现就是数组）
  - 2. 链表（它就不是连续的了 依靠的是指针）
  - 3. 栈结构（先进后出 从顶层弹出）
  - 4. 队列（队列是有两个口的 左进右出 谁先进来 谁先出去） 单向通道


- 树形结构: 
- 主要刻画的是 一对多 的关系
- 二叉树


- 图形结构: 
- 主要刻画的是 多对多


> 算法
- 排序算法
- 搜索算法

--------------------------------

### 区块链
- 区块链表面是it技术 实际上是一种思维方式
- 我们现实生活中很多都是这样的情况 表面看是技术 实际上是思维方式

- 大家都学英语 为什么有人说的好 有人说的不好呢？ 
- 其实并不是说他会多少单词 真正英语说的好的人 能站在老外的角度上思考问题 思维方式完全符合欧美人

- 跟动物也是 是因为你完全无法理解动物的思维方式 而不是我们发不出那个声音

- 现在网络发展的特别快 大量交互的数据怎么来保证这些数据的安全 谁来管理这些数据

- 现在数据模型也好 网络模型也行 叫做 *中心化的一种网络模型*
- 比如我们用到的一些服务 比如微信 腾讯给我们提供 
- 比如我看电影 就是youtube给我提供 
- 比如说要是存钱就是银行给你提供这个功能

- 都是有一个中心存在 然后这个中心为所有的客户服务 这样一个结构

- 但是区块链是平坦的 没有中心 就是说这个服务并不是某一个机构给你提供的也不是某个国家给你提供的也不是某个个人给你提供的

- 它是所有人共同提供的 共同使用的 这个思想其实很早就有了 但是一直以来没有敢碰触这块 就是因为它思想的核心是 去中心 (不要中心)

- 去中心就意味着不需要管理者 这是政府和大企业也好 都无法接受的
- 政府本身就是一个中心 你现在要建立一个东西要去掉中心 那政府就没有存在的必要了 

- 大企业也是一样 我提供一个服务 我就是中心 我就是卖这个服务的 我要挣钱的
你把我去掉了 大家都在使用 那不是说对我一点意义都没有了

- 那为什么要有这个东西呢?
- 其实这个世界上有很多东西是不需要有中心的 

- 比如钱就是 你的钱为什么要存在别人那个地方 安全么？ 
- 那为什么在你这就不安全呢
- 为什么你就放心放在银行里进行管理呢 

- 因为银行提供担保 但其实银行也是一个机构 任何一个机构它都有可能倒闭 遇到风险 或者出错 也就造成你的损失

- 那有没有一种安全机制能够避免这些风险？ 
- 让你的钱 安安全全的在你的手里 而且又不被任何人管理

- 比如比特币 比特币之所以这么牛就是因为它建立在区块链技术上
- 钱就是大家交易的一种工具而已 我们多年以来已经慢慢把一些不太方便交易的东西渐渐的变成一个很容器携带的金子这种东西了 但是金子其实最终还是不容易保管和携带的 于是产生了比特币 就是一串数字 钱本身就是数字么

- 而这段数字由谁来管理呢 是所有人在管理 
- 区块链也叫做全民记账系统 我花的每一块钱(我把钱给你叫做花钱) 我花一块钱这个事情 被所有人手里的账本记录上之后

- 我少一块钱 你多一个块钱 这个事情就成为一个事实 因为每个人的账本上都写着 我少了一块 你多了一块 我擅自改动账本也不能改变这个事实 因为和你们所有人的账本对不上 所以只要不超过50%的账本被篡改的话 这就事实

- 当然超过50%的话 被篡改的事情就成为事实了 但是区块链这个技术就保证 因为用户群体特别的庞大 你不可能篡改所有人的账本 就是通过信息共享来保证信息的安全

- 当初有这个技术的时候很多人都不知道干什么 直到2008年有个叫中本聪的人 他说这个可以做货币 于是他用了两个月的时间就建立了比特币系统 直到今天这个系统也没有什么问题 大家还照样炒着比特币

- 之后很多人从比特币身上发现 这个技术可以击溃世界上很多的大企业

- 建立在区块链上有两个东西 特别重要 一个是虚拟货币 一个是nft
- nft简单的来说就是标识资产的东西 在现实里面你家的东西就是你的 你兜里的东西就是你的 但在虚拟世界里 怎么区分是你的还是别人的 就需要通过区块链技术的nft来标识你的资产 当虚拟世界里面的东西可以被标记的时候 它就成为资产 就变的有价值了 不能被标记就没有价值