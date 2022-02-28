### 小野集锦

> 类数组
- 一个类数组的结构如下
- 1. 要求有索引式的属性名
- 2. 要求对象中有length

- 因为要满足一个数组的特性

```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length : 3,
}
```

- 如果length = 2, 则末位元素减掉
- 如果length = 4, 则用undefined补位
- 如果length = 0 或者 没有, 则数组为空


```js
var obj = {
  0: 1,
  1: 2,
  2: 3
  push: [].push
}

obj.push(4)

// 结果
4
2
3
length: 1
```

- 因为既然有push方法 那么一定会有length属性 如果没有会自动给你添加

- 然后我们push 4 它会从0的位置开始添加数据 所以将1覆盖为4

----------------

> Array.from(参数1, 参数2, 参数3)
- 作用:
- 将一个类数组对象转化为数组

- 参数1:
- 类数组对象

- 参数2:
- map回调

- 参数3:
- 我们传递进去的东西可以改变this的指向
```js
let data = Array.from(obj, function(item, index) {
  // 当我们不传递第三个参数的时候 this原先是什么现在就是什么
  console.log(this)
  return {
    ...
  }
})
```

- 当我们传递第三个参数进去的时候 this就代表我们传入的数据 
- 比如:
- 我们传递一个对象 那么this就是这个对象
- 我们传递一个数组 那么this就是这个数组
- 传递什么this就是什么

```js
let data = Array.from(obj, function(item, index) {
 
  console.log(this)
  return {
    ...
  }
}, {} or [] or number or string)
```


- 我们要将下面的结构 转换为 
```js
var obj = {
  0: 1,
  1: 2,
  2: 3,
  length : 3,
}

var arr = [
  {
    order: 0
    studentId: 1,
  },
  {
    order: 1
    studentId: 2,
  },
  {
    order: 2
    studentId: 3,
  }
]
```

- 方式1:
```js
let data = Array.from(obj).map((item, index) => {
  return {
    studentId: item,
    order: index
  }
})

console.log(data)
```

- 方式2: Array.from()
```js
const data = Array.from(obj, function(item, index) {
  return {
    studentId: item,
    order: index
  }
})
```

- 方式3: Array.from() 的第三个参数
```js
const data = Array.from(obj, function(item, index) {
  return {
    studentId: this.prefix + item,
    order: index
  }
}, {
  prefix: "No. "
})
```

- 数组的方法:
- forEach
- map
- filter
- reduce
- every
- some
- 上述的数组的方法中都有第3个参数
- 改变this指向的配置

----------------

### 将定义在对象中的get方法提取出来

- 如下我们定义的对象 我们给a属性定义了get方法 
- 要是想使用get方法我们都是通过 obj.a 的方式进行的调用
```js
let obj = {
  get a() {
    // 对random的结果进行四舍五入
    return Math.random() >= 0.5 ? 1 : 0
  }
}

console.log(obj.a)  // 0 or 1
```

- 现在我们想将get方法提取出来
- 方式1:
```js
const fn = obj.a
```

- 方式2:
> 含有get的对象.__lookupGetter__("提取哪个get");
```js
let round = obj.__lookupGetter__("a");
console.log(round)
console.log(round())
```

- 该方法已经被废弃了 但是它的兼容性超级好
- 在一些底层代码中使用的是
- __defineSetter__()
- __defineGetter__()

- 那既然上面的方法被废弃了 肯定就有一个新的方法出现替换它
- 我们的get set就是描述符

> Object.getOwnPropertyDescriptor("指定对象", "哪个属性的描述符")
- 返回的是一个该对象的所有描述符对象

```js
let round = Object.getOwnPropertyDescriptor(obj, "a")
console.log(round);
console.log(round())

{
  set: undefined, 
  enumerable: true, 
  configurable: true, 
  get: ƒ
}
```

- 既然是对象 我们就能通过.的方法获取到get
```js
let round = Object.getOwnPropertyDescriptor(obj, "a").get
console.log(round);
```

- 该方法的兼容性不是很好 虽然上面的__lookupGetter__方法被废弃了 但是大部分浏览器是支持的


> 对象.__defineGetter__("设置的属性", () => {})
> 对象.__defineSetter__("设置的属性", () => {})
- 给对象设置什么属性 回调就是get方法的回调
- 内部需要返回return

- 也就是我们可以直接设置 getter 方法
- 偏底层的方法

```js 
let obj = {}
obj.__defineGetter__("a", () => {
  return "get a"
})
console.log(obj.a)
```

----------------

### 相等性判断