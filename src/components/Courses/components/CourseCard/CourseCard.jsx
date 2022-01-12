import { useHistory } from 'react-router-dom';
import Button from '../../../../common/Button/Button';
import { BUTTON_SHOW_COURSE } from '../../../../constants';
import { formatDuration, convertDate } from '../../../../helpers/formatters';
import classes from './CourseCard.module.css';

const CourseCard = (props) => {
	const history = useHistory();

	const renderAuthors = () => {
		return props.course.authors.map((author, index) => {
			const authorName = props.authorsList.find(
				(auth) => auth.id === author
			).name;

			const isLastAuthor = () => index + 1 === props.course.authors.length;

			return (
				<span key={author}>{`${authorName}${
					!isLastAuthor() ? ', ' : ''
				}`}</span>
			);
		});
	};

	return (
		<section className={classes.card}>
			<div className={classes.description}>
				<h1>{props.course.title}</h1>
				<p>{props.course.description}</p>
			</div>
			<div className={classes.info}>
				<h3>Authors: {renderAuthors()}</h3>
				<h3>
					<span>{`${formatDuration(props.course.duration)}hours`}</span>
				</h3>
				<h3>
					Created: <span>{convertDate(props.course.creationDate)}</span>
				</h3>
				<Button
					buttonText={BUTTON_SHOW_COURSE}
					onClick={() => history.push(`/courses/${props.course.id}`)}
				/>
			</div>
		</section>
	);
};

export default CourseCard;
