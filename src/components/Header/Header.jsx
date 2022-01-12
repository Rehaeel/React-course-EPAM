import styles from './Header.module.css';
import Button from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_LOGOUT } from '../../constants';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = ({ userName, onLogout, isLogged }) => {
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
		onLogout(false);
		history.push('/login');
	};

	return (
		<header className={styles.header}>
			<Logo />
			{shouldRender && (
				<div>
					<h1>{userName}</h1>
					<Button buttonText={BUTTON_LOGOUT} onClick={onLogoutHandler} />
				</div>
			)}
		</header>
	);
};

export default Header;
