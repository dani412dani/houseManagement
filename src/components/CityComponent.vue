<template>

    <v-container fluid>
      <v-row>
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
          <v-select
            v-model="city"
            @input="$emit(city)"
            :items="items"
            label="city"
          ></v-select>
        </v-col>
    </v-row>
  </v-container>

</template>  

<script>
import axios from 'axios'
  export default {
    name: 'plusHome',
    props:['city'],
    data: () => ({
      items: [],
    }),
    async mounted(){
        const res = await (await (await (await axios.get(`https://data.gov.il/api/3/action/datastore_search`, {
                    params: {
                        "resource_id":"b7cf8f14-64a2-4b33-8d4b-edb286fdbd37",
                        "limit":1272
                    }
                })).data).result).records
        this.items = res.map(x => x["שם_ישוב"])
    }
  }
</script>
