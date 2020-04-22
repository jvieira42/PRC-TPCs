<template>
  <ConsultaFilme :idFilme="this.$route.params.idFilme" />
</template>

<script>
// @ is an alias to /src
import ConsultaFilme from '@/components/ConsultaFilme.vue'

export default {
  name: 'Consulta de um filme',
  components: {
    ConsultaFilme
  }
}
</script>
