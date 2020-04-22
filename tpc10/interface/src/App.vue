<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <div width="100%" class="ma-4 indigo darken-4 white--text" dark>
        Cinemateca PRC
        {{ new Date().getFullYear() }}
        prc2020@di.uminho.pt
      </div>
    </v-content>
  </v-app>
</template>
