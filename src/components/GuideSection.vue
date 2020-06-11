<template>
<v-card
    class="mb-12"
    elevation="0">
      <h2 class="my-4">{{$t('guide.text_content['+section+'].title_text')}}</h2>
      <div v-html="$t('guide.text_content['+section+'].intro_text')" class="my-4"></div>
      <v-divider></v-divider>
      <div class="my-6">        
          <v-btn v-if="btn_show_collapse[section]" color="primary" class="mx-2" @click="expandAllPanel(section)" style="width:12%; min-width: 160px">
              <v-icon left medium>mdi-minus</v-icon>
              {{$t('guide.btn_collapseAll')}}
          </v-btn>
          <v-btn v-else color="primary" class="mx-2" @click="expandAllPanel(section)" style="width:12%; min-width: 160px">
              <v-icon left medium color="#fff">mdi-plus</v-icon>
              {{$t('guide.btn_expandAll')}}
          </v-btn>
          <v-btn v-if="btn_show_unselect[section]" color="primary" class="mx-2" @click="selectAllPanel(section)">
            <v-icon left medium color="#fff">mdi-close</v-icon>
              {{$t('guide.btn_unselectAll')}}
          </v-btn>
          <v-btn v-else color="primary" class="mx-2" @click="selectAllPanel(section)">
            <v-icon left medium color="#fff">mdi-check</v-icon>
              {{$t('guide.btn_selectAll')}}
          </v-btn>
      </div>
      <v-row justify="center">
        <v-expansion-panels inset multiple focusable class="mx-4" v-model="panel_expand[section]">
          <v-expansion-panel
            v-for="(item,substep) in substeps[section]"
            :key="substep"
            >
            <v-expansion-panel-header class="py-4">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-checkbox
                      v-model="panel_select[section][substep]"
                      @click.native="check($event)"
                      v-on="on"
                    ></v-checkbox>
                </template>
                <span>{{$t('guide.cbx_selectHint')}}</span>
              </v-tooltip>
              <span>
              {{$t('guide.text_content['+section+'].subheader_text['+substep+']')}}
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-4">
              <div v-html="$t('guide.text_content['+section+'].guide_text['+substep+']')"></div>
              <v-divider class="my-6"></v-divider>
              <div class="mt-4 mb-0">
                <v-textarea
                  outlined
                  auto-grow
                  name="input-7-4"
                  :label="$t('guide.txt_instrHint')"
                  v-on:input="selectPanel({step:section, substep:substep})"
                  v-model="panel_comment[section][substep]"
                ></v-textarea>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
  </v-card>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'GuideSection',

  props: ['section'],

  components: {
  },

  data: () => ({
    steps: 4,
  }),

  computed:{
    ...mapState([
      'substeps',
      'panel_comment',
      'panel_select',
      'panel_expand',
      'btn_show_collapse',
      'btn_show_unselect',
    ]),
  },


  mounted:function(){
  },

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
    panel_expand: {
      handler: function (val) {
        var i, j;
        for(i=0; i<=3; i++){
          for(j=0; j<this.substeps[i]; j++){
            if(val[i].indexOf(j)<0){
              this.switchBtnCollapse({n:i, toCollapse: false});
              break;
            }
            this.switchBtnCollapse({n:i, toCollapse: true});
          }
        }
      },
      deep: true
    },
  },

  methods: {
    ...mapMutations([
        'selectPanel',
        'setDiagramData',
        'expandAllPanel',
        'selectAllPanel',
        'switchBtnUnselect',
        'switchBtnCollapse',
        'setStepperStep'
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
      },

      lastStep (n) {
        this.setStepperStep(n-1);
      },

      check: function(e) {
        e.cancelBubble = true;
      },
      itemIsTrue(value){
        return value;
      }
    },
};
</script>
