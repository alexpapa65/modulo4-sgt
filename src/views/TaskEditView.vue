<template>
  <section><header class="cabecalho-interno"><h1>Editar Tarefa</h1></header>
    <p v-if="!task" class="cartao vazio">Tarefa não encontrada. <RouterLink to="/dashboard">Voltar</RouterLink></p>
    <div v-else class="cartao cartao-formulario"><h2 class="titulo-cartao">Editar Tarefa</h2>
      <form novalidate @submit.prevent="handleSubmit">
        <div class="grupo-formulario"><label for="titulo">Título da Tarefa</label><input id="titulo" v-model="form.title" class="campo" type="text" :aria-invalid="Boolean(error)"/><p v-if="error" class="erro">{{ error }}</p></div>
        <div class="grupo-formulario"><label for="descricao">Descrição (Opcional)</label><textarea id="descricao" v-model="form.description" class="campo"></textarea></div>
        <div class="grupo-formulario"><label for="situacao">Situação da Tarefa</label><select id="situacao" v-model="form.status" class="campo"><option value="pendente">Pendente</option><option value="em_andamento">Em andamento</option><option value="concluida">Concluída</option></select></div>
        <div class="acoes-formulario"><button class="botao botao-primario" type="submit">Atualizar Tarefa</button><RouterLink class="botao botao-secundario" to="/dashboard">Cancelar</RouterLink></div>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  name: 'TaskEditView', data() { return { form: { title: '', description: '', status: 'pendente' }, error: '' } },
  computed: { task() { return this.$store.getters['tasks/getTaskById'](this.$route.params.id) } },
  watch: { task: { immediate: true, handler(value) { if (value) this.form = { title: value.title, description: value.description || '', status: value.status } } } },
  methods: {
    validate() { this.error = this.form.title.trim() ? '' : 'Informe o título da tarefa.'; return !this.error },
    async handleSubmit() {
      if (!this.task || !this.validate()) return
      await this.$store.dispatch('tasks/updateTask', { ...this.task, ...this.form, title: this.form.title.trim() })
      this.$router.push({ name: 'task-details', params: { id: this.task.id } })
    }
  }
}
</script>
