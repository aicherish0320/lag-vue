import { h, init } from 'snabbdom'

const patch = init([])

let vnode = h('div#container', [h('h1', 'Hello Snabbdom'), h('p', '这是一个p')])

const app = document.querySelector('#app')

let oldVnode = patch(app, vnode)

setTimeout(() => {
  vnode = h('div#container', [h('h1', 'Hello World'), h('p', 'Hello P')])
  patch(oldVnode, vnode)
}, 2000)
