<template>
  <div style="display: flex; flex-wrap: wrap;">
  <HomeComponent v-for="apertment in this.apertments" :key="apertment.apertmentId" :apertment="apertment" :deleteApertmentParent="deleteApertmentParent"></HomeComponent>
  <PlusHomeComponent/>
</div>
</template>

<script>
  import HomeComponent from '../components/HomeComponent.vue'
  import PlusHomeComponent from '../components/PlusHomeComponent.vue'
  import Swal from 'sweetalert2'
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Home',
    components: {
      HomeComponent,
      PlusHomeComponent
    },
    data:() =>({
    apertments : [],
  }),
  async mounted() {
      if(JSON.parse(localStorage.getItem("user"))==null){
        this.$router.push('/')
      }
      this.loginUser(JSON.parse(localStorage.getItem("user")))
      this.apertments = await (await axios.get(`http://localhost:9001/apertments/user/${this.user.id}`)).data
  },
  computed: {
      ...mapState([
         'user',
      ]) ,
  },
  methods: {
    ...mapActions([
         'loginUser',
      ]),
      deleteApertmentParent(IdToDelete) {
        this.apertments = this.apertments.filter(apertment => apertment.apertmentId != IdToDelete)
      }
  }
  }
</script>
