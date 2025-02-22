const state = {
    isFrontend: true || JSON.parse(localStorage.getItem('mode')) // 默认前台模式
}

const mutations = {
    TOGGLE_SYSTEM_MODE: (state, mode) => {
        state.isFrontend = mode
        localStorage.setItem('mode', JSON.stringify(mode));
    },
    SET_SYSTEM_MODE: (state, mode) => {
        state.isFrontend = mode
    }
}

const actions = {
    toggleSystemMode({ commit }, mode) {
        commit('TOGGLE_SYSTEM_MODE', mode)
    },
    setSystemMode({ commit }, mode) {
        commit('SET_SYSTEM_MODE', mode)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}