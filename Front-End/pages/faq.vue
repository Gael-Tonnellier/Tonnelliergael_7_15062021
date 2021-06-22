<template>
  <v-card class="pa-6">
    <v-row class="d-flex justify-center ma-5"
      ><v-icon class="" color="secondary" size="160px"
        >mdi-help-circle</v-icon
      >
    </v-row>

    <h1 class="text-center">La foire aux questions !</h1>
    <p class="subtitle-1 text-center mt-15">
      Vous voulez poster un message mais vous ne savez pas comment faire ? Vous
      cherchez à modifier vos informations mais vous ne trouvez pas la page en
      question ?
      <strong>Vous avez besoins de réponse ? </strong> Vous êtes au bon endroit
      ! Dans cette rubrique vous trouverez les réponses à toute vos questions,
      pour celà vous n'avez qu'à taper quelques mots clé dans cette barre de
      recherche et le moteur de recherche vous affichera les réponses les plus
      pertinente.
      <br />
    </p>
    <p class=" subtitle-2 text-center mt-5">
      <strong>Vous débarquez sur l'application groupomania ?</strong> Nous vous
      conseillons de lire les questions relatives à chaque menu ("le mur", "mon
      compte" ... ) pour rapidement prendre vos repères.
    </p>

    <v-divider></v-divider>

    <v-card color="secondary" dark>
      <v-card-title class="text-h5 primary">
        Boite à questions
      </v-card-title>
      <v-card-text class="mt-10">
        Tapez dans la barre de recherche ci-dessous les mots-clés concernant
        votre question !
      </v-card-text>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          item-text="Question"
          label="Votre question ici !"
          placeholder="Tapez votre recherche"
          prepend-icon="mdi-comment-search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model" class="primary">
          <v-list-item v-for="(field, i) in fields" :key="i">
            <v-list-item-content>
              <v-list-item-title
                class="text-wrap"
                v-text="field.value"
              ></v-list-item-title>
              <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!model" color="primary" @click="model = null">
          Fermer
          <v-icon right>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
export default {
  layout: "home",
  data: () => ({
    questionLimit: 150,
    entries: [
      {
        Question: "Qu'est ce que le mur ?",
        Réponse:
          "Le mur est l'endroit où vos collègues partage des images et des GIFs, libre à vous de partager sur ce mur du contenu qui vous plait !\ "
      },
      {
        Question: "Gérer mon compte  ?",
        Réponse:
          "Pour gérer votre compte c'est très simple, ouvrez le menu déroulant en haut à gauche de l'écran et cliquez sur 'mon compte' !\ "
      },
      {
        Question: "Supprimer mon compte ?",
        Réponse:
          "Lorsque que vous êtes sur la page de gestion de votre compte, cliquez sur le bouton 'SUPPRIMER LE COMPTE' en bas de l'écran. ATTENTION !\ supprimer son compte est irréversible, vous perdrez toute vos données !\ "
      },
      {
        Question: "Modifier mon compte / mes informations ?",
        Réponse:
          "Lorsque vous êtes sur la page de gestion de votre compte, changez les informations que vous souhaitez modifier puis cliquez sur le bouton 'MODIFIER' en bas de l'écran . ATTENTION !\ Il vous sera nécessaire de rattaper un mot de passe"
      },
      {
        Question: " Modifier mon avatar ?",
        Réponse:
          "Lorsque vous êtes sur la page de gestion de votre compte, changez votre avatar puis cliquez sur le bouton 'MODIFIER' en bas de l'écran . ATTENTION !\ Il vous sera nécessaire de rattaper un mot de passe"
      },
      {
        Question: "Modifier mon nom ?",
        Réponse:
          "Lorsque vous êtes sur la page de gestion de votre compte, changez votre nom puis cliquez sur le bouton 'MODIFIER' en bas de l'écran . ATTENTION !\ Il vous sera nécessaire de rattaper un mot de passe"
      },
      {
        Question: "Modifier mon adresse e-mail / email",
        Réponse:
          "Lorsque vous êtes sur la page de gestion de votre compte, changez votre adresse e-mail puis cliquez sur le bouton 'MODIFIER' en bas de l'écran . ATTENTION !\ Il vous sera nécessaire de rattaper un mot de passe"
      },
      {
        Question: "Modifier mon pseudo ?",
        Réponse:
          "Lorsque vous êtes sur la page de gestion de votre compte, changez votre pseudo puis cliquez sur le bouton 'MODIFIER' en bas de l'écran . ATTENTION !\ Il vous sera nécessaire de rattaper un mot de passe"
      },
      {
        Question: "Modifier mon mot de passe  ?",
        Réponse:
          "Lorsque vous êtes sur la page de gestion de votre compte, changez votre mot de passe puis cliquez sur le bouton 'MODIFIER' en bas de l'écran ."
      },
      {
        Question: "Poster un message sur le mur ?",
        Réponse:
          "Lorsque vous êtes sur le mur, cliquez sur le bouton 'NOUVEAU MESSAGE' en haut à droite de l'écran puis suivez les instructions "
      },
      {
        Question: "Poster un commentaire sur le mur ?",
        Réponse:
          "Lorsque vous êtes sur le mur et que vous avec trouver un message à commenter, renseignez simplement votre message dans la zone de texte situé sous le message"
      },
      {
        Question: "Se déconnecter ?",
        Réponse:
          "Depuis n'importe quel page, déroulez le menu à l'aide du bouton en haut à gauche de l'écran. Maintenant vous pouvez voir un bouton en bas à gauche de l'écran 'SE DECONNECTER', il vous suffit de cliquez sur ce bouton "
      },
      {
        Question: "Créer un compte ?",
        Réponse:
          "Si vous pouvez lire ce message, vous avez déjà créer un compte. Sinon il vous suffit de vous déconnecter et sur la page de connection cliquez sur 'DEJA UN COMPTE ?' puis suivez les instructions "
      },
      {
        Question: "Supprimer un message sur le mur ?",
        Réponse:
          "Si vous êtes les créateur du message vous pouvez supprimer votre message en cliquant sur 'SUPPRIMER MON MESSAGE'. ATTENTION !\ Cela supprimera aussi les commentaires des autres utilisateurs. "
      },
      {
        Question: "Supprimer un commentaire sur le mur ?",
        Réponse:
          "Si vous êtes les créateur du commentaire vous pouvez le supprimer en cliquant sur la petite croix rouge à droite de votre commentaire."
      }
    ],
    isLoading: false,
    model: null,
    search: null
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries.map(entry => {
        const Question =
          entry.Question.length > this.questionLimit
            ? entry.Question.slice(0, this.questionLimit) + "..."
            : entry.Question;

        return Object.assign({}, entry, { Question });
      });
    }
  }
};
</script>

<style></style>
