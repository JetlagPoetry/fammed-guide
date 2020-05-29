<template>
  <v-container>
    <v-row style="text-align: center;">
      <div style="width:95vw; margin-left:auto; margin-right:auto">
        <v-btn large color="primary" class="mx-4 my-2" style="width:80vw" @click="toGuide()">
          <v-icon left color="#fff">mdi-arrow-left</v-icon>
          {{$t('summary.btn_modify')}}
        </v-btn>
        <v-btn large color="primary" class="mx-4 my-2" style="width:80vw" @click="generateImages()">
          {{$t('summary.btn_download')}}
          <v-icon right color="#fff">mdi-arrow-right</v-icon>
        </v-btn>
        <v-text-field
          class="my-4 mx-4"
          :label="$t('summary.title_header')"
          single-line
          v-model="group_name"
        ></v-text-field>
        <div v-show="false">
          <h2>{{$t('summary.title_logo')}}</h2>
          <canvas id="logo_canvas"></canvas>
        </div>
        <h2 class="my-4 mx-4" style="text-align: left;">{{$t('summary.title_summary')}}</h2>
        <TreeDiagram ref="diag" v-bind:model-data="diagram_data" style="background-color: #fff; width: 100%;"></TreeDiagram>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import jsPDF from 'jspdf'
import $ from 'jquery'
import go from 'gojs'
import TreeDiagram from '../desktop/TreeDiagram.vue'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Summary',

  components: {
    TreeDiagram,
  },

  data: () => ({
    group_name: "",
    prefix:"OPR plan",
    logo_default: require('../../assets/logo.png'),
    logo_data: "",
    logo_width: 20,
    logo_height: 20
  }),

  computed:{
    ...mapState([
      'is_mobile',
      'diagram_data',
      'diagram_height',
      'diagram_width',
      'diagram_title'])
  },

  mounted: function() {
    this.drawImage(this, this.logo_default);
  },
  
  methods: {
    ...mapMutations([
      'setListStep',
    ]),

    toGuide() {
      this.setListStep(0);
      this.$router.push('/mobile/guide');
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
      var logo_height_inpdf = 20;
      var logo_width_inpdf = logo_height_inpdf * this.logo_width / this.logo_height;
      doc.addImage(this.logo_data, "JPEG", 20, 2, logo_width_inpdf, logo_height_inpdf);

      //print title
      var title = this.prefix+(this.group_name===""?'':' - ')+this.group_name;
      var header = doc.splitTextToSize(title, 100)
      doc.setFontType("bold"); 
      doc.setFont("times");
      doc.setFontSize(24);
      doc.text(30+logo_width_inpdf, 15, header);

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
    }
  }
};
</script>