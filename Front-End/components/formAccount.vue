<template>
  <form>
    <v-card-title v-if="mode == 'update'">
      Mettez à jour vos informations !</v-card-title
    >
    <v-card-title v-if="mode == 'create'" style="word-break:break-word"> Créez votre compte !</v-card-title>
    <v-card-subtitle v-if="mode == 'create' || mode == 'update'"
      >Merci de renseigner tout les champs obligatoire</v-card-subtitle
    >
    <v-text-field
      v-model="pseudo"
      :error-messages="pseudoErrors"
      label="Pseudo"
      required
      @input="$v.pseudo.$touch()"
      @blur="$v.pseudo.$touch()"
      v-if="mode == 'create' || mode == 'update'"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      :counter="500"
      v-model="description"
      label="Description ( Facultatif ) "
      v-if="mode == 'create' || mode == 'update'"
    ></v-text-field>
    <v-row
      v-if="mode == 'create' || mode == 'update'"
      class="ma-auto align-center"
    >
      <v-avatar class="mr-5" size="100">
        <img src="../assets/avatar.png" v-if="file == null" alt="Avatar" />
        <img v-else :src="file" />
      </v-avatar>
      <v-file-input
        :rules="rules"
        type="file"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Choisis ton avatar !"
        prepend-icon="mdi-camera"
        label="Avatar (facultatif)"
        v-model="upload"
        @change="previewImage"
      ></v-file-input
    ></v-row>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Mot de passe"
      type="password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      v-if="mode == 'create'"
    ></v-text-field>
    <v-text-field
      v-model="passwordCheck"
      :error-messages="checkErrors"
      label="Retapez votre mot de passe"
      type="password"
      @input="$v.passwordCheck.$touch()"
      @blur="$v.passwordCheck.$touch()"
      v-if="mode == 'create'"
    ></v-text-field>
    <v-row>
      
      <v-btn
        class="mr-4 mt-10 primary"
        v-if="mode == 'create'"
        @click="createAccount"
        >S'inscrire</v-btn
      >
      <v-btn
        class="mr-4 mt-10 secondary"
        v-if="mode == 'create'"
        @click="switchToLogin"
        >Déjà un compte ?</v-btn
      >
      <v-btn class="mr-4 mt-10 primary" v-else-if="mode == 'update'" @click="updateAccount">
        Modifier
        </v-btn>
      <v-btn
        class="mr-4 mt-10 secondary"
        v-if="mode == 'update'"
        @click="goToHome"
        >Accueil</v-btn
      >
      <v-dialog v-model="dialog" persistent max-width="320">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-4 mt-10 warning"
            v-if="mode == 'update'"
            v-bind="attrs"
            v-on="on"
            >Supprimer le compte</v-btn
          >
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Etes vous sûr de vouloir supprimer votre compte ?
          </v-card-title>
          <v-card-text
            >Supprimer votre compte signifie perdre toutes vos données,
            messages, like ... posté. Ces données ne peuvent pas êtres
            récupéré.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="dialog = false">
              Annuler
            </v-btn>
            <v-btn color="warning" @click="confirmDelete()">
              Supprimer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-alert class="mt-10" type="warning" v-if="status == 'error_create'">
        Adresse mail et/ou pseudo déjà utilisé !</v-alert
      >
      <v-alert class="mt-10" type="warning" v-if="error == 'form_not_complete'">
        Merci de compléter le formulaire</v-alert
      >
      <v-alert class="mt-10" type="success" v-if="status == 'data_update'">
        Modifications mis à jour !</v-alert
      >
    </v-row>
  </form>
</template>

<script>
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";

export default {
  layout: "",
  mixins: [validationMixin],

  validations: {
    pseudo: { required, maxLength: maxLength(15) },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    passwordCheck: {
      sameAsPassword: sameAs("password")
    }
  },

  data: () => ({
    dialog: false,
    error: "",
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!"
    ],
    mode: "create",
    pseudo: "",
    email: "",
    description: null,
    file: null,
    upload: null,
    password: "",
    passwordCheck: ""
  }),

  computed: {
    pseudoErrors() {
      const errors = [];
      if (!this.$v.pseudo.$dirty) return errors;
      !this.$v.pseudo.maxLength &&
        errors.push("Le pseudo ne peut pas faire plus de 15 charactères");
      !this.$v.pseudo.required && errors.push("Le pseudo est requis.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Doit être un E-mail valide.");
      !this.$v.email.required && errors.push("L'e-mail est requis.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Le mot de passe doit contenir au moins 8 charactères");
      !this.$v.password.required && errors.push("Le mot de passe est requis.");
      return errors;
    },
    checkErrors() {
      const errors = [];
      !this.$v.passwordCheck.sameAsPassword &&
        errors.push("Le mot de passe doit être identique");
      return errors;
    },
    ...mapState(["status"])
  },

  mounted: function() {
    if (this.$store.state.user.userId != -1) {
      this.mode = "update";
      this.email = this.$store.state.storeConnectedUser.userInfos.email;
      this.pseudo = this.$store.state.storeConnectedUser.userInfos.pseudo;
      this.description = this.$store.state.storeConnectedUser.userInfos.description;
      this.file = this.$store.state.storeConnectedUser.userInfos.avatar;
      return;
    }
  },

  methods: {
    goToHome: function() {
      this.$router.push("/landing");
    },

    previewImage: function() {
      if (this.upload == null) {
        this.upload = null;
        this.file = null;
      } else {
        console.log(this.upload);
        const reader = new FileReader();
        reader.readAsDataURL(this.upload);
        reader.onload = () => {
          this.file = reader.result;
          return console.log(this.file);
        };
      }
    },
    switchToLogin: function() {
      this.$router.push("/");
    },

    confirmDelete: function() {
      this.$store
        .dispatch(
          "storeConnectedUser/deleteUser",
          this.$store.state.user.userId
        )
        .then(response => {
          this.$router.push("/");
          console.log(response);
        }),
        function(error) {
          console.log(error);
        };
    },

    createAccount: function() {
      this.$v.$touch();
      if (
        this.$v.email.$invalid ||
        this.$v.password.$invalid ||
        this.$v.pseudo.$invalid ||
        this.$v.passwordCheck.$invalid
      ) {
        return (this.error = "form_not_complete");
      } else {
        this.$store.dispatch("storeConnectedUser/createAccount", {
          email: this.email,
          pseudo: this.pseudo,
          password: this.password,
          description: this.description,
          image: this.file
        });
      }
    },

    updateAccount:function(){
      this.$v.$touch();
      if (
        this.$v.email.$invalid ||
        this.$v.pseudo.$invalid
      ) {
        return (this.error = "form_not_complete");
      } else {
        this.$store.dispatch("storeConnectedUser/updateUser", {
          email: this.email,
          pseudo: this.pseudo,
          description: this.description,
          image: this.file,
          userId : this.$store.state.storeConnectedUser.userInfos.userId
        });
      }
    }
  }
};
</script>

<style>
img {
  object-fit: cover;
}
</style>
