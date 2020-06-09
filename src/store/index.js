import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

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
		stepper_current_step: 1,
		list_current_step: 0,
	},
	mutations: {
		// Set if the device is mobile or desktop
		setMobileDevice(state, isMobile){
			Vue.set(state, 'is_mobile', isMobile);
		},
		// Select or unselect a single recommendation at data.step.substep
		togglePanel(state, data){
			Vue.set(state.panel_select[data.step], data.substep, !state.panel_select[data.step][data.substep]);
		},
		// Select a single recommendation at data.step.substep
		selectPanel(state, data){
			Vue.set(state.panel_select[data.step], data.substep, true);
		},
		// Select or unselect all recommendations in step n, based on btn_show_unselect[n]
		selectAllPanel(state, n) {
			if(state.btn_show_unselect[n]){
				Vue.set(state.panel_select, n, new Array(state.substeps[n]).fill(false));
			}else{
				Vue.set(state.panel_select, n, new Array(state.substeps[n]).fill(true));
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
		setDiagramData(state, data) {
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
		// set desktop stepper step, start from 1.
		setStepperStep(state, step){
			Vue.set(state, 'stepper_current_step', step);
		},
		// set mobile list step, start from 0.
		setListStep(state, step){
			Vue.set(state, 'list_current_step', step);
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