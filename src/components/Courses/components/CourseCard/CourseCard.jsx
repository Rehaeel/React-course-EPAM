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
		<section className={classes.card} data-testid='course-card'>
			<div className={classes.description}>
				<h1 data-testid='course-title'>{course.title}</h1>
				<p data-testid='course-description'>{course.description}</p>
			</div>
			<div className={classes.info}>
				<div data-testid='course-authors'>
					<b>Authors:</b> {''}
					<ul>
						{authorsList
							.filter((auth) => course.authors.find((a) => a === auth.id))
							.map((author, index) => (
								<li key={course.authors[index]}>{`${author.name}${
									!isLastAuthor(index) ? `,` : ''
								}`}</li>
							))}
					</ul>
				</div>
				<div>
					<b>Duration: </b>
					<span data-testid='course-duration'>{`${formatDuration(
						course.duration
					)}hours`}</span>
				</div>
				<div>
					<b>Created:</b>{' '}
					<span data-testid='course-created-date'>
						{convertDate(course.creationDate)}
					</span>
				</div>
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
