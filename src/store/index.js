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
        userType: state => state.user.userType,
        updateGradeAuth: state => state.auth.updateGradeAuth,
        changeOrDelGradeAuth: state => state.auth.changeOrDelGradeAuth,
        courseManageAuth: state => state.auth.courseManageAuth,
        adminManageAuth: state => state.auth.adminManageAuth,
    }
})

export default store;
