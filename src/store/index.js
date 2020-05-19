import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
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
		// The diagram data.
		diagram_data: "",
		diagram_title: "",
		diagram_width: 0,
		diagram_height: 0,
		stepper_cur_step: 1,
	},
	mutations: {
		// Select or unselect a single recommendation at data.step.substep
		selectPanel(state, data){
			Vue.set(state.panel_select[data.step], data.substep, !state.panel_select[data.step][data.substep])
		},
		// Select all recommendations in step n.
		selectAllPanel(state, n) {
			Vue.set(state.panel_select, n, new Array(state.substeps[n]).fill(true));
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
			Vue.set(state.btn_show_collapse, n, !state.btn_show_collapse[n]);
		},
		// Save the diagram data using map.
		saveDiagramData(state, data) {
			Vue.set(state, 'diagram_data', data);
		},
		// Save the diagram size.
		storeDiagramSize(state, data){
			Vue.set(state, 'diagram_height', data.height);
			Vue.set(state, 'diagram_width', data.width);
		},
		// Save the diagram title.
		storeDiagramTitle(state, data){
			Vue.set(state, 'diagram_title', data);
		},
		//save stepper step
		saveStepperStep(state, step){
			Vue.set(state, 'stepper_cur_step', step);
		}
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