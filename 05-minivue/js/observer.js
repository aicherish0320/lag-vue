class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    // 1. 判断 data 是否是对象
    if (typeof data !== 'object' || !data) {
      return
    }
    // 2. 遍历 data 对象的所有属性
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, val) {
    const that = this
    // 如果 val 是对象，把 val 内部的属性转换成响应式数据
    this.walk(val)

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        return val
      },
      set(newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        that.walk(newValue)
        // 发送通知
      }
    })
  }
}
