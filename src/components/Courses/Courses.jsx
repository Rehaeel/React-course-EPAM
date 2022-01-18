import { useState } from 'react';
import { useHistory } from 'react-router-dom/';
import { useSelector } from 'react-redux';
import { selectCourses } from '../../store/selector';

import classes from './Courses.module.css';

import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CenteredContainer from '../../helpers/CenteredContainer/CenteredContainer';
import { BUTTON_ADD_NEW_COURSE } from '../../constants';

import { selectUser } from '../../store/selector';

const Courses = () => {
	const history = useHistory();
	const isAdmin = useSelector(selectUser).role === 'admin';

	const courses = useSelector(selectCourses);

	const [searchValue, setSearchValue] = useState('');

	const onSearchEvent = (e) => {
		setSearchValue(e.target.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<section className={classes.courses}>
			<section className={classes['courses-navigation']}>
				<SearchBar
					value={searchValue}
					onChange={onSearchEvent}
					onSubmitHandler={onSubmitHandler}
				/>

				{isAdmin && (
					<Button
						buttonText={BUTTON_ADD_NEW_COURSE}
						onClick={() => history.push('/courses/add')}
					/>
				)}
			</section>
			{courses.length === 0 ? (
				<CenteredContainer isFullHeight={true}>
					<h1>no courses to show</h1>
				</CenteredContainer>
			) : (
				courses
					.filter(
						(course) =>
							course.title.toLowerCase().includes(searchValue) ||
							course.id.toLowerCase().includes(searchValue)
					)
					.map((course) => <CourseCard key={course.id} course={course} />)
			)}
		</section>
	);
};

export default Courses;
