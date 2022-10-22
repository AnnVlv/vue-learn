import {createRouter, createWebHistory} from 'vue-router';
import PostsPage from '@/pages/PostsPage';
import HomePage from '@/pages/HomePage';
import PostPage from '@/pages/PostPage';

export const ROUTES = {
    HOME: '/',
    POSTS: '/posts',
};

const routes = [
    {
        path: ROUTES.HOME,
        component: HomePage,
    },
    {
        path: ROUTES.POSTS,
        component: PostsPage,
    },
    {
        path: `${ROUTES.POSTS}/:id`,
        component: PostPage,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
