<template>
  <v-card class="mt-5 pa-2">
    <v-row class="ma-5">
      <div class="d-flex flex-column">
        <v-card-title class="pa-0" style="word-break:break-word"
          ><h2>
            {{ post.title }}
          </h2></v-card-title
        >
        <v-card-subtitle class="mt-auto pl-0"
          ># {{ post.category }}</v-card-subtitle
        >
        <v-card-subtitle class=" pl-0"
          >Posté {{ date(post.date) }}</v-card-subtitle
        >
      </div>

      <div class="ml-auto pa-5 d-flex primary rounded-pill elevation-5">
        <p class="align-self-center mb-0 white--text">
          {{ post.authorId.pseudo }}
        </p>
        <v-avatar class="ml-2 align-self-center" color="primary" size="60"
          ><img
            v-if="post.authorId.avatar"
            style="object-fit : cover"
            :src="post.authorId.avatar"
            :alt="'avatar de ' + post.authorId.pseudo"
          />
          <img
            v-else
            style="object-fit : cover"
            src="../assets/avatar.png"
            :alt="'avatar de ' + post.authorId.pseudo"
          />
        </v-avatar>
      </div>
    </v-row>
    <v-divider></v-divider>
    <v-img class="ma-5" contain max-height="700px" :src="post.image"
      ><template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row> </template
    ></v-img>
    <v-divider></v-divider>
    <v-card-text class=" text-body-1 text--primary mt-5 mb-5">{{
      post.description
    }}</v-card-text>
    <div class="d-flex">
      <div class="ml-auto">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip}">
            <v-dialog scrollable max-width="300px">
              <template #activator="{ on:dialog}"
                ><p
                  v-on="{ ...tooltip, ...dialog }"
                  class=" primary rounded px-2 text-caption ml-auto white--text"
                  style="cursor: pointer"
                >
                  <span v-if="post.userLiked.length > 1"
                    >{{ post.userLiked.length }} utilisateurs</span
                  >
                  <span v-if="post.userLiked.length < 1"
                    >Aucun utilisateur n'</span
                  ><span v-if="post.userLiked.length === 1"
                    >{{ post.userLiked.length }} utilisateur</span
                  >
                  aime cette publication
                </p>
              </template>
              <v-card>
                <v-card-title
                  class="primary white--text"
                  style="word-break:break-word"
                  >Utilisateurs qui aiment cette publication</v-card-title
                >
                <v-divider></v-divider>
                <v-list-item
                  v-for="user in post.userLiked"
                  :key="user.pseudo"
                  style="height: 300px;"
                >
                  {{ user.user.pseudo }}
                </v-list-item>
              </v-card>
            </v-dialog>
          </template>
          <v-list-item-content v-if="post.userLiked < 1"
            >Soyez le premier à mettre un "J'aime"</v-list-item-content
          >
          <v-list-item-content>
            <div v-for="user in post.userLiked.slice(0, 3)" :key="user.pseudo">
              {{ user.user.pseudo }}
            </div>
            <span v-if="post.userLiked.length > 3"
              >... {{ post.userLiked.length - 3 }} de plus</span
            >
          </v-list-item-content>
        </v-tooltip>
      </div>

      <p
        @click="show = post.idPost"
        class="text-caption text-decoration-underline ml-5"
        style="cursor:pointer"
      >
        {{ post.reply.length }}
        <span v-if="post.reply.length > 1">commentaires</span>
        <span v-else>commentaire</span>
      </p>
    </div>
    <v-divider></v-divider>
    <v-card-actions class="d-flex flex-wrap">
      <v-btn
        class="primary ma-2"
        v-if="
          post.userLiked.find(userLike => userLike.user.idUsers === user.userId)
        "
        @click="like(post.idPost)"
      >
        <v-icon class="mr-2">mdi-heart</v-icon> J'aime</v-btn
      >
      <v-btn class="ma-2" v-else @click="like(post.idPost)">
        <v-icon class="mr-2">mdi-heart</v-icon> J'aime</v-btn
      >
      <v-btn
        class="ma-2"
        v-if="show != post.idPost"
        @click="show = post.idPost"
      >
        Commenter
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn class="ma-2" v-if="show == post.idPost" @click="show = null">
        Commenter
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn
        class="primary ma-2"
        v-if="post.authorId.idUsers == user.userId || user.admin == true"
        @click="updatePost(post)"
        >Modifier</v-btn
      >
      <v-btn
        class="warning ma-2"
        v-if="post.authorId.idUsers == user.userId || user.admin == true"
        @click="deletePost(post.idPost)"
        >Supprimer</v-btn
      >
    </v-card-actions>
    <v-divider></v-divider>

    <v-expand-transition>
      <div v-if="show == post.idPost">
        <v-row>
          <v-col cols="3" sm="1" align-self="center">
            <v-avatar size="50"
              ><img
                v-if="user.avatar"
                style="object-fit : cover"
                :src="user.avatar"
                alt=""/><img
                v-else
                style="object-fit : cover"
                src="../assets/avatar.png"
                alt=""
            /></v-avatar>
          </v-col>
          <v-col cols="9" sm="11" align-self="center" class="mt-8">
            <v-textarea
              auto-grow
              rows="1"
              solo
              v-model="message"
              :append-outer-icon="'mdi-send'"
              clear-icon="mdi-close-circle"
              clearable
              label="Message"
              type="text"
              @click:append-outer="createReply(post.idPost)"
              @click:clear="clearMessage"
            ></v-textarea>
          </v-col>
        </v-row>
        <reply-wall v-for="oneReply in post.reply" :key="oneReply.create" v-bind:oneReply="oneReply"/>
      </div>
      <div v-if="show != post.idPost" class="mt-2">
        <v-row v-if="post.reply.length">
          <v-col cols="3" sm="1" align-self="start">
            <v-avatar size="50"
              ><img
                v-if="post.reply[0].user.avatar"
                style="object-fit : cover"
                :src="post.reply[0].user.avatar"
                alt=""/><img
                v-else
                style="object-fit : cover"
                src="../assets/avatar.png"
                alt=""
            /></v-avatar>
          </v-col>
          <v-col cols="9" sm="11" align-self="center" class="d-flex">
            <div>
              <h3>{{ post.reply[0].user.pseudo }}</h3>
              <p
                v-if="post.reply[0].user.idUsers === user.userId"
                class="grey lighten-2 rounded mb-0 pa-3 flex-wrap"
                style="width:100%;word-break:break-word;border:dashed #93441A!important"
              >
                {{ post.reply[0].content }}
              </p>
              <p
                v-else
                class="grey lighten-2 rounded mb-0 pa-3 flex-wrap"
                style="width:100%;word-break:break-word"
              >
                {{ post.reply[0].content }}
              </p>
              <p class="text-caption">{{ date(post.reply[0].create) }}</p>
            </div>
          </v-col>
        </v-row>
        <p class="text-subtitle-1" v-if="post.reply.length > 1">
          {{ post.reply.length - 1 }} messages supplémentaires
        </p>
        <p class="text-subtitle-1" v-else>
          Publiez le premier commentaire !
        </p>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import replyWall from './replyWall.vue';
export default {
  components: { replyWall },
  props: ["post"],
  data: () => ({
    editReply: "",
    showLike: false,
    userlike: false,
    show: null,
    message: "",
    reply: "",
    dialog: []
  }),
  computed: {
    ...mapState("storeConnectedUser", {
      user: "userInfos"
    })
  },
  methods: {
    date: function(value) {
      moment.locale("fr");
      return moment(value).calendar();
    },
    clearMessage() {
      this.message = "";
    },
    like(idMessage) {
      const requestLike = {
        idMessage: idMessage,
        userId: this.user.userId
      };
      this.$store.dispatch("storeLike/postLike", requestLike);
    },
    deletePost(idMessage) {
      if (confirm("Êtes vous sur de vouloir supprimer cette publication ? ")) {
        this.$store.dispatch("storePost/deletePost", idMessage);
      }
    },
    updatePost(post) {
      this.$store.commit("storePost/storePostToUpdate", post);
      this.$router.push("/post");
    },
    deleteReply(idReply) {
      this.$store.dispatch("storeReply/deleteReply", idReply);
    },
    createReply(idPost) {
      const reply = {
        userId: this.user.userId,
        content: this.message,
        idMessage: idPost
      };
      this.$store.dispatch("storeReply/createReply", reply);
      this.clearMessage();
    },
    updateReply(idReply) {
      const content = this.reply;
      this.$store.dispatch("storeReply/updateReply", { idReply, content });
      this.editReply = "";
    }
  }
};
</script>

<style></style>
