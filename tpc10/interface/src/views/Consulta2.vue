<template>
  <ConsultaAtor :idAtor="this.$route.params.idAtor" />
</template>

<script>
// @ is an alias to /src
import ConsultaAtor from '@/components/ConsultaAtor.vue'

export default {
  name: 'Consulta de um ator',
  components: {
    ConsultaAtor
  }
}
</script>
