import { initState } from "./state"

// 这里我希望接收到Vue构造函数 我们拿到Vue后在这个js文件里面做初始化的事情
export function initMiXin(Vue) {

  Vue.prototype._init = function(options) {
    
    // 拿到当前的实例 this就是new出来的实例
    const vm = this 
    vm.$options = options


    // 初始化状态(将数据做一个初始化的劫持 当我修改数据的时候 应该更新视图) 
    // 当我们初始化(Vue)的时候 就要初始化状态
    initState(vm)
  }
}