<template>
    <v-form v-model="valid">
      <v-container>
        <v-row class="pa-2 d-flex justify-center">
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        
        <v-row class="pa-2 d-flex justify-center">
            <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        
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
        
        <v-row class="pa-2 d-flex justify-center">
            <v-col cols="12"
                md="6">
            <v-text-field 
                label="Confirm Password" 
                v-model="confirmPassword" 
                :rules="[confirmPasswordRules,passwordConfirmationRule]"
                type="password" 
                required
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="pa-2 d-flex justify-center">
            <v-card-actions >
                <v-btn :disabled=!valid @click="initUser()" color="grey">To-connect</v-btn>
            </v-card-actions>
        </v-row>

      </v-container>
    </v-form>
  </template>
  
  <script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
    export default {
      data: () => ({
        valid: false,
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        nameRules: [
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            v => !!v || "Password is required",
            v => v.length >= 8 || 'The password must contain at least 8 characters',
        ],
        confirmPasswordRules: [
            v => !!v || "Password is required"
        ],
      }),
    computed: {
        passwordConfirmationRule() {
            return () => (this.password === this.confirmPassword) || 'Password must match'
        },
    },
    methods:{
      async initUser(){
        const article = {
            "firstName":this.firstname,
            "lastName":this.lastname,
            "email":this.email,
            "password":this.password
        };
        try {
            const response = await axios.post("http://localhost:9001/users", article);
            await Swal.fire({
            title: `${this.firstname}! successfully registered`,
            text: 'Click "OK" to connect',
            icon: 'success',
            confirmButtonText: 'OK'
            })
            this.$router.push('/')
        } catch (err) {
            Swal.fire({
            title: 'Error!',
            text: 'oops.. There is an error',
            icon: 'error',
            confirmButtonText: 'OK'
            })
        }
      }
    }

    }
  </script>