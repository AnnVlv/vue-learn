import {PostAPIService} from '@/features/post/services/postAPIService';
import {PostAdapterService} from '@/features/post/services/postAdapterService';


export const postModule = {
    state: () => ({
        post: null,
        isPostLoading: false,
    }),
    getters: {
        post(state) {
            return state.post;
        },
        isPostLoading(state) {
            return state.isPostLoading
        },
    },
    mutations: {
        setPost(state, post) {
            state.post = post;
        },
        setIsPostLoading(state, isPostLoading) {
            state.isPostLoading = isPostLoading;
        },
    },
    actions: {
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
