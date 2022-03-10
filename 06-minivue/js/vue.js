class Vue {
  constructor(options) {
    // 将配置项选项保存下来
    this.$options = options
    this.$data = options.data
    this.$el = document.querySelector(options.el)

    // 将 options 中的 data，注入到 Vue 实例中
    this._proxyData(this.$data)

    new Observer(this.$data)

    new Compiler(this, this.$el)
  }

  _proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    })
  }
}
