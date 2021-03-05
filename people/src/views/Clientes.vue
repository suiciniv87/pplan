<template>
  <div class="Clientes">
    <tabela-lista />
    <visualizar-dados />
  </div>
</template>

<script>
import TabelaLista from '../components/TabelaLista.vue'
import VisualizarDados from '../components/VisualizarDados.vue'

export default {
  name: 'Clientes',
  components: {
    TabelaLista,
    VisualizarDados
  }
}
</script>