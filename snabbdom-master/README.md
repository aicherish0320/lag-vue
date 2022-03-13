# snabbdom 源码分析

## h 函数介绍

- 作用：创建 VNode 对象
- Vue 中的 h 函数

```js
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

### 函数重载

- 参数个数或参数类型不同的函数
- JavaScript 中没有重载的概念
- TypeScript 中有重载，不过重载的实现还是通过代码调整参数

```ts
// 函数重载：参数个数、参数类型
function add(a: number, b: number) {
  console.log(a + b);
}
function add(a: number, b: number, c: number) {
  console.log(a + b + c);
}

add(1, 2);
add(1, 2, 3);
```

> 快捷键： **alt+<**、**F12**

## patch 整体过程分析

- patch(oldVnode, newVnode)
- 把新节点中变化的内容渲染到真实 DOM，最后返回新节点作为下一次处理的旧节点
- 对比新旧 VNode 是否是相同节点（节点的 key 和 sel 相同）
- 如果不是相同节点，删除之前的内容，重新渲染
- 如果是相同节点，再判断新的 VNode 是否有 text，如果有并且和 oldVnode 的 text 不同，直接更新文本内容
- 如果新的 VNode 有 children，判断子节点是否有变化
