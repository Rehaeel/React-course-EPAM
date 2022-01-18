import * as queries from '../services';
import { actionAddAuthor } from './actionCreators';

export const addAuthorThunk = (authorName) => async (dispatch, _) => {
	return await queries.createAuthorQuery(authorName).then((res) => {
		if (res.data.successful) dispatch(actionAddAuthor(res.data.result));
		return res.data.result;
	});
};
