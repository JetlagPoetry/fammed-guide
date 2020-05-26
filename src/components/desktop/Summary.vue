<template>
  <v-container>
    <v-row justify="center">
      <div class="mt-6 px-12 mx-6" style="width:90%; max-width:1400px">
        <div class="d-flex justify-content-start my-4" style="width:100%">
          <v-btn text large color="primary" class="mx-2" @click="toGuidePage()">
              <v-icon left color="primary">mdi-arrow-left</v-icon>
              {{$t('summary.btn_modify')}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text large color="primary"  @click="generateImages()">
              {{$t('summary.btn_download')}}
              <v-icon right color="primary">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        <div class="row">
            <div 
              class="mr-12"
              style="width:30%; min-width:220px">
              <h2>Add your header</h2>
              {{logo_height}}--{{logo_width}}
              <v-text-field
                class="my-6 mx-2"
                dense
                label="Group name"
                v-model="group_name"
              ></v-text-field>
            </div>  
            <div class="ml-12" >
              <h2>Upload your logo</h2>
              <input type="file" @change="uploadImage($event)">
              <v-img id="upload_logo" contain :src="image" max-height="120" max-width="400"/>
            </div>
          </div>
        <!-- <v-divider class="my-6"></v-divider> -->
        <h2 class="my-4">{{$t('summary.title_summary')}}</h2>

        <diagram2 class="mx-6" ref="diag" v-bind:model-data="diagram_data" style="background-color: #fff; width: 100%;"></diagram2>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import jsPDF from 'jspdf'
// import $ from 'jquery'
import go from 'gojs'
import Diagram2 from './Diagram2.vue'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'Summary',

  components: {
    Diagram2,
  },

  data: () => ({
    image: require("../../assets/logo.png"),
    group_name: "",
    prefix:"OPR plan",
    logo_width: 20,
    logo_height: 20
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
    ...mapMutations([
      'saveStepperStep',
    ]),

    toGuidePage() {
      this.saveStepperStep(1);
      this.$router.push('/guide');
    },

    uploadImage(e){
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      var reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      
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
      var logo_width_inpdf = 20 * this.logo_width / this.logo_height;
      doc.addImage(this.image, "JPEG", 20, 2, logo_width_inpdf, logo_height_inpdf);

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