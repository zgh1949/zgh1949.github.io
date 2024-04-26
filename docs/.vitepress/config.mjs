import {
    defineConfig
} from 'vitepress'
import timeline from "vitepress-markdown-timeline";
import footnote_plugin from "markdown-it-footnote";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "zgh1949",
    description: "my blog",

    head: [
        ['link', {
            rel: 'icon',
            href: 'favicon.ico'
        }],
        ['script', {
            defer: true,
            src: 'https://analytics.eu.umami.is/script.js',
            'data-website-id': '999c665d-b59d-4143-a569-835f3099af48'
        }]
    ],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/favicon.ico',
        siteTitle: '仿生草牧场',

        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '笔记',
                link: '/posts/note/'
            },
            {
                text: '行知',
                link: '/posts/life/'
            },
            {
                text: '关于',
                link: '/posts/About'
            }
        ],

        sidebar: {
            '/posts/note/': [
                {
                    text: '架构',
                    items: [
                        {
                            text: '反向代理与正向代理的区别',
                            link: '/posts/note/反向代理与正向代理'
                        },
                    ]
                },
                {
                    text: 'Spring',
                    items: [
                        {
                            text: 'AOP三种织入方式',
                            link: '/posts/note/AOP三种织入方式'
                        },
                    ]
                },
                {
                    text: '算法',
                    items: [
                        {
                            text: '时间复杂度与空间复杂度',
                            link: '/posts/note/时间复杂度与空间复杂度'
                        },
                    ]
                },
            ],

            '/posts/life': [
                {
                    text: '美食',
                    items: [
                        {
                            text: '美食',
                            link: '/posts/life/foods/'
                        }
                    ]
                },
                {
                    text: '游戏',
                    items: [
                        {
                            text: '游戏',
                            link: '/posts/life/game/'
                        }
                    ]
                }
            ],
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
            pattern: 'https://github.com/zgh1949/zgh1949.github.io/edit/main/docs/:path',
            text: '在GitHub编辑本页'
        },

        search: {
            provider: 'local'
        },


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
        // 数学方程支持，先执行 npm add -D markdown-it-mathjax3
        math: true,
        //行号显示
        lineNumbers: true,
        //时间线
        config: (md) => {
            md.use(timeline);
            md.use(footnote_plugin);
        },
    },
    sitemap: {
        hostname: 'https://zgh1949.com' // 在根目录生成sitemap.xml，用于SEO优化
    },
})