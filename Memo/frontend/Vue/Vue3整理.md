> 这是使用 @vue/composition-api 的模板
```html
<script>
  import {defineComponent} from "@vue/composition-api"
  export default defineComponent({
    setup() {
      数据,
      方法,
      计算属性...

      return { ... }
    }
  })
</script>
```


> Vue3默认的模板
```js
export default {
  setup() {
    数据,
    方法,
    计算属性...
  }
}
```

----------------

### setup 函数

> 要点:
- 1. 注意 两种模板的使用情景 @vue/composition-api 好像是和ts搭配使用的
- 2. 因为都是在 setup() 函数中定义的 所以可以直接读取 不用this
- setup会在beforeCreate之前执行一次 this是undefined

- 3. setup()就是一个函数 就是在写js

- 4. setup()的返回值, setup必须要有返回值
  - 1. 
    return { } 则 对象中的属性 方法 都可以在模板中直接使用

  - 2. 
    return () => h("标签名", "标签体")
    前提:
       从 vue 身上 导出 h() 渲染函数
       import {h} from "vue"
    作用:
      自定义渲染内容 模板中内容已经不重要了 不管是什么都会被渲染函数的内容所覆盖

- 5. 在vue3中可以使用vue2中的配置式方式写代码 但尽量不要与vue2配置混用
- vue2配置项可以访问setup中的属性和方法
- setup访问不到vue2配置项中的属性和方法

- 6. setup不能是async函数 
- 因为返回值不再是return的对象 而是promise 模板中看不到promise


> 扩展:
- setup()中也可以这么写

```js
setup() {
  let sum = ref(0)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({sum})
    }, 3000)
  })
}
```

----------------

### setup 函数的参数

  setup(props, context) {

  }


> 参数 props: 
- 值为对象，包含：组件外部传递过来的且组件内部声明接收了的属性

- 使用方式:
- 1. 使用vue2子组件接收props的方式 接收父组件传递进来的prop
- 2. setup()中从props中拿到使用
```js
// 父组件
<Demo name="erin" age="18"/>

export default {
  name: 'Demo',
  props: ["name", "age"],   // 要是对props进行验证 使用对象形式

  setup(props) {
    let {name, age} = props
    console.log(name, age)
}
```

> 要点:
- 1. props传递过来的数据为只读 不建议在子组件中修改 修改也无效
- 2. 从props(之类的代理对象)中解构出来的数据 不是响应式
- 3. setup() 的return中 也可以 ...props
```js
return {
  ...props
}
```


> 参数 context: {attrs, slots, emit}
- 值为对象, 它有3个属性

> attrs:
- 值为对象，包含：props配置项里没有接收的数据，就会保存在attrs对象中 相当于 this.$attrs

> slots:
- 收到的插槽内容 相当于 this.$slots

**注意:**
- vue3中使用具名插槽的时候 只支持这种方式: <template v-slot:插槽名>
```html
  <Demo @hello="showInfo" name="erin" age="18">

    <template slot="left" / #left>
      <span>我是填入的内容</span>
    </template>

  </Demo>

  <!-- 子组件 -->
  <slot name="left"></slot>
```

> emit 配合使用 emits配置项
- 分发自定义事件的函数 相当于 this.$emit
- 用于在setup中的方法，要发射自定义事件的时候，我们可以使用context.emit来完成

- 1. 先在子组件中使用 emits: ["给子组件绑定的自定义事件名"]
- 类似props声明接收事件

- 2. 在setup()函数中 context.emit("事件名", 数据)

```html
<Demo @hello="showInfo" />

<!-- 子组件 -->
<script>
  export default {
    emits: ["hello"],
    -- or --
    emits: {
      hello: null
    },

    setup(props, context) {
      // 当点击子组件中的按钮的时候 将自定义事件hello发送给父组件
      function test() {
        context.emit('hello', 666)
      }

      return {
        test
      }
    }
  }
</script>
```

----------------

### ref 函数

> 要点:
- 1. 它不是vue2中的获取dom节点的标签属性ref
- 2. 它是处理setup()中 数据的响应式问题

  - ref(文本类型)
  - let text = ref("文本")

  - 通过ref()函数加工出来的结果是一个*对象* 对象中的*value*属性就是 *数据*
  - 模板: 直接用text
  - 脚本: text.value


  - ref(对象类型)
  - let obj = ref({name: "sam", age: 18})

  - 通过ref()函数加工出来的结果是一个*对象*
  - obj.value 是一个代理对象
  - 模板: obj.name
  - 脚本: obj.value.name


- 3. 实现原理也是getter setter
- 4. ref()函数对于
  基本数据类型 - 对属性值进行包装 成为 引用对象
  引用数据类型 - 对整个对象进行包装 成为 代理对象

- 5. 模板中都不用使用 .value 来获取数据

----------------

### reactive 函数

> 要点:
- 1. 对 引用数据类型数据 进行响应式化
- 2. 只能对引用类型数据使用

  - reactive(对象类型)
  - let obj = reactive({name: "sam", job: {name: "前端"}})

  - 通过reactive()函数加工出来的结果是一个*代理对象*
  - 模板: obj.name
  - 脚本: obj.name

  - 都不用使用value

- 3. reactive()函数对数组进行包装的时候 可以使用索引来操作 并且是响应式的
- 4. reactive()函数对象组进行包装的时候 可以使用.来操作 并且是响应式的



> 总结:
- 基本数据类型使用 ref() 通过.value来获取数据
- 引用数据类型使用 reactive() 直接通过.属性名获取数据

**注意:**
- reactive()包装的对象是可以解构的 但是解构后就不是响应式的了

```js
let obj = reactive({name: "sam"})
let {name} = obj
```

----------------

### ref函数 获取元素节点

> 要点:
- 1. setup中 声明 自定义变量 并用 ref(null) 包装null
- 2. 模板中 使用标签属性 ref="自定义变量"
- 3. 在 onMounted(() => {}) 生命周期中 通过 自定义变量.value 的形式 操作节点
- 4. setup中 return 自定义变量

```html
<template>
  <div id="nav">
    <h3>vue3</h3>
    <hr>
    <!-- 2 -->
    <div ref="node">{{obj[0]}}</div>
  </div>
</template>

<script>
import {ref, reactive, onMounted} from "vue"

export default {
  setup() {
    // 1
    let node = ref(null)

    // 3
    onMounted(() => {
      node.value.style.background = "red"
    })

    // 4
    return {
      node
    }
  }
}
</>
```

----------------

### toRef 函数

> 要点:
- 1. 响应式的取出对象中的一条条属性 便于模板中直接使用 {{属性名}}
- 2. toRef(目标对象, "对象中的属性名")
- const name = toRef(person, 'name')    // 注意属性名要加引号

- 3. 要是取对象中多个属性 那就多次调用 toRef()
- 4. 取出的属性
  - 模板: 直接使用
  - 脚本: .value

- 5. 该方式只适用于响应式的取对象中的某几条数据

```js
let data = reactive({
  name: "sam",
  age: 18
})

let name = toRef(data, "name")
console.log("name", name.value)

let age = toRef(data, "age")
console.log("age", age.value)
```

**注意:**
- toRef: 是引用一个对象中的属性
- ref:   是复制一个对象中的属性 成为一个新对象

----------------

### toRefs 函数

> 要点:
- 1. 和toRef()的功能一样 但是可以批量创建多个ref对象 不用传递第二个参数 直接将对象传递进去 该对象中的*第一层属性*都会变成toRef的形式

- 2. toRefs()返回的是一个对象, 对象中的值为 toRef形式的对象第一层属性

```html 
<h3>姓名：{{name}}</h3>
<h3>性别：{{age}}</h3>
<h3>薪资：{{job.j1.salary}}</h3>

<script>
  let obj = toRefs(person)
  console.log(obj)

  return {
    ...obj
  }
</script>
```

----------------

### 事件

> 要点:
- 1. 模板中 不传递实参 脚本中默认形参为 e 事件对象
```html
<button @click="test">click me</button>

<script>
  function test(e) {
    console.log(e)  // 事件对象
  }
</>
```

- 2. 模板中 传递实参 不传递$event占位符 脚本中正常定义形参接收实参
```html
<button @click="test(1)">click me</button>

<script>
  function test(num) {
    console.log(num)  // 1
  }
</script>
``` 

- 3. 模板中 传递实参 $event占位符 脚本中按照顺序定义
```html
<button @click="test(1, $event)">click me</button>

<script>
  function test(num, e) {
    console.log(num)  // 参数1
    console.log(e)  // 事件对象
  }
</script>
```

----------------

### 计算属性

> 要点:
> 简易写法:
- 1. 计算属性 需要导入 
  - import {computed} from 'vue'

- 2. 导入的计算属性是个函数 参数为回调 回调里面需要return
  - computed(() => { return ... })

- 3. 计算属性也要写在 setup() 里面

- 4. computed()函数 需要创建变量接收 该变量就是计算属性

```js
import {computed, reactive, ref} from "vue"

export default {
  name: 'Demo',

  setup() {

    let person = reactive({
      firstName: "张",
      lastName: "三",
    })

    // 计算属性
    let fullName = computed(() => {
      return person.firstName + '-' + person.lastName
    })

    return {
      person,
      fullName
    }
  },
}
```

> 需要 get set 写法: computed({get() {}, set(v) {}})
```js
  let fullName = computed({
    get() {
      return person.firstName + '-' + person.lastName
    },

    set(value) {
      const nameArr = value.split("-")
      person.firstName = nameArr[0]
      person.lastName = nameArr[1]
    } 
  })
```

> 技巧：
- 我们可以在setup中任何一个需要属性的地方使用这种方式将该属性变为计算属性
- 也就是可以将 computed() 就当成一个值 可以在setup()中赋值给任意属性

----------------

### watch函数

> 要点:
- 1. watch 需要导入 
  - import {watch} from 'vue'

- 2. 导入的 watch 是个函数
  - watch(要监视的属性, (n, o) => { }, [{配置项}])
  - 参数:
  - 1. 要监视的属性
  - 2. 回调
  - 3. 配置项
       immediate: true,
       deep: true,

- 3. watch 也要写在 setup() 里面
- 4. watch() 不用创建变量去接收 因为没有返回值

- 5. 可以分别监视多个属性
- 6. *监视属性的时候 不用写.value*

> 监视 ref 定义的数据
```js
import {watch} from "vue"

setup() {

  let num = ref(0)
  let msg = ref("文本")

  watch((num, (n, o) => {
    逻辑...
  }))

  watch((msg, (n, o) => {
    逻辑...
  }))

  -- 方式2:

  watch([sum, msg], (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })
}
```

> 有配置项的情况
```js 
  watch([sum, msg], (newValue, oldValue) => {
    console.log(newValue, oldValue)
  }, {
    deep: true,
    immediate: true
  })
```

---

> 监视 reactive 定义的对象(整体)
- 1. 当监视reactive()的对象的时候 n o 值都是n值
- 2. 当监视reactive()的对象的时候 对象里面还有对象的时候 vue3在watch里面强制开启了deep深度监视 而且关不上

```js
setup() {
    let obj = reactive({
      name: "sam",
      job: {
        option: "前端"
      }
    })

    watch(obj, (n, o) => {
      console.log("新值: ", n)  // erin
      console.log("旧值: ", o)  // erin
    })

    function handleClick() {
      obj.name = "erin"
    }

    return {
      handleClick,
      num
    }
   
  }
```

---

> 监视 reactive 定义的对象(里面的某个属性)

-  参数1要写成回调 return 回来对象中的一个属性
  - watch(回调, 回调, 配置项)
  - () => person.name

```js
watch(() => person.name, (n, o) => {
  console.log("person变化了", n, o)
})

-- 监视对个局部属性
-- 第一个参数是 [数组函数]
watch([() => person.name, () => person.age], (n, o) => {
  console.log("person变化了", n, o)
})
```

- n o 都是正确的

---

> 监视 reactive 定义的对象(里面的二级对象时)
- 需要开启 deep
```js 
  let person = reactive({
    name: "erin",
    age: 18,
    job: {
      j: 1
    }
  })

  // 我们监视job里面的j1的时候 要开启deep深度监视
  watch(() => person.job, (n, o) => {
    console.log("person的job对象变化了")
  }, {deep: true})

```

----------------

### watchEffect 函数

> 要点:
- 1. 写在 setup() 函数内
- 2. 需要从 vue 中导入 使用 
  - import {watchEffet} from "vue"
  - watchEffect(() => { })

- 3. watchEffer的回调中使用了哪些属性 就会监视哪些数据
```js 
  watchEffect(() => {

    const x1 = sum.value
    const x2 = person.job.j1.salary

    当x1 x2的值变化的时候 这个回调就会执行
  })
```

> 总结:
- watchEffect有点像computed
- 但computed注重的计算出来的值(回调函数的返回值) 所以必须要写返回值
- 而watchEffect更注重的是过程(回调函数的函数体) 所以不用写返回值

----------------

### 生命周期

    beforeCreate  -- setup() setup比beforeCreate还要早
    created       -- setup()

    beforeMount   -- onBeforeMount
    mounted       -- onMounted
    beforeUpdate  -- onBeforeUpdate
    updated       -- onUpdated
    beforeUnmount -- onBeforeUnmount
    unmounted     -- onUnmounted

----------------

### Hooks
- 本质是一个函数 把setup函数中使用的composition api进行了封装 类似vue2中的mixin

> 要点:
- 1. 在src文件夹下 创建 hooks 文件夹 创建 useXxx.js 文件

    | - hooks
      - useHooks.js

- 2. 在 js 文件中 参照下面的模板进行使用 js文件中暴露出来一个函数

    import {reactive, onBeforeUnmount, onMounted} from "vue"
    export default function {

        return {
          结果...
        }
    }

- 3. 函数内部 将最终的需求(结果) return 出来 我们return出来的是一个对象 对象内部才有我们要的数据 也就是说

    let dataWrap = usePoint()

    - dataWrap: 是我们return { } 这个外壳对象 我们要通过dataWrap.目标数据

- 4. 在组件中 setup() 函数中 创建变量 接收hook函数返回的结果

```js
// hooks
import {reactive, onBeforeUnmount, onMounted} from "vue"
export default function() {

  let point = reactive({
    x: 0,
    y: 0
  })

  function savePoint(e) {
    point.x = e.pageX
    point.y = e.pageY
  }

  onMounted(() => {
    window.addEventListener("click", savePoint)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("click", savePoint)
  })

  return {
    point
  }
}


// 组件中
import usePoint from "./hooks/usePoint"

setup() {
    
  let dataWrap = usePoint()
  console.log(dataWrap.point.x)
  console.log(dataWrap.point.y)

}
```

----------------

### shallowReactive 浅响应式
- 只处理对象最外层属性的响应式

```js
  import {shallowReactive} from 'vue'

  let person = shallowReactive({
    name: "erin",
    age: 18,
    job: {
      j1: {
        salary: 20
      }
    }
  })
```

- name age job是响应式的，但是job里面的j1 和 salary 不是响应式的

----------------

### shallowRef
- 只处理基本数据类型的响应式，不进行对象的响应式处理
```js
  let x = ref(0)  ==  let x = shallowRef(0)
```

----------------

### readonly 深只读 
### shallowReadonly 浅只读

> 要点:
- 1. 它们两个是函数 readonly() shallowReadonly() 
- 2. 参数为 响应式数据
- 3. 它会返回一个加工为只读性质的对象 该对象中的属性不可修改

```js
let person = reactive({
  name: "erin",
  age: 18,
  job: {
    j1: {
      salary: 20
    }
  }
})

person = readonly(person)   // person对象中的属性都不能修改 为只读
person = shallowReadonly(person)   // person对象中的第一层属性不能修改 为只读
```

----------------

### toRaw 转为普通对象

> 要点:
- 1. 将 响应式的数据 变回普通数据的
- 2. 它只能处理reactive生成的响应式对象 ref函数生成的不可以

```js 
  let person = reactive({
    name: "erin",
    age: 18,
    job: {
      j1: {
        salary: 20
      }
    }
  })


  const p = toRaw(person)
  console.log(p)    // 这个p就是普通对象了
```

----------------

### markRaw 将响应式对象去掉响应式

> 要点:
- 1. 第三方类库等不应该是响应式
- 2. 很大的数据结构 他们仅仅是用来展示的 不需要做响应式

```js
// 比如这是很大的数据结构
let data = reactive({
  name: "sam",
  age: 18
})

data = markRaw(data)
```

--------------------------

### provide 与 inject

- provide： 提供数据
- inject：  注入数据

> 要点:
- 1. 写在 setup() 函数中
- 2. provide("变量名", 数据)
- 3. inject("变量名")


```js
setup() {
  let car = reactive({
    name: "奔驰",
    price: "40w"
  })

  // 提供
  provide('car', car)

  // 接收
  let car = inject("car")
}
```

--------------------------

### 对响应式数据进行判断的api

> isRef(目标)
- 检查一个值是否为一个ref对象


> isReactive(目标)
- 检查一个对象是否是由 reactive 创建的响应式代理


> isReadonly(目标)
- 检查一个对象是否是由readonly创建的只读代理


> isProxy(目标)
- 检查一个对象是否是由reactive 或者 readonly 方法创建的代理
- readonly加工后的对象仍然是proxy类型的数据

--------------------------

### Teleprot组件

> 要点:
- 1. 使用在 html 模板中

  <teleport to="body">
    // 这里的结构 会出现在 body 里面
  </teleport>

- 2. to属性的值 可以是htm标签 或者 css选择器

--------------------------

### Suspense组件

> 要点:
- 1. 动态引入: defineAsyncComponent
- 定义一个异步组件 动态引入一个组件

  - import {defineAsyncComponent} from 'vue'
  - const Child = defineAsyncComponent(() => import("./components/child.vue"))

- 2. 问题: 使用动态引入就不会出现上述的问题 但是也有一个问题 就是app组件先回来会先展示 但是用户还以为页面里面没有东西呢 为了解决这个问题 满足用户的体验 我们就可以使用这个 Suspense 组件

<!-- 
  静态引入
  import Child from "./components/child.vue"

  使用静态引入 只要组件没有引入成功 我整个app组件都不进行渲染 要等待目标组件引入完成
  整个应用什么时候展示出来取决于最慢的那个组件
 -->

  <Suspense>包裹异步方式引入的组件</Suspense>


```html
<Suspense>

  <template v-slot:default>
    用于放置异步组件
  </template> 

  <template v-slot:fallback>
    用于放置组件来没有回来时候的展示内容
  </template> 


  ---

  <template>
    <div class="app">
      <h3>App</h3>
      <Suspense>

        <template v-slot:default>
          <Child />
        </template> 

        <template v-slot:fallback>
          <h3>稍等加载中。。。</h3>
        </template> 

      </Suspense>
    </div>
  </template>

</Suspense>
```