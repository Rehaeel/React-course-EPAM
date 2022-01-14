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
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import ScrollToTop from './helpers/ScrollToTop';

import { actionFetchAllAuthors } from './store/authors/actionCreators';
import { actionFetchAllCourses } from './store/courses/actionCreators';
import { fetchedAuthors, fetchedCourses } from './store/services';

function App() {
	const dispatch = useDispatch();

	const hasToken = Boolean(window.localStorage.getItem('token'));

	useEffect(() => {
		if (hasToken) {
			fetchedCourses.then((res) =>
				dispatch(actionFetchAllCourses(res.data.result))
			);
			fetchedAuthors.then((res) => {
				dispatch(actionFetchAllAuthors(res.data.result));
			});
		}
	}, []);

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

				<Route path='/courses/add'>
					<CreateCourse />
				</Route>

				<Route path='/courses/:courseId'>
					<CourseInfo />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
