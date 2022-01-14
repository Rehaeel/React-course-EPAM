import * as actions from './actionTypes';

export const actionFetchAllAuthors = (authorsList) => ({
	type: actions.FETCH_ALL,
	payload: authorsList,
});

export const actionAddAuthor = (author) => ({
	type: actions.CREATE_AUTHOR,
	payload: author,
});
