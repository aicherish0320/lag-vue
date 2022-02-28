let _Vue = null

export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2. 把 Vue 构造函数记录到全局变量
    _Vue = Vue
    // 3. 把创建 Vue 实例时候传入的 router 对象注入到 Vue 实例上
    // 混入
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.router = this.$options.router
        }
      }
    })
  }
  constructor(options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }
}
