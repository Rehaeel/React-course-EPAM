import * as actions from './actionTypes';

export const actionLogIn = (email, token, name) => ({
	type: actions.LOG_IN,
	payload: {
		email: email,
		token: token,
		name: name,
	},
});

export const actionLogOut = () => ({
	type: actions.LOG_OUT,
});

export const actionSetUser = (role) => ({
	type: actions.GET_USER,
	payload: {
		role: role,
	},
});
