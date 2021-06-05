---
title: 一次前端内存泄漏问题分析经(模板)
author: wander(@JDT)
date: 2021-06-05
---

# 问题

## 现象

- 卡顿比较明显
- 内存占用较高
- cpu 占用较高
- 偶尔出现崩溃
- ...

## 闭包使用

```js
const cache = (function () {
  let store = {}; // <== 各种第三方库内存占用
  return {
    getValue() {
      return store.value; // <== 引用值
    },
    setValue(val) {
      store.value = val;
    },
  };
})();
```

# 排查

## 现象分析

- 硬件分析
- devtools
- 代码分析

# 解决

## Pure Javascript

- 闭包
- 递归
- 解构语法

## React

- 生命周期
- hooks
- 重复渲染

# 谢谢
