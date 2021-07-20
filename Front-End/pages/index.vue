<template>
  <v-card class=" mt-15 ma-auto pa-5" width="80%">
    <form>
      <v-card-title> Connectez-vous !</v-card-title>
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="Mot de passe"
        type="password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-row>
        <v-btn class="mr-4 mt-10 primary" @click="login">Se connecter</v-btn>
        <v-btn class="mr-4 mt-10 secondary " @click="goToCreateAccount">Créer un compte</v-btn>
        <v-alert class="mt-10" type="warning" v-if="status == 'error_login'">
          Adresse mail et/ou mot de passe invalide !
        </v-alert>
        <v-alert
          class="mt-10"
          type="warning"
          v-if="error == 'form_not_complete'"
        >
          Merci de compléter le formulaire</v-alert
        >
      </v-row>
    </form>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapState } from "vuex";
export default {
  mixins: [validationMixin],
  validations: {
    pseudo: { required },
    email: { required, email },
    password: { required }
  },

  data: () => ({
    error: "",
    email: "",
    password: ""
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("L'e-mail est requis.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Le mot de passe est requis.");
      return errors;
    },
    ...mapState(["status"]),
  },
  mounted: function() {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/landing");
    }
  },

  methods: {
    goToCreateAccount(){
      this.$router.push("/account");
    },
    login() {
      this.$v.$touch();
      if (this.$v.email.$invalid || this.$v.password.$invalid) {
        return (this.error = "form_not_complete");
      } else {
        this.$store.dispatch("storeConnectedUser/login", {
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>

<style></style>
