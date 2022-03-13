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

## Diff 算法

- 虚拟 DOM 中的 diff 算法
  - 查找两棵树没一个节点的差异
- Snabbdom 根据 DOM 的特点对传统的 diff 算法做了优化
  - DOM 操作时很少会跨级别操作节点
  - 只是比较同级别的节点

### 执行过程

- 在对开始和结束节点比较的时候，总共有四种情况
  - oldStartVnode/newStartVnode （旧开始节点/新开始节点）
  - oldEndVnode/newEndVnode （旧结束节点/新结束节点）
  - oldStartVnode/newEndVnode（旧开始节点/新结束节点）
  - oldEndVnode/newStartVnode（旧结束节点/新开始节点）
- 开始和结束节点
  - 如果新旧开始节点是 sameVnode （key 和 sel 相同）
    - 调用 patchVnode()对比和更新节点
    - 把旧开始和新开始索引往后移动 oldStartIdx++/oldEndIdx++
- 旧开始节点/新结束节点
  - 调用 patchVnode() 对比和更新节点
  - 把 oldStartVnode 对应的 DOM 元素，移动到右边，更新索引
- 旧结束节点/新开始节点
  - 调用 patchVnode() 对比和更新节点
  - 把 oldEndVnode 对应的 DOM 元素，移动到左边，更新索引
