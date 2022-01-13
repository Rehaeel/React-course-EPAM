import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import classes from './SearchBar.module.css';

const SearchBar = (props) => {
	return (
		<form className={classes.bar} onSubmit={props.onSubmitHandler}>
			<Input
				labelText=''
				value={props.value}
				placeholderText='Enter course name or ID'
				onChange={props.onChange}
			/>
			<Button type='submit' buttonText='Search' />
		</form>
	);
};

SearchBar.propTypes = {
	onSubmitHandler: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
};

export default SearchBar;
