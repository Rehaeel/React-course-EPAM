import PropTypes from 'prop-types';
import './CenteredContainer.css';

const CenteredContainer = ({ children, isFullHeight, className }) => {
	return (
		<section
			className={`centered-container ${
				isFullHeight ? 'full-height-container' : ''
			} ${className ?? ''}`}
		>
			{children}
		</section>
	);
};

CenteredContainer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.object,
	]),
	isFullHeight: PropTypes.bool,
	className: PropTypes.string,
};

export default CenteredContainer;
