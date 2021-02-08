import { React, Fragment } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const Register = () => {
    return (
        <Fragment>
					<Card className="authCard px-4 py-4">
						<h2 className="text-center pb-2 text-dark">Register</h2>
						<Form>
							<Form.Group>
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" placeholder="Enter email" />
							</Form.Group>

							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control type="text" placeholder="Enter username" />
							</Form.Group>

							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" placeholder="Password" />
							</Form.Group>

							<Form.Group>
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control type="password" placeholder="Confirm Password" />
							</Form.Group>

							<div className="text-center">
								<Button variant="dark" size="sm" block type="submit">
									Register
								</Button>
							</div>
						</Form>
					</Card>
        </Fragment>
    )
}

export default Register;
