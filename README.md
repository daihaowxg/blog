# AstroPaper

Read [the blog posts](https://astro-paper.pages.dev/posts/) for more info.

# Environment

```shell
  nvm current
  v20.18.1

  pnpm -v
  10.9.0
```

# 源码分析

## [index.astro](src/pages/index.astro) 

- `index.astro` 中的内容对应了博客首页的内容

- 获取文章的逻辑：
```typescript
import { getCollection } from "astro:content";
import getSortedPosts from "@/utils/getSortedPosts";

const posts = await getCollection("blog");
const sortedPosts = getSortedPosts(posts);
const featuredPosts = sortedPosts.filter(({data}) => data.featured);
const recentPosts = sortedPosts.filter(({data}) => !data.featured);
```
- 解释说明：
  - `getCollection` 是 Astro 提供的 API
  - `blog` 对应的目录配置在 [content.config.ts](src/content.config.ts) 文件中，具体是 `src/data/blog`
  - `getSortedPosts` 函数的作用是对传入的博客文章集合（posts）进行 筛选 + 排序，返回按时间倒序排列的文章列表。
  - `src/data/blog` 目录下的 Markdown 文件的开头部分中可以配置 `featured: true`
  - `featured: true` 的就属于是精选文章 `featuredPosts`，其余的就展示在最近文章 `recentPosts` 中