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
		panel_read: [
			[false, false, false, false, false, false, false, false],
			[false, false, false],
			[false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false, false]
		],
		panel_comment: [
			["", "", "", "", "", "", "", ""],
			["", "", ""],
			["", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", ""]
		],
		panel_progress: [0, 0, 0, 0],
		diagram_data: "",
		diagram_title: "",
		diagram_width: 0,
		diagram_height: 0,
		test:""
	},
	mutations: {
		clickPanel(state, data){
			Vue.set(state.panel_select[data.step], data.substep, !state.panel_select[data.step][data.substep])
		},
		readAllPanel(state, n) {
			Vue.set(state.panel_read, n, new Array(state.substeps[n]).fill(true));
			Vue.set(state.panel_progress, n, 100);
		},
		selectAllPanel(state, n) {
			Vue.set(state.panel_select, n, new Array(state.substeps[n]).fill(true));
			Vue.set(state.panel_read, n, new Array(state.substeps[n]).fill(true));
			Vue.set(state.panel_progress, n, 100);
		},
		progressIncrement(state, n) {
			Vue.set(state.panel_progress, n, state.panel_progress[n] + 100.0 / state.substeps[n]);
		},
		progressFinished(state, n) {
			Vue.set(state.panel_progress, n, 100);
		},
		saveDiagramData(state, data) {
			Vue.set(state, 'diagram_data', data);
		},
		updateTest(state, data){
			Vue.set(state, 'test', data);
		},
		storeDiagramSize(state, data){
			Vue.set(state, 'diagram_height', data.height);
			Vue.set(state, 'diagram_width', data.width);
		},
		storeDiagramTitle(state, data){
			Vue.set(state, 'diagram_title', data);
		}
	},
	actions: {},

	modules: {},

	plugins: [
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