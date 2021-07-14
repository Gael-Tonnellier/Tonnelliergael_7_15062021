<template>
      <v-card class=" pa-4">
        <h1 class="ma-5 text-center">
          Bienvenue sur l'application Groupomania !
        </h1>
        <p class="text-h5 text-center">
          C'est ici que vous retrouverez vos collègues de travail ainsi que tout
          les sujets du moments sous forme de GIF ou d'image ! Allez jetez un
          oeil aux différentes catégories du sites pour en savoir plus !
        </p>
        <v-row class="pa-5">
          <v-col
            class=" ma-5 d-flex justify-center background rounded-lg elevation-1"
          >
            <v-col class="d-flex flex-column justify-center">
              <p class="text-center" >
                Pour modifier votre pseudo, email, description, avatar ou encore
                pour supprimer votre compte c'est par ici !
              </p>
              <v-icon class="mt-auto" color="secondary"  size="160px">mdi-account-box</v-icon>
              <v-btn to="/account" nuxt class="primary">Mon compte</v-btn>
            </v-col>
          </v-col>
          <v-col
            class=" ma-5 d-flex justify-center background rounded-lg elevation-1"
          >
            <v-col class="d-flex flex-column justify-center ">
              <p class="text-center" >
                Envie de savoir comment fonctionne l'application, ou d'en savoir un peu plus sur certaine fonctionnalité du site ? Clique sur le bouton ci-dessous !
              </p>
              <v-icon class="mt-auto" color="secondary"  size="160px" >mdi-help-circle</v-icon>
              <v-btn to="/faq" nuxt class="primary"> aide </v-btn>
            </v-col>
          </v-col>
          <v-col
            v-if="connected===true" class="ma-5 d-flex justify-center background rounded-lg elevation-1"
          >
            <v-col class="d-flex flex-column justify-center">
              <p class="text-center">
                Le mur c'est "The place to be !" ** pour passer un bon moment ! <br/>
                La page où sont affichés  les messages des collègues ! <br/>
                <span class="font-italic font-weight-light">The place to be = l'endroit idéal</span>
              </p>
              <v-icon class="mt-auto" color="secondary"  size="160px" >mdi-wall</v-icon>
              <v-btn to="/wall" nuxt class="primary">le mur</v-btn>
            </v-col>
          </v-col>
        </v-row>
      </v-card>
</template>

<script>
export default {
  layout: "home",
  data: ()=>({
      connected: false,
  }),
  mounted: function(){
    this.$store.state.user.userId === -1 ? this.connected = false : this.connected = true
  }
};
</script>

<style></style>
