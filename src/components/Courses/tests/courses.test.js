import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Courses from '../Courses';
import { Provider } from 'react-redux';
import { BUTTON_ADD_NEW_COURSE } from '../../../constants';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch } from 'react-router-dom';
import CourseForm from '../../CourseForm/CourseForm';
import userEvent from '@testing-library/user-event';

const course = {
	title: 'title',
	description: 'descrition',
	duration: 0,
	creationDate: '01/01/2001',
	authors: [],
	id: Math.random().toString(),
};

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'admin',
	},
	courses: [course],
	authors: [],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

afterEach(cleanup);

test('Courses should display amount of CourseCard equal length of courses array', () => {
	render(
		<Provider store={mockedStore}>
			<Courses />)
		</Provider>
	);

	expect(screen.queryAllByTestId('course-card').length).toEqual(
		mockedState.courses.length
	);
});
test('Courses should display Empty container if courses array length is 0', () => {
	const mockedStateV2 = { ...mockedState, courses: [] };
	const mockedStoreV2 = { ...mockedStore, getState: () => mockedStateV2 };

	render(
		<Provider store={mockedStoreV2}>
			<Courses />
		</Provider>
	);

	expect(screen.queryByTestId('course-card')).not.toBeInTheDocument();
});
test('CourseForm should be showed after a click on a button "Add new course"', async () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses />
				<Switch>
					<Route exact path='/courses/add'>
						<CourseForm />
					</Route>
				</Switch>
			</Provider>
		</BrowserRouter>
	);

	const courseForm = screen.findByTestId('course-form');

	userEvent.click(screen.getByText(BUTTON_ADD_NEW_COURSE));

	expect(await courseForm).toBeInTheDocument();
});
