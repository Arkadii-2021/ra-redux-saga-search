import {takeLatest, put, spawn, debounce, retry} from 'redux-saga/effects';
import { actions } from "../redux/skillsReducer";
import { searchSkills } from "../api";


function filterChangeSearchAction({type, payload}) {
	return type === actions.changeSearchField.type && payload.trim() !== '';
};

// worker
function* handleChangeSearchSaga(action) {
	yield put(actions.searchSkillsRequest(action.payload));
};

// watcher
function* watchchangeSearchSaga() {
	yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga)
};

function* watchSearchSkillsSaga() {
	yield takeLatest(actions.searchSkillsRequest.type, handleSearchSkillsSaga)
};

function* handleSearchSkillsSaga(action) {
	try {
		const retryCount = 3;
		const retryDelay = 1 * 1000; // ms
		const data = yield retry(retryCount, retryDelay, searchSkills, action.payload);
		yield put(actions.searchSkillsSuccess(data));
	} catch (e) {
		yield put(actions.searchSkillsFailure(e.message));
	}
};

export default function* saga() {
	yield spawn(watchchangeSearchSaga);
	yield spawn(watchSearchSkillsSaga);
};
