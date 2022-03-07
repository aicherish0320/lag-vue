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
        // 发送通知
      }
    })
  }
}
