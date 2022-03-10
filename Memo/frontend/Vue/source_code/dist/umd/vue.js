(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  // 做一个状态的初始化 这里传入一个当前的实例 因为vm上有一个$options属性 它里面就使用户传入的所有选项
  function initState(vm) {
    vm.$options; // 我们
  }

  function initMiXin(Vue) {
    Vue.prototype._init = function (options) {
      // 拿到当前的实例 this就是new出来的实例
      var vm = this;
      vm.$options = options; // 初始化状态(将数据做一个初始化的劫持 当我修改数据的时候 应该更新视图) 
      // 当我们初始化(Vue)的时候 就要初始化状态

      initState(vm);
    };
  }

  function Vue(options) {
    // 我们要做一个初始化的操作
    this._init(options); // 入口方法 做初始化操作

  }

  initMiXin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
