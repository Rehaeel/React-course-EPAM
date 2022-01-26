import { actionFetchAllAuthors } from '../authors/actionCreators';
import { actionFetchAllCourses } from '../courses/actionCreators';
import * as queries from '../services';
import { actionLogIn, actionLogOut, actionSetUser } from './actionCreators';

export const getCurrentUserThunk = (token) => async (dispatch, _) => {
	return await queries
		.fetchUserQuery(token)
		.then((res) => res.data.result)
		.then((user) => {
			dispatch(actionSetUser(user.role));
			dispatch(actionLogIn(user.email, token, user.name));
		});
};

export const logInUserThunk = (account) => async (dispatch, _) => {
	return await queries
		.logInUserQuery(account)
		.then((res) => {
			const token = res.data.result;

			window.localStorage.setItem('token', token);
			return token;
		})
		.then((token) => dispatch(getCurrentUserThunk(token)))
		.then(() => queries.fetchCoursesQuery())
		.then((res) => dispatch(actionFetchAllCourses(res.data.result)))
		.then(() => queries.fetchAuthorsQuery())
		.then((res) => dispatch(actionFetchAllAuthors(res.data.result)));
};

export const logOutUserThunk = (token) => async (dispatch, _) => {
	return await queries.logOutUserQuery(token).then(() => {
		dispatch(actionLogOut());
		window.localStorage.removeItem('token');
	});
};
