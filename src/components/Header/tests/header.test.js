import { render, screen, cleanup } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

const mockedState = { user: { isAuth: true, name: 'Test Name' } };
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

afterEach(cleanup);

test('Header should contain logo img', async () => {
	render(
		<Provider store={mockedStore}>
			<Header />
		</Provider>
	);

	expect(await screen.findByRole('img')).toBeInTheDocument();
});

test('Header should contain user name', async () => {
	render(
		<Provider store={mockedStore}>
			<Header />
		</Provider>
	);

	expect(await screen.findByText(mockedState.user.name)).toBeInTheDocument();
});

test('Header should not render name if user not authorised', async () => {
	const mockedStateV2 = { user: { isAuth: false, name: '' } };
	const mockedStoreV2 = { ...mockedStore, getState: () => mockedStateV2 };

	render(
		<Provider store={mockedStoreV2}>
			<Header />
		</Provider>
	);

	expect(screen.queryByText(mockedState.user.name)).not.toBeInTheDocument();
});
