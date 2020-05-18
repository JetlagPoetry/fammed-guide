<template>
  <!-- <v-content class="px-12"> -->
  <div class="mt-6 px-6 mx-auto" style="width:95%; max-width:1400px" >
    <v-container style="width:100%">
      <v-stepper 
        v-model="cur_step"
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
            key="`1-content`"
            :step="1"
          >
            <Panel1 ref="panel1"/>

            <v-btn
              color="primary"
              @click="nextStep(1)"
              class="mx-2"
            >
              {{$t('guide.btn_next')}}
            </v-btn>
          </v-stepper-content>

          <v-stepper-content
            key="`2-content`"
            :step="2"
          >
            <Panel2 ref="panel2"/>

            <v-btn
              color="primary"
              @click="lastStep(2)"
              class="mx-2"
            >
              {{$t('guide.btn_previous')}}
            </v-btn>

            <v-btn
              color="primary"
              @click="nextStep(2)"
              class="mx-2"
            >
              {{$t('guide.btn_next')}}
            </v-btn>
          </v-stepper-content>

          <v-stepper-content
            key="`3-content`"
            :step="3"
          >
            <Panel3 ref="panel3"/>

            <v-btn
              color="primary"
              @click="lastStep(3)"
              class="mx-2"
            >
              {{$t('guide.btn_previous')}}
            </v-btn>

            <v-btn
              color="primary"
              @click="nextStep(3)"
              class="mx-2"
            >
              {{$t('guide.btn_next')}}
            </v-btn>
          </v-stepper-content>

          <v-stepper-content
            key="`4-content`"
            :step="4"
          >
            <Panel4 ref="panel4"/>

            <v-btn
              color="primary"
              @click="lastStep(4)"
              class="mx-2"
            >
              {{$t('guide.btn_previous')}}
            </v-btn>

            <v-btn
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
</template>

<script>
import Panel1 from './ExpansionPanel1';
import Panel2 from './ExpansionPanel2';
import Panel3 from './ExpansionPanel3';
import Panel4 from './ExpansionPanel4';
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'Stepper',

  components: {
    Panel1,
    Panel2,
    Panel3,
    Panel4
  },

  data: () => ({
    cur_step: 1,
    steps: 4,
  }),

  props:{

  },

  computed:{
    ...mapState([
    'substeps',
    'panel_comment',
    'panel_select'
  ])},

  watch: {
      steps (val) {
        if (this.cur_step > val) {
          this.cur_step = val
        }
      },
    },
  mounted:function(){
  },
  methods: {
    ...mapMutations([
            'saveDiagramData',
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
        this.saveDiagramData(data);
        this.$router.push('/summary');
      },


      nextStep (n) {
        if (n === this.steps) {
          this.cur_step = 1
        } else {
          this.cur_step = n + 1
        }
      },

      lastStep (n) {
        if (n === 1) {
          this.cur_step = 1
        } else {
          this.cur_step = n - 1
        }
      },


      itemIsRead (item) {
        return item===true;
      },
    },
};
</script>
