import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectUser } from '../../store/selector';

const PriveteRoute = ({ component: Component, ...rest }) => {
	const user = useSelector(selectUser);
	return (
		<Route
			{...rest}
			render={(props) =>
				user.role === 'admin' ? (
					<Component {...props} />
				) : (
					<Redirect to='/courses' />
				)
			}
		/>
	);
};

export default PriveteRoute;
