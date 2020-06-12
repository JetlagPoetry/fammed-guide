import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import i18n from '../i18n';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		is_mobile: false,
		substeps: [8, 3, 4, 11],
		panel_select: [
			[false, false, false, false, false, false, false, false],
			[false, false, false],
			[false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false]
		],
		panel_expand: [
			[],[],[],[]
		],
		panel_comment: [
			["", "", "", "", "", "", "", ""],
			["", "", ""],
			["", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", ""]
		],
		btn_show_collapse: [false, false, false, false],
		btn_show_unselect: [false, false, false, false],
		// The diagram data.
		diagram_data: "",
		diagram_title: "",
		diagram_width: 0,
		diagram_height: 0,
		stepper_current_step: 1
	},
	mutations: {
		// Set if the device is mobile or desktop
		setMobileDevice(state, isMobile){
			Vue.set(state, 'is_mobile', isMobile);
		},
		// Select a single recommendation at data.step.substep
		selectPanel(state, data){
			Vue.set(state.panel_select[data.step], data.substep, true);
		},
		// Select or unselect all recommendations in step n, based on btn_show_unselect[n]
		toggleAllPanel(state, n) {
			if(state.btn_show_unselect[n]){
				Vue.set(state.panel_select, n, new Array(state.substeps[n]).fill(false));
			}else{
				Vue.set(state.panel_select, n, new Array(state.substeps[n]).fill(true));
			}
		},
		// Select all recommendations in all chapters
		selectAllPanel(state){
			var i;
			for(i=0; i<4; i++){
				Vue.set(state.panel_select, i, new Array(state.substeps[i]).fill(true));
			}
		},
		// Expand or fold all recommendations in step n, based on btn_show_collapse[n]
		expandAllPanel(state, n){
			if(state.btn_show_collapse[n]){
				// collapse all recommendations
				Vue.set(state.panel_expand, n, []);
			}else{
				// expand all recommendations
				Vue.set(state.panel_expand, n, [...Array(state.substeps[n]).keys()].map((k, i) => i));
			}
		},
		// Switch select or unselect btn text
		switchBtnUnselect(state, data){
			Vue.set(state.btn_show_unselect, data.n, data.toUnselect);
		},
		// Switch expand or collapse btn text
		switchBtnCollapse(state, data){
			Vue.set(state.btn_show_collapse, data.n, data.toCollapse);
		},
		// Save the diagram data using map.
		setDiagramData(state) {
			var data = [];
			var i;
			var key=0;
			for(i=0; i<4; i++){

				var parent = key;
				data.push({"key":key++, "substep":i18n.t('guide.text_content['+i+'].title_text'), "isParent": true });

				var j;
				for(j=0; j < state.substeps[i]; j++){
					data.push({
						"key": key++,
						"substep": i18n.t('guide.text_content['+i+'].subheader_text['+j+']'), 
						"comment": state.panel_comment[i][j],
						"selected": state.panel_select[i][j],
						"parent": parent,
						"isParent": false,
					});
				}
			}
			Vue.set(state, 'diagram_data', data);
		},
		// Save the diagram size.
		setDiagramSize(state, data){
			Vue.set(state, 'diagram_height', data.height);
			Vue.set(state, 'diagram_width', data.width);
		},
		// Save the diagram title.
		setDiagramTitle(state, title){
			Vue.set(state, 'diagram_title', title);
		},
		// set stepper step, start from 0.
		setStepperStep(state, step){
			Vue.set(state, 'stepper_current_step', step);
		},
	},
	actions: {},

	modules: {},

	plugins: [
		// Vuex data persistancem. The diagram remains even we click 'reload the page'
		createPersistedState({
			storage: window.sessionStorage,
			reducer(val) {
				return {
					diagram_data: val.diagram_data,
					diagram_height: val.diagram_height,
					diagram_width: val.diagram_width,
				};
			}
		})
	]
})