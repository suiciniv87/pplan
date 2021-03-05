<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Informações do usuário</span>
        </v-card-title>
        <v-card-text>
          <h2 style="color: teal">Dados Pessoais</h2><br> 
          <span class="titulo">Nome: </span><span class="texto">{{ cliente.nome }}</span> -
          <span class="titulo">Documento: </span><span class="texto">{{ cliente.documento }}</span><br>
          <span class="titulo">Telefone: </span><span class="texto">{{ cliente.numeroTelefone }}</span><br>
          <h2 style="margin-top: 30px; color: teal">Endereço</h2><br>
          <span class="titulo">CEP: </span><span class="texto">{{ cliente.cep == null || cliente.cep == '' ? "Não informado" : cliente.cep }}</span> - 
          <span class="titulo">Estado: </span><span class="texto">{{ cliente.estado == null || cliente.estado == '' ? "Não informado" : cliente.estado }}</span><br>
          <span class="titulo">Cidade: </span><span class="texto">{{ cliente.cidade == null || cliente.cidade == '' ? "Não informado" : cliente.cidade }}</span> -
          <span class="titulo">Rua: </span><span class="texto">{{ cliente.rua == null || cliente.rua == '' ? "Não informado" : cliente.rua }}</span> -
          <span class="titulo">Complemento: </span><span class="texto">{{ cliente.complemento == null || cliente.complemento == '' ? "Não informado" : cliente.complemento }}</span><br>
          <div v-if="cliente.produtos">
            <div v-if="cliente.produtos.produtos.length != 0">
              <h2 style="margin-top: 30px; color: teal">Produtos</h2><br>
              <ul v-for="(index, produto) in cliente.produtos.produtos" :key="produto">
                  <li class="texto">{{ index }}</li>
              </ul>
            </div>
          </div>
                    
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import EventBus from '../plugins/eventbus'

export default {
    name: 'VisualizarDados',
    data () {
      return {
        dialog: false,
        cliente: []
      }
    },
    created() {
        EventBus.$on('evento', evento => {
            this.cliente = evento
            this.dialog = true
        })
    }
}
</script>

<style scoped>
.titulo {
    color:darkslategrey;
    font-size: 1.2em;
}
.texto {
    color: #001A;
    font-size: 1.1em;
}
li {
    list-style-type: none;
}
</style>