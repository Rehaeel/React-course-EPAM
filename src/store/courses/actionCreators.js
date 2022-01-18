import * as actions from './actionTypes';

export const actionFetchAllCourses = (coursesList) => ({
	type: actions.FETCH_ALL,
	payload: coursesList,
});

export const actionAddCourse = (course) => ({
	type: actions.ADD_COURSE,
	payload: course,
});

export const actionDeleteCourse = (courseId) => ({
	type: actions.DELETE_COURSE,
	payload: courseId,
});

export const actionUpdateCourse = (course) => ({
	type: actions.UPDATE_COURSE,
	payload: course,
});
