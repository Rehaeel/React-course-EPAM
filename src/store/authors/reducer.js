import * as actions from './actionTypes';

export const authorsInitialState = [{ id: '', name: '' }];

const isPresent = (state, author) =>
	state.indexOf((auth) => auth.name === author.name) !== -1;

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actions.FETCH_ALL:
			return action.payload;

		case actions.CREATE_AUTHOR: {
			if (isPresent(state, action.payload)) return state;

			return [...state, action.payload];
		}

		default:
			return state;
	}
};
