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

注意 `onClick={handleClick}` 后面是没有括号的，这里只需要传递函数就可以了，不需要调用事件处理函数（`handleClick()`
这种写法是调用函数的写法）。当用户点击按钮时，React 会调用你的事件处理函数。

## 8. useState 的用法

有时候我们会希望组件能“记住”某些信息并显示出来。比如说，你可能想要统计按钮被点击的次数。此时可以使用 `useState` 向组件添加状态。

首先，从 React 导入 `useState` ：

```
import { useState } from 'react';
```

然后就可以在组件内部声明一个状态变量（state variable）：

```
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```

使用 `useState` 之后我们可以得到两样东西：当前的状态（ `count` ）和用于更新它的函数（ `setCount`
）。你可以为它们任意命名，但惯例是写成 `[something, setSomething]`。

按钮首次显示时， `count` 将为 0 ，因为你将 0 传递给了 `useState()` 。当你想改变状态时，调用 `setCount()`
并将新值传递给它。点击此按钮将增加计数器：

```jsx
function MyButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>
            Clicked {count} times
        </button>
    );
}
```

React 会再次调用你的组件函数。这一次， `count` 会是 1。接着它会变成 2。以此类推。

即使多次渲染同一个组件，每个组件也都会拥有自己的状态：

```js
import {useState} from 'react';

export default function MyApp() {
    return (
        <div>
            <h1>Counters that update separately</h1>
            <MyButton/>
            <MyButton/>
        </div>
    );
}

function MyButton() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>
            Clicked {count} times
        </button>
    );
}
```

## 9. Hooks

以 `use` 开头的函数称为 Hook。 `useState` 是 React 提供的内置
Hook。你可以在 [API 参考中](https://react.dev/reference/react)找到其他内置 Hook。你也可以通过组合现有的 Hook 来编写自己的
Hook。

Hook 比其他函数有更多限制。你只能在组件（或其他 Hook）的顶层调用 Hook。如果想在条件或循环中使用 `useState` ，请提取一个新组件并将其放在那里。

## 10. 使用 props 在组件间共享数据

在前面的例子中，每个 `MyButton` 都有自己独立的 `count` ，当点击按钮时，只有被点击按钮的 `count`
发生了变化，另一个 `MyButton` 的 `count` 不会变。

如果想要让两个 `MyButton` 组件显示相同的 `count` 并同步更新，那就需要将状态从单个按钮“向上”移动到包含它们所有的最接近的组件中。

在这个例子中就是要把状态变量移动到 `MyApp` 组件中，然后状态从 `MyApp` 传递给两个子组件 `MyButton`
。当点击其中一个 `MyButton` 时，`MyApp` 会将其 `count` 状态更新为 1 ，并将该状态传递给两个子组件。

以下是代码实现方式：

首先，将状态从 MyButton 提升至 MyApp ：

```jsx
export default function MyApp() {
    // 以前这个 useState 和 handleClick 在 MyButton 组件中，现在挪到了 MyApp 中
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>Counters that update separately</h1>
            <MyButton/>
            <MyButton/>
        </div>
    );
}

function MyButton() {
    // ... we're moving code from here ...
}
```

然后，将状态从 `MyApp` 向下传递给每个 `MyButton` ，同时传递共享的点击处理函数。你可以使用 JSX 花括号向 `MyButton`
传递信息，就像之前对内置标签如 `<img>` 所做的那样：

```jsx
export default function MyApp() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>Counters that update together</h1>
            <MyButton count={count} onClick={handleClick}/>
            <MyButton count={count} onClick={handleClick}/>
        </div>
    );
}
```

以这种方式传递的信息称为 props。现在， `MyApp` 组件包含 `count` 状态和 `handleClick` 事件处理器，并将它们作为 props
传递给每个按钮。

最后，将 `MyButton` 修改为读取从父组件传递过来的 props：

```jsx
function MyButton({count, onClick}) {
    return (
        <button onClick={onClick}>
            Clicked {count} times
        </button>
    );
}
```

props 的定义方式就是在函数组件的函数传参中使用花括号{}声明。

当你点击按钮时， `onClick` 处理函数会被触发。每个按钮的 `onClick` 属性都被设置为 `MyApp` 中的 `handleClick`
函数，因此其中的代码会执行。该代码调用
`setCount(count + 1)` ，递增 `count` 状态变量。新的 `count` 值会作为 `prop`
传递给每个按钮，所以它们都会显示新值。这被称为“状态提升”。通过将状态上移，你在组件之间实现了状态共享。

完整代码：

```jsx
import { useState } from 'react';

export default function MyApp() {
  // 父组件中定义共享状态
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      // 使用 JSX 花括号将共享状态传递给子组件
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

// 子组件定义 props 接收
function MyButton({ count, onClick }) {
  return (
    // 点击按钮时触发 handleClick 函数，共享状态被修改，然后又通过 props 传递给另一个子组件
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

```