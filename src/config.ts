// 具体配置详见：https://astro-paper.pages.dev/posts/how-to-configure-astropaper-theme/#configuring-site
export const SITE = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "wxg",
  profile: "",
  desc: "daihaowxg 的 blog，这个神秘的男人也不知道他会写出什么东西。",
  title: "daihaowxg",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Suggest Changes",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: false,
  lang: "zh-CN",
  timezone: "Asia/Shanghai",
} as const;
