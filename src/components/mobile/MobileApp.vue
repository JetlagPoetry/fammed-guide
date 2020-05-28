<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 mx-12"
          contain
          min-width="100"
          src="../../assets/my_logo.png"
          width="160"
          position="center"
        />
        
      </div>

      <v-spacer></v-spacer>
        <v-btn
        @click="changeLanguage"
        text
      >
        <span class="mr-2">{{$t('nav.btn_lang')}}</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="toHome()">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toGuide(1)">
            <v-list-item-title>Chapter1</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toGuide(2)">
            <v-list-item-title>Chapter2</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toGuide(3)">
            <v-list-item-title>Chapter3</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toGuide(4)">
            <v-list-item-title>Chapter4</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view v-if="isRouterAlive"></router-view>
    </v-content>
  </v-app>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name: 'MobileApp',

  provide(){
    return{
      reload: this.reload
    }
  },

  components: {
  },

  data: () => ({
    drawer: false,
    group: null,
    isRouterAlive: true
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },

  mounted:function(){
  },

  methods: {
    ...mapMutations([
      'setListStep',
    ]),

    // For Guide list refresh within the same vue.
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      });
    },

    toHome(){
      this.scrollToTop();
      this.$router.push('/mobile/home').catch(err => err);
    },

    toGuide (n) {
      this.setListStep(n-1);
      this.scrollToTop();
      this.$router.push('/mobile/guide').catch(err => err);
    },
      
    changeLanguage(){
      if(this.$i18n.locale==='fr'){
        this.$i18n.locale='en';
      }else{
        this.$i18n.locale='fr';
      }
    },

    scrollToTop() {
      window.scrollTo(0,0);
    }
    
  }
};
</script>

<style src="../../css/mycss.css"/>