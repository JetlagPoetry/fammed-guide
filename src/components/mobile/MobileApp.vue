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
      absolute
      temporary>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="toList1()">
            <v-list-item-title>Chapter1</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toList2()">
            <v-list-item-title>Chapter2</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toList3()">
            <v-list-item-title>Chapter3</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toList4()">
            <v-list-item-title>Chapter4</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content class="mx-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'MobileApp',

  components: {
  },

  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },

  methods: {
    toList1 () {
      this.$router.push('/mobile/list1');
    },

    toList2 () {
      this.$router.push('/mobile/list2');
    },

    toList3 () {
      this.$router.push('/mobile/list3');
    },

    toList4 () {
      this.$router.push('/mobile/list4');
    },
      
    changeLanguage(){
      if(this.$i18n.locale==='fr'){
        this.$i18n.locale='en';
      }else{
        this.$i18n.locale='fr';
      }
    },
    
  }
};
</script>

<style src="../../css/mycss.css"/>