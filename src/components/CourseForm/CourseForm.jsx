import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthors, selectCourses } from '../../store/selector';

import classes from './CourseForm.module.css';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { formatCreationDate } from '../../helpers/dateGenerator';
import { formatDuration } from '../../helpers/formatters';

import * as constants from '../../constants';
import { addCourseThunk, updateCourseThunk } from '../../store/courses/thunk';
import { addAuthorThunk } from '../../store/authors/thunk';
import { useParams } from 'react-router-dom';

const CourseForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const authorsList = useSelector(selectAuthors);
	const coursesList = useSelector(selectCourses);

	const param = useParams();
	const isUpdating = Boolean(!!Object.keys(param).length);
	const currentCourse = coursesList.find(
		(course) => course.id === param.courseId
	);

	const titleRef = useRef();
	useEffect(() => {
		titleRef.current.focus();
		initialState();
	}, []);

	const descriptionRef = useRef();
	const [durationOutput, setDurationOutput] = useState(0);
	const [duration, setDuration] = useState(0);
	const durationRef = useRef();
	useEffect(() => setDurationOutput(formatDuration(duration)), [duration]);

	const [authors, setAuthors] = useState(authorsList);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const authorNameRef = useRef();

	const initialState = () => {
		titleRef.current.value = isUpdating ? currentCourse.title : '';
		descriptionRef.current.value = isUpdating ? currentCourse.description : '';
		authorNameRef.current.value = '';
		setDuration(isUpdating ? currentCourse.duration : 0);
		durationRef.current.value = isUpdating ? currentCourse.duration : 0;
		setCourseAuthors(
			isUpdating
				? currentCourse.authors.map((auth) =>
						authors.find((a) => a.id === auth)
				  )
				: []
		);
		setAuthors(
			isUpdating
				? authorsList.filter((auth) => {
						return !currentCourse.authors.find((a) => a === auth.id);
				  })
				: authorsList
		);
	};

	const createAuthor = (e) => {
		e.preventDefault();

		const author = {
			name: authorNameRef.current.value.toString(),
		};

		const isAuthExist =
			authors.findIndex((auth) => auth.name === author.name) !== -1;
		const isValidLength = author.name.length <= 2;

		if (isAuthExist) return;
		if (isValidLength)
			return alert('Author name should be at least 2 characters');

		authorNameRef.current.value = '';
		dispatch(addAuthorThunk(author)).then((auth) =>
			setAuthors((oldAuthors) => [...oldAuthors, auth])
		);
	};

	const addCourseAuthor = (id) => {
		const newAuthor = authors.find((auth) => auth.id === id);

		if (courseAuthors.includes(newAuthor)) return;

		setCourseAuthors((oldAuthors) => [...oldAuthors, newAuthor]);
		setAuthors((oldAuthors) =>
			[...oldAuthors].filter((auth) => auth.id !== id)
		);
	};
	const removeCourseAuthor = (id) => {
		const deletedAuthor = courseAuthors.find((auth) => auth.id === id);

		setCourseAuthors((oldAuthors) =>
			[...oldAuthors].filter((auth) => auth.id !== id)
		);
		setAuthors((oldAuthors) => [...oldAuthors, deletedAuthor]);
	};

	const onSubmitCourse = () => {
		const someFieldsEmpty =
			titleRef.current.value === '' ||
			descriptionRef.current.value === '' ||
			duration === '' ||
			courseAuthors.length === 0;

		if (someFieldsEmpty) return alert('Please, fill in all fields');

		let errorMessage = '';
		if (descriptionRef.current.value.toString().length <= 2)
			errorMessage += 'Description should have at least 2 characters';
		if (!Number.isInteger(+duration) || +duration <= 0)
			errorMessage += `\nDuration should be positive number`;
		if (errorMessage) return alert(errorMessage);

		const newCourse = {
			title: titleRef.current.value.toString(),
			description: descriptionRef.current.value.toString(),
			creationDate: formatCreationDate(),
			duration: +duration,
			authors: courseAuthors.map((auth) => auth.id.toString()),
		};

		if (coursesList.includes(newCourse)) return alert('Course already exists');

		isUpdating
			? dispatch(updateCourseThunk(param, newCourse))
			: dispatch(addCourseThunk(newCourse));

		history.push('/courses');
	};

	return (
		<section className={classes['add-course']}>
			<section className={classes.info}>
				<div className={classes.title}>
					<Input
						labelText={constants.LABEL_ADD_COURSE_TITLE}
						placeholderText={constants.PLACEHOLDER_ADD_COURSE_TITLE}
						thisRef={titleRef}
					/>
					<Button
						buttonText={
							isUpdating
								? constants.BUTTON_UPDATE_COURSE
								: constants.BUTTON_CREATE_COURSE
						}
						onClick={onSubmitCourse}
						to='/courses'
					/>
				</div>
				<label>
					Description
					<textarea
						placeholder={constants.PLACEHOLDER_ADD_COURSE_DESCRIPTION}
						ref={descriptionRef}
					/>
				</label>
			</section>

			<section className={classes.details}>
				<div className={classes.addition}>
					<div>
						<h3>Add author</h3>
						<form onSubmit={createAuthor}>
							<Input
								labelText={constants.LABEL_ADD_AUTHOR_NAME}
								placeholderText={constants.PLACEHOLDER_ADD_AUTHOR_NAME}
								thisRef={authorNameRef}
							/>
							<Button
								buttonText={constants.BUTTON_CREATE_AUTHOR}
								buttonType='submit'
							/>
						</form>
					</div>

					<div>
						<h3>Duration</h3>
						<Input
							labelText={constants.LABEL_ADD_COURSE_DURATION}
							placeholderText={constants.PLACEHOLDER_ADD_COURSE_DURATION}
							onChange={(e) => setDuration(e.target.value)}
							thisRef={durationRef}
						/>
						<h3 className={classes.duration}>
							Duration:
							<span className={classes['duration-converted']}>
								{durationOutput}
							</span>
							hours
						</h3>
					</div>
				</div>

				<div className={classes.authors}>
					<h3>Authors</h3>
					<ul className={classes['course-authors-list']}>
						{authors.map((auth) => (
							<li key={auth.id}>
								{auth.name}
								<Button
									buttonText={constants.BUTTON_ADD_AUTHOR}
									onClick={() => addCourseAuthor(auth.id)}
								/>
							</li>
						))}
					</ul>

					<h3>Course authors</h3>
					{courseAuthors.length === 0 ? (
						<h4>Author list is empty</h4>
					) : (
						<ul className={classes['course-authors']}>
							{courseAuthors.map((auth) => (
								<li key={auth.id}>
									{auth.name}
									<Button
										buttonText={constants.BUTTON_DELETE_AUTHOR}
										onClick={() => removeCourseAuthor(auth.id)}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</section>
		</section>
	);
};

export default CourseForm;
