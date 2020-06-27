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
        <div class="d-flex justify-center">
          <v-icon large dark color="primary">mdi-checkbox-marked-circle-outline
          </v-icon>
          <h2>Thanks for your feedback.</h2>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Feedback',

  components: {
  },

  data: () => ({
   }),

  computed:{
  },

  mounted: function() {

  },
  
  methods: {

    toHomePage(){
      this.$router.push('/');
    }
  }
};
</script>