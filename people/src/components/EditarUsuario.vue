<template>
<v-app>
    <v-row justify="center">
        <v-dialog
        v-model="dialog"
        width="600px"
        >
        <v-card>
            <v-card-title>
            <span class="headline">Editar usuário</span>
            </v-card-title>
            <v-card-text>
            <div id="cadastro">
                <validation-observer
                ref="observer"
                v-slot="{ invalid }"
                >
                <form @submit.prevent="submit">
                    <validation-provider
                    v-slot="{ errors }"
                    name="Nome"
                    rules="required|max:100"
                    >
                    <v-text-field
                        v-model="nome"
                        :counter="100"
                        :error-messages="errors"
                        label="Nome"
                        required
                    ></v-text-field>
                    </validation-provider>
                    <validation-provider
                    v-slot="{ errors }"
                    name="numeroTelefone"
                    type="number"
                    :rules="{
                        required: true,
                        digits: 11,
                    }"
                    >
                    <v-text-field
                        v-model="numeroTelefone"
                        :counter="11"
                        :error-messages="errors"
                        label="Celular"
                        required
                    ></v-text-field>
                    </validation-provider>
                    <validation-provider
                    v-slot="{ errors }"
                    name="documento"
                    rules="required"
                    >
                    <v-text-field
                        v-model="documento"
                        :error-messages="errors"
                        :counter="10"
                        label="Informe seu RG"
                        required
                    ></v-text-field>
                    </validation-provider>

                    <!-- INÍCIO FORM ENDEREÇO -->
                    <validation-provider
                    v-slot="{ errors }"
                    name="endereco"
                    >
                    <v-checkbox
                        v-model="endereco"
                        :error-messages="errors"
                        value="1"
                        label="Mostrar Endereço?"
                        type="checkbox"
                    ></v-checkbox>
                    </validation-provider>

                    <div id="endereco" v-if="endereco">
                    <v-text-field
                        v-model="cep"
                        :error-messages="errors"
                        label="CEP"
                        required
                    ></v-text-field>
                    <v-select
                        v-model="estado"
                        :items="itemsEstado"
                        :error-messages="errors"
                        label="Estado"
                        data-vv-name="estado"
                        required
                    ></v-select>
                    <v-select
                        v-model="cidade"
                        :items="itemsCidade"
                        :error-messages="errors"
                        label="Cidade"
                        data-vv-name="cidade"
                        required
                    ></v-select>
                    <v-text-field
                        v-model="rua"
                        :error-messages="errors"
                        label="Rua"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="complemento"
                        :error-messages="errors"
                        label="Complemento"
                        required
                    ></v-text-field>
                    </div>

                    <!-- FIM FORM ENDEREÇO  -->
                    <v-divider></v-divider>
                    <h3>Adicionar Produtos?</h3>
                    <v-select
                    v-model="produtos"
                    :items="itemsProdutos"
                    :error-messages="errors"
                    label="Produtos"
                    multiple
                    data-vv-name="produtos"
                    required
                    ></v-select>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        class="mr-4"
                        type="submit"
                        @click.prevent="atualizarCliente()"
                        :disabled="invalid"
                        color='yellow'
                        >
                        Atualizar
                        </v-btn>
                        <v-btn
                            text
                            @click="dialog = false"
                        >
                            Fechar
                        </v-btn>
                    </v-card-actions>
                </form>
                </validation-observer>
            </div>
            </v-card-text>
        </v-card>
        </v-dialog>
    </v-row>
</v-app>
</template>

<script>
  import EventBus from '../plugins/eventbus'
  import { required, digits, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
//   import Swal from 'sweetalert2'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: 'O campo precisa ter pelo menos {length} dígitos.',
  })

  extend('required', {
    ...required,
    message: 'O campo não pode ser vazio',
  })

  extend('max', {
    ...max,
    message: 'O campo não pode ter mais que {length} caracteres',
  })


  export default {
    name: 'EditarUsuario',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      dialog: false,
      endereco: false,
      nome: '',
      numeroTelefone: '',
      documento: '',
      cep: '',
      estado: '',
      itemsEstado: [],
      cidade: '',
      itemsCidade: [],
      rua: '',
      complemento: '',
      id: null,
      errors: '',
      itemsProdutos: [
        '#0001 - Jaqueta Jeans - R$ 119,90',
        '#0002 - Bermuda Sarja - R$ 99,90',
        '#0003 - Calça Tactel - R$ 100,00',
        '#0004 - Camisa Polo - R$ 89,90',
      ],
      produtos: [],
      cadastro: 0,
    }),
    watch: {
      estado() {
        this.buscarCidades()
      }
    },
    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.nome = ''
        this.numeroTelefone = ''
        this.documento = ''
        this.cep = ''
        this.estado = ''
        this.cidade = ''
        this.rua = ''
        this.complemento = ''
        this.produtos = []
        this.endereco = null
        this.$refs.observer.reset()
      },
      atualizarCliente() {
          let data = {
                cliente: {
                'nome': this.nome,
                'celular': this.numeroTelefone,
                'documento': this.documento
                },
                endereco: {
                    'cep': this.cep,
                    'estado': this.estado,
                    'cidade': this.cidade,
                    'rua': this.rua,
                    'complemento': this.complemento,
                },
                produtos: {
                    'produtos': this.produtos
                }
            }
          fetch(`http://localhost:3000/clientes/${this.id}`, {
              method: "PUT",
              body: JSON.stringify(data)
          })
          .then(r => r.json())
          .then(r => {
              console.log(r)
              this.clear()
              this.dialog = false
          })
        },
        pegarDados(evento) {
          fetch(`http://localhost:3000/clientes/${evento}`, {
              method: "GET",
          })
          .then(r => r.json())
          .then(r => {
              this.nome = r.cliente.nome
              this.numeroTelefone = r.cliente.celular
              this.documento = r.cliente.documento
              this.cep = r.endereco.cep
              this.estado = r.endereco.estado
              this.cidade = r.endereco.cidade
              this.rua = r.endereco.rua
              this.complemento = r.endereco.complemento
              for (let p in r.produtos) {
                  this.produtos = r.produtos[p]
              }
          })
      },
    },
    created() {
        EventBus.$on(EventBus.$on('edit', evento => {
            this.id = evento
            this.dialog = true
            this.pegarDados(evento)
        }))
    }
}
</script>

<style scoped>

</style>