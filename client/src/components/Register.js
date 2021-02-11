import { React, Fragment, useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';

const Register = (props) => {

	const alertContext = useContext(AlertContext);

	const REGISTER_USER = gql`
		mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
			register(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
				id
				username
				email
				createdAt
			}
		}
	`;

	const [variables, setVariables] = useState({
		email: '',
		username: '',
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState({});

	// registerUser is a mutate function
	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update: (cache, res) => {
			alertContext.setAlert("Your account has been successfully created");
			props.history.push('/login');
		},
		onError: (err) => {
			alertContext.setAlert("There was error creating your account");
			setErrors(err.graphQLErrors[0].extensions.errors);
		}
	});

	const submitRegisterForm = e => {
		e.preventDefault();
		registerUser({ variables });
		setVariables({
			email: '',
			username: '',
			password: '',
			confirmPassword: ''
		});
	}

	return (
			<Fragment>
				<Card className="authCard px-4 py-2">
					<h2 className="text-center pb-2 text-dark">Register</h2>
					<Form onSubmit={submitRegisterForm}>
						<Form.Group>
							<Form.Label className={errors.email && 'text-danger'}>
								{ errors.email ?? 'Email address'}
							</Form.Label>
							<Form.Control type="email" className={errors.email && 'is-invalid'} placeholder="Enter email" value={variables.email} onChange={e => setVariables({ ...variables, email: e.target.value })} />
						</Form.Group>

						<Form.Group>
							<Form.Label className={errors.username && 'text-danger'}>
								{errors.username ?? 'Username'}
							</Form.Label>
							<Form.Control type="text" className={errors.username && 'is-invalid'} placeholder="Enter username" value={variables.username} onChange={e => setVariables({ ...variables, username: e.target.value })} />
						</Form.Group>

						<Form.Group>
							<Form.Label className={errors.password && 'text-danger'}>
								{errors.password ?? 'Password'}
								</Form.Label>
							<Form.Control type="password" className={errors.password && 'is-invalid'} placeholder="Password" value={variables.password} onChange={e => setVariables({ ...variables, password: e.target.value })}/>
						</Form.Group>

						<Form.Group>
							<Form.Label className={errors.confirmPassword && 'text-danger'}>
								{errors.confirmPassword ?? 'Confirm Password'}
								</Form.Label>
								<Form.Control type="password" className={errors.confirmPassword && 'is-invalid'} placeholder="Confirm Password" value={variables.confirmPassword} onChange={e => setVariables({ ...variables, confirmPassword: e.target.value })}/>
						</Form.Group>

						<div className="text-center mt-2">
							<Button variant="dark" size="sm" block type="submit" disabled={loading}>
								{ loading ? 'Loading...' : 'Register' }
							</Button>
						</div>

						<div className="text-center mt-3">
							<p className="text-dark">Already registered? <Link to="/login" className="text-primary">Login</Link></p>	
						</div>
					</Form>
				</Card>
			</Fragment>
	)
}

export default Register;
