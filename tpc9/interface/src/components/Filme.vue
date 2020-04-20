<template>
  <v-card class="ma-2">
    <v-card-title>Filme</v-card-title>
    <v-card-text>
      <v-data-table :headers="hfilme" :items="filme">
        <template v-slot:no-data>
          <v-alert
            :value="true"
            color="warning"
            icon="warning"
          >Ainda não foi possível apresentar informação do filme.</v-alert>
        </template>

        <template v-slot:items="props">
          <tr @click="rowClicked(props.item)">
            <td>{{ props.item.titulo }}</td>
            <td>{{ props.item.data }}</td>
            <td>{{ props.item.lingua }}</td>
            <td>{{ props.item.duracao }}</td>
            <td>{{ props.item.pop }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
const lhost = require("@/config/global").host;

export default {
  name: "Filme",
  props: ["idFilme"],

  data: () => ({
    filme: {},
    hgeneros: [
            {
                text: "Géneros",
                sortable: true,
                value: "genero",
                class: "subtitle-1",
            },
        ],
    generos: [],
    hatores: [
            {
                text: "Atores",
                sortable: true,
                value: "atores",
                class: "subtitle-1",
            },
        ],
    atores: [],
    hpersonagens: [
            {
                text: "Personagens",
                sortable: true,
                value: "personagem",
                class: "subtitle-1",
            },
        ],
    personagens: []
    
  }),

  created: async function() {
    try {
      let res = await axios.get(`${lhost}/filmes/${this.idFilme}`);
      this.filme = res.data.info;
      this.generos = res.data.generos.map((g) => {
                return { genero: g.gnome };
            });
      this.atores = res.data.atores.map((a) => {
                return { ator: a.anome };
            });
      this.personagens = res.data.personagens.map((p) => {
                return { personagem: p.pnome };
            });
    } catch (e) {
      return e;
    }
  }
};
</script>
