import {createStore} from 'vuex';
import {toUppercaseCaseFirstLetter} from '@/helpers';


export default createStore({
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
