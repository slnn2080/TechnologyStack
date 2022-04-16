### 更新补足
- 文档:
- https://v3.cn.vuejs.org/guide/composition-api-introduction.html#setup-%E7%BB%84%E4%BB%B6%E9%80%89%E9%A1%B9

- *这个文档也不错*
- https://vue3.chengpeiquan.com/update.html#%E4%BD%BF%E7%94%A8-vue-2

- setup:
- https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E5%8F%82%E6%95%B0

- 个人文档
- http://www.liulongbin.top:8085/#/

- 资料:
- https://www.jianshu.com/p/0791fc7e120c

- composition api文档
- https://composition-api.nuxtjs.org/getting-started/introduction

- mixin 和 hooks 的区别
- https://www.jianshu.com/p/b1695fd3cc3a

------

> Vue3中的事件总线
- Vue 3.x 移除了 $on 、 $off 和 $once 这几个事件 API ，应用实例不再实现事件触发接口。

- 我们可以用 mitt 或者 tiny-emitter 等第三方插件来实现 EventBus 。

> 创建 3.x 的 EventBus
- 这里以 mitt 为例，示范如何创建一个 Vue 3.x 的 EventBus 。

> 安装:
- 1. npm install --save mitt

- 2. 然后在 libs 文件夹下，创建一个 bus.ts 文件，内容和旧版写法其实是一样的，只不过是把 Vue 实例，换成了 mitt 实例。
```js
import mitt from 'mitt';
export default mitt();
```

- 然后就可以定义发起和接收的相关事件了，常用的 API 和参数如下：
- on: 注册一个监听事件，用于接收数据
    - 参数:
    - type: 方法名
    - handler: 回调

- emit: 调用方法发起数据传递
    - type: 与 on 对应的方法名
    - data: 与 on 对应的，允许接收的数据


- off: 用来移除监听事件
    - type: 与 on 对应的方法名
    - handler: 要删除的，与 on 对应的 handler 函数名

> 创建和移除监听事件
- 在需要暴露交流事件的组件里，通过 on 配置好接收方法，同时为了避免路由切换过程中造成事件多次被绑定，多次触发，需要在适当的时机 off 掉：
```js
import { defineComponent, onBeforeUnmount } from 'vue'
import bus from '@libs/bus'

export default defineComponent({
  setup () {
    // 定义一个打招呼的方法
    const sayHi = (msg: string = 'Hello World!'): void => {
      console.log(msg);
    }

    // 启用监听
    bus.on('sayHi', sayHi);

    // 在组件卸载之前移除监听
    onBeforeUnmount( () => {
      bus.off('sayHi', sayHi);
    })
  }
})
```

> 调用监听事件
```js
import { defineComponent } from 'vue'
import bus from '@libs/bus'

export default defineComponent({
  setup () {
    // 调用打招呼事件，传入消息内容
    bus.emit('sayHi', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈');
  }
})
```

> 旧项目升级 EventBus
- 在 Vue 3.x 的 EventBus，我们可以看到它的 API 和旧版是非常接近的，只是去掉了 $ 符号。

- 如果你要对旧的项目进行升级改造，因为原来都是使用了 $on 、 $emit 等旧的 API ，一个一个组件去修改成新的 API 肯定不现实。

- 我们可以在创建 bus.ts 的时候，通过自定义一个 bus 对象，来挂载 mitt 的 API 。

- 在 bus.ts 里，改成以下代码：
```js
import mitt from 'mitt';

// 初始化一个 mitt 实例
const emitter = mitt();

// 定义一个空对象用来承载我们的自定义方法
const bus: any = {};

// 把你要用到的方法添加到 bus 对象上
bus.$on = emitter.on;
bus.$emit = emitter.emit;

// 最终是暴露自己定义的 bus
export default bus;

```

- 这样我们在组件里就可以继续使用 bus.$on 、bus.$emit 等以前的老 API 了，不影响我们旧项目的升级使用。

------

> 引入 composition api 的位置
- 如果是vue3的项目 我们可以从 vue 里面引入 api
- 如果是nuxt或者下了composition api的包的话 我们要从 包里面引入
```js
import {defineComponent, reactive, getCurrentInstance} from "@nuxtjs/composition-api"
```

------

> vue3.0中注入全局方法
- 1. 引入 createApp 创建 实例
- 2. 通过实例对象 app 进行全局挂载 config.globalProperties
```js
import {createApp} from "vue"
import App from "./App.vue"

import api from "./http/api/api" // 后端数据接口
const app = createApp(App)
app.config.globalProperties.$api = api

app.mount("#app")
```

------

> vue3.0中的this : getCurrentInstance 获取组件实例
- getCurrentInstance代表全局上下文，ctx相当于Vue2的this

**注意:**
- ctx代替this只适用于开发阶段，等你放到服务器上运行就会出错，后来查阅资料说的得用proxy替代ctx，才能在你项目正式上线版本正常运行

> 获取 proxy
- 使用方式:
```js
import {getCurrentInstance} from "vue"

setup() {
  let {proxy} = getCurrentInstance()
}
```

> proxy身上就是组件实例身上的属性和方法
- $nuxt 就可以用来做事件总线

```js
console.log("proxy", proxy)
console.log("proxy.$nuxt", proxy.$nuxt)

console.log("proxy.$router", proxy.$router)
console.log("proxy.$route", proxy.$route)

console.log("proxy.$axios", proxy.$axios)
console.log("proxy.$config", proxy.$config)

console.log("proxy.$data", proxy.$data)   // 这个没有
```

------

> 在 setup 中访问路由和当前路由
- https://router.vuejs.org/zh/guide/advanced/composition-api.html#%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB
- 因为我们在 setup 里面没有访问 this，所以我们不能再直接访问 this.$router 或 this.$route。作为替代，我们使用 useRouter 函数：
- import { useRouter, useRoute } from 'vue-router'
```js
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query,
        },
      })
    }
  },
}
```

------

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

> 扩展
- context中新增了好多 也可能是nuxt这边特有的
```js
isServer: (...)         // 可以判断是否是服务端
listeners: Object       
parent: VueComponent    // 父组件
refs: (...)             // dom节点
root: Vue               // 根组件
ssrContext: undefined
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

**要点**
- 1. 自定义hooks里面可以用组合式 api 但是不知道能不能使用setup 其实也没有必要使用setup不是么

- 2. 组件里的自定义hooks调用代码最好放在setup里第一行位置，这样比较明确，不容易被遗漏。

- 3. 导出的function只需要return组件里要引用的数据；对于组件里不需要引用的就不需要return，组件里只调用导入的函数即可。

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

----------------

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

----------------

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

----------------

### Teleprot组件

> 要点:
- 1. 使用在 html 模板中

  <teleport to="body">
    // 这里的结构 会出现在 body 里面
  </teleport>

- 2. to属性的值 可以是htm标签 或者 css选择器

----------------

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

----------------

### 路由的配置
> 路由的目录结构
- 3.x 引入路由的方式和 2.x 一样，如果你也是在创建 Vue 项目的时候选择了带上路由，那么会自动帮你在 src 文件夹下创建如下的目录结构。如果创建时没有选择，那么也可以按照这个结构自己创建对应的文件。
<!-- 
  | - router
    - index.js
    - routes.js

- 其中 index.ts 是路由的入口文件，系统安装的时候也只有这个文件，routes.ts 是我自己加的，主要用于集中管理路由，index.ts 只用于编写路由的创建、拦截等逻辑功能。

- 因为大型项目来说，路由树是很粗壮的，往往需要配置上二级、三级路由，逻辑和配置都放到一个文件的话，太臃肿了。
 -->

**注意:**
- 需要注意的是，与 Vue 3.x 配套的路由版本是 vue-router 4.x 以上，也就是如果一开始创建没有选择路由的话，后续自己安装，需要选择 vue-router@4 或者 vue-router@latest 才可以正确匹配。

```js
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // ...
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

> 属性详解:
- mode:
    决定访问路径模式，可配置为 hash 或者 history


> Vue 3.x 的引入方式如下（其中 RouteRecordRaw 是路由项目的 TS 类型定义）。
```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // ...
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

> 属性详解
- history:
    在 3.x ，使用 history 来代替 2.x 的 mode ，但功能是一样的


> 公共路径
- 在配置路由之前，需要先了解公共路径（publicPath）的概念，在 添加项目配置 部分，我们里面有一个参数，叫 publicPath，其实就是用来控制路由的公共路径，那么它有什么用呢？

- publicPath 的默认值是 /，也就是说，如果你不配置它，那么所有的资源文件都是从域名根目录读取，如果你的项目部署在域名根目录那当然好，但是如果不是呢？那么就必须来配置它了。

- 配置很简单，只要把项目要上线的最终地址，去掉域名，剩下的那部分就是 publicPath 。

<!-- 
  如果你的路由只有一级，那么 publicPath 也可以设置为相对路径 ./，这样你可以把项目部署到任意地方。

  如果路由不止一级，那么请准确的指定 publicPath，并且保证它是以 / 开头， / 结尾
 -->

- 假设你的项目是部署在 https://chengpeiquan.com/vue3/ ，那么 publicPath 就可以设置为 /vue3/。

- 通常我们开发环境，也就是本机ip访问的时候，都是基于根目录，但上线后的就不一定是根目录了，那么你在 vue.config.js 里可以通过环境变量来指定不同环境使用不同的 publicPath

```js
const IS_DEV = process.env.NODE_ENV === 'development' ? true : false;

module.exports = {
  publicPath: IS_DEV ? '/' : '/vue3/'
}
```


> 使用 route 获取路由信息
- 1. 导入路由组件
- 2. import { useRoute } from 'vue-router'

- 3. const route = useRoute();
- 刚刚导入的 useRoute 是一个函数，*需要在 setup 里定义*一个变量来获取路由信息。


> 使用 router 操作路由
- 1. import { useRouter } from 'vue-router'
- 2. const router = useRouter();


> 不生成 a 标签
- vue2中不生成a标签的使用方式:
```js
<template>
  <router-link tag="span" to="/home">首页</router-link>
</template>
```

- vue3中不生成a标签的使用方式:
- 需要通过 custom 和 v-slot 的配合来渲染为其他标签
```js
<template>
  <router-link
    to="/home"
    custom
    v-slot="{ navigate }"
  >
    <span
      class="link"
      @click="navigate"
    >
      首页
    </span>
  </router-link>
</template>
```

> 属性详解:
- custom:
    一个布尔值，用于控制是否需要渲染为 a 标签，当不包含 custom 或者把 custom 设置为 false 时，则依然使用 a 标签渲染。

- v-slot:
    是一个对象，用来决定标签的行为，它包含了：
    href:  
        解析后的URL，将会作为一个 a 元素的 href 属性

    route:
        解析后的规范化的地址

    navigate:
        触发导航的函数，会在必要时自动阻止事件，和 router-link 同理

    isActive:
        如果需要应用激活的 class 则为 true，允许应用一个任意的 class

    isExactActive:
        如果需要应用精确激活的 class 则为 true，允许应用一个任意的 class

<!-- 
  一般来说，v-slot 必备的只有 navigate ，用来绑定元素的点击事件，否则元素点击后不会有任何反应，其他的可以根据实际需求来添加。


  要渲染为非 a 标签，切记两个点：

  router-link 必须带上 custom 和 v-slot 属性
  最终要渲染的标签，写在 router-link 里，包括对应的 className 和点击事件
 -->

----------------

### Vue3 + TypeScript
- 怎么在创建项目后 添加 TS

- 1. vue create my-project-name
- 2. vue add typescript

---

- 或者在创建项目的时候 就选择集成ts

- 推荐配置
- 1. use class style component ... 
-> No

- 2. use babel alongeide typescript
-> Yes

- 3. convart all .js files to .ts
-> Yes

- 4. allow .js files to be compiled
-> Yes


> 使用方式:
- 1. <script lang="ts">
- 2. 
    import {defineComponent} from "vue"

    export default defineComponent({

    })

- 3. 给data中的数据 定义类型
```ts
// 方式1:
// 给title确定类型
let title: string = "我是Home组件"

export default defineComponent({
  data() {
    return {
      title
    }
  },
  methods: {
    // 无返回值
    setTitle(): viod {
      this.title = "修改后的Home - Tile"
    }
  }
})
```

> 通过泛型一次配置所有属性的类型
```js
{
  title,
  userInfo: {
    username: "sam",
  },
  age: 20,
  sex: "男"
}

---

// 定义接口
interface News {
  title: string,
  desc: string,
  count: number,

  // 可选参数
  content?: string
}

// 让一份数据实现这个News接口
let newsData: News = {
  title: "新闻",
  desc: "新闻描述",
  count: 12,
  content: "新闻内容"
}

export default defineComponent({
  data() {

    // 还能这么写
    return newsData
  }
})
```

> 计算属性的ts写法
```js
computed: {
  reverseTitle(): string {
    return "返回个字符串"
  }
}
```

> 要点:
- 1. Ts中 引入组件的时候 要加上 .vue

------

> 组合式api 怎么指定ts

