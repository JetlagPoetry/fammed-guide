import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
    themes: {
      light: {
        primary: '#05668d',
        secondary: '#00a896',
        third: '#ffc841',
        anchor: '#8c9eff',
        footer: '#028090',
        text: '#424242'
      },
    },
  },
});
