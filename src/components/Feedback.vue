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
      <div id="feedback-page-div">
        <div class="d-flex justify-space-between my-4" style="flex-wrap:wrap">
          <v-btn text large color="primary" class="mx-2" @click="toHomePage()">
              <v-icon left color="primary">mdi-arrow-left</v-icon>
              {{$t('feedback.btn_leave')}}
          </v-btn>
        </div>
        <h2 id="feedback-title">{{$t('feedback.feedback_title')}}</h2>

          
        <div id="feedback-text-div">
          <div style="font-size: 14px; margin-bottom: 4px">*{{$t('feedback.feedback_require')}}</div>
          <v-text-field
            outlined
            :label="$t('feedback.field_name')"
            v-model="data_name"
          ></v-text-field>
          <v-text-field
            outlined
            :label="$t('feedback.field_email')"
            v-model="data_email"
          ></v-text-field>
          <v-textarea
            outlined
            auto-grow
            :label="$t('feedback.field_content')"
            v-model="data_feedback"
          ></v-textarea>
          <div class="d-flex justify-center">
            <v-btn
              id="feedback-btn"
              color="primary"
              @click="submitFeedback"
              :disabled="data_name===''||data_email===''||data_feedback===''"
              v-on="on">
              {{$t('feedback.btn_submit')}}
                  </v-btn>
          </div>
        </div>
      </div>
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
    loading: false
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
            this.$router.push('/feedback/result');
          }
        })
        .catch()
        .finally(() => (this.loading = false));
    }
  }
};
</script>