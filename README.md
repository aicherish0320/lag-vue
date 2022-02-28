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
