<template>
  <v-container fluid style="padding:0; margin:0">
    <v-parallax
      style="background: linear-gradient(to right bottom, rgba(240,243,189,1) 0%, rgba(0,168,150,1) 49%, rgba(5,102,141,1) 100%);height: 90vh; min-height:600px"><!--background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)-->
      <div class="container">
        <div class="row" style="">
          <div class="mx-auto text-center col-md-11" style="">
            <h1 class="mb-8 home-title" >{{$t('home.text_title')}}</h1>
            <div class="mx-12">{{$t('home.text_desc')}}></div>
            <v-btn class="my-6 mx-2" outlined x-large color="#fff" :href="require('../assets/guide.pdf')" download="OPR_guide.pdf">
              download my resume
            </v-btn>
            <v-btn class="my-6 mx-2" outlined x-large color="#fff" :href="require('../assets/diagram.pdf')" download="OPR_diagram.pdf">
              Export all recommendations 
            </v-btn>
            <v-btn class="my-4" outlined x-large color="#fff" @click="toGuidePage(1)">
              {{$t('home.btn_customize')}}<v-icon right>mdi-arrow-right</v-icon> 
            </v-btn>
          </div>
        </div>
      </div>
    </v-parallax>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-lg-5 col-md-4 p-md-4 col-3"> 
              <img class="img-fluid" align="right" src="tree.PNG" style="height:15vw; border:5px" alt="PDF Template" > 
            </div>
            <div class="col-md-6 offset-lg-1 d-flex flex-column justify-content-center py-4">
              <h2 class="my-3"> <b>Customize your own research plan</b> </h2>
              <p class="lead">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.</p>
            </div>
          </div>
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
import {mapMutations} from 'vuex'
export default {
  name: 'DesktopHome',

  components: {
  },

  data: () => ({
  }),

  watch: {
  },

  methods: {
    ...mapMutations([
      'setStepperStep'
    ]),
    toGuidePage(step) {
      this.setStepperStep(step);
      this.$router.push('/guide');
    },
  }
};
</script>

<style src="../css/mycss.css"/>