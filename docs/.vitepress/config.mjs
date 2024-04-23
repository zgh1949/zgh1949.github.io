import {
  defineConfig
} from 'vitepress'
import timeline from "vitepress-markdown-timeline";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zgh1949",
  description: "my blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/avatar.png',
    siteTitle: '@仿生草的自定义空间',

    nav: [{
        text: '首页',
        link: '/'
      },
      {
        text: '编程',
        items: [{
            text: 'Java',
            link: '/posts/coding/Java/'
          },
          {
            text: 'Python',
            link: '/posts/coding/Python/'
          },
          {
            text: 'JS',
            link: '/posts/coding/JavaScript/'
          }
        ]
      },
      {
        text: '笔记',
        link: '/posts/note/'
      },
      {
        text: '行知',
        items: [{
            text: '美食',
            link: '/posts/life/foods/'
          },
          {
            text: '游戏',
            link: '/posts/life/game/'
          },
        ]
      },
      {
        text: '时间线',
        link: '/posts/timeline'
      }
    ],

    sidebar: {
      '/coding/': [{
        text: 'Guide',
        collapsed: true,
        items: [{
            text: 'Index',
            link: '/posts/guide/'
          },
          {
            text: 'One',
            link: '/posts/guide/one'
          },
          {
            text: 'Two',
            link: '/posts/guide/two'
          }
        ]
      }],

      '/note/': [{
          text: '分类A',
          items: [{
              text: 'api-examples',
              link: '/posts/note/api-examples'
            },
            {
              text: 'markdown-examples',
              link: '/posts/note/markdown-examples'
            }
          ]
        },
        {
          text: '分类B',
          items: [{
              text: 'api-examples',
              link: '/posts/note/api-examples'
            },
            {
              text: 'markdown-examples',
              link: '/posts/note/markdown-examples'
            }
          ]
        }
      ],

      '/life/foods/': [{
        text: '美食',
        items: [{
          text: '美食',
          link: '/posts/life/foods/'
        }]
      }],
      '/life/game/': [{
        text: '美食',
        items: [{
          text: '美食',
          link: '/posts/life/foods/'
        }]
      }, ]
    },

    socialLinks: [{
      icon: 'github',
      link: 'https://github.com/zgh1949'
    }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present 仿生草'
    },
    editLink: {
      pattern: 'https://github.com/zgh1949/blog/edit/main/docs/:path',
      text: '在GitHub编辑本页'
    },

    search: {
      provider: 'local'
    },

    head: [
      ['link', {
        rel: 'icon',
        href: 'favicon.ico'
      }]
    ],

    cleanUrls: true,
    lastUpdated: true,
    lastUpdatedText: '更新时间',

    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: '当前页大纲'
    },
    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '目录',

    //返回顶部文字修改(移动端)
    returnToTopLabel: '返回顶部',
  },

  markdown: {
    // 高亮提示
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    // 启用图片懒加载
    image: {
      lazyLoading: true
    },
    // Todo 该配置启动报错
    // 数学方程支持，先执行 npm add -D markdown-it-mathjax3
    // math: true
    //行号显示
    lineNumbers: true,
    //时间线
    config: (md) => {
      md.use(timeline);
    },
  },
  sitemap: {
    hostname: 'https://zgh1949.com' // 在根目录生成sitemap.xml，用于SEO优化
  },
})