<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),

  mounted:function(){
    if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)){
        this.setMobileDevice(true);
        this.$router.replace('/mobile').catch(err => err);
     } else {
      this.setMobileDevice(false);
       this.$router.replace('/desktop').catch(err => err);
      }
  },

  watch: {

    },

  methods: {
    ...mapMutations([
      'setMobileDevice'
    ]),
    },
};
</script>


