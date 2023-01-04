
<template>
    <v-card
      style="margin: 8vh"
      class="mx-auto"
      min-width="400"
      min-height="300px"
      @click="addApertment()"
    >
        <v-img
            class="white--text align-end"
            max-height="300px"
            width="400px"
            src="../../public/images/plus.jpg">
        </v-img>

        <v-card-text class="text--primary" style="text-align: center; font-size: xx-large;">Add New Apertment</v-card-text>
    </v-card>

</template>
  
<script>
  export default {
    data: () => ({
        city: '',
    }),
    methods: {
      addApertment(){
        this.$router.push('/enterHome')
      },
    },
  };
</script>


