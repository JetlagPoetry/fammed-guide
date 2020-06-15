import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);
//05668d
export default new Vuetify({
	theme: {
    themes: {
      light: {
        primary: '#124356',
        secondary: '#00a896',
        third: '#ffc841',
        anchor: '#8c9eff',
        footer: '#9dacb2',
        text: '#424242'
      },
    },
  },
});
