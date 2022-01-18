import * as queries from '../services';
import * as actions from './actionCreators';

export const deleteCourseThunk = (courseId) => async (dispatch, _) => {
	return await queries
		.deleteCourseQuery(courseId)
		.then((res) => {
			if (res.data.successful) dispatch(actions.actionDeleteCourse(courseId));
			return res;
		})
		.catch(queries.handdleError);
};

export const addCourseThunk = (course) => async (dispatch, _) => {
	return await queries
		.createCourseQuery(course)
		.then((res) => res.data.result)
		.then((course) => dispatch(actions.actionAddCourse(course)));
};

export const updateCourseThunk = (courseId, course) => async (dispatch, _) => {
	return await queries
		.updateCourseQuery(courseId.courseId, course)
		.then((res) => res.data.result)
		.then((course) => dispatch(actions.actionUpdateCourse(course)));
};
