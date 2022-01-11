import { useState } from 'react';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import { mockedAuthorsList, mockedCoursesList } from './constants';

function App() {
	const [courseRender, setCourseRender] = useState(true);
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);

	function showAddCourse() {
		setCourseRender(!courseRender);
	}

	const onCreateCourse = (course) => {
		showAddCourse();

		if (coursesList.includes(course)) setCoursesList((oldList) => [...oldList]);
		// because of task to add to mockedCourseList - check if exist
		else setCoursesList((oldList) => [...oldList, course]);
	};

	const onAddAuthor = (author) => {
		if (authorsList.includes(author))
			setAuthorsList((prevList) => [...prevList]);
		//because of task to add author to mockedAuthorsList - have to check if exist
		else setAuthorsList((prevList) => [...prevList, author]);
	};

	return (
		<>
			<Header />
			{courseRender ? (
				<Courses
					onAddCourse={showAddCourse}
					coursesList={coursesList}
					authorsList={authorsList}
				/>
			) : (
				<CreateCourse
					authorsList={authorsList}
					onCreateCourse={onCreateCourse}
					onAddAuthor={onAddAuthor}
				/>
			)}
		</>
	);
}

export default App;
