class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    Dep.target = this
    this.oldValue = vm[key]
    Dep.target = null
  }
  update() {
    const newVal = this.vm[this.key]
    if (this.oldValue !== newVal) {
      this.cb(newVal)
    }
  }
}
