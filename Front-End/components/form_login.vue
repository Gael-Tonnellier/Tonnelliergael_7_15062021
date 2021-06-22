<template>
  <form>
    <v-card-title v-if="mode == 'update'">
      Mettez à jour vos informations !</v-card-title
    >
    <v-card-title v-if="mode == 'create'"> Créez votre compte !</v-card-title>
    <v-card-title v-if="mode == 'login'"> Connectez-vous !</v-card-title>
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
      <v-avatar class="mr-5" size="100" color="primary">
        <img src="../assets/icon.png" v-if="file == null" alt="Avatar" />
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
    ></v-text-field>
    <v-text-field
      v-model="passwordCheck"
      :error-messages="checkErrors"
      label="Retapez votre mot de passe"
      type="password"
      @input="$v.passwordCheck.$touch()"
      @blur="$v.passwordCheck.$touch()"
      v-if="mode == 'create' || mode == 'update'"
    ></v-text-field>
    <v-row>
      <v-btn class="mr-4 mt-10 primary" v-if="mode == 'login'" @click="login"
        >Se connecter</v-btn
      >
      <v-btn
        class="mr-4 mt-10 primary"
        v-else-if="mode == 'create'"
        @click="createAccount"
        >S'inscrire</v-btn
      >
      <v-btn
        class="mr-4 mt-10 secondary"
        v-if="mode == 'login'"
        @click="switchToCreate"
        >Créer un compte</v-btn
      >
      <v-btn
        class="mr-4 mt-10 secondary"
        v-else-if="mode == 'create'"
        @click="switchToLogin"
        >Déjà un compte ?</v-btn
      >
      <v-btn
        class="mr-4 mt-10 primary"
        v-else-if="mode == 'update'"
        @click="login"
        >Modifier</v-btn
      >
      <v-btn
        class="mr-4 mt-10 secondary"
        v-if="mode == 'update'"
        @click="goToHome"
        >Accueil</v-btn
      >
      <v-btn
        class="mr-4 mt-10 warning"
        v-if="mode == 'update'"
        @click="confirmDelete"
        >Supprimer le compte</v-btn
      >
      <v-alert
        class="mt-10"
        type="warning"
        v-if="mode == 'login' && status == 'error_login'"
      >
        Adresse mail et/ou mot de passe invalide !
      </v-alert>
      <v-alert class="mt-10" type="warning" v-if="status == 'error_create'">
        Adresse mail et/ou pseudo déjà utilisé !</v-alert
      >
      <v-alert class="mt-10" type="warning" v-if="error == 'form_not_complete'">
        Merci de compléter le formulaire</v-alert
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
    error: "",
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!"
    ],
    mode: "login",
    pseudo: "",
    email: "",
    description: "",
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
      //this.layout= 'home';
      this.mode = "update";
      this.email = this.$store.state.userInfos.email;
      this.pseudo = this.$store.state.userInfos.pseudo;
      this.description = this.$store.state.userInfos.description;
      this.file = this.$store.state.userInfos.image;
      return;
    }
  },

  methods: {
    goToHome: function() {
      this.$router.push("/accueil");
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
    switchToCreate: function() {
      this.mode = "create";
    },
    switchToLogin: function() {
      this.mode = "login";
    },

    confirmDelete: function() {
      const resultat = window.confirm(
        "Etes vous sûr de vouloir supprimer votre compte ? Il ne sera pas possible de le récupérer"
      );
      if (resultat) {
        const self = this;
        this.$store
          .dispatch("deleteUser", this.$store.state.user.userId)
          .then(function(response) {
            localStorage.removeItem("user");
            window.location.reload();
            console.log(response);
          }),
          function(error) {
            console.log(error);
          };
      } else {
        console.log("compte pas supprimé");
      }
    },

    createAccount: function() {
      this.$v.$touch();
      if (
        this.$v.email.$invalid &&
        this.$v.password.$invalid &&
        this.$v.pseud.$invalid &&
        this.$v.passwordCheck.$invalid
      ) {
        return (this.error = "form_not_complete");
      } else {
        this.$store
          .dispatch("createAccount", {
            email: this.email,
            pseudo: this.pseudo,
            password: this.password,
            description: this.description,
            image: this.file
          })
          .then(response => {
            this.login();
            console.log(response);
          }),
          function(error) {
            console.log(error);
          };
      }
    },

    login: function() {
      this.$v.$touch();
      if (this.$v.email.$invalid && this.$v.password.$invalid) {
        return (this.error = "form_not_complete");
      } else {
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            this.$router.push("/accueil");
            console.log(response);
          }),
          function(error) {
            console.log(error);
          };
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
