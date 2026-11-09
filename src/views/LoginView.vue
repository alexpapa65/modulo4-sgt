<template>
  <section class="cartao cartao-formulario"><h2 class="titulo-cartao">Entrar</h2>
    <form novalidate @submit.prevent="handleLogin">
      <div class="grupo-formulario"><label for="email">E-mail</label><input id="email" v-model="email" class="campo" type="email" autocomplete="email" :aria-invalid="Boolean(errors.email)"/><p v-if="errors.email" class="erro">{{ errors.email }}</p></div>
      <div class="grupo-formulario"><label for="senha">Senha</label><input id="senha" v-model="password" class="campo" type="password" autocomplete="current-password" :aria-invalid="Boolean(errors.password)"/><p v-if="errors.password" class="erro">{{ errors.password }}</p></div>
      <button class="botao botao-primario" type="submit">Entrar</button>
      <p class="link-formulario">Não tem uma conta? <RouterLink to="/cadastro">Cadastre-se</RouterLink></p>
    </form>
  </section>
</template>
<script>
export default {
  name: 'LoginView', data() { return { email: '', password: '', errors: {} } },
  methods: {
    validate() {
      this.errors = {}
      if (!this.email.trim()) this.errors.email = 'Informe o e-mail.'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.errors.email = 'Informe um e-mail válido.'
      if (!this.password) this.errors.password = 'Informe a senha.'
      return Object.keys(this.errors).length === 0
    },
    async handleLogin() {
      if (!this.validate()) return
      await this.$store.dispatch('auth/login', { email: this.email, password: this.password })
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
