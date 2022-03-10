import babel from "rollup-plugin-babel"
import serve from "rollup-plugin-serve"

export default {
  // 以这个入口文件打包库
  input: "./src/index.js",
  output: {
    format: "umd",  // 模块化的类型 es6 commonjs umd
    name: "Vue",    // 要打包出来的window的全局变量叫Vue
    file: "dist/umd/vue.js",
    // 将转换前后的代码做映射 这样我们可以调试转换后的代码
    sourcemap: true,
  },
  plugins: [
    babel({
      // 排除下面的文件夹 这个文件下的所有内容都不进行转义
      exclude: "node_modules/**"
    }),
    serve({
      // 自动打开浏览器
      open: true,
      port: 3333,
      // 服务器是相对于哪个目录 ""表示以当前目录为基准 相当于配置跟路径吧
      contentBase: "",
      // 默认打开哪个文件？
      openPage: "/index.html"
    })
  ]
}