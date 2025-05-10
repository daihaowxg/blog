---
title: React 快速入门
description: 本文用于记录自己的 React 学习笔记，内容是 React 官网 的 QuickStart 部分。
pubDatetime: 2025-05-10T08:50:42.338Z
slug: react-quick-start
featured: false
draft: false
tags:
  - React
---

本文用于记录自己的 React 学习笔记，内容是 React 官网 的 QuickStart 部分。

学习资料：[React 19 官网](https://react.dev/learn)

## 目录

## 1. 创建和使用组件

React 应用由组件构成。组件是 UI（用户界面）的一部分，拥有自己的逻辑和外观。组件可以小至一个按钮，也可以大至整个页面。

React 组件是返回 `markup` 的 JavaScript 函数。通常来讲 Markup（标记）指的是一种用来描述页面结构的语言，最常见的就是
HTML。在这里来说，Markup 就是你写在 React 组件中的那部分 JSX，它描述了页面长什么样。

```jsx
function MyButton() {
    return (
        <button>I'm a button</button>
    );
}
```

**观察发现，JSX 被一对圆括号包裹，圆括号后边有一个分号。**

现在你已经声明了 `MyButton` ，可以将其嵌套到另一个组件中：

```jsx
export default function MyApp() {
    return (
        <div>
            <h1>Welcome to my app</h1>
            <MyButton/>
        </div>
    );
}
```

注意 `<MyButton />` 以大写字母开头。这就是你识别它为 React 组件的方式。**React 组件名称必须始终以大写字母开头，而 HTML
标签必须小写**。

`export default` 关键字用于指定文件中的主要组件。不熟悉 `export` 的用法可以看：

- [MDN 对 `export` 的讲解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)
- [javascript.info 网站对 `export` 的讲解](https://zh.javascript.info/import-export)

## 2. JSX 的基本语法

JSX（JavaScript XML）是 React 中用于描述 UI 的语法扩展，看起来像 HTML，但其实是 JavaScript 的语法糖。

📌 JSX 的基本特征：

- 它不是字符串，也不是 HTML，而是 JavaScript 中的一种写法。

- 最终会被编译为 React.createElement(...) 调用，生成虚拟 DOM。

- JSX 更加直观易读，让你在 JavaScript 代码中直写界面结构。

JSX 比 HTML 更严格。必须闭合标签，例如 `<br />` 。组件也不能返回多个 JSX
标签，需要将它们包裹在一个共同的父级中，比如 `<div>...</div>` 或空的 `<>...</>` 包装器：

```jsx
function AboutPage() {
    return (
        <>
            <h1>About</h1>
            <p>Hello there.<br/>How do you do?</p>
        </>
    );
}
```

## 3. 使用 className 属性添加 CSS 样式

在 React 中，不能使用 `class` 属性来指定 CSS 类，因为它是保留字。但你可以使用 `className` 来指定，其作用与 HTML 中的 `class`
属性相同：

```jsx
<img className="avatar"/>
```

然后你可以在单独的 CSS 文件中为它编写 CSS 规则：

```css
/* In your CSS */
.avatar {
    border-radius: 50%;
}
```

## 4. 在 JSX 中获取 JavaScript 变量的值

JSX 最终会被嵌入到 JavaScript 中。使用花括号让你能够从 JavaScript 环境中获取变量的值并展示给用户。例如，这将显示
`user.name` ：

```jsx
return (
    <h1>
        {user.name}
    </h1>
);
```

也可以在 JSX 的标签属性中从 JavaScript 环境获取变量的值，但必须使用花括号而非引号。例如，`className="avatar"`
传递的是字符串 `"avatar"` 作为 CSS 类名，而 `src={user.imageUrl}` 读取的是 JavaScript 变量 `user.imageUrl`
的值，随后将该值作为 `src` 属性传递：

```jsx
return (
    <img
        className="avatar"
        src={user.imageUrl}
    />
);
```

## 4. 一个稍微复杂点的 JSX 用例

```jsx
const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
};

export default function Profile() {
    return (
        <>
            <h1>{user.name}</h1>
            <img
                className="avatar"
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{
                    width: user.imageSize,
                    height: user.imageSize
                }}
            />
        </>
    );
}
```

顶部定义了 JavaScript 对象 `user`，下边的代码返回了一个 `Profile` 对象。JSX 的基本语法要求所有的 JSX
代码必须被包裹在一个共同的父标签中，这里用的是空标签 `<> ... </>`。首先是一个 `h1` 标签，展示用户名，采用花括号获取 `user`
对象的 `name` 属性。后边的代码中需要重点关注的是这一段：

```
style={{
    width: user.imageSize,
    height: user.imageSize
}}
```

这里最外层的花括号的作用是告诉 JSX “我要插入 JS 表达式”，第二层花括号的中的内容是这个 JS 表达式的实际内容（一个样式对象）。对应的
HTML 效果是：

```html
<img style="width: 90px; height: 90px;"/>
```

## 5. 条件渲染

> 类似于 Vue 的 v-if

你可以使用 `if` 语句来有条件地包含 JSX：

```jsx
let content; // 定义内容变量
if (isLoggedIn) {
    content = <AdminPanel/>; // 如果已经登录了，那 content 就是 AdminPanel 组件的内容
} else {
    content = <LoginForm/>; // 如果还没登录，那 content 就是 LoginForm 组件的内容
}
return (
    <div>
        {content}
    </div>
);
```

这种方式的问题是只能在 JavaScript 中使用，不能在 JSX 中使用。

如果你更喜欢简洁的代码，可以使用条件运算符 `?` 。与 `if` 不同，它可以在 JSX 内部使用：

```jsx
<div>
    {isLoggedIn ? (
        <AdminPanel/>
    ) : (
        <LoginForm/>
    )}
</div>
```

使用 `div` 标签作为根标签，使用花括号来插入 JS 表达式。在 JS 表达式中利用三元运算符来判断到底要插入什么内容到这里。

当你不需要 else 分支时，也可以使用更短的逻辑 && 语法：

```jsx
<div>
    {isLoggedIn && <AdminPanel/>}
</div>
```

`&&` 是短路用法，如果 `isLoggedIn` 判断失败，就不会走到后边，跟 `if` 语句的逻辑一样。

所有这些方法同样适用于有条件地指定属性。如果你对某些 JavaScript 语法不熟悉，可以先始终使用 if...else 。

## 6. 列表渲染

> 类似于 Vue 的 v-for

你将依赖 JavaScript 特性，如 `for` 循环和数组 `map()` 函数来渲染组件列表。

例如，假设你有一个产品数组：

```jsx
const products = [
    {title: 'Cabbage', id: 1},
    {title: 'Garlic', id: 2},
    {title: 'Apple', id: 3},
];
```

在你的组件内部，使用 `map()` 函数将产品数组转换为 `<li>` 项数组：

```jsx
const listItems = products.map(product =>
    <li key={product.id}>
        {product.title}
    </li>
);

return (
    <ul>{listItems}</ul>
);
```

注意 `<li>` 有一个 `key` 属性。对于列表中的每个项目，你应该传递一个字符串或数字，用于在其兄弟项中唯一标识该项目。通常，`key`
应来自你的数据，例如数据库 ID。React 使用你的 key 来判断之后是否插入、删除或重新排序了项目。

完整代码：

```jsx
// 静态数据定义在函数组件的外部，函数组件内部也可以定义 const 变量，但一般都是依赖 state/props 的动态数据。
const products = [
    {title: 'Cabbage', isFruit: false, id: 1},
    {title: 'Garlic', isFruit: false, id: 2},
    {title: 'Apple', isFruit: true, id: 3},
];

export default function ShoppingList() {
    // 这里是属于函数组件的内容，不是在 JSX 中，所以这里可以定义 const
    const listItems = products.map(product =>
        <li
            key={product.id}
            style={{
                color: product.isFruit ? 'magenta' : 'darkgreen'
            }}
        >
            {product.title}
        </li>
    );

    return (
        // 这里是 JSX，只能有 JS 表达式，不能有 JS 语句，比如说 const 定义就算是 JS 语句，不能出现在这里
        <ul>{listItems}</ul>
    );
}
```

## 函数组件的结构划分

> write by me and ChatGPT

函数组件分为三部分：

**第一部分，顶部的 JavaScript 区域（模块作用域）**

这部分放的内容是：

- 导入语句（`import`）
- 数据定义，比如静态数组、常量
- 工具函数、配置、枚举等

```
import React from 'react';

const products = [...];
function formatTitle(title) { ... }
```

**第二部分，组件函数体本身**

这部分是你定义的 `function ComponentName()` 函数，内部可以写任意 JS 语句：`const`、`if`、`map`、`useState`
等。这部分一般用来处理状态、事件逻辑、生成中间变量。

```
export default function ShoppingList() {
  const listItems = products.map(...);
  const [count, setCount] = useState(0);
  ...
```

这里可以写标签（JSX），但你写的 JSX 标签必须赋值给变量，或作为表达式使用。不能随便单独写在函数体中。比如：

```jsx
export default function MyComponent() {
    const greeting = <h1>Hello</h1>; // ✅ JSX 被赋值给变量
    return greeting;
}
```

**第三部分，组件函数的 return 部分**

这部分是是 JSX 区域，用来描述要渲染的 UI。只能包含 **JS 表达式**，不能写 JS 语句

```jsx
  return (
    <ul>
        {listItems}
    </ul>
);
```

## 7. 响应事件

可以在组件内部声明事件处理函数来响应事件：

```jsx
function MyButton() {
    function handleClick() {
        alert('You clicked me!');
    }

    return (
        <button onClick={handleClick}>
            Click me
        </button>
    );
}
```
