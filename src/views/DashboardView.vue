<template>
  <section><header class="cabecalho-interno"><h1>Minhas Tarefas</h1><RouterLink to="/tarefas/nova" class="botao botao-primario">Nova Tarefa</RouterLink></header>
    <div class="filtros"><label for="filtro">Filtrar por situação</label><select id="filtro" class="campo" :value="filter" @change="setFilter($event.target.value)"><option value="todas">Todas</option><option value="pendente">Pendentes</option><option value="em_andamento">Em andamento</option><option value="concluida">Concluídas</option></select></div>
    <p v-if="!filteredTasks.length" class="cartao vazio">Nenhuma tarefa encontrada.</p>
    <div v-else class="grade-tarefas"><TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" @complete="completeTask" /></div>
  </section>
</template>
<script>
import TaskCard from '../components/tasks/TaskCard.vue'
export default {
  name: 'DashboardView', components: { TaskCard },
  computed: {
    filter() { return this.$store.state.tasks.filter },
    filteredTasks() { return this.$store.getters['tasks/filteredTasks'] }
  },
  methods: {
    setFilter(value) { this.$store.dispatch('tasks/setFilter', value) },
    completeTask(id) { this.$store.dispatch('tasks/completeTask', id) }
  }
}
</script>
