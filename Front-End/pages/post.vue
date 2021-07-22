<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1">
      Votre image
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-img :src="file" max-width="30%" min-width="200px" contain></v-img>
      <v-file-input
        :rules="rules"
        type="file"
        accept="image/png, image/jpeg, image/bmp, image/gif"
        placeholder="Upload ton image !"
        prepend-icon="mdi-camera"
        label="Taille maximum : 6 MB"
        v-model="upload"
        @change="previewImage"
      ></v-file-input>
      <v-btn color="primary" :disabled="file == null" @click="e6 = 2">
        Continue
      </v-btn>
      <v-btn text to="/wall" nuxt style="width :fit-content">
        Retourner sur le mur
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2">
      Choisissez un titre
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-text-field
        :counter="50"
        v-model="title"
        label="Votre titre "
      ></v-text-field>
      <v-btn
        color="primary"
        :disabled="title.length < 1 || title.length > 50"
        @click="e6 = 3"
      >
        Continuer
      </v-btn>
      <v-btn text @click="e6 = 1">
        Revenir en arrière
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      Ecrivez une description pour votre image
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-textarea
        :counter="200"
        v-model="description"
        label="Votre description (facultatif) "
      ></v-textarea>
      <v-btn
        color="primary"
        :disabled="description.length > 200"
        @click="e6 = 4"
      >
        Continuer
      </v-btn>
      <v-btn text @click="e6 = 2">
        Revenir en arrière
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 4" step="4">
      Choisissez une catégorie
    </v-stepper-step>

    <v-stepper-content step="4">
      <v-select
        v-model="category"
        :items="categoryFromStore"
        item-text="name"
        item-value="idCategory"
        :menu-props="{ top: true, offsetY: true }"
        label="Catégorie"
        outlined
        class="mt-5"
      ></v-select>
      <v-btn color="primary" :disabled="category == null">
        Continuer
      </v-btn>
      <v-btn text @click="e6 = 1">
        Revenir en arrière
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="5">
      Validation de votre publication
    </v-stepper-step>
    <v-stepper-content step="5">
      <v-img :src="file" max-width="30%" min-width="200px" contain></v-img>
      <p>Votre titre : {{ this.title }}</p>
      <p>Votre description : {{ this.description }}</p>
      <p>Votre catégorie : {{ this.categoryName }}</p>
      <v-btn color="primary" v-if="this.mode === 'create'" @click="createMessage">
        Créer la publication
      </v-btn>
      <v-btn color="primary" v-else-if="this.mode === 'update'" @click="updateMessage(postToUpdate.idPost)">
        Mettre la publication à jour
      </v-btn>
      <v-btn text @click="e6 = 1">
        Revenir en arrière
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "home",
  data: () => ({
    mode :'create',
    rules: [
      value =>
        !value ||
        value.size < 6000000 ||
        "Votre image/gif doit faire moins de 6MB"
    ],
    e6: 1,
    file: null,
    upload: null,
    title: "",
    description: "",
    category: null,
  }),
  computed: {
    ...mapState("storePost", {
      postToUpdate: "postToUpdate"
    }),
    ...mapState("storeCategory",{
      categoryFromStore : "allCategory"
    }),
  },
  mounted: function() {
    
    if (this.postToUpdate) {
      this.file = this.postToUpdate.image,
      this.title = this.postToUpdate.title,
      this.description = this.postToUpdate.description
      this.mode='update';
    }
  },
  methods: {
    previewImage: function() {
      if (this.upload == null) {
        this.upload = null;
        this.file = null;
      } else {
        //console.log(this.upload);
        const reader = new FileReader();
        reader.readAsDataURL(this.upload);
        reader.onload = () => {
          this.file = reader.result;
        };
      }
    },
    createMessage: function() {
      const message = {
        title: this.title,
        description: this.description,
        category: this.category,
        userId: this.$store.state.storeConnectedUser.userInfos.userId,
        image: this.file
      };
      this.$api
        .post("/publish/create", message)
        .then(response => {
          console.log(response);
          this.$router.push("/wall");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateMessage:function(idMessage){
      const message = {
        title: this.title,
        description: this.description,
        category: this.category,
        userId: this.$store.state.storeConnectedUser.userInfos.userId,
        image: this.file,
      };
      this.$api.put("/publish/updatePost/"+idMessage,message)
      .then(response =>{
        console.log(response.data.message);
        this.$router.push('/wall');
      })
      .catch(error=>{
        console.log(error)
      });
    }
  }
};
</script>

<style></style>
