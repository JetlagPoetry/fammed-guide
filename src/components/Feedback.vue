<template>
  <v-container>
    <v-row justify="center">
      <div id="feedback-page-div">
        <div class="d-flex justify-space-between my-4" style="flex-wrap:wrap">
          <v-btn text large color="primary" class="mx-2" @click="toHomePage()">
              <v-icon left color="primary">mdi-arrow-left</v-icon>
              {{$t('feedback.btn_leave')}}
          </v-btn>
        </div>
        <h2 id="feedback-title">{{$t('feedback.feedback_title')}}</h2>
        <div id="feedback-text-div">
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
          <v-text-field
            outlined
            :label="$t('feedback.field_content')"
            height="25vh"
            v-model="data_feedback"
          ></v-text-field>

          <div class="d-flex justify-center">
            <v-btn
              id="feedback-btn"
              color="primary">
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
    data_feedback:""
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
      http.post(`/comment/add`, data)
        .then(response => {
          this.test = 'success' + response.data;
        })
        .catch();
    }
  }
};
</script>