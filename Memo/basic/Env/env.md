### 项目开发中的dev, test, prod , staging 环境是什么意思
- 软件应用开发的经典模型有这样几个环境：
- 开发环境(development)、
- 集成环境(integration)、
- 测试环境(testing)、
- QA验证，模拟环境(staging)、
- 生产环境(production)。

> 开发环境（dev）
- 开发环境是程序猿们专门用于开发的服务器，配置可以比较随意，为了开发调试方便，一般打开全部错误报告。

> 测试环境 （test） 
- 一般是克隆一份生产环境的配置，一个程序在测试环境工作不正常，那么肯定不能把它发布到生产机上。

> 生产环境（prod）
- 是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。通常说的真实环境。

> 模拟环境(staging)
- 通常一个web项目都需要一个staging环境，一来给客户做演示，二来可以作为production server的一个“预演”，正式发布新功能前能及早发现问题（特别是gem的依赖问题，环境问题等）。



### 项目的 env 文件使用
- 这个文件的产生是为了区分各个开发环境 
- 文件主要的作用是存储环境变量，也就是会随着环境变化的东西， 比如数据库的用户名、密码、缓存驱动、时区，还有静态文件的存储路径之类的。

> 要点:
- 1. .env文件(在项目根目录新建)
- 2. 定义变量需要以 VUE_APP_ 作为前缀
- 3. 配置文件开始要声明运行环境
```js
NODE_ENV = development / production
```

> .env
- 无论开发环境还是生成环境都会加载

> .env.development
- 开发环境加载这个文件
```js
NODE_ENV = development
VUE_APP_TEST_URL = http://localhost:3000/
```

> .env.production
- 生成环境加载这个文件


> 访问:
- process.env.TEST_URL


> package.json中使用 --mode 来配置启动哪个环境
> 要点:
- "serve": "vue-cli-service serve --mode development"

- development = .env.development 看的是后缀部分

- 运行​​npm run serve​​​的时候主要还是看​​package.json​​​中 ​​server​​​属性的​​--mode​​​后面跟的是啥。如果是​​development​​​，就会加载​​.env.development​​文件。

- 在​​package.json​​里面配置好，执行serve的时候用开发环境的。build打包用生产或者测试的

```js
"scripts": {
  "serve": "vue-cli-service serve --mode development",
  "build": "vue-cli-service build",
  "build:sit": "vue-cli-service build --mode production.sit",
  "build:uat": "vue-cli-service build --mode production.uat",
  "build:prod": "vue-cli-service build --mode production",
  "lint": "vue-cli-service lint",
  "et": "node_modules/.bin/et",
  "et:init": "node_modules/.bin/et -i",
  "et:list": "gulp themes"
}
```


### cross-env
- 是运行跨平台设置和使用环境变量的脚本
- 用来解决上述 NODE_ENV = production设置环境变量时 报错的问题

> 为什么需要cross-env?
- 我们在自定义配置环境变量的时候，由于在不同的环境下，配置方式也是不同的。
- 当设置环境变量为 NODE_ENV=production 时，易造成 Windows 命令的阻塞。（除了 Windows 上的 Bash，因其使用本机 Bash）
- cross-env 使用单个命令，而不用担心环境变量的设置。像运行在 POSIX系统 上一样进行设置，cross-env 可以进行正确的设置



> 安装
- npm install --save-dev cross-env
<!-- 
  NOTE:
  cross-env 7 仅支持 Node.js >=10
  cross-env 6 需要使用 npm install --save-dev cross-env@6
 -->

> 使用方式:
- 直接在 package.json 文件中的脚本行里面 使用 
  cross-env NODE_ENV=development

- 的形式定义环境变量 这个环境环境最终会被添加到 process.env 上

- 设置本地NODE_ENV值为development
- 设置线上NODE_ENV值为production
```js
{
  "scripts": {
    "serve": "cross-env NODE_ENV=development vue-cli-service serve --open",
	  "build": "cross-env NODE_ENV=production vue-cli-service build"
  }
}


if(process.env.NODE_ENV!='development'){
	//线上环境
}
```


> 自定义全局变量
- 根据相对应的变量进行不同的配置。
```js
{
  "scripts": {
    "dev:oneProject": "cross-env PROJECT_NAME=oneProject vue-cli-service serve"
  }
}
```

- 这个段代码我们设置了一个PROJECT_NAME的变量，通过process.env.PROJECT_NAME来获取到变量的值oneProject 。


### dotenv配置环境变量
- dotenv可以用来书写一些配置选项，并且加载到process.env环境变量里面

> 1. 安装
- yarn add dotenv --save

> 2. 在项目根目录新建.env文件,并且写入相关的环境变量，命名格式以常量的命名格式来最好。
- 不用前缀 不用声明
```js
HOST_NAME=http://127.0.0.1
```

> 3. 在入口js写如下指令： require("dotenv").config()
> 4. 在需要的env里面的环境变量时，只需要输入process.env.xxx就可以拿到了