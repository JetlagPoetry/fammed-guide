<template>
  <div>
  <div class="mt-6 px-6 mx-auto"  style="width:95%; max-width:1400px" v-if="!is_mobile">
    <v-container style="width:100%" >
      <v-stepper
        :value="stepper_current_step+1"
        alt-labels 
        non-linear
        style="width:100%">
      <v-stepper-header>
        <v-stepper-step step="1" editable ><div class="px-4" style="width:220px; font-size:small">{{$t('guide.text_step[0]')}}</div></v-stepper-step>
        
        <v-divider></v-divider>
        
        <v-stepper-step step="2" editable><div class="px-4" style="width:220px;font-size:small">{{$t('guide.text_step[1]')}}</div></v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" editable><div class="px-4" style="width:220px;font-size:small">{{$t('guide.text_step[2]')}}</div></v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4" editable><div class="px-4" style="width:220px;font-size:small">{{$t('guide.text_step[3]')}}</div></v-stepper-step>

      </v-stepper-header>

        <v-stepper-items class="px-4 pb-4">
          <v-stepper-content
            v-for="(step, section) in steps"
            :key="section"
            :step="section+1"
          >
            <GuideSection :section="section"></GuideSection>
            <v-btn
              v-if="section>0"
              color="primary"
              @click="lastStep(section)"
              class="mx-2"
            >
              {{$t('guide.btn_previous')}}
            </v-btn>

            <v-btn
              v-if="section<3"
              color="primary"
              @click="nextStep(section)"
              class="mx-2"
            >
              {{$t('guide.btn_next')}}
            </v-btn>
            <v-btn
              v-if="section==3"
              color="primary"
              @click="toSummary()"
              class="mx-2"
            >
              {{$t('guide.btn_export')}}
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
  <v-container v-else>
      <GuideSection :section="stepper_current_step"></GuideSection>
      <div class="d-flex justify-content-start my-4" style="width:100%">
        <v-spacer></v-spacer>
        <v-btn
          v-if="stepper_current_step>0"
          color="primary"
          @click="lastStep(stepper_current_step)"
          class="mx-2"
        >
          <v-icon left color="white">mdi-arrow-left</v-icon>
          {{$t('guide.btn_previous')}}
        </v-btn>

        <v-btn
          v-if="stepper_current_step<3"
          color="primary"
          @click="nextStep(stepper_current_step)"
          class="mx-2"
        >
          {{$t('guide.btn_next')}}
          <v-icon right color="white">mdi-arrow-right</v-icon>
        </v-btn>
        <v-btn
          v-if="stepper_current_step==3"
          color="primary"
          @click="toSummary()"
          class="mx-2"
        >
          {{$t('guide.btn_export')}}
          <v-icon right color="white">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import GuideSection from './GuideSection.vue'
export default {
  name: 'DesktopGuide',

  components: {
    GuideSection
  },

  data: () => ({
    steps: 4,
  }),

  props:{

  },

  computed:{
    ...mapState([
      'is_mobile',
      'substeps',
      'panel_comment',
      'panel_select',
      'stepper_current_step',
    ]),
  },


  mounted:function(){
  },

  watch: {
  },

  methods: {
    ...mapMutations([
        'setDiagramData',
        'setStepperStep',
      ]),

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
        this.$router.push('/summary');
      },

      nextStep (n) {
        this.setStepperStep(n+1);
        this.toTop();
      },

      lastStep (n) {
        this.setStepperStep(n-1);
        this.toTop();
      },

      check: function(e) {
        e.cancelBubble = true;
      },

      itemIsTrue(value){
        return value;
      },

      toTop() {
        window.scrollTo(0,0);
      },
    },
};
</script>
