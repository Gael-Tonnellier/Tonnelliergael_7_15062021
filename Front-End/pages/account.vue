<template>
<v-container class="mt-10" fluid >
    <v-card class="ma-auto pa-5" width="80%">
       <form-login/> 
    </v-card>
    
</v-container>
  
</template>

<script>
import form_login from '~/components/form_login.vue'
export default {
  layout:"home",
  components: { form_login },

}
</script>

<style>

</style>