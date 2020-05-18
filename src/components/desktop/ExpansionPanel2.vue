<template>
  <v-card
    class="mb-12"
    elevation="0">
      <h2 class="my-4">{{$t('guide.text_content['+step+'].title_text')}}</h2>
      <div v-html="$t('guide.text_content['+step+'].intro_text')" class="my-4"></div>
      <v-divider></v-divider>
      <div class="my-6">        
          <v-btn color="primary" class="mx-2" @click="clickAllPanel()" style="width:16%; min-width: 160px">
              <v-icon left medium color="#fff" v-if="btn_show_expand">mdi-plus</v-icon>
              <v-icon left medium v-else>mdi-minus</v-icon>
              {{btn_expand}}
          </v-btn>
          <v-btn color="primary" class="mx-2" @click="selectAllPanel(step)">
              {{$t('guide.btn_selectAll')}}
          </v-btn>
      </div>
      <v-row justify="center">
        <v-expansion-panels inset multiple focusable class="mx-4" v-model="panel_expand">
          <v-expansion-panel
            v-for="(item,step_no) in substeps[step]"
            :key="step_no"
            >
            <v-expansion-panel-header class="py-0">
              <v-checkbox
                  v-model="panel_select[step][step_no]"
                  @click.native="check($event)"
                ></v-checkbox>
                <span>
                {{$t('guide.text_content['+step+'].subheader_text['+step_no+']')}}
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-4">
              <div v-html="$t('guide.text_content['+step+'].guide_text['+step_no+']')"></div>
              <v-divider class="my-6"></v-divider>
              <div class="mt-4 mb-0">
                <v-textarea
                  outlined
                  auto-grow
                  name="input-7-4"
                  :label="$t('guide.txt_instrHint')"
                  v-model="panel_comment[step][step_no]"
                ></v-textarea>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
  </v-card>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
export default {
  name: 'Panel2',

  components: {
  },

  data: () => ({
    step: 1,
    panel_expand : [],
    btn_expand : "",
    btn_show_expand : true,
  }),

  computed:{
    ...mapState([
      'substeps',
      'panel_comment',
      'panel_select'])
  },

  watch: {
  },

  mounted:function(){
    this.panel_expand = new Array(this.substeps[this.step]).fill(false);
    this.btn_expand = this.$t('guide.btn_expandAll');
  },

  methods: {
      ...mapMutations([
            'selectAllPanel',
          ]),
      check: function(e) {
        e.cancelBubble = true;
      },
      clickAllPanel() {
        if(this.btn_show_expand){
          this.panel_expand = [...Array(this.substeps[this.step]).keys()].map((k, i) => i);
          this.btn_expand = this.$t('guide.btn_collapseAll');
          this.btn_show_expand = false;
        }else{
          this.panel_expand = [];
          this.btn_expand = this.$t('guide.btn_expandAll');
          this.btn_show_expand = true;
        }
        
      },
    },
};
</script>

<style src="../../css/mycss.css"/>