import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Header.module.css';
import Button from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_LOGOUT } from '../../constants';

const Header = ({ onLogout, isLogged }) => {
	const history = useHistory();
	const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		const allowed =
			!(window.location.pathname === '/login') &&
			!(window.location.pathname === '/registration');

		setShouldRender(allowed);
	}, [shouldRender, isLogged]);

	const onLogoutHandler = () => {
		setShouldRender(false);
		window.localStorage.removeItem('token');
		window.localStorage.removeItem('name');
		onLogout(false);
		history.push('/login');
	};

	return (
		<header className={styles.header}>
			<Logo />
			{shouldRender && (
				<div>
					<h1>{window.localStorage.getItem('name')}</h1>
					<Button buttonText={BUTTON_LOGOUT} onClick={onLogoutHandler} />
				</div>
			)}
		</header>
	);
};

Header.propTypes = {
	onLogout: PropTypes.func,
	isLogged: PropTypes.bool,
};

export default Header;
