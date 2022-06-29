### 大文件切片上传
> 思路:
- 比如我们拿到了 file 对象 我们将这个file对象切成很多块 每次上传一块 直到上传完成

- 后台进行合并 把上传的东西 不断地往一个文件里面append append完了之后就是一个完整的文件


> 后台要点:
- 1. npm i express express-fileupload
- express-fileupload 用于处理上传的file
- 可以看看这小工具的用法

**注意:**
- 代码有问题 有的时候能上传成功 有的时候不行 参考为主


> 前端代码
- 部分代码:
```html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.min.js"></script>
  <script>

    // 建立提示信息 统一进行管理
    const UPLOAD_INFO = {
      "NO_FILE": "请先选择文件",
      "INVALID_TYPE": "不支持该类型的文件上传",
      "UPLOAD_FAILED": "上传失败",
      "UPLOAD_SUCCESS": "上传成功"
    }

    // 创建文件类型限制 文件类型列表(允许的列表)
    const FILE_TYPE = ["video/mp4", "video/ogg"]

    // 64k 为一个 chunk 文件切割的基本单位
    const CHUNK_SIZE = 1024 * 1024

    // 已上传了多少size (保存了当前上传了多少)
    let uploadedSize = 0
    /*
      uploadedSize < file.size 代表还有没有上传完
      uploadedSize = file.size 代表上传完了
    */


    // 上传完成后 返回的结果
    let uploadedRet = null


    // 获取各个节点
    // 进度条
    const oProgress = document.querySelector("#progress")
    const oBtn = document.querySelector("#btn")
    const oInfo = document.querySelector("#info")

    // file input
    const oFile = document.querySelector("#video")



    oBtn.addEventListener("click", async function() {
      /*
        lastModified: 1655435973258
        lastModifiedDate: Fri Jun 17 2022 12:19:33 GMT+0900 (日本標準時) {}
        name: "harrier.mp4"
        size: 31812699
        type: "video/mp4"
        webkitRelativePath: ""
      */
      // console.log(oFile.files)  // 类数组
      
      // 还可以像下面这样写 解构
      const file = oFile.files[0]
      // const {files: [file]} = oFile

      // 判断是否有文件 并做出提示
      if(!file) {
        oInfo.innerHTML = UPLOAD_INFO["NO_FILE"]
        return
      }

      // 如果不在文件类型列表里面 则
      if(!FILE_TYPE.includes(file.type)) {
        oInfo.innerHTML = UPLOAD_INFO["INVALID_TYPE"]
        return
      }

      // 走到这里证明上面的情况都抛出了 把 oInfo 清空
      oInfo.innerHTML = ""

      // 注意: file里面的size属性是非常有用的！！！
      const {name, type, size} = file
      console.log(name)

      // 创建唯一的文件名(这个写法不行)
      const fileName = new Date().getTime() + "_" + name;

      // 将 进度条的max 设置为 文件的size
      oProgress.max = size


      // 切片上传
      while (uploadedSize < size) {
        // 从 uploadedSize 开始, 切到 uploadedSize + CHUNK_SIZE
        // fileChunk是Blob类型 比如 size 100
        const fileChunk = file.slice(uploadedSize, uploadedSize + CHUNK_SIZE)

        console.log("fileChunk", fileChunk)

        const formdata = createFormData({
          name,
          type,
          size,
          fileName,
          uploadedSize,
          file: fileChunk
        })

        try {
          // 每一次循环都要上传后 后台都会返回一个结果
          uploadedRet = await axios({
            url: "http://127.0.0.1:3333/upload",
            method: "post",
            data: formdata
          })

          // 看看每一次上传后 后台的返回结果是什么
          console.log("uploadedRet", uploadedRet.data)

        } catch(err) {
          // 上传失败
          oInfo.style.background = "black"
          oInfo.innerHTML = UPLOAD_INFO["UPLOAD_FAILED"] + err.message
          return
        }

        // 上传完成后 更新 uploadedSize 的值
        // 每次截取会返回了一个blob对象 它的size 就是截取的size
        uploadedSize += fileChunk.size

        console.log("end", uploadedSize)
        // 更新进度条
        oProgress.value = uploadedSize
      }

      // while 出来后就是上传成功 提示上传成功
      oInfo.innerHTML = UPLOAD_INFO["UPLOAD_SUCCESS"]

      // 将 file input 的 value 值 置为 空
      oFile.value = null

      // 上传成功后 动态添加视频
      createVideo(uploadedRet.data.video_url)
    })

    // 将文件的相关信息都要传递到后台 传入数据 组织一个 formdata
    function createFormData({
      name,
      type,
      size,
      fileName,
      uploadedSize,
      // 这个是我们切出来的 fileChunk
      file
    }) {

      // uploadedSize: 第一传递到后台是0 那么后台根据uploadedSize为0 会创建一个新文件(因为第一次后台并没有这个文件) 不断地往里面append
      const formdata = new FormData()
      formdata.append("name", name)
      formdata.append("type", type)
      formdata.append("size", size)
      formdata.append("fileName", fileName)
      formdata.append("uploadedSize", uploadedSize)
      formdata.append("file", file)

      return formdata
    }

    // 当上传完毕后 后台会返回一个 url 我们动态的创建 video 标签
    function createVideo(src) {
      const video = document.createElement("video")
      video.controls = true
      video.width = "500"
      video.src = src
      document.body.appendChild(video)
    }
  </script>
```


> 后台代码
```js
const express = require("express")

// 引入 fileloader
const uploader = require("express-fileupload")

// 取文件后缀的方法
const {extname, resolve} = require("path")

// 检查文件是否存在的方法 和 往文件里面追加的方法 写文件的方法
const {existsSync, appendFileSync, writeFileSync} = require("fs")


const FILE_TYPE = ["video/mp4", "video/ogg"]


const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// 注册 uploader
app.use(uploader())

// 如果访问 / 资源 那么久去 upload_temp 里面找
app.use("/", express.static("upload_temp"))

// 跨域处理
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-origin", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

  next()
})

app.get("/", (req, res) => {
  res.send({
    msg: "首页信息",
    code: 0
  })
})

app.post("/upload", (req, res) => {

  // 因为前端是 while 上传的 那边上传一次 这边就会接收一次 请求体body
  /*
    {
      name: 'harrier.mp4',
      type: 'video/mp4',
      size: '31812699',
      fileName: '1656512162705_harrier.mp4',
      uploadedSize: '31784960'
    }
  */
  // console.log(req.body)

  // 解构 我们发现并没有 file, file 需要再 req.files 里面获取
  const {name, type, size, fileName, uploadedSize} = req.body

  // 获取 file 文件 这个file是上传过来的 filechunk express-uploader 帮我们处理好了
  const {file} = req.files

  /*
    {
      name: 'blob',
      data: <Buffer cc c2 5f f9 2f 6a f5 22 3c 75 38 32 ac c5 5a 85 cc f7 24 7d 43 58 96 32 62 4f 95 4d 99 49 fe bd a4 7c 35 a5 de b5 35 32 7c 7a e1 14 7a 5c 92 5b a0 67 ... 65486 more bytes>,
      size: 65536,
      encoding: '7bit',
      tempFilePath: '',
      truncated: false,
      mimetype: 'application/octet-stream',
      md5: '41b4c4adcee2e7fc562c6e7d6209aa99',
      mv: [Function: mv]
    }
  */
  // file.data 就是每一个 chunk 
  // console.log(file)

  // 如果没有file
  if(!file) {
    res.send({
      code: 1001,
      msg: "no file uploaded"
    })

    return
  }

  // 虽然前端判断过类型 后台也要进行判断
  if(!FILE_TYPE.includes(type)) {
    res.send({
      code: 1002,
      msg: "the type is not allowed for uploading"
    })
    return
  }
  
  // 组织文件名 name是harrier.mp4
  const filename = fileName + extname(name)
  const filePath = resolve(__dirname, "upload_temp", filename)

  // 什么时候创建文件 不是0 证明有上传了
  if(uploadedSize != "0") {
    console.log("!=0")
    // 进来后 我们要判断 filePath 是否存在 存在做什么 不存在做什么
    // 如果没有这个文件
    if(!existsSync(filePath)) {
      // 报错 因为 != 0 的时候 说明已经上传了 但是却找不到这个文件 说明有某些原因将这个文件删掉了
      res.send({
        code: 1003,
        msg: "no file exists"
      })

      return
    }

    // 能到这个部分 代表文件存在 文件存在就往里面追加数据 file.data 就是每一个 chunk
    appendFileSync(filePath, file.data)
    res.send({
      code: 0,
      msg: "appended",
      video_url: "http//127.0.0.1:3333/" + filename
      // 返回url
    })

    return
  }

  console.log("==0 文件不存在")
  // 到这里说明 uploadedSize 为 0 说明第一次上传 说明还没有 文件 所以这里创建文件
  // 创建一个文件并写入file.data
  writeFileSync(filePath, file.data)

  // 响应
  res.send({
    code: 0,
    msg: "file is created"
  })
})

app.listen(3333, () => {
  console.log("3333端口已监听")
})
```


> express-fileupload
- 上传的文件 在 req.files 里面
- 当我们输出这个 file 输出如下
```js
{
    name: 'blob',
    data: <Buffer cc c2 5f f9 2f 6a f5 22 3c 75 38 32 ac c5 5a 85 cc f7 24 7d 43 58 96 32 62 4f 95 4d 99 49 fe bd a4 7c 35 a5 de b5 35 32 7c 7a e1 14 7a 5c 92 5b a0 67 ... 65486 more bytes>,
    size: 65536,
    encoding: '7bit',
    tempFilePath: '',
    truncated: false,
    mimetype: 'application/octet-stream',
    md5: '41b4c4adcee2e7fc562c6e7d6209aa99',
    mv: [Function: mv]
}
```

- name: 
    上传文件的名字。

- data：
    上传文件数据，是一个Buffer，可以通过writeFile方法写入到本地文件中。

- size：
    上传文件的大小，单位为字节。

- tempFilePath：
    临时文件路径。

- truncated：
    表示文件是否超过大小限制。

- mimetype：
    文件的mimetype类型。

- md5：
    文件的MD5值，可用于检验文件。

- mv：
    将文件移动到服务器上其他位置的回调函数。


> mv 回调
- filePath
    指定是上传文件的保存路径
- callback
    是回调函数用来处理判断是否上传成功并且有一个参数err表示错误对象

```js
mv(uploadPath, (err) => { ... })
```

- 参考资料
- https://blog.csdn.net/cnds123321/article/details/121548117

----------------

### 字符串汉字后面没空格 英文数字有
```js
let arr1 = ["播放", "Tales", "from", "the", "1001", "nights"]
let arr2 = ["107", "加", "139", "等于", "几"]
let arr3 = ["今天", "天气", "怎么", "样"]

function convert(arr, str="") {

  let en = /\w+/i
  let han = /\p{sc=Han}+ /u

  arr.forEach(item => {
    if(en.test(item)) {
      str += ` ${item}`
    } else {
      str += item
    }
  })

  return str.replace(han, content => {
    return content.trim()
  })
}

function convert(arr) {
  let han = / ?\p{sc=Han}+ ?/ug
  return arr.join(" ").replace(han, content => content.trim())
}

function convert(arr, str="") {

  let en = /\w+/i

  for(let i = 0; i < arr.length; i++) {
    let item = arr[i]
    item = `${item} `

    if(!en.test(item)) {
      item = item.trim()
      str += item
    } else {
      str += `${item}`
    }
  }
  
  return str
}

console.log(convert(arr2))

```



### 提高代码可读性

> 1. 避免对布尔变量使用否定意义的名称
- 比如: 
  isStarted *Vs* isNotStarted
```js
// 原代码
const isInvalidApiKey = apiKey === null
if (isInvalidApiKey) {}

// 改进后的代码
const isValidApiKey = apiKey != null
if (!isValidApiKey) {}
```


> 2. 避免使用标记位参数
```js
// 原代码
renderResult(true)
function renderResult(isAuthenticated) {
    if (isAuthenticated) {
       return <p>App</p>
    } else {
        return <p>Please login</p>
    }
}

// 使用对象参数：
renderResult({isAuthenticated: true})

function renderResult({isAuthenticated}) {
    if (isAuthenticated) {
        return <p>App</p>
    } else {
        return <p>Please login</p>
    }

}

// 使用两个函数
function renderAuthenticatedApp() {
    return <p>App</p>
}

function renderUnAuthenticatedApp() {
    return <p>Please login</p>
}

isAuthenticated ? renderAuthenticatedApp() : renderUnAuthenticatedApp()
```


> 3. 使用卫语句
- 卫语句:
- 把复杂的条件表达式拆分成多个条件表达式
- 比如一个很复杂的表达式，嵌套了好几层的if-else语句，将其转换为多个if语句，实现它的逻辑，这多条的if语句就是卫语句。

```js
if (statusCode === 200) {
    // success
} else {
    if (statusCode === 500) {
        // Internal Server Error
    } else if (statusCode === 400) {
        // Not Found
    } else {
        // Other error
    }
}


// 修改后的代码
if (statusCode === 500) {
    // Internal Server Error
}

if (statusCode === 400) {
    // Not Found
}

if (statusCode !== 200) {
    // Other error
}

```


> 条件判断的整理方式
```js
// 之前
if (country !== 'finland' &&
    country !== 'germany' &&
    country !== 'vietnam' &&
    country !== 'russia' &&
    type !== '💣'
) {
    return Promise.reject('Not available')
}

// 优化一次
const isInAvailableCountries = (
    country === 'finland' ||
    country === 'germany' ||
    country === 'vietnam' ||
    country === 'russia'
)

const hasBoom = type === '💣'

if (!isInAvailableCountries || hasBoom) {
    return Promise.reject('Not available')
}


// 最终
const availableCountries = ['finland', 'germany', 'vietnam', 'russia']

const isInAvailableCountries = availableCountries.includes(country)

const hasBoom = type === '💣'

if (!isInAvailableCountries || hasBoom) {
    return Promise.reject('Not available')
}
```


> 不可能的状态就让它不可能
- 易于理解
- 预防出现大量bug
- 停止使用类似于isLoading的布尔值

```js
isLoading: true
isError: false

isLoading: false
isError: true

// imposible states
isLoading: true
isError: true


// 改进后：
const LOADING_STATE = 'LOADING_STATE'
const ERROR_STATE = 'ERROR_STATE'

const state = LOADING_STATE

---

// 例子2
const [isLoading, setIsLoading] = React.useState(false)
const [error, setError] = React.useState(null)
const [coffee, setCoffee] = React.useState(null)

function handleButtonClick() {
    setIsLoading(true)
    setError(null)
    setCoffee(null)

    getCoffee('cappuccino', 'small', 'finland', true).then(coffee => {
        setIsLoading(false)
        setError(null)
        setCoffee(coffee)
    }).catch(error => {
        setIsLoading(false)
        setError(error)
    })
}

// 改进后
const state = {
    idle: 'idle',
    loading: 'loading',
    error: 'error',
    success: 'success',
}

const [error, setError] = React.useState(null)
const [coffee, setCoffee] = React.useState(null)
const [status, setStatus] = React.useState(state.idle) 

function handleButtonClick() {
    setStatus(state.loading)

    getCoffee('cappuccino', 'small', 'finland', true).then(coffee => {
        setStatus(state.success)
        setCoffee(coffee)
    }).catch(error => {
        setStatus(state.error)
        setError(error)
    })
}
```


> 参数个数太多，可以用对象代替
- 参数顺序无关紧要
- 方便传递可选参数

```js
function getBox(type, size, price, color) {}
getBox('carry', undefined, 10, 'red')


// 改进后：
function getBox(options) {
    const {type, size, price, color} = options
}

getBox({
    type: 'carry',
    price: 10,
    color: 'red'
})
```


> 使用Object.assign赋默认值
```js
unction getBox(options) {

    options.type = options.type || 'carry'
    options.size = options.size || 'small'
    options.price = options.price || 10
    options.color = options.color || 'red'

    const {type, size, price, color} = options
}

// 改进后
function getBox(customOptions) {

    const defaults = {
        type: 'carry',
        size: 'small',
        price: 10,
        color: 'red',
    }

    // customOptions 参数对象放在后面 有的话就覆盖默认的了
    const options = Object.assign(defaults, customOptions)

    const {type, size, price, color} = options
}
```

- 例子2:
```js
export function getCoffee(type, size, country, hasIce) {

    type = type || 'cappuccino'
    size = size || 'small'
    country = country || 'finland'
    hasIce = hasIce || false
}


// 用以下的3种方式 改进
function getCoffee(customOptions) {
    const defaultOptions = {
        type: 'cappuccino',
        size: 'small',
        country: 'finland',
        hasIce: false
    }

    const options = Object.assign(defaultOptions, customOptions)
}


function getCoffee(options = {}) {
    const {
        type = 'cappuccino',
        size = 'small',
        country = 'finland',
        hasIce = false
    } = options
}

function getCoffee({
    type = 'cappuccino', 
    size = 'small',
    country = 'finland',
    hasIce = false
} = {}) {
}
```


> 用对象字面量替换switch语句
```js
let drink
switch(type) {
    case 'cappuccino':
        drink = 'Cappuccino';
        break;
    case 'flatWhite':
        drink = 'Flat White';
        break;
    case 'espresso':
        drink = 'Espresso';
        break;
    default:
        drink = 'Unknown drink';
}


// 改进后
const menu = {
    'cappuccino': 'Cappuccino',
    'flatWhite': 'Flat White',
    'espresso': 'Espresso',
    'default': 'Unknown drink'
}

const drink = menu[type] || menu['default']
```

------

### 记忆函数
- 第一次调用函数 缓存参数或者函数的结果 在第二次调用的时候可以直接访问缓存的东西 因为我们拿到的是缓存的结果所以会提高性能优化的作用

- 比如: n的阶乘
```js
function factorial(n) {
    // 出口
    if(n ==0 || n == 1) return 1

    return * factorial(n-1);
}

console.time("factorial")
factorial(500)
console.timeEnd("factorial")
```

> 记忆函数
```js
let cache = {}
function factorialCache(n) {
    // 验证缓存
    if(cache[n]) {
        return cache[n]
    }

    // 缓存到cache上 出口
    if(n ==0 || n == 1) {
        return (cache[0] = cache[1] = 1)
    }

    // 缓存到cache的n上
    return cache[n] = n * factorial(n-1);
}
```

---

> 通用的记忆函数
- 
```js
function memorize(fn) {
    let cache = {}

    return function() {
        let key = fn.name + "_" + [].join.call(arguments, ",")

        return cache[key] = cache[key] || fn.apply(this, arguments)
    }
}

// 调用
let factorialMemorize = memorize(factorial)
factorialMemorize(5000)
```

---

> Promise.resolve 缓存后台数据
```js
  Promise.resolve('后盾人').then(value => {     // <resolved>
    console.log(value)
  })
```

有的时候我们在写单页面复应用的时候, 我们会在不同的组件里面可能会请求同一个数据, 既然是同一个数据 那么我希望走本地的缓存 不要反复的请求后台 减少请求次数 减少服务器的压力 前台用户的访问也会变快

```js
  // name 请求的用户 请求谁
  function query(name) {
    return ajax('url').then(user => {   // users就是请求的数据
      return user
    })
  }

  // 使用封装的query函数 请求 后盾人
  query('后盾人').then(user => {
    console.log(user)
  })


  // 现在有还有一个 1秒钟后的请求  但是 我不希望这个请求还要从后台读取 我希望它走缓存
  setTimeout(() => {
     query('后盾人').then(user => {
      console.log(user)
    })
  }, 1000)

```

我们先铺垫一个前提, 函数也是对象 我们也可以往函数中添加属性
```js
  // 1. 我们创建一个空函数, 
  function hd() {} 

  // 2. 函数也是对象, 所以也可以添加属性
  hd.site = 'slnn2080.com'
  console.dir(hd)   // 里面有我们添加的site属性
```

修改上面的函数
```js
  function query(name) {

    // 定义缓存 我们先看看函数中有没有定义的缓存 如果没有这个属性就给它加上 是一个map类型
    const cache = query.cache || (query.cache = new Map())
  
    // 每次取的时候 我们要检查一下 在我们的缓存中是否有这个数据 如果有直接返回出去
    if(cache.has(name)) {

      // 返出去一个成功状态的promise
      return Promise.resolve(cache.get(name))
    }

    return ajax('url').then(user => {   users就是请求的数据

      // 当我们取完数据的时候 就把数据压入map中
      cache.set(name, user)   // key就是name 值为user
      return user
    })
  }
```

走缓存了 实际上是没有发生异步请求的 因为return的是if里面的  

还有一个需要注意地方 因为下面的ajax的请求是异步的 需要花费时间, 所以直接走缓存的时候 还没有取到数据 所以我们再调用的时候, 要加个延时定时器 确保先取到数据 之后再走缓存

确保从后台拿完数据再走缓存
```js
  setTimeout(() => {
     query('后盾人').then(user => {
      console.log(user)
    })
  }, 1000)
```

---

### 整合对象
- 需求:
- 我们有 多个 数据数组 要整理成 一个 数组数组
- 要求: 
    - sam 的所有 num 属性收集在一起
    - erin 的所有 num 属性收集在一起

- 思路:
- 1. 将多个数据 整理成一个 对象数组
- 2. 使用filter()利用name 来找出同类别对象
- 3. 将filter()过滤的对象中的num属性 push到一个数组中

- 数据:
```js
let data1 = [
  { name: "sam", num: 1 },
  { name: "erin", num: 2 },
  { name: "nn", num: 3 },
]

let data2 = [
  { name: "sam", num: 5 },
  { name: "erin", num: 7 },
  { name: "nn", num: 9 },
]

let data3 = [
  { name: "sam", num: 11 },
  { name: "erin", num: 55 },
  { name: "nn", num: 99 },
]
```

- 要求数据格式:
```json
[
  { "name": "sam", "num": [1,5,11] },
  { "name": "erin", "num": [2,7,55] },
  { "name": "nn", "num": [3,9,99] }
]
```

> 实现方式1: 
- 封装函数的方式:
- 我们需要传入指定类别(sam), 和所有数据源:
```js
function getTotal(type, ...args) {
  let obj = {
    name: type,
    num: []
  };

  [].concat(...args).filter(item => item.name == type).forEach(item => obj.num.push(item.num))
  return obj
}


let data = getTotal("sam", data1, data2, data3)
console.log(data)
```


> 实现方式2:
- 整理成类的方式:
- 使用方式来讲跟上面没有太多的区别 但是整理成类的方式
```js
class Integrate {

  constructor(options) {
    let {type, source} = options

    this.arr = source.length > 0
      ? [].concat(...source)
      : []

    this.type = type
    this.data = this.get()
  }

  get() {
    let obj = {
      name: this.type,
      num: []
    }
    this.arr.filter(item => item.name == this.type).forEach(item => obj.num.push(item.num))

    return obj
  }
}

let {data: res1} = new Integrate({
  type: "sam",
  source: [data1, data2, data3]
})

let {data: res2} = new Integrate({
  type: "erin",
  source: [data1, data2, data3]
})

let {data: res3} = new Integrate({
  type: "erin",
  source: [data1, data2, data3]
})

let data = [res1, res2, res3]
console.log(data)
```


> 实现方式3:
- 上面我们整个几个数据 需要创建几个实例 下面统一进行处理
```js
class Integrate {

  constructor(options) {
    let {type, source} = options

    this.arr = source.length > 0
      ? [].concat(...source)
      : []

    this.type = [...type]
    this.data = this.get()
  }

  get() {

    let data = []
    this.type.forEach(name => {
      let obj = {}
      obj.name = name
      obj.num = []
      
      this.arr.filter(item => item.name == name).forEach(item => obj.num.push(item.num))
      data.push(obj)
    })

    return data
  }
}

// 这里的参数都需要整理成数组的形式
let {data} = new Integrate({
  type: ["sam", "erin", "nn"],
  source: [data1, data2, data3]
})

console.log(data)
```

----------------

### 将代码整理成json
- 需求:
- 用json的方式写代码

- 思路:
- 1. 将 要转成json的代码 写在script标签里面 <script data-target="content">
- 2. 获取该标签中的文本 利用 replace 进行正则匹配提取
- 3. 正则使用 m 模式

```html
<script data-target="content">
let ul = document.querySelector("ul")
let checkbox = document.querySelectorAll("[type='checkbox']")
let all = document.querySelector("#all")

let total = ul.querySelectorAll("[type='checkbox']")

checkbox.forEach(el => {
  el.addEventListener("click", function() {
    let checkeds = ul.querySelectorAll(":checked")
    all.checked = checkeds.length == total.length
  })
})
</script>

<script>
  let target = document.querySelector("[data-target='content']")
  let content = target.innerHTML
  console.log(content)

  let arr = []
  content.replace(/^(.+)$/gm, (content, s1) => {
    console.log(s1)
    arr.push(s1)
  })

  console.log(JSON.stringify(arr, null, 2))
</script>
```

----------------

### 给数组中的对象额外添加属性
- 思路:
- 1. 利用map()加工每一个对象
- 2. 利用 Object.assign() 方法给该对象添加属性 
- 3. 添加的属性 要整理成 对象的形式 {mode: true}

```js
let res = list.map(item => {
    return Object.assign(item, {mode: true})
})

let ret = list.map(item => {
    return {...item, mode: "nuxt"}
})
```

----------------

### reduce完成promise队列
- https://www.jianshu.com/p/aa6e6f2f9535
- https://www.freesion.com/article/6149611365/

```js
;[1, 2, 3, 4, 5].reduce((pre, cur) => {
return pre.then(() => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(cur)
        resolve()
    }, 1000)
    })
})
}, Promise.resolve())
```

- 在 JS_NODE 笔记里面 reduce() 方法的相关地方 我也总结了份使用方式 联合做下参考
```js
function handle1(res) {
  return new Promise(resolve => {
    resolve(res + 10)
  })
}

function handle2(res) {
  return new Promise(resolve => {
    resolve(res + 20) 
  })
}

function handle3(res) {
  return new Promise(resolve => {
    resolve(res + 30)
  })
}

let arr = [handle1, handle2, handle3]

let res = arr.reduce((promise, fn) => {
  return promise.then(fn)
}, Promise.resolve(10))

// 因为我们return出来的也是 promise
res.then(ret => console.log(ret))
```

- 示例2:
```js
let nums = []
const a1 = new Promise(res => {
    setTimeout(() => {
        nums.push(`a`)
        res(`a`)
    }, 2000)
})
const a2 = new Promise((res, rej) => {
    setTimeout(() => {
        nums.push(`a1`)
        res(`a1`)
    }, 2000)
})
const a3 = new Promise(res => {
    setTimeout(() => {
        nums.push(`a2`)
        res(`a2`)
    }, 2000)
})
const arr = [a1, a2, a3]
arr.reduce(async (pre, next) => {
    await pre
    return next
}, Promise.resolve()).then(res => {
    console.log(nums)
})
```

----------------

### 获取图片主色调 添加到背景中 (没事可以整理一下canvas mdn)
- https://mp.weixin.qq.com/s/fAXiE3cVnbGCOO3-37iWwg

> 要点:
- 我们要用的图片是通过 background 属性添加的 那怎么给这个容器一个宽高呢
- 1. 通过 padding-top 设置对应的百分比值
- 2. 通过新属性aspect-ratio (safari不支持)
```css
div{
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    /* 2:1 panding百分比值是相对于盒子的宽度的*/
    padding-top: 50%;
}
```

> 如何获取图片的主色呢？
- 借助Canvas的 ctx.getImageData() 方法。

> 要点:
- img元素对象.naturalWidth 
    - 获取图片的自然宽度 该宽度是图片本身的宽度 永远不会改变
    - width: 这个宽度可以通过css js来控制 本不是图片本身的宽度
```js
let imgSrc = "./img/img-1.png"
let imgNode = document.createElement("img")

imgNode.src = imgSrc

  imgNode.onload = () => {

    // js调整一下图片的大小
    imgNode.width = 100

    console.log(imgNode.width)          // 100
    console.log(imgNode.naturalWidth)   // 1094

  }
```

- 分一下几个步骤：
- 将图片绘制到一个canvas元素上
- 获取图像所有的rgba像素点
- 取某个区域颜色的均值，并找出这个区域最接近均值的rgba颜色，作为该区域的主色

```js
var imgSrc = "XXXXX"
const imgEle = document.createElement('img')
const canvas = document.createElement('canvas')
imgEle.src = imgSrc
imgEle.onload = () => {
    var ctx = canvas.getContext("2d");
    var naturalImgSize = [imgEle.naturalWidth, imgEle.naturalHeight];
    canvas.width = naturalImgSize[0];
    canvas.height = naturalImgSize[1];
    
    //绘制到canvas
    ctx.drawImage(imgEle, 0, 0);
    //获取imageData：rgba像素点
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const leftSectionData = []
    const rightSectionData = []
    const oneLineImgDataLen = canvas.width * 4;

    imgData.data.forEach((colorVal, i) => {
        if (i % onelineImgDataLen <= 0.5 * onelineImgDataLen || i % onelineImgDataLen >= 0.6 * onelineImgDataLen) {
            const inLeft = i % onelineImgDataLen <= 0.5 * onelineImgDataLen
            if (i % 4 === 0) {
                // 获取rgb均值
                const curAverageRGB = (imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3;
                let leftOrRightRef = inLeft ? leftSectionData : rightSectionData;
                //每个数组里存四个值：本颜色值中的r、g、b的均值，以及r、g、b三个值。
                //均值一方面用于累加计算本区域的整体均值，然后再跟每个均值对比拿到与整体均值最接近的项的索引，再取该数组里的后三个值：rgb，对应着颜色
                leftOrRightRef[leftOrRightRef.length] = [curAverageRGB, imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]]
            }
        }
    })
    //generate average rgb
    const averageOfLeft = Math.round(leftSectionData.reduce((_cur, item) => {
        return _cur + item[0]
    }, 0) / leftSectionData.length)
    const averageOfRight = Math.round(rightSectionData.reduce((_cur, item) => {
        return _cur + item[0]
    }, 0) / rightSectionData.length)
    //find the most near color
    const findNearestIndex = (averageVal, arrBox) => {
        let _gapValue = Math.abs(averageVal - arrBox[0])
        let _nearColorIndex = 0
        arrBox.forEach((item, index) => {
            const curGapValue = Math.abs(item - averageVal)
            if (curGapValue < _gapValue) {
                _gapValue = curGapValue
                _nearColorIndex = index
            }
        })
        return _nearColorIndex
    }

    const leftNearestColor = leftSectionData[findNearestIndex(averageOfLeft, leftSectionData)]
    const rightNearestColor = rightSectionData[findNearestIndex(averageOfRight, rightSectionData)]
    console.log(leftNearestColor,rightNearestColor)
}
```

- 取到颜色，实现元素的渐变：
```js
element.style.backgroundImage = `url("XXXX"),linear-gradient(90deg,rgba(${leftNearestColor[1]},${leftNearestColor[2]},${leftNearestColor[3]},1) 0%,rgba(${rightNearestColor[1]},${rightNearestColor[2]},${rightNearestColor[3]},1) 100%`

```

----------------

### query参数的提取: a=1&b=2&c=3
- 将上面的键值对组成一个对象
- 如果有同名的key 就会放到一个数组中

```js
let str = "a=1&b=2&c=3&c=10&c=20"

function parseQueryStr(str) {
  // 检查
  if(!str || !str.length) return {}

  let obj = {}

  // 整理成 [a=1, b=2]
  str.split("&").forEach(item => {

    // 整理成[["a", "1"], ["b", "2"]]
    let [key, value] = item.split("=")

    // 如果obj中有 
    if(obj[key]) {
      
      // 那么就要检查其值是不是已经是数组 如果已经是 则push追加
      if(Array.isArray(obj[key])) {
        obj[key].push(value)

      // 如果不是数组 那么组织成数组的形式 添加新值
      } else {
        obj[key] = [...obj[key], value]
      }
    // 如果obj中没有 那么就组织成 a: 1 
    } else {
      obj[key] = value
    }
  })

  return obj
}

let res = parseQueryStr(str)
console.log(res)
```

- 这段代码很容易看出来就是做 query string 的 parse 的，会把 'a=1&b=2&c=3' 的字符串 parse 成 { a: 1, b: 2, c: 3 } 返回。如果有同名的 key 的话，就合并到一个数组里。

------

> url参数有编码的案例

```js
    let str = "?q=%E6%98%A5%E8%8A%82"
    let str2 = "?q=春节"

    const handleQuery = (url, obj={}) => {

      let reg = /[%]/g
      if(url.match(reg) != null ) {
        url = decodeURI(url)
      }
      
      url.substr(1).split("&").map(item => {
        let arr = item.split("=")
        obj[arr[0]] = arr[1]
        return obj
      })
      
      return obj
    }

    let res = handleQuery(str2)
    console.log(res)
```

----------------

### 填写的数据 跳转页面消失
- 解决方法:
- 1. 返回按钮使用window.history.back(-1)
- 这样是回到浏览器的记忆堆中的上一个页面，可以保留数据

- 2. 在原来的页面中点击链接的时候可以重新打开一个窗口
- 可以用window.open()，或者window.showModelDialog()，

- 3. 自定义弹出层，覆盖到你的页面上，下面放个半透明层

- 4. 引入缓存，比如memcache，将内容保存到缓存中，返回时，从缓存中取信息，如果非空，则初始化页面中

- 5. 借助应用服务器自身的session机制

----------------

### 点击对话框以外的部分关闭对话框
- 需求
- 我们可以对话框外面的部分加了一层蒙版
- 我们点击蒙版的时候 会关闭对话框 而不要点击对象框也会关闭对话框

> 要点:
- e.target
- 是绑定对象内的子元素 点什么是什么

- e.currentTarget
- 是绑定事件的这个对象 相当于this

```html
<body class="body-wrap">
  <div class="model">

  </div>

  <script>
    let target = document.querySelector(".body-wrap")
    target.addEventListener("click", function(e) {
      console.log(e.target)
      console.log(e.currentTarget)

      console.log(e.currentTarget == this)
    })
  </script>
</body>
```

----------------

### forEach解决异步问题
- 这里面也涉及了很多的知识点

- 比如:
- forEach的重写
- sleep函数的定义
- 相关的知识点的介绍等等

- 首先我们先说说 ajax异步请求 和 同步代码之间的问题:
- 比如:
- 我们现在要请求ajax ajax是一个异步的请求 一旦出现下面的逻辑 同步的代码会先执行 我们拿不到对应的结果

- 以下都是伪代码
```js
const data = ajax("url", (data) => {
    return data
})

console.log(data)       // 这里一定是 null 或者 undefined

// 模拟下
setTimeout(() => {
  console.log("我是后台请求的数据")
}, 1000)

console.log("主线程")
```

- 那怎么才能同步的拿到代码呢？ 

> 方式1: 我们将 ajax请求 变为同步的
- async: false 我们通过配置项 将async设置为false
```js
 const data = ajax("url", {
   async: false
 }, () => {
  return data
})

console.log(data)       // 这样一定能拿到结果
```

- 但是又引发了另一个问题 ajax是同步的了 就意味着它会阻塞下面的代码执行 必须等着它拿到结果后 才会执行下面的代码 就意味了 除了我们想同步获取data的console语句 它下面的语句也会变为阻塞状态

```js
 const data = ajax("url", {
   async: false
 }, () => {
  return data
})

console.log(data)

// 123会被阻塞
console.log(123)
```

- 而逻辑中 123 是没必要被阻塞的 或者说 我们还想让 123 和 ajax之间是异步的关系
- 也就是 console.log(data) 和 ajax 是一个部分 123 自己是一个部分

- 那怎么解决呢？
- Promise Promise可以把异步和同步分开
- 比如:
```js
function test() {
    return Promise(resolve => {
        ajax("url", (data) => {
            // 我们在获取到data的时候 将data传出去
            resolve(data)
        })
    })
}

// 这样 我们可以在then里面 拿到传过来的结果
test().then((res) => {
  console.log(res)
})


console.log(123)

```

- 从上面的代码我们可以发现 ajax请求 和 获取data的逻辑还是同步的
- 因为只有调用test().then 才能到到结果

- 而和123的逻辑之间仍然是异步的 这就是将 逻辑分开了 分成了两个部分

- 而我们还可以对上面的函数 做一层封装 使用 async await 
```js
const getData = async () => {
    const data = await test()
    console.log(data)
}
getData()

console.log(123)

---

const query = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("我是后台请求回来的数据")
    }, 1000)
  })
}

(async () => {
  let res = await query()
  console.log(res)
})()

console.log("我是主线程的代码")
```

- 我们会发现上面的同步和异步更加的清晰了 ajax和获取data是同步的 而getData()函数是async和下面123还是异步的

---

> 面试题:
```js
fun(
    [
        () => console.log("start"),
        () => sleep(1000),
        () => console.log("1"),
        () => sleep(2000),
        () => console.log("2"),
        () => sleep(3000),
        () => console.log("end")
    ]
)
```

> 需求:
- 要求1:
- 写出fun函数 sleep函数 要求按顺序 按效果的依次输出结果

- 要求2:
- 使用forEach可以办到同样的事情么？

- 解析:
- 这道题的考点就是同步化解决方案 而同步化最常见的方案就是 promise async

- 我们先看看要求1

> 1. 定义 sleep 函数
```js
function sleep(ms) {
    return Promise(resolve => {
        setTimeout(resolve, ms)
    })
}
```

> 2. 定义 fun 函数
- 使用普通for循环
```js
async function fun(arr) {
    for(let i=0; i<arr.length; i++) {
        // 调用函数前都用await 等一等 等待异步函数执行完后 再进行下面的逻辑
        await arr[i]()
    }
}
```

> 整理下:
```js
const sleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const fun = async (arr) => {
  for(let i=0; i<arr.length; i++) {
    arr[i]()
  }
}

fun(
  [
      () => console.log("start"),
      () => sleep(1000),
      () => console.log("1"),
      () => sleep(2000),
      () => console.log("2"),
      () => sleep(3000),
      () => console.log("end")
  ]
)
```

> 这里查下扩展 delay函数
```js
function delay(init = 0) {
    return new Promise(resolve => {
        let timer = setTimeout(() => {
            clearTimeout(timer)
            resolve()
        }, init)
    })
}

async handleChange(e) {
    let file = e.raw
    if(!file) return

    this.show = false
    let loadingIntance = Loading.service({
        ...
    })

    await delay(100)
    let data = await readFile(file)
}
```


> forEach无法办到和普通for循环的原因
- 上面我们使用了for循环来完成了操作 那我们把for循环换成forEach可以么？
```js
async function fun(arr) {
    arr.forEach(async (fn) => {
        await fn()
    })
}
```

- 不行
- 我们发现是一次性的出现所有的结果 没有办法按效果(延迟)按顺序的输出

- 原因:
- 我们可以从mdn上观察forEach的原码 简单的说 源码里面利用while循环 每次在循环的最后会执行callback 也就是forEach中的第一个参数

- 也就是说 每一次循环会重新执行一次 回调 而不是在一个async函数里面一次性执行所有的逻辑 相当于作用域分开了 也就是每一次执行async函数 然后在await

- 我们要想完成同步化的解决方案 必须是这样的形式 一个async中包含了 异步代码 通过await来解决
```js
async function test() {
  await
  await
  await
}
```

- 但现在是forEach每一个循环会调用callback 变成如下的格式了
- 每一个回调里面的await没办法和其他的await形成同步的关系了async之间都是异步的
```js
async fn => {
  await fn()
}

async fn => {
  await fn()
}

async fn => {
  await fn()
}
```

- 那怎么解决 我们需要重写forEach方法
```js
Array.prototype.myForEach = async function(callback, thisArg ) {
  // 第二个参数是this指向

  // 我们先把this保存一下 谁调用的forEach
  const _arr = this

  const _isArray = Array.isArray(_arr)

  const _thisArg = thisArg ? Object(thisArg) : window

  // 调用者如果不是arr就抛出异常
  if(!_isArray) {
    throw new TypeError("必须是一个数组")
  }

  // 这里还是使用普通for循环的方式 整个函数是async
  
  for(let i=0; i<_arr.length; i++) {
    // 让callback本身是一个同步的执行流程
    await callback.call(_thisArg, _arr[i], i, _arr)
  }
}
```

----------------

### 函数的柯里化 和 重写toString()
**要点:**
- 箭头函数里面没有 arguments
```js
const fn = () => {
  console.log(arguments)
}
fn(1)   // 会报错
```

> 下面的代码 我们从 3 2 1 的顺序开始倒推
```js
function add() {

  // add(1) 传递进来的实参会在这个arguments里面
  console.log(arguments)  // 1

  let args = [...arguments]
  

  // 3. 定义 fn
  function fn() {
    // add(1)(2)传递进来的实参会在这个arguments里面
    console.log(arguments)  // 2

    // 这里我们可以将接到的参数 push到args中 同时 继续return fn 这样 add(1)(2)(3) 的3 还会被arguments接受并push到args数组中
    args.push(...arguments)
    return fn
  }


  // 2. 改写对象身上的toString()
  fn.toString = function() {
    let res = args.reduce((pre, item) => pre + item, 0)
    console.log(res)
  }

  // 1. 只有对象上才有toString方法 所以我们return 一个对象 并改写对象身上的toString()
  return fn
}

add(1)(2)(3).toString()
/*
  add(1) 调用的是 add() 拿到的是add()的返回值 fn
  add(1)(2) 调用的是 add()的返回值fn => fn(2) 
*/
```

----------------

### 提取query参数

> 方式1
- 利用正则提取出来 name=sam 的结果集
```js
let url = "?name=sam&age=54&na=dd"

// 然后整理到一个对象里面
let obj = {}
url.match(/\w+=\w+/ig).forEach(item => {
    let arr = item.split("=")
    obj[arr[0]] = arr[1]
})

---

let query = "?name=sam&age=54&na=dd"

let reg = /\w+=\w+/g
let matched = query.match(reg)
console.log(matched)  // [ 'name=sam', 'age=54', 'na=dd' ]

let res = matched.map(item => item.split("="))
console.log(res)
// [ [ 'name', 'sam' ], [ 'age', '54' ], [ 'na', 'dd' ] ]

// 利用这个api
res = Object.fromEntries(res)
console.log(res)
// { name: 'sam', age: '54', na: 'dd' }

---

// 还可以整理成1行 但可读性不高
let res = Object.fromEntries(query.match(reg).map(item => item.split("=")))
```


> 方式2
```js
let query = "?name=sam&age=54&na=dd"

let search = new URLSearchParams(query)
console.log(search.get("na"))
```

----------------

### 前后台时postman报错 编辑器报错
- 在日常的开发过程中 我们发送请求的数据的时候 有的时候会将js对象转成json
- 那什么时候需要将js对象转成json呢？

- 场景:
- 有一个人测试 传对象类型的数据到后台 在编辑器里面就不会报错 但是他用postman去测试就会报错
```js 
    Content-type: application/json
```

> 为什么呢？
- 因为编辑器或请求框架(ajax axios jquery) 对数据进行了处理


> 第一种情况: 请求头不指定格式
- 请求数据不指定格式, 默认就是(application/x-www-form-urlencoded)
- 看看后端接收参数是啥样子
```js 
    {"object Object": ""}
```


> 第二种情况: 请求头指定为json格式
```js  
    application/json
    xhr.setRequestHeader("Content-Type": "application/json")

    // 这里同时还要设置 我们传递的数据是json类型 json.stringify
```

- 也就是说当我们指定了请求头的格式的为json的时候 我们发送的数据的格式也必须是json
- 如果不指定的话 *默认就是 x-www-form-urlencoded*

--- 

> postman中参数的类型有
- form-data
- x-www-form-urlencoded
- raw
- binary
- graphql

> raw：
- 这种方式也可以成为json提交, 可能每种参数类型对应的 contentType类型 是不一样的
- 使用的是纯字符串上传的方式 所以在post之前可能需要将json格式的数据转换为字符串

```js 
    contentType: "application/json"
    data: JSON.stringify({
        org,
        msg
    })


    // 而 form-data 的方式就是 key-value 的提交，数据其实是分割的
```

- 比如 我选择了 raw 
- 后面的类型选择text 那么请求头中的 Content-Type: text/plain
- 后面的类型选择json 那么请求头中的 Content-Type: application/json

---

> 设置 contentType 的方式
- "Content-Type" : "application/json"

- 用于定义用户的浏览器或相关设备如何显示将要加载的数据，或者如何处理将要加载的数据，此属性的值可以查看 MIME 类型。

- MIME:
- 是描述消息内容类型的因特网标准。MIME 消息能包含文本、图像、音频、视频以及其他应用程序专用的数据。

- content-type 一般以下面的形式出现：
- Content-Type: [type]/[subtype];parameter

> type 有下面的形式：
- Text：
- 用于标准化地表示的文本信息，文本消息可以是多种字符集和或者多种格式的；
- 
- Multipart:
- 用于连接消息体的多个部分构成一个消息，这些部分可以是不同类型的数据；

- Application
- 用于传输应用程序数据或者二进制数据；

- Message:
- 用于包装一个E-mail消息；

- Image:
- 用于传输静态图片数据；

- Audio
- 用于传输音频或者音声数据；

- Video
- 用于传输动态影像数据，可以是与音频编辑在一起的视频数据格式。

> subtype
- 用于指定 type的详细形式。“type/subtype”配对的集合和与此相关的参数。下面是最经常用到的一些 MIME 类型：
- text/html（HTML 文档）；
  text/plain（纯文本）；
  text/css（CSS 样式表）；
  image/gif（GIF 图像）；
  image/jpeg（JPG 图像）；
  application/x-javascript（JavaScript 脚本）；
  application/x-shockwave-flash（Flash）；
  application/x- www-form-urlencoded（使用 HTTP 的 POST方法提交的表单）；
  multipart/form-data（同上，但主要用于表单提交时伴随文件上传的场合）。


> enctype属性
- 规定在发送到服务器之前应该如何对表单数据进行编码，默认的表单数据会编码为 "application/x-www-form-urlencoded"
- enctype的属性值有

- 1. application/x-www-form-urlencoded
   在发送前编码所有的字符
   这应该是最常见的 POST 提交数据的方式了。浏览器的原生
   表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。

```js
    Content-Type: application/x-www-form-urlencoded;charset=utf-8
    title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```
- 提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式很好的支持，常用的如jQuery中的ajax请求，Content-Type 默认值都是「application/x-www-form-urlencoded;charset=utf-8


- 2. multipart/form-data
   不对字符编码 在使用包含文件上传控件的表单时 必须使用该值
   这也是常见的post请求方式，一般用来上传文件，各大服务器的支持也比较好。所以我们使用表单 上传文件 时，必须让

- 表单的enctype属性值为 multipart/form-data.
- 注意：
- 以上两种方式：application/x-www-form-urlencoded和multipart/form-data都是浏览器原生支持的。


- 3. application/json    ---   它可能对应的就是 raw

- application/json作为响应头并不陌生，实际上，现在很多时候也把它作为请求头，
- 用来告诉服务端消息主体是序列化的JSON字符串，除了低版本的IE，基本都支持。除了低版本的IE都支持JSON.stringify()的方法，服务端也有处理JSON的函数，使用json不会有任何麻烦。

   
- 4. text/plain
- 空格转换为"+"加号，但不对特殊字符编码

> postman中 post请求的 form-data、 x-www-form-urlencoded、 raw、 binary 的区别

> form-data:
- 等价于http请求中的multipart/form-data,它会将表单的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。

- 当上传的字段是文件时，会有Content-Type来表名文件类型；content-disposition，用来说明字段的一些信息

- 由于有boundary隔离，所以multipart/form-data既可以上传文件，也可以上传键值对，它采用了键值对的方式，所以可以上传多个文件。


> x-www-form-urlencoded:
- 等价于application/x-www-from-urlencoded,会将表单内的数据转换为键值对，比如,name=java&age = 23


> raw
- 可以上传任意格式的文本，可以上传text、json、xml、html等


> binary
- 相当于Content-Type:application/octet-stream,
- 从字面意思得知，只可以上传二进制数据，通常用来上传文件，由于没有键值，所以，一次只能上传一个文件。


> MIME 类型
- MIME 类型是一种文本标记，表示一种*主要的对象类型和一个特定的子类型*，中间由一条斜杠来分隔。

----------------

### 通过创建类 实例化该类的时候 自动给指定元素添加特殊的功能
```js
// app.js
window.addEventListener("load", () => {
  new Scroll();
  new EnviromentLinkChange();
});


// util.js
import SweetScroll from "sweet-scroll";

// 创建类的目的就是 当new该类的时候 页面上的元素就是自动的添加一些功能
export default class Scroll {
  constructor() {
    this.eventBind();
  }

  eventBind() {
    new SweetScroll({
      trigger: "a[href^='#']",
      offset: -110,
    });
  }
}

```

----------------

### requestAnimationFrame API
### 分页逻辑 分页渲染结构

> 后端逻辑
- 后端逻辑： 组织好10w+数据 返回给前端

```js
const http = require("http)
http.craeteServer((req, res) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type'
    })

    let list = []
    let num = 0

    for(let i=0; i<100000; i++) {
        num++
        list.push({
            src: "一张图片",
            text: `我是${num}号选手`,
            id: num
        })
    }

    res.end(JSON.stringify(list))
}).listen(3000, () => {
    console.log("server is listening on 3000 port")
})
```

> 前端逻辑
- AJAX获取请求数据 封装强求函数

```js
const getList = () => {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest()
        ajax.open("get", "http://127.0.0.1:3000")
        ajax.send()
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                resolve(JSON.parse(ajax.responseText))
            }
        }
    })
}
```

> 直接渲染方法
- 将我们从后端获取的10w条数据一次性的渲染到页面上 (非常耗时)
- 封装渲染结构的函数

```js
const renderList = async () => {
    const list = await getList()
    list.forEach(item => {
        const div = document.createElement("div")
        div.className = "xxx"
        div.innerHTML = `<img src="${item.src}"><span>${item.text}</span>`
        container.appendChild(div)
    })
}

renderList()
```


> setTimeout分页渲染
- 定义变量:
- 1. 总数据的条数 
        -- *total*: list.length

- 2. 自定义每页显示条数 变量 
        -- *limit*: 200

- 3. 自定义当前页 变量(初始值) 
        -- *page*: 0

- 4. 总页数(总数据条数/每页显示条数) 
        -- *totalPage*: Math.ceil(total / limit)


- 渲染逻辑:
- 定义分页渲染函数
- 利用递归 循环渲染 递归的退出条件 当前页 >= 总页数
- 开启定时器 0秒间隔 分批渲染

- 第一次渲染前200条 第二次渲染后200条

```js
const renderList = async () => {
    const list = await getList()
    const total = list.length
    const page = 0
    const limit = 200
    const totalPage = Math.ceil(total/limit)

    const render = page => {
        if(page >= total) return
        setTimeout(() => {
            for(let i = page * limit; i  < page * limit + limit; i++) {
                const item = list[i]
                const div = document.createElement('div')
                div.className = 'sunshine'
                div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
                container.appendChild(div)
            }

            render(page + 1)
        }, 0)
    }

    render(page)
}
```


> requestAnimationFrame 渲染
- 使用requestAnimationFrame代替setTimeout，减少了重排的次数，极大提高了性能，建议大家在渲染方面多使用requestAnimationFrame

```js
const renderList = async () => {
    console.time('列表时间')
    // 获取数据
    const list = await getList()

    // 总数据条数
    const total = list.length

    // 当前页码
    const page = 0

    // pageSize: 一页显示多少条
    const limit = 200

    // 一共有多少页
    const totalPage = Math.ceil(total / limit)

    // 创建渲染函数
    const render = (page) => {
        // 如果页码比总页数大 则停止 递归的停止条件
        if (page >= totalPage) return

        // 使用requestAnimationFrame代替setTimeout 传入回调 该回调会在重绘前执行
        requestAnimationFrame(() => {

            // 循环 分页
            for (let i = page * limit; i < page * limit + limit; i++) {

                // 每一个
                const item = list[i]

                const div = document.createElement('div')
                div.className = 'sunshine'
                div.innerHTML = `
                    <img src="${item.src}" />
                    <span>${item.text}</span>
                `

                container.appendChild(div)
            }

            // 递归调用
            render(page + 1)
        })
    }
    render(page)
    console.timeEnd('列表时间')
}
```

> 文档碎片 + requestAnimationFrame
- 文档碎片的好处:

- 1. 之前都是每次创建一个div标签就appendChild一次，但是有了文档碎片可以先把1页的div标签先放进文档碎片中，然后一次性appendChild到container中，这样减少了appendChild的次数，极大提高了性能

- 2. 页面只会渲染文档碎片包裹着的元素，而不会渲染文档碎片

```js
const renderList = async () => {
    console.time('列表时间')
    const list = await getList()
    console.log(list)
    const total = list.length
    const page = 0
    const limit = 200
    const totalPage = Math.ceil(total / limit)

    const render = (page) => {
        if (page >= totalPage) return
        requestAnimationFrame(() => {

            // 创建一个文档碎片
            const fragment = document.createDocumentFragment()

            for (let i = page * limit; i < page * limit + limit; i++) {
                const item = list[i]
                const div = document.createElement('div')
                div.className = 'sunshine'
                div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`

                // 先塞进文档碎片
                fragment.appendChild(div)
            }

            // 一次性appendChild
            container.appendChild(fragment)
            render(page + 1)
        })
    }
    render(page)
    console.timeEnd('列表时间')
}
```

> vue3 + ts
- 备用吧

```html
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
const getList = () => {
  // 跟上面一样的代码
}

const container = ref<HTMLElement>() // container节点
const blank = ref<HTMLElement>() // blank节点
const list = ref<any>([]) // 列表
const page = ref(1) // 当前页数
const limit = 200 // 一页展示
// 最大页数
const maxPage = computed(() => Math.ceil(list.value.length / limit))
// 真实展示的列表
const showList = computed(() => list.value.slice(0, page.value * limit))
const handleScroll = () => {
  // 当前页数与最大页数的比较
  if (page.value > maxPage.value) return
  const clientHeight = container.value?.clientHeight
  const blankTop = blank.value?.getBoundingClientRect().top
  if (clientHeight === blankTop) {
    // blank出现在视图，则当前页数加1
    page.value++
  }
}

onMounted(async () => {
  const res = await getList()
  list.value = res
})
</script>

<template>
  <div id="container" @scroll="handleScroll" ref="container">
    <div class="sunshine" v-for="(item) in showList" :key="item.tid">
      <img :src="item.src" />
      <span>{{ item.text }}</span>
    </div>
    <div ref="blank"></div>
  </div>
</template>
```


> requestAnimationFrame(callback)
- https://wangdoc.com/javascript/bom/window.html#windowgetcomputedstylewindowmatchmedia

- 这个函数要是想执行动画都是利用了递归

- API详解:
- window.requestAnimationFrame()方法跟setTimeout类似
- 都是推迟某个函数的执行。不同之处在于，setTimeout必须指定推迟的时间，

- window.requestAnimationFrame()则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。

<!-- 
    重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，
    比如网页切换到后台 Tab 页时，
    
    requestAnimationFrame()会暂停执行。

    如果某个函数会改变网页的布局，一般就放在window.requestAnimationFrame()里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。
 -->

- window.requestAnimationFrame()的*返回值是一个整数*，
- 这个整数可以传入*window.cancelAnimationFrame()*，用来取消回调函数的执行。

```js
var element = document.getElementById('animate');
element.style.position = 'absolute';

var start = null;

// callback 的参数(timestamp)是 高精度时间戳 表示距离网页加载的时间。
function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;

  // 元素不断向左移，最大不超过200像素
  element.style.left = Math.min(progress / 10, 200) + 'px';

  // 如果距离第一次执行不超过 2000 毫秒，  就继续执行动画
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

----------------

### 交换数组中元素的位置

> 方式1:
- 利用 解构
```js
let arr = [
    {id:1, name: "1"},
    {id:2, name: "2"},
    {id:3, name: "3"},
]

let [item1, item2, item3] = arr
let newArr = [item3, item1, item2]

console.dir(newArr);
```
 
> 方式2:
- 利用 位运算
- 位运算只能交换整数

- 要点:
- 1. num1 ^ num2 ^ num1 = num2的值 3个数结果跟最少的那个一样

    num1 ^ *num2* ^ num1 = *num2*

- 2. 我们把两个数的 ^ 结果保存起来

    let temp = num1 ^ num2

```js
let [num1, num2] = [1, 2]

let temp = num1 ^ num2

num1 = temp ^ num1
num2 = temp ^ num2

let arr = [num1, num2]
console.log(arr)    // [ 2, 1 ]
```

----------------

### 将数组中的元素 插入数组中指定的位置
```js 
    let arr = [
      {id:1, name: "sam"},
      {id:2, name: "erin"},
      {id:3, name: "nn"},
    ]

    /**
     * @id: 根据id找出要移动的元素
     * @delIndex: 将要 要移动的元素删除
     * @targetIndex: 将目标元素 移动到哪个元素的前面
     * @arr: 要操作的数组
    */
    function changeEl(id, delIndex, targetIndex, arr) {
      let obj = arr.find((item) => {
        return item.id == id
      })

      arr.splice(delIndex, 1)
      arr.splice(1, 0, obj)
      return arr
    }

    changeEl(3, 2, 1, arr)
    console.table(arr);
```

----------------

### once 实现原理

> 要点:
- 1. 我们要解决 this 的问题 也就是给谁绑定的回调 this 就应该是谁 所以这里我们最好不要用 箭头函数

- 2. 利用 节流阀 的原理 来实现 once 操作

- 3. btn.onclick = once(handle, "hello") 由于 once() 加上了小括号 所以它一上来就会调用 这是函数的形式调用 所以once()里面的this 是window

- 4. 上面说了 once() 会自调用 所以我们要return 一个函数 将这个函数交给 onclick 作为回调 这时这个内部函数中的this 就是元素
 
- 5. once(callback) 的第一个参数是一个回调 我们要将this传递给这个回调 同时考虑传递多个参数的问题 我们使用的是 fn.apply()

```js 
let btn = document.querySelector("div")

function once(fn, ...args) {

  // 节流阀
  let flag = true

  // window
  console.log(this)

  return function() {
    if(flag) {
      // 这个是onclick的回调 所以这里的this是元素
      console.log(this)

      // 关闭节流阀
      flag = false

      // 解决this的问题
      fn.apply(this, args)
    }
  }
}


// 指定回调
function handle(param) {
  console.log(param)
}

// 实现
btn.onclick = once(handle, "hello")
```

----------------

### 合并数组
> 方式1:
```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

let arr = [...arr1, ...arr2]
console.log(arr)    // [ 1, 2, 3, 4, 5, 6 ]
```

> 方式2:
```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

let arr = [].concat(arr1, arr2)
// 或者
let arr = Array.prototype.concat.call([], arr1, arr2)
console.log(arr)
```

> 方式3:
- 我怎么觉得这样的方式好别扭
```js
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

Array.prototype.push.apply(arr1, arr2)
arr1.push.apply(arr1, arr2)
```

----------------

### reduce的请求技巧 等待上一个请求完成后 再请求下一个
- 在node爬虫里面遇到的问题
```js
const host = "https://www.dydytt.net"
const uri = "/html/gndy/rihan/list_6_2.html"

// 创建 请求完整路径的数组
let pageArr = []

// 循环加工 完整的请求路径
for(let i=1; i<= 100; i++) {
  pageArr.push(host + `/html/gndy/rihan/list_6_${i}.html`)
}

// 这个arr中装着一个分类下所有的电影页面
console.log(pageArr)


// 我们要请求 pageArr 中的每一项 但是我们需要的是 在一个请求结束后再进行下一个请求
pageArr.reduce((promise, url) => {
  return promise.then(() => {
    return new Promise(async (resolve) => {
      await req(url)
      resolve()
    })
  })
}, Promise.resolve())
    // 这种方式会等待上一个req请求完成后 再执行下一个请求
    // promise参数就是我们的默认值 Promise.resolve()
```

----------------

### JavaScript 循环中使用 async/await

> 按顺序读取Promise
- 假设有一个文件列表，我们想按顺序读取并记录每个文件的内容。怎么做呢？我们可以在异步函数中使用for ... 循环。请看代码片段

```js
async function printFiles () {
  let fileNames = ['picard', 'kirk', 'geordy', 'ryker', 'worf'];
  for (const file of fileNames) {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }
}
```
**注意:**
- 如果你想按顺序读取文件，则不能使用forEach循环。



```js
async function someFunction(items) {
  items.forEach( async(i) => {
     const res = await someAPICall(i);
     console.log('--->', res);
  });
}
function someAPICall(param) {
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve("Resolved" + param)
      },param);
    })
}
someFunction(['3000','8000','1000','4000']);
```

- 在上面的代码中，有一个名为someFunction的简单异步函数，它接受数组作为参数，迭代该数组并为每个数组项发出API请求（通过一个假的API函数哈哈）。此时，我们希望按顺序解析API调用。希望输出打印的内容如下所示：
<!-- 
// 预期输出
3000
8000
1000
4000
 -->

- 但实际上，我们看到的不是这样的输出，而是以下结果
<!-- 
// 实际输出
1000
3000
4000
8000
 -->

- forEach循环不是按顺序进行API调用，而是一个接一个连续地调用API，中间不等待前一个调用完成。这就是为什么我们得到的是第一次解析的promise。这也是我们不使用forEach循环的主要原因。

- 相反，我们可以使用reduce函数来遍历数组并按顺序解析promise。来看下面这个例子。

```js
function testPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Processing ${time}`);
      resolve(time);
    }, time);
  });
}

let result = [3000,2000,1000, 4000].reduce( (accumulatorPromise, nextID) => {
  return accumulatorPromise.then(() => {
    return testPromise(nextID);
  });
}, Promise.resolve());

result.then(e => {
  console.log("All Promises Resolved !!✨")
});
```

> 并行解析Promise
- 接下来，让我们看看如何并行解析promise。回到第一个例子。现在我们想要并行读取，而不是按顺序读取文件。在这种情况下，我们不关心内容在控制台中的打印顺序。因此就可以将Promise.all()函数与map一起使用。

```js
async function printFiles () {
  let fileNames = ['picard', 'kirk', 'geordy', 'ryker', 'worf'];
  await Promise.all(fileNames.map(async (file) => {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }));
}
```

- 每个async回调函数调用都会返回一个promise，我们将它们保存起来，并与Prmiss.all()并行地一次性进行解析。

----------------
    
### 判断空对象
> 方式1: JSON.stringify(oo)
> 
```js
let oo = {}
oo = JSON.stringify(oo)     // '{}'
```

> 方式2: Object.keys(oo).length == 0

----------------

### 有趣的数据结构遍历 启发
```js 
    let before = {
      Vmmare: ["128.203.64", "128.2.1.2"]
    }

    let handler = []

    !function(before, handler) {
      let obj = {}
      for(let key in before) {
        obj.value = key
        obj.label = key
        obj.children = []
        before[key].forEach((item, index, arr) => {
          let childObj = {}
          childObj.value = arr[index]
          childObj.label = arr[index]
          obj.children.push(childObj)
        })
      }
      handler.push(obj)
      //return option
    }(before, handler)


    // 结果
    const option = [
      {
        value: "Vmmare",
        label: "Vmmare",
        children: [
          {
            value: "128.203.64",
            label: "128.203.64"
          },
          {
            value: "128.2.1.2",
            label: "128.2.1.2"
          },

        ]
      }
    ]


    // 类案例
    let data = [
      {
        type: "无类型",
        store: null,
        rule: null,
        relateCode: null,
        id: 35,
        projectId: 1,
        versionId: null,
        groupId: 4,
        primaryDomainId: "rdr_examiantion",
        primaryDomainName: "影像学检查",
        secondaryDomainId: "SBS",
        secondaryDomainName: "骨扫描",
        variableName: "数据抽取时间",
        variableCode: "EMGRPID",
        examSearchCode: 0,
        examIsQuantify: 0,
        valueType: "string",
        classificationFlag: false,
      },
      {
        type: "无类型",
        store: null,
        rule: null,
        relateCode: null,
        id: 34,
        projectId: 1,
        versionId: null,
        groupId: 4,
        primaryDomainId: "rdr_examiantion",
        primaryDomainName: "影像学检查",
        secondaryDomainId: "SBS",
        secondaryDomainName: "骨扫描",
        variableName: "就诊标识",
        variableCode: "VISITNUM",
        examSearchCode: 0,
        examIsQuantify: 0,
        valueType: "string",
        classificationFlag: false,
      },
    ]

    console.log("原始", data)

    function dataForamt(data) {
      let obj = {}
      let childObj = {}
      data.forEach(item => {
        obj.primaryDomainId = item.primaryDomainId
        obj.primaryDomainName = item.primaryDomainName
        obj.name = item.primaryDomainName
        obj.children = []

        childObj.secondaryDomainId = item.secondaryDomainId
        childObj.secondaryDomainName = item.secondaryDomainName
        childObj.name = item.secondaryDomainName
        childObj.children = []

        obj.children.push(childObj)
        childObj.children.push(item)
      })

      return obj
    }

    let res = dataForamt(data)
    console.log("修改", res);
```

----------------

### null和undefined 是否相等
```js
    console.log(null==undefined)
    //true

    console.log(null===undefined)
    //false
```

- 观察可以发现：null和undefined 两者相等，但是当两者做全等比较时，两者又不等。

> 原因：
- null： 
- Null类型，代表“空值”，代表一个空对象指针，使用typeof运算得到 “object”，所以你可以认为它是一个特殊的对象值。

- undefined： 
- Undefined类型，当一个声明了一个变量未初始化时，得到的就是undefined。

- 实际上，undefined值是派生自null值的，ECMAScript标准规定对二者进行相等性测试要返回true

----------------

### 随机生成字符串
- toString(36): 表示为由0-9, a-z组成的的36进制字符串。

```js 
    let res = getRandomString(48)
    console.log(res)
    console.log(res.length)

    let ret = Math.random().toString(36)
    console.log(ret)

    function getRandomString(n) {
        let str = '';

        // 循环拼接str直到指定位置
        while (str.length < n) {
            // 得到的是 0.xxx 所以要截取
            str += Math.random().toString(36).substr(2);
        }
        
        // 结果肯定是比指定位数多 所以这里只取指定位置
        return str.substr(str.length - n);
    }
```

----------------

### 滚动到底部
- 当一个盒子内部的内容增加的时候 并且超过该盒子的高度的时候 我们希望它自动滚动到底部
```js
    element.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
    });
```

```js
    let box = ...
    box.scrollTo({
        top: box.scrollHeight,
        behavior: "smooth"
    })
```

----------------

### 过渡效果 / 动画效果 监听事件:
> transitionend    /    animationend

> 绑定方式:
```js
le.addEventListener('transitionend', fn, false);
// 指定回调
function fn(){ ... };
```

**注意事项: 事件多次触发问题:**
- 1. 当存在多个属性过渡变化时，结束时会多次触发transitionend事件。
- 2. 在transiton动画完成前设置display:none，事件不会触发。
- 3. 当transition完成前移除transition一些属性时，事件也不会触发
- 4. 元素从display:none到block，不会有过渡，导致无法触发transitionend事件

> 示例:
```css
    .demo {
        width:100px;
        height: 100px;
        background-color: #ddc;
        transition: all 0.5s ease-out;
    }

    .w200 {
        width: 200px;
        background-color: #fef;
    }
```
```js
    var element = document.getElementById('demo')
    element.addEventListener('transitionend', handle, false)
    function handle(){
        alert('transitionend事件触发')
    }

    function change() {
        element.className = element.className === 'demo' ? 'demo w200': 'demo'
    }
```


> 解决方式:
- 元素从none到block，刚生成未能即时渲染，导致过渡失效。
- 所以需要主动触发页面重绘，刷新DOM。

- 页面重绘可以通过改变一些CSS属性来触发，例如：offsetTop、offsetLeft、offsetWidth、scrollTop等。

- 1. 通过定时器延迟渲染
```js
    function change() {
        element.className = element.className === 'demo' ? 'demo opt': 'demo'

        if(element.className === 'demo') {
            element.style.opacity = null
            button.innerHTML = '点击'
        } else {
            // 这
            setTimeout(function(){
                element.style.opacity = '1'
                button.innerHTML = '重置'
            },10)
        }
    }
```

- 2. 强制获取当前内联样式
```js 
function change() {
    element.className = element.className === 'demo' ? 'demo opt': 'demo'
    if(element.className === 'demo'){
                element.style.opacity = null
            button.innerHTML = '点击'
    } else {

        // 强制读取内联样式
        window.getComputedStyle(element, null).opacity
        element.style.opacity = '1'
        button.innerHTML = '重置'
    }
}
```

- 3、触发重绘刷新DOM
```js
function change() {
    element.className = element.className === 'demo' ? 'demo opt': 'demo'
    if(element.className === 'demo') {
                element.style.opacity = null
            button.innerHTML = '点击'
    } else {
        
        // 触发重绘
        element.clientWidth;
        element.style.opacity = '1'
        button.innerHTML = '重置'
    }
}
```

----------------

### new Image()宿主对象
> 生成图片的3中方式:
- 1. 方式一: 将 img标签字符串 填入body中 innerHTML方式
```js 
    function a() {
        document.getElementById("d1").innerHTML = "<img src='http://baike.baidu.com/cms/rc/240x112dierzhou.jpg'>";
    }

    a();
```

- 2. 方式二: 创建img标签 给src属性赋值 然后appenChild
```js
    function b() {
        var d1 = document.getElementById("d1");
        var img = document.createElement("img");
        img.src = "http://baike.baidu.com/cms/rc/240x112dierzhou.jpg";
        d1.appendChild(img);
    }
    b();
```

- 3. 方式三: 创建image对象
```js 
    function c() {
        var cc = new Image();
        cc.src = "http://baike.baidu.com/cms/rc/240x112dierzhou.jpg";
        document.getElementById("d1").appendChild(cc);
    }
    c();
```

----------------

### 删除 元素本体

<div id="div-01">Here is div-01</div>
<div id="div-02">Here is div-02</div>
<div id="div-03">Here is div-03</div>

```js
var el = document.getElementById('div-02');
el.remove();
```

----------------

### try和catch的用法

> 执行规则：
- 首先执行try中的代码 如果抛出异常会由catch去捕获并执行
- 如果没有发生异常 catch去捕获会被忽略掉 但是不管有没有异常最后都会执行。

- try
    语句使你能够测试代码块中的错误。
- catch
    语句允许你处理错误。
- throw
    语句允许你创建自定义错误。（抛出错误）
- finally
    使你能够执行代码，在 try 和 catch 之后，无论结果如何。

```js
    try {
        代码块；
        throw "字符"   //抛出错误

    //抓住throw抛出的错误
    } catch(参数) {      
            //处理错误并执行

    } finally {
            //无论try catch结果如何还是继续执行
    }
```

> 实例:
```html
<p>请输出一个 5 到 10 之间的数字:</p>
<input id="demo" type="text">
<button type="button" onclick="myFunction()">测试输入</button>
<p id="mess"></p>

<script> 
function myFunction(){
    try { 
        // 取元素的值
        var x = document.getElementById("demo").value;  

        //根据获取的值，抛出错误
        if(x=="")    throw "值为空";       
        if(isNaN(x)) throw "不是数字";
        if(x>10)     throw "太大";
        if(x<5)      throw "太小";
    } catch(err) {
        //抓住上面throw抛出的错误，给p标签显示
        var y = document.getElementById("mess");     
        y.innerHTML="错误：" + err + "。";

    } finally {
        document.getElementById("demo").value = "";
    }
}
 </script> 
```

----------------

### 伪协议 与 真协议
- 真协议 
    用来再因特网上的计算机之间传输数据包, 如HTTP协议, FTP协议等

- 伪协议 
    是一种非标准化的协议, Javascript: 

```html
    <!-- 通过一个链接来调用Javascript函数  -->
    <a href='javascript:popUp('http://www.example.com')'>Example</a>

    <!-- 在HTML文档里通过javascript: 调用js代码的做法非常不好 -->
```

----------------

### 性能考虑
> 尽量少访问 DOM 和 尽量减少标记(减少在HTML文档中写没有用的结构)
- 只要是查询DOM中的某些元素, 浏览器都会搜索整个DOM树, 从中查找可能匹配的元素, 我们可以尽量应用变量, 把第一次搜索到的结果保存到变量里 重复使用
```js

    if(document.getELementsByTagName('a').length > 0){
        let links = document.getElementsByTagName('a');
        for(let i = 0; i<links.length; i++){  }
    }

    // 这里使用了两次document.getElementsByTagName('a'), 浏览器就搜索了两次DOM树
    ↓

    let links = document.getELementsByTagName('a');
    if(links.length>0){

    }
```

----------------

### window.open(url, name, features)方法
- 使用open()方法来创建新的浏览器窗口

- 参数:
- url:
    新窗口的地址(如果省略将会是一个空白的页面)

- name:     
    新窗口的名字, 通过这个name可以在代码里与新窗口进行通信

- features: 
    新窗口的各种属性(新窗口的尺寸, 新窗口被弃用或禁用的各种浏览器功能(工具条, 菜单条, 初始显示位置等))

```js 
    function popUp(winURL){
        window.open(winURL, 'popUp', 'width=320, height=480');
    }
    // 这个函数将打一个320 * 480的新窗口 名字为popUp
```

----------------

### 获取视口的尺寸
- 不是根标签的可视区域 就是视口的大小 可以说是分辨率
- 正常我们的可视区域是到padding 但是它就是视口大小 不受marginpadding的影响
```js
let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight; 
```

- 这个规则跟普通的clientWidth一样，到padding 比如分辨率是1366 我加了margin50，下面拿到的就是1266 上面拿到的就是1366

```js
let w = document.documentElement.offsetWidth
```

绝对位置：到body距离（html和body之间的margin要清除）

    原生实现：while循环不断的去累加
    body的offsetParent -- > null
    body的offsetLeft -- > 0
    body的offsetHeight -- > 0

    缺点：
    没有办法兼容border和margin
    
相对位置：到视口的距离
    原生实现：绝对位置的实现上 减去 滚动条滚动的距离（滚动条滚动时元素滚动的距离）

----------------

### DOM事件流
- 事件流描述的是从页面中接收事件的顺序
- 事件发生时会在元素节点之间按照特定的顺序传播, 这个传播过程就是DOM事件流

- 例子: 我给div绑定了一个事件, 它的结构是这样

    Document
       ↓
      html
       ↓
      body
       ↓
      div

- 当我们发生click事件时
- 它的顺序是
- Document先接收到了点击的事件 它不会进行任何操作, 往下传播
        ↓
- Html接收到了点击事件, 一样不进行任何操作, 往下传播
        ↓
- Body接收到了点击事件, 一样不进行任何操作, 往下传播
        ↓
- Div, 这个阶段叫做 目标阶段  上述的阶段叫做捕获阶段

- 然后还会从 目标阶段 从底层往顶层传播 叫做冒泡阶段


> JS代码中只能执行捕获 或 冒泡其中的一个阶段

> on...的事件 和 attachEvent 只能得到冒泡事件

> 没有冒泡的事件, onblur onfocus onmouseenter onmouseleave

----------------

### addEventListener(eventName, fn, boolean)
- 如果第三个参数为 true  那么 在事件捕获阶段调用事件处理程序
- 如果第三个参数为 false 那么 在事件冒泡阶段调用事件处理程序

----------------

### 窗口加载事件
> DOMContentLoaded

- document.addEventListener('DOMContentLoaded', function(){});

- DOMContentLoaded 事件触发时, 仅当DOM加载完成, 不包括样式表, 图片, flash等
<!-- 
    如果页面的图片很多的话, 从用户访问到onload触发可能需要较长的时间,
    交互效果就不能实现, 必然影响用户的体验, 此时用DOMContentLoaded事件比较合适
 -->

----------------

### 获取一个元素对象的绝对位置
> 元素对象.getBoundingClientRect()
- 该方法会返回一个对象，我们可以通过.的方式读取到内部的属性
- 1. width & height
    元素的高宽

- 2. x & y
    元素左上角的坐标

- 3. top bottom left right
- 上边距离顶部的距离
- 下边距离顶部的距离
- 左边距离左侧的距离
- 右边距离左侧的距离

> 技巧
- getBoundingClientRect + 滚动条滚动时元素滚动的距离---> 绝对位置

----------------

### style.cssText
- cssText代表样式字符串, 跟ele.style.name = value功能一样, 都是用来设置元素的内联样式

> 区别
- 功能是一样的, 只不过ele.style.cssText可以同时设置多个样式属性
- 而ele.style.name=value只能同时设置一个样式属性

<!-- 
    ele.style.width = '10px'
    ele.style.height = '10px'
    
    ele.style.cssText = 'width:10px; height:10px'
 -->

- 一种是多行单一设置，一种是单行多种设置。如果需要设置的样式属性有很多，那么代码自然就会很多，而且用js来覆写对象的样式是比较典型的一种销毁原样式并重建的过程，这种销毁和重建，都会增加浏览器的开销，在一定程度上回消耗浏览器性能。


> 性能有优势
- 但是在具体到业务上来说，同效果配合，不断变换样式属性达到效果目的，这时候，就会体现出来cssText的优势了。亲测在高端手机上没有多大差别，在稍微低端点的手机上，ele.style.cssText=value流畅度优于ele.style.name=value。

> style.cssText比style.name的权重高
不过，在设置cssText值的时候，会有一个问题，每次设置的cssText的值，都会把原来的cssText的值销毁重新赋值，也就是把原来的清除掉。所以可以用累加的形式，

ele.style.cssText+=';width:300px;height:200px;border:1px solid red;'
<!-- 
    let arr = ["red", "green", "blue", "orange"]
    let divs = document.querySelectorAll("div")
    Array.from(divs).forEach((item, index) => {
      item.style.cssText += `background: ${arr[index]}; float: left`
      if(index % 2 == 0) {
        item.style.clear = "both"
      }
    })
 -->

----------------

### 重新加载页面触发的事件
> pageshow事件

> pageshow onload事件的区别
- 下面三种情况都会刷新页面, 都会触发load事件
- a标签的超链接, 点完后会跳转页面
- f5刷新
- 前进后退按钮

- 但是火狐中, 有个特点 有个"往返缓存", 这个缓存中不仅保存着页面数据, 还保存了dom和js的状态, 实际上是将整个页面都保存在内存里, 所以此时后退按钮不能刷新页面

- 此时可以使用pageshow事件来触发, 这个事件再页面显示时触发, 无论页面是否来自缓存, 在重新加载页面中, pageshow会在load事件触发后触发, 根据事件对象中的persisted来判断是否是缓存中的页面触发的pageshow事件
<!-- 这个事件给window添加 -->

- e.persisted
- 这个页面是否来自于缓存, 如果是true 不是false

> 总结:
- 我们绑定load事件是为了进行页面加载后的相关处理函数, 但是在火狐中 它会把页面缓存到内存中, 这时候我们后退页面并不会刷新内部的数据, 换句话说 假如我们重新计算刷新后的页面数据, 火狐里就不好用了

----------------

### document.writeln()
- 使用这个方法写完的东西自动换行

----------------

### 清空数组的技巧
- 1. 赋空值     相当于将数组引向一个空对象
```js 
  let hd = [1,2,3]
  hd = []
```

- 2. 修改长度   修改原数组 彻底清除数组的好方式
```js 
  let hd = [1,2,3]
  hd.length = 0
```

- 3. 使用splice()
```js 
  let hd = [1,2,3]

  // 从0开始往后删除
  hd.splice(0)
```

----------------

### 判断是否是数组还是对象
> Object.prototype.toString.call(目标对象)
```js 
    let objRes = Object.prototype.toString.call(obj)
    console.log(objRes)     // "[object Object]"

    let arrRes = Object.prototype.toString.call(arr)
    console.log(arrRes)     // "[object Array]"
```

----------------

### 获取页面高度 宽度的API
- document.documentElement.clientWidth
- 获得的是屏幕可视区域的宽高，不包括滚动条与工具条

- document.body.clientWidth
- 获得的也是可视区域的宽度
<!-- 
    document.body.clientHeight 获得的是body内容的高度
    如果内容只有200px，那么这个高度也是200px
 -->

- window.innerWidth
- 获得的是可视区域的宽高，但是window.innerWidth宽度包含了纵向滚动条的宽度
- (IE8以及低版本浏览器不支持)
<!-- 
    window.innerWidth - document.documentElement.clientWidth
    获取垂直滚动条宽度
 -->

- window.outerWidth
- 获得的是加上工具条与滚动条窗口的宽度与高度

----------------

### 递归函数的定义
- 通过递归的形式 获取角色下所有三级权限的id 并保存到 defKeys 数组中
```js  
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
```

----------------

### 检查重复字符串
```js  
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
```

----------------

### iframe 相关
> 获取父网页中的iframe
```js 
    myFrame = window.frames[ifname的name名或者id之类的吧].document
```

> iframe也有onload事件
```js 
    let main_frame = $('.main_frame')
    main_frame.on('load', function() {
        let doc = window.frames['main_frame'].document
        main_frame.css('height', `${doc.documentElement.scrollHeight}px`)
    })
```

----------------

### postMessage
- 我在做项目中的场景是
- 父页面有一个iframe标签 在处理iframe标签的时候 我遇到的几个问题

> 问题1: 
- 出现了双重垂直滚动条, iframe和页面都出现了滚动条
- 当我禁用了滚动条后 发现iframe区域不能按照里面的子网页的高度更新高度
-
- 解决办法:
- 使用了 iframe.onload事件 当iframe加载完毕之后, 读取iframe内部网页的高度然后把值设置给iframe框架
```js
    let main_frame = $('.main_frame')
    main_frame.on('load', function() {
        let doc = window.frames['main_frame'].document
        main_frame.css('height', `${doc.documentElement.scrollHeight}px`)
    })
```


> 问题2:
- iframe中的子网页中 点击按钮添加行, 导致iframe的高度发生变化, 但是没办法实时的反应给父网页
- 解决办法:

> 给谁发信息就写谁.postMessage(数据, * | URL | / | 协议-端口/, [transfer])
- 它可以实现两个页面之间相互传递数据

- 它可以是父网页向iframe发送数据
- 也可以是子网页向父网页发送数据

> 接收方
```js 
    window.addEventListener('message', function(e) {
        if(e.orgin !== '目标网址') {
            return
        }
        event.data就是数据
    })
```

> 发送方
- 这个是子网页(iframe里的)向父网页中发射数据, window.parent
```js 
    window.parent.postMessage(data, 'https://127-:5000')
```

----------------

### 再设置随机数范围的时候 random()*255 255就是范围

----------------

### 数组 和 字符串之间的灵活运用
- 不知道干啥的

```js
let arr = [
    {
        id:1, 
        name:'sam', 
        age:9
    }
]

    for(let item of arr) {
      let data = Object.keys(item)
      data.some(value => {
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
```

----------------

### 关于模块之间的数据传递
- 我们有的时候需要将一个模块中的数据传递到另一个模块 可以通过回调函数的方式
```js 
    // A模块 在函数中创建两个函数形参 通过函数形参的方式将结果回调出去
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

    // B模块接收的时候, 传入函数 形参就是A模块传递的实参
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
```

----------------

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

```js
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
```

> 方法2 一次只能给一个元素解决这个问题 如果页面有100个元素 就得调用100次
> 方法3
- 为了解决方案2的弊端 我们可以使用插件 fastclick插件解决300ms延迟

----------------

### 双击禁止选中文字
> window.getSelection ?window.getSelection().removeAllRanges() :document.selection.empty();

- 常规项目，我们只需要给标签加一个onselectstart事件，return false就可以
<div onselectstart="return false;" ></div>

- react中
- 用css解决 user-select:none

----------------

### 将文本框的文字处于选中状态
> input.select();

----------------

### 自动调用事件    没有on 事件名后加();
> this.blur();
> this.click()

----------------

### 删除指定元素
> 元素对象.remove()
- 可以直接删除指定的元素

----------------

### exec 和 match 的区别
- 1. match是字符串的方法, 调用的方式是str.match()
- 2. exec是正则的方法, 调用的方式是reg.exec()

- 相同点:
- match和exec在匹配成功时返回的都是数组, 在没有匹配上时返回的都是null

- 不同点:
- 当不使用g的时候, 返回结果都是第一次查询到的结果
- 当使用g的时候, match会返回所有匹配的内容, 而exec仅匹配第一次匹配的内容

- 当进行多次匹配时, exec会从匹配结束的下一位开始匹配，返回本次匹配上的内容，直至无可以匹配的内容，返回null

    - 变量名1 = reg.exec(str)
    - 变量名2 = reg.exec(str)
    - 这就是多次

```js 
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
```

----------------

### 让页面滚动到指定位置
> window.scroll(x, y);
- 可以让窗口的滚动到指定位置
- 不用加单位 直接写数字即可 window.scroll(0, 100)

----------------

### 节流阀

> 要点:
- 1. 当一个动画结束后再执行下一个
- 2. 需要flag变量 和 回调函数搭配使用

> if(flag){flag = false} --- 回调函数里( flag = true)
- 防止轮播图按钮连续点击造成播放过快
- 节流阀目的: 
    当上一个函数动画内容执行完毕, 再去执行下一个函数动画, 让事件无法连续触发

- 核心思路: 
    利用回调函数, 添加一个变量来控制, 锁住函数 和 解锁函数
    在某些条件下 关上水龙头 在某些条件下打开水龙头

```js
    // 开始
    let flag = true;

    if(flag) {
        flag = false;
        do somethind;   
    }

    // 如果flag为true 进来我就给你变成false 锁住函数 然后可以做一些事情 现在就相当于水龙头已经关闭了 当再次点击的时候 你就没办法再放水了 因为是false了,if(flag) 为false了 就没办法执行里面的代码了 就没办法播放图片了

    // 但不能一直不播放啊 什么情况下可以播放呢? 利用回调函数 动画执行完毕, flag = true > 打开水龙头 这时候我们又进入的新的开始
```

```js
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
```

----------------

### 克隆节点的优势
- 动态生成节点, 目前用法: 克隆 轮播图的第一张图片的节点 让它实现无缝轮播
```js
// 定义一个变量
let num = 0;

// 克隆第一张图片放到ul的最后面
let first = ul.children[0].cloneNode(true);
ul.appendChild(first);

// 完成点击按钮滚动图片的功能
arrowR.addEventListener('click', function () {
    if(num >= ul.children.length-1){
        ul.style.left = 0;
        num = 0;
    }
    num++;
    animate(ul, -num*focusWidth);
});
/*
    点击到下一张肯定需要一个变量和图片的宽度(移动距离)联系起来, 下一张就是一个变量自增1 

    无缝滚动 点击最后一张会回到第一张
    实现方式: 
    1 2 3 1
    在3的后面再放一张跟1一样的图片 当到最后一张1的时候 让ul的left直接为0

    对上面初步完善的功能进行改善
    1. 我们是在html结构里克隆的li, 这样导致了导航点多了一个
    2. 能不能让js克隆一份放在最后面呢?

    克隆第一张图片:
    1. 克隆ul第一个li cloneNode(true) true复制里面的子节点
    2. 添加到ul最后面 appendChild

    为什么使用克隆的功能小圆点并没有增加?
    因为我们克隆的方法 写在了 动态生成导航点的下面

    这种方法实现了两个功能一个是导航点不会多, 又是动态生成
*/
```

----------------

### 手动调用事件 元素对象.click()
> 场景:
- pink轮播 自动播放的部分 实现的逻辑就是点击右侧按钮的逻辑 所以使用了元素对象.click() 这样可能就会调用这个元素对象身上的事件

- 比如 想让定时器自动调用一个事件
```js
let timer = setInterval(function(){
    // 手动调用点击事件
    arrowR.click();
}, 2000)
```

----------------

### 滚动条是谁的 body 还是 html
> chrome 认为滚动条是body的
<!-- body滚动条的距离 -->
var st = document.body.scrollTop;   //chrome能获取到坐标

> 火狐等认为滚动条是html的
<!-- html根标签滚动条的距离 -->
var st = document.documentElement.scrollTop;   //火狐等浏览器能获取到

var st = document.body.scrollTop || document.documentElement.scrollTop;

----------------

### 获取当前屏幕的宽度
> window.innerWidth innerHeight当前屏幕的宽度 高度 (没有单位)

----------------

### 在DOM中使用方法获取元素节点时 可能会获取到换行和空格
> 元素对象.childNodes (标准, 一般不使用)
> 元素对象.firstChild
> 元素对象.lastChild
> 具体的节点.previousSibling（也可能获取到空白文本）
> 具体的节点.nextSibling（也可能获取到空白文本）

- 上述的方法都是能获取到空白文本的 所以我们可以使用nodeType来只获取元素节点
```js
    for(let i=0; i<ul.childNodes.length; i++) {
        if(ul.childNodes[i].nodeType == 1) {
            console.log(ul.childNodes[i]);
        }
    }
```

----------------

### 禁用屏幕滚动条
document.body.parentNode.style.overflowY = "hidden";

----------------

### 时间毫秒数转换
毫秒数 / 1000 转换为秒数后计算更精确些

d = parseInt(总毫秒数 / 60 / 60 / 24);
h = parseInt(总毫秒数 / 60 / 60 % 24);
m = parseInt(总毫秒数 / 60 % 60);
s = parseInt(总毫秒数 % 60);

----------------

### 全选选不选的两个思路
> 方法一: 先定义一个变量 让全选的状态根据这个变量的状态来
```js 
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
```

> 方法二:
- 一上来就默认全选为选中状态, 然后根据判断里面的结果 更新全选按钮的状态
```js 
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
```

----------------

### 只要有布尔值的地方
> 三步表达式:
element.className = element.className === 'demo' ? 'demo w200': 'demo';

> typeof n === '类型'
经常使用这种形式, 用来得到一个布尔值

> "属性名" in 对象
检查obj中是否含有test2这个属性
<!-- console.log('test' in obj) -->

----------------

### 一个函数 两种情况都可以用的情况下 我们可以将 boolean值传递进去
- 当 true 是一种效果
- 当 false 是一种效果
```js 
    nextPage(false);
    
    function nextPage(next){
        let offset = next? -PAGE_WIDTH:PAGE_WIDTH;
    } 
```

----------------

### 检查元素是否存在
> 使用 nodeName 来检查一个元素是否存在, nodeName的值总是返回大写字母
```js
    if(eleObject.nodeName != 'IMG') { return false}
```

> 使用nodeType 来检查一个元素是否存在 元素1 属性2 文本3
```js
    if(eleObject.nodeType == 3) { ... }
```

----------------

### this当做参数来传递
- 需求: 当我点击 超链接 时, 对应图片显示在 当前页面的指定位置上
- 思路:
- 1, 先通过getAttribute获取到<a>身上的 href 属性值(也就是地址)
- 2, 把得到的地址 保存在变量中 source
- 3, 再通过setAttribute设置<img>身上的 src 属性值
```html 
    页面结构:
    <ul>
        <li><a href="./links/1.jpg">第一张</a></li>
        <li><a href="./links/2.jpg">第二张</a></li>
        <li><a href="./links/3.jpg">第三张</a></li>
        <li><a href="./links/4.jpg">第四张</a></li>
        <li><a href="./links/5.jpg">第五张</a></li>
    </ul>
    
    <img src="./links/77.png" id='x' alt="">
```

- 我做了一个函数, 想用在 <a> 的事件回调中
```js 
    function showPic(obj){
        let source = obj.getAttribute('href');
        let showSite = document.getElementById('x');
        showSite.setAttribute('src', source); 
    };

    参数obj: 是<a>对象, 我要获取的是它身上的href
```

- 我想把这个函数 放入到 <a> 的事件回调中, 但是不知道传递什么实参进去
```js
    for(let i=0; i<allA.length; i++){
    allA[i].onclick = function(){

        // showPic(obj);

        showPic(this);

        return false;
    };
}
```

> ↑ 总结: 事件回调函数中的this 就是每一个 <a> 标签对象, 可以把this当做实参传递进去

----------------

### for...of --- 遍历属性值
- 它适合遍历数组 es6的新语法, 遍历的直接是属性值
```js
    const xiyou = ['唐僧', '孙悟空', '猪八戒'];

    // 使用for...of 遍历这个数组
    for(let value of xiyou){
        console.log(value);     
    }
```

> 自定义遍历目标
- 1. 现在对象内部定义接口, [Symbol.iterator](){}
- 2. 在[Symbol.iterator](){}函数内部, 先return一个对象
```js
    [Symbol.iterator](){
        return {}
    }
```

- 3 在return {}中, 创建next:function(){}
```js
    [Symbol.iterator](){
        return {
            next:function(){};
        }
    }
```

- 在next:function(){}中判断遍历是否完成, 如果index<要遍历的对象 那么done应该为false, else遍历完成, done应该为true, if else 中都要返回一个对象
- 创建变量 index = 0; _this = this 让index++ 人为控制遍历下一个元素
```js
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
```

- 完整版如下:
```js 
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
```

----------------

### 让系数在一个范围内 自增 自减
效果: 当系数为0时, 自增到100, 当到100时开始自减
结果: 我们把结果除以一定的比例, 得到想到的范围, 比如 0-100 ---> 0-2
> 1 2 3 4 5 4 3 2 1
```js 
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
```

> num % 5   0 1 2 3 4 0 1 2 3 4
```js 
    num++;
    num = num % 10;
    console.log(num);
```

----------------

### 数组的用法
> 把颜色保存在数组中, 利用下标赋值给对应的所有元素
```js 
    let color = ['red', 'yellow', 'blue', 'pink']
    span[i].style.color = color[i];
```

> 创建一个空数组, 一边往里注入信息, 一边循环往外取信息
```js 
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
```

> 循环读取信息
- canvas循环读取信息
```js 
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
```

----------------

### 怎么看图片加载完成
### 图片加载情况 和 开机动画关联

```js
let flag = 0;

for(let i=0; i<arr.length; i++){
    // 这也是创建图片的一种方法
    let img = new Image();

    // 当我的src指向一个地址时 我会发送请求去拿它, 这是浏览器自己会做的
    img.src = arr[i];

    // 既然现在是发请求拿数据, 那现在的 进度 怎么拿到 只要请求成功 就会触发下面的事情 图片加载成功
    img.onload = function(){
        flag++;
        // 这段文字中的百分比是跟请求次数有关系的
        p.innerHTML = '已加载'+(Math.round(flag/arr.length)*100)+'%'
    };

    img.onerror = function(){
        console.log('地址有问题')
    };
}
```

----------------

### 在外部创建一个变量, 用来接收内部产生的结果
### 在外部创建一个变量, 用来默认一个结果, 在内部得到的结果来更新外部的变量
> 应用场景1
```js 
    var flag = true;

    // 什么情况下 修改 flag
    for(var i = 2; i<num; i++){
        if(num % i == 0){
            flag = false;
        }
    }

    // 根据最终的flag来做什么样的处理
    if(flag){
        ...
    } else {
        ...
    }
```

> 应用场景2
- 要点 我先默认它为选中状态, 然后对它进行判断, 更改它的状态
```js
for(i=0; i<items.length; i++){
    items[i].onclick = function(){
        // 默认它是true
        checkedAllBox.checked = true;

        for(j=0; j<items.length; j++){
            // 当某种场景下再修改它的值
            if(!items[j].checked){
                checkedAllBox.checked = false; 
                break;
        }
}
```

----------------

### 测试性能
console.time("") 和 console.timeEnd("")

----------------

### 判断滚动条是否到底
> 当满足scrollHeight - scrollTop == clientHeight
说明垂直滚动条 滚动到底了

> 当满足scrollWidth - scrollLeft == clientWidth
说明水平滚动条 滚动到底了

----------------

### 本身取反的用法
```js 
    if(items[i].checked){
        items[i].checked =false；
    }else{
        items[i].checked =true；
    }
    items[i].checked = !items[i].checked; 
```

----------------

### flag 和 switch配合使用
> 场景1
```js
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
```

> 场景2
```js
    dir = event.keyCode; 
    switch(dir){ }
```

----------------

### data- 的用法
> 在html标签结构中 设定标识, 配合Js应用
- 解析：
- 在html标签结构中添加了data-属性,用来动态的获取到属性值, 和网址关联在一起

> 效果: 点哪个, 就播放对应的
```js 
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
```

----------------

### 调整元素的高宽和视口一样
```js 
    video.width = document.documentElement.clientWidth;
    // 调整视频的高度 = 视口的高度 - 控件区域的高度
    video.height = document.documentElement.clientHeight - controls.offsetHeight;
```

----------------

### 改变浏览器时, 重新获取元素的高宽
> window.onresize = function(){};
```js 
    window.onresize = function(){
        video.width = document.documentElement.clientWidth;
        video.height = document.documentElement.clientHeight - controls.offsetHeight;
    };
```

----------------

### 时间的获取
```js 
    let date = new Date();
    // 获取 秒
    let s = date.getSeconds();

    // 获取 分
    let m = date.getMinutes()+s/60;

    // 获取 时
    let h = parseInt(date.getHours()+m/60);

    //现在的h是24小时制
    h = h>12?h-12:h;
```

----------------

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

----------------

### 数学公式

> 勾股定理
在任何一个平面直角三角形中的两直角边的平方之和一定等于斜边的平方。
在△ABC中，∠C=90°，则a²+b²=c²。

> 三角函数
正弦 : sin      ∠A的对边比斜边
余弦 : cos      ∠A的临边比斜边

> 弧度值 = 角度值*PI/180

> 角度值 = 弧度值*180/PI

----------------

### 数组对象的去重
- https://www.jianshu.com/p/7c12cbaa817b


> 利用indexOf() 进行的去重
```js 
    var r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];

    r = arr.filter(function (value, index, arr) {

        // 检查arr数组中的元素的位置 和 index的位置一致不一致
        return arr.indexOf(value) === index;

    });
```

<!-- 
    indexOf()检查数组中某个指定的元素的位置
 -->


---

- 旧数组: arr = ['c', 'a', 'z', 'a', 'x', 'a', 'x', 'c', 'b', ]

> 方式一:
- 思路: 我们遍历数组, 把前一个元素取出来和后一个元素比较相等 相等的话删掉后一个
```js
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
```

> 方式二:
- 思路: 使用arr.filter, 传入的函数会一次应用到每一个元素上,根据true和false来判断去留 我们用indexOf方法检查元素的第一次下标位置和下标相等不
```js 
    let newArr = arr.filter(function(value, index){

        if(arr.indexOf(value) === index){
            return true;
        }else{
            return false;
        }
    });
    console.log(newArr);
```

> 方式三: 
- 思路: 遍历旧数组 然后拿着旧数组元素去查询新数组, 如果该元素在新数组里面没有出现过 我们就添加, 否则不添加
- 使用indexOf 来判断该元素在新数组中存在与否, 如果结果为-1 说明新数组里面没有该元素
```js
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
```

----------------

### 利用match() 检查目标内是否有相关文本, 如果有的话进行什么样的操作
```js 
    function changeImage(obj){
        if(obj.src.match('1.jpg')){
            obj.src = '../JS/JS_Study/links/2.jpg';
        } else {
            obj.src = '../JS/JS_Study/links/1.jpg';
        }
        
    };

    btn.onclick = function(){
        changeImage(image);   
    };
```

----------------

### 读取 和 更改文本
> 元素节点.innerHTML
> 元素节点.firstChild.nodeValue

----------------

### 滚轮事件在多次触发时 影响用户体验 (防抖)
- 利用延迟定时器, 200ms后触发一个滚轮事件, 每次触发前清除上一次的定时器
```js
    if(content.addEventListener){
        content.addEventListener('DOMMouseScroll',function(event){

        // 处理个问题，当鼠标滚轮滚动时，多次滚动只滚动一次, 触发事件时不是立即响应 而是等200ms才响应 只要触发事件在200ms之内 第二次触发的事件就会把第一次的清掉
        event = event || window.event;
        
        clearInterval(timer);
        timer = setTimeout(function(){
            fn(event);
        },200);

    });
} 
```

----------------

### 同时修改4张图片的位置

    1, left:0   top:0           0       0
    2, left:-w  top:0          -1       0
    3, left:0   top:-h          0      -1
    4  left:-w  top:-h         -1      -1

```js
    for(let i=0; i<4; i++){
        imgNode.style.left = -(i%2)*w +'px'
        imgNode.style.top = Math.floor(i/2)*h +'px'
    }
```

> i%2 对下标 0 1 2 3 来说 -- i%2 的结果就是 0 1   0 1
> i/2 对下标 0 1 2 3 来说 -- i/2 的结果就是 0 0.5 1 1.5 向下取整 0 1 0 1

----------------

### 筛选数组
```js
    let arr = [2,0,6,1,77,0,52,0,25,7];
    let newArr = [];
    // 定义新数组的 index 初始值
    let j = 0;

    for(let i=0; i<arr.length; i++){
      if(arr[i] > 10){
        /* 
          newArr[i] = arr[i];

          结果:
          (9) [empty × 4, 77, empty, 52, empty, 25] 
          当i为4时, arr[4]的值为77 > 10, 会把它存到newArr[4]里 所以从第5为开始存进去的
        */

        // 也就是说新数组应该从0开始存 定义变量j = 0, 然后每存一次手动让j++一次
        newArr[j] = arr[i];
        j++;
      }
    }
    console.log(newArr);
```

> length自动检测元素的变化
```js
    for(let i=0; i<arr.length; i++){
      if(arr[i] > 10){
        newArr[newArr.length] = arr[i];
      }
    }
```
 
----------------

### 反转数组
```js 
    let arr = ['pink', 'red', 'green', 'blue', 'purple'];
    let newArr = [];

    for(let i=arr.length-1; i>=0; i--){
        newArr[newArr.length] = arr[i]
    }
```

----------------

### 遍历字符串

- 案例:
- 判断一个字符串'abcoefoxyozzopp'中出现次数最多的字符, 并统计其次数

> 思路:
- 1. 利用charAt() 遍历整个字符串
- 2. 把每个字符存储给对象, 如果对象没有该属性 就为1 有就让这个值+1 有几次加几次1
- 3. 遍历对象, 得到最大值和该字符
(遍历字符串, 然后把每一个元素放到对象里 用属性值标记出现的次数)
```js 
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
```

----------------

### 求最大值
```js
    let max = 0;
    if(o[n] > max){
        max = o[n];     这样里面存的永远是最大的那个数
    }
```

----------------

### 深浅拷贝的方法
> 浅拷贝 方式一
```js 
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
```

> 浅拷贝 方式二
> Object.assign(拷贝给谁, 拷贝哪个对象);
- ES6中的浅拷贝的新方法
```js 
    let res = Object.assign(o, obj);
    console.log(o);
```

> 深拷贝
```js 
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
        // 循环遍历整个对象
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
```

----------------

### 高频手写题
> call的实现
- 第一个参数为null或者undefined时，this指向全局对象window，值为原始值的指向该原始值的自动包装对象，如 String、Number、Boolean

- 为了避免函数名与上下文(context)的属性发生冲突，使用Symbol类型作为唯一值

- 将函数作为传入的上下文(context)属性执行
- 函数执行完成后删除该属性
- 返回执行结果

```js
Function.prototype.myCall = function(context, ...args){
    let cxt = context || window;
    //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
    //新建一个唯一的Symbol变量避免重复
    let func = Symbol() 
    cxt[func] = this;
    args = args ? args : []
    //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
    const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
    //删除该方法，不然会对传入对象造成污染（添加该方法）
    delete cxt[func];
    return res;
}
```


> apply的实现
- 前部分与call一样
- 第二个参数可以不传，但类型必须为数组或者类数组
```js
Function.prototype.myApply = function(context,args = []){
    let cxt = context || window;
    //将当前被调用的方法定义在cxt.func上.(为了能以对象调用形式绑定this)
    //新建一个唯一的Symbol变量避免重复
    let func = Symbol()
    cxt[func] = this;
    //以对象调用形式调用func,此时this指向cxt 也就是传入的需要绑定的this指向
    const res = args.length > 0 ? cxt[func](...args) : cxt[func]();
    delete cxt[func];
    return res;
}
```


> bind的实现
- 需要考虑：
- bind() 除了 this 外，还可传入多个参数；
- bind 创建的新函数可能传入多个参数；
- 新函数可能被当做构造函数调用；
- 函数可能有返回值；

- 实现方法：
- bind 方法不会立即执行，需要返回一个待执行的函数；（闭包）
- 实现作用域绑定（apply）
- 参数传递（apply 的数组传参）
- 当作为构造函数的时候，进行原型继承

```js
Function.prototype.myBind = function (context, ...args) {
    //新建一个变量赋值为this，表示当前函数
    const fn = this
    //判断有没有传参进来，若为空则赋值[]
    args = args ? args : []
    //返回一个newFn函数，在里面调用fn
    return function newFn(...newFnArgs) {
        if (this instanceof newFn) {
            return new fn(...args, ...newFnArgs)
        }
        return fn.apply(context, [...args,...newFnArgs])
    }
}


// 测试
let name = '小王',age =17;
let obj = {
    name:'小张',
    age: this.age,
    myFun: function(from,to){
        console.log(this.name + ' 年龄 ' + this.age+'来自 '+from+'去往'+ to)
    }
}
let db = {
    name: '德玛',
    age: 99
}

//结果
obj.myFun.myCall(db,'成都','上海');     // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myApply(db,['成都','上海']);      // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myBind(db,'成都','上海')();       // 德玛 年龄 99  来自 成都去往上海
obj.myFun.myBind(db,['成都','上海'])();   // 德玛 年龄 99  来自 成都, 上海去往 undefined
```


> new的实现
- 一个继承自 Foo.prototype 的新对象被创建。
- 使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
- 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。
- 一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤
```js
function Ctor(){
    ....
}

function myNew(ctor,...args){
    if(typeof ctor !== 'function'){
      throw 'myNew function the first param must be a function';
    }
    var newObj = Object.create(ctor.prototype); //创建一个继承自ctor.prototype的新对象
    var ctorReturnResult = ctor.apply(newObj, args); //将构造函数ctor的this绑定到newObj中
    var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
    var isFunction = typeof ctorReturnResult === 'function';
    if(isObject || isFunction){
        return ctorReturnResult;
    }
    return newObj;
}

let c = myNew(Ctor);
```


> instanceof的实现
- instanceof 是用来判断A是否为B的实例，表达式为：A instanceof B，如果A是B的实例，则返回true,否则返回false。

- instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

- 不能检测基本数据类型，在原型链上的结果未必准确，不能检测null,undefined

- 实现：遍历左边变量的原型链，直到找到右边变量的 prototype，如果没有找到，返回 false

```js
function myInstanceOf(a,b){
    let left = a.__proto__;
    let right = b.prototype;
    while(true){
        if(left == null){
            return false
        }
        if(left == right){
            return true
        }
        left = left.__proto__
    }
}

//instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left), // 获取对象的原型
    prototype = right.prototype; // 获取构造函数的 prototype 对象
    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
```

https://mp.weixin.qq.com/s/OS7gTvJ2gAVCZBvU-1cAqA