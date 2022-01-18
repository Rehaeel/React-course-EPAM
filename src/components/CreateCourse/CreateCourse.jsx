import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionAddAuthor } from '../../store/authors/actionCreators';
import { actionAddCourse } from '../../store/courses/actionCreators';
import { selectAuthors, selectCourses } from '../../store/selector';

import { v4 as uuidv4 } from 'uuid';

import classes from './CreateCourse.module.css';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { formatCreationDate } from '../../helpers/dateGenerator';
import { formatDuration } from '../../helpers/formatters';

import * as constants from '../../constants';

const CreateCourse = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const authorsList = useSelector(selectAuthors);
	const coursesList = useSelector(selectCourses);

	const titleRef = useRef();
	useEffect(() => {
		titleRef.current.focus();
	}, []);
	const descriptionRef = useRef();
	const [durationOutput, setDurationOutput] = useState(0);
	const [duration, setDuration] = useState(0);
	useEffect(() => setDurationOutput(formatDuration(duration)), [duration]);

	const [authors, setAuthors] = useState(authorsList);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const authorNameRef = useRef();

	const initialState = () => {
		titleRef.current.value = '';
		descriptionRef.current.value = '';
		authorNameRef.current.value = '';
		setDuration(0);
		setCourseAuthors([]);
		setAuthors(authorsList);
	};

	const createAuthor = (e) => {
		e.preventDefault();

		const author = {
			name: authorNameRef.current.value.toString(),
			id: uuidv4(),
		};

		const isAuthExist =
			authors.findIndex((auth) => auth.name === author.name) !== -1;
		const isValidLength = author.name.length <= 2;

		if (isAuthExist) return;
		if (isValidLength)
			return alert('Author name should be at least 2 characters');

		authorNameRef.current.value = '';
		dispatch(actionAddAuthor(author));
		setAuthors((oldAuthors) => [...oldAuthors, author]);
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

	const onSubmitAddCourse = () => {
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
			id: uuidv4(),
			title: titleRef.current.value.toString(),
			description: descriptionRef.current.value.toString(),
			creationDate: formatCreationDate(),
			duration: +duration,
			authors: courseAuthors.map((auth) => auth.id.toString()),
		};

		if (coursesList.includes(newCourse)) return;

		dispatch(actionAddCourse(newCourse));
		initialState();
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
						buttonText={constants.BUTTON_CREATE_COURSE}
						onClick={onSubmitAddCourse}
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
				</div>
			</section>
		</section>
	);
};

export default CreateCourse;
