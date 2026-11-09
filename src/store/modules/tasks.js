const KEY = 'sgt-modulo4-tasks'
const initialTasks = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `Tarefa ${index + 1}`,
  description: `Descrição da tarefa ${index + 1}.`,
  status: 'pendente',
  createdAt: '2025-08-24T12:00:00.000Z'
}))
function load() {
  try {
    const raw = localStorage.getItem(KEY)
    const data = raw === null ? initialTasks : JSON.parse(raw)
    return Array.isArray(data) ? data : initialTasks
  } catch { return initialTasks }
}
function save(items) { localStorage.setItem(KEY, JSON.stringify(items)) }
export default {
  namespaced: true,
  state: () => ({ items: [], filter: 'todas' }),
  getters: {
    totalTasks: state => state.items.length,
    filteredTasks: state => state.filter === 'todas' ? state.items : state.items.filter(t => t.status === state.filter),
    getTaskById: state => id => state.items.find(t => String(t.id) === String(id))
  },
  mutations: {
    SET_TASKS(state, tasks) { state.items = tasks },
    ADD_TASK(state, task) { state.items.push(task) },
    UPDATE_TASK(state, task) { state.items = state.items.map(t => String(t.id) === String(task.id) ? task : t) },
    REMOVE_TASK(state, id) { state.items = state.items.filter(t => String(t.id) !== String(id)) },
    SET_FILTER(state, filter) { state.filter = filter }
  },
  actions: {
    loadTasks({ commit }) { const items = load(); commit('SET_TASKS', items); save(items) },
    setFilter({ commit }, filter) { commit('SET_FILTER', filter) },
    createTask({ commit, state }, data) {
      const task = { ...data, id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, status: 'pendente', createdAt: new Date().toISOString() }
      commit('ADD_TASK', task); save(state.items); return task
    },
    updateTask({ commit, state }, data) { commit('UPDATE_TASK', data); save(state.items) },
    removeTask({ commit, state }, id) { commit('REMOVE_TASK', id); save(state.items) },
    completeTask({ dispatch, getters }, id) {
      const task = getters.getTaskById(id)
      if (task) dispatch('updateTask', { ...task, status: 'concluida' })
    }
  }
}
