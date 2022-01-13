import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import classes from './CreateCourse.module.css';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { formatCreationDate } from '../../helpers/dateGenerator';

import * as constants from '../../constants';
import { formatDuration } from '../../helpers/formatters';

const CreateCourse = (props) => {
	const history = useHistory();

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

	useEffect(() => setDurationOutput(formatDuration(duration)), [duration]);

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
		constants.mockedAuthorsList.push(author);
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

		constants.mockedCoursesList.push(newCourse);
		props.onCreateCourse(newCourse);
		initialState();

		history.push('/courses');
	};

	return (
		<section className={classes['add-course']}>
			<section className={classes.info}>
				<div className={classes.title}>
					<Input
						labelText={constants.LABEL_ADD_COURSE_TITLE}
						onChange={(e) => setTitle(e.target.value)}
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

CreateCourse.propTypes = {
	authorsList: PropTypes.arrayOf(
		PropTypes.exact({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
	onAddAuthor: PropTypes.func,
	onCreateCourse: PropTypes.func,
};

export default CreateCourse;
