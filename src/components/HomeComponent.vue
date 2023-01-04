<template>
  <v-card
  style="margin: 8vh;"
    class="mx-auto"
    max-width="400"
  >
    <!-- <v-img
    class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{apertment.adress}}</v-card-title>
    </v-img> -->

    <v-img
    class="white--text align-end"
      max-height="250px"
      width="400px"
      v-if="apertment.isBuilding"
      src="../../public/images/building.jpg" 
    >
      <v-card-title>{{apertment.adress}}</v-card-title>
    </v-img>

    <v-img
    class="white--text align-end"
      max-height="300px"
      width="400px"
      v-if="!apertment.isBuilding"
      src="../../public/images/privateHouse.jpg" 
    >
      <v-card-title>{{apertment.adress}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Faults:</v-card-subtitle>

    <!-- <v-card-text class="text--primary">
      <li v-for="fault in this.faults" v-if="!fault.isFixed" @click="showFault(fault)">
        {{ fault.tytle}}
      </li>
    </v-card-text> -->

    <v-card-text class="text--primary">
      <li v-for="fault in this.faults" v-if="!fault.isFixed" @click="showFault(fault)">
        <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
        {{ fault.tytle}}
        </v-btn>
      </template>
      <span>to see more..</span>
    </v-tooltip>
      </li>
    </v-card-text>
    
    <v-card-actions>
      <v-btn
        color="orange"
        text
        @click="deleteHouse()"
      >
      Delete house
      </v-btn>

      <PlusFault :initFault="initFault" :apertment="apertment"></PlusFault>

      <!-- <v-btn
        color="orange"
        text
        @click="addFault()"
      >
      Add fault
      </v-btn> -->

    </v-card-actions>
  </v-card>
</template>

<script>
 import axios from 'axios'
 import Swal from 'sweetalert2'
 import { mapState, mapActions } from 'vuex';
 import PlusFault from './PlusFault.vue';
  export default{
    props: ['apertment', 'deleteApertmentParent'],
    components:{PlusFault},
    data:() =>({
    faults : []
    }),
    async mounted() {
      try {
        this.faults = await (await axios.get(`http://localhost:9001/faults/apertment/${this.apertment.apertmentId}`)).data
      } catch(err) {
      }
    },
    methods:{
      async deleteHouse(){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.delete(`http://localhost:9001/apertments/${this.apertment.apertmentId}`)
            Swal.fire(
              'Deleted!',
              'Your apertment has been deleted.',
              'success'
            )
            this.deleteApertmentParent(this.apertment.apertmentId)
          }
        })
      },
      async showFault(fault){
        Swal.fire({
          title: `fault: ${fault.tytle}`,
          text: fault.content,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'fixed!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await axios.put(`http://localhost:9001/faults/fixed/${fault.faultId}`)
              Swal.fire({
              title: "good job!",
              text: "The fault has been fixed",
              icon: 'success',
              })
              fault.isFixed = true;
            } catch (err) {
              Swal.fire({
                title: 'Error!',
                text: `oops.. There is an error -->${err}`,
                icon: 'error',
                confirmButtonText: 'OK'
              })
            }
          }
        })
      },
      async initFault(newFualt){
        try {
          const response = await axios.post(`http://localhost:9001/faults`, newFualt)
          await Swal.fire({
            title: `${this.firstname}! successfully registered`,
            text: 'Click "OK" to connect',
            icon: 'success',
            confirmButtonText: 'OK'
            })
            this.faults = await (await axios.get(`http://localhost:9001/faults/apertment/${this.apertment.apertmentId}`)).data
        }catch (err){
          await Swal.fire({
            title: 'Error!',
            text: `oops.. There is an error ${err}`,
            icon: 'error',
            confirmButtonText: 'OK'
            })
        }
      },
    },
  }
</script>