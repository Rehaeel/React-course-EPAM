import { authorsInitialState, authorsReducer } from '../authors/reducer';
import {
	actionAddCourse,
	actionFetchAllCourses,
} from '../courses/actionCreators';
import { coursesInitialState, coursesReducer } from '../courses/reducer';
import { userInitialState, userReducer } from '../user/reducer';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import axios from 'axios';

const prevState = [];
const course = {
	title: 'title',
	description: 'descrition',
	duration: 0,
	creationDate: '01/01/2001',
	authors: [],
};
const handlers = [
	rest.get('/api/courses', (_, res, ctx) =>
		res(ctx.json([course]), ctx.delay(150))
	),
];
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('User reducer should return the initial state', () => {
	expect(userReducer(undefined, {})).toEqual(userInitialState);
});

test('Authors reducer should return the initial state', () => {
	expect(authorsReducer(undefined, {})).toEqual(authorsInitialState);
});

test('Courses reducer should return the initial state', () => {
	expect(coursesReducer(undefined, {})).toEqual(coursesInitialState);
});

test('Courses reducer should handle SAVE_COURSE and returns new state', () => {
	expect(coursesReducer(prevState, actionAddCourse(course))).toEqual([course]);
});
test('Courses reducer should handle GET_COURSES and returns new state', async () => {
	const coursesList = await axios.get('/api/courses');

	expect(
		coursesReducer(prevState, actionFetchAllCourses(coursesList.data))
	).toEqual([course]);
});
