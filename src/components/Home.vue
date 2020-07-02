<template>
  <v-container fluid style="padding:0; margin:0">
    <v-parallax
      src="bg3.jpg" style="height:90vh; background-size: cover; padding:0; margin:0;">
<!--       <v-parallax
      style="background: linear-gradient(to right bottom, rgba(240,243,189,1) 0%, rgba(0,168,150,1) 49%, rgba(5,102,141,1) 100%);height: 100vh;"> -->
      <div class="container">
        <v-row justify="center">
          <div class="text-center col-12 col-xl-10">
            <h1 class="home-title col-12" v-if="!is_mobile">{{$t('home.text_title')}}</h1>
            <div class="col-12 col-xl-8 home-desc">{{$t('home.text_desc')}}</div>
            <ul class="mx-auto col-12 home-item" style="list-style-type:none;">
              <li v-for="(i, index) in 3" :key="index">{{$t('home.text_list['+index+']')}}<v-icon small color="#fff">mdi-check-circle-outline</v-icon></li>
              <li @click="$vuetify.goTo('#div-opr', 'linear')" style="display:inline; text-decoration: underline; " class="mx-4">{{$t('home.text_opr')}}</li>
              <li style="display:inline;">|</li>
              <li @click="toFeedbackPage" style="display:inline; text-decoration: underline;" class="mx-4">{{$t('home.text_feedback')}}</li>
            </ul>
            <v-btn class="home-btn" :x-large="$vuetify.breakpoint.xl" outlined color="#fff" :href="require('../assets/guide.pdf')" download="OPR_guide.pdf">
              {{$t('home.btn_download_guide')}}
            </v-btn>
            <v-btn class="home-btn" :x-large="$vuetify.breakpoint.xl" outlined color="#fff" @click="exportAll">
              {{$t('home.btn_export_all')}}
            </v-btn>
            <v-btn class="home-btn" :x-large="$vuetify.breakpoint.xl" outlined color="#fff" style="white-space:normal; overflow-wrap: normal" @click="toGuidePage()">
              {{$t('home.btn_customize')}}<v-icon right>mdi-arrow-right</v-icon> 
            </v-btn>
          </div>
        </v-row>
      </div>
    </v-parallax>
    <div class="py-12" id="div-opr">
      <v-row class="justify-space-around align-items-center" >
        <v-col md="6" lg="4" class="opr-desc">
          {{$t('home.opr_desc')}}
        </v-col>
        <v-col md="6" lg="4" class="opr-list">
          {{$t('home.opr_list_title')}}
          <ol>
            <li v-for="(i, index) in 4" :key="index"><a href="#" @click="toGuideN(index)">{{$t('home.opr_list_item['+index+']')}}</a></li>
          </ol>
        </v-col>
      </v-row>
    </div>
    <div class="py-12" id="div-template">
      <v-row class="justify-center align-items-center " >
        <v-col md="6" lg="3" class="opr-desc mx-12">
          <img src="tree.PNG" style="height:30vh; min-height: 200px; border:5px" alt="PDF Template" > 
        </v-col>
        <v-col md="6" lg="4" class="ml-4">
          <h2> 
            <b>{{$t('home.template_title')}}</b> 
          </h2>
          <p class="lead">{{$t('home.template_content')}}</p>
        </v-col>
      </v-row>
    </div>
    <v-footer padless>
      <v-card
        flat
        tile
        class="mx-auto text-center">
        <v-card-text>
          {{ new Date().getFullYear() }} — <strong>@McGill University</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Home',

  components: {
  },

  computed:{
    ...mapState([
      'is_mobile',])
  },

  data: () => ({
  }),

  watch: {
  },

  methods: {
    ...mapMutations([
      'setStepperStep',
      'setDiagramData',
      'selectAllPanel'
    ]),
    toGuidePage() {
      this.setStepperStep(0);
      this.$router.push('/guide').catch(err => err);
    },

    toFeedbackPage(){
      this.$router.push('/feedback').catch(err => err);
    },

    toGuideN (n) {
        this.setStepperStep(n);
        this.$router.push('/guide').catch(err => err);
      },

    exportAll(){
      this.selectAllPanel();
      this.setDiagramData();
      this.$router.push('/summary').catch(err => err);
    },
  }
};
</script>

<style src="../css/mycss.css"/>