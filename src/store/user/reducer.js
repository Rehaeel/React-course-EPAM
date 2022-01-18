import * as actions from './actionTypes';

const userInitialState = {
	isAuth: window.localStorage.getItem('token') ? true : false,
	name: '',
	email: '',
	token: window.localStorage.getItem('token') ?? '',
	role: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actions.LOG_IN:
			return {
				...state,
				isAuth: true,
				email: action.payload.email,
				token: action.payload.token,
				name: action.payload.name,
			};
		case actions.LOG_OUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		case actions.GET_USER:
			return {
				...state,
				role: action.payload.role,
			};
		default:
			return state;
	}
};
