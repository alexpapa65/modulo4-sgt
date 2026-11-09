import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import TaskCreateView from '../views/TaskCreateView.vue'
import TaskEditView from '../views/TaskEditView.vue'
import TaskDetailsView from '../views/TaskDetailsView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({ history: createWebHistory(), routes: [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/cadastro', name: 'register', component: RegisterView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/tarefas/nova', name: 'task-create', component: TaskCreateView, meta: { requiresAuth: true } },
  { path: '/tarefas/:id', name: 'task-details', component: TaskDetailsView, meta: { requiresAuth: true } },
  { path: '/tarefas/:id/editar', name: 'task-edit', component: TaskEditView, meta: { requiresAuth: true } },
  { path: '/perfil', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
] })
router.beforeEach(to => {
  const loggedIn = store.getters['auth/isAuthenticated']
  if (to.meta.requiresAuth && !loggedIn) return { name: 'login' }
  if (loggedIn && ['login', 'register'].includes(to.name)) return { name: 'dashboard' }
})
export default router
