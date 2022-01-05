import Button from '../../../../common/Button/Button';
import classes from './CourseCard.module.css';
import { mockedAuthorsList } from '../../../../constants';

const CourseCard = (props) => {
	const padTwoPlaces = (input) => {
		return input.toString().padStart(2, '0');
	};

	const convertDuration = () => {
		const duration = props.course.duration;
		const hours = Math.floor(duration / 60);
		const mins = duration % 60;

		return `${hours.toString().padStart(2, '0')}:${mins
			.toString()
			.padStart(2, '0')} hours`;
	};

	const convertDate = () => {
		const date = props.course.creationDate;
		let [day, month, year] = date.split('/');
		day = padTwoPlaces(day);
		month = padTwoPlaces(month);
		year = padTwoPlaces(year);

		return `${day}.${month}.${year}`;
	};

	const renderAuthors = () => {
		return props.course.authors.map((author, index) => {
			const authorName = mockedAuthorsList.find(
				(auth) => auth.id === author
			).name;
			const isLastAuthor = () => {
				return index + 1 === props.course.authors.length;
			};
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
					Duration: <span>{convertDuration()}</span>
				</h3>
				<h3>
					Created: <span>{convertDate()}</span>
				</h3>
				<Button buttonText='Show course' />
			</div>
		</section>
	);
};

export default CourseCard;
