class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm

    this.compile(this.el)
  }
  // 编译模板，处理文本节点和元素节点
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 判断 node 节点，是否有子节点，如果有子节点，要递归调用 compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement(node) {
    // console.log(node.attributes)
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach((attr) => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2)
        const key = attr.value

        this.update(node, key, attrName)
      }
    })
  }
  update(node, key, attrName) {
    const updateFn = this[attrName + 'Updater']
    updateFn && updateFn(node, this.vm[key])
  }
  // 处理 v-text 指令
  textUpdater(node, value) {
    node.textContent = value
  }
  // 处理 v-mode
  modelUpdater(node, value) {
    node.value = value
  }
  // 编译文本节点，处理插值表达式
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      const key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
    }
  }
  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
