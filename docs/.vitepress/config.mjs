import {
    defineConfig
} from 'vitepress'
import {navRoutes, sidebarRoutes} from '../posts/routes.js'
import timeline from "vitepress-markdown-timeline";
import footnote_plugin from "markdown-it-footnote";
import { withMermaid } from 'vitepress-plugin-mermaid';

// https://vitepress.dev/reference/site-config
export default withMermaid({
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
        nav: navRoutes,
        sidebar: sidebarRoutes,

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
            text: 'GitHub'
        },

        search: {
            provider: 'local'
        },

        cleanUrls: true,
        lastUpdated: true,
        lastUpdatedText: '⏳',

        //大纲显示2-3级标题
        outline: {
            level: [2, 3],
            label: '🔖'
        },

        //自定义上下页名
        docFooter: {
            prev: '🔙',
            next: '🔜',
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
        hostname: 'https://zgh1949.space' // 在根目录生成sitemap.xml，用于SEO优化
    },
})