import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import CenteredContainer from '../../helpers/CenteredContainer/CenteredContainer';
import { formatDuration, convertDate } from '../../helpers/formatters';

import classes from './CoursesInfo.module.css';

const CourseInfo = () => {
	const [course, setCourse] = useState({});
	const [isFetched, setIsFetched] = useState(false);
	const { courseId } = useParams();

	useEffect(() => {
		const fetchedCourse = mockedCoursesList.filter(
			(course) => course.id === courseId
		);
		setCourse(...fetchedCourse);
		setIsFetched(true);
	}, [courseId]);

	const renderAuthors = () =>
		isFetched &&
		course.authors.map((author) => {
			const fetchedAuthor = mockedAuthorsList.find(
				(auth) => auth.id === author
			);

			return <p key={fetchedAuthor.id}>{fetchedAuthor.name}</p>;
		});

	return (
		<section className={classes['course-info']}>
			<Link to='/courses'>&#60;&nbsp;&nbsp;Back to courses</Link>
			<h1>{course.title}</h1>
			<CenteredContainer className={classes['grid-info']}>
				<p>{course.description}</p>
				<ul>
					<li>
						<b>ID:</b> {isFetched && course.id}
					</li>
					<li>
						<b>Duration:</b>{' '}
						{isFetched && `${formatDuration(course.duration)} hours`}
					</li>
					<li>
						<b>Created:</b> {isFetched && convertDate(course.creationDate)}
					</li>
					<li className={classes.authors}>
						<b>Authors:</b> {renderAuthors()}
					</li>
				</ul>
			</CenteredContainer>
		</section>
	);
};

export default CourseInfo;
