<template>
  <v-container fluid style="padding:0; margin:0">
    <v-parallax
      src="bg3.jpg" style="height:90vh; background-size: cover; padding:0; margin:0;">
<!--       <v-parallax
      style="background: linear-gradient(to right bottom, rgba(240,243,189,1) 0%, rgba(0,168,150,1) 49%, rgba(5,102,141,1) 100%);height: 100vh;"> -->
      <div class="container">
        <div class="row">
          <div class="mx-auto text-center col-md-12">
            <h1 class="mb-8 mx-auto home-title col-md-10" v-if="!is_mobile">{{$t('home.text_title')}}</h1>
            <div class="mx-auto my-0 col-8 home-desc">{{$t('home.text_desc')}}</div>
            <ul class="my-0 mx-auto text-center col-md-8 home-item" style="list-style-type:none;">
              <li v-for="(i, index) in 3" :key="index">{{$t('home.text_list['+index+']')}}<v-icon small color="#fff">mdi-check-circle-outline</v-icon></li>
              <li @click="$vuetify.goTo('#div-opr', 'linear')" style="text-decoration: underline; ">{{$t('home.text_opr')}}</li>
            </ul>
            <v-btn class="home-btn" :x-large="!is_mobile" outlined color="#fff" :href="require('../assets/guide.pdf')" download="OPR_guide.pdf">
              {{$t('home.btn_download_guide')}}
            </v-btn>
            <v-btn class="home-btn" :x-large="!is_mobile" outlined color="#fff" @click="exportAll">
              {{$t('home.btn_export_all')}}
            </v-btn>
            <v-btn class="home-btn" :x-large="!is_mobile" outlined color="#fff" style="white-space:normal; overflow-wrap: normal" @click="toGuidePage()">
              {{$t('home.btn_customize')}}<v-icon right>mdi-arrow-right</v-icon> 
            </v-btn>
          </div>
        </div>
      </div>
    </v-parallax>
    <div class="py-12" id="div-opr">
      <div class="row row-opr" >
        <div class="col-md-6 col-lg-4 opr-desc">
          {{$t('home.opr_desc')}}
        </div>
        <div class="col-md-6 col-lg-4 opr-list">
          {{$t('home.opr_list_title')}}
          <ol>
            <li v-for="(i, index) in 4" :key="index"><a href="#" @click="toGuideN(index)">{{$t('home.opr_list_item['+index+']')}}</a></li>
          </ol>
        </div>
      </div>
    </div>
    <div class="py-12" id="div-template">
      <div class="row row-opr" >
        <div class="col-md-6 col-lg-3 opr-desc mx-12">
          <img src="tree.PNG" style="height:30vh; min-height: 200px; border:5px" alt="PDF Template" > 
        </div>
        <div class="col-md-6 col-lg-4 ml-4">
          <h2 class="my-3"> 
            <b>{{$t('home.template_title')}}</b> 
          </h2>
          <p class="lead">{{$t('home.template_content')}}</p>
        </div>
      </div>
    </div>
    <v-footer padless>
      <v-card
        flat
        tile
        color="footer"
        class="lighten-1 white--text text-center"
      >
        <v-card-text>
          <v-btn class="ma-2" text icon color="#fff">
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn class="ma-2" text icon color="#fff">
            <v-icon>mdi-email</v-icon>
          </v-btn>
          <v-btn class="ma-2" text icon color="#fff">
            <v-icon>mdi-calendar</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-container>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'DesktopHome',

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
      this.$router.push('/guide');
    },

    toGuideN (n) {
        this.setStepperStep(n);
        this.$router.push('/guide').catch(err => err);
      },

    exportAll(){
      this.selectAllPanel();
      this.setDiagramData();
      this.$router.push('/summary');
    },
  }
};
</script>

<style src="../css/mycss.css"/>