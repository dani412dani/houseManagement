<template>
   <v-form v-model="valid">
     <v-container>
      <v-row class="pa-2 d-flex justify-center">
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
        </v-row>

      <v-row class="pa-2 d-flex justify-center">
          <v-col cols="12"
            md="6">
          <v-text-field 
            label="Password" 
            v-model="password" 
            :rules="passwordRules" 
            type="password" 
            required
            ></v-text-field>
            </v-col>
        </v-row>

       <v-card-actions class="pa-2 d-flex justify-center">
            <v-btn color="grey" @click="initUser()">Login</v-btn>
            <v-btn color="grey lighten-1" to="/register">register</v-btn>
       </v-card-actions>

     </v-container>
   </v-form>
 </template>
 
 <script>
 import Swal from 'sweetalert2'
 import axios from 'axios'
 import { mapState, mapActions } from 'vuex';
   export default {
     data: () => ({
       valid: false,
       password: "",
       email: "",
       emailRules: [
         v => !!v || 'E-mail is required',
         v => /.+@.+/.test(v) || 'E-mail must be valid',
       ],
       passwordRules: [
            v => !!v || "Password is required",
            v => v.length >= 8 || 'The password must contain at least 8 characters',
        ],
     }),
     methods:{
      async initUser(){
        try {
            const response = await axios.get(`http://localhost:9001/users/login`, {
               params: {
                  "email":this.email,
                  "password":this.password
               }
            });
            await Swal.fire({
            title: `success`,
            text: `${response.data.firstName}, welcome!`,
            icon: 'success',
            confirmButtonText: 'OK'
            })
            const userProperteis = {
              "id": response.data.id,
              "firstName": response.data.firstName,
              "lastName": response.data.lastName
            }
            localStorage.setItem('user', JSON.stringify(userProperteis))
            this.$router.push('/home')
        } catch (err) {
            Swal.fire({
            title: 'Error!',
            text: `oops.. There is an error -->${err}`,
            icon: 'error',
            confirmButtonText: 'OK'
            })
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