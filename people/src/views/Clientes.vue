<template>
  <div class="Clientes">
    <tabela-lista />
    <visualizar-dados />
    <editar-usuario />
  </div>
</template>

<script>
import EditarUsuario from '../components/EditarUsuario.vue'
import TabelaLista from '../components/TabelaLista.vue'
import VisualizarDados from '../components/VisualizarDados.vue'

export default {
  name: 'Clientes',
  components: {
    TabelaLista,
    VisualizarDados,
    EditarUsuario
  }
}
</script>