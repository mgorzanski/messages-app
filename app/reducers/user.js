//import { Object } from "core-js";

const initialState = {};

export const user = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, data: action.user };
		case 'LOGOUT':
			// return Object.assign({}, state, {
			// 	data: null
			// });
			return { ...state, data: null };
		default:
			return state;
	}
};