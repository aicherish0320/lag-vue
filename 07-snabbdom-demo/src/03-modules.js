import { init, h, styleModule, eventListenersModule } from 'snabbdom'

// 1. 导入模块
// 2. 注册模块
const patch = init([styleModule, eventListenersModule])
// 3. 使用 h() 函数的第二个参数中使用的数据（对象）
let vnode = h('div', [
  h('h1', { style: { backgroundColor: 'red' } }, 'Hello World'),
  h('p', { on: { click: eventHandler } }, 'Hello P')
])

function eventHandler() {
  console.log('别点我，疼')
}

const app = document.querySelector('#app')

patch(app, vnode)
