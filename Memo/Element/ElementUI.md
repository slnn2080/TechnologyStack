### Element UI
- ElementUI是一套为传统桌面准备的基于Vuejs的前端组件库

> 使用脚手架创建一个项目
- vue create 项目名

> 安装 element-ui
- npm i element-ui -S

> 在main.js文件中 引入Element UI 并注册
- import Vue from 'vue';

- import ElementUI from 'element-ui';
- import 'element-ui/lib/theme-chalk/index.css';
- import App from './App.vue';

- Vue.use(ElementUI);


> 简单的按钮的使用
<!-- 
  <el-row>
    <el-button type='primary'>按钮</el-button>
  </el-row>
 -->



### Layout布局
> 基本概念: 一行通过分割 24 栅格栏进行布局, 如果要占满一行如下
<!-- 
  <el-row>      // el-row 表示一行
    <el-col>    // el-col 表示一列

        <div>
          官方推荐列内的内容要加一个div
        </div>

    </el-col>
  </el-row>
 -->


> 给<el-row>添加样式 直接.el-row
- 相当于Bootstrap中的 col-md-* 类名 所以直接修改样式就可以
<!-- 
  .el-row {
    background-color:aqua;
    margin: 10px 0;
  }

  .el-col {
    background-color:chocolate;
    color:#fff;
    padding:10px 0;
  }
 -->


> <el-col :span='数字'>
- <el-col :span='数字'> 控制该列占 ?/24
<!-- 
  <el-row>
    <el-col :span='12'>12</el-col>
    <el-col :span='12'>12</el-col>
  </el-row>
 -->

- 4列 占满一行
<!-- 
  <el-row :gutter='10'>

      <el-col :span='6'>
        <div class='target'>6</div>
      </el-col>

      <el-col :span='6'>
        <div class='target'>6</div>
      </el-col>

      <el-col :span='6'>
        <div class='target'>6</div>
      </el-col>

      <el-col :span='6'>
        <div class='target'>6</div>
      </el-col>

  </el-row>
 -->


> ElementUI建议 <el-col> <div>内容</div> </el-col> 中的内容用<div>包裹


> <el-row :gutter='数字'>
- 指定每一栏之间的间隔，默认间隔为 0
- 注意 每一栏之内要用<div></div>把内容包裹起来
<!-- 
  // :gutter='10' 我们设置了 栏与栏 之间的间距为10 
  // 注意:  <el-col> 中的内容要用 <div>包裹</div>

  <el-row :gutter='10'>

    <el-col :span='6'>
      <div class='target'>6</div>
    </el-col>

    <el-col :span='6'>
      <div class='target'>6</div>
    </el-col>

  </el-row>


  | 一栏  |  -- 间距10 -- |  二栏  |
 -->


> <el-row type='flex' justify='space-around'>
- 控制一行内栏位的对齐方式 可以通过justify来设置方向
- 开启flex布局
- start, center, end, space-between, space-around
<!-- 
  // 我们一行放3列 每列占4
  <el-row type='flex' justify='center'>

    <el-col :span='4'>
      <div>4</div>
    </el-col>

    <el-col :span='4'>
      <div>4</div>
    </el-col>

    <el-col :span='4'>
      <div>4</div>
    </el-col>

  </el-row>
 -->


> <el-col offset='数字'>
- 设置偏移 以 1/24 为基数
- 该列只能往左移动 不能往右移动
<!-- 
  <el-row type='flex' justify='space-between'>

    <el-col :span='6' offset='2'>
      <div>6</div>
    </el-col>

    <el-col :span='6' offset='-1'>    // 这里不能写负数 没有用处
      <div>6</div>
    </el-col>

  </el-row>
 -->



### Container布局容器
- 如果我们想要迅速布局一个类似后台布局的样式, 可直接使用Container布局

> <el-container>    是外部布局容器
> <el-header>       表示头
> <el-footer>       表示脚
> <el-main>         表示主体
> <el-aside>        表示侧边栏

> 这些组件的默认值
<!-- 
  参数          说明        类型    可选值    默认值

  Container Attributes:
    direction   子元素的排列方向    string    horizontal / vertical
    子元素中有 el-header 或 el-footer 时为 vertical，否则为 horizontal


  Header Attributes:
    height	  顶栏高度	  string  	—	  60px


  Aside Attributes
    width	  侧边栏宽度	  string	  —	  300px


  Footer Attributes
    height	底栏高度	    string  	—	  60px
 -->

- 如果只是一层<container>那么他们都是从上到下依次排列
<!-- 
  <el-container>
    <el-header>header</el-header>
    <el-aside>aside</el-aside>
    <el-main>main</el-main>
    <el-footer>footer</el-footer>
  </el-container>

  这里 <el-aside>  <el-main>  并不是左右结构
 -->

- 我们可以把再添加一层<container> 让<el-aside> <el-main> 变成左右结构
<!-- 
  <el-container>
    <el-header>header</el-header>

    <el-container>
      <el-aside>aside</el-aside>
      <el-main>main</el-main>
    </el-container>
    
    <el-footer>footer</el-footer>
  </el-container>
 -->



### Basic组件规范
- Basic组件有三个地方是不需要写代码的
- 这里将关于 颜色 字体 边框等规范要求
- 关于上面的 ElementUI自己的一套体系
-
- 颜色:
- https://element.eleme.cn/#/zh-CN/component/color

- 字体:
- https://element.eleme.cn/#/zh-CN/component/typography
<!-- 
  body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  line-height:1     无行高
  line-height:1.3   紧凑
  line-height:1.5   常规
  line-height:1.7   宽松

  正文	    14px  Base	
  小标题	  16px  Medium	
  标题	    18px  large	
  主标题	  20px  Extra large	
 -->

- 边框
<!-- 
  小圆角
  border-radius: 2px

  大圆角
  border-radius: 4px

  圆形圆角
  border-radius: 30px

  基础投影 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

  浅色投影 
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
 -->


> 颜色:  主色  辅助色  中性色

> 字体:  字体  字号  行高

> 边框:  实现  虚线  圆角  投影



### 按钮  图标字体
> <el-button type='颜色'>
- 定义按钮 同时定义颜色
<!-- 
  <el-button type='primary'>按钮</el-button>
  <el-button type='danger'>按钮</el-button>
  <el-button type='warning'>按钮</el-button>
  <el-button type='success'>按钮</el-button>
  <el-button type='info'>按钮</el-button>
 -->

> <el-button plain> 
- 镂空效果的按钮
<!-- 
  <el-button type='primary' plain>按钮</el-button>
  <el-button type='danger' plain>按钮</el-button>
  <el-button type='warning' plain>按钮</el-button>
  <el-button type='success' plain>按钮</el-button>
  <el-button type='info' plain>按钮</el-button>
 -->

> <el-button disabled>
- 禁用

> <el-button round>
- 椭圆按钮

> <el-button circle>
- 圆按钮
- 这里不要用文字, 使用图标字体

> <el-button type='text'>按钮</el-button>
- 纯文本按钮 (看起来像是一个超链接)

> <el-button-group> 将多个按钮设置成按钮组合
- 效果就是两个按钮是紧紧的连在一起的, 小白线分割, 比如连在一起的上一页 下一页
<!-- 
  <el-button-group>
    <el-button type='success'>上一页</el-button>
    <el-button type='danger'>下一页</el-button>
  </el-button-group>
 -->

> <el-button :loading='true' type='primary'>加载中</el-button>
- 实现加载中的按钮 还有转圈的效果 牛p

> <el-button type='success' size='mini'>按钮</el-button>
- 通过 size属性 设置它们 按钮有3中不同的尺寸 medium small mini


> 字体图标 标签内部通过类名class属性  'el-icon-iconName'
- <el-button circle class='el-icon-user'></el-button>
- https://element.eleme.cn/#/zh-CN/component/icon



### Radio 

> <el-radio v-model='sex' label='0'>男</el-radio>
> <el-radio v-model='sex' label='1'>女</el-radio>
- 我们使用单复选框, 一般都会使用v-model绑定变量, <el-radio>组件中label就是值(value), 当label和变量一致时, 该按钮就会被选中

- 注意:
- label的值的类型是字符串

<!-- 
  <div class="radiocheck">
    <el-radio v-model='sex' label='0'>男</el-radio>
    <el-radio v-model='sex' label='1'>女</el-radio>
  </div>

  data() {
   return {
     sex = '1'
   }
 }
 -->


> ElementUI中建议 单选框 和 复选框都要作用 单选框组
- 适用于在多个互斥的选项中选择的场景
- 结合<el-radio-group>元素和子元素<el-radio>可以实现单选组
- 在<el-radio-group v-model='变量'>
<!-- 
  在<el-radio-group v-model='变量'>中绑定变量 -
-->

- 在<el-radio label='设置值'>
<!-- 
  在<el-radio label='设置值'>中设置label值
-->

- 无需再给每一个<el-radio>绑定变量
- 另外ElementUI还提供了change事件来响应变化, 它会传入一个参数 value
<!-- 
  <el-row>
    <el-radio-group v-model='sex'>
      <el-radio label='1'>男</el-radio>
      <el-radio label='0'>女</el-radio>
      <el-radio label='2'>中性</el-radio>
    </el-radio-group>
  </el-row>

  data() {
    return {
      sex : '1'
    }
  }
 -->

> 注意:
- 正常来说 <el-radio label='值的类型是字符串'> 那就会要求 data中的变量的值的类型也是字符串

- 当data中变量的类型是数字的时候
<!-- 
  data() {
    return {
      sex: 1
    }
  }
 -->

- 我们就要使用 v-bind绑定label <el-radio :label='值的类型是字符串'>


> <el-radio border>
- 按钮会带有边框

> <el-radio disabled>
- 按钮会被禁用

> <el-radio-button>
- 将单选框改为按钮的样式

> <el-radio size='mini'> or <el-radio-button size='mini'>
- 使用size属性 设置按钮的大小

> @change 事件
- 该方法会自动将 radio 的值传递进来
<!-- 
  // 我们在<el-radio-group>中绑定的@change事件
  <el-radio-group v-model='sex' @change='radioChange'>
    <el-radio-button label='1'>男</el-radio-button>
    <el-radio-button label='0' border>女</el-radio-button>
    <el-radio-button label='2' disabled>中性</el-radio-button>
  </el-radio-group>

  data() {
   return {
     sex : 1,
     msg: ''
   }
 },
 methods: {
   // 这里会将 radio 的结果作为值 传递进来 
   radioChange(v) {
     this.msg = v
   }
 }
 -->

---- 

### CheckBox

> <el-checkbox>
- 基本用法和上面一致
- 单独使用可以表示两种状态之间的切换, 写在标签中的内容为checkbox按钮后的介绍

- 场景1: 单一复选框
- □同意
- 在<el-checkbox>元素中定义 v-model 绑定变量, 单一的 checkbox中, 默认绑定变量的值会是Boolean 选中为true
<!-- 
  <el-checkbox v-model="checked">备选项</el-checkbox>

  data() {
    return {
      checked: true
    }
  },
 -->


- 场景2:
- 复选框组
- 复选框绑定的变量类型是一个数组, 数组中有的属性就会被选中, 比如我要是去掉电脑那页面上电脑就不会被选中
<!-- 
  <el-row>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label='音乐'></el-checkbox>
      <el-checkbox label='体育'></el-checkbox>
      <el-checkbox label='电脑'></el-checkbox>
    </el-checkbox-group>
  </el-row>

  checkList: ['音乐', '体育', '电脑']
 -->


> <el-checkbox :max / :min='数字'>
- 选择最大 / 最小勾选的数量
- 效果: :max='2' 一共3个复选框, 只能勾选2个, 第3个就不能勾选了

> <el-checkbox-button>
- 和radio一样 支持使用el-check-button的样式

> <el-check-group @change='checkBox'>
- 和radio一样 支持使用 @change事件



### input输入框
- input组件属于受控组件 标签内部必须使用 v-model 绑定变量

> <el-input>
- 我们通过这个组件来实现输入框, 注意它的长度要配合<el-col>来使用
<!-- 
  <el-input v-model='input1'></el-input>

  通过v-model绑定data中的变量
 -->

> <el-input clearable>
- 提供框内清空按钮
- 按按钮后 实现清空文本框内的内容

> <el-input show-password>
- 实现密码框
- 将文本框变成密码框, 同时还带小眼睛

> <el-input maxlength='10' show-word-limit>
- maxlength属性 设置输入限制
- show-word-limit 配合使用 效果为  0/10

> <el-input prefix-icon='el-icon-iconname'>
- 设置前缀图标 效果就是图标在文本框里面
- 支持slot方式
<!-- 
  <el-input prefix-icon='el-icon-search'></el-input>
 -->

> <el-input suffix-icon='el-icon-iconname'>
- 设置后缀图标 效果就是图标在文本框里面
- 支持slot方式
<!-- 
  <el-input suffix-icon='el-icon-date'></el-input>
 -->

<!-- 
  前缀图标
  后缀图标 slot 方式

  <el-input>
    <i slot='suffix' class='el-input__icon el-icon-date'></i>
  </el-input>

  el-input__icon 用于调整图标的位置 默认上对齐 加上居中显示
  el-icon-date   图标
  slot='suffix'  在前面还是后面插入
 -->

> <el-input type='textarea' v-model='textarea'>
- 可以将输入框设置为文本域
- 使用属性 autosize 可以自动扩展其高度根据内容
- 必须要使用v-model 因为不加文本域不能输入文本


> <el-input :disabled="true">
- 通过 disabled 属性指定是否禁用 input 组件

> <el-input size=" large | small | mini | medium">
- 可通过 size 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。


> 复合型输入框 
> <el-input><template slot='prepend / append'></template></el-input>
- 一个输入框被分为几个部分 可前置或后置元素, 一般为标签或按钮
- 效果 一个输入框 前面有默认文本
- 效果 一个输入框 后面有默认文本
- 效果 一个输入框 前面是下拉菜单 后面是图标字体

<!-- 
  <el-input>
    <template slot='prepend'>http://</template>
  </el-input>

  <el-input>
    <template slot='append'>.com</template>
  </el-input>
 -->


> 带输入建议的文本框
- 根据输入内容提供对应的输入建议

- 两种模式
- 1. 激活即列出输入建议
<!-- 输入文字后从弹出层下拉里选择文本 -->

- 2. 输入后匹配输入建议
<!-- 自动弹出符合输入文本内容 -->

- 使用方式

> <el-autocomplete :fetch-suggestions='querySearch'></>
- 里面的数据可以是本地 也可以是远程
- 这里相关的方法 querySearch 和 自动载入的 loadAll() 直接复制即可 固定格式
- 关于事件, 输入框有: focus / blur / select  自动完成有 select / change
<!-- 
  fetch-suggestions 是一个返回输入建议的方法属性
  querySearch(queryString, cb) 在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中。
 -->

- 使用方法(数据本地的演示)
- 1. <el-autocomplete></el-autocomplete>

- 2. 获取数据, 复制loadAll()方法, 在methods中, 这里可以是远程的数据, 也可以是自己写的数据 loadAll中是return的数组 里面是一个个的对象, 对象里面是json格式的数据
<!-- 
  loadAll() {
    return [
      { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
      ...
    ]
  }
 -->

- 3. 在mounted() {}中把this.loadAll() 加载在restaurants属性上
<!-- 
  mounted() {
    this.restaurants = this.loadAll();
  }
 -->

- 4. 复制两个方法跟loadAll一样 也放在methods中 这两个方法用于检索
<!-- 
  querySearch(queryString, cb) {
    var restaurants = this.restaurants;
    var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
    // 调用 callback 返回建议列表的数据
    cb(results);
  },
  createFilter(queryString) {
    return (restaurant) => {
      return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    };
  },
 -->

- 5. <el-autocomplete :fetch-suggestions='querySearch' v-model='state'></> 添加v-model绑定一个变量

> 完整的代码
<!-- 
  <div>
    <el-autocomplete v-model='state' :fetch-suggestions='querySearch'></el-autocomplete>
  </div>


  data() {
   return {
     restaurants:[],
     state:''
   }
 },
 mounted() {
    this.restaurants = this.loadAll();
  },
 methods: {
   querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
   loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
 }
 -->

- 还有很多 我们没事的时候可以看看
- https://element.eleme.cn/#/zh-CN/component/input



### inputNumber
- 必须使用v-model绑定
- 事件支持, change / blur / focus
- 方法支持, focus / select(区别 无回调)

> <el-input-number v-model="number"></>
- 输入框中的计数器
- 效果一个输入框 两边是 - 数字 + 
- 也是必须要使用v-model


> <el-input-number v-model="number" :max='5' :min='1' @change='change'>
- 使用:max / :min 限制最大值和最小值, 支持change事件
<!-- 
  <el-input-number v-model="number" :max='5' :min='1' @change='change'>

  change(e) {
    console.log(e)
  }
 -->

> <el-input-number v-model="number" :step='1' :precision='2'>
- 设置 disabled禁用, 设置:step=1为增减步长, 设置:precision=2 为小数点精度
- 小数点后面留几位 比如 7.00

> <el-input-number v-model='number' controls-position='right'>
- 使用controls-position可以设置增减按钮的位置
- 增减按钮会变成上下的箭头在输入框的右侧



### Select
- 跟input一样 也必须使用v-model绑定

> 基本使用方式
- 1. <el-select placeholder='请下拉'></>
- 2. <el-select v-model='value'> 需要v-model
<!-- 
  <el-select placeholder='请下拉' v-model="value">

  data() {
    return {
      value: ''   // 没有选择的时候select是空的 默认为空 显示请下拉
    }
  }
 -->

- 3. <el-option v-for='item of options' :label='item.label' :value='item.value' :key='item.value'> 
- 要同时使用v-bind绑定 label 和 value

- value: 是发送到服务器的值
- label: 用于显示在界面上的值
<!-- 
  <el-option v-for='item of options' :label='item.label'></el-option>
  // 绑定label 是将北京上海广州显示在下拉框中
  options: [
    {
      value: 1,      // 发送出去的值
      label: '北京'  // 显示在下拉菜单里面的值
    },
    {
      value: 2,      
      label: '上海'  
    },
    {
      value: 3,      
      label: '深圳'  
    },
  ]
 -->


> 禁用表单
- 1. 在 <el-select>中设置 disabled
<!-- 
  <el-select placeholder='请下拉' v-model="value" disabled>

  效果: 整个表单都会被禁用
 -->

- 2. 在 <el-option>中设置:disabled='item.value===1'
<!-- 
  <el-option v-for='item of options' :label='item.label' :value='item.value' :disabled='item.value===2'></el-option>

  效果: 禁用option中的一项
 -->


> 清空选择的项目, 多选项目
- 在<el-select>中使用 clearable multiple属性
- <el-select clearable>  效果有清空(还原按钮)
- <el-select multiple>   效果为多选, 还有可以清除点的按钮


> 搜索功能
- <el-select filterable>  效果为可以进行搜索

<!-- 
  还有几个功能差异但重复的可以根据文档测试
  1. 多选的第二种方式
  2. 自定义模板的方式
  3. 远程搜索的方式
  4. 分组的方式
  5. 创建一个未定义的方式
 -->


> 支持@change事件
- 关于对应的属性, 事件, 基本和之前的类似, 挑一个延时
- <el-select v-model='value' placeholder='请选择' size='mini' @change='selectChange'>

<!-- 
  一般建议用到无法解决的场景问题, 比如我想实现某个效果, 已有的知识无法实现 这时候再回来查这些属性 方法 事件 看看能否解决 毕竟太多了
 -->



### Cascader 选择器
- 这是Element-UI的Cascader选择器
- 效果像多级子菜单, 有两种使用方式, 一个是点击出现下一级, 一个是鼠标经过出现下一集菜单

> 基本的使用方式
- 1. <el-cascader></>
- 2. <el-cascader v-model='value'>
<!-- 
  data() {
    return {
      value:'',
    }
  }
 -->

- 3. <el-cascader v-model='value' :options='options'>
- 使用:options绑定data中的变量, 将数据绑定到多级菜单上
- 在data中的额options中 使用 children: [{ }] 的方式体现下一级菜单
<!-- 
  <el-cascader v-model='value' :options='options'>

  options: [
  {
    value:1,
      label: '二级菜单',

      // 下一级菜单
      children: [
        {
          value:11,
          label: '北京',

          // 下下一级菜单
          children: [
            {
              value:111,
              label: '海淀区'
            }
          ]
        },
        {
          value:22,
          label: '上海'
        }
      ]
    }
  ]
 -->

- 上面默认是通过click点击来实现菜单的展开, 我们也可以设置为hover悬浮
> <el-cascader v-model='value' :options='options' :porps='{expandTrigger:"hover"}'>


- 使用disabled 和 clearable,  禁用和清空 和Select选择器一样


> <el-cascader v-model='value' :options='options' :show-all-levels='false'>
- 使用:show-all-levels 来限制获取到的是最后一级的内容, 设置false即可
- 效果 在选择框内只显示最后一级
<!-- 
  二级菜单 / 北京 / 海淀区

  设置完后显示

  海淀区
 -->


- 使用:props来设置复选框多选, 具体如下
> <el-cascader v-model='value' :options='options' :show-all-levels='false' :props='props'>
<!-- 
  data() {
    return {
      props: {
        multiple: true
      }
    }
  }
 -->

- 下面功能不同, 但是用法重复的如下
- 1. 单选框选择
- 2. 动态远程加载
- 3. 设置可搜索
- 4. 自定义节点
- 5. 级联面板

- 属性和事件, 和select雷同, 自行测试



### Switch开关
- 类似iphone手机里面 设置里面的飞行模式按钮

> 绑定 v-model到一个Boolean类型的变量, 可以使用
  - active-color: '#13ce66'     // 设置打开时的颜色
  - inactive-color: '#ff4949'   // 设置关闭时的颜色

  - active-text='打开'          // 设置按钮两端的文字, 按钮打开时对应的文字
  - inactive-text='关闭'        // 设置按钮两端的文字, 按钮关闭时对应的文字
<!-- 
  <el-switch :v-model='value' active-color='#13ce66' inactive-color: '#ff4949' active-text='打开' inactive-text='关闭'>

  data() {
    return {
      value: true
    }
  }
 -->

> 绑定 v-model到一个string类型的变量, 可以使用
- 还可以给点击按钮的动作绑定可以传递 输出的值, 比如下面的按钮中, v-model绑定的value的值是str类型, 这样在开启按钮的时候 可以通过change事件把对应的值(关闭是0 打开是100)发送出去

- 需要结合 change事件 使用
  - active-value='100'          // 选中的时候提示文字为100
  - inactive-value='0'          // 没选中的时候提示文字为0
<!-- 
  <el-switch :v-model='value' active-value='100' inactive-value='0' @change='switchChange'>

  data() {
    return {
      value: '100'
    }
  },
  methods: {
    switchChange(value) {
      console.log(value)
    }
  }
 -->


### Slider滑块
- 也是需要绑定v-model
- 默认0-100之间
- 效果就是可以拖动的滑块

> 基本的使用方式
> <el-slider v-model='value'></>
<!-- 
  data() {
    return {
      value: 0    // 写50的话 默认就会在中间
    }
  }
 -->



> <el-slider v-model='value2' :show-tooltip='false'>
- 使用 :show-tooltip实现隐藏文本提示(上面就没有当前提示数字了)

> <el-slider v-model='value2' :format-tooltip='formatTooltip'>
- 使用 :format-tooltip实现自定义格式化 绑定一个自定义函数
<!-- 
  methods: {
    // 默认是0-100 我们格式化下 缩小100倍
    formatTooltip(value) {
      return value / 100
    }
  }
 -->


> <el-slider v-model='value2' :step='10'>
- 使用 :step实现离散效果
- 效果就是每次移动的距离是10

> <el-slider v-model='value2' :step='10' show-stops>
- 使用 show-stops 实现断点效果
- 效果就是 长实线变跟step一样的断线 一格一格的


> <el-slider v-model='value2' show-input>
- 使用show-input可自带输入框
- 效果 带一个可以点击- +按钮 通过按钮改变滑块


> <el-slider v-model='value' range :min='1' :max='10'>
- 使用range实现范围选择
- 默认是4 - 6 
<!-- 
  data() {
    return {
      value: [4, 6]
    }
  }
  
 -->

- 还有竖状滑块和温度计效果, 参考手册完成



### TimePicker 时间选择
- 也是需要v-model绑定

> 基本使用
> <el-time-select v-model='value'> </>
- 可以从一个下拉菜单中选择时间点
<!-- 
  data() {
    return {
      value: ''
    }
  }
 -->

> 选择一个固定的时间点
- 我们可以设置开始时间 结束时间 和每隔多少时间为一个步长
- 通过 :picker-options 来设置

> <el-time-select v-model='value' :picker-options='{
  start: '08:30',
  step: '00:15',
  end: '18:30'
}' placeholder='选择时间'> </>
<!-- 
  data() {
    return {
      value: ''
    }
  }
 -->


> 选择一个任意时间点 注意标签换了
- 时分秒可以选择

> <el-time-picker v-model='value' arrow-control :picker-options='{
  selecttableRange: '18:30:00 - 20:30:00'   // 设置范围
}'>
- arrow-control 是通过箭头选择



> 丰富的任意时间范围, 具体如下
> <el-time-picker v-model='value' is-range range-separator='至' start-placeholder='开始时间' end-placeholder='结束时间' arrow-control>
- is-range 开启丰富的任意时间范围, 其它字面意思
- 属性方法和之前组件类似
- 两个区域可以选择时间 开始时间区域 和 结束时间区域
- arrow-control 是通过箭头选择


> 通过change事件来可以把选择的时间发出来

> 还可以设置默认时间
- v-model绑定的是value
<!-- 
  data() {
    return {
      // 2010年1月1日1时1分1秒
      value: new Date(2010,1,1,1,1,1)
    }
  }
 -->



### DatePicker 日期选择
- 也是需要v-model
- 上面学习的是时分秒的选择, 现在是年月日

> 基本使用
> <el-date-picker v-model='value'></>
<!-- 
  data() {
    return {
      value: ''
    }
  }
 -->


> 可以设置一个type属性, 设置获取的值
> <el-date-picker v-model='value' type='datetime' placeholder='选择日期'>
- 设置 type='datetime' 之后 会出现年月日时分秒的选择
- type: 有很多的值, date就是选择年月日 datetime就是年月日时分秒, 后面还有很多 可以看下文档


> 自定义快捷选项的日期选择
- 可以从快捷列表中直接选择
> <el-date-picker v-model='value' type='datetime' placeholder='选择日期' :picker-options='getPicker'>
<!--  
  data() {
    return {
      getPicker: {
        // 设置快捷选项
        shortcuts:[
          // 一个选项
          {
            text: '今天',
            onClick(obj) {
              obj.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',

            // 昨天要减去一天
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            onClick(obj) {
              obj.$emit('pick', date)
            }
          },
        ]
      }
    }
  }
 -->


> 选定一个日期范围
> <el-date-picker v-model='value' type='monthrange' range-separator='至' start-placeholder='开始月份' end-placeholder='结束月份'>
- type='monthrange' 有两个可以选择月份的区域


> 选定一个日期, 并进行格式化
> <el-date-picker v-model='value' type='datetime'placeholder='选择日期' format='yyyy 年 MM 月 dd 日' :picker-options='getPicker'>
- 对选择的日期做下格式化 按照 yyyy 年 MM 月 dd 日 的形式



### upload上传
- 首先
- 建立 ElementUI的上传表单, 只需要配置路径和name
- 路径是为了上传到哪里的后台接口
- name是为了告诉后台上传文件的类型

> 简单的使用 配置下面这两个就可以
  <el-upload action='http://localhost:8000/upload' name='image'>
    <el-button>上传图片</el-button>
  </el-upload>

<!-- 
  <el-upload action='http://localhost:8000/upload' name='image'>
    <el-button>上传图片</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>

  通过slot你可以传递自定义的上传按钮类型和文字提示


  我们还可以在 <el-upload> 标签中设置 limit 和 on-exceed 来限制上传文件的个数 和 定义超出限制时的行为, 可通过设置before-remove来阻止文件移除操作
  <el-upload :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">

  export default {
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
  
 -->


> 同时上传多个 且设置不得超过3个
> <el-upload name='image' multiple :limit='3'>


> 当超过三个文件, 那么会导致上传无响应, 所以我们需要设置一个提示功能
- 这些都是一些钩子函数, 用到的时候可以去文档上看

> :on-remove="handleRemove"
> :on-exceed="handleExceed"
<!-- 
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
     
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      
    }
 -->

