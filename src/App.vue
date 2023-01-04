<template>
  <v-app>
    <v-main>
      <Container/>
      <br/>
      <router-view style="margin-top: 100px;"/>  
    </v-main> 
  </v-app>
    
    
  
</template>
<script>
import Container from "./components/Container.vue" 
export default {
  name: 'App',
  components: {
    Container,
  },
  data: () => ({
    //
  }),
};
</script>



