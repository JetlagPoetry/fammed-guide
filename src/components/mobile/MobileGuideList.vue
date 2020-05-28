<template>
  <v-container>
    <h2 class="my-4">{{$t('guide.text_content['+list_current_step+'].title_text')}}</h2>
    <div v-html="$t('guide.text_content['+list_current_step+'].intro_text')" class="my-4"></div>
      <v-btn v-if="btn_show_unselect[list_current_step]" color="primary" class="mx-2" @click="selectAllPanel(list_current_step)">
        <v-icon left medium color="#fff">mdi-close</v-icon>
          {{$t('guide.btn_unselectAll')}}
      </v-btn>
      <v-btn v-else color="primary" class="mx-2" @click="selectAllPanel(list_current_step)">
        <v-icon left medium color="#fff">mdi-check</v-icon>
          {{$t('guide.btn_selectAll')}}
      </v-btn>
    <v-row>
      <v-col
        v-for="(item,step_no) in substeps[list_current_step]"
        :key="step_no"
        cols="12">
        <v-card 
          elevation="4" 
          :dark="panel_select[list_current_step][step_no]"
          @click="togglePanel({step:list_current_step, substep:step_no})"
           >
          <div class="flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                style="line-height:1.2; font-size:1.1rem">
                {{$t('guide.text_content['+list_current_step+'].subheader_text['+step_no+']')}}
              </v-card-title>
              <v-card-subtitle
                class="mx-2 my-1 py-0"
                style="line-height:1.2; font-size:0.9rem"
                v-html="$t('guide.text_content['+list_current_step+'].guide_text['+step_no+']')">
              </v-card-subtitle >
              <div class="mt-4 mb-0 mx-4">
                <v-textarea
                  :label="$t('guide.txt_instrHint')"
                  outlined
                  auto-grow
                  @click.native="check($event)"
                  rows="4"
                  row-height="16"
                  v-model="panel_comment[list_current_step][step_no]"
                  style="font-size:0.95rem"
                ></v-textarea>
              </div>
              <v-icon class="mx-4 my-2" v-if="panel_select[list_current_step][step_no]">mdi-checkbox-marked-circle</v-icon>
            </div>
            
          </div>
        </v-card>
      </v-col>
    </v-row>
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
export default {
  name: 'List1',
  inject: ['reload'],
  components: {
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
    //test
    window.scrollTo(0, 0);
  },

  methods: {
    ...mapMutations([
      'selectAllPanel',
      'togglePanel',
      'setListStep',
      'selectAllPanel',
      'switchBtnUnselect',
    ]),
    check: function(e) {
      e.cancelBubble = true;
    },
    nextStep (n) {
      this.setListStep(n+1);
      this.reload();
    },

    lastStep (n) {
      this.setListStep(n-1);
      this.reload();
    },
    itemIsTrue(value){
        return value;
      }
  },
};
</script>

<style src="../../css/mycss.css"/>