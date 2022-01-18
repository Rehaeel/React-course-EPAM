import { authorsInitialState, authorsReducer } from '../authors/reducer';
import { coursesInitialState, coursesReducer } from '../courses/reducer';
import { userInitialState, userReducer } from '../user/reducer';

////////////////////////// attempt 1

// test('Authors reducer should return the initial state', () => {
// 	expect(authorsReducer(undefined, {})).toEqual(authorsInitialState);
// });

// test('Courses reducer should return the initial state', () => {
// 	expect(coursesReducer(undefined, {})).toEqual(coursesInitialState);
// });

// test('User reducer should return the initial state', () => {
// 	expect(userReducer(undefined, {})).toEqual(userInitialState);
// });

////////////////////////// attempt 2

// describe('reducers test', () => {
// 	it('should return the initial authors state', () => {
// 		expect(authorsReducer(undefined, {})).toEqual(authorsInitialState);
// 	});

// 	it('should return the initial course state', () => {
// 		expect(coursesReducer(undefined, {})).toEqual(coursesInitialState);
// 	});

// 	it('should return the initial user state', () => {
// 		expect(userReducer(undefined, {})).toEqual(userInitialState);
// 	});
// });
