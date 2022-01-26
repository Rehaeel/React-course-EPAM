import axios from 'axios';
import { BACKEND_URL } from '../constants';

export const handdleError = (error) => {
	console.log(`Error: ${error.message}`);
	console.dir(error.toJSON());
};

const config = (token) => ({
	headers: {
		Authorization: token ?? window.localStorage.getItem('token'),
		'Content-Type': 'application/json',
	},
});

export const fetchCoursesQuery = () => axios.get(`${BACKEND_URL}/courses/all`);

export const fetchAuthorsQuery = () => axios.get(`${BACKEND_URL}/authors/all`);

export const fetchUserQuery = (token) =>
	axios.get(`${BACKEND_URL}/users/me`, config(token));

export const logInUserQuery = (account) =>
	axios.post(`${BACKEND_URL}/login`, account, config());

export const logOutUserQuery = (token) =>
	axios.delete(`${BACKEND_URL}/logout`, config(token));

export const deleteCourseQuery = (courseId) =>
	axios.delete(`${BACKEND_URL}/courses/${courseId}`, config());

export const createCourseQuery = (course) =>
	axios.post(`${BACKEND_URL}/courses/add`, course, config());

export const createAuthorQuery = (authorName) =>
	axios.post(`${BACKEND_URL}/authors/add`, authorName, config());

export const updateCourseQuery = (courseId, course) => {
	return axios.put(`${BACKEND_URL}/courses/${courseId}`, course, config());
};
