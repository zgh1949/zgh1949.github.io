export const sidebarRoutes = {
    "/posts/base": [
        {
            text: '🧮 算法',
            items: [
                {
                    text: '时间复杂度与空间复杂度', link: '/posts/base/时间复杂度与空间复杂度'
                },
            ]
        },
        {
            text: '🪜 架构',
            items: [{
                text: '反向代理与正向代理的区别', link: '/posts/base/反向代理与正向代理'
            },]
        },
    ],

    '/posts/backend/': [
        {
            text: '🍃 Spring',
            items: [
                {
                    text: 'AOP三种织入方式', link: '/posts/backend/AOP三种织入方式'
                },
                {
                    text: '参数校验', link: '/posts/backend/参数校验'
                },
            ]
        },
        {
            text: '📊 Mysql',
            items: [
                {
                    text: 'Mysql长连接导致内存过高案例', link: '/posts/backend/Mysql长连接导致内存过高案例'
                },
                {
                    text: '数据库连接池该如何配置', link: '/posts/backend/数据库连接池该如何配置'
                },
                {
                    text: 'Mysql 日志简述', link: '/posts/backend/Mysql日志简述'
                },
            ]
        },
    ],

    '/posts/mobile': [
        {
            text: '📦 关于Gradle',
            items: [
                {
                    text: 'settings.gradle和build.gradle区别', link: '/posts/mobile/settings.gradle和build.gradle区别'
                },
                {
                    text: 'Android Studio 配置 gradle', link: '/posts/mobile/AndroidStudio配置gradle'
                },
            ]
        },
        {
            text: '📱 安卓原生',
            items: [
                {
                    text: 'ViewBinding的使用', link: '/posts/mobile/ViewBinding'
                },
            ]
        }
    ],
};

export const navRoutes = [
    {
        text: 'HOME', link: '/'
    },
    {
        text: 'BASE', link: '/posts/base/'
    },
    {
        text: 'BACKEND', link: '/posts/backend/'
    },
    // {
    //     text: 'FRONTEND', link: '/posts/frontend/'
    // },
    {
        text: 'DEVOPS', link: '/posts/devops/'
    },
    {
        text: 'MOBILE', link: '/posts/mobile/'
    },
    // {
    //     text: 'BIGDATA', link: '/posts/bigdata/'
    // },
    // {
    //     text: 'AI', link: '/posts/ai/'
    // },
    {
        text: 'ABOUT', link: '/posts/about/'
    }
];