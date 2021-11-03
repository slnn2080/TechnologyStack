### Scss(Sass)
- 预处理器的代码并不能被浏览器直接解析 所以必须要将它们编译成css代码
- 现有的框架已经提供了css预处理选项 编译相关配置会自动帮我们生成 
- 所以只有在练习的情况下才有必要安装该环境


### 安装
- 1. 不依赖编辑器
- 全局安装scss预处理器 使用终端命令实现编译

- Node环境下的 node-sass模块
<!-- 
  它是一个直接可执行文件
 -->

- Node环境下的 dart-sass模块
<!-- 
  dart-sass 需要我们自己手动配置一些东西
  dart的性能最好 编译最快
 -->

- Ruby环境下的 sass模块
- Dart环境下的 sass模块
<!-- 
  Dart语言 爬虫语言？ flutter必学的语言
 -->

- 这里的推荐顺序针对的是 练习 场景 而开发环境下推荐使用的是dart-sass


- 2. 依赖编辑器
- 用插件的意思：

- ide代表: webstorm 前提是安装上述 1 中的命令行编译工具 配置自动命令 另安装一个代码提示插件scss

- 编辑器代表: vscode 安装easy sass 和 sass 两个插件


> css预处理器出现的原因
- 1. 无法嵌套书写导致代码繁重 逻辑混乱
- 2. 没有变量和样式复用机制 属性值只能以字面量的形式重复输出


> 出名的预处理器
- 1. scss/sass
-  官方语言为ruby

- 2. less

- 3. stylus
- 官方语言为node 人气较前两者偏低


> scss 和 sass之间的关系
- sass有两套语法
- 1. 第一种或最  新的语法被称为scss 它是css语言的扩展 这意味着每个有效的css样式表都是具有相同含义的有效的scss文件 下文描述的sass工鞥增强了此语法 使用此语法的文件扩展名为 .scss

- 2. 第二种或更旧的语法被称为sass 提供了一种更为简洁的css编写方式 它使用缩进而不是方括号来表示选择器的嵌套 并使用换行符而不是分号来分隔属性 使用此语法的文件扩展名为 .sass

- 任何一种格式可以直接 导入 @import 到另一种格式中使用 或者通过 sass-convert 命令行工具转换成另一种格式

-------------------

### node环境下的安装

> 安装
- npm i -g node-sass
- node-sass -v
<!-- 
  安装的时候可能会出现版本上的错误
  我使用的是node17 sass不知道 应该是最新吧
 -->


> 编译文件
- 单文件编译
  - node-sass 原有的scss文件 生成的css文件
  - node-sass 原有的scss文件 -o 生成目录
<!-- 
  node-sass a.scss b.css
  nod-sass a.scss -o css_file
 -->


- 多文件编译
  - node-sass 原有的scss文件目录 -o 生成的css文件目录
<!-- 
  node-sass c -o d
 -->


- 文件监听模式
- 当文件改变的时候 自动编译
- 在 单 和 多 的基础上添加 -w 命令行参数即可
 - node-sass -w 原有的scss文件 -o 生成目录
 - node-sass -w 原有的scss文件目录 -o 生成的css文件目录

