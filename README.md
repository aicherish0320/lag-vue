# 拉钩教育 Vue

## Vue.js 框架基础回顾

- Vue.js 基础结构
- Vue.js 生命周期
  > 如果使用构造生成文件（例如构造单文件组件），模板编译将提前执行
- Vue.js 语法和概念
  - 差值表达式
  - 指令
  - 计算属性和侦听器
- Class 和 Style 绑定
- 条件渲染/列表渲染
- 表单输入绑定
- 组件
- 插槽
- 插件
- 混入 mixin
- 深入响应式原理
- 不同构建版本的 Vue

## Vue-Router 原理实现

- VueRouter 基础回顾
- Hash 模式和 History 模式
- 模拟实现自己的 Vue Router

### Vue 前置知识

- 插件
- 混入
- `Vue.observable()`
- 插槽
- `render` 函数
- 运行时和完整版的 Vue

### Hash 模式

- URL 中 # 后面的内容作为路径地址
- 监听 hashchange 事件
- 根据当前路由地址找到对应组件重新渲染

### History 模式

- 通过`history.pushState()`方法改变地址栏
- 监听`popstate`事件
- 根据当前路由地址找到对应组件重新渲染

## Vue Router 模拟实现 分析

## Vue 的构建版本

- 运行时版：不支持 template 模板，需要打包的时候提前编译
- 完整版：包含运行时和编译器，体积比运行时版大 10K 左右，程序运行的时候把模板转换成 render 函数

## Vue 响应式原理

课程目标

- 模拟一个最小版本的 Vue
- 响应式原理在面试的常问问题
- 学习别人优秀的经验，转换成自己的经验
- 实际项目中出问题的原理层面的解决
  - 给 Vue 实例新增一个成员是否是响应式的
  - 给属性重新赋值成对象，是否是响应式的
- 为学习 Vue 源码做铺垫

## 数据驱动

- 数据驱动
  - 数据响应式、双向绑定、数据驱动
  - 数据响应式
    - 数据模型仅仅是普通的 JavaScript 对象，而当期们修改数据时，视图会进行更新，避免了繁琐的 DOM 操作，提高开发效率
  - 双向绑定
    - 数据改变，视图改变；视图改变，数据也随之改变
    - 我们可以使用 `v-model` 在表单元素上创建数据绑定
  - 数据驱动是 Vue 最独特的特性之一
    - 开发过程中仅需要关注数据本身，不需要关心数据是如何渲染到视图的
- 响应式的核心原理
- 发布订阅模式和观察者模式

```js
// 模拟 Vue 中的 data 选项
let data = {
  msg: 'hello'
}
// 模拟 Vue 的实例
let vm = {}
// 数据劫持：当访问或者设置 vm 中的成员的时候，做一些干预操作
Object.defineProperty(vm, 'msg', {
  // 可枚举 （可遍历）
  enumerable: true,
  // 可配置（可以使用 delete 删除，可以通过 defineProperty 更新定义）
  configurable: true,
  // 当取值的时候执行
  get() {
    console.log('get: ', data.msg)
    return data.msg
  },
  // 当设置值的时候执行
  set(newValue) {
    console.log('set: ', newValue)
    if (newValue === data.msg) {
      return
    }
    data.msg = newValue
    // 数据更改，更新 DOM 的值
    document.querySelector('#app').textContent = data.msg
  }
})
```

### Vue3.x 响应式原理

- Proxy
- 直接监听对象，而非属性
- ES6 中的新增，IE 不支持，性能由浏览器优化

```js
let data = {
  msg: 'hello',
  count: 0
}
const vm = new Proxy(data, {
  get() {
    return target[key]
  },
  set(target, key, newValue) {
    target[key] = newValue
  }
})
```
