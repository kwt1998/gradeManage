import {resetRouter} from '@/router'


const state = {
    // token: getToken(),
    name: '',
    avatar: '',
    mail: '',
    sex: '',
    type: '',
    age: '',
    phone: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_TYPE: (state, type) => {
        state.type = type
    },
    SET_MAIL: (state, mail) => {
        state.mail = mail
    },
    SET_SEX: (state, sex) => {
        state.sex = sex
    },
    SET_AGE: (state, age) => {
        state.age = age
    },
    SET_PHONE: (state, phone) => {
        state.phone = phone
    }
}

const actions = {

// user login
    login: function ({dispatch, commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            this.$axios.post(
                '',
                {
                    username: username,
                    password: password,
                }
            ).then(response => {
                commit('SET_NAME', response.name)
                commit('SET_AVATAR', response.avatar)
                commit('SET_SEX', response.sex)
                commit('SET_AGE', response.age)
                commit('SET_MAIL', response.email)
                commit('SET_PHONE', response.userphone)
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
