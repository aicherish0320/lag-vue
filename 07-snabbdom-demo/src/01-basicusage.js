import { h, init } from 'snabbdom'

const patch = init([])
// 第一个参数：标签+选择器；第二个参数：如果是字符串就是标签中的文本内容
let vnode = h('div#container.cls', 'hello world')
const app = document.querySelector('#app')
// 第一个参数：旧的VNode，可以是 dom 元素
// 第二个参数：新的VNode
// 返回新的 VNode
let oldVnode = patch(app, vnode)

vnode = h('div#container.xxx', 'hello snabbdom')
oldVnode = patch(oldVnode, vnode)
