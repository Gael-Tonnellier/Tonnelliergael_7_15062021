<template>
<div>
  <v-btn-toggle v-on:change="orderChange" v-model="orderBy" mandatory class="flex-wrap ">
    <v-btn class="ma-2">
      <span class="mr-5">Les plus récent</span>
      <v-icon color="primary">mdi-sort-clock-ascending</v-icon>
    </v-btn>
    <v-btn class="ma-2 ">
      <span class="mr-5"> Populaires</span>
      <v-icon color="primary">mdi-fire</v-icon>
    </v-btn>
    <v-btn class="ma-2">
      <span class="mr-5">Les plus ancient</span>
      <v-icon color="primary">mdi-sort-clock-descending</v-icon>
    </v-btn>
  </v-btn-toggle>
  <h1><v-btn block rounded color="primary" class="ma-2 mt-5" to="/post"
    >Poster un message</v-btn
  ></h1>
  </div>
</template>

<script>
export default {
  data:()=>({
    orderBy:"",
  }),
    methods:{
        orderChange(){
            this.$emit('emitOrderBy',this.orderBy);
        }
    }
};
</script>

<style></style>
