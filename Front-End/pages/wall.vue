<template>
  <v-container fluid style="max-width:900px">
    <v-card class="pa-6">
      
      <v-row align="center">
        <v-col cols="12" align="center">
          <filter-wall v-on:emitFilterChange="changeFilter"/>
        </v-col>
        <v-col cols="12" align="center">
          <orderWall v-on:emitOrderBy="changeOrder"/>
        </v-col>
      </v-row>
    </v-card>
    <publish-wall v-for="post in filterPublishToDisplay" :key="post.id" v-bind:post="post" />
    <v-btn
      v-if="postsFromStore.length % 10 === 0"
      block
      elevation="5"
      class="mt-5"
      color="primary"
      @click="showMorePost"
      >Voir plus
    </v-btn>

    <v-btn
      v-if="postsFromStore.length % 10 != 0"
      block
      disabled
      elevation="5"
      class="mt-5"
      color="primary"
      style="word-break:break-word"
      >Fin des publications
    </v-btn>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import FilterWall from '../components/filterWall.vue';
import orderWall from '../components/orderWall.vue';
import PublishWall from '../components/publishWall.vue';

export default {
  layout: "home",
  components:{FilterWall,orderWall, PublishWall},
  data: () => ({
    filterBy:[],
    orderBy: undefined,
  }),
  mounted: function() {
    this.$store.dispatch("storePost/getAllUser");
    this.$store.dispatch("storePost/getLastPost");
    this.$store.dispatch("storeLike/getAllLike");
    this.$store.dispatch("storeReply/getAllReply");
    this.$store.dispatch("storeCategory/getAllCategory");
  },
  computed: {
    ...mapState("storePost", {
      postsFromStore: "post",
      allUsersFromStore: "allUsers"
    }),
    ...mapState("storeLike", {
      likeFromStore: "allLike"
    }),
    ...mapState("storeReply", {
      replyFromStore: "allReply"
    }),
    ...mapState("storeConnectedUser", {
      user: "userInfos"
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
              idReply: reply.idReply
            };
          })
        };
      });
    },
    filterPublishToDisplay() {
      if (
        this.postsFromStore &&
        this.allUsersFromStore &&
        this.likeFromStore &&
        this.replyFromStore
      ) {
        //console.log(this.publishToDisplay);
        const order = this.orderBy;
        return this.publishToDisplay
          .filter(
            articles => 
            this.filterBy.length ? 
              this.filterBy.findIndex(
                selectedValue => selectedValue === articles.category
              ) !== -1 : articles
          )
          .sort(function(a, b) {
            if (order === 0) return new Date(b.date) - new Date(a.date);
            else if (order === 1)
              return b.userLiked.length - a.userLiked.length;
            else return new Date(a.date) - new Date(b.date);
          });
      }
    }
  },

  watch: {},
  methods: {
    changeFilter(event){
      this.filterBy = event
    },
    changeOrder(event){
      this.orderBy= event;
    },
    showMorePost() {
      const postCount = this.postsFromStore.length;
      this.$store.dispatch("storePost/getAllPost", postCount);
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
