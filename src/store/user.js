import {resetRouter} from '@/router'


const state = {
    userName: '',
    password: '',
    userType: '',

};

const mutations = {

    SET_USERNAME: (state, userName) => {
        state.userName = userName
    },

    SET_PASSWORD: (state, password) => {
        state.password = password
    },

    SET_USERTYPE: (state, userType) => {
        state.userType = userType
    },

};

const actions = {

// user login
    login: function ({dispatch, commit}, userInfo) {
        const {username, password} = userInfo;
        localStorage.setItem("token", "1213");
        return new Promise((resolve, reject) => {
            this.$axios.post(
                'login',
                {
                    username: username,
                    password: password,
                }
            ).then(response => {
                commit('SET_USERNAME', response.username)
                commit('SET_PASSWORD', response.password)
                commit('SET_USERTYPE', response.userType)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
    ,


// user logout
    logout({commit, state}) {
        // while (constantRoutes.options.routes.length >= 2) {
        //     constantRoutes.options.routes.pop()
        // }
        // return new Promise((resolve, reject) => {
        //     commit('SET_TOKEN', '')
        //     removeToken()
        //     resetRouter()
        //     resolve()
        // })
    }
    ,

// remove token
//     resetToken({commit}) {
//         return new Promise(resolve => {
//             commit('SET_TOKEN', '')
//             removeToken()
//             resolve()
//         })
//     }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
