import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = (props) => {
	return (
		<label>
			{props.labelText}
			<input
				className={styles.input}
				ref={props.thisRef}
				value={props.value}
				placeholder={props.placeholderText}
				onChange={props.onChange}
				type={props.type ?? 'text'}
			/>
		</label>
	);
};

Input.propTypes = {
	labelText: PropTypes.string,
	thisRef: PropTypes.object,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholderText: PropTypes.string,
	onChange: PropTypes.func,
	type: PropTypes.string,
};

export default Input;
