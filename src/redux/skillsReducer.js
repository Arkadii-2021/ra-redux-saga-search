import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "skills",
	initialState: {
		items: [],
		loading: false,
		error: null,
		search: ''
	},
	reducers: {
		searchSkillsRequest(state) { // search
			return { ...state, loading: true, error: null }
		},
		searchSkillsFailure(state, { payload }) { // error
			const error = payload
			return { ...state, loading: false, error}  
		},
		searchSkillsSuccess(state, { payload }) { // items
			const items = payload
			return { ...state, items, loading: false, error: null }
		},
		changeSearchField(state, { payload }) {  // search
			const search = payload
			return { ...state, search }
		}
	}
})

export const actions = searchSlice.actions
export default searchSlice.reducer

