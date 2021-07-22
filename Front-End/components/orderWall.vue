<template>
<div>
  <v-btn-toggle v-model="orderBy" mandatory class="flex-wrap ">
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
  <v-btn block rounded color="secondary" class="ma-2 mt-5" to="/post"
    >Poster un message</v-btn
  >
  </div>
</template>

<script>
export default {
  props: ["orderBy"],
  data:()=>({
  })
};
</script>

<style></style>
