<template>
  <v-app>
    <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Clientes</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        color="primary"
        @click="cadastrar()"
      >
        mdi-account-plus
      </v-icon>
      <v-icon
        small
        color="yellow"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        color="green"
        small
        class="mr-2"
        @click.prevent="visualizarItem(item)"
      >
        mdi-card-search-outline
      </v-icon>
      <v-icon
        color="red"
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  </v-app>
</template>

<script>
import EventBus from '../plugins/eventbus'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      retorno: [],
      dialogDelete: false,
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: false,
          value: 'nome',
        },
        { text: 'Telefone', value: 'numeroTelefone' },
        { text: 'Documento', value: 'documento' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      desserts: [],
    }
  },
  methods: {
      cadastrar() {
          this.$router.push('cadastro')
      },
      editItem(item) {
          EventBus.$emit('edit', item.id)
      },
      visualizarItem(item) {
          EventBus.$emit('evento', item)
      },
      deleteItem(item) {
        const index = this.desserts.indexOf(item)
        Swal.fire({
          title: 'Tem certeza?',
          text: "Se você remover este item, não será possível recuperá-lo. Deseja remover?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, remova!'
        }).then((result) => {
          if (result.value) {
            fetch(`http://localhost:3000/clientes/${item.id}`, {
              headers: {
                id: item.id
              },
              method: 'DELETE'
            })
            this.desserts.splice(index, 1)
            Swal.fire(
              'Deletado!',
              'Produto deletado com sucesso!',
              'success'
            )
          }
        })
      },
      organizaTabela() {
          let tabela = []
          for (let i in this.retorno) {
              tabela.push({
                  'id': this.retorno[i]._id,
                  'nome': this.retorno[i].cliente.nome,
                  'numeroTelefone': this.retorno[i].cliente.celular,
                  'documento': this.retorno[i].cliente.documento,
                  'cep': this.retorno[i].endereco.cep,
                  'rua': this.retorno[i].endereco.rua,
                  'complemento': this.retorno[i].endereco.complemento,
                  'cidade': this.retorno[i].endereco.cidade,
                  'estado': this.retorno[i].endereco.estado,
                  'produtos': this.retorno[i].produtos
                })
          }
          this.desserts = tabela
      },
      popularTabela() {
          fetch("http://localhost:3000/clientes")
          .then(r => r.json())
          .then(r => {
              this.retorno = r
              this.organizaTabela()
          })
      }
  },
  created() {
    this.popularTabela()
    EventBus.$on('carregar', () => {
      this.popularTabela()
    })
  }
}
</script>