<template>
  <v-container class="pa-3">
    <v-card class="pa-6">
      <v-row align="center">
        <v-col cols="12">
          <v-select
            v-model="value"
            :items="items"
            chips
            :menu-props="{ top: true, offsetY: true }"
            label="Catégorie"
            multiple
            outlined
          ></v-select>
          <v-btn-toggle v-model="filter_by" mandatory class="flex-wrap ">
            <v-btn class="ma-2 ">
              <span class="mr-5">Les plus populaires</span>
              <v-icon color="primary">mdi-fire</v-icon>
            </v-btn>
            <v-btn class="ma-2">
              <span class="mr-5">Les plus récent</span>
              <v-icon color="primary">mdi-sort-clock-ascending</v-icon>
            </v-btn>
            <v-btn class="ma-2">
              <span class="mr-5">Les plus ancient</span>
              <v-icon color="primary">mdi-sort-clock-descending</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-btn block rounded color="secondary" class="ma-2 mt-5" to="/post"
            >Poster un message</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-10 pa-2" v-for="post in publishToDisplay" :key="post.id">
      <v-row class="ma-5">
        <v-card-title class="pa-0" style="word-break:break-word">{{
          post.title
        }}</v-card-title>
        <div class="ml-auto d-flex">
          <p class="align-self-center mb-0">{{ post.authorId.pseudo }}</p>
          <v-avatar class="ml-2" color="primary" size="60"
            ><img
              style="object-fit : cover"
              :src="post.authorId.avatar"
              :alt="'avatar de ' + post.authorId.pseudo"
          /></v-avatar>
        </div>
      </v-row>
      <v-divider></v-divider>
      <v-card-text class=" text-subtitle-1 mt-5 mb-5">{{
        post.description
      }}</v-card-text>
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
      <div class="d-flex">
        <p>Posté {{ date(post.date) }}</p>
        <div class="ml-auto">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <p
                v-bind="attrs"
                v-on="on"
                class=" primary rounded px-5 text-caption ml-auto white--text"
              >
                {{ post.userLiked.length }} personnes aime cette publication
              </p>
            </template>
            <v-list-item-content v-if="post.userLiked < 1 ">Soyez le premier à mettre un "J'aime"</v-list-item-content>
            <v-list-item-content  v-for="user in post.userLiked" :key="user.pseudo">
              {{ user.user.pseudo }}
            </v-list-item-content>
          </v-tooltip>
        </div>

        <p
          @click="show = post.idPost"
          class="text-caption text-decoration-underline ml-5"
          style="cursor:pointer"
        >
          {{ post.reply.length }} commentaires
        </p>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="primary" v-if="userlike == true">
          <v-icon class="mr-2">mdi-heart</v-icon> J'aime</v-btn
        >
        <v-btn v-else> <v-icon class="mr-2">mdi-heart</v-icon> J'aime</v-btn>
        <v-btn v-if="show != post.idPost" @click="show = post.idPost">
          Commenter
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        <v-btn v-if="show == post.idPost" @click="show = null">
          Commenter
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>

      <v-expand-transition>
        <div v-if="show == post.idPost">
          <v-row justify="center" class=" mt-5">
            <v-col cols="3" sm="1">
              <v-avatar class="ml-5 mt-2" color="primary" size="50"
                ><img style="object-fit : cover" :src="user.avatar" alt=""
              /></v-avatar>
            </v-col>
            <v-col cols="9" sm="11">
              <v-text-field
                v-model="message"
                :append-outer-icon="'mdi-send'"
                clear-icon="mdi-close-circle"
                clearable
                label="Message"
                type="text"
                @click:append-outer="sendMessage"
                @click:clear="clearMessage"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-for="oneReply in post.reply" :key="oneReply.create">
            <v-col cols="3" sm="1">
              <v-avatar class="ml-5 mt-2" color="primary" size="50"
                ><img
                  style="object-fit : cover"
                  :src="oneReply.user.avatar"
                  alt=""
              /></v-avatar>
            </v-col>
            <v-col cols="9" sm="11">
              <p>{{ oneReply.content }}</p>
            </v-col>
          </v-row>
        </div>
        <div v-if="show != post.idPost">
          <p>Dernier message</p>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  layout: "home",
  data: () => ({
    showLike: false,
    userlike: false,
    show: null,
    items: ["Sport", "Politique", "Travail"],
    value: ["Sport", "Politique", "Travail"],
    filter_by: undefined,
    message: ""
  }),

  computed: {
    ...mapState('storeWall',{
      postsFromStore:'post',
      allUsersFromStore: "allUsers",
      user: "userInfos",
      likeFromStore: "allLike",
      replyFromStore: "allReply"
    }),
    
    publishToDisplay() {
      return this.postsFromStore.map(post => {
        let userLiked = this.likeFromStore.filter(
          like => like.messageLike == post.idMessage
        );
        let reply = this.replyFromStore.filter(
          reply => reply.replyMessage == post.idMessage
        );
        return {
          idPost: post.idMessage,
          authorId: this.allUsersFromStore.find(
            user => user.idUsers == post.authorId
          ),
          title: post.title,
          description: post.description,
          category: post.categoryName,
          image: post.image,
          date: post.date,
          userLiked: userLiked.map(like => {
            return {
              user: this.allUsersFromStore.find(
                user => user.idUsers == like.userLike
              )
            };
          }),
          reply: reply.map(reply => {
            return {
              user: this.allUsersFromStore.find(
                user => user.idUsers == reply.replyUser
              ),
              content: reply.replyContent,
              create: reply.replyCreate,
              update: reply.replyUpdate
            };
          })
        };
      });
    }
  },

  watch: {},
  methods: {
    date: function(value) {
      moment.locale("fr");
      return moment(value).calendar();
    },
    sendMessage() {
      console.log(this.message);
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    }
  }
};
</script>

<style>
button {
  border-left-width: 1px !important;
}
.userLike {
  display: flex;
}
</style>
