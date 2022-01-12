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

export default CenteredContainer;
