class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    // data中的属性名称
    this.key = key
    // 回调函数，负责更新视图
    this.cb = cb

    // 把 watcher 对象记录到 Dep 类的静态属性 target
    Dep.target = this
    // 触发 get 方法，在 get 方法中会调用 addSub
    this.oldValue = vm[key]

    Dep.target = null
  }
  // 当数据发送变化的时候，更新视图
  update() {
    let newVal = this.vm[this.key]
    if (newVal === this.oldValue) {
      return
    }
    this.cb(newVal)
  }
}
