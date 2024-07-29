export const sidebarRoutes = {
    "/posts/base": [
        {
            text: '算法',
            items: [
                {
                    text: '时间复杂度与空间复杂度', link: '/posts/base/时间复杂度与空间复杂度'
                },
            ]
        },
        {
            text: '架构',
            items: [{
                text: '反向代理与正向代理的区别', link: '/posts/base/反向代理与正向代理'
            },]
        },
    ],

    '/posts/backend/': [
        {
            text: 'Spring',
            items: [
                {
                    text: 'AOP三种织入方式', link: '/posts/backend/AOP三种织入方式'
                },
            ]
        },
    ],

    '/posts/android': [
        {
            text: '安卓',
            items: [
                {
                    text: 'settings.gradle和build.gradle区别', link: '/posts/android/settings.gradle和build.gradle区别'
                },
                {
                    text: 'Android Studio 配置 gradle', link: '/posts/android/AndroidStudio配置gradle'
                },
                {
                    text: 'ViewBinding的使用', link: '/posts/android/ViewBinding'
                },
            ]
        },
    ],
};

export const navRoutes = [
    {
        text: 'HOME', link: '/'
    },
    {
        text: 'Base', link: '/posts/base/'
    },
    {
        text: 'Backend', link: '/posts/backend/'
    },
    {
        text: 'Frontend', link: '/posts/frontend/'
    },
    {
        text: 'DevOps', link: '/posts/devops/'
    },
    {
        text: 'Android', link: '/posts/android/'
    },
    {
        text: 'Big Data', link: '/posts/bigdata/'
    },
    {
        text: 'AI', link: '/posts/ai/'
    },
    {
        text: 'About', link: '/posts/About'
    }
];