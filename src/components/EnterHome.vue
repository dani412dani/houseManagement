<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
        <v-container>
            <v-row class="pa-2 d-flex justify-center">
                <v-col
                cols="12"
                md="6"
                >
                <v-select
                    v-model="city"
                    :rules="citysRules"
                    :items="items"
                    label="city"
                    required
                ></v-select>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <v-row class="pa-2 d-flex justify-center">
                <v-col
                cols="12"
                md="6"
                >
                <v-text-field
                v-model="adress"
                :rules="adressRules"
                label="Adress"
                required
            ></v-text-field>
            </v-col>
            </v-row>
        </v-container>
  
        <v-row class="pa-2 d-flex justify-center">
      <v-checkbox
        v-model="private"
        label="is private?"
        required
      ></v-checkbox>
                  </v-row>

    
      <v-card-actions class="pa-2 d-flex justify-center">
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>
  
      <v-btn
        color="warning"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
  
      <v-btn
        color="error"
        @click="close"
      >
        Close
      </v-btn>
    </v-card-actions>
    </v-form>
  </template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  data: () => ({
    valid: true,
    items: [],
    city: '',
    citysRules: [
      v => !!v || 'City is required',
    ],
    adress: '',
    adressRules: [
      v => !!v || 'Name is required',
    ],
    private: false,
  }),
  async mounted(){
        const res = await (await (await (await axios.get(`https://data.gov.il/api/3/action/datastore_search`, {
                    params: {
                        "resource_id":"b7cf8f14-64a2-4b33-8d4b-edb286fdbd37",
                        "limit":1272
                    }
                })).data).result).records
        this.items = res.map(x => x["שם_ישוב"])
    },
  methods: {
    async validate () {
      this.$refs.form.validate()
      const houseParams = {
        "adress": `${this.adress} ${this.city}`,
        "isBuilding": !this.private,
        "userId":JSON.parse(localStorage.getItem("user"))
      }
      try {
            const response = await axios.post("http://localhost:9001/apertments", houseParams);
            await Swal.fire({
            title: `added apertment`,
            text: 'Click "OK" to connect',
            icon: 'success',
            confirmButtonText: 'OK'
            })
            this.$router.push('/home')
        } catch (err) {
            Swal.fire({
            title: 'Error!',
            text: 'oops.. There is an error',
            icon: 'error',
            confirmButtonText: 'OK'
            })
        }
    },
    reset () {
      this.$refs.form.reset()
    },
    close(){
        this.$router.push('/home')
    },
  },
}
</script>