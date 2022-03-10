class Compiler {
  constructor(vm, el) {
    this.vm = vm
    this.el = el

    this.compile(this.el)
  }
  compile(el) {
    const childNodes = el.childNodes

    Array.from(childNodes).forEach((node) => {
      if (this.isElement(node)) {
        this.compileElement(node)
      } else if (this.isText(node)) {
        this.compileText(node)
      }

      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  isElement(node) {
    return node.nodeType === 1
  }
  isText(node) {
    return node.nodeType === 3
  }
  compileElement(node) {
    const attributes = node.attributes
    Array.from(attributes).forEach((attr) => {
      const attrName = attr.name.substring(2)
      const key = attr.value

      this.update(node, attrName, this.vm[key], key)
    })
  }
  update(node, attrName, value, key) {
    const fn = this[attrName + 'Updater']
    fn && fn.call(this, node, value, key)
  }
  textUpdater(node, value, key) {
    node.textContent = value

    new Watcher(this.vm, key, (newVal) => {
      node.textContent = newVal
    })
  }
  modelUpdater(node, value, key) {
    node.value = value

    new Watcher(this.vm, key, (newVal) => {
      node.value = newVal
    })

    node.addEventListener('input', (e) => {
      this.vm[key] = e.target.value
    })
  }
  compileText(node) {
    const text = node.textContent
    const reg = /\{\{(.+?)\}\}/
    if (reg.test(text)) {
      const key = RegExp.$1.trim()
      node.textContent = this.vm[key]

      new Watcher(this.vm, key, (newVal) => {
        node.textContent = newVal
      })
    }
  }
}
