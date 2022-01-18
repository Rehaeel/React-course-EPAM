import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import classes from './CourseCard.module.css';

import Button from '../../../../common/Button/Button';
import { formatDuration, convertDate } from '../../../../helpers/formatters';
import * as constants from '../../../../constants';
import { selectAuthors, selectUser } from '../../../../store/selector';
import { deleteCourseThunk } from '../../../../store/courses/thunk';

const CourseCard = ({ course }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const isAdmin = useSelector(selectUser).role === 'admin';

	const authorsList = useSelector(selectAuthors);

	const isLastAuthor = (i) => i + 1 === course.authors.length;

	return (
		<section className={classes.card}>
			<div className={classes.description}>
				<h1>{course.title}</h1>
				<p>{course.description}</p>
			</div>
			<div className={classes.info}>
				<label>
					<b>Authors:</b> {''}
					{course.authors
						.map((auth) => {
							const foundAuthor = authorsList.find((a) => auth === a.id);
							if (!foundAuthor) return;
							else return foundAuthor.name;
						})
						.map((author, index) => (
							<span key={course.authors[index]}>{`${author}${
								!isLastAuthor(index) ? ', ' : ''
							}`}</span>
						))}
				</label>
				<label>
					<b>Duration: </b>
					<span>{`${formatDuration(course.duration)}hours`}</span>
				</label>
				<label>
					<b>Created:</b> <span>{convertDate(course.creationDate)}</span>
				</label>
				<div>
					<Button
						buttonText={constants.BUTTON_SHOW_COURSE}
						onClick={() => history.push(`/courses/${course.id}`)}
					/>
					{isAdmin && (
						<>
							<Button
								buttonText={constants.BUTTON_EDIT}
								onClick={() => history.push(`/courses/update/${course.id}`)}
							/>
							<Button
								buttonText={constants.BUTTON_DELETE}
								onClick={() => dispatch(deleteCourseThunk(course.id))}
							/>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

CourseCard.propTypes = {
	course: PropTypes.exact({
		id: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		creationDate: PropTypes.string,
		duration: PropTypes.number,
		authors: PropTypes.arrayOf(PropTypes.string),
	}),
};

export default CourseCard;
