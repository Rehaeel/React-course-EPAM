import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useHistory,
} from 'react-router-dom';

import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { mockedAuthorsList, mockedCoursesList } from './constants';

function App() {
	const history = useHistory();

	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [userName, setUserName] = useState('');

	const [isLogged, setIsLogged] = useState(
		Boolean(window.localStorage.getItem('token'))
	);

	const onCreateCourse = (course) => {
		if (coursesList.includes(course)) setCoursesList((oldList) => [...oldList]);
		// because of task to add to mockedCourseList - check if exist
		else setCoursesList((oldList) => [...oldList, course]);
		history.push('/courses');
	};

	const onAddAuthor = (author) => {
		if (authorsList.includes(author))
			setAuthorsList((prevList) => [...prevList]);
		//because of task to add author to mockedAuthorsList - have to check if exist
		else setAuthorsList((prevList) => [...prevList, author]);
	};

	return (
		<Router>
			<Header userName={userName} onLogout={setIsLogged} isLogged={isLogged} />
			<Switch>
				<Route exact path='/'>
					{isLogged ? <Redirect to='/courses' /> : <Redirect to='/login' />}
				</Route>
				<Route path='/registration'>
					<Registration />
				</Route>

				<Route path='/login'>
					<Login loginName={setUserName} isLogged={setIsLogged} />
				</Route>

				<Route exact path='/courses'>
					<Courses coursesList={coursesList} authorsList={authorsList} />
				</Route>

				<Route path='/courses/add'>
					<CreateCourse
						authorsList={authorsList}
						onCreateCourse={onCreateCourse}
						onAddAuthor={onAddAuthor}
					/>
				</Route>

				<Route path='/courses/:courseId'>
					<CourseInfo />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
