<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
      :hide-on-scroll="!is_mobile"
    >
      <!-- Nav icon for mobile device, click to expand nav drawer-->
      <v-app-bar-nav-icon v-if="is_mobile" @click.stop="mobile_drawer=!mobile_drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 mx-12"
          contain
          min-width="100"
          src="./assets/logo.png"
          width="160"
          position="center"
        />
        
      </div>

      <v-spacer></v-spacer>
        <!-- Nav button hide for mobile device-->
        <v-btn
          v-if="!is_mobile"
          @click="toHomePage"
          text
        >
          <span class="mr-2">{{$t('nav.btn_home')}}</span>
        </v-btn>
        <!-- Nav button hide for mobile device-->
        <v-btn
          v-if="!is_mobile"
          @click="toGuidePage"
          text
        >
          <span class="mr-2">{{$t('nav.btn_guide')}}</span>
        </v-btn>
        <!-- Nav button hide for mobile device-->
        <v-btn
          v-if="!is_mobile"
          @click="toFeedbackPage"
          text
        >
          <span class="mr-2">{{$t('nav.btn_feedback')}}</span>
        </v-btn>
        <v-btn
          @click="changeLanguage"
          text
        >
          <v-icon>mdi-earth</v-icon>
          <span class="mr-2">{{$t('nav.btn_lang')}}</span>
        </v-btn>
    </v-app-bar>
    <!-- Nav drawer for mobile device-->
    <v-navigation-drawer
      v-if="is_mobile"
      v-model="mobile_drawer"
      app
      fixed>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="mobile_group"
        >
          <v-list-item @click="toHomePage">
            <v-list-item-title>{{$t('nav.btn_home')}}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toGuideN(1)">
            <v-list-item-title>{{$t('nav.btn_sec1')}}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toGuideN(2)">
            <v-list-item-title>{{$t('nav.btn_sec2')}}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toGuideN(3)">
            <v-list-item-title>{{$t('nav.btn_sec3')}}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toGuideN(4)">
            <v-list-item-title>{{$t('nav.btn_sec4')}}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toFeedbackPage">
            <v-list-item-title>{{$t('nav.btn_feedback')}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content v-if="!is_mobile">
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
        @click="toTop">
        <v-icon>mdi-chevron-double-up</v-icon>
      </v-btn>
    </v-content>

    <v-content v-else>
      <router-view v-if="router_alive"></router-view>
    </v-content>
  </v-app>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    fab: false,
    mobile_drawer: false,
    mobile_group: null,
    router_alive: true
  }),

  watch: {
    mobile_group () {
      this.mobile_drawer = false
    },
  },

  computed:{
    ...mapState([
      'is_mobile',])
  },

  mounted:function(){
    //detect devices
    if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
        this.setMobileDevice(true);
      } else {
      this.setMobileDevice(false);
    }
  },

  methods: {
    ...mapMutations([
        'setStepperStep',
        'setMobileDevice'
      ]),

      //nav button click event
      toHomePage () {
        this.$router.push('/').catch(err => err);
      },

      //nav button click event
      toGuidePage() {
        this.setStepperStep(0);
        this.$router.push('/guide').catch(err => err);
      },
      
      //nav button click event
      toFeedbackPage(){
        this.$router.push('/feedback').catch(err => err);
      },

      //drawer button for mobile 
      toGuideN (n) {
        this.toTop();
        this.setStepperStep(n-1);
        this.$router.push('/guide').catch(err => err);
      },

      //nav button for mobile&desktop
      changeLanguage(){
        if(this.$i18n.locale==='fr'){
          this.$i18n.locale='en';
        }else{
          this.$i18n.locale='fr';
        }
      },

      // To show the scroll fab
      onScroll(e) {
        if (typeof window === 'undefined') return;
        const top = window.pageYOffset ||   e.target.scrollTop || 0;
        this.fab = top > 70;
      },

      // For scroll to top fab
      toTop() {
        this.$vuetify.goTo(0);
      },
      
      // For Guide list refresh within the same vue.
      reload(){
        this.router_alive = false;
        this.$nextTick(function(){
          this.router_alive = true;
        });
      },

    },
};
</script>
<style src="./css/mycss.css"/>