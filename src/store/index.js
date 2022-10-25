import {createStore} from 'vuex';
import {toUppercaseCaseFirstLetter} from '@/helpers';
import {postModule} from '@/store/postModule';
import {postsModule} from '@/store/postsModule';


export default createStore({
    modules: {
        postsModule,
        postModule,
    },
    state: () => ({
        title: 'home',
    }),
    getters: {
        formattedTitle(state) {
            return toUppercaseCaseFirstLetter(state.title);
        },
    },
    mutations: {
        setTitle(state, title) {
            state.title = title;
        },
    },
});
