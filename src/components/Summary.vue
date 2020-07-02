<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10" lg="10" xl="8">
        <div class="d-flex justify-space-between my-4" style="flex-wrap:wrap">
          <v-btn text large color="primary" class="mx-2" @click="toGuidePage()">
              <v-icon left color="primary">mdi-arrow-left</v-icon>
              {{$t('summary.btn_modify')}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text large color="primary"  @click="generateImages()">
              {{$t('summary.btn_download')}}
              <v-icon right color="primary">mdi-download</v-icon>
          </v-btn>
        </div>
        <v-row justify="center">
          <v-col cols="12" sm="12" md="10" lg="10" xl="10">
            <v-alert
              text
              color="info"
              :value="download_success"
              transition="scale-transition"
            >
              <v-row
                align="center"
              >
                <v-col class="grow">{{$t('summary.download_prompt')}} </v-col>
                <v-col class="shrink">
                  <v-btn
                    color="info"
                    outlined
                    @click="toFeedbackPage"
                  >
                    {{$t('summary.btn_feedback')}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-alert>
            <div class="d-flex justify-space-between my-4" style="flex-wrap:wrap">
              <div
                class="mr-2">
                <h2>{{$t('summary.title_header')}}</h2>
                <v-text-field
                  class="my-12 mx-2"
                  outlined
                  :label="$t('summary.title_header')"
                  v-model="pdf_title"
                ></v-text-field>
              </div>
              <div>
                <h2>{{$t('summary.title_logo')}}</h2>
                <input type="file" @change="uploadImage($event)">
                <canvas id="logo_canvas" v-if="logo_uploaded"></canvas>
              </div>
            </div>
            <h2 class="my-4">{{$t('summary.title_summary')}}</h2>
            <TreeDiagram id="sum-diagram" ref="diag" v-bind:model-data="diagram_data" style=""></TreeDiagram>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import jsPDF from 'jspdf'
import $ from 'jquery'
import go from 'gojs'
import TreeDiagram from './TreeDiagram.vue'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Summary',

  components: {
    TreeDiagram,
  },

  data: () => ({
    pdf_title: "",
    logo_data: null,
    logo_width: 1,
    logo_height: 1,
    logo_uploaded: false,
    download_success: false
  }),

  computed:{
    ...mapState([
      'diagram_data',
      'diagram_height',
      'diagram_width',
      'diagram_title'])
  },

  mounted: function() {
    this.pdf_title = this.$t('summary.default_pdf_title');
  },
  
  methods: {
    ...mapMutations([
      'setStepperStep',
    ]),

    toGuidePage() {
      this.setStepperStep(0);
      this.$router.push('/guide');
    },

    uploadImage(e){
      this.logo_uploaded = true;
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      var reader = new FileReader();
      var self = this;
      reader.onload = (e) => {
        this.drawImage(self, e.target.result);
      };
      reader.readAsDataURL(files[0]);
    },

    drawImage(self, image_src) {
      var image = new Image();
      image.src = image_src;
      image.onload = function(){
        self.logo_height = image.height;
        self.logo_width = image.width;
        var canvas = $('#logo_canvas')[0];
        var context = canvas.getContext('2d');
        canvas.height = 150;
        canvas.width = canvas.height*image.width/image.height;
        context.drawImage(image, 0, 0, image.width, image.height, 
          0, 0, canvas.width, canvas.height);
        self.logo_data = canvas.toDataURL('image/png');
      }
    },

    generateImages() {
      var pageData = this.$refs.diag.diagram.makeImage({
        scale: 1,
        type: "image / jpeg",
        background: "white",
        maxSize: new go.Size(Infinity, Infinity),
        details: 1
      });
      var margin = 30;

      var contentWidth = this.diagram_width;
      var contentHeight = this.diagram_height;

      var imgWidth = 210 - 2*margin; 
      var pageHeight = 295;  
      var imgHeight = contentHeight * imgWidth / contentWidth;
      var heightLeft = imgHeight;

      var doc = new jsPDF('p', 'mm');
      var position = 40;

      //print logo
      if(this.logo_data!==null){
        var logo_height_inpdf = 20;
        var logo_width_inpdf = logo_height_inpdf * this.logo_width / this.logo_height;
        doc.addImage(this.logo_data, "JPEG", 20, 2, logo_width_inpdf, logo_height_inpdf);
      }

      //print title
      var title = doc.splitTextToSize(this.pdf_title, 100)
      doc.setFontType("bold"); 
      doc.setFont("arial");
      doc.setFontSize(24);
      doc.text(this.logo_data===null?30:(30+logo_width_inpdf), 15, title);

      //print diagram
      doc.addImage(pageData, 'PNG', margin, position, imgWidth, imgHeight);

      heightLeft -= pageHeight - position;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(pageData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Guide_Diagram.pdf');
      this.download_success = true;
    },

    toFeedbackPage(){
      this.$router.push('/feedback');
    }
  }
};
</script>