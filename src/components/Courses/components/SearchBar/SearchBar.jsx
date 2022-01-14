import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import * as constants from '../../../../constants';
import classes from './SearchBar.module.css';

const SearchBar = (props) => {
	return (
		<form className={classes.bar} onSubmit={props.onSubmitHandler}>
			<Input
				labelText=''
				value={props.value}
				placeholderText={constants.PLACEHOLDER_SEARCHBAR_INPUT}
				onChange={props.onChange}
			/>
			<Button type='submit' buttonText={constants.BUTTON_SEARCHBAR_INPUT} />
		</form>
	);
};

SearchBar.propTypes = {
	onSubmitHandler: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
};

export default SearchBar;
