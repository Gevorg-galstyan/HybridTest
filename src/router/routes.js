export const routes = [
    {
        path: '/blog',
        name: 'blog',
        component: () => import('../views/Blog.vue'),
    },
    {
        path: '/create',
        name: 'create',
        component: () => import('../views/CreateBlog.vue'),
    },
    {
        path: '/post/:id',
        name: 'post',
        component: () => import('../views/Single.vue'),
    },
    {
        path: '*',
        redirect: {
            name: "blog"
        },
    },
];
