import * as actions from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actions.FETCH_ALL:
			return action.payload;

		case actions.ADD_COURSE:
			return [...state, action.payload];

		case actions.DELETE_COURSE:
			return [...state].filter((course) => course.id !== action.payload);

		case actions.UPDATE_COURSE:
			return [...state].map((course) => {
				if (course.id !== action.payload.id) return course;

				return action.payload;
			});

		default:
			return state;
	}
};
