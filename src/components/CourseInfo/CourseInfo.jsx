import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import classes from './CoursesInfo.module.css';

import { formatDuration, convertDate } from '../../helpers/formatters';
import { selectAuthors, selectCourses } from '../../store/selector';

const CourseInfo = () => {
	const { courseId } = useParams();
	const authors = useSelector(selectAuthors);
	const courses = useSelector(selectCourses);
	const [filteredCourse] = courses.filter((course) => course.id === courseId);

	const renderAuthors = () =>
		filteredCourse.authors.map((author) => {
			const filteredAuthor = authors.find((auth) => auth.id === author);
			return <p key={filteredAuthor.id}>{filteredAuthor.name}</p>;
		});

	return (
		<section className={classes['course-info']}>
			<Link to='/courses'>&#60;&nbsp;&nbsp;Back to courses</Link>
			<h1>{filteredCourse.title}</h1>
			<section className={classes['grid-info']}>
				<p>{filteredCourse.description}</p>
				<ul>
					<li>
						<b>ID:</b> {filteredCourse.id}
					</li>
					<li>
						<b>Duration:</b>{' '}
						{`${formatDuration(filteredCourse.duration)} hours`}
					</li>
					<li>
						<b>Created:</b> {convertDate(filteredCourse.creationDate)}
					</li>
					<li className={classes.authors}>
						<b>Authors:</b> {renderAuthors()}
					</li>
				</ul>
			</section>
		</section>
	);
};

export default CourseInfo;
