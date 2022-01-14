import { useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import CenteredContainer from '../../helpers/CenteredContainer/CenteredContainer';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import * as constants from '../../constants';

import { actionLogIn } from '../../store/user/actionCreators';
import { actionFetchAllAuthors } from '../../store/authors/actionCreators';
import { actionFetchAllCourses } from '../../store/courses/actionCreators';
import { fetchedAuthors, fetchedCourses } from '../../store/services';

const Login = () => {
	const history = useHistory();
	const dispatch = useDispatch();

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
			.catch((error) => error.response.data.result);

		(async () => {
			const response = await result;

			if (response.status !== 201) return alert(response);

			const token = response.data.result;
			const { email, name } = response.data.user;

			dispatch(actionLogIn(name, email, token));
			fetchedCourses.then((res) =>
				dispatch(actionFetchAllCourses(res.data.result))
			);
			fetchedAuthors.then((res) => {
				dispatch(actionFetchAllAuthors(res.data.result));
			});

			window.localStorage.setItem('token', token);
			window.localStorage.setItem('name', account.name);

			history.push('/courses');
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

export default Login;
