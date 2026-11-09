<template>
  <section class="cartao cartao-formulario"><h2 class="titulo-cartao">Cadastro de Usuário</h2>
    <form novalidate @submit.prevent="handleRegister">
      <div class="grupo-formulario"><label for="nome">Nome</label><input id="nome" v-model="form.name" class="campo" type="text" autocomplete="name" :aria-invalid="Boolean(errors.name)"/><p v-if="errors.name" class="erro">{{ errors.name }}</p></div>
      <div class="grupo-formulario"><label for="email">E-mail</label><input id="email" v-model="form.email" class="campo" type="email" autocomplete="email" :aria-invalid="Boolean(errors.email)"/><p v-if="errors.email" class="erro">{{ errors.email }}</p></div>
      <div class="grupo-formulario"><label for="senha">Senha</label><input id="senha" v-model="form.password" class="campo" type="password" autocomplete="new-password" :aria-invalid="Boolean(errors.password)"/><p v-if="errors.password" class="erro">{{ errors.password }}</p></div>
      <button class="botao botao-primario" type="submit">Cadastrar</button>
      <p class="link-formulario">Já tem uma conta? <RouterLink to="/login">Faça login</RouterLink></p>
    </form>
  </section>
</template>
<script>
export default {
  name: 'RegisterView', data() { return { form: { name: '', email: '', password: '' }, errors: {} } },
  methods: {
    validate() {
      this.errors = {}
      if (!this.form.name.trim()) this.errors.name = 'Informe o nome.'
      if (!this.form.email.trim()) this.errors.email = 'Informe o e-mail.'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) this.errors.email = 'Informe um e-mail válido.'
      if (!this.form.password) this.errors.password = 'Informe a senha.'
      return Object.keys(this.errors).length === 0
    },
    async handleRegister() {
      if (!this.validate()) return
      await this.$store.dispatch('auth/register', this.form)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
