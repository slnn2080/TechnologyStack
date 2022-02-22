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