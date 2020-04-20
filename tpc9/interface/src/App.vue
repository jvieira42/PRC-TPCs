<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      Cinemateca
    </v-app-bar>
    <v-content>
      <ListaFilmes />
    </v-content>
  </v-app>
</template>

<script>
import ListaFilmes from "./components/ListaFilmes";

export default {
  name: "App",

  components: {
    ListaFilmes
  },

  data: () => ({
    //
  })
};
</script>
