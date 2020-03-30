const state = {

};

const mutations = {

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

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
