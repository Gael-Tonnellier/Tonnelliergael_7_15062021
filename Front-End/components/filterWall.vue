<template>
  <v-btn-toggle v-on:change="filterChange" v-model="filterBy" multiple class="flex-wrap">
    <v-btn
      v-for="category in categoryFromStore"
      :key="category.idCategory"
      :value="category.name"
    >
      <p class="mb-0">{{ category.name }}</p>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import { mapState } from "vuex";
export default {
  data:()=>({
    filterBy:"",
  }),

  computed:{
    ...mapState("storeCategory",{
      categoryFromStore: "allCategory"
    }),
    
  },
  methods:{
    filterChange(){
      this.$emit('emitFilterChange',this.filterBy);
    }
  }
};
</script>

<style></style>
