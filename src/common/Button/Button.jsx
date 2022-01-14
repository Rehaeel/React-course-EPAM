import PropTypes from 'prop-types';
import classes from './Button.module.css';

const Button = (props) => (
	<button
		type={props.buttonType}
		className={classes.btn}
		onClick={props.onClick}
	>
		{props.buttonText}
	</button>
);

Button.propTypes = {
	buttonType: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
	buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Button;
