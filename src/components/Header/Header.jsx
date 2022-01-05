import styles from './Header.module.css';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

const Header = () => {
	return (
		<header className={styles.header}>
			<Logo />
			<div>
				<h1>Rehaeel</h1>
				<Button buttonText='Logout' />
			</div>
		</header>
	);
};

export default Header;
