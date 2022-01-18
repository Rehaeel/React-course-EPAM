import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import ScrollToTop from './helpers/ScrollToTop';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';

import { actionFetchAllAuthors } from './store/authors/actionCreators';
import { actionFetchAllCourses } from './store/courses/actionCreators';
import * as queries from './store/services';
import { getCurrentUserThunk } from './store/user/thunk';

function App() {
	const dispatch = useDispatch();

	const token = window.localStorage.getItem('token');
	const hasToken = Boolean(token);

	useEffect(() => {
		if (hasToken) {
			dispatch(getCurrentUserThunk(token)).catch(queries.handdleError);

			queries
				.fetchedCoursesQuery()
				.then((res) => dispatch(actionFetchAllCourses(res.data.result)))
				.catch(queries.handdleError);
			queries
				.fetchedAuthorsQuery()
				.then((res) => {
					dispatch(actionFetchAllAuthors(res.data.result));
				})
				.catch(queries.handdleError);
		}
	}, [hasToken, dispatch, token]);

	return (
		<Router>
			<ScrollToTop />
			<Header />
			<Switch>
				<Route exact path='/'>
					{hasToken ? <Redirect to='/courses' /> : <Redirect to='/login' />}
				</Route>
				<Route path='/registration'>
					<Registration />
				</Route>

				<Route path='/login'>
					<Login />
				</Route>

				<Route exact path='/courses'>
					<Courses />
				</Route>

				<PrivateRoute exact path='/courses/add' component={CourseForm} />
				<PrivateRoute
					exact
					path='/courses/update/:courseId'
					component={CourseForm}
				/>

				<Route path='/courses/:courseId'>
					<CourseInfo />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
