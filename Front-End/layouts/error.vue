<template>
  <v-app dark>
    <v-card>
      <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/account">
      Retourner sur la page Principale
    </NuxtLink>
    </v-card>
    
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Erreur 404',
      otherError: 'Oups on dirait que vous vous êtes perdu !'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
