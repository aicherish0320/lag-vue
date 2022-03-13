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
