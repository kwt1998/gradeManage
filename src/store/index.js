import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        user,
    },
    getters: {
        userName: state => state.user.userName,
        password: state => state.user.password,
        userType: state => state.userType,
    }
})

export default store;
