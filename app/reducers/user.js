const initialState = {};

export const user = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, data: action.user };
		default:
			return state;
	}
};