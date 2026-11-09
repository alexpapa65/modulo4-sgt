const KEY = 'sgt-modulo4-user'
function readUser() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null') } catch { return null }
}
export default {
  namespaced: true,
  state: () => ({ user: null }),
  getters: { isAuthenticated: state => Boolean(state.user), currentUser: state => state.user },
  mutations: { SET_USER(state, user) { state.user = user } },
  actions: {
    loadSession({ commit }) { commit('SET_USER', readUser()) },
    login({ commit, dispatch }, { email }) {
      const saved = readUser()
      const user = saved && saved.email === email ? saved : { name: email.split('@')[0], email }
      commit('SET_USER', user)
      dispatch('persist', user)
    },
    register({ commit, dispatch }, { name, email }) {
      const user = { name, email }
      commit('SET_USER', user)
      dispatch('persist', user)
    },
    updateProfile({ commit, dispatch }, data) {
      const user = { ...readUser(), ...data }
      commit('SET_USER', user)
      dispatch('persist', user)
    },
    persist(_context, user) { localStorage.setItem(KEY, JSON.stringify(user)) },
    logout({ commit }) { commit('SET_USER', null); localStorage.removeItem(KEY) }
  }
}
