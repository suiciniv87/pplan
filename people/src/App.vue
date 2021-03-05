<template>
  <div id="app">
    <div>
      <v-toolbar
        dark
      >
        <v-toolbar-title>Loja da Alegria</v-toolbar-title>

        <v-spacer></v-spacer>

        <span>Meu Repositório (GitHub)</span>
        <v-btn @click.prevent="meurepo()" icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
    <div id="nav">
      <router-link to="/cadastro">Cadastro</router-link> |
      <router-link to="/clientes">Ver Clientes</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    meurepo() {
      window.open('https://github.com/suiciniv87', '_blank')
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: teal;
    }
  }
}
</style>
