<template>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="orange"
            text
            v-bind="attrs"
            v-on="on"
            dialog.value = true
            @click="reset"
          >ADD FAULT</v-btn>
        </template>

        <template ref="card" v-slot:default="dialog">
          <v-card>

            <v-toolbar
              color="primary"
              dark
            >Enter a fault:</v-toolbar>

                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="mt-8"
                >
                <v-text-field
                    v-model="tytle"
                    filled
                    :rules="[v => !!v || 'Tytle is required']"
                    label="Tytle:"
                    required
                ></v-text-field>

                <v-textarea
                    v-model="content"
                    filled
                    :rules="[v => !!v || 'Content is required']"
                    label="Enter content"
                ></v-textarea>
            
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
                    @click="dialog.value = false"
                    >Close
                </v-btn>
                </v-form>

          </v-card>
        </template>
      </v-dialog>
    </v-col>

  </template>
  
  <script>
    export default {
      name: 'Plus',
      props: ['initFault', 'apertment'],
      data: () => ({
        valid: false,
        dialog: false,
        tytle: '',
        content: '',
      }),
  
      methods: {
        async validate () {
        try{
            await this.$refs.form.validate()
            if(this.valid) {
                const faultParams = {
                    "tytle":this.tytle,
                    "content":this.content,
                    "isFixed":false,
                    "apertmentId":this.apertment
                };
                this.initFault(faultParams)
                this.dialog = false
            }
        }catch{

        }

        },
        
        reset () {
          this.$refs.form.reset()
        },
      },
    }
  </script>
