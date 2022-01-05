import CourseCard from './components/CourseCard/CourseCard';
import { mockedCoursesList } from '../../constants';
import SearchBar from './components/SearchBar/SearchBar';
import { useState } from 'react';
import Button from '../../common/Button/Button';
import classes from './Courses.module.css';

const Courses = () => {
	const [searchValue, setSearchValue] = useState('');

	const onSearchEvent = (e) => {
		setSearchValue(e.target.value);
	};

	const renderCourses = () => {
		return mockedCoursesList.map((course) => (
			<CourseCard key={course.id} course={course} />
		));
	};

	return (
		<section className={classes.courses}>
			<section className={classes['courses-navigation']}>
				<SearchBar value={searchValue} onChange={onSearchEvent} />

				<Button buttonText='Add new course' />
			</section>
			{renderCourses()}
		</section>
	);
};

export default Courses;
