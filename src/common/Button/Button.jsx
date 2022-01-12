import { Link } from 'react-router-dom';
import classes from './Button.module.css';

const Button = (props) => {
	return (
		<button
			type={props.buttonType}
			className={classes.btn}
			onClick={props.onClick}
		>
			{props.buttonText}
		</button>
	);
};

export default Button;
