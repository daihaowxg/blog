---
title: Prompt 汇总
description: 本文汇总了自己日常工作中常用的 Prompt，方便快速复制。
pubDatetime: 2025-05-09T08:35:55.261Z
slug: prompt-summary
featured: false
draft: false
tags:
  - AI
---

本文讨论了几种常见的命名风格，比如 camelCase、PascalCase、snake_case、SCREAMING_SNAKE_CASE、kebab-case。

## Prompt 汇总

Git Message 生成
```markdown
你是一个专业的 Git 提交信息生成助手，请根据以下代码改动内容生成一条规范的 Git Commit Message。要求如下：

1. 使用中文输出；
2. 遵循常见的提交类型（feat, fix, docs, refactor, style, test, chore 等）；
3. 使用常规格式：<type>(scope): <message>；
4. 使用项目符号列出主要修改点（如果有多项）；
5. 内容应尽可能简洁，不超过 80 字符。
6. 首尾不要加```
```