<template>
  <v-container>
    <v-row justify="center">
      <v-overlay
        :value="loading"
      >
      <v-progress-circular
        indeterminate
        size="70"
        width="5"
        color="primary"
      ></v-progress-circular>
      </v-overlay>
      <v-col cols="12" sm="10" md="10" lg="10" xl="8">
        <v-btn text large color="primary" class="mx-2" @click="toHomePage()">
          <v-icon left color="primary">mdi-arrow-left</v-icon>
          {{$t('feedback.btn_leave')}}
        </v-btn>
        <v-row justify="center">
          <v-col cols="12" sm="12" md="12" lg="10" xl="8">
            <v-card>
              <v-card-text>
                <h2 id="feedback-title">{{$t('feedback.feedback_title')}}</h2>
                <v-alert
                  dense
                  type="error"
                  border="top"
                  v-if="submission_error"
                >
                  {{$t('feedback.error_message')}}
                </v-alert>
                <v-text-field
                  outlined
                  :label="$t('feedback.field_name')"
                  v-model="data_name"
                  :rules="[rules.required]"
                  class="my-4"
                ></v-text-field>
                <v-text-field
                  outlined
                  :label="$t('feedback.field_email')"
                  v-model="data_email"
                  :rules="[rules.required, rules.email]"
                  class="my-4"
                ></v-text-field>
                <v-textarea
                  outlined
                  auto-grow
                  :label="$t('feedback.field_content')"
                  v-model="data_feedback"
                  :rules="[rules.required, rules.counter]"
                  class="my-4"
                ></v-textarea>
                <div style="font-size: 14px; margin-bottom: 24px">*{{$t('feedback.feedback_require')}}</div>
                <div class="d-flex justify-center">
                  <v-btn
                    id="feedback-btn"
                    color="primary"
                    @click="submitFeedback"
                    :disabled="data_name===''||data_email===''||data_feedback===''">
                    {{$t('feedback.btn_submit')}}
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import http from '../http-common'
export default {
  name: 'Feedback',

  components: {
  },

  data: () => ({
    data_name:"",
    data_email:"",
    data_feedback:"",
    loading: false,
    submission_error: false,
    error_code: 0,
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length >= 20 || 'Mininum 20 characters',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    },
  }),

  computed:{
    ...mapState([
      ])
  },

  mounted: function() {
    
  },
  
  methods: {
    ...mapMutations([
    ]),

    toHomePage(){
      this.$router.push('/');
    },

    submitFeedback(){
      var data = {
        name:this.data_name,
        email:this.data_email, 
        content:this.data_feedback
      };
      this.loading = true;
      http.post(`/comment/add`, data)
        .then(response => {
          if(response.status===200){
            this.submission_error = false;
            this.$router.push('/feedback/result');
          }else{
            this.error_code = response.status;
            this.submission_error = true;
          }
        })
        .catch()
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style src="../css/mycss.css"/>