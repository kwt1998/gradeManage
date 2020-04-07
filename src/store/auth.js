const state = {
    updateGradeAuth: false,
    changeOrDelGradeAuth: false,
    courseManageAuth: false,
    adminManageAuth: false,
};

const mutations = {

    SET_updateGradeAuth: (state, updateGradeAuth) => {
        state.updateGradeAuth = updateGradeAuth
    },
    SET_changeOrDelGradeAuth: (state, changeOrDelGradeAuth) => {
        state.changeOrDelGradeAuth = changeOrDelGradeAuth
    },
    SET_courseManageAuth: (state, courseManageAuth) => {
        state.courseManageAuth = courseManageAuth
    },
    SET_adminManageAuth: (state, adminManageAuth) => {
        state.adminManageAuth = adminManageAuth
    },
};

const actions = {
    getAuth: function ({dispatch, commit}, userInfo) {
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            this.$axios.post(
                '/api/getAuth',
                {
                    username: username,
                },
                {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            ).then(response => {
                commit('SET_updateGradeAuth', response.data.updateGradeAuth)
                commit('SET_changeOrDelGradeAuth', response.data.changeOrDelGradeAuth)
                commit('SET_courseManageAuth', response.data.courseManageAuth)
                commit('SET_adminManageAuth', response.data.adminManageAuth)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
