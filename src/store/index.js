import {createStore} from 'vuex';
import {toUppercaseCaseFirstLetter} from '@/helpers';
import {postModule} from '@/store/postModule';


export default createStore({
    modules: {
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
