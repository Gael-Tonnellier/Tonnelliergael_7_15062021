<template>
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
        <v-btn block rounded color="secondary" class="ma-2 mt-5" to="/post">Poster un message</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  layout: "home",
  data: () => ({
    items: ["Sport", "Politique", "Travail"],
    value: ["Sport", "Politique", "Travail"],
    filter_by: undefined
  }),
  

};
</script>

<style>
button{
    border-left-width: 1px !important;
}
</style>
