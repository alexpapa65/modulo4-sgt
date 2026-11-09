<template>
  <div class="pagina" :class="{ 'tema-escuro': darkMode }">
    <button class="botao-tema" type="button" @click="toggleTheme" :aria-label="darkMode ? 'Ativar tema claro' : 'Ativar tema escuro'" title="Alternar tema">{{ darkMode ? '☾' : '☀' }}</button>
    <div v-if="authenticated" class="layout-interno">
      <AppSidebar />
      <main class="conteudo-interno"><RouterView /></main>
    </div>
    <div v-else class="pagina-publica">
      <header class="cabecalho-publico"><h1 class="nome-sistema">Sistema Gerenciador de Tarefas</h1></header>
      <main class="conteudo-publico"><RouterView /></main>
      <footer class="rodape-publico">© 2025 Projeto Acadêmico</footer>
    </div>
  </div>
</template>
<script>
import AppSidebar from './components/layout/AppSidebar.vue'
export default {
  name: 'App', components: { AppSidebar },
  computed: {
    authenticated() { return this.$store.getters['auth/isAuthenticated'] },
    darkMode() { return this.$store.state.preferences.darkMode }
  },
  methods: { toggleTheme() { this.$store.dispatch('preferences/toggleTheme') } }
}
</script>
