<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
      hide-on-scroll
      height="70px"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down mx-12"
          contain
          min-width="100"
          src="../../assets/my_logo.png"
          width="160"
          position="center"
        />
        
      </div>

      <v-spacer></v-spacer>

        <v-btn
          @click="toHomePage"
          text
        >
          <span class="mr-2">{{$t('nav.btn_home')}}</span>
        </v-btn>
        <v-btn
          @click="toGuideSection(1)"
          text
        >
          <span class="mr-2">{{$t('nav.btn_guide')}}</span>
        </v-btn>
        <v-btn
          @click="toGuideSection(1)"
          text
        >
          <span class="mr-2">{{$t('nav.btn_sec1')}}</span>
        </v-btn>
        <v-btn
          @click="toGuideSection(2)"
          text
        >
          <span class="mr-2">{{$t('nav.btn_sec2')}}</span>
        </v-btn>
        <v-btn
          @click="toGuideSection(3)"
          text
        >
          <span class="mr-2">{{$t('nav.btn_sec3')}}</span>
        </v-btn>
        <v-btn
          @click="toGuideSection(4)"
          text
        >
          <span class="mr-2">{{$t('nav.btn_sec4')}}</span>
        </v-btn>
        <v-btn
          @click="changeLanguage()"
          text
        >
          <span class="mr-2">{{$t('nav.btn_lang')}}</span>
        </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
      <v-btn 
        color="primary"
        fab
        dark
        bottom
        right
        fixed
        v-scroll="onScroll"
        v-show="fab"
        @click="toTop()">
        <v-icon>mdi-chevron-double-up</v-icon>
      </v-btn>
    </v-content>
  </v-app>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'DesktopApp',

  components: {
  },

  data: () => ({
    fab: false
  }),

  computed:{
      ...mapState([
      'stepper_cur_step'
    ])},

  watch: {

    },

  methods: {
    ...mapMutations([
        'saveStepperStep',
      ]),

      toHomePage () {
        this.$router.push('/home').catch(err => err);
      },

      toGuidePage() {
        this.$router.push('/guide').catch(err => err);
      },

      toGuideSection(step){
        this.saveStepperStep(step);
        this.$router.push('/guide').catch(err => err);
      },

      changeLanguage(){
        if(this.$i18n.locale==='fr'){
          this.$i18n.locale='en';
        }else{
          this.$i18n.locale='fr';
        }
      },

      onScroll(e) {
        if (typeof window === 'undefined') return;
        const top = window.pageYOffset ||   e.target.scrollTop || 0;
        this.fab = top > 70;
      },
      toTop() {
        this.$vuetify.goTo(0);
      },


    },
};
</script>


