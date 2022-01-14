import * as actions from './actionTypes';

const userInitialState = {
	isAuth: window.localStorage.getItem('token') ? true : false,
	name: window.localStorage.getItem('name') ?? '',
	email: '',
	token: window.localStorage.getItem('token') ?? '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actions.LOG_IN:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		case actions.LOG_OUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
};
