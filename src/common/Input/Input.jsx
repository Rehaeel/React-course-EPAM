const Input = (props) => {
	return (
		<label>
			{props.labelText}
			<input
				value={props.value}
				placeholder={props.placeholderText}
				onChange={props.onChange}
				type='text'
			/>
		</label>
	);
};

export default Input;
