import { useState } from 'react';
import { useHistory } from 'react-router-dom/';
import PropTypes from 'prop-types';

import classes from './Courses.module.css';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { BUTTON_ADD_NEW_COURSE } from '../../constants';

const Courses = (props) => {
	const [searchValue, setSearchValue] = useState('');
	const [coursesRender, setCoursesRender] = useState(renderCourses());
	const history = useHistory();

	function renderAll() {
		return props.coursesList.map((course) => (
			<CourseCard
				key={course.id}
				course={course}
				authorsList={props.authorsList}
			/>
		));
	}

	const onSearchEvent = (e) => {
		setSearchValue(e.target.value);
		if (e.target.value === '') return setCoursesRender(renderAll());
		setCoursesRender(renderCourses(e.target.value.toLowerCase()));
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		setCoursesRender(renderCourses(searchValue.toLowerCase()));
	};

	function renderCourses(query) {
		if (!query) return renderAll();

		return props.coursesList
			.filter(
				(course) =>
					course.title.toLowerCase().includes(query) ||
					course.id.toLowerCase().includes(query)
			)
			.map((course) => (
				<CourseCard
					authorsList={props.authorsList}
					key={course.id}
					course={course}
				/>
			));
	}

	return (
		<section className={classes.courses}>
			<section className={classes['courses-navigation']}>
				<SearchBar
					value={searchValue}
					onChange={onSearchEvent}
					onSubmitHandler={onSubmitHandler}
				/>

				<Button
					buttonText={BUTTON_ADD_NEW_COURSE}
					onClick={() => history.push('/courses/add')}
				/>
			</section>
			{coursesRender}
		</section>
	);
};

Courses.propTypes = {
	authorsList: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
	coursesList: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string,
			title: PropTypes.string,
			description: PropTypes.string,
			creationDate: PropTypes.string,
			duration: PropTypes.number,
			authors: PropTypes.arrayOf(PropTypes.string),
		})
	),
};

export default Courses;
