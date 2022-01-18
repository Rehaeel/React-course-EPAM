import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import CenteredContainer from '../../helpers/CenteredContainer/CenteredContainer';

import * as constants from '../../constants';

const Login = ({ loginName, isLogged }) => {
	const history = useHistory();
	const emailRef = useRef();
	const passwordRef = useRef();
	const nameRef = useRef();

	useEffect(() => {
		nameRef.current.focus();
	}, []);

	const onLogin = (e) => {
		e.preventDefault();

		const account = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};

		const headers = {
			'Content-Type': 'application/json',
		};

		const result = axios
			.post(`${constants.BACKEND_URL}/login`, account, headers)
			.then((result) => {
				history.push('/courses');
				return result;
			})
			.catch((error) => error.response.data.result);

		(async () => {
			const response = await result;

			if (response.status === 201) {
				const token = response.data.result;
				loginName(response.data.user.name);
				isLogged(true);
				return (
					window.localStorage.setItem('token', token),
					window.localStorage.setItem('name', account.name)
				);
			}
			alert(response);
		})();
	};
	return (
		<CenteredContainer isFullHeight={true} className={'form-formatter'}>
			<h1>Login</h1>
			<form className='centered-container' onSubmit={onLogin}>
				<Input labelText='Name' placeholderText='name' thisRef={nameRef} />
				<Input
					labelText={constants.LABLE_LOGIN_EMAIL}
					placeholderText={constants.PLACEHOLDER_LOGIN_EMAIL}
					type='email'
					thisRef={emailRef}
				/>
				<Input
					labelText={constants.LABEL_LOGIN_PASSWORD}
					placeholderText={constants.PLACEHOLDER_LOGIN_PASSWORD}
					type='password'
					thisRef={passwordRef}
				/>
				<Button buttonText={constants.BUTTON_LOGIN} buttonType='submit' />
			</form>
			<p>
				If you not have an account you can{' '}
				<Link to='/registration'>Registration</Link>
			</p>
		</CenteredContainer>
	);
};

Login.propTypes = {
	loginName: PropTypes.func,
	isLogged: PropTypes.func,
};

export default Login;
