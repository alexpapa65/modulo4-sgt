<template>
  <section><header class="cabecalho-interno"><h1>Detalhes da Tarefa</h1><RouterLink class="botao botao-secundario" to="/dashboard">Voltar para a Lista</RouterLink></header>
    <p v-if="!task" class="cartao vazio">Tarefa não encontrada.</p>
    <article v-else class="cartao cartao-detalhes"><h2>{{ task.title }}</h2>
      <dl class="lista-detalhes"><dt>Status:</dt><dd><span class="status">{{ statusLabel }}</span></dd><dt>Criada em:</dt><dd>{{ createdAtLabel }}</dd></dl>
      <section class="descricao-detalhada"><h2>Descrição</h2><p>{{ task.description || 'Sem descrição.' }}</p></section>
      <div class="acoes-formulario"><RouterLink class="botao botao-primario" :to="{ name: 'task-edit', params: { id: task.id } }">Editar Tarefa</RouterLink><button type="button" class="botao botao-perigo" @click="remove">Excluir Tarefa</button></div>
    </article>
  </section>
</template>
<script>
export default {
  name: 'TaskDetailsView',
  computed: {
    task() { return this.$store.getters['tasks/getTaskById'](this.$route.params.id) },
    statusLabel() { return { pendente: 'Pendente', em_andamento: 'Em andamento', concluida: 'Concluída' }[this.task?.status] || '-' },
    createdAtLabel() { return this.task?.createdAt ? new Date(this.task.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'Não informada' }
  },
  methods: {
    async remove() {
      if (!this.task || !window.confirm('Deseja realmente excluir esta tarefa?')) return
      await this.$store.dispatch('tasks/removeTask', this.task.id)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
