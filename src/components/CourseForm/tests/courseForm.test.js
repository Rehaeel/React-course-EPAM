import * as ReactRedux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen, within } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';

import CourseForm from '../CourseForm';
import * as constants from '../../../constants';
import { coursesReducer } from '../../../store/courses/reducer';
import { authorsReducer } from '../../../store/authors/reducer';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({ courseId: '98765' }),
}));

const course = {
	title: 'title',
	description: 'descrition',
	duration: 120,
	creationDate: '01/01/2001',
	authors: ['123'],
	id: '98765',
};

const preloadedState = {
	courses: [course],
	authors: [
		{ name: 'author', id: '123' },
		{ name: 'author2', id: '1234' },
	],
};

const store = configureStore({
	reducer: {
		courses: coursesReducer,
		authors: authorsReducer,
	},
	preloadedState,
});

beforeEach(() => {
	render(
		<ReactRedux.Provider store={store}>
			<CourseForm />
		</ReactRedux.Provider>
	);
});

afterEach(cleanup);

test('CourseForm should show authors lists (all and course authors).', () => {
	const authorsList = within(screen.getByTestId('authors')).queryAllByText(
		constants.BUTTON_ADD_AUTHOR
	);

	expect(authorsList.length).toBe(1);
});

test("CourseForm 'Create author' click button should add author to authors list.", () => {
	userEvent.type(
		screen.getByPlaceholderText(constants.PLACEHOLDER_ADD_AUTHOR_NAME),
		'New author'
	);

	userEvent.click(screen.getByText(constants.BUTTON_CREATE_AUTHOR));

	const authorsList = screen.queryAllByText(constants.BUTTON_ADD_AUTHOR);

	expect(authorsList.length).toBe(2);
});

test("CourseForm 'Add author' button click should add an author to course authors list.", () => {
	const addedAuthor = { name: 'New Author', id: '12345' };

	userEvent.type(
		screen.getByPlaceholderText(constants.PLACEHOLDER_ADD_AUTHOR_NAME),
		addedAuthor.name
	);

	userEvent.click(screen.getByText(constants.BUTTON_CREATE_AUTHOR));

	const courseAuthorsList = screen.queryAllByText(
		constants.BUTTON_DELETE_AUTHOR
	);

	expect(courseAuthorsList.length).toBe(1);
});

test("CourseForm 'Delete author' button click should delete an author from the course list.", () => {
	useEvent.click(screen.getByText(constants.BUTTON_DELETE_AUTHOR));

	const courseAuthorsList = screen.queryAllByText(
		constants.BUTTON_DELETE_AUTHOR
	);
	expect(courseAuthorsList.length).toBe(0);
});
