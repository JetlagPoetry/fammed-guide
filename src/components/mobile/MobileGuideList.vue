<template>
  <v-container>
    <GuideSection :section="list_current_step"></GuideSection>
    <div class="d-flex justify-content-start my-4" style="width:100%">
      <v-spacer></v-spacer>
      <v-btn
        v-if="list_current_step>0"
        color="primary"
        @click="lastStep(list_current_step)"
        class="mx-2"
      >
        <v-icon left color="white">mdi-arrow-left</v-icon>
        {{$t('guide.btn_previous')}}
      </v-btn>

      <v-btn
        v-if="list_current_step<3"
        color="primary"
        @click="nextStep(list_current_step)"
        class="mx-2"
      >
        {{$t('guide.btn_next')}}
        <v-icon right color="white">mdi-arrow-right</v-icon>
      </v-btn>
      <v-btn
        v-if="list_current_step==3"
        color="primary"
        @click="toSummary()"
        class="mx-2"
      >
        {{$t('guide.btn_export')}}
        <v-icon right color="white">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
import GuideSection from '../common/GuideSection.vue'
export default {
  name: 'List1',
  inject: ['reload'],
  components: {
    GuideSection
  },

  data: () => ({
  }),

  computed:{
    ...mapState([
      'substeps',
      'panel_comment',
      'panel_select',
      'btn_show_unselect',
      'list_current_step'])},

  watch: {
    panel_select: {
      handler: function (val) {
        var i;
        for(i=0; i<=3; i++){
          if(val[i].every(this.itemIsTrue)){
            this.switchBtnUnselect({n:i, toUnselect: true});
          }else{
            this.switchBtnUnselect({n:i, toUnselect: false});
          }
        }
      },
      deep: true
    },
  },

  mounted:function(){
  },

  methods: {
    ...mapMutations([
      'selectAllPanel',
      'togglePanel',
      'setListStep',
      'selectAllPanel',
      'switchBtnUnselect',
      'setDiagramData'
    ]),

    check: function(e) {
      e.cancelBubble = true;
    },

    nextStep (n) {
      this.setListStep(n+1);
      this.scrollToTop();
    },

    lastStep (n) {
      this.setListStep(n-1);
      this.scrollToTop();
    },

    scrollToTop() {
      window.scrollTo(0,0);
    },

    itemIsTrue(value){
      return value;
    },

    toSummary () {
        var data = [];
        var i;
        var key=0;
        for(i=0; i<4; i++){

          var parent = key;
          data.push({"key":key++, "substep":this.$t('guide.text_content['+i+'].title_text'), "isParent": true });

          var j;
          for(j=0; j < this.substeps[i]; j++){
            data.push({
              "key": key++,
              "substep": this.$t('guide.text_content['+i+'].subheader_text['+j+']'), 
              "comment": this.panel_comment[i][j],
              "selected": this.panel_select[i][j],
              "parent": parent,
              "isParent": false,
            });
            
          }
        }
        this.setDiagramData(data);
        this.scrollToTop();
        this.$router.push('/mobile/summary');
      },
  },
};
</script>

<style src="../../css/mycss.css"/>