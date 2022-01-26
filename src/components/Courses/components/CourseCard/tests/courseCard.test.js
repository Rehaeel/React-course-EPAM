import { cleanup, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseCard from '../CourseCard';
import { Provider } from 'react-redux';

const course = {
	title: 'title',
	description: 'descrition',
	duration: 120,
	creationDate: '01/01/2001',
	authors: ['123'],
	id: Math.random().toString(),
};

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [course],
	authors: [{ id: '123', name: 'author' }],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

beforeEach(() => {
	render(
		<Provider store={mockedStore}>
			<CourseCard course={mockedStore.getState().courses[0]} />
		</Provider>
	);
});

afterEach(cleanup);

test('CourseCard should display title', () => {
	expect(screen.getByTestId('course-title')).toBeInTheDocument();
});

test('CourseCard should display description', () => {
	expect(screen.getByTestId('course-description')).toBeInTheDocument();
});

test('CourseCard should display duration in the correct format', () => {
	expect(screen.getByTestId('course-duration').outerHTML).toMatch(
		' 02:00 hours'
	);
});

test('CourseCard should display authors list', () => {
	expect(
		within(screen.getByTestId('course-authors')).getByText(
			mockedState.authors[0].name
		)
	).toBeInTheDocument();
});

test('CourseCard should display created date in the correct format', () => {
	expect(screen.getByTestId('course-created-date').outerHTML).toMatch(
		'01.01.2001'
	);
});
