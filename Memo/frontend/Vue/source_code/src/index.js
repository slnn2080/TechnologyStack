import { initMiXin } from "./init"

function Vue(options) {
  
  // 我们要做一个初始化的操作
  this._init(options) // 入口方法 做初始化操作
}

initMiXin(Vue)

export default Vue