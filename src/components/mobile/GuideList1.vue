<template>
  <v-container>
    <h2 class="my-4">{{$t('guide.text_content['+step+'].title_text')}}</h2>
    <div v-html="$t('guide.text_content['+step+'].intro_text')" class="my-4"></div>
    <v-btn color="primary" class="mx-2" @click="selectAllPanel(step)">
        {{$t('guide.btn_selectAll')}}
    </v-btn>
    <v-row>
      <v-col
        v-for="(item,step_no) in substeps[step]"
        :key="step_no"
        cols="12">
        <v-card 
          elevation="4" 
          :dark="panel_select[step][step_no]"
          @click="clickPanel({step:step, substep:step_no})"
           >
          <div class="flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                style="line-height:1.2; font-size:1.1rem">
                {{$t('guide.text_content['+step+'].subheader_text['+step_no+']')}}
              </v-card-title>
              <v-card-subtitle
                class="mx-2 my-1 py-0"
                style="line-height:1.2; font-size:0.9rem"
                v-html="$t('guide.text_content['+step+'].guide_text['+step_no+']')">
              </v-card-subtitle >
              <div class="mt-4 mb-0 mx-4">
                <v-textarea
                  :label="$t('guide.txt_instrHint')"
                  outlined
                  auto-grow
                  @click.native="check($event)"
                  rows="4"
                  row-height="16"
                  v-model="panel_comment[step][step_no]"
                  style="font-size:0.95rem"
                ></v-textarea>
              </div>
              <v-icon class="mx-4 my-2" v-if="panel_select[step][step_no]">mdi-checkbox-marked-circle</v-icon>
            </div>
            
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex justify-content-start my-4" style="width:100%">
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        class="mx-2"
        @click="nextStep()">
        {{$t('guide.btn_next')}}
        <v-icon right color="white">mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
export default {
  name: 'List1',

  components: {
  },

  data: () => ({
    step: 0,
  }),

  computed:{
    ...mapState([
      'substeps',
      'panel_comment',
      'panel_select',])},

  watch: {
  },

  mounted:function(){
  },

  methods: {
    ...mapMutations([
          'selectAllPanel',
          'clickPanel'
        ]),
    check: function(e) {
      e.cancelBubble = true;
    },
    nextStep(){
      this.$router.push('/list2');
    }
  },
};
</script>

<style src="../../css/mycss.css"/>