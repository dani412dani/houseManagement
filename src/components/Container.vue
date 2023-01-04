<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#43a047"
      dark
      shrink-on-scroll
      prominent
      src="../../public/images/imageHeader.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title >House management</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="exitUser()">mdi-logout</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon >mdi-heart</v-icon>
      </v-btn>

      <!-- <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          v-on="on"
        >
        mdi-dots-vertical
        </v-icon>
      </template>
      <span>Tooltip</span>
    </v-tooltip> -->

      <v-btn icon>
        <v-icon >mdi-dots-vertical</v-icon>
      </v-btn>

    </v-app-bar>
    <v-sheet
      
      max-height="125"
    >
      <v-container style="height: 900px;"></v-container>
    </v-sheet>
    
  </v-card>
</template>
<script>
import Swal from 'sweetalert2'
import { mapState, mapActions } from 'vuex';
  export default {
    methods:{
      exitUser(){
        if (this.user) {
          Swal.fire({
          title: 'Are you sure?',
          text: "It was fun until now, are you sure?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: `Yes, i'm bored`
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("user")
            this.loginUser(null)
            this.$router.push('/')
          }
        })
        }
        else{
          localStorage.removeItem("user")
          this.$router.push('/')
        }
      },
      ...mapActions([
         'loginUser',
      ])
    },
    computed: {
      ...mapState([
         'user',
      ])  
    },
  }
</script>