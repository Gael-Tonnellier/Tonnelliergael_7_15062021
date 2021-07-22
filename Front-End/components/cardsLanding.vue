<template>
  <v-col class=" ma-5 d-flex justify-center background rounded-lg elevation-1">
    <v-col class="d-flex flex-column justify-center">
      <p class="text-center">
        {{ description }}
      </p>
      <v-icon class="mt-auto" color="secondary" size="160px"
        >{{ icon }}</v-icon
      >
      <v-btn :to="link" nuxt class="primary"> {{ title }} </v-btn>
    </v-col>
  </v-col>
</template>

<script>
export default {
    props:['description', 'title', 'icon','link']
};
</script>

<style></style>
