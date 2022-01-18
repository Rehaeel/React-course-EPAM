import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Header.module.css';
import Button from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_LOGOUT } from '../../constants';
import { selectUser } from '../../store/selector';
import { logOutUserThunk } from '../../store/user/thunk';
import { handdleError } from '../../store/services';

const Header = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const token = window.localStorage.getItem('token');

	const onLogoutHandler = () => {
		dispatch(logOutUserThunk(token))
			.then(() => history.push('/login'))
			.catch(handdleError);
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
