class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    if (typeof data !== 'object' || data === null) {
      return
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, value) {
    const dep = new Dep()
    const _self = this
    this.walk(value)

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newVal) {
        if (newVal === value) {
          return
        }
        value = newVal
        _self.walk(newVal)

        dep.notify()
      }
    })
  }
}
