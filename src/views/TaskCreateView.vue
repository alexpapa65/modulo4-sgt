<template>
  <section><header class="cabecalho-interno"><h1>Criar Tarefa</h1></header>
    <div class="cartao cartao-formulario"><h2 class="titulo-cartao">Criar Tarefa</h2>
      <form novalidate @submit.prevent="handleSubmit">
        <div class="grupo-formulario"><label for="titulo">Título da Tarefa</label><input id="titulo" v-model="form.title" class="campo" type="text" :aria-invalid="Boolean(error)"/><p v-if="error" class="erro">{{ error }}</p></div>
        <div class="grupo-formulario"><label for="descricao">Descrição (Opcional)</label><textarea id="descricao" v-model="form.description" class="campo"></textarea></div>
        <div class="acoes-formulario"><button class="botao botao-primario" type="submit">Salvar Tarefa</button><RouterLink class="botao botao-secundario" to="/dashboard">Cancelar</RouterLink></div>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  name: 'TaskCreateView', data() { return { form: { title: '', description: '' }, error: '' } },
  methods: {
    validate() {
      this.error = this.form.title.trim() ? '' : 'Informe o título da tarefa.'
      return !this.error
    },
    async handleSubmit() {
      if (!this.validate()) return
      await this.$store.dispatch('tasks/createTask', { title: this.form.title.trim(), description: this.form.description })
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
