import Vue from 'vue'
import Vuex from 'vuex'
import setting from './setting'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        setting,
        user,
    },
    getters: {}
})

export default store;
