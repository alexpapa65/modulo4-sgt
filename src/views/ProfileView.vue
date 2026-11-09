<template>
  <section><header class="cabecalho-interno"><h1>Meu Perfil</h1></header>
    <div class="cartao cartao-formulario"><h2 class="titulo-cartao">Dados do usuário</h2>
      <form novalidate @submit.prevent="save">
        <div class="grupo-formulario"><label for="nome">Nome</label><input id="nome" class="campo" v-model="form.name"/><p v-if="error" class="erro">{{ error }}</p></div>
        <div class="grupo-formulario"><label for="email">E-mail</label><input id="email" class="campo" :value="user?.email" readonly/></div>
        <div class="acoes-formulario"><button class="botao botao-primario" type="submit">Salvar</button><RouterLink class="botao botao-secundario" to="/dashboard">Voltar</RouterLink></div>
        <p v-if="saved" role="status">Dados atualizados.</p>
      </form>
    </div>
  </section>
</template>
<script>
export default {
  name: 'ProfileView', data() { return { form: { name: '' }, error: '', saved: false } },
  computed: { user() { return this.$store.getters['auth/currentUser'] } },
  created() { this.form.name = this.user?.name || '' },
  methods: {
    async save() {
      this.error = this.form.name.trim() ? '' : 'Informe o nome.'
      if (this.error) return
      await this.$store.dispatch('auth/updateProfile', { name: this.form.name.trim() })
      this.saved = true
    }
  }
}
</script>
