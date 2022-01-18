import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { useState } from 'react';
import Button from '../../common/Button/Button';
import classes from './Courses.module.css';
import { BUTTON_ADD_NEW_COURSE } from '../../constants';

const Courses = (props) => {
	const [searchValue, setSearchValue] = useState('');
	const [coursesRender, setCoursesRender] = useState(renderCourses());

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
					onClick={props.onAddCourse}
				/>
			</section>
			{coursesRender}
		</section>
	);
};

export default Courses;
