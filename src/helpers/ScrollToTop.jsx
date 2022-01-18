import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({ history }) => {
	useEffect(() => {
		const unlisten = history.listen(() => {
			window.scrollTo(0, 0);
		});
		return () => {
			unlisten();
		};
	}, [history]);
	return null;
};

ScrollToTop.propTypes = {
	history: PropTypes.object,
};

export default withRouter(ScrollToTop);
