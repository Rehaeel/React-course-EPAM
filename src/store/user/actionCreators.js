import * as actions from './actionTypes';

export const actionLogIn = (name, email, token) => ({
	type: actions.LOG_IN,
	payload: {
		name: name,
		email: email,
		token: token,
	},
});

export const actionLogOut = () => ({
	type: actions.LOG_OUT,
});
