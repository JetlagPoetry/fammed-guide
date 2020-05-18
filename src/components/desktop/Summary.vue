<template>
  <v-container>
    <v-row justify="center">
      <div class="mt-6 px-12" style="width:90%; max-width:1400px">
        <div class="d-flex justify-content-start my-4" style="width:100%">
          <v-btn text large color="primary" class="mx-2" @click="toGuidePage()">
              <v-icon left color="primary">mdi-arrow-left</v-icon>
              {{$t('summary.btn_modify')}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text class="mx-2" large color="primary"  @click="generateImages()">
              {{$t('summary.btn_download')}}
              <v-icon right color="primary">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <h2 class="my-4 mx-6">{{$t('summary.title_summary')}}</h2>
        <v-divider class="ma-6"></v-divider>
        <diagram2 class="mx-6" ref="diag" v-bind:model-data="diagram_data" style="background-color: #fff; width: 100%;"></diagram2>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import jsPDF from 'jspdf'
// import html2pdf from 'html2pdf'
import go from 'gojs'
import Diagram2 from './Diagram2.vue'
import {mapState} from 'vuex'

export default {
  name: 'Summary',

  components: {
    Diagram2,
  },

  data: () => ({

  }),

  computed:{
    ...mapState([
      'diagram_data',
      'test',
      'diagram_height',
      'diagram_width',
      'diagram_title'])
  },

  mounted: function() {

  },
  
  methods: {
    toGuidePage() {
      this.$router.push('/guide');
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

      var title = doc.splitTextToSize(this.diagram_title, 180);
      doc.text(15, 20, title);
      // doc.setFontSize(20);
      // doc.text(20, 20, );

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