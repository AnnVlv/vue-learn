import {PostAPIService} from '@/features/post/services/postAPIService';
import {PostAdapterService} from '@/features/post/services/postAdapterService';
import {PostHelperService} from '@/features/post/services/postHelperService';
import {SORT_TYPES} from '@/features/post/const';
import {getPageCount} from '@/helpers';


export const DEFAULT_SORT_TYPE = SORT_TYPES.NONE;
export const DEFAULT_SEARCH_QUERY = '';
export const DEFAULT_LIMIT = 3;
export const DEFAULT_PAGE = 1;

export const postModule = {
    state: () => ({
        post: null,
        isPostLoading: false,
        posts: [],
        isPostsLoading: false,
        sortType: DEFAULT_SORT_TYPE,
        searchQuery: DEFAULT_SEARCH_QUERY,
        page: DEFAULT_PAGE,
        pageCount: 0,
        limit: DEFAULT_LIMIT,
    }),
    getters: {
        sortedPosts(state) {
            return PostHelperService.sortPosts(state.posts, state.sortType);
        },
        sortedAndSearchedPosts(state, getters) {
            return PostHelperService.searchPosts(getters.sortedPosts, state.searchQuery);
        },
    },
    mutations: {
        setPost(state, post) {
            state.post = post;
        },
        setIsPostLoading(state, isPostLoading) {
            state.isPostLoading = isPostLoading;
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        addPost(state, postForm) {
            const post = {
                ...postForm,
                id: Date.now(),
            };
            this.posts.push(post);
        },
        deletePost(state, post) {
            state.posts = state.posts.filter(p => p !== post);
        },
        setIsPostsLoading(state, isPostsLoading) {
            state.isPostsLoading = isPostsLoading;
        },
        setSortType(state, sortType) {
            state.sortType = sortType;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setPage(state, page) {
            state.page = page;
        },
        setPageCount(state, pageCount) {
            state.pageCount = pageCount;
        },
        setLimit(state, limit) {
            state.limit = limit;
        },
    },
    actions: {
        async fetchPosts({ state, commit }) {
            commit('setIsPostsLoading', true);
            try {
                const { limit, page } = state;
                const response = await PostAPIService.getPosts({ limit, page });

                const posts = PostAdapterService.adaptAPIPosts(response.data);
                commit('setPosts', posts);

                const postCount = response.headers['x-total-count'];
                const pageCount = getPageCount(postCount, state.limit);
                commit('setPageCount', pageCount);
            } catch {
            } finally {
                commit('setIsPostsLoading', false);
            }
        },
        async fetchPost({ state, commit }, postId) {
            commit('setIsPostLoading', true);
            try {
                const response = await PostAPIService.getPost(postId);
                const post = PostAdapterService.adaptAPIPost(response.data);
                commit('setPost', post);
            } catch {
            } finally {
                commit('setIsPostLoading', false);
            }
        },
    },
    namespaced: true,
};
