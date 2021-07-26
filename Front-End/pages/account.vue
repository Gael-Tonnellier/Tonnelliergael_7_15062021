<template>
<v-container class="mt-10" fluid >
    <v-card class="ma-auto pa-5" width="90%">
       <formAccount/> 
    </v-card>
    
</v-container>
  
</template>

<script>
import formAccount from '~/components/formAccount.vue'
export default {
  layout:"home",
  components: { formAccount },

}
</script>

<style>

</style>