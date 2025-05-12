---
title: JavaScript 面试题
description: 本文通过面试题来快速捡起 JS 知识点。
pubDatetime: 2025-05-12T03:38:43.788Z
slug: javascript-summary
featured: false
draft: false
tags:
  - JavaScript
---


本文通过面试题来快速捡起 JS 知识点。

知识点来源：[面试鸭](https://www.mianshiya.com/)

## 目录

## JS 的数据类型

JS 有 8 种数据类型，分为原始类型（Primitive Types）和引用类型（Reference Types）。

**原始类型**的值是不可变的，直接存储在栈中。

| 数据类型        | 示例                 | 说明                        |
|-------------|--------------------|---------------------------|
| `number`    | `1`, `3.14`, `NaN` | 所有数字（整数、浮点数、NaN、Infinity） |
| `string`    | `"hello"`          | 字符串                       |
| `boolean`   | `true`, `false`    | 布尔值                       |
| `null`      | `null`             | 空值，表示“无”                  |
| `undefined` | `undefined`        | 未定义                       |
| `symbol`    | `Symbol('id')`     | 唯一值，常用于对象属性标识符            |
| `bigint`    | `123n`             | 表示任意大的整数                  |

**引用类型**的值是可变的，存储的是指向堆内存中对象的引用。

| 数据类型       | 示例                            | 说明               |
|------------|-------------------------------|------------------|
| `Object`   | `{ name: "Tom" }`             | 常规对象             |
| `Array`    | `[1, 2, 3]`                   | 数组是对象的子类型        |
| `Function` | `function() {}` 或 `() => {}`  | 函数是可调用的对象        |
| `Date`     | `new Date()`                  | 时间对象             |
| `RegExp`   | `/abc/` 或 `new RegExp("abc")` | 正则表达式            |
| `Map`      | `new Map()`                   | 键值对集合，键可以是任意类型   |
| `Set`      | `new Set()`                   | 不重复的值集合          |
| `WeakMap`  | `new WeakMap()`               | 弱引用键值对集合（键只能是对象） |
| `WeakSet`  | `new WeakSet()`               | 弱引用值集合（值只能是对象）   |
| `Promise`  | `new Promise(...)`            | 表示异步操作的结果        |

使用 `typeof` 判断类型时的注意点

| 表达式                    | 结果           | 说明                     |
|------------------------|--------------|------------------------|
| `typeof null`          | `"object"`   | 历史遗留问题，实际上是原始类型        |
| `typeof []`            | `"object"`   | 数组是对象的子类型              |
| `typeof function() {}` | `"function"` | 唯一能返回 `"function"` 的情况 |
| `typeof NaN`           | `"number"`   | NaN 是非法数字              |

## 如何判断一个 JavaScript 变量是不是数组？

详见[面试鸭 - 如何判断 JavaScript 变量是数组？](https://www.mianshiya.com/bank/1810644471159848962/question/1810886883568328705)

```js

// 1. 使用 ES6 的 Array.isArray() 判断
Array.isArray(obj)

// 2. 使用 instanceof 做判断
obj instanceof Array

// 3. 使用 Array.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(obj)

// 4. 检查对象的原型链是否指向 Array.prototype，但是不推荐直接访问 proto，因为它是非标准属性
obj.__proto__ === Array.prototype;

// 5. 使用 Object.prototype.toString.call() 做判断
Object.prototype.toString.call(obj).slice(8, -1) === 'Array';



```

## JavaScript 中 null 和 undefined 的区别是什么？

详见[JavaScript 中 null 和 undefined 的区别是什么？ ](https://www.mianshiya.com/bank/1810644471159848962/question/1810886883765460994#heading-0)

```js
// 类型检测
console.log(typeof undefined); // 输出: "undefined"
console.log(typeof null); // 输出: "object"

// 比较操作
console.log(undefined == null); // 输出: true 因为它们都代表“没有值”的概念。
console.log(undefined === null); // 输出: false

// 变量赋值
let x; // 未赋值，默认是 undefined
let y = null; // 明确赋值为 null

```

## typeof 和 instanceof 有什么区别？

[面试鸭 - typeof 和 instanceof 有什么区别？](https://www.mianshiya.com/bank/1810644471159848962/question/1810886884516241409#heading-1)

```js
// typeof 操作符用于检测变量的类型，返回一个字符串
console.log(typeof undefined); // "undefined"
console.log(typeof true);      // "boolean"
console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof {});        // "object"
console.log(typeof []);        // "object"
console.log(typeof null);      // "object" (特殊情况)
console.log(typeof function () {
}); // "function"
console.log(typeof Symbol());  // "symbol"
console.log(typeof 10n);       // "bigint"

// instanceof 操作符用于检测某个对象是否是另一个对象（构造函数）的实例，返回一个布尔值
console.log({} instanceof Object);           // true
console.log([] instanceof Array);            // true
console.log(function () {
} instanceof Function); // true
console.log(new Date() instanceof Date);     // true

function MyClass() {
}

let myInstance = new MyClass();
console.log(myInstance instanceof MyClass);  // true
```

示例代码：

```js
let num = 42;
console.log(typeof num);          // "number"
console.log(num instanceof Number); // false (因为 num 是基本类型)

let str = new String("hello");
console.log(typeof str);          // "object"
console.log(str instanceof String); // true (因为 str 是 String 对象的实例)

let arr = [1, 2, 3];
console.log(typeof arr);          // "object"
console.log(arr instanceof Array); // true

```

## isNaN 和 Number.isNaN 函数有什么区别？

[面试鸭 - isNaN 和 Number.isNaN 函数有什么区别？ ](https://www.mianshiya.com/bank/1810644471159848962/question/1810886885430599682#heading-0)

```js
// Number.isNaN 函数不会进行类型转换，只会在参数本身是 NaN 的情况下返回 true。它更为严格，只有传入的值是 NaN 时才会返回 true
console.log(Number.isNaN(NaN));          // 输出: true
console.log(Number.isNaN('hello'));      // 输出: false
console.log(Number.isNaN(undefined));    // 输出: false
console.log(Number.isNaN({}));           // 输出: false
console.log(Number.isNaN(123));          // 输出: false
console.log(Number.isNaN('123'));        // 输出: false

// isNaN 函数会先尝试将传入的参数转换为数字，然后检查转换后的值是否为 NaN。
console.log(isNaN(NaN));          // 输出: true
console.log(isNaN('hello'));      // 输出: true
console.log(isNaN(undefined));    // 输出: true
console.log(isNaN({}));           // 输出: true
console.log(isNaN(123));          // 输出: false
console.log(isNaN('123'));        // 输出: false
```

如果一个值可以被转换为数字，那么 `isNaN` 就会返回 `false`，所以当你想检查一个值是否可以被解析为数字时，可以使用 `isNaN` 来判断。例如，在用户输入需要被转换为数字的情况下，这个函数可以帮助检测非法输入。

## == 操作符的判断规则

```js
// null 和 undefined 仅相等于自身和对方
console.log(null == undefined); // true
console.log(null == null); // true
console.log(undefined == undefined); // true
console.log(null == 0); // false
console.log(undefined == 0); // false

// 布尔类型会被转换为数字，然后再进行比较 true 是 1，false 是 0
console.log(true == 1); // true
console.log(false == 0); // true
console.log(true == 2); // false

// 字符串和数字比较，JavaScript 会将字符串转换为数字，然后再进行比较
console.log('42' == 42); // true
console.log('42' == '42'); // true
console.log('42' == 43); // false
console.log('0' == false); // true，字符串0变成数字0，false变成数字0，两者相等

// 如果有一个操作数是对象，另一个是原始类型（字符串、数字、布尔值），JavaScript 会尝试调用对象的 toPrimitive 方法（valueOf 或 toString）将对象转换为原始类型，然后再进行比较
console.log([1, 2] == '1,2'); // true
console.log([1] == 1); // true
console.log({} == '[object Object]'); // true

// Symbol 类型只能与 Symbol 类型进行比较，与其他类型的比较总是返回 false
console.log(Symbol() == Symbol()); // false
console.log(Symbol() == 'symbol'); // false
console.log(Symbol() == false); // false
```

特殊情况：

```js
// 空字符串会被转换为数字 0 进行比较
console.log('' == 0); // true
console.log('' == false); // true

// 对象的比较会触发类型转换，通过调用 toPrimitive 方法（valueOf 或 toString），转换为原始类型后再比较
let obj = { toString: () => '42' };
console.log(obj == '42'); // true
console.log(obj == 42); // true

```

## 转字符串类型的规则

[面试鸭](https://www.mianshiya.com/bank/1810644471159848962/question/1810886885875195906#heading-0)

基本数据类型

```js
console.log(String(null));      // "null"
console.log(String(undefined)); // "undefined"

console.log(String(true));  // "true"
console.log(String(false)); // "false"

console.log(String(42));       // "42"
console.log(String(3.14));     // "3.14"
console.log(String(1e21));     // "1e+21"
console.log(String(1 / 7));    // "0.14285714285714285"

let sym = Symbol('desc');
console.log(String(sym));   // "Symbol(desc)"
console.log(sym.toString()); // "Symbol(desc)"
// console.log(sym + "");    // TypeError: Cannot convert a Symbol value to a string

```

对象类型

```js
// 1. 普通对象。如果对象没有自定义 toString() 方法，会调用 Object.prototype.toString() 返回 "[object Object]"。如果对象有自己的 toString() 方法，字符串化时会调用该方法并使用其返回值
let obj = {};
console.log(String(obj)); // "[object Object]"

let objWithToString = {
  toString() {
    return "custom object";
  }
};
console.log(String(objWithToString)); // "custom object"

// 2. 数组对象。数组调用默认的 toString() 方法，会将数组元素转换为字符串并以逗号分隔
let arr = [1, 2, 3];
console.log(String(arr)); // "1,2,3"

// 3. 日期对象。日期对象调用 toString() 方法，会返回日期的字符串表示
let date = new Date();
console.log(String(date)); // "Wed Jun 28 2023 10:30:45 GMT+0200 (Central European Summer Time)"

let date2 = new Date().toISOString();
console.log(String(date2)) // 2025-05-12T05:18:23.614Z

// 4. 函数对象。调用 Function.prototype.toString()，返回函数的代码字符串
function foo() {
  return "bar";
}
console.log(String(foo)); // "function foo() { return "bar"; }"

```

## 转数字类型的规则

[面试鸭](https://www.mianshiya.com/bank/1810644471159848962/question/1810886886160408577#heading-0)

```js
// undefined 转换为 NaN
console.log(Number(undefined)); // NaN

// null 转换为 0
console.log(Number(null)); // 0

// true 转换为 1，false 转换为 0
console.log(Number(true));  // 1
console.log(Number(false)); // 0

// 字符串按照 Number() 函数进行转换。如果字符串包含非数字字符，则转换为 NaN，空字符串转换为 0
console.log(Number("42"));        // 42
console.log(Number("3.14"));      // 3.14
console.log(Number(""));          // 0
console.log(Number("hello"));     // NaN
console.log(Number("42abc"));     // NaN

// Symbol 值不能转换为数字，会抛出 TypeError
let sym = Symbol("desc");
// console.log(Number(sym)); // TypeError: Cannot convert a Symbol value to a number
```

对象类型转数字类型

对象（包括数组）会首先被转换为相应的基本类型值，然后再根据基本类型值的转换规则进行强制转换，步骤如下：

1. JavaScript 尝试将对象转换为基本类型值。内部会首先检查该对象是否有 valueOf() 方法。
2. 如果 valueOf() 存在并返回基本类型值，则使用该值进行强制类型转换。
3. 如果没有 valueOf() 方法或其返回值不是基本类型，则使用 toString() 方法的返回值进行转换。
4. 如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

```js
let obj1 = {
  valueOf() {
    return 42;
  }
};
console.log(Number(obj1)); // 42

let obj2 = {
  toString() {
    return "3.14";
  }
};
console.log(Number(obj2)); // 3.14

let obj3 = {
  valueOf() {
    return {};
  },
  toString() {
    return {};
  }
};
// console.log(Number(obj3)); // TypeError: Cannot convert object to primitive value

```

数组类型转换为数组类型

数组在转换为数字时，会被首先转换为字符串，然后再根据字符串的转换规则进行转换。如果数组包含多个元素，结果通常为 NaN，因为转换后的字符串包含逗号分隔的元素

```js
console.log(Number([1, 2, 3]));  // NaN
console.log(Number([42]));       // 42
console.log(Number([]));         // 0
console.log(Number(["3.14"]));   // 3.14
```

## 转布尔类型的规则

以下值在转换为布尔值时会被转换为 false：

1. undefined
2. null
3. false
4. +0
5. -0
6. NaN
7. ""（空字符串）

```js
console.log(Boolean(undefined)); // false
console.log(Boolean(null));      // false
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(-0));        // false
console.log(Boolean(NaN));       // false
console.log(Boolean(""));        // false

```

除了上述之外的所有值，在转换为布尔值时都会被转换为 true。这包括：

1. 非空字符串
2. 非零数字（包括正数和负数）
3. 对象（包括空对象）
4. 数组（包括空数组）
5. 函数

示例代码如下：

```js
console.log(Boolean("hello"));     // true
console.log(Boolean(42));          // true
console.log(Boolean(-42));         // true
console.log(Boolean({}));          // true
console.log(Boolean([]));          // true
console.log(Boolean(function(){}));// true

```

## || 和 && 的运算规则

```js
// || 操作符：返回第一个真值，或者在所有操作数均为假值时返回最后一个操作数。
console.log(false || true);       // true
console.log(0 || 42);             // 42
console.log('' || 'default');     // "default"
console.log(null || 'fallback');  // "fallback"
console.log(undefined || 'ok');   // "ok"
console.log(false || 0 || 'foo'); // "foo"
console.log('' || 0 || NaN);      // NaN
console.log('' || 0);             // 0
console.log(false || 0);          // 0

```

```js
// && 操作符：返回第一个假值，或者在所有操作数均为真值时返回最后一个操作数。
console.log(true && false);       // false
console.log(42 && 0);             // 0
console.log('foo' && 'bar');      // "bar"
console.log('hello' && 123);      // 123
console.log(true && 'ok');        // "ok"
console.log(1 && 2 && 3);         // 3
console.log('' && 'fallback');    // ""
console.log(null && 'should not reach'); // null

```

## ==、=== 和 Object.is()

双等号进行相等判断时，如果两边的类型不一致，则会进行类型转换后再进行比较，规则如下：

1. 如果类型不同，会进行类型转换。
2. 将 null 和 undefined 视为相等。
3. 将布尔值转换为数字再进行比较。
4. 将字符串和数字进行比较时，会将字符串转换为数字。
5. 对象与原始类型进行比较时，会将对象转换为原始类型。

```js
console.log(2 == '2');       // true
console.log(null == undefined); // true
console.log(true == 1);      // true
console.log(false == 0);     // true
console.log('' == 0);        // true
console.log([1, 2] == '1,2'); // true

```

三等号进行相等判断时，不会进行类型转换。如果两边的类型不一致，则直接返回 false，规则如下：

1. 如果类型不同，返回 false。
2. 如果类型相同，再进行值的比较。

```js
console.log(2 === '2');       // false
console.log(null === undefined); // false
console.log(true === 1);      // false
console.log(false === 0);     // false
console.log('' === 0);        // false
console.log([1, 2] === '1,2'); // false

```

Object.is() 在大多数情况下与三等号的行为相同，但它处理了一些特殊情况，如 -0 和 +0，以及 NaN，规则如下：

1. 如果类型不同，返回 false。
2. 如果类型相同，再进行值的比较。
3. 特殊情况：-0 和 +0 不相等，两个 NaN 是相等的。

```js
console.log(Object.is(2, '2'));       // false
console.log(Object.is(null, undefined)); // false
console.log(Object.is(true, 1));      // false
console.log(Object.is(false, 0));     // false
console.log(Object.is('', 0));        // false
console.log(Object.is([1, 2], '1,2')); // false

console.log(Object.is(NaN, NaN));     // true
console.log(Object.is(+0, -0));       // false
console.log(Object.is(-0, -0));       // true
console.log(Object.is(+0, +0));       // true

```

## JS 的包装类型

JavaScript 提供了三个包装类型：

1. String
2. Number
3. Boolean

这些包装类型分别对应于原始值 string、number 和 boolean。

```js
let str = "hello";
console.log(str.toUpperCase()); // "HELLO"

let num = 42;
console.log(num.toFixed(2)); // "42.00"

let bool = true;
console.log(bool.toString()); // "true"

```

虽然包装类型使得原始值可以像对象一样操作，但它们本质上是不同的。

```js
let strPrimitive = "hello";
let strObject = new String("hello");

console.log(typeof strPrimitive); // "string"
console.log(typeof strObject);    // "object"

console.log(strPrimitive === strObject); // false
console.log(strPrimitive == strObject);  // tr

```

这个例子中，strPrimitive 是一个原始值，而 strObject 是一个 String 对象。它们在类型上是不同的，严格相等（===）比较时会返回 false，但宽松相等（==）比较时会返回 true，因为 strObject 会被转换为原始值进行比较。

## JS 的隐式类型转换

隐式类型转换主要发生在以下三种情况下：算术运算、比较运算和逻辑运算。

在算术运算中，JavaScript 会将操作数转换为数字类型。

```js
console.log(5 + "5"); // "55"（字符串拼接）
console.log("5" + 5); // "55"（字符串拼接）
console.log(5 + 5);   // 10（数值相加）
console.log(5 - "2"); // 3
console.log("6" * "2"); // 12
console.log("8" / 2); // 4
console.log("10" % 3); // 1
```

在比较运算中，JavaScript 会将操作数转换为相同的类型再进行比较。

```js
// 双等号 ==
console.log(5 == "5"); // true（字符串 "5" 被转换为数字 5）
console.log(false == 0); // true（false 被转换为数字 0）
console.log(true == 1); // true（true 被转换为数字 1）
console.log(null == undefined); // true
// 三等号 ===
console.log(5 === "5"); // false
console.log(false === 0); // false
console.log(true === 1); // false
console.log(null === undefined); // false

// 对于其他比较运算符（>、<、>=、<=），操作数会被转换为数字或字符串
console.log(5 > "2"); // true
console.log("6" < "12"); // false（字符串比较）
console.log("8" >= 8); // true
console.log("10" <= 20); // true
```
逻辑运算。

```js
// 逻辑！
console.log(!0); // true（0 被转换为 false，然后取反为 true）
console.log(!1); // false（1 被转换为 true，然后取反为 false）
console.log(!""); // true（空字符串被转换为 false，然后取反为 true）
console.log(!"hello"); // false（非空字符串被转换为 true，然后取反为 false）
// 逻辑||
console.log(0 || 1); // 1（0 被转换为 false，因此返回第二个操作数 1）
console.log(1 || 0); // 1（1 被转换为 true，因此返回第一个操作数 1）
// 逻辑&&
console.log(0 && 1); // 0（0 被转换为 false，因此返回第一个操作数 0）
console.log(1 && 2); // 2（1 被转换为 true，因此返回第二个操作数 2）
```

字符串与数字之间的转换。

```js
console.log("5" - 2); // 3（"5" 被转换为数字 5，然后 5 - 2 = 3）
console.log("5" * "2"); // 10（两个字符串都被转换为数字）
console.log("5" / 2); // 2.5（"5" 被转换为数字 5，然后 5 / 2 = 2.5）
```
## JavaScript 中 + 操作符什么时候用于字符串的拼接？

[面试鸭](https://www.mianshiya.com/bank/1810644471159848962/question/1810886887410311169)

## Object.assign 和对象扩展运算符 `...`

[面试鸭](https://www.mianshiya.com/bank/1810644471159848962/question/1810886887926210561#heading-0)

Object.assign

```js
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };

const mergedObj = Object.assign({}, obj1, obj2);
console.log(mergedObj); // { a: 1, b: { d: 3 }, e: 4 }
console.log(obj2.b === mergedObj.b); // true，浅拷贝只复制了对象的引用

```

对象扩展运算符 `...`

```js
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };

const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj); // { a: 1, b: { d: 3 }, e: 4 }
console.log(obj2.b === mergedObj.b); // true，浅拷贝只复制了对象的引用

```

## Object 的用法

```js
let obj = {
  name: 'Alice',
  age: 30,
};

obj.city = 'New York'; // 添加新属性
console.log(obj); // { name: 'Alice', age: 30, city: 'New York' }

delete obj.age; // 删除属性
console.log(obj); // { name: 'Alice', city: 'New York' }

```

## JavaScript 中判断数据类型的方式有哪些？

[面试鸭](https://www.mianshiya.com/bank/1810644471159848962/question/1810886888349835265)

## JS 的内置对象

[面试鸭](https://www.mianshiya.com/bank/1810644471159848962/question/1810886888513413122#heading-0)

1）Object：这是所有对象的基类，其他所有对象都继承自它。常用方法有 Object.keys(), Object.values(), Object.entries()等。

2）Array：用于存储有序集合，并提供了一系列操作方法，如 push(), pop(), forEach(), map(), filter() 等。

3）String：用于处理文本字符串。例如 length, indexOf(), slice(), toUpperCase(), toLowerCase() 等。

4）Number：用于表示和处理数值的对象，包括浮点数和整数。常见方法有 parseInt(), parseFloat(), toFixed(), toString()等。

5）Boolean：用于表示 true 和 false 值，非常简单但常用。

6）Function：这是 JavaScript 的一等公民，每个函数其实是 Function 对象的实例。常见方法有 call(), apply(), bind()等。

7）Date：用于处理日期和时间的对象，可以精确到毫秒。常见方法有 getDate(), getDay(), getFullYear(), getHours(), getMinutes()等。

8）RegExp：用于处理正则表达式的对象，强大且灵活。常见方法有 exec(), test(), match(), replace()等。

9）Math：提供数学计算的常用工具，如 Math.random(), Math.floor(), Math.ceil(), Math.max(), Math.min()等。

10）JSON：用于解析和格式化 JSON 格式的数据。方法包括 JSON.parse() 和 JSON.stringify()。

11）Symbol：一个独特且不可变的基本类型，常用于对象属性的唯一标识符。

12）Map：用于存储键/值对，且可以记住键值对的插入顺序。常见方法有 set(), get(), has(), delete() 等。

13）Set：用于存储独一无二的值，不管值是原始值还是对象引用。常见方法包括 add(), has(), delete(), clear()等。

14）WeakMap：与 Map 类似，但其键必须是对象，且该对象引用的键是弱引用，因此并不会阻止垃圾回收。

15）WeakSet：与 Set 类似，但其值必须是对象，且这些对象优点是弱引用的特点。

16）Promise：用于处理异步操作的对象，极大简化了异步编程。常见方法有 then(), catch(), finally()，还有静态的 Promise.resolve(), Promise.reject(), Promise.all(), 和 Promise.race() 等。

## JavaScript 中常用的正则表达式

[面试鸭 - JavaScript 中常用的正则表达式有哪些？](https://www.mianshiya.com/bank/1810644471159848962/question/1810886888605687809#heading-1)

## JavaScript 的数组有哪些原生方法？

[面试鸭](https://www.mianshiya.com/bank/1810644471159848962/question/1810886889046089729)

## JavaScript 操作数组元素的方法有哪些？

[面试鸭](https://www.mianshiya.com/bank/1810644471159848962/question/1810886892669968385#heading-0)

## JS 中如何判断 this 的指向

## Class 类

## ES6 语法规范

## npm 包管理器

## 原型和原型链

## 数组常用方法

## 模块化