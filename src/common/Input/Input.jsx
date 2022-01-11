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
				type='text'
			/>
		</label>
	);
};

export default Input;
