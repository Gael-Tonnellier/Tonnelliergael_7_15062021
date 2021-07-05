<template>
  <v-app id="home">
    <v-app-bar
      src="https://picsum.photos/1920/1080?random"
      color="#93441A"
      prominent
      app
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(182,115,50,.7), rgba(147,68,26,.9)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon
        color="white"
        class="button"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <img class="font" src="../assets/groupomania.png" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="background" class="pa-5 d-flex flex-column align-center">
        <v-avatar class="mb-5" color="primary" size="120"
          ><img style="object-fit : cover" :src="user.avatar" alt=""
        /></v-avatar>
        <div class="mb-5">{{ user.pseudo }}</div>
        <div class="font-italic">"{{ user.description }}"</div>
      </v-sheet>
      <v-divider></v-divider>

      <v-list nav>
        <v-list-item-group color="primary">
          <v-list-item to="/accueil" nuxt class="d-flex">
            <v-icon>mdi-home</v-icon>
            <v-list-item-title class="ml-15"> Accueil</v-list-item-title>
          </v-list-item>
          <v-list-item to="/wall" nuxt class="d-flex">
            <v-icon>mdi-wall</v-icon>
            <v-list-item-title class="ml-15"> Le Mur</v-list-item-title>
          </v-list-item>
          <v-list-item to="/faq" nuxt class="d-flex">
            <v-icon>mdi-help-circle</v-icon>
            <v-list-item-title class="ml-15"> F.A.Q.</v-list-item-title>
          </v-list-item>
          <v-list-item to="/account" nuxt class="d-flex">
            <v-icon>mdi-account-box</v-icon>
            <v-list-item-title class="ml-15"> Mon Compte</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 pb-5">
          <v-btn block class="primary" @click="logout">
            Se déconnecter
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-app class=" background ">
        <Nuxt />
      </v-app>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    drawer: true
  }),
  mounted: function() {
    if (
      this.$store.state.user.userId == -1 ||
      this.$store.state.status == "error_login"
    ) {
      localStorage.removeItem("user");
      this.$router.push("/account");
      return;
    }
    this.$store.dispatch("getUserInfo", this.$store.state.user);
    this.$store.dispatch("storeWall/getAllUser");
    this.$store.dispatch("storeWall/getAllPost");
    this.$store.dispatch("storeWall/getAllLike");
    this.$store.dispatch("storeWall/getAllReply");
  },
  computed: {
    ...mapState({
      user: "userInfos"
    }),
  },
  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/account");
    }
  }
};
</script>

<style lang="scss">
.font {
  width: 500px;
  min-width: 200px;
  margin-left: auto;
  align-self: center;
}
.button {
  align-self: center;
}
a {
  text-decoration: none;
  width: 100%;
}
</style>
