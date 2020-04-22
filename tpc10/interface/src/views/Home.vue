<template>
  <v-card class="ma-2">
    <v-card-title class="indigo darken-4 white--text" dark>
      Cinemateca de PRC2020
    </v-card-title>
    <v-card-actions>
      <v-btn block color="blue darken-1" @click="listarFilmes()" dark>Lista de Filmes</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn block color="blue darken-1" @click="listarAtores()" dark>Lista de Atores</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    listarFilmes: function(){
      this.$router.push("/filmes")
    },
    listarAtores: function(){
      this.$router.push("/atores")
    }
  }
}

</script>
