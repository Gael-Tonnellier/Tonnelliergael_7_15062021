<template>
  <v-card class=" pa-4">
    <h1 class="ma-5 text-center">
      Bienvenue sur l'application Groupomania !
    </h1>
    <p class="text-h5 text-center">
      C'est ici que vous retrouverez vos collègues de travail ainsi que tout les
      sujets du moments sous forme de GIF ou d'image ! Allez jetez un oeil aux
      différentes catégories du sites pour en savoir plus !
    </p>
    <v-row class="pa-5">
      <cardsLanding v-for="card in cards" :key="card.id"
        v-bind:title="card.title" v-bind:description="card.description" v-bind:icon="card.icon" v-bind:link="card.link"
      />
    </v-row>
  </v-card>
</template>

<script>
import cardsLanding from "~/components/cardsLanding.vue";
export default {
  layout: "home",
  components: { cardsLanding },
  data: () => ({
    connected: false,
    cards: [
      {
        description:
          "Pour modifier votre pseudo, email, description, avatar ou encore pour supprimer votre compte c'est par ici !",
        icon: "mdi-account-box",
        title: "Mon compte",
        link:"account"
      },
      {
        description:
          "Envie de savoir comment fonctionne l'application, ou d'en savoir un peu plus sur certaine fonctionnalité du site ? Clique sur le bouton ci-dessous !!",
        icon: "mdi-help-circle",
        title: "aide",
        link:"faq"
      },
      {
        description:
          " Le mur c'est l'endroit où aller  pour passer un bon moment ! La page où sont affichés  les messages des collègues !",
        icon: "mdi-wall",
        title: "le mur",
        link: "wall"
      }
    ]
  }),
  mounted: function() {
    this.connected = this.$store.state.user.userId === -1;
  }
};
</script>

<style></style>
