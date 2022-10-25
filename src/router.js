import {createRouter, createWebHistory} from 'vue-router';
import PostsPage from '@/pages/PostsPage';
import HomePage from '@/pages/HomePage';
import PostPage from '@/pages/PostPage';
import PostsPage_LocalState from '@/pages/PostsPage_LocalState';

export const ROUTES = {
    HOME: '/',
    POSTS: '/posts',
    POSTS_LOCAL_STATE: '/posts-local-state',
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
    {
        path: ROUTES.POSTS_LOCAL_STATE,
        component: PostsPage_LocalState,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
