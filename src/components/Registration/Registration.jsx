import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRef } from 'react/cjs/react.development';

import axios from 'axios';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import CenteredContainer from '../../helpers/CenteredContainer/CenteredContainer';

import {
	BACKEND_URL,
	BUTTON_REGISTER,
	LABEL_REGISTRATION_EMAIL,
	LABEL_REGISTRATION_NAME,
	LABEL_REGISTRATION_PASSWORD,
	PLACEHOLDER_REGISTRATION_EMAIL,
	PLACEHOLDER_REGISTRATION_NAME,
	PLACEHOLDER_REGISTRATION_PASSWORD,
} from '../../constants';

const Registration = () => {
	const history = useHistory();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const passwordRef = useRef();
	const emailRef = useRef();

	const onNameChange = (e) => setName(e.target.value);
	const onEmailChange = (e) => setEmail(e.target.value);

	const onRegister = (e) => {
		e.preventDefault();

		const headers = {
			'Content-Type': 'application/json',
		};

		const account = {
			name,
			email,
			password: passwordRef.current.value,
		};

		const result = axios
			.post(`${BACKEND_URL}/register`, account, headers)
			.then((result) => {
				history.push('/login');
				return result;
			})
			.catch((error) => error.response.data.errors[0]);

		(async () => {
			const response = await result;
			if (response.status === 201) {
				history.push('/login');
				return console.log(response.data.result);
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
					labelText={LABEL_REGISTRATION_NAME}
					placeholderText={PLACEHOLDER_REGISTRATION_NAME}
					type='text'
					onChange={onNameChange}
					value={name}
				/>
				<Input
					labelText={LABEL_REGISTRATION_EMAIL}
					placeholderText={PLACEHOLDER_REGISTRATION_EMAIL}
					type='email'
					onChange={onEmailChange}
					value={email}
					thisRef={emailRef}
				/>
				<Input
					labelText={LABEL_REGISTRATION_PASSWORD}
					placeholderText={PLACEHOLDER_REGISTRATION_PASSWORD}
					type='password'
					thisRef={passwordRef}
				/>
				<Button buttonText={BUTTON_REGISTER} buttonType='submit' />
			</form>
			<p>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</CenteredContainer>
	);
};

export default Registration;
