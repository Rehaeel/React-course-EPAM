import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import CenteredContainer from '../../helpers/CenteredContainer/CenteredContainer';

import {
	BACKEND_URL,
	BUTTON_LOGIN,
	LABEL_LOGIN_PASSWORD,
	LABLE_LOGIN_EMAIL,
	PLACEHOLDER_LOGIN_EMAIL,
	PLACEHOLDER_LOGIN_PASSWORD,
} from '../../constants';

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
			.post(`${BACKEND_URL}/login`, account, headers)
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
				return window.localStorage.setItem('token', token);
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
					labelText={LABLE_LOGIN_EMAIL}
					placeholderText={PLACEHOLDER_LOGIN_EMAIL}
					type='email'
					thisRef={emailRef}
				/>
				<Input
					labelText={LABEL_LOGIN_PASSWORD}
					placeholderText={PLACEHOLDER_LOGIN_PASSWORD}
					type='password'
					thisRef={passwordRef}
				/>
				<Button buttonText={BUTTON_LOGIN} buttonType='submit' />
			</form>
			<p>
				If you not have an account you can{' '}
				<Link to='/registration'>Registration</Link>
			</p>
		</CenteredContainer>
	);
};

export default Login;
