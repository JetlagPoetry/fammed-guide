<template>
  <v-container fluid style="padding:0; margin:0">
    <v-parallax
      style="background: linear-gradient(to right bottom, rgba(240,243,189,1) 0%, rgba(0,168,150,1) 49%, rgba(5,102,141,1) 100%);height: 100vh;">
      <v-col class="text-center">
        <h1 class="my-8 head1" >OPR PLAN</h1>
        <div v-html="$t('home.text_desc')"></div>
        <v-btn multi-line class="my-4" outlined color="#fff" @click="toGuide()">
          {{$t('home.btn_customize')}}
        <v-icon right>mdi-arrow-right</v-icon> 
        </v-btn>
        <v-btn class="my-4" outlined color="#fff" :href="require('../../assets/guide.pdf')" download="OPR_guide.pdf">
          {{$t('home.btn_download_guide')}}
        </v-btn>
        <v-btn class="my-4" outlined color="#fff" :href="require('../../assets/diagram.pdf')" download="OPR_diagram.pdf">
           {{$t('home.btn_download_diagram')}}
        </v-btn>
      </v-col>
    </v-parallax>
  </v-container>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'MobileHome',

  components: {
  },

  data: () => ({
    step: 0,
  }),

  computed:{
    
  },

  watch: {

  },

  mounted:function(){

  },

  methods: {
    ...mapMutations([
      'setListStep',
    ]),
    toGuide () {
      this.setListStep(0);
      this.$router.push('/mobile/guide');
    },
  },
};
</script>

<style src="../../css/mycss.css"/>