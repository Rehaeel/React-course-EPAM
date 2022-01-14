import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import CenteredContainer from '../../helpers/CenteredContainer/CenteredContainer';

import * as constants from '../../constants';

const Registration = () => {
	const history = useHistory();

	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const onRegister = (e) => {
		e.preventDefault();

		const headers = {
			'Content-Type': 'application/json',
		};

		const account = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};

		const result = axios
			.post(`${constants.BACKEND_URL}/register`, account, headers)
			.catch((error) => error.response.data.errors[0]);

		(async () => {
			const response = await result;
			if (response.status === 201) {
				return history.push('/login');
			}

			if (response.includes(`'email'`)) emailRef.current.select();
			if (response.includes(`'password'`)) passwordRef.current.select();
			alert(`Error: ${response}`);
		})();
	};

	return (
		<CenteredContainer isFullHeight={true} className={`form-formatter`}>
			<h1>Registration</h1>
			<form onSubmit={onRegister} className='centered-container'>
				<Input
					labelText={constants.LABEL_REGISTRATION_NAME}
					placeholderText={constants.PLACEHOLDER_REGISTRATION_NAME}
					type='text'
					thisRef={nameRef}
				/>
				<Input
					labelText={constants.LABEL_REGISTRATION_EMAIL}
					placeholderText={constants.PLACEHOLDER_REGISTRATION_EMAIL}
					type='email'
					thisRef={emailRef}
				/>
				<Input
					labelText={constants.LABEL_REGISTRATION_PASSWORD}
					placeholderText={constants.PLACEHOLDER_REGISTRATION_PASSWORD}
					type='password'
					thisRef={passwordRef}
				/>
				<Button buttonText={constants.BUTTON_REGISTER} buttonType='submit' />
			</form>
			<p>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</CenteredContainer>
	);
};

export default Registration;
