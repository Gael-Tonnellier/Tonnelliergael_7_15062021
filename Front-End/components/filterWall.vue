<template>
  <v-btn-toggle v-model="filterBy" multiple>
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
export default {
  props: ["filterBy"]
};
</script>

<style></style>
