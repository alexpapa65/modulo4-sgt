<template>
  <aside class="sidebar">
    <h2>Sistema de Gerenciamento de Tarefas</h2>
    <nav class="navegacao" aria-label="Navegação principal"><ul>
      <li><RouterLink to="/dashboard">Dashboard</RouterLink></li>
      <li><RouterLink to="/tarefas/nova">Criar Tarefa</RouterLink></li>
      <li><RouterLink to="/perfil">Meu Perfil</RouterLink></li>
      <li><button type="button" class="nav-sair" @click="logout">Sair</button></li>
    </ul></nav>
    <p class="sidebar-rodape">© 2025 Projeto Acadêmico</p>
  </aside>
</template>
<script>
export default { name: 'AppSidebar', methods: {
  logout() { this.$store.dispatch('auth/logout'); this.$router.push({ name: 'login' }) }
} }
</script>
