import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { actionLogOut } from '../../store/user/actionCreators';

import styles from './Header.module.css';
import Button from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_LOGOUT } from '../../constants';
import { selectUser } from '../../store/selector';

const Header = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const onLogoutHandler = () => {
		dispatch(actionLogOut());

		window.localStorage.removeItem('token');
		window.localStorage.removeItem('name');
		history.push('/login');
	};

	return (
		<header className={styles.header}>
			<Logo />
			{user.isAuth && (
				<div>
					<h1>{user.name}</h1>
					<Button buttonText={BUTTON_LOGOUT} onClick={onLogoutHandler} />
				</div>
			)}
		</header>
	);
};

export default Header;
