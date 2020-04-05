import {resetRouter} from '@/router'


const state = {
    userName: '',
    password: '',
    userType: '',
    token: '',
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

    SET_TOKEN: (state, token) => {
        state.token = token
    },


};

const actions = {

// user login
    login: function ({dispatch, commit}, userInfo) {
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            sessionStorage.setItem("token", "qwqwqw");
            this.$axios.post(
                '/api/login',
                {
                    username: username,
                    password: password,
                }
            ).then(response => {
                commit('SET_USERNAME', response.username)
                commit('SET_PASSWORD', response.password)
                commit('SET_USERTYPE', response.userType)
                commit('SET_TOKEN', response.token)
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
