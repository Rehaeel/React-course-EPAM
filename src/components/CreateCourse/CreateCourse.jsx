import React, { useState, useEffect, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import classes from './CreateCourse.module.css';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { formatCreationDate } from '../../helpers/dateGeneratop';

import {
	BUTTON_ADD_AUTHOR,
	BUTTON_CREATE_AUTHOR,
	BUTTON_CREATE_COURSE,
	BUTTON_DELETE_AUTHOR,
	LABEL_ADD_AUTHOR_NAME,
	LABEL_ADD_COURSE_DURATION,
	LABEL_ADD_COURSE_TITLE,
	mockedAuthorsList,
	mockedCoursesList,
	PLACEHOLDER_ADD_AUTHOR_NAME,
	PLACEHOLDER_ADD_COURSE_DESCRIPTION,
	PLACEHOLDER_ADD_COURSE_DURATION,
	PLACEHOLDER_ADD_COURSE_TITLE,
} from '../../constants';

const CreateCourse = (props) => {
	const [title, setTitle] = useState('');
	const titleRef = useRef();
	const [description, setDescription] = useState('');
	const descriptionRef = useRef();
	const [durationOutput, setDurationOutput] = useState(0);
	const [duration, setDuration] = useState(0);
	const durationRef = useRef();

	const [authors, setAuthors] = useState(props.authorsList);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const authorNameRef = useRef();

	const initialState = () => {
		titleRef.current.value = '';
		descriptionRef.current.value = '';
		authorNameRef.current.value = '';
		durationRef.current.value = '';
		setCourseAuthors([]);
		setAuthors(props.authorsList);
	};

	const formatDuration = () => {
		const hours = Math.trunc(duration / 60)
			.toString()
			.padStart(2, '0');
		const minutes = (duration % 60).toString().padStart(2, '0');
		setDurationOutput(` ${hours}:${minutes} `);
	};
	useEffect(formatDuration, [duration]);

	const createAuthor = (e) => {
		e.preventDefault();

		const author = {
			id: uuidv4(),
			name: authorNameRef.current.value.toString(),
		};

		const isAuthExist =
			authors.findIndex((auth) => auth.name === author.name) !== -1;
		const isValidLength = author.name.length <= 2;

		if (isAuthExist) return;
		if (isValidLength)
			return alert('Author name should be at least 2 characters');

		authorNameRef.current.value = '';
		mockedAuthorsList.push(author);
		props.onAddAuthor(author);

		//because of task to add author to mockedAuthorsList - have to check if exist
		if (isAuthExist) setAuthors((oldAuthors) => [...oldAuthors, author]);
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
			durationRef.current.value === '' ||
			courseAuthors.length === 0;

		if (someFieldsEmpty) return alert('Please, fill in all fields');

		let errorMessage = '';
		if (descriptionRef.current.value.toString().length <= 2)
			errorMessage += 'Description should have at least 2 characters';
		if (
			!Number.isInteger(+durationRef.current.value) ||
			+durationRef.current.value <= 0
		)
			errorMessage += `\nDuration should be positive number`;
		if (errorMessage) return alert(errorMessage);

		const newCourse = {
			id: uuidv4(),
			title: title.toString(),
			description: description.toString(),
			creationDate: formatCreationDate(),
			duration: +duration,
			authors: courseAuthors.map((auth) => auth.id.toString()),
		};

		initialState();

		props.onCreateCourse(newCourse);
		mockedCoursesList.push(newCourse);
		console.log(mockedAuthorsList, mockedCoursesList);
	};

	return (
		<section className={classes['add-course']}>
			<section className={classes.info}>
				<div className={classes.title}>
					<Input
						labelText={LABEL_ADD_COURSE_TITLE}
						onChange={(e) => setTitle(e.target.value)}
						placeholderText={PLACEHOLDER_ADD_COURSE_TITLE}
						thisRef={titleRef}
					/>
					<Button
						buttonText={BUTTON_CREATE_COURSE}
						onClick={onSubmitAddCourse}
					/>
				</div>
				<label>
					Description
					<textarea
						placeholder={PLACEHOLDER_ADD_COURSE_DESCRIPTION}
						onChange={(e) => setDescription(e.target.value)}
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
								labelText={LABEL_ADD_AUTHOR_NAME}
								placeholderText={PLACEHOLDER_ADD_AUTHOR_NAME}
								thisRef={authorNameRef}
							/>
							<Button buttonText={BUTTON_CREATE_AUTHOR} buttonType='submit' />
						</form>
					</div>

					<div>
						<h3>Duration</h3>
						<Input
							labelText={LABEL_ADD_COURSE_DURATION}
							placeholderText={PLACEHOLDER_ADD_COURSE_DURATION}
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
									buttonText={BUTTON_ADD_AUTHOR}
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
									buttonText={BUTTON_DELETE_AUTHOR}
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
