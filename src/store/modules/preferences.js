const KEY = 'sgt-modulo4-dark'
export default {
  namespaced: true,
  state: () => ({ darkMode: false }),
  mutations: { SET_THEME(state, enabled) { state.darkMode = enabled } },
  actions: {
    loadTheme({ commit }) { commit('SET_THEME', localStorage.getItem(KEY) === 'true') },
    toggleTheme({ commit, state }) {
      const next = !state.darkMode
      commit('SET_THEME', next)
      localStorage.setItem(KEY, String(next))
    }
  }
}
