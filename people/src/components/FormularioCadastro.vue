<template>
  <v-app>
    <v-container>
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

            <v-btn
              class="mr-4"
              type="submit"
              @click.prevent="cadastrarCliente()"
              :disabled="invalid"
            >
              Enviar
            </v-btn>
            <v-btn @click="clear">
              Limpar Campos
            </v-btn>
          </form>
        </validation-observer>
      </div>
    </v-container>
  </v-app>
</template>

<script>
  import { required, digits, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import Swal from 'sweetalert2'

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
    name: 'FormularioCadastro',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
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
      errors: '',
      itemsProdutos: [
        '#0001 - Jaqueta Jeans - R$ 119,90',
        '#0002 - Bermuda Sarja - R$ 99,90',
        '#0003 - Calça Tactel - R$ 100,00',
        '#0004 - Camisa Polo - R$ 89,90',
      ],
      produtos: [],
      cadastro: 0,
      clientes: [],
    }),
    watch: {
      estado() {
        this.buscarCidades()
      },
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
      async buscarEstados() {
        await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(r => r.json())
        .then(r => {
          for (let e in r) {
            this.itemsEstado.push(r[e].sigla)
          }
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Houve alguma falha ao tentar adicionar as UF dos estados, por favor, atualize a página e tente novamente.',
          })
        })
      },
      async buscarCidades() {
        await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.estado}/municipios`)
        .then(r => r.json())
        .then(r => {
          for (let c in r) {
            this.itemsCidade.push(r[c].nome)
          }
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Falha ao tentar adicionar as cidades automaticamente, verifique se o problema persiste com outros estados, ou atualize a página e tente novamente.',
          })
        })
      },
      async cadastrarCliente() {
        this.clientes = []
        this.clientes.push({
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
        })
        await fetch('http://localhost:3000/clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.clientes)
        })
        .then(
          Swal.fire({
            icon: 'success',
            title: 'Cadastrado',
            text: 'Cliente cadastrado com sucesso!',
          })
        )
        this.clear()
      }
    },
    created() {
      // this.buscarEstados()
    }
  }
</script>
