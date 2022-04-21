### 更新补足

- *官方*:
- https://staging-cn.vuejs.org/api/application.html#appmixin

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

### 禁用 Attribute 继承
- 如果你不想要一个组件自动地继承 attribute，你可以在子组件选项中设置 inheritAttrs: false。
- 如果你使用了 <script setup>，你需要一个额外的 <script> 块来书写这个选项声明：

```html
<script>
// 使用一个简单的 <script> to declare options
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup 部分逻辑
</script>

```

> 在 JavaScript 中访问透传 Attribute
- 如果需要，你可以在 <script setup> 中使用 useAttrs() API 来访问一个组件的所有透传 attribute：
- 也就是Vue2中的 $attrs

```html
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

- 如果没有使用 <script setup>，attrs 会作为 setup() 上下文对象的一个属性暴露：
```js
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs)
  }
}
```

------

### Vue3中的事件总线
- Vue 3.x 移除了 $on $off 和 $once 这几个事件 API ，应用实例不再实现事件触发接口。

> 使用事件总线的方式1:
- 利用 第三方插件:
- 我们可以用 mitt 或者 tiny-emitter 等第三方插件来实现 EventBus 。

> 创建 3.x 的 EventBus
- 这里以 mitt 为例，示范如何创建一个 Vue 3.x 的 EventBus 。

> 安装:
- 1. npm install --save mitt

- 2. 然后在 libs 文件夹下 内容很简单 如下
```js
import mitt from 'mitt';
export default mitt();
```

- 3. 使用 bus 的页面需要引入
- import bus from "./libs/bus"

- 然后就可以通过 bus 定义发起和接收的相关事件了，常用的 API 和参数如下：

> on: 
- 注册一个监听事件，用于接收数据

- 参数:
- type: 方法名
- handler: 回调

> emit: 
- 调用方法发起数据传递
- type: 与 on 对应的方法名
- data: 与 on 对应的，允许接收的数据


> off: 
- 用来移除监听事件
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


> 自己总结的代码
```html
<!-- 父组件 监听bus中事件的组件 -->
<script>
import {ref, reactive, onMounted, watch, watchEffect, toRef, computed, $ref, $computed} from "vue"
import Child from "./components/Child.vue"
import bus from "./libs/bus"

export default {
  components: {
    Child
  },
  setup() {
    
    onMounted(() => {
      bus.on("showData", data => {
        console.log(data)
      })
    })
   
  }
}
</script>


<!-- 子组件 发送自定义事件的组件-->
<script>
import {ref, reactive, onMounted, watch, watchEffect, toRef, computed} from "vue"
import bus from "../libs/bus.js"
export default {
  name: "Child",

  setup() {
    let data = reactive({
      msg: "我是子组件中定义的数据"
    })

    function sendData() {
      bus.emit("showData", data)
    } 
    
    return {
      sendData
    }
  }
  
}
</script>
```

- 定义 bus.js 文件
```js
import mitt from 'mitt';
export default mitt();
```


> 旧项目升级 EventBus
- 在 Vue 3.x 的 EventBus，我们可以看到它的 API 和旧版是非常接近的，只是去掉了 $ 符号。

- 如果你要对旧的项目进行升级改造，因为原来都是使用了 $on 、 $emit 等旧的 API ，一个一个组件去修改成新的 API 肯定不现实。
- 我们可以在创建 bus.ts 的时候，通过自定义一个 bus 对象，来挂载 mitt 的 API 。

> 在 bus.ts 里，改成以下代码：
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

### 引入 composition api 的位置
- 如果是vue3的项目 我们可以从 vue 里面引入 api
- 如果是nuxt或者下了composition api的包的话 我们要从 包里面引入
```js
import {defineComponent, reactive, getCurrentInstance} from "@nuxtjs/composition-api"
```

------

### 受限的全局访问
- 模板中的表达式将被沙盒化，仅能够访问到有限的全局对象列表。该列表中会暴露常用的内置全局对象，比如 Math 和 Date。

- 没有显式包含在列表中的全局对象将不能在模板内表达式中访问，
- 例如用户附加在 window 上的 property。然而，你也可以自行在 app.config.globalProperties 上显式地添加他们，供所有的 Vue 表达式使用。

------

### vue3.0中注入全局方法
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

### vue3.0中的this : getCurrentInstance 获取组件实例
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

  proxy.$attrs
  proxy.$data
  proxy.$el
  proxy.$emit
  proxy.$forceUpdate
  proxy.$nextTick
  proxy.$options
  proxy.$parent
  proxy.$props
  proxy.$refs
  proxy.$root
  proxy.$slots
  proxy.$watch

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

------

### DOM 更新时机
- 当你更改响应式状态后，DOM 也会自动更新。然而，你得注意 DOM 的更新并不是同步的。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次声明更改，每个组件都只需要更新一次。

- 若要等待一个状态改变后的 DOM 更新完成，你可以使用 *nextTick()* 这个全局 API：

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // 访问更新后的 DOM
  })
}
```

----------------

### Vue的创建
- Vue实例的创建 都是通过 createApp 函数创建的

> 1. 引入
- import {createApp} from "vue"

> 2. 使用 create()
- 参数
- createApp(根组件)

- 可以创建返回值
- const app = create(App)

> 3. 根组件的挂载 mount()
- 我们必须在调用 mount() 方法之后 根组件才会渲染出来
- 参数
- css选择器字符串

- 注意:
- .mount() 方法要在最后被调用 在整个应用配置和资源注册完成后被调用

----------------

### createApp() 详解

> createApp(Component, [options])
- 创建一个应用实例

- 参数:
- 参数1, 根组件
- 参数2, 可选 它是要传递给 根组件的props


> createSSRApp()
- 以 SSR 激活 模式创建一个应用实例。用法与 createApp() 完全相同。


> 多个应用实例
- 你不必再受限于一个页面只能拥有一个应用实例。createApp API 允许多个 Vue 应用共存于同一个页面上，而且每个应用都拥有自己的用于配置和全局资源的作用域。

```js
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

----------------

### app.mount() 详解
- 将应用程序实例挂载在一个容器元素中。
- 对每个应用实例，mount() 仅能调用一次。

> app.mount(css选择器)
```js
import { createApp } from 'vue'
const app = createApp(/* ... */)

app.mount('#app')
```


> app.unmount()
- 卸载一个已经挂载好的应用实例，会触发应用组件树上所有组件的卸载生命周期钩子。

----------------

### app.provide() 详解
- 供给一个值，可以被应用中所有后代组件注入。

> app.provide("key", data)
- 提供数据给组件树 组件树内都可以使用 inject 引入使用
- 注意: 
- 该方法是app身上的 所以不用 import 导入使用

```js
import {createApp} from "vue"
const app = create(App)

app.provide("key", data)


// 某个组件
import { inject } from 'vue'

export default {
  setup() {
    console.log(inject('message')) // 'hello'
  }
}
```

----------------

### app.component() 详解

> app.component("组件名", 组件)
- 这样注册的组件全局可用

- 注意:
- 如果我们只传递参数1 该方法将返回参数1所对应的组件
```js
const MyComponent = app.component('my-component')
```

- 该方法可以被链式调用
```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

----------------

### app.directive() 详解
- 注册全局指令
- 如果同时传递一个名字和一个指令定义，则注册一个全局指令；如果只传递一个名字，则会得到一个已经注册的指令。

> app.directive("指令名", {} or () => {})
- 使用方式应该和vue2差不多

```js
import { createApp } from 'vue'

const app = createApp({
  /* ... */
})

// 注册（对象形式的指令）
app.directive('my-directive', {
  /* 自定义指令钩子 */
})

// 注册（函数形式的指令）
app.directive('my-directive', () => {
  /* ... */
})

// 得到一个已注册的指令
const myDirective = app.directive('my-directive')
```

----------------

### app.use() 详解
- 安装一个 插件。

> app.use(插件, 插件选项)
- 希望将插件作为第一个参数，将插件选项作为可选的第二个参数。

----------------

### app.mixin() 详解
- 注册全局 mixin
<!-- 
  不推荐
  Mixins 在 Vue 3 支持主要是为了向后兼容，因为生态中有许多库使用到。目前 mixin，特别是全局 mixin，都应避免在应用程序代码中使用。
  若要进行逻辑重用，推荐采用 组合式函数 来替代。
 -->

----------------

### app.version
- 提供当前应用所使用的 Vue 版本号。这在 插件 中很有用，因为可能需要在不同的 Vue 版本上有不同的逻辑。

- 在一个插件中对版本作判断：
```js
export default {
  install(app) {
    const version = Number(app.version.split('.')[0])
    if (version < 3) {
      console.warn('This plugin requires Vue 3')
    }
  }
}
```

----------------

### app.config
- 上面我们会通过 create() 来返回一个 应用的实例 app 对象
- 该对象身上有一个 config 属性 允许我们配置一些应用级的选项

> app.config
- 配置一些应用级的选项 也可以理解为全局配置


> app.config.errorHandler = (err, errComponent, errSourceStr) => { ... }
- 定义一个应用集的错误处理器 它将捕获由子组件上抛而未被处理的错误

- 参数
- 1. err:
  错误对象
  
- 2. errComponent
  触发该错误的组件实例
  
- 3. errSourceStr
  一个指出错误来源类型信息的字符串。

- 它可以从下面这些来源中捕获错误：
  组件渲染器
  事件处理器
  生命周期钩子
  setup() 函数
  侦听器
  自定义指令钩子
  过渡（Transition）钩子


> app.config.globalProperties
- 该对象用于注册能够被应用内所有组件实例访问到的全局属性。
- 这是对 Vue 2 中 Vue.prototype 使用方式的一种替代，此写法在 Vue 3 已经不存在了。与任何全局的东西一样，应该谨慎使用。

- 如果全局属性与组件自己的属性冲突，组件自己的属性将具有更高的优先级。

```js
app.config.globalProperties.msg = 'hello'

// 这使得 msg 在应用的任意组件模板上都可用，并且也可以通过任意组件实例的 this 访问到：
export default {
  mounted() {
    console.log(this.msg) // 'hello'
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

- 7. 还有 <script setup> 这种写法


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


> <script setup>
> 要点:
- 1. 当你在单文件组件中使用了 <script setup>，导入的组件会自动进行局部注册：
- 如果不使用 那么我们就要手写 components 配置项
```html
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

----------------

### <script setup>
- 要使用这个语法，需要将 setup attribute 添加到 <script> 代码块上：

- 里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的 <script> 只在组件被首次引入的时候执行一次不同，<script setup> 中的代码会在每次组件实例被创建的时候执行。

> 顶层的绑定会被暴露给模板
- 当使用 <script setup> 的时候，任何在 <script setup> 声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 都能在模板中直接使用：
```html
<script setup>
// 变量
const msg = 'Hello!'

// 函数
function log() {
  console.log(msg)
}
</script>

<template>
  <div @click="log">{{ msg }}</div>
</template>
```

- import 导入的内容也会以同样的方式暴露。意味着可以在模板表达式中直接使用导入的 helper 函数，并不需要通过 methods 选项来暴露它：
```js
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```


> 响应式
- 响应式状态需要明确使用响应式 APIs 来创建。和从 setup() 函数中返回值一样，ref 值在模板中使用的时候会自动解包：
```html
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

> 动态组件
- 由于组件被引用为变量而不是作为字符串键来注册的，在 <script setup> 中要使用动态组件的时候，就应该使用动态的 :is 来绑定：

```html
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```


----------------

### setup 函数的参数

```js
  setup(props, context) {

  }
```

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

return {
  ...toRefs(props)    // 这样好像是响应式的
}
```


> <script setup> 情况下的props
- 上面我们是使用 props: [] 配置项的方式 来接收父组件传递给子组件的属性
- 当我们使用 这种模式的时候 怎么接收?

  <script setup>
    ...
  </script>



> defineProps(['title'])
- 我们需要传递一个数组进去 数组里面是 父组件 传递给 子组件 的props名
- 它跟 props 配置项的使用方式是一样的 我们也可以像props配置项那样传递一个对象

- defineProps 是一个仅 <script setup> 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props，因此我们在 JavaScript 中使用：

- 通过defineProps(['title'])方法直接将props暴露到html模板中
```html
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

- 通过该方法的返回值 拿到props对象
```js
// 拿到props
const props = defineProps(['title'])
console.log(props.title)
```

```js
// 使用 <script setup>
defineProps({
  title: String,
  likes: Number
})
```

- 如果你没有使用 <script setup>，props 必须以 props 选项的方式声明，props 对象会作为 setup() 函数的第一个参数：


> 响应式解构props
- 注意如果你从 props 对象上解构，被解构的变量将会丢失响应性。因此我们推荐通过 props.xxx 的形式来使用其中的属性。
- 如果你确实需要从 props 上解构，或者想要将某个 prop 传入到一个外部函数中但想保持响应性，那么你可以使用 toRefs() toRef() 这两个工具 API：
```js
import { toRefs } from 'vue'

export default {
  setup(props) {
    // 将 `props` 转为一个其中全是 ref 的对象，然后解构
    const { title } = toRefs(props)
    // `title` 是一个追踪着 `props.title` 的 ref
    console.log(title.value)

    // 或者，将 `props` 的单个属性转为一个 ref
    const title = toRef(props, 'title')
  }
}
```


> 参数 context: {attrs, slots, emit, expose}
- 值为对象, 它有4个属性

> attrs:
- 值为对象，包含：props配置项里没有接收的数据，就会保存在attrs对象中 相当于 this.$attrs

> slots:
- 收到的插槽内容 相当于 this.$slots

> expose:
- 暴露公共属性（函数）
- expose 这个函数可以用于在父组件中通过模板 ref访问本组件时，显式地限制所暴露的属性：
```js
export default {
  setup(props, { expose }) {
    // 这样会使得该组件处于 “关闭状态”
    // 即不向父组件暴露任何东西
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // 有选择地暴露局部状态
    expose({ count: publicCount })
  }
}
```


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

- 在 <script setup> 的写法中 怎么使用 emit
- 我们可以通过 defineEmits 宏来选择性地声明需要抛出的事件：

> defineEmits(["事件名"])
```html
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

- 和 defineProps 类似，defineEmits 仅可用于 <script setup> 之中，并且不需要导入，返回的 emit 函数可以被用于在 JavaScript 代码中抛出事件：
```js
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
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

  - ref(基本类型)
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


> 语法糖 $ref(0)
- 使用$可以直接使用该属性 无须.value
- 好像这种方式只能定义在 <script setup> 中

```js
let count = $ref(0)

function increment() {
  // 无需 .value
  count++
}
```

> 语法糖有如下这些
ref         -> $ref
computed    -> $computed
shallowRef  -> $shallowRef
customRef   -> $customRef
toRef       -> $toRef


> 还有 $() $$() 用于结构 官方文档中有 但没看
 
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

### 响应式对象的注意点
- 不要解构响应式对象 会失去响应式

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

    // 3 操作dom都要在这里操作吧
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


**注意:**
- 你只可以在组件挂载后才能访问 ref。如果你想在模板中的表达式上访问 input，在初次渲染时会是 null。
- 这是因为在初次渲染前这个元素还压根不存在呢！

- 如果你正试图观察一个模板 ref 的变化，确保考虑到 ref 的值为 null 的情况：
```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
})
```


> watchEffect((oninvalid) => {...})
- 参数
- oninvalid: 也是一个函数 需要传递一个回调进去

- oninvalid函数 每当我们监视的值发生变化的时候 它的回调会优先执行

```js
let ok = ref(true)

watchEffect( onInvalidate => {
  // 代码一
  console.log('执行一些代码', ok.value)
  console.log('执行更多的代码');
  // 代码二
  onInvalidate(()=>{ console.log('除了在初始运行时不被调用，我总是在【执行一些代码】之前被执行(调用)'); }) 
})
```

----------------

### 组件上的ref
- ref 也可以被用在一个子组件上。此时 ref 中引用的是组件实例：
- 也就是 组件的this

```html
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value 是 <Child /> 组件的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```

**注意:**
- 如果子组件使用的是 option api 或 没有使用 <script setup> 这样父组件对子组件的每一个属性和方法都有完全的访问权 通过 ref
- 如果子组件使用了 <script setup> 那么子组件就是私有的 一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西

- 但是可以通过 defineExpose宏显式 暴露


> defineExpose({})
```html
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
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


> 自定义事件
- 在*组件的模板表达式*中，可以*直接使用 $emit 函数*触发自定义事件 (例如：在 v-on 的处理函数中)：
```html
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```

- 父组件可以通过 v-on (缩写为 @) 来监听事件：
```html
<MyComponent @some-event="callback" />
```

- 同样，组件的事件监听器也支持.once 修饰符：
```html
<MyComponent @some-event.once="callback" />
```

**注意:**
- 和原生 DOM 事件不太一样，组件触发的事件不会冒泡。你只能监听直接子组件触发的事件。


> 参数的传递
> $emit("事件名", 数据1, 数据2)


> <script setup> 的情况下
- 我们在使用 setup() 函数的使用 子组件要发射自定义事件 需要在 emits 配置项中 先声明
- 那么 <script setup> 下怎么处理

> defineEmits(['inFocus', 'submit'])
- 使用宏命令来 声明要发射的事件
- 返回值:
- emit

```html
<script setup>
const emit = defineEmits(['inFocus', 'submit'])
</script>
```

- 返回的 emit 函数可以用来在 JavaScript 代码中触发事件。
- 如果你没有使用 <script setup>，则事件需要通过 emits 选项来定义，emit 函数也被暴露在 setup() 的上下文对象上：



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

- 5. 其返回值在js脚本中要使用 .value 模板中不用

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


**注意:**
- 1. 计算函数不应有副作用
- 计算属性的计算函数应只做计算而没有任何其他的副作用
- 举个例子，不要在计算函数中做异步请求或者更改 DOM！
- 一个计算属性的声明中描述的是如何根据其他值派生一个值。因此计算函数的职责应该仅为计算和返回该值

- 2. 避免直接修改计算属性值
- 从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。

- 3. 在计算属性中使用 *reverse() 和 sort()* 请保持谨慎！这两个方法将变更原始数组，计算函数中不应该这么做。请在调用这些方法之前创建一个原数组的副本：
```js
// return numbers.reverse()
return [...numbers].reverse()
```

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
       flush: 'post'    // 能访问被 Vue 更新之后的DOM

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


- 上面是对 watch 监视属性的一些基本的使用方法 现在我们来了解一些概念上的问题:
- 计算属性允许我们声明性地计算推导值。然而，在有些情况下，为了应对一些状态的变化，我们需要运行些“副作用”：例如更改 DOM，或者根据异步操作的结果，去修改另一处的状态。

- 比如下watch里面发送请求
- 我们可以使用 watch 函数在每次响应式状态发生变化时触发回调函数：

```html
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>
```


----------------

### watchEffect 函数
- watch() 是懒执行的：仅在侦听源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。
- 举个例子，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。我们可以这样写：

```js
const url = ref('https://...')
const data = ref(null)

async function fetchData() {
  const response = await fetch(url.value)
  data.value = await response.json()
}

// 立即获取
fetchData()
// ...再侦听 url 变化
watch(url, fetchData)
```

- 这段代码还可以用 watchEffect 函数 来简化。watchEffect() 会立即执行一遍回调函数，如果这时函数产生了副作用，Vue 会自动追踪副作用的依赖关系，自动分析出响应源。上面的例子可以重写为：

```js
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

- 这个例子中，回调会立即执行。在执行期间，它会自动追踪 url.value 作为依赖（近似于计算属性）。每当 url.value 变化时，回调会再次执行



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


> watch vs. watchEffect
- watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- watch 只追踪明确侦听的源。它不会追踪任何在回调中访问到的东西。另外，仅在响应源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。

- watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式 property。这更方便，而且代码往往更简洁，但其响应性依赖关系不那么明确。


**注意: 回调的刷新时机**
- 当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。
- 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。*这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。*

- 如果想在侦听器回调中能访问被 Vue 更新之后的DOM，你需要指明 flush: 'post' 选项：

```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

> watchPostEffect()
- 后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()：
- import { watchPostEffect } from 'vue'

```js
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```


> 停止侦听器
- 在 setup() 或 <script setup> 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。

- 一个关键点是，侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：
```html
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

- 要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数：
```js
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

- 注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：
```js
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```


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

- 最常用的是 onMounted，onUpdated 和 onUnmounted

**注意:**
- 当调用 onMounted 时，Vue 会自动将注册的回调函数与当前活动组件实例相关联。这就要求这些钩子在组件设置时同步注册。例如请不要这样做：
```js
setTimeout(() => {
  onMounted(() => {
    // 这将不会正常工作
  })
}, 100)
```

- 请注意，这并不意味着对 onMounted 的调用必须放在 setup() 或 <script setup> 内的词法环境下。onMounted() 也可以在一个外部函数中调用，只要调用栈是同步的，且最终起源自 setup()。



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

- 4. hooks引入后 也可以传递参数 usePoint(参数) 到hooks文件中
 
- 5. hooks中可以执行副作用 确保在 onUnmounted() 时清理副作用。举个例子，如果一个组合式函数设置了一个事件监听器，它就应该在 onUnmounted() 中被移除 (就像我们在 useMouse() 示例中看到的一样)。当然也可以像之前的useEventListener() 示例那样，使用一个组合式函数来自动帮你做这些事。

- https://staging-cn.vuejs.org/guide/reusability/composables.html#async-state-example

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

### Vue3中 路由的使用
- https://next.router.vuejs.org/
- 根据用户输入的地址 动态的挂载组件 

> 安装
- npm i vue-router@next --save


> 配置
```js
import Vue from 'vue'
import {
  createRouter, 
  createWebHashHistory
} from 'vue-router'

Vue.use(VueRouter)

// 准备组件
import Test from "./components/Test.vue"

const routes = [
  {
    path: "/",
    component: Test
  }
]

const router = createRouter({
  mode: createWebHashHistory(),
  routes
})

export default router


// 挂载router
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js"

createApp(App).use(router).mount('#app')

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

### 组合式 API

> nextTick()
- 当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存到“next tick”以确保每个组件无论发生多少状态改变，都仅执行一次更新。

- nextTick() 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。

```html
<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM 此时已经更新
  console.log(document.getElementById('counter').textContent) // 1
}
</script>

<template>
  <button id="counter" @click="increment">{{ count }}</button>
</template>
```


> defineComponent()
- 在定义 Vue 组件时提供类型提示的帮助函数。
- 

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
  count: number | string,

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

> 如何在调用方法的时候传值
```html
<button @click="setTile('改变后的title')">
```

```js
// 定义接口
interface News {
  title: string,
  desc: string,
  count: number | string,

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


// 上面定义类型 下面写配置项
export default defineComponent({
  data() {
    return newsData
  },
  methods: {

    // 返回值类型
    setCount():void {
      this.count = "123456"
    },

    // 函数的参数
    setTitle(title:string):void {
      this.title = title
    }
  },

  // 返回值类型
  computed: {
    reverseTile():string {
      return this.title.split("").reverse().join("")
    }
  }
})
```


**注意:**
- 上面我们在 setTitle() 方法中 对形参进行了 类型的鉴定 但是我们发现个问题

- 当我们在 html 模板中 传入 123 'abc' 都好用
- 也就是当我们在 模板中 调用方法 它不会对类型做校验 但是在js部分里面调用方法 才会进行类型的校验

------

> 如何在组合式api中使用ts
```html
<!-- 
  因为我们使用 toRefs 将对象中的属性单独拿出来了
 -->
<div>
    username={{username}} <br>
    <button @click="setUsername">click
</div>
```
```js
export default defineComponent({
  // 所有的组合式api都放在 setup 中 
  setup() {

    let user = reactive({
      username: "张三",
      age: 20,
      setUserName() {
        this.username = "李四"
      }
    })


    return {
      // 使用toRefs返回 响应式 数据
      ...toRefs(user)
    }
  }
})
```

- 上面还没有使用ts 如果我们想使用ts应该怎么操作呢？
- 步骤:
- 1. 在 export default 的外侧 定义一个接口
- 2. 让reactive的对象实现接口

```js
interface User {
  username: string,
  age: number | string,
  setUsername(username: string): void,
  getUsername(): string
}

export default defineComponent({
  setup() {
    // 方式1: 
    let user: User = reactive({
      username: "张三",
      age: 20,
      setUserName(username: string) {
        this.username = name
      }
    })


    // 方式2:
    // reactive底层使用了泛型 继承了 T 所以我们可以通过泛型指定类型 User类对参数进行了约束
    let user = reactive<User>({
      username: "张三",
      age: 20,
      setUserName(username: string) {
        this.username = name
      }
    })


    // 方式3:
    // 使用 as
    let user = reactive({
      username: "张三",
      age: 20,
      setUserName(username: string) {
        this.username = name
      } 
    }) as User



    // ref的ts -- 只有这一种方式
    // ref底层是也继承了泛型 T 所以我们也可以传入泛型
    let count = ref<number | string>(20)



    // 计算属性的ts
    // 在形参()的后面指定
    let reverseUserName = computed(():stirng => {
      return user.username.split("").reverse().join("")
    })



    return {
      ...toRefs(user),
      count,
      reverseUserName
    }
  }
})
```