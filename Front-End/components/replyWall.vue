<template>
  <v-row>
      <v-col cols="3" sm="1" align-self="start">
            <v-avatar size="50"
              ><img
                v-if="oneReply.user.avatar"
                style="object-fit : cover"
                :src="oneReply.user.avatar"
                alt=""/><img
                v-else
                style="object-fit : cover"
                src="../assets/avatar.png"
                alt=""
            /></v-avatar>
          </v-col>
          <v-col
            v-if="editReply != oneReply.idReply"
            cols="9"
            sm="11"
            align-self="center"
            class="d-flex"
          >
            <div>
              <h3>{{ oneReply.user.pseudo }}</h3>
              <p
                v-if="oneReply.user.idUsers === user.userId"
                class="grey lighten-2 rounded mb-0 pa-3 flex-wrap"
                style="width:100%;word-break:break-word;border:dashed #93441A!important"
              >
                {{ oneReply.content }}
              </p>
              <p
                v-else
                class="grey lighten-2 rounded mb-0 pa-3 flex-wrap"
                style="width:100%;word-break:break-word"
              >
                {{ oneReply.content }}
              </p>
              <p class="text-caption">{{ date(oneReply.create) }}</p>
            </div>

            <v-btn
              icon
              color="primary"
              v-if="oneReply.user.idUsers == user.userId || user.admin == true"
              @click="
                (editReply = oneReply.idReply) && (reply = oneReply.content)
              "
              ><v-icon>mdi-lead-pencil </v-icon></v-btn
            >
            <v-btn
              icon
              color="primary"
              v-if="oneReply.user.idUsers == user.userId || user.admin == true"
              @click="deleteReply(oneReply.idReply)"
              ><v-icon>mdi-close-circle </v-icon></v-btn
            >
          </v-col>
          <v-col
            v-else-if="editReply === oneReply.idReply"
            cols="6"
            sm="11"
            align-self="center"
            class="d-flex"
          >
            <v-textarea
              auto-grow
              rows="1"
              solo
              v-model="reply"
              :append-outer-icon="'mdi-send + mdi-close-circle'"
              clear-icon="mdi-close-circle"
              clearable
              type="text"
              @click:append-outer="updateReply(oneReply.idReply)"
              @click:clear="editReply = ''"
            ></v-textarea>
          </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
    props:['oneReply'],
    data:()=>({
        editReply: "",
        reply: "",
    }),
    computed:{
        ...mapState("storeConnectedUser", {
      user: "userInfos"
    })
    },
    methods:{
        date: function(value) {
      moment.locale("fr");
      return moment(value).calendar();
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
}
</script>

<style>

</style>