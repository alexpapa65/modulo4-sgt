<template>
  <article class="cartao cartao-tarefa">
    <header class="cabecalho-tarefa"><RouterLink class="icone-olho" :to="{ name: 'task-details', params: { id: task.id } }" :aria-label="`Ver detalhes de ${task.title}`" title="Ver detalhes">◉</RouterLink><h2>{{ task.title }}</h2></header>
    <p class="descricao-tarefa">{{ task.description || 'Sem descrição.' }}</p>
    <p><span class="status" :class="`status-${task.status}`">{{ statusLabel }}</span></p>
    <div class="acoes-tarefa">
      <RouterLink class="botao botao-secundario" :to="{ name: 'task-edit', params: { id: task.id } }">Editar</RouterLink>
      <button v-if="task.status !== 'concluida'" type="button" class="botao botao-primario" @click="$emit('complete', task.id)">Concluir</button>
    </div>
  </article>
</template>
<script>
export default {
  name: 'TaskCard', props: { task: { type: Object, required: true } }, emits: ['complete'],
  computed: { statusLabel() { return { pendente: 'Pendente', em_andamento: 'Em andamento', concluida: 'Concluída' }[this.task.status] || this.task.status } }
}
</script>
